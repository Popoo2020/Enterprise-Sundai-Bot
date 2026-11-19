import { searchCopy } from './search-copy.mjs';
import { renderHeader, renderFooter } from './frame.mjs';
import { articleSlugs, knowledge } from './knowledge-data.mjs';

const base = lang => lang === 'en' ? '/' : '/' + lang + '/';
const articleUrl = (lang, slug) => base(lang) + 'read/' + slug + '/';
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

export function resourcesSection(lang) {
 const c = knowledge[lang];
 const articles = c.a.map(([title,lead],i) => `<article><h3><a href="${articleUrl(lang,articleSlugs[i])}">${title}</a></h3><p>${lead}</p></article>`).join('');
 const market = searchCopy[lang];
 const faqs = [...c.q,starting[lang],literacyQuestion(lang),[market.marketQ,market.marketA]].map(([question,answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('');
 return `<div class="kn-home"><section id="articles" class="kn-section"><header><h2>${c.articles}</h2><p>${c.articleIntro}</p></header><div class="kn-articles">${articles}</div><a class="kn-archive" href="${archive(lang)}">${c.archive}</a></section><section id="faq" class="kn-section kn-faq"><header><h2>${c.faq}</h2><p>${c.faqIntro}</p></header><div>${faqs}</div></section></div>`;
}

export function renderArticle(lang,slug) {
 const c = knowledge[lang], i = articleSlugs.indexOf(slug);
 if(i===-1) throw new Error('Unknown article: '+slug);
 const a = c.a[i], [reference,href,related] = further[i], opts={innerPage:true,article:slug};
 const body=[2,4,6].map(j=>`<section><h2>${a[j]}</h2><p>${a[j+1]}</p></section>`).join('');
 const links={he:['אוטומציה עסקית','קורס Teen Tech AI','עוזרי AI לידע ארגוני'],en:['Business automation','Teen Tech AI course','Internal AI assistants'],sv:['Automatisering för företag','Kursen Teen Tech AI','Interna AI-assistenter'],da:['Automatisering i virksomheder','Kurset Teen Tech AI','Interne AI-assistenter']};
 return `<!doctype html><html lang="${lang}" dir="${lang==='he'?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${a[0]} | SundAI</title><meta name="description" content="${a[1]}"><link rel="icon" href="/assets/favicon.svg">${['shell','frame','knowledge'].map(f=>'<link rel="stylesheet" href="/assets/brand-home/'+f+'.css">').join('')}<script defer src="/assets/brand-home/frame.js"></script></head><body><a class="fr-skip" href="#main">${a[0]}</a>${renderHeader(lang,opts)}<main id="main" class="kn-reading"><article><a class="kn-back" href="${base(lang)}#articles">${c.back}</a><h1>${a[0]}</h1><p class="kn-lead">${a[1]}</p>${body}<aside><h2>${c.apply}</h2><p>${a[8]}</p></aside><nav aria-label="${c.further}"><h2>${c.further}</h2><a href="${base(lang)+related}">${links[lang][i]}</a><a href="${href}" lang="en" dir="auto">${reference}</a></nav></article></main>${renderFooter(lang,opts)}</body></html>`;
}
