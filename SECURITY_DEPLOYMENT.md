# SundAI production security deployment

This repository contains the code-side security controls. The Cloudflare, GitHub and Resend account controls below must also be enabled in their respective dashboards before the deployment can be considered fully hardened.

## Performance design

- The public website remains static and cacheable.
- Cloudflare Turnstile is not included in the initial HTML and is loaded only after the contact form is opened or focused.
- Brand images are hosted locally under `site/assets/brands/`, removing third-party image requests from normal browsing.
- CodeQL, Dependabot and OWASP ZAP run in GitHub Actions and add no JavaScript or latency for website visitors.
- CI enforces an 85 KB budget for the main website JavaScript and a 250 KB combined CSS budget.

## 1. Cloudflare Turnstile

Create a Turnstile widget for:

- `sundaibot.com`
- `www.sundaibot.com`
- the active Cloudflare Pages preview hostname only when preview testing is required

Use Managed mode unless a specific accessibility or threat-model requirement calls for another mode.

Configure these Cloudflare Pages variables for Production and Preview separately:

| Variable | Type | Value |
| --- | --- | --- |
| `TURNSTILE_SITE_KEY` | Plaintext variable | Public site key from the widget |
| `TURNSTILE_SECRET_KEY` | Encrypted secret | Secret key from the widget |
| `TURNSTILE_ALLOWED_HOSTNAMES` | Plaintext variable | `sundaibot.com,www.sundaibot.com` |

The backend enables Turnstile only when both the site key and secret are present. This prevents an incomplete dashboard setup from taking the contact form offline, but production should not be considered complete until both values are configured and tested.

Verification:

1. Open the contact form in a private browser window.
2. Confirm that no request to `challenges.cloudflare.com` occurs before the form is opened.
3. Open or focus the form and confirm the Turnstile request appears.
4. Submit successfully.
5. Submit without a token using an API client and confirm HTTP `403`.

## 2. Contact endpoint rate limiting

The function contains defense-in-depth limits per IP. Add an account-level Cloudflare Rate Limiting rule because dashboard enforcement is global and durable across isolates.

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

## Rollback

If Turnstile causes an unexpected production issue:

1. remove `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` together from the affected environment
2. redeploy the current commit
3. keep Cloudflare rate limiting active
4. investigate using a preview deployment

Removing only one key is not recommended. The public configuration endpoint intentionally enables Turnstile only when both values are present.
