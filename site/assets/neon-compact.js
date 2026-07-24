(() => {
  const polish = document.createElement('link');
  polish.rel = 'stylesheet';
  polish.href = '/assets/qa-polish.css?v=20260724q1';
  document.head.appendChild(polish);

  const nav = document.querySelector('[data-nav]') || document.querySelector('.nav');
  const toggle = document.querySelector('[data-nav-toggle]');
  const dialog = document.querySelector('[data-contact-dialog]');
  const lang = document.documentElement.lang || 'en';
  const training = {
    en: {href:'/training/', label:'Training & Talks', eyebrow:'Responsible AI', title:'Human-centred, ethical and standards-aligned.', text:'We connect AI security and governance with fairness, accessibility, transparency and human oversight — informed by the EU AI Act, ISO/IEC 42001 and ISO/IEC 27001 principles.', cta:'Explore training & talks →'},
    da: {href:'/da/kurser-foredrag/', label:'Kurser & foredrag', eyebrow:'Ansvarlig AI', title:'Menneskecentreret, etisk og standardsorienteret.', text:'Vi forbinder AI-sikkerhed og governance med fairness, tilgængelighed, transparens og menneskeligt tilsyn — inspireret af EU AI Act samt principperne i ISO/IEC 42001 og ISO/IEC 27001.', cta:'Se kurser & foredrag →'},
    sv: {href:'/sv/utbildning-forelasningar/', label:'Utbildning & föreläsningar', eyebrow:'Ansvarsfull AI', title:'Människocentrerat, etiskt och standardbaserat.', text:'Vi förenar AI-säkerhet och styrning med rättvisa, tillgänglighet, transparens och mänsklig tillsyn — med stöd i EU AI Act samt principerna i ISO/IEC 42001 och ISO/IEC 27001.', cta:'Se utbildning & föreläsningar →'}
  }[lang] || null;

  const locale = {
    en: {resourcesHref:'/resources/', resources:'Resources', snapshot:'Snapshot', europeanTitle:'100% European service', europeanMeta:'European values · European delivery', europeanText:'Privacy-aware AI governance, security, automation and training for organisations across the EU and wider Europe.'},
    da: {resourcesHref:'/da/ressourcer/', resources:'Ressourcer', snapshot:'Overblik', europeanTitle:'100% europæisk service', europeanMeta:'Europæiske værdier · Europæisk levering', europeanText:'Privatlivsbevidst AI-governance, sikkerhed, automatisering og træning for organisationer i EU og resten af Europa.'},
    sv: {resourcesHref:'/sv/resurser/', resources:'Resurser', snapshot:'Översikt', europeanTitle:'100% europeisk service', europeanMeta:'Europeiska värderingar · Europeisk leverans', europeanText:'Integritetsmedveten AI-styrning, säkerhet, automatisering och utbildning för organisationer i EU och övriga Europa.'}
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

  if (locale && nav) {
    const snapshotLink = nav.querySelector('a[href="#snapshot"]');
    if (snapshotLink) snapshotLink.textContent = locale.snapshot;
    if (!nav.querySelector(`a[href="${locale.resourcesHref}"]`)) {
      const link = document.createElement('a');
      link.href = locale.resourcesHref;
      link.textContent = locale.resources;
      const about = [...nav.querySelectorAll('a')].find(a => /about|\/om\//.test(a.getAttribute('href') || ''));
      nav.insertBefore(link, about || nav.querySelector('.nav-contact'));
    }
  }

  if (locale) {
    const euRow = document.querySelector('.eu-service-row');
    if (euRow) {
      euRow.innerHTML = `<div class="eu-service-badge" role="img" aria-label="${locale.europeanTitle}"><svg class="eu-flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" rx="5" fill="#003399"/><g fill="#ffcc00" transform="translate(30 20)">${Array.from({length:12},(_,i)=>`<circle r="1.7" transform="rotate(${i*30}) translate(0 -12)"/>`).join('')}</g></svg><span><strong>${locale.europeanTitle}</strong><small>${locale.europeanMeta}</small></span></div><p>${locale.europeanText}</p>`;
    }
  }

  if (training && document.querySelector('#why') && !document.querySelector('.human-standard')) {
    const section = document.createElement('section');
    section.className = 'human-standard';
    section.innerHTML = `<div class="container"><div><p class="eyebrow">${training.eyebrow}</p><h2>${training.title}</h2><p>${training.text}</p></div><a href="${training.href}">${training.cta}</a></div>`;
    document.querySelector('#why').insertAdjacentElement('afterend', section);
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/assets/training.css?v=20260724b';
    document.head.appendChild(css);
  }

  const ecosystemRoot = document.querySelector('.ecosystem-assets');
  if (ecosystemRoot) {
    const copy = {
      en: {platforms:'Platforms we work with',collaborations:'Documented collaborations',official:'Open official website',diplomacy:'Digital diplomacy collaboration',cyber:'Cybersecurity education collaboration'},
      da: {platforms:'Platforme vi arbejder med',collaborations:'Dokumenterede samarbejder',official:'Åbn officiel hjemmeside',diplomacy:'Samarbejde om digitalt diplomati',cyber:'Samarbejde om cybersikkerhedsuddannelse'},
      sv: {platforms:'Plattformar vi arbetar med',collaborations:'Dokumenterade samarbeten',official:'Öppna officiell webbplats',diplomacy:'Samarbete inom digital diplomati',cyber:'Samarbete inom cybersäkerhetsutbildning'}
    }[lang] || {platforms:'Platforms we work with',collaborations:'Documented collaborations',official:'Open official website',diplomacy:'Digital diplomacy collaboration',cyber:'Cybersecurity education collaboration'};
    const platforms = [
      {id:'openai',name:'OpenAI',href:'https://openai.com/',logo:'https://images.ctfassets.net/kftzwdyauwt9/2fkAIT3PbTRytKTBx9cx8o/229bc28cb338565fe735d8935abc801f/OpenAI_Wordmark_Gif.gif?fm=webp&q=90&w=3840',fallback:'https://openai.com/favicon.ico'},
      {id:'azure',name:'Microsoft Azure',href:'https://azure.microsoft.com/',logo:'https://msftstories.thesourcemediaassets.com/sites/113/2018/07/MS-Azure_logo_horiz_c-gray_rgb.png',fallback:'https://azure.microsoft.com/favicon.ico'},
      {id:'gemini',name:'Google Gemini',href:'https://gemini.google.com/',logo:'https://www.gstatic.com/marketing-cms/assets/images/a4/97/92c1ec494d129f3fb8d7caa91584/gemini-update.png=s48-fcrop64=1,00000000ffffffff-rw',fallback:'https://gemini.google.com/favicon.ico'},
      {id:'github',name:'GitHub',href:'https://github.com/',logo:'https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png',fallback:'https://github.com/favicon.ico'},
      {id:'shopify',name:'Shopify',href:'https://www.shopify.com/',logo:'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-inverted-primary-logo-bdc6ddd67862d9bb1f8c559e1bb50dd233112ac57b29cac2edcf17ed2e1fe6fa.svg',fallback:'https://www.shopify.com/favicon.ico',dark:true},
      {id:'aws',name:'Amazon Web Services (AWS)',href:'https://aws.amazon.com/',logo:'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',fallback:'https://aws.amazon.com/favicon.ico'}
    ];
    const collaborations = [
      {id:'mfa',name:'Ministry of Foreign Affairs of Denmark',href:'https://um.dk/en/',logo:'https://um.dk/favicon.ico',subtitle:copy.diplomacy},
      {id:'eccouncil',name:'EC-Council',href:'https://www.eccouncil.org/',logo:'https://egs.eccouncil.org/wp-content/uploads/2016/02/EC-Council-200px.png',fallback:'https://www.eccouncil.org/favicon.ico',subtitle:copy.cyber}
    ];
    const renderCard = (item,type) => {
      const dark = item.dark ? ' brand-dark' : '';
      const subtitle = item.subtitle ? `<small>${item.subtitle}</small>` : '';
      const fallback = item.fallback ? ` data-fallback="${item.fallback}"` : '';
      return `<a class="brand-link-card ${type}-card brand-${item.id}${dark}" href="${item.href}" target="_blank" rel="noopener noreferrer external" aria-label="${item.name} — ${copy.official}" title="${copy.official}"><span class="brand-logo-surface"><img src="${item.logo}"${fallback} alt="${item.name} logo" loading="lazy" decoding="async"></span><span class="brand-link-copy"><strong>${item.name}</strong>${subtitle}</span><span class="external-mark" aria-hidden="true">↗</span></a>`;
    };
    ecosystemRoot.className = 'ecosystem-groups';
    ecosystemRoot.innerHTML = `<section class="ecosystem-group" aria-labelledby="platform-group-title"><h3 id="platform-group-title" class="ecosystem-group-title">${copy.platforms}</h3><div class="brand-link-grid platform-grid">${platforms.map(item=>renderCard(item,'platform')).join('')}</div></section><section class="ecosystem-group" aria-labelledby="collaboration-group-title"><h3 id="collaboration-group-title" class="ecosystem-group-title">${copy.collaborations}</h3><div class="brand-link-grid collaboration-grid">${collaborations.map(item=>renderCard(item,'collaboration')).join('')}</div></section>`;
    ecosystemRoot.querySelectorAll('.brand-link-card img').forEach(image => image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;
      if (fallback && image.dataset.fallbackUsed !== 'true') { image.dataset.fallbackUsed='true'; image.src=fallback; return; }
      image.hidden=true; image.closest('.brand-link-card')?.classList.add('logo-failed');
    }));
  }

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('open', !open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); }));
  document.querySelectorAll('[data-open-contact]').forEach(button => button.addEventListener('click', () => { nav?.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); if (dialog?.showModal) dialog.showModal(); }));
  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.querySelectorAll('[data-year]').forEach(element => { element.textContent=String(new Date().getFullYear()); });

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const startedAt = form.querySelector('input[name="startedAt"]');
  if (startedAt) startedAt.value=String(Date.now());
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status=form.querySelector('[data-form-status]');
    const button=form.querySelector('button[type="submit"]');
    const data=Object.fromEntries(new FormData(form).entries());
    button.disabled=true; button.setAttribute('aria-busy','true'); status.textContent=''; status.className='form-status';
    try {
      const response=await fetch('/api/contact',{method:'POST',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify(data)});
      if (!response.ok) throw new Error('Request failed');
      status.textContent=form.dataset.success || 'Thank you — your enquiry has been sent.'; status.classList.add('success'); form.reset(); if (startedAt) startedAt.value=String(Date.now());
    } catch { status.textContent=form.dataset.error || 'The message could not be sent. Please try again later.'; status.classList.add('error'); }
    finally { button.disabled=false; button.removeAttribute('aria-busy'); }
  });
})();