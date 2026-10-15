import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile,readdir} from 'node:fs/promises';
import {experienceCopy,guideHubPath} from '../../scripts/home-experience.mjs';
import {guideIds,guideTitles} from '../../scripts/lead-content.mjs';
import {htmlEscape as esc} from '../../scripts/seo-render.mjs';
const motionScript=await readFile(new URL('../assets/scroll-reveal.js',import.meta.url),'utf8');
const page=route=>readFile(new URL('../'+route.replace(/^\//,'')+(route.endsWith('/')?'index.html':''),import.meta.url),'utf8');

test('each homepage offers one guide invitation and six buying reasons before client feedback',async()=>{
 for(const lang of ['en','da','sv']){
  const base=lang==='en'?'/':`/${lang}/`,html=await page(base),t=experienceCopy[lang];
  const main=html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
  assert.equal((main.match(/class="section guide-promo"/g)||[]).length,1);
  assert.equal((main.match(/class="why-reason"/g)||[]).length,6);
  assert(main.indexOf('id="services"')<main.indexOf('id="why-sundai"'));
  assert(main.indexOf('id="why-sundai"')<main.indexOf('id="project-examples"'));
  assert(main.includes(esc(t.guideTitle)));assert(main.includes(`href="${guideHubPath(lang)}"`));
  for(const [title,body]of t.reasons){assert(main.includes(esc(title)));assert(main.includes(esc(body)))}
  for(const title of guideTitles[lang])assert(!main.includes(esc(title)),'individual brochures live off the homepage');
  assert.doesNotMatch(main,/data-lead-form|class="guide-library-card"|class="growth-card"/);
  assert.equal((main.match(/class="testimonial-slide"/g)||[]).length,4);
 }
});

test('guide hubs explain each audience and next step, and keep every localized PDF capture route',async()=>{
 for(const lang of ['en','da','sv']){
  const html=await page(guideHubPath(lang)),t=experienceCopy[lang];
  assert.equal((html.match(/class="guide-library-card"/g)||[]).length,3);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert(html.includes(esc(t.libraryHow)));
  for(const [i,id]of guideIds.entries()){
   const route=guideHubPath(lang)+id+'/';assert(html.includes(`href="${route}"`));
   assert(html.includes(esc(t.libraryCards[i].outcome)));assert(html.includes(esc(t.libraryCards[i].audience)));
   const guide=await page(route);assert(guide.includes(`data-guide="${id}"`));assert.match(guide,/action="\/api\/leads" method="post"/);
   const pdf=await readFile(new URL(`../downloads/${id}-${lang}.pdf`,import.meta.url));assert.equal(pdf.subarray(0,4).toString(),'%PDF');
  }
 }
});

async function htmlFiles(dir){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){if(['assets','functions','tests'].includes(e.name))continue;const u=new URL(e.name+(e.isDirectory()?'/':''),dir);if(e.isDirectory())files.push(...await htmlFiles(u));else if(e.name.endsWith('.html'))files.push(u)}return files}
test('desktop, mobile and footer navigation expose the localized guide hub throughout the site',async()=>{
 const files=await htmlFiles(new URL('../',import.meta.url));assert(files.length>=186);
 for(const file of files){const html=await readFile(file,'utf8');if(!html.includes('upgrade-site'))continue;const lang=html.match(/<html lang="([^"]+)"/)[1],route=guideHubPath(lang);
  const header=html.match(/<header\b[\s\S]*?<\/header>/)[0],footer=html.match(/<footer\b[\s\S]*?<\/footer>/)[0];
  const desktop=header.match(/<nav class="desktop-nav"[^>]*>([\s\S]*?)<\/nav>/)[1];
  const mobile=header.match(/<details class="mobile-menu">([\s\S]*?)<\/details>/)[1];
  assert(desktop.includes(`href="${route}"`),file.pathname);assert(mobile.includes(`href="${route}"`),file.pathname);
  assert(footer.includes(`href="${route}"`),file.pathname);
  assert.match(html,/<script defer src="\/assets\/scroll-reveal.js\?v=20261015"><\/script>/);
 }
});

function harness({reduced=false,mobile=false,observer=true,waapi=true}={}){
 const animations=[],observers=[],listeners={};
 class E{
  constructor(classes='',top=1200,children=[]){this.classes=classes.split(' ');this.children=children;this.dataset={};this.hidden=false;this.top=top;this.textContent='Visible content';this.base='none'}
  matches(selector){return selector.split(',').some(s=>s.startsWith('.')?this.classes.includes(s.slice(1)):this.classes.includes(s))}
  querySelector(selector){if(selector===':scope > .container')return this.children.find(n=>n.classes.includes('container'));if(selector==='form')return this.children.find(n=>n.classes.includes('form')||n.querySelector('form'))||null;return null}
  contains(node){return this===node||this.children.some(child=>child.contains(node))}
  getBoundingClientRect(){return {top:this.top,bottom:this.top+120,width:500,height:120}}
  animate(frames,options){let resolve,reject;const finished=new Promise((yes,no)=>{resolve=yes;reject=no});const animation={frames,options,finished,cancelled:false,finish:resolve,cancel(){this.cancelled=true;reject(new Error('cancelled'))}};animations.push(animation);return animation}
 }
 if(!waapi)E.prototype.animate=undefined;
 const hero=new E('hero-copy',100),cards=Array.from({length:5},()=>new E('service-card'));
 const focusLink=new E('a');cards[0].children=[focusLink];cards[1].base='matrix(1, 0, 0, 1, 0, 0)';
 const form=new E('form'),formPanel=new E('panel',1200,[form]),controls=new E('testimonial-controls');
 const group=new E('grid',1200,cards),container=new E('container',100,[hero,group,formPanel,controls]),section=new E('section',100,[container]);
 const document={hidden:false,activeElement:null,querySelectorAll:()=>[section],addEventListener:(n,fn)=>listeners[n]=fn};
 const motion={matches:reduced,addEventListener:(n,fn)=>listeners.motion=fn};
 const window={innerHeight:800,matchMedia:q=>q.includes('reduced')?motion:{matches:mobile},addEventListener:(n,fn)=>listeners[n]=fn};
 class IO{constructor(fn){this.fn=fn;this.observed=new Set();observers.push(this)}observe(n){this.observed.add(n)}unobserve(n){this.observed.delete(n)}disconnect(){this.observed.clear()}}
 if(observer)window.IntersectionObserver=IO;
 vm.runInNewContext(motionScript,{document,window,Element:E,IntersectionObserver:IO,getComputedStyle:n=>({transform:n.base})});
 return {hero,cards,formPanel,controls,focusLink,document,motion,listeners,animations,observers,
 enter:(nodes=cards)=>{nodes.forEach(n=>n.top=690);observers.at(-1).fn(nodes.map(target=>({target,isIntersecting:true})))},
 flush:()=>new Promise(resolve=>setImmediate(resolve))};
}

test('scroll reveals start on entry, stagger briefly and play once without hiding initial content',async()=>{
 const h=harness();assert.equal(h.hero.dataset.motionState,'done');assert.equal(h.animations.length,0);
 assert(h.cards.every(c=>c.dataset.motionState==='pending'&&!c.hidden));
 assert(!h.observers[0].observed.has(h.formPanel));assert(!h.observers[0].observed.has(h.controls));
 h.enter();assert.equal(h.animations.length,5);
 assert.deepEqual(h.animations.map(a=>a.options.delay),[0,70,140,210,210]);
 assert.equal(h.animations[0].options.duration,680);assert.equal(h.animations[0].frames[0].transform,'translateY(28px)');
 assert(h.animations[1].frames[0].transform.endsWith(h.cards[1].base));
 h.animations.forEach(a=>a.finish());await h.flush();assert(h.cards.every(c=>c.dataset.motionState==='done'));
 h.enter();assert.equal(h.animations.length,5);assert(!('scroll' in h.listeners));assert(!('wheel' in h.listeners));
});

test('mobile reveals use a shorter distance, duration and stagger',()=>{
 const h=harness({mobile:true});h.enter();assert.equal(h.animations[0].frames[0].transform,'translateY(14px)');assert.equal(h.animations[0].options.duration,460);assert.equal(h.animations[4].options.delay,135);
});

test('reduced motion and missing APIs leave all text readable; enabling reduction stops active and pending motion',async()=>{
 const h=harness({reduced:true});assert.equal(h.observers.length,0);assert.equal(h.animations.length,0);assert(h.cards.every(c=>!c.hidden));
 for(const opts of [{observer:false},{waapi:false}]){const fallback=harness(opts);assert.equal(fallback.animations.length,0);assert.equal(fallback.observers.length,0)}
 const active=harness();active.enter([active.cards[0]]);active.motion.matches=true;active.listeners.motion();await active.flush();assert(active.animations[0].cancelled);assert(active.cards.every(c=>c.dataset.motionState==='done'));assert.equal(active.observers[0].observed.size,0);
});

test('keyboard focus, background tabs and printing cannot leave content faded or delayed',async()=>{
 const h=harness();h.document.activeElement=h.focusLink;h.listeners.focusin({target:h.focusLink});h.enter([h.cards[0]]);assert.equal(h.animations.length,0);
 h.document.activeElement=null;h.enter([h.cards[1]]);h.document.hidden=true;h.listeners.visibilitychange();await h.flush();assert(h.animations[0].cancelled);
 h.document.hidden=false;h.enter([h.cards[2]]);h.listeners.beforeprint();await h.flush();assert(h.animations[1].cancelled);assert(h.cards.every(c=>c.dataset.motionState==='done'));
});
