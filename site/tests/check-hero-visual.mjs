import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const errors = [];
for (const [page, language, start] of [
  ['index.html', 'en', '/start/'],
  ['da/index.html', 'da', '/da/start/'],
  ['sv/index.html', 'sv', '/sv/start/']
]) {
  const html = await readFile(path.join(root, page), 'utf8');
  if (!html.includes(`<html lang="${language}"`)) errors.push(`${page}: incorrect language`);
  if (!/<body[^>]*class="[^"]*\bgrowth-home\b[^"]*"/.test(html)) errors.push(`${page}: missing current homepage layout`);
  if (!/<h1>[^<]+<span>[^<]+<\/span><\/h1>/.test(html)) errors.push(`${page}: missing two-part value proposition`);
  if (!html.includes('class="outcome-panel"')) errors.push(`${page}: missing outcome explanation`);
  if (!html.includes(`href="${start}#enquiry"`)) errors.push(`${page}: no direct enquiry link`);
  const sheets = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(m => m[1]);
  if (!sheets.at(-1)?.startsWith('/assets/brand-2026.css')) errors.push(`${page}: current brand styles must load last`);
  const startHtml = await readFile(path.join(root, `${start.slice(1)}index.html`), 'utf8');
  if (!startHtml.includes('id="enquiry"')) errors.push(`${page}: enquiry destination does not exist`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Homepage structure passed for EN, DA and SV: value proposition, outcomes, stylesheet order and enquiry destinations. Browser review is still required for appearance.');
