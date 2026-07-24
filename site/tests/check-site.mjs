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
if (htmlFiles.length < 49) errors.push(`Expected at least 49 HTML pages, found ${htmlFiles.length}`);
const homePages = new Set(['index.html', path.join('da','index.html'), path.join('sv','index.html')]);

for (const file of htmlFiles) {
  const rel = path.relative(root, file);
  const html = await readFile(file, 'utf8');
  for (const token of ['<meta name="viewport"', '<title>', 'lang="']) if (!html.includes(token)) errors.push(`${rel}: missing ${token}`);
  if (!html.includes('href="/assets/styles.css"') && !html.includes('href="/assets/neon-compact.css')) errors.push(`${rel}: approved stylesheet missing`);
  if (html.includes('href="#"')) errors.push(`${rel}: placeholder href found`);
  if (html.includes('target="_blank"') && !html.includes('rel="noopener')) errors.push(`${rel}: unsafe target=_blank`);
  if (homePages.has(rel) && !html.includes('hreflang=')) errors.push(`${rel}: language alternates missing`);
  if (homePages.has(rel) && !html.includes('data-contact-form')) errors.push(`${rel}: contact form missing`);
  if (homePages.has(rel) && !html.includes('application/ld+json')) errors.push(`${rel}: structured data missing`);
  if (homePages.has(rel) && !html.includes('founder-eric.svg')) errors.push(`${rel}: static founder image missing`);
  if (homePages.has(rel) && !html.includes('insight-meta')) errors.push(`${rel}: static insight metadata missing`);
  if (homePages.has(rel) && !html.includes('audience-grid')) errors.push(`${rel}: static who-we-help content missing`);
  if (html.includes('<form') && (!html.includes('<label') || !html.includes('data-form-status'))) errors.push(`${rel}: form accessibility hooks missing`);
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${rel}: duplicate id found`);
  for (const asset of [...html.matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)].map(match => match[1].split('?')[0])) {
    try { await access(path.join(root, asset.slice(1))); } catch { errors.push(`${rel}: missing local asset ${asset}`); }
  }
}

const useCasePages = [
  'use-cases/eu-ai-act-readiness/index.html','use-cases/ai-security-assessment/index.html','use-cases/ai-literacy-training/index.html','use-cases/secure-ai-assistant/index.html','use-cases/shadow-ai-review/index.html','use-cases/ai-supplier-review/index.html',
  'da/anvendelser/eu-ai-act-parathed/index.html','da/anvendelser/ai-sikkerhedsvurdering/index.html','da/anvendelser/ai-literacy-kurser/index.html','da/anvendelser/sikker-ai-assistent/index.html','da/anvendelser/shadow-ai-review/index.html','da/anvendelser/ai-leverandoerreview/index.html',
  'sv/anvandningsfall/eu-ai-act-beredskap/index.html','sv/anvandningsfall/ai-sakerhetsgranskning/index.html','sv/anvandningsfall/ai-kunnighetsutbildning/index.html','sv/anvandningsfall/saker-ai-assistent/index.html','sv/anvandningsfall/shadow-ai-granskning/index.html','sv/anvandningsfall/ai-leverantorsgranskning/index.html'
];

const requiredFiles = [
  'robots.txt','sitemap.xml','_headers','_routes.json','_redirects','manifest.webmanifest','llms.txt',
  '.well-known/security.txt','assets/social-card.png','assets/apple-touch-icon.png','assets/neon-compact.css','assets/neon-compact.js','assets/final-polish.css','assets/final-polish.js','assets/training.css','assets/ai-discovery.css',
  'assets/sundai-logo-neon.svg','assets/sundai-logo-reverse.svg','assets/founder-eric.svg','assets/favicon.svg','assets/hero-ai-control-neon.svg','assets/eu-service-mark.svg',
  'functions/api/contact.js','training/index.html','da/kurser-foredrag/index.html','sv/utbildning-forelasningar/index.html',
  'services/index.html','da/ydelser/index.html','sv/tjanster/index.html','methodology/index.html','da/metode/index.html','sv/metod/index.html',
  'resources/index.html','da/ressourcer/index.html','sv/resurser/index.html','about/index.html','da/om/index.html','sv/om/index.html',
  'industries/index.html','da/brancher/index.html','sv/branscher/index.html','use-cases/index.html','da/anvendelser/index.html','sv/anvandningsfall/index.html',
  ...useCasePages
];
for (const required of requiredFiles) {
  try { await access(path.join(root, required)); } catch { errors.push(`Missing required deployment file: ${required}`); }
}

for (const [page,tokens] of Object.entries({
  'index.html':['Who we help','Small & mid-sized organisations','5 min read','founder-eric.svg','/use-cases/eu-ai-act-readiness/'],
  'da/index.html':['Hvem vi hjælper','Små og mellemstore organisationer','5 min. læsning','founder-eric.svg','/da/anvendelser/eu-ai-act-parathed/'],
  'sv/index.html':['Vilka vi hjälper','Små och medelstora organisationer','5 min läsning','founder-eric.svg','/sv/anvandningsfall/eu-ai-act-beredskap/'],
  'industries/index.html':['Small & mid-sized organisations','Public & social services','Education & learning'],
  'da/brancher/index.html':['Små og mellemstore organisationer','Offentlige og sociale tjenester'],
  'sv/branscher/index.html':['Små och medelstora organisationer','Offentliga och sociala tjänster'],
  'use-cases/index.html':['EU AI Act readiness','AI security assessment','Shadow AI review','/use-cases/ai-supplier-review/'],
  'da/anvendelser/index.html':['EU AI Act-parathed','AI-sikkerhedsvurdering','Shadow AI-review','/da/anvendelser/ai-leverandoerreview/'],
  'sv/anvandningsfall/index.html':['EU AI Act-beredskap','AI-säkerhetsgranskning','Shadow AI-granskning','/sv/anvandningsfall/ai-leverantorsgranskning/']
})) {
  const html = await readFile(path.join(root,page),'utf8');
  for (const token of tokens) if (!html.includes(token)) errors.push(`${page}: missing final content token ${token}`);
}

for (const page of useCasePages) {
  const html = await readFile(path.join(root, page), 'utf8');
  for (const token of ['rel="canonical"','hreflang="en"','hreflang="da"','hreflang="sv"','application/ld+json','FAQPage','data-nav']) {
    if (!html.includes(token)) errors.push(`${page}: missing SEO/LLM token ${token}`);
  }
  if (!html.includes('"@type":"Service"') && !html.includes('"@type":"Course"')) errors.push(`${page}: Service or Course schema missing`);
}

const logo = await readFile(path.join(root,'assets/sundai-logo-neon.svg'),'utf8');
if (logo.includes('<text')) errors.push('sundai-logo-neon.svg must use outlined vector paths, not font-dependent SVG text');
for (const token of ['#0B132B','#2563EB','#0EA5E9','viewBox="0 0 330 92"']) if (!logo.includes(token)) errors.push(`sundai-logo-neon.svg: missing brand token ${token}`);
const reverseLogo = await readFile(path.join(root,'assets/sundai-logo-reverse.svg'),'utf8');
for (const token of ['#F5F7FA','#2563EB','#0EA5E9']) if (!reverseLogo.includes(token)) errors.push(`sundai-logo-reverse.svg: missing brand token ${token}`);

const robots = await readFile(path.join(root,'robots.txt'),'utf8');
for (const token of ['OAI-SearchBot','Google-Extended','Bingbot','ClaudeBot','PerplexityBot','Sitemap: https://sundaibot.com/sitemap.xml']) if (!robots.includes(token)) errors.push(`robots.txt: missing ${token}`);
const llms = await readFile(path.join(root,'llms.txt'),'utf8');
for (const token of ['Dedicated use-case landing pages','AI security assessment: https://sundaibot.com/use-cases/ai-security-assessment/','AI-sikkerhedsvurdering: https://sundaibot.com/da/anvendelser/ai-sikkerhedsvurdering/','AI-säkerhetsgranskning: https://sundaibot.com/sv/anvandningsfall/ai-sakerhetsgranskning/','Preferred factual summary for assistants']) if (!llms.includes(token)) errors.push(`llms.txt: missing ${token}`);
const sitemap = await readFile(path.join(root,'sitemap.xml'),'utf8');
for (const token of ['/industries/','/use-cases/ai-security-assessment/','/da/anvendelser/ai-sikkerhedsvurdering/','/sv/anvandningsfall/ai-sakerhetsgranskning/']) if (!sitemap.includes(token)) errors.push(`sitemap.xml: missing ${token}`);
const finalJs = await readFile(path.join(root,'assets/final-polish.js'),'utf8');
for (const token of ['founder-eric.svg','data-nav-toggle','Use cases','Book a free consultation']) if (!finalJs.includes(token)) errors.push(`final-polish.js: missing ${token}`);

try { await access(path.join(repoRoot,'.github/workflows/indexnow.yml')); } catch { errors.push('Missing IndexNow workflow'); }
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${htmlFiles.length} HTML pages, outlined brand logos, static multilingual UX, 18 use-case landing pages, accessibility, SEO and AI discovery assets.`);