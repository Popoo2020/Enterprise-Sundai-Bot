import { articlesFor } from './knowledge.mjs';
import { guideIndex } from './knowledge-data.mjs';

const xml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');

export function guideFeed(lang) {
  const hub = new URL((lang === 'en' ? '' : lang + '/') + 'read/', 'https://sundaibot.com/').href;
  const {title, summary} = guideIndex[lang];
  const items = articlesFor(lang).filter(article => article.published)
    .sort((a,b) => b.published.localeCompare(a.published))
    .map(article => {
      const url = xml(new URL(article.slug + '/', hub).href);
      // The editorial record has day precision. dc:date preserves it without inventing a publication time.
      return '<item><title>'+xml(article.title)+'</title><link>'+url+'</link><guid isPermaLink="true">'+url+'</guid><description>'+xml(article.summary)+'</description><dc:date>'+xml(article.published)+'</dc:date></item>';
    });
  return '<?xml version="1.0" encoding="utf-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel>'
    + '<title>'+xml(title+' | SundAI')+'</title><link>'+hub+'</link><description>'+xml(summary)+'</description><language>'+xml(lang)+'</language>'
    + '<atom:link href="'+hub+'feed.xml" rel="self" type="application/rss+xml"/>\n'+items.join('\n')+'</channel></rss>\n';
}
