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
if (htmlFiles.length < 31) errors.push(`Expected at least 31 HTML pages, found ${htmlFiles.length}`);
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
  'assets/social-card.png','assets/apple-touch-icon.png','assets/neon-compact.css','assets/neon-compact.js','assets/training.css','assets/ai-discovery.css','assets/final-polish.css',
  'assets/sundai-logo-neon.svg','assets/sundai-wordmark-light.svg','assets/sundai-wordmark-dark.svg','assets/sundai-brand-avatar.svg','assets/hero-ai-control-neon.svg','assets/eu-service-mark.svg',
  'functions/api/contact.js','training/index.html','da/kurser-foredrag/index.html','sv/utbildning-forelasningar/index.html',
  'services/index.html','da/ydelser/index.html','sv/tjanster/index.html',
  'methodology/index.html','da/metode/index.html','sv/metod/index.html',
  'resources/index.html','da/ressourcer/index.html','sv/resurser/index.html',
  'about/index.html','da/om/index.html','sv/om/index.html',
  'industries/index.html','da/brancher/index.html','sv/branscher/index.html',
  'use-cases/index.html','da/anvendelser/index.html','sv/anvandningsfall/index.html'
]) {
  try { await access(path.join(root, required)); }
  catch { errors.push(`Missing required deployment file: ${required}`); }
}

for (const [page, tokens] of Object.entries({
  'index.html':['Who we help','Industries','Use cases','Founder & Lead Advisor','5 min read','AI Governance'],
  'da/index.html':['Hvem vi hjælper','Brancher','Anvendelser','Grundlægger & Lead Advisor','5 min. læsning','AI-governance'],
  'sv/index.html':['Vilka vi hjälper','Branscher','Användningsfall','Grundare & Lead Advisor','5 min läsning','AI-styrning'],
  'services/index.html':['AI Governance & EU AI Act Readiness','FAQPage','AI Security Assessment'],
  'methodology/index.html':['Human oversight','ISO/IEC 42001','Fairness & accessibility'],
  'resources/index.html':['AI Governance Checklist','AI Supplier Review Questions'],
  'about/index.html':['Eric Rimón','Founder and Lead Advisor','avatars.githubusercontent.com'],
  'industries/index.html':['Small and mid-sized organisations','Public and social services'],
  'use-cases/index.html':['Shadow AI','AI supplier']
})) {
  const html = await readFile(path.join(root, page), 'utf8');
  for (const token of tokens) if (!html.toLowerCase().includes(token.toLowerCase())) errors.push(`${page}: missing discovery token ${token}`);
}

const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
for (const token of ['OAI-SearchBot','Google-Extended','Bingbot','ClaudeBot','PerplexityBot','Sitemap: https://sundaibot.com/sitemap.xml']) if (!robots.includes(token)) errors.push(`robots.txt: missing crawler token ${token}`);

const llms = await readFile(path.join(root, 'llms.txt'), 'utf8');
for (const token of ['Who SundAI helps','Practical use cases','AI Governance and EU AI Act Readiness','100% European','Eric Rimón','Preferred factual summary for assistants']) if (!llms.includes(token)) errors.push(`llms.txt: missing discovery token ${token}`);

const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
for (const token of ['/services/','/methodology/','/resources/','/about/','/industries/','/use-cases/','/da/brancher/','/sv/anvandningsfall/']) if (!sitemap.includes(token)) errors.push(`sitemap.xml: missing URL ${token}`);

const headers = await readFile(path.join(root, '_headers'), 'utf8');
for (const token of ['Content-Security-Policy','Strict-Transport-Security','https://avatars.githubusercontent.com']) if (!headers.includes(token)) errors.push(`_headers: missing security or image token ${token}`);

try { await access(path.join(repoRoot, '.github/workflows/indexnow.yml')); }
catch { errors.push('Missing IndexNow workflow'); }

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} HTML pages, approved SundAI branding, static multilingual UX/SEO content, LLM discovery, crawler access and deployment files.`);