const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

export const frameworkCopy={
 en:{
  eyebrow:'FRAMEWORKS / PRACTICAL SUPPORT',title:'Clear controls. Useful evidence.',
  note:'Service focus, not certification badges or an independent audit of SundAI.',
  scope:'Explore our approach',details:'From a framework to your next step.',
  intro:'Choose one relevant framework. We agree the scope, identify gaps and turn the findings into an action plan your team can use.',
  cta:'Explore governance services',
  items:[
   ['soc2','SOC 2 Type II','Readiness support','Organise control evidence, clarify ownership and identify readiness gaps before a separately commissioned SOC 2 examination.'],
   ['iso27001','ISO/IEC 27001','Security readiness','Map information-security risks, existing controls and evidence gaps. Prioritise the work needed for your agreed ISMS scope.'],
   ['iso42001','ISO/IEC 42001','AI governance','Map AI uses, responsibilities and lifecycle controls. Build a practical starting point for your AI management system.'],
   ['gdpr','GDPR','Privacy support','Review data flows, supplier access and retention questions. Identify where a separately scoped privacy or legal assessment is needed.']
  ]
 },
 da:{
  eyebrow:'STANDARDER / PRAKTISK HJÆLP',title:'Klare kontroller. Brugbar dokumentation.',
  note:'Serviceområder, ikke certificeringer eller en uafhængig revision af SundAI.',
  scope:'Se vores tilgang',details:'Fra standard til næste skridt.',
  intro:'Vælg én relevant standard eller ét regelsæt. Vi aftaler omfanget, finder manglerne og omsætter resultaterne til en handlingsplan, som teamet kan bruge.',
  cta:'Se vores governance-ydelser',
  items:[
   ['soc2','SOC 2 Type II','Hjælp til parathed','Saml kontroldokumentation, afklar ansvar og find mangler før en særskilt aftalt SOC 2-undersøgelse.'],
   ['iso27001','ISO/IEC 27001','Sikkerhedsberedskab','Kortlæg informationssikkerhedsrisici, eksisterende kontroller og manglende dokumentation. Prioritér arbejdet inden for det aftalte ISMS-omfang.'],
   ['iso42001','ISO/IEC 42001','AI-governance','Kortlæg AI-anvendelser, ansvar og kontroller gennem livscyklussen. Skab et praktisk udgangspunkt for jeres AI-ledelsessystem.'],
   ['gdpr','GDPR','Databeskyttelse','Gennemgå datastrømme, leverandøradgang og opbevaring. Find de spørgsmål, der kræver en særskilt databeskyttelsesvurdering eller juridisk vurdering.']
  ]
 },
 sv:{
  eyebrow:'STANDARDER / PRAKTISKT STÖD',title:'Tydliga kontroller. Användbara underlag.',
  note:'Tjänsteområden, inte certifieringar eller en oberoende revision av SundAI.',
  scope:'Se hur vi arbetar',details:'Från standard till nästa steg.',
  intro:'Välj en relevant standard eller ett regelverk. Vi avtalar omfattningen, identifierar brister och omsätter resultaten i en åtgärdsplan som teamet kan använda.',
  cta:'Utforska våra styrningstjänster',
  items:[
   ['soc2','SOC 2 Type II','Beredskapsstöd','Samla kontrollunderlag, tydliggör ansvar och identifiera brister inför en separat beställd SOC 2-granskning.'],
   ['iso27001','ISO/IEC 27001','Säkerhetsberedskap','Kartlägg informationssäkerhetsrisker, befintliga kontroller och saknade underlag. Prioritera arbetet inom den avtalade ISMS-omfattningen.'],
   ['iso42001','ISO/IEC 42001','AI-styrning','Kartlägg AI-användning, ansvar och kontroller under livscykeln. Skapa en praktisk grund för ert ledningssystem för AI.'],
   ['gdpr','GDPR','Dataskyddsstöd','Granska dataflöden, leverantörsåtkomst och lagring. Identifiera frågor som behöver en separat dataskyddsbedömning eller juridisk bedömning.']
  ]
 }
};

export function frameworkBadges(lang,trustPath){
 const t=frameworkCopy[lang];
 return `<section class="framework-strip" aria-labelledby="framework-heading"><div class="framework-intro"><div><p class="eyebrow">${esc(t.eyebrow)}</p><h2 id="framework-heading">${esc(t.title)}</h2></div><a class="framework-scope" href="${trustPath}#frameworks">${esc(t.scope)}</a></div><ul class="framework-badges">${t.items.map(([id,name,scope])=>`<li><a class="framework-badge" href="${trustPath}#framework-${id}"><img src="/assets/framework-${id}.svg" alt="" width="160" height="160" loading="lazy" decoding="async"><span class="framework-name">${esc(name)}</span><span class="framework-role">${esc(scope)}</span></a></li>`).join('')}</ul><p class="framework-note">${esc(t.note)}</p></section>`;
}

export function frameworkDetails(lang,servicePath){
 const t=frameworkCopy[lang];
 return `<section class="section framework-details" id="frameworks"><div class="container"><p class="eyebrow">${esc(t.eyebrow)}</p><h2>${esc(t.details)}</h2><p class="framework-lead">${esc(t.intro)}</p><div class="framework-detail-grid">${t.items.map(([id,name,scope,body])=>`<article id="framework-${id}"><p class="framework-detail-label">${esc(scope)}</p><h3>${esc(name)}</h3><p>${esc(body)}</p></article>`).join('')}</div><p class="framework-note">${esc(t.note)}</p><a class="button secondary" href="${servicePath}">${esc(t.cta)}</a></div></section>`;
}
