import assert from 'node:assert/strict';
import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
import {packages,launch,isLaunch,priceFor,bundleQuote} from '../functions/_shared/catalog.js';
import {articlePath} from '../../scripts/editorial.mjs';
import {services} from '../../scripts/upgrade-content.mjs';
import {storyCopy} from '../../scripts/home-story.mjs';
import {categories} from '../../scripts/service-categories.mjs';
import {labels} from '../../scripts/upgrade-labels.mjs';
import {ecosystem} from '../../scripts/upgrade-ecosystem.mjs';

const root=path.resolve(import.meta.dirname,'..');
const {routes}=JSON.parse(await readFile(path.resolve(root,'../docs/upgrade-route-map.json'),'utf8'));
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const moneyKeys=new Set(['price','basePrice','launchPrice','currentPrice','lowPrice','highPrice','priceCurrency','priceSpecification','baseTotal','included','total','currency']);
function noPublicAmounts(value,label){
 if(!value||typeof value!=='object')return;
 if(value['@type']==='Offer'&&String(value['@id']).endsWith('/ai-decision-review/#offer')){assert.equal(value.price,'490');assert.equal(value.priceCurrency,'EUR');return;}

 for(const [key,item]of Object.entries(value)){assert.ok(!moneyKeys.has(key),`${label}: public monetary field ${key}`);noPublicAmounts(item,label);}
}
async function pages(dir=root){const out=[];for(const entry of await readdir(dir,{withFileTypes:true})){if(['tests','functions','assets'].includes(entry.name))continue;const file=path.join(dir,entry.name);if(entry.isDirectory())out.push(...await pages(file));else if(entry.name.endsWith('.html'))out.push(file);}return out;}

// Prices remain private business configuration, never published in the funnel.
assert.deepEqual(services.map(s=>s.price),[1350,2250,10300,4250,4650,3500]);
assert.equal(services.length,6);assert.equal(packages.length,10);
assert.equal(categories.length,4);
assert.deepEqual(categories.flatMap(c=>c.services).sort(),services.map(s=>s.id).sort(),'Four areas preserve every original service exactly once');
assert.deepEqual(packages.slice(6).map(p=>p.price),[2350,1150,850,2000]);
assert.equal(launch.timezone,'Europe/Copenhagen');assert.equal(launch.monthlyCycles,2);
assert.equal(isLaunch('2026-10-11T21:59:59Z'),false);assert.equal(isLaunch('2026-10-11T22:00:00Z'),true);
assert.equal(isLaunch('2026-12-12T22:59:59Z'),true);assert.equal(isLaunch('2026-12-12T23:00:00Z'),false);
for(const item of packages){assert.equal(priceFor(item,'2026-10-13T12:00:00Z'),item.price*.8);assert.equal(priceFor(item,'2026-12-13'),item.price);assert.equal(item.currency,'EUR');}
for(let i=0;i<6;i++)for(let j=i+1;j<6;j++)for(let k=j+1;k<6;k++){const items=[services[i],services[j],services[k]],q=bundleQuote(items.map(p=>p.id));assert.equal(q.total,items.reduce((n,p)=>n+p.price,0)-Math.min(...items.map(p=>p.price)));assert.equal(q.discountStacking,false);}
assert.throws(()=>bundleQuote([services[0].id,services[0].id,services[1].id]));
assert.throws(()=>bundleQuote([services[0].id,services[1].id,'cloud-care']));
assert.throws(()=>bundleQuote(['unknown','other','missing']));
assert.equal(new Set(ecosystem.map(item=>item.name)).size,ecosystem.length,'Technology references must be distinct');
for(const group of ['ai','cloud','security'])assert.ok(ecosystem.filter(item=>item.group===group).length>=2,`${group}: relevant ecosystem references`);
assert.ok(ecosystem.some(item=>/Google Cloud|GCP/i.test(item.name)),'GCP reference requested by the user');
for(const item of ecosystem){assert.ok(item.name&&item.url);assert.equal(new URL(item.url).protocol,'https:');if(item.src){assert.ok(item.src.startsWith('/assets/brands/'),`${item.name}: locally hosted brand artwork`);await access(path.join(root,item.src));}}

for(const [lang,prefix,hub]of [['en','','services'],['da','da/','ydelser'],['sv','sv/','tjanster']]){
 const t=labels[lang],r=routes[lang];
 const booking=await readFile(path.join(root,r.book,'index.html'),'utf8');
 const bookingInterests=booking.match(/<select\b[^>]*name="interest"[^>]*>([\s\S]*?)<\/select>/)?.[1];
 assert.ok(bookingInterests,`${lang}: booking interest selector`);
 for(const category of categories){
  const options=[...bookingInterests.matchAll(new RegExp(`<option\\b[^>]*value="${category.id}"[^>]*>([\\s\\S]*?)<\\/option>`,'g'))];
  assert.equal(options.length,1,`${lang}/${category.id}: one booking option for the category meeting link`);
  assert.equal(options[0][1],esc(category.names[lang]),`${lang}/${category.id}: booking label matches the selected service area`);
 }
 for(const page of ['index.html','pricing/index.html']){
  const html=await readFile(path.join(root,prefix+page),'utf8');
  const cards=[...html.matchAll(/<article class="service-card category-card"[^>]*>[\s\S]*?<\/article>/g)].map(m=>m[0]);
  assert.equal(cards.length,4,`${prefix+page}: service categories`);
  for(const category of categories){
   const card=cards.find(c=>c.includes(`href="${r.services}#${category.id}"`));
   assert.ok(card,`${lang}/${page}: category destination ${category.id}`);
   assert.ok(card.includes(`id="service-${category.id}"`),`${lang}/${page}: category entry anchor ${category.id}`);
   assert.ok(card.includes(esc(category.names[lang])),`${lang}/${page}: category name ${category.id}`);
   assert.ok(card.includes(esc(category.benefits[lang])),`${lang}/${page}: category-level benefit ${category.id}`);
   if(page==='index.html'){
    const compact=card.match(/<ul class="compact-offers">([\s\S]*?)<\/ul>/)?.[1];
    assert.ok(compact,`${lang}: visible compact offering list`);
    assert.equal((compact.match(/<li\b/g)||[]).length,3);
    for(const item of storyCopy[lang].short[categories.indexOf(category)])assert.ok(compact.includes(esc(item)));
    assert.equal((card.match(/<a\b/g)||[]).length,1,`${lang}: one clear destination per home card`);
    continue;
   }
   const offerings=card.match(/<ul class="category-offer-list">([\s\S]*?)<\/ul>/)?.[1];
   assert.ok(offerings,`${lang}/${page}: visible sub-offerings ${category.id}`);
   assert.equal((offerings.match(/<li\b/g)||[]).length,category.offerings[lang].length,`${lang}/${page}: complete sub-offering list ${category.id}`);
   for(const [title,body] of category.offerings[lang]){
    assert.ok(offerings.includes(`<strong>${esc(title)}</strong>`),`${lang}/${page}: scannable offering title ${title}`);
    assert.ok(offerings.includes(`<span>${esc(body)}</span>`),`${lang}/${page}: offering explanation ${title}`);
   }
   assert.ok(card.includes(esc(category.examples[lang])),`${lang}/${page}: practical example ${category.id}`);
   assert.ok(card.includes(`href="${r.book}?interest=${category.id}"`),`${lang}/${page}: meeting link preserves ${category.id}`);
   assert.ok(card.includes(esc(category.cta[lang])),`${lang}/${page}: specific meeting invitation ${category.id}`);
  }
 }
 const serviceHub=await readFile(path.join(root,prefix+hub,'index.html'),'utf8');
 assert.doesNotMatch(serviceHub,/<article class="service-card category-card"/,`${lang}: hub does not repeat the full marketing cards`);
 const categoryNav=serviceHub.match(/<nav class="category-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
 assert.ok(categoryNav,`${lang}: accessible service category navigation`);
 assert.equal((categoryNav.match(/<a\b/g)||[]).length,4,`${lang}: four compact category links`);
 assert.equal((serviceHub.match(/<article class="category-offering">/g)||[]).length,7,`${lang}: six specialist offerings and training remain visible`);
 for(const category of categories){
  assert.ok(categoryNav.includes(`href="#${category.id}"`),`${lang}: category navigation destination ${category.id}`);
  assert.ok(categoryNav.includes(esc(category.names[lang])),`${lang}: category navigation label ${category.id}`);
  const section=serviceHub.match(new RegExp(`<section class="section category-detail" id="${category.id}"[^>]*>([\\s\\S]*?)<\\/section>`))?.[1];
  assert.ok(section,`${lang}: category detail ${category.id}`);
  assert.ok(section.includes(esc(category.benefits[lang])),`${lang}: complete category benefit ${category.id}`);
  for(const id of category.services){
   const service=services.find(s=>s.id===id).copy[lang];
   assert.ok(section.includes(`href="${r.services+id}/"`),`${lang}: retained specialist URL ${id}`);
   for(const value of [service.name,service.description,service.scope,...service.deliverables])assert.ok(section.includes(esc(value)),`${lang}/${id}: original scope and deliverables in category hub`);
  }
  assert.ok(section.includes(`href="${r.book}?interest=${category.id}"`),`${lang}/${category.id}: meeting link preserves the category`);
  assert.ok(section.includes(esc(t.call)),`${lang}/${category.id}: original meeting invitation`);
  if(category.training){
   assert.ok(section.includes(`href="${r.training}"`),`${lang}: training remains discoverable under governance`);
   for(const value of [t.trainingTitle,t.trainingIntro,t.requestWorkshop])assert.ok(section.includes(esc(value)),`${lang}: original training offer and CTA`);
  }
 }
 for(const service of services){
  const html=await readFile(path.join(root,prefix+hub,service.id,'index.html'),'utf8');
  assert.ok(html.includes(esc(service.copy[lang].scope)),`${lang}: static scope ${service.id}`);
  assert.ok(html.includes('data-page-kind="service"'));
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${lang}/${service.id}: one H1`);
  for(const className of ['sales-hero','sales-fit','sales-benefits','service-facts','testimonials'])assert.match(html,new RegExp(`class="[^"]*\\b${className}\\b`),`${lang}/${service.id}: ${className}`);
  const body=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  assert.equal(body.split(esc(service.copy[lang].scope)).length-1,1,`${lang}/${service.id}: scope appears once before enquiry`);
  for(const value of service.copy[lang].deliverables)assert.equal(body.split(esc(value)).length-1,1,`${lang}/${service.id}: deliverable appears once`);
  assert.ok(body.indexOf('id="service-facts"')<body.indexOf('id="proposal"'),`${lang}/${service.id}: essential scope visible before enquiry`);
  assert.doesNotMatch(body,/class="product-details"/,`${lang}/${service.id}: duplicate product details removed`);
  assert.ok(html.includes('id="proposal"'),`${lang}/${service.id}: proposal destination`);
  assert.ok(html.includes('href="#proposal"'),`${lang}/${service.id}: direct proposal CTA`);
  const forms=[...html.matchAll(/<form\b[^>]*data-upgrade-form[\s\S]*?<\/form>/g)];assert.equal(forms.length,1,`${lang}/${service.id}: one protected proposal form`);
  const form=forms[0][0];
  assert.match(form,/<input\b[^>]*name="organisation"[^>]*required/);
  assert.match(form,/<(?:input|textarea)\b[^>]*name="product"[^>]*required/);
  const team=form.match(/<(?:input|textarea)\b[^>]*name="team"[^>]*>/)?.[0];assert.ok(team,`${lang}/${service.id}: team context`);assert.doesNotMatch(team,/\brequired\b/);
  assert.match(form,new RegExp(`<option\\b[^>]*value="${service.id}"[^>]*selected`),`${lang}/${service.id}: preselected interest`);
  const schemas=[...html.matchAll(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const item=schemas.flatMap(x=>x['@graph']||[x]).find(x=>x['@type']==='Service');assert.ok(item,`${lang}/${service.id}: service schema retained`);assert.ok(item.name);
  assert.ok(item.potentialAction,`${lang}/${service.id}: quote action schema`);
 }
 const home=await readFile(path.join(root,prefix+'index.html'),'utf8');
 assert.doesNotMatch(home.match(/<main[\s\S]*?<\/main>/)[0],/network-section|technology-section/);
 assert.ok(home.includes(`href="${r.join}"`),`${lang}: freelancer route remains in footer`);
 const how=await readFile(path.join(root,r.how,'index.html'),'utf8');
 assert.ok(how.includes(esc(t.techNote)),`${lang}: technology relationship explanation retained on delivery page`);
 for(const item of ecosystem){assert.ok(how.includes(`href="${esc(item.url)}"`));if(item.src)assert.ok(how.includes(`src="${item.src}"`));}
 for(const [route,kind,fields] of [[r.book,'booking',['interest','timezone','preferredTime','language']],[r.join,'join',['country','language','expertise','experience','availability','portfolio']],[r.training,'training',['audience','groupSize','ages','topic','format','dates','goal']]]){
  const html=await readFile(path.join(root,route,'index.html'),'utf8');
  for(const token of [`data-kind="${kind}"`,'action="/api/contact"','method="post"','data-upgrade-form','data-form-status','/assets/upgrade-forms.js','name="name"','name="email"','name="message"',...fields.map(f=>`name="${f}"`)])assert.ok(html.includes(token),`${lang}${route}: ${token}`);
  if(kind==='join'){assert.match(html,/12[.,]5/);assert.ok(html.includes(esc(t.commissionText)));assert.ok(html.includes(esc(t.commissionBasis)));}
  if(kind==='booking')assert.match(html,/awaiting confirmation|afventer bekræftelse|inväntar bekräftelse/i);
 }
}

let checked=0;
for(const file of await pages()){
 const html=await readFile(file,'utf8'),label=path.relative(root,file);
 assert.doesNotMatch(html,/data-price\s*=|data-bundle-tool|class="(?:price|price-line|price-card|bundle-result)"/,`${label}: pricing widget remains`);
 let commercialHtml=html;
 const examples=[...html.matchAll(/<section class="article-calculation-example" data-illustrative-calculation>([\s\S]*?)<\/section>/g)];
 if(examples.length){
  assert(['en','da','sv'].some(lang=>articlePath(lang,'value')==='/'+label),'Illustrative money is allowed only in the scoped ROI article');
  assert.equal(examples.length,1);
  assert.match(examples[0][1],/fictional planning example|fiktivt planlægningseksempel|fiktivt planeringsexempel/);
  assert.match(examples[0][1],/not a client result or a SundAI price|ikke et kunderesultat eller en SundAI-pris|inte ett kundresultat eller ett SundAI-pris/);
  assert.doesNotMatch(examples[0][1],/<form|class="button|itemtype=.*Offer/);
  commercialHtml=commercialHtml.replace(examples[0][0],'');
 }
 const readable=commercialHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ');
 assert.doesNotMatch(readable.replace(/€490\b/g,''),/(?:€|\bEUR\b|\bUSD\b|\bDKK\b|\bSEK\b)\s*[\d]|\d[\d\s.,\u00a0]*\s*(?:€|\bEUR\b|\bUSD\b|\bDKK\b|\bSEK\b)/,`${label}: numeric public price remains`);
 for(const match of html.matchAll(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))noPublicAmounts(JSON.parse(match[1]),label);
 checked++;
}
const js=await readFile(path.join(root,'assets/upgrade.js'),'utf8');
assert.ok(js.includes("new URLSearchParams(window.location.search).get('interest')"),'Service interest query support retained');
assert.ok(js.includes('interest.options].some(option=>option.value===requestedInterest)'),'Interest query only accepts a published option');
assert.doesNotMatch(js,/\.total\b|\.included\b|\.currentPrice\b|\.basePrice\b|\.launchPrice\b/, 'Public client must not render private prices');
await access(path.join(root,'assets/upgrade-mobile.css'));
console.log(`Commercial QA passed: ${checked} HTML pages with only the explicitly scoped €490 entry offer, 18 sales pages with company/team/product proposals, four service areas preserving all six specialist scopes and deliverables, training and meeting links in three languages, retained freelancer route and private catalog math. External delivery, browser rendering and calendar booking were not verified.`);
