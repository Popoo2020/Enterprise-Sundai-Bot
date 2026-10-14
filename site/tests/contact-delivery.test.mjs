import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import worker from '../../worker.js';

const root = path.resolve(import.meta.dirname, '../..');
const config = JSON.parse(await readFile(path.join(root, 'wrangler.jsonc'), 'utf8'));
const env = {
  ...config.vars,
  TURNSTILE_SITE_KEY: 'test-public-key',
  TURNSTILE_SECRET_KEY: 'test-secret',
  RESEND_API_KEY: 're_test_only_never_send'
};
let counter = 0;
const fresh = () => import(`../functions/api/contact.js?delivery-test=${++counter}`);
const enquiry = () => new Request('https://sundaibot.com/api/contact', {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin: 'https://sundaibot.com', 'cf-connecting-ip': '192.0.2.42' },
  body: JSON.stringify({ name: 'Delivery Test', email: 'reader@example.invalid', organisation: 'Test only',
    message: 'Synthetic contact test. No actual email should be sent.', website: '',
    startedAt: String(Date.now() - 5000), turnstileToken: 'test-token' })
});

test('deployment config fixes the intended recipient without embedding credentials', () => {
  assert.equal(config.vars.CONTACT_TO_EMAIL, 'eririmo@protonmail.com');
  assert.equal(config.vars.CONTACT_FROM_EMAIL, 'SundAI Website <website@sundaibot.com>');
  assert.equal(config.keep_vars, true);
  assert.ok(config.compatibility_flags?.includes('global_fetch_strictly_public'));
  assert.equal(config.vars.RESEND_API_KEY, undefined);
  assert.equal(config.vars.TURNSTILE_SECRET_KEY, undefined);
});

test('accepted synthetic enquiry routes to the configured owner and replies to the visitor', async t => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options });
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      return Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' });
    }
    assert.equal(url, 'https://api.resend.com/emails');
    return Response.json({ id: 'synthetic-provider-id' });
  });
  const contact = await fresh();
  const response = await contact.onRequestPost({ request: enquiry(), env });
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true });
  const email = JSON.parse(calls[1].options.body);
  assert.deepEqual(email.to, ['eririmo@protonmail.com']);
  assert.equal(email.from, config.vars.CONTACT_FROM_EMAIL);
  assert.equal(email.reply_to, 'reader@example.invalid');
  assert.equal(calls[1].options.headers['user-agent'], 'SundAI-Website-Contact/1.0');
  assert.equal(calls[1].options.headers.authorization, 'Bearer re_test_only_never_send');
  assert.equal(calls.length, 2);
});

test('browser autofill in the legacy honeypot cannot silently discard a verified human enquiry', async t => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options });
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      return Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' });
    }
    assert.equal(url, 'https://api.resend.com/emails');
    return Response.json({ id: 'synthetic-provider-id' });
  });
  const contact = await fresh();
  const req = new Request('https://sundaibot.com/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://sundaibot.com', 'cf-connecting-ip': '192.0.2.99' },
    body: JSON.stringify({ name: 'Autofill Test', email: 'reader@example.invalid', organisation: 'Test only',
      message: 'A legitimate verified enquiry must not be discarded by browser autofill.', website: 'https://example.invalid',
      startedAt: String(Date.now() - 5000), turnstileToken: 'test-token' })
  });
  const response = await contact.onRequestPost({ request: req, env });
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, 'https://api.resend.com/emails');
});

test('transient provider transport failure retries once with the same idempotency key', async t => {
  let resendAttempts = 0;
  const idempotencyKeys = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      return Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' });
    }
    assert.equal(url, 'https://api.resend.com/emails');
    resendAttempts += 1;
    idempotencyKeys.push(options.headers['idempotency-key']);
    if (resendAttempts === 1) throw new TypeError('Synthetic transport failure');
    return Response.json({ id: 'synthetic-provider-id' });
  });
  const contact = await fresh();
  const response = await contact.onRequestPost({ request: enquiry(), env });
  assert.equal(response.status, 202);
  assert.equal(resendAttempts, 2);
  assert.equal(idempotencyKeys[0], idempotencyKeys[1]);
  assert.match(idempotencyKeys[0], /^sundai-contact-[0-9a-f]{64}$/i);
});

test('provider 5xx is retried once and can recover without duplicate logical sends', async t => {
  let resendAttempts = 0;
  const idempotencyKeys = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      return Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' });
    }
    resendAttempts += 1;
    idempotencyKeys.push(options.headers['idempotency-key']);
    if (resendAttempts === 1) return Response.json({ message: 'Synthetic upstream failure' }, { status: 503 });
    return Response.json({ id: 'synthetic-provider-id' });
  });
  const contact = await fresh();
  const response = await contact.onRequestPost({ request: enquiry(), env });
  assert.equal(response.status, 202);
  assert.equal(resendAttempts, 2);
  assert.equal(idempotencyKeys[0], idempotencyKeys[1]);
});

test('provider rejection returns precise safe error classes', async t => {
  let providerStatus = 403;
  t.mock.method(globalThis, 'fetch', async url => {
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      return Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' });
    }
    assert.equal(url, 'https://api.resend.com/emails');
    return Response.json({ message: 'Synthetic failure' }, { status: providerStatus });
  });
  const expected = new Map([
    [401, [503, 'email_provider_auth_failed']],
    [403, [503, 'email_provider_forbidden']],
    [422, [502, 'email_provider_rejected']],
    [429, [429, 'email_provider_rate_limited']],
    [500, [502, 'email_delivery_failed']]
  ]);
  for (const [status, [httpStatus, code]] of expected) {
    providerStatus = status;
    const contact = await fresh();
    const response = await contact.onRequestPost({ request: enquiry(), env });
    assert.equal(response.status, httpStatus);
    assert.deepEqual(await response.json(), { ok: false, code });
  }
});

test('provider key normalization removes harmless whitespace, wrapping quotes and Bearer prefix', async t => {
  const seenAuthorization = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      return Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' });
    }
    seenAuthorization.push(options.headers.authorization);
    return Response.json({ id: 'synthetic-provider-id' });
  });
  for (const key of [
    '  re_test_only_never_send  ',
    '"re_test_only_never_send"',
    "'re_test_only_never_send'",
    'Bearer re_test_only_never_send'
  ]) {
    const contact = await fresh();
    const response = await contact.onRequestPost({ request: enquiry(), env: { ...env, RESEND_API_KEY: key } });
    assert.equal(response.status, 202);
  }
  assert.deepEqual(seenAuthorization, Array(4).fill('Bearer re_test_only_never_send'));
});

test('missing provider key keeps public readiness unavailable without leaking settings', async () => {
  const contact = await fresh();
  const response = await contact.onRequestGet({ env: { ...env, RESEND_API_KEY: '' } });
  assert.equal(response.status, 503);
  const data = await response.json();
  assert.equal(data.available, false);
  assert.equal(data.CONTACT_TO_EMAIL, undefined);
  assert.equal(data.TURNSTILE_SECRET_KEY, undefined);
});

test('diagnostics and readiness both reject a non-empty malformed credential without exposing it', async t => {
  t.mock.method(globalThis, 'fetch', () => { throw new Error('Configuration failures must not call providers'); });
  for (const key of ['0ec58ced-example-key-id', 'Bearer not-an-api-key', 're_test\r\nInjected: value', '']) {
    const configured = { ...env, RESEND_API_KEY: key };
    const contact = await fresh();
    const readiness = await contact.onRequestGet({ env: configured });
    const diagnostics = await worker.fetch(new Request('https://sundaibot.com/api/contact-diagnostics'), configured);
    assert.equal(readiness.status, 503);
    assert.equal(diagnostics.status, 503);
    const data = await diagnostics.json();
    assert.equal(data.ok, false);
    assert.equal(data.checks.resendApiKey, false);
    assert.deepEqual(key ? data.invalid : data.missing, ['resendApiKey']);
    assert.equal(data.scope, 'configuration_only');
    assert.doesNotMatch(JSON.stringify(data), /not-an-api-key|Injected|test-secret|0ec58ced/);
    assert.equal((await contact.onRequestPost({ request: enquiry(), env: configured })).status, 503);
  }
});

test('diagnostics consistently accept the normalized key but do not claim delivery', async () => {
  const configured = { ...env, RESEND_API_KEY: '  "re_test_only_never_send"  ' };
  const contact = await fresh();
  assert.equal((await contact.onRequestGet({ env: configured })).status, 200);
  const response = await worker.fetch(new Request('https://sundaibot.com/api/contact-diagnostics'), configured);
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.ok, true);
  assert.deepEqual(data.invalid, []);
  assert.equal(data.scope, 'configuration_only');
});

test('a successful HTTP response without an email receipt never produces false success', async t => {
  let providerBody = '{}';
  const mock = t.mock.method(globalThis, 'fetch', async url => url.includes('siteverify')
    ? Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' })
    : new Response(providerBody, { status: 200 }));
  for (const body of ['{}', '{"id":null}', '<html>Unexpected response</html>', '{"id":""}']) {
    providerBody = body;
    const contact = await fresh();
    const response = await contact.onRequestPost({ request: enquiry(), env });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, false);
  }
  assert.equal(mock.mock.callCount(), 12);
});

test('retrying a form with a new challenge reuses its send key; changed enquiry gets a new key', async t => {
  const keys = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (url.includes('siteverify')) return Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' });
    keys.push(options.headers['idempotency-key']);
    assert.equal(options.redirect, 'error');
    return Response.json({ id: 'synthetic-provider-id' });
  });
  const body = await enquiry().json();
  for (const update of [{}, { turnstileToken: 'fresh-token' }, { message: 'A different enquiry with a different business question.' }]) {
    const contact = await fresh();
    const req = new Request(enquiry(), { body: JSON.stringify({ ...body, ...update }) });
    assert.equal((await contact.onRequestPost({ request: req, env })).status, 202);
  }
  assert.equal(keys[0], keys[1]);
  assert.notEqual(keys[1], keys[2]);
});

test('all thirty-six shipped request forms load the protected client and provide direct-email and privacy fallbacks', async () => {
  const pages = [];
  const coverage = new Set();
  async function walk(dir) {
    for (const item of await readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, item.name);
      if (item.isDirectory()) await walk(file);
      else if (item.name.endsWith('.html')) {
        const html = await readFile(file, 'utf8');
        if (/<form\b[^>]*\bdata-upgrade-form\b/.test(html)) {
          assert.match(html, /<script\b[^>]*defer[^>]*src="\/assets\/upgrade-forms\.js[?"]/);
          const lang = html.match(/<html\b[^>]*lang="(en|da|sv)"/)?.[1];
          for (const [form] of html.matchAll(/<form\b[^>]*\bdata-upgrade-form\b[\s\S]*?<\/form>/g)) {
            const kind = form.match(/data-kind="(booking|join|training|enquiry)"/)?.[1];
            assert.ok(lang && kind, file);
            const service = html.includes('data-page-kind="service"');
            const selectedInterest = form.match(/<option\b[^>]*value="([^"]+)"[^>]*selected/)?.[1];
            const growth = html.match(/data-page-kind="(decision-review|security-assessment)"/)?.[1];
    const key = `${lang}:${kind}${service ? ':' + selectedInterest : growth ? ':growth-' + growth : ''}`;
            if (service) {
              assert.equal(kind, 'enquiry', file);
              assert.ok(selectedInterest, `${file}: selected product`);
              assert.match(form, /<input\b[^>]*name="organisation"[^>]*required/);
              assert.match(form, /<(?:input|textarea)\b[^>]*name="product"[^>]*required/);
              assert.match(form, /name="team"/);
            }
            assert.ok(!coverage.has(key), `Duplicate form ${key}`);
            coverage.add(key);
            assert.match(form, /<noscript>[\s\S]*?<a\b[^>]*href="mailto:eririmo@protonmail\.com"/);
            assert.match(form, /href="\/(?:privacy\.html|da\/privatliv\.html|sv\/integritet\.html)"/);
            assert.match(form, /data-form-status[^>]*role="status"[^>]*aria-live="polite"/);
          }
          pages.push(path.relative(root, file));
        }
      }
    }
  }
  await walk(path.join(root, 'site'));
  assert.equal(pages.length, 36);
  assert.equal(coverage.size, 36);
  for (const lang of ['en', 'da', 'sv']) for (const kind of ['booking', 'join', 'training', 'enquiry']) assert.ok(coverage.has(`${lang}:${kind}`));
  for (const lang of ['en', 'da', 'sv']) assert.equal([...coverage].filter(key => key.startsWith(`${lang}:enquiry:`) && !key.includes(':growth-')).length, 6);
});

test('company, team and product context survives delivery and HTML-like content is escaped', async t => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options });
    if (url.includes('siteverify')) return Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' });
    return Response.json({ id: 'synthetic-provider-id' });
  });
  const body = await enquiry().json();
  body.organisation = 'Example <script>Org</script>';
  body.message = 'Service enquiry\nInterest: secure-ai-automation\nTeam: Finance & operations\nProduct or workflow: <img src=x onerror=alert(1)>Invoice routing\n\nPlease quote a workflow tailored to our organisation.';
  const contact = await fresh();
  const req = new Request(enquiry(), { body: JSON.stringify(body) });
  const response = await contact.onRequestPost({ request: req, env });
  assert.equal(response.status, 202);
  const email = JSON.parse(calls[1].options.body);
  for (const token of [body.organisation, 'secure-ai-automation', 'Finance & operations', '<img src=x onerror=alert(1)>Invoice routing']) assert.ok(email.text.includes(token));
  assert.match(email.html, /Example &lt;script&gt;Org&lt;\/script&gt;/);
  assert.match(email.html, /Finance &amp; operations/);
  assert.match(email.html, /&lt;img src=x onerror=alert\(1\)&gt;Invoice routing/);
  assert.doesNotMatch(email.html, /<script>|<img\b/);
  assert.deepEqual(await response.json(), { ok: true });
});

test('proposal context obeys server message bounds and rejects forged price fields before provider contact', async t => {
  const mock = t.mock.method(globalThis, 'fetch', () => { throw new Error('Invalid proposals must not contact providers'); });
  for (const [patch, code] of [[{ message: 'Service enquiry\nTeam: ' + 'T'.repeat(3000) }, 'invalid_message'], [{ total: 1 }, 'unexpected_fields']]) {
    const body = { ...await enquiry().json(), ...patch };
    const contact = await fresh();
    const request = new Request(enquiry(), { body: JSON.stringify(body) });
    const response = await contact.onRequestPost({ request, env });
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { ok: false, code });
  }
  assert.equal(mock.mock.callCount(), 0);
});
