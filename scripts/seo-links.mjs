export const guideLinks={
 matrix:{path:'/resources/ai-control-matrix/',labels:{en:'AI control matrix: connect risks to evidence',da:'AI-kontrolmatrix: forbind risici med dokumentation',sv:'AI-kontrollmatris: koppla risker till underlag'}},
 readiness:{path:'/resources/european-ai-governance-readiness-2026/',labels:{en:'European AI governance readiness brief',da:'Overblik over europæisk AI-governance-parathed',sv:'Översikt över europeisk AI-styrning och beredskap'}},
 rag:{path:'/insights/secure-rag-ai-assistants.html',labels:{en:'Secure RAG: access, sources and evaluation',da:'Sikker RAG: adgang, kilder og evaluering',sv:'Säker RAG: åtkomst, källor och utvärdering'}},
 injection:{path:'/insights/prompt-injection-business-guide.html',labels:{en:'Prompt injection: what your business needs to test',da:'Prompt injection: det skal virksomheden teste',sv:'Prompt injection: det behöver företaget testa'}},
 agents:{path:'/insights/ai-agent-security-checklist-2026.html',labels:{en:'AI agent security checklist',da:'Tjekliste for AI-agentsikkerhed',sv:'Checklista för AI-agentsäkerhet'}},
 vendors:{path:'/insights/ai-vendor-security-review.html',labels:{en:'How to review an AI supplier',da:'Sådan vurderer I en AI-leverandør',sv:'Så granskar ni en AI-leverantör'}},
 pilots:{path:'/insights/why-ai-pilots-fail.html',labels:{en:'Why AI pilots fail—and what to decide first',da:'Hvorfor AI-piloter fejler, og hvad I skal afklare',sv:'Varför AI-piloter misslyckas och vad ni ska klargöra'}},
 baseline:{path:'/insights/ai-assistant-security-baseline.html',labels:{en:'Security baseline for AI assistants',da:'Sikkerhedsgrundlag for AI-assistenter',sv:'Säkerhetsgrund för AI-assistenter'}}
};
export const serviceConnections={
 'compliance-ai-governance':{guides:['matrix','readiness','vendors'],related:['private-ai-agents-rag','secure-ai-automation']},
 'secure-ai-automation':{guides:['pilots','agents','vendors'],related:['private-ai-agents-rag','cloud-security']},
 'private-ai-agents-rag':{guides:['rag','injection','agents'],related:['secure-ai-automation','compliance-ai-governance']},
 'pentesting-red-teaming':{guides:['injection','agents','baseline'],related:['devsecops','cloud-security']},
 devsecops:{guides:['baseline','vendors','matrix'],related:['pentesting-red-teaming','cloud-security']},
 'cloud-security':{guides:['baseline','vendors','matrix'],related:['devsecops','compliance-ai-governance']}
};
export const connectionLabels={en:{guides:'Make an informed move.',guideIntro:'Practical guides to help your team ask better questions before committing.',related:'Often a useful next step.'},da:{guides:'Træf et velinformeret valg.',guideIntro:'Praktiske vejledninger, der hjælper teamet med at stille de rigtige spørgsmål før en aftale.',related:'Ofte et nyttigt næste skridt.'},sv:{guides:'Gör ett välgrundat val.',guideIntro:'Praktiska guider som hjälper teamet att ställa bättre frågor innan ni förbinder er.',related:'Ofta ett användbart nästa steg.'}};
