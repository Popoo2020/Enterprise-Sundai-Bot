import { readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { restyleDocument } from './legacy-archive.mjs';
import { checklistContent, growthCopy, guideIds, guideTitles } from '../lead-content.mjs';
import { experienceCopy } from '../home-experience.mjs';
import { htmlEscape as esc } from '../seo-render.mjs';
import { renderHeader, renderFooter } from './frame.mjs';
import { guideIndex } from './knowledge-data.mjs';
import { locales } from './search-copy.mjs';

export const legacyGuideSlugs = guideIds;
const base = lang => lang === 'en' ? '/' : '/' + lang + '/';
export const legacyGuideHubPath = lang => base(lang) + 'free-guides/';
const route = (lang, slug) => legacyGuideHubPath(lang) + (slug ? slug + '/' : '');
const release = JSON.parse(readFileSync(new URL('../../site/discovery.json', import.meta.url), 'utf8')).release;

const ui = {
  en: { title:'Free AI and security checklists', contents:'Inside the guide', sample:'Preview', questions:'Questions about the guides', download:'Get the four-page PDF', privacy:'Privacy', privacyPath:'/privacy.html', fallback:'Request the guide by email', pdf:'English PDF · 4 pages', act:'EU AI Act · Article 113', back:'All articles and guides' },
  sv: { title:'Gratis checklistor för AI och säkerhet', contents:'I checklistan', sample:'Läs ett utdrag', questions:'Frågor om guiderna', download:'Hämta guiden som PDF', privacy:'Integritet', privacyPath:'/sv/integritet.html', fallback:'Be om guiden via mejl', pdf:'Svensk PDF · 4 sidor', act:'EU:s AI-förordning · artikel 113', back:'Alla artiklar och guider' },
  da: { title:'Gratis tjeklister til AI og sikkerhed', contents:'Det indeholder guiden', sample:'Læs et uddrag', questions:'Spørgsmål om guiderne', download:'Hent guiden som PDF', privacy:'Privatliv', privacyPath:'/da/privatliv.html', fallback:'Bed om guiden via mail', pdf:'Dansk PDF · 4 sider', act:'EU’s AI-forordning · artikel 113', back:'Alle artikler og vejledninger' },
  he: { title:'מדריכי AI ואבטחת מידע להורדה', questions:'שאלות על המדריכים', pdf:'קובץ המקור באנגלית · 4 עמודים', act:'חוק הבינה המלאכותית של האיחוד האירופי · סעיף 113', back:'כל המאמרים והמדריכים' }
};
export const legacyGuideLabel = lang => ui[lang].title;

const hebrew = {
  titles: ['היערכות לחוק הבינה המלאכותית האירופי ב־2026', 'חמישה סיכוני אבטחה בסוכני AI ואיך בודקים אותם', 'רשימת בדיקה לניהול הרשאות של ספקים ומערכות'],
  intro: 'לפני שמחברים מערכת לנתוני הארגון, בחרו את רשימת הבדיקה שמתאימה להחלטה שלכם. אפשר לקרוא את המדריכים כאן בעברית ולקבל את קובצי המקור באנגלית.',
  cards: [
    { audience:'מנהלי מוצר, אחראי ציות והנהלות', outcome:'מפו את השימושים ב־AI בארגון, בררו אילו חובות עשויות לחול ותנו לכל משימה אחראי ומועד.' },
    { audience:'צוותי פיתוח ומוצר שמחברים סוכן AI לכלים או למאגר ידע', outcome:'בדקו מה הסוכן רשאי לקרוא ולשנות, מתי הוא צריך לקבל אישור ואיך עוצרים פעולה חריגה.' },
    { audience:'צוותים שנותנים לספקים גישה למערכות ולנתוני לקוחות', outcome:'בחנו את ההפרדה בין לקוחות, את הרשאות הספק ואת ביטול הגישה לפני שמחברים את המערכת.' }
  ],
  sections: [
    [
      ['מיפוי שימושים ובדיקת תחולה', 'ערכו רשימה של השימושים ב־AI בארגון. ציינו לכל שימוש את האחראים, הספקים והאנשים שהמערכת עשויה להשפיע עליהם.', 'בררו מה תפקידכם בשרשרת האספקה. החובות של ספק מערכת, ארגון שמפעיל אותה, יבואן ומפיץ עשויות להיות שונות.', 'בדקו אם השימוש אסור, אם חלות עליו חובות שקיפות ואם הוא נכלל בקטגוריית סיכון גבוה. תעדו את הנימוק לסיווג.'],
      ['אילו מסמכים ובקרות צריך להכין?', 'שרטטו לאן הנתונים עוברים, לאיזו מטרה, מי מורשה לגשת אליהם וכמה זמן שומרים אותם. בדקו בנפרד את דרישות ה־GDPR.', 'תעדו כיצד הצוות לומד להשתמש במערכת בהתאם לתפקידיו ולהרשאותיו. שמרו דוגמה לתרגול או להחלטה שהעובדים נדרשו לקבל.', 'בקשו מהספק תיאור של השימוש המיועד, מגבלות המערכת, נוהל הדיווח על שינויים והמסמכים הזמינים לבדיקת עמידה בדרישות.'],
      ['מתי מקבלים החלטה?', 'חובות אוריינות AI והאיסורים המקוריים החלו לחול ב־2 בפברואר 2025. מועד התחולה הכללי של החוק הוא 2 באוגוסט 2026. לחלק מההוראות נקבעו מועדים אחרים.', 'לפי סעיף 113, למערכות בסיכון גבוה המנויות בנספח III נקבע 2 בדצמבר 2027 כמועד התחולה של חלק מרכזי מהדרישות. למערכות לפי נספח I וסעיף 6(1) נקבע 2 באוגוסט 2028. בדקו את ההוראה המדויקת ואת הוראות המעבר הרלוונטיות למערכת שלכם.', 'לכל מסמך או בקרה שעדיין חסרים, קבעו אחראי ומועד. לפני ההשקה רשמו מי החליט להתקדם, להמתין או לבקש מידע נוסף, ועל סמך מה.']
    ],
    [
      ['הרשאות לכלים וזהויות', 'סיכון ראשון הוא הרשאת יתר. תנו לכל כלי זהות עם ההרשאות הדרושות למשימה, ודרשו אישור לפעולה רגישה. ודאו שמשימת קריאה אינה יכולה לשנות רשומות.', 'סיכון שני הוא זהות משותפת או חלשה. חסמו סיסמאות חלשות, התאימו את האימות הרב־שלבי לסיכון והחליפו סודות שנחשפו. ודאו שביטול חשבון בדיקה אכן מפסיק את הגישה.'],
      ['מידע חיצוני ושליפת מסמכים', 'סיכון שלישי הוא השפעה של הוראות המסתתרות במסמך, באתר או בהודעת דוא״ל. התייחסו לתוכן שמתקבל ממקורות אלה כאל נתונים. הגבילו במערכת את היעדים שאליהם מותר לסוכן לשלוח מידע.', 'סיכון רביעי הוא חשיפת מידע בין תפקידים או לקוחות. בדקו הרשאות לפני שליפת מסמך ולפני הפעלת כלי. שאלו אותה שאלה משני חשבונות בדיקה עם הרשאות שונות והשוו את התשובות ואת המקורות.'],
      ['מגבלות פעולה וחזרה לשגרה', 'סיכון חמישי הוא רצף פעולות או הוצאה שחורגים מהצפוי. הגדירו מכסות ומגבלות, תעדו פעולות וקבעו מי רשאי לעצור את הסוכן. בסביבת בדיקה, ודאו שהמערכת עוצרת כשהמכסה מוצתה.', 'רשמו בכל בדיקה איזו פעולה מותרת, איזו צריכה להיחסם, מה קרה בפועל, מי בדק ומתי. הוסיפו משימה לתיקון כאשר התוצאה חורגת מהצפוי.', 'התחילו בתהליך אחד. הרחיבו את הגישה אחרי שהצוות הדגים גם פעולה מורשית וגם חסימה כנדרש.']
    ],
    [
      ['זהות הספק והיקף הגישה', 'לכל חיבור חיצוני, רשמו מי אחראי עליו ולאילו נתונים יש לספק גישה.', 'הקצו זהויות נפרדות עם הרשאות מצומצמות, הפעילו אימות רב־שלבי לפי הצורך ושמרו סודות ומפתחות במערכת ייעודית.', 'תעדו כיצד פותחים חיבור לספק, מתי בודקים מחדש את ההרשאות, מי מנתק אותו ומה קורה בסיום ההתקשרות.'],
      ['הפרדה בין לקוחות ותיעוד הבדיקות', 'בסביבה מורשית עם נתונים פיקטיביים, ודאו שהשרת בודק גישה לכל רשומה, מפריד בין לקוחות ומבחין בין הרשאת קריאה להרשאת כתיבה.', 'בדקו מגבלות על שאילתות גדולות, הרשאות ייצוא ותיעוד פעילות. קבעו אילו פרטים נחוצים ליומן כדי להימנע משמירת מידע רגיש מיותר.', 'בקשו מהספק את התנאים הנוגעים למשך השמירה, למחיקה, לספקי משנה ולהודעות במקרה של אירוע אבטחה.'],
      ['דף עבודה לפגישה של חצי שעה', 'רשמו בשורה אחת את החיבור, המטרה העסקית, הזהות, סוג הנתונים, הפעולות המותרות והאחראי.', 'תעדו מה קורה כשמשתמש אינו מורשה לגשת לרשומה, כשמבוטל החיבור וכשנפח הקריאה חורג מהצפוי. ודאו שהתוצאות מתאימות להרשאות ולמנגנוני ההתראה שקבעתם.', 'סכמו מה חסר, מי אחראי לסיכון, מהי הפעולה הבאה ועד מתי יש לבצע אותה. שמרו פרטי גישה ונתוני לקוחות מחוץ לטופסי המכירה.']
    ]
  ],
  faq: [
    ['האם המדריכים בחינם?', 'כן. אפשר לקרוא את רשימות הבדיקה בעברית כאן. קובצי המקור זמינים גם באנגלית, בשוודית ובדנית, ללא תשלום.'],
    ['איך משתמשים ברשימת הבדיקה?', 'בחרו מערכת אחת ותעדו את התשובות והבדיקות. הרשימה עוזרת לאסוף מידע ולזהות פערים. הערכת עמידה בדרישות מחייבת לבדוק את המערכת, את תפקיד הארגון ואת הדין הרלוונטי.'],
    ['האם בקשת הקובץ מצרפת אותי לדיוור?', 'בקשת הקובץ משמשת למסירת המדריך. להצטרפות לסדרת שלוש ההודעות צריך לבחור בכך במפורש ולאשר את כתובת הדוא״ל.']
  ]
};

export function legacyGuideCards(lang) {
  const titles = lang === 'he' ? hebrew.titles : guideTitles[lang];
  const cards = lang === 'he' ? hebrew.cards : experienceCopy[lang].libraryCards;
  return guideIds.map((slug, i) => ({
    title: titles[i], summary: cards[i].outcome, audience: cards[i].audience, url: route(lang, slug)
  }));
}

function faq(lang) {
  const pairs = lang === 'he' ? hebrew.faq : growthCopy[lang].faq;
  return '<section class="lg-faq"><h2>' + esc(ui[lang].questions) + '</h2>' + pairs.map(([q, a]) =>
    '<details><summary>' + esc(q) + '</summary><p>' + esc(a) + '</p></details>').join('') + '</section>';
}

function leadForm(lang, slug) {
  const t = growthCopy[lang], u = ui[lang];
  return `<section class="lg-download" id="download"><h2>${esc(u.download)}</h2>
    <p>${esc(u.pdf)}</p><form data-lead-form data-guide="${slug}" action="/api/leads" method="post">
    <label>${esc(t.email)}<input name="email" type="email" autocomplete="email" maxlength="200" required></label>
    <label class="lg-choice"><input type="checkbox" name="followup" value="yes"><span>${esc(t.optin)}</span></label>
    <p>${esc(t.delivery)}</p><div data-lead-security></div>
    <p data-lead-status data-form-status role="status" aria-live="polite"></p>
    <button type="submit">${esc(t.submit)}</button>
    <p>${esc(t.privacy)} <a href="${u.privacyPath}">${esc(u.privacy)}</a></p></form>
    <a class="lg-email" href="mailto:eririmo@protonmail.com?subject=${encodeURIComponent(guideTitles[lang][guideIds.indexOf(slug)])}">${esc(u.fallback)}</a></section>`;
}

function bulletList(items) {
  return '<ul>' + items.map(item => '<li>' + esc(item) + '</li>').join('') + '</ul>';
}

function detailPage(lang, slug, card) {
  const index = legacyGuideSlugs.indexOf(slug);
  const sections = (lang === 'he' ? hebrew.sections : checklistContent[lang])[index];
  const t = ui[lang];
  const edition = {en:'Original checklist · 14 October 2026',da:'Oprindelig udgave · 14. oktober 2026',sv:'Ursprunglig utgåva · 14 oktober 2026',he:'מהדורת המקור · 14 באוקטובר 2026'};
  const preview = lang === 'he'
    ? sections.map(([heading, ...checks]) => '<section><h2>' + esc(heading) + '</h2>' + bulletList(checks) + '</section>').join('')
    : '<section><h2>' + esc(t.contents) + '</h2>' + bulletList(sections.map(s => s[0])) +
      '</section><section><h2>' + esc(t.sample) + '</h2><h3>' + esc(sections[0][0]) + '</h3>' + bulletList(sections[0].slice(1)) + '</section>';
  const regulation = slug === 'ai-act-readiness'
    ? '<p class="lg-reference"><a href="https://eur-lex.europa.eu/eli/reg/2024/1689" rel="external">' + esc(t.act) + '</a></p>' : '';
  const download = lang === 'he'
    ? '<section class="lg-download" id="download"><h2>קובץ להורדה</h2><p>' + t.pdf + '</p><a class="lg-link" hreflang="en" href="' + route('en', slug) + '#download">בקשת קובץ ה־PDF באנגלית</a></section>'
    : leadForm(lang, slug);
  return `<main id="main" class="kn-reading lg-page"><article>
    <a class="kn-back" href="${legacyGuideHubPath(lang)}">${esc(t.title)}</a>
    <header><h1>${esc(card.title)}</h1><p class="kn-byline">${esc(edition[lang])}</p><p class="kn-lead">${esc(card.summary)}</p></header>
    ${preview}${regulation}${download}${faq(lang)}</article></main>`;
}

function hubPage(lang, title, description) {
  const cards = legacyGuideCards(lang);
  const collection = cards.map(card => '<article><h3><a href="' + card.url + '">' + esc(card.title) +
    '</a></h3><p>' + esc(card.summary) + '</p><p class="lg-audience">' + esc(card.audience) + '</p></article>').join('');
  const headings = {en:'Choose a checklist',da:'Vælg en tjekliste',sv:'Välj en checklista',he:'איזו רשימת בדיקה מתאימה לכם?'};
  const instruction = lang === 'he' ? '' : '<p>' + esc(experienceCopy[lang].libraryHow) + '</p>';
  const assessment = lang === 'he'
    ? '<a class="kn-archive" href="/ai-security-check/" hreflang="en">בדיקה עצמית של אבטחת AI (באנגלית)</a>'
    : '<a class="kn-archive" href="' + base(lang) + 'ai-security-check/">' + esc(growthCopy[lang].check) + '</a>';
  return `<main id="main" class="kn-home kn-hub lg-hub"><div class="kn-section">
    <a class="kn-back" href="${base(lang)}read/">${esc(ui[lang].back)}</a>
    <header><h1>${esc(title)}</h1><p>${esc(description)}</p></header>
    <section class="kn-hub-group"><h2>${esc(headings[lang])}</h2>
    <div class="kn-articles">${collection}</div>${instruction}${assessment}</section>${faq(lang)}</div></main>`;
}

export function renderLegacyGuide(lang, slug = '') {
  const languagePaths = Object.fromEntries(locales.map(locale => [locale, route(locale, slug)]));
  const options = { innerPage: true, languagePaths };
  const card = slug && legacyGuideCards(lang).find(item => item.url === route(lang, slug));
  if (slug && !card) throw new Error('Unknown downloadable guide: ' + slug);
  const title = card ? card.title : ui[lang].title;
  const description = card ? card.summary : (lang === 'he' ? hebrew.intro : experienceCopy[lang].libraryIntro);
  const body = card ? detailPage(lang, slug, card) : hubPage(lang, title, description);
  const styles = ['shell','frame','knowledge','legacy-guides'].map(name =>
    '<link rel="stylesheet" href="/assets/brand-home/' + name + '.css">').join('');
  const client = card && lang !== 'he' ? '<script defer src="/assets/lead-growth.js"></script>' : '';
  return `<!doctype html><html lang="${lang}" dir="${lang === 'he' ? 'rtl' : 'ltr'}"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="sundai-content-release" content="${esc(release)}"><title>${esc(title)} | SundAI</title>
    <meta name="description" content="${esc(description)}"><link rel="icon" href="/assets/favicon.svg">
    ${styles}<script defer src="/assets/brand-home/frame.js"></script>${client}</head><body>
    <a class="fr-skip" href="#main">${esc(guideIndex[lang].skip)}</a>${renderHeader(lang,options)}${body}${renderFooter(lang,options)}</body></html>`;
}


export async function rebrandLegacyAssessment(staging, isPublic) {
  const languages = ['en', 'sv', 'da'];
  const languagePaths = Object.fromEntries(languages.map(lang => [lang, base(lang) + 'ai-security-check/']));
  languagePaths.he = legacyGuideHubPath('he');
  for (const lang of languages) {
    const file = path.join(staging, languagePaths[lang], 'index.html');
    const original = await readFile(file, 'utf8');
    const back = '<a class="kn-back" href="' + legacyGuideHubPath(lang) + '">' + esc(legacyGuideLabel(lang)) + '</a>';
    const html = restyleDocument({
      html: original, lang, languagePaths, isPublic,
      mainClass: 'ar-reading lg-assessment', styles: ['legacy-archive', 'legacy-guides'],
      beforeContent: back,
      bodyScripts: ['/assets/lead-growth.js', '/assets/upgrade-forms.js']
    });
    await writeFile(file, html);
  }
}
