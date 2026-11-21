import { callUrl } from './call.mjs';
import { renderContextCue, crewMotionScript } from './crew-demos.mjs';
import { renderHeader, renderFooter } from './frame.mjs';

export const agentWorkflowSlug = 'enterprise-ai-agents';
const parentSlug = 'private-ai-agents-rag';
const base = lang => lang === 'en' ? '/' : '/' + lang + '/';
const servicePath = (lang, slug) => base(lang) + 'services/' + slug + '/';

const copy = {
  en: {
    title: 'Enterprise AI agents with internal RAG and multiple models',
    meta: 'Build an AI agent that checks supplier invoices against internal contracts. Compare a single-model pilot with a multi-model workflow and measure cost per reviewed case.',
    linkTitle: 'AI agents for document checks and approvals',
    linkDescription: 'See how an agent finds a contract clause, flags an invoice discrepancy and prepares the evidence for your team.',
    linkAction: 'Explore AI agents for operations',
    parent: 'Private AI assistants and RAG',
    headline: ['Custom AI agents', 'for your team'],
    lead: 'We build agents that search the internal documents your team can access. When a task calls for several models, the agents share the work. For an unexpected freight charge, one finds the signed terms and another prepares a query for finance to approve.',
    cta: 'Discuss a pilot · 20 minutes, free',
    sample: 'Illustrative invoice review',
    detailRows: [['Agreed price, delivery included', '€1,200'], ['Supplier invoice', '€1,275'], ['Freight charge to check', '€75']],
    handoff: 'The reviewer opens the signed order before contacting the supplier.',
    routingTitle: 'When does a second model earn its place?',
    modes: [
      ['One agent with internal RAG', 'Start with one approved source. Retrieval-augmented generation (RAG) finds passages the signed-in employee can access and gives the model the clause it needs. The reviewer can open the relevant version of the order.'],
      ['Several agents with distinct jobs', 'For a longer workflow, one agent extracts invoice lines, another retrieves the contract and a third drafts the enquiry. Code verifies the arithmetic. These agents can all use the same language model.'],
      ['A second model for exceptions', 'We can route approved tasks to Claude from Anthropic, Gemini from Google or GPT models through the OpenAI API, separately from the ChatGPT app. Add an independent reading when clauses conflict or a scan is unclear. Agree the provider, permitted fields and spending limit before connecting it.']
    ],
    skip: "Skip to content",
    collaboration: ["One exception, three models", "Suppose the invoice is a scan and a contract amendment changes the freight terms. Gemini could read the cropped invoice line, Claude compare the two contract clauses and a GPT model draft a question using the approved findings. Each model gets only its part. The roles are interchangeable, and routine invoices can stay on the single-model route."],
    caseTitle: 'Who can release the payment?',
    caseIntro: 'In this example the agent flags a €75 difference. Finance still needs to check for a later amendment before disputing the charge. The reviewer sees both amounts, the relevant clause and anything the agent could not verify.',
    checks: [
      'The application enforces the employee’s permissions before it retrieves a contract.',
      'Each approved provider receives only the fields needed for its task. Agree retention settings and log the case ID, model and outcome.',
      'Missing or conflicting evidence sends the case to a reviewer. Sending an email, posting an entry or releasing a payment requires approval from an authorised employee.'
    ],
    measureTitle: 'What would six minutes per invoice be worth?',
    measureIntro: 'Illustrative monthly calculation for a team that reviews 300 comparable cases. Handling time falls from 12 to 6 minutes, including human review and corrections.',
    metrics: [['30 hours', 'Team capacity released per month'], ['€1,200', 'Value of that time at €40 per hour'], ['€900', 'Estimated value after €300 in monthly running costs']],
    measureNote: 'Include model calls, document retrieval, monitoring and support in running costs. Deduct one-off implementation costs separately. Released hours turn into cash savings when an expense such as overtime or external processing actually falls.',
    pilotTitle: 'What your team gets from the pilot',
    pilot: [
      ['A baseline and a mandate', 'Select one document source and anonymised cases. Agree what an agent may read, who can approve a draft and the current time and cost per completed case.'],
      ['A tested workflow', 'Run in draft mode. Test conflicting clauses, restricted records and missing pages. Measure missed discrepancies, false alarms, reviewer effort and model cost.'],
      ['A decision on rollout', 'We hand over the test results, access map and operating budget. You decide whether to keep one model, fund a second for difficult cases or stop. Additional providers are scoped separately.']
    ],
    pilotCta: 'Bring one recurring document check',
    guideLink: 'How to deploy a language model securely in your business'
  },
  he: {
    title: 'סוכני AI לארגונים עם RAG פנימי ושילוב מודלים',
    meta: 'כך סוכן AI משווה חשבונית לחוזה פנימי, מציג את הסעיף הרלוונטי ומכין טיוטה לבדיקה. בפיילוט מודדים זמן, דיוק ועלות ומחליטים מתי כדאי לשלב מודל נוסף.',
    linkTitle: 'סוכני AI לבדיקת מסמכים ולטיפול בחריגים',
    linkDescription: 'איך סוכן מאתר סעיף בחוזה, מזהה פער בחשבונית ומכין את כל מה שצריך כדי שהצוות יוכל להחליט.',
    linkAction: 'כך עובד סוכן AI בארגון',
    parent: 'עוזרי AI פרטיים וחיפוש במסמכים',
    headline: ['פיתוח סוכני AI', 'לארגונים'],
    lead: 'אנחנו מפתחים סוכנים שמחפשים במסמכי הארגון לפי הרשאות העובדים. במשימה מורכבת אפשר לחלק את העבודה בין כמה מודלים. למשל, כשמופיע חיוב משלוח מפתיע, סוכן אחד מאתר את הסעיף בחוזה ואחר מכין פנייה לספק לאישור הנהלת החשבונות.',
    cta: 'שיחת היכרות על פיילוט · 20 דקות ללא עלות',
    sample: 'דוגמה לבדיקת חשבונית',
    detailRows: [['המחיר בהזמנה, כולל הובלה', '€1,200'], ['הסכום בחשבונית', '€1,275'], ['חיוב הובלה לבירור', '€75']],
    handoff: 'לפני הפנייה לספק, העובדת פותחת את ההזמנה החתומה ובודקת את הסעיף.',
    routingTitle: 'מתי כדאי לשלב מודל נוסף?',
    modes: [
      ['סוכן אחד עם גישה לידע פנימי', 'מתחילים במקור מידע מאושר אחד. בשיטה שנקראת RAG, המערכת מחפשת במסמכים שהעובדת רשאית לקרוא ומעבירה למודל את הסעיף הנחוץ. לצד התשובה אפשר לפתוח את גרסת ההזמנה שעליה היא מבוססת.'],
      ['כמה סוכנים עם חלוקת עבודה', 'בתהליך מורכב אפשר להקצות סוכן אחד לקריאת שורות החשבונית, שני לאיתור החוזה ושלישי לניסוח הפנייה. החישוב המספרי מתבצע בקוד. כל הסוכנים האלה יכולים לעבוד עם אותו מודל שפה.'],
      ['מודל נוסף למקרים חריגים', 'אפשר לחלק משימות בין Claude של Anthropic, ‏Gemini של Google ומודלי GPT של OpenAI. החיבור ל־GPT נעשה דרך ה־API של OpenAI, בנפרד מאפליקציית ChatGPT. כשיש סעיפים סותרים או סריקה לא ברורה, אפשר לבקש בדיקה נוספת ממודל אחר. לפני החיבור מסכמים איזה מידע יעבור לכל ספק ומה תהיה תקרת העלות.']
    ],
    skip: "דילוג לתוכן",
    collaboration: ["איך שלושה מודלים יכולים לטפל באותה חריגה?", "נניח שהחשבונית סרוקה ובנספח לחוזה מופיע שינוי בתנאי ההובלה. אפשר לתת ל־Gemini לקרוא את שורת החיוב מתוך קטע הסריקה, ל־Claude להשוות את שני הסעיפים ולמודל GPT לנסח שאלה לספק על סמך הממצאים שאושרו. כל מודל מקבל רק את המידע הדרוש לו. חלוקת התפקידים גמישה, ובחשבוניות שגרתיות אפשר להסתפק במודל אחד."],
    caseTitle: 'מי רשאי לאשר תשלום?',
    caseIntro: 'בדוגמה שלנו הסוכן סימן פער של 75 אירו. לפני שפונים לספק צריך לבדוק אם נחתם נספח מאוחר יותר שמאשר את החיוב. הבודקת מקבלת את שני הסכומים, את הסעיף הרלוונטי ופירוט של מה שעדיין דורש בירור.',
    checks: [
      'המערכת בודקת את הרשאות העובדת לפני שליפת החוזה.',
      'כל ספק מודל שאושר מקבל רק את השדות הדרושים למשימה. מסכמים מראש כמה זמן המידע יישמר ומתעדים את מזהה המקרה, המודל והתוצאה.',
      'כשהמקור חסר או כשיש סתירה, התיק עובר לבדיקה אנושית. שליחת הודעה, רישום בספרים והעברת תשלום מחייבים אישור של עובד מוסמך.'
    ],
    measureTitle: 'כמה שוות שש דקות בכל חשבונית?',
    measureIntro: 'דוגמה לחישוב בצוות שבודק 300 מקרים דומים בחודש. נניח שזמן הטיפול מתקצר מ־12 דקות לשש דקות, כולל בדיקת העובד והתיקונים.',
    metrics: [['30 שעות', 'זמן שמתפנה לצוות בחודש'], ['1,200 אירו', 'שווי הזמן לפי 40 אירו לשעת עבודה'], ['900 אירו', 'ערך חודשי מחושב לאחר 300 אירו של הוצאות שוטפות']],
    measureNote: 'בהוצאות השוטפות כוללים שימוש במודלים, חיפוש במסמכים, ניטור ותמיכה. את עלות ההקמה מפחיתים בנפרד. כדי לחשב חיסכון כספי בפועל, בודקים איזו הוצאה ירדה, למשל שעות נוספות או תשלום לספק חיצוני.',
    pilotTitle: 'מה תקבלו בסוף הפיילוט?',
    pilot: [
      ['מדידת המצב הקיים והגדרת סמכויות', 'בוחרים מקור מסמכים אחד ודוגמאות שהוסרו מהן פרטים מזהים. מסכמים מה הסוכן רשאי לקרוא, מי מאשר טיוטה וכמה זמן וכסף עולה היום טיפול מלא במקרה.'],
      ['תהליך שנבדק עם הצוות שלכם', 'מריצים את הסוכן במצב טיוטה ובודקים סעיפים סותרים, רשומות מוגבלות ומסמכים שחסר בהם עמוד. מודדים פערים שהסוכן פספס, התראות שווא, זמן בדיקה ועלות שימוש במודל.'],
      ['המלצה מנומקת להמשך', 'תקבלו תוצאות בדיקה, מפת הרשאות ותקציב תפעול. יחד נבחן אם כדאי להמשיך עם מודל אחד, להוסיף מודל רק למקרים מורכבים או לעצור. ההיקף והעלות של חיבור לספק נוסף מוסכמים בנפרד.']
    ],
    pilotCta: 'נדבר על בדיקת מסמכים שחוזרת אצלכם',
    guideLink: 'איך מטמיעים מודל שפה בארגון ומונעים דליפת מידע?'
  },
  sv: {
    title: "AI-agenter för företag med intern RAG och flera språkmodeller",
    meta: "Bygg AI-agenter som granskar fakturor mot avtal med intern RAG. Jämför en eller flera språkmodeller och mät kostnaden per färdiggranskat ärende.",
    linkTitle: "AI-agenter för ekonomi och inköp",
    linkDescription: "Se hur en agent hittar avtalsvillkoret bakom en omtvistad avgift och förbereder ett svar till leverantören.",
    linkAction: "Utforska AI-agenter för företag",
    parent: "Privata AI-assistenter och RAG",
    headline: ["AI-agenter", "för ert team"],
    lead: "Vi bygger agenter som söker i de interna dokument som medarbetaren får läsa. Vid mer krävande uppgifter kan agenterna använda olika språkmodeller. Vid en oväntad fraktavgift kan en agent hitta avtalsvillkoret och en annan skriva en fråga som ekonomiavdelningen får godkänna.",
    cta: "Boka ett kostnadsfritt samtal på 20 minuter",
    sample: "Så kan en fakturagranskning se ut",
    detailRows: [
      ["Avtalat pris inklusive leverans", "1 200 €"],
      ["Fakturerat belopp", "1 275 €"],
      ["Frakttillägg att utreda", "75 €"]
    ],
    handoff: "Handläggaren öppnar originalavtalet och kontrollerar villkoret före kontakt med leverantören.",
    routingTitle: "När räcker en modell och när behövs flera?",
    modes: [
      ["En agent med tillgång till era avtal", "Med RAG söker applikationen i de dokument som användaren har behörighet till. En språkmodell får relevanta utdrag och hänvisar till den avtalsversion och den klausul som handläggaren kan kontrollera."],
      ["Flera agenter med olika uppgifter", "En agent hämtar fakturaraderna, en annan kontrollerar uppgifterna mot originalavtalet och en tredje förbereder svaret. Beloppen räknas ihop i kod. De här uppgifterna kan utföras med samma språkmodell."],
      ["En extra modell för svåra ärenden", "Vi kan koppla in Claude från Anthropic, Gemini från Google eller GPT från OpenAI. Agenten når GPT via API. ChatGPT är den separata chattjänsten. Vid motstridiga underlag kan en andra godkänd modell granska utvalda fält. Ni bestämmer vilka uppgifter varje leverantör får ta emot."]
    ],
    skip: "Hoppa till innehållet",
    collaboration: ["Tre modeller för samma undantag", "Anta att fakturan är skannad och ett tilläggsavtal ändrar fraktvillkoren. Gemini kan läsa ett utsnitt av fakturaraden, Claude jämföra de två avtalsvillkoren och en GPT-modell formulera en fråga till leverantören utifrån godkända uppgifter. Varje modell får bara sitt underlag. Rollerna går att byta och vanliga fakturor kan granskas med en enda modell."],
    caseTitle: "Från omtvistad faktura till beslutsunderlag",
    caseIntro: "I räkneexemplet flaggar agenten en möjlig dubbel debitering av frakten. Ekonomiteamet får fakturaraden, avtalsvillkoret och ett utkast till fråga. En behörig medarbetare avgör om beloppet ska bestridas och godkänner bokföringen.",
    checks: ["Applikationen kontrollerar användarens behörighet innan den hämtar ett avtal eller en faktura.", "Varje modell får bara de godkända fält som uppgiften kräver. Vi kontrollerar leverantörens lagringstid och använder ärende- och anrops-ID för uppföljning.", "Om underlag saknas eller motsäger varandra stannar ärendet hos en människa. Bokföring, betalning och mejl till leverantören kräver godkännande."],
    measureTitle: "Vad är sex minuter per ärende värda?",
    measureIntro: "Anta att ni granskar 300 liknande avvikelser i månaden. Mät hela arbetstiden från mottagen faktura till avslutat ärende.",
    metrics: [
      ["30 timmar", "Frigjord tid per månad vid sex minuters tidsvinst per ärende."],
      ["1 200 €", "Värdet av den frigjorda tiden vid en arbetskostnad på 40 euro i timmen."],
      ["900 €", "Beräknat värde per månad efter 300 euro i löpande kostnader."]
    ],
    measureNote: "Exemplet utgår från tolv minuters manuell hantering och sex minuter med agenten, inklusive granskning och rättelser. I driftkostnaden ingår modellanrop, dokumentsökning, övervakning och support. Engångskostnaden för införandet tillkommer. Frigjord tid sänker utgifterna först när exempelvis övertid eller inköpta timmar minskar.",
    pilotTitle: "Så prövar vi det på era fakturor",
    pilot: [
      ["Mät dagens arbete", "Välj anonymiserade ärenden med både korrekta och felaktiga fakturor. Mät handläggningstid, rättelser och kostnad per avslutat ärende."],
      ["Låt agenten ta fram utkast", "Prova med olika behörigheter och facit från ekonomiteamet. Följ upp missade avvikelser, falsklarm och vilka källor som faktiskt styrker beloppen."],
      ["Ta ställning till drift", "Ni får vår rekommendation om källor, agentroller och modellval, en kalkyl över införande och drift samt mätresultat som visar om piloten bör utökas, ändras eller avslutas. Anslutning till ytterligare modellleverantörer offereras separat."]
    ],
    pilotCta: "Diskutera ett pilotärende med SundAI",
    guideLink: "Läs guiden om säker användning av språkmodeller",
  },
  da: {
    title: "AI-agenter til virksomheder med intern RAG og flere sprogmodeller",
    meta: "Brug AI-agenter og intern RAG til at sammenholde fakturaer med aftaler. Afprøv en eller flere sprogmodeller og mål omkostningen pr. færdigbehandlet sag.",
    linkTitle: "AI-agenter til økonomi og indkøb",
    linkDescription: "Se, hvordan en agent finder aftalevilkåret bag et omstridt gebyr og forbereder et svar til leverandøren.",
    linkAction: "Se, hvordan AI-agenter kan bruges i virksomheden",
    parent: "Private AI-assistenter og RAG",
    headline: ["AI-agenter", "til jeres team"],
    lead: "Vi udvikler agenter, der søger i de interne dokumenter, som medarbejderen har adgang til. Ved mere krævende opgaver kan agenterne bruge forskellige sprogmodeller. Dukker der et uventet fragtgebyr op, kan én agent finde vilkåret i aftalen og en anden skrive et udkast, som økonomiafdelingen godkender.",
    cta: "Book en gratis afklaringssamtale på 20 minutter",
    sample: "Eksempel på en fakturakontrol",
    detailRows: [
      ["Aftalt pris med levering", "1.200 €"],
      ["Faktureret beløb", "1.275 €"],
      ["Fragttillæg til afklaring", "75 €"]
    ],
    handoff: "Medarbejderen åbner den oprindelige aftale og kontrollerer vilkåret, inden leverandøren kontaktes.",
    routingTitle: "Hvornår er én model nok, og hvornår giver flere mening?",
    modes: [
      ["Én agent med adgang til jeres aftaler", "Med RAG søger applikationen i de dokumenter, som brugeren har adgang til. En sprogmodel får de relevante uddrag og henviser til den aftaleversion og den bestemmelse, medarbejderen kan kontrollere."],
      ["Flere agenter med hver sin opgave", "Én agent henter fakturalinjerne, en anden kontrollerer oplysningerne mod den oprindelige aftale, og en tredje forbereder svaret. Beløbene beregnes i kode. Agenterne kan godt bruge samme sprogmodel."],
      ["En ekstra model til de vanskelige sager", "Vi kan forbinde løsningen med Claude fra Anthropic, Gemini fra Google eller GPT fra OpenAI. Agenten får adgang til GPT via API. ChatGPT er den separate chattjeneste. Hvis to kilder peger i hver sin retning, kan en anden godkendt model gennemgå udvalgte felter. I afgør, hvilke oplysninger hver leverandør må modtage."]
    ],
    skip: "Gå til indholdet",
    collaboration: ["Tre modeller til den samme afvigelse", "Forestil jer, at fakturaen er scannet, og at et tillæg til aftalen ændrer fragtvilkårene. Gemini kan læse et udsnit af fakturalinjen, Claude kan sammenligne de to aftalevilkår, og en GPT-model kan formulere et spørgsmål til leverandøren ud fra de godkendte oplysninger. Hver model får kun sit eget underlag. Rollerne kan byttes om, og almindelige fakturaer kan behandles med én model."],
    caseTitle: "Fra omstridt faktura til beslutningsgrundlag",
    caseIntro: "I eksemplet gør agenten opmærksom på, at fragten muligvis er opkrævet to gange. Økonomiteamet får fakturalinjen, aftalevilkåret og et udkast til et spørgsmål. En medarbejder med de rette beføjelser afgør, om beløbet skal bestrides, og godkender bogføringen.",
    checks: ["Applikationen kontrollerer brugerens adgang, før den henter en aftale eller en faktura.", "Hver model modtager kun de godkendte felter, opgaven kræver. Vi undersøger, hvor længe leverandøren gemmer data, og bruger sags- og anmodnings-id’er til opfølgning.", "Hvis dokumentation mangler, eller kilderne modsiger hinanden, går sagen til en medarbejder. Bogføring, betaling og mails til leverandøren kræver godkendelse."],
    measureTitle: "Hvad er seks minutter pr. sag værd?",
    measureIntro: "Forestil jer, at I gennemgår 300 lignende fakturaafvigelser om måneden. Mål arbejdstiden, fra fakturaen kommer ind, til sagen er afsluttet.",
    metrics: [
      ["30 timer", "Frigjort tid om måneden ved seks minutters tidsbesparelse pr. sag."],
      ["1.200 €", "Værdien af den frigjorte tid ved en timeomkostning på 40 euro."],
      ["900 €", "Beregnet månedlig værdi efter 300 euro i løbende omkostninger."]
    ],
    measureNote: "Eksemplet regner med tolv minutters manuel behandling og seks minutter med agenten, inklusive kontrol og rettelser. Driften omfatter modelkald, dokumentsøgning, overvågning og support. Udgiften til at etablere løsningen kommer oveni. Frigjort tid bliver til en kontant besparelse, når eksempelvis overarbejde eller eksterne timer faktisk falder.",
    pilotTitle: "Sådan afprøver vi løsningen på jeres fakturaer",
    pilot: [
      ["Mål arbejdet i dag", "Vælg anonymiserede sager med både korrekte og forkerte fakturaer. Mål behandlingstid, rettelser og omkostning pr. afsluttet sag."],
      ["Lad agenten arbejde i kladder", "Test med forskellige adgangsrettigheder og økonomiteamets facit. Gennemgå oversete afvigelser, falske alarmer, og om de angivne kilder dokumenterer beløbene."],
      ["Beslut, om løsningen skal i drift", "I får vores anbefaling om kilder, agentroller og modelvalg, et overslag over etablering og drift samt målinger, som I kan bruge til at udvide, justere eller afslutte piloten. Tilslutning til yderligere modelleverandører aftales særskilt."]
    ],
    pilotCta: "Tal med SundAI om en pilotsag",
    guideLink: "Læs guiden om sikker brug af sprogmodeller",
  }
};

const escapeHtml = value => value.replace(/[&<>"]/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'}[c]));
const arrow = '<svg class="os-arrow" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';

export function agentWorkflowLink(lang) {
  const c = copy[lang];
  return {url: servicePath(lang, agentWorkflowSlug), title: c.linkTitle, description: c.linkDescription, action: c.linkAction};
}

export function renderAgentWorkflows(lang) {
  const c = copy[lang];
  if (!c) throw new RangeError('Unknown agent workflow locale ' + lang);
  const languagePaths = Object.fromEntries(Object.keys(copy).map(locale => [locale, servicePath(locale, agentWorkflowSlug)]));
  const frameOptions = {innerPage: true, service: parentSlug, languagePaths};
  const booking = callUrl(lang, parentSlug, 'service');
  const styleLinks = ['shell','frame','services','crew-demos','agent-workflows'].map(name => `<link rel="stylesheet" href="/assets/brand-home/${name}.css">`).join('');
  const button = label => `<a class="os-go" href="${booking}">${escapeHtml(label)}${arrow}</a>`;
  const sections = pairs => pairs.map(([title, body]) => `<li><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></li>`).join('');
  const invoice = c.detailRows.map(([label, amount], index) => {
    const isVariance = index === c.detailRows.length - 1;
    return `<div${isVariance ? ' class="aw-variance"' : ''}><dt>${escapeHtml(label)}</dt><dd><bdi dir="ltr">${escapeHtml(amount)}</bdi>${isVariance ? renderContextCue('mark') : ''}</dd></div>`;
  }).join('');
  const metrics = c.metrics.map(([value, label]) => `<li><strong><bdi>${escapeHtml(value)}</bdi></strong><span>${escapeHtml(label)}</span></li>`).join('');
  return `<!doctype html>
<html lang="${lang}" dir="${lang === 'he' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>${escapeHtml(c.title)} | SundAI</title><meta name="description" content="${escapeHtml(c.meta)}"><link rel="icon" href="/assets/favicon.svg">${styleLinks}<script defer src="/assets/brand-home/frame.js"></script>${crewMotionScript}</head>
<body class="os-page os-theme-3 aw-page"><a class="fr-skip" href="#main">${escapeHtml(c.skip)}</a>${renderHeader(lang,frameOptions)}
<main id="main">
  <section class="os-hero"><div class="os-wrap os-hero-grid"><div class="os-copy">
    <a class="os-breadcrumb" href="${servicePath(lang,parentSlug)}">${escapeHtml(c.parent)}</a>
    <h1>${c.headline.map(line => `<span>${escapeHtml(line)}</span>`).join(' ')}</h1>
    <p class="os-lead">${escapeHtml(c.lead)}</p>${button(c.cta)}
  </div><div class="aw-proof"><figure class="aw-sheet"><figcaption>${escapeHtml(c.sample)}</figcaption>
    <dl>${invoice}</dl><p>${escapeHtml(c.handoff)}</p>
  </figure></div></div></section>
  <section class="aw-modes aw-section"><div class="os-wrap">
    <h2>${escapeHtml(c.routingTitle)}</h2><ul class="aw-columns">${sections(c.modes)}</ul>
    <aside class="aw-collaboration"><h3>${escapeHtml(c.collaboration[0])}</h3><p>${escapeHtml(c.collaboration[1])}</p></aside>
  </div></section>
  <section class="aw-section os-wrap aw-controls"><div><h2>${escapeHtml(c.caseTitle)}</h2><p>${escapeHtml(c.caseIntro)}</p></div>
    <ul>${c.checks.map(check => `<li>${escapeHtml(check)}</li>`).join('')}</ul>
  </section>
  <section class="aw-value aw-section"><div class="os-wrap"><h2>${escapeHtml(c.measureTitle)}</h2><p class="aw-intro">${escapeHtml(c.measureIntro)}</p>
    <ul class="aw-metrics">${metrics}</ul><p class="aw-footnote">${escapeHtml(c.measureNote)}</p>
  </div></section>
  <section class="aw-section os-wrap aw-pilot"><div><h2>${escapeHtml(c.pilotTitle)}</h2>${button(c.pilotCta)}</div>
    <ol>${sections(c.pilot)}</ol>
    <a class="aw-guide" href="${base(lang)}read/secure-llm-deployment/">${escapeHtml(c.guideLink)}${arrow}</a>
  </section>
</main>${renderFooter(lang,frameOptions)}</body></html>`;
}
