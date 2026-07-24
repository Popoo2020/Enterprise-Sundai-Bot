const MAX_BODY_BYTES = 12_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
const ALLOWED_FIELDS = new Set(['name', 'email', 'organisation', 'message', 'website', 'startedAt', 'turnstileToken']);
const localRateState = new Map();

const responseHeaders = {
  'cache-control': 'no-store, max-age=0',
  'content-type': 'application/json; charset=utf-8',
  'referrer-policy': 'no-referrer',
  'x-content-type-options': 'nosniff',
  'x-robots-tag': 'noindex, nofollow'
};

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { ...responseHeaders, ...headers }
});

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const stripControlCharacters = (value = '') => String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
const singleLine = (value = '') => stripControlCharacters(value).replace(/[\r\n]+/g, ' ').trim();
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const withTimeout = async (url, options, timeoutMs) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

const hashValue = async (value) => {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const checkLocalRateLimit = (key) => {
  const now = Date.now();
  const windowMs = RATE_LIMIT_WINDOW_SECONDS * 1000;
  const current = localRateState.get(key);
  if (!current || current.resetAt <= now) {
    localRateState.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: RATE_LIMIT_WINDOW_SECONDS };
  }
  if (current.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
};

const checkEdgeCacheRateLimit = async (request, key) => {
  if (typeof caches === 'undefined' || !caches.default) return { allowed: true };
  try {
    const digest = await hashValue(key);
    const rateUrl = new URL(`/__security/contact-rate/${digest}`, request.url);
    const cacheKey = new Request(rateUrl.toString(), { method: 'GET' });
    const cached = await caches.default.match(cacheKey);
    const count = Number(cached?.headers.get('x-sundai-rate-count') || 0);
    if (count >= RATE_LIMIT_MAX) return { allowed: false, retryAfter: RATE_LIMIT_WINDOW_SECONDS };
    const marker = new Response('', {
      status: 204,
      headers: {
        'cache-control': `max-age=${RATE_LIMIT_WINDOW_SECONDS}`,
        'x-sundai-rate-count': String(count + 1)
      }
    });
    await caches.default.put(cacheKey, marker);
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
};

const enforceRateLimit = async (request, env) => {
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const key = `contact:${ip}`;

  if (env.CONTACT_RATE_LIMITER && typeof env.CONTACT_RATE_LIMITER.limit === 'function') {
    const result = await env.CONTACT_RATE_LIMITER.limit({ key });
    if (!result.success) return { allowed: false, retryAfter: RATE_LIMIT_WINDOW_SECONDS };
  }

  const local = checkLocalRateLimit(key);
  if (!local.allowed) return local;
  const edge = await checkEdgeCacheRateLimit(request, key);
  return edge.allowed ? local : edge;
};

const verifyTurnstile = async ({ request, env, token }) => {
  const secret = String(env.TURNSTILE_SECRET_KEY || '').trim();
  if (!secret) return { enabled: false, success: true };
  if (!token || token.length > 2048) return { enabled: true, success: false, code: 'turnstile_required' };

  const remoteIp = request.headers.get('cf-connecting-ip') || '';
  const form = new FormData();
  form.set('secret', secret);
  form.set('response', token);
  if (remoteIp) form.set('remoteip', remoteIp);
  form.set('idempotency_key', crypto.randomUUID());

  let verificationResponse;
  try {
    verificationResponse = await withTimeout('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form
    }, 5_000);
  } catch {
    return { enabled: true, success: false, code: 'turnstile_unavailable' };
  }

  if (!verificationResponse.ok) return { enabled: true, success: false, code: 'turnstile_unavailable' };
  const result = await verificationResponse.json();
  const requestHost = new URL(request.url).hostname;
  const allowedHostnames = String(env.TURNSTILE_ALLOWED_HOSTNAMES || `${requestHost},sundaibot.com,www.sundaibot.com`)
    .split(',')
    .map(value => value.trim().toLowerCase())
    .filter(Boolean);
  const hostnameAllowed = !result.hostname || allowedHostnames.includes(String(result.hostname).toLowerCase());
  const actionAllowed = !result.action || result.action === 'contact';

  return {
    enabled: true,
    success: Boolean(result.success && hostnameAllowed && actionAllowed),
    code: result.success ? 'turnstile_context_invalid' : 'turnstile_invalid'
  };
};

const parseJsonBody = async (request) => {
  const contentType = String(request.headers.get('content-type') || '').toLowerCase();
  if (!/^application\/json(?:\s*;|$)/.test(contentType)) {
    return { error: json({ ok: false, code: 'unsupported_media_type' }, 415) };
  }

  const advertisedLength = Number(request.headers.get('content-length') || 0);
  if (advertisedLength > MAX_BODY_BYTES) return { error: json({ ok: false, code: 'payload_too_large' }, 413) };

  let buffer;
  try {
    buffer = await request.arrayBuffer();
  } catch {
    return { error: json({ ok: false, code: 'invalid_body' }, 400) };
  }
  if (buffer.byteLength > MAX_BODY_BYTES) return { error: json({ ok: false, code: 'payload_too_large' }, 413) };

  let body;
  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
    body = JSON.parse(text);
  } catch {
    return { error: json({ ok: false, code: 'invalid_json' }, 400) };
  }
  if (!body || Array.isArray(body) || typeof body !== 'object') return { error: json({ ok: false, code: 'invalid_json' }, 400) };
  const keys = Object.keys(body);
  if (keys.length > ALLOWED_FIELDS.size || keys.some(key => !ALLOWED_FIELDS.has(key))) {
    return { error: json({ ok: false, code: 'unexpected_fields' }, 400) };
  }
  return { body };
};

const validateSameOrigin = (request) => {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== requestUrl.host) return false;
    } catch {
      return false;
    }
  }
  const fetchSite = request.headers.get('sec-fetch-site');
  return !fetchSite || fetchSite === 'same-origin' || fetchSite === 'same-site' || fetchSite === 'none';
};

export async function onRequestGet({ env }) {
  const siteKey = String(env.TURNSTILE_SITE_KEY || '').trim();
  const secretConfigured = Boolean(String(env.TURNSTILE_SECRET_KEY || '').trim());
  return json({ enabled: Boolean(siteKey && secretConfigured), siteKey: siteKey && secretConfigured ? siteKey : '', action: 'contact' });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!validateSameOrigin(request)) return json({ ok: false, code: 'origin_not_allowed' }, 403);

  const limited = await enforceRateLimit(request, env);
  if (!limited.allowed) {
    return json({ ok: false, code: 'rate_limited' }, 429, { 'retry-after': String(limited.retryAfter || RATE_LIMIT_WINDOW_SECONDS) });
  }

  const parsed = await parseJsonBody(request);
  if (parsed.error) return parsed.error;
  const body = parsed.body;

  const name = singleLine(body.name || '');
  const email = singleLine(body.email || '').toLowerCase();
  const organisation = singleLine(body.organisation || '');
  const message = stripControlCharacters(body.message || '').trim();
  const honeypot = singleLine(body.website || '');
  const startedAt = Number(body.startedAt || 0);
  const turnstileToken = singleLine(body.turnstileToken || '');

  if (honeypot) return json({ ok: true }, 202);
  if (!startedAt || Date.now() - startedAt < 1500 || Date.now() - startedAt > 24 * 60 * 60 * 1000) return json({ ok: false, code: 'invalid_form_timing' }, 400);
  if (name.length < 2 || name.length > 100) return json({ ok: false, code: 'invalid_name' }, 400);
  if (!validEmail(email) || email.length > 200) return json({ ok: false, code: 'invalid_email' }, 400);
  if (organisation.length > 150) return json({ ok: false, code: 'invalid_organisation' }, 400);
  if (message.length < 20 || message.length > 3000) return json({ ok: false, code: 'invalid_message' }, 400);

  const turnstile = await verifyTurnstile({ request, env, token: turnstileToken });
  if (!turnstile.success) {
    const status = turnstile.code === 'turnstile_unavailable' ? 503 : 403;
    return json({ ok: false, code: turnstile.code }, status);
  }

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  const from = env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('Contact service configuration is incomplete');
    return json({ ok: false, code: 'contact_unavailable' }, 503);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeOrganisation = escapeHtml(organisation || 'Not provided');
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');

  let resendResponse;
  try {
    resendResponse = await withTimeout('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
        'idempotency-key': `sundai-contact-${crypto.randomUUID()}`
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `SundAI website enquiry — ${name}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto"><h1>New SundAI enquiry</h1><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Organisation:</strong> ${safeOrganisation}</p><hr><p>${safeMessage}</p></div>`,
        text: `New SundAI enquiry\n\nName: ${name}\nEmail: ${email}\nOrganisation: ${organisation || 'Not provided'}\n\n${message}`
      })
    }, 8_000);
  } catch {
    console.error('Contact email provider timed out');
    return json({ ok: false, code: 'email_provider_timeout' }, 504);
  }

  if (!resendResponse.ok) {
    console.error('Contact email delivery failed', { status: resendResponse.status, requestId: resendResponse.headers.get('x-request-id') || undefined });
    return json({ ok: false, code: 'email_delivery_failed' }, 502);
  }
  return json({ ok: true }, 202);
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      allow: 'GET, POST, OPTIONS',
      'cache-control': 'no-store, max-age=0',
      'x-content-type-options': 'nosniff'
    }
  });
}
