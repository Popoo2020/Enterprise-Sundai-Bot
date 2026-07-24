import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const siteRoot = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(siteRoot, '..');
const errors = [];

const read = async (relative) => readFile(path.join(repoRoot, relative), 'utf8');

const headers = await read('site/_headers');
for (const token of [
  "script-src 'self' https://challenges.cloudflare.com",
  "style-src 'self';",
  'frame-src https://challenges.cloudflare.com',
  'Cross-Origin-Opener-Policy: same-origin-allow-popups',
  'X-Permitted-Cross-Domain-Policies: none',
  '/api/*',
  'Cache-Control: no-store'
]) {
  if (!headers.includes(token)) errors.push(`_headers missing security token: ${token}`);
}
if (headers.includes("'unsafe-inline'")) errors.push('_headers must not allow unsafe-inline');
for (const remoteImageHost of ['images.ctfassets.net','github.githubassets.com','cdn.shopify.com','a0.awsstatic.com','egs.eccouncil.org']) {
  if (headers.includes(remoteImageHost)) errors.push(`Remote logo host remains in CSP: ${remoteImageHost}`);
}

const contact = await read('site/functions/api/contact.js');
for (const token of [
  'TURNSTILE_SECRET_KEY',
  'TURNSTILE_ALLOWED_HOSTNAMES',
  'CONTACT_RATE_LIMITER',
  'caches.default',
  'request.arrayBuffer()',
  'MAX_BODY_BYTES',
  "unsupported_media_type",
  'withTimeout',
  'turnstile/v0/siteverify',
  "console.error('Contact email delivery failed'"
]) {
  if (!contact.includes(token)) errors.push(`Contact function missing hardening token: ${token}`);
}
if (contact.includes('await resendResponse.text()')) errors.push('Contact function must not log provider response bodies');

const client = await read('site/assets/neon-compact.js');
for (const token of [
  'data-sundai-turnstile',
  'turnstile/v0/api.js?render=explicit',
  "fetch('/api/contact'",
  "'/assets/brands/openai.svg'",
  "'/assets/brands/ec-council.svg'"
]) {
  if (!client.includes(token)) errors.push(`Client script missing security/performance token: ${token}`);
}
for (const remoteLogoHost of ['images.ctfassets.net','msftstories.thesourcemediaassets.com','github.githubassets.com','cdn.shopify.com','a0.awsstatic.com','egs.eccouncil.org']) {
  if (client.includes(remoteLogoHost)) errors.push(`Client still loads remote logo host: ${remoteLogoHost}`);
}

for (const page of ['site/index.html','site/da/index.html','site/sv/index.html']) {
  const html = await read(page);
  if (html.includes('challenges.cloudflare.com/turnstile')) errors.push(`${page}: Turnstile must be lazy-loaded, not part of initial HTML`);
  if (!html.includes('data-contact-form')) errors.push(`${page}: contact form missing`);
}

for (const asset of ['openai.svg','azure.svg','gemini.svg','github.svg','shopify.svg','aws.svg','denmark-mfa.svg','ec-council.svg']) {
  try { await access(path.join(siteRoot, 'assets', 'brands', asset)); }
  catch { errors.push(`Missing local brand asset: ${asset}`); }
}

const jsBytes = (await stat(path.join(siteRoot, 'assets', 'neon-compact.js'))).size;
if (jsBytes > 85_000) errors.push(`neon-compact.js exceeds 85 KB performance budget: ${jsBytes}`);
const cssFiles = (await readdir(path.join(siteRoot, 'assets'))).filter(name => name.endsWith('.css'));
let cssBytes = 0;
for (const name of cssFiles) cssBytes += (await stat(path.join(siteRoot, 'assets', name))).size;
if (cssBytes > 250_000) errors.push(`Total CSS exceeds 250 KB performance budget: ${cssBytes}`);

const workflowsDir = path.join(repoRoot, '.github', 'workflows');
for (const workflowName of await readdir(workflowsDir)) {
  if (!/\.ya?ml$/.test(workflowName)) continue;
  const workflow = await readFile(path.join(workflowsDir, workflowName), 'utf8');
  for (const match of workflow.matchAll(/^\s*uses:\s*([^\s#]+)(?:\s+#.*)?$/gm)) {
    const reference = match[1];
    if (reference.startsWith('./')) continue;
    if (!/@[0-9a-f]{40}$/.test(reference)) errors.push(`${workflowName}: action is not pinned to a full commit SHA: ${reference}`);
  }
}

for (const required of ['.github/dependabot.yml','.github/workflows/codeql.yml','.github/workflows/zap-baseline.yml','SECURITY_DEPLOYMENT.md']) {
  try { await access(path.join(repoRoot, required)); }
  catch { errors.push(`Missing security automation or deployment file: ${required}`); }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Security hardening passed. Initial Turnstile is lazy, logos are local, JS is ${jsBytes} bytes and CSS is ${cssBytes} bytes.`);
