import { searchCopy } from './search-copy.mjs';
import { renderHeader, renderFooter } from './frame.mjs';
import { guides, guideIndex, legacyArticleSlugs, knowledge } from './knowledge-data.mjs';

const base = lang => lang === 'en' ? '/' : '/' + lang + '/';
const hubUrl = lang => base(lang) + 'read/';
const articleUrl = (lang, slug) => hubUrl(lang) + slug + '/';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const archive = lang => 'https://sundaibot.com' + base(lang === 'he' ? 'en' : lang) + 'insights/';
const further = [
 ['NIST · AI Risk Management Framework','https://www.nist.gov/itl/ai-risk-management-framework','services/secure-ai-automation/'],
 ['UNESCO · AI Competency Framework for Students','https://www.unesco.org/en/articles/ai-competency-framework-students','courses/youth/'],
 ['NIST · AI Risk Management Framework','https://www.nist.gov/itl/ai-risk-management-framework','services/private-ai-agents-rag/']
];

const starting = {
 he: ['כמה מהר אפשר להתחיל?', 'כבר בשיחת ההיכרות של 20 דקות בוחרים פנייה, תהליך או צורך הדרכתי ומבררים מה נחוץ כדי להתחיל. אם יש מועד פנוי וההיקף מוסכם, אפשר לקיים פגישת מיפוי כבר ביום העבודה הבא. לפיילוט שמתחבר למערכות שלכם נקבע מועד הטמעה אחרי בדיקת הרשאות ובדיקות עם הצוות.'],
 en: ['How soon can we start?', 'In the free 20-minute call we pick one decision, workflow or training need and check what it takes to get started. If a slot is available and the scope is agreed, a scoping session can take place as early as the next business day. For a connected pilot, we set a rollout date after access checks and testing with your team.'],
 sv: ['Hur snabbt kan vi komma igång?', 'I det kostnadsfria samtalet på 20 minuter väljer vi ett beslut, ett arbetsflöde eller ett utbildningsbehov. Om det finns en ledig tid och vi är överens om omfattningen kan ett första arbetsmöte hållas redan nästa arbetsdag. För en pilot som kopplas till era system sätter vi datum för införandet efter behörighetskontroll och test med teamet.'],
 da: ['Hvor hurtigt kan vi komme i gang?', 'På den gratis samtale på 20 minutter vælger vi en beslutning, en arbejdsgang eller et undervisningsbehov. Er der en ledig tid, og er vi enige om omfanget, kan det første arbejdsmøde finde sted allerede næste arbejdsdag. For en pilot med adgang til jeres systemer aftaler vi datoen for idriftsættelse efter adgangstjek og test med teamet.']
};
const literacy = {
 he: ['האם צוות שעובד עם AI צריך תעודה לפי סעיף 4?', 'סעיף 4 לחוק ה־AI האירופי דורש מספקי מערכות AI ומארגונים שמשתמשים בהן לנקוט צעדים לתמיכה בפיתוח אוריינות AI של מי שמפעילים את המערכות מטעמם. בסדנה מתרגלים לפי התפקיד מה מותר להזין, איך בודקים תשובה ומתי פונים לאדם מוסמך. אפשר לתעד את התרגול. הסעיף אינו דורש תעודה מסוימת, והשתתפות בסדנה אינה אישור לעמידה בחוק.', 'סעיף 4', 'שאלות ותשובות של הנציבות האירופית'],
 en: ['Does our team need an AI literacy certificate under Article 4?', 'Article 4 of the EU AI Act requires AI providers and deployers to take steps to support AI literacy among people operating or using AI on their behalf. In a workshop, staff practise what data they may enter, how to check an answer and when to involve a colleague. Teams can document that practice. Article 4 requires no specific certificate, and attendance does not establish compliance.', 'Article 4', 'European Commission FAQ'],
 sv: ['Behöver teamet ett intyg om AI-kunnighet enligt artikel 4?', 'Enligt artikel 4 i EU:s AI-förordning ska leverantörer och tillhandahållare vidta åtgärder för att stödja AI-kunnigheten hos dem som hanterar eller använder systemen för deras räkning. På kursen övar deltagarna på vilka uppgifter de får mata in, hur de granskar svar och när de behöver ta hjälp. Övningarna kan dokumenteras. Artikeln kräver inget särskilt intyg och deltagande i sig styrker inte regelefterlevnad.', 'Artikel 4', 'EU-kommissionens frågor och svar'],
 da: ['Kræver artikel 4, at vores team har et kursusbevis?', 'Artikel 4 i EU’s AI-forordning kræver, at udbydere og idriftsættere træffer foranstaltninger, der understøtter AI-færdigheder hos dem, der betjener eller bruger systemerne på deres vegne. På kurset øver deltagerne sig i at vælge, hvilke data de må indtaste, kontrollere svar og vurdere, hvornår en kollega skal inddrages. Øvelserne kan dokumenteres. Artiklen kræver intet bestemt bevis, og deltagelse dokumenterer ikke i sig selv overholdelse af loven.', 'Artikel 4', 'EU-Kommissionens spørgsmål og svar']
};
function literacyQuestion(lang) {
 const [question, answer, actLabel, faqLabel] = literacy[lang];
 return [question, answer + ' <a href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4">' + actLabel + '</a> · <a href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers">' + faqLabel + '</a>'];
}

const categories = ['work', 'school', 'governance'];

// The older articles keep their URLs and copy. Present both collections in the same reading layout.
export function articlesFor(lang) {
  const existing = knowledge[lang].a.map((a, i) => {
    const [name, url, related] = further[i];
    return {
      slug: legacyArticleSlugs[i], category: categories[i], related, sources: [{name, url}],
      title: a[0], summary: a[1], sections: [[a[2], a[3]], [a[4], a[5]], [a[6], a[7]]], exercise: a[8]
    };
  });
  const added = guides.map(({slug, category, related, sources, text}) => ({
    slug, category, related, sources, ...text[lang], published: '2026-11-19'
  }));
  return [...added, ...existing];
}

export function relatedGuide(lang, route) {
  const guide = guides.find(item => item.related === route);
  return guide ? {url: articleUrl(lang, guide.slug), title: guide.text[lang].title} : null;
}

function articleCard(lang, slug, title, summary) {
  return `<article><h3><a href="${articleUrl(lang, slug)}">${escape(title)}</a></h3><p>${escape(summary)}</p></article>`;
}

export function resourcesSection(lang) {
  const c = knowledge[lang];
  const articles = c.a.map(([title, lead], i) => articleCard(lang, legacyArticleSlugs[i], title, lead)).join('');
  const market = searchCopy[lang];
  const faqs = [...c.q, starting[lang], literacyQuestion(lang), [market.marketQ, market.marketA]]
    .map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('');
  return `<div class="kn-home"><section id="articles" class="kn-section"><header><h2>${c.articles}</h2><p>${c.articleIntro}</p></header><div class="kn-articles">${articles}</div><a class="kn-archive" href="${hubUrl(lang)}">${guideIndex[lang].browse}</a></section><section id="faq" class="kn-section kn-faq"><header><h2>${c.faq}</h2><p>${c.faqIntro}</p></header><div>${faqs}</div></section></div>`;
}

function readingPage(lang, title, description, options, main) {
  const css = ['shell','frame','knowledge'].map(file => `<link rel="stylesheet" href="/assets/brand-home/${file}.css">`).join('');
  return `<!doctype html><html lang="${lang}" dir="${lang === 'he' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(title)} | SundAI</title><meta name="description" content="${escape(description)}"><link rel="icon" href="/assets/favicon.svg">${css}<script defer src="/assets/brand-home/frame.js"></script></head><body><a class="fr-skip" href="#main">${guideIndex[lang].skip}</a>${renderHeader(lang,options)}${main}${renderFooter(lang,options)}</body></html>`;
}

export function renderHub(lang) {
  const c = guideIndex[lang];
  const articles = articlesFor(lang);
  const links = categories.map(key => `<a href="#${key}">${c[key]}</a>`).join('');
  const groups = categories.map(key => {
    const cards = articles.filter(item => item.category === key)
      .map(item => articleCard(lang, item.slug, item.title, item.summary)).join('');
    return `<section class="kn-hub-group" id="${key}"><h2>${c[key]}</h2><div class="kn-articles">${cards}</div></section>`;
  }).join('');
  const main = `<main class="kn-home kn-hub" id="main"><div class="kn-section"><a class="kn-back" href="${base(lang)}">${c.home}</a><header><h1>${c.title}</h1><p>${c.summary}</p></header><nav class="kn-topics" aria-label="${c.topics}">${links}</nav>${groups}<a class="kn-archive" href="${archive(lang)}">${knowledge[lang].archive}</a></div></main>`;
  return readingPage(lang, c.title, c.summary, {innerPage:true, hub:true}, main);
}

export function renderArticle(lang, slug) {
  const articles = articlesFor(lang);
  const a = articles.find(item => item.slug === slug);
  if (!a) throw new Error('Unknown article: ' + slug);
  const c = guideIndex[lang];
  const relatedGuides = articles.filter(item => item.category === a.category);
  const next = relatedGuides[(relatedGuides.indexOf(a) + 1) % relatedGuides.length];
  const body = a.sections.map(([heading, paragraph]) =>
    `<section><h2>${escape(heading)}</h2><p>${escape(paragraph)}</p></section>`).join('');
  const byline = a.published ? `<p class="kn-byline"><span>${c.byline}</span><time datetime="${a.published}">${c.date}</time></p>` : '';
  const sources = a.sources.map(({name, url}) =>
    `<li><a href="${escape(url)}" dir="auto">${escape(name)}</a></li>`).join('');
  const main = `<main id="main" class="kn-reading"><article>
    <a class="kn-back" href="${hubUrl(lang)}">${c.browse}</a>
    <header><h1>${escape(a.title)}</h1>${byline}<p class="kn-lead">${escape(a.summary)}</p></header>
    ${body}<aside><h2>${knowledge[lang].apply}</h2><p>${escape(a.exercise)}</p></aside>
    <section class="kn-sources"><h2>${c.sources}</h2><ul>${sources}</ul></section>
    <nav aria-label="${knowledge[lang].further}"><h2>${knowledge[lang].further}</h2><a href="${base(lang) + a.related}">${c.services[a.related]}</a><a href="${articleUrl(lang, next.slug)}">${escape(next.title)}</a></nav>
  </article></main>`;
  return readingPage(lang, a.title, a.summary, {innerPage:true, article:slug}, main);
}
