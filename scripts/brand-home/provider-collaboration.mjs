import { callUrl } from './call.mjs';

const providers = [
  { name: 'Advania', logo: 'advania-provider.png', width: 360, height: 174, url: 'https://www.advania.com/what-we-offer/' },
  { name: 'Eficode', logo: 'eficode-provider.png', width: 174, height: 174, url: 'https://www.eficode.com/gitlab/managed-services' }
];

const copy = {
  en: {
    title: 'Already have an IT provider?',
    model: 'Bring them into the pilot. Your provider manages access, SundAI builds the workflow, and your team decides when it goes live. IT providers, MSPs, consultancies and business-network hosts can bring us a client project or plan a joint working session.',
    examples: 'Examples of Nordic IT providers',
    services: ['Cloud services and IT operations', 'Managed GitLab environments'],
    call: 'Discuss working together · 20 minutes, free'
  },
  he: {
    title: 'כבר יש לכם ספק IT?',
    model: 'אפשר לצרף אותו לפיילוט. הספק שלכם מנהל את ההרשאות, SundAI בונה את תהליך העבודה, והצוות שלכם מחליט מתי מתחילים להשתמש בו. גם ספקי IT ושירות מנוהל (MSP), משרדי ייעוץ ומארגני מפגשים עסקיים מוזמנים להציע פרויקט ללקוח או מפגש עבודה משותף.',
    examples: 'דוגמאות לספקי IT במדינות הנורדיות',
    services: ['שירותי ענן ותפעול מערכות IT', 'ניהול סביבות פיתוח ב־GitLab'],
    call: 'נדבר על שיתוף פעולה · 20 דקות ללא עלות'
  },
  sv: {
    title: 'Har ni redan en IT-leverantör?',
    model: 'Bjud in dem till piloten. Er leverantör hanterar behörigheterna, SundAI bygger arbetsflödet och ert team avgör när det ska tas i drift. It-leverantörer, driftpartner (MSP), konsultbolag och företagsnätverk är välkomna att diskutera ett kunduppdrag eller planera ett gemensamt arbetsmöte.',
    examples: 'Exempel på nordiska IT-leverantörer',
    services: ['Molntjänster och IT-drift', 'Drift av GitLab-miljöer'],
    call: 'Prata om ett samarbete · 20 minuter utan kostnad'
  },
  da: {
    title: 'Har I allerede en it-leverandør?',
    model: 'Tag leverandøren med i pilotprojektet. Jeres leverandør styrer adgangsrettighederne, SundAI bygger arbejdsgangen, og jeres team beslutter, hvornår den tages i brug. It-leverandører, driftsleverandører (MSP), konsulenthuse og arrangører af erhvervsnetværk er velkomne til at drøfte en kundeopgave eller planlægge et fælles arbejdsmøde.',
    examples: 'Eksempler på nordiske it-leverandører',
    services: ['Cloudtjenester og it-drift', 'Drift af GitLab-miljøer'],
    call: 'Tal om et samarbejde · 20 minutter gratis'
  }
};

export function providerCollaboration(locale) {
  const t = copy[locale];
  const cards = providers.map(({ name, logo, width, height, url }, index) =>
    `<a class="msp-provider" href="${url}">
      <span class="msp-logo"><img src="/assets/brands/${logo}" width="${width}" height="${height}" loading="lazy" alt="${name}"></span>
      <span class="msp-service">${t.services[index]} <span aria-hidden="true" dir="ltr">↗</span></span>
    </a>`
  ).join('');
  return `<section id="it-providers" class="msp-section" aria-labelledby="msp-title">
    <div class="pc-wrap msp-inner"><div class="msp-copy">
      <h2 id="msp-title">${t.title}</h2><p>${t.model}</p>
      <a class="msp-call" href="${callUrl(locale, 'it-provider', 'partner')}">${t.call}</a>
    </div><div class="msp-examples"><h3>${t.examples}</h3><div class="msp-links">${cards}</div></div></div>
  </section>`;
}
