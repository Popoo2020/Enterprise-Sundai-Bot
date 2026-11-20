import { callUrl } from './call.mjs';

const copy = {
  "en": {
    "example": "For example, an app costing €30 a month saves four minutes per order. At €30 per staff hour, 15 orders a month would cover the subscription. We then factor in setup and time spent resolving errors.",
    "cashTitle": "How much cash would this example need?",
    "cash": "From a €1,000 budget, reserve €210 for setup, €55 for samples, €240 for a marketing test and €165 to pay the supplier for ten orders. That commits €670 and leaves €330. We replace each assumption with your own figures in the pilot.",
    "eyebrow": "Shopify · Secure AI automation",
    "title": "What’s left from your first Shopify sale?",
    "lead": "Bring one product, a supplier quote and a destination. Together we’ll work out what an order leaves you, how much cash you need upfront and how to get it from your store to the customer.",
    "cta": "Discuss my product in a free 20-minute call",
    "human": "I’m Eric Ariel Rimón. I bring more than a decade of experience in entrepreneurship and international business. I work directly with you and the person who will run the store.",
    "demoTitle": "Try the first order",
    "demoIntro": "Fictional A4 print · delivered within Germany",
    "costTab": "Check the margin",
    "repeatTab": "Replay an order",
    "labels": [
      "Selling price",
      "Product and shipping",
      "Payment fee",
      "Allowance for tax and returns"
    ],
    "cac": "Cost to acquire a customer",
    "balance": "Left before fixed costs",
    "loss": "Loss before fixed costs",
    "zero": "Balance at break-even",
    "threshold": "At €13.52 per new customer, this order breaks even before fixed costs.",
    "events": "Notifications for the same order",
    "drafts": "Supplier order drafts",
    "repeat": "Simulate a repeat notification",
    "eventStart": "The first notification prepared one supplier order draft.",
    "eventDone": "Repeat notification recognized. The supplier still has one draft.",
    "compareTitle": "Which connection fits your store?",
    "compareIntro": "We compare your actual options on setup, monthly cost, time spent on exceptions, access to customer data and what it takes to switch suppliers.",
    "supplierOptions": "Choosing between two suppliers or shipping services? Bring both quotes for the same product and destination. I’ll compare the delivered cost per item, delivery times and who pays for returns. We’ll choose one route for the test order.",
    "compareHeaders": [
      "Option",
      "When it fits",
      "What to weigh"
    ],
    "routes": [
      [
        "Manual fulfilment",
        "You are testing a few sales with a new supplier.",
        "Quick to start. Include your time per order and the work of checking tracking numbers."
      ],
      [
        "An existing Shopify app",
        "The app already supports your supplier, country and variants.",
        "Check subscription and per-order fees, how errors are reported and whether you can export your data."
      ],
      [
        "A direct supplier API",
        "Your supplier offers an API and standard apps miss a step you rely on.",
        "Budget for implementation, testing and ongoing support. Agree who receives an alert and owns a failed order."
      ]
    ],
    "coachingTitle": "You work with me from the first quote to handover",
    "stages": [
      [
        "Bring your assumptions",
        "I sit down with you to review your budget, company location, target market and supplier terms. Once we know which systems are accessible, you receive a written scope and fixed price for the pilot."
      ],
      [
        "Run the order together",
        "In a working session we map the Shopify product to the supplier’s variant. We walk through a test order, repeat delivery and a missing confirmation, and decide which actions need your approval."
      ],
      [
        "Take the controls",
        "I train you or your operator on the handover sheet. You practise handling an exception yourself. If you want help monitoring the first live orders or adding a second supplier, we agree the scope separately."
      ]
    ],
    "evidenceTitle": "Who gets to see the order?",
    "evidenceText": "In the public demo, the AI selects from approved product facts. Its order preview rejects names and street addresses, and a person decides whether a real order can go ahead. The project documents the GDPR and EU AI Act questions to review for your particular setup.",
    "evidenceLink": "Explore the working example on GitHub",
    "secondaryLink": "Read the security and privacy decisions",
    "takeTitle": "Bring one product to the call",
    "takeBody": "A product code, a redacted supplier quote and a destination are enough to start. Keep customer details out of the enquiry. The paid pilot gives you a decision sheet with your cash requirement, acquisition-cost ceiling and, if the numbers fall short, what would need to change.",
    "takeCta": "Book my free 20-minute call",
    "caseLink": "Invest in Denmark on Ariel’s Pizza in Odense"
  },
  "he": {
    "example": "נניח שאפליקציה עולה 30 אירו בחודש וחוסכת ארבע דקות טיפול בהזמנה. אם שעת עבודה עולה 30 אירו, החיסכון ב־15 הזמנות בחודש מכסה את דמי המנוי. להחלטה הסופית נוסיף את עלות ההקמה ואת זמן הטיפול בתקלות.",
    "cashTitle": "כמה מזומן נדרש בדוגמה הזו?",
    "cash": "מתוך תקציב של 1,000 אירו מקצים 210 להקמה, 55 לדוגמאות מוצר, 240 לניסוי שיווק ו־165 לתשלום לספק על עשר הזמנות. הסכום הנדרש הוא 670 אירו ונשארים 330 אירו. בפיילוט נחליף את הנחות הדוגמה במספרים שלכם.",
    "eyebrow": "Shopify · אוטומציה מאובטחת",
    "title": "כמה יישאר לכם מהמכירה הראשונה ב־Shopify?",
    "lead": "הביאו מוצר אחד, הצעת מחיר מספק ומדינת יעד. נחשב יחד כמה נשאר מכל הזמנה, כמה כסף תצטרכו להעמיד מראש ואיך תגיע ההזמנה מהחנות עד ללקוח.",
    "cta": "לשיחה אישית ללא עלות על המוצר שלכם",
    "human": "אני אריאל רימון. אני מביא איתי למעלה מעשור של ניסיון ביזמות ובפעילות עסקית בין־לאומית, ואעבוד ישירות איתכם ועם מי שיפעיל את החנות.",
    "demoTitle": "נסו את ההזמנה הראשונה",
    "demoIntro": "הדפס A4 לדוגמה · משלוח בתוך גרמניה",
    "costTab": "בדיקת כדאיות",
    "repeatTab": "הודעת הזמנה כפולה",
    "labels": [
      "מחיר ללקוח",
      "מוצר ומשלוח",
      "עמלת תשלום",
      "הפרשה למסים ולהחזרות"
    ],
    "cac": "עלות גיוס לקוח",
    "balance": "יתרה לפני הוצאות קבועות",
    "loss": "הפסד לפני הוצאות קבועות",
    "zero": "יתרה בנקודת האיזון",
    "threshold": "בעלות גיוס של 13.52 אירו ללקוח, ההזמנה מגיעה לנקודת האיזון לפני הוצאות קבועות.",
    "events": "הודעות שהתקבלו על אותה הזמנה",
    "drafts": "טיוטות הזמנה לספק",
    "repeat": "הדמיית שליחה חוזרת",
    "eventStart": "ההודעה הראשונה יצרה טיוטת הזמנה אחת לספק.",
    "eventDone": "המערכת זיהתה את ההודעה החוזרת. לספק נשמרה טיוטה אחת.",
    "compareTitle": "איך כדאי לחבר את החנות לספק שלכם?",
    "compareIntro": "נבחן את החלופות לפי עלות ההקמה והעלות השוטפת, הזמן שיידרש לטיפול בתקלות, הגישה לנתוני לקוחות והאפשרות להחליף ספק בהמשך.",
    "supplierOptions": "מתלבטים בין שני ספקים או בין שתי אפשרויות משלוח? הביאו את שתי ההצעות לאותו מוצר ולאותו יעד. אשווה איתכם את העלות ליחידה עד למסירה, את זמני האספקה ואת האחריות לעלות ההחזרה. יחד נבחר מסלול אחד להזמנת הניסיון.",
    "compareHeaders": [
      "חלופה",
      "מתי היא מתאימה",
      "מה חשוב לשקול"
    ],
    "routes": [
      [
        "טיפול ידני",
        "אתם בודקים ביקוש עם ספק חדש ומתחילים בהזמנות בודדות.",
        "אפשר להתחיל מהר. כדאי לחשב כמה זמן מושקע בכל הזמנה ובבדיקת מספרי המעקב."
      ],
      [
        "אפליקציה קיימת ל־Shopify",
        "האפליקציה כבר תומכת בספק, במדינת היעד ובגרסאות המוצר שלכם.",
        "בודקים דמי מנוי ועמלה להזמנה, איך נודע לכם על תקלה ואילו נתונים אפשר לייצא."
      ],
      [
        "חיבור ישיר לממשק הספק",
        "לספק יש ממשק API ובאפליקציות הזמינות חסר שלב חיוני בתהליך שלכם.",
        "מתקצבים פיתוח, בדיקות ותחזוקה. קובעים מי יקבל התראה ומי יטפל בהזמנה שלא אושרה."
      ]
    ],
    "coachingTitle": "אני מלווה אתכם מהצעת הספק ועד שתוכלו להפעיל את התהליך בעצמכם",
    "stages": [
      [
        "בוחנים את נקודת הפתיחה",
        "נעבור יחד על התקציב, מדינת הרישום של החברה, שוק היעד ותנאי הספק. אחרי שנבדוק לאילו מערכות אפשר להתחבר, תקבלו הצעה כתובה עם תכולה ומחיר קבוע לפיילוט."
      ],
      [
        "מתרגלים הזמנה יחד",
        "במפגש עבודה נתאים בין המק״ט בחנות למוצר אצל הספק. נתרגל הזמנת בדיקה, הודעה שהתקבלה פעמיים ומצב שבו הספק לא אישר את ההזמנה. תחליטו אילו פעולות דורשות אישור שלכם."
      ],
      [
        "מפעילים את התהליך בעצמכם",
        "אדריך אתכם או את עובד התפעול בעזרת דף עבודה שיישאר אצלכם. תתרגלו בעצמכם טיפול במקרה חריג. אפשר להסכים בנפרד גם על ליווי בהזמנות החיות הראשונות או בחיבור ספק נוסף."
      ]
    ],
    "evidenceTitle": "מי רואה את פרטי ההזמנה?",
    "evidenceText": "בהדגמה הפומבית ה־AI בוחר ניסוח מתוך עובדות מוצר שאושרו מראש. כלי תצוגת ההזמנה דוחה שמות וכתובות רחוב, ואדם מחליט אם לאשר הזמנה אמיתית. בתיעוד מפורטות גם שאלות ה־GDPR וחוק ה־AI האירופי שכדאי לבחון לפי אופן הפעולה של החנות שלכם.",
    "evidenceLink": "להדגמה הטכנית ב־GitHub",
    "secondaryLink": "להחלטות האבטחה והפרטיות",
    "takeTitle": "נתחיל במוצר אחד שלכם",
    "takeBody": "לשיחה מספיקים מק״ט אחד, הצעת ספק עם פרטים רגישים מושחרים ומדינת היעד. השאירו פרטי לקוחות מחוץ לפנייה. בתום הפיילוט בתשלום תקבלו דף החלטה עם סכום המזומן הנדרש, התקרה לגיוס לקוח ומה צריך להשתנות אם ההשקה עדיין לא משתלמת.",
    "takeCta": "לקביעת שיחת היכרות חינם של 20 דקות",
    "caseLink": "הסיפור של Ariel’s Pizza באודנסה באתר Invest in Denmark"
  },
  "sv": {
    "example": "Anta att en app kostar 30 euro i månaden och sparar fyra minuter per order. Med en personalkostnad på 30 euro per timme täcker tidsvinsten abonnemanget vid 15 order i månaden. Sedan väger vi in startkostnaden och tiden det tar att rätta fel.",
    "cashTitle": "Hur mycket pengar behöver ni i det här exemplet?",
    "cash": "Av en budget på 1 000 euro avsätts 210 för att komma igång, 55 för varuprover, 240 för ett marknadsföringstest och 165 för att betala leverantören för tio order. Det ger ett behov på 670 euro och 330 euro kvar. I piloten använder vi era egna siffror.",
    "eyebrow": "Shopify · Säker automatisering",
    "title": "Vad blir kvar av första ordern?",
    "lead": "Ta med en produkt, en leverantörsoffert och den marknad ni vill sälja på. Vi räknar på marginalen och följer en testorder från er Shopify-butik till leverantören innan ni lägger pengar på annonsering.",
    "cta": "Boka 20 minuter med mig om er produkt",
    "human": "Jag heter Eric Ariel Rimón och har över tio års erfarenhet av att driva företag och bygga affärer över landsgränser. Jag är er kontakt genom hela piloten och lär upp den som ska sköta orderflödet.",
    "demoTitle": "Prova med en exempelorder",
    "demoIntro": "Ett fiktivt A4-tryck säljs och skickas inom Tyskland. Ändra kostnaden för att få en ny kund, eller se vad som händer när samma order skickas två gånger.",
    "costTab": "Räkna på ordern",
    "repeatTab": "Testa en dubblett",
    "labels": [
      "Kundens pris",
      "Produkt och frakt",
      "Betalavgift",
      "Avsatt för skatt och returer"
    ],
    "cac": "Kostnad för att få en ny kund",
    "balance": "Kvar per order före fasta kostnader",
    "loss": "Förlust per order före fasta kostnader",
    "zero": "Kvar vid nollresultat",
    "threshold": "Vid en kundanskaffningskostnad på 13,52 euro täcker ordern precis sina rörliga kostnader.",
    "events": "Meddelanden om samma order",
    "drafts": "Orderutkast till leverantören",
    "repeat": "Skicka samma meddelande igen",
    "eventStart": "Det första meddelandet skapade ett orderutkast.",
    "eventDone": "Ordernumret känns igen. Det finns fortfarande bara ett utkast till leverantören.",
    "compareTitle": "Hur ska ordern nå er leverantör?",
    "compareIntro": "Jag jämför alternativen utifrån er ordervolym och de system ni redan har. Ni ser vad uppstart och drift kostar, vem som hanterar avvikelser och hur lätt ni kan byta lösning senare.",
    "supplierOptions": "Väljer ni mellan två leverantörer eller fraktsätt? Ta med båda offerterna för samma produkt och destination. Vi jämför totalkostnaden per levererad vara, leveranstiden och vem som betalar returfrakten. Sedan väljer vi ett alternativ för testordern.",
    "routes": [
      [
        "Beställ manuellt",
        "Ni vill prova en ny marknad med några få order. En medarbetare granskar varje beställning.",
        "Låg startkostnad. Registrering och uppföljning tar tid per order."
      ],
      [
        "Använd en färdig integration",
        "Det finns en app med stöd för just er leverantör, era varianter och den spårning kunderna behöver.",
        "Räkna in abonnemanget och kontrollera hur ni rättar fel och får ut era data om ni byter app."
      ],
      [
        "Bygg en egen API-koppling",
        "Ni har ett dokumenterat leverantörs-API och behöver egna regler för godkännande, undantag eller åtkomst.",
        "Ni kan styra flödet mer i detalj. Någon behöver ansvara för utveckling, övervakning och ändringar i leverantörens API."
      ]
    ],
    "coachingTitle": "Ni arbetar direkt med mig hela vägen",
    "stages": [
      [
        "Innan vi kopplar ihop systemen",
        "Vi går igenom offerten tillsammans, kontrollerar vad som ingår i frakten och sätter en gräns för hur mycket ni kan binda i de första beställningarna. När vi har granskat åtkomsten får ni en skriftlig offert för piloten med avgränsning och fast pris."
      ],
      [
        "Under testet",
        "Vi följer samma testorder på skärmen och provar en dubblett. Jag visar var ni hittar ett fel och vi går igenom vad som behöver fungera innan ni öppnar för riktiga order."
      ],
      [
        "När ni tar över",
        "Den som ska sköta butiken får själv gå igenom orderflödet med mig och får en skriftlig rutin att använda efteråt. Vill ni ha hjälp efter piloten kommer vi överens om omfattning och pris separat."
      ]
    ],
    "evidenceTitle": "Vem får se och göra vad?",
    "evidenceText": "I demonstrationen får AI-assistenten välja bland godkända produktuppgifter. Kundens adress ingår inte i assistentens ordervy. Ni utser vem som får godkänna en riktig beställning innan den skickas till leverantören. Dokumentationen tar också upp de GDPR- och AI-förordningsfrågor som ni behöver bedöma för er butik.",
    "evidenceLink": "Se den tekniska demonstrationen på GitHub",
    "secondaryLink": "Läs om dataskydd och behörigheter",
    "takeTitle": "Ta med en produkt till vårt första samtal",
    "takeBody": "Det räcker med ett artikelnummer, leverantörens pris och leveransland. Dölj namn och kontaktuppgifter i offerten. Efter piloten får ni ett skriftligt beslutsunderlag med kapitalbehov, högsta kostnad för att få en ny kund och vad som behöver ändras om en lansering bör vänta.",
    "takeCta": "Boka ett samtal om er produkt",
    "compareHeaders": [
      "Alternativ",
      "När det passar",
      "Det här bör ni väga in"
    ],
    "caseLink": "Läs om Ariel’s Pizza i Odense hos Invest in Denmark"
  },
  "da": {
    "example": "Antag, at en app koster 30 euro om måneden og sparer fire minutter pr. ordre. Ved en medarbejderomkostning på 30 euro i timen dækker tidsbesparelsen abonnementet ved 15 ordrer om måneden. Derefter indregner vi opstart og tid til fejlhåndtering.",
    "cashTitle": "Hvor mange penge kræver eksemplet?",
    "cash": "Af et budget på 1.000 euro afsættes 210 til opstart, 55 til vareprøver, 240 til at afprøve markedsføringen og 165 til at betale leverandøren for ti ordrer. Det binder 670 euro og efterlader 330 euro. I piloten bruger vi jeres egne tal.",
    "eyebrow": "Shopify · Sikker automatisering",
    "title": "Hvad er der tilbage på den første ordre?",
    "lead": "Tag ét produkt, et leverandørtilbud og det marked, I vil sælge på, med til samtalen. Vi regner på dækningsbidraget og følger en testordre fra jeres Shopify-butik til leverandøren, før I bruger penge på annoncer.",
    "cta": "Book 20 minutter med mig om jeres produkt",
    "human": "Jeg hedder Eric Ariel Rimón og har over ti års erfaring med at drive virksomhed og skabe forretning på tværs af landegrænser. Jeg er jeres kontakt gennem hele pilotforløbet og lærer den ansvarlige medarbejder at håndtere ordrerne.",
    "demoTitle": "Prøv med en eksempelordre",
    "demoIntro": "Et fiktivt kunsttryk i A4 sælges og leveres i Tyskland. Justér prisen for at få en ny kunde, eller se, hvad der sker, når den samme ordre sendes to gange.",
    "costTab": "Regn på ordren",
    "repeatTab": "Afprøv en dublet",
    "labels": [
      "Kundens pris",
      "Vare og fragt",
      "Betalingsgebyr",
      "Afsat til skat og returvarer"
    ],
    "cac": "Pris for at få en ny kunde",
    "balance": "Tilbage pr. ordre før faste omkostninger",
    "loss": "Tab pr. ordre før faste omkostninger",
    "zero": "Tilbage ved nulpunktet",
    "threshold": "Koster det 13,52 euro at få en ny kunde, dækker ordren netop de variable omkostninger.",
    "events": "Beskeder om samme ordre",
    "drafts": "Ordrekladder til leverandøren",
    "repeat": "Send samme besked igen",
    "eventStart": "Den første besked oprettede en ordrekladde.",
    "eventDone": "Ordrenummeret er genkendt. Der er stadig kun én ordrekladde til leverandøren.",
    "compareTitle": "Hvordan skal ordren nå frem til jeres leverandør?",
    "compareIntro": "Jeg sammenligner mulighederne ud fra jeres ordremængde og de systemer, I bruger. I får overblik over udgifter til opstart og drift, hvem der håndterer fejl, og hvor let det er at skifte løsning igen.",
    "supplierOptions": "Vælger I mellem to leverandører eller fragtmuligheder? Tag begge tilbud på samme produkt og destination med. Vi sammenligner den samlede pris pr. leveret vare, leveringstiden og hvem der betaler returfragten. Derefter vælger vi én løsning til testordren.",
    "routes": [
      [
        "Bestil manuelt",
        "I vil afprøve et nyt marked med få ordrer. En medarbejder gennemgår hver bestilling.",
        "Det koster lidt at komme i gang. Indtastning og opfølgning tager tid for hver ordre."
      ],
      [
        "Brug en færdig integration",
        "En app understøtter jeres leverandør, produktvarianter og den pakkesporing, kunderne har brug for.",
        "Medregn abonnementet, og undersøg, hvordan I retter fejl og får jeres data ud, hvis I skifter app."
      ],
      [
        "Byg en API-integration",
        "Leverandøren har et dokumenteret API, og I har brug for egne regler for godkendelse, adgang eller særtilfælde.",
        "I kan selv styre flere detaljer. Udvikling, overvågning og ændringer i leverandørens API kræver en ansvarlig person."
      ]
    ],
    "coachingTitle": "I arbejder direkte med mig hele vejen",
    "stages": [
      [
        "Før vi forbinder systemerne",
        "Vi gennemgår tilbuddet sammen, undersøger, hvad fragten dækker, og aftaler, hvor mange penge I kan binde i de første ordrer. Når vi har afklaret adgangen, får I et skriftligt tilbud med en beskrivelse af pilotens omfang og en fast pris."
      ],
      [
        "Mens vi tester",
        "Vi følger en testordre sammen på skærmen og sender den samme besked to gange. Jeg viser, hvor I finder en fejl, og vi gennemgår, hvad der skal fungere, før I åbner for rigtige ordrer."
      ],
      [
        "Når I tager over",
        "Den medarbejder, der skal passe butikken, prøver selv arbejdsgangen sammen med mig og får en skriftlig vejledning. Ønsker I støtte efter piloten, aftaler vi omfang og pris særskilt."
      ]
    ],
    "evidenceTitle": "Hvem må se hvad, og hvem godkender ordren?",
    "evidenceText": "I demonstrationen vælger AI-assistenten mellem godkendte produktoplysninger. Kundens adresse indgår ikke i assistentens ordrevisning. I beslutter, hvem der skal godkende en rigtig ordre, før den sendes til leverandøren. Dokumentationen gennemgår også de spørgsmål om GDPR og EU’s AI-forordning, som er relevante at vurdere for jeres butik.",
    "evidenceLink": "Se den tekniske demonstration på GitHub",
    "secondaryLink": "Læs om databeskyttelse og adgang",
    "takeTitle": "Tag ét produkt med til vores første samtale",
    "takeBody": "Vi kan begynde med et varenummer, leverandørens pris og leveringslandet. Fjern navne og kontaktoplysninger fra tilbuddet. Efter piloten får I en skriftlig vurdering af kapitalbehovet, hvad en ny kunde højst må koste, og hvad der skal ændres, hvis lanceringen bør vente.",
    "takeCta": "Book en samtale om jeres produkt",
    "compareHeaders": [
      "Mulighed",
      "Hvornår den passer",
      "Det bør I overveje"
    ],
    "caseLink": "Læs om Ariel’s Pizza i Odense hos Invest in Denmark"
  }
};

export function renderShopifyMain(lang) {
  const t = copy[lang];
  const call = callUrl(lang, 'shopify-first-order', 'service');
  const currency = new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' });
  const money = cents => `<bdi>${currency.format(cents / 100)}</bdi>`;
  const pilot = 'https://github.com/Popoo2020/Popoo2020/tree/main/case-studies/shopify-launch-workflow';
  const controls = 'https://github.com/Popoo2020/Popoo2020/blob/main/case-studies/shopify-launch-workflow/docs/security-privacy-ai.md';
  const caseStudy = 'https://investindk.com/cases/a-taste-of-italian-innovation-bringing-sustainable-pizza-to-denmark';
  const costs = [3900, 1650, 128, 770];
  const lines = t.labels.map((label, i) => `<div class="sfo-line"><dt>${label}</dt><dd>${money(costs[i])}</dd></div>`).join('');
  const steps = t.stages.map(([title, body]) => `<article class="sfo-stage"><h3>${title}</h3><p>${body}</p></article>`).join('');
  const routes = t.routes.map(([name, fit, tradeoff]) => `
    <tr><th scope="row">${name}</th>
    <td><span class="sfo-mobile-label" aria-hidden="true">${t.compareHeaders[1]}</span>${fit}</td>
    <td><span class="sfo-mobile-label" aria-hidden="true">${t.compareHeaders[2]}</span>${tradeoff}</td></tr>`).join('');
  return `<main id="main-content" class="sfo" lang="${lang}" dir="${lang === 'he' ? 'rtl' : 'ltr'}" data-first-order>
    <section class="sfo-hero sfo-wrap" aria-labelledby="sfo-title">
      <div>
        <p class="sfo-tag">${t.eyebrow}</p>
        <h1 id="sfo-title">${t.title}</h1>
        <p class="sfo-lead">${t.lead}</p>
        <a class="sfo-cta" href="${call}">${t.cta}</a>
        <p class="sfo-human">${t.human}</p>
      </div>
      <div class="sfo-demo"><section class="sfo-slip" aria-labelledby="sfo-demo-title">
        <h2 id="sfo-demo-title">${t.demoTitle}</h2>
        <p class="sfo-sub">${t.demoIntro}</p>
        <div class="sfo-switch" role="group" aria-labelledby="sfo-demo-title">
          <button type="button" data-mode="cost" aria-controls="sfo-cost" aria-pressed="true">${t.costTab}</button>
          <button type="button" data-mode="repeat" aria-controls="sfo-repeat" aria-pressed="false">${t.repeatTab}</button>
        </div>
        <div data-panel="cost" id="sfo-cost">
          <dl>${lines}</dl>
          <div class="sfo-range">
            <label class="sfo-range-label" for="sfo-cac"><span>${t.cac}</span><bdi data-field="cac">${currency.format(8)}</bdi></label>
            <input id="sfo-cac" type="range" dir="ltr" min="0" max="20" step="0.01" value="8" aria-valuetext="${currency.format(8)}" aria-describedby="sfo-threshold">
          </div>
          <p class="sfo-total" aria-live="polite" aria-atomic="true" data-state="positive" data-positive="${t.balance}" data-negative="${t.loss}" data-zero="${t.zero}">
            <span data-field="label">${t.balance}</span><bdi data-field="balance">${currency.format(5.52)}</bdi>
          </p>
          <p class="sfo-note" id="sfo-threshold">${t.threshold}</p>
          <details class="sfo-cash"><summary>${t.cashTitle}</summary><p>${t.cash}</p></details>
        </div>
        <div data-panel="repeat" id="sfo-repeat" hidden>
          <dl><div class="sfo-line"><dt>${t.events}</dt><dd data-field="events">1</dd></div>
            <div class="sfo-line"><dt>${t.drafts}</dt><dd data-field="drafts">1</dd></div></dl>
          <button type="button" class="sfo-replay" data-replay>${t.repeat}</button>
          <p class="sfo-note" data-field="note" data-done="${t.eventDone}" aria-live="polite">${t.eventStart}</p>
        </div>
      </section></div>
    </section>
    <section class="sfo-compare sfo-wrap" aria-labelledby="sfo-alternatives">
      <h2 id="sfo-alternatives">${t.compareTitle}</h2><p class="sfo-intro">${t.compareIntro}</p>
      <table class="sfo-table" aria-labelledby="sfo-alternatives"><thead><tr>${t.compareHeaders.map(title => `<th scope="col">${title}</th>`).join('')}</tr></thead><tbody>${routes}</tbody></table>
      <p class="sfo-example">${t.example}</p>
      <p class="sfo-proof-copy">${t.supplierOptions}</p>
    </section>
    <section class="sfo-guidance sfo-wrap" aria-labelledby="sfo-guidance-title">
      <h2 id="sfo-guidance-title">${t.coachingTitle}</h2><div class="sfo-stages">${steps}</div>
      <div class="sfo-links"><a href="${caseStudy}">${t.caseLink}</a></div>
    </section>
    <section class="sfo-evidence sfo-wrap" aria-labelledby="sfo-evidence-title">
      <h2 id="sfo-evidence-title">${t.evidenceTitle}</h2><div><p class="sfo-proof-copy">${t.evidenceText}</p>
      <div class="sfo-links"><a href="${pilot}">${t.evidenceLink}</a><a href="${controls}">${t.secondaryLink}</a></div></div>
    </section>
    <section class="sfo-take" aria-labelledby="sfo-take-title"><div class="sfo-wrap">
      <h2 id="sfo-take-title">${t.takeTitle}</h2><p class="sfo-take-copy">${t.takeBody}</p>
      <a class="sfo-cta" href="${call}">${t.takeCta}</a>
    </div></section>
  </main>`;
}
