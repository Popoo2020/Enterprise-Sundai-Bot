import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const requiredFiles = [
  'index.html','da/index.html','sv/index.html',
  'services/index.html','da/ydelser/index.html','sv/tjanster/index.html',
  'methodology/index.html','da/metode/index.html','sv/metod/index.html',
  'resources/index.html','da/ressourcer/index.html','sv/resurser/index.html',
  'about/index.html','da/om/index.html','sv/om/index.html',
  'assets/neon-compact.css','assets/qa-polish.css','assets/neon-compact.js',
  'assets/styles.css','assets/growth.css','assets/site.js','_headers'
];

for (const file of requiredFiles) await access(path.join(root, file));

const premiumCss = await readFile(path.join(root, 'assets/neon-compact.css'), 'utf8');
for (const token of ['--navy:#0b132b','background:#fff','@media(max-width:950px)','@media(prefers-reduced-motion:reduce)']) {
  if (!premiumCss.includes(token)) throw new Error(`Premium CSS missing token: ${token}`);
}

const polishCss = await readFile(path.join(root, 'assets/qa-polish.css'), 'utf8');
for (const token of ['.nav:not([data-nav])','overflow-x:auto','prefers-reduced-motion']) {
  if (!polishCss.includes(token)) throw new Error(`QA polish missing protection: ${token}`);
}

const legacyCss = await readFile(path.join(root, 'assets/styles.css'), 'utf8');
for (const token of ['.brand-mark{display:none!important}', '.legal-page', '.nav-toggle+.site-nav.open']) {
  if (!legacyCss.includes(token)) throw new Error(`Legacy premium bridge missing token: ${token}`);
}

const legalJs = await readFile(path.join(root, 'assets/site.js'), 'utf8');
for (const token of ["event.key !== 'Escape'", "classList.toggle('open'", 'data-year']) {
  if (!legalJs.includes(token)) throw new Error(`Legal navigation script missing token: ${token}`);
}

const secondaryPages = [
  'services/index.html','da/ydelser/index.html','sv/tjanster/index.html',
  'methodology/index.html','da/metode/index.html','sv/metod/index.html',
  'resources/index.html','da/ressourcer/index.html','sv/resurser/index.html',
  'about/index.html','da/om/index.html','sv/om/index.html'
];
for (const page of secondaryPages) {
  const html = await readFile(path.join(root, page), 'utf8');
  if (!html.includes('/assets/neon-compact.css')) throw new Error(`${page}: premium stylesheet missing`);
  if (!html.includes('/assets/qa-polish.css')) throw new Error(`${page}: responsive QA stylesheet missing`);
}

for (const [page, lang] of [['index.html','en'],['da/index.html','da'],['sv/index.html','sv']]) {
  const html = await readFile(path.join(root, page), 'utf8');
  if (!html.includes(`<html lang="${lang}"`)) throw new Error(`${page}: incorrect language`);
  if (!html.includes('eu-service-mark.svg')) throw new Error(`${page}: European service mark missing`);
  if (!html.includes('data-nav-toggle')) throw new Error(`${page}: accessible mobile navigation missing`);
}

const headers = await readFile(path.join(root, '_headers'), 'utf8');
if (headers.includes('Clear-Site-Data')) throw new Error('_headers must not clear the browser cache on every homepage request');
for (const token of ['Content-Security-Policy','Strict-Transport-Security','X-Content-Type-Options']) {
  if (!headers.includes(token)) throw new Error(`Security header missing: ${token}`);
}

const neonJs = await readFile(path.join(root, 'assets/neon-compact.js'), 'utf8');
const starPositions = neonJs.match(/const euStarPositions = \[(.*?)\];/s)?.[1] || '';
const starCount = (starPositions.match(/\[[0-9.]+,[0-9.]+\]/g) || []).length;
if (starCount !== 12) throw new Error(`EU flag must contain 12 stars, found ${starCount}`);

console.log('Premium, responsive, multilingual and security checks passed.');