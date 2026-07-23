const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', ...headers }
});

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('origin');
  const requestUrl = new URL(request.url);
  if (origin && new URL(origin).host !== requestUrl.host) {
    return json({ ok: false, error: 'Origin not allowed' }, 403);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 12000) return json({ ok: false, error: 'Payload too large' }, 413);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const organisation = String(body.organisation || '').trim();
  const message = String(body.message || '').trim();
  const honeypot = String(body.website || '').trim();
  const startedAt = Number(body.startedAt || 0);

  if (honeypot) return json({ ok: true });
  if (!startedAt || Date.now() - startedAt < 1500) return json({ ok: false, error: 'Submission too fast' }, 400);
  if (name.length < 2 || name.length > 100) return json({ ok: false, error: 'Invalid name' }, 400);
  if (!validEmail(email) || email.length > 200) return json({ ok: false, error: 'Invalid email' }, 400);
  if (organisation.length > 150) return json({ ok: false, error: 'Invalid organisation' }, 400);
  if (message.length < 20 || message.length > 3000) return json({ ok: false, error: 'Invalid message' }, 400);

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  const from = env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('Missing contact-form environment variables');
    return json({ ok: false, error: 'Contact service is not configured' }, 503);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeOrganisation = escapeHtml(organisation || 'Not provided');
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');
  const idempotencyKey = `sundai-contact-${crypto.randomUUID()}`;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json',
      'idempotency-key': idempotencyKey
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `SundAI website enquiry — ${name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto"><h1>New SundAI enquiry</h1><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Organisation:</strong> ${safeOrganisation}</p><hr><p>${safeMessage}</p></div>`,
      text: `New SundAI enquiry\n\nName: ${name}\nEmail: ${email}\nOrganisation: ${organisation || 'Not provided'}\n\n${message}`
    })
  });

  if (!resendResponse.ok) {
    console.error('Resend error', resendResponse.status, await resendResponse.text());
    return json({ ok: false, error: 'Email delivery failed' }, 502);
  }
  return json({ ok: true }, 202);
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'allow': 'POST, OPTIONS' } });
}
