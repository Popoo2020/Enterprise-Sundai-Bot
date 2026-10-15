import {htmlEscape as esc} from './seo-render.mjs';

// Team and qualification statements supplied by the site owner, 15 October 2026.
export const experienceCopy = {
  en:{
    guideNav:'Free guides',guideEyebrow:'FREE / PRACTICAL KNOW-HOW',
    guideTitle:'Kick-ass know-how. Yours for free.',
    guideIntro:'Spot the AI and security risks worth fixing before you commit your data, budget or team.',
    guideCta:'Choose your free guide',guideNote:'Practical PDFs. No payment required.',
    libraryTitle:'A smarter first step. A safer next move.',
    libraryIntro:'Choose the decision in front of you. Get practical checks for AI governance, agent security or supplier access, and turn uncertainty into a useful next step.',
    libraryHow:'Choose a guide, preview what it covers, then leave your email to receive the PDF. Any follow-up email series is optional.',
    libraryAudience:'Made for',libraryOutcome:'What you can do next',pages:'4 pages',
    libraryCards:[
      {audience:'AI owners, compliance leads and management teams',outcome:'Map your AI use cases, identify the evidence to gather and give each next action an owner.'},
      {audience:'Product teams building or connecting AI agents',outcome:'Check tool permissions, knowledge access and approval boundaries before an agent can take action.'},
      {audience:'Teams connecting vendors to business or customer data',outcome:'Ask sharper supplier questions and plan access, tenant-isolation and revocation checks.'}
    ],
    whyEyebrow:'WHY CHOOSE SUNDAI',whyTitle:'Built with expertise. Delivered with discipline.',
    whyIntro:'For teams investing in a product, a safer operation or a better way to work.',whyCta:'Tell us what you’re building',
    reasons:[
      ['Expertise that connects the dots.','Cybersecurity, AI and economics expertise connects technical decisions to how your business actually works.'],
      ['Your scope. Your deadline. Your budget.','We agree milestones, acceptance criteria and costs up front, then track delivery against them. Scope changes need your approval.'],
      ['Quality you can examine.','Documented reviews and quality checks follow the regulations and security frameworks relevant to your project.'],
      ['Senior judgement, built in.','Half of our expert team are senior specialists. We match contributors and oversight to the demands of your project.'],
      ['Value beyond the day rate.','You invest in the quality of the work and your project’s potential. We prioritise sound decisions and useful outcomes.'],
      ['Capability, demonstrated.','Our specialists have practical lab training, relevant certifications and academic qualifications. Every deliverable faces the same quality bar, regardless of seniority.']
    ]
  },
  da:{
    guideNav:'Gratis guider',guideEyebrow:'GRATIS / PRAKTISK VIDEN',
    guideTitle:'Skarp viden. Helt gratis.',
    guideIntro:'Find de AI- og sikkerhedsrisici, der er værd at løse, før du sætter data, budget eller team på spil.',
    guideCta:'Vælg din gratis guide',guideNote:'Praktiske PDF-guider. Ingen betaling.',
    libraryTitle:'Et klogere første skridt. Et sikrere næste træk.',
    libraryIntro:'Tag udgangspunkt i den beslutning, du står med. Få praktiske tjek af AI-governance, agentsikkerhed eller leverandøradgang, og omsæt usikkerhed til et konkret næste skridt.',
    libraryHow:'Vælg en guide, se hvad den indeholder, og oplys derefter din mail for at få PDF-filen. En opfølgende mailserie er valgfri.',
    libraryAudience:'Til',libraryOutcome:'Dit næste skridt',pages:'4 sider',
    libraryCards:[
      {audience:'AI-ansvarlige, complianceansvarlige og ledelser',outcome:'Kortlæg AI-anvendelser, find den dokumentation, der skal indsamles, og giv hver næste handling en ejer.'},
      {audience:'Produktteams, der bygger eller forbinder AI-agenter',outcome:'Tjek værktøjsrettigheder, adgang til viden og godkendelser, før en agent kan handle.'},
      {audience:'Teams, der giver leverandører adgang til virksomheds- eller kundedata',outcome:'Stil skarpere leverandørspørgsmål, og planlæg tjek af adgang, kundeadskillelse og tilbagekaldelse.'}
    ],
    whyEyebrow:'HVORFOR VÆLGE SUNDAI',whyTitle:'Bygget med ekspertise. Leveret med disciplin.',
    whyIntro:'Til teams, der investerer i et produkt, en sikrere drift eller en bedre måde at arbejde på.',whyCta:'Fortæl os, hvad I bygger',
    reasons:[
      ['Ekspertise, der forbinder det hele.','Viden om cybersikkerhed, AI og økonomi kobler tekniske beslutninger til den måde, din virksomhed fungerer på.'],
      ['Dit omfang. Din deadline. Dit budget.','Vi aftaler milepæle, acceptkriterier og omkostninger på forhånd og følger leverancen op imod dem. Ændringer kræver din godkendelse.'],
      ['Kvalitet, du kan efterprøve.','Dokumenterede gennemgange og kvalitetstjek følger de regler og sikkerhedsrammer, der er relevante for dit projekt.'],
      ['Seniorerfaring fra start.','Halvdelen af vores ekspertteam er seniorspecialister. Vi tilpasser bidragydere og faglig gennemgang til projektets krav.'],
      ['Værdi ud over timeprisen.','Du investerer i arbejdets kvalitet og projektets potentiale. Vi prioriterer velbegrundede beslutninger og brugbare resultater.'],
      ['Kompetencer, der er afprøvet.','Vores specialister har praktisk laboratorietræning, relevante certificeringer og akademiske kvalifikationer. Alle leverancer møder samme kvalitetskrav uanset anciennitet.']
    ]
  },
  sv:{
    guideNav:'Gratis guider',guideEyebrow:'GRATIS / PRAKTISK KUNSKAP',
    guideTitle:'Vass kunskap. Helt gratis.',
    guideIntro:'Hitta AI- och säkerhetsriskerna som är värda att åtgärda innan du sätter data, budget eller team på spel.',
    guideCta:'Välj din gratis guide',guideNote:'Praktiska PDF-guider. Ingen betalning.',
    libraryTitle:'Ett smartare första steg. Ett säkrare nästa drag.',
    libraryIntro:'Utgå från beslutet framför dig. Få praktiska kontroller för AI-styrning, agentsäkerhet eller leverantörsåtkomst och gör osäkerhet till ett konkret nästa steg.',
    libraryHow:'Välj en guide, se vad den innehåller och ange sedan din mejladress för att få PDF-filen. En uppföljande mejlserie är valfri.',
    libraryAudience:'För',libraryOutcome:'Ditt nästa steg',pages:'4 sidor',
    libraryCards:[
      {audience:'AI-ansvariga, complianceansvariga och ledningsgrupper',outcome:'Kartlägg AI-användningar, identifiera underlag att samla in och ge varje nästa åtgärd en ägare.'},
      {audience:'Produktteam som bygger eller ansluter AI-agenter',outcome:'Kontrollera verktygsbehörigheter, kunskapsåtkomst och godkännanden innan en agent kan agera.'},
      {audience:'Team som ger leverantörer tillgång till verksamhets- eller kunddata',outcome:'Ställ skarpare leverantörsfrågor och planera kontroller av åtkomst, kundseparering och återkallelse.'}
    ],
    whyEyebrow:'VARFÖR VÄLJA SUNDAI',whyTitle:'Byggt med expertis. Levererat med disciplin.',
    whyIntro:'För team som investerar i en produkt, en säkrare verksamhet eller ett bättre sätt att arbeta.',whyCta:'Berätta vad ni bygger',
    reasons:[
      ['Expertis som knyter ihop helheten.','Kunskap om cybersäkerhet, AI och ekonomi kopplar tekniska beslut till hur din verksamhet faktiskt fungerar.'],
      ['Din omfattning. Din deadline. Din budget.','Vi avtalar milstolpar, acceptanskriterier och kostnader i förväg och följer leveransen mot dem. Ändringar kräver ditt godkännande.'],
      ['Kvalitet du kan granska.','Dokumenterade granskningar och kvalitetskontroller följer de regler och säkerhetsramverk som är relevanta för ditt projekt.'],
      ['Senior erfarenhet från början.','Hälften av vårt expertteam är seniora specialister. Vi anpassar medverkande och granskning efter projektets krav.'],
      ['Värde utöver timpriset.','Du investerar i arbetets kvalitet och projektets potential. Vi prioriterar välgrundade beslut och användbara resultat.'],
      ['Kompetens som har prövats.','Våra specialister har praktisk labbträning, relevanta certifieringar och akademiska kvalifikationer. Varje leverans möter samma kvalitetskrav oavsett erfarenhetsnivå.']
    ]
  }
};

export const guideHubPath = lang => (lang==='en'?'':`/${lang}`)+'/free-guides/';

export function guideInvitation(lang) {
  const t=experienceCopy[lang];
  return `<section class="section guide-promo" id="free-knowledge"><div class="container guide-promo-layout"><div class="guide-promo-copy"><p class="eyebrow">${esc(t.guideEyebrow)}</p><h2>${esc(t.guideTitle)}</h2><p>${esc(t.guideIntro)}</p></div><div class="guide-promo-action"><a class="button primary" href="${guideHubPath(lang)}">${esc(t.guideCta)}</a><p class="small">${esc(t.guideNote)}</p></div></div></section>`;
}

export function whySundAI(lang,contactPath) {
  const t=experienceCopy[lang];
  return `<section class="section why-sundai" id="why-sundai" aria-labelledby="why-sundai-heading"><div class="container why-layout"><div class="why-intro"><p class="eyebrow">${esc(t.whyEyebrow)}</p><h2 id="why-sundai-heading">${esc(t.whyTitle)}</h2><p>${esc(t.whyIntro)}</p><a class="text-link" href="${contactPath}">${esc(t.whyCta)}</a></div><ol class="why-reasons">${t.reasons.map(([title,body],i)=>`<li class="why-reason"><span class="why-number" aria-hidden="true">0${i+1}</span><div><h3>${esc(title)}</h3><p>${esc(body)}</p></div></li>`).join('')}</ol></div></section>`;
}

export function guideLibrary(lang,ids,titles) {
  const t=experienceCopy[lang];
  return `<div class="guide-library-grid">${ids.map((id,i)=>`<article class="guide-library-card"><p class="eyebrow">0${i+1} / PDF · ${esc(t.pages)}</p><h2>${esc(titles[i])}</h2><dl><div><dt>${esc(t.libraryAudience)}</dt><dd>${esc(t.libraryCards[i].audience)}</dd></div><div><dt>${esc(t.libraryOutcome)}</dt><dd>${esc(t.libraryCards[i].outcome)}</dd></div></dl><a class="button secondary" href="${guideHubPath(lang)+id}/">${esc(t.guideCta)}</a></article>`).join('')}</div><p class="guide-library-how">${esc(t.libraryHow)}</p>`;
}
