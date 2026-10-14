"""Reproducible, four-page practical PDFs. Input exported from lead-content.mjs."""
import json, sys, subprocess
from pathlib import Path
from html import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
root=Path(__file__).resolve().parent.parent
if len(sys.argv)>1:
 data=json.loads(Path(sys.argv[1]).read_text())
else:
 result=subprocess.run(['node','--input-type=module','-e',"import {guideIds,guideTitles,checklistContent,sources,growthCopy} from './scripts/lead-content.mjs';console.log(JSON.stringify({guideIds,guideTitles,checklistContent,sources,growthCopy}));"],cwd=root,capture_output=True,text=True,check=True)
 data=json.loads(result.stdout)
pdfmetrics.registerFont(TTFont('DS','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DSB','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='Brand',fontName='DSB',fontSize=12,textColor=colors.HexColor('#315ac2'),spaceAfter=22))
styles.add(ParagraphStyle(name='Title2',fontName='DSB',fontSize=25,leading=32,spaceAfter=18,textColor=colors.HexColor('#111820')))
styles.add(ParagraphStyle(name='Heading2a',fontName='DSB',fontSize=17,leading=23,spaceAfter=16,textColor=colors.HexColor('#111820')))
styles.add(ParagraphStyle(name='Body2',fontName='DS',fontSize=10.5,leading=17,spaceAfter=16,textColor=colors.HexColor('#263442')))
styles.add(ParagraphStyle(name='Small2',fontName='DS',fontSize=8,leading=12,spaceAfter=10,textColor=colors.HexColor('#415063')))
labels={'en':('Practical checklist','Record the evidence','Item / owner','Evidence / next action','Reviewed: 14 October 2026','Guidance, not certification or legal advice. Confirm applicability and current law for your system.','Your next step','Bring one concrete decision to the €490 AI Decision Review. Scope, timing and applicable VAT are agreed before acceptance. No purchase or appointment is confirmed by a form.'),'da':('Praktisk tjekliste','Gem dokumentationen','Punkt / ejer','Dokumentation / næste handling','Gennemgået: 14. oktober 2026','Vejledning, ikke certificering eller juridisk rådgivning. Kontrollér anvendelighed og gældende lov for systemet.','Dit næste skridt','Tag én konkret beslutning med til AI Decision Review til €490. Omfang, tid og eventuel moms aftales før accept. En formular bekræfter ikke et køb eller en tid.'),'sv':('Praktisk checklista','Spara underlaget','Punkt / ägare','Underlag / nästa åtgärd','Granskad: 14 oktober 2026','Vägledning, inte certifiering eller juridisk rådgivning. Kontrollera tillämplighet och gällande lag för systemet.','Ditt nästa steg','Ta ett konkret beslut till AI Decision Review för €490. Omfattning, tid och tillämplig moms avtalas före accept. Ett formulär bekräftar inget köp eller möte.')}
def p(text,style='Body2'):return Paragraph(escape(text),styles[style])
def footer(canvas,doc):
 canvas.saveState();canvas.setStrokeColor(colors.HexColor('#d4dde7'));canvas.line(44,44,551,44);canvas.setFont('DS',8);canvas.setFillColor(colors.HexColor('#415063'));canvas.drawString(44,30,'SundAI · sundaibot.com · RIIMON HOLDINGS LTD');canvas.drawRightString(551,30,str(doc.page));canvas.restoreState()
for lang in ['en','da','sv']:
 c=labels[lang];base='' if lang=='en' else '/'+lang
 for i,id in enumerate(data['guideIds']):
  title=data['guideTitles'][lang][i];parts=data['checklistContent'][lang][i];flow=[]
  for n,part in enumerate(parts):
   flow+=[p('SundAI / '+c[0],'Brand')]
   if n==0:flow+=[p(title,'Title2'),p(c[4],'Small2')]
   flow+=[p(f'0{n+1} / {part[0]}','Heading2a')]
   for text in part[1:]:flow+=[p('□  '+text)]
   flow+=[Spacer(1,12),p(c[1],'Heading2a')]
   table=Table([[p(c[2],'Small2'),p(c[3],'Small2')],*([['','']] * 6)],colWidths=[160,347],rowHeights=[30]+[42]*6);table.setStyle(TableStyle([('GRID',(0,0),(-1,-1),.5,colors.HexColor('#c7d3e1')),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#eef4fa')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),8)]));flow+=[table,PageBreak()]
  flow+=[p('SundAI / SOURCES','Brand'),p(c[6],'Title2'),p(c[7]),Paragraph(f'<link href="https://sundaibot.com{base}/ai-decision-review/">sundaibot.com{base}/ai-decision-review/</link>',styles['Body2']),p(c[5],'Small2'),p(c[4],'Small2')]
  refs=[data['sources'][7],data['sources'][4],data['sources'][3]] if i==0 else [data['sources'][5],data['sources'][6],data['sources'][3],data['sources'][4]]
  for label,url in refs:flow+=[p(label,'Body2'),Paragraph(f'<link href="{escape(url)}">{escape(url)}</link>',styles['Small2'])]
  flow+=[p('Contact: eririmo@protonmail.com · UK company 13813344','Small2')]
  target=root/'site'/'downloads'/f'{id}-{lang}.pdf'
  doc=SimpleDocTemplate(str(target),pagesize=(595.28,841.89),rightMargin=44,leftMargin=44,topMargin=42,bottomMargin=62,title=title,author='SundAI',subject=c[0]);doc.build(flow,onFirstPage=footer,onLaterPages=footer)
  print(target.name,target.stat().st_size)
