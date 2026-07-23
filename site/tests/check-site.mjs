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
if (htmlFiles.length < 10) errors.push(`Expected at least 10 HTML pages, found ${htmlFiles.length}`);

for (const file of htmlFiles) {
  const rel = path.relative(root, file);
  const html = await readFile(file, 'utf8');
  const required = ['<meta name="viewport"', '<title>', 'lang="', 'href="/assets/styles.css"'];
  for (const token of required) if (!html.includes(token)) errors.push(`${rel}: missing ${token}`);
  if (html.includes('href="#"')) errors.push(`${rel}: placeholder href found`);
  if (html.includes('target="_blank"') && !html.includes('rel="noopener')) errors.push(`${rel}: unsafe target=_blank`);
  if (rel.endsWith('index.html') && !html.includes('hreflang=')) errors.push(`${rel}: language alternates missing`);
  if (rel.endsWith('index.html') && !html.includes('data-contact-form')) errors.push(`${rel}: contact form missing`);
  if (html.includes('<form') && (!html.includes('<label') || !html.includes('data-form-status'))) errors.push(`${rel}: form accessibility hooks missing`);
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${rel}: duplicate id found`);

  const assetMatches = [...html.matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)].map(m => m[1]);
  for (const asset of assetMatches) {
    try { await access(path.join(root, asset.slice(1))); }
    catch { errors.push(`${rel}: missing local asset ${asset}`); }
  }
}

for (const required of ['robots.txt','sitemap.xml','_headers','_routes.json','_redirects','manifest.webmanifest','llms.txt','.well-known/security.txt','assets/social-card.png','assets/apple-touch-icon.png','functions/api/contact.js']) {
  try { await access(path.join(root, required)); }
  catch { errors.push(`Missing required deployment file: ${required}`); }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} HTML pages and deployment assets.`);
