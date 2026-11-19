import { resourcesSection } from './knowledge.mjs';
import { businessSection } from './business.mjs';
import { trainingLanguages } from './training-languages.mjs';
import { readFileSync } from 'node:fs';
import { renderHeader, renderFooter } from './frame.mjs';
import { callUrl, callArrow } from './call.mjs';
import { homeCopy } from './home-copy.mjs';
const assetRoot='/assets/brand-home/';
const read=name=>readFileSync(new URL(name,import.meta.url),'utf8');
const hero=read('hero.html.fragment');
const chapters=read('chapters.html.fragment');
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const base=locale=>locale==='en'?'/':'/'+locale+'/';
const course=(locale,slug)=>base(locale)+'courses/'+slug+'/';
const resources=[
 ['OpenAI','openai-dark.svg','https://openai.com/','fr-openai'],['GitHub','github-dark.svg','https://github.com/',''],
 ['Microsoft Azure','azure.svg','https://azure.microsoft.com/','fr-symbol'],['Cloudflare','cloudflare.svg','https://www.cloudflare.com/',''],
 ['Shopify','shopify-dark.svg','https://www.shopify.com/',''],['Amazon Web Services','aws.png','https://aws.amazon.com/','fr-symbol'],
 ['ELY-keskus','ely.jpg','https://www.ely-keskus.fi/','fr-ely']
];
const bulb='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 22.5c0-3-5-4.6-5-10.4a9 9 0 0 1 18 0c0 5.8-5 7.4-5 10.4ZM12.5 26h7M14.5 29h3M12 13l4 3 4-3M16 16v6"/></svg>';
const mini=['<path d="m4 8 8-4 8 4-8 4ZM6 11v5c3 3 9 3 12 0v-5"/>','<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M6 21h12m-9-8 2 2 4-5"/>','<path d="m12 3 8 3v7c0 4-4 7-8 9-4-2-8-5-8-9V6Zm-3 9 2 2 4-4"/>'];
function ribbon(copy){
 const items=resources.map(([name,file,href,cls])=>{
   const image='<img class="'+cls+'" src="/assets/brands/'+file+'" alt="'+escape(name)+'" width="108" height="38">';
   return {link:'<a href="'+href+'">'+image+'</a>',twin:'<span>'+image.replace(/alt="[^"]*"/,'alt=""')+'</span>'};
 });
 return '<div class="fr-ribbon"><div class="fr-ribbon-head"><span>'+escape(copy.stack)+'</span><button type="button" class="fr-motion" data-pause="'+escape(copy.pause)+'" data-play="'+escape(copy.play)+'" aria-label="'+escape(copy.pause)+'" aria-pressed="false"><svg viewBox="0 0 15 14" aria-hidden="true"><path d="M3 2h3v10H3zM9 2h3v10H9z"/></svg></button></div><div class="fr-track"><div class="fr-track-group">'+items.map(x=>x.link).join('')+'</div><div class="fr-track-group" aria-hidden="true">'+items.map(x=>x.twin).join('')+'</div></div></div>';
}
function chaptersFor(locale){
 const slugs={YOUTH:'youth',TEACHERS:'teachers',HOSPITAL:'hospital',PUBLIC:'public'};
 const pdfs={YOUTH:'TeenTech',TEACHER:'Teacher',HOSPITAL:'Hospital',PUBLIC:'PublicConsultation'};
 const plannerSection={en:'services',he:'services',sv:'sv/tjanster',da:'da/ydelser'}[locale];
 return chapters.replace('__TEACHING_LANGUAGES__', escape(trainingLanguages[locale].offer)).replace(/__COURSE_(\w+?)_URL__/g,(_,key)=>course(locale,slugs[key]))
   .replace(/__SERVICE_(\w+?)_URL__/g,(_,key)=>base(locale)+'services/'+key.toLowerCase().replaceAll('_','-')+'/')
   .replace('__WORKFLOW_PLANNER_URL__','https://sundaibot.com/'+plannerSection+'/secure-ai-automation/#planner')
   .replace(/__PHOTO_(SCHOOL|TEAM)__/g,(_,key)=>assetRoot+'photo_'+key.toLowerCase()+'.webp')
   .replace(/__PDF_(\w+)__/g,(_,key)=>assetRoot+'SundAI_'+pdfs[key]+'_Syllabus_'+locale.toUpperCase()+'.pdf')
   .replace(/<(span|b|p|h[23]|strong|small)([^>]*\bdata-he="[^"]*"[^>]*)>[^<]*<\/\1>/g,(full,tag,attrs)=>{
       const m=attrs.match(new RegExp('data-'+locale+'="([^"]*)"'));return m?'<'+tag+attrs+'>'+m[1]+'</'+tag+'>':full;
   });
}
export function renderHome(locale='en'){
 if(!homeCopy[locale])throw Error('Unsupported homepage locale: '+locale);
 const c=homeCopy[locale],dir=locale==='he'?'rtl':'ltr';
 const section='<section class="fr-landing" aria-labelledby="fr-title"><div class="fr-layout"><div class="fr-copy"><h1 class="fr-title" id="fr-title"><span class="fr-line">'+escape(c.first)+'</span><span class="fr-line"><i class="fr-mark" aria-hidden="true">'+bulb+'</i>'+escape(c.second)+'</span></h1><div id="sd-hero-pills"></div><div class="fr-deck"><div class="fr-hero-links"><a class="fr-action" href="#organisations">'+escape(c.organisations)+'</a><a class="fr-action fr-action-outline" href="#schools">'+escape(c.schools)+'</a></div><p class="fr-lead">'+escape(c.lead)+'</p></div></div><div class="fr-art">'+hero+'</div></div>'+ribbon(c)+'</section>';
 const benefit=c.benefits.map(([title,desc],i)=>'<article class="fr-benefit fr-enter"><img width="132" height="85" loading="lazy" alt="" src="'+assetRoot+['ink-build.svg','ink-check.svg','ink-control.svg'][i]+'"><h2>'+escape(title)+'</h2><p>'+escape(desc)+'</p></article>').join('');
 const banner='<aside class="fr-banner"><h2>'+escape(c.banner)+'</h2><div class="fr-banner-side"><div class="fr-banner-icons" aria-hidden="true">'+mini.map(x=>'<i><svg viewBox="0 0 24 24">'+x+'</svg></i>').join('')+'</div><p>'+escape(c.bannerLine)+'</p><a class="fr-action" href="'+callUrl(locale,'youth','school-banner')+'">'+escape(c.bannerCall)+'</a><a class="fc-banner-link" href="'+course(locale,'youth')+'">'+escape(c.bannerCta)+' '+callArrow+'</a></div></aside>';
 const css=['shell','frame','hero','chapters','providers','knowledge'].map(n=>'<link rel="stylesheet" href="'+assetRoot+n+'.css">').join('\n');
 const js=['frame','hero','chapters','shell'].map(n=>'<script defer src="'+assetRoot+n+'.js"></script>').join('\n');
 return '<!doctype html><html lang="'+locale+'" dir="'+dir+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><meta name="robots" content="noindex,nofollow"><title>'+escape(c.title)+'</title><meta name="description" content="'+escape(c.lead)+'"><link rel="icon" href="/assets/favicon.svg">'+css+js+'</head><body><a class="fr-skip" href="#main">'+escape(c.skip)+'</a>'+renderHeader(locale)+'<main id="main">'+section+businessSection(locale,base(locale))+'<section class="fr-why"><div class="fr-container"><div class="fr-benefits">'+benefit+'</div>'+banner+'</div></section>'+chaptersFor(locale)+resourcesSection(locale)+'</main>'+renderFooter(locale)+'</body></html>';
}
