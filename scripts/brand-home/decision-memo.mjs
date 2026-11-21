import {htmlEscape} from '../seo-render.mjs';

const copy = {
  en: {
    jump: 'Read a sample memo',
    title: 'Inside a Decision Review',
    intro: 'A service lead wants faster replies. Their IT manager needs to decide whether to let an AI assistant work with customer emails.',
    label: 'Decision memo · fictional example',
    question: 'Should the assistant draft customer replies?',
    recommendation: 'Recommendation',
    answer: 'Approve a draft-only pilot for 50 routine enquiries. Keep mailbox access and sending permissions with the service team.',
    rows: [
      ['What the assistant can use', 'Staff remove names and contact details, then share the question and an approved reply template. Attachments stay in the mailbox.'],
      ['Who approves each reply', 'A team member checks the draft against the template, corrects it and sends it. The service lead owns the pilot.'],
      ['When to stop', 'Pause immediately if personal details reach the assistant or a reply goes out without approval. The service lead reviews the incident before restarting.'],
      ['The decision after 50 enquiries', 'Compare median handling time, including checks, with the previous 50 similar enquiries. Continue only if handling is faster, at most two drafts contained factual errors and no stop condition occurred.']
    ],
    cta: 'Discuss a decision with SundAI'
  },
  he: {
    jump: 'לקריאת מסמך לדוגמה',
    title: 'כך נראית המלצה בכתב',
    intro: 'מנהלת השירות רוצה לקצר את זמן המענה. מנהל מערכות המידע צריך להחליט אם לאפשר לעוזר AI לעבוד עם פניות שהתקבלו במייל.',
    label: 'מסמך החלטה · תרחיש להמחשה',
    question: 'האם לאפשר לעוזר לנסח תשובות ללקוחות?',
    recommendation: 'ההמלצה',
    answer: 'לאשר פיילוט של ניסוח טיוטות ל־50 פניות שגרתיות. הגישה לתיבת הדואר והרשאת השליחה נשארות בידי צוות השירות.',
    rows: [
      ['איזה מידע מעבירים לעוזר?', 'הצוות מסיר שמות ופרטי קשר ומעביר את השאלה ותבנית תשובה שאושרה מראש. הקבצים המצורפים נשארים בתיבת הדואר.'],
      ['מי מאשר את התשובה?', 'נציג שירות משווה את הטיוטה לתבנית, מתקן ושולח בעצמו. האחריות לפיילוט אצל מנהלת השירות.'],
      ['מתי עוצרים?', 'אם פרטים אישיים הגיעו לעוזר או שנשלחה תשובה ללא אישור, עוצרים מיד. מנהלת השירות בודקת מה קרה לפני חידוש הפיילוט.'],
      ['מה יכריע אחרי 50 פניות?', 'משווים את זמן הטיפול החציוני, כולל הבדיקה, ל־50 פניות דומות שטופלו קודם. ממשיכים רק אם הזמן התקצר, נמצאו טעויות עובדתיות בשתי טיוטות לכל היותר ולא התקיים תנאי עצירה.']
    ],
    cta: 'לשיחה על החלטה שעומדת בפניכם'
  },
  sv: {
    jump: 'Läs ett exempel på ett beslutsunderlag',
    title: 'Så ser beslutsunderlaget ut',
    intro: 'Kundservicechefen vill korta svarstiden. IT-chefen behöver avgöra om en AI-assistent ska få arbeta med frågor som kommer in via mejl.',
    label: 'Beslutsunderlag · fiktivt exempel',
    question: 'Ska assistenten få skriva svarsutkast?',
    recommendation: 'Rekommendation',
    answer: 'Godkänn en pilot där assistenten skriver utkast till svar på 50 rutinärenden. Kundservicen behåller både åtkomsten till inkorgen och rätten att skicka svar.',
    rows: [
      ['Vad får assistenten läsa?', 'Personalen tar bort namn och kontaktuppgifter och delar sedan frågan och en godkänd svarsmall. Bilagorna stannar i inkorgen.'],
      ['Vem godkänner svaret?', 'En medarbetare granskar utkastet mot mallen, rättar vid behov och skickar svaret. Kundservicechefen ansvarar för piloten.'],
      ['När ska piloten pausas?', 'Pausa direkt om personuppgifter når assistenten eller om ett svar skickas utan godkännande. Kundservicechefen utreder händelsen innan arbetet återupptas.'],
      ['Beslut efter 50 ärenden', 'Jämför medianen för handläggningstiden, inklusive granskning, med de senaste 50 liknande ärendena. Fortsätt bara om tiden har minskat, högst två utkast innehöll sakfel och inget stoppvillkor uppfylldes.']
    ],
    cta: 'Prata med oss om ert beslut'
  },
  da: {
    jump: 'Læs et eksempel på et beslutningsoplæg',
    title: 'Sådan ser beslutningsoplægget ud',
    intro: 'Kundeservicechefen vil forkorte svartiden. IT-chefen skal beslutte, om en AI-assistent må arbejde med kundehenvendelser, der kommer ind på mail.',
    label: 'Beslutningsoplæg · fiktivt eksempel',
    question: 'Må assistenten skrive udkast til kundesvar?',
    recommendation: 'Anbefaling',
    answer: 'Godkend et pilotforløb, hvor assistenten skriver udkast til svar på 50 rutinehenvendelser. Kun kundeservice har adgang til indbakken og lov til at sende svar.',
    rows: [
      ['Hvad må assistenten læse?', 'Medarbejderen fjerner navne og kontaktoplysninger og deler derefter spørgsmålet og en godkendt svarskabelon. Vedhæftede filer bliver i indbakken.'],
      ['Hvem godkender svaret?', 'En medarbejder sammenholder udkastet med skabelonen, retter det og sender svaret. Kundeservicechefen har ansvaret for pilotforløbet.'],
      ['Hvornår skal forsøget stoppes?', 'Stop straks, hvis assistenten modtager personoplysninger, eller et svar bliver sendt uden godkendelse. Kundeservicechefen undersøger hændelsen, før forsøget genoptages.'],
      ['Beslutning efter 50 henvendelser', 'Sammenlign den typiske behandlingstid (medianen), inklusive kontrol, med de foregående 50 lignende henvendelser. Fortsæt kun, hvis tiden er faldet, højst to udkast indeholdt faktuelle fejl, og ingen af stopkriterierne blev udløst.']
    ],
    cta: 'Tal med os om jeres beslutning'
  }
};

export function renderMemoJump(lang) {
  return `<a class="dm-jump" href="#decision-memo">${htmlEscape(copy[lang].jump)}</a>`;
}

export function renderDecisionMemo(lang, contactHref) {
  const t = copy[lang];
  const rows = t.rows.map(([term, detail]) =>
    `<div><dt>${htmlEscape(term)}</dt><dd>${htmlEscape(detail)}</dd></div>`).join('');
  return `<section class="dm-sample" id="decision-memo" aria-labelledby="dm-title" tabindex="-1">
    <header class="dm-intro"><h2 id="dm-title">${htmlEscape(t.title)}</h2><p>${htmlEscape(t.intro)}</p></header>
    <article class="dm-sheet" aria-labelledby="dm-case">
      <p class="dm-caption">${htmlEscape(t.label)}</p>
      <h3 id="dm-case">${htmlEscape(t.question)}</h3>
      <div class="dm-verdict"><strong>${htmlEscape(t.recommendation)}</strong><p>${htmlEscape(t.answer)}</p></div>
      <dl class="dm-rows">${rows}</dl>
      <a class="dm-contact" href="${contactHref}">${htmlEscape(t.cta)}</a>
    </article>
  </section>`;
}
