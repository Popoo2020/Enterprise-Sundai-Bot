import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const script = await readFile(new URL('../assets/upgrade-forms.js', import.meta.url), 'utf8');

function harness({ lang = 'en', kind = 'booking', result = { status: 202, body: { ok: true } }, available = true } = {}) {
  const handlers = new Map(), calls = [], metrics = [];
  let clock = 10000, widgetOptions, resets = 0;
  const fields = { name: 'Test Person', email: 'test@example.test', organisation: 'Example', message: 'Please discuss a workflow for our organisation.', timezone: 'Europe/Copenhagen', portfolio: 'https://example.test/work', interest: 'Automation', team: '', product: '' };
  const validity = {};
  const fieldNode = name => ({ setCustomValidity(text) { validity[name] = text; } });
  const nodes = Object.fromEntries(Object.keys(fields).map(name => [name, fieldNode(name)]));
  const node = () => ({ dataset: {}, setAttribute() {}, appendChild() {}, before() {}, hidden: false, textContent: '' });
  const status = node(), button = node(), challenge = node();
  const form = {
    dataset: { kind },
    querySelector(selector) {
      if (selector === '[data-form-status]') return status;
      if (selector === '[data-turnstile]') return challenge;
      if (selector === 'button[type="submit"]') return button;
      return nodes[selector.match(/name="([^"]+)"/)?.[1]];
    },
    appendChild() {}, setAttribute() {},
    reportValidity() { return !Object.values(validity).some(Boolean); },
    addEventListener(name, callback) { handlers.set(name, callback); }
  };
  const response = (status, body) => ({ status, ok: status >= 200 && status < 300, async json() { return body; } });
  const window = {
    turnstile: {
      render(_, options) { widgetOptions = options; options.callback('test-challenge-token'); return 1; },
      reset() { resets++; }
    },
    dispatchEvent(event) { metrics.push(event); }
  };
  const document = { documentElement: { lang }, querySelectorAll() { return [form]; }, createElement: node, head: { appendChild() {} } };
  vm.runInNewContext(script, {
    document, window, URL, Intl, AbortController, setTimeout, clearTimeout,
    Date: { now: () => clock },
    FormData: class { getAll(name) { return fields[name] === undefined ? [] : [fields[name]]; } },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    async fetch(url, options) {
      calls.push({ url, options });
      if (options.method !== 'POST') return response(available ? 200 : 503, { available, enabled: available, siteKey: available ? 'public-site-key' : '', action: 'contact' });
      if (typeof result === 'function') return result(response);
      return response(result.status, result.body);
    }
  });
  clock += 5000;
  return {
    calls, metrics, fields, status, button, form, window,
    submit: () => handlers.get('submit')({ preventDefault() {} }),
    focus: () => handlers.get('focusin')(),
    edit: name => handlers.get('input')({ target: nodes[name] }),
    token: () => widgetOptions.callback('refreshed-token'),
    resetCount: () => resets,
    options: () => widgetOptions
  };
}

test('no preflight until interaction; request uses the existing API and exact legacy fields', async () => {
  const h = harness();
  assert.equal(h.calls.length, 0);
  await h.submit();
  assert.equal(h.calls.length, 2);
  assert.ok(h.calls.every(call => call.url === '/api/contact'));
  const sent = JSON.parse(h.calls[1].options.body);
  assert.deepEqual(Object.keys(sent).sort(), ['email', 'message', 'name', 'organisation', 'startedAt', 'turnstileToken'].sort());
  assert.match(sent.message, /Free 20-minute call request — awaiting confirmation/);
  assert.match(sent.message, /IANA time zone: Europe\/Copenhagen/);
  assert.match(sent.message, /Portfolio: https:\/\/example.test\/work/);
  assert.equal(h.options().action, 'contact');
  assert.equal(h.options().theme, 'dark');
  assert.match(h.status.textContent, /Awaiting confirmation: no appointment is booked yet/);
  assert.equal(h.metrics.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(h.metrics[0].detail)), { event: 'enquiry_submitted' });
  assert.equal(h.button.disabled, false);
  assert.equal(h.fields.message, 'Please discuss a workflow for our organisation.');
  h.token();
  assert.match(h.status.textContent, /Awaiting confirmation/);
  await h.submit();
  assert.equal(h.calls.length, 2, 'same successful request is not submitted twice');
});

test('unavailable security configuration fails closed without sending or metrics', async () => {
  const h = harness({ available: false });
  await h.submit();
  assert.equal(h.calls.length, 1);
  assert.match(h.status.textContent, /unavailable/);
  assert.equal(h.metrics.length, 0);
  assert.equal(h.button.disabled, undefined);
});

test('ambiguous acceptance, malformed receipt, and rate limits preserve input and emit no success', async () => {
  for (const result of [{ status: 200, body: { ok: true } }, { status: 202, body: { ok: false } }, { status: 503, body: { code: 'email_provider_timeout' } }, { status: 429, body: { code: 'rate_limited' } }]) {
    const h = harness({ result });
    await h.submit();
    assert.equal(h.metrics.length, 0);
    assert.match(h.status.textContent, result.status === 429 ? /Too many/ : /could not verify/);
    assert.equal(h.resetCount(), 1);
    assert.equal(h.fields.message, 'Please discuss a workflow for our organisation.');
    assert.equal(h.button.disabled, false);
  }
});

test('retry refreshes the token and preserves server idempotency inputs', async () => {
  let count = 0;
  const h = harness({ result: response => ++count === 1 ? response(504, { code: 'email_provider_timeout' }) : response(202, { ok: true }) });
  await h.submit();
  h.token();
  await h.submit();
  const attempts = h.calls.filter(call => call.options.method === 'POST').map(call => JSON.parse(call.options.body));
  assert.equal(attempts.length, 2);
  assert.equal(attempts[0].startedAt, attempts[1].startedAt);
  assert.equal(attempts[0].message, attempts[1].message);
  assert.notEqual(attempts[0].turnstileToken, attempts[1].turnstileToken);
  assert.equal(h.metrics.length, 1);
});

test('simultaneous submissions issue only one provider request', async () => {
  let finish;
  const h = harness({ result: response => new Promise(resolve => { finish = () => resolve(response(202, { ok: true })); }) });
  const first = h.submit(), second = h.submit();
  for (let i = 0; i < 10 && !finish; i++) await Promise.resolve();
  assert.equal(h.button.disabled, true);
  assert.equal(h.calls.filter(call => call.options.method === 'POST').length, 1);
  finish();
  await Promise.all([first, second]);
  assert.equal(h.metrics.length, 1);
  assert.equal(h.button.disabled, false);
});

test('portfolio protocols, embedded credentials, invalid time zones and oversized requests are rejected locally', async () => {
  for (const portfolio of ['javascript:alert(1)', 'data:text/html,test', 'file:///tmp/test', 'https://user:secret@example.test/cv']) {
    const h = harness(); h.fields.portfolio = portfolio;
    await h.submit();
    assert.match(h.status.textContent, /portfolio URL/);
    assert.equal(h.calls.length, 0);
  }
  const timezone = harness(); timezone.fields.timezone = 'Mars/Olympus';
  await timezone.submit(); assert.match(timezone.status.textContent, /IANA time zone/); assert.equal(timezone.calls.length, 0);
  const long = harness(); long.fields.message = 'A'.repeat(2990);
  await long.submit(); assert.match(long.status.textContent, /3,000/); assert.equal(long.calls.length, 0);
});

test('all Danish and Swedish status branches and request metadata use the chosen locale', async () => {
  for (const lang of ['da', 'sv']) {
    for (const kind of ['booking', 'join', 'training', 'enquiry']) {
      const h = harness({ lang, kind }); await h.submit();
      assert.doesNotMatch(h.status.textContent, /Your |Awaiting |request was|application was/);
      assert.equal(h.options().language, lang);
      assert.equal(h.metrics[0].detail.event, kind === 'join' ? 'freelancer_application_submitted' : 'enquiry_submitted');
      const sent = JSON.parse(h.calls[1].options.body);
      assert.match(sent.message, lang === 'da' ? /IANA-tidszone/ : /IANA-tidszon/);
    }
    const failed = harness({ lang, available: false }); await failed.submit();
    assert.doesNotMatch(failed.status.textContent, /unavailable|Your fields/);
  }
});

test('product proposals serialize the company, chosen service, team and product through the protected legacy contract', async () => {
  for (const lang of ['en', 'da', 'sv']) {
    const h = harness({ lang, kind: 'enquiry' });
    h.fields.organisation = 'Example company';
    h.fields.interest = 'secure-ai-automation';
    h.fields.team = 'Finance & operations';
    h.fields.product = '<img src=x onerror=alert(1)> Invoice routing';
    await h.submit();
    const sent = JSON.parse(h.calls[1].options.body);
    assert.deepEqual(Object.keys(sent).sort(), ['email', 'message', 'name', 'organisation', 'startedAt', 'turnstileToken'].sort());
    assert.equal(sent.organisation, h.fields.organisation);
    for (const value of [h.fields.interest, h.fields.team, h.fields.product, h.fields.message]) assert.ok(sent.message.includes(value), `${lang}: context missing ${value}`);
    assert.doesNotMatch(sent.message, /undefined:|\[object Object\]/);
    assert.equal(h.fields.product, '<img src=x onerror=alert(1)> Invoice routing');
    assert.equal(h.metrics.length, 1);
    assert.deepEqual(JSON.parse(JSON.stringify(h.metrics[0].detail)), { event: 'enquiry_submitted' }, 'Metrics contain no company or product data');
  }
});

test('failed proposal retries preserve all context and a changed product creates a new logical request', async () => {
  let count = 0;
  const h = harness({ kind: 'enquiry', result: response => ++count === 1 ? response(504, { code: 'email_provider_timeout' }) : response(202, { ok: true }) });
  h.fields.interest = 'private-ai-agents-rag';
  h.fields.team = 'Customer success';
  h.fields.product = 'Support knowledge base';
  await h.submit();
  assert.equal(h.fields.team, 'Customer success');
  assert.equal(h.fields.product, 'Support knowledge base');
  h.token();
  await h.submit();
  h.token();
  await h.submit();
  assert.equal(h.calls.filter(call => call.options.method === 'POST').length, 2, 'Successful duplicate context must not resend');
  h.fields.product = 'A different internal knowledge base';
  h.token();
  await h.submit();
  const sent = h.calls.filter(call => call.options.method === 'POST').map(call => JSON.parse(call.options.body));
  assert.equal(sent.length, 3);
  assert.equal(sent[0].message, sent[1].message);
  assert.notEqual(sent[1].message, sent[2].message);
  assert.equal(sent[0].startedAt, sent[2].startedAt);
  assert.match(sent[2].message, /A different internal knowledge base/);
});

test('product and team metadata count toward the complete request bound before any provider request', async () => {
  const h = harness({ kind: 'enquiry' });
  h.fields.message = 'M'.repeat(1800);
  h.fields.team = 'T'.repeat(800);
  h.fields.product = 'P'.repeat(800);
  await h.submit();
  assert.match(h.status.textContent, /3,000/);
  assert.equal(h.calls.length, 0);
  assert.equal(h.metrics.length, 0);
  assert.equal(h.fields.team.length, 800);
  assert.equal(h.fields.product.length, 800);
});
