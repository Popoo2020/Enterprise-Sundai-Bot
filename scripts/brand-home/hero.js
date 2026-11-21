/* Product chapter selector and self-contained demonstrations. */
(() => {
  const art = document.getElementById('sd-hero-art');
  const controls = document.getElementById('sd-hero-pills');
  if (!art || !controls || controls.dataset.mounted) return;
  controls.dataset.mounted = 'true';
  const words = {
    en:{
      pills:['AI for Schools','AI Governance','Private AI Assistants'], group:'Choose a demonstration', pause:'Pause automatic rotation', play:'Play automatic rotation',
      schoolTitle:'Outside the frame', question:'Is this balloon alone in the sky?', answer:'There’s a yellow balloon, too. Which detail changed your answer?', reveal:'Show the full photo', crop:'Back to the close-up', altCrop:'A close-up of a red and cream hot-air balloon.', altWide:'Two hot-air balloons, one red and cream and one yellow, above a rocky valley.',
      review:'Review a decision',gov:['Access checked','Owner assigned','Decision recorded'],ragTitle:'Ask your knowledge',ragQuestion:'Who approves a refund?',ragSource:'Refund policy · §2',inspect:'Inspect source',source:'§2 · A manager approves exceptions.'
    },
    he:{
      pills:['AI לבתי ספר','ממשל AI ותקינה','עוזרי AI פרטיים'],group:'בחירת הדגמה',pause:'השהיית המעבר האוטומטי',play:'הפעלת המעבר האוטומטי',
        answer:'עכשיו רואים גם כדור פורח צהוב. מה בתמונה גרם לכם לחשוב אחרת?',  crop:'חזרה לתקריב',  altWide:'שני כדורים פורחים מעל עמק סלעי. אחד באדום ושמנת והשני צהוב.',
      gov:['ההרשאה נבדקה','נקבע גורם אחראי','ההחלטה תועדה'],source:'סעיף 2 · מנהל מאשר חריגים.'
    },
    sv:{
      pills:['AI för skolan','AI-styrning','Privata AI-assistenter'],group:'Välj demonstration',pause:'Pausa automatiskt byte',play:'Starta automatiskt byte',
      answer:'Nu syns en gul ballong också. Vilken detalj fick dig att tänka om?', crop:'Tillbaka till närbilden', altWide:'Två luftballonger över en klippig dal. Den ena är röd och gräddvit, den andra gul.',
      review:'Granska ett beslut',gov:['Åtkomst kontrollerad','Ansvarig utsedd','Beslut dokumenterat'],ragTitle:'Fråga kunskapsstödet',ragQuestion:'Vem godkänner återköp?',ragSource:'Returpolicy · §2',inspect:'Kontrollera källan',source:'§2 · En chef godkänner undantag.'
    },
    da:{
      pills:['AI i skolen','AI-governance','Private AI-assistenter'],group:'Vælg demonstration',pause:'Sæt automatisk skift på pause',play:'Start automatisk skift',
      answer:'Nu kan du også se en gul ballon. Hvilken detalje ændrede dit svar?', crop:'Tilbage til nærbilledet', altWide:'To luftballoner over en klippedal. Den ene er rød og cremefarvet, den anden gul.',
      review:'Gennemgå en beslutning',gov:['Adgang kontrolleret','Ansvarlig udpeget','Beslutning registreret'],ragTitle:'Spørg din AI-assistent',ragQuestion:'Hvem godkender en refundering?',ragSource:'Returpolitik · §2',inspect:'Undersøg kilden',source:'§2 · En leder godkender undtagelser.'
    }
  };
  for (const element of art.querySelectorAll('[data-he-key]')) {
    for (const code of ['he', 'sv', 'da']) {
      const value = element.getAttribute('data-' + code + '-text');
      if (value) words[code][element.dataset.heKey] = value;
    }
  }
  let language = 'en', current = 0, elapsed = 0, last = 0, frame = 0, onScreen = !('IntersectionObserver' in window), hover = false, focus = false;
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
  const sunny = selection('.sd-sunny');
  const dan = selection('.sd-dan');
  const bot = selection('.sd-rag-bot');
  const mark = selection('.sd-rag-mark');
  const connection = navigator.connection;
  let sunnyPlayed = false, botPlayed = false;
  function loadPoster(pose) {
    const image = pose.firstElementChild;
    if (!image.hasAttribute('src')) image.src = image.dataset.poster;
  }
  function stopPose(pose) {
    pose.querySelector('.sd-motion-frame')?.remove();
  }
  function playPose(pose) {
    // The poster remains visible if an image is delayed, unsupported or blocked.
    if (pose.querySelector('.sd-motion-frame')) return;
    const motion = new Image();
    motion.className = 'sd-motion-frame';
    motion.alt = '';
    motion.decoding = 'async';
    motion.hidden = true;
    motion.onload = () => { motion.hidden = false; };
    motion.onerror = () => motion.remove();
    pose.append(motion);
    motion.src = pose.dataset.motion;
  }
  function syncCrew() {
    const visible = onScreen && !document.hidden;
    const schoolVisible = current === 0 && visible;
    const assistantVisible = current === 2 && visible;
    const motionAllowed = !reduced.matches && !connection?.saveData
      && !['slow-2g', '2g'].includes(connection?.effectiveType);
    art.toggleAttribute('data-crew-motion', motionAllowed);
    mark.hidden = !sourceOpen;
    if (assistantVisible) {
      loadPoster(bot);
      if (sourceOpen) loadPoster(mark);
    }
    if (assistantVisible && motionAllowed) {
      if (!botPlayed) {
        botPlayed = true;
        playPose(bot);
      }
      if (sourceOpen) playPose(mark);
      else stopPose(mark);
    } else {
      stopPose(bot);
      stopPose(mark);
    }

    dan.hidden = !photoRevealed;
    if (photoRevealed) loadPoster(dan);
    if (!schoolVisible || !motionAllowed) {
      stopPose(sunny);
      stopPose(dan);
      return;
    }
    if (!sunnyPlayed) {
      sunnyPlayed = true;
      playPose(sunny);
    }
    if (photoRevealed) playPose(dan);
    else stopPose(dan);
  }
  function renderData(){
    const w=words[language];
    for(const el of art.querySelectorAll('[data-sd-word]')) el.textContent=w[el.dataset.sdWord];
    demos[0].dataset.view = photoRevealed ? 'wide' : 'crop';
    const reserve = selection('.sd-note-reserve');
    reserve.dataset.question = w.question;
    reserve.dataset.answer = w.answer;
    selection('.sd-photo img').alt = photoRevealed ? w.altWide : w.altCrop;
    msg('frame-note').textContent = photoRevealed ? w.answer : w.question;
    msg('frame-action').textContent = photoRevealed ? w.crop : w.reveal;
    selection('[data-reveal-frame]').setAttribute('aria-expanded', String(photoRevealed));
    msg('gov-msg').textContent=govStep<0?w.review:w.gov[govStep];
    demos[2].toggleAttribute('data-inspected', sourceOpen);
    selection('.sd-source-reserve').textContent = w.source;
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
    syncCrew();
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
  connection?.addEventListener?.('change',syncCrew);
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
  art.dataset.ready = 'true';
  updateLocale();
})();
