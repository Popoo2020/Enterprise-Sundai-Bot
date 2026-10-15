/* Progressive enhancement: every quote is readable when JavaScript is absent. */
(() => {
  'use strict';
  const dwell = 24000;
  const duration = 500;
  document.querySelectorAll('[data-testimonials]').forEach(root => {
    const slides = [...root.querySelectorAll('[data-testimonial]')];
    const controls = root.querySelector('.testimonial-controls');
    const toggle = root.querySelector('[data-testimonial-toggle]');
    const counter = root.querySelector('.testimonial-counter');
    const status = root.querySelector('.testimonial-status');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (slides.length < 2 || !controls || !toggle) return;
    let index = 0, timer = null, paused = motion.matches, visible = false;
    let hovered = false, focused = false, explicitPlay = false, moving = false;
    let animations = [];

    function schedule() {
      clearTimeout(timer);
      timer = null;
      toggle.textContent = motion.matches ? root.dataset.reducedLabel : paused ? root.dataset.playLabel : root.dataset.pauseLabel;
      toggle.disabled = motion.matches;
      if (!paused && !motion.matches && visible && !document.hidden && !hovered && (!focused || explicitPlay) && !moving) {
        timer = setTimeout(() => go(1, false), dwell);
      }
    }
    function markCurrent() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-current', i === index);
        slide.setAttribute('aria-hidden', String(i !== index));
        slide.inert = i !== index;
      });
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
    function go(direction, manual) {
      if (manual) { paused = true; explicitPlay = false; }
      if (moving) { schedule(); return; }
      const previous = slides[index];
      index = (index + direction + slides.length) % slides.length;
      const current = slides[index];
      markCurrent();
      if (manual) status.textContent = `${current.dataset.slideDescription} ${current.dataset.slideLabel}`;
      if (!motion.matches && typeof current.animate === 'function') {
        moving = true;
        previous.classList.add('is-leaving');
        const options = {duration, easing:'cubic-bezier(.22,.61,.36,1)'};
        animations = [
          previous.animate([{transform:'translateX(0)'},{transform:`translateX(${-direction * 100}%)`}], options),
          current.animate([{transform:`translateX(${direction * 100}%)`},{transform:'translateX(0)'}], options)
        ];
        Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
          previous.classList.remove('is-leaving');
          animations = [];
          moving = false;
          schedule();
        });
      }
      schedule();
    }
    slides.forEach(slide => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', slide.dataset.slideDescription);
      slide.setAttribute('aria-label', slide.dataset.slideLabel);
    });
    root.setAttribute('aria-roledescription', root.dataset.carouselLabel);
    markCurrent();
    root.classList.add('is-enhanced');
    controls.hidden = false;
    root.querySelector('[data-testimonial-prev]').addEventListener('click', () => go(-1, true));
    root.querySelector('[data-testimonial-next]').addEventListener('click', () => go(1, true));
    toggle.addEventListener('click', () => {
      if (motion.matches) return;
      paused = !paused;
      explicitPlay = !paused;
      schedule();
    });
    root.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; schedule(); } });
    root.addEventListener('pointerleave', () => { hovered = false; schedule(); });
    root.addEventListener('focusin', event => {
      focused = true;
      explicitPlay = false;
      if (event.target !== toggle) paused = true;
      schedule();
    });
    root.addEventListener('focusout', event => {
      if (!root.contains(event.relatedTarget)) { focused = false; explicitPlay = false; schedule(); }
    });
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', () => {
      if (motion.matches) { paused = true; animations.forEach(animation => animation.cancel()); }
      schedule();
    });
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.25);
        schedule();
      }, {threshold:[0, 0.25]});
      observer.observe(root);
    }
    // Without IntersectionObserver keep manual navigation; never rotate unseen content.
    else { paused = true; visible = true; }
    schedule();
  });
})();
