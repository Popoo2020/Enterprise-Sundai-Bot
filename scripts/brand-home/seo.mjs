import { locales, searchCopy } from './search-copy.mjs';
import { guideIndex } from './knowledge-data.mjs';
import { legacyGuideLabel } from './legacy-guides.mjs';
const origin = 'https://sundaibot.com';
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const entities = {'&amp;':'&','&quot;':'"','&#39;':"'",'&lt;':'<','&gt;':'>'};
const text = value => value.replace(/&(?:amp|quot|#39|lt|gt);/g, entity => entities[entity]);
const urlFor = (lang,parts) => origin + '/' + [...(lang==='en'?[]:[lang]),...parts].map(s=>s+'/').join('');
const structuredData = data => '<script type="application/ld+json">'+JSON.stringify(data).replaceAll('<','\\u003c')+'</script>';

export function optimisePage(html, route, isPublic = false, languagePaths) {
  const parts = route.split('/').filter(Boolean);
  const lang = locales.includes(parts[0]) ? parts.shift() : 'en';
  const [kind,slug] = parts;
  const info = searchCopy[lang];
  const course = kind==='courses';
  const title = !kind ? info.home+' | SundAI' : text(html.match(/<title>(.*?)<\/title>/s)[1]);
  const desc = !kind ? info.homeLead : text(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  const localizedUrl = locale => languagePaths ? new URL(languagePaths[locale], origin).href : urlFor(locale,parts);
  const canonical = localizedUrl(lang);
  const org = {'@type':'Organization','@id':origin+'/#organization',name:'SundAI',url:origin+'/'};
  const guideCollection = kind==='read' || kind==='free-guides';
  const pageType = course?'Course':kind==='services'?'Service':guideCollection?(slug?'Article':'CollectionPage'):'WebPage';
  const entity = {'@context':'https://schema.org','@type':pageType,'@id':canonical+'#content',url:canonical,name:title.replace(/ \| SundAI$/,''),description:desc};
  if (pageType==='Article') {
    Object.assign(entity,{inLanguage:lang,headline:entity.name,publisher:org,mainEntityOfPage:canonical});
    const publication = html.match(/<time\b[^>]*\bdatetime="(\d{4}-\d{2}-\d{2})"/i);
    if (publication) Object.assign(entity,{author:org,datePublished:publication[1]});
  }
  if (pageType==='CollectionPage') Object.assign(entity,{inLanguage:lang,publisher:org});
  if(pageType==='WebPage') Object.assign(entity,{inLanguage:lang,publisher:org});
  if(pageType==='Course') Object.assign(entity, {inLanguage:lang, provider:org});
  if(pageType==='Service') entity.provider=org;
  if(pageType==='Service') entity.mainEntityOfPage = {'@type':'WebPage','@id':canonical,inLanguage:lang};
  const alternatives = [...locales,'x-default'].map(l=>'<link rel="alternate" hreflang="'+l+'" href="'+localizedUrl(l==='x-default'?'en':l)+'">').join('');
  let breadcrumb = '';
  if (guideCollection) {
    const hubTitle = kind==='free-guides' ? legacyGuideLabel(lang) : guideIndex[lang].title;
    const pages = [{name:'SundAI',item:urlFor(lang,[])},{name:hubTitle,item:urlFor(lang,[kind])}];
    if (slug) pages.push({name:entity.name,item:canonical});
    breadcrumb = structuredData({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:pages.map((page,i)=>({'@type':'ListItem',position:i+1,...page}))});
  }
  const feed = kind==='read' && !slug ? '<link rel="alternate" type="application/rss+xml" title="'+escape(entity.name)+'" href="'+canonical+'feed.xml">' : '';
  const meta = '<title>'+escape(title)+'</title><meta name="description" content="'+escape(desc)+'"><meta name="robots" content="'+(isPublic&&kind!=='intro-call'?'index,follow':'noindex,follow')+'"><link rel="canonical" href="'+canonical+'">'+alternatives+
    '<meta property="og:site_name" content="SundAI"><meta property="og:type" content="'+(pageType==='Article'?'article':'website')+'"><meta property="og:title" content="'+escape(title)+'"><meta property="og:description" content="'+escape(desc)+'"><meta property="og:url" content="'+canonical+'"><meta property="og:image" content="'+origin+'/assets/social-card.png"><meta name="twitter:card" content="summary_large_image">'+
    structuredData(entity)+breadcrumb+feed+'<link rel="stylesheet" href="/assets/brand-home/brand.css">';
  return html.replace(/<title>[\s\S]*?<\/title>|<meta name="(?:description|robots)"[^>]*>|<link rel="(?:alternate|canonical)"[^>]*>/g,'').replace('</head>',meta+'</head>');
}
export function sitemap(routes) {
  const urls = [...new Set(routes)].filter(route=>!route.split('/').includes('intro-call')).map(route=>'<url><loc>'+origin+'/'+(route?route+'/':'')+'</loc></url>');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.join('')+'</urlset>\n';
}
