import {access,readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const mode=process.argv[2]||'all';
const modes=['files','premium','polish','legacy','legaljs','secondary','home','security'];
if(mode!=='all'&&!modes.includes(mode))throw Error(`Unknown QA mode ${mode}`);
const run=name=>mode==='all'||mode===name;
const css=await readFile(path.join(root,'assets/upgrade.css'),'utf8');
const mobile=await readFile(path.join(root,'assets/upgrade-mobile.css'),'utf8');
const compactCss=css.replace(/\s+/g,''),compactMobile=mobile.replace(/\s+/g,'');
const requireTokens=(source,tokens,label)=>{for(const token of tokens)if(!source.includes(token))throw Error(`${label}: missing ${token}`);};
async function pages(dir=root){const out=[];for(const f of await readdir(dir,{withFileTypes:true})){if(['tests','functions','assets'].includes(f.name))continue;const full=path.join(dir,f.name);if(f.isDirectory())out.push(...await pages(full));else if(f.name.endsWith('.html'))out.push(full);}return out;}
if(run('files')){for(const file of ['index.html','da/index.html','sv/index.html','assets/upgrade.css','assets/upgrade-mobile.css','assets/upgrade.js','assets/upgrade-forms.js','assets/sundai-wordmark-dark.svg','assets/eu-flag.svg','_headers'])await access(path.join(root,file));}
if(run('premium')){
 requireTokens(css,['--bg:#050607','--surface:#101419','--lime:#b9ff66','--blue:#358bff','--text:#f5f7fa','--muted:#b8c0cc','--border:#26303a','color-scheme:dark'],'black design system');
 const faceBlocks=[...css.matchAll(/@font-face\s*\{([^}]+)\}/g)].map(m=>m[1].split('?')[0]);
 for(const name of ['Sora','Manrope']){
  const face=faceBlocks.find(block=>new RegExp(`font-family:\\s*['"]?${name}['"]?`, 'i').test(block));
  if(!face)throw Error(`Missing self-hosted ${name} font`);
  requireTokens(face,['font-display:swap'],name);
  const source=face.match(/url\(['"]?(\/assets\/fonts\/[^'"\s)]+\.woff2)['"]?\)/)?.[1];
  if(!source)throw Error(`${name}: local WOFF2 source required`);
  const file=path.join(root,source);if((await stat(file)).size<20000)throw Error(`${name}: font file appears truncated`);
 }
 if(!/h1\s*,\s*h2\s*,\s*h3(?:\s*,[^{}]+)?\s*\{[^}]*font-family:[^;]*Sora/.test(css))throw Error('Brand heading family must apply to H1, H2 and H3');
 if(!/body\s*\{[^}]*font-family:[^;]*Manrope/.test(css))throw Error('Body font family must use Manrope');
 if(/fonts\.googleapis\.com|fonts\.gstatic\.com|@import/i.test(css+mobile))throw Error('Typography must not add remote render-blocking font requests');
}
if(run('polish')){
 requireTokens(compactCss+compactMobile,['@media(max-width:800px)','@media(max-width:480px)','@media(min-width:1440px)','minmax(0,1fr)','overflow-wrap:anywhere','prefers-reduced-motion','focus-visible','outline:3px','min-height:48px','.table-scroll{overflow:auto}', '.data-forminput,.data-formtextarea,.data-formselect{width:100%;min-width:0'],'responsive/accessibility rules');
 requireTokens(compactMobile,['@media','grid-template-columns:1fr','.hero','.data-form','.service-card','.tech-grid'], 'dedicated mobile composition');
 if(/\.mobile-menu\s*\{[^}]*display:none/.test(mobile))throw Error('Dedicated mobile CSS must preserve mobile navigation');
 if(/\[data-upgrade-form\][^{]*\{[^}]*display:none/.test(mobile))throw Error('Mobile must retain enquiry forms');
}
if(run('legacy')||run('secondary'))for(const file of await pages()){
 const html=await readFile(file,'utf8'),label=path.relative(root,file);
 requireTokens(html,['/assets/upgrade.css','/assets/upgrade-mobile.css','class="skip-link"','<details class="mobile-menu">','id="main"'],label);
 const sheets=[...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
 if(JSON.stringify(sheets)!==JSON.stringify(['/assets/upgrade.css','/assets/upgrade-mobile.css']))throw Error(`${label}: shared base and mobile stylesheets required in cascade order`);
 if(/<link[^>]+href="\/assets\/(?!upgrade(?:-mobile)?\.css)[^"]+\.css/.test(html))throw Error(`${label}: competing stylesheet remains`);
}
if(run('legaljs')){const js=await readFile(path.join(root,'assets/upgrade.js'),'utf8');requireTokens(js,["e.key==='Escape'","menu.open=false","querySelector('summary')?.focus()","!menu.contains(e.target)"],'mobile menu keyboard/dismissal');}
if(run('home'))for(const [file,lang]of [['index.html','en'],['da/index.html','da'],['sv/index.html','sv']]){const html=await readFile(path.join(root,file),'utf8');requireTokens(html,[`lang="${lang}"`,'class="skip-link"','<details class="mobile-menu">','class="workflow"','class="container hero-grid"'],file);if((html.match(/class="service-card"/g)||[]).length!==6)throw Error(`${file}: expected six static service cards`);}
if(run('security')){const headers=await readFile(path.join(root,'_headers'),'utf8');requireTokens(headers,['Content-Security-Policy','Strict-Transport-Security','X-Content-Type-Options'], 'headers');if(headers.includes('Clear-Site-Data'))throw Error('Must not clear browser storage per request');const flag=await readFile(path.join(root,'assets/eu-flag.svg'),'utf8');const stars=(flag.match(/<use\b/g)||[]).length||(flag.match(/<polygon\b/g)||[]).length;for(const polygon of flag.matchAll(/<polygon[^>]+points="([^"]+)"/g))if(polygon[1].trim().split(/\s+/).length!==10)throw Error('EU flag star must have five tips');if(stars!==12||/<circle\b/.test(flag))throw Error(`EU flag requires twelve five-point stars, found ${stars}`);}
console.log(`Source QA passed (${mode}): consistent base/mobile design, local heading/body fonts and accessibility rules. NO viewport rendering performed; 360/390/768/1280/1440 px visual review and Lighthouse remain separate checks.`);
