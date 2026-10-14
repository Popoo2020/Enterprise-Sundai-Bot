"""Production negative checks: no valid lead, subscription or email is created."""
import json,time,urllib.request,urllib.error
from pathlib import Path
ORIGIN='https://sundaibot.com'
expected=json.loads(Path('site/discovery.json').read_text())
def request(path,method='GET',data=None,headers=None):
 body=json.dumps(data).encode() if data is not None else None
 req=urllib.request.Request(ORIGIN+path,data=body,method=method,headers={'User-Agent':'SundAI-negative-funnel-check','Cache-Control':'no-cache',**(headers or {})})
 try:
  with urllib.request.urlopen(req,timeout=15) as response:return response.status,response.headers,response.read()
 except urllib.error.HTTPError as error:return error.code,error.headers,error.read()
def expect(path,status,code=None,**options):
 actual,headers,body=request(path,**options)
 if actual!=status:raise AssertionError(f'{path}: expected HTTP {status}, got {actual}')
 if code and json.loads(body).get('code')!=code:raise AssertionError(f'{path}: wrong rejection code')
 if 'no-store' not in headers.get('Cache-Control',''):raise AssertionError(f'{path}: missing no-store')
 if 'noindex' not in headers.get('X-Robots-Tag',''):raise AssertionError(f'{path}: missing noindex')
for lang in ['en','da','sv']:
 prefix='' if lang=='en' else '/'+lang
 for guide in ['ai-act-readiness','agent-security','supplier-access']:
  status,headers,body=request(prefix+'/free-guides/'+guide+'/')
  if status!=200 or 'content="'+expected['release']+'"' not in body.decode():raise AssertionError('Guide landing page mismatch')
  status,headers,body=request('/downloads/'+guide+'-'+lang+'.pdf')
  if status!=200 or not body.startswith(b'%PDF-'):raise AssertionError('PDF unavailable')
  if 'application/pdf' not in headers.get('Content-Type','') or 'attachment' not in headers.get('Content-Disposition',''):raise AssertionError('PDF response headers incorrect')
  if 'noindex' not in headers.get('X-Robots-Tag',''):raise AssertionError('Download indexing header missing')
 # Confirm the new offer survives the production schema rewriter.
 status,headers,body=request(prefix+'/ai-decision-review/')
 if status!=200:raise AssertionError('Review page unavailable')
 import re
 blocks=re.findall(r'<script[^>]*data-review-schema[^>]*>(.*?)</script>',body.decode(),flags=re.S)
 if len(blocks)!=1:raise AssertionError('Missing published review schema')
 offer=json.loads(blocks[0])['offers']
 if offer.get('price')!='490' or offer.get('priceCurrency')!='EUR':raise AssertionError('Published review price mismatch')
expect('/api/leads',405,'method_not_allowed',method='PUT')
expect('/api/leads',403,'origin_not_allowed',method='POST',data={},headers={'Content-Type':'application/json','Origin':'https://example.invalid'})
expect('/api/leads',400,'unexpected_fields',method='POST',data={'unexpected':'field'},headers={'Content-Type':'application/json','Origin':ORIGIN})
expect('/api/leads',400,'invalid_fields',method='POST',data={'email':'not-an-email','lang':'en','guide':'agent-security','followup':'no','startedAt':int(time.time()*1000)-5000,'turnstileToken':''},headers={'Content-Type':'application/json','Origin':ORIGIN})
# A synthetic, reserved test address cannot get queued without the security proof.
expect('/api/leads',403,'turnstile_required',method='POST',data={'email':'funnel-check@example.invalid','lang':'en','guide':'agent-security','followup':'no','startedAt':int(time.time()*1000)-5000,'turnstileToken':''},headers={'Content-Type':'application/json','Origin':ORIGIN})
for path in ['/api/leads/confirm?t=invalid','/api/leads/unsubscribe?t=invalid']:expect(path,410)
print('Production negative checks passed: nine guide landing pages and PDF headers; three surviving EUR 490 offer schemas; method, origin, field, missing-security-proof and invalid-preference-link rejection. No valid lead, confirmation, subscription or email was created.')
