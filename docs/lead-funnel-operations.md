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

Operator notifications use `CONTACT_TO_EMAIL`. Replies, actual bookings, invoices, reports and the suitability of follow-on work remain human responsibilities. Marketing consent is not inferred from a contact enquiry or a PDF request.

## Publication checks and limits

The read-only GitHub smoke workflow checks the exact public content digest, localized entry/article pages, nine PDF responses and a real Durable Object storage-read probe through GET `/api/leads`. It creates no lead, changes no consent and sends no email. Unit tests exercise queueing, confirmation, cancellation, retries, retention, validation and client download states with test doubles.

Browser/iPhone rendering, a real visitor's Turnstile signup, production alarm execution and inbox receipt require distinct verification; do not describe the configuration smoke as those tests. No conversion uplift, search position or AI recommendation is measured by this release.

Three customer scenarios are explicitly illustrative. The Denmark CPR article distinguishes the ministry's account, press reports and security review hypotheses; it does not claim a proved entry method, a regulatory judgment or verified external client results.
