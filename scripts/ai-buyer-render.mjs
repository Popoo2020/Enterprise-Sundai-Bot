import {buyerCopy, buyerRows, buyerRoutes} from './ai-buyer-content.mjs';
import {htmlEscape as esc} from './seo-render.mjs';

export const buyerReferences = [
  {key:'nistAi', url:'https://www.nist.gov/itl/ai-risk-management-framework'},
  {key:'ssdf', url:'https://csrc.nist.gov/pubs/sp/800/218/final'},
  {key:'owasp', url:'https://owasp.org/projects/asvs'},
  {key:'genai', url:'https://genai.owasp.org/llm-top-10/'}
];
export const registryUrl = 'https://find-and-update.company-information.service.gov.uk/company/13813344';
export const publicEmail = 'eririmo@protonmail.com';
const identityCopy = {
  en:{title:'Who you are working with',brand:'Service brand',operator:'Legal operator',number:'Company registration',contact:'Project enquiries',languages:'Website languages',languageNames:'English, Danish and Swedish',registry:'View the public company record',note:'Company registration identifies the operator. Project capability, contributors and responsibilities are agreed for each engagement.'},
  da:{title:'Hvem du samarbejder med',brand:'Ydelsesbrand',operator:'Juridisk operatør',number:'Virksomhedsregistrering',contact:'Projektforespørgsler',languages:'Hjemmesidens sprog',languageNames:'Engelsk, dansk og svensk',registry:'Se den offentlige virksomhedsregistrering',note:'Virksomhedsregistreringen identificerer operatøren. Faglig kapacitet, bidragydere og ansvar aftales for hver opgave.'},
  sv:{title:'Vem du samarbetar med',brand:'Tjänstevarumärke',operator:'Juridisk operatör',number:'Bolagsregistrering',contact:'Projektförfrågningar',languages:'Webbplatsens språk',languageNames:'Engelska, danska och svenska',registry:'Se den offentliga bolagsregistreringen',note:'Bolagsregistreringen identifierar operatören. Kompetens, medverkande och ansvar avtalas för varje uppdrag.'}
};

export function buyerLink(lang,anchor='') {
  return `<a class="text-link buyer-guide-link" href="${buyerRoutes[lang]+anchor}">${esc(buyerCopy[lang].guideLink)} ↗</a>`;
}

export function serviceFacts(lang,service) {
  const t=buyerCopy[lang],c=service.copy[lang],row=buyerRows[service.id][lang];
  return `<section class="section service-facts" id="service-facts"><div class="container"><div class="section-heading"><h2>${esc(t.factsTitle)}</h2>${buyerLink(lang,'#compare')}</div><div class="service-facts-grid"><div><h3>${esc(t.deliverablesLabel)}</h3><ul class="scope-list">${c.deliverables.map(value=>`<li>${esc(value)}</li>`).join('')}</ul></div><dl class="scope-facts"><div><dt>${esc(t.scopeLabel)}</dt><dd>${esc(c.scope)}</dd></div><div><dt>${esc(t.inputsLabel)}</dt><dd>${esc(c.responsibility)}</dd></div><div><dt>${esc(t.exclusionsLabel)}</dt><dd>${esc(c.exclusions)}</dd></div></dl></div><div class="acceptance-note"><h3>${esc(t.acceptanceLabel)}</h3><p class="small">${esc(t.acceptanceNote)}</p><ul>${row.acceptance.map(value=>`<li>${esc(value)}</li>`).join('')}</ul></div></div></section>`;
}

export function serviceComparison(lang,services,servicePath) {
  const t=buyerCopy[lang];
  return `<section class="section service-comparison" id="compare"><div class="container"><h2>${esc(t.compareTitle)}</h2><table class="comparison-table" role="table"><caption>${esc(t.compareIntro)}</caption><thead role="rowgroup"><tr role="row">${Object.values(t.columns).map(label=>`<th scope="col" role="columnheader">${esc(label)}</th>`).join('')}</tr></thead><tbody role="rowgroup">${services.map(service=>{
    const row=buyerRows[service.id][lang];
    return `<tr role="row"><th scope="row" role="rowheader"><a href="${servicePath(lang,service.id)}">${esc(service.copy[lang].name)}</a></th>${['need','outputs','boundary'].map(key=>`<td role="cell" data-label="${esc(t.columns[key])}">${esc(row[key])}</td>`).join('')}</tr>`;
  }).join('')}</tbody></table></div></section>`;
}

export function buyerGuide(lang,services,servicePath) {
  const t=buyerCopy[lang];
  return `<section class="page-hero buyer-hero"><div class="container"><p class="eyebrow">${esc(t.publisherLabel)} SundAI</p><h1>${esc(t.title)}</h1><p class="lead">${esc(t.intro)}</p><p class="small">${esc(t.updatedLabel)} <time datetime="2026-10-13">2026-10-13</time> · SundAI</p><nav class="buyer-jumps" aria-label="${esc(t.guideLink)}"><a href="#compare">${esc(t.compareTitle)}</a><a href="#checklist">${esc(t.checklistTitle)}</a><a href="#acceptance">${esc(t.acceptanceTitle)}</a></nav></div></section>${serviceComparison(lang,services,servicePath)}<section class="section buyer-choices"><div class="container"><h2>${esc(t.chooseTitle)}</h2><div class="decision-list">${t.choices.map(({title,text})=>`<article><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div></div></section><section class="section buyer-checklist" id="checklist"><div class="container"><div class="section-heading"><h2>${esc(t.checklistTitle)}</h2><p>${esc(t.checklistIntro)}</p></div><ol class="procurement-list">${t.checklist.map(({title,text},index)=>`<li><span class="card-number" aria-hidden="true">0${index+1}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></li>`).join('')}</ol></div></section><section class="section buyer-acceptance" id="acceptance"><div class="container"><h2>${esc(t.acceptanceTitle)}</h2><p>${esc(t.acceptanceIntro)}</p><div class="acceptance-examples">${services.map(service=>`<article id="acceptance-${service.id}"><h3><a href="${servicePath(lang,service.id)}">${esc(service.copy[lang].name)}</a></h3><ul>${buyerRows[service.id][lang].acceptance.map(value=>`<li>${esc(value)}</li>`).join('')}</ul></article>`).join('')}</div></div></section><section class="section buyer-sources"><div class="container"><p>${esc(t.sourceIntro)}</p><ul>${buyerReferences.map(({key,url})=>`<li><a href="${url}" rel="external">${esc(t.referenceLabels[key])}</a></li>`).join('')}</ul></div></section>`;
}

export function businessIdentity(lang) {
  const t=identityCopy[lang];
  return `<section class="section business-identity" id="company"><div class="container"><h2>${esc(t.title)}</h2><dl class="identity-facts"><div><dt>${esc(t.brand)}</dt><dd>SundAI</dd></div><div><dt>${esc(t.operator)}</dt><dd>RIIMON HOLDINGS LTD</dd></div><div><dt>${esc(t.number)}</dt><dd>13813344 · <a href="${registryUrl}" rel="external">${esc(t.registry)}</a></dd></div><div><dt>${esc(t.contact)}</dt><dd><a href="mailto:${publicEmail}">${publicEmail}</a></dd></div><div><dt>${esc(t.languages)}</dt><dd>${esc(t.languageNames)}</dd></div></dl><p class="small">${esc(t.note)}</p>${buyerLink(lang)}</div></section>`;
}
