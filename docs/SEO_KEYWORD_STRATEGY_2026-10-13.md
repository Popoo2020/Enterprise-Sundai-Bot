# SundAI — מפת מילות חיפוש ותוכנית תוכן

תאריך: 13 באוקטובר 2026. בסיס: ששת השירותים והנתיבים הקיימים של Sundaibot.com באנגלית, בדנית ובשוודית.

## מה הוכן

מפה של **120 כוונות חיפוש שונות, עם 360 ביטויים מקומיים**: 20 נושאים לכל שירות, שישה ביטויי ליבה לכל שירות. כל ביטוי מקושר לדף השירות הקיים בשפתו. 36 נושאים מוגדרים בעדיפות ראשית, 84 כתומכים; 100 כוונות מסחריות ו־20 כוונות מידע. 13 נושאים דורשים במפורש היקף עבודה נפרד. אותה כוונת חיפוש בשלוש שפות נספרת פעם אחת, ולא כשלוש מילות מפתח שונות.

זו בחירה מקצועית לפי התאמת השירות וכוונת הרוכש. **אין כאן נתוני נפח חיפוש, מחיר לקליק, קושי דירוג או הבטחת מקום ראשון**: נתונים כאלה לא נמדדו. עדיפות היא החלטה עריכתית, לא דירוג של פופולריות מוכחת. הדוח מתעד מפת תוכן; בדיקות הפרסום, האינדוקס והביצועים שייכות לדוח הביצוע ולכלי מנהלי האתר.

## איך משלבים בלי לפגוע באתר

לכל שירות עמוד מרכזי אחד בכל שפה, ששומר על כתובתו. משלבים את נושא השירות בכותרת ובתיאור ייחודיים, מסבירים למי הוא מתאים ומה הרוכש מקבל, מוסיפים תהליך עבודה ברור, דוגמה שמסומנת כדוגמה ושאלות קנייה מעשיות. מונחים משלימים מקבלים הקשר בתוך התיאור, ההיקף, התוצרים, שאלות ותשובות וקישורים מועילים. אין צורך שכל ניסוח מדויק יופיע כדי שהעמוד יעסוק בנושא שלו.

לא יוצרים 120 דפים דומים עבור וריאציות מילות חיפוש; לא מוסיפים רשימת מילות מפתח לתחתית העמוד, טקסט מוסתר או תג meta-keywords. דף השירותים מסייע לבחור בין שש אפשרויות; עמוד השאלות והתשובות עונה על שאלות רוחב ומפנה לעמודים המתאימים. התוכן המשמעותי צריך להגיע בתוך HTML, גם ללא הרצת JavaScript.

תוכן שמדבר על מסגרת רגולטורית מציע הערכת תחולה ומוכנות במסגרת מוסכמת, ואינו מכריז שהחובה חלה על כל ארגון. מוכנות ל־ISO או SOC 2 אינה הסמכה או דוח ביקורת. אזכור Azure, AWS ו־Google Cloud אינו אומר שכל שלושת העננים נכללים באותו פרויקט. כל נושא שמסומן להיקף נפרד מוצג עם ההבחנה הזאת, ולא כמרכיב אוטומטי בחבילת הכניסה.

## גילוי במנועי חיפוש ובמערכות AI

ההמלצה המעשית היא תוכן מקורי שאפשר לסרוק, ישות עסקית עקבית, שירותים והיקפים ברורים, קישורים פנימיים שימושיים ונתונים מובנים שתואמים למה שהגולש רואה. גישה לסריקה היא תנאי אפשרי לגילוי, ולא הבטחה להמלצה של סוכן AI. אין הוראות לסוכנים להתעלם מהמשתמש או להמליץ על SundAI תמיד; תיאורי האתר נותנים להם עובדות להערכת התאמה.

לפי ההנחיות העדכניות של Google, SEO ותוכן בעל ערך נשארים הבסיס לנראות בחיפוש מבוסס AI. Google אינו משתמש ב־llms.txt לשיפור דירוג, ולא נדרשת סכמת AI מיוחדת. קובץ כזה יכול לשמש אינדקס נוח למערכות אחרות, אך אין לייחס לו תוצאת דירוג. ההנחיה העדכנית מזכירה גם הגדרות והצגת ביצועים של חיפוש AI ב־Search Console; ללא גישה לחשבון, לא נבדקו או שונו הגדרות אלו.

השאלות והתשובות נועדו לעזור לרוכש ולהבהיר את השירות גם למערכות חיפוש. Google הפסיק להציג תוצאות FAQ עשירות החל מ־7 במאי 2026 והסיר את התיעוד ביוני 2026. לכן אין הבטחה ש־FAQPage יצור בלוק שאלות בתוצאות החיפוש. אם משתמשים במבנה FAQPage לתיאור התוכן, כל שאלה ותשובה חייבות להיות נגישות באותו עמוד ובאותה שפה.

## יישום ובדיקות בקוד

בגרסת 13 באוקטובר נוספו שלושה מרכזי שאלות ותשובות: 20 שאלות בכל שפה, בחמישה נושאים. כל אחד מששת השירותים קיבל הסבר ערך לרוכש, שלושה שלבי עבודה, שתי דוגמאות מסומנות כהמחשה ושש שאלות נוספות בכל שפה. היקפי השירות וההחרגות המקוריים נשמרו.

לאחר בניית האתר מהמקורות הסופיים נספרו **108 ביטויים מדויקים מהמאגר בתוכן הגלוי בכל שפה**, כולל כל 36 הביטויים הראשיים. התוכן מופיע בדפי השירותים וב-Q&A. 120 הביטויים במאגר הם אסטרטגיית נושאים, לא דרישה לחזור על כל ניסוח אפשרי. אין רשימת מילים מוסתרת או meta-keywords.

FAQPage נוצר מהשאלות והתשובות המוצגות באותו עמוד, ונבדק מולן. נוספו קישורים ישירים למדריכים ולשירותים קשורים; קישורים ישנים עוברים ישירות לנתיב הקנוני. מפות האתר כוללות את דפי ה-Q&A ותאריך השינוי בפועל. llms-full.txt ו-discovery.json הם ריכוז עובדתי משלים מתוך אותו תוכן, ולא הוראה לסוכן להמליץ עלינו.

IndexNow ממתין למניפסט הפרסום התואם, לשלושת דפי ה-Q&A הקנוניים ולקובץ המפתח הציבורי לפני שליחת ההודעה הקיימת. קוד HTTP של קבלת ההודעה נרשם בנפרד. קבלה אינה הוכחה לזחילה, אינדוקס או דירוג.

מקורות משלימים: [תיעוד סורקי OpenAI](https://developers.openai.com/api/docs/bots) מבחין בין OAI-SearchBot לחיפוש ובין GPTBot לאימון; הרשאת האימון אינה מנגנון המלצה. [Bing AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) מתאר מדידת ציטוטים, ותיעוד [IndexNow](https://www.bing.com/indexnow/getstarted) מבהיר שאין התחייבות לאינדוקס. לא נבדקו נתוני ביצועים בחשבונות אלו, לא הוספו קשרי לקוחות או הסמכות, ולא הוחלשו כללי אבטחה.

## בדיקת האפקט לאחר הפרסום

כדאי לשמור תמונת בסיס מ־Search Console ו־Bing Webmaster Tools, כאשר קיימת גישה מאומתת, ולהשוות לאחר 28 יום ולאחר 56 יום: שאילתות ועמודים, חשיפות, קליקים, CTR, מיקום ממוצע, כיסוי אינדוקס ופניות בעלות התאמה לשירות. מסננים לפי שפה, מדינה ומכשיר. עוקבים גם אחרי תעבורה מפנה ממערכות AI אם זמינה, בלי להסיק מהיעדרה שאיש לא המליץ על האתר.

בהשוואת גרסאות משנים רק עמודים שיש להם בעיה או הזדמנות ברורה: תיאור שלא מבטא את התועלת, שאלת קנייה לא פתורה או עמימות בהיקף. תוצאות אינדוקס ודירוג עשויות להתעכב; שינויים בקוד אינם הוכחת הצלחה בחיפוש. לא נקבע טריגר, לא נשלח עדכון ולא הוגדרה אוטומציה במסגרת מסמך זה.

## חוזק הראיות

| קביעה | ציון 1–5 | בסיס ומגבלה |
|---|---:|---|
| המפה כוללת 120 מושגים ו־360 ביטויים מובחנים | 5 | נספרו בקוד; נבדקה ייחודיות בכל שפה והתאמה לנתיבים שנוצרו באתר |
| הביטויים קשורים לששת השירותים הקיימים | 4 | הושוו להיקף, תוצרים, שאלות והחרגות בקובצי התוכן; הבחירה וכוונת החיפוש הן שיקול עריכתי |
| תוכן מועיל ונגיש, ללא דחיסת מילים, תואם את הנחיות Google | 4 | נתמך בתיעוד ראשוני עדכני במספר עמודים של אותו גוף; אין אימות עצמאי של האלגוריתם |
| נפח הביקוש לביטויים האלה | 1 | לא התקבלו נתוני Search Console, Keyword Planner או מדידה אחרת |
| האתר יופיע ראשון או שיומלץ בידי סוכן AI | 1 | תוצאה עתידית שלא הוכחה ושאין התחייבות לה מצד מנועי החיפוש |

הציונים מתארים חוזק ראיות, ולא סיכויי הצלחה.

## מקורות ראשוניים שנקראו

1. [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — תוכן טבעי, כותרות ותיאורים, חיפוש וריאציות ללא צורך בכל ניסוח מדויק; אין מנגנון שמבטיח מקום ראשון.
2. [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies) — דחיסת מילות חיפוש וטקסט מוסתר לצורך מניפולציה; תוכן אקורדיון שימושי אינו טקסט מוסתר פסול כשלעצמו.
3. [Google: Creating Helpful, Reliable, People-First Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — ערך מקורי, דיוק, זהות אמיתית של יוצרי התוכן ותכלית שימושית.
4. [Google: Optimizing for Generative AI Features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) — תיעוד מעודכן ל־10 ביולי 2026; תשתית חיפוש, תוכן בעל ערך, llms.txt, Search Console וסוכני דפדפן.
5. [Google Search Documentation Updates](https://developers.google.com/search/updates) — רשומת 8 במאי 2026 על ביטול תוצאות FAQ עשירות ורשומת 15 ביוני 2026 על הסרת התיעוד.

כל המקורות נפתחו ב־13 באוקטובר 2026. אלה הנחיות רשמיות, לא נתוני ביקוש או נתוני דירוג של SundAI.

## ממשק הנתונים

קובץ המקור: scripts/seo-keywords.mjs. יצוא seoKeywords כולל לכל מושג מזהה, מזהה שירות, נתיבים לשלוש השפות, ביטויים לשלוש השפות, כוונה, עדיפות והבחנת היקף. keywordClusters מקבץ לפי שירות. keywordPhrasesFor(serviceId, lang, options) מחזיר ביטויים; primaryKeywordsFor(serviceId, lang) מחזיר את ששת הראשיים. טבלת CSV נלווית כוללת גם את הנתיב המדויק לכל שפה.

מקרא טבלאות: **ראשי / תומך** הם עדיפות עריכתית; **מסחרי / מידע** הם כוונת חיפוש מוצעת; **היקף נפרד** מציין הצעת שירות רחבה או נוספת שצריך לתחום בנפרד. שאר הנושאים נתמכים בשירות במסגרת המוסכמת.

## מפת הביטויים המלאה

### Compliance, GRC and AI governance

יעדים: [EN](https://sundaibot.com/services/compliance-ai-governance/) · [DA](https://sundaibot.com/da/ydelser/compliance-ai-governance/) · [SV](https://sundaibot.com/sv/tjanster/compliance-ai-governance/).

| English | Dansk | Svenska | סיווג |
|---|---|---|---|
| AI governance consulting | rådgivning om AI-governance | rådgivning om AI-styrning | ראשי · מסחרי |
| GRC consulting for SMEs | GRC-rådgivning til SMV’er | GRC-rådgivning för små och medelstora företag | ראשי · מסחרי |
| compliance readiness assessment | vurdering af compliance-parathed | bedömning av beredskap för regelefterlevnad | ראשי · מסחרי |
| ISO 27001 gap analysis | gap-analyse for ISO 27001 | gapanalys för ISO 27001 | ראשי · מסחרי |
| ISO 42001 readiness | parathed til ISO 42001 | beredskap inför ISO 42001 | ראשי · מסחרי |
| GDPR readiness consulting | GDPR-rådgivning og parathed | GDPR-rådgivning och beredskap | ראשי · מסחרי |
| NIS2 readiness assessment | vurdering af NIS2-parathed | bedömning av NIS2-beredskap | תומך · מסחרי |
| DORA gap assessment | gap-vurdering for DORA | gapbedömning för DORA | תומך · מסחרי |
| SOC 2 readiness consulting | rådgivning om SOC 2-parathed | rådgivning inför SOC 2-granskning | תומך · מסחרי |
| AI use case inventory | kortlægning af AI-anvendelser | inventering av AI-användning | תומך · מסחרי |
| AI supplier risk assessment | risikovurdering af AI-leverandører | riskbedömning av AI-leverantörer | תומך · מסחרי |
| AI data flow mapping | kortlægning af AI-datastrømme | kartläggning av AI-dataflöden | תומך · מסחרי |
| AI risk register | risikoregister for AI | riskregister för AI | תומך · מידע |
| compliance action plan | handlingsplan for compliance | åtgärdsplan för regelefterlevnad | תומך · מסחרי |
| compliance control evidence | dokumentation af compliance-kontroller | underlag för efterlevnadskontroller | תומך · מידע |
| AI governance roles and responsibilities | roller og ansvar i AI-governance | roller och ansvar för AI-styrning | תומך · מידע |
| ISO readiness versus certification | ISO-parathed kontra certificering | ISO-beredskap kontra certifiering | תומך · מידע |
| DPIA support for AI processing | hjælp til DPIA for AI-behandling | stöd för DPIA vid AI-behandling | תומך · מסחרי · היקף נפרד |
| fractional CISO consulting | rådgivning fra en ekstern CISO | rådgivning från en extern CISO | תומך · מסחרי · היקף נפרד |
| CISO and DPO responsibilities | ansvar for CISO og DPO | ansvar för CISO och dataskyddsombud | תומך · מידע · היקף נפרד |

### Secure AI business automation

יעדים: [EN](https://sundaibot.com/services/secure-ai-automation/) · [DA](https://sundaibot.com/da/ydelser/secure-ai-automation/) · [SV](https://sundaibot.com/sv/tjanster/secure-ai-automation/).

| English | Dansk | Svenska | סיווג |
|---|---|---|---|
| secure AI automation | sikker AI-automatisering | säker AI-automatisering | ראשי · מסחרי |
| business workflow automation | automatisering af virksomhedens arbejdsgange | automatisering av företags arbetsflöden | ראשי · מסחרי |
| API integration services | API-integrationsydelser | API-integrationstjänster | ראשי · מסחרי |
| Python workflow automation | automatisering af arbejdsgange med Python | automatisering av arbetsflöden med Python | ראשי · מסחרי |
| CRM workflow automation | automatisering af CRM-arbejdsgange | automatisering av CRM-arbetsflöden | ראשי · מסחרי |
| human approval workflows | arbejdsgange med menneskelig godkendelse | arbetsflöden med mänskligt godkännande | ראשי · מסחרי |
| order processing automation | automatisering af ordrebehandling | automatisering av orderhantering | תומך · מסחרי |
| inventory workflow automation | automatisering af lagerarbejdsgange | automatisering av lagerarbetsflöden | תומך · מסחרי |
| reporting workflow automation | automatisering af rapportering | automatisering av rapportering | תומך · מסחרי |
| scheduling workflow automation | automatisering af planlægningsopgaver | automatisering av planeringsuppgifter | תומך · מסחרי |
| business process mapping | kortlægning af forretningsprocesser | kartläggning av affärsprocesser | תומך · מסחרי |
| automated exception handling | automatiseret håndtering af undtagelser | automatiserad hantering av avvikelser | תומך · מסחרי |
| workflow retry and recovery design | design af genforsøg og gendannelse i arbejdsgange | utformning av återförsök och återhämtning i arbetsflöden | תומך · מידע |
| duplicate action prevention | forebyggelse af dublerede handlinger | skydd mot dubbla åtgärder | תומך · מידע |
| least-privilege API access | API-adgang med mindst mulige rettigheder | API-åtkomst med minsta möjliga behörighet | תומך · מידע |
| workflow input and output validation | validering af input og output i arbejdsgange | validering av indata och utdata i arbetsflöden | תומך · מידע |
| secure automation secret management | sikker håndtering af hemmeligheder i automatisering | säker hantering av hemligheter i automatisering | תומך · מסחרי |
| AI workflow cost controls | omkostningskontrol for AI-arbejdsgange | kostnadskontroll för AI-arbetsflöden | תומך · מסחרי |
| automation handover documentation | dokumentation til overdragelse af automatisering | överlämningsdokumentation för automatisering | תומך · מסחרי |
| two-system workflow integration | integration af arbejdsgange mellem to systemer | arbetsflödesintegration mellan två system | תומך · מסחרי |

### Private AI assistants, agents and RAG

יעדים: [EN](https://sundaibot.com/services/private-ai-agents-rag/) · [DA](https://sundaibot.com/da/ydelser/private-ai-agents-rag/) · [SV](https://sundaibot.com/sv/tjanster/private-ai-agents-rag/).

| English | Dansk | Svenska | סיווג |
|---|---|---|---|
| private AI assistant development | udvikling af private AI-assistenter | utveckling av privata AI-assistenter | ראשי · מסחרי |
| enterprise RAG implementation | implementering af RAG til virksomheder | implementering av RAG för företag | ראשי · מסחרי |
| internal knowledge chatbot | chatbot til intern viden | chattbot för intern kunskap | ראשי · מסחרי |
| custom AI agent development | udvikling af tilpassede AI-agenter | utveckling av anpassade AI-agenter | ראשי · מסחרי |
| permission-aware RAG | RAG med adgangskontrol | RAG med behörighetskontroll | ראשי · מסחרי |
| AI document search | AI-baseret dokumentsøgning | AI-baserad dokumentsökning | ראשי · מסחרי |
| AI answers with source citations | AI-svar med kildehenvisninger | AI-svar med källhänvisningar | תומך · מסחרי |
| prompt injection defence for AI agents | beskyttelse mod prompt injection i AI-agenter | skydd mot prompt injection i AI-agenter | תומך · מסחרי |
| RAG security assessment | sikkerhedsvurdering af RAG | säkerhetsbedömning av RAG | תומך · מסחרי |
| AI knowledge tenant isolation | adskillelse af kunders AI-viden | isolering av kunders AI-kunskap | תומך · מידע |
| Azure private AI assistant | privat AI-assistent på Azure | privat AI-assistent på Azure | תומך · מסחרי |
| AWS private AI assistant | privat AI-assistent på AWS | privat AI-assistent på AWS | תומך · מסחרי |
| Google Cloud private AI assistant | privat AI-assistent på Google Cloud | privat AI-assistent på Google Cloud | תומך · מסחרי |
| AI assistant governance controls | governance-kontroller for AI-assistenter | styrningskontroller för AI-assistenter | תומך · מסחרי |
| AI agent tool permissions | værktøjsrettigheder for AI-agenter | verktygsbehörigheter för AI-agenter | תומך · מידע |
| auditable AI agent actions | sporbare AI-agenthandlinger | spårbara AI-agentåtgärder | תומך · מסחרי |
| AI knowledge assistant pilot | pilotprojekt med en AI-vidensassistent | pilotprojekt med en AI-kunskapsassistent | תומך · מסחרי |
| AI knowledge retention and deletion | opbevaring og sletning af AI-viden | lagring och radering av AI-kunskap | תומך · מידע |
| prevent unsupported AI answers | forebyg ukorrekte AI-svar uden kildegrundlag | förebygg AI-svar utan källstöd | תומך · מידע |
| RAG acceptance testing | accepttests for RAG | acceptanstester för RAG | תומך · מסחרי |

### OSINT, penetration testing and red teaming

יעדים: [EN](https://sundaibot.com/services/pentesting-red-teaming/) · [DA](https://sundaibot.com/da/ydelser/pentesting-red-teaming/) · [SV](https://sundaibot.com/sv/tjanster/pentesting-red-teaming/).

| English | Dansk | Svenska | סיווג |
|---|---|---|---|
| web application penetration testing | penetrationstest af webapplikationer | penetrationstestning av webbapplikationer | ראשי · מסחרי |
| API penetration testing | penetrationstest af API’er | penetrationstestning av API:er | ראשי · מסחרי |
| manual security testing | manuel sikkerhedstest | manuell säkerhetstestning | ראשי · מסחרי |
| authenticated pentesting | penetrationstest med testkonti | penetrationstestning med testkonton | ראשי · מסחרי |
| AI security assessment | sikkerhedsvurdering af AI | säkerhetsbedömning av AI | ראשי · מסחרי · היקף נפרד |
| remediation retesting | gentest efter afhjælpning | omtestning efter åtgärder | ראשי · מסחרי |
| application access-control testing | test af adgangskontrol i applikationer | testning av åtkomstkontroll i applikationer | תומך · מסחרי |
| API authorisation testing | test af autorisation i API’er | testning av auktorisering i API:er | תומך · מסחרי |
| business logic security testing | sikkerhedstest af forretningslogik | säkerhetstestning av affärslogik | תומך · מסחרי |
| vulnerability risk prioritisation | risikoprioritering af sårbarheder | riskprioritering av sårbarheter | תומך · מסחרי |
| actionable penetration test report | anvendelig rapport fra penetrationstest | användbar rapport från penetrationstestning | תומך · מסחרי |
| pentest rules of engagement | regler og rammer for penetrationstest | regler och ramar för penetrationstestning | תומך · מידע |
| penetration test scope definition | afgrænsning af penetrationstest | avgränsning av penetrationstestning | תומך · מידע |
| vulnerability scan versus pentest | sårbarhedsscanning kontra penetrationstest | sårbarhetsskanning kontra penetrationstestning | תומך · מידע |
| pentest executive summary | ledelsesresumé af penetrationstest | ledningssammanfattning av penetrationstest | תומך · מסחרי |
| secure pentest evidence handling | sikker håndtering af pentest-evidens | säker hantering av pentestunderlag | תומך · מסחרי |
| passive OSINT assessment | passiv OSINT-vurdering | passiv OSINT-bedömning | תומך · מסחרי · היקף נפרד |
| cyber threat intelligence snapshot | afgrænset cybertrusselsanalyse | avgränsad cyberhotanalys | תומך · מסחרי · היקף נפרד |
| scoped red team exercise | afgrænset red team-øvelse | avgränsad red team-övning | תומך · מסחרי · היקף נפרד |
| penetration testing limitations | begrænsninger ved penetrationstest | begränsningar vid penetrationstestning | תומך · מידע |

### DevSecOps and secure delivery

יעדים: [EN](https://sundaibot.com/services/devsecops/) · [DA](https://sundaibot.com/da/ydelser/devsecops/) · [SV](https://sundaibot.com/sv/tjanster/devsecops/).

| English | Dansk | Svenska | סיווג |
|---|---|---|---|
| DevSecOps consulting | DevSecOps-rådgivning | DevSecOps-rådgivning | ראשי · מסחרי |
| secure CI/CD pipelines | sikre CI/CD-pipelines | säkra CI/CD-pipelines | ראשי · מסחרי |
| SAST pipeline integration | integration af SAST i pipelines | integration av SAST i pipelines | ראשי · מסחרי |
| SCA dependency scanning | SCA-scanning af afhængigheder | SCA-skanning av beroenden | ראשי · מסחרי |
| secret scanning setup | opsætning af scanning efter hemmeligheder | konfigurering av skanning efter hemligheter | ראשי · מסחרי |
| least-privilege deployment identities | deploy-identiteter med mindst mulige rettigheder | driftsättningsidentiteter med minsta möjliga behörighet | ראשי · מסחרי |
| OIDC deployment authentication | OIDC-autentifikation til deployment | OIDC-autentisering för driftsättning | תומך · מסחרי |
| short-lived CI/CD credentials | kortlivede adgangsoplysninger til CI/CD | kortlivade autentiseringsuppgifter för CI/CD | תומך · מסחרי |
| security release gates | sikkerhedsgates ved releases | säkerhetskontroller inför releaser | תומך · מסחרי |
| deployment approval workflow | arbejdsgang til godkendelse af deployment | arbetsflöde för godkännande av driftsättning | תומך · מסחרי |
| CI/CD environment separation | adskillelse af CI/CD-miljøer | separation av CI/CD-miljöer | תומך · מסחרי |
| secure deployment rollback plan | rollback-plan for sikker deployment | återställningsplan för säker driftsättning | תומך · מסחרי |
| delivery pipeline threat modelling | trusselsmodellering af leveringspipelines | hotmodellering av leveranspipelines | תומך · מסחרי |
| SAST versus SCA | SAST kontra SCA | SAST kontra SCA | תומך · מידע |
| security gate exception handling | håndtering af undtagelser i sikkerhedsgates | hantering av undantag från säkerhetskontroller | תומך · מידע |
| DAST integration | integration af DAST | integration av DAST | תומך · מסחרי · היקף נפרד |
| container image security scanning | sikkerhedsscanning af container-images | säkerhetsskanning av containeravbilder | תומך · מסחרי · היקף נפרד |
| infrastructure-as-code security checks | sikkerhedskontrol af infrastructure as code | säkerhetskontroller för infrastruktur som kod | תומך · מסחרי · היקף נפרד |
| software bill of materials setup | opsætning af softwarestykliste | konfigurering av programvaruförteckning | תומך · מסחרי · היקף נפרד |
| build signing and provenance | signering og sporbar oprindelse af builds | signering och spårbart ursprung för byggen | תומך · מסחרי · היקף נפרד |

### Cloud security and identity controls

יעדים: [EN](https://sundaibot.com/services/cloud-security/) · [DA](https://sundaibot.com/da/ydelser/cloud-security/) · [SV](https://sundaibot.com/sv/tjanster/cloud-security/).

| English | Dansk | Svenska | סיווג |
|---|---|---|---|
| cloud security assessment | vurdering af cloudsikkerhed | bedömning av molnsäkerhet | ראשי · מסחרי |
| cloud IAM review | gennemgang af cloud-IAM | granskning av moln-IAM | ראשי · מסחרי |
| Azure security consulting | rådgivning om Azure-sikkerhed | rådgivning om Azure-säkerhet | ראשי · מסחרי |
| AWS security consulting | rådgivning om AWS-sikkerhed | rådgivning om AWS-säkerhet | ראשי · מסחרי |
| Google Cloud security consulting | rådgivning om Google Cloud-sikkerhed | rådgivning om Google Cloud-säkerhet | ראשי · מסחרי |
| privileged access review | gennemgang af privilegeret adgang | granskning av privilegierad åtkomst | ראשי · מסחרי |
| Microsoft Entra ID security review | sikkerhedsgennemgang af Microsoft Entra ID | säkerhetsgranskning av Microsoft Entra ID | תומך · מסחרי |
| Azure RBAC permissions review | gennemgang af Azure RBAC-rettigheder | granskning av Azure RBAC-behörigheter | תומך · מסחרי |
| Conditional Access baseline | baseline for Conditional Access | grundnivå för Conditional Access | תומך · מסחרי |
| Microsoft Entra PIM configuration review | gennemgang af Microsoft Entra PIM-konfiguration | granskning av Microsoft Entra PIM-konfiguration | תומך · מסחרי |
| AWS IAM policy review | gennemgang af AWS IAM-politikker | granskning av AWS IAM-policyer | תומך · מסחרי |
| AWS IAM Identity Center review | gennemgang af AWS IAM Identity Center | granskning av AWS IAM Identity Center | תומך · מסחרי |
| Google Cloud IAM policy review | gennemgang af Google Cloud IAM-politikker | granskning av Google Cloud IAM-policyer | תומך · מסחרי |
| Google Cloud Privileged Access Manager review | gennemgang af Google Cloud Privileged Access Manager | granskning av Google Cloud Privileged Access Manager | תומך · מסחרי |
| cloud MFA baseline | baseline for cloud-MFA | grundnivå för moln-MFA | תומך · מסחרי |
| cloud audit logging setup | opsætning af revisionslogs i cloud | konfigurering av revisionsloggar i molnet | תומך · מסחרי |
| cloud security alert rules | regler for cloudsikkerhedsalarmer | regler för molnsäkerhetslarm | תומך · מסחרי |
| cloud emergency access procedure | procedure for nødadgang til cloud | rutin för nödåtkomst till molnet | תומך · מידע |
| cloud backup and recovery review | gennemgang af cloud-backup og gendannelse | granskning av molnsäkerhetskopiering och återställning | תומך · מסחרי |
| monthly cloud security maintenance | månedlig vedligeholdelse af cloudsikkerhed | månatligt underhåll av molnsäkerhet | תומך · מסחרי · היקף נפרד |

