import { renderHeader, renderFooter } from './frame.mjs';
import { contactEmail } from './call.mjs';

const copy = {
  en: {
    title: 'A quote for your AI governance review', lead: 'Tell us which AI tool, supplier or decision you’re considering. We’ll email you to agree the scope and propose a price for the work you need.',
    form: 'Request a tailored quote', name: 'Your name', email: 'Email for our reply', org: 'Company (optional)', brief: 'What would you like us to review? (optional)',
    subject: 'Please contact me about a tailored quote for an AI governance review.', send: 'Request my quote', mail: 'Send your request by email', privacy: 'Privacy policy',
    sent: 'Thank you. We’ll follow up by email about the scope and price of your review.'
  },
  he: {
    title: 'הצעת מחיר לבדיקת ממשל AI בחברה שלכם', lead: 'איזה כלי AI, ספק או שימוש אתם שוקלים? השאירו פרטים ונחזור אליכם במייל כדי להבין מה נדרש ולהציע מחיר בהתאם להיקף הבדיקה.',
    form: 'בקשה להצעת מחיר מותאמת', name: 'שם', email: 'אימייל לחזרה', org: 'שם החברה (רשות)', brief: 'מה תרצו שנבדוק? (רשות)',
    subject: 'אשמח שתחזרו אליי עם הצעת מחיר מותאמת לבדיקת ממשל AI.', send: 'חזרו אליי עם הצעה', mail: 'שליחת הבקשה במייל', privacy: 'מדיניות פרטיות',
    sent: 'תודה על הפנייה. נחזור אליכם במייל לגבי היקף הבדיקה והמחיר.'
  },
  sv: {
    title: 'Offert på granskning av er AI-användning', lead: 'Vilket AI-verktyg, vilken leverantör eller vilket beslut överväger ni? Vi hör av oss via mejl för att avgränsa granskningen och ge er ett pris.',
    form: 'Be om en offert', name: 'Ditt namn', email: 'E-postadress', org: 'Företag (valfritt)', brief: 'Vad vill ni att vi granskar? (valfritt)',
    subject: 'Jag vill bli kontaktad om en offert på granskning av vår AI-användning.', send: 'Skicka offertförfrågan', mail: 'Skicka förfrågan via mejl', privacy: 'Integritetspolicy',
    sent: 'Tack för din förfrågan. Vi återkommer via mejl om granskningens omfattning och pris.'
  },
  da: {
    title: 'Få et tilbud på gennemgang af jeres brug af AI', lead: 'Hvilket AI-værktøj, hvilken leverandør eller hvilken beslutning overvejer I? Vi kontakter jer på mail for at afklare opgaven og give jer en pris.',
    form: 'Bed om et tilbud', name: 'Dit navn', email: 'E-mailadresse', org: 'Virksomhed (valgfrit)', brief: 'Hvad vil I gerne have gennemgået? (valgfrit)',
    subject: 'Kontakt mig om et tilbud på gennemgang af vores brug af AI.', send: 'Send forespørgsel', mail: 'Send forespørgslen via mail', privacy: 'Privatlivspolitik',
    sent: 'Tak for din forespørgsel. Vi vender tilbage på mail om opgavens omfang og pris.'
  }
};
const paths = Object.fromEntries(Object.keys(copy).map(l => [l, (l === 'en' ? '/' : '/'+l+'/') + 'governance-quote/']));

export function renderGovernanceQuote(lang) {
  const c = copy[lang];
  const frame = {innerPage:true, languagePaths:paths};
  const prefix = lang === 'en' ? '/' : '/'+lang+'/';
  const privacyPath = {en:'/privacy.html', he:'/privacy.html', da:'/da/privatliv.html', sv:'/sv/integritet.html'}[lang];
  const mail = 'mailto:'+contactEmail+'?subject='+encodeURIComponent(c.form);
  return `<!doctype html><html lang="${lang}" dir="${lang==='he'?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${c.title} | SundAI</title><meta name="description" content="${c.lead}"><link rel="icon" href="/assets/favicon.svg">
  ${['shell','frame','call-page','governance-quote'].map(file=>'<link rel="stylesheet" href="/assets/brand-home/'+file+'.css">').join('')}
  <script defer src="/assets/brand-home/frame.js"></script><script defer src="/assets/upgrade-forms.js"></script></head>
  <body class="fc-page"><a class="fr-skip" href="#request">${c.form}</a>${renderHeader(lang,frame)}<main id="main" class="fc-main"><div class="fc-columns">
  <section class="fc-intro"><a class="fc-back" href="${prefix}services/compliance-ai-governance/">SundAI · AI Governance</a><h1>${c.title}</h1><p class="fc-outcome">${c.lead}</p></section>
  <section class="fc-ticket" id="request" aria-labelledby="quote-title"><div class="fc-ticket-top"><h2 id="quote-title">${c.form}</h2></div>
  <form class="gq-form" data-upgrade-form data-kind="enquiry" data-lang="${lang}" data-accepted-copy="${c.sent}" action="/api/contact" method="post">
  <div class="fc-fields"><label>${c.name}<input name="name" autocomplete="name" minlength="2" maxlength="100" required></label><label>${c.email}<input name="email" type="email" dir="ltr" autocomplete="email" maxlength="200" required></label></div>
  <label>${c.org}<input name="organisation" autocomplete="organization" maxlength="150"></label>
  <label>${c.brief}<textarea name="product" rows="3" maxlength="1200" dir="auto"></textarea></label><input type="hidden" name="message" value="${c.subject}">
  <div data-turnstile></div><button type="submit" class="fc-primary">${c.send}</button><p class="fc-status" role="status" data-form-status></p></form>
  <a class="fc-subtle" href="${mail}">${c.mail}</a><p class="fc-confirm"><a href="${privacyPath}">${c.privacy}</a></p></section></div></main>${renderFooter(lang,frame)}</body></html>`;
}
