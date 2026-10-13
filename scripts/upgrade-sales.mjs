// Public sales copy: benefits first, followed by a proposal scoped to the client.
// Detailed delivery limits remain in upgrade-content.mjs; prices are not shown here.
export const sales = {
  en: {
    forWho: 'Is this your team?',
    why: 'What changes for you',
    how: 'How we get you there',
    proposal: 'Get your tailored proposal',
    proposalIntro: 'Tell us about your organisation, your team and the product or process you want to improve. We will review the fit and follow up with the questions needed to shape a proposal. Scope, deliverables, timing and price are agreed before work begins.',
    companyLabel: 'Company / organisation',
    teamLabel: 'Your team and the people involved (optional)',
    productLabel: 'Your product, process or project'
  },
  da: {
    forWho: 'Er det her dit team?',
    why: 'Det betyder det for jer',
    how: 'Sådan kommer vi i mål',
    proposal: 'Få et tilbud tilpasset jer',
    proposalIntro: 'Fortæl om jeres organisation, team og det produkt eller den proces, I vil forbedre. Vi vurderer, om vi er det rette match, og følger op med de spørgsmål, der skal til for at udforme et tilbud. Omfang, leverancer, tidsplan og pris aftales, før arbejdet begynder.',
    companyLabel: 'Virksomhed / organisation',
    teamLabel: 'Jeres team og de involverede personer (valgfrit)',
    productLabel: 'Jeres produkt, proces eller projekt'
  },
  sv: {
    forWho: 'Är det här ert team?',
    why: 'Det här förändras för er',
    how: 'Så tar vi er vidare',
    proposal: 'Få en offert anpassad till er',
    proposalIntro: 'Berätta om er organisation, ert team och produkten eller processen ni vill förbättra. Vi bedömer om vi passar för uppdraget och följer upp med de frågor som behövs för att ta fram en offert. Omfattning, leveranser, tidsplan och pris avtalas innan arbetet börjar.',
    companyLabel: 'Företag / organisation',
    teamLabel: 'Ert team och de personer som berörs (valfritt)',
    productLabel: 'Er produkt, process eller ert projekt'
  }
};

export const serviceSales = {
  'compliance-ai-governance': {
    en: {
      audience: 'For founders, product leaders and organisations that need to explain how they manage AI, data and security risk.',
      payoff: 'Know which requirements matter, which gaps deserve attention and who owns the next step. Turn scattered policies into a working basis for customer conversations and internal decisions.',
      painHook: 'A promising deal. A security questionnaire. A folder full of policies nobody quite trusts. Let’s get the answers in order.',
      sellingHeadline: 'Turn “are we ready?” into a plan.',
      fit: [
        'Your customers ask about security, privacy or AI governance, and the answers live in different teams.',
        'You are introducing AI and need to map suppliers, data flows, responsibilities and controls.',
        'You want to prepare for an agreed standard or regulatory framework without launching a sprawling programme first.'
      ],
      results: [
        'A clear view of relevant requirements, current evidence and the gaps in the agreed scope.',
        'A prioritised action plan that gives each next step an owner and a reason.',
        'Practical draft documents and a handover your team can use and develop further.'
      ],
      discovery: [
        'Map your product, process, markets and AI use. Decide which framework is relevant before choosing the controls.',
        'Review the evidence with your team. Separate what already works from what needs action.',
        'Agree the priorities, document responsibilities and hand over a plan that fits the people doing the work.'
      ]
    },
    da: {
      audience: 'Til stiftere, produktansvarlige og organisationer, der skal kunne forklare, hvordan de håndterer AI, data og sikkerhedsrisici.',
      payoff: 'Få overblik over relevante krav, de vigtigste mangler og ansvaret for næste skridt. Gør spredte politikker til et brugbart grundlag for kundedialog og interne beslutninger.',
      painHook: 'En lovende aftale. Et sikkerhedsspørgeskema. En mappe fuld af politikker, ingen helt stoler på. Lad os få styr på svarene.',
      sellingHeadline: 'Fra “er vi klar?” til en konkret plan.',
      fit: [
        'Kunder spørger til sikkerhed, privatliv eller AI-governance, og svarene ligger hos forskellige teams.',
        'I tager AI i brug og skal kortlægge leverandører, datastrømme, ansvar og kontroller.',
        'I vil forberede jer på en aftalt standard eller et regelsæt uden først at starte et omfattende program.'
      ],
      results: [
        'Et klart billede af relevante krav, eksisterende dokumentation og mangler i det aftalte omfang.',
        'En prioriteret handlingsplan med en ansvarlig og et klart formål for hvert næste skridt.',
        'Praktiske dokumentudkast og en overdragelse, som teamet kan bruge og arbejde videre med.'
      ],
      discovery: [
        'Kortlæg produkt, proces, markeder og AI-brug. Afklar det relevante regelsæt, før vi vælger kontrollerne.',
        'Gennemgå dokumentationen sammen med teamet. Skeln mellem det, der fungerer, og det, der kræver handling.',
        'Aftal prioriteterne, dokumentér ansvaret, og overdrag en plan, der passer til dem, som skal udføre arbejdet.'
      ]
    },
    sv: {
      audience: 'För grundare, produktansvariga och organisationer som behöver kunna förklara hur de hanterar AI, data och säkerhetsrisker.',
      payoff: 'Få koll på relevanta krav, vilka brister som behöver åtgärdas och vem som äger nästa steg. Gör spridda policyer till ett användbart underlag för kunddialog och interna beslut.',
      painHook: 'En lovande affär. Ett säkerhetsformulär. En mapp full av policyer ingen riktigt litar på. Låt oss få ordning på svaren.',
      sellingHeadline: 'Från “är vi redo?” till en tydlig plan.',
      fit: [
        'Kunder frågar om säkerhet, integritet eller AI-styrning och svaren finns hos olika team.',
        'Ni tar AI i bruk och behöver kartlägga leverantörer, dataflöden, ansvar och kontroller.',
        'Ni vill förbereda er för en avtalad standard eller ett regelverk utan att först starta ett omfattande program.'
      ],
      results: [
        'En tydlig bild av relevanta krav, befintliga underlag och brister inom avtalad omfattning.',
        'En prioriterad åtgärdsplan där varje nästa steg har en ansvarig och ett tydligt syfte.',
        'Praktiska dokumentutkast och en överlämning som teamet kan använda och arbeta vidare med.'
      ],
      discovery: [
        'Kartlägg produkt, process, marknader och AI-användning. Bedöm det relevanta regelverket innan vi väljer kontrollerna.',
        'Granska underlagen tillsammans med teamet. Skilj det som fungerar från det som behöver åtgärdas.',
        'Avtala prioriteringarna, dokumentera ansvaret och lämna över en plan som passar dem som ska göra jobbet.'
      ]
    }
  },
  'secure-ai-automation': {
    en: {
      audience: 'For operations teams, growing businesses and product owners with a repetitive process that is ready for a better way of working.',
      payoff: 'Keep your people focused on customers and decisions. We connect the right systems, handle routine steps and give exceptions a clear route back to your team.',
      painHook: 'Your best people were not hired to copy the same data into three different systems.',
      sellingHeadline: 'Less copy-paste. More business.',
      fit: [
        'Orders, stock, CRM updates or reports still depend on repeated manual entry.',
        'Your team spends time chasing approvals and moving information between tools.',
        'Your product needs a controlled integration or an AI workflow with clear boundaries.'
      ],
      results: [
        'An agreed workflow connecting the selected systems, with validation and permissions built in.',
        'Visible exceptions, controlled retries and human approval for the actions that need it.',
        'Documented operation, agreed acceptance checks and a handover your team can follow.'
      ],
      discovery: [
        'Walk through the actual task with the people doing it. Find the repeated steps, failure points and decisions worth keeping human.',
        'Choose rules, APIs, a workflow platform or AI according to the job. Agree the scope, running costs and controls.',
        'Build and test the workflow against representative examples. Refine it, then hand over the operating instructions.'
      ]
    },
    da: {
      audience: 'Til driftsteams, virksomheder i vækst og produktansvarlige med en gentagen proces, der trænger til en bedre arbejdsgang.',
      payoff: 'Lad medarbejderne fokusere på kunder og beslutninger. Vi forbinder de relevante systemer, håndterer rutineopgaver og giver undtagelser en klar vej tilbage til teamet.',
      painHook: 'Dine dygtigste medarbejdere blev ikke ansat til at kopiere de samme data ind i tre forskellige systemer.',
      sellingHeadline: 'Mindre copy-paste. Mere forretning.',
      fit: [
        'Ordrer, lager, CRM-opdateringer eller rapporter kræver stadig gentagen manuel indtastning.',
        'Teamet bruger tid på at rykke for godkendelser og flytte oplysninger mellem værktøjer.',
        'Jeres produkt har brug for en kontrolleret integration eller et AI-workflow med klare rammer.'
      ],
      results: [
        'Et aftalt workflow mellem de valgte systemer med validering og rettigheder indbygget.',
        'Synlige undtagelser, kontrollerede genforsøg og menneskelig godkendelse, hvor det er nødvendigt.',
        'Dokumenteret drift, aftalte acceptkontroller og en overdragelse, som teamet kan følge.'
      ],
      discovery: [
        'Gennemgå opgaven med dem, der udfører den. Find gentagelser, fejlkilder og de beslutninger, mennesker fortsat skal træffe.',
        'Vælg regler, API’er, en workflow-platform eller AI efter opgaven. Aftal omfang, driftsomkostninger og kontroller.',
        'Byg og test med repræsentative eksempler. Tilpas arbejdsgangen, og overdrag derefter en brugbar driftsvejledning.'
      ]
    },
    sv: {
      audience: 'För driftteam, växande företag och produktansvariga med en återkommande process som behöver ett bättre arbetssätt.',
      payoff: 'Låt medarbetarna fokusera på kunder och beslut. Vi kopplar ihop rätt system, hanterar rutinstegen och ger avvikelser en tydlig väg tillbaka till teamet.',
      painHook: 'Dina bästa medarbetare anställdes inte för att kopiera samma data till tre olika system.',
      sellingHeadline: 'Mindre copy-paste. Mer affärer.',
      fit: [
        'Order, lager, CRM-uppdateringar eller rapporter kräver fortfarande återkommande manuell inmatning.',
        'Teamet lägger tid på att jaga godkännanden och flytta information mellan verktyg.',
        'Er produkt behöver en kontrollerad integration eller ett AI-arbetsflöde med tydliga ramar.'
      ],
      results: [
        'Ett avtalat arbetsflöde mellan valda system med validering och behörigheter inbyggda.',
        'Synliga avvikelser, kontrollerade återförsök och mänskligt godkännande där det behövs.',
        'Dokumenterad drift, avtalade acceptanskontroller och en överlämning som teamet kan följa.'
      ],
      discovery: [
        'Gå igenom uppgiften med dem som utför den. Hitta upprepningarna, felkällorna och besluten som människor ska fortsätta fatta.',
        'Välj regler, API:er, en arbetsflödesplattform eller AI efter uppgiften. Avtala omfattning, driftkostnader och kontroller.',
        'Bygg och testa med representativa exempel. Justera arbetsflödet och lämna sedan över en användbar driftvägledning.'
      ]
    }
  },
  'private-ai-agents-rag': {
    en: {
      audience: 'For knowledge-heavy organisations, support teams and product teams that want AI connected to their own information and permissions.',
      payoff: 'Make approved knowledge easier to find and use. Give people answers with source links, respect their access rights and keep agent actions within an agreed mandate.',
      painHook: 'The answer is somewhere in your documents. Your team should not have to search five places to find it.',
      sellingHeadline: 'Stop hunting. Start asking.',
      fit: [
        'Internal questions keep interrupting the same experts, while useful knowledge stays scattered.',
        'Support or onboarding needs an assistant that can point to approved source material.',
        'Different users need different access, and a generic chatbot cannot reflect your business rules.'
      ],
      results: [
        'An assistant pilot connected to an agreed knowledge source, with citations and permission-aware retrieval.',
        'Defined behaviour for unsupported answers, restricted content and any approved agent tools.',
        'An evaluation baseline, documented data handling and a handover for the next rollout decision.'
      ],
      discovery: [
        'Choose one useful question set, a suitable knowledge source and the user roles. Agree hosting, suppliers and data handling.',
        'Build retrieval and access controls together. Test relevant answers, restricted information and untrusted source instructions.',
        'Let pilot users try real tasks. Review evidence, costs and limitations before deciding what to expand.'
      ]
    },
    da: {
      audience: 'Til videnstunge organisationer, supportteams og produktteams, der vil koble AI til deres egne oplysninger og rettigheder.',
      payoff: 'Gør godkendt viden lettere at finde og bruge. Giv medarbejderne svar med kildelinks, respektér deres adgangsrettigheder, og hold agenthandlinger inden for et aftalt mandat.',
      painHook: 'Svaret ligger et sted i jeres dokumenter. Teamet bør ikke skulle lede fem steder for at finde det.',
      sellingHeadline: 'Stop med at lede. Begynd at spørge.',
      fit: [
        'Interne spørgsmål afbryder de samme eksperter igen og igen, mens nyttig viden ligger spredt.',
        'Support eller onboarding har brug for en assistent, der kan henvise til godkendte kilder.',
        'Brugere skal have forskellig adgang, og en generisk chatbot passer ikke til jeres forretningsregler.'
      ],
      results: [
        'En assistentpilot koblet til en aftalt videnskilde med kildehenvisninger og rettighedsstyret søgning.',
        'Fastlagt adfærd ved svar uden grundlag, adgangsbegrænset indhold og eventuelle godkendte agentværktøjer.',
        'Et grundlag for evaluering, dokumenteret datahåndtering og en overdragelse til beslutningen om videre udrulning.'
      ],
      discovery: [
        'Vælg relevante spørgsmål, en egnet videnskilde og brugerroller. Aftal hosting, leverandører og datahåndtering.',
        'Byg søgning og adgangskontrol sammen. Test relevante svar, beskyttet information og instruktioner fra upålidelige kilder.',
        'Lad pilotbrugere prøve virkelige opgaver. Gennemgå dokumentation, omkostninger og begrænsninger, før I vælger næste skridt.'
      ]
    },
    sv: {
      audience: 'För kunskapsintensiva organisationer, supportteam och produktteam som vill koppla AI till sin egen information och sina behörigheter.',
      payoff: 'Gör godkänd kunskap lättare att hitta och använda. Ge medarbetarna svar med källänkar, respektera deras åtkomsträttigheter och håll agentåtgärder inom ett avtalat mandat.',
      painHook: 'Svaret finns någonstans i era dokument. Teamet ska inte behöva leta på fem ställen för att hitta det.',
      sellingHeadline: 'Sluta leta. Börja fråga.',
      fit: [
        'Interna frågor avbryter samma experter om och om igen medan användbar kunskap ligger utspridd.',
        'Support eller introduktion behöver en assistent som kan hänvisa till godkända källor.',
        'Användare behöver olika åtkomst och en generell chattbot passar inte era verksamhetsregler.'
      ],
      results: [
        'En assistentpilot kopplad till en avtalad kunskapskälla med källhänvisningar och behörighetsstyrd sökning.',
        'Bestämt beteende för svar utan stöd, skyddat innehåll och eventuella godkända agentverktyg.',
        'Ett utvärderingsunderlag, dokumenterad datahantering och en överlämning inför nästa utrullningsbeslut.'
      ],
      discovery: [
        'Välj relevanta frågor, en lämplig kunskapskälla och användarroller. Avtala hosting, leverantörer och datahantering.',
        'Bygg sökning och åtkomstkontroller tillsammans. Testa relevanta svar, skyddad information och instruktioner från opålitliga källor.',
        'Låt pilotanvändare prova verkliga uppgifter. Granska underlag, kostnader och begränsningar innan ni väljer nästa steg.'
      ]
    }
  },
  'pentesting-red-teaming': {
    en: {
      audience: 'For product owners, engineering teams and security leads that need a focused test of their application, API or AI attack surface.',
      payoff: 'Replace assumptions with findings your developers can act on. Understand the tested attack paths, the business impact and the order in which to fix them.',
      painHook: 'Before the next launch, know what has actually been tested—and what still needs attention.',
      sellingHeadline: 'Know what can break. Know what to fix.',
      fit: [
        'You are releasing a web application or API and need to test how access controls behave in practice.',
        'An AI feature introduces new prompts, tools or data flows that deserve a focused security assessment.',
        'You need a report that engineers can use and decision-makers can understand.'
      ],
      results: [
        'Documented findings with protected evidence, severity and a clear explanation of business impact.',
        'Prioritised remediation guidance tied to the systems and attack paths in scope.',
        'A technical handover and the agreed verification of included fixes, with test limitations stated.'
      ],
      discovery: [
        'Agree the targets, written authorisation, test method and stop conditions. Choose the assessment your question actually needs.',
        'Test the agreed roles, endpoints and attack paths. Collect only the evidence needed to explain each finding.',
        'Review the findings with engineering and leadership. Prioritise fixes and complete the verification agreed in scope.'
      ]
    },
    da: {
      audience: 'Til produktansvarlige, udviklingsteams og sikkerhedsansvarlige, der har brug for en fokuseret test af en applikation, et API eller en AI-angrebsflade.',
      payoff: 'Erstat antagelser med fund, udviklerne kan handle på. Forstå de testede angrebsveje, deres betydning for forretningen og rækkefølgen for afhjælpning.',
      painHook: 'Før næste lancering: få klarhed over, hvad der faktisk er testet, og hvad der stadig kræver opmærksomhed.',
      sellingHeadline: 'Find svaghederne. Kend næste skridt.',
      fit: [
        'I lancerer en webapplikation eller et API og vil teste adgangskontrollen i praksis.',
        'En AI-funktion tilfører prompts, værktøjer eller datastrømme, der kræver en fokuseret sikkerhedsvurdering.',
        'I har brug for en rapport, som udviklere kan bruge, og beslutningstagere kan forstå.'
      ],
      results: [
        'Dokumenterede fund med beskyttet evidens, alvorlighed og en klar forklaring af forretningspåvirkningen.',
        'Prioriterede rettelsesforslag knyttet til systemerne og angrebsvejene i det aftalte omfang.',
        'En teknisk overdragelse og aftalt kontrol af inkluderede rettelser med testbegrænsninger tydeligt beskrevet.'
      ],
      discovery: [
        'Aftal mål, skriftlig tilladelse, testmetode og stopbetingelser. Vælg den vurdering, jeres spørgsmål faktisk kræver.',
        'Test de aftalte roller, endpoints og angrebsveje. Indsaml kun den evidens, der skal til for at forklare hvert fund.',
        'Gennemgå fundene med udvikling og ledelse. Prioritér rettelserne, og gennemfør den aftalte efterkontrol.'
      ]
    },
    sv: {
      audience: 'För produktansvariga, utvecklingsteam och säkerhetsansvariga som behöver ett fokuserat test av en applikation, ett API eller en AI-angreppsyta.',
      payoff: 'Ersätt antaganden med fynd som utvecklarna kan åtgärda. Förstå de testade angreppsvägarna, påverkan på verksamheten och vad som behöver rättas först.',
      painHook: 'Inför nästa lansering: få koll på vad som faktiskt har testats och vad som fortfarande behöver uppmärksamhet.',
      sellingHeadline: 'Hitta svagheterna. Prioritera rätt.',
      fit: [
        'Ni lanserar en webbapplikation eller ett API och vill testa åtkomstkontrollen i praktiken.',
        'En AI-funktion tillför promptar, verktyg eller dataflöden som behöver en fokuserad säkerhetsbedömning.',
        'Ni behöver en rapport som utvecklare kan använda och beslutsfattare kan förstå.'
      ],
      results: [
        'Dokumenterade fynd med skyddade underlag, allvarlighetsgrad och en tydlig förklaring av verksamhetspåverkan.',
        'Prioriterade åtgärdsförslag kopplade till systemen och angreppsvägarna inom avtalad omfattning.',
        'En teknisk överlämning och avtalad verifiering av inkluderade rättningar med testbegränsningarna tydligt angivna.'
      ],
      discovery: [
        'Avtala mål, skriftligt tillstånd, testmetod och stoppvillkor. Välj den bedömning som er fråga faktiskt behöver.',
        'Testa avtalade roller, endpoints och angreppsvägar. Samla bara de underlag som behövs för att förklara varje fynd.',
        'Gå igenom fynden med utveckling och ledning. Prioritera rättningar och genomför den avtalade efterkontrollen.'
      ]
    }
  },
  devsecops: {
    en: {
      audience: 'For software teams that want security in their delivery pipeline without making every release an improvised review.',
      payoff: 'Make release checks repeatable, deployment access deliberate and exceptions accountable. Give developers a delivery process they can understand and maintain.',
      painHook: 'If security depends on somebody remembering to check, your pipeline has unfinished business.',
      sellingHeadline: 'Build security into the way you ship.',
      fit: [
        'Your team ships regularly, but dependency, code and secret checks happen inconsistently.',
        'Deployment credentials have more access or a longer lifetime than the job requires.',
        'You need clear release gates and a recovery path that the team can follow.'
      ],
      results: [
        'A scoped CI/CD foundation with agreed code, dependency and secret checks.',
        'Restricted pipeline identities, clear release approvals and documented handling of exceptions.',
        'Acceptance checks, rollback guidance and an operating handover to your technical owner.'
      ],
      discovery: [
        'Review one delivery path from repository to deployment. Identify the risks, existing tools and decisions that need a gate.',
        'Configure the agreed checks and access controls. Set practical thresholds and assign ownership of exceptions.',
        'Test the release and recovery behaviour. Document the pipeline so your team can run and adapt it.'
      ]
    },
    da: {
      audience: 'Til softwareteams, der vil bygge sikkerhed ind i deres pipeline uden at gøre hver release til en improviseret gennemgang.',
      payoff: 'Gør releasekontroller gentagelige, deploymentadgang velovervejet og ansvaret for undtagelser tydeligt. Giv udviklerne en leveranceproces, de kan forstå og vedligeholde.',
      painHook: 'Hvis sikkerheden afhænger af, at nogen husker at tjekke, er der stadig arbejde at gøre i jeres pipeline.',
      sellingHeadline: 'Byg sikkerhed ind i hver release.',
      fit: [
        'Teamet leverer løbende, men kode, afhængigheder og hemmeligheder kontrolleres uensartet.',
        'Deploymentrettigheder er bredere eller varer længere, end opgaven kræver.',
        'I har brug for klare releasekrav og en vej til gendannelse, teamet kan følge.'
      ],
      results: [
        'Et afgrænset CI/CD-fundament med aftalte kontroller af kode, afhængigheder og hemmeligheder.',
        'Begrænsede pipelineidentiteter, klare releasegodkendelser og dokumenteret håndtering af undtagelser.',
        'Acceptkontroller, rollbackvejledning og en driftsoverdragelse til jeres tekniske ansvarlige.'
      ],
      discovery: [
        'Gennemgå én leverancevej fra repository til deployment. Find risici, eksisterende værktøjer og beslutninger, der kræver en kontrol.',
        'Konfigurér de aftalte tests og adgangskontroller. Fastlæg praktiske tærskler og ansvaret for undtagelser.',
        'Test release og gendannelse. Dokumentér pipelinen, så teamet kan drive og tilpasse den.'
      ]
    },
    sv: {
      audience: 'För utvecklingsteam som vill bygga in säkerhet i sin pipeline utan att varje release blir en improviserad granskning.',
      payoff: 'Gör releasekontrollerna upprepningsbara, driftsättningsåtkomsten genomtänkt och ansvaret för undantag tydligt. Ge utvecklarna en leveransprocess de kan förstå och underhålla.',
      painHook: 'Om säkerheten hänger på att någon kommer ihåg att kontrollera finns det mer att göra i er pipeline.',
      sellingHeadline: 'Bygg in säkerhet i sättet ni levererar.',
      fit: [
        'Teamet levererar regelbundet, men kod, beroenden och hemligheter kontrolleras på olika sätt.',
        'Driftsättningsbehörigheter är bredare eller gäller längre än uppgiften kräver.',
        'Ni behöver tydliga releasekrav och en återställningsväg som teamet kan följa.'
      ],
      results: [
        'En avgränsad CI/CD-grund med avtalade kontroller av kod, beroenden och hemligheter.',
        'Begränsade pipelineidentiteter, tydliga releasegodkännanden och dokumenterad undantagshantering.',
        'Acceptanskontroller, rollbackvägledning och en driftöverlämning till den teknikansvariga i ert team.'
      ],
      discovery: [
        'Granska en leveransväg från repository till driftsättning. Hitta riskerna, befintliga verktyg och besluten som behöver en kontroll.',
        'Konfigurera avtalade tester och åtkomstkontroller. Sätt praktiska trösklar och ange vem som ansvarar för undantag.',
        'Testa releaser och återställning. Dokumentera pipelinen så att teamet kan driva och anpassa den.'
      ]
    }
  },
  'cloud-security': {
    en: {
      audience: 'For businesses running on Azure, AWS or Google Cloud that need a clearer grip on identities, permissions and security operations.',
      payoff: 'See who can do what, tighten the access that matters and give security signals a responsible owner. Build a foundation your team can keep in shape.',
      painHook: 'Who still has admin access? Which alert matters? Cloud security gets easier to manage when those answers are clear.',
      sellingHeadline: 'Take back control of your cloud.',
      fit: [
        'Your cloud has grown faster than your overview of accounts, roles and privileged access.',
        'You handle sensitive information and need a focused review of identities and selected resources.',
        'Your team needs practical security checks and maintenance with defined responsibilities.'
      ],
      results: [
        'A permission map and a prioritised review of the identities and resources in scope.',
        'Approved access controls, audit visibility and agreed alert rules with clear ownership.',
        'Emergency-access guidance, recovery configuration review and an actionable handover plan.'
      ],
      discovery: [
        'Select the cloud account, identities and resources. Review current access, licensing and operational requirements.',
        'Prepare and test the agreed changes. Get approval before activating access controls and alert rules.',
        'Hand over the procedures and remaining priorities. Define ongoing maintenance separately if your team needs it.'
      ]
    },
    da: {
      audience: 'Til virksomheder på Azure, AWS eller Google Cloud, der vil have bedre styr på identiteter, rettigheder og sikkerhedsdrift.',
      payoff: 'Se, hvem der kan gøre hvad, begræns den adgang, der betyder noget, og giv sikkerhedssignaler en ansvarlig. Byg et fundament, teamet kan holde ved lige.',
      painHook: 'Hvem har stadig administratoradgang? Hvilken alarm er vigtig? Cloudsikkerhed bliver lettere at styre, når svarene er klare.',
      sellingHeadline: 'Tag kontrollen over din cloud.',
      fit: [
        'Jeres cloud er vokset hurtigere end overblikket over konti, roller og privilegeret adgang.',
        'I håndterer følsomme oplysninger og vil have en fokuseret gennemgang af identiteter og udvalgte ressourcer.',
        'Teamet har brug for praktiske sikkerhedskontroller og vedligeholdelse med tydeligt ansvar.'
      ],
      results: [
        'Et rettighedskort og en prioriteret gennemgang af identiteter og ressourcer i det aftalte omfang.',
        'Godkendte adgangskontroller, revisionsspor og aftalte alarmregler med tydeligt ansvar.',
        'Vejledning til nødadgang, gennemgang af gendannelseskonfiguration og en konkret overdragelsesplan.'
      ],
      discovery: [
        'Vælg cloudkonto, identiteter og ressourcer. Gennemgå adgang, licenser og krav til driften.',
        'Forbered og test de aftalte ændringer. Få godkendelse, før adgangskontroller og alarmregler aktiveres.',
        'Overdrag procedurerne og de resterende prioriteter. Aftal løbende vedligeholdelse særskilt, hvis teamet har brug for det.'
      ]
    },
    sv: {
      audience: 'För företag på Azure, AWS eller Google Cloud som vill få bättre grepp om identiteter, behörigheter och säkerhetsdrift.',
      payoff: 'Se vem som kan göra vad, begränsa åtkomsten som spelar roll och ge säkerhetssignaler en ansvarig. Bygg en grund som teamet kan hålla i trim.',
      painHook: 'Vem har fortfarande administratörsåtkomst? Vilket larm är viktigt? Molnsäkerhet blir lättare att hantera när svaren är tydliga.',
      sellingHeadline: 'Ta kontroll över ert moln.',
      fit: [
        'Ert moln har vuxit snabbare än överblicken över konton, roller och privilegierad åtkomst.',
        'Ni hanterar känslig information och behöver en fokuserad granskning av identiteter och valda resurser.',
        'Teamet behöver praktiska säkerhetskontroller och underhåll med tydligt ansvar.'
      ],
      results: [
        'En behörighetskarta och en prioriterad granskning av identiteter och resurser inom avtalad omfattning.',
        'Godkända åtkomstkontroller, granskningsspår och avtalade larmregler med tydligt ansvar.',
        'Vägledning för nödåtkomst, granskning av återställningskonfiguration och en konkret överlämningsplan.'
      ],
      discovery: [
        'Välj molnkonto, identiteter och resurser. Granska åtkomst, licenser och driftkrav.',
        'Förbered och testa avtalade ändringar. Få godkännande innan åtkomstkontroller och larmregler aktiveras.',
        'Lämna över rutinerna och kvarvarande prioriteringar. Avtala löpande underhåll separat om teamet behöver det.'
      ]
    }
  }
};
