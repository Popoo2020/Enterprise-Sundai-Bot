import {serviceSeo,seoUi,serviceHubCopy,faqHubCopy} from './seo-content.mjs';

export const faqRoutes={en:'/faq/',da:'/da/spoergsmaal-svar/',sv:'/sv/fragor-svar/'};
export const htmlEscape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const textFromEscaped=value=>value.replaceAll('&quot;','"').replaceAll('&gt;','>').replaceAll('&lt;','<').replaceAll('&amp;','&');

export function faqDetails(items,lang,servicePath){
 return `<div class="faq">${items.map(item=>{
  const q=item.q??item[0],a=item.a??item[1];
  return `<details data-faq-item><summary>${htmlEscape(q)}</summary><div class="faq-answer"><p>${htmlEscape(a)}</p>${item.serviceId?`<a class="text-link" href="${servicePath(lang,item.serviceId)}">${htmlEscape(seoUi[lang].relatedService)} ↗</a>`:''}</div></details>`;
 }).join('')}</div>`;
}

// Read only our escaped FAQ renderer output; this is not an HTML sanitizer.
export function visibleFaqPairs(body){
 return [...body.matchAll(/<details data-faq-item><summary>([\s\S]*?)<\/summary><div class="faq-answer"><p>([\s\S]*?)<\/p>/g)].map(m=>({q:textFromEscaped(m[1]),a:textFromEscaped(m[2])}));
}

export function serviceValue(lang,id){
 const c=serviceSeo[id][lang],t=seoUi[lang],esc=htmlEscape;
 return `<section class="section service-value" id="service-value"><div class="container"><div class="section-heading"><div><p class="eyebrow">${esc(t.scopeFirst)}</p><h2>${esc(t.summary)}</h2></div><p class="service-summary">${esc(c.summary)}</p></div><h2 class="section-label">${esc(t.workflow)}</h2><ol class="delivery-steps">${c.workflow.map((step,i)=>`<li><span class="card-number" aria-hidden="true">0${i+1}</span><div><h3>${esc(step.title)}</h3><p>${esc(step.text)}</p></div></li>`).join('')}</ol><div class="section-heading example-heading"><h2>${esc(t.useCases)}</h2><p>${esc(t.exampleNote)}</p></div><div class="service-examples">${c.useCases.map(example=>`<article><h3>${esc(example.title)}</h3><p>${esc(example.text)}</p></article>`).join('')}</div></div></section>`;
}

export function serviceDecision(lang){
 const c=serviceHubCopy[lang],t=seoUi[lang],esc=htmlEscape;
 return `<section class="section service-decision"><div class="container"><div class="section-heading"><div><p class="eyebrow">${esc(t.chooseService)}</p><h2>${esc(c.decisionTitle)}</h2></div><p>${esc(c.decisionIntro)}</p></div><div class="decision-list">${c.decisionTips.map(tip=>`<article><h3>${esc(tip.title)}</h3><p>${esc(tip.text)}</p></article>`).join('')}</div></div></section>`;
}

export function faqHub(lang,servicePath){
 const c=faqHubCopy[lang],t=seoUi[lang],esc=htmlEscape;
 return `<section class="page-hero faq-hero"><div class="container"><p class="eyebrow">${esc(t.faqNav)}</p><h1>${esc(c.headline)}</h1><p class="lead">${esc(c.intro)}</p><nav class="topic-links" aria-label="${esc(t.faqNav)}">${c.groups.map(group=>`<a href="#${group.id}">${esc(group.title)}</a>`).join('')}</nav></div></section>${c.groups.map(group=>`<section class="section faq-topic" id="${group.id}"><div class="container faq-topic-grid"><h2>${esc(group.title)}</h2>${faqDetails(group.questions,lang,servicePath)}</div></section>`).join('')}<div class="container reviewed-note"><p>${esc(t.reviewed)}</p></div>`;
}

export function faqPageSchema(lang,url,body){
 const pairs=visibleFaqPairs(body);
 return pairs.length?[{'@type':'FAQPage','@id':url+'#faq',url,inLanguage:lang,mainEntity:pairs.map(({q,a})=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}]:[];
}
