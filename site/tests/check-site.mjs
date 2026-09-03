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
if (htmlFiles.length < 37) errors.push(`Expected at least 37 HTML pages, found ${htmlFiles.length}`);
const homePages = new Set(['index.html', path.join('da','index.html'), path.join('sv','index.html')]);

for (const file of htmlFiles) {
  const rel = path.relative(root, file);
  const html = await readFile(file, 'utf8');
  for (const token of ['<meta name="viewport"', '<title>', 'lang="']) if (!html.includes(token)) errors.push(`${rel}: missing ${token}`);
  if (!html.includes('href="/assets/styles.css"') && !html.includes('href="/assets/neon-compact.css')) errors.push(`${rel}: approved stylesheet missing`);
  if (html.includes('href="#"')) errors.push(`${rel}: placeholder href found`);
  if (html.includes('target="_blank"') && !html.includes('rel="noopener')) errors.push(`${rel}: unsafe target=_blank`);
  if (homePages.has(rel)) {
    for (const token of ['hreflang=','data-contact-form','application/ld+json','sundai-wordmark-light.svg','sundai-wordmark-dark.svg','eu-service-mark.svg','class="audience"','class="founder-strip"','class="insight-meta"']) {
      if (!html.includes(token)) errors.push(`${rel}: missing homepage production token ${token}`);
    }
    const serviceCards = (html.match(/class="service-card/g) || []).length;
    if (serviceCards !== 4) errors.push(`${rel}: expected 4 static service cards, found ${serviceCards}`);
    const insightMeta = (html.match(/class="insight-meta"/g) || []).length;
    if (insightMeta !== 3) errors.push(`${rel}: expected 3 static insight metadata blocks, found ${insightMeta}`);
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

for (const required of [
  'robots.txt','sitemap.xml','_headers','_routes.json','_redirects','manifest.webmanifest','llms.txt',
  '.well-known/security.txt','7f4e8d2c1b9a46f8a35d0c6e91b2f740.txt',
  'assets/social-card.png','assets/apple-touch-icon.png','assets/neon-compact.css','assets/neon-compact.js','assets/training.css','assets/ai-discovery.css','assets/final-polish.css','assets/final-polish.js','assets/governance-offers.css',
  'assets/sundai-logo-neon.svg','assets/sundai-wordmark-light.svg','assets/sundai-wordmark-dark.svg','assets/sundai-brand-avatar.svg','assets/hero-ai-control-neon.svg','assets/eu-service-mark.svg',
  'functions/api/contact.js','training/index.html','da/kurser-foredrag/index.html','sv/utbildning-forelasningar/index.html',
  'services/index.html','da/ydelser/index.html','sv/tjanster/index.html',
  'services/secure-ai-automation/index.html','da/ydelser/sikker-ai-automatisering/index.html','sv/tjanster/saker-ai-automatisering/index.html',
  'methodology/index.html','da/metode/index.html','sv/metod/index.html',
  'resources/index.html','da/ressourcer/index.html','sv/resurser/index.html',
  'case-studies/index.html','da/cases/index.html','sv/fallstudier/index.html',
  'resources/downloads/ai-system-inventory-template.csv','resources/downloads/ai-vendor-assessment-checklist.md','resources/downloads/ai-impact-assessment-starter.md',
  'da/ressourcer/downloads/ai-systemregister-skabelon.csv','da/ressourcer/downloads/ai-leverandoervurdering.md','da/ressourcer/downloads/ai-konsekvensvurdering-start.md',
  'sv/resurser/downloads/ai-systemregister-mall.csv','sv/resurser/downloads/ai-leverantorsbedomning.md','sv/resurser/downloads/ai-konsekvensbedomning-start.md',
  'about/index.html','da/om/index.html','sv/om/index.html',
  'industries/index.html','da/brancher/index.html','sv/branscher/index.html',
  'use-cases/index.html','da/anvendelser/index.html','sv/anvandningsfall/index.html'
]) {
  try { await access(path.join(root, required)); }
  catch { errors.push(`Missing required deployment file: ${required}`); }
}

for (const [page, tokens] of Object.entries({
  'index.html':['Who we help','Industries','Use cases','Founded by Eric Rimón','5 min read','AI Governance'],
  'da/index.html':['Hvem vi hjælper','Brancher','Anvendelser','Grundlagt af Eric Rimón','5 min. læsning','AI-governance'],
  'sv/index.html':['Vilka vi hjälper','Branscher','Användningsfall','Grundat av Eric Rimón','5 min läsning','AI-styrning'],
  'services/index.html':['AI Governance Starter','AI Vendor & System Review','Governance, Adoption & Control','Secure AI Adoption & Solution Delivery','Purpose-built AI solutions','id="automation"'],
  'da/ydelser/index.html':['AI Governance Starter','Review af AI-leverandør og system','Governance, ibrugtagning og kontrol','Sikker AI-ibrugtagning og løsningsudvikling','Målrettede AI-løsninger','id="automation"'],
  'sv/tjanster/index.html':['AI Governance Starter','Granskning av AI-leverantör och system','Styrning, införande och kontroll','Säker AI-implementering och lösningsutveckling','Ändamålsbyggda AI-lösningar','id="automation"'],
  'services/secure-ai-automation/index.html':['Secure AI Adoption & Solution Delivery','Turn a costly workflow','measurable business value','Solution architecture','controlled pilot','Does the service guarantee cost savings?','ISO/IEC 42001','NIST AI RMF'],
  'da/ydelser/sikker-ai-automatisering/index.html':['Sikker AI-ibrugtagning og løsningsudvikling','målbar forretningsværdi','Løsningsarkitektur','kontrolleret pilot','Garanterer ydelsen besparelser?','ISO/IEC 42001','NIST AI RMF'],
  'sv/tjanster/saker-ai-automatisering/index.html':['Säker AI-implementering och lösningsutveckling','mätbart verksamhetsvärde','Lösningsarkitektur','kontrollerad pilot','Garanterar tjänsten kostnadsbesparingar?','ISO/IEC 42001','NIST AI RMF'],
  'methodology/index.html':['Human oversight','ISO/IEC 42001','Fairness & accessibility','NIST AI RMF'],
  'da/metode/index.html':['Menneskeligt tilsyn','ISO/IEC 42001','NIST AI RMF'],
  'sv/metod/index.html':['Mänsklig tillsyn','ISO/IEC 42001','NIST AI RMF'],
  'resources/index.html':['AI System Inventory','AI Vendor Assessment','AI Impact Assessment Starter'],
  'da/ressourcer/index.html':['AI-systemregister','AI-leverandørvurdering','AI-konsekvensvurdering'],
  'sv/resurser/index.html':['AI-systemregister','AI-leverantörsbedömning','AI-konsekvensbedömning'],
  'case-studies/index.html':['Illustrative delivery scenarios','Municipal AI inventory','Copilot risk','Secure generative AI adoption'],
  'da/cases/index.html':['Illustrative leveringsscenarier','Kommunalt AI-register','Review af copilot','Sikker ibrugtagning'],
  'sv/fallstudier/index.html':['Illustrativa leveransscenarier','Kommunalt AI-register','Granskning av copilot','Säkert införande'],
  'about/index.html':['Eric Rimón','Healthy AI, from name to practice','slogan','alternateName'],
  'da/om/index.html':['Eric Rimón','Sund AI — fra navn til praksis','slogan','alternateName'],
  'sv/om/index.html':['Eric Rimón','Sund AI — från namn till praktik','slogan','alternateName'],
  'industries/index.html':['Small and mid-sized organisations','Public and social services'],
  'use-cases/index.html':['Shadow AI','AI supplier','Secure AI adoption & workflow efficiency','/services/secure-ai-automation/'],
  'da/anvendelser/index.html':['Shadow AI','AI-leverandørreview','Sikker AI-ibrugtagning og arbejdsgangseffektivitet','/da/ydelser/sikker-ai-automatisering/'],
  'sv/anvandningsfall/index.html':['Shadow AI','AI-leverantörsgranskning','Säker AI-implementering och arbetsflödeseffektivitet','/sv/tjanster/saker-ai-automatisering/']
})) {
  const html = await readFile(path.join(root, page), 'utf8');
  for (const token of tokens) if (!html.toLowerCase().includes(token.toLowerCase())) errors.push(`${page}: missing discovery token ${token}`);
}

const localizedServicePages = {
  'services/secure-ai-automation/index.html':[
    'https://sundaibot.com/services/secure-ai-automation/',
    'https://sundaibot.com/da/ydelser/sikker-ai-automatisering/',
    'https://sundaibot.com/sv/tjanster/saker-ai-automatisering/'
  ],
  'da/ydelser/sikker-ai-automatisering/index.html':[
    'https://sundaibot.com/services/secure-ai-automation/',
    'https://sundaibot.com/da/ydelser/sikker-ai-automatisering/',
    'https://sundaibot.com/sv/tjanster/saker-ai-automatisering/'
  ],
  'sv/tjanster/saker-ai-automatisering/index.html':[
    'https://sundaibot.com/services/secure-ai-automation/',
    'https://sundaibot.com/da/ydelser/sikker-ai-automatisering/',
    'https://sundaibot.com/sv/tjanster/saker-ai-automatisering/'
  ]
};
for (const [page, urls] of Object.entries(localizedServicePages)) {
  const html = await readFile(path.join(root, page), 'utf8');
  for (const url of urls) if (!html.includes(url)) errors.push(`${page}: missing localized service URL ${url}`);
  if (!html.includes('FAQPage') || !html.includes('"@type":"Service"')) errors.push(`${page}: missing Service or FAQ structured data`);
}

const downloadLinks = {
  'resources/index.html':['/resources/downloads/ai-system-inventory-template.csv','/resources/downloads/ai-vendor-assessment-checklist.md','/resources/downloads/ai-impact-assessment-starter.md'],
  'da/ressourcer/index.html':['/da/ressourcer/downloads/ai-systemregister-skabelon.csv','/da/ressourcer/downloads/ai-leverandoervurdering.md','/da/ressourcer/downloads/ai-konsekvensvurdering-start.md'],
  'sv/resurser/index.html':['/sv/resurser/downloads/ai-systemregister-mall.csv','/sv/resurser/downloads/ai-leverantorsbedomning.md','/sv/resurser/downloads/ai-konsekvensbedomning-start.md']
};
for (const [page, links] of Object.entries(downloadLinks)) {
  const html = await readFile(path.join(root, page), 'utf8');
  for (const link of links) if (!html.includes(link)) errors.push(`${page}: missing download link ${link}`);
}

const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
for (const token of ['OAI-SearchBot','Google-Extended','Bingbot','ClaudeBot','PerplexityBot','Sitemap: https://sundaibot.com/sitemap.xml']) if (!robots.includes(token)) errors.push(`robots.txt: missing crawler token ${token}`);

const llms = await readFile(path.join(root, 'llms.txt'), 'utf8');
for (const token of ['Brand meaning','"sund" means healthy','Healthy AI for European organisations','Who SundAI is designed to support','Practical use cases','Preferred factual summary for assistants','Secure AI adoption and solution delivery','Purpose-built AI assistants','measurable operational value']) if (!llms.includes(token)) errors.push(`llms.txt: missing discovery token ${token}`);

const finalJs = await readFile(path.join(root, 'assets/final-polish.js'), 'utf8');
for (const token of ['brand-story','Healthy AI, from name to practice','Sund AI — fra navn til praksis','Sund AI — från namn till praktik','item.slogan','item.alternateName']) if (!finalJs.includes(token)) errors.push(`final-polish.js: missing brand-story token ${token}`);

const finalCss = await readFile(path.join(root, 'assets/final-polish.css'), 'utf8');
for (const token of ['.brand-story','.brand-story-card','.brand-story-word','@media(max-width:680px)']) if (!finalCss.includes(token)) errors.push(`final-polish.css: missing brand-story style ${token}`);

const governanceCss = await readFile(path.join(root, 'assets/governance-offers.css'), 'utf8');
for (const token of ['.offer-grid','.deliverable-grid','.resource-grid','.mapping-grid','.process-steps','.case-grid','@media(max-width:560px)']) if (!governanceCss.includes(token)) errors.push(`governance-offers.css: missing implementation style ${token}`);

const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
for (const token of ['/services/','/methodology/','/resources/','/case-studies/','/da/cases/','/sv/fallstudier/','/about/','/industries/','/use-cases/','/da/brancher/','/sv/anvandningsfall/','/services/secure-ai-automation/','/da/ydelser/sikker-ai-automatisering/','/sv/tjanster/saker-ai-automatisering/']) if (!sitemap.includes(token)) errors.push(`sitemap.xml: missing URL ${token}`);

const headers = await readFile(path.join(root, '_headers'), 'utf8');
for (const token of ['Content-Security-Policy','Strict-Transport-Security','https://avatars.githubusercontent.com']) if (!headers.includes(token)) errors.push(`_headers: missing security or image token ${token}`);

try { await access(path.join(repoRoot, '.github/workflows/indexnow.yml')); }
catch { errors.push('Missing IndexNow workflow'); }

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} HTML pages, multilingual secure AI adoption and solution delivery, AI governance offers, downloadable artifacts, accurate scope claims, approved SundAI branding, LLM discovery and deployment files.`);