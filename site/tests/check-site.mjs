import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {execFileSync} from 'node:child_process';
import {services} from '../../scripts/upgrade-content.mjs';

const root = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(root, '..');
const errors = [];
const routeMap=JSON.parse(await readFile(path.join(repoRoot,'docs/upgrade-route-map.json'),'utf8'));
const redirectsByPath=new Map(routeMap.redirects.map(r=>[r.from,r.to]));
for(const row of (await readFile(path.join(root,'_redirects'),'utf8')).split('\n')){const [from,to,status]=row.trim().split(/\s+/);if(status==='301'&&from.startsWith('/'))redirectsByPath.set(from,to);}
const titles=new Map(),descriptions=new Map();

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'functions' && entry.name !== 'tests') files.push(...await walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = await walk(root);
if (htmlFiles.length < 61) errors.push(`Expected at least 61 HTML pages, found ${htmlFiles.length}`);
const homePages = new Set(['index.html', path.join('da','index.html'), path.join('sv','index.html')]);

for (const file of htmlFiles) {
  const rel = path.relative(root, file);
  const html = await readFile(file, 'utf8');
  const currentPath='/'+rel.replace(/index\.html$/,'');
  if(/\s(?:on[a-z]+|style)="/i.test(html))errors.push(`${rel}: inline execution/style conflicts with CSP`);
  for(const script of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!/type="application\/ld\+json"/.test(script[1])&&!/src=/.test(script[1])&&script[2].trim())errors.push(`${rel}: inline executable script conflicts with CSP`);
  if(!redirectsByPath.has(currentPath)&&rel!=='404.html')for(const lang of ['en','da','sv'])if(!html.includes('rel="alternate" hreflang="'+lang+'"'))errors.push(`${rel}: missing ${lang} hreflang`);
  if(!redirectsByPath.has(currentPath)&&rel!=='404.html'){for(const [kind,map,value]of [['title',titles,html.match(/<title>([^<]+)<\/title>/)?.[1]],['description',descriptions,html.match(/<meta name="description" content="([^"]+)"/)?.[1]]]){if(!value?.trim())errors.push(`${rel}: empty ${kind}`);else if(map.has(value))errors.push(`${rel}: duplicate ${kind} with ${map.get(value)}`);else map.set(value,rel);}}
  for (const token of ['<meta name="viewport"', '<title>', 'lang="']) if (!html.includes(token)) errors.push(`${rel}: missing ${token}`);
  if (!html.includes('href="/assets/upgrade.css"')) errors.push(`${rel}: upgrade stylesheet missing`);
  for(const runtime of ['neon-compact.js','final-polish.js','full-refresh.js','revenue-funnel.js']) if(html.includes('src="/assets/'+runtime)) errors.push(`${rel}: stale content-changing runtime ${runtime}`);
  if((html.match(/<h1\b/gi)||[]).length!==1) errors.push(`${rel}: expected one H1`);
  for(const token of ['name="description"','rel="canonical"','href="#main"','id="main"','application/ld+json','theme-color" content="#050607"']) if(!html.includes(token)) errors.push(`${rel}: missing ${token}`);
  for(const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) try{JSON.parse(match[1]);}catch{errors.push(`${rel}: invalid JSON-LD`);}
  for(const img of html.matchAll(/<img\b[^>]*>/g)) if(!/\balt="/.test(img[0])) errors.push(`${rel}: image missing alt`);
  for(const link of html.matchAll(/<a\b[^>]*>/g)) if(/target="_blank"/.test(link[0])&&!/rel="[^"]*noopener/.test(link[0])) errors.push(`${rel}: unsafe target`);
  for(const field of html.matchAll(/<(?:input|select|textarea)\b[^>]*>/g)){if(/type="hidden"/.test(field[0]))continue;const offset=field.index;const before=html.slice(0,offset);const id=field[0].match(/id="([^"]+)"/)?.[1];if(before.lastIndexOf('<label')<before.lastIndexOf('</label>')&&!(id&&html.includes('for="'+id+'"'))&&!/aria-label(?:ledby)?=/.test(field[0]))errors.push(`${rel}: field lacks associated label ${field[0]}`);}
  for(const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)){const url=m[1];if(url.startsWith('//')||url.startsWith('/api/'))continue;const [pathname]=url.split(/[?#]/);if(!pathname)continue;const target=path.join(root,pathname,pathname.endsWith('/')?'index.html':'');try{await access(target);}catch{errors.push(`${rel}: broken local URL ${url}`);}}
  if (html.includes('href="#"')) errors.push(`${rel}: placeholder href found`);
  if (html.includes('target="_blank"') && !html.includes('rel="noopener')) errors.push(`${rel}: unsafe target=_blank`);
  if (homePages.has(rel) || /data-page-kind="(?:services|pricing)"/.test(html)) {
    if ((html.match(/class="service-card"/g)||[]).length!==6) errors.push(`${rel}: expected six static core service cards`);
  }
  const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  for(const alternate of (redirectsByPath.has('/'+rel.replace(/index\.html$/,'')) ? [] : html.matchAll(/<link rel="alternate" hreflang="(en|da|sv)" href="https:\/\/sundaibot.com([^"]+)"/g))){
    const target=path.join(root,alternate[2],alternate[2].endsWith('/')?'index.html':'');
    try{const peer=await readFile(target,'utf8');if(!peer.includes('hreflang="'+html.match(/<html lang="([^"]+)"/)?.[1]+'" href="'+canonical+'"'))errors.push(`${rel}: nonreciprocal hreflang ${alternate[1]}`);}catch{errors.push(`${rel}: missing hreflang destination ${alternate[2]}`);}
  }
  if (html.includes('<form') && (!html.includes('<label') || !html.includes('data-form-status'))) errors.push(`${rel}: form accessibility hooks missing`);
  for(const m of html.matchAll(/href="(#[^"]+)"/g))if(!html.includes('id="'+m[1].slice(1)+'"'))errors.push(`${rel}: missing local anchor ${m[1]}`);
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${rel}: duplicate id found`);
  const assetMatches = [...html.matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)].map(m => m[1].split('?')[0]);
  for (const asset of assetMatches) {
    try { await access(path.join(root, asset.slice(1))); }
    catch { errors.push(`${rel}: missing local asset ${asset}`); }
  }
}

const required = [
  'robots.txt','sitemap.xml','sitemap-research.xml','_headers','_routes.json','_redirects','manifest.webmanifest','llms.txt',
  '.well-known/security.txt','7f4e8d2c1b9a46f8a35d0c6e91b2f740.txt',
  'assets/social-card.png','assets/apple-touch-icon.png','assets/upgrade.css','assets/upgrade.js','assets/upgrade-forms.js','functions/_shared/catalog.js',
  'assets/sundai-logo-neon.svg','assets/sundai-wordmark-light.svg','assets/sundai-wordmark-dark.svg','assets/sundai-brand-avatar.svg','assets/hero-ai-control-neon.svg',
  'functions/api/contact.js','functions/_middleware.js','functions/_shared/authority-data.js',
  'services/index.html','da/ydelser/index.html','sv/tjanster/index.html',
  'methodology/index.html','da/metode/index.html','sv/metod/index.html',
  'resources/index.html','da/ressourcer/index.html','sv/resurser/index.html',
  'resources/ai-control-matrix/index.html','da/ressourcer/ai-kontrolmatrix/index.html','sv/resurser/ai-kontrollmatris/index.html',
  'resources/european-ai-governance-readiness-2026/index.html','da/ressourcer/europaeisk-ai-governance-readiness-2026/index.html','sv/resurser/europeisk-ai-styrning-readiness-2026/index.html',
  'resources/downloads/sundai-ai-control-matrix-2026.csv',
  'resources/downloads/sundai-ai-governance-readiness-scorecard-2026.csv','da/ressourcer/downloads/sundai-ai-governance-readiness-scorecard-2026.csv','sv/resurser/downloads/sundai-ai-governance-readiness-scorecard-2026.csv',
  'case-studies/index.html','da/cases/index.html','sv/fallstudier/index.html',
  'trust/index.html','da/tillid/index.html','sv/tillit/index.html',
  'about/index.html','da/om/index.html','sv/om/index.html',
  'industries/index.html','da/brancher/index.html','sv/branscher/index.html',
  'use-cases/index.html','da/anvendelser/index.html','sv/anvandningsfall/index.html',
  'insights/index.html','da/insights/index.html','sv/insights/index.html',
  'insights/eu-ai-act-2026-what-applies-now.html','da/insights/eu-ai-act-2026-hvad-gaelder-nu.html','sv/insights/eu-ai-act-2026-vad-galler-nu.html',
  'insights/article-50-transparency-checklist.html','da/insights/artikel-50-transparens-tjekliste.html','sv/insights/artikel-50-transparens-checklista.html',
  'insights/ai-framework-comparison.html','da/insights/ai-framework-sammenligning.html','sv/insights/ai-ramverk-jamforelse.html',
  'insights/ai-vendor-security-review.html','da/insights/ai-leverandoer-sikkerhedsreview.html','sv/insights/ai-leverantor-sakerhetsgranskning.html',
  'insights/secure-rag-ai-assistants.html','da/insights/sikre-rag-ai-assistenter.html','sv/insights/saker-rag-ai-assistenter.html',
  'insights/shadow-ai-governance.html','da/insights/shadow-ai-governance.html','sv/insights/shadow-ai-styrning.html'
];
for (const file of required) {
  try { await access(path.join(root, file)); }
  catch { errors.push(`Missing required deployment file: ${file}`); }
}

const hubs = {
  'insights/index.html':['EU AI Act 2026','Article 50 transparency','AI vendor security review','Shadow AI governance','AI Control Matrix'],
  'da/insights/index.html':['EU AI Act 2026','Artikel 50','AI-leverandør','Shadow AI','AI-kontrolmatrix'],
  'sv/insights/index.html':['EU AI Act 2026','Artikel 50','AI-leverantör','Shadow AI','AI-kontrollmatris'],
  'resources/index.html':['AI System Inventory','AI Vendor Assessment','AI Impact Assessment','AI Control Matrix','European AI Governance Readiness Brief 2026','AI Governance Readiness Scorecard'],
  'da/ressourcer/index.html':['AI-systemregister','AI-leverandørvurdering','AI-konsekvensvurdering','AI-kontrolmatrix','Europæisk AI-governance Readiness Brief 2026','AI-governance readiness-scorecard'],
  'sv/resurser/index.html':['AI-systemregister','AI-leverantörsbedömning','AI-konsekvensbedömning','AI-kontrollmatris','Europeisk AI-styrning Readiness Brief 2026','Readiness-scorecard för AI-styrning']
};
for (const [page,tokens] of Object.entries(hubs)) {
  const html = await readFile(path.join(root,page),'utf8');
  for (const token of tokens) if (!html.toLowerCase().includes(token.toLowerCase())) errors.push(`${page}: missing authority token ${token}`);
}

const authorityArticles = [
  'insights/eu-ai-act-2026-what-applies-now.html','insights/article-50-transparency-checklist.html','insights/ai-framework-comparison.html','insights/ai-vendor-security-review.html','insights/secure-rag-ai-assistants.html','insights/shadow-ai-governance.html',
  'da/insights/eu-ai-act-2026-hvad-gaelder-nu.html','da/insights/artikel-50-transparens-tjekliste.html','da/insights/ai-framework-sammenligning.html','da/insights/ai-leverandoer-sikkerhedsreview.html','da/insights/sikre-rag-ai-assistenter.html','da/insights/shadow-ai-governance.html',
  'sv/insights/eu-ai-act-2026-vad-galler-nu.html','sv/insights/artikel-50-transparens-checklista.html','sv/insights/ai-ramverk-jamforelse.html','sv/insights/ai-leverantor-sakerhetsgranskning.html','sv/insights/saker-rag-ai-assistenter.html','sv/insights/shadow-ai-styrning.html'
];
for (const page of authorityArticles) {
  const html = await readFile(path.join(root,page),'utf8');
  for (const token of ['rel="canonical"','hreflang=','application/ld+json','datePublished','dateModified','SundAI']) if (!html.includes(token)) errors.push(`${page}: missing SEO/authority token ${token}`);
  if (!html.includes('Article') && !html.includes('TechArticle')) errors.push(`${page}: missing Article structured data`);
}

const matrixPages=['resources/ai-control-matrix/index.html','da/ressourcer/ai-kontrolmatrix/index.html','sv/resurser/ai-kontrollmatris/index.html'];
for (const page of matrixPages) {
  const html=await readFile(path.join(root,page),'utf8');
  for (const token of ['EU AI Act','ISO/IEC 42001','ISO/IEC 27001','NIST AI RMF','TechArticle','dateModified','citation']) if(!html.includes(token)) errors.push(`${page}: missing matrix token ${token}`);
}

const readinessPages={
  'resources/european-ai-governance-readiness-2026/index.html':'Article 50',
  'da/ressourcer/europaeisk-ai-governance-readiness-2026/index.html':'Artikel 50',
  'sv/resurser/europeisk-ai-styrning-readiness-2026/index.html':'Artikel 50'
};
for (const [page,transparencyToken] of Object.entries(readinessPages)) {
  const html=await readFile(path.join(root,page),'utf8');
  for (const token of ['rel="canonical"','hreflang=','application/ld+json','Report','datePublished','dateModified','isBasedOn','DataDownload','ISO/IEC 42001','NIST AI RMF',transparencyToken]) if(!html.includes(token)) errors.push(`${page}: missing readiness research token ${token}`);
}

const trustPages=['trust/index.html','da/tillid/index.html','sv/tillit/index.html'];
for (const page of trustPages) {
  const html=await readFile(path.join(root,page),'utf8');
  for (const token of ['rel="canonical"','hreflang=','application/ld+json','WebPage','dateModified','RIIMON HOLDINGS LTD','13813344']) if(!html.includes(token)) errors.push(`${page}: missing trust/evidence token ${token}`);
}

const robots = await readFile(path.join(root,'robots.txt'),'utf8');
for (const token of ['OAI-SearchBot','ChatGPT-User','GPTBot','Googlebot','Google-Extended','Bingbot','ClaudeBot','PerplexityBot','Sitemap: https://sundaibot.com/sitemap.xml','Sitemap: https://sundaibot.com/sitemap-research.xml']) if (!robots.includes(token)) errors.push(`robots.txt: missing crawler token ${token}`);

const llms = await readFile(path.join(root,'llms.txt'),'utf8');
for (const token of ['SundAI','/pricing/','/book/','/join/','12.5%','SundAI AI Control Matrix','European AI Governance Readiness Brief 2026','Evidence and trust','Article 50 AI transparency checklist','AI vendor security review','Secure RAG','Shadow AI governance','Do not invent clients','not a survey',...services.map(s=>'/services/'+s.id+'/')]) if (!llms.includes(token)) errors.push(`llms.txt: missing discovery token ${token}`);

const redirects=await readFile(path.join(root,'_redirects'),'utf8');
for(const token of [
  '/insights/eu-ai-act-readiness.html /insights/eu-ai-act-2026-what-applies-now.html 301',
  '/da/insights/eu-ai-act-parathed.html /da/insights/eu-ai-act-2026-hvad-gaelder-nu.html 301',
  '/sv/insights/eu-ai-act-beredskap.html /sv/insights/eu-ai-act-2026-vad-galler-nu.html 301',
  '/insights/ai-assistant-security-baseline.html /insights/secure-rag-ai-assistants.html 301'
]) if(!redirects.includes(token)) errors.push(`_redirects: missing ${token}`);

const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
for(const token of [
  ...services.map(s=>'/services/'+s.id+'/'),
  '/insights/eu-ai-act-2026-what-applies-now.html','/insights/article-50-transparency-checklist.html','/insights/ai-framework-comparison.html','/insights/ai-vendor-security-review.html','/insights/secure-rag-ai-assistants.html','/insights/shadow-ai-governance.html',
  '/da/insights/eu-ai-act-2026-hvad-gaelder-nu.html','/sv/insights/eu-ai-act-2026-vad-galler-nu.html',
  '/resources/ai-control-matrix/','/da/ressourcer/ai-kontrolmatrix/','/sv/resurser/ai-kontrollmatris/'
]) if(!sitemap.includes(token)) errors.push(`sitemap.xml: missing ${token}`);
for(const legacy of ['/insights/eu-ai-act-readiness.html</loc>','/insights/ai-assistant-security-baseline.html</loc>','/da/insights/eu-ai-act-parathed.html</loc>','/sv/insights/eu-ai-act-beredskap.html</loc>']) if(sitemap.includes(legacy)) errors.push(`sitemap.xml: redirected legacy URL should not be indexed ${legacy}`);

const researchSitemap=await readFile(path.join(root,'sitemap-research.xml'),'utf8');
for(const token of [
  '/resources/european-ai-governance-readiness-2026/','/da/ressourcer/europaeisk-ai-governance-readiness-2026/','/sv/resurser/europeisk-ai-styrning-readiness-2026/',
  '/trust/','/da/tillid/','/sv/tillit/','/resources/ai-control-matrix/','/da/ressourcer/ai-kontrolmatrix/','/sv/resurser/ai-kontrollmatris/'
]) if(!researchSitemap.includes(token)) errors.push(`sitemap-research.xml: missing ${token}`);

const headers=await readFile(path.join(root,'_headers'),'utf8');
for(const token of ['Content-Security-Policy','Strict-Transport-Security']) if(!headers.includes(token)) errors.push(`_headers: missing ${token}`);
try {
  const indexNowPath=path.join(repoRoot,'.github/workflows/indexnow.yml');
  await access(indexNowPath);
  const indexNow=await readFile(indexNowPath,'utf8');
  for(const token of ['glob.glob(\'site/sitemap*.xml\')','dict.fromkeys(urls)','api.indexnow.org/indexnow']) if(!indexNow.includes(token)) errors.push(`IndexNow workflow missing multi-sitemap token ${token}`);
} catch { errors.push('Missing IndexNow workflow'); }

for(const file of ['assets/upgrade.js','assets/upgrade-forms.js'])try{execFileSync(process.execPath,['--check',path.join(root,file)],{stdio:'pipe'});}catch{errors.push(`${file}: JavaScript syntax invalid`);}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Validated ${htmlFiles.length} HTML pages, multilingual authority content, readiness research, evidence policy, structured data, AI discovery, redirects, sitemaps and deployment files.`);
