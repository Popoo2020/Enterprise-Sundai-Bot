(() => {
  const head=document.querySelector('.fr-header');
  if(!head||head.dataset.frMounted) return;
  head.dataset.frMounted='true';
  const mobile=head.querySelector('[data-fr-mobile]');
  const desktop=Array.from(head.querySelectorAll('[data-fr-mega],.fr-utilities>.fr-lang'));
  const accordion=Array.from(head.querySelectorAll('[data-fr-accordion]'));
  const narrow=window.matchMedia('(max-width:1050px)');
  const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
  const trigger=e=>e.querySelector(':scope > summary');
  function closeDesktop(except){for(const el of desktop)if(el!==except)el.open=false;}
  function closeDrawer(restore){
    if(!mobile.open)return;
    mobile.open=false;
    document.documentElement.classList.remove('fr-lock');
    if(restore)trigger(mobile).focus();
  }
  for(const el of desktop){
    let hoverTimer=0,leaveTimer=0,autoOpened=false;
    el.addEventListener('toggle',()=>{
      if(el.open)closeDesktop(el);
      else autoOpened=false;
    });
    el.addEventListener('pointerenter',e=>{
      clearTimeout(leaveTimer);
      if(!fine.matches||narrow.matches||e.pointerType!=='mouse')return;
      hoverTimer=setTimeout(()=>{if(!el.open){closeDesktop(el);el.open=true;autoOpened=true;}},105);
    });
    el.addEventListener('pointerleave',()=>{
      clearTimeout(hoverTimer);
      if(fine.matches&&autoOpened)leaveTimer=setTimeout(()=>{
        if(!el.contains(document.activeElement))el.open=false;
      },190);
    });
    trigger(el).addEventListener('click',e=>{
      clearTimeout(hoverTimer);
      if(autoOpened&&el.open&&e.detail>0){e.preventDefault();autoOpened=false;}
    });
    el.addEventListener('focusout',e=>{
      if(e.relatedTarget&&!el.contains(e.relatedTarget))el.open=false;
    });
  }
  for(const el of accordion)el.addEventListener('toggle',()=>{
    if(el.open)for(const other of accordion)if(other!==el)other.open=false;
  });
  mobile.addEventListener('toggle',()=>{
    document.documentElement.classList.toggle('fr-lock',mobile.open&&narrow.matches);
    if(mobile.open&&narrow.matches&&!accordion.some(group=>group.open))accordion[0].open=true;
    if(!mobile.open){for(const group of accordion)group.open=false;}
  });
  head.addEventListener('click',e=>{
    const anchor=e.target.closest('a[href]');
    if(anchor){closeDesktop();if(mobile.open)closeDrawer(false);}
  });
  document.addEventListener('pointerdown',e=>{
    if(!head.contains(e.target))closeDesktop();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(mobile.open){
        e.preventDefault();
        const group=accordion.find(el=>el.open&&el.contains(document.activeElement));
        if(group){group.open=false;trigger(group).focus();}
        else closeDrawer(true);
      }else{
        const open=desktop.find(el=>el.open);
        if(open){e.preventDefault();open.open=false;trigger(open).focus();}
      }
    }
    if(e.key==='Tab'&&mobile.open&&narrow.matches){
      const shown=[trigger(mobile),...mobile.querySelectorAll('.fr-drawer summary,.fr-drawer a[href]')].filter(el=>el.getClientRects().length);
      if(!shown.length)return;
      if(e.shiftKey&&document.activeElement===shown[0]){e.preventDefault();shown[shown.length-1].focus();}
      else if(!e.shiftKey&&document.activeElement===shown[shown.length-1]){e.preventDefault();shown[0].focus();}
    }
  });
  narrow.addEventListener('change',()=>{closeDesktop();closeDrawer(false);});
  const compact=()=>head.classList.toggle('fr-compact',window.scrollY>100);
  window.addEventListener('scroll',compact,{passive:true});compact();
  const toTop=document.querySelector('.fr-back');
  if(toTop)toTop.addEventListener('click',e=>{
    e.preventDefault();
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    head.querySelector('.fr-brand')?.focus({preventScroll:true});
  });
  const course=location.pathname.match(/\/courses\/(youth|teachers|hospital|public)\/?(?:index\.html)?$/);
  if(course)for(const link of head.querySelectorAll('a[hreflang]')){
    const lang=link.hreflang;
    link.href=(lang==='en'?'/':'/'+lang+'/')+'courses/'+course[1]+'/';
  }
})();

document.addEventListener('click', event => {
  const link = event.target.closest?.('a[href*="/intro-call/?"]');
  if (!link) return;
  const target = new URL(link.href, location.href);
  window.dispatchEvent(new CustomEvent('sundai:metric', {detail:{
    event:'intro_call_click', language:document.documentElement.lang,
    topic:target.searchParams.get('topic'), via:target.searchParams.get('via')
  }}));
});
