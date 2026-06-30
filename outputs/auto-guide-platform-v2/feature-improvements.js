/* 2026-06-24 reverse lookup, standardized descriptions, EV taxonomy and update log */
const evCategory = 'EV 전용 기능';
if (!categories.includes(evCategory)) {
  const fcevIndex = categories.indexOf('FCEV');
  categories.splice(fcevIndex >= 0 ? fcevIndex : categories.length, 0, evCategory);
}
iconPaths[evCategory] = '<svg viewBox="0 0 24 24"><path d="M5 4h10v16H5z"></path><path d="M15 8h3l2 3v6a2 2 0 0 1-4 0v-3"></path><path d="M8 8h4M10 11l-2 3h4l-2 3"></path></svg>';

const evIdsForImprovement = [
  'ev-charge-v2l', 'plug-and-charge', 'iccu-energy-control', 'ev-route-planner',
  'battery-conditioning', 'scheduled-charging', 'charge-limit', 'v2l-parent',
  'v2l-indoor', 'v2l-outdoor', 'camping-mode', 'utility-mode',
  'v2h-roadmap', 'v2g-roadmap'
];

const evSubcategoryMap = {
  'plug-and-charge': '충전',
  'scheduled-charging': '충전',
  'charge-limit': '충전',
  'battery-conditioning': '배터리',
  'ev-route-planner': '에너지 관리',
  'iccu-energy-control': '에너지 관리',
  'v2l-parent': '전력 공급',
  'v2l-indoor': '전력 공급',
  'v2l-outdoor': '전력 공급',
  'ev-charge-v2l': '전력 공급',
  'camping-mode': 'EV 편의 기능',
  'utility-mode': 'EV 편의 기능',
  'v2h-roadmap': '전력 공급',
  'v2g-roadmap': '전력 공급'
};

features.forEach(feature => {
  if (evIdsForImprovement.includes(feature.id)) {
    feature.category = evCategory;
    feature.parent = evCategory;
    feature.subcategory = evSubcategoryMap[feature.id] || '에너지 관리';
    feature.future = /roadmap/.test(feature.id);
  }
});

const evVehicleIds = [...hyEvIds, ...kiaEvIds, ...genesisEvIds];

[
  {
    id: 'ev-charge-status',
    name: '충전 상태 확인',
    subcategory: '충전',
    summary: '차량 화면이나 커넥티드 앱에서 충전 진행률, 예상 완료 시간과 충전 상태를 확인합니다.',
    related: ['충전 예약', '충전 한도 설정']
  },
  {
    id: 'ev-energy-usage',
    name: '에너지 사용량',
    subcategory: '에너지 관리',
    summary: '주행, 공조, 전장 장치가 사용한 고전압 배터리 에너지 비율과 효율 정보를 표시합니다.',
    related: ['EV Route Planner', '배터리 상태 확인']
  },
  {
    id: 'ev-battery-health',
    name: '배터리 상태 확인',
    subcategory: '배터리',
    summary: '고전압 배터리 잔량, 주행 가능 거리와 배터리 관련 상태 정보를 확인합니다.',
    related: ['Battery Conditioning', '에너지 사용량']
  },
  {
    id: 'i-pedal',
    name: 'i-Pedal',
    subcategory: '회생제동',
    summary: '가속 페달 조작만으로 가속, 감속과 정차를 폭넓게 제어하도록 회생제동을 강화합니다.',
    related: ['회생제동 단계 조절', 'EV 스마트 회생제동']
  },
  {
    id: 'ev-smart-regeneration',
    name: 'EV 스마트 회생제동',
    subcategory: '회생제동',
    summary: '앞차 거리와 도로 상황을 고려해 회생제동 수준을 자동으로 조절합니다.',
    related: ['i-Pedal', '회생제동 단계 조절']
  },
  {
    id: 'ev-regen-level',
    name: '회생제동 단계 조절',
    subcategory: '회생제동',
    summary: '스티어링 휠 패들로 회생제동 단계를 변경해 감속감과 에너지 회수 수준을 조절합니다.',
    related: ['i-Pedal', 'EV 스마트 회생제동']
  }
].forEach(config => addExpandedFeature({
  ...config,
  parent: evCategory,
  category: evCategory,
  officialCategory: `EV / ${config.subcategory}`,
  aliases: [],
  applies: apply(evVehicleIds, '전동화 전용 / 차종별 지원 범위 상이', '차종별 기본 사양 또는 설정 기능'),
  sources: ['hyundaiCatalog', 'hyundaiManual', 'kiaCatalog', 'kiaManual', 'genesisCatalog'],
  verify: verify(true),
  generation: {
    family: evCategory,
    generation: config.name,
    previous: [],
    differences: config.summary
  }
}));

features.forEach(feature => {
  feature.related = (feature.related || []).filter(name =>
    features.some(candidate => candidate.name === name || (candidate.aliases || []).includes(name))
  );
});

function defaultSettingsFor(feature) {
  if (feature.settings?.length) return feature.settings;
  const categoryPaths = {
    '주차 편의': '설정 → 차량 → 운전자 보조 → 주차 안전',
    '지능형 안전 기술': '설정 → 차량 → 운전자 보조 → 주행 안전',
    '주행 편의': '설정 → 차량 → 운전자 보조 → 주행 편의',
    '디지털 키/인증': '설정 → 차량 → 디지털 키 또는 사용자 인증',
    '빌트인 캠/녹화': '홈 → 빌트인 캠 또는 카메라',
    '시트': '설정 → 차량 → 시트',
    '공조': '공조 화면 → 공조 설정',
    '인포테인먼트': '홈 → 설정 → 기기 연결 또는 시스템',
    '커넥티드 서비스': '홈 → 커넥티드 서비스 또는 공식 앱',
    'EV 전용 기능': `EV → ${feature.subcategory || '전기차 설정'}`,
    'FCEV': 'FCEV → 에너지 또는 수소전기차 설정'
  };
  return [categoryPaths[feature.category] || '홈 → 설정 → 차량 → 해당 기능 메뉴'];
}

features.forEach(feature => {
  feature.overview = feature.overview || feature.summary;
  feature.preconditions = feature.preconditions?.length ? feature.preconditions : ['차량 전원 또는 시동이 켜져 있어야 합니다.', '해당 차종과 트림에 기능이 적용되어야 합니다.'];
  feature.settings = defaultSettingsFor(feature);
  feature.steps = feature.steps?.length ? feature.steps : ['차량 화면이나 전용 버튼에서 기능을 선택합니다.', '화면 안내에 따라 기능을 실행하고 작동 상태를 확인합니다.'];
  feature.disable = feature.disable?.length ? feature.disable : ['같은 버튼을 다시 누르거나 기능 화면에서 종료를 선택합니다.'];
  feature.limitations = feature.limitations?.length ? feature.limitations : ['차량 상태, 센서, 통신, 배터리와 주변 환경에 따라 작동이 제한될 수 있습니다.'];
  feature.warnings = feature.warnings?.length ? feature.warnings : ['기능 작동 중에도 주변 안전 확인과 차량 제어 책임은 운전자에게 있습니다.'];
  feature.related = feature.related || [];
});

function officialSourcesHtml(feature) {
  const rows = sourceList(feature);
  return `<div class="detail-section"><h3>공식 출처</h3><div class="official-source-list">${
    rows.length
      ? rows.map(source => `<a href="${source.url}" target="_blank" rel="noreferrer"><span>${source.label}</span><small>${source.rank}</small></a>`).join('')
      : '<p class="muted">공식 자료 재확인 필요</p>'
  }</div></div>`;
}

function closeApplicationModal() {
  document.querySelector('#applicationModal')?.classList.remove('is-open');
}

function normalizedVehicleApplications(feature) {
  if (window.KCG_normalizeFeatureApplications) {
    return window.KCG_normalizeFeatureApplications(feature);
  }
  const list = [];
  const seen = new Set();
  const normalize = value => String(value || '').toLowerCase().replace(/\s+/g, '');
  const displayText = value => String(value || '').replace(/검증\s*(미완료|진행 중|예정)/g, '').trim();
  const push = item => {
    if (!item) return;
    const normalized = {
      vehicleId: item.vehicleId || item.id || '',
      brand: item.brand || item.brandKo || '',
      model: item.model || item.modelName || item.name || '',
      years: item.years || item.modelYear || item.year || '',
      trim: item.trim || item.powertrain || '',
      option: displayText(item.option || item.note || ''),
      verificationLevel: item.verificationLevel || '',
      manualFile: item.manualFile || '',
      section: item.section || ''
    };
    if (!normalized.vehicleId && !normalized.model) return;
    const key = [normalized.vehicleId, normalized.brand, normalized.model, normalized.years, normalized.trim, normalized.option].map(normalize).join('|');
    if (!seen.has(key)) {
      seen.add(key);
      list.push(normalized);
    }
  };
  (feature.applies || []).forEach(push);
  [...(feature.supportedModels || []), ...(feature.supportedVehicles || []), ...(feature.applicableModels || [])].forEach(item => {
    if (typeof item === 'string') {
      if (!list.some(existing => normalize(existing.model) === normalize(item))) push({ model: item, option: '지원 차량 데이터' });
    }
    else push(item);
  });
  (feature.modelSpecificGuides || []).forEach(guide => push({
    brand: guide.brand,
    model: guide.modelName || guide.model,
    years: guide.modelYear,
    trim: guide.powertrain,
    option: guide.section || '차종별 공식 절차 확인',
    verificationLevel: guide.verificationLevel || feature.verificationLevel,
    manualFile: guide.manualFile,
    section: guide.section
  }));
  return list;
}

function openApplicationModal(feature) {
  let modal = document.querySelector('#applicationModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'applicationModal';
    modal.className = 'application-modal';
    modal.innerHTML = `
      <div class="application-modal__backdrop"></div>
      <section class="application-modal__panel" role="dialog" aria-modal="true" aria-labelledby="applicationModalTitle">
        <button class="application-modal__close" type="button" aria-label="닫기">×</button>
        <div id="applicationModalBody"></div>
      </section>`;
    document.body.appendChild(modal);
    modal.querySelector('.application-modal__close').onclick = closeApplicationModal;
    modal.querySelector('.application-modal__backdrop').onclick = closeApplicationModal;
  }

  const mappings = normalizedVehicleApplications(feature);
  const vehicleRows = mappings.map(mapping => {
    const years = [...new Set(String(mapping.years).match(/20\d{2}/g) || ['연식 정보 없음'])].join(', ');
    const source = [mapping.manualFile, mapping.section].filter(Boolean).join(' · ');
    return `<article class="application-card">
      <strong>${mapping.brand} ${mapping.model}</strong>
      <dl>
        <dt>연식</dt><dd>${years}</dd>
        <dt>트림</dt><dd>${mapping.trim}</dd>
        <dt>적용</dt><dd>${mapping.option}</dd>
        ${source ? `<dt>출처</dt><dd>${source}</dd>` : ''}
      </dl>
    </article>`;
  }).join('');

  modal.querySelector('#applicationModalBody').innerHTML = `
    <h2 id="applicationModalTitle">${feature.name} 적용 차량</h2>
    <p class="application-summary">현재 데이터베이스 매핑 ${mappings.length}건 · 연식, 트림, 옵션은 공식 가격표와 카탈로그 기준으로 계속 갱신됩니다.</p>
    <div class="application-grid">${vehicleRows || '<p class="no-results">현재 판매 차량 적용 정보가 확정되지 않았습니다.</p>'}</div>`;
  modal.classList.add('is-open');
}

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
  const applications = normalizedVehicleApplications(feature);
  const match = vehicle ? applications.find(item => item.vehicleId === vehicle.id) : null;
  const context = hasVehicleContext && match
    ? [`선택 차량: ${match.brand} ${match.model}`, `적용 연식: ${match.years}`, `적용 트림: ${match.trim}`, `기본/선택 옵션 여부: ${match.option}`]
    : [];

  modal.querySelector('#featureModalBody').innerHTML = `
    <div class="detail-title-row">
      <span class="feature-icon large">${iconFor(feature)}</span>
      <div>
        ${feature.future ? '<span class="future-tag">향후 지원 예정</span>' : ''}
        <h2>${feature.name}</h2>
        <p class="muted">${feature.parent ? `${feature.parent} › ${feature.subcategory || feature.name}` : feature.officialCategory}</p>
      </div>
    </div>
    ${context.length ? listHtml('선택 차량 적용 정보', context) : ''}
    ${listHtml('기능 개요', [feature.overview])}
    ${listHtml('사용 전 조건', feature.preconditions)}
    ${listHtml('설정 방법', feature.settings)}
    ${listHtml('사용 방법', feature.steps)}
    ${listHtml('해제 방법', feature.disable)}
    ${listHtml('작동 제한 상황', feature.limitations)}
    ${listHtml('주의 사항', feature.warnings)}
    ${relatedLinksHtml(feature)}
    ${officialSourcesHtml(feature)}
    <button type="button" class="applicable-vehicles-button" data-application-feature="${feature.id}">적용 차량 보기</button>`;

  modal.querySelectorAll('[data-related-id]').forEach(button => {
    button.onclick = () => openModal(features.find(item => item.id === button.dataset.relatedId), false);
  });
  modal.querySelector('[data-application-feature]').onclick = () => openApplicationModal(feature);
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
};

render();
