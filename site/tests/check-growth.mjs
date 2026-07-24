import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const required = [
  'assets/growth.css',
  'insights/index.html','insights/eu-ai-act-readiness.html','insights/why-ai-pilots-fail.html','insights/ai-assistant-security-baseline.html',
  'da/insights/index.html','sv/insights/index.html'
];
for (const file of required) await access(path.join(root, file));

const css = await readFile(path.join(root, 'assets/growth.css'), 'utf8');
for (const token of ['.article-hero','.article-body','.insights-grid','background:linear-gradient(180deg,#fff,#eef5ff)']) {
  if (!css.includes(token)) throw new Error(`Growth stylesheet missing token: ${token}`);
}

const languageIndexes = [
  ['insights/index.html','Practical thinking for responsible AI decisions.'],
  ['da/insights/index.html','ansvarlige AI'],
  ['sv/insights/index.html','ansvarsfulla AI']
];
for (const [page, token] of languageIndexes) {
  const html = await readFile(path.join(root, page), 'utf8');
  if (!html.toLowerCase().includes(token.toLowerCase())) throw new Error(`${page}: expected localised insights copy missing`);
  if (!html.includes('/assets/growth.css')) throw new Error(`${page}: growth stylesheet missing`);
}

for (const article of required.filter(file => /insights\/.+\.html$/.test(file) && !file.endsWith('/index.html'))) {
  const html = await readFile(path.join(root, article), 'utf8');
  if (!html.includes('article-body')) throw new Error(`${article}: article body missing`);
  if (!html.includes('article-back')) throw new Error(`${article}: back navigation missing`);
}

console.log('Insights, article structure and multilingual content checks passed.');