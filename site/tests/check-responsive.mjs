import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const mode = process.argv[2] || 'all';
const run = name => mode === 'all' || mode === name;
const useCasePages = [
  'use-cases/eu-ai-act-readiness/index.html','use-cases/ai-security-assessment/index.html','use-cases/ai-literacy-training/index.html','use-cases/secure-ai-assistant/index.html','use-cases/shadow-ai-review/index.html','use-cases/ai-supplier-review/index.html',
  'da/anvendelser/eu-ai-act-parathed/index.html','da/anvendelser/ai-sikkerhedsvurdering/index.html','da/anvendelser/ai-literacy-kurser/index.html','da/anvendelser/sikker-ai-assistent/index.html','da/anvendelser/shadow-ai-review/index.html','da/anvendelser/ai-leverandoerreview/index.html',
  'sv/anvandningsfall/eu-ai-act-beredskap/index.html','sv/anvandningsfall/ai-sakerhetsgranskning/index.html','sv/anvandningsfall/ai-kunnighetsutbildning/index.html','sv/anvandningsfall/saker-ai-assistent/index.html','sv/anvandningsfall/shadow-ai-granskning/index.html','sv/anvandningsfall/ai-leverantorsgranskning/index.html'
];

if (run('files')) {
  const requiredFiles = [
    'index.html','da/index.html','sv/index.html',
    'services/index.html','da/ydelser/index.html','sv/tjanster/index.html',
    'methodology/index.html','da/metode/index.html','sv/metod/index.html',
    'resources/index.html','da/ressourcer/index.html','sv/resurser/index.html',
    'about/index.html','da/om/index.html','sv/om/index.html',
    'industries/index.html','da/brancher/index.html','sv/branscher/index.html',
    'use-cases/index.html','da/anvendelser/index.html','sv/anvandningsfall/index.html',
    ...useCasePages,
    'assets/neon-compact.css','assets/qa-polish.css','assets/final-polish.css','assets/neon-compact.js','assets/final-polish.js',
    'assets/sundai-logo-neon.svg','assets/sundai-logo-reverse.svg','assets/founder-eric.svg','assets/favicon.svg',
    'assets/styles.css','assets/growth.css','assets/site.js','_headers'
  ];
  for (const file of requiredFiles) await access(path.join(root, file));
  console.log('Required multilingual, brand and use-case files exist.');
}

if (run('premium')) {
  const premiumCss = await readFile(path.join(root, 'assets/neon-compact.css'), 'utf8');
  for (const token of ['--navy:#0b132b','background:#fff','@media(max-width:950px)']) {
    if (!premiumCss.includes(token)) throw new Error(`Premium CSS missing token: ${token}`);
  }
  console.log('Premium design system passed.');
}

if (run('polish')) {
  const polishCss = await readFile(path.join(root, 'assets/qa-polish.css'), 'utf8');
  for (const token of ['.nav:not([data-nav])','overflow-x:auto','prefers-reduced-motion']) {
    if (!polishCss.includes(token)) throw new Error(`QA polish missing protection: ${token}`);
  }
  const finalCss = await readFile(path.join(root, 'assets/final-polish.css'), 'utf8');
  for (const token of [
    '.skip-link:not(:focus)',
    "content:url('/assets/sundai-logo-reverse.svg')",
    '.header-inner{display:grid!important',
    '.audience-grid',
    '.founder-photo',
    '@media(max-width:480px)',
    'env(safe-area-inset-bottom)'
  ]) {
    if (!finalCss.includes(token)) throw new Error(`Final polish missing protection: ${token}`);
  }
  const logo = await readFile(path.join(root, 'assets/sundai-logo-neon.svg'), 'utf8');
  if (logo.includes('<text')) throw new Error('Primary logo must not rely on an SVG font text element');
  console.log('Responsive and brand QA polish passed.');
}

if (run('legacy')) {
  const legacyCss = await readFile(path.join(root, 'assets/styles.css'), 'utf8');
  for (const token of ['.brand-mark{display:none!important}', '.legal-page', '.nav-toggle+.site-nav.open']) {
    if (!legacyCss.includes(token)) throw new Error(`Legacy premium bridge missing token: ${token}`);
  }
  console.log('Legacy premium bridge passed.');
}

if (run('legaljs')) {
  const legalJs = await readFile(path.join(root, 'assets/site.js'), 'utf8');
  for (const token of ["event.key !== 'Escape'", "classList.toggle('open'", 'data-year']) {
    if (!legalJs.includes(token)) throw new Error(`Legal navigation script missing token: ${token}`);
  }
  const finalJs = await readFile(path.join(root, 'assets/final-polish.js'), 'utf8');
  for (const token of ['data-nav-toggle','aria-expanded','classList.toggle(\'open\'','founder-eric.svg']) {
    if (!finalJs.includes(token)) throw new Error(`Final navigation runtime missing token: ${token}`);
  }
  console.log('Legal and final navigation scripts passed.');
}

if (run('secondary')) {
  const secondaryPages = [
    'services/index.html','da/ydelser/index.html','sv/tjanster/index.html',
    'methodology/index.html','da/metode/index.html','sv/metod/index.html',
    'resources/index.html','da/ressourcer/index.html','sv/resurser/index.html',
    'about/index.html','da/om/index.html','sv/om/index.html',
    'industries/index.html','da/brancher/index.html','sv/branscher/index.html',
    'use-cases/index.html','da/anvendelser/index.html','sv/anvandningsfall/index.html',
    ...useCasePages
  ];
  for (const page of secondaryPages) {
    const html = await readFile(path.join(root, page), 'utf8');
    if (!html.includes('/assets/neon-compact.css')) throw new Error(`${page}: premium stylesheet missing`);
    if (!html.includes('/assets/final-polish.css') && !html.includes('/assets/qa-polish.css')) throw new Error(`${page}: responsive stylesheet missing`);
    if (!html.includes('data-nav')) throw new Error(`${page}: responsive navigation hook missing`);
  }
  console.log('Secondary-page responsive styles and navigation passed.');
}

if (run('home')) {
  const requirements = {
    'index.html':['Who we help','founder-photo','5 min read','/use-cases/'],
    'da/index.html':['Hvem vi hjælper','founder-photo','5 min. læsning','/da/anvendelser/'],
    'sv/index.html':['Vilka vi hjälper','founder-photo','5 min läsning','/sv/anvandningsfall/']
  };
  for (const [page, tokens] of Object.entries(requirements)) {
    const html = await readFile(path.join(root, page), 'utf8');
    const expectedLang = page === 'index.html' ? 'en' : page.slice(0,2);
    if (!html.includes(`<html lang="${expectedLang}"`)) throw new Error(`${page}: incorrect language`);
    if (!html.includes('eu-service-mark.svg')) throw new Error(`${page}: European service mark missing`);
    if (!html.includes('data-nav-toggle')) throw new Error(`${page}: accessible mobile navigation missing`);
    for (const token of tokens) if (!html.includes(token)) throw new Error(`${page}: static homepage token missing ${token}`);
  }
  console.log('Multilingual static homepages passed.');
}

if (run('security')) {
  const headers = await readFile(path.join(root, '_headers'), 'utf8');
  if (headers.includes('Clear-Site-Data')) throw new Error('_headers must not clear the browser cache on every homepage request');
  for (const token of ['Content-Security-Policy','Strict-Transport-Security','X-Content-Type-Options']) {
    if (!headers.includes(token)) throw new Error(`Security header missing: ${token}`);
  }
  const neonJs = await readFile(path.join(root, 'assets/neon-compact.js'), 'utf8');
  const starPositions = neonJs.match(/const (?:euStarPositions|positions) = \[(.*?)\];/s)?.[1] || '';
  const starCount = (starPositions.match(/\[[0-9.]+,[0-9.]+\]/g) || []).length;
  if (starCount !== 12) throw new Error(`EU flag must contain 12 stars, found ${starCount}`);
  console.log('Security headers and European flag passed.');
}

console.log(`Responsive QA section completed: ${mode}`);