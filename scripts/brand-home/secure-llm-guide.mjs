export const secureLlmGuide = {
  slug: 'secure-llm-deployment',
  category: 'governance',
  related: 'services/compliance-ai-governance/',
  sources: [
    { name: 'ISO · ISO/IEC 42001:2023', url: 'https://www.iso.org/standard/42001' },
    { name: 'EUR-Lex · GDPR (Art. 5, 6, 28, 32, 35)', url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/' },
    { name: 'EUR-Lex · EU AI Act (Art. 4)', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689' },
    { name: 'CNIL · Generative AI in organisations', url: 'https://www.cnil.fr/en/cnils-qa-use-generative-ai-systems' },
    { name: 'OWASP · REST Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html' },
    { name: 'OWASP · LLM02 Sensitive Information Disclosure', url: 'https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/' }
  ],
  text: {
    en: {
      title: 'How to deploy a language model securely in your business',
      summary: 'Before connecting an LLM to customer records, use a returns desk pilot to test API security, prevent data leaks and measure the value of staff time recovered.',
      sections: [
        ['AI governance starts with one decision', 'Imagine a customer asks, “Can I return this order?” A support assistant needs the purchase date, product and relevant returns policy. It can draft a reply. An employee checks eligibility, sends the message and approves any refund. ISO/IEC 42001 gives organisations a framework for managing AI throughout its life. Here is how a leadership team could apply it to this pilot.', [
          'CEO or sponsor — set a pilot budget and define the outcome worth paying for, such as shorter handling time at the same answer quality.',
          'CTO — map each system the assistant can reach. Record who owns the integration and who can disconnect it.',
          'CISO — agree what would stop the launch, who investigates and what evidence is needed to restart. Reopen the decision when the model, supplier or data source changes.'
        ]],
        ['What GDPR and the EU AI Act mean for the pilot', 'Where GDPR applies, document the purpose and lawful basis for processing personal data. Send only the fields needed for the return. Check how the supplier uses prompts, which subcontractors can see them and when copies are deleted. If the supplier acts as your processor, cover the Article 28 terms. Carry out a data protection impact assessment before processing likely to pose a high risk to people’s rights and freedoms. For the EU AI Act, identify your role and intended use. One way to support staff AI literacy under Article 4 is to practise spotting a draft that promises a refund outside the policy.'],
        ['Protect the LLM API and limit the damage a mistake can cause', 'Put the application server between the employee and the model provider. Give the pilot a read-only connection to the returns system and keep permission to issue refunds with staff.', [
          'Keep the provider key in a server-side secrets manager. Use an encrypted connection and set usage limits per user.',
          'Check the signed-in employee’s access to each case and document before retrieving text. A shared service account with broad access needs this extra check.',
          'Log the request ID, access decision, model version and cost. Keep messages, credentials and customer details out of routine logs. Agree who can read diagnostics and when they expire.'
        ]],
        ['A data leakage test before launch', 'Create two test accounts and a fictional warranty note visible to only one. Ask both accounts the same question. Check the reply, quoted text, source link and logs for restricted details. Revoke the first account’s permission, open a fresh session and time how long the change takes effect. If restricted content reaches either account after its access should have ended, disconnect the source, fix the control and repeat the test.'],
        ['Calculate the value per completed case', 'Illustrative monthly pilot: 300 comparable cases fall from eight minutes each to five, including checking and corrections. That frees 15 staff hours. At €40 an hour, the time is worth €600 if the team can put it to use. With €180 in monthly running costs, €420 remains in estimated value before one-off implementation costs. Compare answer quality and reopened cases alongside time. Cash savings depend on which expense actually falls.'],
        ['What SundAI can do before you sign or connect', 'Bring one decision to a free 20-minute call. For example, should the assistant have access to the returns mailbox? Our Decision Review gives you a written recommendation with the evidence behind it and the gaps to resolve. If you move to implementation, we can map data flows with your IT provider, test permissions and measure handling time with your team. Finding an overbroad connector at this stage can spare a second integration and another round of supplier review.']
      ],
      exercise: 'At your next release meeting, give the sponsor the cost per completed case and the security lead the access-test results. Record the decision to launch, narrow the scope or pause, with an owner and a review date.'
    },
    he: {
      title: 'איך מטמיעים מודל שפה בארגון ומצמצמים את הסיכון לדליפת מידע?',
      summary: 'לפני שמחברים מודל שפה לנתוני לקוחות, כדאי לבדוק מי רשאי לראות כל פרט וכמה זמן באמת נחסך. פיילוט במוקד החזרות מדגים איך עושים זאת ומה בודקים באבטחת ה־API.',
      sections: [
        ['ממשל AI מתחיל בהחלטה אחת של ההנהלה', 'לקוחה שואלת אם היא יכולה להחזיר מוצר. כדי לנסח תשובה, עוזר השירות צריך את פרטי המוצר, תאריך הקנייה ומדיניות ההחזרות. הנציגה בודקת את הזכאות, שולחת את התשובה ומאשרת זיכוי במידת הצורך. תקן ISO/IEC 42001 עוסק בניהול מערכות AI לאורך חייהן. בפיילוט כזה אפשר ליישם את העיקרון באמצעות חלוקת אחריות ברורה.', [
          'המנכ״ל או מנהלת היחידה קובעים תקציב ויעד עסקי, למשל קיצור זמן הטיפול תוך שמירה על דיוק התשובות.',
          'מנהל הטכנולוגיות (CTO) ממפה את המערכות שהעוזר יכול לקרוא ומתעד מי אחראי לחיבור ומי יכול לנתק אותו.',
          'מנהלת אבטחת המידע (CISO) קובעת באילו תנאים עוצרים, מי בודק תקלה ומה צריך להוכיח כדי לחדש את הפעילות. החלפת מודל, ספק או מקור מידע היא הזדמנות לבחון שוב את ההחלטה.'
        ]],
        ['מה בודקים לפי ה־GDPR וחוק ה־AI האירופי?', 'כשה־GDPR חל, מתעדים את מטרת העיבוד ואת הבסיס החוקי לשימוש במידע אישי. מעבירים למודל רק את השדות הדרושים לבירור ההחזרה. שואלים את הספק אם הוא משתמש בפניות הלקוחות לאימון, אילו ספקי משנה מקבלים גישה ומתי נמחקים העותקים. אם הספק מעבד מידע מטעמכם, מסדירים את התנאים הנדרשים לפי סעיף 28. כשהעיבוד צפוי ליצור סיכון גבוה לזכויות ולחירויות של אנשים, עורכים מראש תסקיר השפעה על הגנת המידע. לעניין חוק ה־AI האירופי, בודקים מה תפקיד הארגון ומה השימוש המיועד. דרך מעשית לקדם אוריינות AI לפי סעיף 4 היא לתרגל עם הנציגים זיהוי טיוטה שמבטיחה זיכוי בניגוד למדיניות.'],
        ['איך מאבטחים את ה־API של מודל השפה?', 'שרת האפליקציה מתווך בין הנציגה לספק המודל. בפיילוט נותנים לעוזר הרשאת קריאה במערכת ההחזרות. הרשאת הזיכוי נשארת בידי העובדים.', [
          'שומרים את מפתח הגישה בכספת סודות בצד השרת, מצפינים את התעבורה ומגדירים מכסת שימוש לכל משתמש.',
          'לפני שליפת טקסט בודקים בשרת שהנציגה המחוברת רשאית לעיין בתיק ובמסמך המסוים. הבדיקה חשובה במיוחד כשהחיבור הטכני למערכת פועל בחשבון שירות בעל הרשאות רחבות.',
          'ביומן המערכת מתעדים מזהה בקשה, החלטת הרשאה, גרסת מודל ועלות. משאירים תוכן פניות, מפתחות ופרטים אישיים מחוץ ליומן השוטף, וקובעים למי יש גישה לנתוני האבחון ומתי מוחקים אותם.'
        ]],
        ['בדיקה פשוטה לגילוי דליפת מידע לפני ההשקה', 'פותחים שני חשבונות בדיקה ויוצרים מזכר אחריות פיקטיבי שרק אחד מהם רשאי לקרוא. שואלים את אותה השאלה משני החשבונות ובודקים את התשובה, הציטוט, הקישור למקור ויומני המערכת. מבטלים גם את הרשאת החשבון הראשון, פותחים שיחה חדשה ומודדים מתי הביטול נכנס לתוקף. אם פרטים מהמזכר עדיין מופיעים למי שהרשאתו פגה, מנתקים את מקור המידע, מתקנים וחוזרים על הבדיקה.'],
        ['כמה שווה הזמן שנחסך בכל פנייה?', 'נניח שהמוקד מטפל ב־300 פניות דומות בחודש, וזמן הטיפול הממוצע יורד משמונה לחמש דקות, כולל בדיקה ותיקון. שלוש הדקות שהתפנו בכל פנייה מצטברות ל־15 שעות בחודש. לפי עלות עבודה של 40 אירו לשעה, ערכן 600 אירו אם הצוות יכול לנצל אותן למשימות אחרות. אחרי הוצאות תפעול חודשיות של 180 אירו, נותר ערך משוער של 420 אירו לפני עלות ההטמעה החד־פעמית. בדקו גם את דיוק התשובות וכמה תיקים נפתחו מחדש. כדי לדווח על חיסכון כספי בפועל, בדקו איזו הוצאה קטנה.'],
        ['איך SundAI עוזרת לפני רכישה וחיבור למערכות?', 'לשיחת היכרות של 20 דקות ללא עלות אפשר להביא שאלה אחת, למשל אם לאפשר לעוזר לקרוא את תיבת ההחזרות. במסגרת Decision Review תקבלו המלצה מנומקת בכתב ופירוט של הנקודות שדורשות בירור. אם תתקדמו להטמעה, נוכל למפות עם ספק ה־IT שלכם את זרימת המידע, לבדוק הרשאות ולמדוד עם צוות השירות את זמן הטיפול. גילוי מוקדם של חיבור שחושף תיקים מיותרים יכול לחסוך פיתוח חוזר וסבב נוסף של בדיקת ספקים.']
      ],
      exercise: 'בישיבת האישור הבאה הציגו למנהלת היחידה את העלות לפנייה שהטיפול בה הושלם, ולמנהל האבטחה את תוצאות בדיקת ההרשאות. תעדו אם משיקים, מצמצמים את ההיקף או עוצרים, מי אחראי ומתי בוחנים את ההחלטה מחדש.'
    },
    "sv": {
      "title": "Så inför ni språkmodeller säkert i företaget",
      "summary": "Följ ett returärende från kundmejl till godkänt svar. Se hur ni kan använda ISO/IEC 42001, säkra ert API, upptäcka dataläckor och räkna på vad piloten ger.",
      "sections": [
        [
          "Vem får fatta beslut om en retur?",
          "Tänk er en kundtjänst där en språkmodell läser kundens fråga, slår upp returvillkoren och skriver ett utkast. En handläggare granskar svaret, skickar det och beslutar om eventuell återbetalning. Innan ni öppnar inkorgen för modellen behöver ledningen enas om vem som äger varje beslut. ISO/IEC 42001 ger en struktur för att fördela ansvaret och följa upp när arbetssättet ändras.",
          [
            "Vd sätter ett kostnadstak för försöket och bestämmer vilket resultat som motiverar fortsatt investering.",
            "Teknikchefen dokumenterar vilka system assistenten får läsa och hur anslutningen kan stängas av.",
            "Informationssäkerhetschefen fastställer godkännandekraven och får mandat att pausa försöket om en kunds uppgifter blir synliga i ett annat ärende."
          ]
        ],
        [
          "Vilka kunduppgifter behöver modellen?",
          "För en returfråga kan ordernummer, inköpsdatum och relevant villkor räcka. Kartlägg vilka personuppgifter som faktiskt skickas vidare och hur länge de sparas. Dokumentera ändamålet och den rättsliga grunden enligt GDPR. Om leverantören behandlar uppgifter för er räkning, granska personuppgiftsbiträdesavtalet och villkoren för lagring, radering och modellträning. Gör en konsekvensbedömning om behandlingen sannolikt medför hög risk för enskildas rättigheter och friheter. Bedöm även er roll och assistentens avsedda användning enligt EU:s AI-förordning. Som en del av arbetet med AI-kunnighet enligt artikel 4 kan handläggarna öva på att känna igen ett utkast som lovar återbetalning i strid med returvillkoren."
        ],
        [
          "Så begränsar ni åtkomsten i ert API",
          "Lägg applikationsservern mellan handläggaren och modellleverantören. Pilotens anslutning behöver bara kunna läsa returuppgifter. Låt en behörig medarbetare skicka svaret och godkänna återbetalningen.",
          [
            "Förvara API-nyckeln i ett verktyg för hemlighetshantering på serversidan. Kryptera trafiken och sätt ett tak för användningen per användare.",
            "Kontrollera handläggarens behörighet till varje ärende och dokument innan systemet hämtar text. Det behövs även när anslutningen använder ett gemensamt tjänstekonto.",
            "Logga anropets ID, behörighetsbeslut, modellversion och kostnad. Bestäm vem som får läsa loggarna och när de raderas. Utelämna kundmeddelanden och nycklar i den löpande loggningen."
          ]
        ],
        [
          "Testa vad nästa handläggare kan se",
          "Skapa två testkonton och lägg en påhittad garantiuppgift i ett ärende som bara det första kontot får öppna. Ställ samma fråga från båda kontona. Kontrollera svarstext, källhänvisning och vad respektive användare kan läsa i loggarna. Dra sedan in det första kontots behörighet och mät hur snabbt uppgiften försvinner ur nya svar. Stoppa lanseringen om ett obehörigt konto kan se den."
        ],
        [
          "Vad är tre minuter per ärende värda?",
          "Anta att 300 ärenden i månaden tar åtta minuter var och att piloten klarar dem på fem, inklusive granskning. Det frigör 15 arbetstimmar. Vid 40 euro i timmen motsvarar tiden 600 euro. Med 180 euro i månadsdrift återstår ett beräknat värde på 420 euro före införandekostnaden. Räkneexemplet visar värdet av frigjord kapacitet. En lägre utgift kräver att exempelvis övertiden faktiskt minskar."
        ],
        [
          "Så kan SundAI hjälpa er före anslutningen",
          "Ta med ett påhittat returärende till ett kostnadsfritt introduktionssamtal på 20 minuter. Med en Decision Review får ni en skriftlig rekommendation om ett avgränsat beslut, till exempel vilken åtkomst leverantören ska få. Behöver ni hjälp med införandet kan vi tillsammans med er IT-partner planera behörighetstestet, sätta en budget och enas om vad som krävs för att gå vidare."
        ]
      ],
      "exercise": "Välj ett returärende. Skriv ned vilka fält som behövs, vem som får se dem, vem som får skicka svaret och vad som får piloten att stanna. Mät sedan tiden för hela ärendet, inklusive rättelser."
    },
    "da": {
      "title": "Sådan indfører I sprogmodeller sikkert i virksomheden",
      "summary": "Følg en retursag fra kundens mail til det godkendte svar. Se, hvordan I kan bruge ISO/IEC 42001, sikre jeres API, opdage datalæk og regne på udbyttet af en pilot.",
      "sections": [
        [
          "Hvem må træffe afgørelse i en retursag?",
          "Forestil jer en kundeservice, hvor en sprogmodel læser kundens spørgsmål, slår returvilkårene op og skriver et udkast. En medarbejder gennemgår svaret, sender det og godkender en eventuel tilbagebetaling. Inden I giver modellen adgang til indbakken, skal ledelsen aftale, hvem der ejer de enkelte beslutninger. ISO/IEC 42001 giver jer en ramme for at placere ansvaret og følge op, når arbejdsgangen ændrer sig.",
          [
            "Direktøren fastsætter et loft over pilotens udgifter og beslutter, hvilket resultat der kan begrunde næste investering.",
            "Teknologidirektøren beskriver, hvilke systemer assistenten må læse fra, og hvordan forbindelsen kan afbrydes.",
            "Den informationssikkerhedsansvarlige fastlægger kravene til godkendelse og får mandat til at standse piloten, hvis en kundes oplysninger dukker op i en anden sag."
          ]
        ],
        [
          "Hvilke kundeoplysninger har modellen brug for?",
          "Ved en retur kan ordrenummer, købsdato og det relevante afsnit i returvilkårene være nok. Kortlæg, hvilke personoplysninger der faktisk sendes videre, og hvor længe de gemmes. Dokumentér formålet og behandlingsgrundlaget efter GDPR. Behandler leverandøren oplysninger på jeres vegne, så gennemgå databehandleraftalen og vilkårene for opbevaring, sletning og modeltræning. Lav en konsekvensanalyse, hvis behandlingen sandsynligvis indebærer høj risiko for de berørtes rettigheder og frihedsrettigheder. Vurder også jeres rolle og assistentens tilsigtede anvendelse efter EU's AI-forordning. Som led i arbejdet med AI-færdigheder efter artikel 4 kan medarbejderne øve sig i at opdage et udkast, der lover en tilbagebetaling i strid med vilkårene."
        ],
        [
          "Begræns adgangen gennem jeres API",
          "Lad applikationsserveren formidle kontakten mellem medarbejderen og modelleverandøren. I piloten behøver forbindelsen kun læseadgang til retursystemet. En medarbejder med de rette beføjelser sender svaret og godkender tilbagebetalingen.",
          [
            "Opbevar API-nøglen i en særskilt nøgleboks på serversiden. Kryptér trafikken, og sæt et forbrugsloft pr. bruger.",
            "Kontrollér medarbejderens adgang til hver sag og hvert dokument, inden systemet henter tekst. Kontrollen er også nødvendig, når forbindelsen bruger en fælles servicekonto.",
            "Log forespørgslens id, adgangsafgørelsen, modelversionen og prisen på kaldet. Aftal, hvem der må se loggen, og hvornår den slettes. Hold kundebeskeder og nøgler ude af den løbende logning."
          ]
        ],
        [
          "Test, hvad den næste medarbejder kan se",
          "Opret to testkonti. Skriv en opdigtet garantioplysning i en sag, som kun den første konto må åbne. Stil samme spørgsmål fra begge konti. Kontrollér svartekst, kildehenvisning og de logoplysninger, som hver bruger kan se. Fjern derefter den første kontos adgang, og mål, hvor hurtigt oplysningen forsvinder fra nye svar. Udskyd lanceringen, hvis en bruger uden adgang kan se den."
        ],
        [
          "Hvad er tre minutter pr. sag værd?",
          "Antag, at 300 sager om måneden tager otte minutter stykket, og at piloten klarer dem på fem, inklusive gennemlæsning. Det frigør 15 arbejdstimer. Ved 40 euro i timen svarer tiden til 600 euro. Træk 180 euro fra til månedlig drift, og den beregnede værdi er 420 euro før engangsudgiften til indførelse. Eksemplet viser værdien af den frigjorte tid. En besparelse på budgettet kræver, at en udgift som overarbejde faktisk falder."
        ],
        [
          "Sådan kan SundAI hjælpe inden tilslutningen",
          "Tag en retursag uden kundeoplysninger med til en gratis introduktionssamtale på 20 minutter. En Decision Review giver jer en skriftlig anbefaling om én konkret beslutning, eksempelvis hvilken adgang leverandøren skal have. Hvis I ønsker hjælp til indførelsen, kan vi sammen med jeres it-partner tilrettelægge adgangstesten, lægge et budget og aftale, hvad der skal være på plads før næste skridt."
        ]
      ],
      "exercise": "Vælg en retursag. Skriv ned, hvilke felter I har brug for, hvem der må se dem, hvem der må sende svaret, og hvornår forsøget skal standses. Mål derefter tiden for hele sagen, inklusive rettelser."
    }
  }
};
