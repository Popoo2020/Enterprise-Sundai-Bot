(() => {
  'use strict';

  // The same small state machine drives all four service journeys.
  function createPlannerState(options) {
    if (!Array.isArray(options) || options.length !== 3 || options.some(list => !Array.isArray(list) || !list.length)) throw new Error('Invalid planner steps');
    const allowed = options.map(list => new Set(list));
    const answers = Array(options.length).fill(null);
    let current = 0;
    return {
      get current() { return current; },
      get answers() { return [...answers]; },
      get complete() { return answers.every((answer, i) => allowed[i].has(answer)); },
      select(index, value) {
        if (!Number.isInteger(index) || !allowed[index]?.has(value)) return false;
        answers[index] = value;
        return true;
      },
      next() {
        if (current >= options.length || !allowed[current].has(answers[current])) return false;
        current += 1;
        return true;
      },
      back() { if (current === 0) return false; current -= 1; return true; },
      edit() { current = 0; }
    };
  }

  function buildPlannerBrief(config, choices) {
    if (!Array.isArray(choices) || choices.length !== 3 || choices.some(c => !c?.label || !c?.title || !c?.detail)) return null;
    const brief = [
      `${config.briefLabel}: ${config.serviceName}`,
      ...choices.map(choice => `${choice.label}: ${choice.title}. ${choice.detail}`),
      '', `${config.scopeLabel}: ${config.scope}`,
      `${config.nextLabel}: ${config.nextDetail}`
    ].join('\n');
    // Keep ample room for the visitor's edits within the existing contact limits.
    if (brief.length > 1500) throw new Error('Planner brief exceeds the agreed limit');
    return brief;
  }
  function shouldReplaceMessage(value, lastCopied) {
    return Boolean(value.trim()) && value !== lastCopied;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = {createPlannerState, buildPlannerBrief, shouldReplaceMessage};
  if (typeof document === 'undefined') return;

  for (const root of document.querySelectorAll('[data-service-planner]')) {
    const controls = root.querySelector('[data-planner-controls]');
    const fallback = root.querySelector('[data-planner-fallback]');
    const steps = [...root.querySelectorAll('[data-planner-step]')];
    const progress = [...root.querySelectorAll('[data-planner-progress]')];
    const preview = root.querySelector('.planner-preview');
    const nodes = [...root.querySelectorAll('[data-planner-node]')];
    const navigation = root.querySelector('[data-planner-navigation]');
    const back = root.querySelector('[data-planner-back]');
    const next = root.querySelector('[data-planner-next]');
    const hint = root.querySelector('[data-planner-hint]');
    const review = root.querySelector('[data-planner-review]');
    const answers = [...root.querySelectorAll('[data-planner-answer]')];
    const discuss = root.querySelector('[data-planner-discuss]');
    const edit = root.querySelector('[data-planner-edit]');
    const replace = root.querySelector('[data-planner-replace]');
    const replaceAction = root.querySelector('[data-planner-replace-action]');
    const keep = root.querySelector('[data-planner-keep]');
    const status = root.querySelector('[data-planner-status]');
    const message = document.querySelector('#proposal textarea[name="message"]');
    if (!controls || !fallback || steps.length !== 3 || progress.length !== 3 || nodes.length !== 4 || !preview || !navigation || !back || !next || !hint || !review || answers.length !== 3 || !discuss || !edit || !replace || !replaceAction || !keep || !status || !message) continue;

    const radios = steps.map(step => [...step.querySelectorAll('input[type="radio"]')]);
    const state = createPlannerState(radios.map(list => list.map(radio => radio.value)));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lastCopied = '';
    let motionTimer;
    const choiceDetails = () => state.answers.map((value, i) => {
      const choice = radios[i].find(radio => radio.value === value);
      return choice ? {label: steps[i].dataset.questionLabel, title: choice.dataset.choiceTitle, detail: choice.dataset.choiceDetail} : null;
    });
    const brief = () => state.complete ? buildPlannerBrief(root.dataset, choiceDetails()) : null;
    const metric = (event, step) => {
      // Local event hook only: no answers, free text, identity or remote collector.
      window.dispatchEvent(new CustomEvent('sundai:metric', {detail: {event, category: root.dataset.category, ...(Number.isInteger(step) ? {step: step + 1} : {})}}));
    };
    const focusStep = () => {
      const heading = state.current === 3 ? review.querySelector('h3') : steps[state.current].querySelector('legend');
      heading?.focus({preventScroll: true});
      controls.scrollIntoView({behavior: motion.matches ? 'auto' : 'smooth', block: 'nearest'});
    };
    const render = (focus = false) => {
      const complete = state.current === 3;
      steps.forEach((step, i) => { step.hidden = complete || i !== state.current; });
      progress.forEach((item, i) => {
        item.classList.toggle('is-current', !complete && i === state.current);
        item.classList.toggle('is-complete', Boolean(state.answers[i]));
        if (!complete && i === state.current) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      });
      navigation.hidden = complete;
      hint.hidden = complete || Boolean(state.answers[state.current]);
      review.hidden = !complete;
      back.disabled = state.current === 0;
      next.disabled = complete || !state.answers[state.current];
      next.textContent = `${state.current === 2 ? root.dataset.reviewText : root.dataset.nextText} ↗`;
      if (complete) choiceDetails().forEach((choice, i) => { answers[i].textContent = choice.title; });
      if (focus) focusStep();
    };
    const updateDiagram = index => {
      const choice = choiceDetails()[index];
      if (!choice) return;
      const node = nodes[Number(steps[index].dataset.node)];
      node.querySelector('[data-node-title]').textContent = choice.title;
      node.querySelector('[data-node-detail]').textContent = choice.detail;
      node.classList.add('has-choice');
      if (!motion.matches) {
        clearTimeout(motionTimer);
        preview.classList.add('is-updating');
        motionTimer = setTimeout(() => preview.classList.remove('is-updating'), 280);
      }
    };
    const focusMessage = () => {
      replace.hidden = true;
      message.focus({preventScroll: true});
      message.scrollIntoView({behavior: motion.matches ? 'auto' : 'smooth', block: 'center'});
    };
    const copyPlan = () => {
      const value = brief();
      if (!value) return;
      message.value = value;
      lastCopied = value;
      message.dispatchEvent(new Event('input', {bubbles: true}));
      status.textContent = root.dataset.copiedText;
      metric('planner_brief_added');
      focusMessage();
    };

    radios.forEach((list, i) => list.forEach(radio => {
      // Respect native form-state restoration after back/forward navigation.
      if (radio.checked) state.select(i, radio.value);
      radio.addEventListener('change', () => {
        if (!radio.checked || !state.select(i, radio.value)) return;
        list.forEach(item => item.closest('.planner-option').classList.toggle('is-selected', item.checked));
        replace.hidden = true;
        status.textContent = root.dataset.selectedText;
        updateDiagram(i);
        render();
      });
    }));
    next.addEventListener('click', () => {
      if (!state.next()) return;
      metric(state.current === 3 ? 'planner_completed' : 'planner_step_viewed', state.current === 3 ? undefined : state.current);
      status.textContent = '';
      render(true);
    });
    back.addEventListener('click', () => { if (state.back()) { status.textContent = ''; render(true); } });
    edit.addEventListener('click', () => { state.edit(); replace.hidden = true; status.textContent = ''; render(true); });
    discuss.addEventListener('click', () => {
      if (!state.complete) return;
      if (shouldReplaceMessage(message.value, lastCopied)) {
        replace.hidden = false;
        replace.querySelector('p').focus();
      } else copyPlan();
    });
    replaceAction.addEventListener('click', copyPlan);
    keep.addEventListener('click', focusMessage);
    motion.addEventListener('change', () => {
      if (motion.matches) {
        clearTimeout(motionTimer);
        preview.classList.remove('is-updating');
      }
    });
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          preview.classList.add('is-connected');
          observer.disconnect();
        }
      }, {threshold: 0.2});
      observer.observe(preview);
    } else preview.classList.add('is-connected');

    steps.forEach(step => {
      const node = nodes[Number(step.dataset.node)];
      node.querySelector('[data-node-title]').textContent = root.dataset.emptyTitle;
      node.querySelector('[data-node-detail]').textContent = root.dataset.emptyDetail;
    });
    radios.forEach((list, i) => {
      list.forEach(item => item.closest('.planner-option').classList.toggle('is-selected', item.checked));
      updateDiagram(i);
    });
    fallback.hidden = true;
    controls.hidden = false;
    root.classList.add('planner-enhanced');
    render();
  }
})();
