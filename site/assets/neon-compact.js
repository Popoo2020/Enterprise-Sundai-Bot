(() => {
  const addStylesheet = (href) => {
    if ([...document.styleSheets].some(s => s.href?.includes(href.split('?')[0]))) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };
  addStylesheet('/assets/qa-polish.css?v=20260725s1');
  addStylesheet('/assets/training.css?v=20260725s1');
  addStylesheet('/assets/final-polish.css?v=20260725s1');

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
      ecosystem:{platforms:'Platforms we work with',collaborations:'Documented collaborations',official:'Open official website',diplomacy:'Digital diplomacy collaboration',cyber:'Cybersecurity education collaboration'},
      security:{loading:'Preparing the secure contact form…',required:'Please complete the security check before sending.',unavailable:'The security check is temporarily unavailable. Please try again shortly.',rateLimited:'Too many attempts. Please wait a few minutes and try again.',generic:'The message could not be sent. Please try again later.'}
    },
    da: {
      trainingHref:'/da/kurser-foredrag/', trainingLabel:'Kurser & foredrag', resourcesHref:'/da/ressourcer/', resources:'Ressourcer', snapshot:'Overblik',
      responsible:'Ansvarlig AI', responsibleTitle:'Menneskecentreret, etisk og standardsorienteret.', responsibleText:'Vi forbinder AI-sikkerhed og governance med fairness, tilgængelighed, transparens og menneskeligt tilsyn — inspireret af EU AI Act samt principperne i ISO/IEC 42001 og ISO/IEC 27001.', responsibleCta:'Se vores metode →', responsibleHref:'/da/metode/',
      euTitle:'100% europæisk service', euMeta:'Europæiske værdier · Europæisk levering', euText:'Privatlivsbevidst AI-governance, sikkerhed, automatisering og træning for organisationer i EU og resten af Europa.',
      servicesTitle:'Fire måder at flytte AI sikkert fremad', trainingCard:'AI-kurser & foredrag', trainingText:'Rollebaserede workshops og foredrag, der styrker praktisk AI-literacy, ansvarlig brug og sikkerhedsbevidsthed.', trainingLink:'Se kurser →',
      trust:[['Tillid','Transparent og pålidelig levering'],['Klarhed','Tydelige strategier og resultater'],['Sikkerhed','Secure-by-design tilgang'],['Kvalitet','Testet og dokumenteret arbejde'],['Europæisk','EU-fokuseret og privatlivsbevidst']],
      ecosystem:{platforms:'Platforme vi arbejder med',collaborations:'Dokumenterede samarbejder',official:'Åbn officiel hjemmeside',diplomacy:'Samarbejde om digitalt diplomati',cyber:'Samarbejde om cybersikkerhedsuddannelse'},
      security:{loading:'Forbereder den sikre kontaktformular…',required:'Gennemfør sikkerhedskontrollen, før du sender.',unavailable:'Sikkerhedskontrollen er midlertidigt utilgængelig. Prøv igen om lidt.',rateLimited:'For mange forsøg. Vent nogle minutter og prøv igen.',generic:'Beskeden kunne ikke sendes. Prøv igen senere.'}
    },
    sv: {
      trainingHref:'/sv/utbildning-forelasningar/', trainingLabel:'Utbildning & föreläsningar', resourcesHref:'/sv/resurser/', resources:'Resurser', snapshot:'Översikt',
      responsible:'Ansvarsfull AI', responsibleTitle:'Människocentrerat, etiskt och standardbaserat.', responsibleText:'Vi förenar AI-säkerhet och styrning med rättvisa, tillgänglighet, transparens och mänsklig tillsyn — med stöd i EU AI Act samt principerna i ISO/IEC 42001 och ISO/IEC 27001.', responsibleCta:'Se vår metod →', responsibleHref:'/sv/metod/',
      euTitle:'100% europeisk service', euMeta:'Europeiska värderingar · Europeisk leverans', euText:'Integritetsmedveten AI-styrning, säkerhet, automatisering och utbildning för organisationer i EU och övriga Europa.',
      servicesTitle:'Fyra sätt att föra AI framåt på ett säkert sätt', trainingCard:'AI-utbildning & föreläsningar', trainingText:'Rollbaserade workshops och föreläsningar som stärker praktisk AI-kunnighet, ansvarsfull användning och säkerhetsmedvetenhet.', trainingLink:'Se utbildning →',
      trust:[['Tillit','Transparent och tillförlitlig leverans'],['Tydlighet','Tydliga strategier och resultat'],['Säkerhet','Secure-by-design perspektiv'],['Kvalitet','Testat och dokumenterat arbete'],['Europeiskt','EU-fokuserat och integritetsmedvetet']],
      ecosystem:{platforms:'Plattformar vi arbetar med',collaborations:'Dokumenterade samarbeten',official:'Öppna officiell webbplats',diplomacy:'Samarbete inom digital diplomati',cyber:'Samarbete inom cybersäkerhetsutbildning'},
      security:{loading:'Förbereder det säkra kontaktformuläret…',required:'Slutför säkerhetskontrollen innan du skickar.',unavailable:'Säkerhetskontrollen är tillfälligt otillgänglig. Försök igen om en stund.',rateLimited:'För många försök. Vänta några minuter och försök igen.',generic:'Meddelandet kunde inte skickas. Försök igen senare.'}
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
      ['openai','OpenAI','https://openai.com/','/assets/brands/openai.svg'],
      ['azure','Microsoft Azure','https://azure.microsoft.com/','/assets/brands/azure.svg'],
      ['gemini','Google Gemini','https://gemini.google.com/','/assets/brands/gemini.svg'],
      ['github','GitHub','https://github.com/','/assets/brands/github.svg'],
      ['shopify','Shopify','https://www.shopify.com/','/assets/brands/shopify.svg'],
      ['aws','Amazon Web Services (AWS)','https://aws.amazon.com/','/assets/brands/aws.svg']
    ];
    const collaborations = [
      ['mfa','Ministry of Foreign Affairs of Denmark','https://um.dk/en/','/assets/brands/denmark-mfa.svg',c.diplomacy],
      ['eccouncil','EC-Council','https://www.eccouncil.org/','/assets/brands/ec-council.svg',c.cyber]
    ];
    const card = (item,type) => `<a class="brand-link-card ${type}-card brand-${item[0]}" href="${item[2]}" target="_blank" rel="noopener noreferrer external" aria-label="${item[1]} — ${c.official}"><span class="brand-logo-surface"><img src="${item[3]}" alt="${item[1]} logo" loading="lazy" decoding="async"></span><span class="brand-link-copy"><strong>${item[1]}</strong>${item[4] ? `<small>${item[4]}</small>` : ''}</span><span class="external-mark" aria-hidden="true">↗</span></a>`;
    ecosystemRoot.className = 'ecosystem-groups';
    ecosystemRoot.innerHTML = `<section class="ecosystem-group"><h3 class="ecosystem-group-title">${c.platforms}</h3><div class="brand-link-grid platform-grid">${platforms.map(x=>card(x,'platform')).join('')}</div></section><section class="ecosystem-group"><h3 class="ecosystem-group-title">${c.collaborations}</h3><div class="brand-link-grid collaboration-grid">${collaborations.map(x=>card(x,'collaboration')).join('')}</div></section>`;
    ecosystemRoot.querySelectorAll('img').forEach(img => img.addEventListener('error',()=>{ img.hidden=true; img.closest('.brand-link-card')?.classList.add('logo-failed'); }));
  }

  toggle?.addEventListener('click',()=>{
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded',String(!open));
    nav?.classList.toggle('open',!open);
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));

  const form = document.querySelector('[data-contact-form]');
  const status = form?.querySelector('[data-form-status]');
  const submitButton = form?.querySelector('[type="submit"]');
  const started = form?.querySelector('[name="startedAt"]');
  let turnstileWidgetId = null;
  let turnstileToken = '';
  let turnstileScriptPromise = null;
  let turnstileConfigPromise = null;

  const setStatus = (message, kind = '') => {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status${kind ? ` ${kind}` : ''}`;
  };

  const loadTurnstileScript = () => {
    if (window.turnstile) return Promise.resolve();
    if (turnstileScriptPromise) return turnstileScriptPromise;
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-sundai-turnstile]');
      if (existing) {
        existing.addEventListener('load', resolve, { once:true });
        existing.addEventListener('error', reject, { once:true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.referrerPolicy = 'no-referrer';
      script.dataset.sundaiTurnstile = 'true';
      script.addEventListener('load', resolve, { once:true });
      script.addEventListener('error', reject, { once:true });
      document.head.appendChild(script);
    });
    return turnstileScriptPromise;
  };

  const getTurnstileConfig = () => {
    if (turnstileConfigPromise) return turnstileConfigPromise;
    turnstileConfigPromise = fetch('/api/contact', { headers:{ accept:'application/json' }, cache:'no-store' })
      .then(response => response.ok ? response.json() : { enabled:false })
      .catch(() => ({ enabled:false }));
    return turnstileConfigPromise;
  };

  const prepareTurnstile = async () => {
    if (!form || form.dataset.turnstilePrepared === 'true') return;
    form.dataset.turnstilePrepared = 'pending';
    const turnstileConfig = await getTurnstileConfig();
    if (!turnstileConfig.enabled || !turnstileConfig.siteKey) {
      form.dataset.turnstilePrepared = 'true';
      form.dataset.turnstileEnabled = 'false';
      return;
    }

    setStatus(config?.security.loading || 'Preparing the secure contact form…');
    let hidden = form.querySelector('input[name="turnstileToken"]');
    if (!hidden) {
      hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = 'turnstileToken';
      form.appendChild(hidden);
    }
    let slot = form.querySelector('.turnstile-slot');
    if (!slot) {
      slot = document.createElement('div');
      slot.className = 'turnstile-slot full';
      slot.setAttribute('aria-label','Security verification');
      submitButton?.insertAdjacentElement('beforebegin', slot);
    }

    try {
      await loadTurnstileScript();
      turnstileWidgetId = window.turnstile.render(slot, {
        sitekey: turnstileConfig.siteKey,
        action: 'contact',
        theme: 'light',
        language: lang === 'da' ? 'da' : lang === 'sv' ? 'sv-SE' : 'en',
        appearance: 'interaction-only',
        size: 'flexible',
        callback: (token) => { turnstileToken = token; hidden.value = token; setStatus(''); },
        'expired-callback': () => { turnstileToken = ''; hidden.value = ''; },
        'error-callback': () => { turnstileToken = ''; hidden.value = ''; setStatus(config?.security.unavailable || 'Security check unavailable.', 'error'); }
      });
      form.dataset.turnstilePrepared = 'true';
      form.dataset.turnstileEnabled = 'true';
    } catch {
      form.dataset.turnstilePrepared = 'false';
      form.dataset.turnstileEnabled = 'error';
      setStatus(config?.security.unavailable || 'Security check unavailable.', 'error');
    }
  };

  const openContact = () => {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
    if (started) started.value = String(Date.now());
    dialog?.showModal?.();
    prepareTurnstile();
  };

  document.querySelectorAll('[data-open-contact]').forEach(button=>button.addEventListener('click',openContact));
  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  document.querySelectorAll('[data-year]').forEach(x=>x.textContent=String(new Date().getFullYear()));

  if (form) {
    form.addEventListener('focusin', prepareTurnstile, { once:true });
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      if(!form.reportValidity()) return;
      if (form.dataset.turnstileEnabled === 'true' && !turnstileToken) {
        setStatus(config?.security.required || 'Complete the security check before sending.', 'error');
        await prepareTurnstile();
        return;
      }

      submitButton.disabled=true;
      submitButton.setAttribute('aria-busy','true');
      setStatus('');
      const controller = new AbortController();
      const timer = setTimeout(()=>controller.abort(),12_000);
      try {
        const response=await fetch('/api/contact',{
          method:'POST',
          headers:{'content-type':'application/json',accept:'application/json'},
          body:JSON.stringify(Object.fromEntries(new FormData(form).entries())),
          signal:controller.signal
        });
        const result = await response.json().catch(()=>({}));
        if(!response.ok) {
          if (response.status === 429 || result.code === 'rate_limited') throw new Error('rate_limited');
          if (String(result.code || '').startsWith('turnstile_')) throw new Error('turnstile');
          throw new Error('generic');
        }
        setStatus(form.dataset.success||'Thank you — your enquiry has been sent.','success');
        form.reset();
        turnstileToken='';
        if(started) started.value=String(Date.now());
        if(window.turnstile && turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);
      } catch (error) {
        if(error.message === 'rate_limited') setStatus(config?.security.rateLimited || 'Too many attempts. Please try again later.','error');
        else if(error.message === 'turnstile') setStatus(config?.security.required || 'Complete the security check before sending.','error');
        else setStatus(config?.security.generic || form.dataset.error || 'The message could not be sent. Please try again later.','error');
      } finally {
        clearTimeout(timer);
        submitButton.disabled=false;
        submitButton.removeAttribute('aria-busy');
      }
    });
  }
})();
