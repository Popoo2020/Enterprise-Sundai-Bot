# SundAI · revision handover, 13 October 2026

The approved redesign was published on 13 October 2026 through PR 72, merge `6221543cb9fe7579a62edf5668b38d52ab3ebc92`. The follow-up SEO/Q&A source is prepared in `growth/seo-qa-2026-10-13`. The pre-upgrade rollback baseline remains `06b8fd12ab226f14c1926f457cada3d96f2e0c10`.

## Requested revision

1. Numeric service prices are removed from public HTML, structured data and APIs. Product cards link to a distinct sales page through “More about the product”, with corresponding Danish and Swedish text. Each of the 18 localized sales pages explains its audience, business friction, benefits, implementation approach and delivery limits. Its proposal form collects name, work email, company/organisation, optional team/department, product/system/workflow, selected service, language and a short brief.
2. The ecosystem contains 16 references: 14 directly sourced official logo assets, plus readable Microsoft Purview and OWASP names until suitable official art is available. OpenAI, Gemini, Azure, Google Cloud, AWS, Cloudflare, GitHub, Shopify, Sentinel, Defender for Cloud, Sonar, Trivy, OneTrust and Vanta logos have provenance in `site/assets/brands/SOURCES.md`. White artwork stays on dark plates; Sonar, Trivy and Vanta have light plates. AWS now uses a sharp official vector. Vendor clear space is preserved. These are technology references, not fabricated partnerships or customers.
3. Freelancer recruitment is in the desktop/mobile navigation, a quick hero link and an early full homepage section after the products. Junior/senior profiles, the six recruitment targets and the 12.5% maximum commission remain visible. Recruitment goals do not imply an already staffed team.
4. All headings use self-hosted Sora; body text uses self-hosted Manrope. Full OFL licenses and sources are in `site/assets/fonts/`. Both variable fonts include Nordic characters. Sora visually complements the SundAI wordmark; the exact original logo typeface has not been established. The approved logo artwork remains unchanged.
5. `upgrade-mobile.css` supplies a separate responsive composition for phones/tablets, with simplified hero content, stacked product rows/forms, readable logos, a scrolling menu, 44px+ touch controls and a safe-area bottom action bar. Decorative hero art is omitted on phones; the workflow controls remain available in a compact native disclosure. Meaningful service descriptions and boundaries remain available. No duplicate mobile domain or content source is introduced.
6. The English hero line is “Kick-ass AI automation. Security built in.” “Serious” and an unsupported “top security” claim are absent from the hero. The main message and routes to products/contact are concise.
7. Repeated rounded card blocks and broad decorative gradients were replaced with editorial product rows, distinct section rhythms, restrained dividers, bolder type, a separate recruitment composition and expandable technical detail. These decisions apply researched design principles; they do not prove who designed a site or guarantee a visitor conversion rate.

## Design research applied

- Nielsen Norman Group, Good Visual Design, Explained: clear hierarchy, grid alignment, a consistent typographic system and deliberate colour use. https://www.nngroup.com/articles/good-visual-design/
- Nielsen Norman Group, Progressive Disclosure: first show key attributes, then let visitors open relevant detail; especially useful for information-rich mobile pages. https://www.nngroup.com/articles/progressive-disclosure/
- Nielsen Norman Group, The Negative Impact of Mobile-First Web Design on Desktop: avoid stretching sparse phone layouts into unnecessarily dispersed desktop pages. https://www.nngroup.com/articles/content-dispersion/
- Google web.dev, Typography: responsive type, variable fonts and font-display behaviour. https://web.dev/learn/design/typography

No generic “AI detector” score or promise that a visitor will perceive the work as human-made is used. The rationale concerns actual design choices.

## Files and maintenance

- `scripts/upgrade-content.mjs`: detailed service scopes and internal base-price reference. Keep price information internal when preparing an individual commercial proposal.
- `scripts/upgrade-sales.mjs`: distinct EN/DA/SV sales stories, audiences, benefits and discovery steps.
- `scripts/upgrade-labels.mjs`: common localized navigation, calls to action, recruitment and terms.
- `scripts/upgrade-ecosystem.mjs`: sourced technology asset registry. Use `plate:true` for dark-ink art on light backgrounds; `tone:light` means white ink and needs a dark background.
- `scripts/retained-content.json`: approved baseline knowledge pages and article metadata, for reproducible builds even with a shallow checkout.
- `scripts/build-upgrade.mjs`: regenerate the production HTML after copy/layout changes.
- `site/assets/upgrade.css` + `upgrade-mobile.css`: the base/desktop system and phone/tablet composition, in that load order.
- `site/assets/upgrade-forms.js`: protects and submits the existing API contract; extra project context is encoded into the message, with a combined length limit. It preserves fields on failures and retries.
- `worker.js`: existing Cloudflare Worker, with public price-free catalog/bundle responses and schema sanitization. `/api/pricing` returns names/scopes, not monetary values; `/api/quote` validates three eligible IDs but returns a scope-review-required response without totals. Neither accepts an order.
- `docs/upgrade-route-map.json`: current routes and redirects. Existing URLs remain mapped and retained research/downloads are preserved.

The internal launch/bundle calculations remain available for operator proposals. The originally approved period remains 12 October–12 December 2026, Europe/Copenhagen; an order and scope must be accepted in writing during that period. Monthly discounts cover two cycles. The cheapest of three eligible project packages is included without automatic stacking. Contributor capacity and costs must be agreed before committing delivery; do not reduce previously agreed freelancer pay to fund a promotion.

## Forms, privacy and scheduling

There are 30 actual request forms: 18 product enquiry forms plus the original booking, network, workshop and general enquiry forms in all three languages. They all use the hardened same-origin `/api/contact`, Turnstile and the existing Resend pipeline. No parallel Formspree submission route is active in the prepared pages. Names, emails and project context are not sent to analytics. The local metric event contract is `window` / `sundai:metric` / `{event}`.

Provider acceptance is distinct from inbox receipt. Free 20-minute calls are still requests awaiting personal confirmation, not confirmed calendar reservations. No fabricated availability, calendar, meeting URL or booking database is presented. An instant booking feature still requires real availability plus authenticated administration, durable atomic slot storage, idempotency/hold expiry, DST, cancellation/rescheduling, ICS and verified notification flows.

Use the protected operator mailbox to review enquiries and candidates. Review routine enquiries/unconfirmed requests for deletion within 90 days after meaningful contact, and unsuccessful applications within six months, subject to lawful retention obligations. This is an operator process, not an automated mailbox-deletion feature. Do not collect student identities, medical records, credentials or confidential customer documents in these forms. The notice now describes company/team/product enquiry context and the actual providers.

## Verification and review artifacts

48 Node tests passed, including private catalog mathematics, all 20 bundle combinations, public price removal, origin/body/security controls, context serialization and escaping, retry/duplicate protection and 30 form contracts. Site, source-responsive, commercial, security, hero, GEO and growth checks passed over 156 HTML pages. Source/font-advance checks support heading fit at 360/390/768px; these are not browser screenshots. `git diff --check` passed after normalizing the downloaded Azure SVG line endings without changing its artwork.

`SundAI_Design_Review.html` and `SundAI_Mobile_Review.html` are self-contained interactive review files with 156 pages, embedded fonts/images, language/page navigation and selectable 360/390/768/1280/1440px iframe widths. They start at 1280px and 390px respectively. Review forms are deliberately prevented from submitting. These files are not hosted previews or results of actual browser QA. Their outer/inner scripts were parsed and their initial local page/embedded assets were checked in a JavaScript harness.

Browser rendering, keyboard/zoom/reduced-motion review in a real browser, mobile Lighthouse Performance ≥90 / Accessibility ≥95 and actual email inbox receipt have not been verified. The managed preview instructions require control-browser, which is unavailable in this session. No browser was installed or improvised to bypass that restriction.

## Publication status and rollback

The owner explicitly authorised publication on 13 October 2026, conditional on changing the EU line to “100% European service by experts from the European Union.” This owner-supplied service-origin statement is now translated consistently in EN/DA/SV. It does not describe supplier hosting or data-processing regions. The corrected release is approved for the existing GitHub/Cloudflare path. Do not alter DNS or account permissions for this upgrade.

After approval, push the prepared branch to `Popoo2020/Enterprise-Sundai-Bot`, create a PR, inspect CI and use the existing Cloudflare Workers Builds integration. Preview uses `wrangler versions upload`, not production deploy. Dry-run validates packaging only. Keep Cloudflare secrets in its secret store.

Rollback with a new revert commit or a verified prior Cloudflare version, restoring Worker and assets together. Do not force-reset shared main. No bookings database was added, so there is no destructive booking-data rollback.

Evidence strength: 4/5 for local code readiness, based on source checks plus independent tests; full visual/live-operation readiness remains unverified. This score is not a success probability.

## SEO and Q&A follow-up, 13 October 2026

The follow-up adds120 scoped keyword intents with EN/DA/SV variants,108 exact phrases in visible content per language,18 enriched product pages and three Q&A hubs with20 questions per language. `seo-content.mjs` is buyer-focused content; `seo-keywords.mjs` is the internal mapping. The FAQ schema is derived from the visible answers. Canonical resource and related-product links support meaningful discovery. `discovery.json` and `llms-full.txt` mirror published service facts; they do not promise ranking or recommendation.

The IndexNow workflow now verifies the matching public release manifest, three new canonical FAQ pages and public key before posting. It logs protocol acceptance separately from indexing. Public crawler rules remain unchanged. Search Console/Bing account settings, measured keyword volumes, rankings, actual AI recommendations and browser rendering have not been verified. See `SEO_KEYWORD_STRATEGY_2026-10-13.md` and its CSV. Publication status is established by CI/Cloudflare and served-page checks, separately from this source handover.
