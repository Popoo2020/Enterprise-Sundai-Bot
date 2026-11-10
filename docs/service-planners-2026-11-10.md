# Interactive service planners — 10 November 2026

Visitors can shape a service in three choices, see a useful starting plan and carry it into an editable enquiry. The same small engine supports Business AI Automation, AI Assistants & RAG, Cybersecurity & Cloud and AI Governance & Training across EN, DA and SV. Six specialist routes and training produce 21 localized planner pages.

## Changes

- Home, service-hub and pricing calls to action enter the relevant planner.
- Preserve approved slogans, four category names, six specialist scopes, prices and business boundaries.
- Put the planner after the service introduction; move repeated suitability and delivery detail into a native disclosure. Full scope, deliverables, exclusions and acceptance examples remain readable before enquiry.
- Use a connected diagram with subtle one-shot motion. Mobile puts a compact diagram above choices. Reduced-motion preferences remove animated transitions.
- Show the full result before contact capture. Allow a direct enquiry, back navigation, unknown choices and explicit protection of already edited messages.
- Name, email and editable brief are required; company is optional. The selected service is retained. The existing same-origin protected contact handler and provider acknowledgement semantics remain unchanged.
- No new tracking collector, persistence, uploads, scanning, legal classification or automated compliance claim. Planner events contain only event, category and step. Privacy notices describe the actual flow.
- Fix query-parameter preselection to target a select element, avoiding a crash when the planner form contains a hidden service input.

## Validation before publication

- All 65 commands in the website CI workflow passed locally, including 129 Node tests.
- Generated 201 pages; a repeat build produced identical page/asset hashes.
- Planner tests exercise all 768 localized choice combinations; longest generated brief is 649 characters.
- Contact-client bridge tests preserve visitor edits through the full 1,800-character field limit within the existing 3,000-character serialized-message limit, using mocked delivery.
- Browser walkthroughs completed all four English planners plus Danish automation and Swedish RAG, including brief transfer, back navigation, unknown choices, keyboard controls and preservation of a custom message.
- Browser layout checks at requested iframe widths 320, 390, 768, 1024 and 1440 (content viewports 305–1425 after scrollbars) found no horizontal overflow on the tested planner. Mobile visual review led to a second layout pass.
- JavaScript-disabled preview retained a meaningful example and direct contact route. Existing email fallback remains available without JavaScript.
- No real contact email was submitted in these checks; inbox delivery is not verified. No claim of conversion improvement is made before measurement.

Temporary responsive QA files were removed before packaging. Production status and deployment checks are recorded by the associated GitHub pull request.

## Post-publication refinement

A first-click navigation check prompted a refinement to the shared scroll reveal: containers with interactive controls now fade without translation, so focus cancellation cannot move their click targets. A regression test covers the frame geometry and focus cancellation. The final local suite has 130 tests. Browser rechecks reached both the automation and assistant planners from their homepage links.
