import { readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderHeader, renderFooter } from './frame.mjs';
import { guideIndex } from './knowledge-data.mjs';

const languages = ['en', 'da', 'sv'];
const origin = 'https://sundaibot.com';
const dateNotes = {
  en: ['Editorial update · 19 November 2026', 'Article 111(4) sets a separate deadline for providers of systems that generate synthetic audio, images, video or text. For systems already on the market before 2 August 2026, the marking requirement in Article 50(2) must be met by 2 December 2026.', 'Consolidated AI Act', 'European Commission timeline'],
  da: ['Redaktionel opdatering · 19. november 2026', 'Artikel 111, stk. 4, fastsætter en særskilt frist for udbydere af systemer, der genererer syntetisk lyd, billeder, video eller tekst. For systemer, der blev bragt i omsætning før 2. august 2026, skal mærkningskravet i artikel 50, stk. 2, være opfyldt senest 2. december 2026.', 'Den konsoliderede AI-forordning', 'Europa-Kommissionens tidsplan'],
  sv: ['Redaktionell uppdatering · 19 november 2026', 'Artikel 111.4 anger en särskild tidsfrist för leverantörer av system som genererar syntetiskt ljud, bilder, video eller text. För system som släpptes ut på marknaden före den 2 augusti 2026 ska märkningskravet i artikel 50.2 vara uppfyllt senast den 2 december 2026.', 'Den konsoliderade AI-förordningen', 'EU-kommissionens tidsplan']
};

const collections = new Map();
export function archiveLibrary(locale) {
  const lang = languages.includes(locale) ? locale : 'en';
  if (!collections.has(lang)) {
    const index = (lang === 'en' ? '/' : '/' + lang + '/') + 'insights/';
    const original = readFileSync(new URL('../../site' + index + 'index.html', import.meta.url), 'utf8');
    const data = original.match(/<script type="application\/ld\+json" data-upgrade-schema>([\s\S]*?)<\/script>/);
    const collection = JSON.parse(data[1])['@graph'].find(entity => entity['@type'] === 'CollectionPage');
    const articles = collection.mainEntity.itemListElement.map(item => ({url: new URL(item.url).pathname, title: item.name}));
    collections.set(lang, { index, articles });
  }
  return collections.get(lang);
}

function alternatePaths(html) {
  const paths = {he: '/he/read/'};
  for (const link of html.matchAll(/<link rel="alternate" hreflang="(en|da|sv|he)" href="([^"]+)"[^>]*>/g)) {
    paths[link[1]] = new URL(link[2], origin).pathname;
  }
  return paths;
}

// Input documents are static HTML produced by our own generators. Preserve their
// canonical URLs, translated metadata, JSON-LD, article text and source links.
export function restyleDocument({html, lang, languagePaths, isPublic, mainClass, styles = [], bodyScripts = [], showClose = true, beforeContent = '', afterContent = ''}) {
  const originalHead = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  const originalMain = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!originalHead || !originalMain) throw new Error('Expected a head and main in legacy ' + lang + ' document.');
  let head = originalHead
    .replace(/<link\b(?=[^>]*\brel="(?:preload|stylesheet)")[^>]*>/gi, '')
    .replace(/<script\b(?=[^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi, '');
  if (!isPublic) head = head.replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="noindex,follow">');
  const css = ['shell', 'frame', 'knowledge', ...styles, 'brand'].map(name =>
    '<link rel="stylesheet" href="/assets/brand-home/' + name + '.css">').join('');
  const scripts = ['/assets/brand-home/frame.js', ...bodyScripts].map(src =>
    '<script defer src="' + src + '"></script>').join('');
  const options = {innerPage: true, showClose, languagePaths: languagePaths || alternatePaths(originalHead)};
  return '<!doctype html><html lang="' + lang + '" dir="' + (lang === 'he' ? 'rtl' : 'ltr') + '"><head>' +
    head + css + scripts + '</head><body><a class="fr-skip" href="#main">' + guideIndex[lang].skip + '</a>' +
    renderHeader(lang, options) + '<main id="main" class="' + mainClass + '">' +
    beforeContent + originalMain + afterContent + '</main>' + renderFooter(lang, options) + '</body></html>';
}

export function legalUpdate(lang) {
  const [title, text, law, timeline] = dateNotes[lang];
  return '<aside class="ar-update"><strong>' + title + '</strong><p>' + text + '</p>' +
    '<a href="https://eur-lex.europa.eu/eli/reg/2024/1689">' + law + '</a> · ' +
    '<a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai">' + timeline + '</a></aside>';
}

const cprUpdate = {
  en: ['Update · 26 November 2026', 'The Danish ministry reports that the October incident concerned unauthorised access to data on about 8.8 million registered people. It also reported a separate incident affecting about 11,000 people. New monitoring of register lookups helped stop the second incident. The ministry said police were investigating both cases.', 'Ministry statement', 'Data Protection Agency investigation'],
  da: ['Opdateret 26. november 2026', 'Ifølge ministeriet fik uvedkommende i den første sag adgang til oplysninger om cirka 8,8 millioner registrerede personer. Ministeriet har også oplyst om en særskilt hændelse, som berørte cirka 11.000 personer. Ny overvågning af opslag i registret var med til at standse den anden hændelse. Ifølge ministeriet efterforsker politiet begge sager.', 'Ministeriets meddelelse', 'Datatilsynets undersøgelse'],
  sv: ['Uppdatering 26 november 2026', 'Enligt det danska ministeriet fick obehöriga i det första fallet tillgång till uppgifter om cirka 8,8 miljoner registrerade personer. Ministeriet har också rapporterat en separat händelse som berörde cirka 11 000 personer. Ny övervakning av sökningar i registret bidrog till att stoppa den andra händelsen. Enligt ministeriet utreder polisen båda fallen.', 'Ministeriets besked', 'Datatillsynens utredning']
};

function cprNote(lang) {
  const [heading, text, ministry, regulator] = cprUpdate[lang];
  return '<aside class="ar-update"><strong>' + heading + '</strong><p>' + text + '</p>' +
    '<a href="https://via.ritzau.dk/pressemeddelelse/15313498/trusselsbilledet-skaerper-krav-til-cpr-systemet?lang=da&amp;publisherId=2869389">' + ministry + '</a> · ' +
    '<a href="https://www.datatilsynet.dk/presse-og-nyheder/nyhedsarkiv/2026/okt/datatilsynet-indleder-formel-undersoegelse-af-cpr-sagen">' + regulator + '</a></aside>';
}

export async function rebrandLegacyArchive(staging, isPublic) {
  for (const lang of languages) {
    const { index, articles } = archiveLibrary(lang);
    for (const route of [index, ...articles.map(item => item.url)]) {
      const hub = route === index;
      const file = path.join(staging, route, hub ? 'index.html' : '');
      const html = await readFile(file, 'utf8');
      const languagePaths = alternatePaths(html);
      let document = restyleDocument({ html, lang, languagePaths, isPublic,
        mainClass: hub ? 'ar-library' : 'ar-reading',
        styles: ['legacy-archive']
      });
      // The original guide and its publication date are retained below this dated correction.
      if (['/insights/article-50-transparency-checklist.html', '/insights/eu-ai-act-2026-what-applies-now.html'].includes(languagePaths.en)) {
        document = document.replace(/(<main\b[^>]*>[\s\S]*?<\/section>)/, '$1' + legalUpdate(lang));
      }
      if (languagePaths.en === '/insights/denmark-cpr-access-security.html') {
        document = document.replace(/(<main\b[^>]*>[\s\S]*?<\/section>)/, '$1' + cprNote(lang));
      }
      if (hub) {
        const base = lang === 'en' ? '/' : '/' + lang + '/';
        document = document.replace(/(<main\b[^>]*><section\b[^>]*><div\b[^>]*>)/,
          '$1<a class="kn-back" href="' + base + 'read/">' + guideIndex[lang].browse + '</a>');
      } else {
        document = document.replace(/<meta property="og:type" content="website">/i, '<meta property="og:type" content="article">');
      }
      await writeFile(file, document);
    }
  }
}
