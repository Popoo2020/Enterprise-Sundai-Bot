// Localised service content. Prices are the standard fixed-scope package prices in EUR.
export const services = [
  {
    id: 'compliance-ai-governance', price: 1350,
    copy: {
      en: {
        name: 'Compliance, GRC & AI Governance',
        headline: 'Compliance without the corporate crap.',
        description: 'Turn regulatory complexity into a clear plan—with risks, owners and evidence your team can actually use.',
        problem: 'Policies scattered across folders. AI tools nobody has mapped. Customers asking for evidence. Start by understanding which obligations and controls matter to your organisation.',
        outcome: 'A prioritised readiness plan for one agreed framework, with named owners, useful evidence and practical next steps. Applicability is assessed by country, sector, size and organisational role.',
        deliverables: ['Map AI uses, suppliers, data flows and responsibilities for the agreed process or product.', 'Review up to ten control areas and record gaps, supporting evidence and risk priorities.', 'Deliver an action plan, up to three draft documents and a handover session.'],
        scope: 'Compliance Readiness Sprint: one organisation, one process or product, one framework and up to ten control areas. We agree the scope and acceptance criteria in writing before work starts.',
        exclusions: 'Full ISMS implementation, ISO certification, a SOC 2 examination, legal opinions and DPO appointment are outside this package. Wider implementation is quoted separately.',
        responsibility: 'Provide accurate process information, relevant policies and a decision-maker. Your organisation owns the resulting decisions, implementation and ongoing compliance. Changes to the agreed scope require approval before work proceeds.',
        example: 'Illustrative deliverable, not a client result: a register showing an AI supplier, data category, control gap, accountable owner and agreed remediation date.',
        faq: [
          { q: 'Which frameworks can we discuss?', a: 'ISO/IEC 27001 and ISO/IEC 42001 readiness, GDPR consulting, NIS2 readiness, DORA readiness and SOC 2 readiness, where applicable. The entry package covers one agreed framework; it does not assert that all of them apply to you.' },
          { q: 'Does this certify us?', a: 'No. ISO certification is issued by an appropriate certification body. SOC 2 is a separate professional examination and report. Readiness advice or a single penetration test cannot establish complete regulatory compliance.' },
          { q: 'Can you help with a DPIA?', a: 'A separately scoped DPIA covers one defined processing activity: processing description, necessity and proportionality, risks to people’s rights, mitigations, residual risk and follow-up ownership. It does not guarantee avoidance of fines.' },
          { q: 'Are CISO and DPO services included?', a: 'No. Fractional CISO is a security leadership service; DPO is a distinct privacy role. Each requires a suitable professional and a defined mandate. Independence and conflicts of interest must be checked before combining roles.' }
        ]
      },
      da: {
        name: 'Compliance, GRC & AI-governance',
        headline: 'Compliance uden unødigt bureaukrati.',
        description: 'Gør komplekse krav til en klar plan med risici, ansvarlige og dokumentation, som dit team faktisk kan bruge.',
        problem: 'Politikker ligger spredt. Ingen har overblik over AI-værktøjerne. Kunder efterspørger dokumentation. Første skridt er at forstå, hvilke krav og kontroller der er relevante for din organisation.',
        outcome: 'En prioriteret plan for parathed til ét aftalt regelsæt eller én standard, med ansvarlige, anvendelig dokumentation og konkrete næste skridt. Relevansen vurderes ud fra land, branche, størrelse og organisationens rolle.',
        deliverables: ['Kortlæg AI-anvendelser, leverandører, datastrømme og ansvar for den aftalte proces eller det aftalte produkt.', 'Gennemgå op til ti kontrolområder, og dokumentér mangler, eksisterende evidens og risikoprioriteter.', 'Modtag en handlingsplan, op til tre dokumentudkast og et overdragelsesmøde.'],
        scope: 'Compliance Readiness Sprint: én organisation, én proces eller ét produkt, ét regelsæt eller én standard og op til ti kontrolområder. Omfang og acceptkriterier aftales skriftligt, før arbejdet begynder.',
        exclusions: 'Fuld implementering af et ISMS, ISO-certificering, SOC 2-erklæring, juridiske udtalelser og udpegning af en DPO er ikke inkluderet. Større implementeringer får et særskilt tilbud.',
        responsibility: 'Stil korrekte procesoplysninger, relevante politikker og en beslutningstager til rådighed. Organisationen er ansvarlig for beslutninger, implementering og løbende overholdelse. Ændringer af omfanget skal godkendes, før de udføres.',
        example: 'Illustrativ leverance, ikke et kunderesultat: et register med AI-leverandør, datakategori, kontrolmangel, ansvarlig og aftalt frist for afhjælpning.',
        faq: [
          { q: 'Hvilke standarder og krav kan vi tale om?', a: 'Parathed til ISO/IEC 27001 og ISO/IEC 42001, GDPR-rådgivning, NIS2-parathed, DORA-parathed og SOC 2-parathed, hvor det er relevant. Startpakken omfatter ét aftalt regelsæt eller én standard; vi antager ikke, at alle gælder for jer.' },
          { q: 'Bliver vi certificeret?', a: 'Nej. ISO-certificering udstedes af et relevant certificeringsorgan. SOC 2 er en særskilt professionel undersøgelse og rapport. Rådgivning om parathed eller én penetrationstest dokumenterer ikke fuld regeloverholdelse.' },
          { q: 'Kan I hjælpe med en konsekvensanalyse?', a: 'En særskilt afgrænset DPIA omfatter én defineret behandling: beskrivelse, nødvendighed og proportionalitet, risici for personers rettigheder, afværgeforanstaltninger, restrisiko og ansvar for opfølgning. Den garanterer ikke, at bøder undgås.' },
          { q: 'Er CISO- og DPO-ydelser inkluderet?', a: 'Nej. Fractional CISO er sikkerhedsledelse; DPO er en særskilt databeskyttelsesrolle. Begge kræver en egnet fagperson og et klart mandat. Uafhængighed og interessekonflikter undersøges, før roller eventuelt kombineres.' }
        ]
      },
      sv: {
        name: 'Compliance, GRC & AI-styrning',
        headline: 'Regelefterlevnad utan onödig byråkrati.',
        description: 'Gör komplexa krav till en tydlig plan med risker, ansvariga och underlag som teamet faktiskt kan använda.',
        problem: 'Policyer ligger utspridda. Ingen har kartlagt AI-verktygen. Kunder efterfrågar underlag. Börja med att förstå vilka krav och kontroller som är relevanta för organisationen.',
        outcome: 'En prioriterad beredskapsplan för ett överenskommet regelverk eller en standard, med ansvariga, användbara underlag och konkreta nästa steg. Tillämpligheten bedöms utifrån land, sektor, storlek och organisationens roll.',
        deliverables: ['Kartlägg AI-användning, leverantörer, dataflöden och ansvar för den avtalade processen eller produkten.', 'Granska upp till tio kontrollområden och dokumentera brister, befintliga underlag och riskprioriteringar.', 'Få en åtgärdsplan, upp till tre dokumentutkast och ett överlämningsmöte.'],
        scope: 'Compliance Readiness Sprint: en organisation, en process eller produkt, ett regelverk eller en standard och upp till tio kontrollområden. Omfattning och acceptanskriterier avtalas skriftligt innan arbetet börjar.',
        exclusions: 'Fullständig ISMS-implementering, ISO-certifiering, SOC 2-granskning, juridiska utlåtanden och utnämning av dataskyddsombud ingår inte. Mer omfattande implementering offereras separat.',
        responsibility: 'Tillhandahåll korrekta processuppgifter, relevanta policyer och en beslutsfattare. Organisationen ansvarar för beslut, genomförande och löpande regelefterlevnad. Ändringar i omfattningen kräver godkännande innan arbetet utförs.',
        example: 'Illustrativ leverans, inte ett kundresultat: ett register med AI-leverantör, datakategori, kontrollbrist, ansvarig och avtalat åtgärdsdatum.',
        faq: [
          { q: 'Vilka standarder och regelverk kan vi diskutera?', a: 'Beredskap inför ISO/IEC 27001 och ISO/IEC 42001, GDPR-rådgivning, NIS2-beredskap, DORA-beredskap och SOC 2-beredskap där de är tillämpliga. Startpaketet omfattar ett överenskommet regelverk eller en standard; vi förutsätter inte att samtliga gäller er.' },
          { q: 'Blir vi certifierade?', a: 'Nej. ISO-certifiering utfärdas av ett lämpligt certifieringsorgan. SOC 2 är en separat professionell granskning och rapport. Beredskapsrådgivning eller ett enskilt penetrationstest visar inte fullständig regelefterlevnad.' },
          { q: 'Kan ni hjälpa till med en konsekvensbedömning?', a: 'En separat avgränsad DPIA omfattar en definierad behandling: beskrivning, nödvändighet och proportionalitet, risker för människors rättigheter, skyddsåtgärder, kvarstående risk och ansvar för uppföljning. Den garanterar inte att böter undviks.' },
          { q: 'Ingår CISO- och DPO-tjänster?', a: 'Nej. Fractional CISO är säkerhetsledning; DPO är en separat dataskyddsroll. Båda kräver en lämplig yrkesperson och ett tydligt uppdrag. Oberoende och intressekonflikter bedöms innan roller eventuellt kombineras.' }
        ]
      }
    }
  },
  {
    id: 'secure-ai-automation', price: 2250,
    copy: {
      en: {
        name: 'Secure AI Business Automation', headline: 'Kill the busywork. Keep the control.',
        description: 'Turn repetitive tasks into secure workflows built around your product, your people and the systems you already use.',
        problem: 'Orders, inventory, CRM updates, scheduling and reports keep crossing the same desks. Manual handoffs waste time and make mistakes harder to trace.',
        outcome: 'One scoped business process with clear permissions, controlled retries and human approval where it matters. We choose rules, Python/API integrations, a workflow platform or an LLM to fit the problem.',
        deliverables: ['Process specification, data map and integrations with least-privilege access and managed secrets.', 'Input/output validation, token budgets where relevant, retries, duplicate-action prevention, minimal logs and alerts.', 'Approval for sensitive actions, fallback behaviour, two refinement rounds and handover documentation.'],
        scope: 'Secure AI Automation Sprint: one workflow, up to two systems with existing documented APIs, one trigger, one deployment environment and two refinement rounds. Acceptance criteria and operating costs are agreed before implementation.',
        exclusions: 'Creating an unavailable API, major system migration and unrestricted payments or consequential actions are excluded. Cloud, model, messaging and external licence costs are agreed separately with a budget or cap.',
        responsibility: 'Provide authorised API access, a process owner and representative test data. Approve sensitive actions and the acceptance tests; retain responsibility for operational decisions and permissions.',
        example: 'Illustrative workflow, not a client result: an order event validates stock, drafts a CRM update, requests approval for exceptions and records a minimal audit trail.',
        faq: [
          { q: 'Does every workflow need AI?', a: 'No. Deterministic rules or API automation can be a better fit. We use an LLM only where it adds useful capability and can be bounded and tested.' },
          { q: 'Can it act without supervision?', a: 'Only for explicitly agreed low-risk actions. Payments and other material actions need the approval controls defined in the scope; a model-generated instruction alone is not authority to act.' },
          { q: 'What happens when a service fails?', a: 'The agreed design includes controlled retries, duplicate prevention, alerts and a fallback or human handoff. Recovery behaviour is tested against the acceptance criteria, rather than relying on silent success.' }
        ]
      },
      da: {
        name: 'Sikker AI-automatisering af virksomheden', headline: 'Drop rutinearbejdet. Behold kontrollen.',
        description: 'Gør gentagne opgaver til sikre arbejdsgange, der passer til dit produkt, dine medarbejdere og de systemer, I allerede bruger.',
        problem: 'Ordrer, lager, CRM-opdateringer, planlægning og rapporter går gennem de samme hænder igen og igen. Manuelle overdragelser tager tid og gør fejl sværere at spore.',
        outcome: 'Én afgrænset forretningsproces med klare rettigheder, kontrollerede genforsøg og menneskelig godkendelse, hvor det er nødvendigt. Vi vælger regler, Python/API, en workflow-platform eller en LLM ud fra opgaven.',
        deliverables: ['Procesbeskrivelse, datakortlægning og integrationer med mindst mulige rettigheder og administrerede hemmeligheder.', 'Validering af input og output, relevante tokenbudgetter, genforsøg, forebyggelse af dublerede handlinger, begrænsede logs og alarmer.', 'Godkendelse af følsomme handlinger, fallback, to tilpasningsrunder og dokumentation til overdragelse.'],
        scope: 'Secure AI Automation Sprint: én arbejdsgang, op til to systemer med eksisterende dokumenterede API’er, én trigger, ét driftsmiljø og to tilpasningsrunder. Acceptkriterier og driftsomkostninger aftales før implementering.',
        exclusions: 'Udvikling af et manglende API, større systemmigreringer og ubegrænsede betalinger eller væsentlige handlinger er ikke inkluderet. Cloud, modeller, beskedtjenester og eksterne licenser aftales særskilt med budget eller loft.',
        responsibility: 'Stil autoriseret API-adgang, en procesejer og repræsentative testdata til rådighed. Godkend følsomme handlinger og accepttests, og behold ansvaret for driftsbeslutninger og rettigheder.',
        example: 'Illustrativ arbejdsgang, ikke et kunderesultat: en ordrehændelse validerer lagerstatus, klargør en CRM-opdatering, kræver godkendelse ved undtagelser og gemmer et begrænset revisionsspor.',
        faq: [
          { q: 'Kræver alle arbejdsgange AI?', a: 'Nej. Faste regler eller API-automatisering kan være bedre. Vi bruger kun en LLM, når den tilfører relevant funktionalitet, som kan afgrænses og testes.' },
          { q: 'Kan løsningen handle uden opsyn?', a: 'Kun ved udtrykkeligt aftalte handlinger med lav risiko. Betalinger og andre væsentlige handlinger kræver de godkendelseskontroller, der er fastlagt i omfanget. En modelgenereret instruktion er ikke i sig selv en tilladelse.' },
          { q: 'Hvad sker der, når en tjeneste fejler?', a: 'Det aftalte design omfatter kontrollerede genforsøg, forebyggelse af dubletter, alarmer og fallback eller menneskelig overtagelse. Gendannelsesadfærden testes mod acceptkriterierne.' }
        ]
      },
      sv: {
        name: 'Säker AI-automatisering för företag', headline: 'Slipp rutinjobbet. Behåll kontrollen.',
        description: 'Gör återkommande uppgifter till säkra arbetsflöden för din produkt, dina medarbetare och systemen ni redan använder.',
        problem: 'Beställningar, lager, CRM-uppdateringar, planering och rapporter passerar samma skrivbord gång på gång. Manuella överlämningar tar tid och gör fel svårare att spåra.',
        outcome: 'En avgränsad affärsprocess med tydliga behörigheter, kontrollerade återförsök och mänskligt godkännande där det behövs. Vi väljer regler, Python/API, en arbetsflödesplattform eller en LLM efter problemet.',
        deliverables: ['Processbeskrivning, datakartläggning och integrationer med minsta möjliga behörighet och hanterade hemligheter.', 'Validering av indata och utdata, relevanta tokenbudgetar, återförsök, skydd mot dubbla åtgärder, begränsade loggar och larm.', 'Godkännande av känsliga åtgärder, reservförfarande, två justeringsrundor och överlämningsdokumentation.'],
        scope: 'Secure AI Automation Sprint: ett arbetsflöde, upp till två system med befintliga dokumenterade API:er, en utlösare, en driftsmiljö och två justeringsrundor. Acceptanskriterier och driftkostnader avtalas före implementeringen.',
        exclusions: 'Utveckling av ett saknat API, större systemmigreringar och obegränsade betalningar eller väsentliga åtgärder ingår inte. Moln, modeller, meddelandetjänster och externa licenser avtalas separat med budget eller kostnadstak.',
        responsibility: 'Tillhandahåll auktoriserad API-åtkomst, en processägare och representativa testdata. Godkänn känsliga åtgärder och acceptanstester och behåll ansvaret för verksamhetsbeslut och behörigheter.',
        example: 'Illustrativt arbetsflöde, inte ett kundresultat: en orderhändelse validerar lagerstatus, förbereder en CRM-uppdatering, kräver godkännande vid avvikelser och sparar ett begränsat granskningsspår.',
        faq: [
          { q: 'Behöver alla arbetsflöden AI?', a: 'Nej. Fasta regler eller API-automatisering kan passa bättre. Vi använder en LLM endast när den ger användbar funktionalitet som kan avgränsas och testas.' },
          { q: 'Kan lösningen agera utan tillsyn?', a: 'Endast för uttryckligen avtalade åtgärder med låg risk. Betalningar och andra väsentliga åtgärder kräver de godkännandekontroller som anges i uppdraget. En modellgenererad instruktion är inte i sig ett tillstånd.' },
          { q: 'Vad händer när en tjänst slutar fungera?', a: 'Den avtalade lösningen omfattar kontrollerade återförsök, skydd mot dubbletter, larm och reservförfarande eller mänsklig överlämning. Återhämtningen testas mot acceptanskriterierna.' }
        ]
      }
    }
  },
  {
    id: 'private-ai-agents-rag', price: 10300,
    copy: {
      en: {
        name: 'Private AI Assistants, Agents & RAG', headline: 'Your business brain. Your rules.',
        description: 'Custom assistants and agents connected to your knowledge—with permission-aware retrieval, scoped tools and auditable actions.',
        problem: 'Your knowledge is useful only if the right people can find it. A generic chatbot can miss context, expose restricted information or follow instructions hidden in an untrusted source.',
        outcome: 'A private AI assistant pilot that retrieves permitted knowledge, cites its sources and declines unsupported answers. One suitable cloud—Azure, AWS or Google Cloud—is selected for the agreed architecture.',
        deliverables: ['User identity and permissions enforced before retrieval, with separation of clients and sources across embeddings, vector stores, caches and exports.', 'Scoped tools, supervised write actions, separation of instructions from untrusted content, and prompt-injection and source-poisoning tests.', 'Secret protection, minimal sensitive logging, answer citations, retention and deletion rules, usage and cost controls, security and acceptance tests, and handover.'],
        scope: 'Private AI Assistant / RAG Pilot: one assistant, one ready-to-use knowledge source, one interface, one cloud provider, up to two user roles and up to ten pilot users. Agent actions are included only when explicitly described in the written scope.',
        exclusions: 'Multi-cloud, fine-tuning, extensive OCR, production availability commitments and WhatsApp Business are outside the base package. Additional channels, data preparation and integration work are separately scoped.',
        responsibility: 'Provide a knowledge source you are authorised to use, accurate role permissions and a pilot owner. Approve data-processing terms, retention, suppliers and hosting region before deployment. Validate the pilot before expanding its use.',
        example: 'Illustrative answer, not a client result: “According to the approved onboarding policy, section 3…” with a source link visible only to users permitted to access that document.',
        faq: [
          { q: 'What does private mean here?', a: 'Access and data handling are scoped for your organisation. The project identifies who processes content, which endpoints receive it, the storage region, supplier data-use terms and processing agreements. Private does not automatically mean EU-only or on-premises.' },
          { q: 'Is the complete AI chain end-to-end encrypted?', a: 'We specify TLS in transit and encryption at rest according to the architecture. We do not describe the complete path to an LLM as end-to-end encrypted without evidence that supports that claim.' },
          { q: 'Can we add WhatsApp or website chat?', a: 'Yes, subject to a separate scope, platform permissions, processing terms and supplier costs. The base pilot includes one agreed interface; it does not include WhatsApp Business.' },
          { q: 'Will it always answer correctly?', a: 'No. Source citation, permission checks, unsupported-answer refusal and agreed evaluation tests reduce risk. Important decisions remain subject to the human review defined for the use case.' }
        ]
      },
      da: {
        name: 'Private AI-assistenter, agenter & RAG', headline: 'Virksomhedens viden. Dine regler.',
        description: 'Skræddersyede assistenter og agenter koblet til jeres viden med rettighedsstyret søgning, afgrænsede værktøjer og sporbare handlinger.',
        problem: 'Viden skaber først værdi, når de rette personer kan finde den. En generisk chatbot kan mangle kontekst, vise fortrolige oplysninger eller følge instruktioner skjult i en upålidelig kilde.',
        outcome: 'En pilot med en privat AI-assistent, der kun henter tilladt viden, angiver kilder og afviser svar uden tilstrækkeligt grundlag. Vi vælger én passende cloud—Azure, AWS eller Google Cloud—til den aftalte arkitektur.',
        deliverables: ['Brugeridentitet og rettigheder kontrolleres før søgning; kunder og kilder adskilles i embeddings, vektordatabaser, caches og eksport.', 'Afgrænsede værktøjer, kontrollerede skrivehandlinger, adskillelse af instruktioner fra upålideligt indhold samt tests af prompt injection og kildeforgiftning.', 'Beskyttelse af hemmeligheder, begrænset logning af følsomt indhold, kildehenvisninger, regler for opbevaring og sletning, forbrugs- og omkostningskontrol, sikkerheds- og accepttests samt overdragelse.'],
        scope: 'Private AI Assistant / RAG Pilot: én assistent, én brugsklar videnskilde, ét interface, én cloudleverandør, op til to brugerroller og op til ti pilotbrugere. Agenthandlinger indgår kun, når de er beskrevet udtrykkeligt i det skriftlige omfang.',
        exclusions: 'Multi-cloud, fine-tuning, omfattende OCR, aftalt produktionsoppetid og WhatsApp Business er ikke inkluderet. Ekstra kanaler, dataklargøring og integrationer afgrænses særskilt.',
        responsibility: 'Stil en videnskilde med nødvendige brugsrettigheder, korrekte brugerrettigheder og en pilotansvarlig til rådighed. Godkend databehandlingsvilkår, opbevaring, leverandører og lagringsregion før idriftsættelse. Valider piloten, før brugen udvides.',
        example: 'Illustrativt svar, ikke et kunderesultat: “Ifølge den godkendte onboardingpolitik, afsnit 3…” med et kildelink, der kun er synligt for brugere med adgang til dokumentet.',
        faq: [
          { q: 'Hvad betyder privat her?', a: 'Adgang og datahåndtering afgrænses til din organisation. Projektet angiver, hvem der behandler indholdet, hvilke endpoints der modtager det, lagringsregion, leverandørernes vilkår for databrug og databehandleraftaler. Privat betyder ikke automatisk kun EU eller lokal drift.' },
          { q: 'Er hele AI-kæden ende-til-ende-krypteret?', a: 'Vi specificerer TLS under transport og kryptering af lagrede data efter arkitekturen. Vi kalder ikke hele vejen til en LLM ende-til-ende-krypteret uden dokumentation for det.' },
          { q: 'Kan vi tilføje WhatsApp eller chat på hjemmesiden?', a: 'Ja, med særskilt omfang, platformstilladelser, databehandlingsvilkår og leverandøromkostninger. Piloten omfatter ét aftalt interface og ikke WhatsApp Business.' },
          { q: 'Er svarene altid korrekte?', a: 'Nej. Kildehenvisninger, rettighedskontrol, afvisning af svar uden grundlag og aftalte evalueringstests reducerer risikoen. Vigtige beslutninger kræver den menneskelige gennemgang, der er fastlagt for anvendelsen.' }
        ]
      },
      sv: {
        name: 'Privata AI-assistenter, agenter & RAG', headline: 'Företagets kunskap. Dina regler.',
        description: 'Skräddarsydda assistenter och agenter kopplade till er kunskap med behörighetsstyrd sökning, avgränsade verktyg och spårbara åtgärder.',
        problem: 'Kunskap skapar värde först när rätt personer kan hitta den. En generisk chattbot kan sakna sammanhang, visa skyddad information eller följa instruktioner gömda i en opålitlig källa.',
        outcome: 'En pilot med en privat AI-assistent som hämtar tillåten kunskap, anger källor och avstår från svar som saknar stöd. Ett lämpligt moln—Azure, AWS eller Google Cloud—väljs för den avtalade arkitekturen.',
        deliverables: ['Användaridentitet och behörigheter kontrolleras före sökning; kunder och källor separeras i embeddings, vektordatabaser, cache och export.', 'Avgränsade verktyg, övervakade skrivåtgärder, separation av instruktioner från opålitligt innehåll samt tester av prompt injection och förgiftning av källor.', 'Skydd av hemligheter, begränsad loggning av känsligt innehåll, källhänvisningar, regler för lagring och radering, förbruknings- och kostnadskontroll, säkerhets- och acceptanstester samt överlämning.'],
        scope: 'Private AI Assistant / RAG Pilot: en assistent, en färdig kunskapskälla, ett gränssnitt, en molnleverantör, upp till två användarroller och upp till tio pilotanvändare. Agentåtgärder ingår bara om de uttryckligen beskrivs i den skriftliga omfattningen.',
        exclusions: 'Multi-cloud, finjustering av modeller, omfattande OCR, avtalad tillgänglighet i produktion och WhatsApp Business ingår inte. Extra kanaler, databearbetning och integrationer avgränsas separat.',
        responsibility: 'Tillhandahåll en kunskapskälla med nödvändiga användningsrättigheter, korrekta rollbehörigheter och en pilotansvarig. Godkänn databehandlingsvillkor, lagring, leverantörer och lagringsregion före driftsättning. Validera piloten innan användningen utökas.',
        example: 'Illustrativt svar, inte ett kundresultat: ”Enligt den godkända introduktionspolicyn, avsnitt 3…” med en källänk som bara är synlig för användare med åtkomst till dokumentet.',
        faq: [
          { q: 'Vad betyder privat här?', a: 'Åtkomst och datahantering avgränsas för organisationen. Projektet anger vem som behandlar innehåll, vilka endpoints som tar emot det, lagringsregion, leverantörernas villkor för dataanvändning och personuppgiftsbiträdesavtal. Privat betyder inte automatiskt enbart EU eller lokal drift.' },
          { q: 'Är hela AI-kedjan totalsträckskrypterad?', a: 'Vi specificerar TLS under överföring och kryptering av lagrade data enligt arkitekturen. Vi beskriver inte hela vägen till en LLM som totalsträckskrypterad utan stöd för påståendet.' },
          { q: 'Kan vi lägga till WhatsApp eller webbchatt?', a: 'Ja, med separat omfattning, plattformstillstånd, databehandlingsvillkor och leverantörskostnader. Grundpiloten omfattar ett avtalat gränssnitt och inte WhatsApp Business.' },
          { q: 'Är svaren alltid korrekta?', a: 'Nej. Källhänvisningar, behörighetskontroller, avstående från svar utan stöd och avtalade utvärderingstester minskar risken. Viktiga beslut kräver den mänskliga granskning som fastställts för användningen.' }
        ]
      }
    }
  },
  {
    id: 'pentesting-red-teaming', price: 4250,
    copy: {
      en: {
        name: 'OSINT, Pentesting & Red Teaming', headline: 'Break it here. Fix it before it hurts.',
        description: 'Test the attack paths that matter—and leave with findings your team can fix.',
        problem: 'A clean scan is not the same as a secure application. Access-control mistakes, unsafe integrations and AI data flows need testing within a defined, authorised scope.',
        outcome: 'A focused assessment with evidence, business context and prioritised remediation. OSINT/CTI, code review, vulnerability scanning, penetration testing, red-team exercises and AI security testing are distinct services.',
        deliverables: ['Written scope, methodology, Rules of Engagement, targets, stop conditions and third-party restrictions before testing.', 'Protected evidence, finding severity and business impact, test limitations and practical remediation guidance.', 'Management summary, technical report, handover session and one verification of the included fixes within 30 days of delivery.'],
        scope: 'Scoped Web / API Pentest: one small web application, up to two roles and up to ten API endpoints. Focused manual testing with supporting automated review, a report, handover and one remediation verification within 30 days.',
        exclusions: 'Complete code coverage is not promised. Extensive OSINT, organisation-wide red teaming, phishing, load testing and destructive testing are separately quoted. An automated scan alone is not a full pentest.',
        responsibility: 'Provide written authorisation from the appropriate asset owner, a test environment or agreed production restrictions, test accounts and an emergency contact. You remain responsible for remediation and risk decisions.',
        example: 'Illustrative finding, not a client result: a test account accesses a record belonging to another role; the report records minimal evidence, business impact, the access-control fix and a verification step.',
        faq: [
          { q: 'Can you test any website or third-party service?', a: 'No. Testing requires written authorisation, defined targets and Rules of Engagement. Third-party terms and permissions must allow the agreed tests; stop conditions apply throughout.' },
          { q: 'Can the scope cover AI and sensitive workflows?', a: 'Yes, where agreed. AI interfaces, permissions, configuration, code and APIs can be examined. Call documentation, care and sales systems also need checks of information restrictions and data flows.' },
          { q: 'Does a report mean we are compliant or vulnerability-free?', a: 'No. Findings reflect the agreed scope, methods and testing period. A pentest cannot guarantee all vulnerabilities have been found or establish complete regulatory compliance.' },
          { q: 'What is an OSINT snapshot?', a: 'A separate CTI / Passive OSINT Snapshot covers one organisation and up to three domains it owns. It does not include continuous monitoring, intrusive testing or a broad red-team exercise.' }
        ]
      },
      da: {
        name: 'OSINT, penetrationstest & red teaming', headline: 'Find svaghederne. Ret dem i tide.',
        description: 'Test de angrebsveje, der betyder noget, og få fund, dit team kan handle på.',
        problem: 'En scanning uden fund er ikke det samme som en sikker applikation. Fejl i adgangskontrol, usikre integrationer og AI-datastrømme kræver tests med klart afgrænset omfang og tilladelse.',
        outcome: 'En fokuseret vurdering med dokumentation, forretningsmæssig kontekst og prioriteret afhjælpning. OSINT/CTI, kodegennemgang, sårbarhedsscanning, penetrationstest, red team-øvelser og AI-sikkerhedstest er forskellige ydelser.',
        deliverables: ['Skriftligt omfang, metode, Rules of Engagement, mål, stopbetingelser og tredjepartsbegrænsninger før testen.', 'Beskyttet dokumentation, fundenes alvor og forretningspåvirkning, testbegrænsninger og konkrete rettelsesforslag.', 'Ledelsesresumé, teknisk rapport, overdragelsesmøde og én kontrol af de inkluderede rettelser inden for 30 dage efter levering.'],
        scope: 'Scoped Web / API Pentest: én mindre webapplikation, op til to roller og op til ti API-endpoints. Fokuseret manuel test med understøttende automatiseret gennemgang, rapport, overdragelse og én kontrol af rettelser inden for 30 dage.',
        exclusions: 'Der loves ikke dækning af al kode. Omfattende OSINT, red teaming på organisationsniveau, phishing, belastningstest og destruktive tests får særskilte tilbud. En automatiseret scanning alene er ikke en fuld penetrationstest.',
        responsibility: 'Sørg for skriftlig tilladelse fra den relevante ejer, et testmiljø eller aftalte produktionsbegrænsninger, testkonti og en kontakt ved nødsituationer. I er ansvarlige for afhjælpning og risikobeslutninger.',
        example: 'Illustrativt fund, ikke et kunderesultat: en testkonto får adgang til en post for en anden rolle. Rapporten beskriver begrænset evidens, forretningspåvirkning, rettelsen i adgangskontrollen og efterkontrollen.',
        faq: [
          { q: 'Kan I teste enhver hjemmeside eller tredjepartstjeneste?', a: 'Nej. Test kræver skriftlig tilladelse, definerede mål og Rules of Engagement. Tredjepartsvilkår og tilladelser skal omfatte de aftalte tests; stopbetingelser gælder under hele forløbet.' },
          { q: 'Kan testen omfatte AI og følsomme arbejdsgange?', a: 'Ja, når det er aftalt. AI-interfaces, rettigheder, konfiguration, kode og API’er kan undersøges. Systemer til samtaledokumentation, behandling og salg kræver også kontrol af informationsbegrænsning og datastrømme.' },
          { q: 'Betyder rapporten, at vi overholder alle regler og ikke har sårbarheder?', a: 'Nej. Fund gælder det aftalte omfang, metoderne og testperioden. En penetrationstest kan ikke garantere, at alle sårbarheder er fundet, eller dokumentere fuld regeloverholdelse.' },
          { q: 'Hvad er et OSINT-snapshot?', a: 'Et særskilt CTI / Passive OSINT Snapshot omfatter én organisation og op til tre domæner, den ejer. Løbende overvågning, indgribende tests og større red team-øvelser er ikke inkluderet.' }
        ]
      },
      sv: {
        name: 'OSINT, penetrationstest & red teaming', headline: 'Hitta svagheterna. Åtgärda dem i tid.',
        description: 'Testa angreppsvägarna som spelar roll och få fynd som teamet kan åtgärda.',
        problem: 'En skanning utan fynd är inte samma sak som en säker applikation. Fel i åtkomstkontroll, osäkra integrationer och AI-dataflöden behöver testas med tydlig avgränsning och tillstånd.',
        outcome: 'En fokuserad bedömning med underlag, verksamhetskontext och prioriterade åtgärder. OSINT/CTI, kodgranskning, sårbarhetsskanning, penetrationstest, red team-övningar och AI-säkerhetstest är olika tjänster.',
        deliverables: ['Skriftlig omfattning, metod, Rules of Engagement, mål, stoppvillkor och tredjepartsbegränsningar före testet.', 'Skyddade underlag, fyndens allvar och verksamhetspåverkan, testbegränsningar och praktiska åtgärdsförslag.', 'Ledningssammanfattning, teknisk rapport, överlämningsmöte och en verifiering av de inkluderade rättningarna inom 30 dagar efter leverans.'],
        scope: 'Scoped Web / API Pentest: en mindre webbapplikation, upp till två roller och upp till tio API-endpoints. Fokuserad manuell testning med stödjande automatiserad granskning, rapport, överlämning och en verifiering av rättningar inom 30 dagar.',
        exclusions: 'Fullständig kodtäckning utlovas inte. Omfattande OSINT, red teaming på organisationsnivå, nätfiske, belastningstest och destruktiva tester offereras separat. En automatiserad skanning ensam är inte ett fullständigt penetrationstest.',
        responsibility: 'Ordna skriftligt tillstånd från rätt tillgångsägare, en testmiljö eller avtalade produktionsbegränsningar, testkonton och en kontakt vid nödsituationer. Ni ansvarar för åtgärder och riskbeslut.',
        example: 'Illustrativt fynd, inte ett kundresultat: ett testkonto når en post som tillhör en annan roll. Rapporten anger begränsad evidens, verksamhetspåverkan, rättningen i åtkomstkontrollen och verifieringssteget.',
        faq: [
          { q: 'Kan ni testa vilken webbplats eller tredjepartstjänst som helst?', a: 'Nej. Testning kräver skriftligt tillstånd, definierade mål och Rules of Engagement. Tredjepartsvillkor och tillstånd måste tillåta de avtalade testerna. Stoppvillkor gäller under hela uppdraget.' },
          { q: 'Kan testet omfatta AI och känsliga arbetsflöden?', a: 'Ja, när det är avtalat. AI-gränssnitt, behörigheter, konfiguration, kod och API:er kan undersökas. System för samtalsdokumentation, vård och försäljning behöver även kontroll av informationsbegränsning och dataflöden.' },
          { q: 'Betyder rapporten att vi följer alla regler och saknar sårbarheter?', a: 'Nej. Fynden gäller avtalad omfattning, metoder och testperiod. Ett penetrationstest kan inte garantera att alla sårbarheter har hittats eller visa fullständig regelefterlevnad.' },
          { q: 'Vad är en OSINT-ögonblicksbild?', a: 'En separat CTI / Passive OSINT Snapshot omfattar en organisation och upp till tre domäner den äger. Löpande bevakning, inträngande testning och breda red team-övningar ingår inte.' }
        ]
      }
    }
  },
  {
    id: 'devsecops', price: 4650,
    copy: {
      en: {
        name: 'DevSecOps & Secure Delivery Pipelines', headline: 'Ship fast. Lock down the pipeline.',
        description: 'Build security into the path from commit to deployment—with controlled identities, automated checks and releases you can trace.',
        problem: 'Broad deployment credentials, unreviewed releases and unchecked dependencies can turn a fast delivery pipeline into a fast route to production risk.',
        outcome: 'A scoped CI/CD foundation with security checks, restricted identities, release approvals and a documented recovery path. Tool availability, licences and the assigned specialist’s capability are confirmed before work starts.',
        deliverables: ['Focused threat model, SAST, software composition analysis (SCA) and secret scanning.', 'Least-privilege pipeline identities, environment separation and OIDC or short-lived credentials where supported.', 'Release approvals, rollback guidance, acceptance checks, documentation and handover.'],
        scope: 'DevSecOps Foundation: one repository, one pipeline, one deployment target and up to two environments. The entry package covers the stated controls; additional checks and supply-chain features must be explicitly included in the agreement.',
        exclusions: 'An organisation-wide development-platform migration is excluded. DAST requires a suitable environment; container and IaC checks, SBOM, signing and provenance are included only where agreed. External tooling and licence costs are separately approved.',
        responsibility: 'Provide authorised repository and deployment access, a technical owner and suitable test environments. Agree release gates, exception handling and rollback approval. Your team owns ongoing pipeline operation after handover.',
        example: 'Illustrative pipeline, not evidence of a production deployment: commit → code/dependency/secret checks → review gate → short-lived deployment identity → approved release with rollback guidance.',
        faq: [
          { q: 'Will checks block every insecure change?', a: 'No. Automated checks have limitations. We agree gate behaviour, severity thresholds and exception ownership; human review and maintenance remain necessary.' },
          { q: 'Can you add DAST, containers and IaC?', a: 'Yes, where the environment and scope support them. DAST needs a suitable test target. Container and infrastructure-as-code checks, SBOM, signatures and provenance are specified in the package agreement.' },
          { q: 'Does a training certificate prove production delivery?', a: 'No. Training, a configured repository and verified production experience are different evidence. Tools are offered only when the assigned practitioner has the relevant capability.' }
        ]
      },
      da: {
        name: 'DevSecOps & sikre leverancepipelines', headline: 'Lever hurtigt. Styrk din pipeline.',
        description: 'Byg sikkerhed ind fra commit til deployment med styrede identiteter, automatiske kontroller og sporbare releases.',
        problem: 'Brede deploymentrettigheder, releases uden gennemgang og ukontrollerede afhængigheder kan gøre en hurtig pipeline til en hurtig vej til produktionsrisiko.',
        outcome: 'Et afgrænset CI/CD-fundament med sikkerhedskontroller, begrænsede identiteter, releasegodkendelse og dokumenteret gendannelse. Værktøjer, licenser og den tilknyttede specialists kompetencer bekræftes før opstart.',
        deliverables: ['Fokuseret trusselsmodel, SAST, analyse af softwareafhængigheder (SCA) og scanning for hemmeligheder.', 'Pipelineidentiteter med mindst mulige rettigheder, adskilte miljøer og OIDC eller kortlivede credentials, hvor det understøttes.', 'Releasegodkendelser, rollbackvejledning, acceptkontroller, dokumentation og overdragelse.'],
        scope: 'DevSecOps Foundation: ét repository, én pipeline, ét deploymentmål og op til to miljøer. Startpakken omfatter de angivne kontroller; yderligere tests og softwareforsyningskædefunktioner skal fremgå udtrykkeligt af aftalen.',
        exclusions: 'Migration af hele organisationens udviklingsplatform er ikke inkluderet. DAST kræver et egnet miljø; container- og IaC-kontroller, SBOM, signering og provenance indgår kun efter aftale. Eksterne værktøjer og licenser godkendes særskilt.',
        responsibility: 'Stil autoriseret repository- og deploymentadgang, en teknisk ansvarlig og egnede testmiljøer til rådighed. Aftal releasekrav, undtagelser og rollbackgodkendelse. Teamet er ansvarligt for den løbende pipeline efter overdragelsen.',
        example: 'Illustrativ pipeline, ikke dokumentation for produktionsdrift: commit → kode-, afhængigheds- og hemmelighedskontrol → review → kortlivet deploymentidentitet → godkendt release med rollbackvejledning.',
        faq: [
          { q: 'Stopper kontrollerne alle usikre ændringer?', a: 'Nej. Automatiske kontroller har begrænsninger. Vi aftaler blokeringsadfærd, alvorstærskler og ansvar for undtagelser. Menneskelig gennemgang og vedligeholdelse er fortsat nødvendige.' },
          { q: 'Kan I tilføje DAST, containere og IaC?', a: 'Ja, når miljøet og omfanget understøtter det. DAST kræver et egnet testmål. Container- og infrastructure-as-code-kontroller, SBOM, signaturer og provenance fastlægges i pakkeaftalen.' },
          { q: 'Dokumenterer et kursusbevis levering i produktion?', a: 'Nej. Uddannelse, et konfigureret repository og verificeret produktionserfaring er forskellige typer evidens. Værktøjer tilbydes kun, når den tilknyttede fagperson har relevante kompetencer.' }
        ]
      },
      sv: {
        name: 'DevSecOps & säkra leveranspipelines', headline: 'Leverera snabbt. Säkra din pipeline.',
        description: 'Bygg in säkerhet från commit till driftsättning med kontrollerade identiteter, automatiska kontroller och spårbara releaser.',
        problem: 'Breda driftsättningsbehörigheter, ogranskade releaser och okontrollerade beroenden kan göra en snabb pipeline till en snabb väg till produktionsrisk.',
        outcome: 'En avgränsad CI/CD-grund med säkerhetskontroller, begränsade identiteter, releasegodkännande och dokumenterad återställning. Verktyg, licenser och den tilldelade specialistens kompetens bekräftas före start.',
        deliverables: ['Fokuserad hotmodell, SAST, analys av programvaruberoenden (SCA) och skanning efter hemligheter.', 'Pipelineidentiteter med minsta möjliga behörighet, separerade miljöer och OIDC eller kortlivade autentiseringsuppgifter där det stöds.', 'Releasegodkännanden, rollbackvägledning, acceptanskontroller, dokumentation och överlämning.'],
        scope: 'DevSecOps Foundation: ett repository, en pipeline, ett driftsättningsmål och upp till två miljöer. Startpaketet omfattar angivna kontroller; ytterligare tester och funktioner för programvaruförsörjningskedjan måste uttryckligen ingå i avtalet.',
        exclusions: 'Migration av hela organisationens utvecklingsplattform ingår inte. DAST kräver en lämplig miljö; container- och IaC-kontroller, SBOM, signering och provenance ingår bara efter överenskommelse. Externa verktyg och licenser godkänns separat.',
        responsibility: 'Tillhandahåll auktoriserad åtkomst till repository och driftsättning, en teknisk ansvarig och lämpliga testmiljöer. Avtala releasekrav, undantagshantering och godkännande av rollback. Teamet ansvarar för löpande pipelinedrift efter överlämningen.',
        example: 'Illustrativ pipeline, inte belägg för produktionsdrift: commit → kod-, beroende- och hemlighetskontroller → granskning → kortlivad driftsättningsidentitet → godkänd release med rollbackvägledning.',
        faq: [
          { q: 'Stoppar kontrollerna alla osäkra ändringar?', a: 'Nej. Automatiska kontroller har begränsningar. Vi avtalar blockeringsbeteende, allvarlighetsnivåer och ansvar för undantag. Mänsklig granskning och underhåll behövs fortfarande.' },
          { q: 'Kan ni lägga till DAST, containrar och IaC?', a: 'Ja, när miljön och omfattningen stöder det. DAST kräver ett lämpligt testmål. Container- och infrastructure-as-code-kontroller, SBOM, signaturer och provenance anges i paketavtalet.' },
          { q: 'Visar ett kursintyg förmåga att leverera i produktion?', a: 'Nej. Utbildning, ett konfigurerat repository och verifierad produktionserfarenhet är olika slags underlag. Verktyg erbjuds endast när den tilldelade yrkespersonen har relevant kompetens.' }
        ]
      }
    }
  },
  {
    id: 'cloud-security', price: 3500,
    copy: {
      en: {
        name: 'Cloud Security Engineering, Automation & Maintenance', headline: 'Your cloud. Locked down. Kept in shape.',
        description: 'Get control of identities, privileged access, cloud configuration and security signals—then keep that foundation maintained.',
        problem: 'Old accounts, standing administrator access and noisy alerts make it hard to see who can do what. Cloud security starts with an agreed inventory and permissions you can explain.',
        outcome: 'A scoped IAM and security foundation with reviewed permissions, audit visibility and a practical treatment plan. Changes are tested and approved before activation.',
        deliverables: ['Permission map and least-privilege review for selected identities and resources, including workload identities and secrets within scope.', 'MFA and privileged-access baseline subject to licensing, audit logging and up to five alert rules.', 'Emergency-access procedure, scoped backup/recovery configuration review, treatment plan, documentation and handover.'],
        scope: 'Cloud IAM & Security Foundation: one subscription, account or project, up to ten identities and up to ten selected resources. Provider, licensing, authorised changes and acceptance criteria are agreed in advance.',
        exclusions: 'A complete SOC and organisation-wide infrastructure coverage are excluded. Multi-cloud, wider migrations and incident-response retainers need separate scope. No 24/7 SOC, emergency availability or response-time SLA is promised by this package.',
        responsibility: 'Provide authorised access, a reliable asset inventory and a change approver. Confirm licensing, emergency contacts and recovery requirements. Approve tested changes and retain ownership of ongoing cloud operations.',
        example: 'Illustrative deliverable, not a client result: a privileged role requires approved elevation, generates an audit event and routes an agreed alert to the designated owner.',
        faq: [
          { q: 'Which cloud identity controls are relevant?', a: 'Azure: Azure RBAC, Microsoft Entra ID, Conditional Access and Entra PIM. AWS: IAM policies and roles, IAM Identity Center, STS and permission boundaries where needed. Google Cloud: Cloud IAM roles and policy bindings, IAM Conditions and Privileged Access Manager. Controls depend on the selected provider and licensing. PIM/PAM manage privileged access; they are not alternative names for RBAC.' },
          { q: 'What does monthly Cloud Security Care include?', a: 'A separately agreed monthly service includes scheduled permission/configuration checks, alert review, small changes and a report, for up to six working hours per month against an agreed backlog. Additional hours require an approved service extension; they are not billed automatically.' },
          { q: 'Can you respond to an incident?', a: 'Initial response, evidence collection and specialist handoff may be agreed subject to availability. Emergency coverage and response commitments require appropriate staffing, an on-call agreement and an SLA; they are not included by default.' }
        ]
      },
      da: {
        name: 'Cloudsikkerhed, automatisering & vedligeholdelse', headline: 'Din cloud. Styrket. Holdt i form.',
        description: 'Få styr på identiteter, privilegeret adgang, cloudkonfiguration og sikkerhedssignaler, og vedligehold fundamentet.',
        problem: 'Gamle konti, permanente administratorrettigheder og støjende alarmer skjuler, hvem der kan gøre hvad. Cloudsikkerhed begynder med en aftalt oversigt og rettigheder, du kan forklare.',
        outcome: 'Et afgrænset IAM- og sikkerhedsfundament med gennemgåede rettigheder, revisionsspor og en konkret behandlingsplan. Ændringer testes og godkendes før aktivering.',
        deliverables: ['Rettighedskort og gennemgang af mindst mulige rettigheder for udvalgte identiteter og ressourcer, inklusive workloadidentiteter og hemmeligheder inden for omfanget.', 'Grundlag for MFA og privilegeret adgang efter licensmuligheder, revisionslogs og op til fem alarmregler.', 'Procedure for nødadgang, afgrænset gennemgang af backup- og gendannelseskonfiguration, behandlingsplan, dokumentation og overdragelse.'],
        scope: 'Cloud IAM & Security Foundation: ét abonnement, én konto eller ét projekt, op til ti identiteter og op til ti udvalgte ressourcer. Leverandør, licenser, tilladte ændringer og acceptkriterier aftales på forhånd.',
        exclusions: 'Et komplet SOC og dækning af hele organisationens infrastruktur er ikke inkluderet. Multi-cloud, større migreringer og beredskabsaftaler kræver særskilt omfang. Pakken lover ikke SOC døgnet rundt, akut tilgængelighed eller en SLA for responstid.',
        responsibility: 'Stil autoriseret adgang, en pålidelig ressourceoversigt og en ændringsansvarlig til rådighed. Bekræft licenser, nødkontakter og gendannelseskrav. Godkend testede ændringer, og behold ansvaret for den løbende clouddrift.',
        example: 'Illustrativ leverance, ikke et kunderesultat: en privilegeret rolle kræver godkendt rettighedsforhøjelse, skaber en revisionshændelse og sender en aftalt alarm til den ansvarlige.',
        faq: [
          { q: 'Hvilke identitetskontroller er relevante?', a: 'Azure: Azure RBAC, Microsoft Entra ID, Conditional Access og Entra PIM. AWS: IAM policies og roles, IAM Identity Center, STS og rettighedsgrænser efter behov. Google Cloud: Cloud IAM roles og policy bindings, IAM Conditions og Privileged Access Manager. Kontrollerne afhænger af leverandør og licenser. PIM/PAM styrer privilegeret adgang og er ikke andre navne for RBAC.' },
          { q: 'Hvad omfatter månedlig Cloud Security Care?', a: 'En særskilt aftalt månedsydelse omfatter planlagte rettigheds- og konfigurationskontroller, alarmgennemgang, mindre ændringer og en rapport: op til seks arbejdstimer om måneden efter en aftalt backlog. Ekstra timer kræver en godkendt udvidelse og faktureres ikke automatisk.' },
          { q: 'Kan I hjælpe ved en sikkerhedshændelse?', a: 'Indledende håndtering, indsamling af evidens og overdragelse til en specialist kan aftales efter tilgængelighed. Akut dækning og responstider kræver passende bemanding, vagtordning og SLA og indgår ikke automatisk.' }
        ]
      },
      sv: {
        name: 'Molnsäkerhet, automatisering & underhåll', headline: 'Ditt moln. Härdat. Hållet i trim.',
        description: 'Få kontroll över identiteter, privilegierad åtkomst, molnkonfiguration och säkerhetssignaler och håll grunden underhållen.',
        problem: 'Gamla konton, stående administratörsåtkomst och brusiga larm gör det svårt att se vem som kan göra vad. Molnsäkerhet börjar med en avtalad inventering och behörigheter som går att förklara.',
        outcome: 'En avgränsad IAM- och säkerhetsgrund med granskade behörigheter, granskningsspår och en praktisk åtgärdsplan. Ändringar testas och godkänns före aktivering.',
        deliverables: ['Behörighetskarta och granskning av minsta möjliga behörighet för valda identiteter och resurser, inklusive workloadidentiteter och hemligheter inom omfattningen.', 'Grund för MFA och privilegierad åtkomst enligt licensmöjligheter, granskningsloggar och upp till fem larmregler.', 'Rutiner för nödåtkomst, avgränsad granskning av backup- och återställningskonfiguration, åtgärdsplan, dokumentation och överlämning.'],
        scope: 'Cloud IAM & Security Foundation: en prenumeration, ett konto eller ett projekt, upp till tio identiteter och upp till tio valda resurser. Leverantör, licenser, tillåtna ändringar och acceptanskriterier avtalas i förväg.',
        exclusions: 'Ett fullständigt SOC och täckning av organisationens hela infrastruktur ingår inte. Multi-cloud, större migreringar och incidentberedskap kräver separat omfattning. Paketet utlovar inte SOC dygnet runt, akut tillgänglighet eller en SLA för svarstid.',
        responsibility: 'Tillhandahåll auktoriserad åtkomst, en tillförlitlig resursinventering och en person som godkänner ändringar. Bekräfta licenser, nödkontakter och återställningskrav. Godkänn testade ändringar och behåll ansvaret för löpande molndrift.',
        example: 'Illustrativ leverans, inte ett kundresultat: en privilegierad roll kräver godkänd behörighetshöjning, skapar en granskningshändelse och skickar ett avtalat larm till utsedd ansvarig.',
        faq: [
          { q: 'Vilka identitetskontroller är relevanta?', a: 'Azure: Azure RBAC, Microsoft Entra ID, Conditional Access och Entra PIM. AWS: IAM policies och roles, IAM Identity Center, STS och behörighetsgränser vid behov. Google Cloud: Cloud IAM roles och policy bindings, IAM Conditions och Privileged Access Manager. Kontrollerna beror på leverantör och licenser. PIM/PAM hanterar privilegierad åtkomst och är inte andra namn för RBAC.' },
          { q: 'Vad ingår i månatlig Cloud Security Care?', a: 'En separat avtalad månadstjänst omfattar schemalagd behörighets- och konfigurationsgranskning, larmgranskning, mindre ändringar och en rapport: upp till sex arbetstimmar per månad enligt en avtalad backlog. Extra timmar kräver en godkänd utökning och faktureras inte automatiskt.' },
          { q: 'Kan ni hjälpa till vid en incident?', a: 'Inledande hantering, insamling av underlag och överlämning till en specialist kan avtalas utifrån tillgänglighet. Akut beredskap och svarstidsåtaganden kräver lämplig bemanning, jouravtal och SLA och ingår inte automatiskt.' }
        ]
      }
    }
  }
];
