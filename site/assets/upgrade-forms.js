/* All request types share the existing protected /api/contact delivery path.
 * A provider receipt is a request receipt, never an appointment confirmation. */
(() => {
  'use strict';
  const copy = {
    en: {
      loading: 'Loading the security check…', ready: 'Complete the security check before sending.',
      sending: 'Sending your request…', unavailable: 'The request service is unavailable. Your fields are preserved. Please try again or use the email link below.',
      security: 'Complete the security check. If it expired, please complete it again.',
      invalid: 'Check the required fields and enter a message of at least 20 characters.',
      long: 'The combined message and choices exceed 3,000 characters. Please shorten your request.',
      portfolio: 'Use a complete https:// or http:// portfolio URL, without embedded login details.',
      timezone: 'Choose a valid IANA time zone, for example Europe/Copenhagen.',
      timing: 'Please wait a moment before sending. If this page has been open for a day, reload it after saving your text.',
      rate: 'Too many requests. Your fields are preserved. Please wait before trying again, or use the email link.',
      failed: 'We could not verify acceptance of your request. Your fields are preserved. Please retry or use the email link.',
      accepted: 'Your request was accepted by our email provider. Inbox delivery and a reply are not yet confirmed.',
      booking: 'Your call request was accepted by our email provider. Awaiting confirmation: no appointment is booked yet. We will agree a time by email.',
      join: 'Your application was accepted by our email provider. Receipt in our inbox and admission to the network are not yet confirmed.',
      kinds: { booking: 'Free 20-minute call request — awaiting confirmation', join: 'Freelance network application', training: 'Training request', enquiry: 'Service enquiry' },
      labels: ['Interest', 'Language(s)', 'IANA time zone', 'Preferred time (request only)', 'Country', 'Expertise', 'Experience', 'Availability', 'Portfolio', 'Audience', 'Group size', 'Age ranges only', 'Topic', 'Format', 'Requested dates', 'Learning goal', 'Team / department', 'Product, system or workflow']
    },
    da: {
      loading: 'Indlæser sikkerhedskontrollen…', ready: 'Gennemfør sikkerhedskontrollen, før du sender.',
      sending: 'Sender din forespørgsel…', unavailable: 'Formularen er midlertidigt utilgængelig. Dine felter er bevaret. Prøv igen, eller brug maillinket nedenfor.',
      security: 'Gennemfør sikkerhedskontrollen. Hvis den er udløbet, skal du gennemføre den igen.',
      invalid: 'Kontrollér de obligatoriske felter, og skriv en besked på mindst 20 tegn.',
      long: 'Beskeden og dine valg overstiger tilsammen 3.000 tegn. Forkort din forespørgsel.',
      portfolio: 'Brug en fuld https://- eller http://-adresse til din portfolio uden indlejrede loginoplysninger.',
      timezone: 'Vælg en gyldig IANA-tidszone, for eksempel Europe/Copenhagen.',
      timing: 'Vent et øjeblik, før du sender. Har siden været åben i et døgn, så gem teksten, og genindlæs siden.',
      rate: 'For mange forespørgsler. Dine felter er bevaret. Vent, før du prøver igen, eller brug maillinket.',
      failed: 'Vi kunne ikke bekræfte, at din forespørgsel blev accepteret. Dine felter er bevaret. Prøv igen, eller brug maillinket.',
      accepted: 'Din forespørgsel er accepteret af vores mailudbyder. Levering til indbakken og svar er endnu ikke bekræftet.',
      booking: 'Din samtaleforespørgsel er accepteret af vores mailudbyder. Afventer bekræftelse: der er endnu ikke booket en tid. Vi aftaler tidspunktet via mail.',
      join: 'Din ansøgning er accepteret af vores mailudbyder. Modtagelse i indbakken og optagelse i netværket er endnu ikke bekræftet.',
      kinds: { booking: 'Forespørgsel om gratis samtale på 20 minutter — afventer bekræftelse', join: 'Ansøgning til freelancenetværket', training: 'Forespørgsel om undervisning', enquiry: 'Forespørgsel om en ydelse' },
      labels: ['Interesse', 'Sprog', 'IANA-tidszone', 'Ønsket tidspunkt (kun forespørgsel)', 'Land', 'Ekspertise', 'Erfaring', 'Tilgængelighed', 'Portfolio', 'Målgruppe', 'Gruppestørrelse', 'Kun aldersintervaller', 'Emne', 'Format', 'Ønskede datoer', 'Læringsmål', 'Team / afdeling', 'Produkt, system eller workflow']
    },
    sv: {
      loading: 'Laddar säkerhetskontrollen…', ready: 'Slutför säkerhetskontrollen innan du skickar.',
      sending: 'Skickar din förfrågan…', unavailable: 'Formulärtjänsten är tillfälligt otillgänglig. Dina fält är sparade på sidan. Försök igen eller använd e-postlänken nedan.',
      security: 'Slutför säkerhetskontrollen. Om den har gått ut behöver du göra den igen.',
      invalid: 'Kontrollera de obligatoriska fälten och skriv ett meddelande med minst 20 tecken.',
      long: 'Meddelandet och dina val överstiger tillsammans 3 000 tecken. Förkorta din förfrågan.',
      portfolio: 'Använd en fullständig https://- eller http://-adress till din portfolio utan inbäddade inloggningsuppgifter.',
      timezone: 'Välj en giltig IANA-tidszon, till exempel Europe/Copenhagen.',
      timing: 'Vänta en stund innan du skickar. Om sidan har varit öppen i ett dygn, spara texten och ladda om sidan.',
      rate: 'För många förfrågningar. Dina fält är sparade på sidan. Vänta innan du försöker igen eller använd e-postlänken.',
      failed: 'Vi kunde inte bekräfta att din förfrågan accepterades. Dina fält är sparade på sidan. Försök igen eller använd e-postlänken.',
      accepted: 'Din förfrågan har accepterats av vår e-postleverantör. Leverans till inkorgen och ett svar är ännu inte bekräftade.',
      booking: 'Din samtalsförfrågan har accepterats av vår e-postleverantör. Väntar på bekräftelse: ingen tid är bokad ännu. Vi kommer överens om en tid via e-post.',
      join: 'Din ansökan har accepterats av vår e-postleverantör. Mottagande i inkorgen och antagning till nätverket är ännu inte bekräftade.',
      kinds: { booking: 'Förfrågan om ett gratis samtal på 20 minuter — väntar på bekräftelse', join: 'Ansökan till frilansnätverket', training: 'Förfrågan om utbildning', enquiry: 'Förfrågan om en tjänst' },
      labels: ['Intresse', 'Språk', 'IANA-tidszon', 'Önskad tid (endast förfrågan)', 'Land', 'Expertis', 'Erfarenhet', 'Tillgänglighet', 'Portfolio', 'Målgrupp', 'Gruppstorlek', 'Endast åldersintervall', 'Ämne', 'Format', 'Önskade datum', 'Lärandemål', 'Team / avdelning', 'Produkt, system eller arbetsflöde']
    }
  };
  const fields = ['interest', 'language', 'timezone', 'preferredTime', 'country', 'expertise', 'experience', 'availability', 'portfolio', 'audience', 'groupSize', 'ages', 'topic', 'format', 'dates', 'goal', 'team', 'product'];
  let scriptPromise;
  const request = async (options = {}) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options.method === 'POST' ? 65000 : 12000);
    try {
      const response = await fetch('/api/contact', { credentials: 'same-origin', cache: 'no-store', redirect: 'error', ...options, signal: controller.signal });
      const body = await response.json();
      return { response, body };
    } finally { clearTimeout(timer); }
  };
  const loadTurnstile = () => {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (!scriptPromise) {
      scriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const timer = setTimeout(() => { script.remove(); reject(new Error('challenge_timeout')); }, 15000);
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.onload = () => { clearTimeout(timer); window.turnstile ? resolve(window.turnstile) : reject(new Error('challenge_unavailable')); };
        script.onerror = () => { clearTimeout(timer); script.remove(); reject(new Error('challenge_unavailable')); };
        document.head.appendChild(script);
      }).catch(error => { scriptPromise = null; throw error; });
    }
    return scriptPromise;
  };
  document.querySelectorAll('form[data-upgrade-form]').forEach(form => {
    const locale = (form.dataset.lang || document.documentElement.lang || 'en').slice(0, 2);
    const t = copy[locale] || copy.en;
    const lang = copy[locale] ? locale : 'en';
    const kind = Object.hasOwn(t.kinds, form.dataset.kind) ? form.dataset.kind : 'enquiry';
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    let status = form.querySelector('[data-form-status]');
    if (!status) { status = document.createElement('p'); status.dataset.formStatus = ''; form.appendChild(status); }
    status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); status.setAttribute('aria-atomic', 'true');
    let container = form.querySelector('[data-turnstile]');
    if (!container) { container = document.createElement('div'); container.dataset.turnstile = ''; button.before(container); }
    const spinner = document.createElement('span');
    spinner.className = 'form-spinner'; spinner.textContent = '…'; spinner.hidden = true; spinner.setAttribute('aria-hidden', 'true'); button.appendChild(spinner);
    let token = '', widget, preparing, sending = false, accepted = '';
    const startedAt = String(Date.now());
    const setStatus = (key, error = false) => { status.textContent = t[key]; status.dataset.state = error ? 'error' : key; };
    const refresh = () => { token = ''; if (widget !== undefined && window.turnstile) { try { window.turnstile.reset(widget); } catch { widget = undefined; } } };
    const prepare = () => {
      if (widget !== undefined) return Promise.resolve(true);
      if (preparing) return preparing;
      setStatus('loading');
      preparing = (async () => {
        try {
          const { response, body } = await request();
          if (!response.ok || body.available !== true || body.enabled !== true || typeof body.siteKey !== 'string' || !body.siteKey || body.action !== 'contact') throw new Error('unavailable');
          const challenge = await loadTurnstile();
          widget = challenge.render(container, {
            sitekey: body.siteKey, action: 'contact', theme: 'dark', language: lang, size: 'flexible',
            callback: value => { token = value; if (!sending && (status.dataset.state === 'ready' || status.dataset.state === 'loading' || status.textContent === t.security)) status.textContent = ''; },
            'expired-callback': () => { token = ''; if (!sending && !accepted) setStatus('security', true); },
            'error-callback': () => { token = ''; if (!sending && !accepted) setStatus('security', true); }
          });
          if (!token) setStatus('ready');
          return true;
        } catch { setStatus('unavailable', true); return false; }
        finally { preparing = null; }
      })();
      return preparing;
    };
    form.addEventListener('focusin', () => { if (!sending && !accepted) void prepare(); });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (sending) return;
      const data = new FormData(form);
      const value = name => data.getAll(name).map(item => typeof item === 'string' ? item.trim() : '').filter(Boolean).join(', ');
      const portfolio = form.querySelector('[name="portfolio"]');
      portfolio?.setCustomValidity('');
      if (value('portfolio')) {
        try { const url = new URL(value('portfolio')); if (!['https:', 'http:'].includes(url.protocol) || !url.hostname || url.username || url.password) throw new Error('invalid'); }
        catch { portfolio?.setCustomValidity(t.portfolio); setStatus('portfolio', true); form.reportValidity(); return; }
      }
      const timezone = form.querySelector('[name="timezone"]');
      timezone?.setCustomValidity('');
      if (value('timezone')) {
        try { new Intl.DateTimeFormat(lang, { timeZone: value('timezone') }).format(); }
        catch { timezone?.setCustomValidity(t.timezone); setStatus('timezone', true); form.reportValidity(); return; }
      }
      if (!form.reportValidity() || value('name').length < 2 || value('name').length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email')) || value('email').length > 200 || value('organisation').length > 150 || value('message').length < 20) { setStatus('invalid', true); return; }
      const message = [t.kinds[kind], ...fields.map((name, i) => value(name) ? `${t.labels[i]}: ${value(name)}` : '').filter(Boolean), '', value('message')].join('\n');
      if (message.length > 3000) { setStatus('long', true); return; }
      // Never change startedAt for retries: the server's provider idempotency key
      // includes it. Tokens are refreshed independently from the logical request.
      const payload = { name: value('name'), email: value('email'), organisation: value('organisation'), message, startedAt, turnstileToken: '' };
      const fingerprint = JSON.stringify(payload);
      if (fingerprint === accepted) { setStatus(kind === 'booking' || kind === 'join' ? kind : 'accepted'); return; }
      if (Date.now() - Number(startedAt) < 1500 || Date.now() - Number(startedAt) > 86400000) { setStatus('timing', true); return; }
      if (!await prepare()) return;
      if (sending) return;
      if (!token) { setStatus('security', true); return; }
      payload.turnstileToken = token;
      sending = true; button.disabled = true; spinner.hidden = false; form.setAttribute('aria-busy', 'true'); setStatus('sending');
      try {
        const { response, body } = await request({ method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(payload) });
        if (response.status === 202 && body.ok === true) {
          accepted = fingerprint; setStatus(kind === 'booking' || kind === 'join' ? kind : 'accepted');
          window.dispatchEvent(new CustomEvent('sundai:metric', { detail: { event: kind === 'join' ? 'freelancer_application_submitted' : 'enquiry_submitted' } }));
        } else {
          const code = typeof body.code === 'string' ? body.code : '';
          setStatus(response.status === 429 ? 'rate' : code.startsWith('turnstile_') ? 'security' : code === 'invalid_form_timing' ? 'timing' : code.startsWith('invalid_') ? 'invalid' : code === 'contact_unavailable' ? 'unavailable' : 'failed', true);
        }
      } catch { setStatus('failed', true); }
      finally { sending = false; button.disabled = false; spinner.hidden = true; form.setAttribute('aria-busy', 'false'); refresh(); }
    });
    // Clear custom errors as the visitor edits, allowing native validation to rerun.
    form.addEventListener('input', event => { event.target.setCustomValidity?.(''); });
  });
})();
