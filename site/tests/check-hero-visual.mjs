import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
for(const [page,lang,prefix]of [['index.html','en',''],['da/index.html','da','da/'],['sv/index.html','sv','sv/']]){
 const html=await readFile(path.join(root,page),'utf8');
 for(const token of [`<html lang="${lang}"`,'data-page-kind="home"','class="container hero-grid"','data-workflow-demo','class="hero-subtitle"',`href="/${prefix}book/"`,`href="/${prefix}pricing/"`,`href="/${prefix}join/"`,'/assets/upgrade.css','/assets/upgrade-mobile.css','/assets/eu-flag.svg'])if(!html.includes(token))throw Error(`${page}: missing ${token}`);
 const hero=html.match(/<section class="hero">([\s\S]*?)<\/section>/)?.[1];
 if(!hero)throw Error(`${page}: semantic hero missing`);
 if((hero.match(/<h1\b/g)||[]).length!==1)throw Error(`${page}: one static hero H1 required`);
 const heading=hero.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g,'');
 if(!heading||heading.length>120)throw Error(`${page}: brief, readable hero heading required`);
 if(/\bserious\b|\btop security\b/i.test(hero))throw Error(`${page}: removed wording or unsupported superlative remains`);
 const demo=hero.match(/<aside class="workflow-demo"[\s\S]*?<\/aside>/)?.[0];
 if(!demo||(demo.match(/data-demo-panel=/g)||[]).length!==2)throw Error(`${page}: both illustrative examples must exist in HTML`);
 if((demo.match(/class="demo-step(?: [^"]*)?"/g)||[]).length<4)throw Error(`${page}: visible workflow steps required`);
 if(!demo.includes('data-demo-replay')||!demo.includes('demoNote')&&!/sample data|eksempeldata|exempeldata/.test(demo))throw Error(`${page}: demo label and replay required`);
 if(/<canvas|<video|<iframe/.test(hero))throw Error(`${page}: heavyweight or inaccessible hero replacement`);
 const sheets=[...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
 if(JSON.stringify(sheets)!==JSON.stringify(['/assets/upgrade.css','/assets/upgrade-mobile.css','/assets/home-story.css']))throw Error(`${page}: coherent base and mobile design required`);
}
console.log('Static hero QA passed: EN/DA/SV concise value proposition, request/product links, local styling and two concrete HTML examples. NO browser visual or viewport rendering was performed.');
