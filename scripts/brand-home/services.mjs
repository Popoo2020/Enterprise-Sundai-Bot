import { agentWorkflowLink } from './agent-workflows.mjs';
import { relatedGuide } from './knowledge.mjs';
import { automation, governance } from './priority-services.mjs';
import { callUrl } from './call.mjs';
import { renderHeader, renderFooter } from './frame.mjs';

export const serviceSlugs = ['compliance-ai-governance','cloud-security','secure-ai-automation','private-ai-agents-rag'];
const base = lang => lang === 'en' ? '/' : '/' + lang + '/';
const serviceUrl = (lang,slug) => base(lang) + 'services/' + slug + '/';
const escapeHtml = value => String(value).replace(/[&<>"]/g,c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const copy = {
'compliance-ai-governance':governance,
'cloud-security':{
 en:{
  category:'Cloud security & identity',title:['Who still has','admin access?'],lead:'For teams running on Azure, AWS or Google Cloud, we map who can access critical resources and put a named person behind each agreed alert.',cta:'Discuss your cloud review',
  cards:[['Permission map','See selected accounts, privileged roles and the resources they can reach.'],['Logging and alerts','Review audit visibility and agree up to five alert rules, each with an owner.'],['Recovery handover','Document emergency access, recovery settings and the changes your team still needs to make.']],
  steps:[['Choose one environment','Agree on a cloud account, subscription or project and the identities that matter most.'],['Trace the access','Review permissions, multifactor authentication and audit records with authorised staff.'],['Verify the changes','Test agreed changes with the owner before activation and hand over the action list.']],
  scope:'The initial review covers one provider, up to ten identities and ten selected resources. We agree access and permitted changes in writing.'
 },he:{
  category:'אבטחת ענן וניהול זהויות',title:['למי עדיין יש','הרשאת מנהל?'],lead:'לצוותים שעובדים עם Azure, AWS או Google Cloud, אנחנו ממפים למי יש גישה למשאבים חשובים וקובעים מי מטפל בכל התראה שנבחרה.',cta:'לתיאום שיחת אבטחת ענן',
  cards:[['מפת הרשאות','רואים אילו חשבונות נבדקו, למי יש הרשאות ניהול ולאילו משאבים הם יכולים לגשת.'],['תיעוד והתראות','בודקים מה מופיע ביומני הפעילות ומגדירים עד חמישה כללי התראה עם אחראי לכל כלל.'],['נוהל התאוששות','מתעדים גישת חירום, הגדרות שחזור ופעולות שהצוות עדיין צריך להשלים.']],
  steps:[['בוחרים סביבה אחת','מגדירים חשבון ענן, מינוי או פרויקט ובוחרים את הזהויות החשובות ביותר.'],['בודקים את הגישה','עוברים עם בעלי ההרשאה על תפקידי גישה, אימות רב־שלבי ויומני פעילות.'],['מאמתים את השינויים','בודקים את השינויים שסוכמו עם הגורם האחראי לפני הפעלתם ומוסרים רשימת פעולות.']],
  scope:'הבדיקה הראשונית מכסה ספק אחד, עד עשר זהויות ועד עשרה משאבים נבחרים. הרשאות הגישה והשינויים המותרים נקבעים בכתב.'
 }},
'secure-ai-automation':automation,
'private-ai-agents-rag':{
 en:{
  category:'Private AI assistants & RAG',title:['An answer.','And its source.'],lead:'Let support and operations teams ask a question, open the document behind the answer and see only the information their role allows.',cta:'Discuss your assistant pilot',
  cards:[['Connected source','Build a pilot on one approved knowledge source with named document owners.'],['Answers with citations','Retrieve permitted material, link each supported answer to its source and hand off unanswered questions.'],['Evaluation set','Test representative questions, restricted content and missing information before widening access.']],
  steps:[['Choose useful questions','Pick recurring questions with the people who answer them today.'],['Set the access rules','Agree on user roles, approved content, update rules and the pilot interface.'],['Check the answers','Review citations and refusals with source owners and document the rollout decision.']],
  scope:'The initial pilot covers one source, one interface and one cloud provider, with up to two roles and ten pilot users. Agent actions require an agreed mandate.'
 },he:{
  category:'עוזרי AI פרטיים וחיפוש במסמכים',title:['תשובה אחת.','וגם המקור.'],lead:'צוותי תמיכה ותפעול יכולים לשאול שאלה, לפתוח את המסמך שעליו מבוססת התשובה ולראות רק את המידע שהתפקיד שלהם מאפשר.',cta:'לתיאום שיחה על עוזר AI',
  cards:[['מקור ידע מחובר','בונים פיילוט על מקור ידע מאושר אחד ומגדירים מי אחראי למסמכים.'],['תשובות עם הפניה','מאתרים חומר בהתאם להרשאות, מקשרים כל תשובה מבוססת למקור ומעבירים שאלות פתוחות לגורם אנושי.'],['ערכת בדיקה','בודקים שאלות אופייניות, תוכן מוגבל ומידע חסר לפני הרחבת הגישה.']],
  steps:[['בוחרים שאלות שימושיות','אוספים שאלות חוזרות עם האנשים שעונים עליהן כיום.'],['מגדירים כללי גישה','מסכמים על תפקידים, חומר מאושר, כללי עדכון והממשק שישמש בפיילוט.'],['בודקים את התשובות','בוחנים עם בעלי המסמכים את ההפניות ואת המקרים שבהם אין מענה ומתעדים החלטה על ההמשך.']],
  scope:'הפיילוט הראשוני מכסה מקור אחד, ממשק אחד וספק ענן אחד, עד שני תפקידים ועשרה משתמשי ניסיון. חיבור כלים שמבצעים פעולות מחייב הסכמה על גבולות הסמכות.'
 }}
};
const nordic = {
  'cloud-security': {
    sv: {
      category: 'Molnsäkerhet och behörigheter',
      title: ['Vem har åtkomst', 'till vad?'],
      lead: 'Vi hjälper ert driftteam att upptäcka för breda behörigheter i molnet och se till att utvalda säkerhetslarm når rätt person.',
      cta: 'Boka samtal om molnsäkerhet',
      cards: [
        ['Behörighetskarta', 'Ni ser vilka identiteter som har åtkomst till de valda resurserna och var åtkomsten kan begränsas.'],
        ['Loggar och larm', 'Vi dokumenterar vilka händelser som ska loggas, vilka som ska utlösa larm och vem som tar emot dem.'],
        ['Nödåtkomst', 'Teamet får instruktioner för nödåtkomst och en genomgång av de valda inställningarna för säkerhetskopiering och återställning.']
      ],
      steps: [
        ['Välj miljö', 'Vi avgränsar uppdraget till en molnleverantör och väljer konton, identiteter och resurser tillsammans.'],
        ['Granska åtkomst', 'Vi granskar roller, privilegier och loggning och beskriver vilka ändringar som behövs först.'],
        ['Testa ändringar', 'Vi provar avtalade behörigheter och larm innan ni godkänner att ändringarna aktiveras.']
      ],
      scope: 'Grunduppdraget omfattar en prenumeration, ett konto eller ett projekt hos en molnleverantör, med upp till tio identiteter och tio utvalda resurser.'
    },
    da: {
      category: 'Cloudsikkerhed og adgangsstyring',
      title: ['Hvem har adgang', 'til hvad?'],
      lead: 'Vi hjælper jeres driftsteam med at finde for brede rettigheder i skyen og sikre, at udvalgte sikkerhedsalarmer når den rette person.',
      cta: 'Book samtale om cloudsikkerhed',
      cards: [
        ['Adgangskort', 'I ser, hvilke identiteter der har adgang til de valgte ressourcer, og hvor rettighederne kan begrænses.'],
        ['Logning og alarmer', 'Vi dokumenterer, hvilke hændelser der skal logges, hvornår en alarm skal udløses, og hvem der modtager den.'],
        ['Nødadgang', 'Teamet får en vejledning til nødadgang og en gennemgang af de valgte indstillinger for backup og gendannelse.']
      ],
      steps: [
        ['Vælg miljø', 'Vi afgrænser opgaven til én cloududbyder og vælger konti, identiteter og ressourcer sammen.'],
        ['Gennemgå adgang', 'Vi undersøger roller, rettigheder og logning og beskriver, hvilke ændringer der bør komme først.'],
        ['Afprøv ændringer', 'Vi tester de aftalte rettigheder og alarmer, før I godkender, at ændringerne aktiveres.']
      ],
      scope: 'Grundforløbet dækker ét abonnement, én konto eller ét projekt hos én cloududbyder med op til ti identiteter og ti udvalgte ressourcer.'
    }
  },
  'private-ai-agents-rag': {
    sv: {
      category: 'Privata AI-assistenter och RAG',
      title: ['Hitta svaret.', 'Öppna källan.'],
      lead: 'Vi bygger en pilot där era medarbetare får svar från godkända interna dokument och kan öppna källor som de har behörighet att läsa.',
      cta: 'Boka samtal om AI-assistenter',
      cards: [
        ['Källhänvisningar', 'Assistenten länkar till underlaget så att medarbetaren själv kan kontrollera svaret.'],
        ['Behörighetsstyrd sökning', 'Åtkomsten kontrolleras innan assistenten hämtar innehåll från den avtalade källan.'],
        ['Utvärdering', 'Teamet får testfall för svar med stöd i källan, obesvarade frågor och material som kräver särskild behörighet.']
      ],
      steps: [
        ['Välj källan', 'Vi väljer en underhållen kunskapskälla och samlar frågor som pilotgruppen faktiskt behöver få svar på.'],
        ['Koppla in assistenten', 'Vi ansluter källan, definierar användarroller och kommer överens om vad som händer när underlaget saknas.'],
        ['Utvärdera piloten', 'Vi granskar källträffar och behörigheter och lämnar över resultaten inför ert beslut om fortsatt användning.']
      ],
      scope: 'Grundpiloten omfattar en assistent, en kunskapskälla, ett gränssnitt och en molnleverantör, med upp till två användarroller och tio pilotanvändare.'
    },
    da: {
      category: 'Private AI-assistenter og RAG',
      title: ['Find svaret.', 'Åbn kilden.'],
      lead: 'Vi bygger en pilot, hvor jeres medarbejdere får svar fra godkendte interne dokumenter og kan åbne de kilder, de har adgang til.',
      cta: 'Book samtale om AI-assistenter',
      cards: [
        ['Kildehenvisninger', 'Assistenten linker til grundlaget, så medarbejderen selv kan kontrollere svaret.'],
        ['Adgangsstyret søgning', 'Adgangen kontrolleres, før assistenten henter indhold fra den aftalte kilde.'],
        ['Evaluering', 'Teamet får testscenarier for svar med belæg i kilden, ubesvarede spørgsmål og materiale med begrænset adgang.']
      ],
      steps: [
        ['Vælg kilden', 'Vi vælger en vedligeholdt videnskilde og samler de spørgsmål, pilotgruppen faktisk skal have svar på.'],
        ['Tilslut assistenten', 'Vi forbinder kilden, definerer brugerrollerne og aftaler, hvad der sker, når der mangler belæg for et svar.'],
        ['Evaluér piloten', 'Vi gennemgår kilder og adgangsrettigheder og overdrager resultaterne, så I kan tage stilling til videre brug.']
      ],
      scope: 'Grundpiloten omfatter én assistent, én videnskilde, én brugergrænseflade og én cloududbyder med op til to brugerroller og ti pilotbrugere.'
    }
  }
};
for (const [slug, translations] of Object.entries(nordic)) Object.assign(copy[slug],translations);

const ui = {
 en:{org:'Services for organisations',skip:'Skip to content',out:'What you take away',how:'How we work together',scope:'Starting scope',book:'Free 20-minute fit call',more:'Other services',art:'Illustrative example',labels:[['Control record','Supplier review','Evidence','Owner'],['Access review','Cloud identity','Access','Owner'],['Workflow','Request received','Validate','Approve'],['Knowledge source','Staff handbook','Search','Cite']]},
 he:{org:'שירותים לארגונים',skip:'דילוג לתוכן',out:'מה מקבלים בסוף',how:'איך נעבוד יחד',scope:'היקף ההתקשרות הראשונית',book:'שיחת היכרות של 20 דקות, ללא תשלום',more:'שירותים נוספים',art:'דוגמה להמחשה',labels:[['רישום בקרה','בדיקת ספק','ראיות','אחריות'],['בדיקת הרשאות','זהות בענן','גישה','אחריות'],['תהליך עבודה','התקבלה פנייה','אימות','אישור'],['מקור ידע','מדריך לעובדים','חיפוש','מקור']]},
 sv:{org:'Tjänster för organisationer',skip:'Hoppa till innehållet',out:'Det här får ni med er',how:'Så arbetar vi tillsammans',scope:'Uppdragets omfattning',book:'Ett kostnadsfritt samtal på 20 minuter',more:'Fler tjänster',art:'Illustrativt exempel',labels:[['Kontrollregister','Leverantörsgranskning','Underlag','Ansvar'],['Behörighetskontroll','Molnidentitet','Åtkomst','Ansvar'],['Arbetsflöde','Ärende mottaget','Kontroll','Godkänn'],['Kunskapskälla','Personalhandbok','Sök','Källa']]},
 da:{org:'Ydelser til organisationer',skip:'Gå til indholdet',out:'Det får I med jer',how:'Sådan arbejder vi sammen',scope:'Opgavens omfang',book:'En gratis samtale på 20 minutter',more:'Flere ydelser',art:'Illustrativt eksempel',labels:[['Kontrolregister','Leverandørgennemgang','Belæg','Ansvar'],['Adgangskontrol','Cloudidentitet','Adgang','Ansvar'],['Arbejdsgang','Sag modtaget','Kontrol','Godkend'],['Videnskilde','Personalehåndbog','Søg','Kilde']]}
};
const assets = '/assets/brand-home/';
const ink = ['ink-check.svg','ink-control.svg','ink-build.svg','ink-check.svg'];
const markPaths = [
  '<path d="M6 4h9l4 4v12H6zM14 4v5h5M9 12h7m-7 4h5"/>',
  '<path d="m12 3 8 3v6c0 4.1-4.6 7.4-8 9-3.4-1.6-8-4.9-8-9V6zM9 12l2 2 4-4"/>',
  '<rect x="2.5" y="9" width="6" height="6" rx="1.4"/><rect x="16" y="3" width="5.5" height="5.5" rx="1.4"/><rect x="16" y="15" width="5.5" height="5.5" rx="1.4"/><path d="M8.5 12h3.2c2 0 1-6.2 4.1-6.2m-4.1 6.2c2 0 1 5.8 4.1 5.8"/>',
  '<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v13c-3-1-6-1-9 1-3-2-6-2-9-1zm9 1v13m3-9 3-1"/>'
];
const mark = i => '<svg class="os-glyph" viewBox="0 0 24 24" focusable="false" aria-hidden="true">'+markPaths[i]+'</svg>';
const arrow = '<svg class="os-arrow" viewBox="0 0 20 20" focusable="false" aria-hidden="true"><path d="M3 10h14m-6-6 6 6-6 6"/></svg>';
function artwork(index,t) {
 const [head,title,left,right] = t.labels[index].map(escapeHtml);
 return `<div class="os-art" aria-hidden="true"><div class="os-traces"></div><div class="os-paper-back os-back-two"></div><div class="os-paper-back os-back-one"></div><div class="os-art-object"><div class="os-art-bar"><span class="os-art-brand">SundAI</span><span class="os-art-lights"><i></i><i></i><i></i></span></div><div class="os-art-body"><div class="os-art-meta">${mark(index)}<span>${head}</span></div><strong>${title}</strong><img src="${assets+ink[index]}" width="176" height="105" alt=""><span class="os-art-field">${left}<i></i></span><span class="os-art-field">${right}<i></i></span></div></div><span class="os-art-caption">${escapeHtml(t.art)}</span></div>`;
}
function renderCards(c, index) {
 return c.cards.map(([name,description],i)=>`<article class="os-card"><span class="os-card-icon">${mark((index+i)%4)}</span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(description)}</p></article>`).join('');
}
function renderDeliverables(lang, c, t, index) {
 if (c.offers) {
   const topics = ['decision-review','readiness-review'];
   const offers = c.offers.map(([name,price,fit,description,cta],i)=>`<article class="os-offer"><p class="os-offer-fit">${escapeHtml(fit)}</p><h3><bdi>${escapeHtml(name)}</bdi></h3><bdi class="os-price" dir="ltr">${escapeHtml(price)}</bdi><p class="os-offer-description">${escapeHtml(description)}</p><a class="os-offer-link" href="${callUrl(lang,topics[i],'service')}">${escapeHtml(cta)}${arrow}</a></article>`).join('');
   return `<section class="os-deliver" id="review-options" aria-labelledby="outcomes-title"><div class="os-wrap"><h2 id="outcomes-title">${escapeHtml(c.offersHeading)}</h2><div class="os-offers">${offers}</div></div></section>`;
 }
 const illustration = c.example ? `<aside class="os-example"><div><p class="os-example-label">${escapeHtml(c.example[0])}</p><h3>${escapeHtml(c.example[1])}</h3></div><p>${escapeHtml(c.example[2])}</p></aside>` : '';
 return `<section class="os-deliver" aria-labelledby="outcomes-title"><div class="os-wrap"><h2 id="outcomes-title">${t.out}</h2><div class="os-cards">${renderCards(c,index)}</div>${illustration}</div></section>`;
}
const shareLabel = {he:'שיתוף השירות ב־LinkedIn',en:'Share this service on LinkedIn',sv:'Dela tjänsten på LinkedIn',da:'Del ydelsen på LinkedIn'};
export function renderService(lang,slug, isPublic = false) {
 if (!Object.hasOwn(ui,lang) || !serviceSlugs.includes(slug)) throw new RangeError('Unknown service page '+lang+'/'+slug);
 const t=ui[lang], c=copy[slug][lang], index=serviceSlugs.indexOf(slug);
 const home=base(lang), url=serviceUrl(lang,slug), book=callUrl(lang,c.offers?'decision-review':slug,'service');
 const pageOptions={innerPage:true,service:slug};
 const title = escapeHtml(c.category)+' | SundAI';
 const styles = ['shell','frame','services'].map(file=>`<link rel="stylesheet" href="${assets}${file}.css">`).join('');
 const alternates = Object.keys(ui).map(l=>`<link rel="alternate" hreflang="${l}" href="https://sundaibot.com${serviceUrl(l,slug)}">`).join('');
 const action = `<a class="os-go" href="${book}">${escapeHtml(c.cta)} ${arrow}</a>`;
 const shareOrigin = isPublic ? 'https://sundaibot.com' : 'https://sundai-design-review.eririm.chatgpt.site';
 const share = (c.offers || c.example) ? `<a class="os-share" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareOrigin+url)}" target="_blank" rel="noopener noreferrer">${shareLabel[lang]}</a>` : '';
 const workflow = slug === 'private-ai-agents-rag' ? agentWorkflowLink(lang) : null;
 const workflowReference = workflow ? `<aside class="os-scope"><h3>${escapeHtml(workflow.title)}</h3><p>${escapeHtml(workflow.description)}</p><a class="os-share" href="${escapeHtml(workflow.url)}">${escapeHtml(workflow.action)}</a></aside>` : '';
 const steps = c.steps.map(([title,desc],i)=>`<li><span aria-hidden="true">0${i+1}</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(desc)}</p></div></li>`).join('');
  const guide = relatedGuide(lang, 'services/' + slug + '/');
  const guideLink = guide ? '<p><a href="' + escapeHtml(guide.url) + '">' + escapeHtml(guide.title) + '</a></p>' : '';
 const related = serviceSlugs.filter(s=>s!==slug).map(s=>`<a href="${serviceUrl(lang,s)}">${escapeHtml(copy[s][lang].category)}${arrow}</a>`).join('');
 return `<!doctype html><html lang="${lang}" dir="${lang==='he'?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>${title}</title><meta name="description" content="${escapeHtml(c.lead)}"><link rel="canonical" href="https://sundaibot.com${url}">${alternates}<link rel="alternate" hreflang="x-default" href="https://sundaibot.com${serviceUrl('en',slug)}"><link rel="icon" href="/assets/favicon.svg">${styles}<script defer src="${assets}frame.js"></script></head><body class="os-page os-theme-${index}"><a class="fr-skip" href="#main">${t.skip}</a>${renderHeader(lang,pageOptions)}<main id="main"><section class="os-hero"><div class="os-wrap os-hero-grid"><div class="os-copy"><a class="os-breadcrumb" href="${home}#organisations">${t.org}</a><p class="os-category"><i></i>${escapeHtml(c.category)}</p><h1><span>${escapeHtml(c.title[0])}</span><span>${escapeHtml(c.title[1])}</span></h1><p class="os-lead">${escapeHtml(c.lead)}</p>${action}<div class="os-note">${t.book}</div></div>${artwork(index,t)}</div></section>${renderDeliverables(lang,c,t,index)}<section class="os-process os-wrap" id="scope"><div><h2>${t.how}</h2><div class="os-scope"><h3>${t.scope}</h3><p>${escapeHtml(c.scope)}</p>${share}</div>${workflowReference}</div><ol>${steps}</ol></section><section class="os-related os-wrap"><h2>${t.more}</h2><nav aria-label="${t.more}">${related}</nav>${guideLink}</section></main>${renderFooter(lang,pageOptions)}</body></html>`;
}
