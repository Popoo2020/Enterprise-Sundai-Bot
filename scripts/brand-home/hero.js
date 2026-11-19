(() => {
  const demo = document.getElementById('sd-hero-art');
  if (!demo || demo.hasAttribute('data-ready')) return;
  const tabs = Array.from(demo.querySelectorAll('[role=tab]'));
  const panels = Array.from(demo.querySelectorAll('[role=tabpanel]'));
  const motion = demo.querySelector('.sd-motion');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let over = false;
  let inView = true;
  let active = 0;
  let timer;

  function schedule() {
    window.clearTimeout(timer);
    if (!paused && !over && inView && !document.hidden && !demo.contains(document.activeElement)) {
      timer = window.setTimeout(() => select((active + 1) % tabs.length), 10500);
    }
  }

  function setPause(value) {
    paused = value;
    motion.setAttribute('aria-label', value ? motion.dataset.play : motion.dataset.pause);
    motion.querySelector('[data-pause-icon]').hidden = value;
    motion.querySelector('[data-play-icon]').hidden = !value;
    schedule();
  }

  function select(index) {
    active = index;
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    schedule();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => { setPause(true); select(index); });
    tab.addEventListener('keydown', event => {
      const forward = demo.dir === 'rtl' ? -1 : 1;
      let next;
      switch (event.key) {
        case 'ArrowRight': next = (index + forward + tabs.length) % tabs.length; break;
        case 'ArrowLeft': next = (index - forward + tabs.length) % tabs.length; break;
        case 'Home': next = 0; break;
        case 'End': next = tabs.length - 1; break;
        default: return;
      }
      event.preventDefault();
      setPause(true);
      select(next);
      tabs[next].focus();
    });
  });
  panels.forEach(panel => {
    const button = panel.querySelector('[data-action]');
    button.addEventListener('click', () => {
      setPause(true);
      const done = panel.toggleAttribute('data-complete');
      panel.querySelector('[data-initial]').hidden = done;
      panel.querySelector('[data-result]').hidden = !done;
      button.querySelector('[data-label]').textContent = done ? button.dataset.reset : button.dataset.start;
      button.querySelector('.sd-action-icon').hidden = done;
    });
  });
  motion.addEventListener('click', () => setPause(!paused));
  demo.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { over = true; schedule(); } });
  demo.addEventListener('pointerleave', () => { over = false; schedule(); });
  demo.addEventListener('focusin', schedule);
  demo.addEventListener('focusout', () => window.setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', e => { if (e.matches) setPause(true); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; schedule(); });
    observer.observe(demo);
  }
  demo.setAttribute('data-ready', '');
  setPause(paused);
})();
