import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {access, readdir, readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {articleSlugs, guides} from '../../scripts/brand-home/knowledge-data.mjs';
import {buildReferencePreview} from '../../scripts/build-brand-preview.mjs';
import {legacyGuideSlugs} from '../../scripts/brand-home/legacy-guides.mjs';
import {archiveLibrary} from '../../scripts/brand-home/legacy-archive.mjs';
import {resourceLibrary} from '../../scripts/brand-home/legacy-resources.mjs';

const repo = path.resolve(import.meta.dirname, '../..');
const target = path.join(repo, 'dist/reference-preview');
const origin = 'https://preview.invalid';
const languages = ['en','he','sv','da'];
const courseSlugs = ['youth','teachers','hospital','public','beginners'];
const serviceSlugs = ['compliance-ai-governance','cloud-security','secure-ai-automation','private-ai-agents-rag'];
const workflowSlug = 'enterprise-ai-agents';
const shopifyPilot = 'shopify-first-order';
const trustRoutes = {en:'/trust/', he:'/he/trust/', sv:'/sv/tillit/', da:'/da/tillid/'};
const parentService = 'private-ai-agents-rag';
const servicePages = [...serviceSlugs, workflowSlug];
const syllabusKeys = ['TeenTech','Teacher','Hospital','PublicConsultation','Beginners'];
const pdfName = (key, locale) => 'SundAI_' + key + '_Syllabus_' + locale.toUpperCase() + '.pdf';

function hrefs(html) {
  return [...html.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/gi)]
    .map(match => match[1].replaceAll('&amp;', '&'));
}
function main(html) {
  return html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)[1];
}
function routeFor(locale, section = '', slug = '') {
  const base = locale === 'en' ? '/' : '/' + locale + '/';
  return section ? base + section + '/' + (slug ? slug + '/' : '') : base;
}
function publicFile(route) {
  const file = route.endsWith('/') ? route + 'index.html' : route;
  return path.join(target, file);
}

test('hero character reactions are single-play animations with static alternatives', async () => {
  for (const name of ['sunny', 'dan', 'mark', 'bot']) {
    for (const motion of [false, true]) {
      const file = name + (motion ? '-motion.webp' : '.webp');
      const data = await readFile(publicFile('/brand/crew/v2/' + file));
      assert.equal(data.toString('ascii', 0, 4), 'RIFF', file);
      assert.equal(data.toString('ascii', 8, 12), 'WEBP', file);
      let frames = 0;
      let plays;
      for (let pos = 12; pos + 8 <= data.length;) {
        const type = data.toString('ascii', pos, pos + 4);
        const size = data.readUInt32LE(pos + 4);
        assert.ok(pos + 8 + size <= data.length, file + ' truncated chunk');
        if (type === 'ANIM') plays = data.readUInt16LE(pos + 12);
        if (type === 'ANMF') frames++;
        pos += 8 + size + (size % 2);
      }
      assert.equal(plays, motion ? 1 : undefined, file);
      assert.ok(motion ? frames > 1 : frames === 0, file);
    }
  }
});

test('rendered pages use their requested language and have working local links', async () => {
  const anchorCache = new Map();
  const artwork = {
    'courses/teachers': ['dan', /<details class="teacher-review">([\s\S]*?)<\/details>/],
    ['services/' + workflowSlug]: ['mark', /<figure class="aw-sheet">([\s\S]*?)<\/figure>/],
    'services/compliance-ai-governance': ['mark', /<p class="os-category os-governance-category">([\s\S]*?)<\/p><h1>/],
  };
  for (const locale of languages) {
    const titles = new Set();
    const routes = [
      ['',''], ['intro-call',''], ['read',''], ...articleSlugs.map(slug=>['read',slug]),
      ['free-guides',''], ...legacyGuideSlugs.map(slug=>['free-guides',slug]),
      ...courseSlugs.map(slug => ['courses', slug]),
      ...[...servicePages, shopifyPilot].map(slug => ['services', slug])
    ];
    for (const [section, slug] of routes) {
      const route = routeFor(locale, section, slug);
      const html = await readFile(publicFile(route), 'utf8');
      assert.match(html, new RegExp('<html[^>]+lang=["\']' + locale + '["\']'), route);
      assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, route + ' heading');
      const [actor, location] = artwork[section + '/' + slug] || [];
      const cues = [...html.matchAll(/data-crew-context="([^"]+)"/g)].map(match => match[1]);
      assert.deepEqual(cues, actor ? [actor] : [], route + ' contextual artwork');
      if (actor) {
        assert.ok(html.match(location)?.[1].includes('data-crew-context="' + actor + '"'), route + ' artwork location');
        assert.equal(hrefs(html).filter(url => url.endsWith('/crew-demos.js')).length, 1, route);
      }
      assert.doesNotMatch(html, /(?<!Eric )Ariel Rimón|(?<!אריק )אריאל רימון/, route + ' abbreviated founder name');
      if (section === 'courses' && slug === 'beginners') {
        const bio = html.match(/<div class="course-teacher">([\s\S]*?)<\/div>/)?.[1] ?? '';
        const degree = {
          he: 'למדתי בפינלנד. יש לי תואר בניהול שירותי ממשל עם תוספת לפסיכולוגיה פדגוגית.',
          en: 'I have a degree in public services management from Finland with additional studies in pedagogical psychology.',
          sv: 'Jag har en finländsk examen i ledning av offentlig verksamhet med kompletterande studier i pedagogisk psykologi.',
          da: 'Jeg har en finsk uddannelse i ledelse af offentlige tjenester med supplerende studier i pædagogisk psykologi.',
        };
        for (const term of ['Eric Ariel Rimón', degree[locale], 'IBMI', '234']) {
          assert.ok(bio.includes(term), route + ' instructor profile missing ' + term);
        }
      }
      const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
      assert.ok(title?.trim(), route + ' title');
      assert.ok(!titles.has(title), route + ' title not unique within its locale');
      titles.add(title);
      assert.doesNotMatch(html, /__(?:PDF_[A-Z_]+|PHOTO_[A-Z_]+|COURSE_[A-Z_]+|SERVICE_[A-Z_]+|WORKFLOW_PLANNER_URL|SUNDAI_LOGO)__/, route);
      assert.doesNotMatch(html, /\son(?:click|load|error|mouseover)=|\sstyle=["']|<style\b/i, route + ' inline style/event');
      for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\b[^>]*>/gi)) {
        if (script[2].trim() && !/type=["']application\/ld\+json["']/i.test(script[1])) {
          assert.fail(route + ' executable inline script violates the site CSP');
        }
      }
      const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]));
      anchorCache.set(route, ids);
      if (section === 'intro-call') {
        assert.ok(ids.has('fc-native') && ids.has('request'), route + ' contact controls');
        assert.match(html, /action="\/api\/contact"/);
        assert.match(html, /<option value="training-partner" data-heading="[^"]+" data-outcome="[^"]+">[^<]+<\/option>/, route + ' localized training partnership');
        assert.match(html, /id="fc-partner"[^>]*hidden>[\s\S]*?<label for="fc-partner-brief">[^<]+<\/label><input id="fc-partner-brief"[^>]*maxlength="240"/, route + ' optional partner brief');
        assert.ok(hrefs(html).some(link => link.startsWith('mailto:eririmo@protonmail.com?')), route + ' email draft');
        assert.ok(hrefs(html).includes('https://sundaibot.com' + (locale === 'he' || locale === 'en' ? '/' : '/' + locale + '/') + 'book/'), route + ' existing online booking form');
        for (const topic of [...courseSlugs, ...serviceSlugs]) assert.ok(html.includes('value="' + topic + '"'), route + ' missing topic ' + topic);
      } else if (!section) {
        for (const id of ['schools','organisations','courses','evidence','sd-demo-school','sd-demo-governance','sd-demo-assistant']) {
          assert.ok(ids.has(id), route + ' missing section or interactive demo ' + id);
        }
        const schoolDemo = html.slice(html.indexOf('id="sd-demo-school"'), html.indexOf('id="sd-demo-governance"'));
        assert.match(schoolDemo, /src="\/assets\/brand-home\/balloon-source\.webp"/, route);
        assert.match(schoolDemo, /data-reveal-frame[^>]*aria-expanded="false"/, route);
        assert.doesNotMatch(schoolDemo, /data-offer|headphones|€/, route);
        const catalogue = html.match(/<section[^>]+id=["']organisations["'][^>]*>([\s\S]*?)<\/section>/i)?.[1];
        assert.ok(catalogue, route + ' missing organisation catalogue');
        for (const service of servicePages) {
          assert.ok(hrefs(catalogue).includes(routeFor(locale, 'services', service)), route + ' organisation card ' + service);
        }
        assert.ok(hrefs(html).includes(routeFor(locale,'read')), route + ' guide hub link');
        for (const [detailSection, detailSlug] of routes.filter(([section,pageSlug]) => ['courses','services'].includes(section) && pageSlug)) {
          // The Shopify pilot is linked from its automation parent.
          if (detailSlug === shopifyPilot) continue;
          const destination = routeFor(locale, detailSection, detailSlug);
          assert.ok(hrefs(html).includes(destination), route + ' missing detail navigation ' + destination);
        }
      } else if (section === 'read') {
        if (slug) {
          assert.ok(hrefs(html).includes(routeFor(locale,'read')), route + ' backlink to the guide hub');
        } else {
          for (const guideSlug of articleSlugs) assert.ok(hrefs(html).includes(routeFor(locale,'read',guideSlug)), route+' article '+guideSlug);
        }
        for (const other of languages) assert.ok(hrefs(html).includes(routeFor(other,'read',slug)));
      } else if (section === 'free-guides') {
        assert.match(html, /"@type":"BreadcrumbList"/);
        for (const lang of languages) assert.ok(hrefs(html).includes(routeFor(lang,section,slug)));
        if (slug && locale !== 'he') assert.match(html,/action="\/api\/leads"/);
        if (!slug) for (const id of legacyGuideSlugs) assert.ok(hrefs(html).includes(routeFor(locale,section,id)));
      } else if (section === 'services') {
        const layout = slug === shopifyPilot ? 'shopify-first-order' : 'services';
        assert.ok(hrefs(html).includes('/assets/brand-home/'+layout+'.css'), route + ' missing service layout');
        if (slug === shopifyPilot) {
          const parent = await readFile(publicFile(routeFor(locale, 'services', 'secure-ai-automation')), 'utf8');
          assert.ok(hrefs(main(parent)).includes(route), route + ' automation service link');
          const call = await readFile(publicFile(routeFor(locale, 'intro-call')), 'utf8');
          assert.ok(call.includes('value="'+slug+'"'), route + ' enquiry topic');
        }
        for (const lang of languages.filter(lang => lang !== locale)) {
          const destination = routeFor(lang, section, slug);
          assert.ok(hrefs(html).includes(destination), route + ' missing translated service ' + destination);
        }
        const serviceTopic = slug === workflowSlug ? parentService : slug;
        const intents = slug === 'compliance-ai-governance' ? ['readiness-review'] : [serviceTopic];
        for (const intent of intents) {
          assert.ok(hrefs(html).includes(routeFor(locale, 'intro-call') + '?topic=' + intent + '&via=service'), route + ' contextual service call for ' + intent);
        }
      } else {
        const pdf = '/assets/brand-home/' + pdfName(syllabusKeys[courseSlugs.indexOf(slug)], locale);
        assert.ok(hrefs(html).includes(pdf), route + ' incorrect syllabus');
        assert.ok(hrefs(html).includes(routeFor(locale, 'intro-call') + '?topic=' + slug + '&via=course'), route + ' contextual course call');
      }
      assert.equal([...html.matchAll(/src="\/assets\/framework-[^"]+\.svg"/g)].length, 5, route + ' framework symbols');
      for (const raw of hrefs(html)) {
        if (raw.startsWith('data:') || raw.startsWith('mailto:') || raw.startsWith('tel:')) continue;
        const url = new URL(raw, origin + route);
        if (url.origin !== origin || url.pathname.startsWith('/api/')) continue;
        await assert.doesNotReject(access(publicFile(decodeURIComponent(url.pathname))), route + ' missing ' + raw);
        if (url.hash && (url.pathname.endsWith('/') || url.pathname.endsWith('.html'))) {
          if (!anchorCache.has(url.pathname)) {
            const page = await readFile(publicFile(url.pathname), 'utf8');
            anchorCache.set(url.pathname, new Set([...page.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1])));
          }
          assert.ok(anchorCache.get(url.pathname).has(decodeURIComponent(url.hash.slice(1))), route + ' unknown target anchor ' + raw);
        }
      }
      if (locale === 'he') assert.match(html, /<html[^>]*dir=["']rtl["']/i, route);
    }
  }
});

test('the school pilot links to a local quote and printable worksheet in every language', async () => {
  const startingPrice = {en: 'From €99 per class', he: 'החל מ־99 אירו לכיתה', sv: 'Från 99 euro per klass', da: 'Fra 99 euro pr. klasse'};
  for (const lang of languages) {
    const youth = routeFor(lang, 'courses', 'youth');
    const home = await readFile(publicFile(routeFor(lang)), 'utf8');
    const banner = main(home).match(/<aside\b[^>]*class="fr-banner"[^>]*>([\s\S]*?)<\/aside>/)?.[1];
    assert.ok(banner && hrefs(banner).includes(youth + '#school-proposal'), lang + ' homepage class quote goes directly to its form');
    assert.match(banner, /90/, lang + ' pilot length before clicking');
    const course = main(await readFile(publicFile(youth), 'utf8'));
    const primary = course.match(/<a class="btn filled" href="#school-proposal">([^<]+)/);
    assert.match(primary?.[1] || '', /90/, lang + ' primary course action identifies the 90-minute offer');
    const quoteIntro = course.match(/id="school-proposal"[^>]*>([\s\S]*?)<form\b/)?.[1];
    assert.ok(quoteIntro?.includes(startingPrice[lang]), lang + ' price before the school quote form');
    assert.equal(course.split(startingPrice[lang]).length - 1, 1, lang + ' one price for the class pilot');
    assert.ok(!main(home).includes(startingPrice[lang]), lang + ' school price scoped to the pilot');
    const quote = course.match(/<form\b[^>]*id="school-proposal-form"[\s\S]*?<\/form>/)?.[0];
    assert.ok(quote?.includes('data-lang="' + lang + '"'), lang + ' form language');
    assert.match(quote, /action="\/api\/contact"/);
    assert.deepEqual([...quote.matchAll(/<(?:select|input)\b[^>]*\bname="([^"]+)"/g)].map(m => m[1]),
      ['organisation', 'email', 'grade', 'groupSize'], lang + ' four school fields');
    assert.match(quote, /name="groupSize"[^>]*min="1"[^>]*max="24"/);
    assert.match(course, /data-school-email href="mailto:/);
    const worksheet = '/assets/brand-home/SundAI_Class_Pilot_Worksheet_' + lang.toUpperCase() + '.pdf';
    assert.ok(hrefs(course).includes(worksheet), lang + ' worksheet link');
    assert.equal((await readFile(publicFile(worksheet))).toString('ascii', 0, 5), '%PDF-', lang + ' worksheet file');
    assert.ok(hrefs(course).includes('/assets/brand-home/' + pdfName('TeenTech', lang)), lang + ' full syllabus');
  }
});

test('providers can find their local partnership offer through the menu or a course and request a partnership call', async () => {
  for (const lang of languages) {
    const base = routeFor(lang);
    const home = await readFile(publicFile(base), 'utf8');
    const match = main(home).match(/<section\b[^>]*id="training-partners"[\s\S]*?<\/section>/);
    assert.ok(match, lang + ' public partner offer');
    assert.ok(hrefs(match[0]).includes(routeFor(lang, 'intro-call') + '?topic=training-partner&via=training-partners'));
    assert.equal(home.split('class="fr-entry" href="#training-partners"').length - 1, 2, lang + ' both menus');
    for (const course of courseSlugs) {
      const page = await readFile(publicFile(routeFor(lang, 'courses', course)), 'utf8');
      assert.ok(hrefs(main(page)).includes(base + '#training-partners'), lang + ' referral from ' + course);
    }
    const call = await readFile(publicFile(routeFor(lang, 'intro-call')), 'utf8');
    assert.match(call, /<option value="training-partner" data-heading="[^"]+" data-outcome="[^"]+"/);
  }
});

test('governance quotes are reachable and collect contact details in every language', async () => {
  for (const locale of languages) {
    const quote = routeFor(locale, 'governance-quote');
    for (const route of [routeFor(locale), routeFor(locale, 'services', 'compliance-ai-governance')]) {
      const page = await readFile(publicFile(route), 'utf8');
      assert.ok(hrefs(main(page)).includes(quote + '#request'), route + ' governance quote link');
      assert.doesNotMatch(page, /€\s*490\b|\b490\s*(?:€|EUR|euro|אירו)/i, route + ' retired price');
    }
    const page = await readFile(publicFile(quote), 'utf8');
    const content = main(page);
    assert.match(content, /id="request"/);
    assert.match(content, /<form\b[^>]*data-kind="enquiry"[^>]*data-accepted-copy="[^"]+"[^>]*action="\/api\/contact"/);
    assert.match(content, /<input\b[^>]*name="email"/);
    assert.match(content, /<button\b[^>]*type="submit"/);
  }
});

test('decision review offers link to an ungated worked memo and a contextual enquiry', async () => {
  for (const lang of languages) {
    const services = routeFor(lang, 'services', 'compliance-ai-governance');
    const pages = [[services, routeFor(lang, 'intro-call') + '?topic=decision-review&via=service']];
    if (lang !== 'he') pages.push([routeFor(lang, 'ai-decision-review'), '#review-request']);
    for (const [route, enquiry] of pages) {
      const page = await readFile(publicFile(route), 'utf8');
      assert.ok(hrefs(page).includes('#decision-memo'), route + ' sample link');
      assert.equal([...page.matchAll(/id="decision-memo"/g)].length, 1, route);
      const sample = page.match(/<section\b[^>]*id="decision-memo"[\s\S]*?<\/section>/)?.[0];
      assert.match(sample, /class="dm-verdict"/);
      assert.equal([...sample.matchAll(/<dt>/g)].length, 4, route + ' data, owner, stop and decision conditions');
      assert.doesNotMatch(sample, /<form\b|<details\b/);
      assert.ok(hrefs(sample).includes(enquiry), route + ' relevant next step');
    }
  }
});

test('agents service is reachable from both menus, its parent service and each translation', async () => {
  for (const lang of languages) {
    const route = routeFor(lang, 'services', workflowSlug);
    const parent = routeFor(lang, 'services', parentService);
    const page = await readFile(publicFile(route), 'utf8');
    const home = await readFile(publicFile(routeFor(lang)), 'utf8');
    const parentPage = await readFile(publicFile(parent), 'utf8');
    const menus = [...home.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/g)].map(match => match[1]);
    assert.equal(menus.filter(menu => menu.includes('class="fr-entry" href="'+route+'"')).length, 2, lang+' desktop and mobile service entries');
    assert.ok(hrefs(main(parentPage)).includes(route), lang+' contextual link from parent');
    assert.ok(hrefs(main(page)).includes(parent), lang+' contextual link to parent');
    assert.ok(hrefs(main(page)).includes(routeFor(lang,'read','secure-llm-deployment')), lang+' security guide');
    assert.ok(hrefs(main(page)).includes(routeFor(lang,'intro-call')+'?topic='+parentService+'&via=service'), lang+' booking with existing topic');
    for (const other of languages) {
      const translated = routeFor(other, 'services', workflowSlug);
      assert.ok(page.includes('href="'+translated+'" lang="'+other+'" hreflang="'+other+'"'), route+' language switch to '+other);
    }
  }
});

test('curricula PDFs retain the source bytes and existing services remain reachable', async () => {
  for (const name of languages.flatMap(locale => syllabusKeys.map(key => pdfName(key,locale)))) {
    const asset = path.join('assets/brand-home', name);
    const original = await readFile(path.join(repo, 'site', asset));
    const copy = await readFile(path.join(target, asset));
    assert.ok(copy.subarray(0, 5).equals(Buffer.from('%PDF-')), name);
    assert.equal(createHash('sha256').update(original).digest('hex'),
      createHash('sha256').update(copy).digest('hex'), name);
  }
  for (const route of ['/services/','/book/','/training/','/sv/tjanster/','/da/ydelser/']) {
    const updated = await readFile(publicFile(route), 'utf8');
    const original = await readFile(path.join(repo, 'site', route, 'index.html'), 'utf8');
    const originalMain = main(original);
    const updatedMain = main(updated);
    assert.match(updated, /class="fr-header"/, route);
    for (const match of originalMain.matchAll(/\b(?:id|action|name)="[^"]+"/g)) {
      assert.ok(updated.includes(match[0]), route+' lost '+match[0]);
    }
    const updatedLinks = hrefs(updatedMain);
    for (const destination of hrefs(originalMain)) {
      assert.ok(updatedLinks.includes(destination), route+' lost '+destination);
    }
    if (originalMain.includes('id="ai-assistants"')) {
      const lang = updated.match(/<html[^>]+lang="([^"]+)"/)[1];
      assert.ok(updatedLinks.includes(routeFor(lang,'services',workflowSlug)),route+' agent service entry');
    }
  }
  assert.match(await readFile(path.join(target,'robots.txt'), 'utf8'), /Disallow: \/\s*$/m);
  assert.match(await readFile(path.join(target,'_headers'), 'utf8'), /X-Robots-Tag: noindex, nofollow/);
  for (const route of ['/functions/api/contact.js','/tests/check-site.mjs','/wrangler.toml']) {
    await assert.rejects(access(publicFile(route)), {code:'ENOENT'}, route);
  }
});

test('redesign sitemap covers all discovery pages and each page has reciprocal language alternatives', async () => {
  const xml = await readFile(path.join(target,'sitemap-sundai.xml'),'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
  const routes = languages.flatMap(lang=>[
    routeFor(lang),trustRoutes[lang],routeFor(lang,'read'),routeFor(lang,'governance-quote'),
    routeFor(lang,'free-guides'),...legacyGuideSlugs.map(slug=>routeFor(lang,'free-guides',slug)),
    ...articleSlugs.map(slug=>routeFor(lang,'read',slug)),
    ...courseSlugs.map(slug=>routeFor(lang,'courses',slug)),
    ...[...servicePages,shopifyPilot].map(slug=>routeFor(lang,'services',slug))
  ]);
  assert.deepEqual(urls.slice().sort(),routes.map(route=>'https://sundaibot.com'+route).sort());
  assert.ok(urls.every(url=>!url.includes('intro-call')));
  for(const url of urls){
    const html = await readFile(publicFile(new URL(url).pathname),'utf8');
    assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
    assert.ok(html.includes('rel="canonical" href="'+url+'"'));
    const alternateLinks=[...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
    assert.deepEqual(alternateLinks.map(m=>m[1]).sort(),['da','en','he','sv','x-default']);
    for(const [,language,other] of alternateLinks){
      assert.ok(urls.includes(other));
      const translated = await readFile(publicFile(new URL(other).pathname),'utf8');
      assert.ok(translated.includes('href="'+url+'"'),language+' lacks return link');
    }
    assert.match(html,/<meta name="robots" content="noindex,follow">/);
    const entity=JSON.parse(html.match(/<script type="application\/ld\+json">([^<]*)<\/script>/)[1]);
    assert.equal(entity.url,url);
  }
});

async function verifyFrameworkDestinations(output) {
  const frameworkIds = ['soc2','iso27001','iso42001','gdpr','eu-ai-act'];
  const trustDocuments = new Map();
  for (const [lang, route] of Object.entries(trustRoutes)) {
    const html = await readFile(path.join(output,route,'index.html'),'utf8');
    assert.match(html, new RegExp('<html[^>]+lang="'+lang+'"'), route);
    assert.ok(html.includes('rel="canonical" href="https://sundaibot.com'+route+'"'), route+' canonical URL');
    const article = main(html);
    for (const id of frameworkIds) assert.ok(article.includes('id="framework-'+id+'"'),route+' section '+id);
    trustDocuments.set(lang,route);
  }
  const htmlFiles = (await readdir(output,{recursive:true})).filter(file=>file.endsWith('.html'));
  for (const file of htmlFiles) {
    const html = await readFile(path.join(output,file),'utf8');
    const lang = html.match(/<html\b[^>]*\blang="([^"]+)"/i)?.[1];
    const trustRoute = trustDocuments.get(lang);
    assert.ok(trustRoute, file+' page language');
    assert.match(html, /<header\b[^>]*\bclass="fr-header"/, file+' branded navigation');
    const footer = html.match(/<footer\b[^>]*\bclass="fr-footer"[^>]*>([\s\S]*?)<\/footer>/i)?.[1];
    assert.ok(footer,file+' branded footer');
    const strip = footer.match(/<section\b[^>]*\bclass="fr-frameworks"[^>]*>([\s\S]*?)<\/section>/i)?.[1];
    assert.ok(strip,file+' frameworks section');
    const links = new Map();
    for (const [,attrs,body] of strip.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
      const id = body.match(/src="\/assets\/framework-([^"]+)\.svg"/)?.[1];
      const href = attrs.match(/\bhref="([^"]+)"/)?.[1];
      assert.ok(id && href,file+' linked framework emblem');
      links.set(id,new URL(href,'https://sundaibot.com/'+file).href);
    }
    assert.equal(links.size,frameworkIds.length,file+' different frameworks');
    for (const id of frameworkIds) {
      assert.equal(links.get(id),'https://sundaibot.com'+trustRoute+'#framework-'+id,file+' '+id);
    }
  }
}

test('public pages use localized trust links and publish discoverable guides and agent services', async () => {
  await buildReferencePreview(true);
  const output = path.join(repo,'dist/brand-public');
  await verifyFrameworkDestinations(output);
  const publicPage = route => readFile(path.join(output,route,'index.html'),'utf8');
  const canonical = route => new URL(route,'https://sundaibot.com').href;
  const nodes = html => [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(match=>JSON.parse(match[1]));
  const directory = JSON.parse(await readFile(path.join(output,'discovery.json'),'utf8'));
  const llms = await readFile(path.join(output,'llms.txt'),'utf8');
  const robots = await readFile(path.join(repo,'site/robots.txt'),'utf8');
  const publicRobots = await readFile(path.join(output,'robots.txt'),'utf8');
  assert.ok(publicRobots.startsWith(robots.trimEnd()), 'existing crawler policies and sitemap declarations');
  assert.match(publicRobots,/^Sitemap: https:\/\/sundaibot\.com\/sitemap-sundai\.xml$/m);
  for (const lang of languages) {
    const home = main(await publicPage(routeFor(lang)));
    const article = home.match(/<article class="pc-service [^"]*">[\s\S]*?<\/article>/g)?.find(card => hrefs(card).includes(routeFor(lang,'services','secure-ai-automation')));
    assert.ok(article?.includes('Ariel’s Pizza') && article.includes('WhatsApp'), lang + ' evidence inside the automation card');
    const caseLink = article.match(/<a\b[^>]*href="([^"]*ariels-pizza\/)"[^>]*>(.*?)<\/a>/s);
    assert.ok(caseLink, lang + ' direct case link inside the card');
    const expectedLang = lang === 'he' ? 'en' : lang;
    const casePath = new URL(caseLink[1], canonical('/')).pathname;
    const evidence = home.match(/<section\b[^>]*id="evidence"[\s\S]*?<\/section>/)?.[0];
    const fullCaseLink = evidence?.match(/<a\b[^>]*href="([^"]*ariels-pizza\/)"[^>]*>([\s\S]*?)<\/a>/);
    assert.ok(fullCaseLink && new URL(fullCaseLink[1], canonical('/')).pathname === casePath, lang + ' full case link matches early evidence');
    const casePage = await publicPage(casePath);
    assert.match(casePage, new RegExp('<html[^>]*lang="' + expectedLang + '"'), lang + ' case study destination language');
    const planner = home.match(/<a\b[^>]*href="([^"]*#planner)"[^>]*>([\s\S]*?)<\/a>/);
    assert.ok(planner, lang + ' workflow planner link');
    const plannerPage = await publicPage(new URL(planner[1], canonical('/')).pathname);
    assert.match(plannerPage, /<[^>]*id="planner"[^>]*data-service-planner/, lang + ' direct link to interactive controls');
    assert.match(plannerPage, new RegExp('<html[^>]*lang="' + expectedLang + '"'), lang + ' planner destination language');
    if (lang === 'he') {
      const englishNotice = /(?:^|>)[^<>]*\(באנגלית\)[^<>]*(?:<|$)/;
      assert.match(caseLink[2], englishNotice, 'Hebrew case link identifies English content');
      assert.match(fullCaseLink[2], englishNotice, 'Hebrew full case link identifies English content');
      assert.match(planner[2], englishNotice, 'Hebrew planner link identifies English content');
    }
    const hub = routeFor(lang,'read');
    const serviceRoute = routeFor(lang,'services',workflowSlug);
    const serviceUrl = canonical(serviceRoute);
    const serviceHtml = await publicPage(serviceRoute);
    const service = nodes(serviceHtml).find(node => node['@type'] === 'Service');
    assert.equal(service.url, serviceUrl);
    assert.equal(service.provider.name, 'SundAI');
    assert.equal(service.mainEntityOfPage['@id'], serviceUrl);
    assert.equal(service.mainEntityOfPage.inLanguage, lang);
    assert.match(serviceHtml, /<meta name="robots" content="index,follow">/);
    const parent = directory.services.find(item => item.id === parentService);
    const detail = parent.relatedPages.find(item => item.id === workflowSlug);
    assert.equal(detail.locales[lang].url, serviceUrl);
    assert.ok(llms.includes(serviceUrl), lang+' agents service in plain-text directory');
    const entries = directory.practicalGuides[lang];
    assert.equal(entries.hub,canonical(hub));
    assert.ok(llms.includes(entries.hub));
    const hubHtml = await publicPage(hub);
    const feed = await readFile(path.join(output,hub,'feed.xml'),'utf8');
    assert.ok(hubHtml.includes('type="application/rss+xml"') && hubHtml.includes('href="'+canonical(hub)+'feed.xml"'));
    assert.ok(feed.includes('<language>'+lang+'</language>'));
    const feedUrls = [...feed.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g)].map(match=>match[1]);
    assert.deepEqual(feedUrls.sort(),guides.map(guide=>canonical(routeFor(lang,'read',guide.slug))).sort());
    assert.deepEqual(await readFile(path.join(target,hub,'feed.xml'),'utf8'),feed);

    assert.ok(nodes(hubHtml).some(node=>node['@type']==='CollectionPage' && node.url===entries.hub));
    assert.match(hubHtml,/<meta name="robots" content="index,follow">/);
    for (const guide of guides) {
      const route = routeFor(lang,'read',guide.slug);
      const url = canonical(route);
      const html = await publicPage(route);
      const schemas = nodes(html);
      const article = schemas.find(node=>node['@type']==='Article');
      const trail = schemas.find(node=>node['@type']==='BreadcrumbList');
      assert.equal(article.headline,guide.text[lang].title,route);
      assert.equal(article.inLanguage,lang,route);
      assert.equal(article.mainEntityOfPage,url,route);
      assert.equal(article.author.name,'SundAI',route);
      assert.equal(article.datePublished,html.match(/<time\b[^>]*datetime="([^"]+)"/)?.[1],route);
      assert.deepEqual(trail.itemListElement.map(item=>item.item),[canonical(routeFor(lang)),entries.hub,url],route);
      assert.ok(entries.articles.some(entry=>entry.url===url && entry.title===article.headline),route);
      assert.ok(llms.includes(url), route+' missing from plain-text directory');
      assert.match(html,/<meta name="robots" content="index,follow">/);
      if (guide.sectionSources) {
        assert.equal(article.datePublished, guide.published, route);
        assert.ok(hrefs(hubHtml).includes(route+'#work-tool'),route+' missing tool shortcut');
        assert.ok(hrefs(main(html)).includes('#work-tool'),route+' missing article shortcut');
        assert.match(html,/id="work-tool"/);
        assert.ok(html.includes('/assets/brand-home/editorial-tools.js'),route);
        assert.ok(hrefs(main(html)).includes(routeFor(lang,'intro-call')+'?topic=secure-ai-automation&via='+guide.slug),route);
        for (const index of guide.sectionSources.flat()) {
          assert.ok(guide.sources[index] && hrefs(main(html)).includes('#reference-'+(index+1)),route+' missing inline source');
          assert.ok(html.includes('id="reference-'+(index+1)+'"'),route+' missing reference target');
        }
      }
      for (const {url:source} of guide.sources) assert.ok(hrefs(html).includes(source),route+' missing reference '+source);
    }
    assert.match(await publicPage(routeFor(lang,'intro-call')),/<meta name="robots" content="noindex,follow">/);
  }
});

test('the library exposes each retained guide at its established URL in the current design', async () => {
  for (const lang of languages) {
    const directory = await readFile(publicFile(routeFor(lang,'read')), 'utf8');
    const archive = archiveLibrary(lang);
    const resources = resourceLibrary(lang);
    const retained = [archive.index, resources.index, ...archive.articles.map(item => item.url), ...resources.items.map(item => item.url)];
    for (const url of retained) {
      assert.ok(hrefs(directory).includes(url), 'directory missing ' + url);
      const page = await readFile(publicFile(url), 'utf8');
      const source = await readFile(path.join(repo, 'site', url, url.endsWith('/') ? 'index.html' : ''), 'utf8');
      assert.match(page, /class="fr-header"/);
      assert.match(page, /class="fr-frameworks"/);
      assert.ok(page.includes('rel="canonical" href="https://sundaibot.com' + url + '"'));
      for (const link of hrefs(main(source))) {
        assert.ok(hrefs(main(page)).includes(link), url + ' lost original content link ' + link);
      }
    }
    const flagship = await readFile(publicFile(routeFor(lang, 'read', 'secure-llm-deployment')), 'utf8');
    assert.ok(hrefs(directory).includes(routeFor(lang, 'read', 'secure-llm-deployment')));
    assert.match(flagship, /class="kn-checks"/);
    assert.ok(hrefs(flagship).includes(routeFor(lang, 'intro-call') + '?topic=decision-review&via=article'));
  }
});

test('secure AI adoption headline and editorial series stay localised and actionable', async () => {
  const first = {en:'Secure AI Adoption.',he:'הטמעת AI מאובטחת.',sv:'Säker AI-implementering.',da:'Sikker AI-implementering.'};
  const second = {en:'AI Workshops.',he:'סדנאות AI לכיתה.',sv:'AI-kurser i skolan.',da:'AI-kurser til skoler.'};
  const principle = {en:'Compliance first. AI second.',he:'קודם דרישות ובקרות. אחר כך AI.',sv:'Kraven först. AI sedan.',da:'Kravene først. AI bagefter.'};
  const trust = {en:'/trust/',he:'/he/trust/',sv:'/sv/tillit/',da:'/da/tillid/'};
  const topics = {
    'ai-token-waste-architecture-audit':'secure-ai-automation',
    'ai-headcount-savings-realised-value':'secure-ai-automation',
    'secure-ai-adoption-release-gates':'decision-review',
    'secure-ai-adoption-team-handoffs':'secure-ai-automation'
  };
  assert.equal(new Set(articleSlugs).size,articleSlugs.length);
  for (const lang of languages) {
    const home = await readFile(publicFile(routeFor(lang)), 'utf8');
    const title = home.match(/<h1 class="fr-title" id="fr-title">([\s\S]*?)<\/h1>/)?.[1];
    assert.ok(title?.includes('<span class="fr-line">'+first[lang]+'</span> <span class="fr-line">'), lang+' headline and separating space');
    assert.ok(title.includes(second[lang]), lang+' retains workshop headline');
    const hero = home.match(/<section class="fr-landing"[\s\S]*?<\/section>/)?.[0];
    assert.ok(hero?.includes(`<p class="fr-principle">${principle[lang]}</p><h1`), lang+' places the principle above the offer');
    assert.ok(hrefs(hero).includes(routeFor(lang,'services','secure-ai-automation')), lang+' links to automation');
    assert.ok(hrefs(hero).includes('#schools'), lang+' links to workshops');
    assert.ok(hrefs(hero).includes(trust[lang]+'#before-launch'), lang+' links to project evidence');
    const evidencePage = await readFile(publicFile(trust[lang]), 'utf8');
    assert.match(evidencePage, /id="before-launch" aria-labelledby="before-launch-title"/);
    const hub = await readFile(publicFile(routeFor(lang,'read')), 'utf8');
    for (const [slug, topic] of Object.entries(topics)) {
      const route = routeFor(lang,'read',slug);
      assert.ok(hrefs(hub).includes(route), route+' library link');
      const article = await readFile(publicFile(route), 'utf8');
      assert.ok(hrefs(main(article)).includes(routeFor(lang,'intro-call')+'?topic='+topic+'&via='+slug),route+' consultation link');
      assert.match(article, /datetime="2026-11-25"/);
      assert.ok(main(article).includes('ISO/IEC') && main(article).includes('42001'),route+' standards');
      const guide=guides.find(item=>item.slug===slug);
      assert.equal(guide.text[lang].sections.length,5);
      assert.ok(guide.text[lang].exercise);
      for(const source of guide.sources) assert.ok(hrefs(main(article)).includes(source.url),route+' source '+source.url);
    }
  }
});
