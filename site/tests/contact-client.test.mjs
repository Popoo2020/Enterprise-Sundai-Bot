import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
async function pages(dir = root) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
    if (entry.isDirectory()) result.push(...await pages(url));
    else if (entry.name.endsWith('.html')) result.push(url);
  }
  return result;
}
const shipped = [];
for (const url of await pages()) {
  const html = await readFile(url, 'utf8');
  for (const [form] of html.matchAll(/<form\b[^>]*data-upgrade-form[\s\S]*?<\/form>/g)) shipped.push({ url, html, form });
}

test('all thirty-six request forms share the protected endpoint and native field constraints', () => {
  assert.equal(shipped.length, 36);
  const coverage = new Set();
  for (const { url, html, form } of shipped) {
    const tag = form.slice(0, form.indexOf('>') + 1);
    assert.match(tag, /action="\/api\/contact"/);
    assert.match(tag, /method="post"/);
    assert.doesNotMatch(tag, /novalidate|onsubmit|data-success|formspree/i);
    assert.match(form, /<input\b[^>]*name="name"[^>]*maxlength="100"[^>]*required[^>]*minlength="2"/);
    assert.match(form, /<input\b[^>]*name="email"[^>]*type="email"[^>]*maxlength="200"[^>]*required/);
    assert.match(form, /<textarea\b[^>]*name="message"[^>]*required[^>]*minlength="20"[^>]*maxlength="1800"/);
    assert.match(form, /<input\b[^>]*name="organisation"[^>]*maxlength="150"/);
    assert.match(form, /<button\b[^>]*type="submit"/);
    assert.match(html, /<script\b[^>]*defer[^>]*src="\/assets\/upgrade-forms\.js"/);
    assert.doesNotMatch(html, /<script\b[^>]*src="https:\/\/challenges\.cloudflare\.com\/turnstile/);
    const lang = html.match(/<html\b[^>]*lang="(en|da|sv)"/)?.[1];
    const kind = tag.match(/data-kind="(booking|join|training|enquiry)"/)?.[1];
    assert.ok(lang && kind, url.pathname);
    const service = html.includes('data-page-kind="service"');
    const selectedInterest = form.match(/<option\b[^>]*value="([^"]+)"[^>]*selected/)?.[1];
    const growth = html.match(/data-page-kind="(decision-review|security-assessment)"/)?.[1];
    const key = `${lang}:${kind}${service ? ':' + selectedInterest : growth ? ':growth-' + growth : ''}`;
    if (service) {
      assert.equal(kind, 'enquiry', url.pathname);
      assert.ok(selectedInterest, `${url.pathname}: service selection required`);
      assert.match(form, /<input\b[^>]*name="organisation"[^>]*required/);
      assert.match(form, /<(?:input|textarea)\b[^>]*name="product"[^>]*required/);
      const team = form.match(/<(?:input|textarea)\b[^>]*name="team"[^>]*>/)?.[0];
      assert.ok(team, `${url.pathname}: team context`);
      assert.doesNotMatch(team, /\brequired\b/);
    }
    assert.ok(!coverage.has(key), url.pathname);
    coverage.add(key);
  }
  assert.equal(coverage.size, 36);
  for (const lang of ['en', 'da', 'sv']) {
    for (const kind of ['booking', 'join', 'training', 'enquiry']) assert.ok(coverage.has(`${lang}:${kind}`));
    assert.equal([...coverage].filter(key => key.startsWith(`${lang}:enquiry:`) && !key.includes(':growth-')).length, 6);
  }
});

test('request fields have visible labels, accessible statuses and a no-script email route', () => {
  for (const { url, form } of shipped) {
    const labels = [...form.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/g)].map(match => match[1]);
    for (const [field] of form.matchAll(/<(?:input|select|textarea)\b[^>]*>/g)) {
      const name = field.match(/name="([^"]+)"/)?.[1];
      assert.ok(name && labels.some(label => label.includes(field) && label.replace(/<[^>]+>[\s\S]*/, '').trim()), `${url.pathname}: ${name} needs a visible label`);
    }
    assert.match(form, /data-form-status[^>]*role="status"[^>]*aria-live="polite"/);
    assert.match(form, /name="message"[^>]*aria-describedby="form-privacy"/);
    assert.match(form, /id="form-privacy"/);
    assert.match(form, /<noscript>[\s\S]*href="mailto:eririmo@protonmail\.com"/);
    assert.match(form, /href="\/(?:privacy\.html|da\/privatliv\.html|sv\/integritet\.html)"/);
    assert.match(form, /data-turnstile/);
    assert.doesNotMatch(form, /type="file"|name="(?:age|health|medical|password|passport|idNumber|credentials|turnstileToken|startedAt)"|formaction=|formnovalidate/i);
  }
});

test('application, training and product forms collect the advertised professional and group context', () => {
  for (const { html, form } of shipped) {
    if (form.includes('data-kind="join"')) for (const field of ['country', 'language', 'expertise', 'experience', 'availability', 'portfolio']) assert.ok(form.includes(`name="${field}"`), `Application field missing: ${field}`);
    if (form.includes('data-kind="training"')) for (const field of ['audience', 'groupSize', 'ages', 'language', 'topic', 'format', 'dates', 'goal']) assert.ok(form.includes(`name="${field}"`));
    if (form.includes('data-kind="booking"')) for (const field of ['interest', 'language', 'timezone', 'preferredTime']) assert.ok(form.includes(`name="${field}"`));
    if (html.includes('data-page-kind="service"')) for (const field of ['interest', 'team', 'product']) assert.ok(form.includes(`name="${field}"`), `Proposal field missing: ${field}`);
  }
});
