// The opening scene is rendered with the page, including when JavaScript is unavailable.
const icons = {
  inbox: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
  draft: '<path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="m11 12 7-7a2 2 0 0 1 3 3l-7 7-4 1z"/>',
  approval: '<path d="m12 2 8 4v6c0 5-5 8-8 10-3-2-8-5-8-10V6z"/><path d="m8 12 3 3 5-6"/>',
  clip: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 6 6"/>',
  project: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M4 9h16m-13-2h.1"/>',
  mic: '<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 11a7 7 0 0 0 14 0m-7 7v4m-4 0h8"/>',
  access: '<rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
  decision: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h4m-9 7 2 2 4-5"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  pause: '<path d="M9 6v12m6-12v12"/>',
  play: '<path d="m8 5 10 7-10 7z"/>'
};

const copy = {
  en: {
    name:'SundAI demonstrations', choose:'Choose a demo', tabs:['Workflow','Classroom','AI review'],
    pause:'Pause demo rotation', play:'Resume demo rotation', reset:'Try again',
    scenes:[
      ['Workflow demo','A client asks for a new date.',['Email','AI draft','Approval'],'Draft reply: “Would Tuesday at 10 work for you?” Your team checks it before sending.','Approve the draft','Approval recorded in the CRM. The team can see who signed off.'],
      ['Classroom demo','Was this clip filmed today?',['Watch','Find source','Build a page'],'A post says this clip was filmed today. What does the original upload tell us?','Check the source','The post says Friday. The original was uploaded on Monday. Pupils add that evidence to their fact-check page.'],
      ['Decision Review demo','Can AI take meeting notes?',['Request','Data access','Decision'],'The team wants an AI note-taker. Its default settings keep recordings indefinitely.','See the decision','Pilot with test data. The IT lead sets a deletion period before recording client meetings.']
    ]
  },
  he: {
    name:'הדגמות SundAI', choose:'בחירת הדגמה', tabs:['אוטומציה','בכיתה','בדיקת AI'],
    pause:'השהיית המעבר בין ההדגמות', play:'חידוש המעבר בין ההדגמות', reset:'לנסות שוב',
    scenes:[
      ['הדגמת אוטומציה','לקוח מבקש לשנות מועד.',['מייל','טיוטת AI','אישור'],'טיוטה לאישור: ״יום שלישי בעשר מתאים לך?״ הצוות בודק את הנוסח לפני השליחה.','לאשר את הטיוטה','האישור תועד ב־CRM. הצוות רואה מי אישר את התשובה.'],
      ['הדגמה מהכיתה','הסרטון הזה צולם היום?',['צופים','מוצאים מקור','בונים אתר'],'בפוסט נטען שהסרטון צולם היום. מה אפשר ללמוד ממועד הפרסום המקורי?','לבדוק את המקור','הפוסט מיום שישי. הסרטון כבר פורסם ביום שני. התלמידים מציגים את הראיה באתר שבנו.'],
      ['הדגמת בדיקת AI','לתת ל־AI לסכם פגישות?',['בקשת הצוות','גישה למידע','החלטה'],'הצוות רוצה כלי לסיכום פגישות. לפי הגדרות ברירת המחדל, ההקלטות נשמרות ללא הגבלת זמן.','לראות את ההמלצה','מתחילים בפיילוט עם נתוני דמה. מנהל ה־IT יקבע מועד למחיקת ההקלטות לפני שימוש בפגישות לקוח.']
    ]
  },
  sv: {
    name:'Demonstrationer från SundAI', choose:'Välj en demonstration', tabs:['Arbetsflöde','I klassrummet','AI-granskning'],
    pause:'Pausa det automatiska bytet', play:'Återuppta det automatiska bytet', reset:'Prova igen',
    scenes:[
      ['Exempel på ett arbetsflöde','En kund vill byta mötestid.',['Mejl','AI-utkast','Godkännande'],'Svarsutkast: ”Passar det på tisdag klockan tio?” Teamet granskar svaret före utskick.','Godkänn utkastet','Godkännandet sparas i CRM. Teamet ser vem som godkände svaret.'],
      ['Exempel från klassrummet','Filmades klippet i dag?',['Se klippet','Hitta källan','Bygg en sida'],'Enligt inlägget är klippet från i dag. Vad visar datumet på originalet?','Granska källan','Inlägget är från fredagen. Originalet lades upp redan på måndagen. Eleverna visar belägget på sin egen sida.'],
      ['Exempel på AI-granskning','Får AI anteckna på möten?',['Önskemål','Dataåtkomst','Beslut'],'Teamet vill ha AI-stöd för mötesanteckningar. Grundinställningen sparar inspelningarna på obestämd tid.','Visa beslutet','Prova med testdata. IT-ansvarig bestämmer när inspelningarna ska raderas innan verktyget används på kundmöten.']
    ]
  },
  da: {
    name:'Demonstrationer fra SundAI', choose:'Vælg en demonstration', tabs:['Arbejdsgang','I klassen','AI-vurdering'],
    pause:'Sæt automatisk skift på pause', play:'Genoptag automatisk skift', reset:'Prøv igen',
    scenes:[
      ['Eksempel på en arbejdsgang','En kunde vil flytte et møde.',['Mail','AI-udkast','Godkendelse'],'Svarudkast: ”Passer tirsdag klokken ti?” Teamet tjekker svaret, før det sendes.','Godkend udkastet','Godkendelsen er gemt i CRM. Teamet kan se, hvem der godkendte svaret.'],
      ['Eksempel fra klassen','Er klippet optaget i dag?',['Se klippet','Find kilden','Byg en side'],'Ifølge opslaget er klippet fra i dag. Hvad viser datoen på den oprindelige video?','Undersøg kilden','Opslaget er fra fredag. Originalen blev lagt op allerede mandag. Eleverne viser det på deres egen faktatjekside.'],
      ['Eksempel på en AI-vurdering','Må AI tage mødereferat?',['Ønske','Dataadgang','Beslutning'],'Teamet vil bruge AI til referater. Med standardindstillingerne gemmer værktøjet optagelser på ubestemt tid.','Se anbefalingen','Start med testdata. Den it-ansvarlige fastlægger en slettefrist, før værktøjet bruges til kundemøder.']
    ]
  }
};
const sceneIds = ['automation','school','governance'];
const sceneIcons = [['inbox','draft','approval'],['clip','search','project'],['mic','access','decision']];
const icon = name => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">'+icons[name]+'</svg>';

export function renderHeroDemo(locale) {
  const t = copy[locale];
  const tab = (id,i) => `<button type="button" role="tab" id="sd-tab-${id}" aria-controls="sd-demo-${id}" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}">${t.tabs[i]}</button>`;
  const panel = (id,i) => {
    const [category,title,steps,detail,action,result] = t.scenes[i];
    const path = steps.map((step,n) => `<li><span class="sd-node">${icon(sceneIcons[i][n])}</span><span>${step}</span></li>`).join('');
    return `<div class="sd-scene" role="tabpanel" aria-labelledby="sd-tab-${id}" id="sd-demo-${id}"${i===0?'':' hidden'}>
      <p class="sd-caption"><span class="sd-caption-line" aria-hidden="true"></span>${category}</p>
      <h2>${title}</h2>
      <ol class="sd-path">${path}</ol>
      <div class="sd-response" aria-live="polite" aria-atomic="true"><p data-initial>${detail}</p><p data-result hidden>${result}</p></div>
      <button class="sd-act" type="button" data-action data-start="${action}" data-reset="${t.reset}"><span class="sd-action-icon" aria-hidden="true">${icon(i===0?'check':i===1?'search':'decision')}</span><span data-label>${action}</span></button>
    </div>`;
  };
  return `<section id="sd-hero-art" class="sd-demo" dir="${locale==='he'?'rtl':'ltr'}" aria-label="${t.name}">
    <div class="sd-toolbar"><div class="sd-tabs" role="tablist" aria-label="${t.choose}">${sceneIds.map(tab).join('')}</div>
    <button type="button" class="sd-motion" aria-label="${t.pause}" data-pause="${t.pause}" data-play="${t.play}"><span data-pause-icon>${icon('pause')}</span><span data-play-icon hidden>${icon('play')}</span></button></div>
    ${sceneIds.map(panel).join('')}
  </section>`;
}
