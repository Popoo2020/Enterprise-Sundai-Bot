import {
  onRequestGet,
  onRequestPost,
  onRequestOptions,
  onRequest as methodNotAllowed
} from './site/functions/api/contact.js';

// Workers does not execute Pages' functions/ directory automatically.
export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
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
