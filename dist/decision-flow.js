(() => {
  const section = document.getElementById('decisions');
  if (!section) return;
  const buttons = [...section.querySelectorAll('[data-decision]')];
  const panels = [...section.querySelectorAll('[data-result]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const choice = button.dataset.decision;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    panels.forEach(panel => { panel.hidden = panel.dataset.result !== choice; });
  }));
})();
