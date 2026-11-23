import { projectPaths } from '../home-story.mjs';
import { beginners } from './beginners.mjs';
import { resourcesSection } from './knowledge.mjs';
import { businessSection } from './business.mjs';
import { trainingLanguages } from './training-languages.mjs';
import { renderTrainingPartners } from './training-partners.mjs';
import { readFileSync } from 'node:fs';
import { renderHeader, renderFooter } from './frame.mjs';
import { callUrl, callArrow } from './call.mjs';
import { schoolPilotQuoteLabel } from './school-pilot.mjs';
import { homeCopy } from './home-copy.mjs';
const assetRoot='/assets/brand-home/';
const read=name=>readFileSync(new URL(name,import.meta.url),'utf8');
const hero=read('hero.html.fragment');
const chapters=read('chapters.html.fragment');
function heroFor(locale) {
 const fullPhoto = {en:'Open the full photo',he:'פתיחת התמונה המלאה',sv:'Öppna hela bilden',da:'Åbn hele billedet'}[locale];
 const localizedHero = hero.replace('__FULL_PHOTO__',fullPhoto);
 if (locale === 'en') return localizedHero;
 // Localise the initial photograph before scripts run, including the no-script view.
 return localizedHero.replace(/<(img|strong|span|p)\b([^>]*\bdata-he-key="[^"]+"[^>]*)>([^<]*)/g,(whole,tag,attrs,body)=>{
   const label = attrs.match(new RegExp('data-'+locale+'-text="([^"]*)"'))?.[1];
   if (!label) return whole;
   if (tag === 'img') return '<img'+attrs.replace(/ alt="[^"]*"/,' alt="'+label+'"')+'>'+body;
   return '<'+tag+attrs+'>'+label;
 });
}
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
 const resourceLang = locale === 'he' ? 'en' : locale;
 const plannerSection = {en:'tools/project-brief', sv:'sv/tjanster', da:'da/ydelser'}[resourceLang];
 const beginner = beginners[locale];
 const beginnerRow = '<details class="pc-course"><summary><span><small>'+escape(beginner.label)+'</small><strong>'+escape(beginner.title)+'</strong></span><i aria-hidden="true"></i></summary><div class="pc-course-body"><p>'+escape(beginner.teaser)+'</p><a class="pc-course-link" href="'+course(locale,'beginners')+'">'+escape(beginner.details)+'</a></div></details>';
 return chapters.replace('</span><br><span class="pc-badge">', locale === 'he' ? '</span> <br><span class="pc-badge">' : '</span><br><span class="pc-badge">').replace('__BEGINNER_COURSE_ROW__', beginnerRow).replace('__TEACHING_LANGUAGES__', escape(trainingLanguages[locale].offer)).replace(/__COURSE_(\w+?)_URL__/g,(_,key)=>course(locale,slugs[key]))
   .replace('__TRAINING_PARTNERS__', renderTrainingPartners(locale))
   .replace(/__SERVICE_(\w+?)_URL__/g,(_,key)=>base(locale)+'services/'+key.toLowerCase().replaceAll('_','-')+'/')
   .replaceAll('__RESOURCE_LANG__',resourceLang)
   .replace('__CASE_STUDY_URL__','https://sundaibot.com'+projectPaths[resourceLang])
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
 const section='<section class="fr-landing" aria-labelledby="fr-title"><div class="fr-layout"><div class="fr-copy"><h1 class="fr-title" id="fr-title"><span class="fr-line">'+escape(c.first)+'</span>'+(locale==='he'?' ':'')+'<span class="fr-line"><i class="fr-mark" aria-hidden="true">'+bulb+'</i>'+escape(c.second)+'</span></h1><div id="sd-hero-pills"></div><div class="fr-deck"><div class="fr-hero-links"><a class="fr-action" href="#organisations">'+escape(c.organisations)+'</a><a class="fr-action fr-action-outline" href="#schools">'+escape(c.schools)+'</a><a class="fr-beginner-link" href="'+course(locale,'beginners')+'">'+escape(beginners[locale].homeLink)+'</a></div><p class="fr-lead">'+escape(c.lead)+'</p></div></div><div class="fr-art">'+heroFor(locale)+'</div></div>'+ribbon(c)+'</section>';
 const benefit=c.benefits.map(([title,desc],i)=>'<article class="fr-benefit fr-enter"><img width="132" height="85" loading="lazy" alt="" src="'+assetRoot+['ink-build.svg','ink-check.svg','ink-control.svg'][i]+'"><h2>'+escape(title)+'</h2><p>'+escape(desc)+'</p></article>').join('');
 const banner='<aside class="fr-banner" id="schools" aria-labelledby="class-workshop-title"><h2 id="class-workshop-title">'+escape(c.banner)+'</h2><div class="fr-banner-side"><div class="fr-school-crew fr-enter" aria-hidden="true"><img src="/brand/crew/v2/mark.webp" width="256" height="256" loading="lazy" decoding="async" alt=""><img src="/brand/crew/v2/bot.webp" width="256" height="256" loading="lazy" decoding="async" alt=""></div><p>'+escape(c.bannerLine)+'</p><a class="fr-action" href="'+course(locale,'youth')+'#school-proposal">'+escape(schoolPilotQuoteLabel(locale))+'</a><a class="fc-banner-link" href="'+course(locale,'youth')+'">'+escape(c.bannerCta)+' '+callArrow+'</a></div></aside>';
 const css=['shell','frame','hero','chapters','providers','knowledge'].map(n=>'<link rel="stylesheet" href="'+assetRoot+n+'.css">').join('\n');
 const js=['frame','hero','chapters','shell'].map(n=>'<script defer src="'+assetRoot+n+'.js"></script>').join('\n');
 return '<!doctype html><html lang="'+locale+'" dir="'+dir+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><meta name="robots" content="noindex,nofollow"><title>'+escape(c.title)+'</title><meta name="description" content="'+escape(c.lead)+'"><link rel="icon" href="/assets/favicon.svg">'+css+js+'</head><body><a class="fr-skip" href="#main">'+escape(c.skip)+'</a>'+renderHeader(locale)+'<main id="main">'+section+businessSection(locale,base(locale))+'<section class="fr-why"><div class="fr-container"><div class="fr-benefits">'+benefit+'</div>'+banner+'</div></section>'+chaptersFor(locale)+resourcesSection(locale)+'</main>'+renderFooter(locale)+'</body></html>';
}
