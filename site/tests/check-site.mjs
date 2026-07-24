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
if (htmlFiles.length < 25) errors.push(`Expected at least 25 HTML pages, found ${htmlFiles.length}`);
const homePages = new Set(['index.html', path.join('da','index.html'), path.join('sv','index.html')]);

for (const file of htmlFiles) {
  const rel = path.relative(root, file);
  const html = await readFile(file, 'utf8');
  const required = ['<meta name="viewport"', '<title>', 'lang="'];
  for (const token of required) if (!html.includes(token)) errors.push(`${rel}: missing ${token}`);
  if (!html.includes('href="/assets/styles.css"') && !html.includes('href="/assets/neon-compact.css')) errors.push(`${rel}: approved stylesheet missing`);
  if (html.includes('href="#"')) errors.push(`${rel}: placeholder href found`);
  if (html.includes('target="_blank"') && !html.includes('rel="noopener')) errors.push(`${rel}: unsafe target=_blank`);
  if (homePages.has(rel) && !html.includes('hreflang=')) errors.push(`${rel}: language alternates missing`);
  if (homePages.has(rel) && !html.includes('data-contact-form')) errors.push(`${rel}: contact form missing`);
  if (homePages.has(rel) && !html.includes('application/ld+json')) errors.push(`${rel}: structured data missing`);
  if (homePages.has(rel) && !html.includes('eu-service-mark.svg')) errors.push(`${rel}: European service mark missing`);
  if (homePages.has(rel) && !html.includes('technology-ecosystem.svg')) errors.push(`${rel}: technology ecosystem fallback missing`);
  if (homePages.has(rel) && !html.includes('verified-collaborations.svg')) errors.push(`${rel}: collaboration fallback missing`);
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
  'assets/social-card.png','assets/apple-touch-icon.png','assets/neon-compact.css','assets/neon-compact.js','assets/training.css','assets/ai-discovery.css',
  'assets/sundai-logo-neon.svg','assets/hero-ai-control-neon.svg','assets/eu-service-mark.svg','assets/technology-ecosystem.svg','assets/verified-collaborations.svg',
  'functions/api/contact.js','training/index.html','da/kurser-foredrag/index.html','sv/utbildning-forelasningar/index.html',
  'services/index.html','da/ydelser/index.html','sv/tjanster/index.html',
  'methodology/index.html','da/metode/index.html','sv/metod/index.html',
  'resources/index.html','da/ressourcer/index.html','sv/resurser/index.html',
  'about/index.html','da/om/index.html','sv/om/index.html'
]) {
  try { await access(path.join(root, required)); }
  catch { errors.push(`Missing required deployment file: ${required}`); }
}

for (const [page, tokens] of Object.entries({
  'index.html':['Training & Talks','100% European service','technology-ecosystem.svg','AI Governance'],
  'da/index.html':['Kurser & foredrag','100% europæisk service','technology-ecosystem.svg','AI-governance'],
  'sv/index.html':['UTBILDNING & FÖRELÄSNINGAR','100% europeisk service','technology-ecosystem.svg','AI-styrning'],
  'services/index.html':['AI Governance & EU AI Act Readiness','FAQPage','AI Security Assessment'],
  'methodology/index.html':['Human oversight','ISO/IEC 42001','Fairness & accessibility'],
  'resources/index.html':['AI Governance Checklist','AI Supplier Review Questions'],
  'about/index.html':['Eric Rimón','Founder and Lead Advisor']
})) {
  const html = await readFile(path.join(root, page), 'utf8');
  for (const token of tokens) if (!html.includes(token)) errors.push(`${page}: missing AI-discovery token ${token}`);
}

const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
for (const token of ['OAI-SearchBot','Google-Extended','Bingbot','ClaudeBot','PerplexityBot','Sitemap: https://sundaibot.com/sitemap.xml']) {
  if (!robots.includes(token)) errors.push(`robots.txt: missing crawler token ${token}`);
}

const llms = await readFile(path.join(root, 'llms.txt'), 'utf8');
for (const token of ['AI Governance and EU AI Act Readiness','AI Security Assessment','100% European','Eric Rimón','Preferred factual summary for assistants']) {
  if (!llms.includes(token)) errors.push(`llms.txt: missing discovery token ${token}`);
}

const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
for (const token of ['/services/','/methodology/','/resources/','/about/','/da/ydelser/','/sv/tjanster/']) {
  if (!sitemap.includes(token)) errors.push(`sitemap.xml: missing URL ${token}`);
}

try { await access(path.join(repoRoot, '.github/workflows/indexnow.yml')); }
catch { errors.push('Missing IndexNow workflow'); }

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} HTML pages, multilingual AI discovery content, structured data, crawler access, IndexNow, trust assets and deployment files.`);