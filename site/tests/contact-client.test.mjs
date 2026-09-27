import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const endpoint = 'https://formspree.io/f/mqpagzed';
const script = await readFile(new URL('assets/neon-compact.js', root), 'utf8');

async function pages(dir = root) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
    if (entry.isDirectory()) result.push(...await pages(url));
    else if (entry.name.endsWith('.html')) result.push(url);
  }
  return result;
}

test('all nine published contact forms use native POST, validation and the intended recipient endpoint', async () => {
  let count = 0;
  for (const url of await pages()) {
    const html = await readFile(url, 'utf8');
    for (const [form] of html.matchAll(/<form\b[^>]*data-contact-form[\s\S]*?<\/form>/g)) {
      count++;
      const tag = form.slice(0, form.indexOf('>') + 1);
      assert.ok(tag.includes(`action="${endpoint}"`), url.pathname);
      assert.match(tag, /method="post"/);
      assert.doesNotMatch(tag, /novalidate|data-success|onsubmit/);
      assert.match(form, /<input\b[^>]*name="name"[^>]*required/);
      assert.match(form, /<input\b[^>]*name="email"[^>]*type="email"[^>]*required/);
      assert.match(form, /<textarea\b[^>]*name="message"/);
      assert.match(form, /<button\b[^>]*type="submit"/);
      assert.doesNotMatch(form, /name="(?:website|startedAt|turnstileToken|_captcha)"|formaction=|formnovalidate/);
      assert.match(form, /Formspree/);
      assert.match(form, /href="\/(?:privacy\.html|da\/privatliv\.html|sv\/integritet\.html)"/);
      if (tag.includes('data-revenue-form')) {
        // Native submission must include user choices even without JavaScript.
        assert.match(form, /<select\b[^>]*name="service"[^>]*data-interest-select/);
        assert.match(form, /<textarea\b[^>]*name="details"[^>]*data-enquiry-details/);
      } else assert.match(form, /<textarea\b[^>]*name="message"[^>]*required/);
    }
  }
  assert.equal(count, 9);
  const headers = await readFile(new URL('_headers', root), 'utf8');
  assert.match(headers, /form-action 'self' https:\/\/formspree\.io;/);
});

test('shared UI leaves native submission alone and opening a contact dialog makes no API request', () => {
  const handlers = new Map();
  let opens = 0;
  const dialog = { showModal() { opens++; }, querySelector() { return null; }, addEventListener() {} };
  const openButton = { addEventListener(event, callback) { handlers.set(event, callback); } };
  const document = {
    styleSheets: [], documentElement: { lang: 'en' },
    head: { appendChild() {} }, createElement: () => ({}),
    querySelector: selector => selector === '[data-contact-dialog]' ? dialog : null,
    querySelectorAll: selector => selector === '[data-open-contact]' ? [openButton] : []
  };
  vm.runInNewContext(script, { document, fetch() { assert.fail('No legacy provider preflight'); } });
  handlers.get('click')();
  assert.equal(opens, 1);
  assert.doesNotMatch(script, /turnstile|fetch\(|preventDefault\(|form\.reset\(/i);
});

test('enquiry composition preserves selected service, details and attribution without cancelling submission', async () => {
  const funnel = await readFile(new URL('assets/revenue-funnel.js', root), 'utf8');
  const listeners = new Map();
  const interest = { value: 'unsure', addEventListener() {} };
  const details = { value: 'Please assess our AI inventory.', addEventListener() {} };
  const message = { value: '' };
  const form = {
    querySelector: s => ({ '[data-interest-select]': interest, '[data-enquiry-details]': details, '[name="message"]': message })[s],
    addEventListener: (event, callback) => listeners.set(event, callback)
  };
  vm.runInNewContext(funnel, {
    document: { documentElement: { lang: 'en' }, referrer: '', querySelector: () => form, querySelectorAll: () => [] },
    window: { location: { search: '?package=call&source_page=%2Fservices%2F&utm_source=test', pathname: '/start/', hostname: 'sundaibot.com' } },
    URLSearchParams, URL
  });
  assert.equal(interest.value, 'call');
  details.value = 'Updated request before clicking send.';
  listeners.get('submit')({ preventDefault() { assert.fail('Must allow native POST'); } });
  assert.match(message.value, /AI Governance Decision Review/);
  assert.match(message.value, /Updated request before clicking send\./);
  assert.match(message.value, /source_page=\/services\/ \| utm_source=test/);
});
