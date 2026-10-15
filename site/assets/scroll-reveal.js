/* Scroll-triggered motion with visible-by-default HTML and native scrolling. */
(() => {
  'use strict';
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const small = window.matchMedia('(max-width:600px)');
  const groups = '.grid,.service-list,.process-grid,.growth-grid,.guide-library-grid,.why-reasons,.why-layout,.guide-promo-layout,.split,.hero-grid';
  const excluded = 'form,.testimonial-controls,.mobile-workflow,details,.authority-table-wrap,.table-wrap';
  const targets = new Set(), seen = new Set(), running = new Map();
  let observer;

  function collect(node, depth = 0) {
    if (node.matches(excluded) || node.querySelector('form') || node.hidden) return;
    if (depth < 3 && node.matches(groups)) {
      [...node.children].forEach(child => collect(child, depth + 1));
    } else if (node.textContent.trim() || node.querySelector('img,svg')) targets.add(node);
  }
  document.querySelectorAll('main > section').forEach(section => {
    const container = section.querySelector(':scope > .container');
    if (container) [...container.children].forEach(node => collect(node));
  });

  function finish(node) {
    const animation = running.get(node);
    if (animation) { animation.cancel(); running.delete(node); }
    seen.add(node);
    node.dataset.motionState = 'done';
    observer?.unobserve(node);
  }
  function finishAll() {
    observer?.disconnect();
    targets.forEach(finish);
  }
  function start() {
    if (reduced.matches) return;
    observer = new IntersectionObserver(entries => {
      let order = 0;
      for (const entry of entries) {
        const node = entry.target;
        if (!entry.isIntersecting || seen.has(node)) continue;
        observer.unobserve(node);
        seen.add(node);
        const rect = node.getBoundingClientRect();
        // Restored scroll positions, anchor targets and focused controls stay immediately legible.
        if (rect.bottom <= 0 || node.contains(document.activeElement) || document.hidden || reduced.matches) { finish(node); continue; }
        const base = getComputedStyle(node).transform;
        const offset = small.matches ? 14 : 28;
        const transform = base === 'none' ? '' : ` ${base}`;
        const animation = node.animate([
          {opacity:0,transform:`translateY(${offset}px)${transform}`},
          {opacity:1,transform:base}
        ], {duration:small.matches?460:680,delay:Math.min(order++,3)*(small.matches?45:70),easing:'cubic-bezier(.22,.61,.36,1)',fill:'backwards'});
        running.set(node,animation);
        node.dataset.motionState = 'running';
        animation.finished.then(() => finish(node), () => finish(node));
      }
    }, {threshold:0,rootMargin:'0px 0px -28px 0px'});
    targets.forEach(node => {
      if (seen.has(node)) return;
      const rect = node.getBoundingClientRect();
      // Never fade content the visitor is already reading when the script loads.
      if (rect.top < window.innerHeight - 28 || rect.width === 0 || rect.height === 0) finish(node);
      else { node.dataset.motionState = 'pending'; observer.observe(node); }
    });
  }
  document.addEventListener('focusin', event => {
    targets.forEach(node => { if (node.contains(event.target)) finish(node); });
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) [...running.keys()].forEach(finish); });
  window.addEventListener('beforeprint', finishAll);
  reduced.addEventListener('change', () => { if (reduced.matches) finishAll(); else start(); });
  if (!reduced.matches) start();
})();
