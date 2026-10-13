import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

// Open the current homepage directly, even in viewers that block JavaScript.
// Review navigation is local; forms never submit or contact the production API.
const root=path.resolve(import.meta.dirname,'..');
const site=path.join(root,'site'),docs=path.join(root,'docs');
const {routes,generated}=JSON.parse(await readFile(path.join(docs,'upgrade-route-map.json'),'utf8'));
const revision=execFileSync('git',['rev-parse','--short','HEAD'],{cwd:root,encoding:'utf8'}).trim();
const pages={},assets={};
const order=[routes.en.home,routes.en.services,routes.en.join,routes.en.book,...generated];
for(const route of [...new Set(order)]){
 const html=await readFile(path.join(site,route.endsWith('/')?route+'index.html':route),'utf8');
 let body=html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
 for(const [,asset] of body.matchAll(/src="(\/assets\/[^"\s]+)"/g)){
  if(!assets[asset]){
   const binary=await readFile(path.join(site,asset));
   const mime=asset.endsWith('.svg')?'image/svg+xml':asset.endsWith('.webp')?'image/webp':asset.endsWith('.jpg')?'image/jpeg':'image/png';
   assets[asset]=`data:${mime};base64,${binary.toString('base64')}`;
  }
 }
 body=body.replace(/<button([^>]*type="submit"[^>]*)>/g,'<button$1 disabled>');
 body=body.replace(/(<(?:p|div)[^>]*data-form-status[^>]*>)[\s\S]*?(<\/(?:p|div)>)/g,'$1Design review only — this form does not send a request.$2');
 body=body.replace(/<form\b([^>]*)>/g,'<form$1 onsubmit="return false">');
 pages[route]={body,lang:html.match(/<html[^>]*lang="([^"]+)"/)[1],title:html.match(/<title>([^<]+)<\/title>/)[1],kind:html.match(/data-page-kind="([^"]+)"/)?.[1]||''};
}
let css=await readFile(path.join(site,'assets/upgrade.css'),'utf8')+'\n'+await readFile(path.join(site,'assets/upgrade-mobile.css'),'utf8');
for(const font of ['sora-latin.woff2','manrope-latin.woff2']){
 const binary=await readFile(path.join(site,'assets/fonts',font));
 css=css.replaceAll(`/assets/fonts/${font}`,`data:font/woff2;base64,${binary.toString('base64')}`);
}
const json=v=>JSON.stringify(v).replaceAll('<','\\u003c');
const toolbar=`<aside id="review-controls" dir="rtl" aria-label="סקירת הגרסה המעודכנת"><strong>SundAI · הגרסה המעודכנת · ${revision}</strong><label>מעבר לעמוד <select id="review-page">${Object.entries(pages).map(([route,p])=>`<option value="${route}">${p.lang.toUpperCase()} · ${p.title}</option>`).join('')}</select></label><span>תצוגת סקירה • מותאמת גם למובייל • הטפסים אינם שולחים פניות</span><p id="review-status" role="status"></p></aside>`;
const helper=`
const pages=${json(pages)},assets=${json(assets)};
const content=document.getElementById('review-content'),select=document.getElementById('review-page'),status=document.getElementById('review-status');
function scrollToHash(hash){if(!hash){window.scrollTo(0,0);return;}try{document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();}catch{}}
function show(route,hash='',query=''){
 const p=pages[route];if(!p)return;
 content.innerHTML=p.body.replace(/src="(\\/assets\\/[^"\\s]+)"/g,(_,asset)=>'src="'+assets[asset]+'"');select.value=route;document.documentElement.lang=p.lang;document.body.dataset.pageKind=p.kind;document.title=p.title.replaceAll('&amp;','&');status.textContent='';
 const interest=document.querySelector('[name="interest"]'),requested=new URLSearchParams(query).get('interest');
 if(interest&&requested&&[...interest.options].some(o=>o.value===requested))interest.value=requested;
 const timezone=document.querySelector('[name="timezone"]');if(timezone&&!timezone.value)timezone.value=Intl.DateTimeFormat().resolvedOptions().timeZone||'Europe/Copenhagen';
 requestAnimationFrame(()=>scrollToHash(hash));
}
select.addEventListener('change',()=>show(select.value));
document.addEventListener('submit',e=>{e.preventDefault();});
document.addEventListener('click',e=>{
 const menu=document.querySelector('.mobile-menu');if(menu?.open&&!menu.contains(e.target))menu.open=false;
 const a=e.target.closest('a');if(!a)return;
 const href=a.getAttribute('href');if(!href||href.startsWith('#'))return;
 let u;try{u=new URL(href,'https://sundaibot.com'+select.value);}catch{return;}
 if(u.origin!=='https://sundaibot.com')return;
 e.preventDefault();
 if(pages[u.pathname])show(u.pathname,u.hash,u.search);
 else status.textContent='קובץ זה מיועד לסקירת האתר. המשאב המקושר אינו מוטמע בתצוגה המקומית.';
});
document.addEventListener('keydown',e=>{const m=document.querySelector('.mobile-menu');if(e.key==='Escape'&&m?.open){m.open=false;m.querySelector('summary')?.focus();}});
`;
const output=path.join(docs,`SundAI_Updated_${revision}_Open.html`);
const initialBody=pages['/'].body.replace(/src="(\/assets\/[^"\s]+)"/g,(_,asset)=>`src="${assets[asset]}"`);
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow"><meta name="sundai-review-revision" content="${revision}"><title>SundAI · Updated ${revision}</title><style>${css}\n#review-controls{font-family:Arial,sans-serif;background:#15253b;color:#e6f0ff;border-bottom:1px solid #315071;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 22px;padding:10px 18px;font-size:12px;line-height:1.5}#review-controls strong{font-size:12px;letter-spacing:0}#review-controls label{display:flex;align-items:center;gap:8px}#review-controls select{font-family:Arial,sans-serif;background:#08121e;color:#fff;border:1px solid #526582;border-radius:4px;padding:8px;width:min(360px,70vw);font-size:12px}#review-status{width:100%;margin:0;text-align:center}#review-status:empty{display:none}@media(max-width:600px){#review-controls{justify-content:flex-start;font-size:11px}#review-controls strong{width:100%}#review-controls label{width:100%}#review-controls select{width:100%;max-width:100%;min-width:0}}</style></head><body class="sundai-site upgrade-site" data-page-kind="home">${toolbar}<div id="review-content">${initialBody}</div><script>${helper}</script></body></html>`;
await writeFile(output,html);
console.log(JSON.stringify({output,revision,pages:Object.keys(pages).length,embeddedImages:Object.keys(assets).length,bytes:Buffer.byteLength(html),initialPageIsDirectHtml:true}));
