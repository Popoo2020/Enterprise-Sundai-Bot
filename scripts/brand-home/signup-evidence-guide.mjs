export const signupEvidenceGuide = {
  slug: 'diagnose-signup-dropoff',
  category: 'work',
  related: 'services/secure-ai-automation/',
  published: '2026-11-20',
  sources: [
    {name: 'PostHog · Funnels', url: 'https://posthog.com/docs/product-analytics/funnels'},
    {name: 'Google Analytics · Funnel exploration', url: 'https://support.google.com/analytics/answer/9327974'},
    {name: 'Microsoft Playwright · Best practices', url: 'https://playwright.dev/docs/best-practices'},
    {name: 'Microsoft · Playwright MCP', url: 'https://github.com/microsoft/playwright-mcp'},
    {name: 'W3C WAI · Form notifications', url: 'https://www.w3.org/WAI/tutorials/forms/notifications/'},
    {name: 'GOV.UK Service Manual · Measuring completion rate', url: 'https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate'},
    {name: 'GOV.UK Service Manual · Measuring the success of your service', url: 'https://www.gov.uk/service-manual/measuring-success/measuring-the-success-of-your-service'}
  ],
  sectionSources: [[5], [0, 1], [2, 4], [3], [6], []],
  text: {
    en: {
      title: '200 people started signing up. Why did only 130 activate within a day?',
      summary: 'In this worked example with fictional data, use PostHog to spot a gap, account records to check the count and Playwright to test a possible cause before redesigning the form.',
      sections: [
        ['Start with a count you can defend', 'Suppose 200 distinct people started signing up and 130 activated an account within 24 hours. That is 65% completion. The other 70 had no recorded activation in that window. Some might return tomorrow. These numbers are a worked example. They say nothing yet about why anyone stopped.'],
        ['Count the same journey in two places', 'Give each person who enters the cohort a full 24 hours, including those who start on the last day. In PostHog choose an ordered funnel and count people once per step. Its overall and previous-step percentages use different denominators. Google Analytics documents a similar distinction between entering at the first step and entering midway. Match those settings before comparing reports.', [
          'Record three milestones: first interaction with the form, submission accepted by the server, and account activation. Record the outcome of each step without sending field contents.',
          'If 160 of the 200 submitted, the first step retained 80%. Of those 160, 130 activated, or 81.25%. A report that shows 65% at activation has used the original 200 as its denominator.',
          'Compare tracked activations with an aggregate from the account system for the same eligible group and time window. Check consent coverage, identity changes, retries and test accounts. Reconcile a mismatch before choosing a feature to change.'
        ]],
        ['Turn one explanation into a browser test', 'Suppose support hears that people correct a misspelled email on a phone and then cannot continue. Give Playwright a test account in staging and the same screen size. Submit the invalid address, check that the page identifies the field, correct it and check that the confirmation appears. Link the visible result to one accepted submission in the test system. W3C’s form guidance provides a useful second check on the clarity of the error message.'],
        ['Where Claude and MCP fit', 'A team can run that test directly in Playwright. If it already uses Claude with the Playwright MCP connector, an operator can ask it to walk through the same test and record the first difference between expected and observed behaviour. Keep the expected outcome in a repeatable test owned by the team. Use fictional details, a staging account and a test inbox. Keep customer recordings and production credentials outside the prompt.'],
        ['Decide what the next number would mean', 'Imagine that a later, comparable cohort records 150 activations from 200 starts. Completion has moved from 65% to 75%, a difference of 10 percentage points. A browser test can establish that the corrected address now works under the tested conditions. Changes in traffic mix or email delivery might also affect the observed increase. If a rollout decision requires causal evidence, plan a controlled comparison with an appropriate sample.'],
        ['What we can decide together', 'Bring two aggregate counts, the name of the step where customers get stuck and the outcome you expect them to see. In a free 20-minute call with Ariel, choose the first discrepancy to investigate. A scoped pilot can deliver an event map, one repeatable browser test, the result before and after a change, and a handover session with the person who owns the form.']
      ],
      exercise: 'Use the calculator with people counted over one complete observation window. Beside the result, write down a competing explanation and the independent record or test result that would change your decision.'
    },
    he: {
      title: '200 התחילו להירשם. למה רק 130 הפעילו חשבון בתוך יממה?',
      summary: 'בדוגמה עם נתוני הרשמה להמחשה, נאתר ב־PostHog את השלב שבו נרשמה ירידה, נצליב את הספירה עם מערכת החשבונות ונבדוק הסבר אפשרי בעזרת Playwright לפני שמשנים את הטופס.',
      sections: [
        ['מה הנתון באמת אומר?', 'נניח ש־200 אנשים שונים התחילו להירשם ו־130 מהם הפעילו חשבון בתוך 24 שעות. שיעור ההשלמה הוא 65%. אצל 70 האחרים לא נרשמה הפעלה בפרק הזמן הזה. חלקם עשויים לחזור מחר. המספרים כאן נועדו להמחשה, והסיבה שבגללה אדם מסוים הפסיק עדיין פתוחה.'],
        ['משווים את אותו מסלול בשתי מערכות', 'נותנים לכל מי שהתחיל להירשם 24 שעות מלאות, גם אם התחיל ביום האחרון למדידה. ב־PostHog מגדירים שלבים לפי סדר וסופרים כל אדם פעם אחת בכל שלב. אפשר להציג אחוזים ביחס להתחלה או לשלב הקודם. גם התיעוד של Google Analytics ממחיש איך כניסה באמצע המסלול משנה את הספירה. לפני שמשווים דוחות, מתאמים את הגדרות הכניסה, הסדר והמכנה.', [
          'מגדירים שלוש נקודות מדידה: תחילת מילוי הטופס, קבלת ההרשמה בשרת והפעלת החשבון. לכל נקודה שולחים אירוע מדידה, בלי הערכים שהוקלדו בשדות.',
          'אם ההרשמה התקבלה אצל 160 מתוך 200, שיעור המעבר בשלב הראשון הוא 80%. בשלב הבא 130 מתוך 160 הפעילו חשבון, כלומר 81.25%. כשאותו דוח מציג 65%, המכנה הוא כל 200 האנשים שהתחילו.',
          'משווים את מספר ההפעלות ב־PostHog לספירה מצרפית במערכת שמנהלת את החשבונות, עבור אותה קבוצה ואותן שעות. אם יש פער, בודקים מי נכלל במדידה לפי בחירות הפרטיות שלו, האם מזהה המשתמש השתנה והאם נספרו ניסיונות חוזרים או חשבונות בדיקה.'
        ]],
        ['הופכים תלונה אחת לבדיקה שאפשר לחזור עליה', 'נניח שלקוחות מספרים לתמיכה שבטלפון הם מתקנים שגיאת כתיב בכתובת המייל ואז אינם מצליחים להמשיך. משחזרים ב־Playwright את גודל המסך ועובדים עם חשבון בדיקה בסביבת ניסוי. מזינים כתובת שגויה, בודקים שהטופס מצביע על השדה, מתקנים ומוודאים שמופיע אישור. במערכת הבדיקה מחפשים הרשמה אחת שהתקבלה. מדריך הטפסים של W3C עוזר לבחון גם אם הודעת השגיאה מסבירה לאדם מה עליו לתקן.'],
        ['איפה נכנסים Claude ו־MCP?', 'אפשר להריץ את הבדיקה ישירות ב־Playwright. צוות שכבר חיבר את Claude ל־Playwright דרך MCP יכול לבקש ממנו לעבור על אותו תרחיש ולתעד את המקום הראשון שבו התוצאה שונה מהמצופה. את התוצאה הרצויה שומרים בבדיקה קבועה שהצוות יכול להריץ שוב. משתמשים בפרטים פיקטיביים ובתיבת דואר לניסוי. הקלטות של לקוחות ופרטי גישה לחנות הפעילה נשארים מחוץ לשיחה עם המודל.'],
        ['מה ייחשב שיפור?', 'נניח שבמדידה מאוחרת יותר, בקבוצה דומה, הופעלו 150 חשבונות מתוך 200 התחלות. שיעור ההשלמה עלה מ־65% ל־75%, פער של עשר נקודות אחוז. בדיקת הדפדפן יכולה להראות שאחרי התיקון הצלחתם להמשיך עם הכתובת המעודכנת. גם מקור התנועה או שינויים במסירת המיילים יכולים להסביר חלק מהעלייה. אם החלטת ההשקעה תלויה בסיבת השיפור, מתכננים השוואה מבוקרת עם מדגם מתאים.'],
        ['מה נעשה עם הנתונים שלכם?', 'לשיחת היכרות של 20 דקות ללא עלות עם אריאל מספיק להביא שתי ספירות מצרפיות, את השלב שמטריד אתכם ואת מה שהלקוח אמור לראות. נבחר יחד איזה פער לבדוק ראשון. בפיילוט בהיקף מוסכם תוכלו לקבל מפת אירועים, בדיקת דפדפן חוזרת, השוואה לפני ואחרי השינוי והדרכה למי שאחראי על הטופס.']
      ],
      exercise: 'הזינו במחשבון את מספר האנשים שהתחילו ואת מספר המסיימים שקיבלו את מלוא הזמן להשלים את הפעולה. ליד התוצאה רשמו עוד הסבר אפשרי, ואיזה נתון ממערכת אחרת או מבדיקת דפדפן ישנה את ההחלטה שלכם.'
    },
    sv: {
      title: '200 började registrera sig. Varför aktiverade bara 130 sitt konto inom ett dygn?',
      summary: 'I det här exemplet med fiktiva siffror hittar ni tappet i PostHog, stämmer av antalet mot kontosystemet och testar en möjlig förklaring med Playwright innan ni ändrar formuläret.',
      sections: [
        ['Vad vet vi om de 70?', 'Anta att 200 olika personer påbörjade registreringen och att 130 aktiverade ett konto inom 24 timmar. Då är andelen slutförda registreringar 65 procent. För övriga 70 saknas en registrerad aktivering inom ett dygn. Några kan återkomma i morgon. Siffrorna är ett räkneexempel. Orsaken till bortfallet återstår att undersöka.'],
        ['Räkna samma förlopp på två ställen', 'Ge alla som börjar ett helt dygn på sig, även dem som börjar på mätperiodens sista dag. Välj steg i bestämd ordning i PostHog och räkna varje person en gång per steg. Andel av alla som började och andel av dem som nådde föregående steg har olika nämnare. Google Analytics visar också hur urvalet ändras om personer får komma in mitt i tratten. Stäm av inställningarna innan ni jämför rapporter.', [
          'Mät när någon börjar fylla i formuläret, när servern tar emot registreringen och när kontot aktiveras. Registrera händelsen och låt innehållet i fälten stanna i formuläret.',
          'Om servern tog emot 160 registreringar från de 200 som började, gick 80 procent vidare. Av dessa 160 aktiverade 130 ett konto, alltså 81,25 procent. Räknat från första steget blir andelen 65 procent.',
          'Jämför antalet aktiveringar med en aggregerad siffra från kontosystemet för samma grupp och period. Vid en avvikelse, kontrollera vilka personer som omfattas av mätningen, deras integritetsval, ändrade användar-id, upprepade försök och testkonton.'
        ]],
        ['Gör en supportfråga till ett upprepningsbart test', 'Anta att kunder berättar att de på mobilen rättar sin felstavade mejladress och sedan fastnar. Öppna testmiljön i Playwright med samma skärmstorlek och ett testkonto. Ange en ogiltig adress, kontrollera att felmeddelandet pekar ut fältet, rätta adressen och kontrollera att bekräftelsen visas. Stäm av mot en enda mottagen registrering i testsystemet. W3C:s vägledning för formulär hjälper er att bedöma hur begriplig återkopplingen är.'],
        ['När tillför Claude och MCP något?', 'Testet går att köra direkt i Playwright. Ett team som redan använder Claude med Playwrights MCP-koppling kan be assistenten gå igenom samma förlopp och anteckna den första avvikelsen från det förväntade resultatet. Bevara sedan det förväntade beteendet i ett test som teamet själv äger. Använd påhittade uppgifter, en testmiljö och en testbrevlåda. Kundinspelningar och inloggningsuppgifter till produktionen hör hemma utanför modellkonversationen.'],
        ['Hur tolkar ni en förändring?', 'Anta att en senare, jämförbar grupp ger 150 aktiveringar från 200 påbörjade registreringar. Andelen stiger från 65 till 75 procent, en ökning med tio procentenheter. Ett godkänt webbläsartest visar att den rättade adressen fungerar under testets förutsättningar. Ändrad trafikmix eller mejlleverans kan också ha påverkat siffran. Behöver ni belägga orsakssambandet inför en investering, planera en kontrollerad jämförelse med tillräckligt underlag.'],
        ['Vad kan vi avgöra tillsammans?', 'Ta med två aggregerade antal, steget som bekymrar er och beskedet kunden borde få. Under ett kostnadsfritt samtal på 20 minuter med Ariel väljer vi vilken avvikelse ni ska undersöka först. En avgränsad pilot kan ge er en händelsekarta, ett upprepningsbart webbläsartest, mätvärden före och efter en ändring och en praktisk genomgång med den som ansvarar för formuläret.']
      ],
      exercise: 'Fyll i antalet personer som började och slutförde under ett helt observationsfönster. Anteckna en alternativ förklaring till utfallet och vilken uppgift från ett annat system eller ett webbläsartest som skulle få er att ändra beslut.'
    },
    da: {
      title: '200 begyndte at oprette en konto. Hvorfor aktiverede kun 130 den inden for et døgn?',
      summary: 'I dette eksempel med fiktive tal finder I frafaldet i PostHog, sammenholder tallene med kontosystemet og afprøver en mulig forklaring med Playwright, før I ændrer formularen.',
      sections: [
        ['Hvad ved I om de 70?', 'Forestil jer, at 200 forskellige personer begynder at oprette en konto, og at 130 aktiverer den inden for 24 timer. Det giver en gennemførelsesgrad på 65 procent. For de øvrige 70 mangler der en registreret aktivering inden for det første døgn. Nogle vender måske tilbage i morgen. Tallene er et regneeksempel. Årsagen til frafaldet skal stadig undersøges.'],
        ['Tæl det samme forløb to steder', 'Giv alle deltagere et helt døgn, også dem, der starter på måleperiodens sidste dag. Vælg en fast rækkefølge for trinene i PostHog, og tæl hver person én gang pr. trin. Andelen af alle, der begyndte, har en anden nævner end andelen af dem, der nåede forrige trin. Google Analytics viser også, hvordan resultatet afhænger af, om brugere kan træde ind midt i tragten. Afstem disse valg, før I sammenligner rapporter.', [
          'Registrér tre hændelser: personen begynder at udfylde formularen, serveren accepterer registreringen, og kontoen aktiveres. Registrér hændelserne uden at sende indholdet af felterne.',
          'Hvis serveren accepterer 160 tilmeldinger ud af 200, er 80 procent gået videre. Af de 160 aktiverer 130 en konto, altså 81,25 procent. Med alle 200 som udgangspunkt er andelen 65 procent.',
          'Sammenhold antallet af aktiveringer med et samlet tal fra kontosystemet for samme gruppe og tidsrum. Ved afvigelser skal I blandt andet undersøge, hvem målingen dækker, brugernes privatlivsvalg, ændrede bruger-id’er, gentagne forsøg og testkonti.'
        ]],
        ['Fra en supporthenvendelse til en test, I kan gentage', 'Antag, at kunder fortæller, at de retter en forkert mailadresse på mobilen og derefter sidder fast. Åbn testmiljøet i Playwright med samme skærmstørrelse og en testkonto. Indtast en ugyldig adresse, se om fejlbeskeden udpeger feltet, ret adressen og kontrollér, at bekræftelsen vises. Tjek, at testsystemet har modtaget netop én registrering. W3C’s vejledning om formularer hjælper jer med at vurdere, om beskeden tydeligt fortæller brugeren, hvad der skal rettes.'],
        ['Hvornår giver Claude og MCP mening?', 'I kan køre testen direkte i Playwright. Bruger teamet allerede Claude med Playwrights MCP-forbindelse, kan det bede assistenten gennemgå samme forløb og registrere den første afvigelse fra det forventede resultat. Gem derefter forventningen i en test, som teamet selv kan køre. Brug opdigtede data, et testmiljø og en testindbakke. Hold kundeoptagelser og loginoplysninger til driftsmiljøet ude af samtalen med modellen.'],
        ['Hvordan læser I det næste resultat?', 'Forestil jer, at en senere, sammenlignelig gruppe giver 150 aktiveringer ud af 200 påbegyndte registreringer. Andelen stiger fra 65 til 75 procent, altså ti procentpoint. En bestået browsertest viser, at den rettede mailadresse virker under testens betingelser. Trafikkilder eller levering af bekræftelsesmails kan også have påvirket udviklingen. Kræver investeringen dokumentation for årsagen, så planlæg en kontrolleret sammenligning med tilstrækkeligt datagrundlag.'],
        ['Hvad kan vi afklare sammen?', 'Tag to samlede tal, det trin I undrer jer over, og den besked kunden burde se med til et gratis møde på 20 minutter med Ariel. Sammen vælger vi, hvilken afvigelse I vil undersøge først. En afgrænset pilot kan give jer en oversigt over hændelserne, en browsertest der kan gentages, tal før og efter en ændring og en praktisk gennemgang med den ansvarlige for formularen.']
      ],
      exercise: 'Brug beregneren med antallet af personer, der begyndte og gennemførte efter et helt observationsvindue. Skriv en anden mulig forklaring ved siden af resultatet, og angiv, hvilket tal eller testresultat der ville ændre jeres beslutning.'
    }
  }
};
