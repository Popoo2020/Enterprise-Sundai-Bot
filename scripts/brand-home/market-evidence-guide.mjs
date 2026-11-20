export const marketEvidenceGuide = {
  slug: 'market-research-with-ai',
  published: '2026-11-20',
  category: 'work',
  related: 'services/secure-ai-automation/',
  sources: [
    {name:'Stripe · DE · Pricing', url:'https://stripe.com/de/pricing'},
    {name:'Stripe · Standard and premium cards', url:'https://support.stripe.com/questions/what-s-the-difference-between-standard-and-premium-cards'},
    {name:'Mollie · DE · Pricing', url:'https://www.mollie.com/de/pricing'},
    {name:'Perplexity · MCP server', url:'https://github.com/perplexityai/modelcontextprotocol'},
    {name:'Firecrawl · Scrape', url:'https://docs.firecrawl.dev/features/scrape'},
    {name:'Anthropic · Claude connectors and remote MCP', url:'https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp'},
    {name:'Blotato · MCP server', url:'https://help.blotato.com/start-with-an-ai-agent/mcp.md'},
    {name:'Blotato · Drafts and publishing', url:'https://help.blotato.com/support/faqs'}
  ],
  sectionSources: [[], [0, 1, 2], [3, 4], [], [5, 6, 7], []],
  text: {
    he: {
      title:'האם כדאי להחליף ספק סליקה? בדקנו מה ההבדל בעסקה של 40 אירו',
      summary:'כמה באמת משנה פער של 0.3 נקודות אחוז במחיר הסליקה? השווינו שני מחירונים פומביים ובדקנו איך עוברים מחיפוש ב־Perplexity להחלטה שאפשר להסביר ללקוח.',
      sections:[
        ['פותחים בשאלה של לקוח','בעלת חנות בגרמניה רוצה לדעת כמה תעלה לה סליקה של הזמנה בסך 40 אירו. כדי להשוות הצעות צריך לדעת גם היכן הונפק הכרטיס, אם הוא פרטי או עסקי ובאיזה מטבע יתקבל התשלום. אותם פרטים קובעים איזו שורה במחירון רלוונטית. החלטה כזאת נותנת לצוות שאלה ממוקדת לחקור.'],
        ['כמה עולה לסלוק 40 אירו?','ב־20 בנובמבר 2026 בדקנו את המחירונים הגרמניים של Stripe ושל Mollie. בחרנו תשלום מקוון באירו, בכרטיס Visa פרטי רגיל שהונפק בגרמניה, ללא המרת מטבע ובתעריף הפומבי.',[
          'Stripe מפרסמת לכרטיס רגיל מהאזור הכלכלי האירופי עמלה של 1.5% ועוד 0.25 אירו. על 40 אירו מתקבלת עמלה של 0.85 אירו.',
          'Mollie מפרסמת לכרטיס Visa פרטי מהאזור הכלכלי האירופי עמלה של 1.80% ועוד 0.25 אירו. על אותה עסקה העמלה היא 0.97 אירו.',
          'הפער הוא 0.12 אירו לעסקה, או 60 אירו ב־500 עסקאות זהות. 500 הוא תרחיש להמחשה. לפני מעבר ספק כדאי לבדוק את תמהיל הכרטיסים שלכם, עלות המעבר, החזרים, טיפול בהכחשות עסקה ותנאי ההסכם שלכם.'
        ]],
        ['איך עוברים מתוצאת חיפוש לראיה','אפשר לבקש מ־Perplexity לאתר את עמודי התמחור וההגדרות של הספקים. לעבודה חוזרת, Firecrawl יכול לחלץ טקסט מקישורים ציבוריים שמותר לקרוא. שמרו עם כל נתון את הכתובת, תאריך הבדיקה, המדינה והסעיף שעליו הסתמכתם. פתחו את העמוד המקורי ובדקו שהטבלה או הערת השוליים שרדה את החילוץ. במקרה הזה בדקנו גם איך Stripe מגדירה כרטיס רגיל. תשובות משני מודלים שמצטטות אותו מחירון עדיין נשענות על מקור אחד.'],
        ['האם גיליתם יתרון שאפשר להבטיח ללקוח?','נניח שאתם משווים שבעה מתחרים כדי להחליט אם להציע ליווי אישי בהקמה. שלושה מזכירים ליווי בעמוד השירות. אצל ארבעת האחרים השאירו את השדה פתוח ובדקו גם במרכז העזרה או מול הספק. אפשר בהחלט לפרסם מה כולל הליווי שלכם ומי נותן אותו. כדי לטעון שאתם היחידים שמציעים אותו נדרשות ראיות רחבות יותר.'],
        ['מה יכול לעבור מ־Claude אל טיוטת פוסט','MCP הוא פרוטוקול שדרכו יישום כמו Claude יכול לפנות לכלים חיצוניים שחיברתם. הוא מתאים כשהצוות חוזר על אותה בדיקה. להשוואה חד־פעמית אפשר לפתוח את שני המחירונים בדפדפן ולחשב בגיליון. לצורך המחקר מספיקה גישת קריאה. אחרי אימות אפשר להכין ב־Blotato טיוטות לערוצים שונים. העורך בודק בכל טיוטה שהמדינה, סוג הכרטיס והנחת 500 העסקאות נשארו בהקשרם, ורק אז מאשר פרסום או תזמון.'],
        ['מה תקבלו מעבודה משותפת עם SundAI','הביאו לשיחת היכרות ללא עלות של 20 דקות החלטה אחת ושני קישורים ציבוריים שישפיעו עליה. אריאל יעבור איתכם על הנתון שחסר כדי להכריע. בפיילוט ממוקד אפשר לבנות טבלת מקורות עם תאריך בדיקה, לחשב את ההשפעה לפי הנפח שלכם ולהדריך את מי שיאשר את המסקנה. נמדוד כמה זמן עולה להפיק השוואה מאושרת, כולל תיקונים, לפני שנחליט איזה שלב כדאי לבצע אוטומטית.']
      ],
      exercise:'בחרו טענה אחת של מתחרה. כתבו למי היא חלה ובאילו תנאים, ציינו קישור ותאריך, ורשמו מה יגרום לכם לשנות את ההחלטה. כששני מקורות שונים מציגים מחיר שונה, בדקו תחילה אם שניהם מתארים את אותה עסקה.'
    },
    en: {
      title:'Is it worth switching payment providers? Compare the fees on a €40 sale',
      summary:'What does a difference of 0.3 percentage points in payment fees actually cost? Two published price lists show how to turn a Perplexity search into a comparison a customer can check.',
      sections:[
        ['Start with a customer’s decision','A shop owner in Germany wants to know what it costs to take a €40 payment online. The answer depends on where the card was issued, whether it is a consumer or commercial card, and the settlement currency. Those details determine which row in a provider’s price list applies. They also give a researcher something specific to look for.'],
        ['Two ways to process the same €40 payment','On 20 November 2026 we checked Stripe’s and Mollie’s German price lists. We used a standard German-issued consumer Visa, an online payment settled in euros, no currency conversion and publicly listed fees.',[
          'Stripe lists 1.5% plus €0.25 for a standard EEA card. The fee on €40 is €0.85.',
          'Mollie lists 1.80% plus €0.25 for an EEA consumer Visa. The fee on the same payment is €0.97.',
          'The difference is €0.12 per payment, or €60 across 500 identical payments. That volume is illustrative. Before switching providers, check your card mix, migration costs, refunds, disputes and any negotiated rates.'
        ]],
        ['Give every number a source you can reopen','Perplexity can find candidate pricing and eligibility pages. If the check recurs, Firecrawl can extract text from public pages you have permission to use. Record the URL, date, market and relevant clause beside each figure. Open the original and check that extraction preserved the table heading and footnote. For the example above we also checked Stripe’s definition of a standard card. Two AI answers citing the same price list still give you one underlying source.'],
        ['Have you found a gap worth advertising?','Suppose you review seven competitors to decide whether to offer personal onboarding. Three mention it on their service pages. Leave the other four as unknown and check their help centres or ask the suppliers. You can describe what your own onboarding includes and who provides it. A claim to be the only provider offering it needs wider evidence.'],
        ['How much of this workflow should Claude handle?','MCP is a protocol through which an application such as Claude can call connected tools. A recurring comparison can justify a read-only research connection. For a one-off decision, two browser tabs and a spreadsheet may be quicker. Once a person has verified the findings, Blotato can prepare different drafts for each channel. An editor checks that the country, card type and 500-payment assumption survived the rewrite before approving a post or scheduling it.'],
        ['What to bring to SundAI','Bring a buying decision and two public links to a free 20-minute call with Ariel. Together we identify the missing fact that could change the decision. A scoped pilot can give your team a dated source sheet, a calculation using your volumes, and practice checking the final claim. We measure time per approved comparison, including corrections, before choosing which steps to automate.']
      ],
      exercise:'Pick one competitor claim. Record who qualifies, the terms, the source URL, the date and what would change your decision. If sources give different prices, first check that both describe the same transaction.'
    },
    sv: {
      title:'Lönar det sig att byta betalleverantör? Jämför avgifterna på ett köp för 40 euro',
      summary:'Vad betyder 0,3 procentenheters skillnad i kortavgift för en butik? Med två offentliga prislistor visar vi hur en sökning i Perplexity kan bli ett underlag som kunden själv kan kontrollera.',
      sections:[
        ['Börja med kundens fråga','En butiksägare i Tyskland vill veta vad det kostar att ta betalt för en order på 40 euro på nätet. Vilken rad i prislistan gäller? Det beror på var kortet är utfärdat, om det är ett privatkort eller företagskort och vilken valuta butiken får betalt i. Med de uppgifterna går det att beställa en användbar jämförelse.'],
        ['Två avgifter för samma köp','Den 20 november 2026 kontrollerade vi Stripes och Mollies tyska prislistor. Exemplet gäller ett vanligt tyskt Visa-kort för privatpersoner och en nätbetalning i euro utan valutaväxling eller särskilt prisavtal.',[
          'Stripe anger 1,5 procent plus 0,25 euro för ett standardkort från EES. För 40 euro blir avgiften 0,85 euro.',
          'Mollie anger 1,80 procent plus 0,25 euro för ett Visa-kort för privatpersoner från EES. Samma betalning kostar 0,97 euro.',
          'Skillnaden är 0,12 euro per betalning. Med 500 likadana köp blir den 60 euro. Volymen är ett räkneexempel. Kontrollera även vilka kort kunderna använder, kostnaden för att byta, återbetalningar, kortreklamationer och era egna avtalspriser.'
        ]],
        ['Spara belägget tillsammans med siffran','Perplexity kan hitta leverantörernas prissidor och villkor. Om ni gör jämförelsen ofta kan Firecrawl hämta text från offentliga sidor som ni får använda. Anteckna adress, datum, marknad och villkor intill varje belopp. Öppna originalet för att kontrollera att tabellrubriken och fotnoten följde med. Här kontrollerade vi även hur Stripe definierar ett standardkort. Två AI-svar som båda hänvisar till samma prislista har fortfarande en gemensam källa.'],
        ['Har ni hittat något som går att lova kunden?','Anta att ni undersöker sju konkurrenter för att avgöra om ni ska erbjuda personlig hjälp vid starten. Tre nämner hjälpen på sina tjänstesidor. Låt de andra fyra stå som okända och läs deras hjälpsidor eller fråga leverantörerna. Beskriv gärna vad er egen starthjälp innehåller och vem som ger den. Ett påstående om att ni är ensamma om tjänsten kräver ett bredare underlag.'],
        ['Från analys i Claude till utkast för publicering','MCP är ett protokoll som exempelvis Claude kan använda för att anropa anslutna verktyg. För en återkommande analys kan det löna sig att ge verktyget läsbehörighet. Vid en enstaka jämförelse kan två flikar och ett kalkylblad räcka. Efter faktagranskningen kan Blotato ta fram utkast för olika kanaler. En redaktör kontrollerar att marknad, korttyp och antagandet om 500 köp fortfarande framgår innan ett inlägg publiceras eller schemaläggs.'],
        ['Vad vi kan undersöka tillsammans','Ta med ett köpbeslut och två offentliga länkar till ett kostnadsfritt samtal på 20 minuter med Ariel. Vi ringar in vilken sakuppgift som kan avgöra valet. I en avgränsad pilot kan ni få en daterad källförteckning, en beräkning för era egna volymer och handledning för den som granskar slutsatsen. Vi mäter tiden per godkänd jämförelse, inklusive rättelser, innan vi bestämmer vad som är värt att automatisera.']
      ],
      exercise:'Välj ett påstående från en konkurrent. Skriv vem det gäller, under vilka villkor, källans adress, datumet och vad som skulle ändra beslutet. Om två priser skiljer sig åt, börja med att se om de gäller samma transaktion.'
    },
    da: {
      title:'Kan det betale sig at skifte betalingsudbyder? Sammenlign gebyrerne på et køb til 40 euro',
      summary:'Hvad betyder en forskel på 0,3 procentpoint i kortgebyr for en webshop? To offentlige prislister viser vejen fra en søgning i Perplexity til en sammenligning, kunden selv kan efterprøve.',
      sections:[
        ['Tag udgangspunkt i kundens beslutning','En tysk butiksejer vil vide, hvad det koster at modtage en onlinebetaling på 40 euro. Den relevante pris afhænger af, hvor kortet er udstedt, om det er et privatkort eller erhvervskort, og hvilken valuta butikken afregner i. Når de oplysninger ligger fast, kan man finde den rigtige linje i hver prisliste.'],
        ['Hvad koster den samme betaling hos to udbydere?','Den 20. november 2026 gennemgik vi de tyske prislister fra Stripe og Mollie. Vi regnede på en onlinebetaling med et almindeligt tysk Visa-kort til private, afregnet i euro uden valutaomregning og til offentlig listepris.',[
          'Stripe angiver 1,5 procent plus 0,25 euro for standardkort fra EØS. På 40 euro giver det et gebyr på 0,85 euro.',
          'Mollie angiver 1,80 procent plus 0,25 euro for Visa-kort til private fra EØS. Samme betaling koster 0,97 euro.',
          'Forskellen er 0,12 euro pr. betaling. Ved 500 identiske betalinger svarer det til 60 euro. Antallet er et regneeksempel. Før I skifter udbyder, skal I også se på kundernes korttyper, udgifter ved skiftet, tilbagebetalinger, indsigelser og jeres egne aftalepriser.'
        ]],
        ['Gem kilden sammen med tallet','Perplexity kan finde udbydernes prissider og betingelser. Hvis opgaven gentager sig, kan Firecrawl udtrække tekst fra offentlige sider, som I har tilladelse til at bruge. Notér webadresse, dato, marked og det relevante vilkår ved hvert tal. Åbn originalen og tjek, at tabeloverskrift og fodnote er kommet med. Her kontrollerede vi også Stripes definition af et standardkort. To AI-svar med henvisning til den samme prisliste bygger stadig på én kilde.'],
        ['Har I fundet en fordel, I kan love kunden?','Forestil jer, at I undersøger syv konkurrenter for at afgøre, om I vil tilbyde personlig hjælp til at komme i gang. Tre beskriver hjælpen på deres salgssider. Lad de øvrige fire stå som uafklarede, og tjek hjælpeuniverset eller spørg udbyderne. I kan beskrive præcis, hvad jeres egen hjælp omfatter, og hvem der står for den. Hvis I vil kalde jer de eneste med tilbuddet, kræver det mere dokumentation.'],
        ['Fra analyse i Claude til et udkast','MCP er en protokol, som f.eks. Claude kan bruge til at kalde tilsluttede værktøjer. Ved gentagne undersøgelser kan det give mening at give værktøjet læseadgang. Ved en enkelt sammenligning rækker to åbne faner og et regneark ofte. Når tallene er godkendt, kan Blotato lave udkast til forskellige kanaler. En redaktør tjekker, at marked, korttype og forudsætningen om 500 køb stadig fremgår, inden opslaget udgives eller planlægges.'],
        ['Det kan vi afklare sammen med jer','Tag en konkret indkøbsbeslutning og to offentlige links med til en gratis samtale på 20 minutter med Ariel. Vi finder den oplysning, der kan ændre valget. I et afgrænset pilotforløb kan I få et dateret kildeark, en beregning med jeres egne mængder og oplæring af den person, der skal godkende konklusionen. Vi måler tidsforbruget pr. godkendt sammenligning, inklusive rettelser, før vi vælger, hvad der skal automatiseres.']
      ],
      exercise:'Vælg én påstand fra en konkurrent. Skriv, hvem den gælder for, betingelserne, kildens webadresse, datoen og hvad der kunne ændre jeres beslutning. Hvis to kilder viser forskellige priser, så undersøg først, om de beskriver samme handel.'
    }
  }
};
