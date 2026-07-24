(() => {
  const nav = document.querySelector('[data-nav]') || document.querySelector('.nav');
  const toggle = document.querySelector('[data-nav-toggle]');
  const dialog = document.querySelector('[data-contact-dialog]');
  const lang = document.documentElement.lang || 'en';
  const training = {
    en: {href:'/training/', label:'Training & Talks', title:'Human-centred, ethical and standards-aligned.', text:'We connect AI security and governance with fairness, accessibility, transparency and human oversight — informed by the EU AI Act, ISO/IEC 42001 and ISO/IEC 27001 principles.', cta:'Explore training & talks →'},
    da: {href:'/da/kurser-foredrag/', label:'Kurser & foredrag', title:'Menneskecentreret, etisk og standardsorienteret.', text:'Vi forbinder AI-sikkerhed og governance med fairness, tilgængelighed, transparens og menneskeligt tilsyn — inspireret af EU AI Act samt principperne i ISO/IEC 42001 og ISO/IEC 27001.', cta:'Se kurser & foredrag →'},
    sv: {href:'/sv/utbildning-forelasningar/', label:'Utbildning & föreläsningar', title:'Människocentrerat, etiskt och standardbaserat.', text:'Vi förenar AI-säkerhet och styrning med rättvisa, tillgänglighet, transparens och mänsklig tillsyn — med stöd i EU AI Act samt principerna i ISO/IEC 42001 och ISO/IEC 27001.', cta:'Se utbildning & föreläsningar →'}
  }[lang] || null;

  if (document.querySelector('.training-grid') || document.querySelector('.standards-strip')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/assets/training.css?v=20260724b';
    document.head.appendChild(css);
  }

  if (training && nav && !nav.querySelector(`a[href="${training.href}"]`)) {
    const link = document.createElement('a');
    link.href = training.href;
    link.textContent = training.label;
    const insights = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href')?.includes('insights'));
    nav.insertBefore(link, insights || nav.querySelector('.nav-contact'));
  }

  if (training && document.querySelector('#why') && !document.querySelector('.human-standard')) {
    const section = document.createElement('section');
    section.className = 'human-standard';
    section.innerHTML = `<div class="container"><div><p class="eyebrow">Responsible AI</p><h2>${training.title}</h2><p>${training.text}</p></div><a href="${training.href}">${training.cta}</a></div>`;
    document.querySelector('#why').insertAdjacentElement('afterend', section);
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/assets/training.css?v=20260724b';
    document.head.appendChild(css);
  }

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('open', !open);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('[data-open-contact]').forEach((button) => button.addEventListener('click', () => {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (dialog?.showModal) dialog.showModal();
  }));

  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = String(new Date().getFullYear()); });

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const startedAt = form.querySelector('input[name="startedAt"]');
  if (startedAt) startedAt.value = String(Date.now());
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form).entries());
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    status.textContent = '';
    status.className = 'form-status';
    try {
      const response = await fetch('/api/contact', {method:'POST', headers:{'content-type':'application/json', accept:'application/json'}, body:JSON.stringify(data)});
      if (!response.ok) throw new Error('Request failed');
      status.textContent = form.dataset.success || 'Thank you — your enquiry has been sent.';
      status.classList.add('success');
      form.reset();
      if (startedAt) startedAt.value = String(Date.now());
    } catch {
      status.textContent = form.dataset.error || 'The message could not be sent. Please try again later.';
      status.classList.add('error');
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  });
})();