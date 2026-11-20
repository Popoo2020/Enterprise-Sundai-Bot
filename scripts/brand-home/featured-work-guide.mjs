import { marketEvidenceGuide } from './market-evidence-guide.mjs';
import { signupEvidenceGuide } from './signup-evidence-guide.mjs';

const copy = {
  en: ['Tools you can try', 'Check the evidence behind a market claim', 'Calculate your signup completion rate'],
  he: ['כלים שאפשר לנסות', 'בדקו על מה מסתמכת טענה על השוק', 'חשבו איזה אחוז מהנרשמים השלימו את התהליך'],
  sv: ['Verktyg att prova', 'Granska källorna bakom ett marknadspåstående', 'Räkna ut hur stor andel som slutför registreringen'],
  da: ['Værktøjer, I kan prøve', 'Tjek kilderne bag en påstand om markedet', 'Beregn, hvor stor en andel der gennemfører tilmeldingen']
};

export function renderFeaturedWorkGuides(lang, articles) {
  const [heading, marketLabel, signupLabel] = copy[lang];
  const root = lang === 'en' ? '/' : '/' + lang + '/';
  const featured = [[marketEvidenceGuide.slug, marketLabel], [signupEvidenceGuide.slug, signupLabel]];
  const links = featured.filter(([slug]) => articles.some(article => article.slug === slug))
    .map(([slug, label]) => `<a href="${root}read/${slug}/#work-tool">${label}</a>`).join('');
  return `<nav class="kn-featured" aria-labelledby="kn-featured-title"><h2 id="kn-featured-title">${heading}</h2><div>${links}</div></nav>`;
}
