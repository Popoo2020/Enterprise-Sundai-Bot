import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {testimonials,testimonialCopy,clientTestimonials} from '../../scripts/testimonials.mjs';
import {htmlEscape as esc} from '../../scripts/seo-render.mjs';
import {services} from '../../scripts/upgrade-content.mjs';
const script=await readFile(new URL('../assets/testimonials.js',import.meta.url),'utf8');

function element(dataset={}) {
 const handlers={},classes=new Set(),attrs={};
 return {dataset,attrs,hidden:false,disabled:false,textContent:'',inert:false,
  classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle:(x,yes)=>yes?classes.add(x):classes.delete(x)},
  setAttribute:(k,v)=>attrs[k]=v,addEventListener:(k,v)=>handlers[k]=v,fire:(k,v={})=>handlers[k]?.(v)};
}
function harness({reduced=false,observer=true,animated=true}={}) {
 const root=element({carouselLabel:'carousel',pauseLabel:'Pause',playLabel:'Play',reducedLabel:'Automatic rotation off'});
 const controls=element(),toggle=element(),prev=element(),next=element(),counter=element(),status=element();
 const animations=[],timers=new Map();let tid=0,observe;
 const slides=testimonials.map((_,i)=>{const node=element({slideLabel:`${i+1} of 4`,slideDescription:'testimonial'});if(animated)node.animate=(frames,options)=>{let finish;const finished=new Promise(resolve=>finish=resolve);const animation={frames,options,finished,finish,cancel:finish};animations.push(animation);return animation};return node});
 const mapping={'.testimonial-controls':controls,'[data-testimonial-toggle]':toggle,'[data-testimonial-prev]':prev,'[data-testimonial-next]':next,'.testimonial-counter':counter,'.testimonial-status':status};
 root.querySelector=s=>mapping[s];root.querySelectorAll=()=>slides;root.contains=node=>Object.values(mapping).includes(node)||slides.includes(node);
 const document=element();document.hidden=false;document.querySelectorAll=()=>[root];
 const motion=element();motion.matches=reduced;
 const window={matchMedia:()=>motion};
 class IO {constructor(fn){observe=fn}observe(){}}
 if(observer)window.IntersectionObserver=IO;
 vm.runInNewContext(script,{document,window,IntersectionObserver:IO,setTimeout:(fn,ms)=>{timers.set(++tid,{fn,ms});return tid},clearTimeout:id=>timers.delete(id)});
 return {root,slides,controls,toggle,prev,next,counter,status,motion,document,timers,animations,
  enter:(ratio=.5)=>observe?.([{isIntersecting:ratio>0,intersectionRatio:ratio}]),
  tick:()=>{const [id,timer]=[...timers][0]||[];assert(timer,'rotation is scheduled');timers.delete(id);timer.fn()},
  finish:async()=>{animations.forEach(a=>a.finish());await new Promise(resolve=>setImmediate(resolve))},
  current:()=>slides.findIndex(s=>s.classList.contains('is-current'))};
}

test('all 27 replacement pages contain the four complete attributed quotes and no fictional client section',async()=>{
 for(const lang of ['en','da','sv']){
  const prefix=lang==='en'?'':lang+'/';const hub=lang==='en'?'services':lang==='da'?'ydelser':'tjanster';
  for(const relative of ['index.html',hub+'/index.html','customer-scenarios/index.html',...services.map(s=>hub+'/'+s.id+'/index.html')]){
   const html=await readFile(new URL('../'+prefix+relative,import.meta.url),'utf8');
   assert.equal((html.match(/class="testimonial-slide"/g)||[]).length,4,relative);
   assert.equal((html.match(/id="testimonials-heading"/g)||[]).length,1);
   assert.equal((html.match(/<h1\b/g)||[]).length,1);
   assert(html.includes(esc(testimonialCopy[lang].title)));
   for(const item of testimonials){assert(html.includes(esc(item.quote)));assert(html.includes(esc(item.organisation)));assert(html.includes(esc(item.role)));if(item.name)assert(html.includes(esc(item.name)))}
   assert.match(html,/<script defer src="\/assets\/testimonials.js\?v=20261015"><\/script>/);
   assert.doesNotMatch(html,/data-scenario=|scenario-output|Fictional scenarios showing|These three scenarios illustrate|AggregateRating|"@type":"Review"/);
  }
 }
 assert.equal(testimonials[2].name,'');
 assert.equal(testimonials[3].quote.includes('seamless ,'),false);
});

test('without JavaScript every quote is visible and controls are hidden',()=>{
 const html=clientTestimonials('en');
 for(const figure of html.matchAll(/<figure\b[^>]*>/g))assert.doesNotMatch(figure[0],/aria-hidden|\bhidden\b|\binert\b/);
 assert.match(html,/<div class="testimonial-controls" hidden>/);
 assert.equal((html.match(/<blockquote lang="en">/g)||[]).length,4);
});

test('autoplay waits for visibility, leaves reading time, moves left in 500ms and wraps',async()=>{
 const h=harness();assert.equal(h.timers.size,0);h.enter(.1);assert.equal(h.timers.size,0);h.enter();
 for(const expected of [1,2,3,0]){
  assert.equal([...h.timers.values()][0].ms,24000);h.tick();assert.equal(h.current(),expected);
  const [outgoing,incoming]=h.animations.slice(-2);assert.equal(outgoing.options.duration,500);assert.equal(incoming.options.duration,500);
  assert.equal(outgoing.frames[1].transform,'translateX(-100%)');assert.equal(incoming.frames[0].transform,'translateX(100%)');
  assert.equal(h.timers.size,0);await h.finish();assert.equal(h.timers.size,1);
  assert.equal(h.slides.filter(s=>s.attrs['aria-hidden']==='false').length,1);
  assert.equal(h.slides.filter(s=>!s.inert).length,1);
 }
 assert.equal(h.counter.textContent,'01 / 04');assert.equal(h.status.textContent,'');
 h.enter(0);assert.equal(h.timers.size,0);
});

test('manual navigation pauses, wraps backwards, announces only the selected quote and ignores rapid double clicks',async()=>{
 const h=harness();h.enter();h.prev.fire('click');assert.equal(h.current(),3);assert.equal(h.toggle.textContent,'Play');assert.equal(h.timers.size,0);assert.equal(h.status.textContent,'testimonial 4 of 4');
 h.next.fire('click');assert.equal(h.current(),3);await h.finish();assert.equal(h.timers.size,0);
 h.next.fire('click');await h.finish();assert.equal(h.current(),0);h.toggle.fire('click');assert.equal(h.timers.size,1);
 h.toggle.fire('click');assert.equal(h.timers.size,0);
});

test('hover, keyboard focus and hidden documents stop rotation without losing the current quote',()=>{
 const h=harness();h.enter();h.root.fire('pointerenter',{pointerType:'mouse'});assert.equal(h.timers.size,0);h.root.fire('pointerleave');assert.equal(h.timers.size,1);
 h.root.fire('pointerenter',{pointerType:'touch'});assert.equal(h.timers.size,1);
 h.document.hidden=true;h.document.fire('visibilitychange');assert.equal(h.timers.size,0);h.document.hidden=false;h.document.fire('visibilitychange');assert.equal(h.timers.size,1);
 h.root.fire('focusin',{target:h.next});assert.equal(h.timers.size,0);h.root.fire('focusout',{relatedTarget:null});assert.equal(h.timers.size,0);
 h.root.fire('focusin',{target:h.toggle});h.toggle.fire('click');assert.equal(h.timers.size,1);assert.equal(h.current(),0);
});

test('reduced motion disables automatic movement but preserves manual access; preference changes cancel an active animation',async()=>{
 const h=harness({reduced:true});h.enter();assert.equal(h.timers.size,0);assert(h.toggle.disabled);h.next.fire('click');assert.equal(h.current(),1);assert.equal(h.animations.length,0);
 h.toggle.fire('click');assert.equal(h.timers.size,0);
 const active=harness();active.enter();active.tick();active.motion.matches=true;active.motion.fire('change');await active.finish();assert.equal(active.timers.size,0);assert(active.toggle.disabled);assert(!active.slides.some(s=>s.classList.contains('is-leaving')));
});

test('older browsers retain manual navigation without visibility observation or animations',()=>{
 const h=harness({observer:false,animated:false});assert.equal(h.timers.size,0);h.next.fire('click');assert.equal(h.current(),1);assert.equal(h.status.textContent,'testimonial 2 of 4');
});
