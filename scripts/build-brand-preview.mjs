import { optimisePage, sitemap } from './brand-home/seo.mjs';
import {cp, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';

const repository = path.resolve(import.meta.dirname, '..');
const site = path.join(repository, 'site');
const dist = path.join(repository, 'dist');
const source = path.join(import.meta.dirname, 'brand-home');

async function copyPublicSite(target) {
  const exclude = (await readFile(path.join(site, '.assetsignore'), 'utf8'))
    .split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'));

  await cp(site, target, {
    recursive: true,
    filter(file) {
      const rel = path.relative(site, file).split(path.sep).join('/');
      return !exclude.some(pattern =>
        path.matchesGlob(rel, pattern) || path.matchesGlob(rel + '/', pattern));
    }
  });
}

async function writePage(target, route, html, isPublic, routes) {
  const directory = path.join(target, route);
  await mkdir(directory, {recursive: true});
  routes.push(route);
  await writeFile(path.join(directory, 'index.html'), optimisePage(html, route, isPublic));
}

export async function buildReferencePreview(isPublic = false) {
  const output = path.join(dist, isPublic ? 'brand-public' : 'reference-preview');
  const routes = [];
  const {renderArticle} = await import('./brand-home/knowledge.mjs');
  const {articleSlugs} = await import('./brand-home/knowledge-data.mjs');
  const {renderCallPage} = await import('./brand-home/call-page.mjs');
  const {renderHome} = await import('./brand-home/render.mjs');
  const {renderCourse, courseSlugs} = await import('./brand-home/courses.mjs');
  const {renderService, serviceSlugs} = await import('./brand-home/services.mjs');

  await mkdir(dist, {recursive: true});
  const staging = await mkdtemp(path.join(dist, '.reference-preview-'));
  try {
    await copyPublicSite(staging);
    const assetDir = path.join(staging, 'assets', 'brand-home');
    await mkdir(assetDir, {recursive: true});
    for (const entry of await readdir(source, {withFileTypes: true})) {
      if (entry.isFile() && ['.css', '.js'].includes(path.extname(entry.name))) {
        await cp(path.join(source, entry.name), path.join(assetDir, entry.name));
      }
    }

    for (const locale of ['en', 'he', 'sv', 'da']) {
      const prefix = locale === 'en' ? '' : locale;
      await writePage(staging, prefix, await renderHome(locale), isPublic, routes);
      await writePage(staging, path.join(prefix, 'intro-call'), renderCallPage(locale), isPublic, routes);
      for (const slug of articleSlugs) await writePage(staging, path.join(prefix,'read',slug), renderArticle(locale,slug), isPublic, routes);
      for (const slug of serviceSlugs) {
        let html = renderService(locale, slug, isPublic);
        if (isPublic && locale === 'en') {
          // Preserve the original interactive planner and proposal form at launch.
          const localPath = 'tools/project-brief/' + slug + '/';
          const original = await readFile(path.join(site,'services',slug,'index.html'),'utf8');
          const copy = original.replace(/<meta name="robots"[^>]*>/gi,'').replace('</head>','<meta name="robots" content="noindex,follow"></head>');
          await mkdir(path.join(staging,localPath),{recursive:true});
          await writeFile(path.join(staging,localPath,'index.html'),copy);
          const links = '<nav class="os-wrap" aria-label="Plan your project"><p id="planner"><a href="/'+localPath+'#planner">Open the interactive project planner</a></p><p id="proposal"><a href="/'+localPath+'#proposal">Request a written proposal</a></p></nav>';
          html = html.replace('</main>',links+'</main>');
        }
        await writePage(staging, path.join(prefix, 'services', slug), html, isPublic, routes);
      }
      for (const slug of courseSlugs) {
        await writePage(staging, path.join(prefix, 'courses', slug), await renderCourse(locale, slug), isPublic, routes);
      }
    }

    await writeFile(path.join(staging,'sitemap-sundai.xml'), sitemap(routes));
    if (isPublic) {
      const robots = await readFile(path.join(staging,'robots.txt'),'utf8');
      await writeFile(path.join(staging,'robots.txt'), robots.trimEnd()+'\nSitemap: https://sundaibot.com/sitemap-sundai.xml\n');
    } else {
      await writeFile(path.join(staging, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
      const headers = await readFile(path.join(staging, '_headers'), 'utf8');
      await writeFile(path.join(staging, '_headers'), headers.replace(/^\/\*\s*$/m,'/*\n  X-Robots-Tag: noindex, nofollow'));
    }

    await rm(output, {recursive: true, force: true});
    await rename(staging, output);
  } finally {
    await rm(staging, {recursive: true, force: true});
  }
  console.log('SundAI build: ' + path.relative(repository, output));
}
