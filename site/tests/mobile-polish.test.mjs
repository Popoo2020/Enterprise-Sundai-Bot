import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mobileDecorations} from '../../scripts/mobile-polish.mjs';

test('mobile decoration preserves desktop text, attributes and structured data',()=>{
 const head='<head><script type="application/ld+json">{"name":"A → B"}</script></head>';
 const input=head+'<body><a href="/book/?next=A→B" title="value > limit">Talk ↗</a><span aria-hidden="true">↗</span><p>Input → output</p></body>';
 const html=mobileDecorations(input);
 assert(html.startsWith(head));
 assert(html.includes('href="/book/?next=A→B" title="value > limit"'));
 assert(html.includes('Talk <span class="mobile-decoration">↗</span>'));
 assert(html.includes('<span aria-hidden="true" class="mobile-decoration">↗</span>'));
 assert(html.includes('<p>Input → output</p>'));
 assert.equal(html.replace(/<[^>]*>/g,''),input.replace(/<[^>]*>/g,''));
});

test('code, raw text and comments are retained without decorative wrapping',()=>{
 const content='<pre><span>↗</span></pre><code>A → B</code><textarea>Next ↗</textarea><script>const x="Next ↗";</script><!-- Next ↗ -->';
 assert.equal(mobileDecorations('<body>'+content+'</body>'),'<body>'+content+'</body>');
});

test('decoration is stable across rebuilds and handles all navigation arrow variants',()=>{
 const input='<body><a>← Back</a><button>Send ➜</button><a>More ➡️</a><span class="icon">↗</span></body>';
 const decorated=mobileDecorations(input);
 assert.equal((decorated.match(/mobile-decoration/g)||[]).length,4);
 assert.equal(mobileDecorations(decorated),decorated);
});
