import { beginners } from './beginners.mjs';
import { relatedGuide } from './knowledge.mjs';
import { courseTopics, searchCopy } from './search-copy.mjs';
import { trainingLanguages } from './training-languages.mjs';
import { callCopy, callUrl, topicKeys } from './call.mjs';
import { renderHeader, renderFooter } from './frame.mjs';
export const courseSlugs = courseTopics;

const pdfs = {
  beginners: 'Beginners',
  youth: 'TeenTech',
  teachers: 'Teacher',
  hospital: 'Hospital',
  public: 'PublicConsultation',
};

const ui = {
  he: { home:'עמוד הבית', skip:'דלגו לתוכן', lang:'שפת האתר', pdf:'הורדת הסילבוס בעברית', school:'בקשת פיילוט לבית הספר', team:'בקשת שיחת התאמה לצוות', who:'קהל היעד', format:'היקף', language:'שפות הוראה', skills:'מה תוכלו לעשות בסיום', outline:'מה עושים במפגשים', take:'מה לוקחים מהקורס', sample:'מתוך תרגיל לדוגמה', more:'קורסים נוספים', close:'חזרה לעמוד הבית', coordinator:'הפנייה לבית הספר נשלחת באמצעות רכזת או רכז בגירים. די לציין את טווח הגילים של הקבוצה.', group:'בחרו את שפת ההוראה ואת הדוגמה המקצועית עם מנחה הקורס.' },
  en: { home:'Home', skip:'Skip to content', lang:'Website language', pdf:'Download the syllabus in English', school:'Enquire about a school pilot', team:'Request a team consultation', who:'Who it’s for', format:'Time commitment', language:'Teaching languages', skills:'What you’ll be able to do', outline:'Inside the sessions', take:'What you take away', sample:'Sample exercise', more:'Explore other courses', close:'Return home', coordinator:'An adult school coordinator can enquire using the group’s age range.', group:'Agree on the teaching language and a workplace example with the facilitator.' },
  sv: { home:'Startsidan', skip:'Hoppa till innehållet', lang:'Webbplatsens språk', pdf:'Ladda ner kursplanen på svenska', school:'Fråga om ett pilotpass för skolan', team:'Boka ett inledande samtal', who:'Målgrupp', format:'Omfattning', language:'Undervisningsspråk', skills:'Efter kursen kan ni', outline:'Det här gör vi under kursen', take:'Det här får ni med er', sample:'Exempel ur en övning', more:'Utforska fler kurser', close:'Till startsidan', coordinator:'En vuxen kontaktperson på skolan kan skicka förfrågan. Det räcker att ange gruppens åldersspann.', group:'Välj undervisningsspråk och ett exempel från verksamheten tillsammans med kursledaren.' },
  da: { home:'Forsiden', skip:'Gå til indhold', lang:'Hjemmesidens sprog', pdf:'Hent kursusplanen på dansk', school:'Spørg om et pilotforløb for skolen', team:'Anmod om en afklarende samtale', who:'Målgruppe', format:'Omfang', language:'Undervisningssprog', skills:'Efter kurset kan I', outline:'Det arbejder vi med', take:'Det får I med jer', sample:'Eksempel fra en øvelse', more:'Udforsk flere kurser', close:'Til forsiden', coordinator:'En voksen kontaktperson på skolen kan sende forespørgslen. Det er nok at angive gruppens alderstrin.', group:'Vælg undervisningssprog og et eksempel fra jeres arbejdsplads sammen med underviseren.' },
};

const courses = {
  beginners,
  youth: {
    he: {
      title:'הייתם משתפים את זה?', label:'Teen Tech AI', lead:'בדקו מי עומד מאחורי סרטון, גלו כמה באמת עולה המבצע ובנו אתר שעוזר לחבר לכיתה לקבל החלטה.',
      who:'כיתות ח׳–ט׳ · עד 24 תלמידים', time:'4 מפגשים בני 90 דקות',
      skills:['להצליב טענה מול מקור עצמאי ולהסביר מה עדיין אינו ידוע.','לחשב מחיר כולל ולבחור תגובה בטוחה לבקשת פרטים.','לשנות אתר בעזרת AI, להזין בו שתי דוגמאות ולבדוק אם הוא מחזיר את התוצאה הצפויה.'],
      units:['חוקרים סרטון ואת מקורו','משווים מבצעים ומתרגלים תגובה לפישינג','בונים אתר מתבנית ובודקים שני מקרי שימוש','מחליפים אתרים, מתעדים משוב ומשפרים'],
      take:'כל זוג יוצא עם אתר שבנה, תיעוד קצר של המקורות שבדק ושיפור שעשה אחרי שחברים לכיתה ניסו את האתר.',
      sample:'איזו הצעה נכנסת בתקציב של 25 אירו?', rows:[['הצעה א׳','€19.90 + €6.10'],['הצעה ב׳','€24.00']], note:'כולל דמי המשלוח, המחיר בהצעה א׳ הוא 26 אירו. מה עוד תבדקו על המוכר?',
    },
    en: {
      title:'Would you share it?', label:'Teen Tech AI', lead:'Investigate a video, find the real cost of a deal and build a website that helps a classmate make a decision.',
      who:'Grades 8–9 · up to 24 students', time:'4 sessions of 90 minutes',
      skills:['Check a claim against an independent source and explain what is still unknown.','Calculate the full price and respond safely to requests for personal details.','Edit a website with AI and test two inputs yourself.'],
      units:['Investigate a video and its source','Compare offers and practise responding to phishing','Build a website from a template and test two cases','Swap projects, observe a user and improve the design'],
      take:'Each pair finishes with a working website, a short evidence log and a documented change made after user testing.',
      sample:'Which offer fits a €25 budget?', rows:[['Offer A','€19.90 + €6.10'],['Offer B','€24.00']], note:'After delivery, offer A costs €26. What else would you check about the seller?',
    },
    sv: {
      title:'Skulle du dela det här?', label:'Teen Tech AI', lead:'Granska en video, räkna ut vad ett erbjudande faktiskt kostar och bygg en webbplats som hjälper en klasskamrat att fatta beslut.',
      who:'Årskurs 8–9 · högst 24 elever', time:'4 pass à 90 minuter',
      skills:['Kontrollera ett påstående mot en oberoende källa och förklara vad som fortfarande är oklart.','Räkna ut totalpriset och bemöta en förfrågan om personuppgifter på ett säkert sätt.','Ändra en webbplats med AI och själv testa två inmatningar.'],
      units:['Granska en video och dess källa','Jämför erbjudanden och öva på att hantera nätfiske','Bygg en webbplats från en mall och testa två fall','Byt projekt, följ en användare och förbättra webbplatsen'],
      take:'Varje par får en fungerande webbplats, en kort källogg och en dokumenterad förbättring efter ett användartest.',
      sample:'Vilket erbjudande ryms inom 25 euro?', rows:[['Erbjudande A','€19,90 + €6,10'],['Erbjudande B','€24,00']], note:'Med frakt kostar det första erbjudandet 26 euro. Vad vill du veta om säljaren?',
    },
    da: {
      title:'Ville du dele det?', label:'Teen Tech AI', lead:'Undersøg en video, find den reelle pris på et tilbud og byg en hjemmeside, der hjælper en klassekammerat med at træffe et valg.',
      who:'8.–9. klasse · op til 24 elever', time:'4 gange 90 minutter',
      skills:['Tjekke en påstand hos en uafhængig kilde og forklare, hvad der stadig er usikkert.','Beregne den samlede pris og håndtere en anmodning om personoplysninger sikkert.','Ændre en hjemmeside med AI og selv afprøve to indtastninger.'],
      units:['Undersøg en video og dens kilde','Sammenlign tilbud og øv jer i at håndtere phishing','Byg en hjemmeside fra en skabelon og afprøv to eksempler','Byt projekter, følg en bruger og forbedr hjemmesiden'],
      take:'Hvert makkerpar får en fungerende hjemmeside, en kort kildelog og en dokumenteret ændring efter en brugertest.',
      sample:'Hvilket tilbud holder sig inden for 25 euro?', rows:[['Tilbud A','€19,90 + €6,10'],['Tilbud B','€24,00']], note:'Med fragt koster tilbud A 26 euro. Hvad vil du ellers tjekke om sælgeren?',
    },
  },
  teachers: {
    he: {
      title:'השיעור של השבוע הבא', label:'AI לצוותי הוראה', lead:'בחרו שיעור שתלמדו בשבוע הבא. בסדנה תכינו שתי פעילויות לאותה מטרת לימוד, ואחרי שתנסו אותן בכיתה, תבדקו מה התלמידים הבינו ומה כדאי לשנות.',
      who:'עד 12 מורים מאותו תחום דעת', time:'שני מפגשים בני 90 דקות וחצי שעה של עבודה עצמאית',
      skills:['לנסח יעד משותף לשתי דרכי הוראה.','לבדוק טיוטת AI מול חומר לימוד מאושר.','לשפר פעילות על בסיס תשובות מכרטיס יציאה.'],
      units:['מתכננים ומאמתים · 90 דקות','מתאימים ומנתחים · 30 דקות עצמאיות. ההוראה עצמה בשיעור הרגיל','מפרשים תשובות, מתקנים ומעבירים לעמית · 90 דקות'],
      take:'ערכת שיעור לעריכה עם שתי פעילויות, תשובון, כרטיס יציאה והערה שמסבירה מה שופר.',
      sample:'איך נדע אם התלמידים הבינו מהי התאדות?', rows:[['טיוטת AI','״מים מתאדים רק ברתיחה״'],['כרטיס יציאה','לאן עברו המים בשלולית שהתייבשה?']], note:'המורה בודק את הטענה מול המקור, ואז מחפש בתשובה הסבר למעבר ממים נוזליים לאדי מים.',
    },
    en: {
      title:'Next week’s lesson', label:'AI for teaching teams', lead:'Start with a lesson you will teach this week. Design two ways to teach the same idea, then use students’ answers to decide what to improve.',
      who:'Up to 12 teachers in the same subject', time:'2 × 90 minutes plus 30 minutes of independent work',
      skills:['Define one learning goal for two teaching approaches.','Check an AI draft against an approved subject source.','Revise an activity using evidence from exit tickets.'],
      units:['Plan and verify · 90 minutes','Adapt and analyse · 30 minutes independently. Teach during normal class time','Interpret, revise and hand the lesson to a colleague · 90 minutes'],
      take:'An editable lesson pack with two activities, an answer guide, an exit ticket and a note explaining the improvement.',
      sample:'What would show that a student understands evaporation?', rows:[['AI draft','“Water evaporates only when it boils.”'],['Exit ticket','Where did the water in the drying puddle go?']], note:'The teacher checks the draft against a source, then looks for an explanation of liquid water turning into vapour.',
    },
    sv: {
      title:'Nästa veckas lektion', label:'AI för lärarlag', lead:'Utgå från en lektion du ska hålla i veckan. Planera två sätt att undervisa om samma sak och använd elevernas svar för att förbättra lektionen.',
      who:'Högst 12 lärare inom samma ämne', time:'2 × 90 minuter och 30 minuters eget arbete',
      skills:['Formulera ett gemensamt lärandemål för två arbetssätt.','Granska ett AI-utkast mot en tillförlitlig ämneskälla.','Förbättra en uppgift utifrån elevernas avslutande svar.'],
      units:['Planera och granska · 90 minuter','Anpassa och analysera · 30 minuter enskilt. Undervisningen sker på ordinarie lektionstid','Tolka svar, bearbeta och lämna över till en kollega · 90 minuter'],
      take:'Ett redigerbart lektionspaket med två aktiviteter, facit, en avslutande kontrollfråga och en motivering till en förbättring.',
      sample:'Hur ser vi att eleven förstår avdunstning?', rows:[['AI-utkast','”Vatten avdunstar bara när det kokar.”'],['Kontrollfråga','Vart tog vattnet i den torkande pölen vägen?']], note:'Läraren granskar påståendet mot en källa och letar sedan efter en förklaring till hur flytande vatten blir vattenånga.',
    },
    da: {
      title:'Næste uges lektion', label:'AI for lærerteams', lead:'Tag udgangspunkt i en lektion, du skal holde i denne uge. Planlæg to veje til samme læringsmål, og brug elevernes svar til at forbedre undervisningen.',
      who:'Op til 12 lærere i samme fag', time:'2 × 90 minutter og 30 minutters selvstændigt arbejde',
      skills:['Formulere ét læringsmål for to undervisningsformer.','Tjekke et AI-udkast mod en godkendt faglig kilde.','Forbedre en aktivitet ud fra elevernes svar på en afsluttende opgave.'],
      units:['Planlæg og tjek indholdet · 90 minutter','Tilpas og analysér · 30 minutter på egen hånd. Undervis i den almindelige lektion','Fortolk svar, ret materialet og giv det til en kollega · 90 minutter'],
      take:'Et redigerbart undervisningsmateriale med to aktiviteter, facit, en kort afsluttende opgave og en begrundelse for en forbedring.',
      sample:'Hvordan ser vi, at eleven forstår fordampning?', rows:[['AI-udkast','”Vand fordamper kun, når det koger.”'],['Afsluttende opgave','Hvor blev vandet i den udtørrede pyt af?']], note:'Læreren tjekker påstanden mod en kilde og ser derefter efter en forklaring på, hvordan flydende vand bliver til vanddamp.',
    },
  },
  hospital: {
    he: {
      title:'המשמרת הראשונה', label:'AI למדריכי קליטה ושירות', lead:'הפכו שיחה מאתגרת בדלפק המרפאה לסימולציה בת חמש דקות שמדריך אחר יוכל להעביר לעובד חדש.',
      who:'6–10 מדריכי קליטה ושירות בבתי חולים', time:'שני מפגשים בני שעתיים ושעה של עבודה עצמאית',
      skills:['להגדיר התנהגות שאפשר לראות או לשמוע בשיחה.','לתכנן שני רגעים שבהם העובד צריך לבחור איך להגיב, ולבדוק שהתגובות תואמות את נוהלי היחידה.','לתת משוב על מה שהעובד אמר ועשה, ולשפר את התרגיל אחרי שעמית התנסה בהעברתו.'],
      units:['כתיבת תרחיש ותדריך עם כלי AI · 120 דקות','עמית מעביר את התרגיל ומתעד מה עבד ומה דרש הסבר נוסף · שעה של עבודה עצמאית','משוחחים על התרגול, משפרים את חומרי ההנחיה ומעבירים אותם למדריך נוסף · שעתיים'],
      take:'תיק הנחיה לעריכה הכולל תרחיש, תרשים החלטות, כרטיסי תפקיד, שאלות תחקיר ודף תצפית.',
      sample:'מלווה ניגש לדלפק העמוס ושואל מדוע התור נדחה. איך מגיבים?', rows:[['רגע ההחלטה','איזו שאלה אפשר לברר כאן?'],['משוב המדריך','מה העובד הציע, ובאיזה ערוץ?']], note:'כל הפרטים בדיוניים. המדריכים בודקים את הניסוח מול נוהל היחידה ושומרים על גבולות התפקיד.',
    },
    en: {
      title:'The first shift', label:'AI for onboarding and service trainers', lead:'Turn a difficult conversation at an outpatient desk into a five-minute simulation another trainer can run with a new colleague.',
      who:'6–10 hospital onboarding or service trainers', time:'2 × 120 minutes plus one hour independently',
      skills:['Define a behaviour a trainer can see or hear.','Write two decision points and check suggested wording against local procedure.','Give feedback on behaviour and improve the exercise after a peer run.'],
      units:['Write the scenario and briefing with AI · 120 minutes','Run a peer trial and record observations · 60 minutes independently','Debrief, edit and hand over the kit · 120 minutes'],
      take:'An editable facilitation kit with a scenario, decision map, role cards, debrief questions and an observation sheet.',
      sample:'At a busy desk, a visitor asks why an appointment was postponed.', rows:[['Decision point','What can the worker discuss here?'],['Trainer prompt','What did the worker offer, and through which channel?']], note:'The case is fictional. Trainers check each proposed response against local procedure and the worker’s role.',
    },
    sv: {
      title:'Första arbetspasset', label:'AI för handledare i vården', lead:'Gör ett svårt samtal i mottagningens reception till en fem minuter lång övning som en kollega kan hålla för en nyanställd.',
      who:'6–10 handledare för introduktion och bemötande på sjukhus', time:'2 × 120 minuter och en timmes eget arbete',
      skills:['Beskriva ett beteende som handledaren kan se eller höra.','Skriva två beslutspunkter och granska replikerna mot verksamhetens rutiner.','Ge återkoppling på beteendet och omarbeta övningen efter en provomgång.'],
      units:['Skriv scenario och introduktion med AI · 120 minuter','Prova övningen med en kollega och anteckna · 60 minuter självständigt','Reflektera, bearbeta och lämna över övningen · 120 minuter'],
      take:'Ett redigerbart handledarmaterial med scenario, beslutsträd, rollkort, reflektionsfrågor och observationsunderlag.',
      sample:'En medföljare frågar i en fullsatt reception varför ett besök har skjutits upp.', rows:[['Beslutspunkt','Vad kan medarbetaren prata om här?'],['Återkoppling','Vad erbjöd medarbetaren och på vilket sätt?']], note:'Situationen är påhittad. Handledarna granskar svaren utifrån lokala rutiner och medarbetarens befogenheter.',
    },
    da: {
      title:'Den første vagt', label:'AI for oplæringsansvarlige på hospitaler', lead:'Gør en svær samtale ved skranken i ambulatoriet til en øvelse på fem minutter, som en kollega kan gennemføre med en ny medarbejder.',
      who:'6–10 oplæringsansvarlige inden for service og introduktion på hospitaler', time:'2 × 120 minutter og en times selvstændigt arbejde',
      skills:['Beskrive en handling, som en vejleder kan se eller høre.','Skrive to beslutningspunkter og tjekke svarene mod lokale procedurer.','Give feedback på adfærd og forbedre øvelsen efter en afprøvning.'],
      units:['Skriv scenarie og introduktion med AI · 120 minutter','Afprøv øvelsen med en kollega og tag noter · 60 minutter selvstændigt','Saml op, redigér og giv materialet videre · 120 minutter'],
      take:'Et redigerbart vejledermateriale med scenarie, beslutningstræ, rollekort, refleksionsspørgsmål og observationsark.',
      sample:'Ved en travl skranke spørger en ledsager, hvorfor en aftale er udsat.', rows:[['Beslutningspunkt','Hvad kan medarbejderen tale om her?'],['Vejlederens spørgsmål','Hvad tilbød medarbejderen, og hvordan?']], note:'Situationen er fiktiv. Vejlederne tjekker svarene mod lokale procedurer og medarbejderens beføjelser.',
    },
  },
  public: {
    he: {
      title:'מי נשאר מחוץ לסיכום?', label:'AI לצוותי שיתוף ציבור', lead:'התקבלו שלושים תגובות על הצעה של הרשות. איך מסכמים אותן בעמוד אחד לקראת ישיבה, בלי להחמיץ הסתייגות שהופיעה רק באחת התגובות?',
      who:'עד עשרה משתתפים מקרב עובדי הרשות וצוותי שיתוף הציבור', time:'2 מפגשים בני 90 דקות',
      skills:['לשייך תגובה לכמה נושאים ולזהות תמיכה מותנית.','לבדוק כל ציטוט מול המקור ולמצוא טענה שנשמטה.','להסביר אילו עמדות מיוצגות בתגובות ולהראות איך הגיעו מהן למסקנות שבתקציר.'],
      units:['קריאת התגובות, בניית מפתח נושאים וקידוד · 90 דקות','כתיבת תקציר, אימות כל הציטוטים וביקורת מדגמית · 90 דקות'],
      take:'תקציר בן עמוד לישיבה, טבלה שמקשרת כל עמדה לתגובות המקוריות ותיעוד של הבדיקות והתיקונים שערכתם.',
      sample:'״אני בעד פתיחה בערב, בתנאי שלא יסגרו ביום שישי.״', rows:[['מקור','תגובה 17 · תרחיש בדוי'],['קידוד','תמיכה בפתיחת ערב והתנגדות לסגירת שישי']], note:'אפשר לקודד שתי עמדות ולשייך את שתיהן לאותה תגובה.',
    },
    en: {
      title:'Whose voice is missing?', label:'AI for public consultation teams', lead:'Thirty responses arrive for a public consultation. Prepare a one-page brief that preserves even a reservation raised by a single respondent.',
      who:'Up to 10 local government or public engagement staff', time:'2 sessions of 90 minutes',
      skills:['Assign more than one theme to a response and recognise conditional support.','Verify every quotation against the source and spot an omitted view.','Explain limits of representation and produce a traceable brief.'],
      units:['Read responses, define themes and code the data · 90 minutes','Write the brief, verify quotations and sample theme assignments · 90 minutes'],
      take:'A one-page brief, a response matrix and an audit log recording who checked what and why the summary changed.',
      sample:'“I support evening opening if it does not mean closing on Fridays.”', rows:[['Source','Response 17 · fictional scenario'],['Coding','Supports evening opening and opposes Friday closure']], note:'Two positions can be recorded and traced to the same response.',
    },
    sv: {
      title:'Vems röst saknas i sammanfattningen?', label:'AI för medborgardialog', lead:'Trettio svar har kommit in till ett samråd. Skriv ett beslutsunderlag på en sida där även ett enskilt förbehåll blir synligt.',
      who:'Högst 10 medarbetare inom kommun eller medborgardialog', time:'2 pass à 90 minuter',
      skills:['Koppla ett svar till flera teman och se när stödet är villkorat.','Kontrollera varje citat mot källan och hitta en utelämnad åsikt.','Redovisa vilka perspektiv materialet omfattar och skriva ett spårbart underlag.'],
      units:['Läs svaren, definiera teman och koda materialet · 90 minuter','Skriv underlaget, verifiera citaten och gör stickprov i kodningen · 90 minuter'],
      take:'Ett beslutsunderlag på en sida, en svarsmatris och en granskningslogg över kontroller och ändringar.',
      sample:'”Jag är för kvällsöppet om det inte innebär att vi stänger på fredagar.”', rows:[['Källa','Svar 17 · fiktivt exempel'],['Kodning','För kvällsöppet och emot fredagsstängt']], note:'Två ståndpunkter kan dokumenteras och spåras till samma svar.',
    },
    da: {
      title:'Hvem mangler i sammenfatningen?', label:'AI for teams inden for borgerinddragelse', lead:'Der er kommet 30 høringssvar. Skriv et beslutningsoplæg på én side, hvor også et enkelt forbehold bliver synligt.',
      who:'Op til 10 medarbejdere i en kommune eller i borgerinddragelse', time:'2 gange 90 minutter',
      skills:['Knytte et svar til flere emner og opdage betinget opbakning.','Tjekke hvert citat mod kilden og finde en udeladt holdning.','Beskrive begrænsninger i materialet og skrive et efterprøvbart oplæg.'],
      units:['Læs svarene, definér emner og kod materialet · 90 minutter','Skriv oplægget, tjek citater og tag stikprøver af kodningen · 90 minutter'],
      take:'Et oplæg på én side, en svarmatrix og en log over, hvad der blev kontrolleret og ændret.',
      sample:'”Jeg støtter aftenåbent, hvis det ikke betyder, at vi lukker om fredagen.”', rows:[['Kilde','Svar 17 · fiktivt eksempel'],['Kodning','For aftenåbent og imod lukning om fredagen']], note:'To holdninger kan registreres og spores tilbage til det samme svar.',
    },
  },
};

const languages = { en:'English', he:'עברית', sv:'Svenska', da:'Dansk' };
const symbols = { beginners:'✳', youth:'↗', teachers:'✳', hospital:'↔', public:'≋' };

function escapeHtml(value) {
  const entities = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' };
  return String(value).replace(/[&<>"]/g, char => entities[char]);
}
function homeUrl(lang) {
  return lang === 'en' ? '/' : '/' + lang + '/';
}
function courseUrl(lang, slug) {
  return homeUrl(lang) + 'courses/' + slug + '/';
}

export function renderCourse(locale, slug) {
  const lang = String(locale).toLowerCase();
  if (!Object.hasOwn(ui,lang) || !courseSlugs.includes(slug)) throw new Error('Unknown course or language: ' + locale + '/' + slug);
  const c = courses[slug][lang];
  const courseName = searchCopy[lang].course[courseTopics.indexOf(slug)];
  const t = ui[lang];
  const directory = '/assets/brand-home/';
  const home = homeUrl(lang);
  const school = slug === 'youth' || slug === 'teachers';
  const info = callCopy[lang];
  const contact = callUrl(lang, slug, 'course');
  const closeCall = callUrl(lang, slug, 'course-outcome');
  const cta = info.cta;
  const proposal = {he:'training', en:'training', sv:'sv/utbildning-forelasningar', da:'da/kurser-foredrag'}[lang];
  const written = school ? '<a class="course-written" href="https://sundaibot.com/' + proposal + '/#proposal">' + info.written + '</a>' : '';
  const pdf = directory + 'SundAI_' + pdfs[slug] + '_Syllabus_' + lang.toUpperCase() + '.pdf';
  const alternates = Object.keys(languages).map(l => '<link rel="alternate" hreflang="' + l + '" href="https://sundaibot.com' + courseUrl(l,slug) + '">').join('');

  const facts = [[t.who,c.who],[t.format,c.time],[t.language,trainingLanguages[lang].offer]].map(([term,val]) => '<div><dt>' + escapeHtml(term) + '</dt><dd>' + escapeHtml(val) + '</dd></div>').join('');
  const example = c.rows.map(([label,val]) => '<div><dt>' + escapeHtml(label) + '</dt><dd><bdi>' + escapeHtml(val) + '</bdi></dd></div>').join('');
  const skills = c.skills.map(s => '<li>' + escapeHtml(s) + '</li>').join('');
  const units = c.units.map(s => '<li>' + escapeHtml(s) + '</li>').join('');
  const teacher = c.teacher ? '<div class="course-teacher"><h2>' + escapeHtml(c.teacherTitle) + '</h2><p>' + escapeHtml(c.teacher) + '</p></div>' : '';
  const guide = relatedGuide(lang, 'courses/' + slug + '/');
  const guideLink = guide ? '<p><a href="' + escapeHtml(guide.url) + '">' + escapeHtml(guide.title) + '</a></p>' : '';
  const more = courseSlugs.filter(s => s!==slug).map(k=>'<a href="' + courseUrl(lang,k) + '">' + escapeHtml(searchCopy[lang].course[courseTopics.indexOf(k)]) + '<span aria-hidden="true">↗</span></a>').join('');
  const direction = lang === 'he' ? 'rtl' : 'ltr';
  return '<!doctype html><html lang="' + lang + '" dir="' + direction + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#101012"><title>' + escapeHtml(c.seoTitle || courseName) + ' | SundAI</title><meta name="description" content="' + escapeHtml(c.description || c.lead) + '"><link rel="canonical" href="https://sundaibot.com' + courseUrl(lang,slug) + '">' + alternates + '<link rel="alternate" hreflang="x-default" href="https://sundaibot.com' + courseUrl('en',slug) + '"><link rel="stylesheet" href="' + directory + 'courses.css"><link rel="stylesheet" href="' + directory + 'frame.css"><script defer src="' + directory + 'frame.js"></script></head><body class="course-' + slug + '"><a class="skip" href="#main">' + t.skip + '</a>'+renderHeader(lang,{innerPage:true,course:slug})+'<main id="main"><section class="intro"><div class="course-wrap intro-grid"><div class="intro-copy"><a class="crumb" href="' + home + '">SundAI <span aria-hidden="true">/</span> ' + t.home + '</a><p class="category"><span aria-hidden="true">' + symbols[slug] + '</span>' + escapeHtml(c.label) + (c.title === courseName ? '' : ' · ' + escapeHtml(c.title)) + '</p><h1>' + escapeHtml(courseName) + '</h1><p class="lead">' + escapeHtml(c.lead) + '</p><div class="actions"><a class="btn filled" href="' + contact + '">' + cta + '</a><a class="btn outlined" href="' + pdf + '" download>' + t.pdf + '<span aria-hidden="true">↓</span></a></div><p class="course-call-meta">' + info.footnote + '</p></div><aside class="example"><div class="example-window"><p class="sample-label">' + t.sample + '</p><h2>' + escapeHtml(c.sample) + '</h2><dl>' + example + '</dl><p class="example-note">' + escapeHtml(c.note) + '</p></div></aside></div></section><div class="facts"><dl class="course-wrap facts-grid">' + facts + '</dl></div><section class="programme course-wrap"><div><h2>' + escapeHtml(c.skillsHeading || t.skills) + '</h2><ul class="skills">' + skills + '</ul>' + teacher + '</div><div><h2>' + t.outline + '</h2><ol class="units">' + units + '</ol></div></section><section class="deliverable"><div class="course-wrap take"><div><h2>' + t.take + '</h2><p>' + escapeHtml(c.take) + '</p></div><div><a class="btn white-btn" href="' + closeCall + '">' + cta + '</a><p class="fine">' + info.outcomes[topicKeys.indexOf(slug)] + '</p>' + written + '</div></div></section><section class="course-wrap related"><h2>' + t.more + '</h2><nav>' + more + '</nav>' + guideLink + '</section></main>'+renderFooter(lang,{innerPage:true,course:slug,showClose:false})+'</body></html>';
}
