(() => {
  const addStylesheet = (href) => {
    if ([...document.styleSheets].some(s => s.href?.includes(href.split('?')[0]))) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };
  addStylesheet('/assets/qa-polish.css?v=20260724g');
  addStylesheet('/assets/training.css?v=20260724g');
  addStylesheet('/assets/final-polish.css?v=20260724g');

  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) theme.content = '#ffffff';

  const lang = document.documentElement.lang || 'en';
  const nav = document.querySelector('[data-nav]') || document.querySelector('.nav');
  const toggle = document.querySelector('[data-nav-toggle]');
  const dialog = document.querySelector('[data-contact-dialog]');

  const config = {
    en: {
      trainingHref:'/training/', trainingLabel:'Training & Talks', resourcesHref:'/resources/', resources:'Resources', snapshot:'Snapshot',
      responsible:'Responsible AI', responsibleTitle:'Human-centred, ethical and standards-aligned.', responsibleText:'We connect AI security and governance with fairness, accessibility, transparency and human oversight — informed by the EU AI Act, ISO/IEC 42001 and ISO/IEC 27001 principles.', responsibleCta:'Explore our methodology →', responsibleHref:'/methodology/',
      euTitle:'100% European service', euMeta:'European values · European delivery', euText:'Privacy-aware AI governance, security, automation and training for organisations across the EU and wider Europe.',
      servicesTitle:'Four ways to move AI forward safely', trainingCard:'AI Training & Talks', trainingText:'Role-based workshops and keynotes that build practical AI literacy, responsible use and security awareness.', trainingLink:'Explore training →',
      trust:[['Trust','Transparent, reliable delivery'],['Clarity','Clear strategies and outcomes'],['Security','Secure-by-design thinking'],['Quality','Tested and documented work'],['European','EU-focused and privacy-aware']],
      ecosystem:{platforms:'Platforms we work with',collaborations:'Documented collaborations',official:'Open official website',diplomacy:'Digital diplomacy collaboration',cyber:'Cybersecurity education collaboration'}
    },
    da: {
      trainingHref:'/da/kurser-foredrag/', trainingLabel:'Kurser & foredrag', resourcesHref:'/da/ressourcer/', resources:'Ressourcer', snapshot:'Overblik',
      responsible:'Ansvarlig AI', responsibleTitle:'Menneskecentreret, etisk og standardsorienteret.', responsibleText:'Vi forbinder AI-sikkerhed og governance med fairness, tilgængelighed, transparens og menneskeligt tilsyn — inspireret af EU AI Act samt principperne i ISO/IEC 42001 og ISO/IEC 27001.', responsibleCta:'Se vores metode →', responsibleHref:'/da/metode/',
      euTitle:'100% europæisk service', euMeta:'Europæiske værdier · Europæisk levering', euText:'Privatlivsbevidst AI-governance, sikkerhed, automatisering og træning for organisationer i EU og resten af Europa.',
      servicesTitle:'Fire måder at flytte AI sikkert fremad', trainingCard:'AI-kurser & foredrag', trainingText:'Rollebaserede workshops og foredrag, der styrker praktisk AI-literacy, ansvarlig brug og sikkerhedsbevidsthed.', trainingLink:'Se kurser →',
      trust:[['Tillid','Transparent og pålidelig levering'],['Klarhed','Tydelige strategier og resultater'],['Sikkerhed','Secure-by-design tilgang'],['Kvalitet','Testet og dokumenteret arbejde'],['Europæisk','EU-fokuseret og privatlivsbevidst']],
      ecosystem:{platforms:'Platforme vi arbejder med',collaborations:'Dokumenterede samarbejder',official:'Åbn officiel hjemmeside',diplomacy:'Samarbejde om digitalt diplomati',cyber:'Samarbejde om cybersikkerhedsuddannelse'}
    },
    sv: {
      trainingHref:'/sv/utbildning-forelasningar/', trainingLabel:'Utbildning & föreläsningar', resourcesHref:'/sv/resurser/', resources:'Resurser', snapshot:'Översikt',
      responsible:'Ansvarsfull AI', responsibleTitle:'Människocentrerat, etiskt och standardbaserat.', responsibleText:'Vi förenar AI-säkerhet och styrning med rättvisa, tillgänglighet, transparens och mänsklig tillsyn — med stöd i EU AI Act samt principerna i ISO/IEC 42001 och ISO/IEC 27001.', responsibleCta:'Se vår metod →', responsibleHref:'/sv/metod/',
      euTitle:'100% europeisk service', euMeta:'Europeiska värderingar · Europeisk leverans', euText:'Integritetsmedveten AI-styrning, säkerhet, automatisering och utbildning för organisationer i EU och övriga Europa.',
      servicesTitle:'Fyra sätt att föra AI framåt på ett säkert sätt', trainingCard:'AI-utbildning & föreläsningar', trainingText:'Rollbaserade workshops och föreläsningar som stärker praktisk AI-kunnighet, ansvarsfull användning och säkerhetsmedvetenhet.', trainingLink:'Se utbildning →',
      trust:[['Tillit','Transparent och tillförlitlig leverans'],['Tydlighet','Tydliga strategier och resultat'],['Säkerhet','Secure-by-design perspektiv'],['Kvalitet','Testat och dokumenterat arbete'],['Europeiskt','EU-fokuserat och integritetsmedvetet']],
      ecosystem:{platforms:'Plattformar vi arbetar med',collaborations:'Dokumenterade samarbeten',official:'Öppna officiell webbplats',diplomacy:'Samarbete inom digital diplomati',cyber:'Samarbete inom cybersäkerhetsutbildning'}
    }
  }[lang];

  if (config && nav) {
    const snapshot = nav.querySelector('a[href="#snapshot"]');
    if (snapshot) snapshot.textContent = config.snapshot;
    if (!nav.querySelector(`a[href="${config.trainingHref}"]`)) {
      const a = document.createElement('a'); a.href = config.trainingHref; a.textContent = config.trainingLabel;
      nav.insertBefore(a, [...nav.querySelectorAll('a')].find(x => x.href.includes('insights')) || nav.querySelector('.nav-contact'));
    }
    if (!nav.querySelector(`a[href="${config.resourcesHref}"]`)) {
      const a = document.createElement('a'); a.href = config.resourcesHref; a.textContent = config.resources;
      const about = [...nav.querySelectorAll('a')].find(x => /about|\/om\//.test(x.getAttribute('href') || ''));
      nav.insertBefore(a, about || nav.querySelector('.nav-contact'));
    }
  }

  if (config) {
    const star = 'M0-2.25.53-.73 2.14-.73.83.28 1.32 1.82 0 .89-1.32 1.82-.83.28-2.14-.73-.53-.73Z';
    const positions = [[30,8],[36,9.61],[40.39,14],[42,20],[40.39,26],[36,30.39],[30,32],[24,30.39],[19.61,26],[18,20],[19.61,14],[24,9.61]];
    const stars = positions.map(([x,y]) => `<path d="${star}" transform="translate(${x} ${y})"/>`).join('');
    const row = document.querySelector('.eu-service-row');
    if (row) row.innerHTML = `<div class="eu-service-badge" role="img" aria-label="${config.euTitle}"><svg class="eu-flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" rx="5" fill="#003399"/><g fill="#ffcc00">${stars}</g></svg><span><strong>${config.euTitle}</strong><small>${config.euMeta}</small></span></div><p>${config.euText}</p>`;

    const grid = document.querySelector('.services .service-grid');
    if (grid && grid.children.length === 3) {
      const heading = document.querySelector('.services .section-title h2');
      if (heading) heading.textContent = config.servicesTitle;
      const card = document.createElement('article');
      card.className = 'service-card training-service';
      card.innerHTML = `<a href="${config.trainingHref}"><div class="service-icon"><svg viewBox="0 0 32 32" fill="none"><path d="M7 5h18v22H7z"/><path d="M11 10h10M11 15h10M11 20h7"/></svg></div><h3>${config.trainingCard}</h3><p>${config.trainingText}</p><span class="card-link">${config.trainingLink}</span></a>`;
      const automation = [...grid.children].find(x => /automation|automatisering/i.test(x.textContent));
      grid.insertBefore(card, automation || null);
    }

    const services = document.querySelector('.services');
    if (services && !document.querySelector('.premium-trust-strip') && !document.querySelector('.proof-strip')) {
      const icons = ['✓','◎','◇','◆','EU'];
      const strip = document.createElement('section');
      strip.className = 'premium-trust-strip';
      strip.setAttribute('aria-label','SundAI delivery principles');
      strip.innerHTML = `<div class="container">${config.trust.map((item,i)=>`<div class="premium-trust-item"><span class="premium-trust-icon" aria-hidden="true">${icons[i]}</span><span><strong>${item[0]}</strong><small>${item[1]}</small></span></div>`).join('')}</div>`;
      services.insertAdjacentElement('afterend',strip);
    }

    if (document.querySelector('#why') && !document.querySelector('.human-standard')) {
      const section = document.createElement('section');
      section.className = 'human-standard';
      section.innerHTML = `<div class="container"><div><p class="eyebrow">${config.responsible}</p><h2>${config.responsibleTitle}</h2><p>${config.responsibleText}</p></div><a href="${config.responsibleHref}">${config.responsibleCta}</a></div>`;
      document.querySelector('#why').insertAdjacentElement('afterend',section);
    }
  }

  const ecosystemRoot = document.querySelector('.ecosystem-assets, .ecosystem-groups');
  if (ecosystemRoot && config) {
    const c = config.ecosystem;
    const platforms = [
      ['openai','OpenAI','https://openai.com/','https://images.ctfassets.net/kftzwdyauwt9/2fkAIT3PbTRytKTBx9cx8o/229bc28cb338565fe735d8935abc801f/OpenAI_Wordmark_Gif.gif?fm=webp&q=90&w=3840','https://openai.com/favicon.ico'],
      ['azure','Microsoft Azure','https://azure.microsoft.com/','https://msftstories.thesourcemediaassets.com/sites/113/2018/07/MS-Azure_logo_horiz_c-gray_rgb.png','https://azure.microsoft.com/favicon.ico'],
      ['gemini','Google Gemini','https://gemini.google.com/','https://www.gstatic.com/marketing-cms/assets/images/a4/97/92c1ec494d129f3fb8d7caa91584/gemini-update.png=s48-fcrop64=1,00000000ffffffff-rw','https://gemini.google.com/favicon.ico'],
      ['github','GitHub','https://github.com/','https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png','https://github.com/favicon.ico'],
      ['shopify','Shopify','https://www.shopify.com/','https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-inverted-primary-logo-bdc6ddd67862d9bb1f8c559e1bb50dd233112ac57b29cac2edcf17ed2e1fe6fa.svg','https://www.shopify.com/favicon.ico'],
      ['aws','Amazon Web Services (AWS)','https://aws.amazon.com/','https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png','https://aws.amazon.com/favicon.ico']
    ];
    const collaborations = [
      ['mfa','Ministry of Foreign Affairs of Denmark','https://um.dk/en/','https://um.dk/favicon.ico','',c.diplomacy],
      ['eccouncil','EC-Council','https://www.eccouncil.org/','https://egs.eccouncil.org/wp-content/uploads/2016/02/EC-Council-200px.png','https://www.eccouncil.org/favicon.ico',c.cyber]
    ];
    const card = (item,type) => `<a class="brand-link-card ${type}-card brand-${item[0]}" href="${item[2]}" target="_blank" rel="noopener noreferrer external" aria-label="${item[1]} — ${c.official}"><span class="brand-logo-surface"><img src="${item[3]}" ${item[4] ? `data-fallback="${item[4]}"` : ''} alt="${item[1]} logo" loading="lazy" decoding="async"></span><span class="brand-link-copy"><strong>${item[1]}</strong>${item[5] ? `<small>${item[5]}</small>` : ''}</span><span class="external-mark" aria-hidden="true">↗</span></a>`;
    ecosystemRoot.className = 'ecosystem-groups';
    ecosystemRoot.innerHTML = `<section class="ecosystem-group"><h3 class="ecosystem-group-title">${c.platforms}</h3><div class="brand-link-grid platform-grid">${platforms.map(x=>card(x,'platform')).join('')}</div></section><section class="ecosystem-group"><h3 class="ecosystem-group-title">${c.collaborations}</h3><div class="brand-link-grid collaboration-grid">${collaborations.map(x=>card(x,'collaboration')).join('')}</div></section>`;
    ecosystemRoot.querySelectorAll('img').forEach(img => img.addEventListener('error',()=>{
      if (img.dataset.fallback && !img.dataset.used) { img.dataset.used='1'; img.src=img.dataset.fallback; }
      else { img.hidden=true; img.closest('.brand-link-card')?.classList.add('logo-failed'); }
    }));
  }

  toggle?.addEventListener('click',()=>{
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded',String(!open));
    nav?.classList.toggle('open',!open);
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));
  document.querySelectorAll('[data-open-contact]').forEach(button=>button.addEventListener('click',()=>{nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');dialog?.showModal?.();}));
  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  document.querySelectorAll('[data-year]').forEach(x=>x.textContent=String(new Date().getFullYear()));

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const started = form.querySelector('[name="startedAt"]'); if (started) started.value=String(Date.now());
    form.addEventListener('submit',async e=>{
      e.preventDefault(); if(!form.reportValidity())return;
      const status=form.querySelector('[data-form-status]'); const button=form.querySelector('[type="submit"]');
      button.disabled=true; button.setAttribute('aria-busy','true'); status.textContent=''; status.className='form-status';
      try { const response=await fetch('/api/contact',{method:'POST',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))}); if(!response.ok)throw new Error(); status.textContent=form.dataset.success||'Thank you — your enquiry has been sent.';status.classList.add('success');form.reset();if(started)started.value=String(Date.now()); }
      catch { status.textContent=form.dataset.error||'The message could not be sent. Please try again later.';status.classList.add('error'); }
      finally { button.disabled=false;button.removeAttribute('aria-busy'); }
    });
  }
})();