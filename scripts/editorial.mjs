import {readFile,readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {htmlEscape as esc,faqDetails} from './seo-render.mjs';

const matrixRoutes={en:'/resources/ai-control-matrix/',da:'/da/ressourcer/ai-kontrolmatrix/',sv:'/sv/resurser/ai-kontrollmatris/'};
const matrixNames={en:'SundAI AI Control Matrix',da:'SundAI AI-kontrolmatrix',sv:'SundAI AI-kontrollmatris'};

export const editorialDate='2026-10-16';
export const editorialLanguages=['en','da','sv'];
export const editorialContent=Object.fromEntries(await Promise.all(editorialLanguages.map(async lang=>[lang,JSON.parse(await readFile(new URL(`./editorial/${lang}.json`,import.meta.url),'utf8'))])));
export const articlePath=(lang,id)=>`${lang==='en'?'':`/${lang}`}/insights/${editorialContent[lang].find(x=>x.id===id).slug}.html`;
export const articlePaths=editorialLanguages.flatMap(lang=>editorialContent[lang].map(a=>articlePath(lang,a.id)));
const origin='https://sundaibot.com';
const sources={
 assessment:[['OWASP: Excessive Agency (2025 edition)','https://genai.owasp.org/llmrisk/llm062025-excessive-agency/'],['NIST: AI Risk Management Framework','https://www.nist.gov/itl/ai-risk-management-framework']],
 mcp:[['MCP specification 2026-07-28: Authorization Security Considerations','https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations'],['OWASP: Excessive Agency (2025 edition)','https://genai.owasp.org/llmrisk/llm062025-excessive-agency/']],
 code:[['Microsoft: Document-level access control in Azure AI Search','https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview'],['GitHub: Secure use reference','https://docs.github.com/en/actions/reference/security/secure-use']],
 value:[['Microsoft: Cost Optimization design review checklist','https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/checklist'],['NIST AI RMF Playbook: Manage','https://airc.nist.gov/airmf-resources/playbook/manage/']]
};
export const editorialUi={
 en:{nav:'Articles',title:'AI security, governance & automation articles',headline:'Better questions. Stronger decisions.',intro:'Practical reading for the people buying, building and governing AI. Start with the decision in front of you.',latest:'New practical articles',archive:'Explore the article library',all:'All topics',read:'Read article',minutes:'min read',by:'By SundAI',date:'Published',audience:'For',answer:'The short answer',questions:'Questions buyers ask',sources:'Sources and editorial method',related:'Keep exploring',back:'All articles',feed:'Article feed (RSS)',method:'SundAI editorial guidance, prepared with AI assistance. Source claims are linked; worksheets and scenarios are our suggested planning tools, not observed client outcomes. This article is not a certification or a legal opinion. Sources checked on 16 October 2026.',topics:['AI security','Governance','Automation & delivery'],note:'Choose a topic to jump to its articles. All articles are available without signing up.'},
 da:{nav:'Artikler',title:'Artikler om AI-sikkerhed, governance og automatisering',headline:'Bedre spørgsmål. Stærkere beslutninger.',intro:'Praktisk læsning til jer, der køber, bygger og styrer AI. Start med den beslutning, I står overfor.',latest:'Nye praktiske artikler',archive:'Gå på opdagelse i artiklerne',all:'Alle emner',read:'Læs artikel',minutes:'min. læsning',by:'Af SundAI',date:'Udgivet',audience:'Til',answer:'Det korte svar',questions:'Spørgsmål fra købere',sources:'Kilder og redaktionel metode',related:'Læs videre',back:'Alle artikler',feed:'Artikelfeed (RSS)',method:'Redaktionel vejledning fra SundAI, udarbejdet med AI-assistance. Kildebaserede udsagn har henvisninger; arbejdsark og scenarier er vores forslag til planlægning, ikke dokumenterede kunderesultater. Artiklen er ikke en certificering eller juridisk vurdering. Kilder kontrolleret 16. oktober 2026.',topics:['AI-sikkerhed','Governance','Automatisering og levering'],note:'Vælg et emne for at gå til artiklerne. Alle artikler kan læses uden tilmelding.'},
 sv:{nav:'Artiklar',title:'Artiklar om AI-säkerhet, styrning och automatisering',headline:'Bättre frågor. Starkare beslut.',intro:'Praktisk läsning för er som köper, bygger och styr AI. Börja med beslutet ni står inför.',latest:'Nya praktiska artiklar',archive:'Utforska artikelbiblioteket',all:'Alla ämnen',read:'Läs artikel',minutes:'min läsning',by:'Av SundAI',date:'Publicerad',audience:'För',answer:'Det korta svaret',questions:'Frågor från köpare',sources:'Källor och redaktionell metod',related:'Läs vidare',back:'Alla artiklar',feed:'Artikelflöde (RSS)',method:'Redaktionell vägledning från SundAI, framtagen med AI-stöd. Källbaserade påståenden har hänvisningar; arbetsblad och scenarier är våra planeringsförslag, inte dokumenterade kundresultat. Artikeln är ingen certifiering eller juridisk bedömning. Källor kontrollerade 16 oktober 2026.',topics:['AI-säkerhet','Styrning','Automatisering och leverans'],note:'Välj ett ämne för att gå till artiklarna. Alla artiklar kan läsas utan registrering.'}
};
const serviceIds={assessment:'pentesting-red-teaming',mcp:'private-ai-agents-rag',code:'devsecops',value:'secure-ai-automation'};
export const articleForService={
 'compliance-ai-governance':['assessment','mcp'],
 'secure-ai-automation':['value','mcp'],
 'private-ai-agents-rag':['mcp','assessment'],
 'pentesting-red-teaming':['assessment','code'],
 devsecops:['code','assessment'],
 'cloud-security':['mcp','code']
};
export function editorialServiceLinks(lang,id){return `<div class="editorial-service-links"><h3>${esc(editorialUi[lang].related)}</h3>${articleForService[id].map(key=>`<p><a href="${articlePath(lang,key)}">${esc(editorialContent[lang].find(a=>a.id===key).title)}</a></p>`).join('')}</div>`;}
const safeJson=value=>JSON.stringify(value).replaceAll('<','\\u003c');
// Read text from trusted, repository-owned article metadata. This is not an HTML
// sanitizer. Decode once so a literal nested entity stays literal; escape again
// at the HTML/XML output boundary.
export const editorialPlainText=value=>value.replace(/<[^>]*>/g,' ').replace(/&(amp|quot|#39);/g,(_,entity)=>({amp:'&',quot:'"','#39':"'"})[entity]).replace(/\s+/g,' ').trim();
const plain=editorialPlainText;
const wordCount=a=>[a.answer,...a.sections.flatMap(s=>[s.title,...s.paragraphs]),...a.checklist,...a.faq.flat()].join(' ').trim().split(/\s+/u).length;
const cited=text=>esc(text).replace(/\[([12])\]/g,'<a class="source-reference" href="#source-$1">[$1]</a>');
const topicIndex=url=>/governance|governance|framework|ramverk|rammer|ai-act|ai-forord|artikel-50|article-50|shadow-ai|ai-leverand|ai-vendor/.test(url)?1:/pilots|piloter|future-ready|code-security|kode-sikkerhed|kod-sakerhet|cost-roi|pris-roi|kostnad-roi/.test(url)?2:0;
const schemaNodes=html=>[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const j=JSON.parse(m[1]);return j['@graph']||[j];});

function articleBody(a,lang,routes){
 const t=editorialUi[lang],r=routes[lang],url=articlePath(lang,a.id),related=editorialContent[lang].filter(x=>x.id!==a.id).slice(0,2),cta=a.id==='value'?`${lang==='en'?'':`/${lang}`}/ai-decision-review/`:r.services+serviceIds[a.id]+'/';
 const table=`<h2>${esc(a.tableTitle)}</h2><div class="guide-table-wrap"><table><thead><tr>${a.columns.map(v=>`<th>${esc(v)}</th>`).join('')}</tr></thead><tbody>${a.rows.map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 return `<section class="guide-hero"><div class="guide-shell"><a class="article-back" href="${r.insights}">${esc(t.back)}</a><p class="eyebrow">${esc(a.topic)}</p><h1>${esc(a.title)}</h1><p class="guide-dek">${esc(a.description)}</p><p class="article-meta"><a href="${r.about}">${esc(t.by)}</a> · ${esc(t.date)} <time datetime="${editorialDate}">${editorialDate}</time> · ${Math.ceil(wordCount(a)/180)} ${esc(t.minutes)}</p><p class="article-audience">${esc(t.audience)}: ${esc(a.audience)}</p></div></section><div class="guide-shell guide-layout"><article class="guide-body"><div class="answer-box"><h2>${esc(t.answer)}</h2><p>${esc(a.answer)}</p></div>${a.sections.map((s,i)=>`${a.id==='value'&&i===2?'<section class="article-calculation-example" data-illustrative-calculation>':''}<h2>${esc(s.title)}</h2>${s.paragraphs.map(p=>`<p>${cited(p)}</p>`).join('')}${i===2?table:''}${a.id==='value'&&i===2?'</section>':''}`).join('')}<h2>${esc(a.checkTitle)}</h2><ol class="article-checklist">${a.checklist.map(v=>`<li>${esc(v)}</li>`).join('')}</ol><h2>${esc(t.questions)}</h2>${faqDetails(a.faq,lang)}<section class="guide-cta"><h2>${esc(a.ctaTitle)}</h2><p>${esc(a.ctaText)}</p><a class="button primary" href="${cta}">${esc(a.ctaLabel)}</a></section><h2>${esc(t.related)}</h2><ul>${related.map(x=>`<li><a href="${articlePath(lang,x.id)}">${esc(x.title)}</a></li>`).join('')}</ul><h2>${esc(t.sources)}</h2><ol class="article-sources">${sources[a.id].map(([name,href],i)=>`<li id="source-${i+1}"><a href="${href}" rel="external">${esc(name)}</a></li>`).join('')}</ol><p class="method-note">${esc(t.method)}</p></article><aside class="guide-aside"><h2>${esc(a.ctaTitle)}</h2><p>${esc(a.ctaText)}</p><a class="button" href="${cta}">${esc(a.ctaLabel)}</a><a href="${r.guides}">${esc({en:'Free practical PDF guides',da:'Gratis praktiske PDF-guides',sv:'Kostnadsfria praktiska PDF-guider'}[lang])}</a></aside></div>`;
}
const addSchema=(html,nodes)=>html.replace('</head>',`<script type="application/ld+json">${safeJson({'@context':'https://schema.org','@graph':nodes})}</script></head>`);

export async function renderEditorial({root,routes,shell,save}){
 const redirects=new Set((await readFile(path.join(root,'_redirects'),'utf8')).split('\n').map(line=>line.trim().split(/\s+/)).filter(parts=>parts[2]==='301').map(parts=>parts[0]));
 for(const lang of editorialLanguages)for(const a of editorialContent[lang]){
  const url=articlePath(lang,a.id),alternates=Object.fromEntries(editorialLanguages.map(l=>[l,articlePath(l,a.id)]));
  let html=shell(lang,url,a.title,a.description,articleBody(a,lang,routes),alternates,'article');
  html=html.replace('property="og:type" content="website"','property="og:type" content="article"').replace('</head>',`<meta property="article:published_time" content="${editorialDate}T00:00:00+02:00"><meta property="article:modified_time" content="${editorialDate}T00:00:00+02:00"><meta name="twitter:card" content="summary"></head>`);
  const article={'@type':'Article','@id':origin+url+'#article',headline:a.title,description:a.description,inLanguage:lang,datePublished:editorialDate,dateModified:editorialDate,mainEntityOfPage:{'@id':origin+url+'#webpage'},author:{'@type':'Organization',name:'SundAI',url:origin+routes[lang].about},publisher:{'@id':origin+'/#organization'},articleSection:a.topic,wordCount:wordCount(a),citation:sources[a.id].map(s=>s[1]),isAccessibleForFree:true};
  await save(url,addSchema(html,[article]));
 }
 const catalog={};
 for(const lang of editorialLanguages){
  const r=routes[lang],t=editorialUi[lang],dir=path.join(root,r.insights);catalog[lang]=[];
  for(const name of (await readdir(dir)).filter(n=>n.endsWith('.html')&&n!=='index.html')){
   const url=r.insights+name;if(redirects.has(url))continue;
   const html=await readFile(path.join(dir,name),'utf8'),nodes=schemaNodes(html),article=nodes.find(n=>['Article','TechArticle'].includes(n['@type']));
   const title=plain(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]||article?.headline||name),description=plain(html.match(/<meta name="description" content="([^"]*)"/)?.[1]||'');
   catalog[lang].push({url,title,description,date:article?.datePublished||'',topic:topicIndex(url),fresh:articlePaths.includes(url)});
  }
  catalog[lang].sort((a,b)=>Number(b.fresh)-Number(a.fresh)||b.date.localeCompare(a.date)||a.url.localeCompare(b.url));
  const card=a=>`<article class="insight-card"><div class="insight-copy"><span class="insight-topic">${esc(t.topics[a.topic])}</span><h3><a href="${a.url}">${esc(a.title)}</a></h3><p>${esc(a.description)}</p><a class="insight-link" href="${a.url}">${esc(t.read)}<span class="sr-only">: ${esc(a.title)}</span></a></div></article>`;
  const content=`<section class="authority-hero"><div class="container authority-shell"><p class="eyebrow">SUNDAI / ${esc(t.nav)}</p><h1>${esc(t.headline)}</h1><p class="dek">${esc(t.intro)}</p><nav class="article-topic-nav" aria-label="${esc(t.all)}"><a href="#latest">${esc(t.latest)}</a>${t.topics.map((v,i)=>`<a href="#topic-${i}">${esc(v)}</a>`).join('')}</nav><p class="article-library-note">${esc(t.note)}</p></div></section><section class="section editorial-new" id="latest"><div class="container"><p class="eyebrow">${editorialDate}</p><h2>${esc(t.latest)}</h2><div class="insight-grid article-latest-grid">${catalog[lang].filter(a=>a.fresh).map(card).join('')}</div></div></section>${t.topics.map((name,i)=>`<section class="section insights" id="topic-${i}"><div class="container"><h2>${esc(name)}</h2><div class="insights-grid">${catalog[lang].filter(a=>a.topic===i&&!a.fresh).map(card).join('')}</div>${catalog[lang].filter(a=>a.topic===i&&a.fresh).map(a=>`<p class="article-new-reference"><a href="${a.url}">${esc(a.title)}</a></p>`).join('')}</div></section>`).join('')}<div class="container article-feed-link"><a href="${r.insights}feed.xml">${esc(t.feed)}</a></div>`;
  const resourceLinks=`<section class="section"><div class="container"><h2>${esc(t.related)}</h2><div class="article-topic-nav"><a href="${matrixRoutes[lang]}">${esc(matrixNames[lang])}</a><a href="${r.guides}">${esc({en:'Free PDF guides',da:'Gratis PDF-guides',sv:'Kostnadsfria PDF-guider'}[lang])}</a></div></div></section>`;
  let hub=shell(lang,r.insights,t.title,t.intro,content+resourceLinks,Object.fromEntries(editorialLanguages.map(l=>[l,routes[l].insights])),'articles');
  // Extend the existing page node; avoid a second conflicting CollectionPage.
  hub=hub.replace(/(<script type="application\/ld\+json" data-upgrade-schema>)([\s\S]*?)(<\/script>)/,(whole,open,json,close)=>{
   const data=JSON.parse(json),page=data['@graph'].find(n=>n['@id']===origin+r.insights+'#webpage');
   page['@type']='CollectionPage';page.mainEntity={'@type':'ItemList',itemListElement:catalog[lang].map((a,i)=>({'@type':'ListItem',position:i+1,url:origin+a.url,name:a.title}))};return open+safeJson(data)+close;
  });
  await save(r.insights,hub);
  const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(t.title)} | SundAI</title><link>${origin+r.insights}</link><description>${esc(t.intro)}</description><language>${lang}</language><atom:link href="${origin+r.insights}feed.xml" rel="self" type="application/rss+xml"/>${catalog[lang].map(a=>`<item><title>${esc(a.title)}</title><link>${origin+a.url}</link><guid isPermaLink="true">${origin+a.url}</guid><description>${esc(a.description)}</description>${a.date?`<pubDate>${new Date(a.date).toUTCString()}</pubDate>`:''}</item>`).join('')}</channel></rss>\n`;
  await writeFile(path.join(dir,'feed.xml'),xml);
 }
 // The asset provider normally redirects .html to extensionless paths. Keep
 // the established published article URLs canonical at the Worker boundary.
 const canonicalPaths=Object.values(catalog).flatMap(items=>items.map(a=>a.url)).sort();
 await writeFile(path.join(root,'functions/_shared/article-routes.js'),'// Generated by scripts/editorial.mjs. Canonical articles only; no redirect aliases.\nexport const canonicalArticlePaths=Object.freeze('+JSON.stringify(canonicalPaths,null,2)+');\n');
 return catalog;
}
