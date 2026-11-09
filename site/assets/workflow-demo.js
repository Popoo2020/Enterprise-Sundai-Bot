(() => {
  'use strict';
  for (const root of document.querySelectorAll('[data-workflow-demo]')) {
    const tabs = [...root.querySelectorAll('[data-demo-tab]')];
    const panels = [...root.querySelectorAll('[data-demo-panel]')];
    const tablist = root.querySelector('[data-demo-tabs]');
    const replay = root.querySelector('[data-demo-replay]');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (tabs.length !== 2 || panels.length !== 2 || !tablist || !replay) continue;
    let current = 0;
    let frame;
    const stop = () => {
      window.cancelAnimationFrame(frame);
      panels.forEach(panel => panel.classList.remove('is-playing'));
    };
    const play = () => {
      stop();
      if (motion.matches || document.hidden) return;
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => {
          if (!motion.matches && !document.hidden) panels[current].classList.add('is-playing');
        });
      });
    };
    const select = (index, focus = false) => {
      current = index;
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus();
      play();
    };
    tablist.setAttribute('role', 'tablist');
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panels[i].id);
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', tab.id);
      panels[i].tabIndex = 0;
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        select(next, true);
      });
    });
    const updateMotion = () => { replay.hidden = motion.matches; if (motion.matches) stop(); };
    replay.addEventListener('click', play);
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
    window.addEventListener('beforeprint', stop);
    root.classList.add('demo-enhanced');
    tablist.hidden = false;
    updateMotion();
    select(0);
  }
})();
