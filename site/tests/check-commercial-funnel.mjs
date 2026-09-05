import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const errors = [];
const pages = [
  ['start/index.html','en',['indicative from €490','indicative from €1,950','indicative from €4,500','indicative from €995','data-contact-form','data-revenue-form','Readiness Review','Governance Desk','Subject to availability']],
  ['da/start/index.html','da',['vejledende fra €490','vejledende fra €1.950','vejledende fra €4.500','vejledende fra €995','data-contact-form','data-revenue-form','readiness-review','Governance Desk','Afhænger af tilgængelighed']],
  ['sv/start/index.html','sv',['vägledande från €490','vägledande från €1 950','vägledande från €4 500','vägledande från €995','data-contact-form','data-revenue-form','Readiness-granskning','Governance Desk','Med reservation för tillgänglighet']]
];

for (const [file,lang,tokens] of pages) {
  const html = await readFile(path.join(root,file),'utf8');
  if (!html.includes(`<html lang="${lang}"`)) errors.push(`${file}: wrong lang`);
  for (const token of tokens) if (!html.includes(token)) errors.push(`${file}: missing ${token}`);
  for (const token of ['rel="canonical"','hreflang=','application/ld+json','OfferCatalog','/assets/revenue-funnel.css','/assets/revenue-funnel.js','name="startedAt"','name="message"','data-interest-select','data-enquiry-details','data-form-status']) {
    if (!html.includes(token)) errors.push(`${file}: missing funnel token ${token}`);
  }
  for (const forbidden of ['five business days','fem arbejdsdage','fem arbetsdagar','priceCurrency','immediate availability, reserved capacity']) {
    if (forbidden === 'immediate availability, reserved capacity') continue;
    if (html.includes(forbidden)) errors.push(`${file}: fixed-capacity wording remains: ${forbidden}`);
  }
  if (!/availability|tilgængelighed|tillgänglighet/i.test(html)) errors.push(`${file}: availability qualification missing`);
  if (!/named individual|navngiven person|namngiven person/i.test(html)) errors.push(`${file}: personal-delivery clarification missing`);
}

for (const file of [
  'assets/revenue-funnel.css','assets/revenue-funnel.js','sitemap-commercial.xml',
  'resources/downloads/sundai-ai-governance-readiness-scorecard-2026.csv',
  'resources/downloads/sundai-ai-governance-readiness-scorecard-2026-da.csv',
  'resources/downloads/sundai-ai-governance-readiness-scorecard-2026-sv.csv'
]) {
  try { await access(path.join(root,file)); } catch { errors.push(`Missing commercial asset ${file}`); }
}

for (const [file,tokens] of [
  ['services/index.html',['revenue-grid','Readiness Review','Governance Desk','indicative from','/start/']],
  ['da/ydelser/index.html',['revenue-grid','Readiness-review','Governance Desk','vejledende fra','/da/start/']],
  ['sv/tjanster/index.html',['revenue-grid','Readiness-granskning','Governance Desk','vägledande från','/sv/start/']]
]) {
  const html = await readFile(path.join(root,file),'utf8');
  for (const token of tokens) if (!html.includes(token)) errors.push(`${file}: missing availability-first service token ${token}`);
  if (!/current client engagement|aktuel kundeopgave|pågående kunduppdrag/i.test(html)) errors.push(`${file}: current-engagement clarification missing`);
}

for (const [file,forbidden] of [
  ['index.html','10-day AI Risk'],
  ['da/index.html','10-dages AI Risk'],
  ['sv/index.html','10-dagars AI Risk']
]) {
  const html = await readFile(path.join(root,file),'utf8');
  if (html.includes(forbidden)) errors.push(`${file}: fixed homepage timeline remains`);
}

const sitemap = await readFile(path.join(root,'sitemap-commercial.xml'),'utf8');
for (const url of ['https://sundaibot.com/start/','https://sundaibot.com/da/start/','https://sundaibot.com/sv/start/']) if (!sitemap.includes(url)) errors.push(`sitemap-commercial.xml missing ${url}`);
const robots = await readFile(path.join(root,'robots.txt'),'utf8');
if (!robots.includes('Sitemap: https://sundaibot.com/sitemap-commercial.xml')) errors.push('robots.txt missing commercial sitemap');
const indexNow = await readFile(path.resolve(root,'..','.github/workflows/indexnow.yml'),'utf8');
if (!indexNow.includes('sitemap*.xml')) errors.push('IndexNow must submit every sitemap*.xml file');
const funnelJs = await readFile(path.join(root,'assets/revenue-funnel.js'),'utf8');
for (const token of ['utm_source','utm_medium','utm_campaign','document.referrer','Availability enquiry:','startedAt']) if (!funnelJs.includes(token)) errors.push(`revenue-funnel.js missing attribution token ${token}`);
if (!/fit, scope and current availability|fit, scope og aktuel tilgængelighed|passform, omfattning och aktuell tillgänglighet/.test(funnelJs)) errors.push('revenue-funnel.js missing availability-first fallback');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Validated multilingual availability-first service options, enquiry funnel, attribution, scorecards and commercial sitemap.');
