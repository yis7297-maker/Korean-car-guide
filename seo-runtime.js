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
    if (typeof sourceList !== 'function') return '';
    const rows = sourceList(feature).map(source => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a> <span class="source-priority">${source.rank}</span>`);
    return safeListHtml('공식 출처', rows);
  };

  const categoryLabelMap = {
    'EV ?꾩슜 湲곕뒫': 'EV 전용 기능',
    '二쇱감 ?몄쓽': '주차 편의'
  };
  categories.forEach((category, index) => {
    if (categoryLabelMap[category]) categories[index] = categoryLabelMap[category];
  });
  features.forEach(feature => {
    if (categoryLabelMap[feature.category]) feature.category = categoryLabelMap[feature.category];
    if (categoryLabelMap[feature.parent]) feature.parent = categoryLabelMap[feature.parent];
  });

  const applyManualUpdate = (id, update) => {
    const feature = features.find(item => item.id === id);
    if (!feature) return;
    Object.assign(feature, {
      ...update,
      verify: update.verify || feature.verify,
      verified: update.verified || feature.verified,
      verificationLevel: update.verificationLevel || feature.verificationLevel,
      updatedAt: '2026-07-06'
    });
  };

  applyManualUpdate('utility-mode', {
    name: '유틸리티 모드',
    category: 'EV 전용 기능',
    parent: 'EV 전용 기능',
    subcategory: 'EV 편의 기능',
    officialCategory: 'EV / 정차 편의',
    overview: '고전압 배터리를 이용해 정차 중 차량 내부 전기 장치를 사용할 수 있도록 하는 EV 전용 모드입니다.',
    summary: '정차 상태에서 12V 배터리 부담을 줄이고 고전압 배터리로 차량 전장품을 사용할 수 있게 합니다.',
    preconditions: ['주행 가능 표시등 또는 POWER ON 상태를 확인합니다.', '변속 위치가 P(주차)에 있어야 합니다.', '차량이 주행하지 않는 정차 상태여야 합니다.'],
    settings: ['인포테인먼트 시스템 홈 화면에서 EV(Electric Vehicle)를 선택합니다.', 'EV 설정 메뉴에서 유틸리티 모드를 선택합니다.', '유틸리티 모드 활성화 하기를 선택합니다.'],
    steps: ['작동 조건을 확인한 뒤 유틸리티 모드를 활성화합니다.', 'UTIL 표시등이 켜지고 주차 브레이크가 체결되는지 확인합니다.', '차량 내부 전기 장치를 필요한 범위에서 사용합니다.', '실내 V2L을 함께 사용할 경우 차량 내부 전기 사용 안내를 따릅니다.'],
    disable: ['브레이크를 밟지 않고 시동 버튼을 눌러 OFF 상태로 전환합니다.', '브레이크를 밟은 상태에서 시동 버튼을 눌러 DRIVE READY 상태로 전환합니다.', 'EV 설정의 유틸리티 모드 활성화 항목을 다시 선택해 해제합니다.'],
    limitations: ['유틸리티 모드 사용 중에는 주행할 수 없습니다.', 'P(주차) 이외의 변속 위치로 변경할 수 없습니다.', '작동 조건을 만족해도 활성화되지 않으면 주차 브레이크 작동 상태를 점검해야 합니다.'],
    warnings: ['고전압 배터리 잔량과 차량 상태에 따라 사용 가능 시간이 달라질 수 있습니다.', '차량 내부 전기 장치를 장시간 사용할 때는 배터리 잔량을 확인하십시오.'],
    sources: ['hyundaiManual', 'genesisCatalog'],
    manualEvidence: { manualFile: 'US4EV_2027_ko_KR.txt', section: '유틸리티 모드 설정하기', pageRange: '전기차 시작하기 31' },
    verificationLevel: 'official_manual_verified'
  });

  applyManualUpdate('side-pdw', {
    name: '측방 주차 거리 경고',
    category: '주차 편의',
    parent: '주차 보조',
    officialCategory: '주차 안전 / 주차 거리 경고',
    aliases: ['Side Parking Distance Warning', '측방 PDW', '전방/측방/후방 주차 거리 경고'],
    overview: '저속 주차 상황에서 차량 측면 주행 경로 안의 물체를 감지해 경고음과 화면 표시로 알려주는 기능입니다.',
    summary: '전방 또는 후방 주차 거리 경고가 켜진 상태에서 측면 물체 감지 정보를 함께 제공합니다.',
    preconditions: ['측방 주차 거리 경고 사양이 적용된 차량이어야 합니다.', '전방 또는 후방 주차 거리 경고 기능이 켜져 있어야 합니다.', '차량 속도가 10 km/h 이하이어야 합니다.'],
    settings: ['시동 ON 상태에서 설정 > 차량 > 운전자 보조 > 주차 안전으로 이동합니다.', '주차 거리 경고 자동 켜짐을 선택하면 저속에서 주차 거리 경고가 켜진 상태로 유지됩니다.', '경고 음량은 운전자 보조 경고 방식 메뉴에서 조정합니다.'],
    steps: ['전방 또는 후방 주차 거리 경고가 켜진 상태에서 저속으로 이동합니다.', '차량 주행 경로 안의 측방 물체가 감지되면 경고음과 표시를 확인합니다.', '후방 모니터 또는 서라운드 뷰 모니터 화면이 켜져 있으면 탑 뷰 영역의 거리 표시를 함께 확인합니다.'],
    disable: ['주차 안전 버튼으로 주차 거리 경고 기능을 끄면 측방 경고도 함께 중지됩니다.', '차량 속도 또는 변속 조건이 작동 범위를 벗어나면 경고가 종료될 수 있습니다.'],
    limitations: ['측방 경고는 차량 주행 경로 안에 위치한 물체를 기준으로 작동합니다.', 'D(주행)에서 물체와의 거리가 일정 거리 이상이면 측방 단독 경고가 클러스터에 표시되지 않을 수 있습니다.', '초음파 센서가 오염되거나 빗물, 눈, 요철길, 경사로 등으로 주변 상황을 인식하기 어려우면 오작동할 수 있습니다.'],
    warnings: ['주차 거리 경고가 있어도 운전자가 전방·후방·측방을 직접 확인해야 합니다.', '초음파 센서가 감지할 수 없는 물체나 매우 가까운 물체가 있을 수 있습니다.'],
    sources: ['hyundaiManual', 'genesisCatalog'],
    manualEvidence: { manualFile: 'US4_2026_ko_KR.txt', section: '주차 거리 경고(PDW) / 측방 주차 거리 경고', pageRange: '운전자 보조 409-413' },
    verificationLevel: 'official_manual_verified'
  });

  applyManualUpdate('pca-parking', {
    name: '주차 충돌방지 보조',
    category: '주차 편의',
    parent: '주차 보조',
    officialCategory: '주차 안전 / 주차 충돌방지 보조',
    aliases: ['Parking Collision-Avoidance Assist', 'PCA', '후방 주차 충돌방지 보조'],
    overview: '저속 주차 또는 후진 중 보행자나 물체와 충돌 위험이 감지되면 경고하고 조건에 따라 제동을 보조하는 기능입니다.',
    summary: '주차 안전 설정과 센서 상태가 정상일 때 후방 또는 전방/측방 충돌 위험을 경고하고 제동 제어를 지원합니다.',
    preconditions: ['주차 충돌방지 보조 사양이 적용되어야 합니다.', '주차 안전 설정에서 해당 안전 기능이 선택되어 있어야 합니다.', '도어와 테일게이트가 닫혀 있어야 합니다.', '전자식 파킹 브레이크가 해제되어 있어야 합니다.'],
    settings: ['시동 ON 상태에서 설정 > 차량 > 운전자 보조 > 주차 안전으로 이동합니다.', '후방 안전 또는 전방/측방 안전 항목을 선택합니다.', '주차 안전 버튼을 길게 눌러 설정된 주차 충돌방지 보조를 켜거나 끌 수 있습니다.'],
    steps: ['R(후진) 또는 기능 조건에 맞는 변속 상태에서 저속으로 이동합니다.', '차량 주변 보행자나 물체와 충돌 위험이 감지되면 경고음과 클러스터 경고를 확인합니다.', '서라운드 뷰 모니터가 작동 중이면 인포테인먼트 화면의 경고도 함께 확인합니다.', '충돌이 임박한 경우 차량이 제동 제어를 수행할 수 있으므로 브레이크를 밟고 주변을 확인합니다.'],
    disable: ['주차 안전 버튼을 길게 눌러 기능을 끌 수 있습니다.', '기어를 변속하거나 충분한 힘으로 브레이크 페달을 밟으면 제동 제어가 해제될 수 있습니다.', '제동 제어 후 일정 시간이 지나면 제동 제어가 해제되고 전자식 파킹 브레이크가 체결될 수 있습니다.'],
    limitations: ['후방 카메라와 초음파 센서가 오염되거나 가려지면 기능이 제한될 수 있습니다.', '차량 속도, 물체의 크기·형상·재질·거리, 범퍼 상태, 강한 전자파, 트레일러 연결 등에 따라 성능이 저하될 수 있습니다.', '일부 조건에서는 보행자 대상 기능만 제공될 수 있습니다.'],
    warnings: ['주차 충돌방지 보조에만 의존하지 말고 항상 주변을 직접 확인하십시오.', '브레이크 조작 책임은 운전자에게 있습니다.', '센서와 카메라를 깨끗하게 유지하고 임의로 분리하거나 충격을 가하지 마십시오.'],
    sources: ['hyundaiManual', 'genesisCatalog'],
    manualEvidence: { manualFile: 'SX2_2027_ko_KR.txt', section: '후방 주차 충돌방지 보조(PCA)', pageRange: '564-568' },
    verificationLevel: 'official_manual_verified'
  });

  applyManualUpdate('remote-smart-exit', {
    name: '원격 스마트 출차 보조',
    category: '주차 편의',
    parent: '원격 주차',
    officialCategory: '원격 스마트 주차 보조 / 원격 전·후진',
    aliases: ['Remote Smart Exit Assist', '원격 전후진', '원격 전/후진', 'RSPA 출차'],
    overview: '스마트 키 또는 지원 디지털 키 앱을 이용해 차량 밖에서 전진·후진 이동을 보조하는 원격 주차 보조 기능입니다.',
    summary: '좁은 공간에서 차량을 전진 또는 후진시켜 탑승·하차 공간 확보를 돕습니다.',
    preconditions: ['원격 스마트 주차 보조 사양이 적용된 차량이어야 합니다.', '스마트 키 또는 지원되는 UWB 디지털 키를 휴대해야 합니다.', '차량 주변에 사람, 동물, 물체가 없는지 확인해야 합니다.', '차량과 키 또는 스마트폰이 작동 가능 거리 안에 있어야 합니다.'],
    settings: ['차량 실내에서는 주차/뷰 버튼을 길게 눌러 원격 스마트 주차 보조를 켭니다.', '차량 밖에서는 스마트 키의 전진 또는 후진 버튼을 사용합니다.', '디지털 키 사용 시 마이현대 앱의 원격 스마트 주차 보조 화면에서 원격 전/후진 화면으로 진입합니다.'],
    steps: ['전진 또는 후진하려는 공간 앞에 차량을 정렬하고 P(주차)로 변속합니다.', '주차/뷰 버튼을 길게 눌러 원격 스마트 주차 보조를 켭니다.', '스마트 키를 휴대하고 차량 밖으로 나와 모든 도어와 테일게이트를 닫습니다.', '스마트 키의 전진 또는 후진 버튼을 누른 상태로 유지합니다.', '차량이 원하는 위치에 도달하면 버튼에서 손을 떼거나 종료 버튼을 눌러 기능을 마칩니다.'],
    disable: ['스마트 키 버튼에서 손을 떼면 차량이 멈추고 제어가 일시 중지됩니다.', '원격 시동 버튼 또는 종료 버튼을 누르면 기능이 종료될 수 있습니다.', '원격 전/후진 완료 후 차량은 P(주차) 변속 및 전자식 파킹 브레이크 체결 상태로 전환될 수 있습니다.'],
    limitations: ['차량으로부터 약 4 m 이상 벗어나거나 다른 스마트 키 버튼 조작, 도어 열림, 도난 경보, 충돌방지 보조 작동 등이 발생하면 기능이 중지될 수 있습니다.', '경사로, 눈길, 좁은 공간, 사선 주차, 센서 사각지대, 스토퍼, 트레일러 연결 등에서는 성능이 저하되거나 작동하지 않을 수 있습니다.'],
    warnings: ['차량 외부에서 조작하는 동안에도 안전 책임은 운전자에게 있습니다.', '차량 진행 방향 밖에서 조작하고 주변 사람·동물·물체를 계속 확인하십시오.', '어린이가 스마트 키를 조작하지 않도록 주의하십시오.'],
    sources: ['hyundaiManual', 'genesisCatalog'],
    manualEvidence: { manualFile: 'JX_2026_ko_KR.txt', section: '원격 스마트 주차 보조 / 원격 전·후진', pageRange: '7장 원격 스마트 주차 보조' },
    verificationLevel: 'official_manual_verified'
  });

  applyManualUpdate('smart-power-tailgate', {
    name: '스마트 파워 테일게이트',
    category: '도어/트렁크',
    parent: '편의',
    officialCategory: '편의 / 파워 테일게이트·스마트 테일게이트',
    aliases: ['스마트 테일게이트', '파워 테일게이트', '전동식 테일게이트', 'Smart Power Tailgate', 'Power Tailgate'],
    overview: '파워 테일게이트 전동 개폐와 스마트 키 감지 기반 자동 열림을 제공하는 편의 기능입니다.',
    summary: '스마트 키를 휴대하거나 차량 버튼을 이용해 테일게이트를 열고 닫으며, 설정에 따라 뒤쪽 감지 영역 접근 시 자동으로 열립니다.',
    preconditions: ['파워 테일게이트 또는 스마트 테일게이트 사양이 적용된 차량이어야 합니다.', '파워 테일게이트는 변속 위치 P(주차) 또는 시동 OFF 조건에서 작동합니다.', '스마트 테일게이트는 모든 도어가 닫히고 잠긴 뒤 일정 시간이 지나야 작동합니다.', '테일게이트 주변에 충분한 공간이 있어야 합니다.'],
    settings: ['인포테인먼트 시스템에서 설정 > 차량 > 도어/테일게이트로 이동합니다.', '파워 테일게이트 열림 속도를 보통 또는 빠르게 선택합니다.', '파워 테일게이트 열림 높이를 완전열림, 단계별 높이 또는 사용자 높이 설정으로 선택합니다.', '스마트 테일게이트 사용 여부를 설정합니다.'],
    steps: ['스마트 키의 테일게이트 버튼을 길게 누르거나 운전석 테일게이트 버튼을 눌러 테일게이트를 엽니다.', '번호판 상단의 외부 버튼을 누르면 경고음과 함께 테일게이트가 열립니다.', '테일게이트 내부 열림/닫힘 버튼을 누르면 테일게이트가 열리거나 닫힙니다.', '스마트 테일게이트가 설정된 경우 스마트 키를 휴대하고 뒤쪽 감지 영역에 머물면 경보 후 테일게이트가 자동으로 열립니다.'],
    disable: ['스마트 테일게이트 감지·경보 중 도어 잠금, 도어 잠금 해제, 테일게이트 작동 버튼을 짧게 누르면 기능이 중지됩니다.', '인포테인먼트 시스템의 도어/테일게이트 설정에서 스마트 테일게이트를 해제합니다.', '파워 테일게이트 작동 중 버튼을 다시 누르면 작동이 멈추거나 반전될 수 있습니다.'],
    limitations: ['차량이 3 km/h 이상으로 이동 중이면 파워 테일게이트를 열 수 없습니다.', '반복 작동 시 과열 방지 모드로 진입해 일정 시간 작동하지 않을 수 있습니다.', '버튼 주변이 얼었거나 차량이 기울어진 상태, 경사지, 전파 혼선 지역에서는 작동이 지연되거나 제한될 수 있습니다.'],
    warnings: ['테일게이트 작동 전 주변에 사람이나 물체가 없는지 확인하십시오.', '차 안에 어린이나 애완동물만 남겨 둔 상태로 차량을 떠나지 마십시오.', '물체 끼임 인식 확인을 위해 신체나 물건을 작동 범위에 두지 마십시오.', '세차 시 스마트 테일게이트 기능을 중지하십시오.'],
    applies: apply(['hy-santafe', 'hy-palisade', 'hy-ioniq9', 'genesis-gv70', 'genesis-gv80'], '파워/스마트 테일게이트 적용 트림', '차종/트림별 상이'),
    sources: ['hyundaiManual', 'genesisCatalog'],
    manualEvidence: { manualFile: 'LX3_2026_ko_KR.txt / JX_2026_ko_KR.txt', section: '파워 테일게이트 사용하기 / 스마트 테일게이트', pageRange: 'LX3 편의 장치 205-213, JX 5-59~5-66' },
    verificationLevel: 'official_manual_verified'
  });

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

  const syncSeoDataSnapshot = () => {
    const snapshot = {
      generatedAt: new Date().toISOString(),
      features: features.map(feature => ({
        ...feature,
        icon: iconFor(feature),
        sourceDetails: sourceList(feature)
      })),
      vehicles: [...vehicles]
    };
    window.KCG_SEO_DATA = snapshot;
    const dataNode = document.querySelector('#kcgSeoData');
    if (dataNode) dataNode.textContent = JSON.stringify(snapshot).replaceAll('<', '\\u003c');
  };

  if (typeof window.applyGn7ManualAudit === 'function') {
    window.applyGn7ManualAudit();
  }
  if (typeof window.applyPalisadeManualAudit === 'function') {
    window.applyPalisadeManualAudit();
  }
  if (typeof window.applySantafeManualAudit === 'function') {
    window.applySantafeManualAudit();
  }
  syncSeoDataSnapshot();
  render();
})();
