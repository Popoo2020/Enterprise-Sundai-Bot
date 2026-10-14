(() => {
 const menu=document.querySelector('.mobile-menu');
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.open){menu.open=false;menu.querySelector('summary')?.focus();}});
 document.addEventListener('click',e=>{if(menu?.open&&!menu.contains(e.target))menu.open=false;});
 // Keep footer navigation available without JS; collapse it only on small screens.
 const footerGroups=[...document.querySelectorAll('.footer-nav')];
 const footerViewport=window.matchMedia('(max-width:600px)');
 const arrangeFooter=()=>{
  for(const group of footerGroups){
   // A viewport change must not conceal the link a keyboard user is using.
   if(!footerViewport.matches||group.contains(document.activeElement))group.open=true;
   else group.open=false;
  }
 };
 arrangeFooter();
 footerViewport.addEventListener('change',arrangeFooter);
 const emit=event=>window.dispatchEvent(new CustomEvent('sundai:metric',{detail:{event}}));
 const kind=document.body.dataset.pageKind;
 if(kind==='service')emit('service_view');if(kind==='pricing')emit('pricing_view');
 const bookingForm=document.querySelector('[data-kind="booking"]');bookingForm?.addEventListener('focusin',()=>emit('booking_start'),{once:true});
 const timezone=document.querySelector('[name="timezone"]');if(timezone&&!timezone.value)timezone.value=Intl.DateTimeFormat().resolvedOptions().timeZone||'Europe/Copenhagen';
 const interest=document.querySelector('[name="interest"]');
 const requestedInterest=new URLSearchParams(window.location.search).get('interest');
 if(interest&&requestedInterest&&[...interest.options].some(option=>option.value===requestedInterest))interest.value=requestedInterest;
})();
