import fs from 'node:fs';

const requiredFiles = [
  'site/index.html',
  'site/da/index.html',
  'site/sv/index.html',
  'site/assets/styles.css',
  'site/assets/ecosystem.css',
  'site/assets/responsive.css',
  'site/assets/site.js',
  'site/assets/eu-flag.svg'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

const js = fs.readFileSync('site/assets/site.js', 'utf8');
for (const token of ['European service', 'Europæisk service', 'Europeisk tjänst', '/assets/responsive.css', '/assets/eu-flag.svg']) {
  if (!js.includes(token)) throw new Error(`Missing multilingual or responsive token: ${token}`);
}

const css = fs.readFileSync('site/assets/responsive.css', 'utf8');
for (const token of ['overflow-x:hidden', '@media(max-width:980px)', '@media(max-width:520px)', 'overflow-wrap:anywhere']) {
  if (!css.includes(token)) throw new Error(`Missing responsive protection: ${token}`);
}

const flag = fs.readFileSync('site/assets/eu-flag.svg', 'utf8');
const stars = (flag.match(/<circle /g) || []).length;
if (stars !== 12) throw new Error(`EU flag must contain 12 marks, found ${stars}`);

console.log('Responsive and multilingual checks passed.');
