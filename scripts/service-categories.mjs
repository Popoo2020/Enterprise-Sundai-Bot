import {htmlEscape as esc} from './seo-render.mjs';
import {services} from './upgrade-content.mjs';
import {labels} from './upgrade-labels.mjs';

// Four buying paths. Existing specialist scopes remain the source of delivery commitments.
export const categories = [
  {
    id:'business-automation',services:['secure-ai-automation'],plannerService:'secure-ai-automation',
    planCta:{en:'Build your workflow',da:'Byg jeres arbejdsgang',sv:'Bygg ert arbetsflöde'},
    names:{en:'Business AI Automation',da:'AI-automatisering til virksomheder',sv:'AI-automation för företag'},
    benefits:{en:'Kill the busywork. Keep the control.',da:'Drop rutinearbejdet. Behold kontrollen.',sv:'Slipp rutinjobbet. Behåll kontrollen.'},
    summary:{
      en:'Give your team more room for customers, decisions and growth. We connect your tools and turn repetitive tasks into workflows that fit the way you work.',
      da:'Giv teamet mere plads til kunder, beslutninger og vækst. Vi forbinder jeres værktøjer og gør gentagne opgaver til arbejdsgange, der passer til jer.',
      sv:'Ge teamet mer utrymme för kunder, beslut och tillväxt. Vi kopplar ihop era verktyg och gör återkommande uppgifter till arbetsflöden som passar er.'},
    offerings:{
      en:[['Operations & admin','Connect orders, stock, scheduling and reporting.'],['CRM & system integrations','Move information between approved tools without repeated manual entry.'],['Controlled AI workflows','Add AI where it helps, with approvals, error handling and handover.']],
      da:[['Drift og administration','Forbind ordrer, lager, planlægning og rapporter.'],['CRM og systemintegrationer','Flyt oplysninger mellem godkendte værktøjer uden gentagen manuel indtastning.'],['AI-workflows med kontrol','Brug AI, hvor det hjælper, med godkendelser, fejlhåndtering og overdragelse.']],
      sv:[['Drift och administration','Koppla ihop beställningar, lager, planering och rapporter.'],['CRM och systemintegrationer','Flytta information mellan godkända verktyg utan upprepad manuell inmatning.'],['AI-arbetsflöden med kontroll','Använd AI där det hjälper, med godkännanden, felhantering och överlämning.']]},
    examples:{en:'An order triggers a stock check and a draft CRM update. Your team handles the exceptions.',da:'En ordre udløser et lagertjek og et udkast til en CRM-opdatering. Teamet håndterer undtagelserne.',sv:'En order utlöser en lagerkontroll och ett utkast till en CRM-uppdatering. Teamet hanterar avvikelserna.'},
    explore:{en:'Explore automation',da:'Se automatisering',sv:'Utforska automation'},
    cta:{en:'Plan my automation',da:'Planlæg min automatisering',sv:'Planera min automation'}
  },
  {
    id:'ai-assistants',services:['private-ai-agents-rag'],plannerService:'private-ai-agents-rag',
    planCta:{en:'Shape your assistant',da:'Form jeres AI-assistent',sv:'Forma er AI-assistent'},
    names:{en:'AI Assistants & RAG',da:'AI-assistenter og RAG',sv:'AI-assistenter & RAG'},
    benefits:{en:'Your business brain. Your rules.',da:'Din virksomheds viden. Dine regler.',sv:'Ditt företags kunskap. Dina regler.'},
    summary:{
      en:'Make your company knowledge easier to use. RAG connects an AI assistant to approved sources, so people can find answers with source links and access controls built in.',
      da:'Gør virksomhedens viden nemmere at bruge. RAG forbinder en AI-assistent med godkendte kilder, så medarbejderne kan finde svar med kildehenvisninger og adgangskontrol fra starten.',
      sv:'Gör företagets kunskap enklare att använda. RAG kopplar en AI-assistent till godkända källor, så att medarbetarna kan hitta svar med källänkar och åtkomstkontroll från början.'},
    offerings:{
      en:[['Company knowledge assistants','Find answers in approved documents, with citations and permission-aware search.'],['Support & onboarding','Help people find instructions and guidance without interrupting the same experts.'],['Scoped AI agents','Add agreed tools and supervised actions, with security and acceptance tests.']],
      da:[['Assistenter til virksomhedens viden','Find svar i godkendte dokumenter med kildehenvisninger og søgning, der respekterer adgangsrettigheder.'],['Support og onboarding','Hjælp medarbejderne med at finde vejledning uden at afbryde de samme eksperter.'],['AI-agenter med afgrænset mandat','Tilføj aftalte værktøjer og kontrollerede handlinger med sikkerheds- og accepttests.']],
      sv:[['Assistenter för företagets kunskap','Hitta svar i godkända dokument med källhänvisningar och sökning som respekterar behörigheter.'],['Support och introduktion','Hjälp medarbetarna att hitta instruktioner utan att avbryta samma experter.'],['AI-agenter med avgränsat mandat','Lägg till avtalade verktyg och granskade åtgärder med säkerhets- och acceptanstester.']]},
    examples:{en:'“How do we handle a refund?” An assistant retrieves the approved policy and links to the source.',da:'“Hvordan håndterer vi en refundering?” Assistenten finder den godkendte politik og linker til kilden.',sv:'“Hur hanterar vi en återbetalning?” Assistenten hämtar den godkända policyn och länkar till källan.'},
    explore:{en:'Explore AI assistants',da:'Se AI-assistenter',sv:'Utforska AI-assistenter'},
    cta:{en:'Plan my AI assistant',da:'Planlæg min AI-assistent',sv:'Planera min AI-assistent'}
  },
  {
    id:'cybersecurity',services:['pentesting-red-teaming','devsecops','cloud-security'],plannerService:'cloud-security',
    planCta:{en:'Map your security priorities',da:'Kortlæg jeres sikkerhedsprioriteter',sv:'Kartlägg era säkerhetsprioriteringar'},
    names:{en:'Cybersecurity & Cloud',da:'Cybersikkerhed og cloud',sv:'Cybersäkerhet & moln'},
    benefits:{en:'Find the weak spots. Build a stronger system.',da:'Find svaghederne. Byg et stærkere system.',sv:'Hitta svagheterna. Bygg ett starkare system.'},
    summary:{
      en:'Bring us the app, the cloud or the release pipeline. We turn security concerns into focused checks, practical fixes and a clear next step for your team.',
      da:'Tag appen, cloudmiljøet eller release-pipelinen med. Vi omsætter sikkerhedsbekymringer til fokuserede tjek, praktiske løsninger og et klart næste skridt for teamet.',
      sv:'Ta med appen, molnmiljön eller leveranspipelinen. Vi gör säkerhetsfrågor till fokuserade kontroller, praktiska åtgärder och ett tydligt nästa steg för teamet.'},
    offerings:{
      en:[['Pentesting & AI security','Test agreed web, API and AI attack paths. Get prioritised findings and fixes.'],['Cloud identities & access','Review permissions, privileged access, configuration and security alerts.'],['DevSecOps & secure delivery','Build code, dependency and secret checks into your release pipeline.']],
      da:[['Pentest og AI-sikkerhed','Test aftalte angrebsveje i webapps, API’er og AI. Få prioriterede fund og forslag til rettelser.'],['Cloudidentiteter og adgang','Gennemgå rettigheder, privilegeret adgang, konfiguration og sikkerhedsalarmer.'],['DevSecOps og sikker levering','Byg kontrol af kode, afhængigheder og hemmeligheder ind i jeres release-pipeline.']],
      sv:[['Pentest och AI-säkerhet','Testa avtalade angreppsvägar i webbappar, API:er och AI. Få prioriterade fynd och åtgärdsförslag.'],['Molnidentiteter och åtkomst','Granska behörigheter, privilegierad åtkomst, konfiguration och säkerhetslarm.'],['DevSecOps och säker leverans','Bygg in kontroller av kod, beroenden och hemligheter i er leveranspipeline.']]},
    examples:{en:'Before a customer portal goes live, test its access controls and give developers a prioritised fix list.',da:'Test adgangskontrollen, før en kundeportal går i drift, og giv udviklerne en prioriteret liste over rettelser.',sv:'Testa åtkomstkontrollerna innan en kundportal lanseras och ge utvecklarna en prioriterad åtgärdslista.'},
    explore:{en:'Explore security services',da:'Se sikkerhedsydelser',sv:'Utforska säkerhetstjänster'},
    cta:{en:'Discuss my security priorities',da:'Tal om mine sikkerhedsprioriteter',sv:'Diskutera mina säkerhetsprioriteringar'}
  },
  {
    id:'ai-governance-training',services:['compliance-ai-governance'],training:true,plannerService:'compliance-ai-governance',
    planCta:{en:'Plan your AI next step',da:'Planlæg jeres næste AI-skridt',sv:'Planera ert nästa AI-steg'},
    names:{en:'AI Governance & Training',da:'AI-governance og undervisning',sv:'AI-styrning & utbildning'},
    benefits:{en:'Clear rules. Confident people.',da:'Klare rammer. Trygge medarbejdere.',sv:'Tydliga ramar. Trygga medarbetare.'},
    summary:{
      en:'Make AI a team capability. Get practical rules, useful documentation and hands-on learning that help people understand what they can do—and when to ask.',
      da:'Gør AI til en kompetence i teamet. Få praktiske rammer, brugbar dokumentation og undervisning, der hjælper folk med at forstå, hvad de kan gøre, og hvornår de skal spørge.',
      sv:'Gör AI till en kompetens i teamet. Få praktiska ramar, användbar dokumentation och utbildning som hjälper människor att förstå vad de kan göra och när de ska fråga.'},
    offerings:{
      en:[['AI governance & risk','Map AI use, suppliers, data flows, responsibilities and risks.'],['Readiness & documentation','Turn gaps against an agreed framework into an action plan and useful drafts.'],['Team & leadership workshops','Practical AI literacy, automation and cybersecurity sessions shaped around your audience.']],
      da:[['AI-governance og risiko','Kortlæg AI-brug, leverandører, datastrømme, ansvar og risici.'],['Parathed og dokumentation','Gør mangler i forhold til en aftalt standard eller ramme til en handlingsplan og brugbare udkast.'],['Workshops for teams og ledere','Praktiske sessioner om AI-forståelse, automatisering og cybersikkerhed tilpasset målgruppen.']],
      sv:[['AI-styrning och risk','Kartlägg AI-användning, leverantörer, dataflöden, ansvar och risker.'],['Beredskap och dokumentation','Gör brister mot ett avtalat ramverk till en åtgärdsplan och användbara utkast.'],['Workshoppar för team och ledare','Praktiska pass om AI-kunnighet, automation och cybersäkerhet anpassade till målgruppen.']]},
    examples:{en:'Map the AI tools your team uses, assign owners and practise how to check an answer before acting on it.',da:'Kortlæg teamets AI-værktøjer, fordel ansvaret, og øv, hvordan et svar kontrolleres, før det bruges.',sv:'Kartlägg teamets AI-verktyg, fördela ansvaret och öva på att kontrollera ett svar innan det används.'},
    explore:{en:'Explore governance & training',da:'Se governance og undervisning',sv:'Utforska styrning & utbildning'},
    cta:{en:'Plan our next step',da:'Planlæg vores næste skridt',sv:'Planera vårt nästa steg'}
  }
];

// Plain-text summaries also serve consumers that do not render the rich offering rows.
for (const category of categories) category.bullets=Object.fromEntries(Object.entries(category.offerings).map(([lang,items])=>[lang,items.map(([title,body])=>`${title}: ${body}`)]));

const ui = {
  en:{offers:'What we can build together',details:'What you get',scope:'Your scope. Your proposal.',note:'Choose a starting point. We agree the deliverables, timing and price for your project before we start.',example:'Illustrative example',navigation:'Choose your service',plannerNote:'Three choices. A starting plan you can see before sharing your details.',training:['AI literacy and governance for teams and leaders.','Hands-on sessions on automation, prompt injection, privacy and permissions.','Workshops for businesses, schools and groups, shaped around your learning goals.']},
  da:{offers:'Det kan vi bygge sammen',details:'Det får du',scope:'Dit omfang. Dit tilbud.',note:'Vælg et udgangspunkt. Vi aftaler leverancer, tid og pris for dit projekt, før vi går i gang.',example:'Illustrativt eksempel',navigation:'Vælg din ydelse',plannerNote:'Tre valg. Se en første plan, før I deler jeres kontaktoplysninger.',training:['AI-forståelse og governance for teams og ledere.','Praktiske sessioner om automatisering, prompt injection, privatliv og rettigheder.','Workshops for virksomheder, skoler og grupper tilpasset jeres læringsmål.']},
  sv:{offers:'Det kan vi bygga tillsammans',details:'Det här får du',scope:'Din omfattning. Din offert.',note:'Välj en startpunkt. Vi avtalar leveranser, tid och pris för ditt projekt innan vi börjar.',example:'Illustrativt exempel',navigation:'Välj din tjänst',plannerNote:'Tre val. Se en första plan innan ni delar era kontaktuppgifter.',training:['AI-kunnighet och styrning för team och ledare.','Praktiska pass om automatisering, prompt injection, integritet och behörigheter.','Workshoppar för företag, skolor och grupper utifrån era lärandemål.']}
};
const list=items=>`<ul>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
export const categoryPlannerPath=(c,r)=>`${r.services}${c.plannerService}/#planner`;
const specialistCta={
  en:{'secure-ai-automation':'Explore automation','private-ai-agents-rag':'Explore AI assistants','pentesting-red-teaming':'Explore security testing',devsecops:'Explore DevSecOps','cloud-security':'Explore cloud security','compliance-ai-governance':'Explore AI governance'},
  da:{'secure-ai-automation':'Se automatisering','private-ai-agents-rag':'Se AI-assistenter','pentesting-red-teaming':'Se sikkerhedstest',devsecops:'Se DevSecOps','cloud-security':'Se cloudsikkerhed','compliance-ai-governance':'Se AI-governance'},
  sv:{'secure-ai-automation':'Utforska automation','private-ai-agents-rag':'Utforska AI-assistenter','pentesting-red-teaming':'Utforska säkerhetstester',devsecops:'Utforska DevSecOps','cloud-security':'Utforska molnsäkerhet','compliance-ai-governance':'Utforska AI-styrning'}
};

export function categoryCards(lang,r,heading='h3') {
  const u=ui[lang];
  return `<div class="category-grid">${categories.map((c,i)=>`<article class="service-card category-card" data-category="${c.id}" id="service-${c.id}"><div class="category-card-heading"><span class="card-number" aria-hidden="true">0${i+1}</span><div><${heading}>${esc(c.names[lang])}</${heading}><p class="service-benefit">${esc(c.benefits[lang])}</p></div></div><div class="service-copy"><p class="category-summary">${esc(c.summary[lang])}</p><p class="category-list-label">${esc(u.offers)}</p><ul class="category-offer-list">${c.offerings[lang].map(([title,body])=>`<li><strong>${esc(title)}</strong><span>${esc(body)}</span></li>`).join('')}</ul><div class="category-example"><span class="category-example-label">${esc(u.example)}</span><p>${esc(c.examples[lang])}</p></div></div><div class="category-actions"><a class="card-link button secondary" href="${categoryPlannerPath(c,r)}">${esc(c.planCta[lang])} <span aria-hidden="true">↗</span></a><a class="text-link" href="${r.services}#${c.id}">${esc(c.explore[lang])} <span aria-hidden="true">↗</span></a></div></article>`).join('')}</div><p class="small category-scope-note">${esc(u.note)}</p>`;
}

export function categoryNavigator(lang,r) {
  return `<nav class="category-nav" aria-label="${esc(ui[lang].navigation)}">${categories.map((c,i)=>`<a class="category-nav-link" href="#${c.id}"><span class="category-nav-number" aria-hidden="true">0${i+1}</span><span class="category-nav-copy"><strong>${esc(c.names[lang])}</strong><span>${esc(c.benefits[lang])}</span></span><span aria-hidden="true">↗</span></a>`).join('')}</nav>`;
}

export function categoryDetails(lang,r,servicePath) {
  const t=labels[lang],u=ui[lang];
  return categories.map((c,i)=>`<section class="section category-detail" id="${c.id}" data-category="${c.id}"><div class="container"><div class="section-heading"><div><p class="eyebrow">0${i+1} / ${esc(c.names[lang])}</p><h2>${esc(c.benefits[lang])}</h2></div><p>${esc(c.summary[lang])}</p></div><div class="category-offerings">${c.services.map(id=>{const s=services.find(s=>s.id===id).copy[lang];return `<article class="category-offering"><h3><a href="${servicePath(lang,id)}">${esc(s.name)} ↗</a></h3><p>${esc(s.description)}</p><details class="offering-details"><summary>${esc(u.details)}</summary>${list(s.deliverables)}<h4>${esc(u.scope)}</h4><p>${esc(s.scope)}</p></details><a class="button secondary" href="${servicePath(lang,id)}">${esc(specialistCta[lang][id])} ↗</a></article>`;}).join('')}${c.training?`<article class="category-offering"><h3><a href="${r.training}">${esc(t.trainingTitle)} ↗</a></h3><p>${esc(t.trainingIntro)}</p><details class="offering-details"><summary>${esc(u.details)}</summary>${list(u.training)}</details><a class="button secondary" href="${r.training}">${esc(t.requestWorkshop)} ↗</a></article>`:''}</div><div class="category-meeting"><div><h3>${esc(c.cta[lang])}</h3><p>${esc(u.plannerNote)}</p></div><a class="button primary" href="${categoryPlannerPath(c,r)}">${esc(c.planCta[lang])} ↗</a></div></div></section>`).join('');
}
