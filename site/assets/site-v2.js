(() => {
  const addStyle = (href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  addStyle('/assets/ecosystem.css?v=20260723-2');
  addStyle('/assets/responsive.css?v=20260723-2');

  const script = document.createElement('script');
  script.src = '/assets/site.js?v=20260723-2';
  script.defer = true;
  document.head.appendChild(script);
})();
