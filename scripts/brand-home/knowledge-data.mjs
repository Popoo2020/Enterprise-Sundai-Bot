import { guidesWork } from './guides-work.mjs';
import { guidesSchool } from './guides-school.mjs';
import { guidesControls } from './guides-controls.mjs';

import { secureLlmGuide } from './secure-llm-guide.mjs';

export const guides = [secureLlmGuide, ...guidesWork, ...guidesSchool, ...guidesControls];
export const legacyArticleSlugs = ['approve-before-sending','check-before-sharing','assistant-with-sources'];

export const articleSlugs = [...legacyArticleSlugs, ...guides.map(guide => guide.slug)];

export const guideIndex = {
  en: {
    title: 'Practical AI guides for teams and schools',
    summary: 'Choose a workflow to automate, review the risks of an AI tool or plan a classroom workshop. Each guide includes an exercise you can try.',
    browse: 'Browse all guides', navSummary: 'Workflow examples, classroom activities and AI governance guides.', topics: 'Browse by topic',
    work: 'Automating everyday work', school: 'Teaching AI and digital literacy', governance: 'AI governance and security',
    sources: 'Sources', byline: 'By SundAI', date: '19 November 2026', skip: 'Skip to content', home: 'Home',
    services: {'services/secure-ai-automation/':'Secure AI automation for businesses','services/compliance-ai-governance/':'AI governance reviews','services/private-ai-agents-rag/':'Private AI assistants for teams','courses/teachers/':'AI workshops for teachers','courses/youth/':'AI and online safety workshops for schools','courses/hospital/':'AI training for hospital educators'}
  },
  he: {
    title: 'מדריכי בינה מלאכותית לעסקים ולבתי ספר',
    summary: 'איך בוחרים תהליך עסקי לאוטומציה, בודקים כלי AI לפני רכישה או מתכננים שיעור בכיתה? בכל מדריך תמצאו דוגמה ותרגיל שאפשר לנסות.',
    browse: 'לכל המדריכים', navSummary: 'דוגמאות לאוטומציה, פעילויות לכיתה ומדריכים לממשל AI.', topics: 'בחירת נושא',
    work: 'אוטומציה של משימות בעבודה', school: 'הוראת AI ואוריינות דיגיטלית', governance: 'ממשל AI ואבטחת מידע',
    sources: 'מקורות', byline: 'מאת SundAI', date: '19 בנובמבר 2026', skip: 'דילוג לתוכן', home: 'דף הבית',
    services: {'services/secure-ai-automation/':'אוטומציה מאובטחת לעסקים','services/compliance-ai-governance/':'בדיקת ממשל AI לארגונים','services/private-ai-agents-rag/':'עוזרי AI פרטיים לצוותים','courses/teachers/':'סדנאות AI לצוותי הוראה','courses/youth/':'סדנאות AI ובטיחות ברשת לבתי ספר','courses/hospital/':'הדרכת AI למדריכים בבתי חולים'}
  },
  sv: {
    title: 'Praktiska AI-guider för företag och skolor',
    summary: 'Välj ett arbetsflöde att automatisera, granska ett AI-verktyg före inköp eller planera en lektion i källkritik. Varje guide innehåller en övning att prova.',
    browse: 'Se alla guider', navSummary: 'Arbetsflöden, lektionsupplägg och vägledning om AI-styrning.', topics: 'Välj ämne',
    work: 'Automatisering i arbetsvardagen', school: 'AI och källkritik i skolan', governance: 'AI-styrning och informationssäkerhet',
    sources: 'Källor', byline: 'Av SundAI', date: '19 november 2026', skip: 'Hoppa till innehållet', home: 'Startsidan',
    services: {'services/secure-ai-automation/':'Säker AI-automatisering för företag','services/compliance-ai-governance/':'Granskning av AI-styrning','services/private-ai-agents-rag/':'Privata AI-assistenter för arbetsgrupper','courses/teachers/':'AI-fortbildning för lärare','courses/youth/':'AI och nätsäkerhet för skolor','courses/hospital/':'AI-utbildning för handledare på sjukhus'}
  },
  da: {
    title: 'Praktiske AI-guides til virksomheder og skoler',
    summary: 'Vælg en arbejdsgang til automatisering, vurdér et AI-værktøj før køb, eller planlæg en lektion i kildekritik. Hver guide indeholder en øvelse, I kan afprøve.',
    browse: 'Se alle guides', navSummary: 'Arbejdsgange, undervisningsforløb og guides til AI-governance.', topics: 'Vælg emne',
    work: 'Automatisering i hverdagen', school: 'AI og kildekritik i skolen', governance: 'AI-governance og informationssikkerhed',
    sources: 'Kilder', byline: 'Af SundAI', date: '19. november 2026', skip: 'Gå til indholdet', home: 'Forsiden',
    services: {'services/secure-ai-automation/':'Sikker AI-automatisering til virksomheder','services/compliance-ai-governance/':'Gennemgang af AI-governance','services/private-ai-agents-rag/':'Private AI-assistenter til teams','courses/teachers/':'AI-kurser for lærere','courses/youth/':'AI og sikkerhed på nettet for skoler','courses/hospital/':'AI-kursus for oplæringsansvarlige på hospitaler'}
  }
};

export const knowledge = {
 he:{
  articles:'מאמרים ומדריכים', articleIntro:'שלוש שאלות שאפשר לנסות עם הצוות או בכיתה.', faq:'שאלות ותשובות', faqIntro:'לפני שבוחרים קורס או מתחילים פרויקט.', archive:'לכתבות נוספות באנגלית', next:'להמשך', further:'לקריאה נוספת', apply:'נסו בעצמכם', back:'לכל המאמרים',
  q:[
   ['איך בוחרים באיזה תהליך עסקי להתחיל?','בחרו משימה שחוזרת מדי שבוע, כמו מיון פניות. בשיחה נמפה מי מבצע אותה, אילו מערכות מעורבות ואיך למדוד זמן וטעויות לפני ואחרי פיילוט.'],
   ['מי יוכל לקרוא את המידע שלנו או לאשר פעולה?','כבר בתכנון בוחרים מקור מידע, תפקידי משתמשים ופעולות מותרות. למשל, לעוזר מותר להכין תשובה ללקוח. עובד מוסמך בודק ומאשר את השליחה.'],
   ['איך פסיכולוגיה פדגוגית נכנסת לשיעור AI?','לפני שחושפים את המקור, כל תלמיד מסביר מה גרם לסרטון להיראות אמין. אחרי הבדיקה חוזרים לנימוק המקורי. כך המורה רואה איך התלמיד הגיע למסקנה ואיפה כדאי לתרגל שוב.'],
   ['מה התלמידים לוקחים הביתה?','ב־Teen Tech AI התלמידים בונים בזוגות אתר או כלי שימושי, למשל כלי שמשווה מחיר כולל משלוח. זוג אחר בודק אותו, והיוצרים מציגים מה תיקנו בעקבות המשוב.'],
   ['כמה עולה להתחיל ומה קורה אחרי השיחה?','שיחת ההיכרות נמשכת 20 דקות וללא עלות. אם יש התאמה, תקבלו הצעה שמפרטת תוצר, משך, מחיר ואופן הבדיקה. אפשר להתחיל בפיילוט לכיתה אחת או בתהליך עסקי אחד.']
  ],
  a:[
   ['מתי מותר לעוזר AI לשלוח תשובה ללקוח?','תרגיל בתכנון אוטומציה שמפריד בין ניסוח, אישור ושליחה.',
    'מתחילים בהזמנה אחת','לקוחה מבקשת לשנות כתובת משלוח. העוזר מוצא את ההזמנה ומנסח תשובה. לפני שמחברים אותו למערכת המשלוחים, רשמו מי רשאי לשנות כתובת ומתי ההזמנה כבר יצאה לדרך.',
    'מתכננים גם את רגע העצירה','בתכנון מאובטח מראש (Secure by Design), מפרידים בין הרשאה לקרוא הזמנה, הרשאה להציע שינוי והרשאה לבצע אותו. בדוגמה הזו העובד רואה את הכתובת הישנה והחדשה ומאשר. אם יש שתי הזמנות מתאימות, הבקשה עוברת לבירור.',
    'איך בודקים אם זה משתלם?','הריצו שלושה מקרים בדויים: הזמנה רגילה, זיהוי כפול ומשלוח שכבר יצא. רשמו זמן טיפול, מספר תיקונים והאם הפעולה נעצרה כשהיה צריך. כך אפשר להחליט אם להרחיב את הפיילוט.',
    'בחרו פעולה אחת שהעוזר יכול להכין והשלימו את המשפט: רק ___ רשאי לאשר אותה, אחרי שבדק ___.'],
   ['הסרטון משכנע. מה כדאי לבדוק לפני שמשתפים?','שיעור קצר על הרגע שבין התגובה הרגשית ללחיצה על שיתוף.',
    'מה גרם לי להאמין?','הציגו בכיתה סרטון תרגול עם כיתוב מפתיע. בקשו מכל זוג לכתוב בנפרד מה רואים, מה הכיתוב טוען ומה עורר בו אמון. כך אפשר לגלות אם התלמיד הסתמך על ראיה, על סגנון הדיבור או על האדם ששיתף.',
    'בודקים את הטענה שמסביב לתמונה','מחפשים את הפרסום המקורי, את מועד הצילום ומקור נוסף שעוסק באותו אירוע. סרטון יכול להיות אמיתי והכיתוב שלו שגוי. אם אין מספיק מידע, גם זו מסקנה שאפשר להסביר.',
    'הופכים את הבדיקה למוצר','כל זוג בונה עמוד קצר שמבקש קישור, מציג שלוש שאלות בדיקה ומאפשר לבחור בין שיתוף, בקשת מקור והמתנה. זוג אחר מנסה אותו על דוגמה חדשה ומסביר איזו שאלה שינתה את החלטתו.',
    'החליפו את הכיתוב של אותו סרטון. האם הנימוקים שלכם לאמינותו השתנו אף שהתמונות נשארו זהות?'],
   ['עוזר הידע ענה. איך יודעים שהתשובה מתאימה לעובד?','בדיקת קבלה פשוטה לעוזר שעונה מתוך נהלים פנימיים.',
    'שאלה אחת, שני עובדים','עובדת חדשה ומנהל שואלים מי מוסמך לאשר החזר. בחרו מראש נוהל שירות שמותר לשניהם לקרוא ומסמך חריגים שפתוח למנהל בלבד. הגדירו איזו תשובה מצופה לכל תפקיד.',
    'מבקשים סעיף שאפשר לפתוח','בקשו מהעוזר להציג את הסעיף התומך בתשובה. בדקו שהקישור נפתח תחת הרשאות המשתמש ושהסעיף אכן עונה לשאלה. כשאין מקור מתאים, העוזר צריך להפנות לאדם או לבקש הבהרה.',
    'מנסים גם כשהנוהל משתנה','עדכנו סכום או שם תפקיד בעותק ניסוי של הנוהל. שאלו שוב בשני החשבונות ובדקו מאיזו גרסה התשובה נלקחה. תעדו מי אחראי לעדכוני מקורות אחרי המסירה.',
    'הכינו טבלה של ארבע עמודות: שאלה, תפקיד, מקור מורשה ותשובה צפויה. השתמשו בה לפני כל הרחבה של הפיילוט.']
  ]},
 en:{
  articles:'Articles and guides',articleIntro:'Three questions to try with your team or class.',faq:'Questions and answers',faqIntro:'Before choosing a course or starting a project.',archive:'More SundAI articles',next:'Explore',further:'Further reading',apply:'Try it',back:'All articles',
  q:[['Which workflow should we start with?','Choose a weekly task such as sorting enquiries. During the call we map who does it, which tools are involved, and how to compare time and errors before and after a pilot.'],['Who can see our data or approve an action?','We agree sources, roles and permitted actions during design. An assistant might draft a customer reply while an authorised colleague reviews and sends it.'],['How does educational psychology shape a lesson?','Before revealing the source, pupils explain what made a clip credible. They revisit that reasoning after checking. The teacher can then see which judgement needs more practice.'],['What will pupils take home?','In Teen Tech AI, pairs build a working website or tool, such as a price comparison including delivery. Another pair tests it and the makers present the changes they made.'],['What does it cost to get started?','The 20-minute introduction is free. If the project fits, our proposal specifies the deliverable, timing, price and checks. You can start with one class or a single workflow.']],
  a:[
   ['When should an AI assistant send a customer reply?','A workflow exercise on drafting, approving and sending.',
    'Start with one order','A customer asks for a delivery address change. The assistant retrieves the order and drafts a reply. Before connecting the delivery system, identify who may make the change and what happens after dispatch.',
    'Design the stopping point','Secure by Design means making access decisions early. Separate reading an order, proposing a change and committing it. The reviewer sees both addresses. Two matching orders should trigger a question for the team.',
    'Decide whether to expand','Try a normal order, a duplicate match and a parcel already dispatched using fictional records. Record handling time, corrections and whether the workflow stopped when expected. Use the results to decide on a larger pilot.',
    'Complete this sentence for one real task: only ___ may approve the change, after checking ___.'],
   ['The clip looks convincing. What do you check before sharing?','A classroom exercise on the moment between feeling something and passing it on.',
    'What made me believe it?','Show a practice clip with a surprising caption. Ask pairs to write down what they can see, what the caption claims and what made it feel credible. Compare their reasons before revealing the source.',
    'Check the claim around the image','Look for the original post, when it was recorded and another source that covers the event. Authentic footage can carry a misleading caption. When evidence is missing, record what is still unknown.',
    'Build a tool another pair can use','Create a page with a source link, three checking questions and a choice to share, request a source or wait. Invite a different pair to test it on another example and describe which question changed their decision.',
    'Try a different caption on the same footage. Did your reasons change even though the images stayed the same?'],
   ['Does the knowledge assistant give the right answer for this employee?','An acceptance check for an assistant using internal policies.',
    'One question, two roles','A new employee and a manager ask who can approve a refund. Choose a shared service policy and a restricted exceptions document. Write down the answer each role should receive before you run the test.',
    'Ask for a passage you can open','Request the source passage. Check that the signed-in user can open it and that it supports the answer. When the source is missing, the assistant should ask for clarification or name someone to contact.',
    'Repeat after the policy changes','Update a value or role in a test copy of the policy. Ask again with both accounts and check which version supports the reply. Assign someone to keep sources current after handover.',
    'Make a four-column test sheet: question, role, permitted source and expected answer. Reuse it before expanding access.']
  ]},
 sv:{
  articles:'Artiklar och guider',articleIntro:'Tre frågor att pröva på jobbet eller i klassrummet.',faq:'Frågor och svar',faqIntro:'Inför ett kursval eller ett nytt projekt.',archive:'Fler artiklar från SundAI',next:'Läs vidare',further:'Fördjupning',apply:'Prova själv',back:'Alla artiklar',
  q:[['Vilket arbetsflöde ska vi börja med?','Välj något ni gör varje vecka, till exempel sortering av kundärenden. Under samtalet går vi igenom vem som gör jobbet, vilka system som används och hur ni kan jämföra tid och fel före och efter ett pilotförsök.'],['Vem får läsa våra uppgifter eller godkänna en åtgärd?','Redan i planeringen bestämmer vi källor, roller och behörigheter. En assistent kan till exempel skriva ett svar som en behörig kollega granskar och skickar.'],['Hur märks pedagogisk psykologi i undervisningen?','Eleverna berättar vad som fick ett klipp att verka trovärdigt innan källan avslöjas. Efter kontrollen går de tillbaka till sitt resonemang. Läraren ser då vilket omdöme som behöver tränas.'],['Vad tar eleverna med sig?','I Teen Tech AI bygger eleverna en webbplats eller ett verktyg i par, till exempel för att jämföra priser inklusive frakt. Ett annat par testar och eleverna visar vad de ändrat efteråt.'],['Vad kostar det att börja?','Det första samtalet på 20 minuter är kostnadsfritt. Om uppdraget passar anger vi resultat, tidsplan, pris och hur arbetet ska kontrolleras i en offert. Börja gärna med en klass eller ett arbetsflöde.']],
  a:[
   ['När ska en AI-assistent få skicka ett kundsvar?','En övning om att skriva utkast, godkänna och skicka.',
    'Börja med en beställning','En kund vill ändra leveransadressen. Assistenten hämtar ordern och skriver ett svarsutkast. Bestäm vem som får ändra adressen och vad som gäller när paketet redan är på väg.',
    'Bestäm när flödet ska stanna','Secure by Design innebär att behörigheter ingår i planeringen. Skilj mellan att läsa en order, föreslå en ändring och verkställa den. Granskaren får se båda adresserna. Två möjliga order kräver en manuell kontroll.',
    'Avgör om försöket ska växa','Pröva med påhittade uppgifter: en vanlig order, två träffar och ett redan skickat paket. Anteckna tid, antal rättelser och om flödet stannade vid rätt tillfälle. Använd resultatet inför nästa beslut.',
    'Fyll i meningen för en arbetsuppgift: endast ___ får godkänna ändringen efter att ha kontrollerat ___.'],
   ['Klippet verkar trovärdigt. Vad kollar du innan du delar?','En övning om ögonblicket mellan en känsla och en delning.',
    'Vad fick mig att tro på det?','Visa ett övningsklipp med en överraskande bildtext. Låt paren skriva ner vad de faktiskt ser, vad texten påstår och vad som fick påståendet att kännas trovärdigt.',
    'Granska påståendet runt bilden','Leta efter originalinlägget, tidpunkten för inspelningen och en annan källa till händelsen. Äkta bilder kan ha fått fel bildtext. Skriv ner vad som fortfarande är oklart.',
    'Bygg ett verktyg för ett annat par','Skapa en sida med källänk, tre kontrollfrågor och valen dela, be om källa eller avvakta. Ett annat par provar sidan på ett nytt exempel och förklarar vilken fråga som påverkade deras beslut.',
    'Byt bildtext på samma klipp. Ändrades era skäl att tro på det trots att bilderna var desamma?'],
   ['Ger kunskapsassistenten rätt svar för just den här medarbetaren?','Ett enkelt sätt att testa en assistent som använder interna riktlinjer.',
    'En fråga, två roller','En nyanställd och en chef frågar vem som får godkänna en återbetalning. Välj en gemensam rutin och ett undantagsbeslut som bara chefen får läsa. Skriv ner förväntat svar för varje roll.',
    'Be om ett avsnitt som går att öppna','Be om källan till svaret. Kontrollera att den inloggade personen kan öppna länken och att avsnittet stöder svaret. Saknas underlag ska assistenten be om förtydligande eller hänvisa till en person.',
    'Testa igen när rutinen ändras','Ändra ett belopp eller en roll i en testkopia. Ställ frågan på nytt från båda kontona och se vilken version svaret bygger på. Bestäm vem som ansvarar för uppdateringarna efter överlämningen.',
    'Gör en tabell med fråga, roll, tillåten källa och förväntat svar. Använd den innan fler får tillgång.']
  ]},
 da:{
  articles:'Artikler og guider',articleIntro:'Tre spørgsmål at afprøve på arbejdet eller i klassen.',faq:'Spørgsmål og svar',faqIntro:'Inden I vælger et kursus eller starter et projekt.',archive:'Flere artikler fra SundAI',next:'Læs videre',further:'Læs mere',apply:'Prøv selv',back:'Alle artikler',
  q:[['Hvilken arbejdsgang skal vi begynde med?','Vælg en ugentlig opgave, fx sortering af kundehenvendelser. Vi gennemgår, hvem der løser opgaven, hvilke systemer der indgår, og hvordan I kan sammenligne tid og fejl før og efter en pilot.'],['Hvem må se vores data eller godkende en handling?','Vi aftaler kilder, roller og tilladte handlinger under planlægningen. En assistent kan fx skrive et svarudkast, som en medarbejder med den rette adgang gennemgår og sender.'],['Hvordan indgår pædagogisk psykologi i undervisningen?','Eleverne forklarer, hvorfor et klip virker troværdigt, før kilden vises. Efter kontrollen vender de tilbage til deres begrundelse. Læreren kan så se, hvilken vurdering eleverne skal øve igen.'],['Hvad tager eleverne med hjem?','I Teen Tech AI bygger eleverne i par en hjemmeside eller et værktøj, fx en prissammenligning med fragt. Et andet par tester, og eleverne viser, hvad de ændrede efter tilbagemeldingen.'],['Hvad koster det at komme i gang?','Den første samtale på 20 minutter er gratis. Hvis opgaven passer, beskriver tilbuddet leverance, tidsplan, pris og kontrol. I kan begynde med én klasse eller én arbejdsgang.']],
  a:[
   ['Hvornår må en AI-assistent sende et kundesvar?','En øvelse i at skrive udkast, godkende og sende.',
    'Start med én ordre','En kunde vil ændre sin leveringsadresse. Assistenten henter ordren og skriver et udkast. Aftal, hvem der må ændre adressen, og hvad der skal ske, når pakken allerede er sendt.',
    'Beslut, hvornår processen stopper','Secure by Design betyder, at adgang tænkes ind fra starten. Adskil retten til at læse, foreslå en ændring og gennemføre den. Den ansvarlige ser begge adresser. To mulige ordrer kræver en manuel kontrol.',
    'Afgør, om piloten skal udvides','Afprøv en almindelig ordre, en dobbeltsøgning med to træffere og en afsendt pakke med fiktive data. Notér tidsforbrug, rettelser og om processen stoppede det rigtige sted.',
    'Udfyld sætningen for én opgave: Kun ___ må godkende ændringen efter at have kontrolleret ___.'],
   ['Klippet virker overbevisende. Hvad tjekker du, før du deler?','En klasseøvelse om øjeblikket mellem en følelse og en deling.',
    'Hvad fik mig til at tro på det?','Vis et øvelsesklip med en overraskende billedtekst. Bed eleverne skrive, hvad de ser, hvad teksten påstår, og hvad der fik påstanden til at virke troværdig.',
    'Tjek påstanden omkring billedet','Find det oprindelige opslag, tidspunktet for optagelsen og en anden kilde til hændelsen. Ægte billeder kan have en forkert billedtekst. Skriv ned, hvad der stadig er usikkert.',
    'Byg et værktøj til et andet makkerpar','Lav en side med kildelink, tre kontrolspørgsmål og valgene del, bed om en kilde eller vent. Lad et andet par teste siden på et nyt eksempel og forklare, hvilket spørgsmål påvirkede beslutningen.',
    'Skift billedteksten til samme klip. Ændrede jeres begrundelse sig, selv om billederne var de samme?'],
   ['Giver vidensassistenten det rette svar til netop denne medarbejder?','En enkel afprøvning af en assistent, der bruger interne retningslinjer.',
    'Ét spørgsmål, to roller','En ny medarbejder og en leder spørger, hvem der må godkende en refundering. Vælg en fælles procedure og et dokument om undtagelser, som kun lederen må læse. Notér forventet svar for begge roller.',
    'Bed om et afsnit, du kan åbne','Bed om kilden til svaret. Tjek, at brugeren kan åbne dokumentet, og at afsnittet understøtter svaret. Mangler kilden, skal assistenten bede om en præcisering eller henvise til en person.',
    'Prøv igen efter en ændring','Ret et beløb eller en rolle i en testkopi af proceduren. Stil spørgsmålet fra begge konti igen, og se, hvilken version svaret bygger på. Aftal, hvem der holder kilderne opdaterede efter overdragelsen.',
    'Lav et testark med spørgsmål, rolle, tilladt kilde og forventet svar. Brug det igen, før I udvider adgangen.']
  ]}
};
