(() => {
  const root = document.querySelector('.fc-main');
  if (!root) return;
  const cfg = JSON.parse(root.dataset.config);
  const topic = document.getElementById('fc-topic');
  const shopifyBrief = document.getElementById('fc-shopify');
  const product = document.getElementById('fc-product');
  const partner = document.getElementById('fc-partner');
  const partnerBrief = document.getElementById('fc-partner-brief');
  const teaching = document.getElementById('fc-teaching');
  const delivery = document.getElementById('fc-delivery');
  const trainingTopics = new Set(['schools','teachers','youth','public','hospital','beginners','training-partner']);
  const when = document.getElementById('fc-time');
  const kickoff = document.getElementById('fc-kickoff');
  const earliest = document.getElementById('fc-earliest');
  const priorityOffers = new Set(['decision-review','readiness-review','secure-ai-automation','shopify-first-order']);
  const form = document.getElementById('fc-native');
  const manual = document.getElementById('fc-manual');
  const web = document.getElementById('fc-online');
  const query = new URLSearchParams(location.search);
  const allowedSources = ['header','school-banner','footer','course','course-outcome','service','hero','partner','partners','training-partners','article','market-research-with-ai','diagnose-signup-dropoff'];
  const via = allowedSources.includes(query.get('via')) ? query.get('via') : '';
  const validTopic = value => Array.from(topic.options).some(option => option.value === value);
  if (validTopic(query.get('topic'))) topic.value = query.get('topic');

  if (Array.from(teaching.options).some(o => o.value === query.get('teaching'))) teaching.value = query.get('teaching');
  earliest.checked = query.get('start') === 'earliest';
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const zoneLabel = document.getElementById('fc-zone');
  zoneLabel.textContent = zone ? cfg.zone + ' · ' + zone : '';
  const isProduction = location.protocol === 'https:' && ['sundaibot.com','www.sundaibot.com'].includes(location.hostname);
  const otherInterests = new Set(['schools','organisations','teachers','youth','public','hospital','beginners','it-provider']);
  const optionalTime = when.closest('details');
  topic.parentElement.hidden = false;
  optionalTime.hidden = false;
  const emit = event => window.dispatchEvent(new CustomEvent('sundai:metric', {detail:{event, topic:topic.value, via, language:document.documentElement.lang}}));

  function update() {
    const option = topic.selectedOptions[0];
    const time = optionalTime.open ? when.value : '';
    const localTime = time.replace('T',' ');
    document.getElementById('fc-web-time').hidden = !localTime;
    const schedule = localTime ? cfg.preferred + ': ' + localTime + (zone ? ' (' + zone + ')' : '') : cfg.suggest;
    const enquiry = cfg.body + ' ' + option.text + '.';
    delivery.hidden = !trainingTopics.has(topic.value);
    const preference = !delivery.hidden && teaching.value ? cfg.teachingLabel + ': ' + teaching.selectedOptions[0].text : '';
    kickoff.hidden = !priorityOffers.has(topic.value);
    const startRequest = !kickoff.hidden && earliest.checked ? cfg.earliest : '';
    const isShopify = topic.value === 'shopify-first-order';
    if (shopifyBrief) shopifyBrief.hidden = !isShopify;
    const isPartner = topic.value === 'training-partner';
    if (partner) partner.hidden = !isPartner;
    const lines = [enquiry, isShopify ? product?.value.trim() : '', isPartner ? partnerBrief?.value.trim() : '', preference, startRequest, schedule].filter(Boolean);
    const body = cfg.hello + '\r\n\r\n' + lines.join('\r\n');
    const href = 'mailto:' + cfg.address + '?subject=' + encodeURIComponent(cfg.subject + ' · ' + option.text) + '&body=' + encodeURIComponent(body);
    for (const link of root.querySelectorAll('.fc-email')) link.href = href;
    const target = new URL(cfg.web);
    const bookingInterest = {'decision-review':'ai-decision-review','readiness-review':'compliance-ai-governance','shopify-first-order':'secure-ai-automation'}[topic.value] || topic.value;
    if (topic.value !== 'general') target.searchParams.set('interest', otherInterests.has(topic.value) ? 'other' : bookingInterest);
    document.getElementById('fc-web-readiness').hidden = topic.value !== 'readiness-review';
    document.getElementById('fc-web-provider').hidden = topic.value !== 'it-provider';
    const shopifyWebHint = document.getElementById('fc-web-shopify');
    if (shopifyWebHint) shopifyWebHint.hidden = !isShopify;
    const partnerWebHint = document.getElementById('fc-web-partner');
    if (partnerWebHint) partnerWebHint.hidden = !isPartner;
    web.href = target.href;
    form.elements.interest.value = option.text;
    form.elements.preferredTime.value = localTime;
    form.elements.timezone.value = time ? zone : '';
    form.elements.message.value = lines.join('\n') + (via ? '\nSundAI: ' + via + ' / ' + topic.value : '');
    document.getElementById('fc-headline').textContent = option.dataset.heading;
    document.getElementById('call-outcome').textContent = option.dataset.outcome;
    for (const link of document.querySelectorAll('.fr-header a[hreflang]')) {
      const languageTarget = new URL(link.href);
      languageTarget.searchParams.set('topic', topic.value);
      if (preference) languageTarget.searchParams.set('teaching', teaching.value);
      else languageTarget.searchParams.delete('teaching');
      if (startRequest) languageTarget.searchParams.set('start','earliest');
      else languageTarget.searchParams.delete('start');
      if (via) languageTarget.searchParams.set('via', via);
      link.href = languageTarget.href;
    }
  }

  function validateTime() {
    const invalid = optionalTime.open && when.value && new Date(when.value).getTime() <= Date.now();
    when.setCustomValidity(invalid ? cfg.selectDate : '');
    return !optionalTime.open || when.reportValidity();
  }

  earliest.addEventListener('change', update);
  teaching.addEventListener('change', update);
  product?.addEventListener('input', update);
  partnerBrief?.addEventListener('input', update);
  topic.addEventListener('change', update);
  when.addEventListener('input', () => { when.setCustomValidity(''); update(); });
  optionalTime.addEventListener('toggle', update);
  form.addEventListener('submit', event => {
    if (!validateTime()) { event.preventDefault(); event.stopImmediatePropagation(); return; }
    update();
  }, true);
  for (const link of root.querySelectorAll('.fc-email')) link.addEventListener('click', event => {
    if (!validateTime()) {event.preventDefault(); return;}
    update();
    emit('intro_call_email_draft');
  });
  web.addEventListener('click', () => emit('intro_call_web_handoff'));
  window.addEventListener('sundai:metric', event => {
    if (isProduction && event.detail?.event === 'enquiry_submitted') emit('intro_call_request_accepted');
  });
  // The protected delivery endpoint belongs to the public SundAI site. A review
  // site offers a working email handoff and the existing online form instead.
  if (isProduction && form.dataset.contactReady === 'true') {
    form.hidden = false;
    manual.hidden = true;
  }
  update();
})();
