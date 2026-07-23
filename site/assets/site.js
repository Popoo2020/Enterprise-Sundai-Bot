(() => {
  const header = document.querySelector('[data-header]');
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const language = document.documentElement.lang || 'en';

  const loadStylesheet = (href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };
  loadStylesheet('/assets/ecosystem.css');
  loadStylesheet('/assets/responsive.css');

  const translations = {
    en: {
      skip: 'Skip to content', menu: 'Menu', badge: 'European service',
      title: 'European delivery. Global technology ecosystem.',
      intro: 'SundAI delivers from Europe with a Nordic perspective, combining responsible AI, cybersecurity and practical business implementation across leading platforms.',
      platforms: 'Technology ecosystem', partners: 'Official partnerships & collaboration',
      partnerIntro: 'Formal work relationships and collaboration experience supporting international business, cybersecurity and professional education.',
      mfa: 'Ministry of Foreign Affairs of Denmark', mfaDesc: 'Collaboration experience through Danish international business and innovation activities.',
      ec: 'EC-Council', ecDesc: 'Collaboration experience in cybersecurity education, certification and professional development.',
      repos: 'public repositories', disciplines: 'specialist domains', languages: 'website languages',
      github: 'View verified GitHub work',
      note: 'Technology names identify platforms used in our work. All trademarks belong to their respective owners. Inclusion does not imply endorsement unless explicitly described as a partnership or collaboration.'
    },
    da: {
      skip: 'Spring til indhold', menu: 'Menu', badge: 'Europæisk service',
      title: 'Europæisk levering. Globalt teknologiøkosystem.',
      intro: 'SundAI leverer fra Europa med et nordisk perspektiv og kombinerer ansvarlig AI, cybersikkerhed og praktisk forretningsimplementering på førende platforme.',
      platforms: 'Teknologiøkosystem', partners: 'Officielle partnerskaber og samarbejde',
      partnerIntro: 'Formelle arbejdsrelationer og samarbejdserfaring inden for international forretning, cybersikkerhed og professionel uddannelse.',
      mfa: 'Udenrigsministeriet', mfaDesc: 'Samarbejdserfaring gennem danske internationale erhvervs- og innovationsaktiviteter.',
      ec: 'EC-Council', ecDesc: 'Samarbejdserfaring inden for cybersikkerhedsuddannelse, certificering og faglig udvikling.',
      repos: 'offentlige repositories', disciplines: 'specialistområder', languages: 'sprog på hjemmesiden',
      github: 'Se verificeret GitHub-arbejde',
      note: 'Teknologinavne identificerer platforme, vi arbejder med. Alle varemærker tilhører deres respektive ejere. Visning betyder ikke godkendelse, medmindre relationen udtrykkeligt beskrives som et partnerskab eller samarbejde.'
    },
    sv: {
      skip: 'Hoppa till innehållet', menu: 'Meny', badge: 'Europeisk tjänst',
      title: 'Europeisk leverans. Globalt teknikekosystem.',
      intro: 'SundAI levererar från Europa med ett nordiskt perspektiv och kombinerar ansvarsfull AI, cybersäkerhet och praktisk affärsimplementering på ledande plattformar.',
      platforms: 'Teknikekosystem', partners: 'Officiella partnerskap och samarbeten',
      partnerIntro: 'Formella arbetsrelationer och samarbetserfarenhet inom internationella affärer, cybersäkerhet och professionell utbildning.',
      mfa: 'Danmarks utrikesministerium', mfaDesc: 'Samarbetserfarenhet genom danska internationella affärs- och innovationsaktiviteter.',
      ec: 'EC-Council', ecDesc: 'Samarbetserfarenhet inom cybersäkerhetsutbildning, certifiering och professionell utveckling.',
      repos: 'offentliga repositories', disciplines: 'specialistområden', languages: 'språk på webbplatsen',
      github: 'Se verifierat GitHub-arbete',
      note: 'Tekniknamn identifierar plattformar som används i vårt arbete. Alla varumärken tillhör respektive ägare. Visningen innebär inte ett godkännande om relationen inte uttryckligen beskrivs som ett partnerskap eller samarbete.'
    }
  };
  const copy = translations[language] || translations.en;

  const skip = document.querySelector('.skip-link');
  if (skip) skip.textContent = copy.skip;
  const menuText = document.querySelector('.nav-toggle .sr-only');
  if (menuText) menuText.textContent = copy.menu;

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      toggle?.focus();
    }
  });

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  document.querySelectorAll('.copyright').forEach((el) => {
    if (!el.textContent.includes('13813344')) {
      const disclosure = document.createElement('span');
      disclosure.innerHTML = '<br>RIIMON HOLDINGS LTD · Company no. 13813344 · Registered office: 128 City Road, London, EC1V 2NX, United Kingdom.';
      el.appendChild(disclosure);
    }
  });

  const platform = (mark, name, extra = '') => `<div class="tech-logo ${extra}"><span class="brand-symbol" aria-hidden="true">${mark}</span><span>${name}</span></div>`;
  const hero = document.querySelector('.hero');
  if (hero && !document.querySelector('.ecosystem')) {
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
          <div class="platform-label"><p class="eyebrow">${copy.platforms}</p></div>
        </div>
        <div class="tech-grid" aria-label="${copy.platforms}">
          <div class="tech-logo eu"><img src="/assets/eu-flag.svg" alt=""><span>European Union</span></div>
          ${platform('S','Shopify','shopify')}
          ${platform('a→z','Amazon','amazon')}
          ${platform('A','Microsoft Azure','azure')}
          ${platform('<i></i><i></i><i></i><i></i>','Microsoft','microsoft')}
          ${platform('✦','Google Gemini','gemini')}
          ${platform('GH','GitHub','github')}
          ${platform('AI','OpenAI','openai')}
        </div>
        <div class="partner-strip">
          <div class="partner-strip-head"><h3>${copy.partners}</h3><p>${copy.partnerIntro}</p></div>
          <div class="partner-grid">
            <div class="partner-card"><div class="partner-logo dk" aria-hidden="true">DK</div><div><strong>${copy.mfa}</strong><span>${copy.mfaDesc}</span></div></div>
            <div class="partner-card"><div class="partner-logo ec" aria-hidden="true">EC<br>COUNCIL</div><div><strong>${copy.ec}</strong><span>${copy.ecDesc}</span></div></div>
          </div>
        </div>
        <div class="github-proof" aria-label="GitHub evidence">
          <div><b>15</b><span>${copy.repos}</span></div>
          <div><b>5+</b><span>${copy.disciplines}: AI security, cloud, DevSecOps, RAG, governance</span></div>
          <div><b>3</b><span>${copy.languages}: EN, DA, SV</span></div>
        </div>
        <a class="button secondary" href="https://github.com/Popoo2020" rel="noopener noreferrer">${copy.github} →</a>
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
        method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(data)
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
