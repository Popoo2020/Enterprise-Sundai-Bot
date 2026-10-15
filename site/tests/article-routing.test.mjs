import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker from '../../worker.js';
import {canonicalArticlePaths} from '../functions/_shared/article-routes.js';

test('every canonical .html article resolves its asset internally without a public redirect',async()=>{
 assert.equal(canonicalArticlePaths.length,45);
 for(const pathname of canonicalArticlePaths)for(const method of ['GET','HEAD']){
  let seen;
  const env={ASSETS:{fetch:async request=>{seen=request;const p=new URL(request.url).pathname;if(p.endsWith('.html'))return Response.redirect(request.url.slice(0,-5),307);return new Response(method==='HEAD'?null:'article',{headers:{'content-type':'text/html'}});}}};
  const response=await worker.fetch(new Request('https://sundaibot.com'+pathname+'?source=test',{method}),env);
  assert.equal(response.status,200);assert.equal(response.headers.get('location'),null);assert.equal(new URL(seen.url).pathname,pathname.slice(0,-5));assert.equal(new URL(seen.url).search,'?source=test');assert.equal(seen.method,method);
 }
});

test('extensionless article URLs permanently converge on their established canonical URL',async()=>{
 for(const pathname of canonicalArticlePaths){
  const env={ASSETS:{fetch:async()=>{throw new Error('Redirect should not fetch assets');}}};
  const response=await worker.fetch(new Request('https://sundaibot.com'+pathname.slice(0,-5)+'?source=test'),env);
  assert.equal(response.status,308);assert.equal(response.headers.get('location'),'https://sundaibot.com'+pathname+'?source=test');
 }
});

test('article handling leaves service paths, feeds, unknown pages, legacy redirects and POST untouched',async()=>{
 for(const pathname of ['/services/','/insights/','/insights/feed.xml','/insights/not-a-real-article','/insights/eu-ai-act-readiness.html']){
  let seen;const env={ASSETS:{fetch:async request=>{seen=request.url;return new Response('asset');}}};
  await worker.fetch(new Request('https://sundaibot.com'+pathname),env);assert.equal(seen,'https://sundaibot.com'+pathname);
 }
 let method,pathname;
 const env={ASSETS:{fetch:async r=>{method=r.method;pathname=new URL(r.url).pathname;return new Response('asset');}}};
 await worker.fetch(new Request('https://sundaibot.com'+canonicalArticlePaths[0],{method:'POST',body:'x'}),env);
 assert.equal(method,'POST');assert.equal(pathname,canonicalArticlePaths[0]);
});
