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
  loadStylesheet('/assets/ecosystem.css?v=20260723b');
  loadStylesheet('/assets/responsive.css?v=20260723b');
  loadStylesheet('/assets/market-redesign.css?v=20260723a');

  const copy = {
    en: {
      skip:'Skip to content',menu:'Menu',
      title:'Secure AI adoption, governance and automation for organisations',
      meta:'SundAI helps organisations adopt AI securely with EU AI Act readiness, AI governance, security assessments, automation and practical implementation.',
      heroKicker:'AI ADOPTION • GOVERNANCE • SECURITY',
      heroTitle:'Move AI from experimentation to <span>controlled business value.</span>',
      heroText:'SundAI helps organisations choose the right AI use cases, put governance and security around them, and turn promising pilots into practical workflows that people can trust.',
      primary:'Book a focused AI call',secondary:'See the service packages',
      proof:['EU AI Act readiness','AI governance','Secure adoption','Responsible automation'],
      numbers:[['3','clear service packages'],['2–4 weeks','to a governance baseline'],['EN · DA · SV','Nordic multilingual delivery']],
      numberIntro:'Clear scope. Practical outputs. No generic AI transformation programme.',
      flagshipEyebrow:'Flagship services',flagshipTitle:'Start with the business problem — leave with a usable control system',flagshipIntro:'The strongest demand is for practical governance, secure adoption and risk reduction. Each engagement is designed around a decision, a deliverable and a next step.',
      packages:[
        {tag:'Governance',title:'AI Governance & EU AI Act Readiness',text:'Create a defensible overview of how AI is used, who owns it and which controls are required before regulation or incidents force the issue.',items:['AI use-case and system inventory','Risk classification and accountability map','AI policy and minimum control baseline','EU AI Act readiness roadmap'],img:'/assets/visual-governance.svg'},
        {tag:'Adoption',title:'Secure AI Adoption & Automation',text:'Prioritise high-value use cases and move one selected workflow from idea to a controlled pilot with human oversight and measurable value.',items:['Use-case prioritisation and business case','Data, vendor and architecture review','Human approval and fallback design','Pilot plan with success metrics'],img:'/assets/visual-adoption.svg'},
        {tag:'Security',title:'AI Security Assessment',text:'Identify the practical security weaknesses around AI tools, assistants and agentic workflows before data exposure or access failures become incidents.',items:['Threat model and attack-surface review','Prompt injection and data leakage analysis','Identity, access and third-party review','Prioritised remediation plan'],img:'/assets/visual-security.svg'}
      ],
      support:[['AI literacy workshops','Role-based training for leadership, staff and technical teams.'],['Fractional AI governance advisor','Ongoing support for policies, reviews, vendors and internal decisions.'],['Secure assistant prototypes','Focused RAG or workflow assistants with traceability and human control.']],
      whyEyebrow:'Why organisations act now',whyTitle:'AI use is growing faster than the controls around it',whyText:'Adoption is already happening inside teams. The commercial opportunity is to make it useful and repeatable without losing oversight, trust or security.',
      why:[['AI has moved into daily work','Enterprise usage is accelerating and becoming part of repeatable workflows.'],['Governance is becoming operational','AI governance is no longer a policy document; it spans legal, security, procurement, HR and business ownership.'],['EU enforcement is approaching','Transparency, literacy and governance obligations are progressively becoming enforceable across Europe.'],['Security gaps are widening','AI use in cybersecurity and business workflows is rising faster than supporting governance structures.']],
      servicesTitle:'Practical services that solve the next decision',servicesIntro:'Choose a focused engagement or combine modules into a larger implementation.',
      services:[['AI governance baseline','Inventory, roles, policy, risk register and control roadmap.'],['EU AI Act readiness','Applicability review, documentation priorities and transparency planning.'],['AI security review','Threat modelling, data exposure, access control and vendor risk.'],['AI adoption roadmap','Use-case selection, value case, ownership and implementation sequence.'],['Automation & assistants','Human-centred workflows, RAG assistants and controlled automation.'],['Workshops & enablement','Executive decisions, AI literacy and practical team guidance.']],
      approachTitle:'A small, controlled first step — then scale what works',approachText:'We begin with the decision and evidence you need now, build the minimum useful control layer, and expand only where value is demonstrated.',
      projectsTitle:'Evidence of practical delivery',projectsText:'SundAI combines editorial systems, education, secure assistant design and multilingual implementation.',
      aboutTitle:'A bridge between technology, risk and people',aboutText:'SundAI is an AI security and governance advisory studio operated by Riimon Holdings LTD. The work combines cybersecurity, AI governance, organisational risk, business development and a human-centred background in social services.',
      contactTitle:'Describe the AI decision you need to make',contactText:'Share the use case, risk or workflow that is currently unclear. You will receive a focused response on scope, likely outputs and the most sensible first step.',
      badge:'European service',ecoTitle:'European delivery. Global technology ecosystem.',ecoIntro:'SundAI delivers from Europe with a Nordic perspective, combining responsible AI, cybersecurity and practical business implementation across leading platforms.',platforms:'Technology ecosystem',partners:'Collaboration experience',partnerIntro:'Relevant work relationships supporting international business, cybersecurity and professional education.',mfa:'Ministry of Foreign Affairs of Denmark',mfaDesc:'Collaboration experience through Danish international business and innovation activities.',ec:'EC-Council',ecDesc:'Collaboration experience in cybersecurity education, certification and professional development.',repos:'public repositories',disciplines:'specialist domains',languages:'website languages',github:'View verified GitHub work',note:'Technology names identify platforms used in our work. All trademarks belong to their respective owners. Inclusion does not imply endorsement.'
    },
    da: {
      skip:'Spring til indhold',menu:'Menu',
      title:'Sikker AI-implementering, governance og automatisering for organisationer',
      meta:'SundAI hjælper organisationer med sikker AI-implementering, EU AI Act-parathed, AI-governance, sikkerhedsvurderinger og praktisk automatisering.',
      heroKicker:'AI-IMPLEMENTERING • GOVERNANCE • SIKKERHED',
      heroTitle:'Gå fra AI-eksperimenter til <span>kontrolleret forretningsværdi.</span>',
      heroText:'SundAI hjælper organisationer med at vælge de rigtige AI-use cases, etablere governance og sikkerhed omkring dem og omsætte lovende piloter til praktiske arbejdsgange, som mennesker kan have tillid til.',
      primary:'Book en fokuseret AI-samtale',secondary:'Se servicepakkerne',
      proof:['EU AI Act-parathed','AI-governance','Sikker implementering','Ansvarlig automatisering'],
      numbers:[['3','tydelige servicepakker'],['2–4 uger','til et governance-grundlag'],['EN · DA · SV','nordisk flersproget levering']],numberIntro:'Tydeligt scope. Praktiske leverancer. Ingen generisk AI-transformationsplan.',
      flagshipEyebrow:'Kerneservices',flagshipTitle:'Start med forretningsproblemet — afslut med et anvendeligt kontrolsystem',flagshipIntro:'Den største efterspørgsel er efter praktisk governance, sikker implementering og risikoreduktion. Hvert forløb bygges omkring en beslutning, en leverance og et næste skridt.',
      packages:[
        {tag:'Governance',title:'AI-governance & EU AI Act-parathed',text:'Skab et dokumenterbart overblik over hvordan AI bruges, hvem der ejer det, og hvilke kontroller der er nødvendige.',items:['Kortlægning af AI-systemer og use cases','Risikoklassifikation og ansvarsfordeling','AI-politik og minimumskontroller','Roadmap for EU AI Act-parathed'],img:'/assets/visual-governance.svg'},
        {tag:'Implementering',title:'Sikker AI-implementering & automatisering',text:'Prioritér værdifulde use cases og bring én valgt arbejdsgang fra idé til kontrolleret pilot med menneskeligt tilsyn.',items:['Prioritering og business case','Data-, leverandør- og arkitekturgennemgang','Godkendelser og sikre fallback-løsninger','Pilotplan og succeskriterier'],img:'/assets/visual-adoption.svg'},
        {tag:'Sikkerhed',title:'AI-sikkerhedsvurdering',text:'Identificér svagheder omkring AI-værktøjer, assistenter og agentiske arbejdsgange før de bliver til data- eller adgangshændelser.',items:['Trusselsmodel og angrebsflade','Prompt injection og datalækage','Identitet, adgang og tredjepartsrisiko','Prioriteret afhjælpningsplan'],img:'/assets/visual-security.svg'}
      ],
      support:[['AI-literacy workshops','Rollebaseret træning for ledelse, medarbejdere og tekniske teams.'],['Fraktioneret AI-governance-rådgiver','Løbende støtte til politikker, reviews, leverandører og beslutninger.'],['Sikre assistentprototyper','Fokuserede RAG- eller workflow-assistenter med sporbarhed og menneskelig kontrol.']],
      whyEyebrow:'Hvorfor organisationer handler nu',whyTitle:'AI-brugen vokser hurtigere end kontrollerne omkring den',whyText:'Implementeringen sker allerede i teams. Muligheden er at gøre den nyttig og gentagelig uden at miste overblik, tillid eller sikkerhed.',
      why:[['AI er blevet en del af hverdagen','Virksomhedsbrug vokser og bliver en del af gentagelige arbejdsgange.'],['Governance bliver operationel','AI-governance omfatter nu jura, sikkerhed, indkøb, HR og forretningsejerskab.'],['EU-håndhævelse nærmer sig','Krav om transparens, AI-literacy og governance bliver gradvist håndhævelige.'],['Sikkerhedsgabet vokser','AI-brug stiger hurtigere end de governance- og sikkerhedsstrukturer, der skal understøtte den.']],
      servicesTitle:'Praktiske services til den næste beslutning',servicesIntro:'Vælg et fokuseret forløb eller kombiner moduler til en større implementering.',
      services:[['AI-governance-grundlag','Kortlægning, roller, politik, risikoregister og kontrolroadmap.'],['EU AI Act-parathed','Anvendelighed, dokumentationsprioriteter og transparensplan.'],['AI-sikkerhedsreview','Trusselsmodellering, dataeksponering, adgang og leverandørrisiko.'],['AI-implementeringsroadmap','Use cases, værdi, ejerskab og implementeringsrækkefølge.'],['Automatisering & assistenter','Menneskecentrerede workflows, RAG og kontrolleret automatisering.'],['Workshops & kompetenceløft','Ledelsesbeslutninger, AI-literacy og praktisk teamvejledning.']],
      approachTitle:'Et lille, kontrolleret første skridt — skalér derefter det, der virker',approachText:'Vi starter med den beslutning og dokumentation, I har brug for nu, bygger det mindst nødvendige kontrollag og udvider kun, hvor værdien kan dokumenteres.',projectsTitle:'Dokumentation for praktisk levering',projectsText:'SundAI kombinerer redaktionelle systemer, undervisning, sikker assistentdesign og flersproget implementering.',aboutTitle:'En bro mellem teknologi, risiko og mennesker',aboutText:'SundAI er et rådgivningsstudio inden for AI-sikkerhed og governance drevet af Riimon Holdings LTD. Arbejdet kombinerer cybersikkerhed, AI-governance, organisatorisk risiko, forretningsudvikling og en menneskecentreret baggrund i socialt arbejde.',contactTitle:'Beskriv den AI-beslutning, I skal træffe',contactText:'Del den use case, risiko eller arbejdsgang, som er uklar. I modtager et fokuseret svar om scope, sandsynlige leverancer og det mest fornuftige første skridt.',
      badge:'Europæisk service',ecoTitle:'Europæisk levering. Globalt teknologiøkosystem.',ecoIntro:'SundAI leverer fra Europa med et nordisk perspektiv og kombinerer ansvarlig AI, cybersikkerhed og praktisk forretningsimplementering.',platforms:'Teknologiøkosystem',partners:'Samarbejdserfaring',partnerIntro:'Relevante arbejdsrelationer inden for international forretning, cybersikkerhed og professionel uddannelse.',mfa:'Udenrigsministeriet',mfaDesc:'Samarbejdserfaring gennem danske internationale erhvervs- og innovationsaktiviteter.',ec:'EC-Council',ecDesc:'Samarbejdserfaring inden for cybersikkerhedsuddannelse og faglig udvikling.',repos:'offentlige repositories',disciplines:'specialistområder',languages:'sprog på hjemmesiden',github:'Se verificeret GitHub-arbejde',note:'Teknologinavne identificerer platforme, vi arbejder med. Alle varemærker tilhører deres respektive ejere.'
    },
    sv: {
      skip:'Hoppa till innehållet',menu:'Meny',title:'Säker AI-implementering, styrning och automatisering för organisationer',meta:'SundAI hjälper organisationer med säker AI-implementering, EU AI Act-beredskap, AI-styrning, säkerhetsbedömningar och praktisk automatisering.',heroKicker:'AI-IMPLEMENTERING • STYRNING • SÄKERHET',heroTitle:'Gå från AI-experiment till <span>kontrollerat affärsvärde.</span>',heroText:'SundAI hjälper organisationer att välja rätt AI-användningsfall, bygga styrning och säkerhet runt dem och omvandla lovande piloter till praktiska arbetsflöden som människor kan lita på.',primary:'Boka ett fokuserat AI-samtal',secondary:'Se tjänstepaketen',proof:['EU AI Act-beredskap','AI-styrning','Säker implementering','Ansvarsfull automatisering'],numbers:[['3','tydliga tjänstepaket'],['2–4 veckor','till en styrningsbaslinje'],['EN · DA · SV','nordisk flerspråkig leverans']],numberIntro:'Tydlig omfattning. Praktiska leveranser. Inget generiskt AI-transformationsprogram.',flagshipEyebrow:'Kärntjänster',flagshipTitle:'Börja med affärsproblemet — lämna med ett användbart kontrollsystem',flagshipIntro:'Den starkaste efterfrågan gäller praktisk styrning, säker implementering och riskreduktion. Varje uppdrag byggs kring ett beslut, en leverans och ett nästa steg.',packages:[{tag:'Styrning',title:'AI-styrning & EU AI Act-beredskap',text:'Skapa en dokumenterbar överblick över hur AI används, vem som äger den och vilka kontroller som krävs.',items:['Inventering av AI-system och användningsfall','Riskklassificering och ansvarskarta','AI-policy och miniminivå för kontroller','Färdplan för EU AI Act-beredskap'],img:'/assets/visual-governance.svg'},{tag:'Implementering',title:'Säker AI-implementering & automatisering',text:'Prioritera värdefulla användningsfall och för ett valt arbetsflöde från idé till kontrollerad pilot med mänsklig tillsyn.',items:['Prioritering och affärsnytta','Data-, leverantörs- och arkitekturgranskning','Godkännanden och säkra reservvägar','Pilotplan och framgångsmått'],img:'/assets/visual-adoption.svg'},{tag:'Säkerhet',title:'AI-säkerhetsbedömning',text:'Identifiera svagheter runt AI-verktyg, assistenter och agentiska arbetsflöden innan de blir data- eller åtkomstincidenter.',items:['Hotmodell och attackyta','Prompt injection och dataläckage','Identitet, åtkomst och tredjepartsrisk','Prioriterad åtgärdsplan'],img:'/assets/visual-security.svg'}],support:[['AI literacy-workshops','Rollbaserad utbildning för ledning, personal och tekniska team.'],['Fraktionerad AI-styrningsrådgivare','Löpande stöd för policyer, granskningar, leverantörer och beslut.'],['Säkra assistentprototyper','Fokuserade RAG- eller arbetsflödesassistenter med spårbarhet och mänsklig kontroll.']],whyEyebrow:'Varför organisationer agerar nu',whyTitle:'AI-användningen växer snabbare än kontrollerna runt den',whyText:'Implementeringen sker redan i team. Möjligheten är att göra den nyttig och repeterbar utan att förlora överblick, tillit eller säkerhet.',why:[['AI har flyttat in i det dagliga arbetet','Företagsanvändningen växer och blir en del av återkommande arbetsflöden.'],['Styrning blir operativ','AI-styrning omfattar juridik, säkerhet, inköp, HR och affärsansvar.'],['EU-tillsynen närmar sig','Krav på transparens, AI-kunnighet och styrning blir gradvis verkställbara.'],['Säkerhetsgapet växer','AI-användningen ökar snabbare än stödjande styrnings- och säkerhetsstrukturer.']],servicesTitle:'Praktiska tjänster för nästa beslut',servicesIntro:'Välj ett fokuserat uppdrag eller kombinera moduler till en större implementering.',services:[['Baslinje för AI-styrning','Inventering, roller, policy, riskregister och kontrollfärdplan.'],['EU AI Act-beredskap','Tillämplighet, dokumentationsprioriteringar och transparensplan.'],['AI-säkerhetsgranskning','Hotmodellering, dataexponering, åtkomst och leverantörsrisk.'],['Färdplan för AI-implementering','Användningsfall, värde, ägarskap och implementeringsordning.'],['Automatisering & assistenter','Människocentrerade arbetsflöden, RAG och kontrollerad automatisering.'],['Workshops & kompetenslyft','Ledningsbeslut, AI-kunnighet och praktisk teamvägledning.']],approachTitle:'Ett litet, kontrollerat första steg — skala sedan det som fungerar',approachText:'Vi börjar med beslutet och underlaget ni behöver nu, bygger minsta användbara kontrollager och expanderar endast där värdet kan visas.',projectsTitle:'Bevis på praktisk leverans',projectsText:'SundAI kombinerar redaktionella system, utbildning, säker assistentdesign och flerspråkig implementering.',aboutTitle:'En bro mellan teknik, risk och människor',aboutText:'SundAI är en rådgivningsstudio inom AI-säkerhet och styrning som drivs av Riimon Holdings LTD. Arbetet kombinerar cybersäkerhet, AI-styrning, organisatorisk risk, affärsutveckling och en människocentrerad bakgrund inom socialt arbete.',contactTitle:'Beskriv AI-beslutet ni behöver fatta',contactText:'Dela användningsfallet, risken eller arbetsflödet som är oklart. Ni får ett fokuserat svar om omfattning, troliga leveranser och det mest rimliga första steget.',badge:'Europeisk tjänst',ecoTitle:'Europeisk leverans. Globalt teknikekosystem.',ecoIntro:'SundAI levererar från Europa med ett nordiskt perspektiv och kombinerar ansvarsfull AI, cybersäkerhet och praktisk affärsimplementering.',platforms:'Teknikekosystem',partners:'Samarbetserfarenhet',partnerIntro:'Relevanta arbetsrelationer inom internationella affärer, cybersäkerhet och professionell utbildning.',mfa:'Danmarks utrikesministerium',mfaDesc:'Samarbetserfarenhet genom danska internationella affärs- och innovationsaktiviteter.',ec:'EC-Council',ecDesc:'Samarbetserfarenhet inom cybersäkerhetsutbildning och professionell utveckling.',repos:'offentliga repositories',disciplines:'specialistområden',languages:'språk på webbplatsen',github:'Se verifierat GitHub-arbete',note:'Tekniknamn identifierar plattformar som används i vårt arbete. Alla varumärken tillhör respektive ägare.'
    }
  }[language] || null;
  if (!copy) return;

  document.title = copy.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = copy.meta;
  const skip = document.querySelector('.skip-link'); if (skip) skip.textContent = copy.skip;
  const menuText = document.querySelector('.nav-toggle .sr-only'); if (menuText) menuText.textContent = copy.menu;

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  setHeader(); window.addEventListener('scroll', setHeader, { passive:true });
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); nav?.classList.toggle('open', !open); document.body.classList.toggle('nav-open', !open); });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); document.body.classList.remove('nav-open'); }));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav?.classList.contains('open')) { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); document.body.classList.remove('nav-open'); toggle?.focus(); } });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.querySelector('.eyebrow').textContent = copy.heroKicker;
    hero.querySelector('h1').innerHTML = copy.heroTitle;
    hero.querySelector('.hero-text').textContent = copy.heroText;
    const heroButtons = hero.querySelectorAll('.hero-actions .button');
    if (heroButtons[0]) heroButtons[0].textContent = copy.primary;
    if (heroButtons[1]) { heroButtons[1].textContent = copy.secondary; heroButtons[1].setAttribute('href','#flagship-services'); }
    hero.querySelectorAll('.proof-row span').forEach((el,i) => { if (copy.proof[i]) el.textContent = copy.proof[i]; });
  }

  const serviceHeading = document.querySelector('#services .section-heading');
  if (serviceHeading) { serviceHeading.querySelector('h2').textContent = copy.servicesTitle; serviceHeading.querySelector('p:last-child').textContent = copy.servicesIntro; }
  const serviceCards = document.querySelectorAll('#services .service-card');
  copy.services.forEach((item,i) => {
    let card = serviceCards[i];
    if (!card && serviceCards[0]?.parentElement) { card = document.createElement('article'); card.className='service-card'; card.innerHTML=`<div class="card-number">0${i+1}</div><h3></h3><p></p>`; serviceCards[0].parentElement.appendChild(card); }
    if (card) { card.querySelector('.card-number').textContent=String(i+1).padStart(2,'0'); card.querySelector('h3').textContent=item[0]; card.querySelector('p').textContent=item[1]; }
  });

  const approachHeading = document.querySelector('#approach .section-heading');
  if (approachHeading) { approachHeading.querySelector('h2').textContent=copy.approachTitle; approachHeading.querySelector('p:last-child').textContent=copy.approachText; }
  const projectHeading = document.querySelector('#projects .section-heading');
  if (projectHeading) { projectHeading.querySelector('h2').textContent=copy.projectsTitle; projectHeading.querySelector('p:last-child').textContent=copy.projectsText; }
  const about = document.querySelector('#about');
  if (about) { about.querySelector('h2').textContent=copy.aboutTitle; about.querySelector('.large-copy').textContent=copy.aboutText; }
  const contact = document.querySelector('#contact');
  if (contact) { contact.querySelector('h2').textContent=copy.contactTitle; contact.querySelector('.large-copy').textContent=copy.contactText; }

  const platform = (mark,name,extra='') => `<div class="tech-logo ${extra}"><span class="brand-symbol" aria-hidden="true">${mark}</span><span>${name}</span></div>`;
  let ecosystem = document.querySelector('.ecosystem');
  if (hero && !ecosystem) {
    ecosystem = document.createElement('section'); ecosystem.className='ecosystem'; ecosystem.setAttribute('aria-labelledby','ecosystem-title');
    ecosystem.innerHTML=`<div class="container"><div class="ecosystem-head"><div><div class="eu-service"><img src="/assets/eu-flag.svg" alt="European Union flag"><span>${copy.badge}</span></div><h2 id="ecosystem-title">${copy.ecoTitle}</h2><p>${copy.ecoIntro}</p></div><div class="platform-label"><p class="eyebrow">${copy.platforms}</p></div></div><div class="tech-grid" aria-label="${copy.platforms}"><div class="tech-logo eu"><img src="/assets/eu-flag.svg" alt=""><span>European Union</span></div>${platform('S','Shopify','shopify')}${platform('a→z','Amazon','amazon')}${platform('A','Microsoft Azure','azure')}${platform('<i></i><i></i><i></i><i></i>','Microsoft','microsoft')}${platform('✦','Google Gemini','gemini')}${platform('GH','GitHub','github')}${platform('AI','OpenAI','openai')}</div><div class="partner-strip"><div class="partner-strip-head"><h3>${copy.partners}</h3><p>${copy.partnerIntro}</p></div><div class="partner-grid"><div class="partner-card"><div class="partner-logo dk" aria-hidden="true">DK</div><div><strong>${copy.mfa}</strong><span>${copy.mfaDesc}</span></div></div><div class="partner-card"><div class="partner-logo ec" aria-hidden="true">EC<br>COUNCIL</div><div><strong>${copy.ec}</strong><span>${copy.ecDesc}</span></div></div></div></div><div class="github-proof"><div><b>15</b><span>${copy.repos}</span></div><div><b>5+</b><span>${copy.disciplines}: AI security, cloud, DevSecOps, RAG, governance</span></div><div><b>3</b><span>${copy.languages}: EN, DA, SV</span></div></div><a class="button secondary" href="https://github.com/Popoo2020" rel="noopener noreferrer">${copy.github} →</a><p class="ecosystem-note">${copy.note}</p></div>`;
    hero.insertAdjacentElement('afterend',ecosystem);
  }

  if (hero && !document.querySelector('.market-proof')) {
    const section=document.createElement('section'); section.className='section market-proof';
    section.innerHTML=`<div class="container"><div class="section-heading"><p class="eyebrow">SundAI</p><h2>${copy.numberIntro}</h2></div><div class="market-proof-grid">${copy.numbers.map(n=>`<div class="market-proof-item"><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></div>`;
    (ecosystem || hero).insertAdjacentElement('afterend',section);
  }

  const servicesSection=document.querySelector('#services');
  if (servicesSection && !document.querySelector('#flagship-services')) {
    const section=document.createElement('section'); section.id='flagship-services'; section.className='section flagship';
    section.innerHTML=`<div class="container"><div class="section-heading"><p class="eyebrow">${copy.flagshipEyebrow}</p><h2>${copy.flagshipTitle}</h2><p>${copy.flagshipIntro}</p></div><div class="flagship-grid">${copy.packages.map(p=>`<article class="flagship-card"><div class="flagship-visual"><img src="${p.img}" alt=""></div><div class="flagship-copy"><span class="flagship-tag">${p.tag}</span><h3>${p.title}</h3><p>${p.text}</p><ul class="deliverables">${p.items.map(i=>`<li>${i}</li>`).join('')}</ul></div></article>`).join('')}</div><div class="supporting-services">${copy.support.map(s=>`<div class="supporting-service"><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join('')}</div></div>`;
    servicesSection.insertAdjacentElement('beforebegin',section);
  }

  if (servicesSection && !document.querySelector('.why-now')) {
    const section=document.createElement('section'); section.className='section why-now';
    section.innerHTML=`<div class="container why-now-grid"><div><p class="eyebrow">${copy.whyEyebrow}</p><h2>${copy.whyTitle}</h2><p class="large-copy">${copy.whyText}</p></div><div class="why-now-list">${copy.why.map(i=>`<div class="why-now-item"><b>${i[0]}</b><span>${i[1]}</span></div>`).join('')}</div></div>`;
    servicesSection.insertAdjacentElement('afterend',section);
  }

  const form=document.querySelector('[data-contact-form]');
  if (!form) return;
  const startedAt=form.querySelector('input[name="startedAt"]'); if (startedAt) startedAt.value=String(Date.now());
  form.addEventListener('submit',async(event)=>{event.preventDefault();const status=form.querySelector('[data-form-status]');const button=form.querySelector('button[type="submit"]');if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form).entries());button.disabled=true;button.setAttribute('aria-busy','true');status.textContent='';status.className='form-status';try{const response=await fetch('/api/contact',{method:'POST',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify(data)});if(!response.ok)throw new Error('Request failed');status.textContent=form.dataset.success;status.classList.add('success');form.reset();if(startedAt)startedAt.value=String(Date.now());}catch{status.textContent=form.dataset.error;status.classList.add('error');}finally{button.disabled=false;button.removeAttribute('aria-busy');}});
})();