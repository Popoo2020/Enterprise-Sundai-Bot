# SundAI website deployment

The production website is in `site/` and is prepared for Cloudflare Pages.

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

The form endpoint is `/api/contact`. It validates origin, payload size, field lengths, a honeypot field and minimum completion time before sending through Resend.

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
