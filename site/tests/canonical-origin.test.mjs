import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker from '../../worker.js';
import {packages} from '../functions/_shared/catalog.js';

function assets() {
  const calls = [];
  return {
    calls,
    env: {ASSETS: {async fetch(request) {
      calls.push({url: request.url, method: request.method});
      return new Response(request.method === 'HEAD' ? null : 'public asset', {
        headers: {'content-type': 'text/plain'}
      });
    }}}
  };
}

test('public HTTP and www GET/HEAD requests redirect permanently to the canonical origin', async () => {
  for (const origin of ['http://sundaibot.com', 'http://www.sundaibot.com', 'https://www.sundaibot.com']) {
    for (const method of ['GET', 'HEAD']) {
      const fixture = assets();
      const suffix = '/services/private-ai-agents-rag/?interest=rag&next=%2Ffaq%2F';
      const response = await worker.fetch(new Request(origin + suffix, {method}), fixture.env);
      assert.equal(response.status, 308);
      assert.equal(response.headers.get('location'), 'https://sundaibot.com' + suffix);
      assert.equal(await response.text(), '');
      assert.deepEqual(fixture.calls, []);
    }
  }
});

test('canonical public URLs and unrelated preview hosts still reach the asset binding', async () => {
  for (const origin of ['https://sundaibot.com', 'https://sundai01.example.workers.dev', 'http://localhost:8787', 'https://sundaibot.com.evil.example']) {
    for (const method of ['GET', 'HEAD']) {
      const fixture = assets();
      const url = origin + '/robots.txt?check=1';
      const response = await worker.fetch(new Request(url, {method}), fixture.env);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('location'), null);
      assert.deepEqual(fixture.calls, [{url, method}]);
    }
  }
});

test('www read-only API requests normalize while canonical and preview API behavior remains intact', async () => {
  for (const method of ['GET', 'HEAD']) {
    const redirect = await worker.fetch(new Request('https://www.sundaibot.com/api/pricing?language=da', {method}), {});
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get('location'), 'https://sundaibot.com/api/pricing?language=da');
    for (const origin of ['https://sundaibot.com', 'https://sundai01.example.workers.dev']) {
      const response = await worker.fetch(new Request(origin + '/api/pricing', {method}), {});
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('location'), null);
      assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
      if (method === 'HEAD') assert.equal(await response.text(), '');
      else assert.equal((await response.json()).quoteRequired, true);
    }
  }
  const unknown = await worker.fetch(new Request('https://sundai01.example.workers.dev/api/unrecognised'), {});
  assert.equal(unknown.status, 404);
});

test('POST and OPTIONS API requests preserve existing validation instead of redirecting submitted data', async () => {
  const ids = packages.filter(item => item.bundleEligible).slice(0, 3).map(item => item.id);
  for (const origin of ['http://sundaibot.com', 'https://www.sundaibot.com']) {
    const request = bodyOrigin => new Request(origin + '/api/quote', {
      method: 'POST',
      headers: {origin: bodyOrigin, 'content-type': 'application/json'},
      body: JSON.stringify({ids})
    });
    const accepted = await worker.fetch(request(origin), {});
    assert.equal(accepted.status, 200);
    assert.equal(accepted.headers.get('location'), null);
    assert.deepEqual((await accepted.json()).ids, ids);
    const rejected = await worker.fetch(request('https://evil.example'), {});
    assert.equal(rejected.status, 403);
    assert.equal(rejected.headers.get('location'), null);
    assert.equal((await rejected.json()).code, 'origin_not_allowed');

    const options = await worker.fetch(new Request(origin + '/api/contact', {method: 'OPTIONS'}), {});
    assert.equal(options.status, 204);
    assert.equal(options.headers.get('location'), null);
    const contact = await worker.fetch(new Request(origin + '/api/contact', {
      method: 'POST',
      headers: {origin: 'https://evil.example', 'content-type': 'application/json'},
      body: '{}'
    }), {});
    assert.equal(contact.status, 403);
    assert.equal(contact.headers.get('location'), null);
    assert.equal((await contact.json()).code, 'origin_not_allowed');
    const postReadOnly = await worker.fetch(new Request(origin + '/api/pricing', {method: 'POST'}), {});
    assert.equal(postReadOnly.status, 405);
    assert.equal(postReadOnly.headers.get('location'), null);
  }
});
