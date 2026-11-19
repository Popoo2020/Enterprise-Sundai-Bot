(() => {
  const section = document.querySelector('.fr-ribbon');
  const button = document.querySelector('.fr-motion');
  if (button && section) {
    const state = window.matchMedia('(prefers-reduced-motion: reduce)');
    const show = paused => {
      section.classList.toggle('is-paused', paused);
      button.setAttribute('aria-pressed', String(paused));
      button.setAttribute('aria-label', paused ? button.dataset.play : button.dataset.pause);
      const shape = button.querySelector('path');
      if (shape) shape.setAttribute('d',paused?'M4 2 12 7 4 12Z':'M3 2h3v10H3zM9 2h3v10H9z');
    };
    show(state.matches);
    button.addEventListener('click', () => show(!section.classList.contains('is-paused')));
    state.addEventListener('change', evt => show(evt.matches));
  }
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(items => {
      for (const item of items) if (item.isIntersecting) {
        item.target.classList.add('fr-active');
        io.unobserve(item.target);
      }
    },{threshold:0.15});
    document.querySelectorAll('.fr-enter').forEach(el=>io.observe(el));
  }
})();
