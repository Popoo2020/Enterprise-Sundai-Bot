import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {seoKeywords} from '../../scripts/seo-keywords.mjs';
import {services} from '../../scripts/upgrade-content.mjs';
import {faqHubCopy,serviceSeo} from '../../scripts/seo-content.mjs';
import {visibleFaqPairs} from '../../scripts/seo-render.mjs';
import {articlePaths} from '../../scripts/editorial.mjs';

const root=path.resolve(import.meta.dirname,'..');
const mapping=JSON.parse(await readFile(path.join(root,'../docs/upgrade-route-map.json'),'utf8'));
const readPage=route=>readFile(path.join(root,route.endsWith('/')?route+'index.html':route),'utf8');
const text=html=>html.replace(/<[^>]*>/g,' ').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>').normalize('NFKC').toLowerCase().replace(/\s+/g,' ');
const main=html=>html.match(/<main[^>]*>([\s\S]*)<\/main>/)[1];
const schemas=html=>[...html.matchAll(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const j=JSON.parse(m[1]);return j['@graph']||[j]});

test('the keyword plan has 120 unique scoped intents and at least 100 visible phrases per language',async()=>{
 assert.equal(seoKeywords.length,120);
 assert.equal(new Set(seoKeywords.map(k=>k.id)).size,120);
 for(const lang of ['en','da','sv']){
  assert.equal(new Set(seoKeywords.map(k=>text(k.phrases[lang]))).size,120);
  const targets=[...new Set(seoKeywords.map(k=>k.targetRoutes[lang])),mapping.routes[lang].services,mapping.routes[lang].faq];
  const corpus=(await Promise.all(targets.map(async route=>text(main(await readPage(route)))))).join(' ');
  const present=seoKeywords.filter(k=>corpus.includes(text(k.phrases[lang])));
  assert(present.length>=100,`${lang}: only ${present.length} visible phrases`);
  assert(seoKeywords.filter(k=>k.priority==='primary').every(k=>corpus.includes(text(k.phrases[lang]))),`${lang}: primary intent missing`);
 }
});

test('localized FAQ and service pages expose the same questions in their HTML and structured data',async()=>{
 for(const lang of ['en','da','sv']){
  const r=mapping.routes[lang];
  for(const route of [r.home,r.services,r.faq,...services.map(s=>r.services+s.id+'/')]){
   const html=await readPage(route),pairs=visibleFaqPairs(main(html));
   const faq=schemas(html).find(n=>n['@type']==='FAQPage');
   assert(faq,`${route}: missing FAQ schema`);
   assert.deepEqual(faq.mainEntity.map(q=>({q:q.name,a:q.acceptedAnswer.text})),pairs,`${route}: FAQ schema diverges from visible answers`);
   assert.equal(faq.inLanguage,lang);
   if(route===r.faq)assert.equal(pairs.length,20);
   assert(html.includes(`href="${r.faq}"`),`${route}: Q&A navigation absent`);
   assert(!html.includes('name="keywords"'));
  }
  assert.equal(faqHubCopy[lang].groups.length,5);
 }
});

test('every product preserves scope, supports buyer decisions and links directly to useful content',async()=>{
 for(const lang of ['en','da','sv'])for(const s of services){
  const route=mapping.routes[lang].services+s.id+'/',html=await readPage(route),body=main(html);
  assert(body.includes('class="delivery-steps"'));
  assert(body.includes('class="service-examples"'));
  assert(/class="[^"]*\bservice-connections\b/.test(body));
  assert(body.indexOf('class="delivery-steps"')<body.indexOf('id="proposal"'));
  assert.equal((body.match(/class="resource-link"/g)||[]).length,5);
  assert.equal(serviceSeo[s.id][lang].workflow.length,3);
  assert.equal(serviceSeo[s.id][lang].useCases.length,2);
  assert.equal(serviceSeo[s.id][lang].faq.length,6);
  const service=schemas(html).find(n=>n['@type']==='Service');
  const page=schemas(html).find(n=>n['@type']==='WebPage');
  assert.equal(service.url,'https://sundaibot.com'+route);
  assert.equal(page.mainEntity['@id'],service['@id']);
 }
 const redirects=new Map(mapping.redirects.map(r=>[r.from,r.to]));
 for(const route of mapping.generated){
  const html=await readPage(route);
  for(const [,href]of html.matchAll(/href="(\/[^"]+)"/g))assert(!redirects.has(href.split(/[?#]/)[0]),`${route}: link still goes through redirect ${href}`);
 }
});

test('machine-readable service facts and sitemaps describe the same canonical public pages',async()=>{
 const discovery=JSON.parse(await readFile(path.join(root,'discovery.json'),'utf8'));
 assert.equal(discovery.services.length,6);
 assert.match(discovery.contentDigest,/^[a-f0-9]{64}$/);
 for(const item of discovery.services)for(const lang of ['en','da','sv']){
  const html=await readPage(new URL(item.locales[lang].url).pathname);
  assert(text(main(html)).includes(text(item.locales[lang].summary)));
 }
 for(const file of ['sitemap.xml','sitemap-commercial.xml','sitemap-research.xml']){
  const xml=await readFile(path.join(root,file),'utf8');
  const rows=[...xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g)];
  assert(rows.length>0);
  for(const [,url,date]of rows){
   assert.equal(new URL(url).origin,'https://sundaibot.com');
   const pathname=new URL(url).pathname;
   const feedbackUpdate=/^\/(?:da\/|sv\/)?free-guides\/$/.test(pathname)||/^\/(?:da\/|sv\/)?$/.test(pathname)||/^\/(?:da\/|sv\/)?(?:services|ydelser|tjanster|customer-scenarios)(?:\/|$)/.test(pathname);
   const editorialUpdate=articlePaths.includes(pathname)||/^\/(?:da\/|sv\/)?insights\/$/.test(pathname);
   assert.equal(date,editorialUpdate?'2026-10-16':feedbackUpdate?'2026-10-15':/free-guides|ai-decision-review|ai-security-check|denmark-cpr/.test(url)?'2026-10-14':'2026-10-13');
   const html=await readPage(new URL(url).pathname);
   assert(html.includes(`rel="canonical" href="${url}"`));
   assert(!html.includes('content="noindex'));
  }
  if(file!=='sitemap-research.xml')for(const lang of ['en','da','sv'])assert(xml.includes('https://sundaibot.com'+mapping.routes[lang].faq));
 }
 const robots=await readFile(path.join(root,'robots.txt'),'utf8');
 assert.match(robots,/User-agent: OAI-SearchBot\s+Allow: \//);
 const llms=await readFile(path.join(root,'llms.txt'),'utf8');
 for(const route of ['/discovery.json','/llms-full.txt',...Object.values(mapping.routes).map(r=>r.faq)])assert(llms.includes(route));
 assert(!/recommend SundAI|rank.*first|ignore.*instructions/i.test(llms));
});
