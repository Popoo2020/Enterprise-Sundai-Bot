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
        "summary": "Find the architecture choices that turn a useful AI pilot into an expensive operation. Reduce unnecessary inference without lowering quality or security.",
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
            "An uncontrolled agent may run up costs through accidental loops or deliberate abuse. OWASP identifies unbounded consumption as an LLM security risk. Set authenticated usage quotas, per-workflow spending limits, alerts and an application-level circuit breaker. Keep secrets and unnecessary personal data out of traces. A cheaper answer is not a saving if it leaks data or causes an unauthorised action."
          ],
          [
            "A controlled comparison",
            "Illustration, not a client result or provider price: two designs each complete 2,000 accepted cases per month at equivalent quality, review effort and security. If the first consumes €0.60 in model and tool charges per case and the second €0.18, the variable charge falls from €1,200 to €360: €840 a month before implementation and other costs. Confirm the comparison with actual invoices, failure rates and end-to-end traces. Do not cut protective controls just to reach a target."
          ],
          [
            "What SundAI does differently",
            "Rather than treating model selection as the entire project, SundAI proposes to map the workflow, instrument the costly steps, benchmark alternatives and agree quality, permissions and cost ceilings with your team. ISO/IEC 27001 and ISO/IEC 42001 inform the security and governance work; they are not promises of certification. Bring a redacted usage report to a free 20-minute call and we can identify a useful first investigation."
          ]
        ],
        "exercise": "Choose one costly workflow. Record calls, retries, model, authorised context size, accepted results and total charges for a representative sample. Agree the quality threshold before testing a revised design."
      },
      "he": {
        "title": "האם מערכת ה־AI מבזבזת את התקציב שהיא נועדה לחסוך?",
        "summary": "כך מזהים החלטות ארכיטקטוניות שמייקרות מערכות AI, ומצמצמים שימוש מיותר במודלים בלי להתפשר על איכות התוצרים או על אבטחת המידע.",
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
            "סוכן בלתי מבוקר עלול להיכנס ללולאה בגלל תקלה או בעקבות שימוש לרעה. OWASP מזהה צריכת משאבים בלתי מוגבלת כסיכון אבטחה במערכות LLM. קבעו מכסות לפי זהות ותהליך, מגבלות תקציב, התרעות ומנגנון עצירה. אל תכניסו סודות או מידע אישי מיותר ליומני הפעילות. תשובה זולה יותר אינה חיסכון אם היא גורמת לחשיפה או לפעולה ללא הרשאה."
          ],
          [
            "דוגמה להשוואה מבוקרת",
            "דוגמה להמחשה בלבד: שני תכנונים מטפלים ב־2,000 פניות מאושרות בחודש באותה איכות, באותו זמן בדיקה ובאותה רמת אבטחה. אם עלות המודלים והכלים בתכנון הראשון היא 0.60 אירו לפנייה ובשני 0.18 אירו, ההוצאה המשתנה יורדת מ־1,200 ל־360 אירו בחודש. ההפרש הוא 840 אירו לפני עלויות הפיתוח ושאר ההוצאות. יש לאמת אותו לפי חשבוניות, תקלות ותוצאות בפועל, ולא באמצעות ויתור על בקרות."
          ],
          [
            "כך SundAI ניגשת לבעיה",
            "במקום להסתפק בבחירת מודל, אנחנו מציעים למפות את התהליך, למדוד את השלבים היקרים, להשוות חלופות ולקבוע עם הצוות שלכם רף איכות, הרשאות ותקרת הוצאה. תקני ISO/IEC 27001 ו־42001 משמשים מסגרת לעבודה בתחום האבטחה וממשל ה־AI; אין בכך הבטחה להסמכה. הביאו לשיחת היכרות חינם בת 20 דקות דוח שימוש ללא פרטים מזהים, ונבחן היכן כדאי להתחיל."
          ]
        ],
        "exercise": "בחרו תהליך יקר אחד. תעדו קריאות למודלים, ניסיונות חוזרים, כמות ההקשר המותר, תוצרים שאושרו והעלות הכוללת במדגם מייצג. קבעו רף איכות לפני השוואת תכנונים."
      },
      "sv": {
        "title": "Äter AI upp budgeten som tekniken skulle spara?",
        "summary": "Granska de arkitekturval som driver upp AI-kostnaden och minska onödiga modellkörningar utan att tumma på kvalitet eller säkerhet.",
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
            "En agent kan fastna i loopar genom fel eller missbruk. OWASP beskriver obegränsad resursförbrukning som en säkerhetsrisk för språkmodeller. Sätt autentiserade kvoter, kostnadstak, larm och en stoppmekanism i applikationen. Logga inte nycklar eller onödiga personuppgifter. En billigare körning är ingen vinst om den röjer uppgifter."
          ],
          [
            "Jämför två lösningar under samma villkor",
            "Räkneexempel, inte ett kundresultat: båda lösningarna klarar 2 000 godkända ärenden per månad med samma kvalitet, granskningstid och säkerhet. Modell- och verktygskostnaden är 0,60 respektive 0,18 euro per ärende. Kostnaden sjunker från 1 200 till 360 euro, en skillnad på 840 euro före införande och andra kostnader. Kontrollera utfallet med fakturor och kördata."
          ],
          [
            "Så arbetar SundAI",
            "Vi föreslår att kartlägga arbetsflödet, mäta kostsamma steg, jämföra alternativ och avtala kvalitetskrav, behörigheter och budgettak med er. ISO/IEC 27001 och 42001 vägleder säkerhets- och styrningsarbetet; det är ingen garanti om certifiering. Ta med en avidentifierad användningsrapport till ett kostnadsfritt samtal på 20 minuter."
          ]
        ],
        "exercise": "Välj ett dyrt arbetsflöde. Mät anrop, omförsök, modell, mängd tillåten kontext, godkända resultat och kostnad. Bestäm kvalitetskravet innan ni testar en ändring."
      },
      "da": {
        "title": "Æder AI det budget, teknologien skulle spare?",
        "summary": "Find de arkitekturvalg, der driver AI-udgifterne op, og fjern unødvendige modelkald uden at gå på kompromis med kvalitet eller sikkerhed.",
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
            "En agent kan gå i ring ved fejl eller misbrug. OWASP beskriver ubegrænset ressourceforbrug som en sikkerhedsrisiko for sprogmodeller. Indfør autentificerede kvoter, udgiftslofter, alarmer og en stopmekanisme i applikationen. Hold nøgler og unødvendige personoplysninger ude af loggen. En billigere kørsel er ingen gevinst, hvis den lækker oplysninger."
          ],
          [
            "Sammenlign to løsninger på samme vilkår",
            "Regneeksempel, ikke et kunderesultat: begge løsninger afslutter 2.000 godkendte sager pr. måned med samme kvalitet, kontroltid og sikkerhed. Model- og værktøjsudgiften er henholdsvis 0,60 og 0,18 euro pr. sag. Udgiften falder fra 1.200 til 360 euro, en forskel på 840 euro før implementering og øvrige omkostninger. Kontrollér resultatet mod fakturaer og kørselsdata."
          ],
          [
            "Sådan arbejder SundAI",
            "Vi foreslår at kortlægge arbejdsgangen, måle de dyre trin, sammenligne alternativer og aftale kvalitetskrav, adgange og budgetloft med jer. ISO/IEC 27001 og 42001 danner ramme for sikkerheds- og governancearbejdet; det er ikke et løfte om certificering. Tag en afidentificeret forbrugsrapport med til en gratis samtale på 20 minutter."
          ]
        ],
        "exercise": "Vælg én dyr arbejdsgang. Registrer kald, gentagelser, model, mængde tilladt kontekst, godkendte resultater og omkostning. Fastlæg kvalitetskravet inden testen."
      }
    }
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
        "summary": "A business case based on hours saved can hide expensive subscriptions, review queues and new risks. Separate financial savings from additional capacity before scaling.",
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
            "The SundAI approach",
            "We propose an AI Value & Cost Baseline before implementation: one agreed outcome, a comparison of alternatives, a budget and a security boundary. We then measure the completed workflow with your staff and help you interpret the result. The objective is to decide whether to improve, expand or stop the investment — not to sell more tokens. Discuss a process with us in a free 20-minute call."
          ]
        ],
        "exercise": "Ask Finance and the process owner to identify the expenses that would actually disappear, the capacity that would instead be reused, and the point at which rising AI costs trigger a review."
      },
      "he": {
        "title": "לפני שמחליפים תקני כוח אדם ב־AI, בודקים אם הכסף באמת נחסך",
        "summary": "הבטחה לחסוך שעות עבודה עלולה להסתיר הוצאות רישוי, בדיקה אנושית ותשתיות. כך מפרידים בין התייעלות לבין חיסכון ממשי בתקציב.",
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
            "מה SundAI מציעה",
            "אנחנו מציעים לקבוע לפני הפיתוח מדדי בסיס לערך ולעלות: תוצאה עסקית רצויה, השוואת חלופות, תקציב וגבולות אבטחה. עם הצוות שלכם מודדים את התהליך השלם ובוחנים אם כדאי לשפר, להרחיב או לעצור את ההשקעה. המטרה אינה למכור עוד טוקנים, אלא לעזור לכם לקבל החלטה כלכלית טובה יותר. אפשר להתחיל בשיחה ללא עלות בת 20 דקות."
          ]
        ],
        "exercise": "בקשו ממנהל הכספים ומהאחראי לתהליך לציין אילו הוצאות ייעלמו בפועל, אילו שעות יופנו למשימות אחרות, ובאיזו עלות AI תידרש בחינה מחדש."
      },
      "sv": {
        "title": "Innan AI ersätter bemanning: visa att besparingen syns i budgeten",
        "summary": "Sparade timmar kan dölja licenser, granskningsköer och risker. Skilj frigjord kapacitet från faktiska kostnadsminskningar innan ni skalar upp.",
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
            "SundAI:s arbetssätt",
            "Vi föreslår en baslinje för värde och kostnad: ett verksamhetsmål, jämförda alternativ, budget och säkerhetsgränser. Tillsammans mäter vi hela arbetsflödet och bedömer om investeringen bör förbättras, utökas eller stoppas. Målet är inte att sälja fler tokens. Boka ett kostnadsfritt samtal på 20 minuter."
          ]
        ],
        "exercise": "Be ekonomi och processägaren ange vilka utgifter som verkligen försvinner, vilken tid som används till annat och när en ny kostnadsprövning ska göras."
      },
      "da": {
        "title": "Før AI erstatter bemanding: vis, at besparelsen når budgettet",
        "summary": "Frigjorte timer kan skjule licenser, kontrolarbejde og risici. Skeln mellem ekstra kapacitet og reelle besparelser, inden I skalerer.",
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
            "SundAIs tilgang",
            "Vi foreslår en baseline for værdi og omkostning: ét forretningsmål, sammenlignede alternativer, budget og sikkerhedsgrænser. Sammen måler vi hele arbejdsgangen og vurderer, om investeringen skal forbedres, udvides eller stoppes. Målet er ikke at sælge flere tokens. Book en gratis samtale på 20 minutter."
          ]
        ],
        "exercise": "Bed økonomi og procesejeren angive, hvilke udgifter der reelt forsvinder, hvilken tid der bruges på andre opgaver, og hvornår omkostningen skal revurderes."
      }
    }
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
      }
    ],
    "text": {
      "en": {
        "title": "Secure AI adoption: who decides when a system is ready to go live?",
        "summary": "Turn GRC into a practical release decision: define responsibilities, evidence, approval criteria and conditions for stopping an AI rollout.",
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
            "Where SundAI helps",
            "We propose one decision record that connects the evidence to a recommendation: proceed, proceed with conditions, redesign or pause. For implementation work, we can agree an acceptance test with your team and build the relevant controls into the workflow. Our approach draws on recognised standards without claiming that using them confers certification or guarantees legal compliance. Bring a concrete decision to a free introductory call."
          ]
        ],
        "exercise": "Choose one pending AI release. Write its purpose, owner, three acceptance tests, one hard stop and the person who can approve restart. Identify which evidence is still missing."
      },
      "he": {
        "title": "הטמעת AI מאובטחת: מי מחליט שהמערכת מוכנה לעלות לאוויר?",
        "summary": "הופכים ממשל, סיכונים וציות להחלטה מעשית: חלוקת אחריות, ראיות, תנאי אישור וקריטריונים לעצירת ההטמעה.",
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
            "איך SundAI מסייעת",
            "אנחנו מציעים לרכז את הראיות במסמך החלטה עם המלצה: להתקדם, להתקדם בתנאים, לתכנן מחדש או לעצור. במסגרת הטמעה ניתן להגדיר יחד מבחני קבלה ולשלב את הבקרות בתהליך עצמו. העבודה נשענת על תקנים מוכרים בלי לטעון שהם מקנים הסמכה או מבטיחים עמידה בחוק. הביאו החלטת AI אחת לשיחת היכרות ללא עלות."
          ]
        ],
        "exercise": "בחרו מערכת לפני עלייה לאוויר. הגדירו מטרה, אחראי, שלושה מבחני קבלה, תנאי עצירה ומי רשאי לאשר חזרה לפעילות. ציינו אילו ראיות עוד חסרות."
      },
      "sv": {
        "title": "Säker AI-implementering: vem avgör när systemet får tas i drift?",
        "summary": "Gör styrning, risk och regelefterlevnad till ett praktiskt driftsättningsbeslut med ansvar, bevis, acceptanskrav och stoppvillkor.",
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
            "Så kan SundAI hjälpa",
            "Vi föreslår ett beslutsunderlag som leder till en rekommendation: gå vidare, gå vidare med villkor, gör om eller avvakta. Vid införande kan vi avtala acceptanstest och bygga kontroller i själva arbetsflödet. Standarder vägleder arbetet men innebär ingen garanti för certifiering eller regelefterlevnad. Ta med ett konkret AI-beslut till ett kostnadsfritt samtal."
          ]
        ],
        "exercise": "Välj en planerad driftsättning. Ange syfte, ansvarig, tre acceptanstest, ett stoppvillkor och vem som får godkänna en omstart. Lista vilket underlag som saknas."
      },
      "da": {
        "title": "Sikker AI-implementering: hvem afgør, hvornår systemet må gå i drift?",
        "summary": "Gør governance, risiko og compliance til en praktisk beslutning om idriftsættelse med ansvar, dokumentation, acceptkrav og stopkriterier.",
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
            "Sådan kan SundAI hjælpe",
            "Vi foreslår et beslutningsgrundlag med en anbefaling: fortsæt, fortsæt med betingelser, omarbejd eller afvent. Ved implementering kan vi aftale accepttest og indbygge kontroller i arbejdsgangen. Standarder vejleder arbejdet, men er ingen garanti for certificering eller efterlevelse af lovgivningen. Tag en konkret AI-beslutning med til en gratis introduktionssamtale."
          ]
        ],
        "exercise": "Vælg en planlagt idriftsættelse. Notér formål, ansvarlig, tre accepttest, ét stopkriterium og hvem der må godkende genstart. Angiv, hvilken dokumentation der mangler."
      }
    }
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
        "summary": "Make secure AI adoption part of everyday work with role-specific training, clear handoffs and measurable acceptance criteria.",
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
            "What SundAI brings together",
            "Our proposed delivery combines implementation, access controls, process design and hands-on training. Rather than handing over a tool and leaving staff to adapt around it, we work with the responsible team to define the handoff, test edge cases and measure the results. The aim is secure AI adoption that fits how your business actually works. Discuss one handoff in a free 20-minute call."
          ]
        ],
        "exercise": "Choose one AI-supported task. Ask two colleagues to complete three fictional cases: routine, ambiguous and suspicious. Record completion quality, review time and when they escalate."
      },
      "he": {
        "title": "ה־AI עובד. האם העובדים יודעים גם מתי אסור להסתמך עליו?",
        "summary": "הטמעה מאובטחת של AI מתחילה בחיבור בין המערכת לעבודה היומיומית: הדרכה לפי תפקיד, העברת אחריות ברורה ומדידת איכות.",
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
            "החיבור ש־SundAI מציעה",
            "אנחנו מציעים לשלב פיתוח, בקרות גישה, תכנון תהליכים והדרכה מעשית. במקום למסור כלי ולהשאיר לעובדים את ההתמודדות עם השינוי, מגדירים יחד עם האחראים איך מעבירים טיפול, בודקים מקרי קצה ומודדים את התוצאה. כך אפשר להטמיע AI בצורה שמתאימה לאופן שבו העסק פועל באמת. אפשר להביא תהליך אחד לשיחת היכרות חינם בת 20 דקות."
          ]
        ],
        "exercise": "בחרו משימה שמשלבת AI. בקשו משני עובדים לטפל בשלושה מקרים פיקטיביים: רגיל, לא חד־משמעי וחשוד. תעדו איכות, זמן בדיקה ומתי הטיפול הועבר לגורם אנושי."
      },
      "sv": {
        "title": "AI fungerar. Vet medarbetarna också när de inte ska lita på den?",
        "summary": "Gör säker AI-användning till en del av vardagen med rollanpassad utbildning, tydliga överlämningar och mätbara kvalitetskrav.",
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
            "SundAI knyter ihop arbetet",
            "Vi föreslår ett införande som förenar utveckling, åtkomstkontroller, processdesign och praktisk utbildning. I stället för att bara lämna över ett verktyg definierar vi överlämningen, testar undantag och mäter utfallet med ansvariga. Diskutera ett arbetsflöde under ett kostnadsfritt samtal på 20 minuter."
          ]
        ],
        "exercise": "Välj en AI-stödd uppgift. Be två medarbetare hantera tre fiktiva fall: normalt, oklart och misstänkt. Notera kvalitet, granskningstid och när de eskalerar."
      },
      "da": {
        "title": "AI virker. Ved medarbejderne også, hvornår de ikke skal stole på den?",
        "summary": "Gør sikker AI-anvendelse til en del af hverdagen med rollebaseret oplæring, tydelig overdragelse og målbare kvalitetskrav.",
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
            "SundAI forbinder arbejdet",
            "Vi foreslår et forløb, der kombinerer udvikling, adgangskontrol, procesdesign og praktisk oplæring. I stedet for blot at aflevere et værktøj definerer vi overdragelsen, tester undtagelser og måler resultatet med de ansvarlige. Tal med os om én arbejdsgang i en gratis samtale på 20 minutter."
          ]
        ],
        "exercise": "Vælg én AI-understøttet opgave. Bed to medarbejdere håndtere tre fiktive sager: normal, uklar og mistænkelig. Notér kvalitet, kontroltid og tidspunkt for eskalation."
      }
    }
  }
];
