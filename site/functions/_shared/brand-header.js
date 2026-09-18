export const brandRoutes = {
  en: { home:'/', services:'/services/', training:'/training/', insights:'/insights/', resources:'/resources/', about:'/about/', industries:'/industries/', usecases:'/use-cases/', start:'/start/' },
  da: { home:'/da/', services:'/da/ydelser/', training:'/da/kurser-foredrag/', insights:'/da/insights/', resources:'/da/ressourcer/', about:'/da/om/', industries:'/da/brancher/', usecases:'/da/anvendelser/', start:'/da/start/' },
  sv: { home:'/sv/', services:'/sv/tjanster/', training:'/sv/utbildning-forelasningar/', insights:'/sv/insights/', resources:'/sv/resurser/', about:'/sv/om/', industries:'/sv/branscher/', usecases:'/sv/anvandningsfall/', start:'/sv/start/' }
};
const words = {
  en:{services:'Services & pricing',training:'Training',insights:'Insights',resources:'Resources',about:'About',industries:'Industries',usecases:'Use cases',cta:'Request a proposal',menu:'Menu',nav:'Main navigation',mobile:'Mobile navigation',language:'Language'},
  da:{services:'Ydelser & priser',training:'Kurser',insights:'Indsigt',resources:'Ressourcer',about:'Om SundAI',industries:'Brancher',usecases:'Anvendelser',cta:'Bed om et forslag',menu:'Menu',nav:'Hovednavigation',mobile:'Mobilnavigation',language:'Sprog'},
  sv:{services:'Tjänster & priser',training:'Utbildning',insights:'Insikter',resources:'Resurser',about:'Om SundAI',industries:'Branscher',usecases:'Användningsfall',cta:'Be om ett förslag',menu:'Meny',nav:'Huvudnavigation',mobile:'Mobilnavigation',language:'Språk'}
};
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function renderBrandHeader(language='en', alternates={}, activePath='') {
  const lang = words[language] ? language : 'en', w=words[lang], r=brandRoutes[lang];
  const links = keys => keys.map(key=>`<a href="${r[key]}"${activePath===r[key]?' aria-current="page"':''}>${w[key]}</a>`).join('');
  const cta = `<a class="sundai-enquire" href="${r.start}#enquiry">${w.cta}</a>`;
  return `<header class="sundai-header"><div class="sundai-header-inner"><a class="sundai-brand" href="${r.home}" aria-label="SundAI"><img src="/assets/sundai-wordmark-light.svg" alt="SundAI" width="500" height="117"></a><nav class="sundai-nav" aria-label="${w.nav}">${links(['services','training','insights','resources','about'])}</nav>${cta}<nav class="sundai-languages" aria-label="${w.language}">${['en','da','sv'].map(l=>`<a href="${escape(alternates[l]||brandRoutes[l].home)}" hreflang="${l}" lang="${l}"${l===lang?' aria-current="page"':''}>${l.toUpperCase()}</a>`).join('')}</nav><details class="sundai-mobile-menu"><summary>${w.menu}</summary><nav class="sundai-mobile-links" aria-label="${w.mobile}">${links(['services','training','insights','resources','industries','usecases','about'])}${cta}</nav></details></div></header>`;
}
