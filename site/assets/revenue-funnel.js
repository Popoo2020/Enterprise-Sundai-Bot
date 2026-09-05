(() => {
  const form = document.querySelector('[data-revenue-form]');
  if (!form) return;

  const lang = document.documentElement.lang || 'en';
  const copy = {
    en: {
      packages: {
        call: 'AI Governance Decision Call — €490',
        sprint: 'AI Governance Readiness Sprint — €1,950',
        implementation: 'Governance Implementation — from €4,500',
        desk: 'SundAI Governance Desk — from €995/month',
        training: 'AI Literacy / Leadership Training — from €1,500'
      },
      fallback: 'Please contact me about the most suitable next step.'
    },
    da: {
      packages: {
        call: 'AI-governance beslutningssamtale — €490',
        sprint: 'AI Governance Readiness Sprint — €1.950',
        implementation: 'Governance-implementering — fra €4.500',
        desk: 'SundAI Governance Desk — fra €995/måned',
        training: 'AI-literacy / ledelsestræning — fra €1.500'
      },
      fallback: 'Kontakt mig gerne om det mest relevante næste skridt.'
    },
    sv: {
      packages: {
        call: 'Beslutningssamtal om AI-styrning — €490',
        sprint: 'AI Governance Readiness Sprint — €1 950',
        implementation: 'Implementering av AI-styrning — från €4 500',
        desk: 'SundAI Governance Desk — från €995/månad',
        training: 'AI-kunnighet / ledningsutbildning — från €1 500'
      },
      fallback: 'Kontakta mig gärna om det mest lämpliga nästa steget.'
    }
  }[lang] || null;
  if (!copy) return;

  const interest = form.querySelector('[data-interest-select]');
  const details = form.querySelector('[data-enquiry-details]');
  const message = form.querySelector('[name="message"]');
  const started = form.querySelector('[name="startedAt"]');
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('package');

  const sourceParts = [];
  for (const key of ['utm_source','utm_medium','utm_campaign','utm_content']) {
    const value = params.get(key);
    if (value) sourceParts.push(`${key}=${value.slice(0,120)}`);
  }
  if (document.referrer) {
    try {
      const ref = new URL(document.referrer);
      if (ref.hostname !== window.location.hostname) sourceParts.push(`referrer=${ref.hostname.slice(0,120)}`);
    } catch {}
  }

  const compose = () => {
    if (!message) return;
    const key = interest?.value || 'call';
    const packageLabel = copy.packages[key] || copy.packages.call;
    const detailText = String(details?.value || '').trim() || copy.fallback;
    const source = sourceParts.length ? `\nSource: ${sourceParts.join(' | ')}` : '';
    message.value = `Interest: ${packageLabel}${source}\nPage: ${window.location.pathname}\n\nDetails:\n${detailText}`;
  };

  if (started && !started.value) started.value = String(Date.now());
  if (requested && copy.packages[requested] && interest) interest.value = requested;
  compose();

  interest?.addEventListener('change', compose);
  details?.addEventListener('input', compose);
  form.addEventListener('submit', compose, true);

  document.querySelectorAll('[data-package]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-package');
      if (interest && copy.packages[key]) interest.value = key;
      if (started) started.value = String(Date.now());
      compose();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => details?.focus({ preventScroll: true }), 550);
    });
  });
})();
