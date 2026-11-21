// Native details handle selection and expose the answers independently of motion.
(() => {
  const preferences = matchMedia('(prefers-reduced-motion: reduce)');
  for (const scene of document.querySelectorAll('.crew-choices, .crew-review')) {
    const actor = scene.querySelector('.crew-performer');
    if (!actor) continue;
    let decoded;
    let active;
    let sequence = 0;
    function stop() {
      active = undefined;
      sequence++;
      delete actor.dataset.playing;
    }
    async function update() {
      const panel = scene.matches('details') ? (scene.open ? scene : null) : scene.querySelector('details[open]');
      if (!panel || preferences.matches) { stop(); return; }
      if (panel === active) return;
      stop();
      active = panel;
      const token = sequence;
      if (!decoded) {
        const strip = new Image();
        strip.src = actor.dataset.strip;
        decoded = strip.decode().catch(() => { decoded = undefined; return false; });
      }
      if (await decoded === false || sequence !== token || !panel.open || preferences.matches) return;
      actor.dataset.playing = panel === scene.querySelector('details:nth-of-type(2)') ? 'second' : 'first';
    }
    actor.addEventListener('animationend', event => {
      if (event.pseudoElement === '::after') delete actor.dataset.playing;
    });
    scene.addEventListener('toggle', update, true);
    preferences.addEventListener('change', stop);
  }

  const cue = document.querySelector('[data-crew-context]');
  if (!cue || !('IntersectionObserver' in window)) return;
  const details = cue.closest('details');
  const connection = navigator.connection;
  let inView = false;
  let played = false;
  let clip;

  function syncCue() {
    const visible = inView && !document.hidden && (!details || details.open);
    if (!visible || preferences.matches || connection?.saveData
        || ['slow-2g', '2g'].includes(connection?.effectiveType)) {
      clip?.remove();
      clip = undefined;
      return;
    }
    if (played || clip) return;
    const next = new Image();
    clip = next;
    next.className = 'sd-context-motion';
    next.alt = '';
    next.decoding = 'async';
    next.onload = () => {
      if (clip !== next) return;
      cue.append(next);
      played = true;
    };
    next.onerror = () => {
      if (clip !== next) return;
      clip = undefined;
      played = true;
    };
    next.src = cue.dataset.motion;
  }

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting && entry.intersectionRatio >= 0.5;
    syncCue();
  }, {threshold: [0, 0.5]}).observe(cue);
  details?.addEventListener('toggle', syncCue);
  document.addEventListener('visibilitychange', syncCue);
  preferences.addEventListener('change', syncCue);
  connection?.addEventListener?.('change', syncCue);
})();
