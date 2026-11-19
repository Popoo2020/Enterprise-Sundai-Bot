import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { restyleDocument, legalUpdate } from './legacy-archive.mjs';
import { buyerCopy, buyerRoutes } from '../ai-buyer-content.mjs';

const libraries = {
  en: {
    index: '/resources/', read: 'Practical guides', title: 'AI governance resources',
    related: 'More governance and procurement tools', table: 'Scrollable comparison table',
    matrix: ['ai-control-matrix', 'AI Control Matrix'],
    brief: ['european-ai-governance-readiness-2026', 'European AI Governance Readiness Brief 2026'],
    toolkit: ['ai-governance-toolkit', 'AI governance toolkit']
  },
  sv: {
    index: '/sv/resurser/', read: 'Praktiska guider', title: 'Resurser för AI-styrning',
    related: 'Fler verktyg för styrning och inköp', table: 'Jämförelsetabell med sidledsrullning',
    matrix: ['ai-kontrollmatris', 'Kontrollmatris för AI'],
    brief: ['europeisk-ai-styrning-readiness-2026', 'Europeisk lägesrapport om AI-styrning 2026'],
    toolkit: ['ai-styrningsverktyg', 'Verktyg för AI-styrning']
  },
  da: {
    index: '/da/ressourcer/', read: 'Praktiske vejledninger', title: 'Ressourcer til AI-governance',
    related: 'Flere værktøjer til styring og indkøb', table: 'Sammenligningstabel, der kan rulles vandret',
    matrix: ['ai-kontrolmatrix', 'Kontrolmatrix for AI'],
    brief: ['europaeisk-ai-governance-readiness-2026', 'Europæisk statusrapport om AI-governance 2026'],
    toolkit: ['ai-governance-vaerktoejskasse', 'Værktøjer til AI-governance']
  }
};
const families = ['matrix', 'brief', 'toolkit', 'buyer'];

export function resourceLibrary(locale) {
  const lang = Object.hasOwn(libraries, locale) ? locale : 'en';
  const library = libraries[lang];
  const items = families.map(family => {
    if (family === 'buyer') return { url: buyerRoutes[lang], title: buyerCopy[lang].title };
    const [slug, title] = library[family];
    return { url: library.index + slug + '/', title };
  });
  return { index: library.index, items };
}

function resourceLinks(items) {
  return items.map(item => `<li><a href="${item.url}">${item.title}</a></li>`).join('');
}

function restyleResource(html, lang, family, languagePaths, isPublic) {
  const hub = family === 'index';
  const t = libraries[lang];
  const { index, items } = resourceLibrary(lang);
  const read = (lang === 'en' ? '/' : '/' + lang + '/') + 'read/';
  const trail = hub ? '' : ' <span aria-hidden="true">/</span> <a href="' + index + '">' + t.title + '</a>';
  const beforeContent = `<div class="lr-trail"><a href="${read}">${t.read}</a>${trail}</div>`;
  // The historical hub contains six foundations but did not link its companion toolkit or buyer guide.
  const afterContent = hub ? `<nav class="lr-other" aria-label="${t.related}"><h2>${t.related}</h2><ul>${resourceLinks(items.slice(2))}</ul></nav>` : '';

  // Both original table types keep their semantic row/column markup. Give narrow screens a keyboard-accessible viewport.
  const region = `class="lr-table-scroll" tabindex="0" role="region" aria-label="${t.table}"`;
  let adaptiveHtml = html
    .replaceAll('class="authority-table-wrap"', region)
    .replace(/(<table class="comparison-table"[\s\S]*?<\/table>)/g, `<div ${region}>$1</div>`);

  if (family === 'brief') {
    adaptiveHtml = adaptiveHtml.replace(/(<div class="answer-first">[\s\S]*?<\/div>)/, '$1' + legalUpdate(lang));
  }

  return restyleDocument({
    html: adaptiveHtml, lang, languagePaths, isPublic,
    mainClass: 'lr-reading', styles: ['legacy-resources'], beforeContent, afterContent
  });
}

export async function rebrandLegacyResources(staging, isPublic) {
  const paths = [];
  const groups = Object.fromEntries(Object.keys(libraries).map(lang => {
    const { index, items } = resourceLibrary(lang);
    return [lang, [index, ...items.map(item => item.url)]];
  }));

  for (const [lang, urls] of Object.entries(groups)) {
    for (const [index, url] of urls.entries()) {
      const languagePaths = Object.fromEntries(Object.entries(groups).map(([key, routes]) => [key, routes[index]]));
      const filename = path.join(staging, url, 'index.html');
      const source = await readFile(filename, 'utf8');
      await writeFile(filename, restyleResource(source, lang, index === 0 ? 'index' : families[index - 1], languagePaths, isPublic));
      paths.push(url);
    }
  }
  return paths;
}
