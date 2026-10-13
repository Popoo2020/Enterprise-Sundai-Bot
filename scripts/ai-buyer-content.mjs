// Original buyer guidance. Acceptance examples are illustrative, not added scope.
// Package limits remain defined by upgrade-content.mjs and the written proposal.
export const buyerRoutes = {
  en: '/service-selection/',
  da: '/da/vaelg-ydelse/',
  sv: '/sv/valj-tjanst/'
};

export const buyerCopy = {
  en: {
    title: 'Choose an AI or Cybersecurity Service',
    description: 'Compare AI automation, private RAG, governance, pentesting, DevSecOps and cloud security. Know the scope, inputs and acceptance checks before buying.',
    intro: 'A useful project starts with a problem your team can describe. Use this guide to choose the service that fits, understand the package boundaries and prepare a proposal your decision-maker can assess. Tell us what needs to work better; we will help turn it into a focused brief.',
    compareTitle: 'Which service fits the problem?',
    compareIntro: 'These are different pieces of work. The table summarises the entry packages; each service page explains the complete scope and exclusions. Larger or combined projects need a separate agreement.',
    columns: { service: 'Service', need: 'Start here when', outputs: 'Useful outputs', boundary: 'Entry-package boundary' },
    chooseTitle: 'Three decisions that make the brief clearer',
    choices: [
      { title: 'Finding knowledge or completing work?', text: 'Choose a private assistant and RAG pilot when authorised users need answers grounded in your documents. Choose secure automation when a defined event should move information or complete a process across systems. Retrieval and actions can be combined, but each action, permission and approval must be scoped.' },
      { title: 'Understanding requirements or testing an attack path?', text: 'Choose governance for applicable requirements, evidence gaps, responsibilities and a readiness plan. Choose a pentest to investigate authorised technical targets and prioritise fixes. A pentest is useful evidence; it does not replace a governance programme or establish compliance.' },
      { title: 'Protecting releases or controlling cloud access?', text: 'Choose DevSecOps for repository checks, pipeline identities, release gates and recovery guidance. Choose cloud security for selected identities, resources, configuration and audit signals in one account or project. Agree the handoff if a deployment pipeline also needs cloud permissions changed.' }
    ],
    checklistTitle: 'Five things to agree before work starts',
    checklistIntro: 'Bring the answers you have. Unanswered questions are part of the discovery conversation, not a reason to write a vague contract.',
    checklist: [
      { title: 'A written scope with limits', text: 'Name the process, product, repository or cloud account; list targets, interfaces, environments and exclusions. Record deliverables, refinement or retest limits and how additional work is approved.' },
      { title: 'Suppliers and the complete data path', text: 'Identify what data enters each provider, model endpoint, knowledge store and log. Agree access, supplier data-use terms, hosting region, retention and deletion. European service delivery does not by itself establish where every supplier processes data.' },
      { title: 'Owners who can approve decisions', text: 'Name the business owner, technical contact, change approver and risk decision-maker. Provide authorised access and a contact for stopping tests or handling failures. Define which actions need human approval.' },
      { title: 'Acceptance, failure behaviour and running costs', text: 'Choose representative inputs and observable checks. Agree what happens with unavailable systems, denied access, uncertain answers or repeated events. Record cost estimates, budgets or caps, external licences and the person who approves changes.' },
      { title: 'A handover your team can operate', text: 'Agree which configuration records, test evidence, runbooks and access-transfer steps your team receives. Record remaining risks, maintenance ownership and separately required support. An entry project does not automatically include continuous monitoring or an availability SLA.' }
    ],
    acceptanceTitle: 'Make acceptance observable',
    acceptanceIntro: 'A general promise to be secure or useful is hard to assess. Select checks tied to the agreed scope, representative data and your operating constraints. The examples below can start that discussion.',
    sourceIntro: 'These public references help buyers ask better questions about AI risk, secure software development and application verification. They provide context; their inclusion is not certification, accreditation or evidence that a particular project has passed every control.',
    referenceLabels: {
      nistAi: 'NIST AI Risk Management Framework',
      ssdf: 'NIST Secure Software Development Framework',
      owasp: 'OWASP Application Security Verification Standard',
      genai: 'OWASP Top 10 for LLMs and Generative AI Applications'
    },
    publisherLabel: 'Published by',
    updatedLabel: 'Updated',
    guideLink: 'Compare services and prepare your brief',
    factsTitle: 'What to agree for this service',
    deliverablesLabel: 'Deliverables',
    scopeLabel: 'Package scope',
    exclusionsLabel: 'Outside the package',
    inputsLabel: 'What your team provides',
    acceptanceLabel: 'Acceptance examples to discuss',
    acceptanceNote: 'Illustrative checks for negotiation. These are not completed test results, new contractual promises or additions to the package. The written proposal defines the actual acceptance criteria.'
  },
  da: {
    title: 'Vælg AI- eller cybersikkerhedsydelse',
    description: 'Sammenlign AI-automatisering, privat RAG, governance, penetrationstest, DevSecOps og cloudsikkerhed. Afklar omfang, input og acceptkriterier før køb.',
    intro: 'Et nyttigt projekt begynder med et problem, teamet kan beskrive. Brug guiden til at vælge den rette ydelse, forstå pakkens grænser og forberede et tilbud, som beslutningstageren kan vurdere. Fortæl, hvad der skal fungere bedre; vi hjælper med at gøre det til en afgrænset opgave.',
    compareTitle: 'Hvilken ydelse passer til problemet?',
    compareIntro: 'Ydelserne løser forskellige opgaver. Tabellen opsummerer startpakkerne; hver ydelsesside beskriver det fulde omfang og undtagelserne. Større eller kombinerede projekter kræver en særskilt aftale.',
    columns: { service: 'Ydelse', need: 'Start her, når', outputs: 'Brugbare leverancer', boundary: 'Startpakkens grænser' },
    chooseTitle: 'Tre valg, der gør opgaven tydeligere',
    choices: [
      { title: 'Find viden eller udfør arbejde?', text: 'Vælg en privat assistent og RAG-pilot, når autoriserede brugere har brug for svar med grundlag i jeres dokumenter. Vælg sikker automatisering, når en bestemt hændelse skal flytte oplysninger eller gennemføre en proces på tværs af systemer. Søgning og handlinger kan kombineres, men hver handling, rettighed og godkendelse skal afgrænses.' },
      { title: 'Forstå krav eller test en angrebsvej?', text: 'Vælg governance for relevante krav, dokumentationsmangler, ansvar og en plan for parathed. Vælg penetrationstest for at undersøge autoriserede tekniske mål og prioritere rettelser. En penetrationstest giver nyttig dokumentation, men erstatter ikke et governance-program eller dokumenterer fuld compliance.' },
      { title: 'Beskyt releases eller styr cloudadgang?', text: 'Vælg DevSecOps for repository-kontroller, pipeline-identiteter, godkendelser af releases og vejledning i gendannelse. Vælg cloudsikkerhed for udvalgte identiteter, ressourcer, konfiguration og revisionsspor i én konto eller ét projekt. Aftal overdragelsen, hvis en pipeline også kræver ændrede cloudrettigheder.' }
    ],
    checklistTitle: 'Fem ting at aftale før start',
    checklistIntro: 'Medbring de svar, I har. Åbne spørgsmål hører hjemme i den indledende samtale, ikke i en uklar kontrakt.',
    checklist: [
      { title: 'Et skriftligt omfang med grænser', text: 'Angiv proces, produkt, repository eller cloudkonto. Beskriv mål, grænseflader, miljøer og undtagelser. Aftal leverancer, antal tilpasninger eller gentests, og hvordan ekstraarbejde godkendes.' },
      { title: 'Leverandører og hele dataforløbet', text: 'Kortlæg, hvilke data der sendes til hver leverandør, model-endpoint, vidensbase og log. Aftal adgang, leverandørernes databrug, hostingregion, opbevaring og sletning. Europæisk levering af ydelsen fastlægger ikke i sig selv, hvor alle leverandører behandler data.' },
      { title: 'Ansvarlige, der kan godkende beslutninger', text: 'Udpeg forretningsansvarlig, teknisk kontakt, ændringsgodkender og ansvarlig for risikobeslutninger. Sørg for autoriseret adgang og en kontakt, der kan stoppe tests eller håndtere fejl. Definér, hvilke handlinger der kræver menneskelig godkendelse.' },
      { title: 'Accept, fejlhåndtering og driftsomkostninger', text: 'Vælg repræsentative input og kontroller, der kan observeres. Aftal adfærd ved utilgængelige systemer, afvist adgang, usikre svar og gentagne hændelser. Dokumentér prisoverslag, budgetter eller lofter, eksterne licenser og hvem der godkender ændringer.' },
      { title: 'En overdragelse, teamet kan bruge i driften', text: 'Aftal, hvilke konfigurationsoplysninger, testunderlag, driftsvejledninger og adgangsoverdragelser teamet modtager. Dokumentér resterende risici, vedligeholdelsesansvar og særskilt behov for support. Et startprojekt omfatter ikke automatisk løbende overvågning eller en SLA for tilgængelighed.' }
    ],
    acceptanceTitle: 'Gør accepten konkret',
    acceptanceIntro: 'Et generelt løfte om sikkerhed eller nytte er svært at vurdere. Vælg kontroller, der passer til det aftalte omfang, repræsentative data og jeres drift. Eksemplerne nedenfor kan starte samtalen.',
    sourceIntro: 'Disse offentlige referencer hjælper købere med at stille bedre spørgsmål om AI-risici, sikker softwareudvikling og kontrol af applikationer. De giver baggrund; omtalen er ikke certificering, akkreditering eller dokumentation for, at et bestemt projekt opfylder alle kontroller.',
    referenceLabels: {
      nistAi: 'NIST AI Risk Management Framework',
      ssdf: 'NIST Secure Software Development Framework',
      owasp: 'OWASP Application Security Verification Standard',
      genai: 'OWASP Top 10 for LLMs and Generative AI Applications'
    },
    publisherLabel: 'Udgivet af',
    updatedLabel: 'Opdateret',
    guideLink: 'Sammenlign ydelser og forbered opgaven',
    factsTitle: 'Det skal I aftale for denne ydelse',
    deliverablesLabel: 'Leverancer',
    scopeLabel: 'Pakkens omfang',
    exclusionsLabel: 'Uden for pakken',
    inputsLabel: 'Det stiller jeres team til rådighed',
    acceptanceLabel: 'Eksempler på acceptkriterier til drøftelse',
    acceptanceNote: 'Illustrative kontroller til forhandling. De er ikke gennemførte testresultater, nye kontraktløfter eller udvidelser af pakken. Det skriftlige tilbud fastlægger de faktiske acceptkriterier.'
  },
  sv: {
    title: 'Välj AI- eller cybersäkerhetstjänst',
    description: 'Jämför AI-automatisering, privat RAG, styrning, penetrationstest, DevSecOps och molnsäkerhet. Klargör omfattning, underlag och acceptanskriterier före köp.',
    intro: 'Ett användbart projekt börjar med ett problem teamet kan beskriva. Använd guiden för att välja rätt tjänst, förstå paketets gränser och förbereda en offert som beslutsfattaren kan bedöma. Berätta vad som behöver fungera bättre; vi hjälper er att göra det till ett avgränsat uppdrag.',
    compareTitle: 'Vilken tjänst passar problemet?',
    compareIntro: 'Tjänsterna löser olika uppgifter. Tabellen sammanfattar startpaketen; varje tjänstesida beskriver hela omfattningen och undantagen. Större eller kombinerade projekt kräver ett separat avtal.',
    columns: { service: 'Tjänst', need: 'Börja här när', outputs: 'Användbara leveranser', boundary: 'Startpaketets gränser' },
    chooseTitle: 'Tre val som gör uppdraget tydligare',
    choices: [
      { title: 'Hitta kunskap eller utföra arbete?', text: 'Välj en privat assistent och RAG-pilot när behöriga användare behöver svar grundade i era dokument. Välj säker automatisering när en bestämd händelse ska flytta information eller genomföra en process mellan system. Informationshämtning och åtgärder kan kombineras, men varje åtgärd, behörighet och godkännande behöver avgränsas.' },
      { title: 'Förstå krav eller testa en angreppsväg?', text: 'Välj styrning för tillämpliga krav, brister i underlag, ansvar och en beredskapsplan. Välj penetrationstest för att undersöka auktoriserade tekniska mål och prioritera rättningar. Ett penetrationstest ger användbara underlag, men ersätter inte ett styrningsprogram eller visar fullständig regelefterlevnad.' },
      { title: 'Skydda releaser eller styra molnåkomst?', text: 'Välj DevSecOps för kontroller i kodarkivet, pipeline-identiteter, releasegodkännanden och återställningsvägledning. Välj molnsäkerhet för utvalda identiteter, resurser, konfiguration och granskningsspår i ett konto eller projekt. Avtala överlämningen om en pipeline också kräver ändrade molnbehörigheter.' }
    ],
    checklistTitle: 'Fem saker att avtala före start',
    checklistIntro: 'Ta med de svar ni har. Öppna frågor hör hemma i det inledande samtalet, inte i ett otydligt avtal.',
    checklist: [
      { title: 'En skriftlig omfattning med gränser', text: 'Ange process, produkt, kodarkiv eller molnkonto. Beskriv mål, gränssnitt, miljöer och undantag. Avtala leveranser, antal justeringar eller omtester och hur extraarbete godkänns.' },
      { title: 'Leverantörer och hela dataflödet', text: 'Kartlägg vilka data som skickas till varje leverantör, modell-endpoint, kunskapslager och logg. Avtala åtkomst, leverantörernas dataanvändning, lagringsregion, lagringstid och radering. Europeisk tjänsteleverans avgör inte i sig var alla leverantörer behandlar data.' },
      { title: 'Ansvariga som kan godkänna beslut', text: 'Utse verksamhetsägare, teknisk kontakt, ändringsgodkännare och ansvarig för riskbeslut. Ordna auktoriserad åtkomst och en kontakt som kan stoppa tester eller hantera fel. Definiera vilka åtgärder som kräver mänskligt godkännande.' },
      { title: 'Acceptans, felhantering och driftkostnader', text: 'Välj representativa indata och observerbara kontroller. Avtala beteendet vid otillgängliga system, nekad åtkomst, osäkra svar och upprepade händelser. Dokumentera kostnadsuppskattningar, budgetar eller tak, externa licenser och vem som godkänner ändringar.' },
      { title: 'En överlämning teamet kan använda i driften', text: 'Avtala vilka konfigurationsuppgifter, testunderlag, driftinstruktioner och steg för åtkomstöverföring teamet får. Dokumentera kvarstående risker, underhållsansvar och separat behov av support. Ett startprojekt omfattar inte automatiskt löpande övervakning eller en SLA för tillgänglighet.' }
    ],
    acceptanceTitle: 'Gör acceptansen konkret',
    acceptanceIntro: 'Ett allmänt löfte om säkerhet eller nytta är svårt att bedöma. Välj kontroller som passar avtalad omfattning, representativa data och er drift. Exemplen nedan kan inleda diskussionen.',
    sourceIntro: 'Dessa offentliga referenser hjälper köpare att ställa bättre frågor om AI-risker, säker programvaruutveckling och verifiering av applikationer. De ger bakgrund; omnämnandet är inte certifiering, ackreditering eller bevis för att ett visst projekt klarat alla kontroller.',
    referenceLabels: {
      nistAi: 'NIST AI Risk Management Framework',
      ssdf: 'NIST Secure Software Development Framework',
      owasp: 'OWASP Application Security Verification Standard',
      genai: 'OWASP Top 10 for LLMs and Generative AI Applications'
    },
    publisherLabel: 'Publicerad av',
    updatedLabel: 'Uppdaterad',
    guideLink: 'Jämför tjänster och förbered uppdraget',
    factsTitle: 'Det behöver ni avtala för den här tjänsten',
    deliverablesLabel: 'Leveranser',
    scopeLabel: 'Paketets omfattning',
    exclusionsLabel: 'Utanför paketet',
    inputsLabel: 'Det här tillhandahåller ert team',
    acceptanceLabel: 'Exempel på acceptanskriterier att diskutera',
    acceptanceNote: 'Illustrativa kontroller att förhandla om. De är inte genomförda testresultat, nya avtalslöften eller tillägg till paketet. Den skriftliga offerten fastställer de faktiska acceptanskriterierna.'
  }
};

export const buyerRows = {
  'compliance-ai-governance': {
    en: {
      need: 'AI responsibilities are unclear or customers need coherent compliance evidence.',
      outputs: 'An AI/data map, prioritised gaps, an action plan, up to three document drafts and handover.',
      boundary: 'One organisation, one process or product, one framework and up to ten control areas. Certification, legal opinions and a DPO appointment are excluded.',
      acceptance: ['Each agreed control area links to available evidence or a recorded gap, with a proposed owner and next step.', 'Document drafts identify the agreed process and framework, assumptions and decisions needing your approval.']
    },
    da: {
      need: 'AI-ansvar er uklart, eller kunder kræver sammenhængende dokumentation for compliance.',
      outputs: 'Kortlægning af AI og data, prioriterede mangler, handlingsplan, op til tre dokumentudkast og overdragelse.',
      boundary: 'Én organisation, én proces eller ét produkt, ét regelsæt eller én standard og op til ti kontrolområder. Certificering, juridiske udtalelser og DPO-udpegning er undtaget.',
      acceptance: ['Hvert aftalt kontrolområde henviser til eksisterende dokumentation eller en registreret mangel med foreslået ansvarlig og næste skridt.', 'Dokumentudkast angiver aftalt proces og regelsæt, forudsætninger og beslutninger, der kræver jeres godkendelse.']
    },
    sv: {
      need: 'AI-ansvaret är oklart eller kunder behöver sammanhängande underlag för regelefterlevnad.',
      outputs: 'Kartläggning av AI och data, prioriterade brister, åtgärdsplan, upp till tre dokumentutkast och överlämning.',
      boundary: 'En organisation, en process eller produkt, ett regelverk eller en standard och upp till tio kontrollområden. Certifiering, juridiska utlåtanden och DPO-utnämning ingår inte.',
      acceptance: ['Varje avtalat kontrollområde hänvisar till befintligt underlag eller en dokumenterad brist, med föreslagen ansvarig och nästa steg.', 'Dokumentutkast anger avtalad process och regelverk, antaganden och beslut som kräver ert godkännande.']
    }
  },
  'secure-ai-automation': {
    en: {
      need: 'A repeated business process needs fewer manual handoffs and clearer controls.',
      outputs: 'A workflow specification, scoped integrations, validation, approvals, failure handling and handover.',
      boundary: 'One workflow, up to two systems with documented APIs, one trigger, one environment and two refinement rounds. Missing APIs, major migrations and unrestricted consequential actions are excluded.',
      acceptance: ['Replaying an agreed input does not create a duplicate action; the test records the outcome.', 'An agreed downstream failure produces the defined alert or human handoff; a sensitive action waits for required approval.']
    },
    da: {
      need: 'En gentagen forretningsproces kræver færre manuelle overdragelser og tydeligere kontrol.',
      outputs: 'Procesbeskrivelse, afgrænsede integrationer, validering, godkendelser, fejlhåndtering og overdragelse.',
      boundary: 'Én arbejdsgang, op til to systemer med dokumenterede API’er, én trigger, ét miljø og to tilpasningsrunder. Manglende API’er, store migreringer og ubegrænsede væsentlige handlinger er undtaget.',
      acceptance: ['Gentagelse af et aftalt input skaber ikke en dubleret handling; testen registrerer resultatet.', 'En aftalt fejl i et tilsluttet system udløser den definerede alarm eller menneskelig overtagelse; følsomme handlinger afventer krævet godkendelse.']
    },
    sv: {
      need: 'En återkommande affärsprocess behöver färre manuella överlämningar och tydligare kontroll.',
      outputs: 'Processbeskrivning, avgränsade integrationer, validering, godkännanden, felhantering och överlämning.',
      boundary: 'Ett arbetsflöde, upp till två system med dokumenterade API:er, en utlösare, en miljö och två justeringsrundor. Saknade API:er, stora migreringar och obegränsade väsentliga åtgärder ingår inte.',
      acceptance: ['Upprepning av ett avtalat indatafall skapar ingen dubbel åtgärd; testet dokumenterar utfallet.', 'Ett avtalat fel i ett anslutet system ger definierat larm eller mänsklig överlämning; känsliga åtgärder inväntar erforderligt godkännande.']
    }
  },
  'private-ai-agents-rag': {
    en: {
      need: 'Users need answers from your knowledge, with permissions and traceable sources.',
      outputs: 'A permission-aware assistant pilot, source citations, scoped controls, evaluation and handover.',
      boundary: 'One assistant, one ready knowledge source, one interface, one cloud, up to two roles and ten pilot users. Actions need explicit scope; multi-cloud, extensive OCR and production availability commitments are excluded.',
      acceptance: ['The agreed restricted-document test denies retrieval and source access to a role without permission.', 'Agreed supported questions cite permitted sources; an unsupported question produces the defined refusal or handoff.']
    },
    da: {
      need: 'Brugere skal have svar fra jeres viden med rettighedskontrol og sporbare kilder.',
      outputs: 'En assistentpilot med rettighedskontrol, kildehenvisninger, afgrænsede kontroller, evaluering og overdragelse.',
      boundary: 'Én assistent, én klargjort videnskilde, én grænseflade, én cloud, op til to roller og ti pilotbrugere. Handlinger aftales udtrykkeligt; multi-cloud, omfattende OCR og tilgængelighedsløfter for produktion er undtaget.',
      acceptance: ['Den aftalte test af et adgangsbegrænset dokument afviser søgning og kildeadgang for en rolle uden tilladelse.', 'Aftalte spørgsmål med dokumentation henviser til tilladte kilder; et udokumenteret spørgsmål giver det definerede afslag eller overdragelse.']
    },
    sv: {
      need: 'Användare behöver svar från er kunskap med behörighetskontroll och spårbara källor.',
      outputs: 'En assistentpilot med behörighetskontroll, källhänvisningar, avgränsade kontroller, utvärdering och överlämning.',
      boundary: 'En assistent, en förberedd kunskapskälla, ett gränssnitt, ett moln, upp till två roller och tio pilotanvändare. Åtgärder avtalas uttryckligen; flera moln, omfattande OCR och tillgänglighetslöften för produktion ingår inte.',
      acceptance: ['Det avtalade testet av ett begränsat dokument nekar informationshämtning och källåtkomst för en roll utan behörighet.', 'Avtalade frågor med stöd i underlagen hänvisar till tillåtna källor; en fråga utan stöd ger definierat avböjande eller överlämning.']
    }
  },
  'pentesting-red-teaming': {
    en: {
      need: 'You need to examine an authorised web/API attack path and prioritise fixes.',
      outputs: 'Rules of Engagement, protected evidence, prioritised findings, a report, handover and one included-fix verification within 30 days.',
      boundary: 'One small web app, up to two roles and ten API endpoints. Broad red teaming, phishing, load tests and destructive testing are separate.',
      acceptance: ['Any reported finding records an authorised target, proportionate reproduction evidence, severity and remediation guidance.', 'The agreed verification records the status of included fixes within the authorised scope and the package’s 30-day window.']
    },
    da: {
      need: 'I vil undersøge en autoriseret angrebsvej i web eller API og prioritere rettelser.',
      outputs: 'Testregler, beskyttet evidens, prioriterede fund, rapport, overdragelse og én kontrol af inkluderede rettelser inden 30 dage.',
      boundary: 'Én lille webapplikation, op til to roller og ti API-endpoints. Bred red teaming, phishing, belastningstest og destruktiv test aftales separat.',
      acceptance: ['Hvert rapporteret fund angiver et autoriseret mål, passende evidens for reproduktion, alvorlighed og vejledning til afhjælpning.', 'Den aftalte kontrol dokumenterer status for inkluderede rettelser inden for autoriseret omfang og pakkens frist på 30 dage.']
    },
    sv: {
      need: 'Ni vill undersöka en auktoriserad angreppsväg i webb eller API och prioritera rättningar.',
      outputs: 'Testregler, skyddade underlag, prioriterade fynd, rapport, överlämning och en kontroll av inkluderade rättningar inom 30 dagar.',
      boundary: 'En liten webbapplikation, upp till två roller och tio API-endpoints. Bred red teaming, nätfiske, belastningstest och destruktiv testning avtalas separat.',
      acceptance: ['Varje rapporterat fynd anger ett auktoriserat mål, proportionerligt underlag för reproduktion, allvarlighetsgrad och åtgärdsvägledning.', 'Den avtalade kontrollen dokumenterar status för inkluderade rättningar inom auktoriserad omfattning och paketets tidsfönster på 30 dagar.']
    }
  },
  devsecops: {
    en: {
      need: 'Your route from code to release needs better checks, permissions and approvals.',
      outputs: 'A focused threat model, code/dependency/secret checks, pipeline identity controls, release gates and recovery guidance.',
      boundary: 'One repository, one pipeline, one deployment target and up to two environments. Platform migration is excluded; extra checks and supply-chain features require agreement.',
      acceptance: ['An agreed test change exercises a release gate and records the expected block, approval or authorised exception.', 'Deployment identity permissions and the documented rollback steps are reviewed against the agreed target and environments.']
    },
    da: {
      need: 'Vejen fra kode til release kræver bedre kontroller, rettigheder og godkendelser.',
      outputs: 'Afgrænset trusselsmodel, kode-, afhængigheds- og hemmelighedsscanning, pipeline-identiteter, releasekontroller og gendannelsesvejledning.',
      boundary: 'Ét repository, én pipeline, ét deployment-mål og op til to miljøer. Platformsmigrering er undtaget; ekstra kontroller og forsyningskædefunktioner kræver aftale.',
      acceptance: ['En aftalt testændring afprøver en releasekontrol og dokumenterer forventet blokering, godkendelse eller autoriseret undtagelse.', 'Deployment-identitetens rettigheder og dokumenterede rollback-trin gennemgås i forhold til aftalt mål og miljøer.']
    },
    sv: {
      need: 'Vägen från kod till release behöver bättre kontroller, behörigheter och godkännanden.',
      outputs: 'Avgränsad hotmodell, kod-, beroende- och hemlighetsskanning, pipeline-identiteter, releasekontroller och återställningsvägledning.',
      boundary: 'Ett kodarkiv, en pipeline, ett driftsättningsmål och upp till två miljöer. Plattformsmigrering ingår inte; extra kontroller och leveranskedjefunktioner kräver avtal.',
      acceptance: ['En avtalad teständring prövar en releasekontroll och dokumenterar förväntad blockering, godkännande eller auktoriserat undantag.', 'Driftsättningsidentitetens behörigheter och dokumenterade återställningssteg granskas mot avtalat mål och avtalade miljöer.']
    }
  },
  'cloud-security': {
    en: {
      need: 'Selected cloud identities, permissions, configuration and security signals need review.',
      outputs: 'A permissions map, licensing-dependent access controls, audit logging, up to five alerts, emergency-access guidance and a treatment plan.',
      boundary: 'One subscription, account or project, up to ten identities and ten selected resources. Multi-cloud, a complete SOC, emergency availability and a response SLA are excluded.',
      acceptance: ['An agreed role change is checked for authorised access and excessive permissions before approved activation.', 'An agreed test event reaches the designated audit log or alert route; emergency-access instructions identify ownership and approval.']
    },
    da: {
      need: 'Udvalgte cloudidentiteter, rettigheder, konfiguration og sikkerhedssignaler kræver gennemgang.',
      outputs: 'Rettighedskort, licensafhængige adgangskontroller, revisionslogs, op til fem alarmer, nødadgangsvejledning og behandlingsplan.',
      boundary: 'Ét abonnement, én konto eller ét projekt, op til ti identiteter og ti udvalgte ressourcer. Multi-cloud, fuldt SOC, akut tilgængelighed og respons-SLA er undtaget.',
      acceptance: ['En aftalt rolleændring kontrolleres for autoriseret adgang og for omfattende rettigheder før godkendt aktivering.', 'En aftalt testhændelse når den udpegede revisionslog eller alarmkanal; nødadgangsvejledningen angiver ansvar og godkendelse.']
    },
    sv: {
      need: 'Utvalda molnidentiteter, behörigheter, konfiguration och säkerhetssignaler behöver granskas.',
      outputs: 'Behörighetskarta, licensberoende åtkomstkontroller, granskningsloggar, upp till fem larm, nödåtkomstvägledning och åtgärdsplan.',
      boundary: 'En prenumeration, ett konto eller projekt, upp till tio identiteter och tio utvalda resurser. Flera moln, fullständigt SOC, akut tillgänglighet och respons-SLA ingår inte.',
      acceptance: ['En avtalad rolländring kontrolleras för auktoriserad åtkomst och överdrivna behörigheter före godkänd aktivering.', 'En avtalad testhändelse når angiven granskningslogg eller larmkanal; nödåtkomstinstruktionen anger ansvar och godkännande.']
    }
  }
};
