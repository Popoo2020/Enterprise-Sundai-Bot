import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const authorityArticles = [
  'insights/eu-ai-act-2026-what-applies-now.html','insights/article-50-transparency-checklist.html','insights/ai-framework-comparison.html','insights/ai-vendor-security-review.html','insights/secure-rag-ai-assistants.html','insights/shadow-ai-governance.html',
  'da/insights/eu-ai-act-2026-hvad-gaelder-nu.html','da/insights/artikel-50-transparens-tjekliste.html','da/insights/ai-framework-sammenligning.html','da/insights/ai-leverandoer-sikkerhedsreview.html','da/insights/sikre-rag-ai-assistenter.html','da/insights/shadow-ai-governance.html',
  'sv/insights/eu-ai-act-2026-vad-galler-nu.html','sv/insights/artikel-50-transparens-checklista.html','sv/insights/ai-ramverk-jamforelse.html','sv/insights/ai-leverantor-sakerhetsgranskning.html','sv/insights/saker-rag-ai-assistenter.html','sv/insights/shadow-ai-styrning.html'
];
const required = [
  'insights/index.html','da/insights/index.html','sv/insights/index.html',
  'insights/why-ai-pilots-fail.html','da/insights/hvorfor-ai-piloter-fejler.html','sv/insights/varfor-ai-piloter-misslyckas.html',
  'resources/ai-control-matrix/index.html','da/ressourcer/ai-kontrolmatrix/index.html','sv/resurser/ai-kontrollmatris/index.html',
  ...authorityArticles
];
for (const file of required) await access(path.join(root,file));

for (const page of ['insights/index.html','da/insights/index.html','sv/insights/index.html']) {
  const html=await readFile(path.join(root,page),'utf8');
  for(const token of ['rel="canonical"','application/ld+json','insight-card']) if(!html.includes(token)) throw new Error(`${page}: missing growth token ${token}`);
  const links=(html.match(/class="insight-card/g)||[]).length;
  if(links<7) throw new Error(`${page}: expected at least 7 insight cards, found ${links}`);
}

for (const page of authorityArticles) {
  const html=await readFile(path.join(root,page),'utf8');
  for(const token of ['authority-hero','authority-body','answer-first','source-box','article-nav','datePublished','dateModified']) if(!html.includes(token)) throw new Error(`${page}: missing authority article token ${token}`);
  const h2=(html.match(/<h2/g)||[]).length;
  if(h2<3) throw new Error(`${page}: authority article is too shallow (${h2} h2 headings)`);
  const sourceLinks=(html.match(/rel="external"/g)||[]).length;
  if(sourceLinks<2) throw new Error(`${page}: expected at least two primary/external source links`);
}

for (const page of ['resources/ai-control-matrix/index.html','da/ressourcer/ai-kontrolmatrix/index.html','sv/resurser/ai-kontrollmatris/index.html']) {
  const html=await readFile(path.join(root,page),'utf8');
  for(const token of ['authority-table','EU AI Act','ISO/IEC 42001','ISO/IEC 27001','NIST AI RMF','source-box']) if(!html.includes(token)) throw new Error(`${page}: missing control-matrix token ${token}`);
}

const growthCss=await readFile(path.join(root,'assets/growth.css'),'utf8');
for(const token of ['.insights-grid','.article-hero','.article-body']) if(!growthCss.includes(token)) throw new Error(`growth.css missing ${token}`);
const authorityCss=await readFile(path.join(root,'assets/authority-content.css'),'utf8');
for(const token of ['.authority-hero','.authority-body','.answer-first','.authority-table','.source-box']) if(!authorityCss.includes(token)) throw new Error(`authority-content.css missing ${token}`);

console.log(`Growth QA passed for ${authorityArticles.length} multilingual authority articles, insight hubs and control matrix resources.`);