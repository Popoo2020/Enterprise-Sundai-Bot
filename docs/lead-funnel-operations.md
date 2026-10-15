# SundAI practical lead funnel — 14 October 2026

The published offer is **AI Decision Review, EUR 490** for one decision, a focused 45-minute discussion and a 3–5-page memo. Scope, timing and applicable VAT are confirmed in writing before acceptance. Forms request work; they do not take payment or confirm an appointment. Six core services retain tailored proposals and their private catalog configuration.

## Visitor experience

Three practical PDF guides are available in English, Danish and Swedish. Each guide page provides a useful preview, requests an email and offers a separate, unchecked choice for three follow-up emails. The immediate response is a durable queue receipt with a PDF download link. A requested copy and an operator notification are queued; neither the response nor a Resend receipt proves inbox delivery.

The optional series requires a confirmation email followed by an explicit confirmation-page POST. Opening a confirmation link does not subscribe the visitor. The three emails are scheduled immediately after confirmation, after two days and after five days. They provide access-control and supplier-evidence checks, then offer the decision review or a free 20-minute fit-call request. Each marketing email contains a visible unsubscribe link and RFC 8058 one-click headers. Unsubscribe cancels pending marketing; an already in-flight message cannot be recalled. Previous confirmation links cannot reverse a newer cancellation. New explicit opt-in can start a fresh series.

The four-question self-assessment runs locally. It displays practical next steps before contact capture; selected answers populate the existing protected contact form. No external Typeform, analytics collection or browser storage is introduced.

## Delivery and storage

`LeadFlow`, a Cloudflare SQLite Durable Object, stores one normalized-email record, durable jobs and consent timestamps. It uses the existing Cloudflare Worker Resend sending key and sender identity. No additional provider credentials are required. The root Wrangler migration creates this new namespace; deploy the root Worker, not the legacy Pages configuration.

The guide API reuses the bounded JSON parser, Origin validation, edge/local rate controls, submission timing and Turnstile checks from the existing contact handler. Per-email request and pending-job limits bound mail volume. Preference tokens use authenticated encryption and are purpose-bound. Confirmation expires after seven days; unsubscribe links expire after 180 days. Email identity cannot be supplied through preference form fields.

Alarms send one job at a time. Network/429/5xx failures retry with stable payloads and Resend idempotency keys. Ambiguous sends are never replayed beyond the 24-hour provider idempotency window. Only a valid provider UUID marks a job accepted. Permanent marketing rejection cancels the remaining series. This version has no delivery/bounce webhook; provider suppression and receipts do not guarantee inbox delivery.

Completed payloads are removed from queue history, pending jobs are preserved and queue/history size is bounded. A cleanup alarm deletes the record 180 days after the latest request or preference change. Operator mailbox and provider logs have separate retention processes. Erasure of this queue is not erasure of those other systems.

Operator notifications use `CONTACT_TO_EMAIL` and direct replies to the requesting visitor. Visitor guide and follow-up messages direct replies to the operator inbox, rather than the sending-only website address. Replies, actual bookings, invoices, reports and the suitability of follow-on work remain human responsibilities. Marketing consent is not inferred from a contact enquiry or a PDF request.

## Publication checks and limits

The read-only GitHub smoke workflow checks the exact public content digest, localized entry/article pages, nine PDF responses and a real Durable Object storage-read probe through GET `/api/leads`. It creates no lead, changes no consent and sends no email. A second production step verifies all nine guide landing pages, PDF response headers and the three published €490 offer schemas, then checks rejection of invalid methods, foreign origins, unknown fields, invalid email, missing security proof and invalid preference tokens. These are rejection checks, not a successful signup. Unit tests exercise queueing, confirmation, cancellation, retries, retention, validation and client download states with test doubles.

Browser/iPhone rendering, a real visitor's Turnstile signup, production alarm execution and inbox receipt require distinct verification; do not describe the configuration smoke as those tests. No conversion uplift, search position or AI recommendation is measured by this release.

As of 15 October 2026, the three illustrative customer scenarios and the earlier fictional project examples are replaced by four client testimonials supplied by the site owner for publication. Quotes remain in the original English across EN/DA/SV; controls and headings are localized. The only editorial change is removal of the stray comma in “seamless , extension”. No independent verification, star ratings, portraits or additional results are asserted. The Denmark CPR article distinguishes the ministry's account, press reports and security review hypotheses; it does not claim a proved entry method, a regulatory judgment or verified external client results.

## Sending credential probe

GET `/api/leads/mail-readiness` uses the dedicated health object to make at most one read-only Resend API-keys request per minute per credential. It returns only a classification and HTTP status; no key, key metadata, provider body or recipient data is exposed. A sending-only key has a documented read restriction and is classified separately from an inactive key. Credential acceptance is not proof of mail submission or inbox delivery. The health cache stores only a credential fingerprint and operational result, separate from lead records.

## Live verification — 14 October 2026

An authorized browser test passed Cloudflare verification, received a durable queue receipt and downloaded the exact 50,186-byte agent-security PDF. The live test revealed a redirect-handling TypeError in outgoing Durable Object requests. Manual, non-following redirects resolved it; the original queued request retried with its existing idempotency key. Resend recorded guide and operator-notification messages as delivered at 17:18 UTC. This is provider delivery evidence, not a read receipt or a mailbox-folder inspection.

The live diagnostic displayed access/data-specific checks before contact capture and populated all four choices locally into the enquiry. Its privacy introduction was corrected in all three languages.

The confirmation link opened successfully, but the cloud browser security policy blocked clicking the confirmation button and subsequent handoff on that page. Subscription confirmation and the three follow-up messages remain unverified. The cloud browser exposes no viewport-resize capability; observed rendering was desktop at 1363 CSS pixels, not an iPhone test.


## Client feedback update — 15 October 2026

The homepage, service directory, six product pages and existing `/customer-scenarios/` URL in each language now use one shared testimonial component (27 pages). The old URL is retained so existing links continue to work. Navigation and discovery copy now describe client feedback.

The enhanced carousel displays one complete quote, starts rotating only when at least 25% of its section is visible, allows 24 seconds to read, and transitions left in 500 ms. Previous/Next navigation pauses autoplay; Pause/Play is explicit. Hover, keyboard focus and hidden tabs suspend rotation. Reduced-motion users get manual navigation without animation. Without JavaScript, all four quotes remain readable. The layout uses the tallest quote to avoid shifting the following content. This change does not alter lead capture, mail consent or the contact API.

Validation for this update: all 58 required local CI commands passed, including 98 Node tests, all 186 generated pages, commercial checks and security/performance budgets. Seven carousel tests cover the 27 replacement pages, complete text and attribution, no-JavaScript reading, 500 ms leftward wraparound, reading time, visibility gating, manual pause, focus/hover, reduced motion and older-browser fallbacks. Mobile source rules are checked; this does not constitute physical-device visual testing.
