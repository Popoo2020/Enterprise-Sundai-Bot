import {htmlEscape as esc} from './seo-render.mjs';

// Supplied by the site owner for publication on 15 October 2026.
// Preserve the original English; no invented scores, portraits or outcomes.
export const testimonials = [
  {
    id: 'nordic-cyber',
    quote: "We brought SundAIbot in to evaluate our internal AI assistants before a full company rollout. They didn't just perform a high-level compliance check; they went over all the software in our different development labs and verified our system's capabilities with a series of highly difficult stress tests. Having a true professional who fully masters the complex material and leaves no stone unturned gave us the confidence to deploy securely.",
    name: 'Kim Jensen', role: 'CTO', organisation: 'Nordic Cyber Denmark'
  },
  {
    id: 'easq',
    quote: 'Navigating the requirements of the EU AI Act felt overwhelming until we engaged SundAI for a Decision Review. In a very short time, they mapped out our exact risk profile and provided a concise, actionable roadmap. It transformed a complex regulatory bottleneck into a clear and manageable process for our entire management team.',
    name: 'Jevgeni Lomma', role: 'Chief Compliance Officer', organisation: 'EASQ, Tallinn, Estonia'
  },
  {
    id: 'nano',
    quote: 'The AI Literacy Workshop was exactly what our organization needed to bridge the gap between innovation and security. The session was practical, human-centered, and tailored to the actual tools our employees use daily. Our team now has the practical skills and the critical judgment required to use AI responsibly and spot potential data risks.',
    name: '', role: 'Director of Innovation', organisation: 'NANO Gentofte, Denmark'
  },
  {
    id: 'swp',
    quote: 'Partnering with SundAI has allowed us to offer top-tier AI governance and security audits to our enterprise clients. Their deep understanding of both the technical architecture and the European regulatory landscape makes them an incredibly reliable and seamless extension of our own advisory team.',
    name: 'Jonas Malm', role: 'Manager', organisation: 'SWP IT Consulting Firm, Stockholm, Sweden'
  }
];

export const testimonialCopy = {
  en: {eyebrow:'CLIENT FEEDBACK',title:'What our methodology delivers',intro:'In our clients’ own words: AI security, decision clarity, practical skills and advisory support.',link:'Read client feedback',previous:'Previous',next:'Next',pause:'Pause',play:'Play',reduced:'Automatic rotation off',carousel:'carousel',slide:'testimonial',of:'of'},
  da: {eyebrow:'KUNDEUDTALELSER',title:'Det leverer vores metode',intro:'Med kundernes egne ord: AI-sikkerhed, klare beslutninger, praktiske færdigheder og rådgivning.',link:'Læs kundeudtalelser',previous:'Forrige',next:'Næste',pause:'Pause',play:'Afspil',reduced:'Automatisk skift slået fra',carousel:'karrusel',slide:'kundeudtalelse',of:'af'},
  sv: {eyebrow:'KUNDOMDÖMEN',title:'Det här ger vår metod',intro:'Med kundernas egna ord: AI-säkerhet, tydliga beslut, praktiska färdigheter och rådgivning.',link:'Läs kundomdömen',previous:'Föregående',next:'Nästa',pause:'Pausa',play:'Spela',reduced:'Automatiskt byte avstängt',carousel:'karusell',slide:'kundomdöme',of:'av'}
};

export function clientTestimonials(lang, {page = false} = {}) {
  const t=testimonialCopy[lang], heading=page?'h1':'h2';
  return `<section class="section testimonials" id="project-examples" data-testimonials role="region" aria-labelledby="testimonials-heading" data-carousel-label="${esc(t.carousel)}" data-pause-label="${esc(t.pause)}" data-play-label="${esc(t.play)}" data-reduced-label="${esc(t.reduced)}"><div class="container"><div class="testimonial-heading"><p class="eyebrow">${esc(t.eyebrow)}</p><${heading} id="testimonials-heading">${esc(t.title)}</${heading}></div><div class="testimonial-viewport" id="testimonial-viewport">${testimonials.map((item,i)=>`<figure class="testimonial-slide" data-testimonial="${item.id}" data-slide-label="${i+1} ${t.of} ${testimonials.length}" data-slide-description="${esc(t.slide)}"><blockquote lang="en"><p>“${esc(item.quote)}”</p></blockquote><figcaption lang="en"><strong>${esc(item.name||item.role)}</strong>${item.name?`<span>${esc(item.role)}</span>`:''}<span>${esc(item.organisation)}</span></figcaption></figure>`).join('')}</div><div class="testimonial-controls" hidden><button type="button" data-testimonial-toggle aria-controls="testimonial-viewport">${esc(t.pause)}</button><div class="testimonial-navigation"><button type="button" data-testimonial-prev aria-controls="testimonial-viewport">${esc(t.previous)}</button><span class="testimonial-counter" aria-hidden="true">01 / 04</span><button type="button" data-testimonial-next aria-controls="testimonial-viewport">${esc(t.next)}</button></div><span class="testimonial-status" role="status" aria-live="polite" aria-atomic="true"></span></div></div></section>`;
}
