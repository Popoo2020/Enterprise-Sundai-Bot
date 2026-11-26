/** Original SundAI editorial series. Examples are illustrative, not customer outcomes. */
export const adoptionGuides = [
  {
    "slug": "ai-token-waste-architecture-audit",
    "category": "work",
    "related": "services/secure-ai-automation/",
    "published": "2026-11-25",
    "sources": [
      {
        "name": "FinOps Foundation · Total Cost of AI",
        "url": "https://www.finops.org/wg/total-cost-of-ai-tca/"
      },
      {
        "name": "FinOps Foundation · Managing AI Token Costs",
        "url": "https://www.finops.org/wg/token-economics-saas/"
      },
      {
        "name": "Google Cloud · Agentic AI architecture components",
        "url": "https://docs.cloud.google.com/architecture/choose-agentic-ai-architecture-components"
      },
      {
        "name": "Google Cloud · AI inference cost optimisation",
        "url": "https://docs.cloud.google.com/architecture/networking-for-ai-inference"
      },
      {
        "name": "OWASP · LLM06:2026 Unbounded Consumption",
        "url": "https://genai.owasp.org/llm2026/llm062026-unbounded-consumption/"
      },
      {
        "name": "ISO · ISO/IEC 27001:2022",
        "url": "https://www.iso.org/standard/27001"
      },
      {
        "name": "ISO · ISO/IEC 42001:2023",
        "url": "https://www.iso.org/standard/42001"
      }
    ],
    "text": {
      "en": {
        "title": "Is your AI burning the budget it was meant to save?",
        "summary": "Two ways to handle the same 2,000 enquiries can produce very different model bills. Compare cost per accepted case while holding review quality and access rights constant.",
        "sections": [
          [
            "The invoice is a symptom, not a diagnosis",
            "A customer-service agent can call a model to classify a request, search documents, plan a response and verify it. If every stage uses a premium model, the entire conversation is resent on every call and a failed step restarts the whole chain, usage grows much faster than useful work. The FinOps Foundation distinguishes token spending from the full cost of delivering an AI outcome. Trace the complete workflow before renegotiating a model contract."
          ],
          [
            "Five places to look for waste",
            "Start with representative traces and compare them against the business requirements. Google Cloud's architecture guidance discusses routing and caching; neither is a substitute for testing.",
            [
              "Use deterministic code for fixed rules, arithmetic and validation. Reserve models for tasks that require interpretation.",
              "Route straightforward requests to a less expensive model only if it passes the same evaluation; escalate exceptions to a stronger model.",
              "Retrieve relevant, authorised passages rather than attaching entire document collections to every prompt.",
              "Cache eligible repeated work only within the correct tenant, access scope and freshness policy; never reuse restricted responses across users.",
              "Cap agent steps, retries, input/output tokens and cumulative spend; make external actions idempotent and route exceptions to staff."
            ]
          ],
          [
            "Why security is also financial protection",
            "An uncontrolled agent may run up costs through accidental loops or deliberate abuse. OWASP identifies unbounded consumption as an LLM security risk. Set authenticated usage quotas, per-workflow spending limits, alerts and an application-level circuit breaker. Keep secrets and unnecessary personal data out of traces. A cheaper answer is not a saving if it leaks data or causes an unauthorised action. ISO/IEC 27001 and ISO/IEC 42001 can help the team assign responsibility for those controls."
          ],
          [
            "A controlled comparison",
            "Illustration, not a client result or provider price: two designs each complete 2,000 accepted cases per month at equivalent quality, review effort and security. If the first consumes €0.60 in model and tool charges per case and the second €0.18, the variable charge falls from €1,200 to €360: €840 a month before implementation and other costs. Confirm the comparison with actual invoices, failure rates and end-to-end traces. Do not cut protective controls just to reach a target."
          ],
          [
            "What to ask for at the pilot review",
            "Ask for one row per design showing completed cases, model and tool charges, minutes spent checking answers, and failures sent back to staff. At SundAI we would rerun the same sample after a price or model change. The person approving the pilot can then see whether a lower bill came with more corrections or wider access."
          ]
        ],
        "exercise": "Choose one costly workflow. Record calls, retries, model, authorised context size, accepted results and total charges for a representative sample. Agree the quality threshold before testing a revised design."
      },
      "he": {
        "title": "האם מערכת ה־AI מבזבזת את התקציב שהיא נועדה לחסוך?",
        "summary": "שתי מערכות שמטפלות באותן 2,000 פניות יכולות להניב חשבונות שונים מאוד. השוו עלות לפנייה שאושרה, כשהרשאות הגישה ורף האיכות זהים.",
        "sections": [
          [
            "החשבון החודשי הוא סימפטום, לא אבחנה",
            "סוכן AI בשירות לקוחות עשוי להפעיל מודל כדי לסווג פנייה, לחפש מידע, לתכנן תשובה ולבדוק אותה. אם כל שלב משתמש במודל יקר, כל היסטוריית השיחה נשלחת מחדש וכל תקלה גורמת להפעלה חוזרת של כל התהליך, העלות עלולה לגדול מהר בהרבה מכמות העבודה שהושלמה. לפי FinOps Foundation, עלות הטוקנים היא רק רכיב בעלות הכוללת של תוצר AI. לפני שמחליפים ספק כדאי להבין מה באמת מייצר את החשבון."
          ],
          [
            "חמישה מקומות שבהם כדאי לחפש בזבוז",
            "התחילו בנתוני הרצה של מדגם מייצג והשוו אותם לדרישות העסקיות. בתיעוד של Google Cloud מוצגות בין היתר שיטות לניתוב בין מודלים ולשמירה זמנית של תוצאות. את התאמתן יש לבדוק בפועל.",
            [
              "חישובים, כללים קבועים ואימות נתונים מבצעים בקוד רגיל; מודל שפה נדרש בעיקר במקום שבו יש צורך בפרשנות.",
              "משימות פשוטות מפנים למודל זול יותר רק אם הוא עומד באותה רמת איכות. מקרים מורכבים מעבירים למודל מתאים יותר.",
              "באמצעות RAG שולפים רק את קטעי המידע הרלוונטיים שהמשתמש רשאי לקרוא, במקום לצרף מאגר מסמכים שלם.",
              "שימוש חוזר בתוצאות או בהקשר שמור מחייב הפרדה בין לקוחות, בדיקת הרשאות ותוקף המידע.",
              "מגבילים מספר צעדים, ניסיונות חוזרים, טוקנים והוצאה מצטברת. מונעים ביצוע כפול של פעולות ומעבירים חריגים לעובד מוסמך."
            ]
          ],
          [
            "גם אבטחה מגינה על התקציב",
            "סוכן בלתי מבוקר עלול להיכנס ללולאה בגלל תקלה או בעקבות שימוש לרעה. OWASP מזהה צריכת משאבים בלתי מוגבלת כסיכון אבטחה במערכות LLM. קבעו מכסות לפי זהות ותהליך, מגבלות תקציב, התרעות ומנגנון עצירה. אל תכניסו סודות או מידע אישי מיותר ליומני הפעילות. תשובה זולה יותר אינה חיסכון אם היא גורמת לחשיפה או לפעולה ללא הרשאה. תקני ISO/IEC 27001 ו־ISO/IEC 42001 יכולים לסייע לצוות להגדיר מי אחראי לבקרות האלה."
          ],
          [
            "דוגמה להשוואה מבוקרת",
            "דוגמה להמחשה בלבד: שני תכנונים מטפלים ב־2,000 פניות מאושרות בחודש באותה איכות, באותו זמן בדיקה ובאותה רמת אבטחה. אם עלות המודלים והכלים בתכנון הראשון היא 0.60 אירו לפנייה ובשני 0.18 אירו, ההוצאה המשתנה יורדת מ־1,200 ל־360 אירו בחודש. ההפרש הוא 840 אירו לפני עלויות הפיתוח ושאר ההוצאות. יש לאמת אותו לפי חשבוניות, תקלות ותוצאות בפועל, ולא באמצעות ויתור על בקרות."
          ],
          [
            "מה לבקש בסיכום הפיילוט",
            "בקשו שורה לכל חלופה ובה מספר הפניות שהושלמו, עלות המודלים והכלים, דקות הבדיקה ומספר הפניות שחזרו לטיפול הצוות. ב־SundAI היינו מריצים את אותו מדגם שוב אחרי שינוי מחיר או החלפת מודל. כך מי שמאשר את הפיילוט יכול לראות אם הירידה בחשבון באה עם יותר תיקונים או עם הרחבת גישה."
          ]
        ],
        "exercise": "בחרו תהליך יקר אחד. תעדו קריאות למודלים, ניסיונות חוזרים, כמות ההקשר המותר, תוצרים שאושרו והעלות הכוללת במדגם מייצג. קבעו רף איכות לפני השוואת תכנונים."
      },
      "sv": {
        "title": "Äter AI upp budgeten som tekniken skulle spara?",
        "summary": "Två lösningar kan hantera samma 2 000 ärenden och ge helt olika fakturor. Jämför kostnaden per godkänt ärende med samma kvalitetskrav och behörigheter.",
        "sections": [
          [
            "Fakturan visar ett symptom",
            "En kundtjänstagent kan klassificera, söka, planera och granska ett svar. Om varje steg använder en dyr modell, hela historiken skickas om och fel startar om hela kedjan, kan kostnaden växa snabbare än antalet avslutade ärenden. FinOps Foundation skiljer modellförbrukning från den totala kostnaden för resultatet. Följ hela arbetsflödet före en ny leverantörsförhandling."
          ],
          [
            "Fem ställen att leta efter svinn",
            "Granska representativa körningar mot verksamhetens krav. Google Clouds arkitekturvägledning tar upp modellstyrning och cachning; testa alltid lösningen.",
            [
              "Använd vanlig kod för fasta regler, beräkningar och validering.",
              "Välj en billigare modell för enkla uppgifter först när den klarar samma kvalitetsprov; eskalera undantag.",
              "Hämta bara relevanta dokumentavsnitt som användaren får läsa.",
              "Återanvänd endast lämpliga svar inom rätt kundmiljö, behörighetsgräns och giltighetstid.",
              "Begränsa steg, omförsök, tokenförbrukning och kostnad; förhindra dubbla åtgärder och lämna undantag till personalen."
            ]
          ],
          [
            "Säkerhet skyddar också ekonomin",
            "En agent kan fastna i loopar genom fel eller missbruk. OWASP beskriver obegränsad resursförbrukning som en säkerhetsrisk för språkmodeller. Sätt autentiserade kvoter, kostnadstak, larm och en stoppmekanism i applikationen. Logga inte nycklar eller onödiga personuppgifter. En billigare körning är ingen vinst om den röjer uppgifter. ISO/IEC 27001 och ISO/IEC 42001 kan hjälpa teamet att fördela ansvaret för kontrollerna."
          ],
          [
            "Jämför två lösningar under samma villkor",
            "Räkneexempel, inte ett kundresultat: båda lösningarna klarar 2 000 godkända ärenden per månad med samma kvalitet, granskningstid och säkerhet. Modell- och verktygskostnaden är 0,60 respektive 0,18 euro per ärende. Kostnaden sjunker från 1 200 till 360 euro, en skillnad på 840 euro före införande och andra kostnader. Kontrollera utfallet med fakturor och kördata."
          ],
          [
            "Vad behöver ni se när piloten utvärderas?",
            "Be om en rad per lösning med antal avslutade ärenden, modell- och verktygskostnader, granskningstid och antal ärenden som gick tillbaka till personalen. På SundAI skulle vi köra samma urval igen efter ett pris- eller modellbyte. Då ser den som godkänner piloten om en lägre faktura krävde fler rättelser eller bredare åtkomst."
          ]
        ],
        "exercise": "Välj ett dyrt arbetsflöde. Mät anrop, omförsök, modell, mängd tillåten kontext, godkända resultat och kostnad. Bestäm kvalitetskravet innan ni testar en ändring."
      },
      "da": {
        "title": "Æder AI det budget, teknologien skulle spare?",
        "summary": "To løsninger kan behandle de samme 2.000 henvendelser og give vidt forskellige regninger. Sammenlign prisen pr. godkendt sag med samme kvalitetskrav og adgangsrettigheder.",
        "sections": [
          [
            "Fakturaen er et symptom",
            "En kundeserviceagent kan klassificere, søge, planlægge og kontrollere et svar. Hvis alle trin bruger en dyr model, hele historikken sendes igen, og fejl genstarter kæden, kan udgifterne vokse hurtigere end antallet af afsluttede sager. FinOps Foundation skelner mellem tokenudgifter og de samlede omkostninger ved et resultat. Følg hele arbejdsgangen før en ny leverandørforhandling."
          ],
          [
            "Fem steder at lede efter spild",
            "Gennemgå repræsentative kørsler i forhold til forretningens krav. Google Clouds arkitekturvejledning beskriver blandt andet modelrouting og caching; løsningen skal altid afprøves.",
            [
              "Brug almindelig kode til faste regler, beregninger og validering.",
              "Vælg en billigere model til enkle opgaver, når den består samme kvalitetstest; eskaler undtagelser.",
              "Hent kun relevante dokumentafsnit, som brugeren har adgang til.",
              "Genbrug kun passende data inden for den rette kundes adgangsgrænse og gyldighedsperiode.",
              "Begræns trin, gentagelser, tokenforbrug og udgifter; undgå dobbelte handlinger, og send undtagelser til medarbejderne."
            ]
          ],
          [
            "Sikkerhed beskytter også økonomien",
            "En agent kan gå i ring ved fejl eller misbrug. OWASP beskriver ubegrænset ressourceforbrug som en sikkerhedsrisiko for sprogmodeller. Indfør autentificerede kvoter, udgiftslofter, alarmer og en stopmekanisme i applikationen. Hold nøgler og unødvendige personoplysninger ude af loggen. En billigere kørsel er ingen gevinst, hvis den lækker oplysninger. ISO/IEC 27001 og ISO/IEC 42001 kan hjælpe teamet med at placere ansvaret for kontrollerne."
          ],
          [
            "Sammenlign to løsninger på samme vilkår",
            "Regneeksempel, ikke et kunderesultat: begge løsninger afslutter 2.000 godkendte sager pr. måned med samme kvalitet, kontroltid og sikkerhed. Model- og værktøjsudgiften er henholdsvis 0,60 og 0,18 euro pr. sag. Udgiften falder fra 1.200 til 360 euro, en forskel på 840 euro før implementering og øvrige omkostninger. Kontrollér resultatet mod fakturaer og kørselsdata."
          ],
          [
            "Hvad skal I se, når piloten evalueres?",
            "Bed om en række for hver løsning med antal afsluttede sager, udgifter til modeller og værktøjer, tid brugt på kontrol og antal sager, som medarbejderne fik tilbage. Hos SundAI ville vi køre den samme stikprøve igen efter en prisændring eller et modelskift. Så kan den ansvarlige se, om en lavere regning krævede flere rettelser eller bredere adgang."
          ]
        ],
        "exercise": "Vælg én dyr arbejdsgang. Registrer kald, gentagelser, model, mængde tilladt kontekst, godkendte resultater og omkostning. Fastlæg kvalitetskravet inden testen."
      }
    },
    "sectionSources": [
      [
        0
      ],
      [
        2,
        3
      ],
      [
        4,
        5,
        6
      ],
      [],
      []
    ],
    "modified": "2026-11-26"
  },
  {
    "slug": "ai-headcount-savings-realised-value",
    "category": "work",
    "related": "services/secure-ai-automation/",
    "published": "2026-11-25",
    "sources": [
      {
        "name": "FinOps Foundation · Total Cost of AI",
        "url": "https://www.finops.org/wg/total-cost-of-ai-tca/"
      },
      {
        "name": "FinOps Foundation · Managing AI Token Costs",
        "url": "https://www.finops.org/wg/token-economics-saas/"
      },
      {
        "name": "ISO · ISO/IEC 42001:2023",
        "url": "https://www.iso.org/standard/42001"
      },
      {
        "name": "NIST · AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "name": "ISO · ISO/IEC 27001:2022",
        "url": "https://www.iso.org/standard/27001"
      }
    ],
    "text": {
      "en": {
        "title": "Before replacing headcount with AI, prove the savings reach the budget",
        "summary": "An AI assistant frees up 100 staff hours. Which invoice will actually fall? A worked example shows how a €300 monthly gain can become a €200 loss.",
        "sections": [
          [
            "Do not confuse time recovered with money recovered",
            "A department expects an AI assistant to save 100 hours per month. At €35 per hour, the released capacity has an indicative value of €3,500. Unless paid overtime, contractor invoices or another actual expense falls, this is not automatically €3,500 in cash savings. Finance and the process owner should agree whether the purpose is lower expenditure, higher throughput, better service or a combination."
          ],
          [
            "Build a three-way comparison",
            "Compare today's process, a conventional automation and an AI-assisted design on the same case mix and quality requirements. A fixed-rule workflow may be cheaper and safer than an agent for predictable tasks. Include recurring licences, model and tool charges, hosting, support, human review and rework; account separately for setup, training and transition. Use actual contract terms rather than headline pricing."
          ],
          [
            "A realistic management decision",
            "Illustrative monthly scenario: eliminating €1,800 of overtime and €900 of contractor spend yields €2,700 of cash savings. AI and tools cost €1,500, incremental support and assurance cost €500, and additional paid review costs €400. Net monthly cash improvement is €300 before setup, tax and other changes. A €6,000 one-off implementation would take 20 months to recover at that unchanged rate. If AI and tool charges rise by €500, the project instead loses €200 per month. Check costs for overlap and never count the same labour saving twice."
          ],
          [
            "Protect the service while you change it",
            "Do not remove operational expertise before the new workflow has proven it can handle routine and unusual cases. Agree minimum acceptance quality, escalation capacity, maximum spending, incident recovery and rollback. Track actual payroll and invoices separately from capacity released. Review performance and risk after supplier, model or data changes. ISO/IEC 42001, ISO/IEC 27001 and NIST AI RMF can inform that management discipline; none guarantees commercial performance."
          ],
          [
            "A question for the next budget meeting",
            "Give Finance two columns. In the first, name the expense that will fall, who owns it and which invoice or overtime record will show the change. In the second, name the work the team can do with the hours it recovers. At the end of the pilot, compare both columns with the baseline before signing a longer contract."
          ]
        ],
        "exercise": "Ask Finance and the process owner to identify the expenses that would actually disappear, the capacity that would instead be reused, and the point at which rising AI costs trigger a review."
      },
      "he": {
        "title": "לפני שמחליפים תקני כוח אדם ב־AI, בודקים אם הכסף באמת נחסך",
        "summary": "עוזר AI מפנה 100 שעות עבודה. איזו הוצאה באמת תרד? חישוב לדוגמה מראה כיצד שיפור חודשי של 300 אירו יכול להפוך להפסד של 200 אירו.",
        "sections": [
          [
            "זמן שהתפנה אינו בהכרח כסף שנחסך",
            "מחלקה מעריכה שעוזר AI יחסוך 100 שעות בחודש. לפי 35 אירו לשעה, הערך המשוער של הזמן שהתפנה הוא 3,500 אירו. אם הוצאות השעות הנוספות, קבלני המשנה או סעיף הוצאה אחר לא ירדו, אין פירוש הדבר ש־3,500 אירו נחסכו בפועל. ההנהלה והאחראי לתהליך צריכים להחליט מה המטרה: הקטנת הוצאות, הגדלת תפוקה או שיפור השירות."
          ],
          [
            "משווים שלוש דרכי עבודה, לא רק שני מודלים",
            "השוו בין התהליך הקיים, אוטומציה רגילה ותהליך מבוסס AI באותו תמהיל משימות ובאותה דרישת איכות. במקרים צפויים, כללים קבועים בקוד עשויים להיות זולים ובטוחים יותר מסוכן AI. כללו רישוי, מודלים, כלי צד שלישי, אחסון, תחזוקה, בדיקות אנושיות ותיקונים. הפרידו הוצאות הקמה, הדרכה ומעבר מההוצאות השוטפות. בדקו את החוזים בפועל ולא רק את המחיר בפרסומת."
          ],
          [
            "דוגמה להחלטה ניהולית",
            "להמחשה בלבד: ביטול שעות נוספות בסך 1,800 אירו והוצאה של 900 אירו על קבלנים חוסך 2,700 אירו בחודש. מודלים וכלים עולים 1,500 אירו, תחזוקה ובקרות נוספות 500 אירו ובדיקה בתשלום 400 אירו. החיסכון התזרימי נטו הוא 300 אירו בחודש, לפני הקמה, מס ושינויים אחרים. הקמה חד־פעמית של 6,000 אירו תוחזר לאחר 20 חודשים אם הנתונים לא ישתנו. אם עלות המודלים והכלים תעלה ב־500 אירו, ייווצר הפסד חודשי של 200 אירו. אין לספור אותה הוצאת כוח אדם פעמיים."
          ],
          [
            "מגינים על השירות בתקופת השינוי",
            "לא מוותרים על הידע של הצוות לפני שהמערכת הוכיחה שהיא מטפלת הן במקרים שגרתיים והן בחריגים. מגדירים רף איכות, יכולת העברת טיפול לעובד, תקרת הוצאה ותוכנית חזרה לתהליך הקודם. עוקבים בנפרד אחר חשבוניות, הוצאות שכר וזמן שהתפנה. בודקים מחדש אחרי שינוי ספק, מודל או מקור מידע. תקני ISO/IEC 42001 ו־27001 ומסגרת NIST AI RMF מסייעים לבנות משמעת ניהולית, אך אינם מבטיחים רווחיות."
          ],
          [
            "שאלה לישיבת התקציב הבאה",
            "הציגו לצוות הכספים שתי עמודות. בראשונה רשמו איזו הוצאה צפויה לרדת, מי אחראי עליה ובאיזו חשבונית או רשומת שעות נוספות ייראה השינוי. בשנייה רשמו מה יעשה הצוות בשעות שיתפנו. בסיום הפיילוט השוו את שתי העמודות לנתוני הבסיס לפני חתימה על חוזה ארוך יותר."
          ]
        ],
        "exercise": "בקשו ממנהל הכספים ומהאחראי לתהליך לציין אילו הוצאות ייעלמו בפועל, אילו שעות יופנו למשימות אחרות, ובאיזו עלות AI תידרש בחינה מחדש."
      },
      "sv": {
        "title": "Innan AI ersätter bemanning: visa att besparingen syns i budgeten",
        "summary": "En AI-assistent frigör 100 arbetstimmar. Vilken utgift minskar faktiskt? Ett räkneexempel visar hur en månadsvinst på 300 euro kan bli en förlust på 200 euro.",
        "sections": [
          [
            "Frigjord tid är inte automatiskt sparade pengar",
            "En avdelning räknar med att frigöra 100 timmar per månad. Vid 35 euro i timmen motsvarar tiden 3 500 euro i kapacitetsvärde. Om övertid, konsultfakturor eller andra faktiska utgifter inte minskar har ni inte automatiskt sparat 3 500 euro. Låt ekonomi och processägaren välja mål: lägre utgifter, högre kapacitet eller bättre service."
          ],
          [
            "Jämför tre arbetssätt",
            "Jämför nuvarande process, regelbaserad automatisering och AI-stödd automatisering med samma ärendetyper och kvalitetskrav. Räkna licenser, modell- och verktygsavgifter, drift, underhåll, mänsklig kontroll och rättelser. Håll införande, utbildning och omställning åtskilda från löpande kostnader. Kontrollera avtalsvillkoren."
          ],
          [
            "Ett räkneexempel för ledningen",
            "Anta att övertid på 1 800 euro och konsultkostnader på 900 euro försvinner varje månad. Det ger 2 700 euro i faktisk besparing. AI och verktyg kostar 1 500 euro, extra stöd och kontroller 500 euro och tillkommande betald granskning 400 euro. Netto blir 300 euro före införande, skatt och andra ändringar. Ett införande på 6 000 euro återbetalas då på 20 månader. Om modell- och verktygsutgifterna ökar med 500 euro blir det i stället en förlust på 200 euro i månaden. Dubbelräkna inte personalkostnader."
          ],
          [
            "Skydda verksamheten under förändringen",
            "Behåll kompetensen tills lösningen har klarat både rutinärenden och undantag. Sätt kvalitetskrav, eskalering, kostnadstak och en plan för återgång. Följ faktiska löner och fakturor separat från frigjord tid. Granska på nytt när modell, leverantör eller data ändras. ISO/IEC 42001, ISO/IEC 27001 och NIST AI RMF ger stöd för styrningen, inte en garanti om lönsamhet."
          ],
          [
            "En fråga till nästa budgetmöte",
            "Ge ekonomiavdelningen två kolumner. Ange i den första vilken utgift som sjunker, vem som ansvarar för den och på vilken faktura eller övertidsrad förändringen ska synas. Skriv i den andra vad teamet kan göra med tiden som frigörs. Jämför båda kolumnerna med utgångsläget innan ni tecknar ett längre avtal."
          ]
        ],
        "exercise": "Be ekonomi och processägaren ange vilka utgifter som verkligen försvinner, vilken tid som används till annat och när en ny kostnadsprövning ska göras."
      },
      "da": {
        "title": "Før AI erstatter bemanding: vis, at besparelsen når budgettet",
        "summary": "En AI-assistent frigør 100 arbejdstimer. Hvilken udgift falder faktisk? Et regneeksempel viser, hvordan en månedlig gevinst på 300 euro kan blive til et tab på 200 euro.",
        "sections": [
          [
            "Frigjort tid er ikke automatisk sparede penge",
            "En afdeling forventer at frigøre 100 timer om måneden. Ved 35 euro i timen svarer tiden til en kapacitetsværdi på 3.500 euro. Hvis overarbejde, konsulentregninger eller andre faktiske udgifter ikke falder, er der ikke automatisk sparet 3.500 euro. Lad økonomi og procesejeren aftale målet: lavere udgifter, større kapacitet eller bedre service."
          ],
          [
            "Sammenlign tre arbejdsgange",
            "Sammenlign den nuværende proces, regelbaseret automatisering og AI med samme sagstyper og kvalitetskrav. Medregn licenser, model- og værktøjsudgifter, drift, vedligeholdelse, menneskelig kontrol og rettelser. Hold indførelse, uddannelse og omstilling adskilt fra driften. Kontrollér de faktiske aftalevilkår."
          ],
          [
            "Et regneeksempel til ledelsen",
            "Antag, at overarbejde for 1.800 euro og konsulentudgifter på 900 euro bortfalder hver måned. Det giver 2.700 euro i reelle besparelser. AI og værktøjer koster 1.500 euro, ekstra support og kontroller 500 euro og ekstra betalt gennemgang 400 euro. Netto bliver 300 euro før implementering, skat og øvrige ændringer. En engangsudgift på 6.000 euro tjenes dermed hjem på 20 måneder. Stiger model- og værktøjsudgifterne med 500 euro, bliver det et tab på 200 euro om måneden. Undgå dobbelttælling af lønudgifter."
          ],
          [
            "Beskyt driften under ændringen",
            "Behold kompetencerne, indtil løsningen har klaret både rutinesager og undtagelser. Aftal kvalitetskrav, eskalation, budgetloft og en plan for tilbagevenden. Følg løn og fakturaer adskilt fra frigjort tid. Revurdér ved ændring af model, leverandør eller data. ISO/IEC 42001, ISO/IEC 27001 og NIST AI RMF kan understøtte styringen, men garanterer ikke rentabilitet."
          ],
          [
            "Et spørgsmål til næste budgetmøde",
            "Giv økonomiafdelingen to kolonner. Skriv i den første, hvilken udgift der falder, hvem der har ansvaret, og hvilken faktura eller overtidsregistrering der vil vise ændringen. Skriv i den anden, hvad teamet kan bruge de frigjorte timer til. Sammenlign begge kolonner med udgangspunktet, før I underskriver en længere kontrakt."
          ]
        ],
        "exercise": "Bed økonomi og procesejeren angive, hvilke udgifter der reelt forsvinder, hvilken tid der bruges på andre opgaver, og hvornår omkostningen skal revurderes."
      }
    },
    "sectionSources": [
      [
        0
      ],
      [
        0,
        1
      ],
      [],
      [
        2,
        3,
        4
      ],
      []
    ],
    "modified": "2026-11-26"
  },
  {
    "slug": "secure-ai-adoption-release-gates",
    "category": "governance",
    "related": "services/compliance-ai-governance/",
    "published": "2026-11-25",
    "sources": [
      {
        "name": "ISO · ISO/IEC 42001:2023",
        "url": "https://www.iso.org/standard/42001"
      },
      {
        "name": "ISO · ISO/IEC 27001:2022",
        "url": "https://www.iso.org/standard/27001"
      },
      {
        "name": "NIST · AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "name": "EUR-Lex · EU AI Act, consolidated text",
        "url": "https://eur-lex.europa.eu/eli/reg/2024/1689"
      },
      {
        "name": "EUR-Lex · GDPR",
        "url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/"
      },
      {
        "name": "OWASP · LLM06:2026 Unbounded Consumption",
        "url": "https://genai.owasp.org/llm2026/llm062026-unbounded-consumption/"
      },
      {
        "name": "ISO · Checking the status of a certification",
        "url": "https://www.iso.org/certification.html"
      }
    ],
    "text": {
      "en": {
        "title": "Secure AI adoption: who decides when a system is ready to go live?",
        "summary": "An assistant drafts a customer quote from an expired price list. Follow that example to decide who can stop the send, what a certificate covers and who can approve a restart.",
        "sections": [
          [
            "One accountable decision instead of disconnected checklists",
            "A demo of a quotation assistant can look impressive while nobody has agreed which price lists it may use, who owns the budget or whether it may send a binding offer. Secure adoption connects business ownership, engineering, cybersecurity and governance. ISO/IEC 42001 addresses AI management systems; ISO/IEC 27001 addresses information security management. The NIST AI RMF provides a risk-management framework. Use them to structure an actual decision, not to decorate a proposal."
          ],
          [
            "Make a release record the team can use",
            "For each use case record the intended purpose, business owner, model and data suppliers, permitted actions, expected outcomes and stop criteria. Assign engineering to test the controls and an authorised decision-maker to accept residual risk. Where relevant, identify AI Act roles and applicable obligations; assess GDPR lawfulness, minimisation, processors and whether a DPIA is required. These are legal assessments specific to the use case, separate from voluntary standards."
          ],
          [
            "Four pieces of evidence before approval",
            "A release record should explain what was tested, the result, who reviewed it and any open issues.",
            [
              "Business: compare accepted quotations against the current process, including corrections and cost.",
              "Security: test unauthorised data access, injection attempts and tool permissions using fictional records.",
              "Operations: test spend caps, fallback, audit logs and safe recovery from failures.",
              "Governance: agree who may change the model, approve deployment and suspend the workflow."
            ]
          ],
          [
            "The decision must survive the next update",
            "Define a change threshold. A new model, prompt, price list, integration or user population can invalidate earlier evidence. Repeat relevant evaluation and access checks; document the approval or rollback. Track incidents, quality and unit cost with the owner. A signed decision is not proof that a system remains safe forever."
          ],
          [
            "What does the supplier’s certificate cover?",
            "If a supplier cites ISO/IEC 27001 or ISO/IEC 42001, ask for the certificate. Check the named organisation, the activities and locations in scope, the issuer and the dates. Confirm its status with the issuer and see whether the proposed service falls within scope. In a test workspace, give the assistant a fictional, expired price list. Record whether it withheld the quote and who could authorise a restart with the current list. Those are two different pieces of evidence a buyer can inspect."
          ]
        ],
        "exercise": "Choose one pending AI release. Write its purpose, owner, three acceptance tests, one hard stop and the person who can approve restart. Identify which evidence is still missing."
      },
      "he": {
        "title": "הטמעת AI מאובטחת: מי מחליט שהמערכת מוכנה לעלות לאוויר?",
        "summary": "עוזר AI מכין הצעת מחיר לפי מחירון שפג תוקפו. בעזרת הדוגמה אפשר לבדוק מי עוצר את השליחה, מה מכסה תעודת הספק ומי רשאי לאשר חזרה לעבודה.",
        "sections": [
          [
            "החלטה אחת במקום רשימות בדיקה מנותקות",
            "הדגמה של עוזר להצעות מחיר עשויה להרשים גם כשלא ברור באילו מחירונים מותר לו להשתמש, מי אחראי לתקציב ואם הוא רשאי לשלוח הצעה מחייבת. הטמעה מאובטחת מחברת בין האחריות העסקית, הפיתוח, הסייבר וממשל ה־AI. תקן ISO/IEC 42001 עוסק במערכות ניהול AI, תקן 27001 במערכות ניהול אבטחת מידע, ו־NIST AI RMF מציע מסגרת לניהול סיכונים. ערכם הוא בהחלטות ובבקרות שבאמת מיישמים."
          ],
          [
            "מתעדים את ההחלטה בצורה שהצוות יכול ליישם",
            "לכל שימוש מגדירים מטרה, אחראי עסקי, ספקי מודלים ומידע, פעולות מותרות, תוצאות רצויות ותנאי עצירה. צוות הפיתוח בודק את הבקרות ואחראי מוסמך מאשר את הסיכון שנותר. לפי העניין, מבררים את תחולת חוק ה־AI האירופי ואת תפקיד הארגון; בוחנים בנפרד את בסיס העיבוד לפי GDPR, צמצום מידע, ספקי עיבוד והצורך בתסקיר השפעה על פרטיות. אלו בדיקות משפטיות תלויות שימוש, הנבדלות מתקנים וולונטריים."
          ],
          [
            "ארבע ראיות לפני אישור",
            "תיעוד המוכנות צריך להסביר מה נבדק, מה הייתה התוצאה, מי בדק ומה עדיין פתוח.",
            [
              "עסקית: משווים הצעות שאושרו לתהליך הקיים, כולל תיקונים ועלויות.",
              "אבטחה: בודקים עם נתונים פיקטיביים גישה ללא הרשאה, הזרקת הנחיות והרשאות לכלים.",
              "תפעול: בודקים מגבלות תקציב, מעבר לטיפול חלופי, רישום והתאוששות מתקלות.",
              "ממשל: קובעים מי רשאי לשנות מודל, לאשר הפעלה ולעצור את התהליך."
            ]
          ],
          [
            "גם העדכון הבא מחייב אחריות",
            "שינוי מודל, הנחיות, מחירון, חיבור למערכת או קבוצת משתמשים עלול להפוך ראיות קודמות ללא רלוונטיות. חוזרים על בדיקות האיכות וההרשאות הנדרשות ומתעדים אישור או חזרה לגרסה קודמת. עוקבים יחד עם האחראי אחר אירועים, איכות ועלות ליחידת עבודה. החלטה חתומה אינה הוכחה שמערכת תישאר בטוחה לאורך זמן."
          ],
          [
            "מה מכסה תעודת ההסמכה של הספק?",
            "אם הספק מציג הסמכה לפי ISO/IEC 27001 או ISO/IEC 42001, בקשו לראות את התעודה. בדקו על שם איזה ארגון הונפקה, אילו פעילויות ואתרים היא מכסה, מי הנפיק אותה ומה תוקפה. אמתו את מעמדה מול הגוף המנפיק ובדקו אם השירות המוצע כלול בה. בסביבת בדיקה תנו לעוזר מחירון בדוי שפג תוקפו. תעדו אם הצעת המחיר נעצרה ומי רשאי לאשר חזרה לעבודה עם המחירון העדכני. כך אפשר לבדוק גם את ההסמכה וגם את התהליך הספציפי."
          ]
        ],
        "exercise": "בחרו מערכת לפני עלייה לאוויר. הגדירו מטרה, אחראי, שלושה מבחני קבלה, תנאי עצירה ומי רשאי לאשר חזרה לפעילות. ציינו אילו ראיות עוד חסרות."
      },
      "sv": {
        "title": "Säker AI-implementering: vem avgör när systemet får tas i drift?",
        "summary": "En assistent tar fram en offert från en inaktuell prislista. Följ exemplet för att avgöra vem som får stoppa utskicket, vad ett certifikat omfattar och vem som får godkänna en omstart.",
        "sections": [
          [
            "Ett samlat beslut i stället för separata checklistor",
            "En offertassistent kan imponera trots att ingen har bestämt vilka prislistor den får läsa, vem som äger budgeten eller om den får skicka bindande offerter. Säker AI-implementering förenar verksamhetsansvar, utveckling, cybersäkerhet och styrning. ISO/IEC 42001 gäller ledningssystem för AI, ISO/IEC 27001 informationssäkerhet och NIST AI RMF riskhantering. Använd dem i konkreta beslut."
          ],
          [
            "Dokumentera ansvaret",
            "För varje användning behövs syfte, processägare, modell- och dataleverantörer, tillåtna åtgärder, resultatkrav och stoppvillkor. Utvecklarna testar kontrollerna och behörig beslutsfattare bedömer kvarstående risk. Utred vid behov roller och skyldigheter enligt EU:s AI-förordning samt rättslig grund, uppgiftsminimering, biträden och behov av konsekvensbedömning enligt GDPR. Lagkrav bedöms separat från frivilliga standarder."
          ],
          [
            "Fyra underlag före godkännande",
            "Dokumentera test, resultat, granskare och öppna frågor.",
            [
              "Verksamhet: jämför godkända offerter, rättelser och kostnad mot dagens arbetssätt.",
              "Säkerhet: testa obehörig åtkomst, promptinjektion och verktygsbehörigheter med fiktiva uppgifter.",
              "Drift: testa kostnadstak, reservrutiner, loggning och återställning.",
              "Styrning: bestäm vem som får ändra modell, godkänna drift och stoppa processen."
            ]
          ],
          [
            "Beslutet måste hålla även efter nästa ändring",
            "Byte av modell, instruktion, prislista, integration eller användargrupp kan göra tidigare bevis inaktuella. Upprepa relevanta tester och dokumentera godkännande eller återgång. Följ incidenter, kvalitet och enhetskostnad med ansvarig. Ett undertecknat beslut garanterar inte fortsatt säkerhet."
          ],
          [
            "Vad täcker leverantörens certifikat?",
            "Om en leverantör hänvisar till certifiering enligt ISO/IEC 27001 eller ISO/IEC 42001, be att få se certifikatet. Kontrollera organisation, verksamheter, platser, utfärdare och giltighetstid. Bekräfta status hos utfärdaren och se om den erbjudna tjänsten omfattas. Ge sedan assistenten en påhittad, utgången prislista i en testmiljö. Anteckna om offerten stoppades och vem som får godkänna en omstart med den aktuella listan. Då kan köparen granska både certifikatet och hur arbetsflödet faktiskt fungerar."
          ]
        ],
        "exercise": "Välj en planerad driftsättning. Ange syfte, ansvarig, tre acceptanstest, ett stoppvillkor och vem som får godkänna en omstart. Lista vilket underlag som saknas."
      },
      "da": {
        "title": "Sikker AI-implementering: hvem afgør, hvornår systemet må gå i drift?",
        "summary": "En assistent udarbejder et tilbud ud fra en forældet prisliste. Brug eksemplet til at afgøre, hvem der kan standse afsendelsen, hvad et certifikat dækker, og hvem der kan godkende en genstart.",
        "sections": [
          [
            "Én samlet beslutning frem for separate tjeklister",
            "En tilbudsassistent kan imponere, selv om ingen har afgjort, hvilke prislister den må læse, hvem der ejer budgettet, eller om den må sende bindende tilbud. Sikker AI-implementering forbinder forretningsansvar, udvikling, cybersikkerhed og governance. ISO/IEC 42001 vedrører AI-ledelsessystemer, ISO/IEC 27001 informationssikkerhed og NIST AI RMF risikostyring. Brug rammerne i konkrete beslutninger."
          ],
          [
            "Dokumentér ansvaret",
            "For hver anvendelse beskrives formål, procesejer, model- og dataleverandører, tilladte handlinger, resultatkrav og stopkriterier. Udviklerne tester kontrollerne, og en bemyndiget beslutningstager vurderer restrisikoen. Undersøg relevante roller og pligter efter EU's AI-forordning samt behandlingsgrundlag, dataminimering, databehandlere og behov for konsekvensanalyse efter GDPR. Lovkrav vurderes særskilt fra frivillige standarder."
          ],
          [
            "Fire former for dokumentation inden godkendelse",
            "Dokumentér test, resultat, kontrollant og åbne spørgsmål.",
            [
              "Forretning: sammenlign godkendte tilbud, rettelser og udgift med den nuværende proces.",
              "Sikkerhed: test uautoriseret adgang, promptinjektion og værktøjsadgang med fiktive oplysninger.",
              "Drift: test udgiftsloft, reserveprocedure, logning og gendannelse.",
              "Governance: aftal, hvem der må ændre model, godkende drift og stoppe processen."
            ]
          ],
          [
            "Beslutningen skal også holde efter næste ændring",
            "En ny model, instruktion, prisliste, integration eller brugergruppe kan gøre tidligere dokumentation forældet. Gentag relevante test, og dokumentér godkendelse eller tilbageførsel. Følg hændelser, kvalitet og enhedsomkostning med den ansvarlige. En underskrevet beslutning garanterer ikke vedvarende sikkerhed."
          ],
          [
            "Hvad dækker leverandørens certifikat?",
            "Hvis en leverandør henviser til certificering efter ISO/IEC 27001 eller ISO/IEC 42001, så bed om at se certifikatet. Tjek organisation, aktiviteter, lokationer, udsteder og gyldighedsperiode. Bekræft status hos udstederen, og se, om den tilbudte tjeneste er omfattet. Giv derefter assistenten en fiktiv, udløbet prisliste i et testmiljø. Notér, om tilbuddet blev standset, og hvem der må godkende en genstart med den aktuelle liste. Så kan køberen undersøge både certifikatet og den konkrete arbejdsgang."
          ]
        ],
        "exercise": "Vælg en planlagt idriftsættelse. Notér formål, ansvarlig, tre accepttest, ét stopkriterium og hvem der må godkende genstart. Angiv, hvilken dokumentation der mangler."
      }
    },
    "sectionSources": [
      [
        0,
        1,
        2
      ],
      [
        3,
        4
      ],
      [],
      [
        2
      ],
      [
        0,
        1,
        6
      ]
    ],
    "modified": "2026-11-26"
  },
  {
    "slug": "secure-ai-adoption-team-handoffs",
    "category": "governance",
    "related": "services/secure-ai-automation/",
    "published": "2026-11-25",
    "sources": [
      {
        "name": "ISO · ISO/IEC 42001:2023",
        "url": "https://www.iso.org/standard/42001"
      },
      {
        "name": "NIST · AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "name": "EUR-Lex · EU AI Act, consolidated text",
        "url": "https://eur-lex.europa.eu/eli/reg/2024/1689"
      },
      {
        "name": "ISO · ISO/IEC 27001:2022",
        "url": "https://www.iso.org/standard/27001"
      }
    ],
    "text": {
      "en": {
        "title": "Your AI works. Does your team know when not to use it?",
        "summary": "Two price lists, one customer and a convincing draft. Use this short workshop exercise to practise when a colleague should approve, correct or stop an AI-generated quote.",
        "sections": [
          [
            "The operational gap after launch",
            "A sales team may have a capable AI assistant yet continue to copy answers into spreadsheets, send unsupported quotations or bypass approval because the workflow is slower than email. A licence count says little about whether work is being completed safely. Start by observing what happens between a model output and the business decision it supports."
          ],
          [
            "Design the handoff with the people doing the work",
            "For a quotation workflow, have sales, finance and IT agree which fields are required, where prices come from, who may approve exceptions and what a good answer contains. Build the handoff into the CRM. Keep access restricted to the user's role and give staff a clear way to flag uncertainty, rather than making them guess whether a fluent answer is correct."
          ],
          [
            "Teach decisions, not just prompting",
            "Train staff using realistic fictional cases. AI literacy is also addressed by Article 4 of the EU AI Act; determine the applicable obligations for your role and use case using the current consolidated text. ISO/IEC 42001 and NIST AI RMF support structured risk and lifecycle management. A practical training session might cover:",
            [
              "Routine case: check the source and approve a draft that follows the policy.",
              "Exception: detect conflicting prices or missing data and request human review.",
              "Suspicious case: stop an unexpected instruction in an email and report it.",
              "Changed policy: identify an outdated source and route the issue to the document owner."
            ]
          ],
          [
            "Measure adoption without rewarding unsafe speed",
            "Compare accepted results, correction time, escalations and repeat contacts with the baseline. A faster draft is not a successful outcome if review queues grow or staff stop reporting errors. Use aggregated operational measures where possible and set appropriate privacy safeguards before collecting employee-level data. Review patterns with staff and refine the workflow or training."
          ],
          [
            "Try the handoff in a workshop",
            "Give two colleagues a fictional enquiry and two price lists. One has expired. Ask the first colleague to prepare the quote and point to the price and effective date. Ask the second to decide whether it can be sent. Repeat with the dates removed. An acceptable handoff leaves the quote unsent, names the missing information and assigns someone to find it."
          ]
        ],
        "exercise": "Choose one AI-supported task. Ask two colleagues to complete three fictional cases: routine, ambiguous and suspicious. Record completion quality, review time and when they escalate."
      },
      "he": {
        "title": "ה־AI עובד. האם העובדים יודעים גם מתי אסור להסתמך עליו?",
        "summary": "שני מחירונים, לקוח אחד וטיוטה משכנעת. תרגיל קצר לסדנה מאפשר לצוות לתרגל מתי מאשרים הצעת מחיר שנוסחה בעזרת AI, מתי מתקנים ומתי עוצרים.",
        "sections": [
          [
            "הפער התפעולי שמתגלה אחרי ההשקה",
            "צוות מכירות יכול לקבל עוזר AI מתקדם ועדיין להעתיק תשובות לגיליונות, לשלוח הצעות ללא אסמכתאות או לעקוף אישורים כי התהליך מסורבל יותר ממייל רגיל. מספר הרישיונות לא מעיד בהכרח על עבודה בטוחה ויעילה. כדאי לבדוק מה מתרחש בין קבלת התוצר מהמודל לבין ההחלטה העסקית שמתקבלת בעקבותיו."
          ],
          [
            "מתכננים את העברת הטיפול עם מי שמבצע את העבודה",
            "בתהליך הכנת הצעות מחיר, המכירות, הכספים וה־IT צריכים להסכים אילו שדות חובה, מה מקור המחיר, מי מאשר חריגים ואיך נראית הצעה תקינה. משלבים את שלב הבדיקה במערכת ה־CRM. מגבילים גישה בהתאם לתפקיד ונותנים לעובד דרך ברורה לסמן חוסר ודאות, במקום לצפות ממנו לנחש אם תשובה משכנעת היא גם נכונה."
          ],
          [
            "מלמדים לקבל החלטות, לא רק לכתוב פרומפטים",
            "מתרגלים מקרים מציאותיים באמצעות נתונים פיקטיביים. סעיף 4 בחוק ה־AI האירופי עוסק גם באוריינות AI; יש לברר את החובות החלות לפי התפקיד והשימוש בהתאם לנוסח העדכני. תקן ISO/IEC 42001 ומסגרת NIST AI RMF מסייעים בניהול סיכונים לאורך חיי המערכת. הדרכה מעשית יכולה לכלול:",
            [
              "מקרה רגיל: בדיקת המקור ואישור טיוטה שעומדת בנוהל.",
              "חריגה: זיהוי מחירים סותרים או מידע חסר והעברה לבדיקה אנושית.",
              "מקרה חשוד: עצירת פעולה בעקבות הנחיה חריגה במייל ודיווח.",
              "עדכון נוהל: זיהוי מקור מיושן והעברת הנושא לאחראי על המסמך."
            ]
          ],
          [
            "מודדים הצלחה בלי לעודד קיצורי דרך",
            "משווים למדדי הבסיס את איכות התוצרים המאושרים, זמן התיקונים, החריגים ופניות חוזרות. טיוטה מהירה אינה הישג אם התור לבדיקה מתארך או אם העובדים מפסיקים לדווח על טעויות. ככל האפשר משתמשים בנתונים תפעוליים מצרפיים וקובעים הגנות פרטיות לפני איסוף נתונים אישיים על עובדים. בודקים את התוצאות עם הצוות ומשפרים את התהליך או את ההדרכה."
          ],
          [
            "תרגיל לסדנה בזוגות",
            "תנו לשני עמיתים פנייה בדויה ושני מחירונים, שאחד מהם כבר אינו בתוקף. בקשו מהראשון להכין הצעה ולהצביע על המחיר ועל תאריך התחולה. בקשו מהשני להחליט אם אפשר לשלוח אותה. חזרו על התרגיל אחרי שהסרתם את התאריכים. הפעם ההצעה צריכה להישאר בטיוטה, ומי שבודק אותה צריך לציין איזה מידע חסר ומי יברר אותו."
          ]
        ],
        "exercise": "בחרו משימה שמשלבת AI. בקשו משני עובדים לטפל בשלושה מקרים פיקטיביים: רגיל, לא חד־משמעי וחשוד. תעדו איכות, זמן בדיקה ומתי הטיפול הועבר לגורם אנושי."
      },
      "sv": {
        "title": "AI fungerar. Vet medarbetarna också när de inte ska lita på den?",
        "summary": "Två prislistor, en kund och ett övertygande utkast. I den här korta övningen tränar ni på att godkänna, rätta eller stoppa en AI-genererad offert.",
        "sections": [
          [
            "Glappet efter lanseringen",
            "En säljgrupp kan ha en bra assistent men ändå kopiera svar till kalkylblad, skicka offerter utan stöd eller kringgå godkännandet för att mejl går snabbare. Antalet licenser säger lite om säkert och effektivt arbete. Studera vad som händer mellan modellsvar och verksamhetsbeslut."
          ],
          [
            "Utforma överlämningen tillsammans",
            "Låt sälj, ekonomi och IT enas om obligatoriska fält, priskällor, undantagsgodkännande och kvalitetskrav. Bygg in kontrollen i CRM-systemet. Begränsa åtkomst efter roll och ge medarbetarna en tydlig väg att markera osäkerhet."
          ],
          [
            "Öva beslut, inte bara promptar",
            "Använd realistiska fiktiva ärenden. Artikel 4 i EU:s AI-förordning behandlar AI-kunnighet; utred vilka skyldigheter som gäller utifrån aktuell konsoliderad text, roll och användning. ISO/IEC 42001 och NIST AI RMF stödjer systematisk riskhantering. Öva till exempel:",
            [
              "Rutin: kontrollera källan och godkänn ett korrekt utkast.",
              "Undantag: hitta motstridiga priser eller saknade uppgifter och begär granskning.",
              "Misstänkt ärende: stoppa en oväntad instruktion i ett mejl och rapportera.",
              "Ändrad policy: hitta en inaktuell källa och kontakta dokumentägaren."
            ]
          ],
          [
            "Mät användning utan att belöna genvägar",
            "Jämför godkända resultat, rättelsetid, eskaleringar och återkommande kontakter med baslinjen. Snabba utkast hjälper inte om granskningskön växer. Använd aggregerade driftmått där det går och lämpligt integritetsskydd innan uppgifter om enskilda medarbetare samlas in. Förbättra processen tillsammans med personalen."
          ],
          [
            "Pröva överlämningen på en workshop",
            "Ge två kollegor en påhittad förfrågan och två prislistor. Den ena har gått ut. Be den första kollegan skriva ett offertutkast och visa priset och giltighetsdatumet. Den andra avgör om offerten får skickas. Upprepa övningen utan datum. Nu ska offerten ligga kvar som utkast. Kollegorna ska kunna säga vilken uppgift som saknas och vem som tar reda på den."
          ]
        ],
        "exercise": "Välj en AI-stödd uppgift. Be två medarbetare hantera tre fiktiva fall: normalt, oklart och misstänkt. Notera kvalitet, granskningstid och när de eskalerar."
      },
      "da": {
        "title": "AI virker. Ved medarbejderne også, hvornår de ikke skal stole på den?",
        "summary": "To prislister, én kunde og et overbevisende udkast. Brug denne korte øvelse til at træne, hvornår en kollega skal godkende, rette eller standse et AI-genereret tilbud.",
        "sections": [
          [
            "Det operationelle hul efter lanceringen",
            "Et salgsteam kan have en god assistent, men stadig kopiere svar til regneark, sende tilbud uden belæg eller omgå godkendelser, fordi mail er hurtigere. Antallet af licenser siger ikke meget om sikkert og effektivt arbejde. Se på, hvad der sker mellem modellens svar og forretningens beslutning."
          ],
          [
            "Planlæg overdragelsen med medarbejderne",
            "Lad salg, økonomi og IT aftale obligatoriske felter, priskilder, godkendelse af undtagelser og kvalitetskrav. Indbyg kontrollen i CRM-systemet. Begræns adgang efter rolle, og giv medarbejderne en klar måde at markere usikkerhed på."
          ],
          [
            "Træn beslutninger, ikke kun prompts",
            "Brug realistiske fiktive sager. Artikel 4 i EU's AI-forordning omhandler AI-færdigheder; undersøg de relevante pligter ud fra den aktuelle konsoliderede tekst, rolle og anvendelse. ISO/IEC 42001 og NIST AI RMF understøtter systematisk risikostyring. Øv eksempelvis:",
            [
              "Rutine: kontrollér kilden, og godkend et korrekt udkast.",
              "Undtagelse: opdag modstridende priser eller manglende data, og bed om gennemgang.",
              "Mistænkelig sag: stop en uventet instruktion i en mail, og rapportér den.",
              "Ændret politik: find en forældet kilde, og kontakt dokumentejeren."
            ]
          ],
          [
            "Mål adoption uden at belønne genveje",
            "Sammenlign godkendte resultater, rettelsestid, eskalationer og gentagne henvendelser med baselinen. Hurtige udkast hjælper ikke, hvis kontrolkøen vokser. Brug så vidt muligt aggregerede driftsmål, og fastlæg passende databeskyttelse, før I indsamler data om individuelle medarbejdere. Forbedr processen sammen med teamet."
          ],
          [
            "Prøv overdragelsen på en workshop",
            "Giv to kolleger en fiktiv henvendelse og to prislister. Den ene er udløbet. Bed den første kollega udarbejde et tilbud og pege på prisen og gyldighedsdatoen. Den anden afgør, om tilbuddet må sendes. Gentag øvelsen uden datoerne. Nu skal tilbuddet blive liggende som kladde. Kollegerne skal kunne sige, hvilken oplysning der mangler, og hvem der skaffer den."
          ]
        ],
        "exercise": "Vælg én AI-understøttet opgave. Bed to medarbejdere håndtere tre fiktive sager: normal, uklar og mistænkelig. Notér kvalitet, kontroltid og tidspunkt for eskalation."
      }
    },
    "sectionSources": [
      [],
      [],
      [
        0,
        1,
        2
      ],
      [],
      []
    ],
    "modified": "2026-11-26"
  }
];
