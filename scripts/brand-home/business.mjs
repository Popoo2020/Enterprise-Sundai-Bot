import { providerCollaboration } from './provider-collaboration.mjs';
import { callUrl } from './call.mjs';

const serviceSlugs = ['secure-ai-automation','compliance-ai-governance','private-ai-agents-rag','cloud-security'];
const copy = {
  he: {
    title:"עודף עבודה ידנית? החלטה על כלי AI חדש?", lead:"לחברות של 10–100 עובדים ולמשרדי שירותים מקצועיים. בחרו תהליך שגוזל זמן או החלטה שדורשת בדיקת סיכונים.",
    services:[
      ["אוטומציה מאובטחת עם AI", "הצוות מעתיק פניות מהמייל ל־CRM? מחברים בין המערכות ומכינים טיוטת תשובה שאדם מאשר לפני השליחה.", "מודדים דקות עבודה, הקלדה חוזרת ועלות AI לכל פנייה."],
      ["ממשל AI ובדיקת ספקים", "מנהלי IT, טכנולוגיה וציות מקבלים המלצה מנומקת לפני רכישת כלי, חיבור מערכת או מתן גישה לנתונים.", "Decision Review · בדיקה של החלטה אחת ב־<bdi>€490</bdi>."],
      ['עוזר AI לידע ארגוני','עובדת שואלת מה נוהל ההחזרות ומקבלת תשובה שמפנה לסעיף המדויק במסמך שמותר לה לקרוא.','עוזר פנימי עם מקורות והרשאות.'],
      ['סייבר ואבטחת ענן','לפני השקת מערכת בודקים זהויות, הרשאות ותהליך פיתוח, ומתעדפים את הממצאים לפי הסיכון.','ממצאים, סדר תיקון ובדיקת התיקונים.']
    ], call:"לתיאום שיחת היכרות חינם · 20 דקות", proof:'איך זה עובד ב־Ariel’s Pizza'
  },
  en: {
    title:"Too much admin? An AI purchase to approve?", lead:"For professional services firms and teams of 10–100. Start with one task that takes too long or one AI decision that needs a second pair of eyes.",
    services:[
      ["Secure AI Automation", "Still copying enquiries from email to your CRM? Connect the two and give staff a draft reply to approve before sending.", "Track staff minutes, manual entries and AI cost per enquiry."],
      ["AI governance and vendor reviews", "IT leads, CTOs and compliance managers get a written recommendation before buying an AI tool, connecting systems or granting data access.", "Decision Review · €490 for one decision."],
      ['AI assistants for company knowledge','A colleague asks about returns and gets the relevant policy passage from a document they can access.','An internal assistant with sources and access controls.'],
      ['Cybersecurity and cloud','Before a release, we review identities, permissions and the delivery process, then prioritise findings by risk.','Findings, a remediation plan and retesting.']
    ], call:"Book a free 20-minute call", proof:'See the work at Ariel’s Pizza'
  },
  sv: {
    title:"För mycket administration? Dags att köpa in AI?", lead:"För tjänsteföretag och team med 10–100 anställda. Välj ett moment som tar för lång tid eller ett AI-beslut som ni behöver underlag för.",
    services:[
      ["Säker AI-automatisering", "Kopierar ni kundärenden från mejlen till ert CRM? Vi kopplar ihop systemen och låter en medarbetare godkänna svaret före utskick.", "Mät arbetstid, manuella inmatningar och AI-kostnad per ärende."],
      ["AI-styrning och leverantörsgranskning", "IT-chefer, teknikchefer och ansvariga för regelefterlevnad får en skriftlig rekommendation inför inköp, integration eller åtkomst till data.", "Decision Review · 490 € för ett beslut."],
      ['AI-assistenter för intern kunskap','En kollega frågar om returer och får svar med hänvisning till rätt avsnitt i ett dokument som hon får läsa.','En intern assistent med källor och åtkomstkontroll.'],
      ['Cybersäkerhet och moln','Inför en lansering granskar vi identiteter, behörigheter och utvecklingsflödet. Fynden prioriteras efter risk.','Fynd, åtgärdsplan och kontroll av genomförda åtgärder.']
    ], call:"Boka ett kostnadsfritt samtal på 20 minuter", proof:'Se arbetet på Ariel’s Pizza'
  },
  da: {
    title:"For meget administration? Skal I købe et AI-værktøj?", lead:"Til rådgivningsvirksomheder og teams med 10–100 ansatte. Vælg en opgave, der tager for lang tid, eller en AI-beslutning, som I har brug for at få belyst.",
    services:[
      ["Sikker AI-automatisering", "Kopierer I henvendelser fra mail til CRM? Vi forbinder systemerne og lader en medarbejder godkende svaret, før det sendes.", "Mål arbejdstid, manuelle indtastninger og AI-udgift pr. sag."],
      ["AI-styring og leverandørvurdering", "IT-chefer, teknologichefer og complianceansvarlige får en skriftlig anbefaling før et indkøb, en integration eller en godkendelse af dataadgang.", "Decision Review · 490 € for én beslutning."],
      ['AI-assistenter til intern viden','En kollega spørger om returnering og får svar med henvisning til det rette afsnit i et dokument, hun har adgang til.','En intern assistent med kilder og adgangskontrol.'],
      ['Cybersikkerhed og cloud','Før lancering gennemgår vi identiteter, rettigheder og udviklingsforløb. Fund prioriteres efter risiko.','Fund, en plan for udbedring og kontrol af rettelser.']
    ], call:"Book en gratis samtale på 20 minutter", proof:'Se arbejdet hos Ariel’s Pizza'
  }
};

const icons = {
  'compliance-ai-governance': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 3.5 5.8v6.1c0 5.2 3.6 8.4 8.5 10.1 4.9-1.7 8.5-4.9 8.5-10.1V5.8L12 2Zm-4 10 2.7 2.7 5.7-6"/></svg>',
  'cloud-security': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h18v13H3zM8 21h8M10 18v3m4-3v3M6 8h2m2 0h2M7 14l3-3 3 2 3-3 2 2"/></svg>',
  'secure-ai-automation': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3h6v6H3zM15 15h6v6h-6zM10 6h5a3 3 0 0 1 3 3v4m-3-3 3 3 3-3M14 18H9a3 3 0 0 1-3-3v-4"/></svg>',
  'private-ai-agents-rag': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h14a2 2 0 0 1 2 2v8H9l-6 4V4Zm5 4h6m-6 3h4m1 7h4l4 3V9"/></svg>'
};

export function businessSection(locale, base) {
  const c = copy[locale];
  const cards = c.services.map(([name, example, result], i) => `<a class="pc-service" href="${base}services/${serviceSlugs[i]}/"><span class="pc-service-icon" aria-hidden="true">${icons[serviceSlugs[i]]}</span><h3>${name}</h3><p>${example}</p><strong class="biz-result">${result}</strong></a>`);
  return `<div class="pc-sections pc-business"><section class="pc-catalogue" id="organisations" aria-labelledby="biz-title"><div class="pc-wrap"><header class="biz-heading"><h2 id="biz-title">${c.title}</h2><p>${c.lead}</p></header><div class="biz-grid">${cards.join('')}</div><div class="biz-actions"><a class="fr-action" href="${callUrl(locale,'organisations','service')}">${c.call}</a><a href="#evidence">${c.proof}</a></div></div></section>${providerCollaboration(locale)}</div>`;
}
