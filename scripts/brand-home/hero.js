/* Product chapter selector and self-contained demonstrations. */
(() => {
  const art = document.getElementById('sd-hero-art');
  const controls = document.getElementById('sd-hero-pills');
  if (!art || !controls || controls.dataset.mounted) return;
  controls.dataset.mounted = 'true';
  const words = {
    en:{
      pills:['AI for Schools','AI Governance','Private AI Assistants'], group:'Choose a demonstration', pause:'Pause automatic rotation', play:'Play automatic rotation',
      schoolTitle:'Outside the frame', question:'Is this balloon alone in the sky?', answer:'There’s a yellow balloon, too. The close-up hid it.', reveal:'Show the full photo', crop:'Back to the close-up', altCrop:'A close-up of a red and cream hot-air balloon.', altWide:'Two hot-air balloons, one red and cream and one yellow, above a rocky valley.',
      review:'Review a decision',gov:['Access checked','Owner assigned','Decision recorded'],ragTitle:'Ask your knowledge',ragQuestion:'Who approves a refund?',ragSource:'Refund policy · §2',inspect:'Inspect source',source:'§2 · A manager approves exceptions.'
    },
    he:{
      pills:['AI לבתי ספר','ממשל AI ותקינה','עוזרי AI פרטיים'],group:'בחירת הדגמה',pause:'השהיית המעבר האוטומטי',play:'הפעלת המעבר האוטומטי',
        answer:'בתמונה המלאה רואים גם כדור פורח צהוב. התקריב הסתיר אותו.',  crop:'חזרה לתקריב',  altWide:'שני כדורים פורחים מעל עמק סלעי. אחד באדום ושמנת והשני צהוב.',
      gov:['ההרשאה נבדקה','נקבע גורם אחראי','ההחלטה תועדה'],source:'סעיף 2 · מנהל מאשר חריגים.'
    },
    sv:{
      pills:['AI för skolan','AI-styrning','Privata AI-assistenter'],group:'Välj demonstration',pause:'Pausa automatiskt byte',play:'Starta automatiskt byte',
      schoolTitle:'Utanför bild', question:'Är luftballongen ensam på himlen?', answer:'Här syns också en gul ballong. Den hamnade utanför närbilden.', reveal:'Visa hela bilden', crop:'Tillbaka till närbilden', altCrop:'En röd och gräddvit luftballong i närbild.', altWide:'Två luftballonger över en klippig dal. Den ena är röd och gräddvit, den andra gul.',
      review:'Granska ett beslut',gov:['Åtkomst kontrollerad','Ansvarig utsedd','Beslut dokumenterat'],ragTitle:'Fråga kunskapsstödet',ragQuestion:'Vem godkänner återköp?',ragSource:'Returpolicy · §2',inspect:'Kontrollera källan',source:'§2 · En chef godkänner undantag.'
    },
    da:{
      pills:['AI i skolen','AI-governance','Private AI-assistenter'],group:'Vælg demonstration',pause:'Sæt automatisk skift på pause',play:'Start automatisk skift',
      schoolTitle:'Uden for billedet', question:'Er luftballonen alene på himlen?', answer:'Der er også en gul ballon. Den var uden for nærbilledet.', reveal:'Vis hele billedet', crop:'Tilbage til nærbilledet', altCrop:'Et nærbillede af en rød og cremefarvet luftballon.', altWide:'To luftballoner over en klippedal. Den ene er rød og cremefarvet, den anden gul.',
      review:'Gennemgå en beslutning',gov:['Adgang kontrolleret','Ansvarlig udpeget','Beslutning registreret'],ragTitle:'Spørg din AI-assistent',ragQuestion:'Hvem godkender en refundering?',ragSource:'Returpolitik · §2',inspect:'Undersøg kilden',source:'§2 · En leder godkender undtagelser.'
    }
  };
  for (const element of art.querySelectorAll('[data-he-key]')) {
    words.he[element.dataset.heKey] = element.dataset.heText;
  }
  let language = 'en', current = 0, elapsed = 0, last = 0, frame = 0, onScreen = true, hover = false, focus = false;
  let photoRevealed = false, govStep = -1, sourceOpen = false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  const interval = 6800;
  const pills = [];
  const demos = Array.from(art.querySelectorAll('[data-demo]'));
  controls.setAttribute('role','group');
  for (let i=0; i<3; i++) {
    const b=document.createElement('button');
    b.type='button'; b.className='sd-pill'; b.setAttribute('aria-controls', demos[i].id);
    b.innerHTML='<span class="sd-star" aria-hidden="true"></span><span></span>';
    b.addEventListener('click',()=>{paused=true; switchTo(i);});
    controls.append(b); pills.push(b);
  }
  const pause = document.createElement('button');
  pause.type='button'; pause.className='sd-pause';
  pause.innerHTML='<span aria-hidden="true" class="sd-pause-icon"></span>';
  controls.append(pause);
  const selection = key => art.querySelector(key);
  const msg = attr => selection('[data-sd-'+attr+']');
  function renderData(){
    const w=words[language];
    for(const el of art.querySelectorAll('[data-sd-word]')) el.textContent=w[el.dataset.sdWord];
    demos[0].dataset.view = photoRevealed ? 'wide' : 'crop';
    selection('.sd-photo img').alt = photoRevealed ? w.altWide : w.altCrop;
    msg('frame-note').textContent = photoRevealed ? w.answer : w.question;
    msg('frame-action').textContent = photoRevealed ? w.crop : w.reveal;
    selection('[data-reveal-frame]').setAttribute('aria-expanded', String(photoRevealed));
    msg('gov-msg').textContent=govStep<0?w.review:w.gov[govStep];
    msg('source-msg').textContent=sourceOpen?w.source:w.inspect;
    selection('[data-source]').setAttribute('aria-pressed',String(sourceOpen));
  }
  function renderControls(){
    const w=words[language];
    controls.setAttribute('aria-label',w.group);
    for(let i=0;i<3;i++){
      pills[i].lastElementChild.textContent=w.pills[i];
      pills[i].setAttribute('aria-pressed',String(i===current));
      pills[i].style.setProperty('--ratio',String(i===current?(paused ? 1 : Math.max(.07,elapsed/interval)):0));
      demos[i].hidden=i!==current;
      demos[i].setAttribute('aria-label',w.pills[i]);
    }
    pause.setAttribute('aria-pressed',String(paused));
    pause.title=paused?w.play:w.pause;
    pause.setAttribute('aria-label',pause.title);
    art.dataset.scene=String(current);
    art.classList.toggle('sd-running',!paused&&!hover&&!focus&&onScreen&&!document.hidden&&!reduced.matches);
    schedule();
  }
  function switchTo(i){
    current=i;elapsed=0;last=0;renderControls();
  }
  function tick(now){
    frame=0;
    if(!canRotate())return;
    if(last)elapsed+=Math.min(125,now-last);last=now;
    if(elapsed>=interval){switchTo((current+1)%3);return}
    pills[current].style.setProperty('--ratio',String(Math.max(.07,elapsed/interval)));
    schedule();
  }
  function canRotate(){return !paused && !hover && !focus && onScreen && !document.hidden}
  function schedule(){
    if(!canRotate()){
      if(frame) cancelAnimationFrame(frame);
      frame=0;last=0;return;
    }
    if(!frame)frame=requestAnimationFrame(tick);
  }
  pause.addEventListener('click',()=>{paused=!paused;renderControls()});
  function updateLocale(evt){
    const fromEvent=typeof evt?.detail==='string'?evt.detail:evt?.detail?.lang??evt?.detail?.locale;
    const code=String(fromEvent||window.sundaiLang||document.documentElement.lang||'en').toLowerCase().split('-')[0];
    language=words[code]?code:'en';
    art.dir=language==='he'?'rtl':'ltr';controls.dir=art.dir;
    renderData();renderControls();
  }
  window.addEventListener('sundai:locale',updateLocale);
  document.addEventListener('sundai:locale',updateLocale);
  new MutationObserver(()=>updateLocale()).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  selection('[data-reveal-frame]').addEventListener('click', () => {
    paused = true;
    photoRevealed = !photoRevealed;
    renderData();
    renderControls();
  });
  selection('[data-governance]').addEventListener('click',()=>{
    paused=true;govStep=(govStep+1)%words[language].gov.length;renderData();renderControls();
  });
  selection('[data-source]').addEventListener('click',()=>{
    paused=true;sourceOpen=!sourceOpen;renderData();renderControls();
  });
  for(const container of [art,controls]){
    container.addEventListener('pointerenter',e=>{if(e.pointerType!=='mouse')return;hover=true;renderControls()});
    container.addEventListener('pointerleave',()=>{hover=false;renderControls()});
    container.addEventListener('focusin',()=>{focus=true;renderControls()});
    container.addEventListener('focusout',e=>{
      const next=e.relatedTarget;
      focus=!!next&&(art.contains(next)||controls.contains(next));renderControls();
    });
  }
  document.addEventListener('visibilitychange',renderControls);
  reduced.addEventListener('change',e=>{if(e.matches) paused=true;renderControls()});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{onScreen=Boolean(entries[0]?.isIntersecting);renderControls()},{threshold:.05}).observe(art);
  // One reusable dot matrix and three groups of accent lights, with a fixed seed.
  const svgNS='http://www.w3.org/2000/svg', dotCanvas=document.createElementNS(svgNS,'svg');
  dotCanvas.setAttribute('viewBox','0 0 476 599');dotCanvas.setAttribute('preserveAspectRatio','xMidYMid slice');
  let seed=1375;
  function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
  let pieces='<defs><pattern id="sd-dot-grid" x="0" y="0" width="17" height="17" patternUnits="userSpaceOnUse"><circle cx="8.5" cy="8.5" r="2.6" fill="#393a3d"/></pattern></defs><rect width="100%" height="100%" fill="url(#sd-dot-grid)"/>';
  for(const s of ['a','b','c']){
    pieces+='<g class="sd-pulse sd-pulse-'+s+'" fill="currentColor">';
    for(let y=0;y<36;y++) for(let x=0;x<28;x++){
      if(rnd()>.058)continue;
      pieces+='<circle cx="'+(x*17+8.5)+'" cy="'+(y*17+8.5)+'" r="2.8" opacity="'+(.40+rnd()*.58).toFixed(2)+'"/>';
    }pieces+='</g>';
  }
  dotCanvas.innerHTML=pieces;art.querySelector('.sd-dots').append(dotCanvas);
  updateLocale();
})();
