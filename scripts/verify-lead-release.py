"""Read-only production smoke check. Does not submit a lead or prove inbox delivery."""
import json,time,urllib.request,urllib.error
from pathlib import Path
origin='https://sundaibot.com'
expected=json.loads(Path('site/discovery.json').read_text())
def get(path):
 request=urllib.request.Request(origin+path,headers={'Cache-Control':'no-cache','User-Agent':'SundAI-public-lead-readiness-check'})
 with urllib.request.urlopen(request,timeout=12) as response:return response.read()
end=time.monotonic()+360
while time.monotonic()<end:
 try:
  current=json.loads(get('/discovery.json?lead-release='+expected['contentDigest']))
  if current['contentDigest']!=expected['contentDigest']:raise ValueError('Previous public release')
  config=json.loads(get('/api/leads'))
  if not config.get('available') or not config.get('storageReady') or config.get('scope')!='configuration_only':raise ValueError('Lead binding/configuration unavailable')
  for lang in ['en','da','sv']:
   prefix='' if lang=='en' else '/'+lang
   for route in ['/free-guides/','/ai-security-check/','/ai-decision-review/','/customer-scenarios/','/insights/denmark-cpr-access-security.html']:
    html=get(prefix+route).decode('utf-8')
    if 'content="'+expected['release']+'"' not in html:raise ValueError('Outdated growth page')
   for guide in ['ai-act-readiness','agent-security','supplier-access']:
    pdf=get('/downloads/'+guide+'-'+lang+'.pdf')
    if not pdf.startswith(b'%PDF-') or len(pdf)<10000:raise ValueError('Missing PDF')
  print('Verified public release, 15 localized entry/article pages, 9 PDF responses and lead API configuration. No signup, consent click, alarm execution or inbox delivery was tested.')
  break
 except (OSError,ValueError,KeyError) as error:
  print('Waiting for public lead release:',type(error).__name__,flush=True);time.sleep(10)
else:raise SystemExit('Public lead release check timed out')
