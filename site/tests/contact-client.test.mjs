import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const script = await readFile(new URL('../assets/neon-compact.js', import.meta.url), 'utf8');

// Exercise the production submit handler with isolated DOM/provider fixtures.
// These are unit tests; no external challenge is solved and no email is sent.
async function fixture(response) {
  const listeners = new Map();
  const status = { textContent: '', className: '' };
  const tokenField = { value: '' };
  const started = { value: '123456789' };
  const button = { disabled: false, setAttribute() {}, removeAttribute() {} };
  const slot = {};
  let resetCount = 0, widgetOptions;
  const posted = [];
  const form = {
    dataset: {},
    querySelector: selector => ({ '[data-form-status]': status, '[type="submit"]': button,
      '[name="startedAt"]': started, '[name="turnstileToken"]': tokenField, '.turnstile-slot': slot })[selector] || null,
    addEventListener: (name, callback) => listeners.set(name, callback),
    reportValidity: () => true,
    reset() { started.value = ''; tokenField.value = ''; }
  };
  const document = {
    styleSheets: [], documentElement: { lang: 'en' },
    head: { appendChild() {} }, createElement: () => ({}),
    querySelector: selector => selector === '[data-contact-form]' ? form : null,
    querySelectorAll: () => []
  };
  const window = { turnstile: {
    render(_slot, options) { widgetOptions = options; return 'fixture-widget'; },
    getResponse() { return tokenField.value; },
    reset() { resetCount++; }
  } };
  vm.runInNewContext(script, {
    document, window, AbortController, setTimeout, clearTimeout, console,
    FormData: class { entries() { return Object.entries({ name: 'Test Person', email: 'test@example.invalid',
      message: 'A synthetic contact enquiry.', startedAt: started.value, turnstileToken: tokenField.value }); } },
    fetch: async (_url, options) => {
      if (options.method !== 'POST') return Response.json({ available: true, enabled: true, siteKey: 'fixture-key' });
      posted.push(JSON.parse(options.body));
      return response(posted.length);
    }
  });
  await listeners.get('focusin')();
  return { status, tokenField, started, button, posted, form,
    solveFixture: token => widgetOptions.callback(token),
    submit: () => listeners.get('submit')({ preventDefault() {} }),
    resets: () => resetCount };
}

test('failed delivery clears the consumed token, preserves the enquiry and permits a fresh retry', async () => {
  const f = await fixture(attempt => Response.json(attempt === 1
    ? { ok: false, code: 'email_provider_unavailable' } : { ok: true }, { status: attempt === 1 ? 503 : 202 }));
  f.solveFixture('first-token');
  await f.submit();
  assert.equal(f.resets(), 1);
  assert.equal(f.tokenField.value, '');
  assert.equal(f.started.value, '123456789');
  assert.equal(f.button.disabled, false);
  assert.match(f.status.className, /error/);
  // The old token is no longer reusable; no second POST occurs yet.
  await f.submit();
  assert.equal(f.posted.length, 1);
  f.solveFixture('second-token');
  await f.submit();
  assert.equal(f.posted.length, 2);
  assert.equal(f.posted[1].turnstileToken, 'second-token');
  assert.equal(f.posted[0].startedAt, f.posted[1].startedAt);
  assert.equal(f.resets(), 2);
  assert.match(f.status.className, /success/);
});

test('lost response also resets the token without claiming a successful send', async () => {
  const f = await fixture(() => { throw new TypeError('Synthetic network interruption'); });
  f.solveFixture('first-token');
  await f.submit();
  assert.equal(f.resets(), 1);
  assert.equal(f.tokenField.value, '');
  assert.equal(f.started.value, '123456789');
  assert.equal(f.button.disabled, false);
  assert.match(f.status.className, /error/);
});
