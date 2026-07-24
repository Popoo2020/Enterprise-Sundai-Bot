(() => {
  const header = document.querySelector('[data-header], .site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navId = toggle?.getAttribute('aria-controls');
  const nav = navId ? document.getElementById(navId) : document.querySelector('.site-nav');

  const closeNav = () => {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  toggle?.addEventListener('click', () => {
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(willOpen));
    nav?.classList.toggle('open', willOpen);
    if (willOpen) nav?.querySelector('a')?.focus({ preventScroll: true });
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (nav?.classList.contains('open')) {
      closeNav();
      toggle?.focus();
    }
  });

  if (header) {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 8);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = String(new Date().getFullYear());
  });
})();