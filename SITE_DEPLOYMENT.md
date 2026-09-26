# SundAI website deployment

The production assets are in `site/`. The observed production integration is **Cloudflare Workers Builds: sundai01**.

## Production Workers configuration

- Repository root: `.`
- Configuration: `wrangler.jsonc`
- Entry point: `worker.js`
- Worker name: `sundai01`
- Build command: none required
- Production deploy command: `npx wrangler deploy`
- Preview deploy command: `npx wrangler versions upload` (never `deploy` for preview branches)
- Assets: `site/`, binding `ASSETS`

The Worker explicitly handles `/api/contact`; Workers does not automatically execute a Pages `functions/` directory. Static pages and assets continue to use the asset binding. Existing dashboard variables are preserved with `keep_vars`; secrets belong in the runtime environment, never the repository.

Both Turnstile keys and the three email-provider settings described in `SECURITY_DEPLOYMENT.md` are required. Until these are configured, the endpoint returns a controlled HTTP 503 and the form offers telephone contact. Verify `/api/contact` returns JSON after deploying and that `/functions/api/contact.js` no longer serves source code.

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
