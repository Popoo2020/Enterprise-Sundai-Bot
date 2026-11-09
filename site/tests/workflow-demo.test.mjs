import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {workflowDemo,projectPaths,storyCopy} from '../../scripts/home-story.mjs';
import {testimonials} from '../../scripts/testimonials.mjs';
import {htmlEscape as esc} from '../../scripts/seo-render.mjs';
const script=await readFile(new URL('../assets/workflow-demo.js',import.meta.url),'utf8');

function harness(reduced=false){
 const pending=new Map();let id=0;
 function el(id){const listeners={},classes=new Set();return {id,hidden:false,tabIndex:0,attrs:{},focused:false,
  setAttribute(k,v){this.attrs[k]=v},addEventListener(k,f){listeners[k]=f},fire(k,e={}){listeners[k]?.(e)},focus(){this.focused=true},
  classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x)}}}
 const root=el('root'),tabs=[el('task-tab'),el('knowledge-tab')],panels=[el('task-panel'),el('knowledge-panel')],list=el('tabs'),replay=el('replay'),motion=el('motion');motion.matches=reduced;
 root.querySelectorAll=s=>s==='[data-demo-tab]'?tabs:panels;root.querySelector=s=>s==='[data-demo-tabs]'?list:replay;
 const document=el('document');document.hidden=false;document.querySelectorAll=()=>[root];
 const window=el('window');window.matchMedia=()=>motion;window.requestAnimationFrame=f=>{pending.set(++id,f);return id};window.cancelAnimationFrame=i=>pending.delete(i);
 vm.runInNewContext(script,{document,window});
 return {root,tabs,panels,list,replay,motion,document,window,pending,flush(){for(let i=0;i<3;i++){const batch=[...pending.values()];pending.clear();batch.forEach(f=>f());}}};
}

test('demo preserves both complete readable examples without JavaScript in all languages',()=>{
 for(const lang of ['en','da','sv']){const html=workflowDemo(lang);assert.equal((html.match(/data-demo-panel=/g)||[]).length,2);
  for(const tag of html.matchAll(/<div[^>]+data-demo-panel[^>]*>/g))assert.doesNotMatch(tag[0],/\bhidden\b/);
  assert(html.includes(esc(storyCopy[lang].demoNote)));assert(html.includes(esc(storyCopy[lang].source)));
  assert.match(html,/data-demo-tabs hidden/);assert.match(html,/data-demo-replay hidden/);
  assert.doesNotMatch(html,/<form|<iframe|<video|<canvas/);
 }
});
test('mouse and keyboard tab navigation keep one panel visible and correct focus semantics',()=>{
 const h=harness();assert.equal(h.list.attrs.role,'tablist');assert.deepEqual(h.panels.map(x=>x.hidden),[false,true]);
 h.tabs[1].fire('click');assert.deepEqual(h.panels.map(x=>x.hidden),[true,false]);assert.equal(h.tabs[1].attrs['aria-selected'],'true');
 let prevented=false;h.tabs[1].fire('keydown',{key:'ArrowRight',preventDefault(){prevented=true}});assert(prevented);assert(h.tabs[0].focused);assert.deepEqual(h.panels.map(x=>x.hidden),[false,true]);
 h.tabs[0].fire('keydown',{key:'End',preventDefault(){}});assert(h.tabs[1].focused);assert.equal(h.tabs[0].tabIndex,-1);
 h.tabs[1].fire('keydown',{key:'Home',preventDefault(){}});assert.equal(h.tabs[0].attrs['aria-selected'],'true');
 for(let i=0;i<2;i++){assert.equal(h.tabs[i].attrs['aria-controls'],h.panels[i].id);assert.equal(h.panels[i].attrs['aria-labelledby'],h.tabs[i].id)}
});
test('reduced motion and backgrounding cancel animation without hiding the active content',()=>{
 const reduced=harness(true);reduced.flush();assert(reduced.replay.hidden);assert(reduced.panels.every(x=>!x.classList.contains('is-playing')));
 reduced.tabs[1].fire('click');reduced.flush();assert(!reduced.panels[1].hidden);assert(!reduced.panels[1].classList.contains('is-playing'));
 const h=harness();h.flush();assert(h.panels[0].classList.contains('is-playing'));h.document.hidden=true;h.document.fire('visibilitychange');assert(!h.panels[0].classList.contains('is-playing'));
 h.document.hidden=false;h.replay.fire('click');h.motion.matches=true;h.motion.fire('change');h.flush();assert(h.replay.hidden);assert(h.panels.every(x=>!x.classList.contains('is-playing')));
});
test('home quote is verbatim and project context cannot be mistaken for external client metrics',async()=>{
 for(const lang of ['en','da','sv']){
  const base=lang==='en'?'':lang+'/';const home=await readFile(new URL('../'+base+'index.html',import.meta.url),'utf8');
  assert(home.includes(esc(testimonials[0].quote)));assert(home.includes(esc(testimonials[0].name)));
  assert(home.includes(`href="${projectPaths[lang]}"`));
  const page=await readFile(new URL('..'+projectPaths[lang]+'index.html',import.meta.url),'utf8');
  assert(page.includes(esc(storyCopy[lang].projectSections.at(-1)[1])));
  assert.doesNotMatch(page,/93%|5,700|223 pizzas|independently verified savings/);
 }
});
