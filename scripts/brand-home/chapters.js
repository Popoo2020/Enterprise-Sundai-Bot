(() => {
  const root = document.querySelector('.pc-sections:not(.pc-business)');
  if (!root) return;
  function translate() {
    const l = ((document.documentElement.lang || window.sundaiLang || 'he').split('-')[0]);
    root.querySelectorAll('[data-he][data-en]').forEach(node => { const value = node.dataset[l] || node.dataset.en; if(node.textContent!==value) node.textContent=value; });
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting){entry.target.classList.add('pc-entered');io.unobserve(entry.target);}
    }),{threshold:.18});
    root.querySelectorAll('.pc-chapter').forEach(c=>io.observe(c));
  }
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  window.addEventListener('sundai:locale',translate);
  translate();
})();
