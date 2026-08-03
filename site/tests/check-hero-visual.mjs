import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const layoutCss = await readFile(path.join(root, 'assets/training.css'), 'utf8');
const errors = [];

for (const token of [
  'Homepage hero: text-only composition with relaxed multilingual typography.',
  '.hero-grid{grid-template-columns:minmax(0,1fr)!important;gap:0!important}',
  '.hero-copy{max-width:1000px}',
  '.hero-art{display:none!important}',
  '.hero-copy .eyebrow{margin:0 0 24px!important;line-height:1.5;letter-spacing:.14em}',
  '.hero-copy h1{max-width:900px;margin:0 0 30px!important;font-size:clamp(3.15rem,5.1vw,5.35rem)!important;line-height:1.08!important;letter-spacing:-.045em!important',
  '.hero-copy h1 span{display:block;margin-top:.08em}',
  '.hero-copy>p:not(.eyebrow){max-width:780px;line-height:1.72;margin:0 0 28px}',
  'html[lang="da"] .hero-copy h1,html[lang="sv"] .hero-copy h1{max-width:960px',
  'line-height:1.1!important;letter-spacing:-.04em!important',
  '@media(max-width:950px)',
  '.hero-copy h1{max-width:720px;font-size:clamp(2.8rem,7.5vw,4.35rem)!important;line-height:1.09!important}',
  '@media(max-width:680px)',
  'font-size:clamp(2.3rem,10.2vw,3.35rem)!important;line-height:1.1!important;letter-spacing:-.035em!important'
]) {
  if (!layoutCss.includes(token)) errors.push(`Relaxed multilingual hero CSS missing required token: ${token}`);
}

for (const forbidden of [
  'minmax(360px,.75fr)',
  'width:min(100%,430px)',
  'aspect-ratio:690/520',
  '.hero-art{display:flex!important',
  '.hero-copy h1{max-width:940px}',
  'line-height:1.02!important'
]) {
  if (layoutCss.includes(forbidden)) errors.push(`Hero CSS still contains an unsuitable cramped or artwork token: ${forbidden}`);
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
  if (!/<h1>[^<]+<span>[^<]+<\/span><\/h1>/.test(html)) errors.push(`${page}: expected a two-part heading with a dedicated accent line`);
  if (!html.includes('/assets/training.css?')) errors.push(`${page}: does not load the shared hero stylesheet`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Homepage hero passed relaxed line-height, balanced wrapping, multilingual and text-only layout checks.');
