/* SEO bridge: exposes the final merged database and links modal content to crawlable pages. */
(function installFunctionPageLinks() {
  const functionPath = feature => `function/${encodeURIComponent(feature.id)}/index.html`;

  const seoData = {
    generatedAt: new Date().toISOString(),
    features: features.map(feature => ({
      ...feature,
      icon: iconFor(feature),
      sourceDetails: sourceList(feature)
    })),
    vehicles: [...vehicles]
  };
  window.KCG_SEO_DATA = seoData;

  const dataNode = document.createElement('script');
  dataNode.id = 'kcgSeoData';
  dataNode.type = 'application/json';
  dataNode.textContent = JSON.stringify(seoData).replaceAll('<', '\\u003c');
  document.head.appendChild(dataNode);

  const originalOpenModal = openModal;
  openModal = function openModalWithDetailLink(feature, hasVehicleContext = false) {
    originalOpenModal(feature, hasVehicleContext);
    const modalBody = document.querySelector('#featureModalBody');
    if (!modalBody || modalBody.querySelector('.function-detail-link')) return;

    const actions = document.createElement('div');
    actions.className = 'feature-modal-actions';
    actions.innerHTML = `
      <a class="function-detail-link" href="${functionPath(feature)}">
        자세히 보기
        <span aria-hidden="true">→</span>
      </a>`;
    modalBody.appendChild(actions);
  };

  const footerMeta = document.querySelector('.site-footer__meta');
  if (footerMeta && !document.querySelector('.function-directory-link')) {
    const directoryLink = document.createElement('a');
    directoryLink.className = 'function-directory-link';
    directoryLink.href = 'function/';
    directoryLink.textContent = '전체 기능 페이지';
    footerMeta.appendChild(directoryLink);
  }
})();
