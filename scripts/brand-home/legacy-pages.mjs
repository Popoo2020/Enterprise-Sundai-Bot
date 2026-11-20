import {readdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {agentWorkflowLink} from './agent-workflows.mjs';
import {restyleDocument} from './legacy-archive.mjs';
import {htmlEscape} from '../seo-render.mjs';

const trustPages = new Set(['trust/index.html', 'da/tillid/index.html', 'sv/tillit/index.html', 'he/trust/index.html']);

function serviceReference(html, lang) {
  const link = agentWorkflowLink(lang);
  const card = '<article class="category-offering"><h3><a href="' + link.url + '">' + htmlEscape(link.title) +
    '</a></h3><p>' + htmlEscape(link.description) + '</p><a class="button secondary" href="' + link.url + '">' +
    htmlEscape(link.action) + '</a></article>';
  return html.replace(/(<section\b[^>]+id="ai-assistants"[\s\S]*?<\/article>)(<\/div><div class="category-meeting">)/, '$1' + card + '$2');
}

// Migrate the generated files themselves. Existing deep links, form actions, planner
// state, document metadata and downloadable resources keep their original URLs.
export async function rebrandLegacyPages(staging, isPublic) {
  const entries = await readdir(staging, {recursive: true});
  for (const file of entries) {
    if (!file.endsWith('.html') || trustPages.has(file)) continue;
    const filename = path.join(staging, file);
    let html = await readFile(filename, 'utf8');
    const body = html.match(/<body\b[^>]*\bdata-page-kind="([^"]+)"[^>]*>/i);
    if (!body || html.includes('class="fr-header"')) continue;
    const lang = html.match(/<html\b[^>]*\blang="([^"]+)"/i)[1];
    const languagePaths = {};
    for (const link of html.matchAll(/<link rel="alternate" hreflang="(en|da|sv|he)" href="([^"]+)"/g)) {
      languagePaths[link[1]] = new URL(link[2], 'https://sundaibot.com').pathname;
    }
    if (!Object.keys(languagePaths).length) {
      for (const loc of ['en','da','sv','he']) languagePaths[loc] = loc === 'en' ? '/' : '/' + loc + '/';
    }
    if (body[1] === 'services') html = serviceReference(html, lang);
    const interactiveScripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g)]
      .map(match => match[1]).filter(src => !src.startsWith('/assets/scroll-reveal.js'));
    const planner = /data-service-planner\b/.test(html);
    const document = restyleDocument({
      html, lang, languagePaths, isPublic, bodyScripts: interactiveScripts,
      mainClass: 'lp-page', styles: ['legacy-pages'],
      showClose: !['book','enquiry','join','decision-review','service','training'].includes(body[1]) && !html.includes('class="section cta"')
    }).replace('<body>', '<body data-page-kind="' + body[1] + '">');
    // Only the interactive planner uses its original component stylesheet.
    // Load it before the shared rules so its controls inherit the new brand.
    await writeFile(filename, planner ? document.replace('<link rel="stylesheet" href="/assets/brand-home/legacy-pages.css">',
      '<link rel="stylesheet" href="/assets/service-planner.css"><link rel="stylesheet" href="/assets/brand-home/legacy-pages.css">') : document);
  }
}
