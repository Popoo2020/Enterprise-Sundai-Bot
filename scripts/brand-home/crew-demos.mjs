const copy = {
  en: {
    choose: 'Choose an offer to check your answer.',
    offers: ['Offer A', 'Offer B'],
    shipping: ['{item} + {shipping} delivery', '{total}, delivery included'],
    feedback: ['With delivery, this costs {first}. That’s {one} over budget.', 'Yes. The total is {second}, leaving {one}. Before you buy, how would you check who the seller is?'],
    review: 'Inspect a sample draft',
    requestLabel: 'Customer enquiry', request: 'Could we meet on Thursday?',
    draftLabel: 'AI draft', draft: 'Thursday is confirmed.',
    check: 'The calendar hasn’t been checked. A colleague verifies availability and edits the reply before sending.',
  },
  he: {
    choose: 'בחרו הצעה ובדקו את התשובה שלכם.',
    offers: ['הצעה א׳', 'הצעה ב׳'],
    shipping: ['{item} ועוד {shipping} למשלוח', '{total} כולל משלוח'],
    feedback: ['יחד עם המשלוח תשלמו {first}. זה אירו אחד מעל התקציב.', 'נכון. המחיר הכולל הוא {second}, כך שנשאר אירו אחד. לפני שקונים, איך תבדקו מי עומד מאחורי ההצעה?'],
    review: 'בדקו טיוטה לדוגמה',
    requestLabel: 'פניית הלקוח', request: 'אפשר להיפגש ביום חמישי?',
    draftLabel: 'טיוטת AI', draft: 'הפגישה ביום חמישי מאושרת.',
    check: 'היומן עדיין לא נבדק. לפני השליחה, איש צוות בודק מתי אפשר להיפגש ומתקן את התשובה.',
  },
  sv: {
    choose: 'Välj ett erbjudande och se om det ryms i budgeten.',
    offers: ['Erbjudande A', 'Erbjudande B'],
    shipping: ['{item} + {shipping} i frakt', '{total} inklusive frakt'],
    feedback: ['Med frakten blir det {first}. Det är en euro över budget.', 'Ja. Totalt betalar du {second} och har en euro kvar. Hur skulle du kolla upp säljaren före köpet?'],
    review: 'Granska ett svarsutkast',
    requestLabel: 'Kundens fråga', request: 'Kan vi träffas på torsdag?',
    draftLabel: 'AI-utkast', draft: 'Mötet på torsdag är bekräftat.',
    check: 'Ingen har kollat kalendern än. En medarbetare kontrollerar lediga tider och rättar svaret före utskick.',
  },
  da: {
    choose: 'Vælg et tilbud og se, om det holder budgettet.',
    offers: ['Tilbud A', 'Tilbud B'],
    shipping: ['{item} + {shipping} i fragt', '{total} inklusive fragt'],
    feedback: ['Med fragt bliver det {first}. Det er én euro over budgettet.', 'Ja. Du betaler {second} i alt og har én euro tilbage. Hvordan ville du tjekke sælgeren inden købet?'],
    review: 'Gennemgå et svarudkast',
    requestLabel: 'Kundens spørgsmål', request: 'Kan vi mødes på torsdag?',
    draftLabel: 'AI-udkast', draft: 'Mødet på torsdag er bekræftet.',
    check: 'Ingen har tjekket kalenderen endnu. En medarbejder finder en ledig tid og retter svaret før afsendelse.',
  },
};

const motionScript = '<script defer src="/assets/brand-home/crew-demos.js"></script>';

function portrait(actor) {
  return `<span class="crew-performer crew-${actor}" aria-hidden="true" data-strip="/brand/crew/v2/${actor}-cue.webp"><img src="/brand/crew/v2/${actor}.webp" alt="" width="256" height="256" decoding="async"></span>`;
}

export function renderOfferExercise(lang, label, question) {
  const c = copy[lang];
  const currency = (n) => new Intl.NumberFormat(lang, {
    style: 'currency', currency: 'EUR', minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
  const amounts = {item: 19.9, shipping: 6.1, total: 24, first: 19.9 + 6.1, second: 24, one: 1};
  const prices = (s) => s.replace(/\{(\w+)\}/g, (_, key) => `<bdi>${currency(amounts[key])}</bdi>`);
  const direction = lang === 'he' ? 'rtl' : 'ltr';
  const options = c.offers.map((offer, i) => `<details class="crew-answer" name="crew-offers" dir="${direction}"><summary><span><strong>${offer}</strong><span class="crew-price">${prices(c.shipping[i])}</span></span><i class="crew-plus" aria-hidden="true"></i></summary><p class="crew-feedback">${prices(c.feedback[i])}</p></details>`).join('');
  return `<aside class="example crew-lesson" aria-labelledby="crew-offer-title"><div class="example-window"><p class="sample-label">${label}</p><h2 id="crew-offer-title">${question}</h2><p class="crew-instruction">${c.choose}</p><div class="crew-choices">${options}${portrait('mark')}</div></div></aside>${motionScript}`;
}

export function renderReviewExample(lang) {
  const c = copy[lang];
  return `<details class="crew-review"><summary><span>${c.review}</span><i class="crew-plus" aria-hidden="true"></i></summary><div class="crew-review-body"><dl><dt>${c.requestLabel}</dt><dd>${c.request}</dd><dt>${c.draftLabel}</dt><dd class="crew-draft-line"><span><mark>${c.draft}</mark></span>${portrait('bot')}</dd></dl><p>${c.check}</p></div></details>${motionScript}`;
}
