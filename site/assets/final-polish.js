(() => {
  const lang = document.documentElement.lang || 'en';
  const copy = {
    en: {
      consult:'Contact SundAI', services:'See our services', training:'AI Training & Talks', trainingText:'Role-based workshops and keynotes that build practical AI literacy, responsible use and security awareness.', exploreTraining:'Explore training →',
      who:'Who we help', whoTitle:'Practical AI support for organisations that need clarity, control and measurable value.', industries:'Industries', useCases:'Use cases',
      audiences:[['Small & mid-sized organisations','Move from scattered AI experiments to a controlled operating model.'],['Public & social services','Introduce AI with accessibility, accountability and meaningful human oversight.'],['Education & learning','Build AI literacy and safe use across leaders, educators and learners.'],['Knowledge-intensive teams','Secure assistants, workflows and decisions involving sensitive information.']],
      proof:[['European delivery','Remote and on-site support across Europe'],['Human-centred','Fairness, accessibility and oversight'],['Standards-informed','EU AI Act, ISO/IEC 42001 and ISO/IEC 27001'],['Practical outcomes','Roadmaps, controls, workshops and working processes']],
      founder:'Founded by Eric Rimón', founderTitle:'Independent, cross-disciplinary AI initiative', founderRole:'AI governance · security · human-centred technology', founderText:'SundAI was created to bring together AI governance, cybersecurity, organisational risk and human-centred implementation in a practical European framework.', founderLink:'About SundAI →', founderJobTitle:'Founder',
      insightMeta:['5 min read','Updated Jul 2026'], resourcesMeta:['Practical toolkit','Updated Jul 2026'],
      brandEyebrow:'Why the name SundAI', brandTitle:'Healthy AI, from name to practice.', brandText:'In Danish, “sund” means healthy. SundAI stands for AI that is secure, responsible, useful and human-centred — not technology for its own sake.', brandSlogan:'Healthy AI for European organisations', brandAlternate:'Healthy AI'
    },
    da: {
      consult:'Kontakt SundAI', services:'Se vores ydelser', training:'AI-kurser & foredrag', trainingText:'Rollebaserede workshops og foredrag, der opbygger praktisk AI-literacy, ansvarlig brug og sikkerhedsbevidsthed.', exploreTraining:'Se kurser →',
      who:'Hvem vi hjælper', whoTitle:'Praktisk AI-støtte til organisationer, der har brug for klarhed, kontrol og målbar værdi.', industries:'Brancher', useCases:'Anvendelser',
      audiences:[['Små og mellemstore organisationer','Gå fra spredte AI-eksperimenter til en kontrolleret driftsmodel.'],['Offentlige og sociale tjenester','Indfør AI med tilgængelighed, ansvar og meningsfuldt menneskeligt tilsyn.'],['Uddannelse og læring','Opbyg AI-literacy og sikker brug blandt ledere, undervisere og elever.'],['Videnstunge teams','Sikr assistenter, workflows og beslutninger med følsomme oplysninger.']],
      proof:[['Europæisk levering','Online og fysisk støtte i Europa'],['Menneskecentreret','Fairness, tilgængelighed og tilsyn'],['Standardinformeret','EU AI Act, ISO/IEC 42001 og ISO/IEC 27001'],['Praktiske resultater','Roadmaps, kontroller, workshops og arbejdsprocesser']],
      founder:'Grundlagt af Eric Rimón', founderTitle:'Uafhængigt, tværfagligt AI-initiativ', founderRole:'AI-governance · sikkerhed · menneskecentreret teknologi', founderText:'SundAI blev skabt for at samle AI-governance, cybersikkerhed, organisatorisk risiko og menneskecentreret implementering i en praktisk europæisk ramme.', founderLink:'Om SundAI →', founderJobTitle:'Grundlægger',
      insightMeta:['5 min. læsning','Opdateret jul. 2026'], resourcesMeta:['Praktisk værktøj','Opdateret jul. 2026'],
      brandEyebrow:'Hvorfor navnet SundAI', brandTitle:'Sund AI — fra navn til praksis.', brandText:'På dansk betyder “sund” netop sund. SundAI står for AI, der er sikker, ansvarlig, nyttig og menneskecentreret — ikke teknologi for teknologiens skyld.', brandSlogan:'Sund AI for europæiske organisationer', brandAlternate:'Sund AI'
    },
    sv: {
      consult:'Kontakta SundAI', services:'Se våra tjänster', training:'AI-utbildning & föreläsningar', trainingText:'Rollbaserade workshops och föreläsningar som bygger praktisk AI-kunnighet, ansvarsfull användning och säkerhetsmedvetenhet.', exploreTraining:'Se utbildning →',
      who:'Vilka vi hjälper', whoTitle:'Praktiskt AI-stöd för organisationer som behöver tydlighet, kontroll och mätbart värde.', industries:'Branscher', useCases:'Användningsfall',
      audiences:[['Små och medelstora organisationer','Gå från spridda AI-experiment till en kontrollerad verksamhetsmodell.'],['Offentliga och sociala tjänster','Inför AI med tillgänglighet, ansvar och meningsfull mänsklig tillsyn.'],['Utbildning och lärande','Bygg AI-kunnighet och säker användning för ledare, lärare och elever.'],['Kunskapsintensiva team','Säkra assistenter, arbetsflöden och beslut med känslig information.']],
      proof:[['Europeisk leverans','Digitalt och på plats i Europa'],['Människocentrerat','Rättvisa, tillgänglighet och tillsyn'],['Standardinformerat','EU AI Act, ISO/IEC 42001 och ISO/IEC 27001'],['Praktiska resultat','Färdplaner, kontroller, workshops och arbetsprocesser']],
      founder:'Grundat av Eric Rimón', founderTitle:'Oberoende, tvärdisciplinärt AI-initiativ', founderRole:'AI-styrning · säkerhet · människocentrerad teknik', founderText:'SundAI skapades för att förena AI-styrning, cybersäkerhet, organisatorisk risk och människocentrerad implementering i ett praktiskt europeiskt ramverk.', founderLink:'Om SundAI →', founderJobTitle:'Grundare',
      insightMeta:['5 min läsning','Uppdaterad jul. 2026'], resourcesMeta:['Praktiskt verktyg','Uppdaterad jul. 2026'],
      brandEyebrow:'Varför namnet SundAI', brandTitle:'Sund AI — från namn till praktik.', brandText:'På danska betyder “sund” hälsosam. SundAI står för AI som är säker, ansvarsfull, användbar och människocentrerad — inte teknik för teknikens skull.', brandSlogan:'Sund AI för europeiska organisationer', brandAlternate:'Sund AI'
    }
  }[lang];
  if (!copy) return;

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/assets/final-polish.css?v=20260724h';
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

  const whySection = document.querySelector('#why');
  if (whySection && !document.querySelector('.brand-story')) {
    const story = document.createElement('section');
    story.className = 'brand-story';
    story.innerHTML = `<div class="container"><div class="brand-story-card"><div class="brand-story-word" aria-hidden="true"><span>Sund</span><b>AI</b></div><div><p class="eyebrow">${copy.brandEyebrow}</p><h2>${copy.brandTitle}</h2><p>${copy.brandText}</p></div></div></div>`;
    whySection.insertAdjacentElement('afterend', story);
  }

  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try {
      const data = JSON.parse(script.textContent);
      const graph = Array.isArray(data['@graph']) ? data['@graph'] : [data];
      graph.forEach(item => {
        if (item?.['@type'] === 'Organization' && item.name === 'SundAI') {
          item.slogan = copy.brandSlogan;
          item.alternateName = copy.brandAlternate;
        }
        if (item?.['@type'] === 'Person' && item.name === 'Eric Rimón') {
          item.jobTitle = copy.founderJobTitle;
          delete item.worksFor;
        }
      });
      script.textContent = JSON.stringify(data);
    } catch {}
  });

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
    founder.innerHTML = `<div class="container"><div class="founder-card"><div class="founder-avatar"><img src="/assets/sundai-brand-avatar.svg" alt="SundAI" width="100" height="100"></div><div class="founder-copy"><p class="eyebrow">${copy.founder}</p><h2>${copy.founderTitle}</h2><h3>${copy.founderRole}</h3><p>${copy.founderText}</p></div><a class="button secondary" href="${paths.about}">${copy.founderLink}</a></div></div>`;
    cta.insertAdjacentElement('beforebegin', founder);
  }

  const existingFounder = document.querySelector('.founder-strip .founder-card');
  if (existingFounder) {
    const avatar = existingFounder.querySelector('.founder-avatar');
    if (avatar) avatar.innerHTML = '<img src="/assets/sundai-brand-avatar.svg" alt="SundAI" width="100" height="100" loading="lazy">';
    const eyebrow = existingFounder.querySelector('.founder-copy .eyebrow');
    const title = existingFounder.querySelector('.founder-copy h2');
    const role = existingFounder.querySelector('.founder-copy h3');
    const text = existingFounder.querySelector('.founder-copy p:not(.eyebrow)');
    const link = existingFounder.querySelector('a.button');
    if (eyebrow) eyebrow.textContent = copy.founder;
    if (title) title.textContent = copy.founderTitle;
    if (role) role.textContent = copy.founderRole;
    if (text) text.textContent = copy.founderText;
    if (link) link.textContent = copy.founderLink;
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