# SundAI production security deployment

This repository contains the code-side security controls. Account settings must be checked separately; source tests cannot confirm them.

## Active contact forms: repository state, 13 October 2026

The current website contains 30 request forms across English, Danish and Swedish: 18 product-proposal forms and 12 booking, freelancer, training and general-enquiry forms. All use `site/assets/upgrade-forms.js` to send JSON to the same-origin Worker endpoint `/api/contact`. The Worker verifies Cloudflare Turnstile before sending through Resend to the configured owner inbox. These public forms no longer use Formspree. The three privacy notices disclose the implemented Cloudflare, Resend and Proton Mail flow.

The client makes no readiness request and loads no Turnstile script until a visitor focuses a form or attempts to submit it. It first checks `/api/contact` configuration, then loads the challenge with explicit rendering. Incomplete configuration, failed verification and ambiguous acceptance preserve the visitor's input and do not report success. The published direct-email link to `eririmo@protonmail.com` remains available as the fallback; visitors without JavaScript use that link instead of submitting the protected form.

`GET /api/contact` and `GET /api/contact-diagnostics` check configuration only. A successful readiness response does not prove that a challenge can be completed, the provider will accept a message or an email will reach the inbox. `POST /api/contact` returns HTTP 202 only after receiving a valid Resend message ID. That confirms provider acceptance, not inbox delivery, a reply, admission to the freelancer network or a confirmed appointment. Booking requests require the operator to agree the time separately.

Before calling the live contact flow verified:

1. Confirm the production Worker uses the root `wrangler.jsonc` configuration for `sundai01`. Preserve `keep_vars: true` and the existing runtime Turnstile/email settings; keep secrets in Cloudflare's secret store.
2. Confirm both configuration endpoints return HTTP 200 and the contact readiness response reports `available: true`. Do not log secret values or disable verification to make a check pass.
3. Complete the security check through the deployed form and submit a uniquely labelled test. Check that the provider accepts the request and the expected fields appear in the corresponding provider record.
4. Confirm the matching notification arrives at the configured owner inbox. Record provider acceptance and inbox receipt as separate checks.

This section describes the current repository implementation. It does not claim that production configuration, browser interaction or live email delivery has been verified. Source and mocked-provider tests cannot establish those outcomes.

Deployment caution: this project's Cloudflare integration has previously deployed a feature branch to production. Treat a branch push as a potential production deployment until the Cloudflare build configuration is corrected. Use a reviewed, explicitly authorised publication and verify the served HTML, JavaScript and CSP together.

## Security review: 20 September 2026

Verified on the live site before this change: HTTPS, CSP, HSTS, nosniff and framing restrictions were present. The contact API returned HTTP 404: the production check identifies a Workers deployment (`sundai01`), while the repository only contained a Pages Functions layout. Function source files were also being served as static assets. A tracked-file scan found no matches for common private-key and API-token patterns; that is not a comprehensive secrets audit or a review of Git history.

The repository now includes a root Workers entry point and `wrangler.jsonc`. `/api/*` runs through the Worker; public assets retain static delivery. `site/.assetsignore` excludes server source, tests, configuration and source maps from asset uploads. Verify the actual deployment uses this configuration, rather than an overriding dashboard command or generated configuration.

Code fixes include bounded streaming request reads (12 KB, 5 seconds), bounded and expiring local rate state, working edge-cache markers, trusted edge IP handling, exact origin checks, field-type validation, strict Turnstile hostname/action verification, and controlled verification/provider failure responses. API responses include their own security headers. Automated behavior tests run with mocked providers and send no email.

Unverified account controls: WAF rules, account-level rate limits, administrator MFA, DNSSEC, registrar security, runtime secrets, email-domain authentication and alert review. Passing source checks does not establish that these controls are enabled or that the site is immune to compromise or DDoS.

## Performance design

- The public website remains static and cacheable.
- Contact forms use the shared same-origin JSON client. Cloudflare Turnstile is loaded only after form interaction and a successful configuration check; it is not loaded during ordinary page browsing. Contact API and diagnostic responses are not cached.
- Brand images are hosted locally under `site/assets/brands/`, removing third-party image requests from normal browsing.
- Sora and Manrope are hosted locally under `site/assets/fonts/`; the base and dedicated mobile stylesheets share one semantic page rather than duplicating mobile content.
- CodeQL, Dependabot and OWASP ZAP run in GitHub Actions and add no JavaScript or latency for website visitors.
- CI enforces an 85 KB budget for the main website JavaScript and a 250 KB combined CSS budget.

## 1. Cloudflare Turnstile

Create a Turnstile widget for:

- `sundaibot.com`
- `www.sundaibot.com`
- the active Cloudflare Pages preview hostname only when preview testing is required

Use Managed mode unless a specific accessibility or threat-model requirement calls for another mode.

Configure these runtime variables under **Workers & Pages → sundai01 → Settings → Variables and Secrets**, separately for each environment. Build-time variables alone are insufficient:

| Variable | Type | Value |
| --- | --- | --- |
| `TURNSTILE_SITE_KEY` | Plaintext variable | Public site key from the widget |
| `TURNSTILE_SECRET_KEY` | Encrypted secret | Secret key from the widget |
| `TURNSTILE_ALLOWED_HOSTNAMES` | Plaintext variable | `sundaibot.com,www.sundaibot.com` |

Both Turnstile keys and the email-provider configuration are required. The API returns HTTP 503 and the form offers the published telephone number when setup is incomplete. Missing keys never silently disable server-side bot verification. Preview hostnames must be explicitly included in the widget and `TURNSTILE_ALLOWED_HOSTNAMES`; the request hostname is not automatically trusted.

Verification:

1. Open the contact form in a private browser window.
2. Confirm that no request to `challenges.cloudflare.com` occurs before the form is opened.
3. Open or focus the form and confirm the Turnstile request appears.
4. Submit successfully.
5. Submit without a token using an API client and confirm HTTP `403`.

## 2. Contact endpoint rate limiting

The function contains defense-in-depth limits per IP. Add an account-level Cloudflare Rate Limiting rule. In-memory state is isolate-local and the Cache API is best-effort, location-local and non-atomic; neither is a global DDoS defense.

Recommended starting rule:

- Expression: request method equals `POST` and URI path equals `/api/contact`
- Characteristic: source IP
- Threshold: 5 requests in 10 minutes
- Mitigation: block for 10 minutes
- Exclude verified search-engine bots only if Cloudflare identifies them reliably

Review legitimate traffic after two weeks before making the threshold stricter.

The function also supports an optional Workers rate-limiting binding named `CONTACT_RATE_LIMITER`. Do not add an incomplete binding to `wrangler.toml`; create it only through a supported Cloudflare Pages/Workers configuration and verify deployment first.

## 3. WAF and bot protection

Enable:

- Cloudflare Managed Rules
- Cloudflare Free Managed Rules when available on the plan
- Bot Fight Mode or the equivalent bot protection available on the account
- A custom rule focused on `/api/contact` for clearly automated or high-risk traffic

Do not place a blanket interactive challenge on the whole website. That would harm SEO, LLM crawler access, accessibility and page speed. Apply stricter controls to `/api/contact`, `/api/*` and administration surfaces only.

Keep the verified crawler rules in `robots.txt` separate from WAF decisions. Confirm that `OAI-SearchBot`, Googlebot, Bingbot and other intended search crawlers can retrieve public pages without a challenge.

## 4. TLS and DNS

In Cloudflare:

- SSL/TLS encryption mode: Full (strict)
- Minimum TLS version: TLS 1.2 or newer
- Always Use HTTPS: enabled
- Automatic HTTPS Rewrites: enabled
- Opportunistic Encryption: enabled when compatible
- DNSSEC: enabled and confirmed at the registrar
- HSTS: already emitted by the website; keep the domain HTTPS-only before changing preload settings

Confirm both apex and `www` redirect to the canonical HTTPS hostname without loops.

## 5. Account security

Require MFA or passkeys for every administrator of:

- Cloudflare
- GitHub
- Resend
- the domain registrar

Also:

- remove inactive users and old API tokens
- use least-privilege API tokens
- rotate `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` after suspected exposure
- protect GitHub `main` with required pull-request checks
- require the CI, website validation and CodeQL checks before merge
- protect Cloudflare preview deployments when they expose unpublished content

## 6. Resend and email authentication

`GET /api/contact-diagnostics` and `GET /api/contact` share the same configuration
validation. Diagnostics report `scope: configuration_only`: even an HTTP 200 is
not a delivery test. `invalid: ["resendApiKey"]` means the configured value fails
the Resend key format check; a non-empty field alone is insufficient.

For that failure, replace the runtime **Secret** `RESEND_API_KEY` on `sundai01`
with the actual dedicated sending key value beginning with `re_`, not the key's
ID, name, example placeholder or a command. Keep the key restricted to sending
from `sundaibot.com`. Do not paste the secret into chat, source code or logs.
Deploy the secret update and confirm both configuration endpoints return 200.

Then submit a uniquely labelled test through the production form and confirm
the matching message is marked delivered in Resend. A direct provider test does
not exercise the form. The endpoint only acknowledges an email after receiving
a provider message ID, which is recorded in the private Worker logs without
the visitor's message or credentials. Browser retries refresh the single-use
challenge and reuse the logical enquiry's idempotency key.

Confirm the sending domain has valid:

- SPF
- DKIM
- DMARC

Use a dedicated sender such as `website@sundaibot.com`. Keep `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` and `RESEND_API_KEY` in encrypted environment secrets. Do not place these values in GitHub, JavaScript, HTML or documentation.

## 7. Post-deployment checks

Run after every security-related deployment:

```bash
curl -I https://sundaibot.com/
curl -I https://sundaibot.com/api/contact
curl -s https://sundaibot.com/api/contact
curl -i -X POST https://sundaibot.com/api/contact \
  -H 'Content-Type: text/plain' \
  --data 'test'
```

Expected results:

- homepage includes CSP, HSTS, nosniff and frame protection
- API responses use `Cache-Control: no-store`
- contact configuration endpoint returns JSON and never returns a secret
- non-JSON POST returns HTTP `415`
- oversized JSON returns HTTP `413`
- repeated submissions eventually return HTTP `429`
- invalid or missing Turnstile tokens return HTTP `403` after production keys are configured

## 8. Monitoring

Review weekly:

- Cloudflare Security Events for `/api/contact`
- Cloudflare analytics for unusual country, ASN or IP concentration
- Resend delivery and bounce logs
- GitHub Code Scanning alerts
- Dependabot alerts and pull requests
- the scheduled OWASP ZAP artifact

Do not log contact-message content, Turnstile tokens, API keys or full provider error bodies.

## Safe fallback

If Turnstile or the email provider is unavailable, keep verification enabled and use the published click-to-call contact number while investigating. Restore the last known good deployment for a code regression. Do not remove verification secrets to bypass the security check: incomplete configuration intentionally returns HTTP 503.

Primary implementation references:

- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
- https://developers.cloudflare.com/workers/static-assets/headers/
- https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html
