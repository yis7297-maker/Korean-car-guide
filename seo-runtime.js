/* SEO bridge: exposes the final merged database and links modal content to crawlable pages. */
(function installFunctionPageLinks() {
  const slugDefinitions = {
    'rspa2': ['rspa2', ['rspa-2', 'remote-smart-parking-assist-2', 'remote-smart-parking-assist']],
    'memory-reverse-assist': ['mra', ['memory-reverse-assist', 'memory-reverse-assist-mra']],
    'hybrid-stay-mode': ['stay-mode', ['staymode', 'tmed2-stay-mode', 'hev-stay-mode']],
    'hyundai-dk2': ['digital-key-2', ['hyundai-digital-key-2', 'digital-key2']],
    'apple-carplay-wireless': ['apple-carplay', ['carplay', 'wireless-apple-carplay']],
    'android-auto-wireless': ['android-auto', ['androidauto', 'wireless-android-auto']],
    'v2l-parent': ['v2l', ['vehicle-to-load', 'vehicle-2-load']],
    'built-in-cam2-plus': ['built-in-cam-2-plus', ['built-in-cam2-plus', 'builtincam-2-plus']]
  };
  features.forEach(feature => {
    const [slug = feature.id, aliases = []] = slugDefinitions[feature.id] || [];
    feature.slug = feature.slug || slug;
    feature.slugAliases = [...new Set([...(feature.slugAliases || []), ...aliases, ...(feature.id !== feature.slug ? [feature.id] : [])])];
    feature.aliases = [...new Set([...(feature.aliases || []), ...feature.slugAliases])];
  });
  const functionPath = feature => `/function/${encodeURIComponent(feature.slug || feature.id)}/`;

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
    directoryLink.href = '/function/';
    directoryLink.textContent = '전체 기능 페이지';
    footerMeta.appendChild(directoryLink);
  }

  if ('serviceWorker' in navigator && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    navigator.serviceWorker.register('/function-preview-sw.js?v=20260624-3').catch(() => {});
  }

  const requestedSearch = new URLSearchParams(location.search).get('search');
  const searchInput = document.querySelector('#searchInput');
  if (requestedSearch && searchInput) {
    searchInput.value = requestedSearch;
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  }
})();
