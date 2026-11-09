import {htmlEscape as esc} from './seo-render.mjs';
import {services} from './upgrade-content.mjs';
import {serviceSales} from './upgrade-sales.mjs';
import {labels} from './upgrade-labels.mjs';

// Navigation groups, not new packages. Specialist scope and original brand copy stay intact.
export const categories = [
  {id:'business-automation',services:['secure-ai-automation'],names:{en:'Business Automation',da:'Automatisering',sv:'Automatisering'},bullets:{
    en:['Connect orders, stock, CRM, scheduling and reports.','Build workflows with Python, APIs and AI where it adds value.','Keep approvals, error handling and handover built in.'],
    da:['Forbind ordrer, lager, CRM, planlægning og rapporter.','Byg arbejdsgange med Python, API’er og AI, hvor det giver værdi.','Få godkendelser, fejlhåndtering og overdragelse med fra starten.'],
    sv:['Koppla ihop beställningar, lager, CRM, planering och rapporter.','Bygg arbetsflöden med Python, API:er och AI där det gör nytta.','Få godkännanden, felhantering och överlämning med från början.']}},
  {id:'ai-assistants',services:['private-ai-agents-rag'],names:{en:'AI Assistants',da:'AI-assistenter',sv:'AI-assistenter'},bullets:{
    en:['Turn company knowledge into an assistant with source-linked answers.','Give each user access to the information they are allowed to see.','Add agreed agent tools, supervised actions and security tests.'],
    da:['Gør virksomhedens viden til en assistent med kildehenvisninger i svarene.','Giv hver bruger adgang til den viden, de må se.','Tilføj aftalte agentværktøjer, kontrollerede handlinger og sikkerhedstest.'],
    sv:['Gör företagets kunskap till en assistent med källhänvisningar i svaren.','Ge varje användare tillgång till informationen de får se.','Lägg till avtalade agentverktyg, granskade åtgärder och säkerhetstester.']}},
  {id:'cybersecurity',services:['pentesting-red-teaming','devsecops','cloud-security'],names:{en:'Cybersecurity',da:'Cybersikkerhed',sv:'Cybersäkerhet'},summary:{
    en:'Test the weak spots. Tighten your cloud. Ship with security built in. Bring us the system, the pipeline or the concern—we’ll shape the right work around it.',
    da:'Find svaghederne. Styrk din cloud. Send kode i drift med sikkerhed fra starten. Tag systemet, pipelinen eller bekymringen med—så former vi den rette opgave.',
    sv:'Hitta svagheterna. Stärk ditt moln. Leverera kod med säkerhet från början. Ta med systemet, pipelinen eller frågan—så formar vi rätt uppdrag.'},bullets:{
    en:['Test web apps, APIs and agreed AI attack paths.','Secure cloud access, identities, permissions and alerts.','Build code, dependency and secret checks into your delivery pipeline.'],
    da:['Test webapps, API’er og aftalte angrebsveje mod AI.','Styrk cloudadgang, identiteter, rettigheder og alarmer.','Byg kontrol af kode, afhængigheder og hemmeligheder ind i din pipeline.'],
    sv:['Testa webbappar, API:er och avtalade angreppsvägar mot AI.','Säkra molnåkomst, identiteter, behörigheter och larm.','Bygg in kontroller av kod, beroenden och hemligheter i din pipeline.']}},
  {id:'ai-governance-training',services:['compliance-ai-governance'],training:true,names:{en:'AI Governance & Training',da:'AI-governance og undervisning',sv:'AI-styrning och utbildning'},bullets:{
    en:['Map AI use, suppliers, data flows, risks and responsibilities.','Turn relevant compliance gaps into an action plan and useful documents.','Book hands-on AI and cybersecurity workshops for your team or group.'],
    da:['Kortlæg AI-brug, leverandører, datastrømme, risici og ansvar.','Gør relevante compliancemangler til en handlingsplan og brugbar dokumentation.','Book praktiske AI- og cybersikkerhedsworkshops til dit team eller din gruppe.'],
    sv:['Kartlägg AI-användning, leverantörer, dataflöden, risker och ansvar.','Gör relevanta efterlevnadsbrister till en åtgärdsplan och användbara dokument.','Boka praktiska AI- och cybersäkerhetsworkshoppar för ditt team eller din grupp.']}}
];

const ui = {
  en:{offers:'What we can build together',services:'Explore the services',details:'What you get',scope:'Your scope. Your proposal.',note:'These are options to shape around your business. Deliverables, timing and price are agreed before we start.',training:['AI literacy and governance for teams and leaders.','Hands-on sessions on automation, prompt injection, privacy and permissions.','Workshops for businesses, schools and groups, shaped around your learning goals.']},
  da:{offers:'Det kan vi bygge sammen',services:'Se ydelserne',details:'Det får du',scope:'Dit omfang. Dit tilbud.',note:'Mulighederne tilpasses din virksomhed. Vi aftaler leverancer, tid og pris, før vi går i gang.',training:['AI-forståelse og governance for teams og ledere.','Praktiske sessioner om automatisering, prompt injection, privatliv og rettigheder.','Workshops for virksomheder, skoler og grupper tilpasset jeres læringsmål.']},
  sv:{offers:'Det kan vi bygga tillsammans',services:'Utforska tjänsterna',details:'Det här får du',scope:'Din omfattning. Din offert.',note:'Alternativen formas efter ditt företag. Vi avtalar leveranser, tid och pris innan vi börjar.',training:['AI-kunnighet och styrning för team och ledare.','Praktiska pass om automatisering, prompt injection, integritet och behörigheter.','Workshoppar för företag, skolor och grupper utifrån era lärandemål.']}
};
const list=items=>`<ul>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const first=c=>services.find(s=>s.id===c.services[0]);
const summary=(c,lang)=>c.summary?.[lang]||serviceSales[c.services[0]][lang].payoff;

export function categoryCards(lang,r,heading='h3') {
  const t=labels[lang],u=ui[lang];
  return `<div class="category-grid">${categories.map((c,i)=>`<article class="service-card category-card"><span class="card-number">0${i+1}</span><div class="service-copy"><${heading}>${esc(c.names[lang])}</${heading}><p class="service-benefit">${esc(first(c).copy[lang].headline)}</p><p>${esc(summary(c,lang))}</p><p class="category-list-label">${esc(u.offers)}</p>${list(c.bullets[lang])}</div><div class="category-actions"><a class="card-link button secondary" href="${r.services}#${c.id}">${esc(u.services)} <span aria-hidden="true">↗</span></a><a class="text-link" href="${r.book}">${esc(t.mobileTalk)} ↗</a></div></article>`).join('')}</div><p class="small category-scope-note">${esc(u.note)}</p>`;
}

export function categoryDetails(lang,r,servicePath) {
  const t=labels[lang],u=ui[lang];
  return categories.map((c,i)=>`<section class="section category-detail" id="${c.id}"><div class="container"><div class="section-heading"><div><p class="eyebrow">0${i+1} / ${esc(c.names[lang])}</p><h2>${esc(first(c).copy[lang].headline)}</h2></div><p>${esc(summary(c,lang))}</p></div><div class="category-offerings">${c.services.map(id=>{const s=services.find(s=>s.id===id).copy[lang];return `<article class="category-offering"><h3><a href="${servicePath(lang,id)}">${esc(s.name)} ↗</a></h3><p>${esc(s.description)}</p><h4>${esc(u.details)}</h4>${list(s.deliverables)}<details><summary>${esc(u.scope)}</summary><p>${esc(s.scope)}</p></details><a class="button secondary" href="${servicePath(lang,id)}">${esc(t.learn)} ↗</a></article>`;}).join('')}${c.training?`<article class="category-offering"><h3><a href="${r.training}">${esc(t.trainingTitle)} ↗</a></h3><p>${esc(t.trainingIntro)}</p><h4>${esc(u.details)}</h4>${list(u.training)}<a class="button secondary" href="${r.training}">${esc(t.requestWorkshop)} ↗</a></article>`:''}</div><div class="category-meeting"><div><h3>${esc(t.final)}</h3><p>${esc(t.micro)}</p></div><a class="button primary" href="${r.book}">${esc(t.call)} ↗</a></div></div></section>`).join('');
}
