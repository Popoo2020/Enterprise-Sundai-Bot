import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {decorateInsights,isInsightsUrl} from '../../scripts/insights-layout.mjs';

const fixture=heading=>`<section class="guide-hero"><h1>Guide</h1></section><div class="guide-shell guide-layout"><article class="guide-body"><h2>${heading}</h2><p>Preserved source text.</p></article><aside class="guide-aside"><p>Project information.</p></aside></div>`;

test('navigation labels reject unexpected markup instead of partially removing it',()=>{
 for(const value of ['<script>alert(1)</script>','<SCRIPT>alert(1)</SCRIPT>','<img src=x onerror=alert(1)>','unfinished <script'])assert.throws(()=>decorateInsights(fixture(value),'en','/insights/example.html'),/plain encoded text/);
});

test('nested entities remain literal and label decoding occurs only once',()=>{
 const html=decorateInsights(fixture('Read &amp;quot; and &amp;#39; literally'),'en','/insights/example.html');
 assert.equal((html.match(/Read &amp;quot; and &amp;#39; literally/g)||[]).length,3);
 assert(!html.includes('Read &quot; and &#39; literally'));
 assert(html.includes('Preserved source text.'));
});

test('all retained Insights article text, references and generated anchors survive decoration',async()=>{
 const retained=JSON.parse(await readFile(new URL('../../scripts/retained-content.json',import.meta.url),'utf8'));
 const text=html=>html.replace(/<[^>]*>/g,' ').replace(/\s*·\s*/g,' ').replace(/\s+/g,' ').trim();
 let checked=0;
 for(const [file,source]of Object.entries(retained)){
  const url='/'+file.replace(/index\.html$/,'');if(!isInsightsUrl(url))continue;checked++;
  const lang=source.match(/<html[^>]*lang="([^"]+)"/)[1],main=source.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  const html=decorateInsights(main,lang,url),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(new Set(ids).size,ids.length,file+': duplicate IDs');
  for(const [,id]of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(id),file+': absent anchor');
  for(const [,href]of main.matchAll(/href="(https?:[^"\s]+)"/g))assert(html.includes(href),file+': lost reference');
  if(main.includes('class="guide-body"'))assert.equal(text(html.match(/<article class="guide-body">([\s\S]*?)<\/article>/)[1]),text(main.match(/<article class="guide-body">([\s\S]*?)<\/article>/)[1]),file+': article text changed');
 }
 assert.equal(checked,39);
});
