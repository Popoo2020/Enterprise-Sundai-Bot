(() => {
  const header = document.querySelector('[data-header]');
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('open', !open);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const startedAt = form.querySelector('input[name="startedAt"]');
  if (startedAt) startedAt.value = String(Date.now());

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('button[type="submit"]');
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Request failed');
      status.textContent = form.dataset.success;
      status.classList.add('success');
      form.reset();
      if (startedAt) startedAt.value = String(Date.now());
    } catch (error) {
      status.textContent = form.dataset.error;
      status.classList.add('error');
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  });
})();
