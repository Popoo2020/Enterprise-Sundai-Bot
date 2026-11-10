import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {services} from '../../scripts/upgrade-content.mjs';
import {categories,categoryPlannerPath} from '../../scripts/service-categories.mjs';
import {plannerCategory,plannerDefinitions} from '../../scripts/service-planner.mjs';
import {htmlEscape as esc} from '../../scripts/seo-render.mjs';
const {routes}=JSON.parse(await readFile(new URL('../../docs/upgrade-route-map.json',import.meta.url),'utf8'));
const page=route=>readFile(new URL('../'+route.replace(/^\//,'')+'index.html',import.meta.url),'utf8');

test('all four service entries lead to a real localized planner and retain specialist routes',async()=>{
 const expected={
  'business-automation':'secure-ai-automation',
  'ai-assistants':'private-ai-agents-rag',
  cybersecurity:'cloud-security',
  'ai-governance-training':'compliance-ai-governance'
 };
 for(const lang of ['en','da','sv']){
  const home=await page(routes[lang].home),hub=await page(routes[lang].services);
  for(const category of categories){
   const target=`${routes[lang].services}${expected[category.id]}/#planner`;
   assert.equal(categoryPlannerPath(category,routes[lang]),target);
   for(const html of [home,hub])assert.ok(html.includes(`href="${target}"`),`${lang}/${category.id}: visible planner entry`);
   assert.match(await page(target.split('#')[0]),/id="planner"[^>]*data-service-planner|data-service-planner[^>]*id="planner"/);
  }
 }
});

test('21 planners pair an ungated preview with one editable protected enquiry and direct bypass',async()=>{
 for(const lang of ['en','da','sv']){
  for(const [route,interest]of [...services.map(s=>[routes[lang].services+s.id+'/',s.id]),[routes[lang].training,'ai-governance-training']]){
   const html=await page(route),main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
   assert.equal((main.match(/\bid="planner"/g)||[]).length,1,route);
   assert.equal((main.match(/\bid="proposal"/g)||[]).length,1,route);
   assert.ok(main.indexOf('id="planner"')<main.indexOf('id="proposal"'),route);
   const form=main.match(/<form\b[^>]*data-upgrade-form[\s\S]*?<\/form>/)?.[0];
   assert.ok(form,route);
   assert.equal((main.match(/<form\b/g)||[]).length,1,route);
   assert.match(form,/data-kind="enquiry" action="\/api\/contact" method="post"/);
   assert.ok(form.includes(`name="interest" value="${interest}"`),route);
   const textarea=form.match(/<textarea\b[^>]*>/)?.[0];
   assert.ok(textarea,route);assert.doesNotMatch(textarea,/readonly|disabled/);
   const required=[...form.matchAll(/<(?:input|select|textarea)\b[^>]*\brequired\b[^>]*>/g)].map(m=>m[0].match(/name="([^"]+)"/)[1]);
   assert.deepEqual(required.sort(),['email','message','name'],`${route}: no forced scheduling or repeated qualification`);
   assert.match(main,/href="#proposal"/);
   const fallback=main.match(/<div class="planner-fallback"[^>]*>([\s\S]*?)<\/div>/)?.[1];
   assert.ok(fallback,`${route}: no-script fallback remains visible`);
   assert.ok(fallback.includes(esc(plannerDefinitions[plannerCategory(interest)].scope[lang])),`${route}: no-script scope stays useful`);
   assert.ok(fallback.includes('href="#proposal"'),`${route}: direct enquiry without planner execution`);
   assert.doesNotMatch(main,/<input[^>]*type="file"|data-lead-form|data-security-check/);
   assert.ok(html.indexOf('/assets/upgrade-forms.js')<html.indexOf('/assets/service-planner.js'),route);
  }
 }
});

test('customer navigation stays focused while the freelancer route remains available in the footer',async()=>{
 for(const lang of ['en','da','sv'])for(const route of [routes[lang].services,routes[lang].training,...services.map(s=>routes[lang].services+s.id+'/')]){
  const html=await page(route),header=html.match(/<header\b[\s\S]*?<\/header>/)[0],footer=html.match(/<footer\b[\s\S]*?<\/footer>/)[0];
  assert.ok(!header.includes(`href="${routes[lang].join}"`),route);
  assert.ok(footer.includes(`href="${routes[lang].join}"`),route);
 }
});
