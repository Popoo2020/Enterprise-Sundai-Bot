(() => {
  const header = document.querySelector('[data-header]');
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const language = document.documentElement.lang || 'en';

  if (!document.querySelector('link[href="/assets/ecosystem.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/ecosystem.css';
    document.head.appendChild(link);
  }

  const copy = {
    en: {
      skip: 'Skip to content', menu: 'Menu',
      badge: 'European service', title: 'European delivery. Global technology ecosystem.',
      intro: 'SundAI delivers from Europe with a Nordic perspective, combining responsible AI, cybersecurity and practical business implementation across leading platforms.',
      platforms: 'Platforms we work with',
      partners: 'Official partnerships & collaboration',
      partnerIntro: 'Formal work relationships and collaboration experience supporting international business, cybersecurity and professional education.',
      mfa: 'Ministry of Foreign Affairs of Denmark', mfaDesc: 'Official collaboration experience through Danish international business and innovation activities.',
      ec: 'EC-Council', ecDesc: 'Official collaboration experience in cybersecurity education, certification and professional development.',
      repos: 'public repositories', disciplines: 'specialist domains', languages: 'website languages',
      github: 'View verified GitHub work',
      note: 'Technology names and marks identify platforms used in our work. All trademarks belong to their respective owners. Inclusion does not imply endorsement unless explicitly identified above as an official partnership or collaboration.'
    },
    da: {
      skip: 'Spring til indhold', menu: 'Menu',
      badge: 'Europæisk service', title: 'Europæisk levering. Globalt teknologiøkosystem.',
      intro: 'SundAI leverer fra Europa med et nordisk perspektiv og kombinerer ansvarlig AI, cybersikkerhed og praktisk forretningsimplementering på førende platforme.',
      platforms: 'Platforme vi arbejder med',
      partners: 'Officielle partnerskaber og samarbejde',
      partnerIntro: 'Formelle arbejdsrelationer og samarbejdserfaring inden for international forretning, cybersikkerhed og professionel uddannelse.',
      mfa: 'Udenrigsministeriet', mfaDesc: 'Officiel samarbejdserfaring gennem danske internationale erhvervs- og innovationsaktiviteter.',
      ec: 'EC-Council', ecDesc: 'Officiel samarbejdserfaring inden for cybersikkerhedsuddannelse, certificering og faglig udvikling.',
      repos: 'offentlige repositories', disciplines: 'specialistområder', languages: 'sprog på hjemmesiden',
      github: 'Se verificeret GitHub-arbejde',
      note: 'Teknologinavne og mærker identificerer platforme, vi arbejder med. Alle varemærker tilhører deres respektive ejere. Visning betyder ikke godkendelse, medmindre relationen ovenfor udtrykkeligt er angivet som et officielt partnerskab eller samarbejde.'
    },
    sv: {
      skip: 'Hoppa till innehållet', menu: 'Meny',
      badge: 'Europeisk tjänst', title: 'Europeisk leverans. Globalt teknikekosystem.',
      intro: 'SundAI levererar från Europa med ett nordiskt perspektiv och kombinerar ansvarsfull AI, cybersäkerhet och praktisk affärsimplementering på ledande plattformar.',
      platforms: 'Plattformar vi arbetar med',
      partners: 'Officiella partnerskap och samarbeten',
      partnerIntro: 'Formella arbetsrelationer och samarbetserfarenhet inom internationella affärer, cybersäkerhet och professionell utbildning.',
      mfa: 'Danmarks utrikesministerium', mfaDesc: 'Officiell samarbetserfarenhet genom danska internationella affärs- och innovationsaktiviteter.',
      ec: 'EC-Council', ecDesc: 'Officiell samarbetserfarenhet inom cybersäkerhetsutbildning, certifiering och professionell utveckling.',
      repos: 'offentliga repositories', disciplines: 'specialistområden', languages: 'språk på webbplatsen',
      github: 'Se verifierat GitHub-arbete',
      note: 'Tekniknamn och märken identifierar plattformar som används i vårt arbete. Alla varumärken tillhör respektive ägare. Visningen innebär inte ett godkännande om relationen inte uttryckligen anges ovan som ett officiellt partnerskap eller samarbete.'
    }
  }[language] || null;

  if (copy) {
    const skip = document.querySelector('.skip-link');
    if (skip) skip.textContent = copy.skip;
    const menuText = document.querySelector('.nav-toggle .sr-only');
    if (menuText) menuText.textContent = copy.menu;
  }

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('open', !open);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('.copyright').forEach((el) => {
    if (!el.textContent.includes('13813344')) {
      const disclosure = document.createElement('span');
      disclosure.innerHTML = '<br>RIIMON HOLDINGS LTD · Company no. 13813344 · Registered office: 128 City Road, London, EC1V 2NX, United Kingdom.';
      el.appendChild(disclosure);
    }
  });

  const hero = document.querySelector('.hero');
  if (hero && copy && !document.querySelector('.ecosystem')) {
    const section = document.createElement('section');
    section.className = 'ecosystem';
    section.setAttribute('aria-labelledby', 'ecosystem-title');
    section.innerHTML = `
      <div class="container">
        <div class="ecosystem-head">
          <div>
            <div class="eu-service"><img src="/assets/eu-flag.svg" alt="European Union flag"><span>${copy.badge}</span></div>
            <h2 id="ecosystem-title">${copy.title}</h2>
            <p>${copy.intro}</p>
          </div>
          <div><p class="eyebrow">${copy.platforms}</p></div>
        </div>
        <div class="tech-grid" aria-label="${copy.platforms}">
          <div class="tech-logo"><span class="tech-mark eu"><img src="/assets/eu-flag.svg" alt=""></span><span>European Union</span></div>
          <div class="tech-logo"><span class="tech-mark shopify" role="img" aria-label="Shopify logo">S</span><span>Shopify</span></div>
          <div class="tech-logo"><span class="tech-mark amazon" role="img" aria-label="Amazon logo">a→z</span><span>Amazon</span></div>
          <div class="tech-logo"><span class="tech-mark azure" role="img" aria-label="Microsoft Azure logo"></span><span>Microsoft Azure</span></div>
          <div class="tech-logo"><span class="tech-mark ms" role="img" aria-label="Microsoft logo"><i></i><i></i><i></i><i></i></span><span>Microsoft</span></div>
          <div class="tech-logo"><span class="tech-mark gemini" role="img" aria-label="Google Gemini logo">✦</span><span>Google Gemini</span></div>
          <div class="tech-logo"><span class="tech-mark github" role="img" aria-label="GitHub logo">&lt;/&gt;</span><span>GitHub</span></div>
          <div class="tech-logo"><span class="tech-mark openai" role="img" aria-label="OpenAI logo">◎</span><span>OpenAI</span></div>
        </div>
        <div class="partner-strip">
          <div class="partner-strip-head"><div><h3>${copy.partners}</h3><p>${copy.partnerIntro}</p></div></div>
          <div class="partner-grid">
            <div class="partner-card"><div class="partner-logo dk" aria-hidden="true">🇩🇰</div><div><strong>${copy.mfa}</strong><span>${copy.mfaDesc}</span></div></div>
            <div class="partner-card"><div class="partner-logo ec" aria-hidden="true">EC<br>COUNCIL</div><div><strong>${copy.ec}</strong><span>${copy.ecDesc}</span></div></div>
          </div>
        </div>
        <div class="github-proof" aria-label="GitHub evidence">
          <div><b>15</b><span>${copy.repos}</span></div>
          <div><b>5+</b><span>${copy.disciplines}: AI security, cloud, DevSecOps, RAG, governance</span></div>
          <div><b>3</b><span>${copy.languages}: EN, DA, SV</span></div>
        </div>
        <a class="button secondary" href="https://github.com/Popoo2020" rel="noopener">${copy.github} →</a>
        <p class="ecosystem-note">${copy.note}</p>
      </div>`;
    hero.insertAdjacentElement('afterend', section);
  }

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const startedAt = form.querySelector('input[name="startedAt"]');
  if (startedAt) startedAt.value = String(Date.now());

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('button[type="submit"]');
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Request failed');
      status.textContent = form.dataset.success;
      status.classList.add('success');
      form.reset();
      if (startedAt) startedAt.value = String(Date.now());
    } catch {
      status.textContent = form.dataset.error;
      status.classList.add('error');
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  });
})();
