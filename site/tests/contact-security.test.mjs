import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../../worker.js';

const env = {
  TURNSTILE_SITE_KEY: 'test-public-key', TURNSTILE_SECRET_KEY: 'test-secret',
  RESEND_API_KEY: 'test-email-key', CONTACT_TO_EMAIL: 'owner@example.invalid',
  CONTACT_FROM_EMAIL: 'website@example.invalid'
};
const valid = () => ({ name: 'Test User', email: 'reader@example.invalid', organisation: '',
  message: 'Please discuss a suitable AI training session.', website: '',
  startedAt: String(Date.now() - 5000), turnstileToken: 'test-token' });
const request = (body = valid(), headers = {}) => new Request('https://sundaibot.com/api/contact', {
  method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://sundaibot.com',
    'cf-connecting-ip': '192.0.2.1', ...headers }, body: JSON.stringify(body)
});
let moduleId = 0;
const fresh = () => import(`../functions/api/contact.js?case=${++moduleId}`);
const rejectNetwork = t => t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected network request'); });

test('valid enquiry verifies the challenge and safely escapes email content', async t => {
  const contact = await fresh();
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options });
    return Response.json(url.includes('siteverify')
      ? { success: true, hostname: 'sundaibot.com', action: 'contact' } : { id: 'test' });
  });
  const body = { ...valid(), name: 'Test\r\nBcc: reader', message: '<img src=x onerror=alert(1)> Please discuss AI training.' };
  const response = await contact.onRequestPost({ request: request(body), env });
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
  assert.equal(calls[1].url, 'https://api.resend.com/emails');
  const email = JSON.parse(calls[1].options.body);
  assert.doesNotMatch(email.subject, /[\r\n]/);
  assert.doesNotMatch(email.html, /<img/);
  assert.match(email.html, /&lt;img/);
  assert.deepEqual(email.to, ['owner@example.invalid']);
});

test('missing or partial security/email configuration cannot send a message', async t => {
  const network = rejectNetwork(t);
  for (const configured of [{}, { ...env, TURNSTILE_SECRET_KEY: '' }, { ...env, TURNSTILE_SITE_KEY: '' }]) {
    const contact = await fresh();
    const config = await contact.onRequestGet({ env: configured });
    assert.equal(config.status, 503);
    assert.equal((await config.json()).available, false);
    const response = await contact.onRequestPost({ request: request(), env: configured });
    assert.equal(response.status, 503);
  }
  const contact = await fresh();
  const config = await contact.onRequestGet({ env: { ...env, RESEND_API_KEY: '' } });
  assert.equal(config.status, 503);
  assert.equal(network.mock.callCount(), 0);
});

test('cross-origin, HTTP-origin and sibling-site browser requests are rejected', async t => {
  const network = rejectNetwork(t);
  for (const headers of [
    { origin: 'https://attacker.example' }, { origin: 'http://sundaibot.com' },
    { origin: 'null' }, { origin: 'https://sundaibot.com.evil.example' },
    { 'sec-fetch-site': 'cross-site' }, { 'sec-fetch-site': 'same-site' }
  ]) {
    const contact = await fresh();
    assert.equal((await contact.onRequestPost({ request: request(valid(), headers), env })).status, 403);
  }
  assert.equal(network.mock.callCount(), 0);
});

test('malformed bodies, unexpected fields and invalid field types are rejected', async t => {
  const network = rejectNetwork(t);
  for (const body of [[], null, { ...valid(), extra: 'x' }, { ...valid(), name: {} },
    { ...valid(), message: ['not a string'] }, { ...valid(), startedAt: [] },
    { ...valid(), startedAt: 'NaN' }]) {
    const contact = await fresh();
    assert.equal((await contact.onRequestPost({ request: request(body), env })).status, 400);
  }
  const contact = await fresh();
  assert.equal((await contact.onRequestPost({ request: request(valid(), { 'content-type': 'text/plain' }), env })).status, 415);
  assert.equal((await contact.onRequestPost({ request: request(valid(), { 'content-length': '12001' }), env })).status, 413);
  assert.equal(network.mock.callCount(), 0);
});

test('streaming payload limit cancels an oversized body without buffering the rest', async t => {
  rejectNetwork(t);
  const contact = await fresh();
  let reads = 0, cancelled = false;
  const stream = new ReadableStream({
    pull(controller) { reads++; controller.enqueue(new Uint8Array(7000)); },
    cancel() { cancelled = true; }
  }, { highWaterMark: 0 });
  const req = new Request('https://sundaibot.com/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: stream, duplex: 'half'
  });
  assert.equal((await contact.onRequestPost({ request: req, env })).status, 413);
  assert.equal(cancelled, true);
  assert.equal(reads, 2);
});

test('a stalled body is cancelled at the read deadline', async t => {
  rejectNetwork(t);
  const contact = await fresh();
  let cancelled = false;
  const stream = new ReadableStream({ cancel() { cancelled = true; } });
  const req = new Request('https://sundaibot.com/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: stream, duplex: 'half'
  });
  assert.equal((await contact.onRequestPost({ request: req, env })).status, 408);
  assert.equal(cancelled, true);
});

test('Turnstile must return true with the expected hostname and action', async t => {
  let verification;
  const network = t.mock.method(globalThis, 'fetch', async url => {
    assert.match(url, /siteverify$/);
    return Response.json(verification);
  });
  for (const result of [
    { success: true }, { success: true, hostname: 'sundaibot.com' },
    { success: true, hostname: 'evil.example', action: 'contact' },
    { success: true, hostname: 'sundaibot.com', action: 'other' },
    { success: 'true', hostname: 'sundaibot.com', action: 'contact' },
    { success: false, hostname: 'sundaibot.com', action: 'contact' }
  ]) {
    verification = result;
    const contact = await fresh();
    assert.equal((await contact.onRequestPost({ request: request(), env })).status, 403);
  }
  assert.equal(network.mock.callCount(), 6);
});

test('invalid verification JSON and provider failures return controlled errors', async t => {
  const network = t.mock.method(globalThis, 'fetch', async () => new Response('not JSON'));
  let contact = await fresh();
  assert.equal((await contact.onRequestPost({ request: request(), env })).status, 503);
  network.mock.mockImplementation(async () => { throw new Error('Provider unreachable'); });
  contact = await fresh();
  assert.equal((await contact.onRequestPost({ request: request(), env })).status, 503);
});

test('local rate limiting cannot be bypassed with X-Forwarded-For', async t => {
  rejectNetwork(t);
  const contact = await fresh();
  for (let i = 0; i < 6; i++) {
    const req = request({}, { 'x-forwarded-for': `192.0.2.${i}` });
    req.headers.delete('cf-connecting-ip');
    const response = await contact.onRequestPost({ request: req, env });
    assert.equal(response.status, i < 5 ? 400 : 429);
    if (i === 5) assert.ok(Number(response.headers.get('retry-after')) > 0);
  }
});

test('edge cache rate markers survive fresh function isolates', async t => {
  rejectNetwork(t);
  const markers = new Map();
  const original = Object.getOwnPropertyDescriptor(globalThis, 'caches');
  Object.defineProperty(globalThis, 'caches', { configurable: true, value: { default: {
    async match(key) { return markers.get(key.url)?.clone(); },
    async put(key, value) { markers.set(key.url, value.clone()); }
  } } });
  t.after(() => original ? Object.defineProperty(globalThis, 'caches', original) : delete globalThis.caches);
  for (let i = 0; i < 6; i++) {
    const contact = await fresh();
    assert.equal((await contact.onRequestPost({ request: request({}), env })).status, i < 5 ? 400 : 429);
  }
  assert.equal(markers.size, 1);
});

test('rate limiter service failure does not bypass protection', async t => {
  const network = rejectNetwork(t);
  const contact = await fresh();
  const configured = { ...env, CONTACT_RATE_LIMITER: { limit() { throw new Error('Unavailable'); } } };
  assert.equal((await contact.onRequestPost({ request: request(), env: configured })).status, 503);
  assert.equal(network.mock.callCount(), 0);
});

test('Worker routes API methods, sends API security headers and preserves static assets', async t => {
  rejectNetwork(t);
  for (const method of ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']) {
    const response = await worker.fetch(new Request('https://sundaibot.com/api/contact', { method }), env);
    assert.equal(response.status, ['DELETE', 'PUT'].includes(method) ? 405 : method === 'OPTIONS' ? 204 : 200);
    assert.match(response.headers.get('cache-control'), /no-store/);
    assert.equal(response.headers.get('x-frame-options'), 'DENY');
    assert.match(response.headers.get('content-security-policy'), /default-src 'none'/);
    if (method === 'HEAD') assert.equal(await response.text(), '');
    if (method === 'GET') {
      const config = await response.json();
      assert.equal(config.available, true);
      assert.doesNotMatch(JSON.stringify(config), /test-secret|test-email-key|owner@example/);
    }
  }
  assert.equal((await worker.fetch(new Request('https://sundaibot.com/api/missing'), env)).status, 404);
  const response = await worker.fetch(new Request('https://sundaibot.com/'), {
    ASSETS: { fetch: () => new Response('Static page') }
  });
  assert.equal(await response.text(), 'Static page');
});
