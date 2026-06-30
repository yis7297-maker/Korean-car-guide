(function installModalControls() {
  const modalSelectors = ['#featureModal', '#applicationModal', '#updateModal'];
  const stack = [];

  const isOpen = modal => Boolean(modal && modal.classList.contains('is-open'));
  const remember = modal => {
    if (!modal?.id) return;
    const existing = stack.indexOf(modal.id);
    if (existing !== -1) stack.splice(existing, 1);
    stack.push(modal.id);
  };
  const forget = modal => {
    if (!modal?.id) return;
    const existing = stack.indexOf(modal.id);
    if (existing !== -1) stack.splice(existing, 1);
  };
  const anyOpen = () => modalSelectors.some(selector => isOpen(document.querySelector(selector)));

  function closeById(id) {
    if (id === 'applicationModal' && typeof closeApplicationModal === 'function') closeApplicationModal();
    else if (id === 'updateModal' && typeof closeUpdateModal === 'function') closeUpdateModal();
    else if (id === 'featureModal' && typeof closeModal === 'function') closeModal();
    else document.querySelector(`#${id}`)?.classList.remove('is-open');
    if (!anyOpen()) document.body.classList.remove('modal-open');
  }

  function closeTopModal() {
    while (stack.length) {
      const id = stack.pop();
      if (isOpen(document.querySelector(`#${id}`))) {
        closeById(id);
        return true;
      }
    }
    for (const selector of [...modalSelectors].reverse()) {
      const modal = document.querySelector(selector);
      if (isOpen(modal)) {
        closeById(modal.id);
        return true;
      }
    }
    return false;
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName !== 'class') return;
      const modal = mutation.target;
      if (isOpen(modal)) remember(modal);
      else forget(modal);
    });
  });

  function observeModal(modal) {
    if (!modal || modal.dataset.kcgModalObserved) return;
    modal.dataset.kcgModalObserved = 'true';
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    if (isOpen(modal)) remember(modal);
  }

  modalSelectors.forEach(selector => observeModal(document.querySelector(selector)));
  new MutationObserver(() => {
    modalSelectors.forEach(selector => observeModal(document.querySelector(selector)));
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (closeTopModal()) event.preventDefault();
  }, true);
})();
