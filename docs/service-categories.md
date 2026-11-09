# Four service areas, original SundAI voice

The website retains the approved pre-simplification brand copy from `e382c20813abc51882703485d659274322cbd8eb`. Visitors choose from four areas, then see the original specialist offerings and a direct path to a conversation.

| Area | Existing specialist services |
| --- | --- |
| Business Automation | Secure AI Business Automation |
| AI Assistants | Private AI Assistants, Agents & RAG |
| Cybersecurity | OSINT/Pentesting/Red Teaming; DevSecOps; Cloud Security |
| AI Governance & Training | Compliance/GRC/AI Governance; existing workshops and training |

The new category cards show concrete options in English, Danish and Swedish. The service hub retains every original specialist description, deliverable and scope, including links to the existing product pages. Categories group options; they are not new bundled packages. Existing prices, terms, specialist URLs and form/API behavior are unchanged.

The original hero, subtitle, calls to action, process, About content, guide headings, selling sections, technology references and navigation are restored. The replacement founder/project copy from the earlier simplification is removed. The only global FAQ change explains the four-area grouping.

## Validation on 9 November 2026

- The four original copy modules (labels, home experience, service content and sales content) match the approved commit byte for byte.
- 186 of 198 generated page bodies match the approved version exactly. The 12 changed bodies are home, service hub, proposal/pricing hub and FAQ in three languages.
- Build: 198 pages. Node suite: 114 passed, zero failures/skips. All 60 remaining Node commands in website CI passed.
- Browser review: original desktop hero; category cards; category-to-detail navigation; mobile EN/DA/SV at 360/390 pixels without horizontal overflow; Swedish category-to-meeting flow.
- Form/API behavior is tested using mocks. No new real enquiry or inbox-delivery test was performed.

The source for the new grouping is `scripts/service-categories.mjs`; existing specialist scopes remain in `scripts/upgrade-content.mjs`.

## Service presentation and funnel review — 9 November 2026

A second review focused on making the four areas easier to understand and buy:

- **Business AI Automation:** operations/admin, CRM/system integrations and controlled AI workflows.
- **AI Assistants & RAG:** company knowledge, support/onboarding and scoped agents. RAG is explained in plain language.
- **Cybersecurity & Cloud:** pentesting/AI security, cloud identities/access and DevSecOps.
- **AI Governance & Training:** governance/risk, readiness/documentation and team/leadership workshops.

Each home/proposal card now has a category-level benefit, three named offerings, a clearly labelled illustrative example, and distinct exploration/meeting links. No example is presented as a measured client outcome. The approved hero and specialist copy remain intact. Four shortcuts in the hero orient visitors immediately. The hub replaces the duplicated decision/card layers with four compact section links while preserving every specialist scope and deliverable.

Category meeting links now select the matching category in the existing form; all specialist options remain available. Generic enquiries start with an empty required choice instead of silently choosing automation. No contact endpoint, pricing, security control, email routing or external integration changed. A contradictory staffing-ratio sentence was replaced with the existing project-based senior oversight commitment.

Six stale use-case links were repaired. Page validation now checks cross-page fragments as well as same-page anchors, preventing this navigation regression from recurring. Pricing cards now use H2 under the page H1.

Validation: 198 pages rebuilt; 114 Node tests and all 60 other website CI commands passed. Browser inspection covered EN desktop, DA mobile and SV tablet, with iframe viewport checks at widths 360, 390, 768, 900, 1000 and 1440 (content widths exclude scrollbar). A mobile-grid collision found during review was fixed and rechecked. Service selection correctly prefilled the Danish governance meeting request. Final CI and live deployment verification are recorded in the publishing pull request. No real enquiry was sent; actual email receipt and conversion uplift were not measured.
