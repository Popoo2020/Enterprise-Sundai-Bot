import { providerCollaboration } from './provider-collaboration.mjs';
import { agentWorkflowLink } from './agent-workflows.mjs';
import { callUrl } from './call.mjs';
import { projectPaths } from '../home-story.mjs';

const serviceSlugs = ['secure-ai-automation','compliance-ai-governance','private-ai-agents-rag','cloud-security'];
const copy = {
  he: {
    title:"איזו עבודה ידנית כדאי לחסוך לצוות?", lead:"מתחילים ממשימה שחוזרת בעסק, כמו מענה לפניית לקוח. לפני הפיתוח מסכמים מה נבנה, מה התקציב ואיך נמדוד הצלחה. בניסוי הראשון בודקים כמה זמן וכסף עולה לטפל בפנייה אחת, כולל הזמן שהצוות משקיע בבדיקה.",
    services:[
      ["אוטומציה מאובטחת עם AI", "פניות מהמייל נרשמות אוטומטית במערכת ניהול הלקוחות. הצוות מאשר את התשובה לפני השליחה ורואה כמה זמן וכסף עולה כל פנייה.", "במסעדת <bdi>Ariel’s Pizza</bdi> חיבר המייסד שלנו את <bdi>Trello</bdi> וגיליונות העבודה ל־<bdi>WhatsApp</bdi> כדי לתאם משמרות ומשימות."],
      ["ממשל AI ובדיקת ספקים", "לפני שרוכשים כלי AI או נותנים לו גישה לנתונים, בודקים מה הוא צריך לקרוא, מי אחראי לשימוש בו ומה עוד צריך לברר. מקבלים המלצה מנומקת בכתב.", "לקבלת הצעת מחיר מותאמת לחברה שלכם"],
      ['עוזרי AI למסמכים של החברה','העובדים שואלים שאלה ומקבלים תשובה עם קישור למקום שבו היא מופיעה במסמכי החברה. כל עובד רואה רק מקורות שיש לו הרשאה לקרוא.','פיתוח סוכני AI בשילוב מודלים'],
      ['סייבר ואבטחת ענן','לפני ההשקה בודקים למי יש גישה למערכת ואיך שינויים בקוד מגיעים אליה. תקבלו רשימה מסודרת של מה שדורש תיקון, לפי סדר הדחיפות.','אחרי התיקון בודקים שהבעיה נפתרה.']
    ], call:"לשיחת היכרות ללא עלות · 20 דקות", proof:'לסיפור המקרה (באנגלית)'
  },
  en: {
    title:"Too much admin? An AI purchase to approve?", lead:"Before we build, we agree with you on the scope, budget and what success looks like. For an automation pilot, we choose one task, set usage and spending limits and measure the cost to complete it, including your team’s time.",
    services:[
      ["Secure AI Automation", "Move enquiries from email to your CRM. Your team approves replies and tracks time and cost per enquiry.", "At his restaurant, Ariel’s Pizza, our founder connected Trello, Google Sheets and WhatsApp to coordinate shifts and daily tasks."],
      ["AI governance and vendor reviews", "IT leads, CTOs and compliance managers get a written recommendation before buying an AI tool, connecting systems or granting data access.", "Get a quote tailored to your company"],
      ['AI assistants for company knowledge','We connect an assistant to your documents using RAG. Staff get answers with links to passages they have permission to read.','Build agents with multiple AI models'],
      ['Cybersecurity and cloud','Before a release, we review identities, permissions and the delivery process, then prioritise findings by risk.','Findings, a remediation plan and retesting.']
    ], call:"Book a free 20-minute call", proof:'Read the case study'
  },
  sv: {
    title:"För mycket administration? Dags att köpa in AI?", lead:"Före utvecklingen enas vi om uppdraget, budgeten och hur ni avgör om lösningen fungerar. För en automationspilot väljer vi en uppgift, sätter gränser för användning och kostnad och mäter vad en slutförd uppgift kostar, inklusive er arbetstid.",
    services:[
      ["Säker AI-automatisering", "Låt kundärenden gå direkt från mejlen till ert CRM. Ni godkänner svaren och följer upp tid och kostnad per ärende.", "På sin restaurang Ariel’s Pizza kopplade vår grundare ihop Trello, Google Sheets och WhatsApp för att planera arbetspass och dagliga uppgifter."],
      ["AI-styrning och leverantörsgranskning", "IT-chefer, teknikchefer och ansvariga för regelefterlevnad får en skriftlig rekommendation inför inköp, integration eller åtkomst till data.", "Be om en offert för ert företag"],
      ['AI-assistenter för intern kunskap','Vi kopplar en assistent till era dokument med RAG. Medarbetaren får svar med en länk till det avsnitt som behörigheten ger tillgång till.','AI-agenter med flera språkmodeller'],
      ['Cybersäkerhet och moln','Inför en lansering granskar vi identiteter, behörigheter och utvecklingsflödet. Fynden prioriteras efter risk.','Fynd, åtgärdsplan och kontroll av genomförda åtgärder.']
    ], call:"Boka ett kostnadsfritt samtal på 20 minuter", proof:'Läs om projektet'
  },
  da: {
    title:"For meget administration? Skal I købe et AI-værktøj?", lead:"Før vi bygger, aftaler vi opgaven, budgettet og hvordan I vil vurdere resultatet. I en pilot vælger vi én arbejdsgang, sætter grænser for brug og udgifter og måler prisen pr. afsluttet opgave, inklusive jeres arbejdstid.",
    services:[
      ["Sikker AI-automatisering", "Lad kundehenvendelser gå direkte fra mail til jeres CRM. I godkender svarene og følger tidsforbrug og omkostninger pr. henvendelse.", "På sin restaurant Ariel’s Pizza forbandt vores stifter Trello, Google Sheets og WhatsApp for at planlægge vagter og daglige opgaver."],
      ["AI-styring og leverandørvurdering", "IT-chefer, teknologichefer og complianceansvarlige får en skriftlig anbefaling før et indkøb, en integration eller en godkendelse af dataadgang.", "Få et tilbud tilpasset jeres virksomhed"],
      ['AI-assistenter til intern viden','Vi forbinder en assistent med jeres dokumenter ved hjælp af RAG. Medarbejderen får svar med et link til det afsnit, som vedkommende har adgang til.','AI-agenter med flere sprogmodeller'],
      ['Cybersikkerhed og cloud','Før lancering gennemgår vi identiteter, rettigheder og udviklingsforløb. Fund prioriteres efter risiko.','Fund, en plan for udbedring og kontrol af rettelser.']
    ], call:"Book en gratis samtale på 20 minutter", proof:'Læs om projektet'
  }
};

const icons = {
  'compliance-ai-governance': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 3.5 5.8v6.1c0 5.2 3.6 8.4 8.5 10.1 4.9-1.7 8.5-4.9 8.5-10.1V5.8L12 2Zm-4 10 2.7 2.7 5.7-6"/></svg>',
  'cloud-security': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h18v13H3zM8 21h8M10 18v3m4-3v3M6 8h2m2 0h2M7 14l3-3 3 2 3-3 2 2"/></svg>',
  'secure-ai-automation': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3h6v6H3zM15 15h6v6h-6zM10 6h5a3 3 0 0 1 3 3v4m-3-3 3 3 3-3M14 18H9a3 3 0 0 1-3-3v-4"/></svg>',
  'private-ai-agents-rag': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h14a2 2 0 0 1 2 2v8H9l-6 4V4Zm5 4h6m-6 3h4m1 7h4l4 3V9"/></svg>'
};

export function businessSection(locale, base) {
  const c = copy[locale];
  const cards = c.services.map(([name, example, result], i) => {
    const slug = serviceSlugs[i];
    const url = `${base}services/${slug}/`;
    const icon = `<span class="pc-service-icon" aria-hidden="true">${icons[slug]}</span>`;
    if (slug === 'secure-ai-automation') {
      const caseLocale = locale === 'he' ? 'en' : locale;
      return `<article class="pc-service biz-agent-card">${icon}<h3><a class="biz-agent-primary" href="${url}">${name}</a></h3><p>${example}</p><div class="biz-result biz-proof">${result} <a class="biz-agent-detail" hreflang="${caseLocale}" href="${projectPaths[caseLocale]}">${c.proof}</a></div></article>`;
    }
    const detailUrl = slug === 'private-ai-agents-rag' ? agentWorkflowLink(locale).url
      : slug === 'compliance-ai-governance' ? `${base}governance-quote/#request` : null;
    if (detailUrl) {
      return `<article class="pc-service biz-agent-card">${icon}<h3><a class="biz-agent-primary" href="${url}">${name}</a></h3><p>${example}</p><a class="biz-result biz-agent-detail" href="${detailUrl}">${result}</a></article>`;
    }
    return `<a class="pc-service" href="${url}">${icon}<h3>${name}</h3><p>${example}</p><strong class="biz-result">${result}</strong></a>`;
  });
  return `<div class="pc-sections pc-business"><section class="pc-catalogue" id="organisations" aria-labelledby="biz-title"><div class="pc-wrap"><header class="biz-heading"><h2 id="biz-title">${c.title}</h2><p>${c.lead}</p></header><div class="biz-grid">${cards.join('')}</div><div class="biz-actions"><a class="fr-action" href="${callUrl(locale,'organisations','service')}">${c.call}</a></div></div></section>${providerCollaboration(locale)}</div>`;
}
