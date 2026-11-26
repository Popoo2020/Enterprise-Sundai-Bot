export const guidesWork = [
  {
    slug: 'email-to-crm-without-duplicate-cases',
    category: 'work', related: 'services/secure-ai-automation/',
    sources: [
      {name: 'HubSpot · Deduplicate records', url: 'https://knowledge.hubspot.com/records/deduplication-of-records'},
      {name: 'IETF · RFC 5322, §3.6.4', url: 'https://www.rfc-editor.org/rfc/rfc5322.html#section-3.6.4'}
    ],
    text: {
      en: {
        title: 'How to move enquiries from email to your CRM without duplicate cases',
        summary: 'Give each enquiry one case and one owner. A customer who emails twice may need one reply or two separate jobs. Here is how to tell the difference.',
        sections: [
          ['Start with what the customer asked for', 'A consultancy receives a quote request on Monday. On Tuesday the buyer adds a floor plan. On Wednesday the same buyer asks about a different building. The team needs one contact and two cases. Map what the receptionist uses to tell them apart. A job reference, site address and open case number are good starting points. Write down which information the next colleague actually needs to start work.'],
          ['Define when to create, update or ask', 'Identify an already processed message before creating a record. A message identifier can help recognise a repeat delivery. A reply linked to a known case can append a note. A new request from an existing contact can open a separate case. HubSpot uses email to identify contacts in common creation flows. The sender’s address alone cannot tell your team which job a message concerns. If two cases match, ask a colleague to choose.'],
          ['Hand the work to a named person', 'Make the next action visible in the CRM. For a quote request, record who prepares it and when the customer expects an answer. Send ambiguous requests to a queue owned by a named team member. During the pilot, keep customer replies in draft and compare incoming requests with assigned cases at the end of each day.']
        ],
        exercise: 'Send a sample enquiry twice, then add a reply and a second job from the same address. Ask a colleague to find both jobs, their owners and the original correspondence without opening the shared inbox.'
      },
      he: {
        title: 'איך מעבירים פניות מהמייל ל־CRM בלי לפתוח פנייה כפולה?',
        summary: 'לקוח שכותב פעמיים יכול להוסיף פרט לבקשה קיימת או לבקש עבודה חדשה. כך בונים תהליך ששומר על ההבחנה ומבהיר מי מטפל בכל פנייה.',
        sections: [
          ['מתחילים בבקשה של הלקוח', 'ביום ראשון משרד תכנון מקבל בקשה להצעת מחיר. למחרת הלקוחה שולחת תוכנית קומה. ביום שלישי היא מבקשת הצעה לבניין אחר. במערכת דרושים איש קשר אחד ושני תיקים. שבו עם מי שקורא את הדואר ושאלו איך הוא מזהה את התיק הנכון. כתובת הפרויקט, מספר הפנייה או שם האתר יכולים לעזור. בדקו מה דרוש לעובדת הבאה כדי שתוכל להתחיל לטפל בבקשה.'],
          ['מחליטים מתי לפתוח תיק ומתי להוסיף הערה', 'לפני יצירת רשומה, בדקו אם המערכת כבר טיפלה באותה הודעה. מזהה ההודעה יכול לעזור לזהות מסירה חוזרת. תשובה עם מספר תיק מוסיפה הערה לתיק קיים, ובקשה חדשה מאותו איש קשר יכולה לפתוח תיק נוסף. לדוגמה, HubSpot משתמשת בכתובת המייל לזיהוי אנשי קשר בתהליכי יצירה נפוצים. אותה כתובת יכולה לייצג כמה פרויקטים. כשיש שתי התאמות, העבירו את הבחירה לאדם.'],
          ['נותנים שם לצעד הבא', 'לכל תיק קובעים מי מכין את ההצעה ומתי הובטח ללקוחה עדכון. לפניות שחסר בהן פרט ממנים עובד שיבדוק את תור הבירורים במהלך היום. בתקופת הניסיון שומרים תשובות ללקוחות כטיוטות. בסוף היום משווים בין הדואר שנכנס לתיקים ששויכו ובודקים אם נשארה פנייה שאיש עדיין לא קיבל לטיפול.']
        ],
        exercise: 'שלחו אותה הודעת בדיקה פעמיים, הוסיפו תשובה בשרשור ואז שלחו בקשה לפרויקט אחר מאותה כתובת. בקשו מעמית למצוא במערכת שני תיקים, אחראי לכל אחד ואת ההתכתבות הרלוונטית.'
      },
      sv: {
        title: 'Från mejl till CRM utan dubbla ärenden',
        summary: 'Två mejl från samma kund kan gälla ett tillägg till en offert eller två olika uppdrag. Så hjälper du den som tar emot mejlet att välja rätt ärende och ansvarig.',
        sections: [
          ['Följ kundens fråga genom inkorgen', 'En konsultbyrå får en offertförfrågan på måndagen. På tisdagen kompletterar kunden med en ritning. På onsdagen vill samma person ha en offert för en annan fastighet. Det behövs en kontakt och två ärenden. Sätt dig med den som läser mejlen och fråga vilka uppgifter som avgör var ritningen hör hemma. Det kan vara fastighetens adress, ett projektnummer eller ett befintligt ärendenummer.'],
          ['Bestäm när ett ärende ska öppnas eller uppdateras', 'Kontrollera om ett mejl redan har behandlats innan ett nytt ärende skapas. Meddelandets identifierare kan hjälpa till att fånga en upprepad leverans. Ett svar med ett känt ärendenummer kan läggas till som en anteckning. HubSpot använder mejladressen för att känna igen kontakter i vanliga registreringsflöden. Adressen säger däremot inget om vilken fastighet kunden menar. Låt en kollega välja om två ärenden passar.'],
          ['Ge nästa steg en ägare', 'Registrera vem som ska räkna på offerten och när kunden väntar sig ett svar. Utse en person som tar hand om kön med oklara förfrågningar. Låt kundsvar ligga som utkast under försöket och stäm av dagens inkomna mejl mot de tilldelade ärendena. Då syns även en förfrågan som kom in men aldrig fick någon ansvarig.']
        ],
        exercise: 'Skicka ett testmejl två gånger, besvara det och be sedan om en separat offert från samma adress. Be en kollega hitta båda ärendena, de ansvariga och rätt korrespondens utan att öppna inkorgen.'
      },
      da: {
        title: 'Fra mail til CRM uden dobbelte kundesager',
        summary: 'To mails fra samme kunde kan være et bilag til et tilbud eller to forskellige opgaver. Sådan får hver henvendelse den rigtige sag og en person, der følger op.',
        sections: [
          ['Følg kundens spørgsmål fra indbakken', 'Et rådgivningsfirma modtager en forespørgsel på et tilbud mandag. Tirsdag eftersender kunden en plantegning. Onsdag beder samme person om et tilbud på en anden ejendom. Det giver én kontakt og to sager. Sæt dig med kollegaen, der læser mailen, og spørg, hvad der afgør, hvilken sag tegningen tilhører. Det kan være ejendommens adresse, et projektnummer eller nummeret på en åben sag.'],
          ['Aftal hvornår I opretter eller opdaterer', 'Undersøg, om en besked allerede er behandlet, før der oprettes en sag. Beskedens identifikator kan hjælpe med at genkende gentagne leveringer. Et svar med kendt sagsnummer kan føjes til sagen som en note. HubSpot bruger mailadressen til at genkende kontakter i almindelige oprettelsesforløb. Kundens adresse fortæller i sig selv intet om, hvilken ejendom tilbuddet gælder. Lad en kollega vælge, hvis to sager passer.'],
          ['Gør det synligt, hvem der tager over', 'Skriv, hvem der udarbejder tilbuddet, og hvornår kunden forventer at høre fra jer. Udpeg én person til at tømme køen med uklare henvendelser. Lad kundesvar ligge som kladder under piloten. Sammenhold dagens indgående mails med de sager, der har fået en ansvarlig, så teamet også bemærker den forespørgsel, som ingen har taget.']
        ],
        exercise: 'Send en testmail to gange, besvar den og send derefter en ny opgave fra samme adresse. Bed en kollega finde de to sager, deres ansvarlige og den tilhørende mail uden at åbne fællespostkassen.'
      }
    }
  },
  {
    slug: 'calculate-automation-roi-staff-time', modified: '2026-11-26',
    category: 'work', related: 'services/secure-ai-automation/',
    sources: [
      {name: 'Microsoft Learn · Savings in Power Automate', url: 'https://learn.microsoft.com/en-us/power-automate/savings'},
      {name: 'FinOps Foundation · Unit Economics', url: 'https://www.finops.org/framework/capabilities/unit-economics/'}
    ],
    text: {
      en: {
        title: 'How to calculate the return on a workflow automation pilot',
        summary: 'Measure staff minutes per completed case, include the time spent fixing errors and put the setup cost on a separate line. Then decide what the recovered hours are worth to your team.',
        sections: [
          ['Time the work that occupies a person', 'Pick one kind of case and define what finished means, for example a quote request assigned to the right adviser with all required fields. Record hands-on minutes per completed case for a representative week. Separate those minutes from the wait for a customer to reply. Repeat the measurement during the pilot with a similar mix of simple cases and exceptions. Include review and correction time.'],
          ['Work through a small example', 'Suppose a team completes 300 comparable cases each month. If average handling time falls from eight minutes to five, it releases 900 minutes, or 15 hours. At an assumed fully loaded labour cost of €30 an hour, that time is worth €450. Subtract €120 a month for tools and maintenance to obtain €330 of monthly capacity value. These are illustrative inputs you can replace with your own.'],
          ['Decide whether the benefit can be realised', 'At €330 of usable capacity per month, it takes three months to earn back the €990 setup cost in capacity value. Cash payback depends on an actual increase in income or reduction in spending. Over twelve months the illustrative return on capacity is about 122%, calculated as (€5,400 − €2,430) ÷ €2,430. A shorter queue or extra billable work may make the released time useful. A lower payroll bill requires an actual change in spending.']
        ],
        exercise: 'Run the calculation again at half the expected volume while keeping monthly tool costs fixed. Ask the process owner what the team would do with those hours and check whether more errors or reopened cases would change the decision.'
      },
      he: {
        title: 'איך מחשבים החזר השקעה באוטומציה של תהליך עסקי?',
        summary: 'מודדים דקות עבודה לכל פנייה שהטיפול בה הושלם, כוללים בדיקה ותיקונים ומפרידים בין עלויות הקמה לעלויות שוטפות. כך אפשר להעריך מה באמת ישתלם לעסק.',
        sections: [
          ['מודדים את הזמן של הצוות', 'בחרו פניות מסוג אחד והגדירו מה נחשב לסיום. למשל, בקשה להצעת מחיר הועברה ליועצת הנכונה וכל השדות הדרושים מולאו. במשך שבוע מייצג מדדו כמה דקות עובד משקיע בכל פנייה שהושלמה. רשמו בנפרד את זמן ההמתנה ללקוח. חזרו על המדידה בפיילוט עם תמהיל דומה של פניות רגילות וחריגות, וספרו גם את הזמן שהושקע בבדיקת טעויות ובתיקונן.'],
          ['מחשבים את ערך השעות שהתפנו', 'בדוגמה להמחשה, צוות מסיים 300 פניות דומות בחודש. ירידה משמונה לחמש דקות לפנייה מפנה 900 דקות, כלומר 15 שעות. אם עלות שעת עבודה מלאה היא 30 אירו, השעות שהתפנו שוות 450 אירו. אחרי ניכוי 120 אירו בחודש על כלים ותחזוקה, הערך החודשי הצפוי הוא 330 אירו. החליפו את כל ההנחות במספרים מהעסק שלכם.'],
          ['בודקים מה יעשה העסק בזמן שהתפנה', 'אם הצוות מנצל את הזמן שהתפנה בשווי 330 אירו בחודש, ערכו המצטבר מכסה את עלות ההקמה של 990 אירו אחרי שלושה חודשים. החזר במזומן תלוי בתוספת הכנסה או בירידה ממשית בהוצאות. בשנה מתקבל ערך של 5,400 אירו מול עלות של 2,430 אירו. ההפרש חלקי העלות נותן תשואה של כ־122%. ייתכן שהערך יתבטא בקיצור תורים או ביכולת לקבל עוד עבודה. חיסכון כספי בפועל מחייב ירידה בהוצאה.']
        ],
        exercise: 'חשבו שוב בהנחה שכמות הפניות תרד לחצי ועלות הכלים תישאר קבועה. בקשו מהאחראי לציין מה יעשה הצוות בשעות שהתפנו וכמה פניות שנפתחו מחדש עלולות לשנות את ההחלטה.'
      },
      sv: {
        title: 'Så räknar du på avkastningen från automatisering av ett arbetsflöde',
        summary: 'Mät arbetstid per avslutat ärende, räkna med granskning och rättelser och skilj startkostnaden från de löpande utgifterna. Då går det att bedöma vad tiden faktiskt är värd.',
        sections: [
          ['Mät den tid någon arbetar aktivt', 'Välj en ärendetyp och bestäm vad färdig betyder. En offertförfrågan kan till exempel räknas som klar när rätt rådgivare har fått den med alla uppgifter ifyllda. Mät aktiva arbetsminuter per avslutat ärende under en representativ vecka. Bokför väntan på kundens svar separat. Upprepa mätningen under piloten med en jämförbar blandning av lätta ärenden och undantag. Ta med tid för kontroll och rättelser.'],
          ['Räkna på ett exempel', 'Anta att teamet avslutar 300 jämförbara ärenden i månaden. Om handläggningen går från åtta till fem minuter i snitt frigörs 900 minuter, alltså 15 timmar. Vid en antagen total arbetskostnad på 30 euro i timmen är tiden värd 450 euro. Efter 120 euro för månadens verktyg och underhåll återstår ett kapacitetsvärde på 330 euro. Byt ut exemplets antaganden mot era egna siffror.'],
          ['Bestäm vad ni ska använda tiden till', 'Om teamet använder den frigjorda tiden till ett värde av 330 euro i månaden täcker kapacitetsvärdet startkostnaden på 990 euro efter tre månader. För att investeringen ska betala sig i pengar behöver intäkterna öka eller utgifterna minska. På tolv månader blir avkastningen cirka 122 procent. Ta skillnaden mellan nyttan på 5 400 euro och kostnaden på 2 430 euro och dela den med kostnaden. Tiden kan ge kortare köer eller mer fakturerbart arbete. För en besparing i kassan behöver en utgift faktiskt minska.']
        ],
        exercise: 'Gör om kalkylen med halva ärendevolymen och samma månadskostnad för verktygen. Be den ansvariga beskriva vad teamet skulle göra med tiden och hur återöppnade ärenden skulle påverka beslutet.'
      },
      da: {
        title: 'Sådan beregner du afkastet af at automatisere en arbejdsgang',
        summary: 'Mål arbejdstid pr. afsluttet sag, medregn kontrol og rettelser, og hold opstart adskilt fra drift. Så kan du vurdere, hvilken værdi den frigjorte tid har.',
        sections: [
          ['Mål de minutter, hvor en medarbejder arbejder', 'Vælg én sagstype, og aftal, hvornår den er færdig. En tilbudsforespørgsel kan tælle som færdig, når den rette rådgiver har modtaget den med alle oplysninger. Mål den aktive arbejdstid pr. afsluttet sag i en repræsentativ uge. Registrer ventetid på kunden særskilt. Gentag målingen under piloten med en tilsvarende fordeling af enkle sager og undtagelser. Medregn også medarbejderens kontrol og rettelser.'],
          ['Sæt tal på den frigjorte tid', 'Forestil dig et team, der afslutter 300 sammenlignelige sager om måneden. Falder den gennemsnitlige behandlingstid fra otte til fem minutter, frigør det 900 minutter eller 15 timer. Med en antaget samlet lønomkostning på 30 euro i timen er tiden 450 euro værd. Træk 120 euro om måneden til værktøjer og vedligeholdelse fra. Tilbage er en månedlig kapacitetsgevinst på 330 euro. Erstat eksemplets tal med jeres egne.'],
          ['Afgør, hvor gevinsten skal hentes', 'Bruger teamet den frigjorte tid til en værdi af 330 euro om måneden, dækker værdien af kapaciteten opstarten på 990 euro efter tre måneder. En tilbagebetaling i kroner og øre kræver højere indtægter eller lavere udgifter. På et år er afkastet cirka 122 procent. Træk omkostningerne på 2.430 euro fra gevinsten på 5.400 euro, og divider forskellen med omkostningerne. Timerne kan bruges til at afkorte køen eller tage flere fakturerbare opgaver. En kontant besparelse forudsætter, at en udgift falder.']
        ],
        exercise: 'Gentag beregningen med den halve sagsmængde og samme faste udgift til værktøjer. Bed den ansvarlige forklare, hvad teamet skal bruge timerne til, og hvor mange genåbnede sager der vil ændre vurderingen.'
      }
    }
  },
  {
    slug: 'ai-token-budget-per-resolved-case',
    category: 'work', related: 'services/secure-ai-automation/',
    sources: [
      {name: 'OpenAI · API pricing', url: 'https://developers.openai.com/api/docs/pricing'},
      {name: 'FinOps Foundation · Unit Economics', url: 'https://www.finops.org/framework/capabilities/unit-economics/'}
    ],
    text: {
      en: {
        title: 'How to budget AI tokens per resolved customer case',
        summary: 'Tokens measure model use. A case budget also captures retries, paid tools and the time someone spends checking the answer. Compare workflows on the same unit of finished work.',
        sections: [
          ['Follow a single case from start to finish', 'Imagine a support assistant that classifies a message, looks up a policy and drafts a reply. Those steps can trigger several model calls before a customer receives an answer. Give the case an internal reference and add up all its calls, including retries. Record usage counts and tool charges against that reference. You can build a cost report without copying customer messages into the reporting spreadsheet.'],
          ['Calculate the cost of the work you delivered', 'For a simple weekly illustration, suppose 80 cases close and the model and tool charges for handling those cases total €12. The technical cost is €0.15 per closure. If review totals four hours at an assumed €30 an hour, the combined cost is €132, or €1.65 per closure before infrastructure and other overheads. Keep carry-over cases in a separate group until you know their final cost.'],
          ['Check what happens when you shorten the input', 'Use the current rates for your chosen model and distinguish input, cached input and output where the provider prices them separately. Try passing only the relevant policy section. Compare the resulting answers on the same sample, including unusual requests. A lower token bill loses its value if staff must spend longer correcting an answer or the customer has to ask again.']
        ],
        exercise: 'Choose ten resolved cases with no identifying details in the report. For each one, record calls, tool cost, review time and whether it reopened. Compare the most expensive case with a typical one before changing models.'
      },
      he: {
        title: 'איך בונים תקציב טוקנים ל־AI לפי עלות פנייה שטופלה?',
        summary: 'טוקנים מודדים שימוש במודל. תקציב לפנייה כולל גם ניסיונות חוזרים, כלים בתשלום והזמן שעובד משקיע בבדיקת התשובה. כך משווים שתי דרכי טיפול באותה בקשת לקוח.',
        sections: [
          ['עוקבים אחרי פנייה אחת עד הסיום', 'נניח שעוזר שירות ממיין הודעה, מאתר סעיף במדיניות החברה ומנסח תשובה. שלושת השלבים עשויים לכלול כמה קריאות למודל עד שהלקוח מקבל מענה. תנו לפנייה מזהה פנימי ורכזו תחתיו את כל הקריאות, לרבות ניסיונות חוזרים וחיובים על כלים חיצוניים. לצורך דוח עלויות מספיקים מזהה, מונים ועלויות. אפשר להשאיר את תוכן ההתכתבות עם הלקוח במערכת שבה היא מנוהלת.'],
          ['מחשבים כמה עולה פנייה שהטיפול בה הסתיים', 'בדוגמה שבועית, הצוות סגר 80 פניות. אם חיובי המודל והכלים בגין הטיפול בפניות האלה הסתכמו ב־12 אירו, העלות הטכנית היא 0.15 אירו לפנייה. ארבע שעות בקרה בעלות משוערת של 30 אירו לשעה מוסיפות 120 אירו. הסכום יחד הוא 132 אירו, או 1.65 אירו לפנייה, לפני תשתית ותקורה נוספת. עקבו בנפרד אחרי פניות פתוחות עד שאפשר לחשב את עלותן המלאה.'],
          ['בודקים אם קיצור הקלט באמת משתלם', 'השתמשו בתעריף העדכני של המודל שבחרתם. אם הספק מתמחר בנפרד קלט, קלט שנשמר במטמון ופלט, חשבו כל רכיב בהתאם. נסו להעביר לעוזר רק את הסעיף הרלוונטי במדיניות. השוו את התשובות על אותה קבוצת פניות וכללו גם מקרה חריג. אם העובד צריך להשלים פרטים או שהלקוח חוזר שוב, גם הדקות הנוספות נכנסות לחשבון.']
        ],
        exercise: 'בחרו עשר פניות סגורות. רשמו בדוח נטול פרטים מזהים את מספר הקריאות, עלות הכלים, דקות הבקרה והאם הפנייה נפתחה מחדש. השוו את המקרה היקר ביותר למקרה טיפוסי לפני שמחליפים מודל.'
      },
      sv: {
        title: 'Så sätter du en tokenbudget för AI per avslutat kundärende',
        summary: 'Token mäter modellens användning. En ärendebudget fångar även nya försök, betalda verktyg och tiden som går åt till att granska svaret. Jämför två arbetssätt på samma avslutade uppgift.',
        sections: [
          ['Följ ett ärende hela vägen', 'Anta att en supportassistent sorterar ett mejl, hämtar ett stycke ur en policy och skriver ett svarsförslag. Det kan kräva flera anrop till modellen innan kunden får ett svar. Ge ärendet en intern referens och summera alla anrop, även om något måste köras om. Samla användningsmått och verktygsavgifter under samma referens. Kundens meddelande kan ligga kvar i ärendesystemet när kostnaderna sammanställs.'],
          ['Räkna på de ärenden som faktiskt är avslutade', 'Anta att 80 ärenden avslutas under en vecka och att modell och verktyg för just dessa ärenden kostar 12 euro. Den tekniska kostnaden blir 0,15 euro per ärende. Om granskningen tar fyra timmar till en antagen kostnad på 30 euro i timmen blir summan 132 euro, eller 1,65 euro per avslut före infrastruktur och andra omkostnader. Följ öppna ärenden i en separat grupp tills den slutliga kostnaden är känd.'],
          ['Undersök effekten av ett kortare underlag', 'Utgå från aktuella priser för vald modell och skilj på indata, cachade indata och utdata om leverantören tar olika betalt. Pröva att skicka med enbart det relevanta policyavsnittet. Jämför svaren för samma urval av frågor, även en ovanlig begäran. Räkna med extra granskning och ärenden som öppnas igen om svaren blir för knapphändiga.']
        ],
        exercise: 'Välj tio avslutade ärenden och håll rapporten fri från identifierande uppgifter. Anteckna antal anrop, verktygskostnad, granskningstid och om ärendet öppnades igen. Jämför det dyraste ärendet med ett typiskt innan du byter modell.'
      },
      da: {
        title: 'Sådan lægger du et AI-tokenbudget pr. afsluttet kundesag',
        summary: 'Tokens måler brugen af modellen. Et sagsbudget tæller også nye forsøg, betalte værktøjer og den tid, en medarbejder bruger på at gennemgå svaret. Sammenlign to arbejdsgange på samme afsluttede opgave.',
        sections: [
          ['Følg en sag hele vejen', 'Forestil dig en supportassistent, der sorterer en mail, finder en passage i en politik og skriver et svarudkast. Det kan kræve flere modelkald, før kunden får svar. Giv sagen en intern reference, og saml alle kald på den, også når et forsøg skal gentages. Knyt forbrugstal og værktøjsgebyrer til referencen. Kundens besked kan blive i sagsbehandlingssystemet, når I samler omkostningerne i et regneark.'],
          ['Beregn prisen på en afsluttet sag', 'Antag i et regneeksempel, at 80 sager afsluttes på en uge, og at model og værktøjer til netop de sager koster 12 euro i alt. Den tekniske omkostning bliver 0,15 euro pr. sag. Tager kontrollen fire timer til en antaget timeomkostning på 30 euro, er summen 132 euro eller 1,65 euro pr. afsluttet sag før infrastruktur og øvrige fællesomkostninger. Følg åbne sager særskilt, indtil I kender deres samlede pris.'],
          ['Afprøv, om kortere input giver en reel gevinst', 'Brug den aktuelle pris for den valgte model. Skeln mellem input, cachelagret input og output, hvis leverandørens takster er forskellige. Prøv kun at sende det relevante afsnit af politikken med. Sammenlign svarene på de samme spørgsmål, også en usædvanlig forespørgsel. Medregn ekstra rettelser og genåbnede sager, hvis det kortere grundlag gør svarene mindre brugbare.']
        ],
        exercise: 'Vælg ti afsluttede sager uden identificerende oplysninger i rapporten. Registrer kald, værktøjsudgifter, kontroltid og eventuel genåbning. Sammenlign den dyreste sag med en typisk sag, før I beslutter at skifte model.'
      }
    }
  },
  {
    slug: 'choose-first-automation-small-business',
    category: 'work', related: 'services/secure-ai-automation/',
    sources: [
      {name: 'UiPath Automation Hub · Customize Assessments', url: 'https://docs.uipath.com/automation-hub/automation-cloud/latest/user-guide/new-customize-assessments'},
      {name: 'Microsoft Learn · Recommendations for implementing automation', url: 'https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/automate-tasks'}
    ],
    text: {
      en: {
        title: 'Which workflow should a small business automate first?',
        summary: 'For a business with 10–100 employees, look for a recurring task with a clear owner, a finish line you can check and a way to recover from a mistake. Start with one handoff.',
        sections: [
          ['Compare three real tasks on one sheet', 'Ask the people doing the work to nominate a repetitive task from last week. A consultancy might shortlist filing a signed brief, routing a quote request and approving a supplier payment. For each, write down the weekly volume, active minutes, information needed and consequence of getting it wrong. Ask who would notice a mistake and whether they could put it right before a customer or supplier was affected.'],
          ['Draw the boundary around one step', 'Suppose quote requests often sit in a shared inbox until someone recognises the client. A pilot could create a draft case and suggest an adviser. The receptionist confirms the owner. A missing project reference goes back to the intake queue. Prices, promises and customer messages stay with the adviser. If a simple rule already routes requests correctly, use it. Reserve AI for steps such as interpreting a free-text description.'],
          ['Plan the decision before connecting live systems', 'Try the workflow on sample requests with known outcomes. Include a duplicate, an urgent enquiry and a message about two projects. Record correct assignments and minutes of staff review, then agree which mistakes would stop a live trial. Name someone who can switch back to the manual process and check what happens to requests already waiting when they do.']
        ],
        exercise: 'Ask two colleagues to route the same five example enquiries independently. Where they disagree, write down the missing rule or information. Resolve that disagreement before asking software to make the choice.'
      },
      he: {
        title: 'באיזה תהליך כדאי להתחיל כשמכניסים אוטומציה לעסק קטן?',
        summary: 'בעסק של 10–100 עובדים חפשו משימה חוזרת שיש לה אחראי, תוצאה ברורה ודרך לתקן טעות. התחלה טובה היא שלב אחד שבו העבודה עוברת מאדם לאדם.',
        sections: [
          ['משווים שלוש משימות משבוע העבודה האחרון', 'בקשו מהעובדים להציע פעולה שחזרה על עצמה בשבוע שעבר. במשרד ייעוץ אפשר להשוות בין תיוק מסמך חתום, שיוך בקשה להצעת מחיר ואישור תשלום לספק. לכל פעולה רשמו כמה פעמים היא מתרחשת, כמה דקות עבודה היא דורשת ואיזה מידע חסר לעיתים קרובות. שאלו מי יבחין בטעות והאם אפשר יהיה לתקן אותה לפני שלקוח או ספק יושפעו ממנה.'],
          ['מצמצמים את הפיילוט לצעד אחד', 'נניח שבקשות להצעת מחיר ממתינות בתיבה המשותפת עד שמישהו מזהה את הלקוח. אפשר לפתוח תיק בטיוטה ולהציע יועץ מתאים. רכזת המשרד מאשרת את השיוך. אם חסר מספר פרויקט, הבקשה עוברת לתור בירור. ההחלטה על המחיר, ההתחייבות למועד והתשובה ללקוח נשארות בידי היועץ. כשכלל פשוט נותן את השיוך הדרוש, השתמשו בו. אפשר לשלב AI בפענוח התיאור החופשי שכתב הלקוח.'],
          ['קובעים מראש מתי להמשיך ומתי לעצור', 'נסו את המסלול על פניות לדוגמה שכבר ידוע מי אמור לטפל בהן. כללו כפילות, בקשה דחופה ומייל שמזכיר שני פרויקטים. רשמו כמה פניות שויכו נכון וכמה דקות נמשכה הבדיקה האנושית. הסכימו איזו טעות תעצור את הניסוי, מי מוסמך להחזיר את הצוות לעבודה ידנית ומי יטפל בפניות שכבר ממתינות באותו רגע.']
        ],
        exercise: 'תנו לשני עובדים את אותן חמש פניות ובקשו מהם לשייך אותן בנפרד. בכל מקום שבו הבחירות שונות, בררו איזה כלל או פרט מידע חסר. פתרו את המחלוקת לפני שתבקשו מהמערכת לבחור במקומם.'
      },
      sv: {
        title: 'Vilket arbetsflöde ska ett mindre företag automatisera först?',
        summary: 'För ett företag med 10–100 anställda passar det att börja med en återkommande uppgift som har en ansvarig, ett tydligt slut och en möjlighet att rätta fel. Välj en enda överlämning.',
        sections: [
          ['Jämför tre uppgifter från förra veckan', 'Be dem som utför arbetet om exempel på sådant de gör om och om igen. På en konsultbyrå kan det vara att arkivera signerade underlag, fördela offertförfrågningar eller godkänna en leverantörsbetalning. Anteckna hur ofta varje uppgift utförs, hur många aktiva minuter den tar och vilka uppgifter som behövs. Fråga vem som skulle upptäcka ett misstag och om det går att rätta innan en kund eller leverantör påverkas.'],
          ['Avgränsa försöket till ett steg', 'Anta att offertförfrågningar fastnar i den gemensamma inkorgen tills någon känner igen kunden. Piloten kan skapa ett ärendeutkast och föreslå en rådgivare. Receptionisten bekräftar valet. Om en projektreferens saknas går ärendet till en särskild kö. Rådgivaren ansvarar för pris, löften och svar till kunden. Använd en enkel regel när den räcker för fördelningen. AI kan hjälpa till att tolka kundens fritext.'],
          ['Bestäm vad som krävs för att gå vidare', 'Prova med exempelärenden där rätt mottagare redan är känd. Ta med en dubblett, en brådskande förfrågan och ett mejl om två projekt. Anteckna rätt tilldelningar och granskningstid, och enas om vilka fel som skulle stoppa ett skarpt försök. Utse någon som får återgå till den manuella rutinen och bestäm vem som då tar hand om väntande ärenden.']
        ],
        exercise: 'Låt två kollegor fördela samma fem förfrågningar var för sig. När de väljer olika mottagare, ta reda på vilken regel eller uppgift de saknar. Lös den frågan innan systemet ska göra valet åt dem.'
      },
      da: {
        title: 'Hvilken arbejdsgang skal en mindre virksomhed automatisere først?',
        summary: 'I en virksomhed med 10–100 ansatte er en god første opgave tilbagevendende, har en ansvarlig og et resultat, I kan kontrollere. Vælg en enkelt overdragelse, hvor fejl kan rettes.',
        sections: [
          ['Sammenlign tre opgaver fra sidste uge', 'Spørg medarbejderne, hvad de gjorde flere gange i løbet af sidste uge. I et rådgivningsfirma kan det være arkivering af en underskrevet aftale, fordeling af tilbudsforespørgsler eller godkendelse af en leverandørbetaling. Notér hyppighed, aktive arbejdsminutter og nødvendige oplysninger for hver opgave. Spørg, hvem der vil opdage en fejl, og om den kan rettes, før den får betydning for en kunde eller leverandør.'],
          ['Afgræns forsøget til ét trin', 'Antag, at tilbudsforespørgsler venter i fællespostkassen, til nogen genkender kunden. Piloten kan oprette et sagsudkast og foreslå en rådgiver. Receptionisten bekræfter valget. Mangler der et projektnummer, kommer sagen i en afklaringskø. Rådgiveren fastlægger pris, indgår aftaler og svarer kunden. Brug en almindelig regel, når den er tilstrækkelig til at fordele sagerne. AI kan hjælpe med at tolke kundens fritekst.'],
          ['Aftal på forhånd, hvornår forsøget skal fortsætte', 'Afprøv arbejdsgangen på eksempler med kendt modtager. Tag en dublet, en hasteopgave og en mail om to projekter med. Registrer korrekte tildelinger og minutter brugt på gennemgang. Aftal, hvilke fejl der skal stoppe en afprøvning i drift. Udpeg en person, som kan skifte tilbage til manuel behandling, og aftal, hvem der tager sig af de henvendelser, der allerede venter.']
        ],
        exercise: 'Lad to kolleger fordele de samme fem henvendelser hver for sig. Når de vælger forskelligt, så find den regel eller oplysning, de mangler. Afklar det, før I beder systemet om at træffe valget.'
      }
    }
  }
];
