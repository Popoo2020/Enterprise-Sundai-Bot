import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const errors = [];
const pages = [
  ['start/index.html','en',['€490','€1,950','from €4,500','from €995','data-contact-form','data-revenue-form','Readiness Sprint','Governance Desk']],
  ['da/start/index.html','da',['€490','€1.950','fra €4.500','fra €995','data-contact-form','data-revenue-form','Readiness Sprint','Governance Desk']],
  ['sv/start/index.html','sv',['€490','€1 950','från €4 500','från €995','data-contact-form','data-revenue-form','Readiness Sprint','Governance Desk']]
];

for (const [file,lang,tokens] of pages) {
  const html = await readFile(path.join(root,file),'utf8');
  if (!html.includes(`<html lang="${lang}"`)) errors.push(`${file}: wrong lang`);
  for (const token of tokens) if (!html.includes(token)) errors.push(`${file}: missing ${token}`);
  for (const token of ['rel="canonical"','hreflang=','application/ld+json','OfferCatalog','priceCurrency','/assets/revenue-funnel.css','/assets/revenue-funnel.js','name="startedAt"','name="message"','data-interest-select','data-enquiry-details','data-form-status']) {
    if (!html.includes(token)) errors.push(`${file}: missing funnel token ${token}`);
  }
  if (html.includes('unlimited consulting')) errors.push(`${file}: avoid unlimited consulting claim`);
}

for (const file of [
  'assets/revenue-funnel.css','assets/revenue-funnel.js','sitemap-commercial.xml',
  'resources/downloads/sundai-ai-governance-readiness-scorecard-2026.csv',
  'resources/downloads/sundai-ai-governance-readiness-scorecard-2026-da.csv',
  'resources/downloads/sundai-ai-governance-readiness-scorecard-2026-sv.csv'
]) {
  try { await access(path.join(root,file)); } catch { errors.push(`Missing commercial asset ${file}`); }
}

for (const file of ['services/index.html','da/ydelser/index.html','sv/tjanster/index.html']) {
  const html = await readFile(path.join(root,file),'utf8');
  for (const token of ['revenue-grid','Readiness Sprint','Governance Desk','/start/']) if (!html.includes(token)) errors.push(`${file}: missing productised-service token ${token}`);
}

const sitemap = await readFile(path.join(root,'sitemap-commercial.xml'),'utf8');
for (const url of ['https://sundaibot.com/start/','https://sundaibot.com/da/start/','https://sundaibot.com/sv/start/']) if (!sitemap.includes(url)) errors.push(`sitemap-commercial.xml missing ${url}`);
const robots = await readFile(path.join(root,'robots.txt'),'utf8');
if (!robots.includes('Sitemap: https://sundaibot.com/sitemap-commercial.xml')) errors.push('robots.txt missing commercial sitemap');
const indexNow = await readFile(path.resolve(root,'..','.github/workflows/indexnow.yml'),'utf8');
if (!indexNow.includes('sitemap*.xml')) errors.push('IndexNow must submit every sitemap*.xml file');
const funnelJs = await readFile(path.join(root,'assets/revenue-funnel.js'),'utf8');
for (const token of ['utm_source','utm_medium','utm_campaign','document.referrer','Interest:','startedAt']) if (!funnelJs.includes(token)) errors.push(`revenue-funnel.js missing attribution token ${token}`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Validated multilingual productised offers, enquiry funnel, attribution, scorecards and commercial sitemap.');
