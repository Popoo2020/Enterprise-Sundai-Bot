import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(root, '..');
const errors = [];

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
  for (const token of ['<meta name="viewport"', '<title>', 'lang="']) if (!html.includes(token)) errors.push(`${rel}: missing ${token}`);
  if (!html.includes('href="/assets/styles.css"') && !html.includes('href="/assets/neon-compact.css')) errors.push(`${rel}: approved stylesheet missing`);
  if (html.includes('href="#"')) errors.push(`${rel}: placeholder href found`);
  if (html.includes('target="_blank"') && !html.includes('rel="noopener')) errors.push(`${rel}: unsafe target=_blank`);
  if (homePages.has(rel)) {
    for (const token of ['hreflang=','data-contact-form','application/ld+json','sundai-wordmark-light.svg','sundai-wordmark-dark.svg','class="audience"','class="founder-strip"','class="insight-meta"']) {
      if (!html.includes(token)) errors.push(`${rel}: missing homepage production token ${token}`);
    }
    if ((html.match(/class="service-card/g) || []).length !== 4) errors.push(`${rel}: expected 4 static service cards`);
    if ((html.match(/class="insight-meta"/g) || []).length !== 3) errors.push(`${rel}: expected 3 static insight metadata blocks`);
  }
  if (html.includes('<form') && (!html.includes('<label') || !html.includes('data-form-status'))) errors.push(`${rel}: form accessibility hooks missing`);
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
  'assets/social-card.png','assets/apple-touch-icon.png','assets/neon-compact.css','assets/neon-compact.js','assets/growth.css','assets/authority-content.css','assets/geo-authority.css','assets/governance-offers.css',
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
  'services/index.html':['AI Governance Consulting','EU AI Act Readiness','AI Security Assessment','Secure AI Adoption'],
  'da/ydelser/index.html':['AI-governance-rådgivning','EU AI Act-parathed','AI-sikkerhedsvurdering','Sikker AI-ibrugtagning'],
  'sv/tjanster/index.html':['Rådgivning inom AI-styrning','EU AI Act-beredskap','AI-säkerhetsbedömning','Säker AI-implementering'],
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
  for (const token of ['rel="canonical"','hreflang=','application/ld+json','WebPage','dateModified','RIIMON HOLDINGS LTD']) if(!html.includes(token)) errors.push(`${page}: missing trust/evidence token ${token}`);
}

const robots = await readFile(path.join(root,'robots.txt'),'utf8');
for (const token of ['OAI-SearchBot','ChatGPT-User','GPTBot','Googlebot','Google-Extended','Bingbot','ClaudeBot','PerplexityBot','Sitemap: https://sundaibot.com/sitemap.xml','Sitemap: https://sundaibot.com/sitemap-research.xml']) if (!robots.includes(token)) errors.push(`robots.txt: missing crawler token ${token}`);

const llms = await readFile(path.join(root,'llms.txt'),'utf8');
for (const token of ['independent European initiative','AI Governance Consulting','EU AI Act Readiness','AI Security Assessment','SundAI AI Control Matrix','European AI Governance Readiness Brief 2026','Evidence and trust','Article 50 AI transparency checklist','AI vendor security review','Secure RAG','Shadow AI governance','Do not invent clients','not a survey']) if (!llms.includes(token)) errors.push(`llms.txt: missing discovery token ${token}`);

const redirects=await readFile(path.join(root,'_redirects'),'utf8');
for(const token of [
  '/insights/eu-ai-act-readiness.html /insights/eu-ai-act-2026-what-applies-now.html 301',
  '/da/insights/eu-ai-act-parathed.html /da/insights/eu-ai-act-2026-hvad-gaelder-nu.html 301',
  '/sv/insights/eu-ai-act-beredskap.html /sv/insights/eu-ai-act-2026-vad-galler-nu.html 301',
  '/insights/ai-assistant-security-baseline.html /insights/secure-rag-ai-assistants.html 301'
]) if(!redirects.includes(token)) errors.push(`_redirects: missing ${token}`);

const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
for(const token of [
  '/services/ai-governance-consulting/','/services/eu-ai-act-readiness/','/services/ai-security-assessment/',
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

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Validated ${htmlFiles.length} HTML pages, multilingual authority content, readiness research, evidence policy, structured data, AI discovery, redirects, sitemaps and deployment files.`);
