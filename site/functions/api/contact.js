const MAX_BODY_BYTES = 12_000;
const BODY_READ_TIMEOUT_MS = 5_000;
const MAX_RATE_KEYS = 10_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
const ALLOWED_FIELDS = new Set(['name', 'email', 'organisation', 'message', 'website', 'startedAt', 'turnstileToken']);
const localRateState = new Map();
let nextRateCleanup = 0;

const responseHeaders = {
  'cache-control': 'no-store, max-age=0',
  'content-type': 'application/json; charset=utf-8',
  'referrer-policy': 'no-referrer',
  'x-content-type-options': 'nosniff',
  'x-robots-tag': 'noindex, nofollow',
  'content-security-policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
  'x-frame-options': 'DENY',
  'cross-origin-resource-policy': 'same-origin'
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
const normalizeApiKey = (value) => {
  let key = String(value || '').trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }
  return key.replace(/^Bearer\s+/i, '').trim();
};
const validResendApiKey = (value) => /^re_[A-Za-z0-9_-]+$/.test(normalizeApiKey(value));


const withTimeout = async (url, options, timeoutMs, readResponse = response => response) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), timeoutMs);
  try {
    return await readResponse(await fetch(url, { ...options, redirect: 'error', signal: controller.signal }));
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
  if (now >= nextRateCleanup) {
    for (const [storedKey, value] of localRateState) {
      if (value.resetAt <= now) localRateState.delete(storedKey);
    }
    nextRateCleanup = now + 60_000;
  }
  const current = localRateState.get(key);
  if (!current && localRateState.size >= MAX_RATE_KEYS) {
    return { allowed: false, retryAfter: 60 };
  }
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
    const marker = new Response(null, {
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
  // Trust only Cloudflare's edge-provided address, never client-supplied forwarding headers.
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const key = `contact:${ip}`;

  if (env.CONTACT_RATE_LIMITER && typeof env.CONTACT_RATE_LIMITER.limit === 'function') {
    try {
      const result = await env.CONTACT_RATE_LIMITER.limit({ key });
      if (!result.success) return { allowed: false, retryAfter: RATE_LIMIT_WINDOW_SECONDS };
    } catch {
      return { allowed: false, unavailable: true };
    }
  }

  const local = checkLocalRateLimit(key);
  if (!local.allowed) return local;
  const edge = await checkEdgeCacheRateLimit(request, key);
  return edge.allowed ? local : edge;
};

const verifyTurnstile = async ({ request, env, token }) => {
  const secret = String(env.TURNSTILE_SECRET_KEY || '').trim();
  if (!secret || !String(env.TURNSTILE_SITE_KEY || '').trim()) {
    console.error('Turnstile configuration is incomplete');
    return { enabled: false, success: false, code: 'turnstile_unavailable' };
  }
  if (!token || token.length > 2048) return { enabled: true, success: false, code: 'turnstile_required' };

  const remoteIp = request.headers.get('cf-connecting-ip') || '';
  const idempotencyKey = crypto.randomUUID();
  const payload = new URLSearchParams({
    secret,
    response: token,
    idempotency_key: idempotencyKey
  });
  if (remoteIp) payload.set('remoteip', remoteIp);

  const verifyOnce = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort('timeout'), 10_000);
    try {
      const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
        signal: controller.signal
      });
      if (!response.ok) {
        const error = new Error('siteverify_http_error');
        error.status = response.status;
        throw error;
      }
      const result = await response.json();
      if (!result || typeof result !== 'object' || Array.isArray(result)) throw new Error('invalid_verification');
      return result;
    } finally {
      clearTimeout(timer);
    }
  };

  let result;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      result = await verifyOnce();
    } catch (error) {
      const numericStatus = Number(error?.status || 0);
      console.error('Turnstile Siteverify request failed', {
        attempt,
        status: Number.isInteger(numericStatus) && numericStatus >= 400 && numericStatus <= 599 ? numericStatus : undefined
      });
      if (attempt < 2) continue;
      return { enabled: true, success: false, code: 'turnstile_unavailable' };
    }

    const errorCodes = Array.isArray(result['error-codes'])
      ? result['error-codes'].map(value => String(value))
      : [];
    if (result.success === true || !errorCodes.includes('internal-error')) break;
    console.error('Turnstile Siteverify returned internal-error', { attempt });
    if (attempt === 2) return { enabled: true, success: false, code: 'turnstile_unavailable' };
  }

  const allowedHostnames = String(env.TURNSTILE_ALLOWED_HOSTNAMES || 'sundaibot.com,www.sundaibot.com')
    .split(',')
    .map(value => value.trim().toLowerCase())
    .filter(Boolean);
  const hostnameAllowed = typeof result.hostname === 'string' && allowedHostnames.includes(result.hostname.toLowerCase());
  const actionAllowed = result.action === 'contact';
  const errorCodes = Array.isArray(result['error-codes'])
    ? result['error-codes'].map(value => String(value))
    : [];

  if (result.success !== true) {
    if (errorCodes.includes('invalid-input-secret') || errorCodes.includes('missing-input-secret') || errorCodes.includes('internal-error')) {
      console.error('Turnstile Siteverify rejected server configuration or was unavailable', {
        invalidSecret: errorCodes.includes('invalid-input-secret') || errorCodes.includes('missing-input-secret'),
        internalError: errorCodes.includes('internal-error')
      });
      return { enabled: true, success: false, code: 'turnstile_unavailable' };
    }
    return { enabled: true, success: false, code: 'turnstile_invalid' };
  }

  return {
    enabled: true,
    success: hostnameAllowed && actionAllowed,
    code: hostnameAllowed && actionAllowed ? 'ok' : 'turnstile_context_invalid'
  };
};

const parseJsonBody = async (request) => {
  const contentType = String(request.headers.get('content-type') || '').toLowerCase();
  if (!/^application\/json(?:\s*;|$)/.test(contentType)) {
    return { error: json({ ok: false, code: 'unsupported_media_type' }, 415) };
  }

  const advertisedLength = Number(request.headers.get('content-length') || 0);
  if (advertisedLength > MAX_BODY_BYTES) return { error: json({ ok: false, code: 'payload_too_large' }, 413) };

  // Enforce the limit while streaming, including requests with no Content-Length.
  if (!request.body) return { error: json({ ok: false, code: 'invalid_body' }, 400) };
  const reader = request.body.getReader();
  const chunks = [];
  let bytes = 0;
  let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('body_timeout')), BODY_READ_TIMEOUT_MS);
  });
  let buffer;
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => {});
        return { error: json({ ok: false, code: 'payload_too_large' }, 413) };
      }
      chunks.push(value);
    }
    buffer = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
  } catch (error) {
    void reader.cancel().catch(() => {});
    const timedOut = error.message === 'body_timeout';
    return { error: json({ ok: false, code: timedOut ? 'body_timeout' : 'invalid_body' }, timedOut ? 408 : 400) };
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }

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
  if (keys.some(key => key === 'startedAt'
    ? !['string', 'number'].includes(typeof body[key])
    : typeof body[key] !== 'string')) {
    return { error: json({ ok: false, code: 'invalid_field_type' }, 400) };
  }
  return { body };
};

const validateSameOrigin = (request) => {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (origin !== requestUrl.origin) return false;
    } catch {
      return false;
    }
  }
  const fetchSite = request.headers.get('sec-fetch-site');
  return !fetchSite || fetchSite === 'same-origin' || fetchSite === 'none';
};

export async function onRequestGet({ env }) {
  const siteKey = String(env.TURNSTILE_SITE_KEY || '').trim();
  const secretConfigured = Boolean(String(env.TURNSTILE_SECRET_KEY || '').trim());
  const enabled = Boolean(siteKey && secretConfigured);
  const available = Boolean(enabled && validResendApiKey(env.RESEND_API_KEY) && String(env.CONTACT_TO_EMAIL || '').trim() && String(env.CONTACT_FROM_EMAIL || '').trim());
  return json({ available, enabled, siteKey: enabled ? siteKey : '', action: 'contact' }, available ? 200 : 503);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!validateSameOrigin(request)) return json({ ok: false, code: 'origin_not_allowed' }, 403);

  const limited = await enforceRateLimit(request, env);
  if (limited.unavailable) return json({ ok: false, code: 'contact_unavailable' }, 503);
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
  const startedAt = Number(body.startedAt || 0);
  const turnstileToken = singleLine(body.turnstileToken || '');

  if (!Number.isFinite(startedAt) || !startedAt || Date.now() - startedAt < 1500 || Date.now() - startedAt > 24 * 60 * 60 * 1000) return json({ ok: false, code: 'invalid_form_timing' }, 400);
  if (name.length < 2 || name.length > 100) return json({ ok: false, code: 'invalid_name' }, 400);
  if (!validEmail(email) || email.length > 200) return json({ ok: false, code: 'invalid_email' }, 400);
  if (organisation.length > 150) return json({ ok: false, code: 'invalid_organisation' }, 400);
  if (message.length < 20 || message.length > 3000) return json({ ok: false, code: 'invalid_message' }, 400);

  const turnstile = await verifyTurnstile({ request, env, token: turnstileToken });
  if (!turnstile.success) {
    const status = turnstile.code === 'turnstile_unavailable' ? 503 : 403;
    return json({ ok: false, code: turnstile.code }, status);
  }

  const apiKey = normalizeApiKey(env.RESEND_API_KEY);
  const to = String(env.CONTACT_TO_EMAIL || '').trim();
  const from = String(env.CONTACT_FROM_EMAIL || '').trim();
  if (!validResendApiKey(apiKey) || !to || !from) {
    console.error('Contact service configuration is incomplete');
    return json({ ok: false, code: 'contact_unavailable' }, 503);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeOrganisation = escapeHtml(organisation || 'Not provided');
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');

  const resendPayload = {
    from,
    to: [to],
    reply_to: email,
    subject: `SundAI website enquiry — ${name}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto"><h1>New SundAI enquiry</h1><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Organisation:</strong> ${safeOrganisation}</p><hr><p>${safeMessage}</p></div>`,
    text: `New SundAI enquiry\n\nName: ${name}\nEmail: ${email}\nOrganisation: ${organisation || 'Not provided'}\n\n${message}`
  };
  const resendIdempotencyKey = `sundai-contact-${crypto.randomUUID()}`;
  let resendResponse = null;
  let providerFailure = '';

  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort('timeout'), 12_000);
    try {
      resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${apiKey}`,
          'content-type': 'application/json',
          accept: 'application/json',
          'user-agent': 'SundAI-Website-Contact/1.0',
          'idempotency-key': resendIdempotencyKey
        },
        body: JSON.stringify(resendPayload),
        signal: controller.signal
      });
      if (resendResponse.ok) break;
      if (attempt < 2 && resendResponse.status >= 500) {
        console.error('Contact email provider returned a retryable server error', { attempt, status: resendResponse.status });
        continue;
      }
      break;
    } catch (error) {
      const timedOut = controller.signal.aborted || error?.name === 'AbortError';
      providerFailure = timedOut ? 'timeout' : 'unavailable';
      console.error('Contact email provider request failed', { attempt, timedOut });
      resendResponse = null;
      if (attempt < 2) continue;
    } finally {
      clearTimeout(timer);
    }
  }

  if (!resendResponse) {
    const code = providerFailure === 'timeout' ? 'email_provider_timeout' : 'email_provider_unavailable';
    return json({ ok: false, code }, providerFailure === 'timeout' ? 504 : 503);
  }

  if (!resendResponse.ok) {
    const providerStatus = resendResponse.status;
    console.error('Contact email delivery failed', {
      status: providerStatus,
      requestId: resendResponse.headers.get('x-request-id') || undefined
    });
    if (providerStatus === 401) return json({ ok: false, code: 'email_provider_auth_failed' }, 503);
    if (providerStatus === 403) return json({ ok: false, code: 'email_provider_forbidden' }, 503);
    if (providerStatus === 429) return json({ ok: false, code: 'email_provider_rate_limited' }, 429, { 'retry-after': '60' });
    if (providerStatus === 400 || providerStatus === 422) return json({ ok: false, code: 'email_provider_rejected' }, 502);
    return json({ ok: false, code: 'email_delivery_failed' }, 502);
  }
  return json({ ok: true }, 202);
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { ...responseHeaders, allow: 'GET, HEAD, POST, OPTIONS' }
  });
}

export function onRequest() {
  return json({ ok: false, code: 'method_not_allowed' }, 405, { allow: 'GET, HEAD, POST, OPTIONS' });
}
