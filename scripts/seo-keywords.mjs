/**
 * SundAI search-intent map — 2026-10-13.
 *
 * 120 distinct concepts, each expressed naturally in EN / DA / SV. These are
 * editorial candidates derived from the current six service scopes, NOT measured
 * search volumes, ranking forecasts or a requirement to repeat every exact phrase.
 *
 * Schema: { id, serviceId, targetRoutes: { en, da, sv }, phrases: { en, da, sv },
 *           intent: 'commercial'|'informational',
 *           priority: 'primary'|'supporting', coverage: 'core'|'separate_scope' }.
 * Core refers to a topic supported by the scoped service, not an assertion that
 * every control/framework/provider is included together. Separate-scope topics
 * must be presented with their qualification in visible content.
 *
 * Example: primaryKeywordsFor('private-ai-agents-rag', 'sv').
 * Do not render this map as keyword blocks, hidden text or meta-keywords.
 */

const serviceBases = { en: '/services/', da: '/da/ydelser/', sv: '/sv/tjanster/' };
const info = { intent: 'informational' };
const separate = { coverage: 'separate_scope' };
const separateInfo = { intent: 'informational', coverage: 'separate_scope' };

// Compact source row: [stable concept key, EN phrase, DA phrase, SV phrase, options].
const definitions = [
  {
    serviceId: 'compliance-ai-governance',
    labels: { en: 'Compliance, GRC and AI governance', da: 'Compliance, GRC og AI-governance', sv: 'Compliance, GRC och AI-styrning' },
    rows: [
      ['ai-governance', 'AI governance consulting', 'rådgivning om AI-governance', 'rådgivning om AI-styrning'],
      ['grc-smes', 'GRC consulting for SMEs', 'GRC-rådgivning til SMV’er', 'GRC-rådgivning för små och medelstora företag'],
      ['readiness-assessment', 'compliance readiness assessment', 'vurdering af compliance-parathed', 'bedömning av beredskap för regelefterlevnad'],
      ['iso-27001-gap', 'ISO 27001 gap analysis', 'gap-analyse for ISO 27001', 'gapanalys för ISO 27001'],
      ['iso-42001-readiness', 'ISO 42001 readiness', 'parathed til ISO 42001', 'beredskap inför ISO 42001'],
      ['gdpr-readiness', 'GDPR readiness consulting', 'GDPR-rådgivning og parathed', 'GDPR-rådgivning och beredskap'],
      ['nis2-readiness', 'NIS2 readiness assessment', 'vurdering af NIS2-parathed', 'bedömning av NIS2-beredskap'],
      ['dora-gap', 'DORA gap assessment', 'gap-vurdering for DORA', 'gapbedömning för DORA'],
      ['soc2-readiness', 'SOC 2 readiness consulting', 'rådgivning om SOC 2-parathed', 'rådgivning inför SOC 2-granskning'],
      ['ai-inventory', 'AI use case inventory', 'kortlægning af AI-anvendelser', 'inventering av AI-användning'],
      ['supplier-risk', 'AI supplier risk assessment', 'risikovurdering af AI-leverandører', 'riskbedömning av AI-leverantörer'],
      ['data-flows', 'AI data flow mapping', 'kortlægning af AI-datastrømme', 'kartläggning av AI-dataflöden'],
      ['risk-register', 'AI risk register', 'risikoregister for AI', 'riskregister för AI', info],
      ['action-plan', 'compliance action plan', 'handlingsplan for compliance', 'åtgärdsplan för regelefterlevnad'],
      ['control-evidence', 'compliance control evidence', 'dokumentation af compliance-kontroller', 'underlag för efterlevnadskontroller', info],
      ['control-ownership', 'AI governance roles and responsibilities', 'roller og ansvar i AI-governance', 'roller och ansvar för AI-styrning', info],
      ['readiness-certification', 'ISO readiness versus certification', 'ISO-parathed kontra certificering', 'ISO-beredskap kontra certifiering', info],
      ['dpia-support', 'DPIA support for AI processing', 'hjælp til DPIA for AI-behandling', 'stöd för DPIA vid AI-behandling', separate],
      ['fractional-ciso', 'fractional CISO consulting', 'rådgivning fra en ekstern CISO', 'rådgivning från en extern CISO', separate],
      ['privacy-security-roles', 'CISO and DPO responsibilities', 'ansvar for CISO og DPO', 'ansvar för CISO och dataskyddsombud', separateInfo]
    ]
  },
  {
    serviceId: 'secure-ai-automation',
    labels: { en: 'Secure AI business automation', da: 'Sikker AI-automatisering', sv: 'Säker AI-automatisering' },
    rows: [
      ['secure-ai-automation', 'secure AI automation', 'sikker AI-automatisering', 'säker AI-automatisering'],
      ['business-workflows', 'business workflow automation', 'automatisering af virksomhedens arbejdsgange', 'automatisering av företags arbetsflöden'],
      ['api-integration', 'API integration services', 'API-integrationsydelser', 'API-integrationstjänster'],
      ['python-workflows', 'Python workflow automation', 'automatisering af arbejdsgange med Python', 'automatisering av arbetsflöden med Python'],
      ['crm-workflows', 'CRM workflow automation', 'automatisering af CRM-arbejdsgange', 'automatisering av CRM-arbetsflöden'],
      ['human-approval', 'human approval workflows', 'arbejdsgange med menneskelig godkendelse', 'arbetsflöden med mänskligt godkännande'],
      ['order-processing', 'order processing automation', 'automatisering af ordrebehandling', 'automatisering av orderhantering'],
      ['inventory-workflows', 'inventory workflow automation', 'automatisering af lagerarbejdsgange', 'automatisering av lagerarbetsflöden'],
      ['reporting-workflows', 'reporting workflow automation', 'automatisering af rapportering', 'automatisering av rapportering'],
      ['scheduling-workflows', 'scheduling workflow automation', 'automatisering af planlægningsopgaver', 'automatisering av planeringsuppgifter'],
      ['process-mapping', 'business process mapping', 'kortlægning af forretningsprocesser', 'kartläggning av affärsprocesser'],
      ['exception-handling', 'automated exception handling', 'automatiseret håndtering af undtagelser', 'automatiserad hantering av avvikelser'],
      ['retry-design', 'workflow retry and recovery design', 'design af genforsøg og gendannelse i arbejdsgange', 'utformning av återförsök och återhämtning i arbetsflöden', info],
      ['duplicate-prevention', 'duplicate action prevention', 'forebyggelse af dublerede handlinger', 'skydd mot dubbla åtgärder', info],
      ['least-privilege', 'least-privilege API access', 'API-adgang med mindst mulige rettigheder', 'API-åtkomst med minsta möjliga behörighet', info],
      ['validation', 'workflow input and output validation', 'validering af input og output i arbejdsgange', 'validering av indata och utdata i arbetsflöden', info],
      ['secrets', 'secure automation secret management', 'sikker håndtering af hemmeligheder i automatisering', 'säker hantering av hemligheter i automatisering'],
      ['cost-controls', 'AI workflow cost controls', 'omkostningskontrol for AI-arbejdsgange', 'kostnadskontroll för AI-arbetsflöden'],
      ['handover', 'automation handover documentation', 'dokumentation til overdragelse af automatisering', 'överlämningsdokumentation för automatisering'],
      ['systems-integration', 'two-system workflow integration', 'integration af arbejdsgange mellem to systemer', 'arbetsflödesintegration mellan två system']
    ]
  },
  {
    serviceId: 'private-ai-agents-rag',
    labels: { en: 'Private AI assistants, agents and RAG', da: 'Private AI-assistenter, agenter og RAG', sv: 'Privata AI-assistenter, agenter och RAG' },
    rows: [
      ['private-assistant', 'private AI assistant development', 'udvikling af private AI-assistenter', 'utveckling av privata AI-assistenter'],
      ['enterprise-rag', 'enterprise RAG implementation', 'implementering af RAG til virksomheder', 'implementering av RAG för företag'],
      ['knowledge-chatbot', 'internal knowledge chatbot', 'chatbot til intern viden', 'chattbot för intern kunskap'],
      ['custom-agent', 'custom AI agent development', 'udvikling af tilpassede AI-agenter', 'utveckling av anpassade AI-agenter'],
      ['permission-aware', 'permission-aware RAG', 'RAG med adgangskontrol', 'RAG med behörighetskontroll'],
      ['document-search', 'AI document search', 'AI-baseret dokumentsøgning', 'AI-baserad dokumentsökning'],
      ['source-citations', 'AI answers with source citations', 'AI-svar med kildehenvisninger', 'AI-svar med källhänvisningar'],
      ['prompt-injection', 'prompt injection defence for AI agents', 'beskyttelse mod prompt injection i AI-agenter', 'skydd mot prompt injection i AI-agenter'],
      ['rag-security', 'RAG security assessment', 'sikkerhedsvurdering af RAG', 'säkerhetsbedömning av RAG'],
      ['tenant-isolation', 'AI knowledge tenant isolation', 'adskillelse af kunders AI-viden', 'isolering av kunders AI-kunskap', info],
      ['azure-assistant', 'Azure private AI assistant', 'privat AI-assistent på Azure', 'privat AI-assistent på Azure'],
      ['aws-assistant', 'AWS private AI assistant', 'privat AI-assistent på AWS', 'privat AI-assistent på AWS'],
      ['gcp-assistant', 'Google Cloud private AI assistant', 'privat AI-assistent på Google Cloud', 'privat AI-assistent på Google Cloud'],
      ['governance', 'AI assistant governance controls', 'governance-kontroller for AI-assistenter', 'styrningskontroller för AI-assistenter'],
      ['tool-access', 'AI agent tool permissions', 'værktøjsrettigheder for AI-agenter', 'verktygsbehörigheter för AI-agenter', info],
      ['auditable-actions', 'auditable AI agent actions', 'sporbare AI-agenthandlinger', 'spårbara AI-agentåtgärder'],
      ['knowledge-pilot', 'AI knowledge assistant pilot', 'pilotprojekt med en AI-vidensassistent', 'pilotprojekt med en AI-kunskapsassistent'],
      ['retention', 'AI knowledge retention and deletion', 'opbevaring og sletning af AI-viden', 'lagring och radering av AI-kunskap', info],
      ['unsupported-answers', 'prevent unsupported AI answers', 'forebyg ukorrekte AI-svar uden kildegrundlag', 'förebygg AI-svar utan källstöd', info],
      ['acceptance-testing', 'RAG acceptance testing', 'accepttests for RAG', 'acceptanstester för RAG']
    ]
  },
  {
    serviceId: 'pentesting-red-teaming',
    labels: { en: 'OSINT, penetration testing and red teaming', da: 'OSINT, penetrationstest og red teaming', sv: 'OSINT, penetrationstestning och red teaming' },
    rows: [
      ['webapp-pentest', 'web application penetration testing', 'penetrationstest af webapplikationer', 'penetrationstestning av webbapplikationer'],
      ['api-pentest', 'API penetration testing', 'penetrationstest af API’er', 'penetrationstestning av API:er'],
      ['manual-testing', 'manual security testing', 'manuel sikkerhedstest', 'manuell säkerhetstestning'],
      ['authenticated-testing', 'authenticated pentesting', 'penetrationstest med testkonti', 'penetrationstestning med testkonton'],
      ['ai-assessment', 'AI security assessment', 'sikkerhedsvurdering af AI', 'säkerhetsbedömning av AI', separate],
      ['remediation-retest', 'remediation retesting', 'gentest efter afhjælpning', 'omtestning efter åtgärder'],
      ['access-control', 'application access-control testing', 'test af adgangskontrol i applikationer', 'testning av åtkomstkontroll i applikationer'],
      ['api-authorization', 'API authorisation testing', 'test af autorisation i API’er', 'testning av auktorisering i API:er'],
      ['business-logic', 'business logic security testing', 'sikkerhedstest af forretningslogik', 'säkerhetstestning av affärslogik'],
      ['vulnerability-triage', 'vulnerability risk prioritisation', 'risikoprioritering af sårbarheder', 'riskprioritering av sårbarheter'],
      ['pentest-report', 'actionable penetration test report', 'anvendelig rapport fra penetrationstest', 'användbar rapport från penetrationstestning'],
      ['rules-of-engagement', 'pentest rules of engagement', 'regler og rammer for penetrationstest', 'regler och ramar för penetrationstestning', info],
      ['scope', 'penetration test scope definition', 'afgrænsning af penetrationstest', 'avgränsning av penetrationstestning', info],
      ['scan-versus-pentest', 'vulnerability scan versus pentest', 'sårbarhedsscanning kontra penetrationstest', 'sårbarhetsskanning kontra penetrationstestning', info],
      ['management-summary', 'pentest executive summary', 'ledelsesresumé af penetrationstest', 'ledningssammanfattning av penetrationstest'],
      ['evidence-handling', 'secure pentest evidence handling', 'sikker håndtering af pentest-evidens', 'säker hantering av pentestunderlag'],
      ['osint-snapshot', 'passive OSINT assessment', 'passiv OSINT-vurdering', 'passiv OSINT-bedömning', separate],
      ['threat-intelligence', 'cyber threat intelligence snapshot', 'afgrænset cybertrusselsanalyse', 'avgränsad cyberhotanalys', separate],
      ['red-team', 'scoped red team exercise', 'afgrænset red team-øvelse', 'avgränsad red team-övning', separate],
      ['limits', 'penetration testing limitations', 'begrænsninger ved penetrationstest', 'begränsningar vid penetrationstestning', info]
    ]
  },
  {
    serviceId: 'devsecops',
    labels: { en: 'DevSecOps and secure delivery', da: 'DevSecOps og sikker levering', sv: 'DevSecOps och säker leverans' },
    rows: [
      ['devsecops-consulting', 'DevSecOps consulting', 'DevSecOps-rådgivning', 'DevSecOps-rådgivning'],
      ['secure-cicd', 'secure CI/CD pipelines', 'sikre CI/CD-pipelines', 'säkra CI/CD-pipelines'],
      ['sast', 'SAST pipeline integration', 'integration af SAST i pipelines', 'integration av SAST i pipelines'],
      ['sca', 'SCA dependency scanning', 'SCA-scanning af afhængigheder', 'SCA-skanning av beroenden'],
      ['secret-scanning', 'secret scanning setup', 'opsætning af scanning efter hemmeligheder', 'konfigurering av skanning efter hemligheter'],
      ['deployment-identities', 'least-privilege deployment identities', 'deploy-identiteter med mindst mulige rettigheder', 'driftsättningsidentiteter med minsta möjliga behörighet'],
      ['oidc', 'OIDC deployment authentication', 'OIDC-autentifikation til deployment', 'OIDC-autentisering för driftsättning'],
      ['short-lived-credentials', 'short-lived CI/CD credentials', 'kortlivede adgangsoplysninger til CI/CD', 'kortlivade autentiseringsuppgifter för CI/CD'],
      ['release-gates', 'security release gates', 'sikkerhedsgates ved releases', 'säkerhetskontroller inför releaser'],
      ['release-approvals', 'deployment approval workflow', 'arbejdsgang til godkendelse af deployment', 'arbetsflöde för godkännande av driftsättning'],
      ['environments', 'CI/CD environment separation', 'adskillelse af CI/CD-miljøer', 'separation av CI/CD-miljöer'],
      ['rollback', 'secure deployment rollback plan', 'rollback-plan for sikker deployment', 'återställningsplan för säker driftsättning'],
      ['threat-model', 'delivery pipeline threat modelling', 'trusselsmodellering af leveringspipelines', 'hotmodellering av leveranspipelines'],
      ['sast-versus-sca', 'SAST versus SCA', 'SAST kontra SCA', 'SAST kontra SCA', info],
      ['gate-exceptions', 'security gate exception handling', 'håndtering af undtagelser i sikkerhedsgates', 'hantering av undantag från säkerhetskontroller', info],
      ['dast', 'DAST integration', 'integration af DAST', 'integration av DAST', separate],
      ['containers', 'container image security scanning', 'sikkerhedsscanning af container-images', 'säkerhetsskanning av containeravbilder', separate],
      ['iac', 'infrastructure-as-code security checks', 'sikkerhedskontrol af infrastructure as code', 'säkerhetskontroller för infrastruktur som kod', separate],
      ['sbom', 'software bill of materials setup', 'opsætning af softwarestykliste', 'konfigurering av programvaruförteckning', separate],
      ['provenance', 'build signing and provenance', 'signering og sporbar oprindelse af builds', 'signering och spårbart ursprung för byggen', separate]
    ]
  },
  {
    serviceId: 'cloud-security',
    labels: { en: 'Cloud security and identity controls', da: 'Cloudsikkerhed og identitetskontroller', sv: 'Molnsäkerhet och identitetskontroller' },
    rows: [
      ['cloud-assessment', 'cloud security assessment', 'vurdering af cloudsikkerhed', 'bedömning av molnsäkerhet'],
      ['iam-review', 'cloud IAM review', 'gennemgang af cloud-IAM', 'granskning av moln-IAM'],
      ['azure-security', 'Azure security consulting', 'rådgivning om Azure-sikkerhed', 'rådgivning om Azure-säkerhet'],
      ['aws-security', 'AWS security consulting', 'rådgivning om AWS-sikkerhed', 'rådgivning om AWS-säkerhet'],
      ['gcp-security', 'Google Cloud security consulting', 'rådgivning om Google Cloud-sikkerhed', 'rådgivning om Google Cloud-säkerhet'],
      ['privileged-access', 'privileged access review', 'gennemgang af privilegeret adgang', 'granskning av privilegierad åtkomst'],
      ['entra-id', 'Microsoft Entra ID security review', 'sikkerhedsgennemgang af Microsoft Entra ID', 'säkerhetsgranskning av Microsoft Entra ID'],
      ['azure-rbac', 'Azure RBAC permissions review', 'gennemgang af Azure RBAC-rettigheder', 'granskning av Azure RBAC-behörigheter'],
      ['conditional-access', 'Conditional Access baseline', 'baseline for Conditional Access', 'grundnivå för Conditional Access'],
      ['entra-pim', 'Microsoft Entra PIM configuration review', 'gennemgang af Microsoft Entra PIM-konfiguration', 'granskning av Microsoft Entra PIM-konfiguration'],
      ['aws-iam', 'AWS IAM policy review', 'gennemgang af AWS IAM-politikker', 'granskning av AWS IAM-policyer'],
      ['iam-identity-center', 'AWS IAM Identity Center review', 'gennemgang af AWS IAM Identity Center', 'granskning av AWS IAM Identity Center'],
      ['gcp-iam', 'Google Cloud IAM policy review', 'gennemgang af Google Cloud IAM-politikker', 'granskning av Google Cloud IAM-policyer'],
      ['gcp-pam', 'Google Cloud Privileged Access Manager review', 'gennemgang af Google Cloud Privileged Access Manager', 'granskning av Google Cloud Privileged Access Manager'],
      ['mfa', 'cloud MFA baseline', 'baseline for cloud-MFA', 'grundnivå för moln-MFA'],
      ['audit-logging', 'cloud audit logging setup', 'opsætning af revisionslogs i cloud', 'konfigurering av revisionsloggar i molnet'],
      ['alert-rules', 'cloud security alert rules', 'regler for cloudsikkerhedsalarmer', 'regler för molnsäkerhetslarm'],
      ['emergency-access', 'cloud emergency access procedure', 'procedure for nødadgang til cloud', 'rutin för nödåtkomst till molnet', info],
      ['backup-recovery', 'cloud backup and recovery review', 'gennemgang af cloud-backup og gendannelse', 'granskning av molnsäkerhetskopiering och återställning'],
      ['monthly-care', 'monthly cloud security maintenance', 'månedlig vedligeholdelse af cloudsikkerhed', 'månatligt underhåll av molnsäkerhet', separate]
    ]
  }
];

export const seoKeywords = Object.freeze(definitions.flatMap(group => {
  const targetRoutes = Object.freeze(Object.fromEntries(Object.entries(serviceBases).map(([lang, base]) => [lang, `${base}${group.serviceId}/`])));
  return group.rows.map(([key, en, da, sv, options = {}], index) => Object.freeze({
    id: `${group.serviceId}:${key}`,
    serviceId: group.serviceId,
    targetRoutes,
    phrases: Object.freeze({ en, da, sv }),
    intent: options.intent || 'commercial',
    priority: index < 6 ? 'primary' : 'supporting',
    coverage: options.coverage || 'core'
  }));
}));

export const keywordClusters = Object.freeze(Object.fromEntries(definitions.map(group => [group.serviceId, Object.freeze({
  labels: Object.freeze(group.labels),
  targetRoutes: seoKeywords.find(keyword => keyword.serviceId === group.serviceId).targetRoutes,
  keywords: Object.freeze(seoKeywords.filter(keyword => keyword.serviceId === group.serviceId))
})])));

export function keywordPhrasesFor(serviceId, lang, { priority, coverage } = {}) {
  if (!['en', 'da', 'sv'].includes(lang)) throw new RangeError(`Unsupported keyword language: ${lang}`);
  if (!keywordClusters[serviceId]) throw new RangeError(`Unknown keyword service: ${serviceId}`);
  return keywordClusters[serviceId].keywords
    .filter(keyword => (!priority || keyword.priority === priority) && (!coverage || keyword.coverage === coverage))
    .map(keyword => keyword.phrases[lang]);
}

export function primaryKeywordsFor(serviceId, lang) {
  return keywordPhrasesFor(serviceId, lang, { priority: 'primary' });
}
