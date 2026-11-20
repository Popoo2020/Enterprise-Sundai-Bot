(() => {
  function sameSource(first, second) {
    function reference(value) {
      const input = value.trim();
      try {
        const url = new URL(input);
        if (url.protocol === 'https:' || url.protocol === 'http:') {
          url.hash = '';
          for (const key of [...url.searchParams.keys()]) {
            if (key.toLowerCase().startsWith('utm_')) url.searchParams.delete(key);
          }
          url.searchParams.sort();
          return url.href;
        }
      } catch { /* Public document titles are valid references too. */ }
      return input.replace(/\s+/g, ' ').toLowerCase();
    }
    return reference(first) === reference(second);
  }

  function run(root) {
    const mode = root.dataset.ew;
    const labels = JSON.parse(root.dataset.labels);
    const fields = Object.fromEntries([...root.querySelectorAll('[data-input]')].map(node => [node.dataset.input, node]));
    const feedback = root.querySelector('[data-feedback]');
    const notice = root.querySelector('[data-notice]');
    const actions = [...root.querySelectorAll('[data-action]')];
    const locale = root.getAttribute('lang');
    const integer = new Intl.NumberFormat(locale);
    const percent = new Intl.NumberFormat(locale, {style:'percent', maximumFractionDigits:2});
    const signed = new Intl.NumberFormat(locale, {maximumFractionDigits:2, signDisplay:'exceptZero'});
    let report = '';
    const value = key => fields[key].value.trim();
    const line = (label, text) => label + '\n' + (text || '—');
    function market() {
      const ref1 = value('ref1'), ref2 = value('ref2');
      let status;
      if (!value('claim')) status = 'missingClaim';
      else if (!ref1 || !ref2 || !value('finding1') || !value('finding2')) status = 'missing';
      else if (sameSource(ref1,ref2)) status = 'duplicate';
      else if (!fields.independent.checked) status = 'uncertain';
      else status = {open:'unresolved',agree:'supported',reject:'rejected',conflict:'disputed'}[fields.assessment.value] || 'unresolved';
      feedback.textContent = labels[status];
      if (!value('claim')) return '';
      const assessment = fields.assessment.value || 'open';
      const sections = [labels.market, line(labels.claim, value('claim')),
        line(labels.source1, [ref1,value('finding1')].filter(Boolean).join('\n')), line(labels.source2, [ref2,value('finding2')].filter(Boolean).join('\n')),
        line(labels.assessment,labels[assessment]), line(labels.status,labels[status]), line(labels.next,value('next'))];
      return sections.join('\n\n');
    }

    function parseCounts(a, b) {
      const raw = [value(a), value(b)];
      const numbers = raw.map(input => Number(input));
      const bad = raw.map((input, i) => Boolean(input) && (!/^\d+$/.test(input) || !Number.isSafeInteger(numbers[i])));
      [a,b].forEach((key,i) => fields[key].setAttribute('aria-invalid', String(bad[i])));
      if (bad.some(Boolean)) return {error:'badCount'};
      if (raw.some(input => !input)) return {error:'noData'};
      const [starts, ends] = numbers;
      if (ends > starts) {
        fields[b].setAttribute('aria-invalid','true');
        return {error:'badOrder'};
      }
      if (!starts) return {error:'zero'};
      return {starts, ends, rate:ends/starts, gap:starts-ends};
    }

    function funnel() {
      const primary = parseCounts('starts','ends');
      const hasSecond = Boolean(value('starts2') || value('ends2'));
      const secondary = parseCounts('starts2','ends2');
      const results = {};
      let error = primary.error;
      if (!error) {
        results.rate = percent.format(primary.rate);
        results.gap = integer.format(primary.gap);
        results.drop = percent.format(primary.gap / primary.starts);
        if (hasSecond) {
          if (secondary.error === 'noData') error = 'incomplete';
          else if (secondary.error === 'zero') error = 'zeroCompare';
          else if (secondary.error) error = secondary.error;
          else {
            results.rate2 = percent.format(secondary.rate);
            results.delta = signed.format((secondary.rate-primary.rate)*100) + ' ' + labels.points;
          }
        }
      }
      for (const row of root.querySelectorAll('[data-row]')) {
        const key = row.dataset.row;
        row.hidden = !Object.hasOwn(results,key);
        row.querySelector('dd').textContent = results[key] || '';
      }
      feedback.textContent = error ? labels[error] : '';
      if (error) return '';
      const summary = [labels.funnel,line(labels.starts,integer.format(primary.starts)),line(labels.ends,integer.format(primary.ends))];
      if (value('context')) summary.push(line(labels.context,value('context')));
      if (hasSecond) summary.push(line(labels.starts2,integer.format(secondary.starts)),line(labels.ends2,integer.format(secondary.ends)));
      for (const [key,text] of Object.entries(results)) summary.push(line(labels[key],text));
      summary.push(line(labels.plan,labels.steps.map((step,i) => String(i+1) + '. ' + step).join('\n')));
      return summary.join('\n\n');
    }

    function refresh() {
      report = mode === 'market' ? market() : funnel();
      for (const button of actions) button.disabled = !report;
      notice.textContent = '';
    }

    for (const field of Object.values(fields)) {
      field.addEventListener('input',refresh);
      if (field.tagName === 'SELECT' || field.type === 'checkbox') field.addEventListener('change',refresh);
    }
    for (const button of actions) button.addEventListener('click',async () => {
      if (!report) return;
      if (button.dataset.action === 'copy') {
        try {
          await navigator.clipboard.writeText(report);
          notice.textContent = labels.copied;
        } catch {
          notice.textContent = labels.failed;
        }
        return;
      }
      const blob = new Blob(['\uFEFF', report, '\n'], {type:'text/plain;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sundai-' + (mode === 'market' ? 'market-evidence' : 'signup-test-plan') + '-' + locale + '.txt';
      root.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url),1000);
      notice.textContent = labels.downloaded;
    });
    refresh();
    root.querySelector('.ew-body').hidden = false;
  }

  document.querySelectorAll('[data-ew]').forEach(run);
})();
