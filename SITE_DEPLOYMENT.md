# SundAI website deployment

The production assets are in `site/`. The observed production integration is **Cloudflare Workers Builds: sundai01**.

## Production Workers configuration

- Repository root: `.`
- Configuration: `wrangler.jsonc`
- Entry point: `worker.js`
- Worker name: `sundai01`
- Build command: `node scripts/build-upgrade.mjs` (the generated HTML is also tracked)
- Production deploy command: `npx wrangler deploy`
- Preview deploy command: `npx wrangler versions upload` (never `deploy` for preview branches)
- Assets: `site/`, binding `ASSETS`

The Worker explicitly handles `/api/contact`; Workers does not automatically execute a Pages `functions/` directory. Static pages and assets continue to use the asset binding. Existing dashboard variables are preserved with `keep_vars`; secrets belong in the runtime environment, never the repository.

Both Turnstile keys and the three email-provider settings described in `SECURITY_DEPLOYMENT.md` are required. Until these are configured, the endpoint returns a controlled HTTP 503 and the form offers the existing email contact. No telephone or personal GitHub link is displayed. Verify `/api/contact` returns JSON after deploying and that `/functions/api/contact.js` does not serve source code.

The 2026 upgrade keeps the same Worker and hosting. `run_worker_first: ["/*"]` allows the Worker to sanitize legacy offer structured data at request time. The revised public site shows tailored proposals without numeric service prices. `/api/pricing` exposes product names and scopes without monetary values, and `/api/quote` validates bundle IDs without returning prices. Neither endpoint accepts service orders.

Meeting requests are sent through the existing contact pipeline, with an explicit **awaiting confirmation** state. No calendar, durable confirmed-slot store, video provider or booking-admin access is configured. The website does not pretend to reserve a slot. See `docs/SUNDAI_UPGRADE_OPERATIONS.md` for the remaining scheduler integration and operational controls.

The Pages configuration below is retained for a separately configured legacy Pages deployment; it is not the active Workers entry point.

## Cloudflare Pages settings

- Repository: `Popoo2020/Enterprise-Sundai-Bot`
- Production branch: `main`
- Root directory: `site`
- Build command: leave empty
- Build output directory: `.`
- Project name: `sundai-website`

## Contact form variables

Add these encrypted variables in **Cloudflare Pages → Settings → Variables and Secrets** for production and preview:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` (for example `SundAI Website <website@sundaibot.com>` after the domain is verified in Resend)

The form endpoint is `/api/contact`. It validates origin, payload size, field lengths, minimum completion time, Cloudflare Turnstile and rate limits before sending through Resend. The legacy hidden `website` field is accepted for backwards compatibility but is not used to silently discard enquiries, because browser/password-manager autofill can populate hidden fields.

## Custom domain

In **Cloudflare Pages → Custom domains**, add:

- `sundaibot.com`
- `www.sundaibot.com`

Choose one canonical host and redirect the other to it. The website metadata currently uses `https://sundaibot.com` as canonical.

## Local checks

```bash
node --check site/assets/site.js
node --check site/functions/api/contact.js
node site/tests/check-site.mjs
python3 -m http.server 8788 --directory site
```

The Pages Function is not executed by Python's static server. Test the contact function through a Cloudflare preview deployment or Wrangler.
