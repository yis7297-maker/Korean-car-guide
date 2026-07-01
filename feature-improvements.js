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
  return categoryPaths[feature.category] ? [categoryPaths[feature.category]] : [];
}

features.forEach(feature => {
  feature.overview = feature.overview || feature.summary;
  feature.settings = feature.settings?.length ? feature.settings : [];
  feature.preconditions = feature.preconditions?.length ? feature.preconditions : [];
  feature.steps = feature.steps?.length ? feature.steps : [];
  feature.disable = feature.disable?.length ? feature.disable : [];
  feature.limitations = feature.limitations?.length ? feature.limitations : [];
  feature.warnings = feature.warnings?.length ? feature.warnings : [];
  feature.related = feature.related || [];
});

function officialSourcesHtml(feature) {
  const rows = sourceList(feature);
  return `<div class="detail-section"><h3>공식 출처</h3><div class="official-source-list">${
    rows.length
      ? rows.map(source => `<a href="${source.url}" target="_blank" rel="noreferrer"><span>${source.label}</span><small>${source.rank}</small></a>`).join('')
      : ''
  }</div></div>`;
}

function closeApplicationModal() {
  document.querySelector('#applicationModal')?.classList.remove('is-open');
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

  const mappings = feature.applies || [];
  const vehicleRows = mappings.map(mapping => {
    const years = [...new Set(String(mapping.years).match(/20\d{2}/g) || ['공식 자료 확인'])].join(', ');
    return `<article class="application-card">
      <strong>${mapping.brand} ${mapping.model}</strong>
      <dl>
        <dt>연식</dt><dd>${years}</dd>
        <dt>트림</dt><dd>${mapping.trim}</dd>
        <dt>적용</dt><dd>${mapping.option}</dd>
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
  const match = vehicle ? feature.applies.find(item => item.vehicleId === vehicle.id) : null;
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
