(() => {
  const lang = document.documentElement.lang || 'en';
  const t = {
    en: {
      offerKicker:'Start small', offerTitle:'AI Risk & Readiness Snapshot', offerText:'A focused 10-business-day engagement for organisations that need a clear view of current AI use, priority risks and the next 90 days.', offerItems:['AI use and shadow-AI overview','Governance and security gap analysis','Executive readout','Prioritised 90-day action plan'], offerCta:'Discuss the Snapshot', offerNote:'Defined scope · Founder-involved delivery · Practical outputs',
      insightsKicker:'Insights', insightsTitle:'Useful thinking for responsible AI decisions', insightsText:'Practical articles for leaders responsible for adoption, security, governance and organisational risk.', read:'Read article', all:'View all insights',
      articles:[['EU AI Act readiness: what to organise before enforcement','A practical starting point for inventories, accountability, literacy and documentation.','7 min read','/insights/eu-ai-act-readiness.html','/assets/visual-governance.svg'],['Why AI pilots fail after the demo','Five operating gaps that stop promising AI experiments becoming reliable workflows.','6 min read','/insights/why-ai-pilots-fail.html','/assets/visual-adoption.svg'],['A practical security baseline for AI assistants','The minimum controls for data, identity, prompt injection, suppliers and human oversight.','8 min read','/insights/ai-assistant-security-baseline.html','/assets/visual-security.svg']]
    },
    da: {
      offerKicker:'Start i det små', offerTitle:'AI Risk & Readiness Snapshot', offerText:'Et fokuseret 10-arbejdsdages forløb til organisationer, der har brug for overblik over AI-brug, prioriterede risici og de næste 90 dage.', offerItems:['Overblik over AI-brug og shadow AI','Analyse af governance- og sikkerhedsgab','Ledelsespræsentation','Prioriteret 90-dages handlingsplan'], offerCta:'Drøft et Snapshot', offerNote:'Tydeligt scope · Grundlæggerinvolvering · Praktiske leverancer',
      insightsKicker:'Indsigter', insightsTitle:'Praktisk viden til ansvarlige AI-beslutninger', insightsText:'Artikler til ledere med ansvar for implementering, sikkerhed, governance og organisatorisk risiko.', read:'Læs artikel', all:'Se alle indsigter',
      articles:[['EU AI Act-parathed: hvad bør være på plads?','Et praktisk udgangspunkt for kortlægning, ansvar, AI-literacy og dokumentation.','7 min.','/insights/eu-ai-act-readiness.html','/assets/visual-governance.svg'],['Hvorfor AI-piloter fejler efter demoen','Fem driftsmæssige mangler, der stopper lovende eksperimenter fra at blive stabile workflows.','6 min.','/insights/why-ai-pilots-fail.html','/assets/visual-adoption.svg'],['En praktisk sikkerhedsbaseline for AI-assistenter','Minimumskontroller for data, identitet, prompt injection, leverandører og menneskeligt tilsyn.','8 min.','/insights/ai-assistant-security-baseline.html','/assets/visual-security.svg']]
    },
    sv: {
      offerKicker:'Börja i liten skala', offerTitle:'AI Risk & Readiness Snapshot', offerText:'Ett fokuserat uppdrag på tio arbetsdagar för organisationer som behöver överblick över AI-användning, prioriterade risker och de kommande 90 dagarna.', offerItems:['Överblick över AI-användning och shadow AI','Analys av styrnings- och säkerhetsgap','Ledningspresentation','Prioriterad 90-dagars handlingsplan'], offerCta:'Diskutera ett Snapshot', offerNote:'Tydlig omfattning · Grundarledd leverans · Praktiska resultat',
      insightsKicker:'Insikter', insightsTitle:'Praktisk kunskap för ansvarsfulla AI-beslut', insightsText:'Artiklar för ledare med ansvar för implementering, säkerhet, styrning och organisatorisk risk.', read:'Läs artikeln', all:'Se alla insikter',
      articles:[['EU AI Act-beredskap: vad behöver organiseras?','En praktisk startpunkt för inventering, ansvar, AI-kunnighet och dokumentation.','7 min','/insights/eu-ai-act-readiness.html','/assets/visual-governance.svg'],['Varför AI-piloter misslyckas efter demon','Fem operativa luckor som hindrar lovande experiment från att bli stabila arbetsflöden.','6 min','/insights/why-ai-pilots-fail.html','/assets/visual-adoption.svg'],['En praktisk säkerhetsbaslinje för AI-assistenter','Minimikontroller för data, identitet, prompt injection, leverantörer och mänsklig tillsyn.','8 min','/insights/ai-assistant-security-baseline.html','/assets/visual-security.svg']]
    }
  }[lang];
  if (!t) return;
  const css = document.createElement('link'); css.rel='stylesheet'; css.href='/assets/growth.css?v=20260723a'; document.head.appendChild(css);
  const approach = document.querySelector('#approach');
  if (approach && !document.querySelector('.entry-offer')) {
    const section=document.createElement('section'); section.className='section entry-offer';
    section.innerHTML=`<div class="container entry-offer-grid"><div class="entry-offer-image"><img src="/assets/visual-workshop.svg" alt=""></div><div class="entry-offer-copy"><p class="eyebrow">${t.offerKicker}</p><h2>${t.offerTitle}</h2><p class="large-copy">${t.offerText}</p><ul>${t.offerItems.map(i=>`<li>${i}</li>`).join('')}</ul><a class="button primary" href="#contact">${t.offerCta} →</a><span class="offer-note">${t.offerNote}</span></div></div>`;
    approach.insertAdjacentElement('beforebegin',section);
  }
  const projects=document.querySelector('#projects');
  if (projects && !document.querySelector('#insights')) {
    const section=document.createElement('section'); section.id='insights'; section.className='section insights';
    section.innerHTML=`<div class="container"><div class="section-heading"><p class="eyebrow">${t.insightsKicker}</p><h2>${t.insightsTitle}</h2><p>${t.insightsText}</p></div><div class="insights-grid">${t.articles.map(a=>`<article class="insight-card"><a class="insight-image" href="${a[3]}"><img src="${a[4]}" alt=""></a><div class="insight-copy"><span>${a[2]}</span><h3><a href="${a[3]}">${a[0]}</a></h3><p>${a[1]}</p><a class="insight-link" href="${a[3]}">${t.read} →</a></div></article>`).join('')}</div><a class="button secondary insights-all" href="/insights/">${t.all} →</a></div>`;
    projects.insertAdjacentElement('afterend',section);
  }
})();