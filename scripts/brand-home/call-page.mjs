import { trainingLanguages } from './training-languages.mjs';
import { renderHeader, renderFooter } from './frame.mjs';
import { callCopy, topicKeys, contactEmail, clockIcon, callArrow } from './call.mjs';

const safe = text => String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const asset = '/assets/brand-home/';
const spoken = {he:'עברית', en:'English', sv:'Svenska', da:'Dansk'};

export function renderCallPage(lang) {
  const c = callCopy[lang];
  const prefix = lang === 'en' ? '/' : '/' + lang + '/';
  const web = 'https://sundaibot.com' + (lang === 'he' ? '/' : prefix) + 'book/';
  const emailBody = c.hello + '\r\n\r\n' + c.body + ' ' + c.topics[0] + '.\r\n' + c.suggest;
  const email = 'mailto:' + contactEmail + '?subject=' + encodeURIComponent(c.subject) + '&amp;body=' + encodeURIComponent(emailBody);
  const options = topicKeys.map((key, i) => '<option value="' + key + '" data-heading="' + safe(c.headings[i]) + '" data-outcome="' +
    safe(c.outcomes[i]) + '">' + safe(c.topics[i]) + '</option>').join('');
  const teaching = trainingLanguages[lang];
  const deliveryOptions = ['he','sv','en','da','no'].map((code,i) => '<option value="' + code + '">' + safe(teaching.names[i]) + '</option>').join('');
  const css = ['shell','frame','call-page'].map(file => '<link rel="stylesheet" href="' + asset + file + '.css">').join('');
  const pageOptions = {innerPage:true, booking:true};
  const js = ['frame','call-page'].map(file => '<script defer src="' + asset + file + '.js"></script>').join('');
  const cfg = {subject:c.subject, hello:c.hello, body:c.body, suggest:c.suggest, preferred:c.preferred, zone:c.zone,
    earliest:c.earliest, teachingLabel:teaching.label, selectDate:c.selectDate, address:contactEmail, web};
  return `<!doctype html><html lang="${lang}" dir="${lang==='he'?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${safe(c.page)} | SundAI</title><meta name="description" content="${safe(c.footnote + '. ' + c.outcomes[0])}"><meta name="robots" content="noindex,nofollow"><link rel="icon" href="/assets/favicon.svg">${css}<script defer src="/assets/upgrade-forms.js"></script>${js}</head>
<body class="fc-page"><a class="fr-skip" href="#request">${safe(c.page)}</a>${renderHeader(lang,pageOptions)}
<main id="main" class="fc-main" data-config="${safe(JSON.stringify(cfg))}">
  <div class="fc-columns">
    <section class="fc-intro"><a class="fc-back" href="${prefix}"><span aria-hidden="true">←</span> SundAI</a>
      <h1 id="fc-headline">${safe(c.headline)}</h1>
      <p class="fc-outcome" id="call-outcome" aria-live="polite">${safe(c.outcomes[0])}</p>
      <div class="fc-host"><span class="fc-clock">${clockIcon}</span><div><strong>${safe(c.who)}</strong><span>${safe(c.duration)} · ${safe(c.fee)}</span></div></div>
    </section>
    <section class="fc-ticket" id="request" aria-labelledby="fc-title">
      <div class="fc-ticket-top"><span class="fc-stamp" aria-hidden="true">${clockIcon}</span><h2 id="fc-title">${safe(c.page)}</h2></div>
      <div class="fc-choice" hidden><label for="fc-topic">${safe(c.topic)}</label><select id="fc-topic">${options}</select></div>
      <div id="fc-delivery" class="fc-choice" hidden><label for="fc-teaching">${safe(teaching.label)}</label><select id="fc-teaching"><option value="">${safe(teaching.any)}</option>${deliveryOptions}</select></div>
      <div class="fc-kickoff" id="fc-kickoff" hidden><label><input id="fc-earliest" type="checkbox" aria-describedby="fc-kickoff-note">${safe(c.earliest)}</label><small id="fc-kickoff-note">${safe(c.earliestHint)}</small></div>
      <details class="fc-when" hidden><summary>${safe(c.when)}<span aria-hidden="true">+</span></summary>
        <label for="fc-time">${safe(c.time)}</label><input id="fc-time" type="datetime-local"><small id="fc-zone"></small>
      </details>
      <form id="fc-native" data-upgrade-form data-kind="booking" data-lang="${lang}" action="/api/contact" method="post" hidden>
        <div class="fc-fields"><label>${safe(c.name)}<input name="name" autocomplete="name" minlength="2" maxlength="100" required></label><label>${safe(c.reply)}<input name="email" dir="ltr" type="email" autocomplete="email" maxlength="200" required></label></div>
        <input name="interest" type="hidden"><input name="language" type="hidden" value="${safe(spoken[lang])}"><input name="preferredTime" type="hidden"><input name="timezone" type="hidden"><input name="message" type="hidden">
        <div data-turnstile></div><button class="fc-primary" type="submit">${safe(c.send)}${callArrow}</button>
        <p class="fc-status" data-form-status role="status"></p><a class="fc-subtle fc-email" href="${email}">${safe(c.formFallback)}</a>
      </form>
      <div id="fc-manual"><a class="fc-primary fc-email" href="${email}">${safe(c.email)}${callArrow}</a><p class="fc-hint">${safe(c.emailHint)}</p>
        <a class="fc-subtle" id="fc-online" href="${web}">${safe(c.web)} ${callArrow}</a><p id="fc-web-readiness" class="fc-hint" hidden>${safe(c.readinessWeb)}</p><p id="fc-web-provider" class="fc-hint" hidden>${safe(c.providerWeb)}</p><p id="fc-web-time" class="fc-hint" hidden>${safe(c.webTime)}</p></div>
      <p class="fc-confirm">${safe(c.confirm)} <a href="https://sundaibot.com/privacy.html">${safe(c.privacy)}</a></p>
    </section>
  </div>
</main>${renderFooter(lang,pageOptions)}</body></html>`;
}
