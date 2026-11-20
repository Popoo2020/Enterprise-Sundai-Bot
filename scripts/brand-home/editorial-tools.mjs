const copy = {
  en: {
    privacy:'Your entries are processed in this tab. You can copy or download them without sending them to SundAI.',
    copy:'Copy result', download:'Download text file', copied:'Copied to your clipboard.', failed:'Copy is unavailable here. Use the text download.', downloaded:'Text file prepared for download.',
    market:'Check a market claim', marketIntro:'Compare what two sources actually say. You can save a draft while an answer is still missing.',
    claim:'Claim to check', claimHint:'e.g. “The base plan includes onboarding.”', source1:'First source', source2:'Second source', locator:'Public URL or document reference', finding:'What the source says and when you checked it',
    independent:'I checked that the two sources have different origins.', assessment:'How do the findings compare?', open:'Still unclear', agree:'Both support the claim', reject:'Both contradict the claim', rejected:'According to your review, both sources contradict the claim. Correct or withdraw it before using it.', conflict:'They disagree', next:'What is missing, and what will you do next?',
    status:'Evidence review', missingClaim:'Start with one claim you can check.', missing:'Draft. Record the reference and finding for both sources.', duplicate:'Both entries point to the same source. Look for a separate origin.', uncertain:'Independence is unconfirmed. Check whether both sources repeat the same announcement.', unresolved:'The evidence is still open. Record which fact would settle the question.', supported:'The two sources support the claim according to your review. Check the conditions before using it in a decision.', disputed:'The sources disagree. Keep both findings and resolve the difference before acting.',
    funnel:'How many people completed sign-up?', context:'Which events and time window did you use? (optional)', contextHint:'e.g. Sign-up started to email verified within seven days', rate2:'Second cohort completion rate', manual:'Divide completions by starts for the completion rate. Subtract completions from starts to count people who did not finish.', funnelIntro:'The starting figures are illustrative. Enter unique people from the same cohort, using one completion window and the same event definitions.',
    starts:'People who started', ends:'People who completed', second:'Compare a second cohort', starts2:'Starts in the second cohort', ends2:'Completions in the second cohort',
    rate:'Completion rate', gap:'People who did not complete', drop:'Share who did not complete', delta:'Change in completion rate', points:'percentage points', noData:'Enter both counts to calculate.', badCount:'Use whole numbers of zero or more, without separators.', badOrder:'Completions cannot exceed starts in the same cohort.', zero:'Zero people started. There is no rate to report.', incomplete:'Enter both counts for the second cohort or leave both empty.', zeroCompare:'The second cohort has no starts. A change in rate cannot be calculated.',
    plan:'Next test', steps:['Check one example of each event and verify that retries are counted once per person.', 'Repeat the suspected step with a test account in staging. Record the expected and observed result.', 'After a change, compare equivalent cohorts over the same window. A difference alone does not establish the cause.']
  },
  he: {
    privacy:'הנתונים מעובדים בלשונית הזו. אפשר להעתיק או להוריד אותם בלי לשלוח אותם ל־SundAI.',
    copy:'העתקת התוצאה', download:'הורדת קובץ טקסט', copied:'התוצאה הועתקה ללוח.', failed:'ההעתקה אינה זמינה כאן. אפשר להוריד קובץ טקסט.', downloaded:'קובץ הטקסט מוכן להורדה.',
    market:'בדיקת טענה על השוק', marketIntro:'השוו בין מה ששני מקורות אומרים בפועל. אפשר לשמור טיוטה גם כשחסר מידע.',
    claim:'מה הטענה שרוצים לבדוק?', claimHint:'למשל, ״החבילה הבסיסית כוללת הדרכת הצטרפות״', source1:'מקור ראשון', source2:'מקור שני', locator:'קישור פומבי או הפניה למסמך', finding:'מה כתוב במקור ומתי בדקתם אותו?',
    independent:'בדקתי ששני המקורות מסתמכים על מידע שנאסף בנפרד.', assessment:'איך הממצאים משתווים?', open:'עדיין לא ברור', agree:'שניהם תומכים בטענה', reject:'שניהם מפריכים את הטענה', rejected:'לפי הבדיקה שלכם שני המקורות מפריכים את הטענה. עדכנו אותה או הסירו אותה לפני השימוש.', conflict:'יש סתירה בין הממצאים', next:'מה עוד חסר, ואיך תבדקו זאת?',
    status:'מצב הבדיקה', missingClaim:'התחילו בטענה אחת שאפשר לבדוק.', missing:'זו טיוטה. הוסיפו הפניה וממצא לכל אחד משני המקורות.', duplicate:'שתי ההפניות מובילות לאותו מקור. חפשו מקור נוסף שאסף את המידע בעצמו.', uncertain:'עצמאות המקורות טרם נבדקה. בדקו אם שניהם מסתמכים על אותה הודעה.', unresolved:'השאלה עדיין פתוחה. ציינו איזו עובדה תאפשר להכריע.', supported:'לפי הבדיקה שלכם, שני המקורות תומכים בטענה. בדקו באילו תנאים היא נכונה לפני שמקבלים החלטה.', disputed:'המקורות סותרים זה את זה. שמרו את שני הממצאים ובררו מה מסביר את הפער לפני שמחליטים.',
    funnel:'כמה אנשים השלימו את ההרשמה?', context:'אילו אירועים וחלון זמן בדקתם? (רשות)', contextHint:'למשל, מהתחלת הרשמה ועד לאימות המייל בתוך שבעה ימים', rate2:'שיעור השלמה בקבוצה השנייה', manual:'חלקו את מספר המסיימים במספר המתחילים לקבלת שיעור ההשלמה. החסירו את מספר המסיימים ממספר המתחילים כדי לגלות כמה לא סיימו.', funnelIntro:'המספרים ההתחלתיים הם דוגמה. הזינו את מספר האנשים הייחודיים באותה קבוצה. השתמשו באותה הגדרת אירוע ובאותו פרק זמן להשלמת ההרשמה.',
    starts:'כמה אנשים התחילו?', ends:'כמה מהם השלימו?', second:'השוואה לקבוצה נוספת', starts2:'כמה אנשים התחילו בקבוצה השנייה?', ends2:'כמה מהם השלימו בקבוצה השנייה?',
    rate:'שיעור השלמה', gap:'אנשים שלא השלימו', drop:'שיעור האנשים שלא השלימו', delta:'שינוי בשיעור ההשלמה', points:'נקודות אחוז', noData:'הזינו את שני המספרים כדי לחשב.', badCount:'יש להזין מספרים שלמים מאפס ומעלה, ללא מפרידי אלפים.', badOrder:'באותה קבוצה מספר המסיימים לא יכול להיות גדול ממספר המתחילים.', zero:'איש לא התחיל. אי אפשר לחשב שיעור השלמה.', incomplete:'הזינו את שני המספרים של הקבוצה השנייה או השאירו את שניהם ריקים.', zeroCompare:'בקבוצה השנייה איש לא התחיל. אי אפשר לחשב את השינוי בשיעור ההשלמה.',
    plan:'הבדיקה הבאה', steps:['בדקו דוגמה לכל אירוע וודאו שניסיונות חוזרים של אותו אדם נספרים פעם אחת.', 'עברו את השלב החשוד עם חשבון בדיקה בסביבת ניסוי. רשמו מה ציפיתם שיקרה ומה קרה בפועל.', 'לאחר שינוי, השוו קבוצות דומות באותו חלון זמן. כדי לייחס את ההבדל לשינוי צריך לבדוק גם הסברים אחרים.']
  },
  sv: {
    privacy:'Uppgifterna behandlas i den här fliken. Du kan kopiera eller ladda ned dem utan att skicka dem till SundAI.',
    copy:'Kopiera resultatet', download:'Ladda ned textfil', copied:'Resultatet har kopierats.', failed:'Det går inte att kopiera här. Ladda ned textfilen i stället.', downloaded:'Textfilen är klar för nedladdning.',
    market:'Granska ett påstående om marknaden', marketIntro:'Jämför vad två källor faktiskt uppger. Du kan spara ett utkast även när något återstår att kontrollera.',
    claim:'Vilket påstående vill du granska?', claimHint:'Till exempel ”Starthjälp ingår i baspaketet.”', source1:'Första källan', source2:'Andra källan', locator:'Offentlig webbadress eller dokumentreferens', finding:'Vad säger källan och när granskade du den?',
    independent:'Jag har kontrollerat att uppgifterna kommer från två oberoende källor.', assessment:'Hur stämmer uppgifterna överens?', open:'Fortfarande oklart', agree:'Båda stöder påståendet', reject:'Båda motsäger påståendet', rejected:'Enligt din granskning motsäger båda källorna påståendet. Rätta eller stryk det innan det används.', conflict:'Uppgifterna går isär', next:'Vad saknas och hur går du vidare?',
    status:'Bedömning av underlaget', missingClaim:'Börja med ett påstående som går att kontrollera.', missing:'Utkast. Ange en referens och vad du hittade i båda källorna.', duplicate:'Båda hänvisningarna leder till samma källa. Hitta ett oberoende underlag.', uncertain:'Källornas oberoende är obekräftat. Undersök om båda återger samma ursprungliga besked.', unresolved:'Frågan är fortfarande öppen. Ange vilken uppgift som skulle avgöra saken.', supported:'Enligt din granskning stöder båda källorna påståendet. Kontrollera villkoren innan du fattar beslut.', disputed:'Källorna går isär. Spara båda uppgifterna och utred skillnaden innan du fattar beslut.',
    funnel:'Hur många slutförde registreringen?', context:'Vilka händelser och vilken tidsgräns använde du? (valfritt)', contextHint:'Till exempel från påbörjad registrering till bekräftad e-post inom sju dagar', rate2:'Andel som slutförde i den andra gruppen', manual:'Dividera antalet som slutförde med antalet som började för att få andelen. Skillnaden mellan antalen visar hur många som inte slutförde.', funnelIntro:'Siffrorna är exempel. Ange antalet unika personer i samma grupp. Använd samma händelsedefinitioner och samma tidsgräns för att slutföra registreringen.',
    starts:'Personer som började', ends:'Personer som slutförde', second:'Jämför med en andra grupp', starts2:'Antal som började i den andra gruppen', ends2:'Antal som slutförde i den andra gruppen',
    rate:'Andel som slutförde', gap:'Personer som inte slutförde', drop:'Andel som inte slutförde', delta:'Förändring i andelen som slutförde', points:'procentenheter', noData:'Fyll i båda antalen för att räkna.', badCount:'Ange heltal från noll och uppåt, utan tusentalsavgränsare.', badOrder:'Fler personer kan inte slutföra än börja i samma grupp.', zero:'Ingen började. Det finns ingen andel att beräkna.', incomplete:'Fyll i båda antalen för den andra gruppen eller lämna båda tomma.', zeroCompare:'Ingen började i den andra gruppen. Förändringen kan inte beräknas.',
    plan:'Nästa test', steps:['Granska ett exempel på varje händelse och kontrollera att upprepade försök räknas en gång per person.', 'Gå igenom det misstänkta steget med ett testkonto i testmiljön. Anteckna väntat och faktiskt resultat.', 'Jämför likvärdiga grupper med samma tidsgräns efter en ändring. En skillnad visar inte i sig vad som orsakade den.']
  },
  da: {
    privacy:'Oplysningerne behandles i denne fane. Du kan kopiere eller hente dem uden at sende dem til SundAI.',
    copy:'Kopiér resultatet', download:'Hent tekstfil', copied:'Resultatet er kopieret.', failed:'Kopiering er ikke tilgængelig her. Hent tekstfilen i stedet.', downloaded:'Tekstfilen er klar til at hente.',
    market:'Efterprøv en påstand om markedet', marketIntro:'Sammenlign, hvad to kilder faktisk oplyser. Du kan gemme en kladde, selv om noget fortsat er uafklaret.',
    claim:'Hvilken påstand vil du efterprøve?', claimHint:'For eksempel ”Opstartshjælp følger med basispakken.”', source1:'Første kilde', source2:'Anden kilde', locator:'Offentlig webadresse eller dokumenthenvisning', finding:'Hvad siger kilden, og hvornår tjekkede du den?',
    independent:'Jeg har tjekket, at oplysningerne stammer fra to uafhængige kilder.', assessment:'Hvordan stemmer oplysningerne overens?', open:'Fortsat uklart', agree:'Begge støtter påstanden', reject:'Begge modsiger påstanden', rejected:'Ud fra din vurdering modsiger begge kilder påstanden. Ret eller fjern den, før den bruges.', conflict:'De peger i forskellige retninger', next:'Hvad mangler, og hvordan kommer du videre?',
    status:'Vurdering af grundlaget', missingClaim:'Begynd med én påstand, som kan efterprøves.', missing:'Kladde. Angiv en henvisning og en observation for begge kilder.', duplicate:'Begge henvisninger peger på samme kilde. Find et uafhængigt grundlag.', uncertain:'Kildernes uafhængighed er uafklaret. Undersøg, om de bygger på den samme meddelelse.', unresolved:'Spørgsmålet er stadig åbent. Angiv den oplysning, som ville afgøre sagen.', supported:'Ud fra din vurdering støtter begge kilder påstanden. Tjek betingelserne, før du træffer en beslutning.', disputed:'Kilderne er uenige. Gem begge oplysninger, og undersøg forskellen, før du handler.',
    funnel:'Hvor mange gennemførte tilmeldingen?', context:'Hvilke hændelser og hvilken tidsfrist brugte du? (valgfrit)', contextHint:'For eksempel fra påbegyndt tilmelding til bekræftet e-mail inden for syv dage', rate2:'Andel, der gennemførte i den anden gruppe', manual:'Divider antallet, der gennemførte, med antallet, der begyndte, for at finde andelen. Forskellen mellem antallene viser, hvor mange der ikke gennemførte.', funnelIntro:'Starttallene er et eksempel. Indtast antallet af unikke personer i samme gruppe. Brug samme definition af hændelserne og samme frist for at gennemføre.',
    starts:'Personer, der begyndte', ends:'Personer, der gennemførte', second:'Sammenlign med en anden gruppe', starts2:'Antal, der begyndte i den anden gruppe', ends2:'Antal, der gennemførte i den anden gruppe',
    rate:'Andel, der gennemførte', gap:'Personer, der ikke gennemførte', drop:'Andel, der ikke gennemførte', delta:'Ændring i andelen, der gennemførte', points:'procentpoint', noData:'Udfyld begge felter for at beregne resultatet.', badCount:'Brug hele tal fra nul og opefter uden tusindtalsseparatorer.', badOrder:'Flere personer kan ikke gennemføre end begynde i den samme gruppe.', zero:'Ingen begyndte. Der er ingen andel at beregne.', incomplete:'Udfyld begge felter for den anden gruppe, eller lad begge stå tomme.', zeroCompare:'Ingen begyndte i den anden gruppe. Ændringen kan ikke beregnes.',
    plan:'Næste test', steps:['Tjek et eksempel på hver hændelse, og kontrollér, at gentagne forsøg tælles én gang pr. person.', 'Gennemgå det mistænkte trin med en testkonto i et testmiljø. Notér det forventede og det faktiske resultat.', 'Sammenlign ensartede grupper med samme tidsfrist efter en ændring. En forskel fastslår ikke i sig selv årsagen.']
  }
};

const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const textBox = (key, label, hint = '') => `<label class="ew-field"><span>${escape(label)}</span><textarea data-input="${key}" rows="2" maxlength="1200" dir="auto" placeholder="${escape(hint)}"></textarea></label>`;
const countBox = (key, label, value = '') => `<label class="ew-field"><span>${escape(label)}</span><input data-input="${key}" type="text" dir="ltr" inputmode="numeric" autocomplete="off" maxlength="16" value="${value}"></label>`;
const source = (c, n) => `<fieldset><legend>${c['source'+n]}</legend>
  <label class="ew-field"><span>${c.locator}</span><input data-input="ref${n}" dir="auto" type="text" maxlength="600" autocomplete="off"></label>
  ${textBox('finding'+n,c.finding)}</fieldset>`;
function worksheet(c) {
  return `${textBox('claim',c.claim,c.claimHint)}
    <div class="ew-pair">${source(c,1)}${source(c,2)}</div>
    <label class="ew-check"><input data-input="independent" type="checkbox"><span>${c.independent}</span></label>
    <label class="ew-field"><span>${c.assessment}</span><select data-input="assessment">${['open','agree','reject','conflict'].map(key => `<option value="${key}">${c[key]}</option>`).join('')}</select></label>
    ${textBox('next',c.next)}
    <p class="ew-result" aria-live="polite" data-feedback>${c.missingClaim}</p>`;
}
function calculator(c) {
  return `<div class="ew-pair">${countBox('starts',c.starts,'200')}${countBox('ends',c.ends,'130')}</div>
    ${textBox('context',c.context,c.contextHint)}
    <details class="ew-compare"><summary>${c.second}</summary><div class="ew-pair">${countBox('starts2',c.starts2)}${countBox('ends2',c.ends2)}</div></details>
    <p class="ew-result" data-feedback aria-live="polite"></p>
    <dl class="ew-metrics" data-results aria-live="polite">${['rate','gap','drop','rate2','delta'].map(key=>`<div data-row="${key}" hidden><dt>${c[key]}</dt><dd dir="auto" data-metric="${key}"></dd></div>`).join('')}</dl>
    <details class="ew-plan"><summary>${c.plan}</summary><ol>${c.steps.map(step=>`<li>${step}</li>`).join('')}</ol></details>`;
}

export function renderEditorialTool(locale, slug) {
  const mode = {'market-research-with-ai':'market','diagnose-signup-dropoff':'funnel'}[slug];
  if (!mode) return '';
  const c = copy[locale];
  const keys = mode === 'market'
    ? ['market','claim','source1','source2','assessment','open','agree','reject','conflict','next','status','missingClaim','missing','duplicate','uncertain','unresolved','supported','disputed','rejected']
    : ['funnel','context','starts','ends','starts2','ends2','rate','rate2','gap','drop','delta','points','noData','badCount','badOrder','zero','incomplete','zeroCompare','plan','steps'];
  const labels = Object.fromEntries([...keys,'copied','failed','downloaded'].map(key=>[key,c[key]]));
  return `<section id="work-tool" class="ew-tool" lang="${locale}" aria-labelledby="ew-title" data-ew="${mode}" data-labels="${escape(JSON.stringify(labels))}">
    <h2 id="ew-title">${c[mode]}</h2><p class="ew-intro">${c[mode+'Intro']}</p>
    <div class="ew-body" hidden>${mode === 'market' ? worksheet(c) : calculator(c)}
    <div class="ew-actions"><button type="button" data-action="copy">${c.copy}</button><button type="button" data-action="download">${c.download}</button></div>
    <p class="ew-notice" role="status" data-notice></p><p class="ew-privacy">${c.privacy}</p></div>
    <noscript><ol>${(mode === 'market' ? [c.claim,c.source1+' / '+c.source2+' · '+c.locator+' · '+c.finding,c.assessment,c.next] : [c.manual,...c.steps]).map(step=>'<li>'+escape(step)+'</li>').join('')}</ol></noscript>
  </section>`;
}
