import { contactEmail } from './call.mjs';

const copy = {
  en: {
    quoteCta: 'Get a quote for a 90-minute class workshop', title: 'Try a workshop with one class',
    format: '90 minutes · Grades 8–9 · Up to 24 pupils',
    activity: 'Would you share this clip? Working in pairs, pupils trace who posted it and check one claim against another source. Each pair records its evidence and explains its decision.',
    worksheet: 'Classroom worksheet (PDF)', teacher: 'For the teacher', handout: 'Keep the source-check worksheet and use it again with a new clip.',
    next: 'In the full four-session course, pupils also build a working website and improve it after another pair tests it.',
    quote: 'Get a quote for your class', startingPrice: 'From €99 per class',
    price: 'A live, 90-minute online workshop for up to 24 pupils, with a worksheet for the teacher. We’ll confirm the total in writing before you book.',
    school: 'School name', email: 'Your work email', grade: 'Year group', count: 'Number of pupils',
    select: 'Select a year group', years: ['Grade 8', 'Grade 9', 'Mixed grades 8 and 9'],
    submit: 'Request my class quote', safety: 'Use a staff email address. We only need the group size and year, so please leave out pupils’ names.',
    byEmail: 'Request the quote by email', subject: 'School quote for a 90-minute class pilot',
    notice: 'Privacy', privacy: '/privacy.html',
  },
  he: {
    quoteCta: 'בקשו הצעה לשיעור ניסיון של 90 דקות', title: 'שיעור ניסיון לכיתה אחת',
    format: '90 דקות · כיתות ח׳–ט׳ · עד 24 תלמידים',
    activity: 'הייתם משתפים את הסרטון הזה? התלמידים עובדים בזוגות, מבררים מי פרסם אותו ובודקים טענה אחת מול מקור נוסף. כל זוג מתעד מה מצא ומנמק אם כדאי לשתף.',
    worksheet: 'דף הפעילות לכיתה (PDF)', teacher: 'למורה', handout: 'דף פעילות לבדיקת מקורות, שאפשר להשתמש בו שוב בכיתה עם סרטון אחר.',
    next: 'בקורס המלא, שנמשך ארבעה מפגשים, התלמידים גם בונים אתר ומשפרים אותו בעקבות משוב מזוג אחר.',
    quote: 'קבלו הצעת מחיר לכיתה', startingPrice: 'החל מ־99 אירו לכיתה',
    price: 'שיעור מקוון של 90 דקות לכיתה של עד 24 תלמידים, כולל דף פעילות למורה. תקבלו את המחיר הסופי בכתב לפני ההזמנה.',
    school: 'שם בית הספר', email: 'אימייל לחזרה', grade: 'שכבת גיל', count: 'מספר תלמידים',
    select: 'בחרו שכבת גיל', years: ['כיתה ח׳', 'כיתה ט׳', 'קבוצה משולבת של כיתות ח׳ וט׳'],
    submit: 'שלחו לי הצעת מחיר', safety: 'הפנייה מיועדת לאנשי צוות בית הספר. די לציין את שכבת הגיל ואת מספר התלמידים. אין צורך בשמות התלמידים.',
    byEmail: 'בקשת הצעה בדוא״ל', subject: 'הצעת מחיר לשיעור ניסיון של 90 דקות לכיתה',
    notice: 'פרטיות', privacy: '/privacy.html',
  },
  sv: {
    quoteCta: 'Be om en offert för ett 90-minuterspass med en klass', title: 'Prova ett pass med en klass',
    format: '90 minuter · Årskurs 8–9 · Högst 24 elever',
    activity: 'Skulle ni dela det här klippet? Eleverna arbetar i par, tar reda på vem som publicerat klippet och kontrollerar ett påstående mot en annan källa. Varje par skriver ner vad de hittat och motiverar sitt beslut.',
    worksheet: 'Arbetsblad för klassen (PDF)', teacher: 'Till läraren', handout: 'Ni får ett arbetsblad för källkritik som ni kan använda igen med ett annat klipp.',
    next: 'I hela kursen på fyra pass bygger eleverna också en webbplats och förbättrar den efter att ett annat par har testat den.',
    quote: 'Be om en offert för klassen', startingPrice: 'Från 99 euro per klass',
    price: 'Ett lärarlett pass på distans för upp till 24 elever. Passet tar 90 minuter och läraren får ett arbetsblad. Ni får totalpriset skriftligt innan ni bokar.',
    school: 'Skolans namn', email: 'Din e-post på skolan', grade: 'Årskurs', count: 'Antal elever',
    select: 'Välj årskurs', years: ['Årskurs 8', 'Årskurs 9', 'Blandad grupp från årskurs 8 och 9'],
    submit: 'Be om en offert', safety: 'Ange en e-postadress till en vuxen på skolan. Årskurs och antal räcker. Vi behöver inga elevnamn.',
    byEmail: 'Be om offerten via mejl', subject: 'Offert för ett pilotpass på 90 minuter för en klass',
    notice: 'Integritet', privacy: '/sv/integritet.html',
  },
  da: {
    quoteCta: 'Få et tilbud på 90 minutters workshop for én klasse', title: 'Prøv en workshop med én klasse',
    format: '90 minutter · 8.–9. klasse · Op til 24 elever',
    activity: 'Ville I dele den her video? Eleverne arbejder to og to, finder ud af, hvem der har lagt den ud, og tjekker en påstand i en anden kilde. Hvert par skriver ned, hvad de har fundet, og begrunder, om de vil dele videoen.',
    worksheet: 'Arbejdsark til klassen (PDF)', teacher: 'Til læreren', handout: 'I får et arbejdsark til kildekritik, som I kan bruge igen med en anden video.',
    next: 'På det fulde kursus over fire mødegange bygger eleverne også et website og forbedrer det, efter at et andet par har testet det.',
    quote: 'Få et tilbud til klassen', startingPrice: 'Fra 99 euro pr. klasse',
    price: 'En onlineworkshop på 90 minutter med en underviser, plads til op til 24 elever og et arbejdsark til læreren. I får den samlede pris på skrift, før I booker.',
    school: 'Skolens navn', email: 'Din arbejdsmail', grade: 'Klassetrin', count: 'Antal elever',
    select: 'Vælg klassetrin', years: ['8. klasse', '9. klasse', 'Blandet hold fra 8. og 9. klasse'],
    submit: 'Send mig et tilbud', safety: 'Brug en mailadresse til en voksen på skolen. Klassetrin og antal er nok. Vi har ikke brug for elevernes navne.',
    byEmail: 'Bed om tilbuddet via mail', subject: 'Tilbud på en workshop på 90 minutter for én klasse',
    notice: 'Privatliv', privacy: '/da/privatliv.html',
  },
};

export function schoolPilotQuoteLabel(locale) {
  return copy[locale].quoteCta;
}

export function renderSchoolPilot(locale) {
  const t = copy[locale];
  const emailBody = [t.school, t.grade, t.count].map(field => field + ': ').join('\n');
  const emailLink = 'mailto:' + contactEmail + '?subject=' + encodeURIComponent(t.subject) + '&amp;body=' + encodeURIComponent(emailBody);
  return `<section class="school-pilot" id="school-pilot" aria-labelledby="school-pilot-title">
    <div class="course-wrap school-pilot-grid">
      <div class="school-pilot-copy">
        <h2 id="school-pilot-title">${t.title}</h2>
        <p class="school-pilot-format">${t.format}</p>
        <p class="school-pilot-activity">${t.activity}</p>
        <div class="school-pilot-handout"><h3>${t.teacher}</h3><p>${t.handout}</p><a class="school-pilot-worksheet" href="/assets/brand-home/SundAI_Class_Pilot_Worksheet_${locale.toUpperCase()}.pdf">${t.worksheet}</a></div>
        <p class="school-pilot-next">${t.next}</p>
      </div>
      <section class="school-quote" id="school-proposal" aria-labelledby="school-quote-title">
        <h3 id="school-quote-title">${t.quote}</h3>
        <p class="school-quote-start"><strong>${t.startingPrice}</strong></p>
        <p class="school-quote-price">${t.price}</p>
        <form id="school-proposal-form" data-upgrade-form data-kind="school-pilot" data-lang="${locale}" action="/api/contact" method="post" aria-labelledby="school-quote-title" hidden>
          <div class="school-quote-fields">
            <label>${t.school}<input name="organisation" autocomplete="organization" minlength="2" maxlength="100" required></label>
            <label>${t.email}<input name="email" type="email" dir="ltr" autocomplete="email" maxlength="200" required></label>
            <label>${t.grade}<select name="grade" required><option value="">${t.select}</option>${t.years.map(year => `<option value="${year}">${year}</option>`).join('')}</select></label>
            <label>${t.count}<input name="groupSize" type="number" inputmode="numeric" min="1" max="24" step="1" required></label>
          </div>
          <p class="school-quote-note">${t.safety} <a href="${t.privacy}">${t.notice}</a></p>
          <div data-turnstile></div><button class="btn filled school-quote-submit" type="submit">${t.submit}</button>
          <p class="school-quote-status" data-form-status aria-live="polite" role="status"></p>
        </form>
        <a class="school-quote-email" data-school-email href="${emailLink}">${t.byEmail}</a>
      </section>
    </div>
  </section>`;
}
