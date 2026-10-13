import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
for(const [page,lang,prefix]of [['index.html','en',''],['da/index.html','da','da/'],['sv/index.html','sv','sv/']]){
 const html=await readFile(path.join(root,page),'utf8');
 for(const token of [`<html lang="${lang}"`,'data-page-kind="home"','class="container hero-grid"','class="workflow"','class="hero-subtitle"',`href="/${prefix}book/"`,`href="/${prefix}pricing/"`,`href="/${prefix}join/"`,'/assets/upgrade.css','/assets/upgrade-mobile.css','/assets/eu-flag.svg'])if(!html.includes(token))throw Error(`${page}: missing ${token}`);
 const hero=html.match(/<section class="hero">([\s\S]*?)<\/section>/)?.[1];
 if(!hero)throw Error(`${page}: semantic hero missing`);
 if((hero.match(/<h1\b/g)||[]).length!==1)throw Error(`${page}: one static hero H1 required`);
 const heading=hero.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g,'');
 if(!heading||heading.length>120)throw Error(`${page}: brief, readable hero heading required`);
 if(/\bserious\b|\btop security\b/i.test(hero))throw Error(`${page}: removed wording or unsupported superlative remains`);
 const aside=hero.match(/<aside class="hero-art"[^>]*aria-label="[^"]+"[^>]*>([\s\S]*?)<\/aside>/)?.[1];
 const flow=aside?.match(/<div class="workflow">([\s\S]*?)<\/ol>/)?.[1];
 if(!flow||(flow.match(/<li\b/g)||[]).length!==4)throw Error(`${page}: four HTML workflow controls required`);
 if(!/<ol>/.test(flow)||!flow.includes('step-dot'))throw Error(`${page}: accessible ordered workflow required`);
 if(/<canvas|<video|<iframe/.test(hero))throw Error(`${page}: heavyweight or inaccessible hero replacement`);
 const sheets=[...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
 if(JSON.stringify(sheets)!==JSON.stringify(['/assets/upgrade.css','/assets/upgrade-mobile.css']))throw Error(`${page}: coherent base and mobile design required`);
}
console.log('Static hero QA passed: EN/DA/SV concise value proposition, request/product/network links, base/mobile styling and four-step textual workflow. NO browser visual or viewport rendering was performed.');
