import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const config = JSON.parse(await readFile(path.join(root, 'wrangler.jsonc'), 'utf8'));
const env = {
  ...config.vars,
  TURNSTILE_SITE_KEY: 'test-public-key',
  TURNSTILE_SECRET_KEY: 'test-secret',
  RESEND_API_KEY: 'test-only-never-send'
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

test('provider rejection never reports successful form delivery', async t => {
  let providerStatus = 403;
  t.mock.method(globalThis, 'fetch', async url => {
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      return Response.json({ success: true, hostname: 'sundaibot.com', action: 'contact' });
    }
    assert.equal(url, 'https://api.resend.com/emails');
    return Response.json({ message: 'Synthetic failure' }, { status: providerStatus });
  });
  for (const status of [401, 403, 422, 429, 500]) {
    providerStatus = status;
    const contact = await fresh();
    const response = await contact.onRequestPost({ request: enquiry(), env });
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { ok: false, code: 'email_delivery_failed' });
  }
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

test('every shipped contact-form page loads the shared direct-email fallback script', async () => {
  const pages = [];
  async function walk(dir) {
    for (const item of await readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, item.name);
      if (item.isDirectory()) await walk(file);
      else if (item.name.endsWith('.html')) {
        const html = await readFile(file, 'utf8');
        if (/<form\b[^>]*\bdata-contact-form\b/.test(html)) {
          assert.match(html, /<script\b[^>]*src="\/assets\/brand-navigation\.js[?"]/);
          pages.push(path.relative(root, file));
        }
      }
    }
  }
  await walk(path.join(root, 'site'));
  assert.ok(pages.length >= 6, `Expected home and enquiry forms in three languages; got ${pages.length}`);
});
