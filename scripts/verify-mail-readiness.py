"""Read-only credential probe; never sends an email or prints credentials."""
import json,urllib.request
request=urllib.request.Request('https://sundaibot.com/api/leads/mail-readiness',headers={'Cache-Control':'no-cache','User-Agent':'SundAI-sending-credential-check'})
with urllib.request.urlopen(request,timeout=20) as response:result=json.load(response)
allowed=['scope','credential','providerStatus','permission','emailSent','emailDeliveryVerified','failureCode','failureType']
print(json.dumps({key:result.get(key) for key in allowed}))
if result.get('emailSent') is not False or result.get('scope')!='credential_validation_only':raise SystemExit('Unexpected probe result')
