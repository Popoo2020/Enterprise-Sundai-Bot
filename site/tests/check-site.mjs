import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
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
if (htmlFiles.length < 16) errors.push(`Expected at least 16 HTML pages, found ${htmlFiles.length}`);
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
  if (homePages.has(rel) && !html.includes('sundai-logo-neon.svg')) errors.push(`${rel}: new SundAI logo missing`);
  if (homePages.has(rel) && !html.includes('hero-ai-control-neon.svg')) errors.push(`${rel}: new hero visual missing`);
  if (html.includes('<form') && (!html.includes('<label') || !html.includes('data-form-status'))) errors.push(`${rel}: form accessibility hooks missing`);
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${rel}: duplicate id found`);
  const assetMatches = [...html.matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)].map(m => m[1].split('?')[0]);
  for (const asset of assetMatches) {
    try { await access(path.join(root, asset.slice(1))); }
    catch { errors.push(`${rel}: missing local asset ${asset}`); }
  }
}

for (const required of ['robots.txt','sitemap.xml','_headers','_routes.json','_redirects','manifest.webmanifest','llms.txt','.well-known/security.txt','assets/social-card.png','assets/apple-touch-icon.png','assets/neon-compact.css','assets/neon-compact.js','assets/training.css','assets/sundai-logo-neon.svg','assets/hero-ai-control-neon.svg','assets/visual-governance.svg','assets/visual-adoption.svg','assets/visual-security.svg','functions/api/contact.js','training/index.html','da/kurser-foredrag/index.html','sv/utbildning-forelasningar/index.html']) {
  try { await access(path.join(root, required)); }
  catch { errors.push(`Missing required deployment file: ${required}`); }
}

for (const [page, tokens] of Object.entries({
  'index.html':['Secure AI adoption for','AI Governance','10-day AI Risk & Readiness Snapshot'],
  'da/index.html':['Sikker AI-implementering for','AI-governance','10-dages AI Risk & Readiness Snapshot'],
  'sv/index.html':['Säker AI-implementering för','AI-styrning','10-dagars AI Risk & Readiness Snapshot'],
  'training/index.html':['AI Literacy for the Modern Workplace','ISO/IEC 42001','Human-centred by design'],
  'da/kurser-foredrag/index.html':['AI-literacy på arbejdspladsen','ISO/IEC 42001','Menneskecentreret fra starten'],
  'sv/utbildning-forelasningar/index.html':['AI-kunnighet i arbetslivet','ISO/IEC 42001','Människocentrerat från början']
})) {
  const html = await readFile(path.join(root, page), 'utf8');
  for (const token of tokens) if (!html.includes(token)) errors.push(`${page}: missing focused multilingual token ${token}`);
}

const siteJs = await readFile(path.join(root, 'assets/neon-compact.js'), 'utf8');
for (const token of ['Training & Talks','Kurser & foredrag','Utbildning & föreläsningar','Human-centred, ethical and standards-aligned.']) {
  if (!siteJs.includes(token)) errors.push(`neon-compact.js: missing navigation or trust token ${token}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} HTML pages, compact multilingual content, training, responsible AI, neon assets, SEO and deployment files.`);