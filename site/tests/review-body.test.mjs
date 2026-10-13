import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {reviewBody} from '../../scripts/review-body.mjs';

test('review exports reject scripts instead of partially stripping them',()=>{
 for(const attack of ['<script>alert(1)</script>','<SCRIPT SRC="x"></SCRIPT>','<ScRiPt>alert(1)</sCrIpT>','<script src="x">','<scr<script>ipt>alert(1)</scr</script>ipt>']){
  assert.throws(()=>reviewBody(`<body>${attack}</body>`,'fixture'),/Scripts are not allowed/);
 }
 assert.throws(()=>reviewBody('<head>no body</head>','fixture'),/Missing review body/);
 assert.throws(()=>reviewBody('<body><img ONERROR="alert(1)"></body>','fixture'),/Inline code is not allowed/);
 assert.throws(()=>reviewBody('<body><a href="JavaScript:alert(1)">link</a></body>','fixture'),/Inline code is not allowed/);
 assert.equal(reviewBody('<head><script src="client.js"></script></head><body><main>Trusted compiled page</main></body>','fixture'),'<main>Trusted compiled page</main>');
});

test('all current compiled pages meet the script-free review contract',async()=>{
 const root=path.resolve(import.meta.dirname,'../..');
 const {generated}=JSON.parse(await readFile(path.join(root,'docs/upgrade-route-map.json'),'utf8'));
 assert.equal(generated.length,156);
 for(const route of generated){
  const html=await readFile(path.join(root,'site',route.endsWith('/')?route+'index.html':route),'utf8');
  const body=reviewBody(html,route);
  assert(body.includes('<main'));
  assert.equal(body,html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1]);
 }
});
