import {serviceSeo} from './seo-content.mjs';

export const serviceBenefits = {
  'compliance-ai-governance': {en:'Know what applies. Know what to do next.',da:'Kend kravene. Kend dit næste skridt.',sv:'Förstå kraven. Se nästa steg.'},
  'secure-ai-automation': {en:'Stop copying. Keep work moving.',da:'Mindre kopiering. Mere fremdrift.',sv:'Mindre kopiering. Mer flyt i arbetet.'},
  'private-ai-agents-rag': {en:'Find trusted answers in your company knowledge.',da:'Find svar med kilder i virksomhedens viden.',sv:'Hitta svar med källor i företagets kunskap.'},
  'pentesting-red-teaming': {en:'Find weak points. Prioritise the fixes.',da:'Find svaghederne. Prioritér rettelserne.',sv:'Hitta svagheterna. Prioritera åtgärderna.'},
  'devsecops': {en:'Ship with repeatable security checks.',da:'Udgiv med sikkerhedstjek, der kan gentages.',sv:'Leverera med säkerhetskontroller som går att upprepa.'},
  'cloud-security': {en:'Control access. Give alerts an owner.',da:'Styr adgangen. Giv alarmerne en ansvarlig.',sv:'Styr åtkomsten. Ge larmen en ansvarig.'}
};

// Retain unique questions; the six SEO questions already cover the omitted
// topics. The visible FAQ, its schema and discovery directory use this list.
const uniqueQuestions={
  'compliance-ai-governance':[0,1],
  'secure-ai-automation':[],
  'private-ai-agents-rag':[0,1],
  'pentesting-red-teaming':[0,1],
  'devsecops':[0,2],
  'cloud-security':[]
};
export function serviceQuestions(lang,service) {
  return [...uniqueQuestions[service.id].map(index=>service.copy[lang].faq[index]),...serviceSeo[service.id][lang].faq];
}
