import { courseTopics, locales, searchCopy } from './search-copy.mjs';
const origin = 'https://sundaibot.com';
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const entities = {'&amp;':'&','&quot;':'"','&#39;':"'",'&lt;':'<','&gt;':'>'};
const text = value => value.replace(/&(?:amp|quot|#39|lt|gt);/g, entity => entities[entity]);
const urlFor = (lang,parts) => origin + '/' + [...(lang==='en'?[]:[lang]),...parts].map(s=>s+'/').join('');
export function optimisePage(html, route, isPublic = false) {
  const parts = route.split('/').filter(Boolean);
  const lang = locales.includes(parts[0]) ? parts.shift() : 'en';
  const [kind,slug] = parts;
  const info = searchCopy[lang];
  const course = kind==='courses';
  const title = !kind ? info.home+' | SundAI' : course ? info.course[courseTopics.indexOf(slug)]+' | SundAI' : text(html.match(/<title>(.*?)<\/title>/s)[1]);
  const desc = !kind ? info.homeLead : text(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  const canonical = urlFor(lang,parts);
  const org = {'@type':'Organization','@id':origin+'/#organization',name:'SundAI',url:origin+'/'};
  const pageType = course?'Course':kind==='services'?'Service':kind==='read'?'Article':'WebPage';
  const entity = {'@context':'https://schema.org','@type':pageType,'@id':canonical+'#content',url:canonical,name:title.replace(/ \| SundAI$/,''),description:desc};
  if (pageType==='Article') Object.assign(entity,{inLanguage:lang,headline:entity.name,publisher:org});
  if(pageType==='WebPage') Object.assign(entity,{inLanguage:lang,publisher:org});
  if(pageType==='Course'||pageType==='Service') entity.provider=org;
  const alternatives = [...locales,'x-default'].map(l=>'<link rel="alternate" hreflang="'+l+'" href="'+urlFor(l==='x-default'?'en':l,parts)+'">').join('');
  const meta = '<title>'+escape(title)+'</title><meta name="description" content="'+escape(desc)+'"><meta name="robots" content="'+(isPublic&&kind!=='intro-call'?'index,follow':'noindex,follow')+'"><link rel="canonical" href="'+canonical+'">'+alternatives+
    '<meta property="og:site_name" content="SundAI"><meta property="og:type" content="'+(kind==='read'?'article':'website')+'"><meta property="og:title" content="'+escape(title)+'"><meta property="og:description" content="'+escape(desc)+'"><meta property="og:url" content="'+canonical+'"><meta property="og:image" content="'+origin+'/assets/social-card.png"><meta name="twitter:card" content="summary_large_image">'+
    '<script type="application/ld+json">'+JSON.stringify(entity).replaceAll('<','\\u003c')+'</script><link rel="stylesheet" href="/assets/brand-home/brand.css">';
  return html.replace(/<title>[\s\S]*?<\/title>|<meta name="(?:description|robots)"[^>]*>|<link rel="(?:alternate|canonical)"[^>]*>/g,'').replace('</head>',meta+'</head>');
}
export function sitemap(routes) {
  const urls = [...new Set(routes)].filter(route=>!route.split('/').includes('intro-call')).map(route=>'<url><loc>'+origin+'/'+(route?route+'/':'')+'</loc></url>');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.join('')+'</urlset>\n';
}
