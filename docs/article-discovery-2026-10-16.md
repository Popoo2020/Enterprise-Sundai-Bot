# Article discovery release — 16 October 2026

## Purpose and boundaries

Publish four distinct buyer-oriented articles in English, Danish and Swedish (12 pages). Preserve the approved homepage body, lead capture, pricing boundaries, testimonials and guides. Rename the existing top-level Insights navigation to Articles / Artikler / Artiklar; retain `/insights/` URLs and existing language equivalents. No extra article block on the homepage.

The hub now lists all 15 canonical articles in each language. Two historical redirect-source files per language remain on disk for compatibility but are excluded from the hub, feed and structured list. Existing article prose and original publication metadata are retained.

## Qualitative search research

Research was conducted with public web search in EN, DA and SV on 15–16 October 2026 (Europe/Copenhagen). Examples of searched combinations: AI security assessment/RAG/permissions; AI sikkerhed/penetrationstest/virksomhed; AI säkerhet/säkerhetsgranskning/företag; MCP security; MCP sikkerhed/säkerhet; DevSecOps/CI-CD; AI automation costs and business value. Results showed technical, procurement and local-language wording. This does **not** establish search volume, keyword difficulty or an underserved market.

`article-keyword-map-2026-10-16.json` records 120 candidate queries: 40 per language, grouped into four intent clusters. These include editorial variants as well as observed topic terminology. They are not all verbatim observed searches. Primary language appears naturally in titles, descriptions, headings, questions and body text; variants are not stuffed into hidden text or a meta-keywords tag. The pre-existing 120 multilingual service-intent records and associated visible copy are preserved.

| Cluster | Buyer decision | Existing content distinguished from this article |
| --- | --- | --- |
| Assessment vs penetration test | What scope and evidence should we buy? | Existing technical baseline/checklist explains controls; new article explains procurement and acceptance. |
| MCP security | Should we connect this server and with what authority? | Existing agent checklist is broader; new article addresses the concrete client/server/API boundaries. |
| AI-generated code | What must be reviewed before release? | Existing DevSecOps service describes an offer; new article supplies a practical review record. |
| Automation cost/ROI | Is the proposed workflow worth piloting? | Existing pilot-failure article covers operating gaps; new article provides arithmetic and sensitivity analysis. |

## Primary references and factual checks

- Google AI features: https://developers.google.com/search/docs/appearance/ai-features — ordinary SEO fundamentals, indexability, internal linking and text visibility apply; special AI files or markup are not required, and inclusion is not guaranteed.
- Google people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content — write for users, with clear sourcing and purpose.
- Google multilingual sites: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites — distinct language URLs and appropriate language signals.
- OpenAI crawlers: https://developers.openai.com/api/docs/bots — OAI-SearchBot controls search crawling; GPTBot training is a separate setting. Existing permissions retained, not broadened.
- MCP 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations — HTTP token audience and no token passthrough. The article distinguishes local process deployment from HTTP authorisation.
- OWASP 2025 Excessive Agency: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/ — functions, permissions and autonomy. Edition is identified; no claim that this is the latest category numbering.
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework — voluntary framework, not certification.
- Microsoft document-level access: https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview — document authorisation is distinct from service access.
- GitHub secure use: https://docs.github.com/en/actions/reference/security/secure-use — workflow least privilege, untrusted inputs and OIDC where supported.
- Microsoft cost checklist: https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/checklist — cost model and business value.
- NIST Manage: https://airc.nist.gov/airmf-resources/playbook/manage/ — weigh benefits and negative risks.
- Local terminology cross-checks: https://www.imy.se/blogg/en-sakrare-ai-resa/ and https://digst.dk/kunstig-intelligens/guides-til-brug-af-kunstig-intelligens/guide-offentlige-myndigheder/ . These help with wording and context; public-sector guidance is not presented as a universal private-sector legal obligation.

Each new article has two source domains, numbered references, a visible editorial method note and organisation authorship. No fabricated individual author, review credential, market statistic or customer outcome. AI assistance is disclosed. Checklists and scenarios are editorial recommendations, not quotations from standards or claims about a completed engagement. No new legal deadlines/classifications are asserted.

The ROI example is fictional: 1,200 × (6−2) / 60 = 80 hours; 80 × €35 − €900 = €1,900; €12,000 / €1,900 ≈ 6.3 months. At four minutes after automation: 40 hours, €500 net capacity value and 24 months. This is explicitly capacity-value arithmetic, not realised cash savings or a price quote.

Evidence assessment: primary-source technical statements 4/5 (direct official documents and complementary standards, no reproduction of vendor implementations); keyword opportunity 3/5 (qualitative search research without volume or property data); traffic/conversion uplift 1/5 (not measured). Scores describe evidence, not success probabilities.

## Implemented discovery improvements

- Server-rendered readable articles and topic navigation; no JavaScript-only filtering or gated article text.
- Reciprocal EN/DA/SV hreflang, self-canonical URLs, distinct titles and descriptions.
- Article schema with visible author, dates, language and citations; FAQ schema matches visible Q&A. No promise of FAQ rich results.
- Article breadcrumbs; full canonical CollectionPage/ItemList on each hub.
- Relevant links from all six service families and between new articles.
- Full canonical archive in RSS feeds with feed autodiscovery.
- Main and research sitemaps include all canonical articles; original article dates are not globally refreshed.
- Discovery directory and supplementary llms.txt point to the article hubs and new content. These files are directories, not ranking levers.
- Existing IndexNow workflow now checks the new article URLs and hubs before submission. A successful submission means protocol acceptance, not indexing.

## Measurement and remaining external work

No Search Console, Bing Webmaster Tools or analytics property metrics were available in this work. No claim that a page is indexed, ranks, gets cited or converts more has been made. Robots permissions alone do not prove that CDN rules allow a real verified crawler. No CDN security protection was weakened.

Recommended next measurement: establish a baseline by language, landing page and query, then compare equivalent 28-day windows. Track article visits, clicks toward relevant service pages, guide requests and qualified enquiries separately. Separate brand from non-brand queries and avoid drawing conclusions from very small samples. Account access is needed for property-specific checks; never request credentials in chat.

Off-site authority remains separate work: permissioned client references, accurate company profiles and relevant editorial contributions. No outreach messages, directory registrations, backlinks, ads or email campaigns were sent in this change. Avoid paid-link schemes and fabricated authority claims.

## Validation

Focused checks cover 12 new articles, localized reciprocal links, matching visible/schema Q&A, two source domains per article, valid anchors, all 45 canonical archive entries, feeds, sitemaps, unchanged homepage structure and ROI arithmetic. Required repository gates and publication checks are recorded in the PR/CI. Physical phone verification is not implied by source-level responsive checks.

## Live routing finding and correction

Live browser inspection after PR93 found that the asset provider redirected a requested `.html` article to an extensionless URL while the page still declared the `.html` canonical. Cloudflare documents this default here: https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/ .

The follow-up preserves all 45 established canonical article URLs. The Worker serves their extensionless asset internally, without a public redirect, and permanently redirects the known extensionless aliases to their `.html` canonical. Service URLs, directory indexes, feeds, forms, unknown paths and historical redirect-source files are untouched. The generated allowlist excludes old redirected articles. Regression tests exercise all 45 GET/HEAD paths and aliases; IndexNow release checks now reject unexpected final URL paths.

PR93 also resolved a CodeQL double-unescaping alert with single-pass entity decoding and a nested-entity regression check. All PR93 checks passed before merge. These findings were corrected rather than suppressing the security or commercial checks.
