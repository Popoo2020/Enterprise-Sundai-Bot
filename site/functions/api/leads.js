import {contactConfiguration,json,singleLine,validEmail,hashValue,enforceRateLimit,verifyTurnstile,parseJsonBody,validateSameOrigin,escapeHtml} from './contact.js';
import {guideIds,languages,downloadPath,readToken} from '../_shared/lead-flow.js';
const allowed=new Set(['email','lang','guide','followup','startedAt','turnstileToken']);
const origin='https://sundaibot.com';
const copy={en:{confirm:'Confirm three practical emails from SundAI',unsub:'Stop SundAI follow-up emails',button:'Confirm',done:'Done. Your choice has been saved.',invalid:'This link has expired or is invalid. Please request the guide again.',note:'This button changes your email preference. Opening this page alone changes nothing.',home:'Back to SundAI'},da:{confirm:'Bekræft tre praktiske mails fra SundAI',unsub:'Stop SundAI-opfølgningsmails',button:'Bekræft',done:'Færdig. Dit valg er gemt.',invalid:'Linket er udløbet eller ugyldigt. Anmod om guiden igen.',note:'Knappen ændrer dit mailvalg. At åbne siden ændrer ikke noget.',home:'Tilbage til SundAI'},sv:{confirm:'Bekräfta tre praktiska mejl från SundAI',unsub:'Stoppa uppföljningsmejl från SundAI',button:'Bekräfta',done:'Klart. Ditt val har sparats.',invalid:'Länken har gått ut eller är ogiltig. Begär guiden igen.',note:'Knappen ändrar ditt mejlval. Att öppna sidan ändrar ingenting.',home:'Tillbaka till SundAI'}};
function preferencePage(lang,title,body,status=200){return new Response(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | SundAI</title><link rel="stylesheet" href="/assets/upgrade.css"></head><body class="upgrade-site"><main class="container section"><h1>${escapeHtml(title)}</h1>${body}<p><a href="${lang==='en'?'/':`/${lang}/`}">${copy[lang].home}</a></p></main></body></html>`,{status,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','referrer-policy':'no-referrer','x-robots-tag':'noindex, nofollow','x-content-type-options':'nosniff','content-security-policy':"default-src 'none'; style-src 'self'; font-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"}});}
export async function leads(request,env){const url=new URL(request.url),path=url.pathname;
 if(!env.LEAD_FLOWS)return json({ok:false,available:false,code:'lead_service_unavailable'},503);
 if(path==='/api/leads'){
  if(!contactConfiguration(env).ok)return json({ok:false,available:false,code:'lead_service_unavailable'},503);
  if(request.method==='GET'){const probe=await env.LEAD_FLOWS.get(env.LEAD_FLOWS.idFromName('sundai-lead-storage-health-v1')).fetch('https://lead.internal/health');const health=await probe.json();if(!probe.ok||health.storage!=='readable')return json({available:false,code:'lead_storage_unavailable'},503);return json({available:true,enabled:true,storageReady:true,siteKey:env.TURNSTILE_SITE_KEY,action:'contact',scope:'configuration_only'});}
  if(request.method!=='POST')return json({ok:false,code:'method_not_allowed'},405,{allow:'GET, POST'});
  if(!validateSameOrigin(request))return json({ok:false,code:'origin_not_allowed'},403);
  const rate=await enforceRateLimit(request,env);if(rate.unavailable)return json({ok:false,code:'lead_service_unavailable'},503);if(!rate.allowed)return json({ok:false,code:'rate_limited'},429);
  const parsed=await parseJsonBody(request,allowed);if(parsed.error)return parsed.error;const body=parsed.body,email=singleLine(body.email).toLowerCase(),startedAt=Number(body.startedAt);
  if(!validEmail(email)||email.length>200||!languages.includes(body.lang)||!guideIds.includes(body.guide)||!['yes','no'].includes(body.followup)||!Number.isFinite(startedAt)||Date.now()-startedAt<1500||Date.now()-startedAt>86400000)return json({ok:false,code:'invalid_fields'},400);
  const security=await verifyTurnstile({request,env,token:body.turnstileToken});if(!security.success)return json({ok:false,code:security.code},403);
  const stub=env.LEAD_FLOWS.get(env.LEAD_FLOWS.idFromName(await hashValue(email))),response=await stub.fetch('https://lead.internal/capture',{method:'POST',body:JSON.stringify({...body,email})});const receipt=await response.json();if(!response.ok||!receipt.ok)return json({ok:false,code:receipt.code||'queue_unavailable'},response.status);
  return json({ok:true,status:'queued',download:downloadPath(body.guide,body.lang),followup:body.followup==='yes'?'confirmation_required':'not_requested'},202);
 }
 if(path==='/api/leads/mail-readiness'){if(request.method!=='GET')return json({ok:false,code:'method_not_allowed'},405,{allow:'GET'});const stub=env.LEAD_FLOWS.get(env.LEAD_FLOWS.idFromName('sundai-lead-storage-health-v1'));const response=await stub.fetch('https://lead.internal/mail-readiness');return json(await response.json(),response.status);}
 const purpose=path==='/api/leads/confirm'?'confirm':path==='/api/leads/unsubscribe'?'unsubscribe':null;
 if(!purpose)return json({ok:false},404);if(!['GET','POST'].includes(request.method))return json({ok:false},405,{allow:'GET, POST'});
 let payload;try{payload=await readToken(url.searchParams.get('t'),purpose,env);}catch{return preferencePage('en','Email preference',`<p>${copy.en.invalid}</p>`,410);}
 const t=copy[payload.l],title=purpose==='confirm'?t.confirm:t.unsub;
 if(request.method==='GET')return preferencePage(payload.l,title,`<p>${t.note}</p><form method="post" action="${escapeHtml(url.pathname+url.search)}"><button type="submit" class="button primary">${t.button}</button></form>`);
 const oneClick=purpose==='unsubscribe'&&/^application\/x-www-form-urlencoded(?:;|$)/i.test(request.headers.get('content-type')||'');
 if(!oneClick&&!validateSameOrigin(request))return json({ok:false,code:'origin_not_allowed'},403);
 // The encrypted URL is the capability; body fields can never supply an email or identity.
 const stub=env.LEAD_FLOWS.get(env.LEAD_FLOWS.idFromName(await hashValue(payload.e))),response=await stub.fetch('https://lead.internal/'+purpose,{method:'POST',body:JSON.stringify(payload)});
 return preferencePage(payload.l,title,`<p>${response.ok?t.done:t.invalid}</p>`,response.ok?200:410);
}
