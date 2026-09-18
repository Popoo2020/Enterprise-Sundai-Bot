(() => {
  const menu = document.querySelector('.sundai-mobile-menu');
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
  document.addEventListener('click', event => {
    if (menu?.open && !menu.contains(event.target)) menu.open = false;
  });
  // Carry campaign tags directly to an enquiry. No cookies, storage or analytics SDK.
  if (!['https:','http:'].includes(window.location.protocol)) return;
  const incoming = new URLSearchParams(window.location.search);
  const keys = ['utm_source','utm_medium','utm_campaign','utm_content'];
  for (const link of document.querySelectorAll('a[href]')) {
    const target = new URL(link.getAttribute('href'), window.location.origin);
    if (target.origin !== window.location.origin || !/^\/(?:da\/|sv\/)?start\/$/.test(target.pathname)) continue;
    for (const key of keys) {
      const value = incoming.get(key);
      if (value && !target.searchParams.has(key)) target.searchParams.set(key,value.slice(0,120));
    }
    if (!target.searchParams.has('source_page')) target.searchParams.set('source_page',window.location.pathname);
    link.href = target.pathname + target.search + target.hash;
  }
})();
