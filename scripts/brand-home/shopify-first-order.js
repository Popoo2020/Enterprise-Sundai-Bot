(() => {
  const root = document.querySelector('.sfo[data-first-order]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const find = selector => root.querySelector(selector);
  const field = name => find('[data-field="' + name + '"]');
  const lang = root.lang;
  const money = new Intl.NumberFormat(lang, {style:'currency', currency:'EUR'});
  const amount = cents => money.format(Math.abs(cents) / 100);
  const slider = find('#sfo-cac');
  const total = find('.sfo-total');
  const maxAcquisition = 3900 - 1650 - 128 - 770;
  function updateAmount() {
    const cost = Math.round(Number(slider.value) * 100);
    const left = maxAcquisition - cost;
    field('cac').textContent = amount(cost);
    slider.setAttribute('aria-valuetext', amount(cost));
    field('balance').textContent = amount(left);
    const state = left < 0 ? 'negative' : left > 0 ? 'positive' : 'zero';
    field('label').textContent = total.dataset[state];
    total.dataset.state = state;
  }
  slider.addEventListener('input', updateAmount);
  updateAmount();
  const switches = [...root.querySelectorAll('[data-mode]')];
  const panels = [...root.querySelectorAll('[data-panel]')];
  switches.forEach(button => button.addEventListener('click', () => {
    switches.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== button.dataset.mode; });
  }));
  let received = 1;
  find('[data-replay]').addEventListener('click', () => {
    received += 1;
    field('events').textContent = String(received);
    field('note').textContent = field('note').dataset.done;
  });
})();
