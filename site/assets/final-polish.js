(() => {
  const lang = document.documentElement.lang || 'en';
  const copy = {
    en: {
      consult:'Book a free consultation', services:'See our services', training:'AI Training & Talks', trainingText:'Role-based workshops and keynotes that build practical AI literacy, responsible use and security awareness.', exploreTraining:'Explore training →',
      who:'Who we help', whoTitle:'Practical AI support for organisations that need clarity, control and measurable value.', industries:'Industries', useCases:'Use cases',
      audiences:[['Small & mid-sized organisations','Move from scattered AI experiments to a controlled operating model.'],['Public & social services','Introduce AI with accessibility, accountability and meaningful human oversight.'],['Education & learning','Build AI literacy and safe use across leaders, educators and learners.'],['Knowledge-intensive teams','Secure assistants, workflows and decisions involving sensitive information.']],
      proof:[['European delivery','Remote and on-site support across Europe'],['Human-centred','Fairness, accessibility and oversight'],['Standards-informed','EU AI Act, ISO/IEC 42001 and ISO/IEC 27001'],['Practical outcomes','Roadmaps, controls, workshops and working processes']],
      founder:'Founder & Lead Advisor', founderTitle:'Eric Rimón', founderRole:'AI Security & Governance Specialist', founderText:'A multidisciplinary approach combining cybersecurity, AI governance, organisational risk, business and human-centred services.', founderLink:'Meet the founder →',
      insightMeta:['5 min read','Updated Jul 2026'], resourcesMeta:['Practical toolkit','Updated Jul 2026']
    },
    da: {
      consult:'Book en gratis indledende samtale', services:'Se vores ydelser', training:'AI-kurser & foredrag', trainingText:'Rollebaserede workshops og foredrag, der opbygger praktisk AI-literacy, ansvarlig brug og sikkerhedsbevidsthed.', exploreTraining:'Se kurser →',
      who:'Hvem vi hjælper', whoTitle:'Praktisk AI-støtte til organisationer, der har brug for klarhed, kontrol og målbar værdi.', industries:'Brancher', useCases:'Anvendelser',
      audiences:[['Små og mellemstore organisationer','Gå fra spredte AI-eksperimenter til en kontrolleret driftsmodel.'],['Offentlige og sociale tjenester','Indfør AI med tilgængelighed, ansvar og meningsfuldt menneskeligt tilsyn.'],['Uddannelse og læring','Opbyg AI-literacy og sikker brug blandt ledere, undervisere og elever.'],['Videnstunge teams','Sikr assistenter, workflows og beslutninger med følsomme oplysninger.']],
      proof:[['Europæisk levering','Online og fysisk støtte i Europa'],['Menneskecentreret','Fairness, tilgængelighed og tilsyn'],['Standardinformeret','EU AI Act, ISO/IEC 42001 og ISO/IEC 27001'],['Praktiske resultater','Roadmaps, kontroller, workshops og arbejdsprocesser']],
      founder:'Grundlægger & Lead Advisor', founderTitle:'Eric Rimón', founderRole:'Specialist i AI-sikkerhed og governance', founderText:'En tværfaglig tilgang, der kombinerer cybersikkerhed, AI-governance, organisatorisk risiko, forretning og menneskecentrerede tjenester.', founderLink:'Mød grundlæggeren →',
      insightMeta:['5 min. læsning','Opdateret jul. 2026'], resourcesMeta:['Praktisk værktøj','Opdateret jul. 2026']
    },
    sv: {
      consult:'Boka ett kostnadsfritt första samtal', services:'Se våra tjänster', training:'AI-utbildning & föreläsningar', trainingText:'Rollbaserade workshops och föreläsningar som bygger praktisk AI-kunnighet, ansvarsfull användning och säkerhetsmedvetenhet.', exploreTraining:'Se utbildning →',
      who:'Vilka vi hjälper', whoTitle:'Praktiskt AI-stöd för organisationer som behöver tydlighet, kontroll och mätbart värde.', industries:'Branscher', useCases:'Användningsfall',
      audiences:[['Små och medelstora organisationer','Gå från spridda AI-experiment till en kontrollerad verksamhetsmodell.'],['Offentliga och sociala tjänster','Inför AI med tillgänglighet, ansvar och meningsfull mänsklig tillsyn.'],['Utbildning och lärande','Bygg AI-kunnighet och säker användning för ledare, lärare och elever.'],['Kunskapsintensiva team','Säkra assistenter, arbetsflöden och beslut med känslig information.']],
      proof:[['Europeisk leverans','Digitalt och på plats i Europa'],['Människocentrerat','Rättvisa, tillgänglighet och tillsyn'],['Standardinformerat','EU AI Act, ISO/IEC 42001 och ISO/IEC 27001'],['Praktiska resultat','Färdplaner, kontroller, workshops och arbetsprocesser']],
      founder:'Grundare & Lead Advisor', founderTitle:'Eric Rimón', founderRole:'Specialist inom AI-säkerhet och styrning', founderText:'Ett tvärvetenskapligt arbetssätt som kombinerar cybersäkerhet, AI-styrning, organisatorisk risk, affärer och människocentrerade tjänster.', founderLink:'Möt grundaren →',
      insightMeta:['5 min läsning','Uppdaterad jul. 2026'], resourcesMeta:['Praktiskt verktyg','Uppdaterad jul. 2026']
    }
  }[lang];
  if (!copy) return;

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/assets/final-polish.css?v=20260724f';
  document.head.appendChild(css);

  const paths = lang === 'en' ? {training:'/training/', about:'/about/', industries:'/industries/', useCases:'/use-cases/'} : lang === 'da' ? {training:'/da/kurser-foredrag/', about:'/da/om/', industries:'/da/brancher/', useCases:'/da/anvendelser/'} : {training:'/sv/utbildning-forelasningar/', about:'/sv/om/', industries:'/sv/branscher/', useCases:'/sv/anvandningsfall/'};

  const heroButtons = document.querySelectorAll('.hero-actions .button');
  if (heroButtons[0]) heroButtons[0].childNodes[0].nodeValue = `${copy.consult} `;
  if (heroButtons[1]) heroButtons[1].textContent = copy.services;

  const serviceGrid = document.querySelector('.service-grid');
  if (serviceGrid && !serviceGrid.querySelector('.training-service')) {
    const automation = [...serviceGrid.children].find(card => /automation|automatisering/i.test(card.textContent));
    const card = document.createElement('article');
    card.className = 'service-card training-service';
    card.innerHTML = `<a href="${paths.training}"><div class="service-icon"><svg viewBox="0 0 32 32" fill="none"><path d="M7 5h18v22H7z"/><path d="M11 10h10M11 15h10M11 20h7"/></svg></div><h3>${copy.training}</h3><p>${copy.trainingText}</p><span class="card-link">${copy.exploreTraining}</span></a>`;
    serviceGrid.insertBefore(card, automation || null);
    const heading = serviceGrid.closest('.services')?.querySelector('.section-title h2');
    if (heading) heading.textContent = lang === 'en' ? 'Four ways to move AI forward safely' : lang === 'da' ? 'Fire måder at flytte AI sikkert fremad' : 'Fyra sätt att föra AI framåt på ett säkert sätt';
  }

  const trainingSection = document.querySelector('.training-teaser');
  if (trainingSection && !document.querySelector('.audience')) {
    const cards = copy.audiences.map(([title,text]) => `<a class="audience-card" href="${paths.useCases}"><strong>${title}</strong><span>${text}</span><b>${copy.useCases} →</b></a>`).join('');
    const section = document.createElement('section');
    section.className = 'audience';
    section.innerHTML = `<div class="container"><div class="audience-panel"><div class="audience-head"><div><p class="eyebrow">${copy.who}</p><h2>${copy.whoTitle}</h2></div><div class="audience-links"><a class="button secondary" href="${paths.industries}">${copy.industries}</a><a class="button secondary" href="${paths.useCases}">${copy.useCases}</a></div></div><div class="audience-grid">${cards}</div></div></div>`;
    trainingSection.insertAdjacentElement('afterend', section);
  }

  if (!document.querySelector('.proof-strip')) {
    const proof = document.createElement('section');
    proof.className = 'proof-strip';
    proof.innerHTML = `<div class="container">${copy.proof.map(([title,text]) => `<div class="proof-item"><strong>${title}</strong><span>${text}</span></div>`).join('')}</div>`;
    document.querySelector('.audience')?.insertAdjacentElement('afterend', proof);
  }

  document.querySelectorAll('.insight-card').forEach((card, index) => {
    const content = card.querySelector('div:last-child');
    if (!content || content.querySelector('.insight-meta')) return;
    const meta = document.createElement('div');
    meta.className = 'insight-meta';
    const values = index === 2 ? copy.resourcesMeta : copy.insightMeta;
    meta.innerHTML = `<span>${values[0]}</span><span>•</span><span>${values[1]}</span>`;
    content.insertBefore(meta, content.querySelector('h3'));
  });

  const cta = document.querySelector('.cta');
  if (cta && !document.querySelector('.founder-strip')) {
    const founder = document.createElement('section');
    founder.className = 'founder-strip';
    founder.innerHTML = `<div class="container"><div class="founder-card"><div class="founder-avatar" aria-hidden="true">ER</div><div class="founder-copy"><p class="eyebrow">${copy.founder}</p><h2>${copy.founderTitle}</h2><h3>${copy.founderRole}</h3><p>${copy.founderText}</p></div><a class="button secondary" href="${paths.about}">${copy.founderLink}</a></div></div>`;
    cta.insertAdjacentElement('beforebegin', founder);
  }

  const nav = document.querySelector('[data-nav]');
  if (nav && !nav.querySelector(`a[href="${paths.industries}"]`)) {
    const about = [...nav.querySelectorAll('a')].find(a => /about|\/om\//.test(a.getAttribute('href') || ''));
    const link = document.createElement('a');
    link.href = paths.industries;
    link.textContent = copy.industries;
    nav.insertBefore(link, about || nav.querySelector('.nav-contact'));
  }

  document.querySelectorAll('.footer-col').forEach(col => {
    if (!/services|ydelser|tjänster/i.test(col.querySelector('h3')?.textContent || '')) return;
    if (!col.querySelector(`a[href="${paths.industries}"]`)) {
      col.insertAdjacentHTML('beforeend', `<a href="${paths.industries}">${copy.industries}</a><a href="${paths.useCases}">${copy.useCases}</a>`);
    }
  });
})();
