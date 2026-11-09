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
