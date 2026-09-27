import {
  contactConfiguration,
  onRequestGet,
  onRequestPost,
  onRequestOptions,
  onRequest as methodNotAllowed
} from './site/functions/api/contact.js';

const diagnosticHeaders = {
  'cache-control': 'no-store, max-age=0',
  'content-type': 'application/json; charset=utf-8',
  'x-content-type-options': 'nosniff',
  'x-robots-tag': 'noindex, nofollow',
  'referrer-policy': 'no-referrer'
};

const contactDiagnostics = (env) => {
  const configuration = contactConfiguration(env);
  return new Response(JSON.stringify({ ...configuration, scope: 'configuration_only' }), {
    status: configuration.ok ? 200 : 503,
    headers: diagnosticHeaders
  });
};

// Workers does not execute Pages' functions/ directory automatically.
export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/api/contact-diagnostics' || path === '/api/contact-diagnostics/') {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response(JSON.stringify({ ok: false, code: 'method_not_allowed' }), {
          status: 405,
          headers: { ...diagnosticHeaders, allow: 'GET, HEAD' }
        });
      }
      const response = contactDiagnostics(env);
      if (request.method === 'HEAD') return new Response(null, { status: response.status, headers: response.headers });
      return response;
    }
    if (path === '/api/contact' || path === '/api/contact/') {
      try {
        const context = { request, env };
        if (request.method === 'GET') return await onRequestGet(context);
        if (request.method === 'HEAD') {
          const response = await onRequestGet(context);
          return new Response(null, { status: response.status, headers: response.headers });
        }
        if (request.method === 'POST') return await onRequestPost(context);
        if (request.method === 'OPTIONS') return onRequestOptions();
        return methodNotAllowed();
      } catch {
        console.error('Contact handler failed unexpectedly');
        return new Response(JSON.stringify({ ok: false, code: 'contact_unavailable' }), {
          status: 503,
          headers: methodNotAllowed().headers
        });
      }
    }
    if (path.startsWith('/api/')) {
      return new Response(JSON.stringify({ ok: false, code: 'not_found' }), {
        status: 404,
        headers: methodNotAllowed().headers
      });
    }
    return env.ASSETS.fetch(request);
  }
};
