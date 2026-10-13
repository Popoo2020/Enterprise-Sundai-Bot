import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {services} from '../../scripts/upgrade-content.mjs';
import {buyerCopy,buyerRows,buyerRoutes} from '../../scripts/ai-buyer-content.mjs';
import {buyerReferences,registryUrl,publicEmail} from '../../scripts/ai-buyer-render.mjs';

const root=path.resolve(import.meta.dirname,'..');
const mapping=JSON.parse(await readFile(path.resolve(root,'../docs/upgrade-route-map.json'),'utf8'));
const langs=['en','da','sv'];
const readPage=route=>readFile(path.join(root,route,'index.html'),'utf8');
const main=html=>html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
const decode=value=>value.replaceAll('&quot;','"').replaceAll('&gt;','>').replaceAll('&lt;','<').replaceAll('&amp;','&');
const text=value=>decode(value.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
const visibleText=html=>text(main(html).replace(/<details\b[\s\S]*?<\/details>/g,''));
const schemas=html=>[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match=>JSON.parse(match[1])['@graph']||[]);

test('buyer guides offer a visible six-service comparison and canonical language variants',async()=>{
 for(const lang of langs){
  const route=buyerRoutes[lang],html=await readPage(route),body=main(html),copy=buyerCopy[lang];
  assert(html.includes(`rel="canonical" href="https://sundaibot.com${route}"`));
  assert.equal((body.match(/<h1>/g)||[]).length,1);
  assert.equal(text(body.match(/<h1>(.*?)<\/h1>/s)[1]),copy.title);
  assert(!html.includes('| SundAI | SundAI'));
  for(const other of langs)assert(html.includes(`hreflang="${other}" href="https://sundaibot.com${buyerRoutes[other]}"`));
  const table=body.match(/<table\b[\s\S]*?<\/table>/)[0];
  assert.equal((table.match(/scope="row"/g)||[]).length,6);
  assert.equal((table.match(/scope="col"/g)||[]).length,4);
  assert(table.includes('role="table"'));
  assert(!table.includes('<details'));
  assert.equal((body.match(/id="acceptance-/g)||[]).length,6);
  for(const reference of buyerReferences)assert(body.includes(reference.url));
  for(const service of services){
   assert(table.includes(`${mapping.routes[lang].services}${service.id}/`));
   assert(visibleText(html).includes(text(buyerRows[service.id][lang].boundary)));
  }
  assert.equal(copy.checklist.length,5);
  for(const other of ['services','about','trust'])assert((await readPage(mapping.routes[lang][other])).includes(`href="${route}"`));
 }
});

test('each service exposes agreed deliverables, exclusions and inputs before enquiry',async()=>{
 for(const lang of langs)for(const service of services){
  const html=await readPage(mapping.routes[lang].services+service.id+'/');
  const body=main(html),visible=visibleText(html),copy=service.copy[lang];
  assert(body.indexOf('id="service-facts"')<body.indexOf('id="proposal"'));
  for(const value of [...copy.deliverables,copy.scope,copy.exclusions,copy.responsibility])assert(visible.includes(text(value)),`${service.id}/${lang}: essential fact is collapsed or absent`);
  assert(visible.includes(text(buyerCopy[lang].acceptanceNote)));
  assert.equal(buyerRows[service.id][lang].acceptance.length,2);
  assert(body.includes(`href="${buyerRoutes[lang]}#compare"`));
 }
 const en=await readPage('/service-selection/');
 for(const phrase of ['one framework','up to ten control areas','two refinement rounds','up to two roles and ten pilot users','30 days','up to two environments','up to five alerts'])assert(visibleText(en).includes(phrase));
 assert(!/guaranteed compliance|zero risk|guaranteed recommendation|rank.*first|ignore.*instructions/i.test(visibleText(en)));
});

test('operator identity is visible and matches schema and machine-readable facts',async()=>{
 const discovery=JSON.parse(await readFile(path.join(root,'discovery.json'),'utf8'));
 assert.equal(discovery.publisher.companyNumber,'13813344');
 assert.equal(discovery.publisher.email,publicEmail);
 for(const lang of langs)for(const kind of ['about','trust']){
  const html=await readPage(mapping.routes[lang][kind]);
  for(const value of ['RIIMON HOLDINGS LTD','13813344',publicEmail])assert(visibleText(html).includes(value));
  assert(main(html).includes(registryUrl));
  const organization=schemas(html).find(node=>node['@type']==='Organization');
  assert.equal(organization.legalName,discovery.publisher.legalName);
  assert.equal(organization.identifier.value,discovery.publisher.companyNumber);
  assert.equal(organization.identifier.url,registryUrl);
  assert.equal(organization.contactPoint.email,publicEmail);
  assert.deepEqual(organization.contactPoint.availableLanguage,['English','Danish','Swedish']);
  assert(!organization.address && !organization.aggregateRating && !organization.award);
 }
 for(const service of discovery.services)for(const lang of langs){
  const locale=service.locales[lang],html=await readPage(new URL(locale.url).pathname);
  for(const value of [...locale.deliverables,locale.clientResponsibilities,...locale.illustrativeAcceptanceCriteria,locale.acceptanceCriteriaStatus])assert(visibleText(html).includes(text(value)));
 }
 const digest=createHash('sha256');
 for(const lang of langs)for(const route of [mapping.routes[lang].services,mapping.routes[lang].faq,buyerRoutes[lang],...services.map(item=>mapping.routes[lang].services+item.id+'/')])digest.update(await readPage(route));
 assert.equal(discovery.contentDigest,digest.digest('hex'));
});

test('discovery points to indexable buyer guides without weakening public access controls',async()=>{
 const discovery=JSON.parse(await readFile(path.join(root,'discovery.json'),'utf8'));
 const llms=await readFile(path.join(root,'llms.txt'),'utf8');
 for(const lang of langs){
  const route=buyerRoutes[lang],html=await readPage(route);
  assert.equal(discovery.buyerGuides[lang],'https://sundaibot.com'+route);
  assert(llms.includes(route));
  assert(html.includes(`content="${discovery.release}"`));
  assert(!/content="[^"\n]*(?:noindex|nosnippet|noarchive|nocache)/i.test(html));
  for(const file of ['sitemap.xml','sitemap-commercial.xml'])assert((await readFile(path.join(root,file),'utf8')).includes('https://sundaibot.com'+route));
 }
 const robots=await readFile(path.join(root,'robots.txt'),'utf8');
 for(const agent of ['OAI-SearchBot','Claude-SearchBot','Claude-User','PerplexityBot','Perplexity-User','MistralAI-Index','MistralAI-User'])assert(robots.includes(`User-agent: ${agent}\nAllow: /`));
 const headers=await readFile(path.join(root,'_headers'),'utf8');
 assert(headers.includes("form-action 'self'"));
 assert(!headers.includes("'unsafe-inline'"));
});
