(() => {
  if (window.__SUNDAI_CORE__) return;
  window.__SUNDAI_CORE__ = true;

  const addStylesheet = (href) => {
    if ([...document.styleSheets].some(sheet => sheet.href?.includes(href.split('?')[0]))) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };
  addStylesheet('/assets/qa-polish.css?v=20260724q4');
  addStylesheet('/assets/training.css?v=20260724q4');

  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) theme.content = '#ffffff';

  const lang = document.documentElement.lang || 'en';
  const nav = document.querySelector('[data-nav]') || document.querySelector('.nav');
  const dialog = document.querySelector('[data-contact-dialog]');
  const config = {
    en: {
      trainingHref:'/training/', trainingLabel:'Training & Talks', resourcesHref:'/resources/', resources:'Resources',
      euTitle:'100% European service', euMeta:'European values · European delivery', euText:'Privacy-aware AI governance, security, automation and training for organisations across the EU and wider Europe.',
      servicesTitle:'Four ways to move AI forward safely', trainingCard:'AI Training & Talks', trainingText:'Role-based workshops and keynotes that build practical AI literacy, responsible use and security awareness.', trainingLink:'Explore training →',
      ecosystem:{platforms:'Platforms we work with',collaborations:'Documented collaborations',official:'Open official website',diplomacy:'Digital diplomacy collaboration',cyber:'Cybersecurity education collaboration'}
    },
    da: {
      trainingHref:'/da/kurser-foredrag/', trainingLabel:'Kurser & foredrag', resourcesHref:'/da/ressourcer/', resources:'Ressourcer',
      euTitle:'100% europæisk service', euMeta:'Europæiske værdier · Europæisk levering', euText:'Privatlivsbevidst AI-governance, sikkerhed, automatisering og træning for organisationer i EU og resten af Europa.',
      servicesTitle:'Fire måder at flytte AI sikkert fremad', trainingCard:'AI-kurser & foredrag', trainingText:'Rollebaserede workshops og foredrag, der styrker praktisk AI-literacy, ansvarlig brug og sikkerhedsbevidsthed.', trainingLink:'Se kurser →',
      ecosystem:{platforms:'Platforme vi arbejder med',collaborations:'Dokumenterede samarbejder',official:'Åbn officiel hjemmeside',diplomacy:'Samarbejde om digitalt diplomati',cyber:'Samarbejde om cybersikkerhedsuddannelse'}
    },
    sv: {
      trainingHref:'/sv/utbildning-forelasningar/', trainingLabel:'Utbildning & föreläsningar', resourcesHref:'/sv/resurser/', resources:'Resurser',
      euTitle:'100% europeisk service', euMeta:'Europeiska värderingar · Europeisk leverans', euText:'Integritetsmedveten AI-styrning, säkerhet, automatisering och utbildning för organisationer i EU och övriga Europa.',
      servicesTitle:'Fyra sätt att föra AI framåt på ett säkert sätt', trainingCard:'AI-utbildning & föreläsningar', trainingText:'Rollbaserade workshops och föreläsningar som stärker praktisk AI-kunnighet, ansvarsfull användning och säkerhetsmedvetenhet.', trainingLink:'Se utbildning →',
      ecosystem:{platforms:'Plattformar vi arbetar med',collaborations:'Dokumenterade samarbeten',official:'Öppna officiell webbplats',diplomacy:'Samarbete inom digital diplomati',cyber:'Samarbete inom cybersäkerhetsutbildning'}
    }
  }[lang];

  if (config && nav) {
    if (!nav.querySelector(`a[href="${config.trainingHref}"]`)) {
      const link = document.createElement('a');
      link.href = config.trainingHref;
      link.textContent = config.trainingLabel;
      nav.insertBefore(link, [...nav.querySelectorAll('a')].find(item => item.href.includes('insights')) || nav.querySelector('.nav-contact'));
    }
    if (!nav.querySelector(`a[href="${config.resourcesHref}"]`)) {
      const link = document.createElement('a');
      link.href = config.resourcesHref;
      link.textContent = config.resources;
      const about = [...nav.querySelectorAll('a')].find(item => /about|\/om\//.test(item.getAttribute('href') || ''));
      nav.insertBefore(link, about || nav.querySelector('.nav-contact'));
    }
  }

  if (config) {
    const euStarPath = 'M0-2.25.53-.73 2.14-.73.83.28 1.32 1.82 0 .89-1.32 1.82-.83.28-2.14-.73-.53-.73Z';
    const euStarPositions = [[30,8],[36,9.61],[40.39,14],[42,20],[40.39,26],[36,30.39],[30,32],[24,30.39],[19.61,26],[18,20],[19.61,14],[24,9.61]];
    const stars = euStarPositions.map(([x,y]) => `<path d="${euStarPath}" transform="translate(${x} ${y})"/>`).join('');
    const row = document.querySelector('.eu-service-row');
    if (row) row.innerHTML = `<div class="eu-service-badge" role="img" aria-label="${config.euTitle}"><svg class="eu-flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" rx="5" fill="#003399"/><g fill="#ffcc00">${stars}</g></svg><span><strong>${config.euTitle}</strong><small>${config.euMeta}</small></span></div><p>${config.euText}</p>`;

    const grid = document.querySelector('.services .service-grid');
    if (grid && grid.children.length === 3) {
      const heading = document.querySelector('.services .section-title h2');
      if (heading) heading.textContent = config.servicesTitle;
      const card = document.createElement('article');
      card.className = 'service-card training-service';
      card.innerHTML = `<a href="${config.trainingHref}"><div class="service-icon"><svg viewBox="0 0 32 32" fill="none"><path d="M6 6h15a5 5 0 0 1 5 5v15H11a5 5 0 0 1-5-5Z"/><path d="M11 11h10M11 16h10M11 21h6"/></svg></div><h3>${config.trainingCard}</h3><p>${config.trainingText}</p><span class="card-link">${config.trainingLink}</span></a>`;
      const automation = [...grid.children].find(item => /automation|automatisering/i.test(item.textContent));
      grid.insertBefore(card, automation || null);
    }
  }

  const ecosystemRoot = document.querySelector('.ecosystem-assets');
  if (ecosystemRoot && config) {
    const labels = config.ecosystem;
    const platforms = [
      ['openai','OpenAI','https://openai.com/','https://images.ctfassets.net/kftzwdyauwt9/2fkAIT3PbTRytKTBx9cx8o/229bc28cb338565fe735d8935abc801f/OpenAI_Wordmark_Gif.gif?fm=webp&q=90&w=3840','https://openai.com/favicon.ico'],
      ['azure','Microsoft Azure','https://azure.microsoft.com/','https://msftstories.thesourcemediaassets.com/sites/113/2018/07/MS-Azure_logo_horiz_c-gray_rgb.png','https://azure.microsoft.com/favicon.ico'],
      ['gemini','Google Gemini','https://gemini.google.com/','https://www.gstatic.com/marketing-cms/assets/images/a4/97/92c1ec494d129f3fb8d7caa91584/gemini-update.png=s48-fcrop64=1,00000000ffffffff-rw','https://gemini.google.com/favicon.ico'],
      ['github','GitHub','https://github.com/','https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png','https://github.com/favicon.ico'],
      ['shopify','Shopify','https://www.shopify.com/','https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-inverted-primary-logo-bdc6ddd67862d9bb1f8c559e1bb50dd233112ac57b29cac2edcf17ed2e1fe6fa.svg','https://www.shopify.com/favicon.ico'],
      ['aws','Amazon Web Services (AWS)','https://aws.amazon.com/','https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png','https://aws.amazon.com/favicon.ico']
    ];
    const collaborations = [
      ['mfa','Ministry of Foreign Affairs of Denmark','https://um.dk/en/','https://um.dk/favicon.ico','',labels.diplomacy],
      ['eccouncil','EC-Council','https://www.eccouncil.org/','https://egs.eccouncil.org/wp-content/uploads/2016/02/EC-Council-200px.png','https://www.eccouncil.org/favicon.ico',labels.cyber]
    ];
    const renderCard = (item,type) => `<a class="brand-link-card ${type}-card brand-${item[0]}" href="${item[2]}" target="_blank" rel="noopener noreferrer external" aria-label="${item[1]} — ${labels.official}"><span class="brand-logo-surface"><img src="${item[3]}" ${item[4] ? `data-fallback="${item[4]}"` : ''} alt="${item[1]} logo" loading="lazy" decoding="async"></span><span class="brand-link-copy"><strong>${item[1]}</strong>${item[5] ? `<small>${item[5]}</small>` : ''}</span><span class="external-mark" aria-hidden="true">↗</span></a>`;
    ecosystemRoot.className = 'ecosystem-groups';
    ecosystemRoot.innerHTML = `<section class="ecosystem-group"><h3 class="ecosystem-group-title">${labels.platforms}</h3><div class="brand-link-grid platform-grid">${platforms.map(item=>renderCard(item,'platform')).join('')}</div></section><section class="ecosystem-group"><h3 class="ecosystem-group-title">${labels.collaborations}</h3><div class="brand-link-grid collaboration-grid">${collaborations.map(item=>renderCard(item,'collaboration')).join('')}</div></section>`;
    ecosystemRoot.querySelectorAll('img').forEach(image => image.addEventListener('error', () => {
      if (image.dataset.fallback && !image.dataset.used) {
        image.dataset.used = '1';
        image.src = image.dataset.fallback;
      } else {
        image.hidden = true;
        image.closest('.brand-link-card')?.classList.add('logo-failed');
      }
    }));
  }

  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = String(new Date().getFullYear()); });

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const started = form.querySelector('[name="startedAt"]');
    if (started) started.value = String(Date.now());
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const status = form.querySelector('[data-form-status]');
      const button = form.querySelector('[type="submit"]');
      button.disabled = true;
      button.setAttribute('aria-busy','true');
      status.textContent = '';
      status.className = 'form-status';
      try {
        const response = await fetch('/api/contact', {method:'POST',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))});
        if (!response.ok) throw new Error('Request failed');
        status.textContent = form.dataset.success || 'Thank you — your enquiry has been sent.';
        status.classList.add('success');
        form.reset();
        if (started) started.value = String(Date.now());
      } catch {
        status.textContent = form.dataset.error || 'The message could not be sent. Please try again later.';
        status.classList.add('error');
      } finally {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }
    });
  }

  if (!window.__SUNDAI_FINAL_SCRIPT_ADDED__) {
    window.__SUNDAI_FINAL_SCRIPT_ADDED__ = true;
    const script = document.createElement('script');
    script.src = '/assets/final-polish.js?v=20260724g';
    script.defer = true;
    document.body.appendChild(script);
  }
})();