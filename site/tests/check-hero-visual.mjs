import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const layoutCss = await readFile(path.join(root, 'assets/training.css'), 'utf8');
const errors = [];

for (const token of [
  'Homepage hero: text-only composition with no reserved artwork column.',
  '.hero-grid{grid-template-columns:minmax(0,1fr)!important;gap:0!important}',
  '.hero-copy{max-width:980px}',
  '.hero-art{display:none!important}',
  '@media(min-width:951px)',
  '.hero-copy h1{max-width:940px}',
  '@media(min-width:951px) and (max-width:1180px)',
  '.hero-copy{max-width:900px}',
  '@media(max-width:950px)',
  '.hero-copy{max-width:760px;margin-inline:auto}'
]) {
  if (!layoutCss.includes(token)) errors.push(`Text-only hero CSS missing required token: ${token}`);
}

for (const forbidden of [
  'minmax(360px,.75fr)',
  'width:min(100%,430px)',
  'width:min(100%,350px)',
  'width:min(100%,310px)',
  'aspect-ratio:690/520',
  'margin-left:-8px',
  '.hero-art{display:flex!important'
]) {
  if (layoutCss.includes(forbidden)) errors.push(`Text-only hero CSS still contains artwork layout token: ${forbidden}`);
}

const pages = [
  ['index.html', 'en'],
  ['da/index.html', 'da'],
  ['sv/index.html', 'sv']
];

for (const [page, language] of pages) {
  const html = await readFile(path.join(root, page), 'utf8');
  if (!html.includes(`<html lang="${language}"`)) errors.push(`${page}: expected language ${language}`);
  if (!html.includes('class="container hero-grid"')) errors.push(`${page}: missing shared hero-grid structure`);
  if (!html.includes('class="hero-copy"')) errors.push(`${page}: missing hero copy`);
  if (!html.includes('/assets/training.css?')) errors.push(`${page}: does not load the shared text-only hero stylesheet`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Homepage hero passed text-only, no-reserved-column and multilingual layout checks.');
