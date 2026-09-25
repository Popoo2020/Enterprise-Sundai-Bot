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

// A visitor-controlled alternative, not an automatic retry or delivery receipt.
(() => {
  const recipient = 'eririmo@protonmail.com';
  const language = (document.documentElement.lang || 'en').split('-')[0];
  const copy = {
    en: {
      label: 'Email us directly',
      note: 'This opens your email app. Copy your enquiry below, paste it into the email and press Send. Nothing is sent by opening the link.',
      copy: 'Copy enquiry', copied: 'Copied. Paste into your email and press Send.',
      manual: 'Select and copy the text below, then paste it into your email.',
      preview: 'Your enquiry text', error: 'The form has not confirmed sending. You can email us directly instead.'
    },
    da: {
      label: 'Send os en e-mail direkte',
      note: 'Dette åbner din mailapp. Kopiér din henvendelse nedenfor, indsæt den i mailen, og tryk Send. Linket sender ikke noget automatisk.',
      copy: 'Kopiér henvendelsen', copied: 'Kopieret. Indsæt teksten i din mail, og tryk Send.',
      manual: 'Markér og kopiér teksten nedenfor, og indsæt den i din mail.',
      preview: 'Teksten i din henvendelse', error: 'Formularen har ikke bekræftet afsendelsen. Du kan sende os en e-mail direkte i stedet.'
    },
    sv: {
      label: 'Mejla oss direkt',
      note: 'Detta öppnar din e-postapp. Kopiera din förfrågan nedan, klistra in den i mejlet och tryck på Skicka. Länken skickar inget automatiskt.',
      copy: 'Kopiera förfrågan', copied: 'Kopierat. Klistra in texten i ditt mejl och tryck på Skicka.',
      manual: 'Markera och kopiera texten nedan och klistra in den i ditt mejl.',
      preview: 'Texten i din förfrågan', error: 'Formuläret har inte bekräftat sändningen. Du kan mejla oss direkt i stället.'
    }
  }[language] || null;
  if (!copy) return;
  for (const form of document.querySelectorAll('[data-contact-form]')) {
    if (form.querySelector('[data-contact-fallback]')) continue;
    const panel = document.createElement('div');
    panel.className = 'contact-fallback privacy-note';
    panel.dataset.contactFallback = 'true';
    const title = document.createElement('p');
    const link = document.createElement('a');
    link.href = `mailto:${recipient}?subject=${encodeURIComponent('SundAI website enquiry')}`;
    link.textContent = `${copy.label}: ${recipient}`;
    title.append(link);
    const note = document.createElement('p');
    note.textContent = copy.note;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button secondary';
    button.textContent = copy.copy;
    const feedback = document.createElement('p');
    feedback.setAttribute('aria-live', 'polite');
    const preview = document.createElement('textarea');
    preview.readOnly = true;
    preview.hidden = true;
    preview.rows = 8;
    preview.setAttribute('aria-label', copy.preview);
    // Deliberately no name: the preview must not become an unexpected API field.
    panel.append(title, note, button, feedback, preview);
    form.append(panel);
    const buildText = () => {
      const read = selector => String(form.querySelector(selector)?.value || '').trim();
      const selected = form.querySelector('[data-interest-select]');
      const service = selected?.selectedOptions?.[0]?.textContent || '';
      const message = read('[data-enquiry-details]') || read('[name="message"]');
      return `SundAI website enquiry\nPage: ${window.location.pathname}\nName: ${read('[name="name"]')}\nEmail: ${read('[name="email"]')}\nOrganisation: ${read('[name="organisation"]')}${service ? `\nService: ${service}` : ''}\n\n${message}`;
    };
    button.addEventListener('click', async () => {
      const text = buildText();
      preview.value = text;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('clipboard_unavailable');
        await navigator.clipboard.writeText(text);
        preview.hidden = true;
        feedback.textContent = copy.copied;
      } catch {
        preview.hidden = false;
        preview.focus();
        preview.select();
        feedback.textContent = copy.manual;
      }
    });
    const refresh = () => {
      panel.hidden = false;
      if (!preview.hidden) preview.value = buildText();
      feedback.textContent = '';
    };
    form.addEventListener('input', refresh);
    form.addEventListener('change', refresh);
    const status = form.querySelector('[data-form-status]');
    if (status) {
      const syncStatus = () => {
        panel.hidden = status.classList.contains('success');
        const failed = status.classList.contains('error');
        panel.dataset.state = failed ? 'error' : 'ready';
        note.textContent = failed ? `${copy.error} ${copy.note}` : copy.note;
      };
      new MutationObserver(syncStatus).observe(status, { attributes: true, childList: true, characterData: true, subtree: true });
      syncStatus();
    }
  }
})();
