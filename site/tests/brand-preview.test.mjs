import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {access, readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {articleSlugs, guides} from '../../scripts/brand-home/knowledge-data.mjs';
import {buildReferencePreview} from '../../scripts/build-brand-preview.mjs';

const repo = path.resolve(import.meta.dirname, '../..');
const target = path.join(repo, 'dist/reference-preview');
const origin = 'https://preview.invalid';
const languages = ['en','he','sv','da'];
const courseSlugs = ['youth','teachers','hospital','public'];
const serviceSlugs = ['compliance-ai-governance','cloud-security','secure-ai-automation','private-ai-agents-rag'];
const syllabusKeys = ['TeenTech','Teacher','Hospital','PublicConsultation'];
const pdfName = (key, locale) => 'SundAI_' + key + '_Syllabus_' + locale.toUpperCase() + '.pdf';

function hrefs(html) {
  return [...html.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/gi)]
    .map(match => match[1].replaceAll('&amp;', '&'));
}
function routeFor(locale, section = '', slug = '') {
  const base = locale === 'en' ? '/' : '/' + locale + '/';
  return section ? base + section + '/' + (slug ? slug + '/' : '') : base;
}
function publicFile(route) {
  const file = route.endsWith('/') ? route + 'index.html' : route;
  return path.join(target, file);
}

test('rendered pages use their requested language and have working local links', async () => {
  const anchorCache = new Map();
  for (const locale of languages) {
    const titles = new Set();
    const routes = [
      ['',''], ['intro-call',''], ['read',''], ...articleSlugs.map(slug=>['read',slug]),
      ...courseSlugs.map(slug => ['courses', slug]),
      ...serviceSlugs.map(slug => ['services', slug])
    ];
    for (const [section, slug] of routes) {
      const route = routeFor(locale, section, slug);
      const html = await readFile(publicFile(route), 'utf8');
      assert.match(html, new RegExp('<html[^>]+lang=["\']' + locale + '["\']'), route);
      assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, route + ' heading');
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
        for (const service of serviceSlugs) {
          assert.ok(hrefs(catalogue).includes(routeFor(locale, 'services', service)), route + ' organisation card ' + service);
        }
        assert.ok(hrefs(html).includes(routeFor(locale,'read')), route + ' guide hub link');
        for (const [detailSection, detailSlug] of routes.filter(([section,pageSlug]) => section!=='read' && pageSlug)) {
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
      } else if (section === 'services') {
        assert.ok(hrefs(html).includes('/assets/brand-home/services.css'), route + ' missing service layout');
        for (const lang of languages.filter(lang => lang !== locale)) {
          const destination = routeFor(lang, section, slug);
          assert.ok(hrefs(html).includes(destination), route + ' missing translated service ' + destination);
        }
        const intents = slug === 'compliance-ai-governance' ? ['decision-review','readiness-review'] : [slug];
        for (const intent of intents) {
          assert.ok(hrefs(html).includes(routeFor(locale, 'intro-call') + '?topic=' + intent + '&via=service'), route + ' contextual service call for ' + intent);
        }
      } else {
        const pdf = '/assets/brand-home/' + pdfName(syllabusKeys[courseSlugs.indexOf(slug)], locale);
        assert.ok(hrefs(html).includes(pdf), route + ' incorrect syllabus');
        assert.ok(hrefs(html).includes(routeFor(locale, 'intro-call') + '?topic=' + slug + '&via=course'), route + ' contextual course call');
      }
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
    assert.equal(await readFile(publicFile(route), 'utf8'), await readFile(path.join(repo, 'site', route, 'index.html'), 'utf8'), route);
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
    routeFor(lang),routeFor(lang,'read'),
    ...articleSlugs.map(slug=>routeFor(lang,'read',slug)),
    ...courseSlugs.map(slug=>routeFor(lang,'courses',slug)),
    ...serviceSlugs.map(slug=>routeFor(lang,'services',slug))
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

test('public guides have discoverable canonical pages, source links and accurate article metadata', async () => {
  await buildReferencePreview(true);
  const output = path.join(repo,'dist/brand-public');
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
    const hub = routeFor(lang,'read');
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
      for (const {url:source} of guide.sources) assert.ok(hrefs(html).includes(source),route+' missing reference '+source);
    }
    assert.match(await publicPage(routeFor(lang,'intro-call')),/<meta name="robots" content="noindex,follow">/);
  }
});
