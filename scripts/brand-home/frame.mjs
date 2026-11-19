import { knowledge, articleSlugs, guideIndex } from './knowledge-data.mjs';
import { callCopy, callUrl, headerCall, topicKeys, callArrow } from './call.mjs';
const locales = {
  en: {
    schools:'Schools', org:'Business services', work:'Our work', resources:'Articles & FAQs', courses:'School programmes', teams:'Services for organisations',
    youth:'AI and online safety for teens', pupils:'Investigate a suspicious clip and build a working website.', teach:'AI for teachers', teachers:'Prepare a lesson, teach it and refine it with your colleagues.',
    gov:'AI governance & standards', governance:'Get a written recommendation on one AI decision for €490.', sec:'AI security & cloud', security:'Check access, prioritise findings and verify fixes.',
    auto:'Secure AI Automation', automation:'Measure staff time and AI cost per enquiry.', rag:'Private AI assistants', knowledge:'Get an answer with the source and access controls.',
    guides:'Free guides', guidesSub:'Practical resources you can use before a project.', trust:'Evidence & trust', trustSub:'Inspect the work, the platform choices and the methods.',
    about:'About SundAI', aboutSub:'Meet the people behind the training and project work.', menu:'Menu', language:'Language', pilot:'School pilot', talk:'Talk to us', nav:'Main navigation',
    studentEg:'The student project', studentLine:'Which offer really costs less?', studentLink:'See the school programmes', orgEg:'From our work', orgLine:'From the kitchen to the workflow.', orgLink:'Explore our work',
    footerH:'What would you like to try?',footerP:'Start with one class or bring one real workflow. We’ll help you pick a useful first step.',
    schoolLong:'A pilot for my school',orgLong:'A call about my organisation',pilotSub:'90 minutes with one group.',callSub:'A free 20-minute fit call.', privacy:'Privacy',terms:'Terms',a11y:'Accessibility',toTop:'Back to top',four:'Four programmes', legalName:'Operated by RIIMON HOLDINGS LTD', begin:'Skip to navigation destination'
  },
  he: {
    schools:'לבתי ספר',org:'שירותים לעסקים',work:'העבודות שלנו',resources:'מאמרים ושאלות',courses:'תוכניות לבתי ספר',teams:'שירותים לארגונים',
    youth:'AI ובטיחות ברשת לנוער',pupils:'בודקים סרטון חשוד ובונים אתר שאפשר להשתמש בו.',teach:'AI לצוותי הוראה',teachers:'מכינים שיעור, מלמדים ומשפרים אותו יחד עם עמיתים.',
    gov:'ממשל AI ותקינה',governance:'מקבלים המלצה כתובה על החלטה אחת ב־490 אירו.',sec:'אבטחת AI וענן',security:'בודקים הרשאות, מתעדפים ממצאים ומאמתים תיקונים.',
    auto:'אוטומציה מאובטחת עם AI',automation:'מודדים זמן עבודה ועלות AI לכל פנייה.',rag:'עוזרי AI פרטיים',knowledge:'מקבלים תשובה עם מקור לפי הרשאות המשתמש.',
    guides:'מדריכים ללא תשלום',guidesSub:'חומרי עבודה שאפשר להיעזר בהם כבר לפני תחילת הפרויקט.',trust:'ניסיון ושיטות עבודה',trustSub:'הכירו את הפרויקטים, הכלים ושיטות הבדיקה שלנו.',
    about:'אודות SundAI',aboutSub:'הכירו את מי שמוביל את ההדרכות והפרויקטים.',menu:'תפריט',language:'שפה',pilot:'פיילוט לבית ספר',talk:'שיחת היכרות',nav:'ניווט ראשי',
    studentEg:'פרויקט התלמידים',studentLine:'איזו הצעה באמת זולה יותר?',studentLink:'למסלולי בתי הספר',orgEg:'מהעבודה שלנו',orgLine:'מהמטבח לתהליך עבודה אוטומטי.',orgLink:'לפרויקט לדוגמה',
    footerH:'מה תרצו לנסות?',footerP:'אפשר להתחיל מכיתה אחת או להביא תהליך עבודה מהארגון. יחד נבחר צעד ראשון ששווה לבדוק.',
    schoolLong:'פיילוט לבית הספר שלנו',orgLong:'שיחת היכרות לארגון שלנו',pilotSub:'90 דקות עם קבוצה אחת.',callSub:'20 דקות, ללא תשלום.',privacy:'פרטיות',terms:'תנאי שימוש',a11y:'נגישות',toTop:'חזרה לראש העמוד',four:'ארבע תוכניות',legalName:'מופעל על ידי RIIMON HOLDINGS LTD',begin:'דלגו ליעד בתפריט'
  },
  sv: {
    schools:'För skolor',org:'Företagstjänster',work:'Våra uppdrag',resources:'Artiklar och frågor',courses:'Skolprogram',teams:'Tjänster för organisationer',
    youth:'AI och nätsäkerhet för unga',pupils:'Granska ett misstänkt klipp och bygg en fungerande webbplats.',teach:'AI för lärare',teachers:'Planera, genomför och förbättra en lektion tillsammans.',
    gov:'AI-styrning och standarder',governance:'Få en skriftlig rekommendation om ett AI-beslut för 490 euro.',sec:'AI- och molnsäkerhet',security:'Granska behörigheter, prioritera brister och följ upp åtgärder.',
    auto:'Säker AI-automatisering',automation:'Mät arbetstid och AI-kostnad per ärende.',rag:'Privata AI-assistenter',knowledge:'Få svar med källhänvisningar och rätt behörigheter.',
    guides:'Kostnadsfria guider',guidesSub:'Praktiska underlag som ni kan använda redan före projektstart.',trust:'Erfarenhet och arbetssätt',trustSub:'Ta del av våra exempel, verktygsval och metoder.',
    about:'Om SundAI',aboutSub:'Möt personerna bakom utbildningarna och projekten.',menu:'Meny',language:'Språk',pilot:'Skolpilot',talk:'Kontakta oss',nav:'Huvudmeny',
    studentEg:'Elevprojektet',studentLine:'Vilket erbjudande är egentligen billigast?',studentLink:'Utforska skolprogrammen',orgEg:'Från våra uppdrag',orgLine:'Från köket till arbetsflödet.',orgLink:'Utforska våra uppdrag',
    footerH:'Vad vill ni prova?',footerP:'Börja med en klass eller ta med ett konkret arbetsflöde. Tillsammans väljer vi ett första steg.',
    schoolLong:'En pilot för min skola',orgLong:'Ett samtal för min organisation',pilotSub:'90 minuter med en grupp.',callSub:'Ett kostnadsfritt samtal på 20 minuter.',privacy:'Integritet',terms:'Villkor',a11y:'Tillgänglighet',toTop:'Till sidans början',four:'Fyra program',legalName:'Drivs av RIIMON HOLDINGS LTD',begin:'Hoppa till menyval'
  },
  da: {
    schools:'For skoler',org:'Erhverv',work:'Vores projekter',resources:'Artikler og spørgsmål',courses:'Skoleforløb',teams:'Ydelser til organisationer',
    youth:'AI og sikkerhed på nettet for unge',pupils:'Undersøg et mistænkeligt klip, og byg en fungerende hjemmeside.',teach:'AI for lærere',teachers:'Forbered, gennemfør og forbedr en lektion sammen.',
    gov:'AI-governance og standarder',governance:'Få en skriftlig anbefaling om én AI-beslutning for 490 euro.',sec:'AI- og cloudsikkerhed',security:'Gennemgå adgange, prioritér fund, og kontrollér rettelser.',
    auto:'Sikker AI-automatisering',automation:'Mål arbejdstid og AI-omkostninger pr. sag.',rag:'Private AI-assistenter',knowledge:'Få svar med kilder og adgangskontrol.',
    guides:'Gratis vejledninger',guidesSub:'Praktisk materiale, I kan bruge allerede før et projekt.',trust:'Erfaring og metoder',trustSub:'Læs om vores projekter, værktøjer og arbejdsmetoder.',
    about:'Om SundAI',aboutSub:'Mød folkene bag undervisningen og projekterne.',menu:'Menu',language:'Sprog',pilot:'Skolepilot',talk:'Kontakt os',nav:'Hovedmenu',
    studentEg:'Elevprojektet',studentLine:'Hvilket tilbud er faktisk billigst?',studentLink:'Se skoleforløbene',orgEg:'Fra vores projekter',orgLine:'Fra køkkenet til arbejdsgangen.',orgLink:'Se vores projekter',
    footerH:'Hvad vil I afprøve?',footerP:'Start med én klasse, eller tag en konkret arbejdsgang med. Vi hjælper jer med at vælge første skridt.',
    schoolLong:'Et pilotforløb til min skole',orgLong:'En samtale for min organisation',pilotSub:'90 minutter med én gruppe.',callSub:'En gratis samtale på 20 minutter.',privacy:'Privatliv',terms:'Vilkår',a11y:'Tilgængelighed',toTop:'Til toppen',four:'Fire forløb',legalName:'Drives af RIIMON HOLDINGS LTD',begin:'Gå til menupunkt'
  }
};
const nativeNames={en:'English',he:'עברית',sv:'Svenska',da:'Dansk'};
const courseSlugs=['youth','teachers','hospital','public'];
const serviceSlugs=['compliance-ai-governance','cloud-security','secure-ai-automation','private-ai-agents-rag'];
const portal={
  en:{base:'/',training:'training/',services:'services/',guides:'free-guides/',trust:'trust/',about:'about/',book:'book/',terms:'terms/'},
  sv:{base:'/sv/',training:'utbildning-forelasningar/',services:'tjanster/',guides:'free-guides/',trust:'tillit/',about:'om/',book:'book/',terms:'terms/'},
  da:{base:'/da/',training:'kurser-foredrag/',services:'ydelser/',guides:'free-guides/',trust:'tillid/',about:'om/',book:'book/',terms:'terms/'}
};
function menuData(locale,{innerPage=false,course='',service='',booking=false,article='',hub=false}={}){
  const lang=locales[locale]?locale:'en', w=locales[lang],base=lang==='en'?'/':'/'+lang+'/';
  const local = id=>(innerPage?base:'')+'#'+id;
  const publicPaths=portal[lang]||portal.en;
  const live=key=>'https://sundaibot.com'+publicPaths.base+publicPaths[key];
  const serviceUrl=slug=>base+'services/'+slug+'/';
  const schoolRows=[[w.youth,w.pupils,base+'courses/youth/'],[w.teach,w.teachers,base+'courses/teachers/']];
  const orgRows=[[w.auto,w.automation,serviceUrl('secure-ai-automation')],[w.gov,w.governance,serviceUrl('compliance-ai-governance')],[w.rag,w.knowledge,serviceUrl('private-ai-agents-rag')],[w.sec,w.security,serviceUrl('cloud-security')]];
  const articles=knowledge[lang];
  const resourceRows=[[articles.articles,guideIndex[lang].navSummary,base+'read/'],[articles.faq,articles.faqIntro,local('faq')],[w.guides,w.guidesSub,live('guides')],[w.trust,w.trustSub,live('trust')],[w.about,w.aboutSub,live('about')]];
  let suffix=hub?'read/':booking?'intro-call/':'';
  if(innerPage && articleSlugs.includes(article))suffix='read/'+article+'/';
  if(innerPage && courseSlugs.includes(course))suffix='courses/'+course+'/';
  if(innerPage && serviceSlugs.includes(service))suffix='services/'+service+'/';
  const languageLinks=Object.entries(nativeNames).map(([key,name])=>{
    const stem=key==='en'?'/':'/'+key+'/';
    return '<a href="'+stem+suffix+'" lang="'+key+'" hreflang="'+key+'" '+(key===lang?'aria-current="true"':'')+'>'+name+'<span>'+key.toUpperCase()+'</span></a>';
  }).join('');
  return {w,base,local,live,schoolRows,orgRows,resourceRows,languageLinks,lang,topic:course||service||'general',booking};
}
const chevron='<i class="fr-caret" aria-hidden="true"></i>';
function point(index){return '<i class="fr-point fr-pt-'+index+'" aria-hidden="true"><i></i></i>';}
function rows(items){return items.map(([name,desc,url],i)=>'<a class="fr-entry" href="'+url+'">'+point(i)+'<span><strong>'+name+'</strong><small>'+desc+'</small></span></a>').join('');}
function displayDemo(kind){
  if(kind==='school')return '<div class="fr-picture fr-pic-receipt" aria-hidden="true"><div class="fr-paper"><b>Teen Tech AI</b><i></i><i></i><div><s>€26.00</s><strong>€24.00</strong></div></div></div>';
  return '<div class="fr-picture fr-pic-chip" aria-hidden="true"><b>SundAI</b></div>';
}
function desktopMega(label,panel,kind,w,local){
  const school=kind==='school', org=kind==='org';
  const mainLink=local(school?'schools':org?'organisations':'evidence');
  return '<details class="fr-mega fr-group" data-fr-mega><summary>'+label+chevron+'</summary><div class="fr-drop"><div class="fr-drop-list">'+rows(panel)+'</div>'+displayDemo(school?'school':'org')+'<a class="fr-proof" href="'+mainLink+'"><small>'+(school?w.studentEg:w.orgEg)+'</small><strong>'+(school?w.studentLine:w.orgLine)+'</strong><span>'+(school?w.studentLink:w.orgLink)+' ↗</span></a></div></details>';
}
function mobileGroup(label,items,more){return '<details class="fr-group" data-fr-accordion><summary>'+label+chevron+'</summary><div class="fr-mobile-links">'+rows(items)+more+'</div></details>';}
export function renderHeader(locale='en', options={}){
  const d=menuData(locale,options), {w,local}=d;
  const langs='<details class="fr-lang fr-group"><summary aria-label="'+w.language+'">'+d.lang.toUpperCase()+chevron+'</summary><div class="fr-langs">'+d.languageLinks+'</div></details>';
  const mobileLanguage='<details class="fr-group" data-fr-accordion><summary>'+w.language+chevron+'</summary><div class="fr-langs">'+d.languageLinks+'</div></details>';
  return '<header class="fr-header" id="fr-top"><div class="fr-bar"><a class="fr-brand" href="'+d.base+'" aria-label="SundAI"><img src="/assets/sundai-wordmark-dark.svg" width="500" height="117" alt="SundAI"></a><nav class="fr-desk-nav" aria-label="'+w.nav+'">'+desktopMega(w.schools,d.schoolRows,'school',w,local)+desktopMega(w.org,d.orgRows,'org',w,local)+'<a href="'+local('evidence')+'">'+w.work+'</a>'+desktopMega(w.resources,d.resourceRows,'resources',w,local)+'</nav><div class="fr-utilities">'+langs+headerCall(d.lang,d.topic,false,d.booking)+'</div>'+headerCall(d.lang,d.topic,true,d.booking)+'<details class="fr-mobile" data-fr-mobile><summary>'+w.menu+'<i class="fr-dots-trigger" aria-hidden="true"></i></summary><div class="fr-drawer"><nav aria-label="'+w.nav+'">'+mobileGroup(w.schools,d.schoolRows,'<a href="'+local('schools')+'">'+w.courses+' ↗</a>')+mobileGroup(w.org,d.orgRows,'<a href="'+local('organisations')+'">'+w.teams+' ↗</a>')+'<a class="fr-mobile-simple" href="'+local('evidence')+'">'+w.work+'</a>'+mobileGroup(w.resources,d.resourceRows,'')+mobileLanguage+'</nav><div class="fr-drawer-end">'+headerCall(d.lang,d.topic,false,d.booking)+'</div></div></details></div></header>';
}
export function renderFooter(locale='en',options={}){
  const d=menuData(locale,options),w=d.w;
  const c=callCopy[locale];
  const choice=(topic,title,sub)=>'<a class="fr-contact-choice" href="'+callUrl(locale,topic,'footer')+'"><span><strong>'+title+'</strong><small>'+sub+'</small></span>'+callArrow+'</a>';
  const choices=d.topic==='general'
    ? choice('schools',c.school,c.schoolLine)+choice('organisations',c.org,c.orgLine)
    : choice(d.topic,c.cta,c.footnote);
  const description=d.topic==='general'?c.footer:c.outcomes[topicKeys.indexOf(d.topic)];
  const section=d.booking?'':'<section class="fr-close" id="intro-conversation"><div class="fr-close-inner"><div><h2>'+c.title+'</h2><p>'+description+'</p></div><div class="fr-choices">'+choices+'</div></div></section>';
  return '<footer class="fr-footer">'+section+'<div class="fr-base"><div class="fr-base-row"><a class="fr-brand" href="'+d.base+'" aria-label="SundAI"><img src="/assets/sundai-wordmark-dark.svg" alt="SundAI" width="500" height="117"></a><div class="fr-footer-nav"><a href="'+d.local('schools')+'">'+w.schools+'</a><a href="'+d.local('organisations')+'">'+w.org+'</a><a href="'+d.local('courses')+'">'+w.four+'</a><a href="'+d.local('evidence')+'">'+w.work+'</a><a href="'+d.live('about')+'">'+w.about+'</a></div><a class="fr-back" href="#fr-top">'+w.toTop+' ↑</a></div><div class="fr-legal"><span>© 2026 SundAI · '+w.legalName+'</span><div><a href="https://sundaibot.com/privacy.html">'+w.privacy+'</a><a href="'+d.live('terms')+'">'+w.terms+'</a><a href="https://sundaibot.com/accessibility.html">'+w.a11y+'</a></div></div></div></footer>';
}
