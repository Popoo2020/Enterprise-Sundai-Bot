import {test} from 'node:test';
import assert from 'node:assert/strict';
import {isLaunch,launchState,priceFor,packages,bundleQuote,publicCatalog,launch} from '../functions/_shared/catalog.js';
import worker,{currentSchema} from '../../worker.js';
const fixed=packages.filter(p=>p.bundleEligible);
const monetaryFields=new Set(['price','basePrice','launchPrice','currentPrice','lowPrice','highPrice','priceCurrency','priceSpecification','baseTotal','included','total','currency']);
function assertPrivatePrices(value){
 if(!value||typeof value!=='object')return;
 for(const [key,item] of Object.entries(value)){assert.ok(!monetaryFields.has(key),`Private monetary field leaked: ${key}`);assertPrivatePrices(item);}
}
test('launch uses the approved fixed Copenhagen instants across summer and winter offsets',()=>{
 assert.equal(Date.parse(launch.start),Date.parse('2026-10-11T22:00:00Z'));
 assert.equal(Date.parse(launch.end),Date.parse('2026-12-12T22:59:59Z'));
 for(const [date,active,state] of [['2026-10-11T21:59:59.999Z',false,'upcoming'],['2026-10-11T22:00:00Z',true,'active'],['2026-12-12T22:59:59Z',true,'active'],['2026-12-12T22:59:59.001Z',false,'ended']]){assert.equal(isLaunch(date),active);assert.equal(launchState(date),state);}
});
test('all approved prices receive exactly 20 percent without mixing currencies',()=>{
 assert.deepEqual(fixed.map(p=>p.price),[1350,2250,10300,4250,4650,3500]);
 assert.deepEqual(fixed.map(p=>priceFor(p,'2026-10-13')),[1080,1800,8240,3400,3720,2800]);
 for(const item of packages){assert.equal(priceFor(item,'2026-12-13'),item.price);assert.equal(item.currency,'EUR');assert.ok(item.scopes.en&&item.scopes.da&&item.scopes.sv);}
 assert.equal(publicCatalog('2026-10-13').launch.monthlyCycles,2);
});
test('all 20 three-package combinations include the cheapest standard package without stacking',()=>{
 let combinations=0;for(let a=0;a<fixed.length;a++)for(let b=a+1;b<fixed.length;b++)for(let c=b+1;c<fixed.length;c++){const selected=[fixed[a],fixed[b],fixed[c]];const quote=bundleQuote(selected.map(x=>x.id));assert.equal(quote.included,Math.min(...selected.map(x=>x.price)));assert.equal(quote.total,selected.reduce((n,x)=>n+x.price,0)-quote.included);assert.equal(quote.discountStacking,false);combinations++;}assert.equal(combinations,20);
 for(const ids of [[],[fixed[0].id,fixed[0].id,fixed[1].id],['cloud-care',fixed[0].id,fixed[1].id],['made-up',fixed[0].id,fixed[1].id]])assert.throws(()=>bundleQuote(ids));
});
test('public schema strips legacy monetary fields instead of exposing live or expired prices',()=>{
 for(const date of ['2026-10-13','2026-12-13']){
  const schema={'@context':'https://schema.org','@graph':fixed.map(p=>({'@type':'Service',name:p.names.en,offers:{'@type':'Offer',identifier:p.id,price:p.price,priceCurrency:'EUR',validFrom:'old',validThrough:'old'}}))};
  const result=currentSchema(schema,date);assertPrivatePrices(result);
  assert.deepEqual(result['@graph'].map(x=>x.name),fixed.map(p=>p.names.en));
 }
});
const req=(body,headers={})=>new Request('https://sundaibot.com/api/quote',{method:'POST',headers:{origin:'https://sundaibot.com','content-type':'application/json',...headers},body:JSON.stringify(body)});
test('quote API validates scope IDs and origin, limits the streamed body and requires an individual review',async()=>{
 const ids=fixed.slice(0,3).map(x=>x.id);
 let result=await worker.fetch(req({ids}),{});assert.equal(result.status,200);let body=await result.json();assert.equal(body.status,'scope_review_required');assert.equal(body.quoteRequired,true);assert.deepEqual(body.ids,ids);assert.equal(body.discountStacking,false);assertPrivatePrices(body);
 result=await worker.fetch(req({ids:fixed.slice(0,3).map(x=>x.id)},{origin:'https://evil.example'}),{});assert.equal(result.status,403);
 result=await worker.fetch(req({ids:['cloud-care',fixed[0].id,fixed[1].id]}),{});assert.equal(result.status,400);
 result=await worker.fetch(req({ids:fixed.slice(0,3).map(x=>x.id),price:1}),{});assert.equal(result.status,400);
 result=await worker.fetch(req({ids:[fixed[0].id,fixed[0].id,fixed[1].id]}),{});assert.equal(result.status,400);
 result=await worker.fetch(req({ids:[fixed[0].id,fixed[1].id,'unknown']}),{});assert.equal(result.status,400);
 result=await worker.fetch(req({ids:fixed.slice(0,2).map(x=>x.id)}),{});assert.equal(result.status,400);
 result=await worker.fetch(req({ids:fixed.slice(0,3).map(x=>x.id)},{'content-type':'text/plain'}),{});assert.equal(result.status,415);
 result=await worker.fetch(req({ids:['x'.repeat(1100)]}),{});assert.equal(result.status,413);
 result=await worker.fetch(new Request('https://sundaibot.com/api/quote'),{});assert.equal(result.status,405);
 assert.match(result.headers.get('cache-control'),/no-store/);
});
test('public catalog is read-only and exposes scoped products without prices, bookings or credentials',async()=>{
 const result=await worker.fetch(new Request('https://sundaibot.com/api/pricing'),{RESEND_API_KEY:'never-public'});assert.equal(result.status,200);const data=await result.json();assert.equal(data.packages.length,10);assert.equal(data.quoteRequired,true);assertPrivatePrices(data);
 for(const item of data.packages){assert.ok(packages.some(p=>p.id===item.id));for(const lang of ['en','da','sv']){assert.equal(item.names[lang],packages.find(p=>p.id===item.id).names[lang]);assert.equal(item.scopes[lang],packages.find(p=>p.id===item.id).scopes[lang]);}}
 assert.doesNotMatch(JSON.stringify(data),/never-public|RESEND_API_KEY|TURNSTILE_SECRET_KEY/);
 assert.match(result.headers.get('cache-control'),/no-store/);
 const head=await worker.fetch(new Request('https://sundaibot.com/api/pricing',{method:'HEAD'}),{});assert.equal(head.status,200);assert.equal(await head.text(),'');
 const post=await worker.fetch(new Request('https://sundaibot.com/api/pricing',{method:'POST'}),{});assert.equal(post.status,405);
 const admin=await worker.fetch(new Request('https://sundaibot.com/api/admin/bookings'),{});assert.equal(admin.status,404);
});
