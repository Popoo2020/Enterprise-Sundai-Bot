import {readFile,writeFile,readdir} from 'node:fs/promises';
import {renderBrandHeader,brandRoutes} from '../site/functions/_shared/brand-header.js';
import {renderBrandFooter} from '../site/functions/_shared/brand-footer.js';
import path from 'node:path';
const site=path.resolve(import.meta.dirname,'../site');
const css='<link rel="stylesheet" href="/assets/brand-2026.css?v=20260918d">';
const script='<script defer src="/assets/brand-navigation.js?v=20260918"></script>';
async function walk(folder) {
  for(const entry of await readdir(folder,{withFileTypes:true})) {
    const file=path.join(folder,entry.name);
    if(entry.isDirectory()) {if(!['assets','functions','tests'].includes(entry.name)) await walk(file);continue;}
    if(!entry.name.endsWith('.html'))continue;
    let text=await readFile(file,'utf8');
    const lang=text.match(/<html[^>]+lang="(en|da|sv)"/)?.[1]||'en';
    const rel='/'+path.relative(site,file).replaceAll(path.sep,'/').replace(/index\.html$/,'');
    const alternates={};
    for(const tag of text.match(/<link\b[^>]*>/g)||[]) {
      const l=tag.match(/hreflang="(en|da|sv)"/)?.[1],href=tag.match(/href="([^"]+)"/)?.[1];
      if(l&&href){const u=new URL(href,'https://sundaibot.com');if(u.hostname==='sundaibot.com')alternates[l]=u.pathname;}
    }
    const header=renderBrandHeader(lang,alternates,rel);
    text=/<header\b/.test(text)?text.replace(/<header\b[^>]*>[\s\S]*?<\/header>/,header):text.replace(/<body\b[^>]*>/,m=>m+header);
    if(!text.includes('href="/assets/brand-2026.css')) text=text.replace('</head>',css+script+'\n</head>');
    text=text.replace(/<link\b[^>]*href="\/assets\/brand-2026\.css[^\"]*"[^>]*>/g,css);
    const classes=new Set((text.match(/<body[^>]*class="([^"]*)"/)?.[1]||'').split(/\s+/).filter(Boolean));
    classes.add('sundai-site');
    if(rel===brandRoutes[lang].insights)classes.add('sundai-insights');
    if(rel===brandRoutes[lang].start)classes.add('sundai-enquiry-page');
    text=text.replace(/<body\b[^>]*>/,`<body class="${[...classes].join(' ')}">`);
    const footer=renderBrandFooter(lang);
    text=/<footer\b/.test(text)?text.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/,footer):text.replace('</main>','</main>'+footer);
    if(!/<a\b[^>]*href="#main"/.test(text)) {
      const skip={en:'Skip to content',da:'Gå til indhold',sv:'Hoppa till innehåll'}[lang];
      text=text.replace(/<body\b[^>]*>/,m=>m+`<a class="sundai-skip" href="#main">${skip}</a>`);
    }
    if(!/<main[^>]+id="main"/.test(text))text=text.replace(/<main\b/, '<main id="main"');
    // Keep historic contact links usable on every page, including without JS.
    text=text.replace(/href="(?:\/|\/da\/|\/sv\/)?#contact"/g,`href="${brandRoutes[lang].start}#enquiry"`);
    await writeFile(file,text);
  }
}
await walk(site);
console.log('Updated shared navigation, footer, accessibility link and brand stylesheet on static pages.');
