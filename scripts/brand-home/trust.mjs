import { readFileSync } from 'node:fs';
import { renderHeader, renderFooter } from './frame.mjs';
import { trustPaths } from './framework-strip.mjs';
import { guideIndex } from './knowledge-data.mjs';

export { trustPaths };

const copy = {
  en: {
    title: 'Standards, controls and how we work',
    description: 'How SundAI helps teams prepare evidence for SOC 2, ISO/IEC 27001 and ISO/IEC 42001, map GDPR and EU AI Act obligations, and agree the scope of a project.',
    label: 'AI governance and information security', frameworks: 'How we help with each framework',
    euLabel: 'AI regulation', euText: 'Identify how your organisation provides or uses an AI system, document the intended purpose and assign responsibility for reviewing the applicable obligations.',
    source: 'Official source', languages: 'English, Hebrew, Danish and Swedish'
  },
  sv: {
    title: 'Standarder, kontroller och arbetssätt',
    description: 'Så hjälper SundAI er att ta fram underlag för SOC 2, ISO/IEC 27001 och ISO/IEC 42001 och kartlägga kraven i GDPR och EU:s AI-förordning.',
    label: 'AI-styrning och informationssäkerhet', frameworks: 'Så arbetar vi med varje regelverk',
    euLabel: 'AI-reglering', euText: 'Kartlägg hur organisationen tillhandahåller eller använder ett AI-system. Dokumentera systemets avsedda ändamål och utse ansvariga för att bedöma vilka skyldigheter som gäller.',
    source: 'Officiell källa', languages: 'Engelska, hebreiska, danska och svenska'
  },
  da: {
    title: 'Standarder, kontroller og vores arbejdsmetode',
    description: 'Sådan hjælper SundAI med dokumentation til SOC 2, ISO/IEC 27001 og ISO/IEC 42001 og med at kortlægge kravene i GDPR og EU’s AI-forordning.',
    label: 'AI-styring og informationssikkerhed', frameworks: 'Sådan hjælper vi med de enkelte regelsæt',
    euLabel: 'AI-regulering', euText: 'Kortlæg, hvordan virksomheden udbyder eller anvender et AI-system. Beskriv systemets tilsigtede formål, og aftal, hvem der skal vurdere, hvilke forpligtelser der gælder.',
    source: 'Officiel kilde', languages: 'Engelsk, hebraisk, dansk og svensk'
  },
  he: {
    title: 'תקנים, רגולציה ושיטות העבודה שלנו',
    description: 'איך SundAI מסייעת לארגונים להכין תיעוד לביקורת SOC 2, ליישם את תקני ISO לניהול אבטחת מידע ובינה מלאכותית ולמפות את דרישות ה־GDPR וחוק הבינה המלאכותית האירופי.',
    label: 'ממשל בינה מלאכותית ואבטחת מידע', frameworks: 'איך נוכל לעזור ביישום כל מסגרת?',
    euLabel: 'רגולציית בינה מלאכותית', euText: 'נמפה את תפקיד הארגון באספקת מערכת הבינה המלאכותית או בשימוש בה, נתעד את מטרת השימוש ונגדיר מי אחראי לבדיקת החובות החלות עליו.',
    source: 'למקור הרשמי', languages: 'עברית, אנגלית, דנית ושוודית'
  }
};
const legalLanguage = {en:'eng', he:'eng', sv:'swe', da:'dan'};

function officialSource(id, lang) {
  const addresses = {
    soc2: 'https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services',
    iso27001: 'https://www.iso.org/standard/27001',
    iso42001: 'https://www.iso.org/standard/42001',
    gdpr: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/' + legalLanguage[lang],
    'eu-ai-act': 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/' + legalLanguage[lang]
  };
  return addresses[id];
}

// The original editions share the same platform directory. Keep its vetted logos
// and vendor URLs in one place while localising the group names around them.
function hebrewBody(english) {
  const directory = english.match(/<div class="tech-groups">([\s\S]*?)<\/div><\/div><\/section><section class="cta">/)?.[1];
  if (!directory) throw new Error('Missing platform directory in the English trust page');
  const groups = directory.replace('AI &amp; automation','בינה מלאכותית ואוטומציה')
    .replace('Cloud &amp; infrastructure','ענן ותשתיות').replace('Cybersecurity &amp; GRC','אבטחת סייבר, ממשל וניהול סיכונים');
  return `<section class="page-hero"><div class="container"><p class="eyebrow">${copy.he.label}</p><h1>${copy.he.title}</h1><p class="lead">איזה מידע עובר לספק המודל? מי מאשר גישה, ואיפה מתועדת ההחלטה? אנחנו עוזרים לצוותי טכנולוגיה והנהלה לחבר בין דרישות התקנים לעבודה היומיומית.</p></div></section>
<section class="section"><div class="container"><p>בתחילת כל פרויקט מסכמים את היקף העבודה, בעלי התפקידים והזמינות. הכשרתו של איש מקצוע, הסמכה של ארגון ותוצאות של ביקורת חיצונית הן שלוש ראיות שונות. שירותי ההיערכות שלנו כוללים הכנת תיעוד והמלצות ליישום. הסמכת ISO, ביקורת SOC 2 וחוות דעת משפטית דורשות התקשרות מתאימה.</p>
<p>מומחים מהאיחוד האירופי מלווים את הפרויקט. מיקום עיבוד הנתונים, ספקי המשנה, תקופות השמירה והרשאות הגישה נקבעים לפי המערכת והספקים שנבחרו. בדיקות חדירה מחייבות אישור כתוב וכללי התקשרות מוסכמים. שירותי אבטחה שדורשים ניטור מסביב לשעון מחייבים מערך מאויש.</p>
<div class="actions"><a class="button secondary" href="/he/read/">לספריית המדריכים</a><a class="button secondary" href="/methodology/" hreflang="en">שיטת העבודה (באנגלית)</a></div></div></section>
<section class="section framework-details" id="frameworks"><div class="container"><h2>${copy.he.frameworks}</h2><p class="framework-lead">בוחרים את המסגרת המתאימה למוצר, בודקים אילו בקרות כבר קיימות ומכינים לצוות תוכנית עבודה לפי סדר עדיפויות.</p>
<div class="framework-detail-grid"><article id="framework-soc2"><p class="framework-detail-label">היערכות לביקורת</p><h3>SOC 2 Type II</h3><p>נעזור לאסוף ראיות להפעלת הבקרות לאורך זמן, לזהות מה חסר ולקבוע מי אחראי לכל בקרה לפני ביקורת חיצונית.</p></article>
<article id="framework-iso27001"><p class="framework-detail-label">ניהול אבטחת מידע</p><h3>ISO/IEC 27001</h3><p>נגדיר אילו מערכות ותהליכים נכללים בפרויקט, נמפה את סיכוני אבטחת המידע ואת הבקרות הקיימות ונקבע איך לתעד ולטפל בפערים.</p></article>
<article id="framework-iso42001"><p class="framework-detail-label">ניהול בינה מלאכותית</p><h3>ISO/IEC 42001</h3><p>נמפה את השימושים בבינה מלאכותית בארגון, נבהיר מי אחראי להחלטות ונגדיר בקרות לאורך מחזור החיים של המערכת.</p></article>
<article id="framework-gdpr"><p class="framework-detail-label">הגנה על מידע אישי</p><h3>GDPR</h3><p>נבדוק איזה מידע אישי נאסף, אילו ספקים רשאים לגשת אליו ולכמה זמן הוא נשמר. נזהה שאלות שמצריכות בדיקת פרטיות או ייעוץ משפטי ייעודי.</p></article></div>
<p class="framework-note">הסמלונים מציינים את תחומי הליווי המקצועי של SundAI. מסמכי הסמכה ודוחות ביקורת עצמאיים נבחנים בנפרד.</p><a class="button secondary" href="/he/services/compliance-ai-governance/">לשירותי ממשל בינה מלאכותית</a></div></section>
<section class="section business-identity" id="company"><div class="container"><h2>עם מי עובדים?</h2><dl class="identity-facts">
<div><dt>המותג</dt><dd>SundAI</dd></div><div><dt>החברה המפעילה</dt><dd dir="ltr">RIIMON HOLDINGS LTD</dd></div><div><dt>מספר רישום החברה</dt><dd>13813344 · <a href="https://find-and-update.company-information.service.gov.uk/company/13813344">לרישום הרשמי בבריטניה</a></dd></div><div><dt>פניות בנוגע לפרויקטים</dt><dd><a href="mailto:eririmo@protonmail.com">eririmo@protonmail.com</a></dd></div><div><dt>שפות האתר</dt><dd>${copy.he.languages}</dd></div></dl>
<p>רישום החברה מזהה את הגורם המפעיל. היכולות הנדרשות, הצוות וחלוקת האחריות נקבעים לכל פרויקט בנפרד.</p><a class="text-link" href="/he/#organisations">לשירותים לעסקים</a></div></section>
<section class="section technology-section"><div class="container"><div class="section-heading"><div><h2>כלים ופלטפורמות</h2></div><p>הבחירה בטכנולוגיה תלויה בצורכי הפרויקט ובמומחיות הנדרשת. אלה פלטפורמות רלוונטיות לשירותים שלנו. הצגתן כאן אינה מעידה על שותפות רשמית.</p></div><div class="tech-groups">${groups}</div></div></section>
<section class="cta"><div class="container"><h2>איזו החלטה דורשת בדיקה אצלכם?</h2><p>בחרו מערכת, ספק או שימוש אחד ב־AI. בשיחה נגדיר מה צריך לברר ומה כדאי לבדוק תחילה.</p><div class="actions"><a class="button primary" href="/he/intro-call/?topic=compliance-ai-governance&amp;via=service">לתיאום שיחה של 20 דקות ללא עלות</a><a class="button secondary" href="/he/#organisations">לשירותים נוספים</a></div></div></section>`;
}

export function renderTrust(lang) {
  const t = copy[lang];
  const base = lang === 'en' ? '/' : '/' + lang + '/';
  const sourcePath = trustPaths[lang === 'he' ? 'en' : lang];
  const source = readFileSync(new URL('../../site' + sourcePath + 'index.html', import.meta.url), 'utf8');
  const original = source.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
  let body = lang === 'he' ? hebrewBody(original) : original
    .replace(/(<section class="page-hero"><div class="container">)<p class="eyebrow">.*?<\/p><h1>.*?<\/h1>/, '$1<p class="eyebrow">'+t.label+'</p><h1>'+t.title+'</h1>')
    .replace(/(<section class="section framework-details"[^>]*><div class="container">)<p class="eyebrow">.*?<\/p><h2>.*?<\/h2>/, '$1<h2>'+t.frameworks+'</h2>')
    .replace(/<dd>(?:English, Danish and Swedish|Engelska, danska och svenska|Engelsk, dansk og svensk)<\/dd>/, '<dd>'+t.languages+'</dd>')
    .replace(/href="[^"]*\/(?:book)\/"/g, 'href="'+base+'intro-call/?topic=compliance-ai-governance&amp;via=service"')
    .replace(/href="[^"]*\/(?:services|tjanster|ydelser)\/compliance-ai-governance\/"/g, 'href="'+base+'services/compliance-ai-governance/"')
    .replace(/href="[^"]*\/(?:services|tjanster|ydelser)\/"/g, 'href="'+base+'#organisations"');

  // Platform names appear in each link caption, so its logo is decorative.
  body = body.replace(/(<a data-brand="[^"]+"[^>]*><img [^>]*?) alt="[^"]*"/g, '$1 alt=""');
  const eu = '<article id="framework-eu-ai-act"><p class="framework-detail-label">'+t.euLabel+'</p><h3>EU AI Act</h3><p>'+t.euText+'</p></article>';
  body = body.replace(/(<\/article>)(\s*<\/div>\s*<p class="framework-note">)/, '$1'+eu+'$2')
    .replace(/<article id="framework-([\w-]+)">([\s\S]*?)<\/article>/g, (_,id,card) => {
      const name = card.match(/<h3>([^<]+)<\/h3>/)[1];
      return '<article tabindex="-1" id="framework-'+id+'">'+card+'<a class="tr-source" href="'+officialSource(id,lang)+'" rel="external">'+t.source+' <span class="tr-visually-hidden">('+name+')</span></a></article>';
    });
  const frame = {innerPage:true, languagePaths:trustPaths};
  return `<!doctype html><html lang="${lang}" dir="${lang==='he'?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>${t.title} | SundAI</title><meta name="description" content="${t.description}"><link rel="icon" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/brand-home/shell.css"><link rel="stylesheet" href="/assets/brand-home/frame.css"><link rel="stylesheet" href="/assets/brand-home/trust.css"><script defer src="/assets/brand-home/frame.js"></script></head>
<body><a class="fr-skip" href="#main">${guideIndex[lang].skip}</a>${renderHeader(lang,frame)}<main id="main" class="tr-page">${body}</main>${renderFooter(lang,frame)}</body></html>`;
}
