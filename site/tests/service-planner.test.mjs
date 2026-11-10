import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {plannerDefinitions,plannerUi,plannerCategory,plannerCta,renderServicePlanner} from '../../scripts/service-planner.mjs';
const require = createRequire(import.meta.url);
const {createPlannerState,buildPlannerBrief,shouldReplaceMessage}=require('../assets/service-planner.js');
const code=readFileSync(new URL('../assets/service-planner.js',import.meta.url),'utf8');
const langs=['en','da','sv'];
const unknown={id:'not-sure',title:{en:'Not sure yet',da:'Ikke sikker endnu',sv:'Inte säker än'},detail:{en:'Let’s work it out together.',da:'Det finder vi ud af sammen.',sv:'Det tar vi reda på tillsammans.'}};
const config=(d,u,lang)=>({briefLabel:u.brief,serviceName:d.name[lang],scopeLabel:u.scope,scope:d.scope[lang],nextLabel:u.nextStep,nextDetail:d.nextStep[lang]});

test('each service maps to the intended buying journey, including training and all security specialisms',()=>{
  assert.equal(plannerCategory('secure-ai-automation'),'business-automation');
  assert.equal(plannerCategory('private-ai-agents-rag'),'ai-assistants');
  for(const id of ['pentesting-red-teaming','devsecops','cloud-security']) assert.equal(plannerCategory(id),'cybersecurity');
  for(const id of ['compliance-ai-governance','training']) assert.equal(plannerCategory(id),'ai-governance-training');
  assert.throws(()=>plannerCategory('invented-service'));
  for(const lang of langs) for(const id of Object.keys(plannerDefinitions)) assert.ok(plannerCta(lang,id).length>10);
});

test('unanswered and unrecognised values cannot advance; back and edit preserve valid choices',()=>{
  const state=createPlannerState([['a','not-sure'],['b','not-sure'],['c','not-sure']]);
  assert.equal(state.next(),false);
  assert.equal(state.select(0,'tampered'),false);
  assert.equal(state.select(7,'a'),false);
  assert.equal(state.select(0,'a'),true);
  assert.equal(state.next(),true);
  assert.equal(state.next(),false);
  assert.equal(state.back(),true);
  assert.equal(state.answers[0],'a');
  state.next();state.select(1,'not-sure');state.next();state.select(2,'c');state.next();
  assert.equal(state.current,3);assert.equal(state.complete,true);assert.equal(state.next(),false);
  state.edit();assert.equal(state.current,0);assert.deepEqual(state.answers,['a','not-sure','c']);
  const snapshot=state.answers;snapshot[0]='tampered';assert.equal(state.answers[0],'a');
  assert.throws(()=>createPlannerState([[]]));
});

test('all 768 localised combinations produce a complete editable brief within 1500 characters',()=>{
  let combinations=0;
  for(const [category,d] of Object.entries(plannerDefinitions)) for(const lang of langs){
    const sets=d.questions.map(q=>[...q.options,unknown]);
    for(const a of sets[0])for(const b of sets[1])for(const c of sets[2]){
      const selections=[a,b,c].map((o,i)=>({label:d.questions[i].label[lang],title:o.title[lang],detail:o.detail[lang]}));
      const brief=buildPlannerBrief(config(d,plannerUi[lang],lang),selections);
      assert.ok(brief.length>=20&&brief.length<=1500,`${category}/${lang}: ${brief.length}`);
      for(const item of selections){assert.ok(brief.includes(item.title));assert.ok(brief.includes(item.detail));}
      assert.ok(brief.includes(d.scope[lang]));assert.ok(brief.includes(d.nextStep[lang]));
      combinations++;
    }
  }
  assert.equal(combinations,768);
  assert.equal(buildPlannerBrief({},[null,null,null]),null);
  assert.throws(()=>buildPlannerBrief({briefLabel:'x'.repeat(1600)},Array(3).fill({label:'a',title:'b',detail:'c'})));
});

test('existing or edited messages require an explicit replacement decision',()=>{
  assert.equal(shouldReplaceMessage('',''),false);
  assert.equal(shouldReplaceMessage('  ',''),false);
  assert.equal(shouldReplaceMessage('A message I wrote',''),true);
  assert.equal(shouldReplaceMessage('Generated plan','Generated plan'),false);
  assert.equal(shouldReplaceMessage('Generated plan + my changes','Generated plan'),true);
});

test('server-rendered planners have useful no-JS examples and no blocked enquiry gate',()=>{
  for(const lang of langs)for(const [category,d] of Object.entries(plannerDefinitions)){
    const html=renderServicePlanner(lang,category);
    assert.match(html,/data-planner-controls hidden/);
    assert.match(html,/class="planner-fallback" data-planner-fallback>/);
    assert.match(html,/href="#proposal"/);
    assert.equal((html.match(/data-planner-step /g)||[]).length,3);
    assert.equal((html.match(/type="radio"/g)||[]).length,12);
    assert.match(html,/role="status" aria-live="polite"/);
    assert.ok(html.includes(d.questions[0].options[0].title[lang].replaceAll('&','&amp;')));
    assert.ok(!html.includes(`<strong data-node-title>${plannerUi[lang].empty}</strong>`));
    assert.ok(!/<script|<form|type="file"|localStorage|sessionStorage/.test(html));
  }
});

class Element {
  constructor(dataset={}){this.dataset=dataset;this.hidden=false;this.disabled=false;this.textContent='';this.handlers={};this.attributes={};this.children=new Map();this.lists=new Map();this.classes=new Set();this.value='';this.checked=false;this.classList={add:(...items)=>items.forEach(i=>this.classes.add(i)),remove:(...items)=>items.forEach(i=>this.classes.delete(i)),toggle:(item,on)=>{on?this.classes.add(item):this.classes.delete(item);}};}
  querySelector(selector){return this.children.get(selector)||null;}
  querySelectorAll(selector){return this.lists.get(selector)||[];}
  addEventListener(name,fn){(this.handlers[name]||=[]).push(fn);}
  setAttribute(key,value){this.attributes[key]=value;}
  removeAttribute(key){delete this.attributes[key];}
  dispatchEvent(event){for(const fn of this.handlers[event.type]||[])fn(event);return true;}
  click(){this.dispatchEvent({type:'click'});}
  focus(){this.focused=true;}
  scrollIntoView(){this.scrolled=true;}
  closest(){return this.parent;}
}
function fixture(category='business-automation',lang='en'){
  const d=plannerDefinitions[category],u=plannerUi[lang];
  const root=new Element({...config(d,u,lang),category,nextText:u.next,reviewText:u.review,selectedText:u.selected,copiedText:u.copied,emptyTitle:u.empty,emptyDetail:u.notChosen});
  const selectors=['controls','fallback','navigation','back','next','hint','review','discuss','edit','replace','replace-action','keep','status'];
  const elements=Object.fromEntries(selectors.map(name=>[name,new Element()]));
  for(const [name,element]of Object.entries(elements))root.children.set(`[data-planner-${name}]`,element);
  elements.review.children.set('h3',new Element());elements.replace.children.set('p',new Element());
  const steps=d.questions.map((q,i)=>{
    const step=new Element({questionLabel:q.label[lang],node:String(i===2?3:i)});
    step.children.set('legend',new Element());
    step.lists.set('input[type="radio"]',[...q.options,unknown].map(o=>{const r=new Element({choiceTitle:o.title[lang],choiceDetail:o.detail[lang]});r.value=o.id;r.parent=new Element();return r;}));
    return step;
  });
  const nodes=Array.from({length:4},()=>{const node=new Element();node.children.set('[data-node-title]',new Element());node.children.set('[data-node-detail]',new Element());return node;});
  const progress=steps.map(()=>new Element()),answers=steps.map(()=>new Element()),preview=new Element();
  root.lists.set('[data-planner-step]',steps);root.lists.set('[data-planner-progress]',progress);root.lists.set('[data-planner-node]',nodes);root.lists.set('[data-planner-answer]',answers);root.children.set('.planner-preview',preview);
  const message=new Element(),metrics=[];
  vm.runInNewContext(code,{document:{querySelectorAll:()=>[root],querySelector:()=>message},window:{matchMedia:()=>({matches:true,addEventListener(){}}),dispatchEvent:event=>metrics.push(event.detail)},CustomEvent:class {constructor(type,options){this.type=type;this.detail=options.detail;}},Event:class {constructor(type){this.type=type;}},setTimeout,clearTimeout});
  const select=(step,index)=>{const list=steps[step].querySelectorAll('input[type="radio"]');list.forEach((radio,i)=>{radio.checked=i===index;});list[index].dispatchEvent({type:'change'});};
  return{root,elements,steps,nodes,progress,answers,preview,message,metrics,select,d,u};
}

test('browser engine updates diagram, preserves back choices and transfers the complete reviewed brief only on request',()=>{
  const f=fixture();
  assert.equal(f.elements.controls.hidden,false);assert.equal(f.elements.fallback.hidden,true);assert.equal(f.elements.next.disabled,true);
  f.select(0,1);
  assert.equal(f.nodes[0].querySelector('[data-node-title]').textContent,'Orders & operations');
  assert.equal(f.elements.next.disabled,false);f.elements.next.click();
  f.select(1,2);f.elements.back.click();assert.equal(f.steps[0].hidden,false);f.elements.next.click();
  assert.equal(f.steps[1].querySelectorAll('input[type="radio"]')[2].checked,true);
  f.elements.next.click();f.select(2,0);f.elements.next.click();
  assert.equal(f.elements.review.hidden,false);assert.equal(f.elements.navigation.hidden,true);
  assert.equal(f.message.value,'');
  assert.deepEqual(f.answers.map(a=>a.textContent),['Orders & operations','Form → business system','Before every action']);
  f.elements.discuss.click();
  assert.ok(f.message.value.includes('Orders & operations'));assert.ok(f.message.value.includes('Before every action'));
  assert.equal(f.message.focused,true);assert.equal(f.message.scrolled,true);
  assert.ok(f.metrics.some(e=>e.event==='planner_completed'));
  for(const event of f.metrics)assert.deepEqual(Object.keys(event).sort(),event.step?['category','event','step']:['category','event']);
});

test('browser engine keeps user edits unless visitor explicitly chooses to replace them',()=>{
  const f=fixture('ai-assistants','sv');
  for(let i=0;i<3;i++){f.select(i,3);f.elements.next.click();}
  f.message.value='My existing project context';f.elements.discuss.click();
  assert.equal(f.elements.replace.hidden,false);assert.equal(f.message.value,'My existing project context');
  f.elements.keep.click();assert.equal(f.elements.replace.hidden,true);assert.equal(f.message.value,'My existing project context');
  f.elements.discuss.click();f.elements['replace-action'].click();
  const first=f.message.value;assert.ok(first.includes('Inte säker än'));
  f.message.value+='\nPlease also consider our team.';
  const edited=f.message.value;
  f.elements.edit.click();f.select(0,0);f.elements.next.click();f.elements.next.click();f.elements.next.click();f.elements.discuss.click();
  assert.equal(f.message.value,edited);assert.equal(f.elements.replace.hidden,false);
  f.elements['replace-action'].click();assert.notEqual(f.message.value,first);assert.ok(f.message.value.includes('Ert interna team'));assert.ok(!f.message.value.includes('Please also'));
});
