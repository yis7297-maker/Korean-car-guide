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

/* Regression guard: keep the final user-facing renderer stable after data/SEO bridges load. */
(function restoreStableFeatureRendering() {
  if (!Array.isArray(window.features) && typeof features === 'undefined') return;

  const safeApplies = feature => Array.isArray(feature?.applies) ? feature.applies : [];
  const safeRelated = feature => Array.isArray(feature?.related) ? feature.related : [];
  const baseScore = feature => feature?.verify?.complete ? 10 : 2;
  const safeListHtml = (title, rows) => {
    const safeRows = (rows || []).filter(Boolean);
    return safeRows.length ? `<div class="detail-section"><h3>${title}</h3><ol>${safeRows.map(row => `<li>${row}</li>`).join('')}</ol></div>` : '';
  };
  const safeRelatedLinksHtml = feature => {
    if (typeof relatedLinksHtml === 'function') return relatedLinksHtml(feature);
    const links = safeRelated(feature).map(name => {
      const target = features.find(item => item.name === name || item.aliases?.includes(name));
      return target ? `<button type="button" class="related-link" data-related-id="${target.id}">${target.name}</button>` : '';
    }).filter(Boolean);
    return links.length ? `<div class="detail-section"><h3>관련 기능</h3><div class="related-links">${links.join('')}</div></div>` : '';
  };
  const safeOfficialSourcesHtml = feature => {
    if (typeof officialSourcesHtml === 'function') return officialSourcesHtml(feature);
    if (typeof sourceList !== 'function') return '';
    const rows = sourceList(feature).map(source => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a> <span class="source-priority">${source.rank}</span>`);
    return safeListHtml('공식 출처', rows);
  };

  filteredFeatures = function () {
    const isSearching = !!state.query.trim();
    return features.map(feature => ({ feature, score: scoreFeature(feature) })).filter(({ feature, score }) => {
      const applies = safeApplies(feature);
      const vehicleOk = isSearching || !state.vehicleId || applies.some(item => item.vehicleId === state.vehicleId);
      const brandOk = isSearching || !state.brand || state.brand === '전체' || applies.some(item => item.brand === state.brand);
      const yearOk = isSearching || !state.year || state.year === '전체' || applies.some(item => String(item.years).includes(state.year));
      const categoryOk = isSearching || state.category === '전체' || feature.category === state.category;
      const queryOk = !isSearching || score > baseScore(feature);
      return vehicleOk && brandOk && yearOk && categoryOk && queryOk;
    }).sort((a, b) => b.score - a.score || a.feature.name.localeCompare(b.feature.name, 'ko')).map(item => item.feature);
  };

  renderCards = function (list) {
    cardsEl.innerHTML = '';
    if (!list.length) {
      cardsEl.innerHTML = '<div class="no-results">선택한 조건에 맞는 기능이 없습니다.</div>';
      return;
    }
    list.forEach(feature => {
      const node = cardTemplate.content.firstElementChild.cloneNode(true);
      const vehicle = currentVehicle();
      const applies = safeApplies(feature);
      const match = vehicle ? applies.find(item => item.vehicleId === vehicle.id) : null;
      node.querySelector('.badge').className = `badge ${brandClass(applies[0]?.brand || '현대')}`;
      node.querySelector('.badge').textContent = feature.category;
      node.querySelector('h3').innerHTML = `<span class="feature-icon">${iconFor(feature)}</span><span>${feature.name}</span>`;
      node.querySelector('.description').textContent = feature.summary || feature.overview || '';
      node.querySelector('.meta-row').innerHTML = `<span class="meta">${feature.officialCategory || feature.category}</span><span class="meta">${match ? match.trim : '차량 선택 후 적용 여부 확인'}</span>`;
      const bookmark = node.querySelector('.bookmark');
      if (bookmark) bookmark.style.display = 'none';
      node.onclick = () => openModal(feature, !!match);
      node.onkeydown = event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(feature, !!match);
        }
      };
      cardsEl.appendChild(node);
    });
  };

  openModal = function (feature, hasVehicleContext = false) {
    let modal = document.querySelector('#featureModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'featureModal';
      modal.className = 'feature-modal';
      modal.innerHTML = '<div class="feature-modal__backdrop"></div><div class="feature-modal__panel" role="dialog" aria-modal="true"><button class="feature-modal__close" type="button" aria-label="닫기">×</button><div id="featureModalBody"></div></div>';
      document.body.appendChild(modal);
      modal.querySelector('.feature-modal__close').onclick = closeModal;
      modal.querySelector('.feature-modal__backdrop').onclick = closeModal;
    }

    const vehicle = currentVehicle();
    const applies = safeApplies(feature);
    const match = vehicle ? applies.find(item => item.vehicleId === vehicle.id) : null;
    const overview = feature.overview || feature.summary || '';
    const context = hasVehicleContext && match
      ? [`선택 차량: ${match.brand} ${match.model}`, `적용 연식: ${match.years}`, `적용 트림: ${match.trim}`, `기본/선택 옵션 여부: ${match.option}`]
      : ['차량을 선택하면 해당 차량 기준의 적용 연식, 트림, 옵션 정보를 함께 확인할 수 있습니다.'];

    modal.querySelector('#featureModalBody').innerHTML = `
      <div class="detail-title-row">
        <span class="feature-icon large">${iconFor(feature)}</span>
        <div>
          ${feature.future ? '<span class="future-tag">향후 지원 예정</span>' : ''}
          <h2>${feature.name}</h2>
          <p class="muted">${feature.parent ? `${feature.parent} · ${feature.subcategory || feature.name}` : (feature.officialCategory || feature.category)}</p>
        </div>
      </div>
      ${overview ? `<p>${overview}</p>` : ''}
      ${safeListHtml(hasVehicleContext && match ? '선택 차량 적용 정보' : '적용 여부 안내', context)}
      ${safeListHtml('기능 개요', overview ? [overview] : [])}
      ${safeListHtml('사용 전 조건', feature.preconditions)}
      ${safeListHtml('설정 방법', feature.settings)}
      ${safeListHtml('사용 방법', feature.steps)}
      ${safeListHtml('해제 방법', feature.disable)}
      ${safeListHtml('작동 제한 상황', feature.limitations)}
      ${safeListHtml('주의 사항', feature.warnings)}
      ${safeListHtml('최신 기능 세대 정보', feature.generation ? [`기능군: ${feature.generation.family}`, `현재 세대: ${feature.generation.generation}`, `이전 세대: ${(feature.generation.previous || []).join(', ') || '없음'}`, `세대별 차이: ${feature.generation.differences}`] : [])}
      ${safeRelatedLinksHtml(feature)}
      ${safeOfficialSourcesHtml(feature)}
      <button type="button" class="applicable-vehicles-button" data-application-feature="${feature.id}">적용 차량 보기</button>`;

    modal.querySelectorAll('[data-related-id]').forEach(button => {
      button.onclick = () => openModal(features.find(item => item.id === button.dataset.relatedId), false);
    });
    const applicationButton = modal.querySelector('[data-application-feature]');
    if (applicationButton && typeof openApplicationModal === 'function') {
      applicationButton.onclick = () => openApplicationModal(feature);
    }
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

  render = function () {
    makeChips(categories, '#categoryFilters', 'category');
    renderDatabaseView();
    const list = filteredFeatures();
    const vehicle = currentVehicle();
    document.querySelector('#resultCount').textContent = `${list.length}개 기능`;
    document.querySelector('#sectionTitle').textContent = vehicle ? `${vehicle.name} 기능 데이터` : '전체 기능 데이터';
    renderCards(list);
    renderStats();
  };

  render();
})();
