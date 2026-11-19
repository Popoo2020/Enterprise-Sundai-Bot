export const guidesControls = [
  {
    slug: 'ai-vendor-review-before-you-buy',
    category: 'governance',
    related: 'services/compliance-ai-governance/',
    sources: [
      { name: 'UK Government · Guidelines for AI procurement', url: 'https://www.gov.uk/government/publications/guidelines-for-ai-procurement/guidelines-for-ai-procurement' },
      { name: 'NIST · AI Risk Management Framework Playbook', url: 'https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook' }
    ],
    text: {
      en: {
        title: 'Buying an AI tool? What to ask the vendor before connecting your inbox',
        summary: 'A supplier demo can show how well a tool writes. Use an AI register and one sample email to find out what the tool can read, retain and send.',
        sections: [
          ['Write down the job you are buying', 'Suppose a service firm wants an assistant to draft replies to enquiries. Start a row in your AI register with the business owner, product and plan, connected mailbox, permitted actions and next review date. Record who approves outgoing messages. If another team later wants to connect its own mailbox, the register shows whose decision is needed.'],
          ['Ask for evidence on your actual plan', 'Give each shortlisted supplier the same fictional email. Ask them to show which folders the tool can read, who can inspect the draft and where an administrator can revoke access. Request the written terms covering retention, deletion, subprocessors and whether inputs can be used for model training. Save the answer for the plan you intend to buy and mark unanswered questions as open.'],
          ['Make a decision you can revisit', 'If the tool can draft and send, ask whether those permissions can be separated. A team that needs drafting only can test a limited pilot with staff approval on every send. Agree who may pause the pilot, what evidence would justify expansion, and how to remove the connection when the trial ends. Keep the decision with its evidence in the register.']
        ],
        exercise: 'Compare two suppliers against one requirement: the assistant may prepare a reply but only an employee may send it. For each, record the observed behaviour, the supporting document and the person who will resolve any gap.'
      },
      he: {
        title: 'רוכשים כלי AI? מה לשאול את הספק לפני חיבור תיבת הדואר',
        summary: 'הדגמת מכירה מראה איך הכלי כותב. רישום מסודר ודוגמה אחת של פנייה יעזרו לברר מה הוא יכול לקרוא, לשמור ולשלוח.',
        sections: [
          ['מגדירים מה קונים ומי אחראי', 'נניח שמשרד שירותים רוצה עוזר שינסח תשובות לפניות. פתחו שורה במרשם כלי ה־AI של הארגון. רשמו את שם האחראי, המוצר ומסלול המינוי, תיבת הדואר שתחובר, הפעולות המותרות ומועד הבדיקה הבאה. ציינו מי מאשר הודעות לפני שליחה. אם מחלקה נוספת תרצה להצטרף בהמשך, יהיה ברור למי לפנות לקבלת החלטה.'],
          ['מבקשים הדגמה במסלול שבאמת תרכשו', 'תנו לכל ספק אותה הודעת דוא״ל פיקטיבית. בקשו לראות אילו תיקיות העוזר יכול לקרוא, מי יכול לעיין בטיוטה והיכן מנהל המערכת מבטל את הגישה. בקשו תנאים כתובים לגבי שמירת מידע ומחיקתו, ספקי משנה ושימוש בתוכן שהוזן לצורך אימון מודלים. שמרו את התשובה לצד שם המסלול וסמנו כל שאלה שעדיין פתוחה.'],
          ['קובעים מראש מתי אפשר להרחיב את השימוש', 'אם הכלי מסוגל גם לנסח וגם לשלוח, בדקו אם אפשר להפריד בין ההרשאות. צוות שזקוק לטיוטות יכול לערוך פיילוט עם אישור עובד לפני כל שליחה. הסכימו מי רשאי לעצור את הניסוי, מה הצוות יצטרך להראות כדי להרחיב אותו ואיך מנתקים את תיבת הדואר בסיומו. צרפו למרשם את ההחלטה ואת הראיות שעליהן הסתמכתם.']
        ],
        exercise: 'השוו בין שני ספקים לפי דרישה אחת. לעוזר מותר להכין תשובה ורק עובד רשאי לשלוח אותה. רשמו לכל ספק מה ראיתם בפועל, איזה מסמך תומך בכך ומי יברר את הפערים.'
      },
      sv: {
        title: 'Köpa ett AI-verktyg? Frågor att ställa innan ni ansluter inkorgen',
        summary: 'En säljdemonstration visar hur verktyget skriver. Med ett AI-register och ett påhittat mejl kan ni undersöka vad det får läsa, spara och skicka.',
        sections: [
          ['Beskriv uppgiften ni köper hjälp med', 'Tänk er en konsultbyrå som vill ha hjälp att skriva svar på förfrågningar. Lägg in en rad i verksamhetens AI-register med ansvarig person, produkt, abonnemang, berörd inkorg, tillåtna åtgärder och datum för nästa uppföljning. Skriv vem som godkänner utgående svar. När nästa avdelning vill ansluta sin inkorg framgår det vem som tar ställning till ändringen.'],
          ['Be leverantören visa rätt abonnemang', 'Ge varje leverantör samma påhittade mejl. Be att få se vilka mappar verktyget kan läsa, vem som kan se ett utkast och hur administratören återkallar åtkomsten. Begär skriftliga villkor för lagringstid, radering, underleverantörer och eventuell användning av inmatat material för modellträning. Spara svaret tillsammans med uppgiften om vilket abonnemang det gäller. Anteckna öppna frågor.'],
          ['Bestäm hur ni går vidare efter försöket', 'Om assistenten både kan skriva och skicka mejl, kontrollera om dessa behörigheter går att skilja åt. En byrå som behöver utkast kan prova verktyget med krav på att en medarbetare godkänner varje utskick. Bestäm vem som får pausa försöket, vad som krävs för att utöka användningen och hur anslutningen tas bort när försöket är slut. Lägg beslutet och underlaget i registret.']
        ],
        exercise: 'Jämför två leverantörer med samma krav. Assistenten får skriva utkast och bara en medarbetare får skicka svaret. Dokumentera vad ni såg, var det står i villkoren och vem som följer upp eventuella luckor.'
      },
      da: {
        title: 'Skal I købe et AI-værktøj? Spørg leverandøren, før I forbinder indbakken',
        summary: 'En salgsdemo viser, hvordan værktøjet skriver. Et AI-register og en opdigtet mail hjælper jer med at afklare, hvad det må læse, gemme og sende.',
        sections: [
          ['Beskriv den opgave, I vil have løst', 'Forestil jer et rådgivningsfirma, der vil have hjælp til at besvare henvendelser. Opret en post i jeres AI-register med den ansvarlige, produkt, abonnement, den tilsluttede postkasse, tilladte handlinger og dato for opfølgning. Skriv, hvem der godkender svar før afsendelse. Når en anden afdeling vil tilslutte sin postkasse, er det tydeligt, hvem der tager stilling til ændringen.'],
          ['Bed om at se det abonnement, I vil købe', 'Giv leverandørerne den samme opdigtede mail. Bed dem vise, hvilke mapper værktøjet kan læse, hvem der kan se kladden, og hvordan en administrator fjerner adgangen. Bed om skriftlige vilkår for opbevaring, sletning, underleverandører og eventuel brug af jeres indhold til at træne modeller. Gem svaret sammen med abonnementets navn, og markér åbne spørgsmål.'],
          ['Aftal, hvordan forsøget kan afsluttes', 'Kan assistenten både skrive og sende, så undersøg, om rettighederne kan adskilles. Et team, der vil have kladder, kan afprøve værktøjet med krav om, at en medarbejder godkender hver afsendelse. Aftal, hvem der må sætte forsøget på pause, hvad der skal til for at udvide det, og hvordan forbindelsen fjernes ved afslutning. Gem beslutningen sammen med jeres dokumentation i registret.']
        ],
        exercise: 'Sammenlign to leverandører ud fra ét krav. Assistenten må lave en kladde, og kun en medarbejder må sende den. Notér, hvad I så, hvilket dokument der understøtter det, og hvem der afklarer eventuelle huller.'
      }
    }
  },
  {
    slug: 'private-ai-assistant-access-and-outdated-files',
    category: 'governance',
    related: 'services/private-ai-agents-rag/',
    sources: [
      { name: 'Microsoft Learn · Document-level access control', url: 'https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview' },
      { name: 'Microsoft Learn · Change and deletion detection', url: 'https://learn.microsoft.com/en-us/azure/search/search-how-to-index-azure-blob-changed-deleted' }
    ],
    text: {
      en: {
        title: 'How to test a private AI assistant for permissions and outdated files',
        summary: 'What happens to an internal AI assistant when a file is withdrawn or a colleague changes role? Test how long each change takes to reach answers, snippets and links.',
        sections: [
          ['Start a withdrawal log before changing anything', 'In a test workspace, create a travel policy and a fictional finance note with a distinctive project name. Open the note from an authorised account. Record its source link, document owner and last refresh in your assistant. Ask which action should remove a file from future answers. Deleting it in a shared folder may require a separate update in the assistant’s search index.'],
          ['Replace the rule and watch the answer change', 'Give the first policy a fictional limit of 80 units. Publish a replacement with a limit of 120 and mark the old one withdrawn. Record when you made the change. Ask again in a fresh conversation after the expected update interval. Open the cited document and check its version and amount. An answer of 120 with a link to the old rule still fails this test.'],
          ['Test removal as well as addition', 'Keep one finance test account authorised and revoke access for a second. Ask both about the project in fresh sessions. Only the authorised account should see the note. Then withdraw the file entirely. Record when its distinctive detail, title and link disappear from new answers for both accounts. Agree who can disconnect the source if the delay exceeds the team’s limit.']
        ],
        exercise: 'Keep a test sheet with the account role, source version, question, expected result, actual result and check time. Repeat the same cases after changing connectors or permissions. Use invented documents throughout.'
      },
      he: {
        title: 'איך בודקים הרשאות ומסמכים מיושנים בעוזר AI ארגוני?',
        summary: 'מה קורה בעוזר הידע הארגוני כשמסירים מסמך או כשעובד עובר תפקיד? כך תבדקו תוך כמה זמן השינוי משתקף בתשובות, בקטעי הטקסט ובקישורים.',
        sections: [
          ['מתעדים את נקודת המוצא לפני שמסירים קובץ', 'בסביבת בדיקה, צרו נוהל נסיעות ומזכר כספי פיקטיבי עם שם פרויקט ייחודי. פתחו את המזכר מחשבון מורשה. רשמו את הקישור למקור, שם האחראי למסמך ומועד הרענון האחרון בעוזר. בררו מה בדיוק אמור להסיר קובץ מתשובות עתידיות. אחרי מחיקה בתיקייה משותפת עשוי להידרש עדכון נוסף במאגר החיפוש של העוזר.'],
          ['מחליפים גרסה ובודקים גם את הקישור', 'קבעו בנוהל הפיקטיבי תקרת החזר של 80 יחידות. פרסמו גרסה חדשה שקובעת 120, סמנו שהגרסה הישנה יצאה מתוקף ורשמו את שעת העדכון. אחרי זמן הרענון הצפוי פתחו שיחה חדשה ושאלו שוב. פתחו את המקור המצורף ובדקו את הגרסה ואת הסכום. תשובה של 120 שמפנה לנוהל הישן עדיין נכשלת בבדיקה.'],
          ['בודקים מה קורה אחרי ביטול הרשאה', 'השאירו לחשבון בדיקה אחד גישה למזכר ובטלו את ההרשאה של חשבון שני. פתחו שיחות חדשות ושאלו על הפרויקט בשני החשבונות. רק החשבון המורשה אמור לקבל פרטים מהמזכר. כעת הסירו את המזכר עצמו. תעדו מתי שמו, הקישור והפרט הייחודי מפסיקים להופיע בתשובות חדשות בשני החשבונות. החליטו מי רשאי לנתק את המקור אם הטיפול חורג מהזמן שהצוות הגדיר.']
        ],
        exercise: 'הכינו גיליון בדיקה עם תפקיד המשתמש, גרסת המקור, השאלה, התשובה הצפויה, התשובה בפועל ושעת הבדיקה. שמרו את המקרים להרצה חוזרת אחרי שינוי בחיבור או בהרשאות. השתמשו במסמכים שהמצאתם.'
      },
      sv: {
        title: 'Så testar ni behörigheter och gamla dokument i en intern AI-assistent',
        summary: 'Vad händer i en intern AI-assistent när en fil dras tillbaka eller en kollega byter roll? Mät hur snabbt ändringen syns i svaren, textutdragen och källhänvisningarna.',
        sections: [
          ['Dokumentera utgångsläget innan ni tar bort en fil', 'Skapa en resepolicy och ett påhittat beslutsunderlag med ett unikt projektnamn i en testmiljö. Öppna underlaget från ett behörigt konto. Anteckna källans länk, dokumentägaren och när assistenten senast hämtade materialet. Ta reda på vad som ska få filen att försvinna ur framtida svar. Efter en radering i den delade mappen kan assistentens sökindex behöva uppdateras separat.'],
          ['Byt rutin och kontrollera hänvisningen', 'Ange en påhittad ersättningsgräns på 80 enheter. Publicera en ny version där gränsen är 120 och markera den gamla som upphävd. Anteckna tidpunkten. Ställ frågan i en ny konversation efter den förväntade uppdateringen. Öppna källan som assistenten hänvisar till och kontrollera version och belopp. Svaret 120 med en länk till den gamla policyn underkänns i det här testet.'],
          ['Kontrollera även indragen behörighet', 'Låt ett testkonto behålla tillgången till underlaget och dra in åtkomsten för ett annat. Fråga om projektet i nya konversationer från båda kontona. Endast det behöriga kontot ska få uppgifter från underlaget. Dra sedan tillbaka filen helt. Anteckna när projektdetaljen, titeln och länken försvinner ur nya svar för båda kontona. Bestäm vem som får koppla bort källan om tidsgränsen överskrids.']
        ],
        exercise: 'För en testlogg med roll, källversion, fråga, förväntat och faktiskt svar samt tidpunkt. Upprepa testfallen när en anslutning eller behörighet ändras. Använd påhittade dokument under hela övningen.'
      },
      da: {
        title: 'Sådan tester I adgang og forældede dokumenter i en intern AI-assistent',
        summary: 'Hvad sker der i en intern AI-assistent, når en fil trækkes tilbage, eller en kollega skifter rolle? Mål, hvor hurtigt ændringen slår igennem i svar, tekstuddrag og links.',
        sections: [
          ['Notér udgangspunktet, før I fjerner en fil', 'Opret en rejsepolitik og et opdigtet økonominotat med et unikt projektnavn i et testmiljø. Åbn notatet fra en konto med adgang. Notér linket til kilden, den dokumentansvarlige og tidspunktet for assistentens seneste opdatering. Afklar, hvad der skal få filen til at forsvinde fra fremtidige svar. Når den er slettet i den delte mappe, kan assistentens søgeindeks kræve en særskilt opdatering.'],
          ['Skift reglen og følg kildehenvisningen', 'Sæt en fiktiv beløbsgrænse på 80 enheder. Offentliggør en ny version med en grænse på 120, og markér den gamle som udgået. Notér tidspunktet. Stil spørgsmålet i en ny samtale efter den forventede opdatering. Åbn den kilde, assistenten angiver, og kontrollér version og beløb. Svaret 120 med et link til den gamle regel dumper stadig testen.'],
          ['Prøv også at fjerne adgang', 'Lad én testkonto beholde adgangen til notatet, og fjern adgangen for en anden. Spørg om projektet i nye samtaler fra begge konti. Kun kontoen med adgang må få oplysninger fra notatet. Træk derefter selve filen tilbage. Notér, hvornår projektdetaljen, titlen og linket forsvinder fra nye svar for begge konti. Aftal, hvem der kan frakoble kilden, hvis jeres tidsgrænse bliver overskredet.']
        ],
        exercise: 'Før en testlog med rolle, kildeversion, spørgsmål, forventet svar, faktisk svar og tidspunkt. Gentag de samme test, når en forbindelse eller adgang ændres. Brug kun opdigtede dokumenter i øvelsen.'
      }
    }
  },
  {
    slug: 'ai-literacy-exercise-hospital-administrators',
    category: 'governance',
    related: 'courses/hospital/',
    sources: [
      { name: 'NHS England · AI guidance for health and care professionals', url: 'https://digital.nhs.uk/data-and-information/information-governance/guidance/artificial-intelligence/guidance-for-health-and-care-professionals' },
      { name: 'UK Government · AI Playbook', url: 'https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html' }
    ],
    text: {
      en: {
        title: 'AI literacy for hospital administrators: a 30-minute notice-writing exercise',
        summary: 'Can a colleague turn a facilities memo into a clear visitor notice and catch an invented detail? Run this short exercise with fictional material and leave with a reusable review checklist.',
        sections: [
          ['First five minutes: agree the facts', 'Invent a hospital and write a three-line facilities memo. The east entrance will close on Tuesday from 09:00 to 12:00. Visitors may use the west entrance. The memo gives no details about parking. Use only this fictional material in an approved writing tool. If a tool is unavailable, the facilitator can prepare a sample draft on paper.'],
          ['Next ten minutes: draft for a visitor', 'In pairs, ask for a website notice under 60 words. One person reads the draft as a first-time visitor. The other traces each time, direction and promise to a line in the memo. Then show a deliberately flawed draft from the facilitator that promises free parking. Ask the group to identify the unsupported sentence and decide who could verify parking arrangements before publication.'],
          ['Final fifteen minutes: approve or return', 'Swap drafts. The reviewer checks the day, time, entrance and clarity, marks any unsupported detail, and records a decision to approve or return the notice. Time both drafting and checking so the group can see where the work went. Collect the corrected notices and turn their recurring errors into a short checklist. Agree who owns the final wording in a real communications workflow.']
        ],
        exercise: 'Use a second fictional memo with a changed closure time. A colleague who missed the session should be able to catch the old time using the checklist alone. Keep their feedback and revise one ambiguous check.'
      },
      he: {
        title: 'אוריינות AI לצוותי מנהלה בבתי חולים: תרגיל של 30 דקות בכתיבת הודעה למבקרים',
        summary: 'האם הצוות יכול להפוך מזכר תחזוקה להודעה ברורה ולזהות פרט שהומצא? בתרגיל עובדים עם מידע פיקטיבי ויוצאים עם רשימת בדיקה להודעה הבאה.',
        sections: [
          ['חמש הדקות הראשונות: מסכימים על העובדות', 'המציאו בית חולים וכתבו מזכר תחזוקה בן שלוש שורות. הכניסה המזרחית תיסגר ביום שלישי מתשע בבוקר ועד שתים־עשרה בצהריים. למבקרים פתוחה הכניסה המערבית. במזכר אין מידע על החניה. הזינו לכלי כתיבה שאושר בארגון רק את החומר הפיקטיבי הזה. אפשר לקיים את התרגיל גם על נייר, עם טיוטה שהמנחה הכין מראש.'],
          ['עשר דקות לכתיבה מנקודת המבט של המבקר', 'עבדו בזוגות ובקשו טיוטה להודעה באתר שאורכה עד 60 מילים. אחד קורא כאילו הוא מבקר בפעם הראשונה. האחר מאתר במזכר מקור לכל שעה, הנחיית הגעה או הבטחה. כעת המנחה מציג טיוטה שהוכנה במיוחד עם טעות: היא מבטיחה חניה חינם. בקשו מהמשתתפים לסמן את המשפט שאין לו בסיס ולהחליט למי לפנות אם רוצים לאמת את הסדרי החניה לפני הפרסום.'],
          ['רבע שעה אחרונה: מאשרים או מחזירים לתיקון', 'החליפו טיוטות בין הזוגות. הבודק מוודא שהיום, השעות והכניסה נכונים ושברור לאן להגיע, מסמן כל פרט ללא מקור ורושם החלטה על אישור או תיקון. מדדו בנפרד את זמן הניסוח ואת זמן הבדיקה. אספו את ההודעות המתוקנות והפכו טעויות שחזרו לרשימת בדיקה קצרה. קבעו מי בארגון אחראי לנוסח הסופי בהודעה אמיתית.']
        ],
        exercise: 'תנו לעמית שלא השתתף במפגש מזכר פיקטיבי חדש עם שעת סגירה שונה ואת הטיוטה הקודמת. בקשו שיאתר את השעה הישנה בעזרת רשימת הבדיקה בלבד. השתמשו במשוב שלו כדי לחדד הנחיה אחת.'
      },
      sv: {
        title: 'AI-kunnighet för sjukhusadministratörer: skriv ett besöksmeddelande på 30 minuter',
        summary: 'Kan en kollega göra ett tydligt besöksmeddelande av ett driftbesked och upptäcka en påhittad uppgift? Öva med fiktivt material och ta fram en checklista för nästa text.',
        sections: [
          ['Första fem minuterna: enas om fakta', 'Hitta på ett sjukhus och skriv ett kort driftbesked. Östra entrén är stängd på tisdag mellan klockan 9 och 12. Besökare kan använda västra entrén. Beskedet säger inget om parkering. Använd enbart detta påhittade underlag i ett skrivverktyg som verksamheten har godkänt. Saknas ett sådant verktyg kan handledaren förbereda ett utkast på papper.'],
          ['Nästa tio minuter: skriv för en besökare', 'Arbeta i par och be om ett webbmeddelande på högst 60 ord. Den ena läser som en förstagångsbesökare. Den andra letar upp stöd i driftbeskedet för varje tid, vägbeskrivning och utfästelse. Handledaren visar sedan ett avsiktligt felaktigt utkast som lovar gratis parkering. Låt deltagarna markera meningen som saknar stöd och föreslå vem som kan bekräfta parkeringsvillkoren före publicering.'],
          ['Sista kvarten: godkänn eller skicka tillbaka', 'Byt utkast med ett annat par. Granskaren kontrollerar dag, tid, entré och begriplighet, markerar uppgifter utan stöd och antecknar sitt beslut. Ta tid på både skrivandet och granskningen för att se hur arbetet fördelas. Samla de rättade meddelandena och gör en kort checklista av återkommande fel. Kom överens om vem som ansvarar för den slutliga formuleringen när ett riktigt meddelande ska gå ut.']
        ],
        exercise: 'Ge en kollega som missade övningen ett nytt fiktivt driftbesked med ändrad stängningstid och det gamla utkastet. Kan kollegan upptäcka den gamla tiden med hjälp av checklistan? Använd återkopplingen för att förtydliga en kontrollpunkt.'
      },
      da: {
        title: 'AI-færdigheder for hospitalsadministrationen: skriv en besøgsbesked på 30 minutter',
        summary: 'Kan en kollega omskrive en driftsmeddelelse til en forståelig besked og fange en opdigtet oplysning? Øvelsen bruger fiktivt materiale og giver en tjekliste til næste tekst.',
        sections: [
          ['De første fem minutter: bliv enige om fakta', 'Find på et hospital, og skriv en kort driftsmeddelelse. Østindgangen er lukket tirsdag fra klokken 9 til 12. Besøgende kan bruge vestindgangen. Der står intet om parkering. Brug kun dette opdigtede materiale i et skriveværktøj, som arbejdspladsen har godkendt. Hvis I mangler et værktøj, kan underviseren medbringe et udkast på papir.'],
          ['De næste ti minutter: skriv til en besøgende', 'Gå sammen to og to, og bed om en besked til hjemmesiden på højst 60 ord. Den ene læser som førstegangsbesøgende. Den anden finder belæg i driftsmeddelelsen for hvert tidspunkt, hver anvisning og hvert løfte. Vis derefter et udkast, hvor underviseren med vilje har lovet gratis parkering. Bed gruppen udpege sætningen uden belæg og afgøre, hvem der kan bekræfte parkeringsforholdene inden offentliggørelse.'],
          ['Det sidste kvarter: godkend eller send retur', 'Byt udkast med et andet par. Den, der gennemgår teksten, kontrollerer dag, tid, indgang og tydelighed, markerer udokumenterede oplysninger og noterer beslutningen. Tag tid på både skrivning og gennemgang, så gruppen kan se, hvor arbejdstiden blev brugt. Saml de rettede beskeder, og brug de tilbagevendende fejl til en kort tjekliste. Aftal, hvem der er ansvarlig for den endelige ordlyd i en rigtig besøgsbesked.']
        ],
        exercise: 'Giv en kollega, der ikke var med, en ny fiktiv driftsmeddelelse med ændret lukketid og det gamle udkast. Kan kollegaen opdage den gamle tid alene ved hjælp af tjeklisten? Brug tilbagemeldingen til at præcisere ét uklart punkt.'
      }
    }
  }
];
