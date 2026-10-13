// Review files consume our compiled pages, whose JavaScript lives in <head>.
// Fail closed if that contract changes. This is validation of compiler output,
// not an attempt to sanitize arbitrary or user-provided HTML with a regexp.
export function reviewBody(html, route) {
 const match=html.match(/<body\b[^>]*>([\s\S]*)<\/body\s*>/i);
 if(!match)throw new Error(`Missing review body: ${route}`);
 const body=match[1];
 if(/<\s*script\b/i.test(body))throw new Error(`Scripts are not allowed in compiled review bodies: ${route}`);
 if(/\bon[a-z0-9:_-]*\s*=/i.test(body)||/javascript\s*:/i.test(body))throw new Error(`Inline code is not allowed in compiled review bodies: ${route}`);
 return body;
}
