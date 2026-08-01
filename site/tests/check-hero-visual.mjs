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
  'SundAI governance control stack',
  'human oversight',
  '#0B132B',
  '#2563EB',
  '#06B6D4',
  '#7C3AED',
  '#F97316',
  '#0F766E'
]) {
  if (!svg.includes(token)) errors.push(`Hero SVG missing required token: ${token}`);
}

for (const forbidden of ['feGaussianBlur', 'feDropShadow', '<filter', 'stdDeviation=', '<image', '<text']) {
  if (svg.includes(forbidden)) errors.push(`Hero SVG contains a forbidden or unsuitable construct: ${forbidden}`);
}

const visibleBounds = [...svg.matchAll(/(?:cx|x|x1|x2)="(-?\d+(?:\.\d+)?)"/g)].map(match => Number(match[1]));
if (visibleBounds.length && Math.max(...visibleBounds) < 590) errors.push('Hero SVG does not use enough of the horizontal canvas.');

for (const token of [
  'grid-template-columns:minmax(0,1.18fr) minmax(340px,.82fr)',
  'width:min(100%,470px)',
  'width:min(100%,410px)',
  'aspect-ratio:690/520',
  'width:min(100%,360px)',
  '@media(max-width:680px){.hero-art{display:none!important}}',
  'object-fit:contain',
  'filter:none'
]) {
  if (!layoutCss.includes(token)) errors.push(`Hero layout CSS missing required sizing token: ${token}`);
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

console.log('Hero artwork passed minimal governance-stack, palette, resolution and multilingual responsive sizing checks.');