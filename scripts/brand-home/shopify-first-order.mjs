import { renderHeader, renderFooter } from './frame.mjs';
import { renderShopifyMain } from './shopify-content.mjs';

export const shopifyPilotSlug = 'shopify-first-order';

const pageCopy = {
  en: {
    title: 'First order check for Shopify',
    description: 'Work directly with Ariel Rimón to compare fulfilment options, check margin and cash requirements, and rehearse one Shopify order with your team.',
    skip: 'Skip to content'
  },
  he: {
    title: 'מבחן ההזמנה הראשונה לחנויות Shopify',
    description: 'ליווי אישי של אריאל רימון לבעלי חנויות. נשווה דרכים לטיפול בהזמנות, נחשב כמה נשאר מכל מכירה וכמה כסף צריך מראש, ונתרגל הזמנה אחת עם הצוות שלכם.',
    skip: 'דילוג לתוכן'
  },
  sv: {
    title: 'Testa den första ordern i Shopify',
    description: 'Jämför olika sätt att hantera beställningar tillsammans med Ariel Rimón. Räkna på marginal och kapitalbehov och öva på en Shopify-order med ditt team.',
    skip: 'Till innehållet'
  },
  da: {
    title: 'Test den første ordre i Shopify',
    description: 'Sammenlign måder at håndtere ordrer på med Ariel Rimón. Beregn, hvad der er tilbage pr. salg, og hvor meget kapital du skal bruge. Afprøv en ordre med dit team.',
    skip: 'Gå til indhold'
  }
};

const paths = Object.fromEntries(Object.keys(pageCopy).map(lang => [
  lang, (lang === 'en' ? '/' : '/' + lang + '/') + 'services/' + shopifyPilotSlug + '/'
]));

export function shopifyPilotLink(lang) {
  const {title, description} = pageCopy[lang];
  return {title, description, url:paths[lang]};
}

export function renderShopifyPilot(lang) {
  const copy = pageCopy[lang];
  const frame = {innerPage:true, service:shopifyPilotSlug, languagePaths:paths};
  const styles = ['shell','frame','shopify-first-order'].map(name =>
    '<link rel="stylesheet" href="/assets/brand-home/' + name + '.css">'
  ).join('');
  return `<!doctype html>
<html lang="${lang}" dir="${lang === 'he' ? 'rtl' : 'ltr'}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0a0b0d"><title>${copy.title} | SundAI</title>
<meta name="description" content="${copy.description}"><link rel="icon" href="/assets/favicon.svg">
${styles}<script defer src="/assets/brand-home/frame.js"></script><script defer src="/assets/brand-home/shopify-first-order.js"></script></head>
<body><a class="fr-skip" href="#main-content">${copy.skip}</a>${renderHeader(lang,frame)}
${renderShopifyMain(lang)}
${renderFooter(lang,{...frame,showClose:false})}</body></html>`;
}
