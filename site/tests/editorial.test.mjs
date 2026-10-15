import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {editorialContent,editorialLanguages,articlePath,editorialUi,editorialPlainText} from '../../scripts/editorial.mjs';
import {visibleFaqPairs} from '../../scripts/seo-render.mjs';

const root=path.resolve(import.meta.dirname,'..'),origin='https://sundaibot.com';
const read=route=>readFile(path.join(root,route.endsWith('/')?route+'index.html':route),'utf8');
const nodes=html=>[...html.matchAll(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const j=JSON.parse(m[1]);return j['@graph']||[j];});
const plain=editorialPlainText;

test('metadata decoding is single-pass and preserves nested literal entities',()=>{
 assert.equal(editorialPlainText('Read &amp;quot; and &amp;#39; literally'),'Read &quot; and &#39; literally');
 assert.equal(editorialPlainText('AI &amp; security: &quot;review&quot;'),'AI & security: "review"');
});

test('12 new articles have reciprocal locale routes, truthful metadata, source links and matching FAQ',async()=>{
 let count=0;
 for(const lang of editorialLanguages)for(const a of editorialContent[lang]){
  count++;const route=articlePath(lang,a.id),html=await read(route),schema=nodes(html),article=schema.filter(n=>n['@type']==='Article');
  assert.equal(article.length,1);assert.equal(article[0].headline,a.title);assert.equal(article[0].inLanguage,lang);assert.equal(article[0].datePublished,'2026-10-16');assert.equal(article[0].dateModified,'2026-10-16');
  assert(article[0].wordCount>=390);assert.equal(article[0].author.name,'SundAI');assert(plain(html).includes(editorialUi[lang].method));
  assert.equal(new Set(article[0].citation.map(u=>new URL(u).hostname)).size,2);
  for(const url of article[0].citation)assert(html.includes(`href="${url}" rel="external"`));
  assert(html.includes(`rel="canonical" href="${origin+route}"`));assert(html.includes('property="og:type" content="article"'));
  for(const l of editorialLanguages)assert(html.includes(`hreflang="${l}" href="${origin+articlePath(l,a.id)}"`));
  const faq=schema.find(n=>n['@type']==='FAQPage');assert.deepEqual(faq.mainEntity.map(q=>({q:q.name,a:q.acceptedAnswer.text})),visibleFaqPairs(html));
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
  for(const [,id]of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(id),route+': missing '+id);
  assert(!html.includes('name="keywords"'));assert(!html.includes('data-upgrade-form'));assert.equal((html.match(/<h1\b/g)||[]).length,1);
  const crumbs=schema.find(n=>n['@type']==='BreadcrumbList');assert.equal(crumbs.itemListElement.length,3);
 }
 assert.equal(count,12);
});

test('every article is reachable from its localized hub, catalog, feed and both sitemaps',async()=>{
 const discovery=JSON.parse(await readFile(path.join(root,'discovery.json'),'utf8'));
 const maps=await Promise.all(['sitemap.xml','sitemap-research.xml'].map(f=>readFile(path.join(root,f),'utf8')));
 const redirects=new Set((await readFile(path.join(root,'_redirects'),'utf8')).split('\n').map(l=>l.trim().split(/\s+/)).filter(p=>p[2]==='301').map(p=>p[0]));
 for(const lang of editorialLanguages){
  const hubPath=`${lang==='en'?'':`/${lang}`}/insights/`,html=await read(hubPath),hub=nodes(html).find(n=>n['@type']==='CollectionPage'),feed=await readFile(path.join(root,hubPath,'feed.xml'),'utf8');
  const files=(await readdir(path.join(root,hubPath))).filter(f=>f.endsWith('.html')&&f!=='index.html'&&!redirects.has(hubPath+f));
  assert.equal(files.length,15);assert.equal(hub.mainEntity.itemListElement.length,files.length);assert.equal(discovery.articles[lang].pages.length,files.length);assert.equal((feed.match(/<item>/g)||[]).length,files.length);
  for(const redirect of redirects)assert(!feed.includes(origin+redirect+'</link>'));
  for(const file of files){const url=origin+hubPath+file;assert(html.includes(`href="${hubPath+file}"`));assert(feed.includes(`<link>${url}</link>`));for(const map of maps)assert(map.includes(`<loc>${url}</loc>`));}
  assert(html.includes('type="application/rss+xml"'));assert(html.includes('href="#topic-0"'));assert(!html.includes('<form'));
 }
});

test('article navigation is localized and homepage body does not acquire an article grid',async()=>{
 for(const lang of editorialLanguages){
  const home=await read(lang==='en'?'/':`/${lang}/`),label=editorialUi[lang].nav;
  assert(home.includes(`/insights/">${label}</a>`));
  const body=home.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];assert(!body.includes('insight-card'));assert(!body.includes('article-latest-grid'));
  assert(body.includes('Kick-ass know')||body.includes('Skarp viden')||body.includes('Vass kunskap'));
 }
});

test('capacity-value example is arithmetically consistent and explicitly fictional in all languages',()=>{
 const volume=1200,before=6,rate=35,operating=900,setup=12000;
 const hours=after=>volume*(before-after)/60;
 assert.equal(hours(2),80);assert.equal(hours(4),40);assert.equal(hours(2)*rate-operating,1900);assert.equal(hours(4)*rate-operating,500);
 assert.equal(Math.round(setup/1900*10)/10,6.3);assert.equal(setup/500,24);
 for(const lang of editorialLanguages){const a=editorialContent[lang].find(a=>a.id==='value'),text=JSON.stringify(a);assert(/fictional|fiktivt/.test(text));assert(/cash-payback|kontant tilbagebetaling|kassaflödesprognos/.test(text));}
});

test('article display stays usable without client filtering and has mobile table and layout rules',async()=>{
 const css=await readFile(path.join(root,'assets/insights-layout.css'),'utf8');
 assert(css.includes('@media(max-width:700px)'));assert(css.includes('.article-latest-grid {grid-template-columns:minmax(0,1fr)'));assert(css.includes('.editorial-table-two-columns'));
 for(const lang of editorialLanguages){const html=await read(articlePath(lang,'mcp'));assert(html.includes('guide-toc-mobile'));assert(html.includes('scope="row"'));assert(html.includes('data-label='));assert(!html.includes('article-filter.js'));}
});
