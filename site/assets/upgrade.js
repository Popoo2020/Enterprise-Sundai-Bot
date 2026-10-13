(() => {
 const menu=document.querySelector('.mobile-menu');
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.open){menu.open=false;menu.querySelector('summary')?.focus();}});
 document.addEventListener('click',e=>{if(menu?.open&&!menu.contains(e.target))menu.open=false;});
 const emit=event=>window.dispatchEvent(new CustomEvent('sundai:metric',{detail:{event}}));
 const kind=document.body.dataset.pageKind;
 if(kind==='service')emit('service_view');if(kind==='pricing')emit('pricing_view');
 const bookingForm=document.querySelector('[data-kind="booking"]');bookingForm?.addEventListener('focusin',()=>emit('booking_start'),{once:true});
 const timezone=document.querySelector('[name="timezone"]');if(timezone&&!timezone.value)timezone.value=Intl.DateTimeFormat().resolvedOptions().timeZone||'Europe/Copenhagen';
 const interest=document.querySelector('[name="interest"]');
 const requestedInterest=new URLSearchParams(window.location.search).get('interest');
 if(interest&&requestedInterest&&[...interest.options].some(option=>option.value===requestedInterest))interest.value=requestedInterest;
})();
