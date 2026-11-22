import { callArrow, callUrl } from './call.mjs';

export const trainingPartners = {
  en: {
    nav: 'For training providers', summary: 'AI trainers for your client programmes.', courseLink: 'Running this course for a client? Teach it with SundAI',
    heading: 'Need an AI trainer for a programme you run?',
    offer: 'If you organise training for schools, employers or trade unions, SundAI can cover a session, teach an extra group or deliver a workshop series.',
    model: 'You keep the client relationship. We can teach on your behalf or alongside your trainers, with the content, teaching language and dates agreed in advance.',
    action: 'Discuss a training partnership', time: '20 minutes · free'
  },
  he: {
    nav: 'לספקי הדרכה ולשותפים', summary: 'מדריכי AI לתוכניות שאתם מפעילים.', courseLink: 'מארגנים את הקורס עבור לקוח? הכירו את אפשרויות שיתוף הפעולה',
    heading: 'צריכים מדריך AI לתוכנית שאתם מפעילים?',
    offer: 'אם אתם מארגנים הדרכות לבתי ספר, למעסיקים או לארגוני עובדים, אפשר לפנות אלינו למילוי מקום, לפתיחת קבוצה נוספת או להעברת סדרת סדנאות.',
    model: 'אתם ממשיכים לנהל את הקשר עם הלקוח. אנחנו מלמדים מטעמכם במיקור חוץ או לצד המדריכים שלכם, לפי התוכן, שפת ההדרכה והמועדים שנסכם יחד.',
    action: 'נדבר על שיתוף פעולה בהדרכה', time: '20 דקות · ללא עלות'
  },
  sv: {
    nav: 'För utbildningsanordnare', summary: 'AI-utbildare till era kunduppdrag.', courseLink: 'Ordnar ni kursen åt en kund? Samarbeta med SundAI',
    heading: 'Behöver ni en AI-utbildare till ett uppdrag?',
    offer: 'Ordnar ni utbildningar för skolor, arbetsgivare eller fackförbund? SundAI kan hoppa in på ett pass, ta en extra grupp eller hålla en serie workshoppar.',
    model: 'Ni behåller kundkontakten. Vi undervisar som underleverantör eller tillsammans med era utbildare och kommer överens med er om innehåll, språk och datum i förväg.',
    action: 'Prata med oss om ett utbildningssamarbete', time: '20 minuter · kostnadsfritt'
  },
  da: {
    nav: 'For kursusudbydere', summary: 'AI-undervisere til jeres kunders kurser.', courseLink: 'Arrangerer I kurset for en kunde? Samarbejd med SundAI',
    heading: 'Mangler I en AI-underviser til et kursus?',
    offer: 'Arrangerer I kurser for skoler, arbejdsgivere eller fagforeninger? SundAI kan vikariere, tage et ekstra hold eller stå for en serie workshops.',
    model: 'I beholder kundekontakten. Vi underviser som underleverandør eller sammen med jeres undervisere. Inden vi går i gang, aftaler vi indhold, sprog og datoer.',
    action: 'Tal med os om et undervisningssamarbejde', time: '20 minutter · gratis'
  }
};

export function renderTrainingPartners(locale) {
  const t = trainingPartners[locale];
  return `<section class="pc-wrap pc-training-partners" id="training-partners" aria-labelledby="training-partners-heading">
    <div class="pc-partner-heading"><p>${t.nav}</p><h2 id="training-partners-heading">${t.heading}</h2></div>
    <div class="pc-partner-detail"><p>${t.offer}</p><p>${t.model}</p>
      <div class="pc-partner-action"><a href="${callUrl(locale, 'training-partner', 'training-partners')}">${t.action} ${callArrow}</a><span>${t.time}</span></div>
    </div>
  </section>`;
}
