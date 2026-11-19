const frameworks = [
  ['soc2', 'SOC 2 Type II'],
  ['iso27001', 'ISO/IEC 27001'],
  ['iso42001', 'ISO/IEC 42001'],
  ['gdpr', 'GDPR'],
  ['eu-ai-act', 'EU AI Act']
];

const copy = {
  en: {
    heading: 'Standards and regulations we help you apply',
    descriptions: ['Preparing audit evidence', 'Information security management', 'AI management systems', 'Personal data protection', 'AI roles and obligations'],
    trust: '/trust/', trustLang: 'en', euLang: 'en'
  },
  he: {
    heading: 'תקנים ורגולציה שאנחנו מסייעים ליישם',
    descriptions: ['הכנת תיעוד לביקורת', 'ניהול אבטחת מידע', 'מערכות לניהול בינה מלאכותית', 'הגנה על מידע אישי', 'מיפוי תפקידים וחובות'],
    trust: '/trust/', trustLang: 'en', euLang: 'en'
  },
  sv: {
    heading: 'Standarder och regelverk vi hjälper er att tillämpa',
    descriptions: ['Underlag inför granskning', 'Ledning av informationssäkerhet', 'Ledningssystem för AI', 'Skydd av personuppgifter', 'Roller och skyldigheter'],
    trust: '/sv/tillit/', trustLang: 'sv', euLang: 'sv'
  },
  da: {
    heading: 'Standarder og regler, vi hjælper jer med at anvende',
    descriptions: ['Dokumentation til revision', 'Styring af informationssikkerhed', 'Ledelsessystemer for AI', 'Beskyttelse af personoplysninger', 'Roller og forpligtelser'],
    trust: '/da/tillid/', trustLang: 'da', euLang: 'da'
  }
};

export function renderFrameworkStrip(lang = 'en') {
  const t = copy[lang] || copy.en;
  const items = frameworks.map(([id, name], index) => {
    const isAct = id === 'eu-ai-act';
    const url = isAct
      ? 'https://eur-lex.europa.eu/eli/reg/2024/1689/' + ({en:'eng', sv:'swe', da:'dan'}[t.euLang])
      : 'https://sundaibot.com' + t.trust + '#framework-' + id;
    const targetLanguage = isAct ? t.euLang : t.trustLang;

    return `<li><a href="${url}" hreflang="${targetLanguage}"><img src="/assets/framework-${id}.svg" width="160" height="160" alt="" decoding="async" loading="lazy"><span><bdi dir="ltr">${name}</bdi><small>${t.descriptions[index]}</small></span></a></li>`;
  });

  return `<section class="fr-frameworks" aria-labelledby="fr-frameworks-title"><h2 id="fr-frameworks-title">${t.heading}</h2><ul>${items.join('')}</ul></section>`;
}
