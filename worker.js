import {
  contactConfiguration,
  onRequestGet,
  onRequestPost,
  onRequestOptions,
  onRequest as methodNotAllowed
} from './site/functions/api/contact.js';
import {publicCatalog,bundleQuote,packages,priceFor,isLaunch,launch,launchState} from './site/functions/_shared/catalog.js';
import {labels} from './scripts/upgrade-labels.mjs';

const money=(price,lang)=>new Intl.NumberFormat(lang,{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(price);
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function renderCurrentPrice(id,lang){return `<a class="text-link" href="${lang==='en'?'':`/${lang}`}/book/?interest=${escape(id)}">${escape(labels[lang].proposalShort)} ↗</a>`;}
async function quote(request){
 if(request.method!=='POST')return new Response(JSON.stringify({ok:false,code:'method_not_allowed'}),{status:405,headers:{...diagnosticHeaders,allow:'POST'}});
 const url=new URL(request.url),origin=request.headers.get('origin'),site=request.headers.get('sec-fetch-site');
 if((origin&&origin!==url.origin)||(site&&!['same-origin','none'].includes(site)))return new Response(JSON.stringify({ok:false,code:'origin_not_allowed'}),{status:403,headers:diagnosticHeaders});
 if(!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type')||''))return new Response(JSON.stringify({ok:false,code:'unsupported_media_type'}),{status:415,headers:diagnosticHeaders});
 // Read with a byte limit and deadline, not request.json() on an unbounded body.
 const reader=request.body?.getReader();if(!reader)return new Response(JSON.stringify({ok:false,code:'invalid_body'}),{status:400,headers:diagnosticHeaders});
 let bytes=0,parts=[],timer;const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('body_timeout')),5000)});
 try{while(true){const {done,value}=await Promise.race([reader.read(),timeout]);if(done)break;bytes+=value.length;if(bytes>1024){void reader.cancel().catch(()=>{});return new Response(JSON.stringify({ok:false,code:'payload_too_large'}),{status:413,headers:diagnosticHeaders});}parts.push(value);}const all=new Uint8Array(bytes);let offset=0;for(const p of parts){all.set(p,offset);offset+=p.length}const body=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(all));if(!body||Array.isArray(body)||Object.keys(body).some(k=>k!=='ids'))throw new Error('invalid_body');const result=bundleQuote(body.ids);return new Response(JSON.stringify({ok:true,ids:result.ids,quoteRequired:true,status:'scope_review_required',discountStacking:false}),{headers:diagnosticHeaders});}
 catch(error){void reader.cancel().catch(()=>{});return new Response(JSON.stringify({ok:false,code:error.message==='body_timeout'?'body_timeout':'invalid_bundle'}),{status:error.message==='body_timeout'?408:400,headers:diagnosticHeaders});}finally{clearTimeout(timer);reader.releaseLock();}
}
export function currentSchema(schema){const forbidden=new Set(['price','priceCurrency','lowPrice','highPrice','priceSpecification','offers','hasOfferCatalog']);function clean(value){if(Array.isArray(value))return value.map(clean).filter(x=>x!==null);if(value&&typeof value==='object'){if(['Offer','AggregateOffer','OfferCatalog','PriceSpecification'].includes(value['@type']))return null;return Object.fromEntries(Object.entries(value).filter(([key])=>!forbidden.has(key)).map(([key,item])=>[key,clean(item)]));}return value;}return clean(schema);}
async function serveAssets(request,env){const response=await env.ASSETS.fetch(request);if(request.method==='HEAD'||!response.headers.get('content-type')?.includes('text/html'))return response;if(typeof HTMLRewriter==='undefined')return response;
 const pathname=new URL(request.url).pathname,lang=pathname.startsWith('/da/')?'da':pathname.startsWith('/sv/')?'sv':'en';const now=new Date();
 const result=new HTMLRewriter().on('[data-price]',{element(el){const html=renderCurrentPrice(el.getAttribute('data-price'),lang,now);if(html)el.setInnerContent(html,{html:true});}}).on('[data-launch-banner]',{element(el){el.setInnerContent(launchState(now)==='upcoming'?labels[lang].launchUpcoming:isLaunch(now)?labels[lang].offer:labels[lang].launchExpired);}}).on('script[data-upgrade-schema]',{
   text(chunk){this.value=(this.value||'')+chunk.text;chunk.remove();if(chunk.lastInTextNode){try{chunk.after(JSON.stringify(currentSchema(JSON.parse(this.value),now)).replaceAll('<','\\u003c'),{html:true});}catch{ /* Preserve valid published schema if a chunk boundary is unusual. */ chunk.after(this.value,{html:true});}this.value='';}}
 }).transform(response);
 const headers=new Headers(result.headers);headers.set('cache-control','public, max-age=0, must-revalidate');return new Response(result.body,{status:result.status,headers});
}

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
    if(path==='/api/pricing'){
      if(!['GET','HEAD'].includes(request.method))return new Response(JSON.stringify({ok:false,code:'method_not_allowed'}),{status:405,headers:{...diagnosticHeaders,allow:'GET, HEAD'}});
      return new Response(request.method==='HEAD'?null:JSON.stringify({quoteRequired:true,mode:'tailored_proposals',packages:packages.map(p=>({id:p.id,names:p.names,scopes:p.scopes,bundleEligible:p.bundleEligible}))}),{headers:diagnosticHeaders});
    }
    if(path==='/api/quote')return quote(request);
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
    return serveAssets(request,env);
  }
};
