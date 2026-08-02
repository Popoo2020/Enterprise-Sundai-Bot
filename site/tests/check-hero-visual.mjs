import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const svg = await readFile(path.join(root, 'assets/hero-ai-control-neon.svg'), 'utf8');
const layoutCss = await readFile(path.join(root, 'assets/training.css'), 'utf8');
const errors = [];

for (const token of [
  'width="690"',
  'height="520"',
  'viewBox="0 0 690 520"',
  'preserveAspectRatio="xMidYMid meet"',
  'shape-rendering="geometricPrecision"',
  'SundAI secure AI adoption mark',
  'governance and security controls',
  'r="148"',
  'r="116"',
  'translate(431 345)',
  '#2563EB',
  '#06B6D4',
  '#7C3AED',
  '#0F766E'
]) {
  if (!svg.includes(token)) errors.push(`Hero SVG missing required token: ${token}`);
}

for (const forbidden of [
  'feGaussianBlur',
  'feDropShadow',
  '<filter',
  'stdDeviation=',
  '<image',
  '<text',
  '<rect',
  'stroke-dasharray',
  'translate(345 138)',
  'translate(345 261)',
  'translate(345 392)'
]) {
  if (svg.includes(forbidden)) errors.push(`Hero SVG contains a forbidden or unsuitable construct: ${forbidden}`);
}

const circles = (svg.match(/<circle\b/g) || []).length;
if (circles > 9) errors.push(`Hero SVG is too decorative: expected no more than 9 circles, found ${circles}.`);
const groups = (svg.match(/<g\b/g) || []).length;
if (groups > 1) errors.push(`Hero SVG is too structurally complex: expected no more than one group, found ${groups}.`);

for (const token of [
  'grid-template-columns:minmax(0,1.38fr) minmax(205px,.62fr)',
  'width:min(100%,320px)',
  'justify-self:start',
  'grid-template-columns:minmax(0,1.44fr) minmax(180px,.56fr)',
  'width:min(100%,265px)',
  '@media(max-width:950px)',
  '.hero-art{display:none!important}',
  'aspect-ratio:690/520',
  'object-fit:contain',
  'filter:none'
]) {
  if (!layoutCss.includes(token)) errors.push(`Hero layout CSS missing required compact-sizing token: ${token}`);
}

const pages = [
  ['index.html', 'en'],
  ['da/index.html', 'da'],
  ['sv/index.html', 'sv']
];
for (const [page, language] of pages) {
  const html = await readFile(path.join(root, page), 'utf8');
  const heroMatches = html.match(/<div class="hero-art"><img src="\/assets\/hero-ai-control-neon\.svg"[^>]*width="690" height="520"[^>]*><\/div>/g) || [];
  if (heroMatches.length !== 1) errors.push(`${page}: expected exactly one shared 690×520 hero image, found ${heroMatches.length}`);
  if (!html.includes(`<html lang="${language}"`)) errors.push(`${page}: expected language ${language}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Hero artwork passed compact secure-AI mark, low-clutter and multilingual desktop-only sizing checks.');