/* US4/US4HEV 2026 Owners Manual vehicle-specific audit overlay.
 * Scope: Hyundai Staria US4 2026 and Staria Hybrid US4HEV 2026 only.
 * Sources:
 * - work/manual-text/US4_2026_ko_KR.txt
 * - work/manual-text/US4HEV_2026_ko_KR.txt
 * No TMED-2, Stay Mode, or V2L mapping is added because those terms are not present in the US4HEV txt audit.
 */
window.applyStariaManualAudit = function applyStariaManualAudit() {
  if (!Array.isArray(window.features) && typeof features === 'undefined') return;
  if (!Array.isArray(window.vehicles) && typeof vehicles === 'undefined') return;

  const today = '2026-07-08';
  const featureList = window.features || features;
  const vehicleList = window.vehicles || vehicles;
  const iceApply = {
    vehicleId: 'hy-staria',
    brand: '현대',
    model: '스타리아',
    years: '2026',
    trim: 'US4 해당 사양/트림',
    option: 'Owners Manual 수록 사양 기준'
  };
  const hevApply = {
    vehicleId: 'hy-staria-hev',
    brand: '현대',
    model: '스타리아 하이브리드',
    years: '2026',
    trim: 'US4 HEV 해당 사양/트림',
    option: 'Owners Manual 수록 HEV 사양 기준'
  };

  if (!vehicleList.some(v => v.id === 'hy-staria-hev')) {
    vehicleList.push({ id: 'hy-staria-hev', brand: '현대', name: '스타리아 하이브리드', group: 'MPV · 하이브리드', hybrid: true, performance: false });
  }

  const ensureArray = value => Array.isArray(value) ? value : [];
  const uniq = items => [...new Set(ensureArray(items).filter(Boolean))];
  const findFeature = id => featureList.find(feature => feature.id === id);
  const upsertApply = (feature, apply) => {
    feature.applies = ensureArray(feature.applies);
    const existing = feature.applies.find(item => item.vehicleId === apply.vehicleId);
    if (existing) Object.assign(existing, apply);
    else feature.applies.push({ ...apply });
  };
  const removeApply = id => {
    const feature = findFeature(id);
    if (!feature || !Array.isArray(feature.applies)) return;
    feature.applies = feature.applies.filter(apply => !['hy-staria', 'hy-staria-hev'].includes(apply.vehicleId));
  };

  const evidence = {
    ice: {
      manualFile: 'US4_2026_ko_KR.txt',
      modelCode: 'US4',
      modelName: '스타리아',
      modelYear: '2026',
      basis: 'official_owner_manual',
      verifiedBy: 'vehicle-manual-audit',
      pageRange: 'US4_2026_ko_KR.txt 본문 검색 확인'
    },
    hev: {
      manualFile: 'US4HEV_2026_ko_KR.txt',
      modelCode: 'US4HEV',
      modelName: '스타리아 하이브리드',
      modelYear: '2026',
      basis: 'official_owner_manual',
      verifiedBy: 'vehicle-manual-audit',
      pageRange: 'US4HEV_2026_ko_KR.txt 본문 검색 확인'
    }
  };

  const mark = (id, config = {}) => {
    const feature = findFeature(id);
    if (!feature) return false;
    if (config.ice !== false) upsertApply(feature, iceApply);
    if (config.hev) upsertApply(feature, hevApply);
    feature.sources = uniq([...(feature.sources || []), 'hyundaiManual']);
    feature.aliases = uniq([...(feature.aliases || []), ...(config.aliases || [])]);
    feature.keywords = uniq([...(feature.keywords || []), ...(config.aliases || [])]);
    if (config.update) Object.assign(feature, config.update);
    if (config.ice === false && config.hev) {
      feature.sourceDetails = [{
        label: '현대자동차 공식 오너스 매뉴얼',
        url: 'https://www.hyundai.com/kr/ko/e/customer/center/download-center',
        rank: '3순위/4순위'
      }];
      feature.related = uniq(ensureArray(feature.related).filter(item => !/TMED|스테이 모드|V2L|정차 공조/.test(item)));
    }
    const ev = config.hev && config.ice === false ? evidence.hev : evidence.ice;
    feature.manualEvidence = {
      ...ev,
      section: config.section || feature.name,
      matchedKeywords: config.matchedKeywords || config.aliases || [feature.name]
    };
    feature.vehicleAudit = {
      ...(feature.vehicleAudit || {}),
      ...(config.ice !== false ? { hyStaria2026: { confirmed: true, manualFile: 'US4_2026_ko_KR.txt', matchedKeywords: config.matchedKeywords || config.aliases || [feature.name], updatedAt: today } } : {}),
      ...(config.hev ? { hyStariaHev2026: { confirmed: true, manualFile: 'US4HEV_2026_ko_KR.txt', matchedKeywords: config.matchedKeywords || config.aliases || [feature.name], updatedAt: today } } : {})
    };
    return true;
  };

  const makeFeature = (id, feature) => {
    if (findFeature(id)) return false;
    featureList.push({
      latest: true,
      updatedAt: today,
      id,
      slug: feature.slug || id,
      name: feature.name,
      category: feature.category || '편의',
      officialCategory: feature.officialCategory || feature.name,
      aliases: uniq(feature.aliases),
      keywords: uniq([feature.name, ...(feature.aliases || [])]),
      summary: feature.summary,
      overview: feature.overview || feature.summary,
      preconditions: ensureArray(feature.preconditions),
      settings: ensureArray(feature.settings),
      steps: ensureArray(feature.steps),
      disable: ensureArray(feature.disable),
      limitations: ensureArray(feature.limitations),
      warnings: ensureArray(feature.warnings),
      related: ensureArray(feature.related),
      applies: [],
      sources: ['hyundaiManual'],
      verify: { catalog: false, price: false, webManual: false, ownerManual: true, homepage: false, complete: true },
      manualEvidence: feature.manualEvidence,
      vehicleAudit: feature.vehicleAudit || {}
    });
    return true;
  };

  const addFeature = (id, f, both = true) => {
    makeFeature(id, f);
    const feature = findFeature(id);
    if (!feature) return;
    if (both) {
      upsertApply(feature, iceApply);
      upsertApply(feature, hevApply);
    } else {
      upsertApply(feature, hevApply);
    }
    feature.sources = uniq([...(feature.sources || []), 'hyundaiManual']);
    feature.manualEvidence = f.manualEvidence || feature.manualEvidence;
  };

  const commonConfirmed = [
    ['fca-suite', '전방 충돌방지 보조 (FCA)'],
    ['nscc-hda2', '스마트 크루즈 컨트롤 (SCC) / 고속도로 주행 보조 (HDA)'],
    ['lane-keeping-assist', '차로 이탈방지 보조 (LKA)'],
    ['lane-following-assist', '차로 유지 보조 (LFA)'],
    ['intelligent-speed-limit-assist', '지능형 속도 제한 보조 (ISLA)'],
    ['driver-attention-warning', '운전자 주의 경고 (DAW)'],
    ['high-beam-assist', '하이빔 보조 (HBA)'],
    ['blind-spot-collision-avoidance-assist', '후측방 충돌방지 보조 (BCA)'],
    ['safe-exit-assist', '안전 하차 보조 (SEA)'],
    ['side-pdw', '전방/측방/후방 주차 거리 경고'],
    ['parking-distance-warning', '주차 거리 경고 (PDW)'],
    ['pca-parking', '주차 충돌방지 보조 (PCA)'],
    ['rear-view-monitor', '후방 모니터 (RVM)'],
    ['surround-view-monitor', '서라운드 뷰 모니터 (SVM)'],
    ['blind-spot-view-monitor', '후측방 모니터 (BVM)'],
    ['rear-cross-traffic-collision-avoidance', '후방 교차 충돌방지 보조 (RCCA)'],
    ['hyundai-dk2', '현대 디지털 키'],
    ['hyundai-dk2-touch', '현대 디지털 키 Touch / NFC'],
    ['nfc-card-key', '디지털 키 (카드 키) / NFC 카드 키'],
    ['built-in-cam', '빌트인 캠'],
    ['ccnc-ota', '무선 소프트웨어 업데이트'],
    ['apple-carplay-wired', 'Apple CarPlay / 카플레이'],
    ['android-auto-wired', 'Android Auto / 안드로이드 오토'],
    ['apple-carplay-wireless', 'Apple CarPlay 무선 연결 / 카플레이'],
    ['android-auto-wireless', 'Android Auto 무선 연결 / 안드로이드 오토'],
    ['smart-key', '스마트 키'],
    ['emergency-key', '비상 키'],
    ['remote-engine-start', '원격 시동'],
    ['remote-climate', '원격 공조'],
    ['climate-control', '히터 및 에어컨'],
    ['rear-climate-control', '후석 공조'],
    ['air-purification', '공기 청정'],
    ['after-blow', '애프터 블로우'],
    ['heated-ventilated-seats', '열선/통풍 시트'],
    ['relaxation-comfort-seat', '릴렉션 좌석 원터치 조절'],
    ['walk-in-device', '동승석 측면 워크인 스위치 / 2열 좌석 워크인 스위치'],
    ['smart-power-tailgate', '파워 테일게이트 / 스마트 테일게이트'],
    ['power-sliding-door', '파워 슬라이딩 도어'],
    ['e-hi-pass', '하이패스'],
    ['voice-recognition-system', '음성인식 시스템'],
    ['bluelink-connected-services', '블루링크 (Bluelink)'],
    ['wireless-phone-charging', '스마트폰 무선 충전 시스템']
  ];

  commonConfirmed.forEach(([id, section]) => {
    mark(id, {
      hev: true,
      section,
      aliases: section.split(' / '),
      matchedKeywords: section.split(' / ')
    });
  });

  addFeature('power-sliding-door', {
    slug: 'power-sliding-door',
    name: '파워 슬라이딩 도어',
    category: '도어/트렁크',
    officialCategory: '도어 / 슬라이딩 도어',
    aliases: ['파워 슬라이딩 도어', '슬라이딩 도어', '스마트 키 슬라이딩 도어'],
    summary: '스마트 키 또는 차량 버튼으로 스타리아의 슬라이딩 도어 열림/닫힘을 보조하는 기능입니다.',
    overview: '스타리아 매뉴얼 기준 파워 슬라이딩 도어는 스마트 키의 파워 슬라이딩 도어 열림/닫힘 버튼 또는 차량의 도어 조작부로 슬라이딩 도어를 전동으로 여닫는 기능입니다.',
    preconditions: ['파워 슬라이딩 도어 사양이 적용된 차량이어야 합니다.', '작동 전 도어 주변 사람과 장애물을 확인해야 합니다.'],
    settings: ['스마트 키의 파워 슬라이딩 도어 열림/닫힘 버튼 또는 차량 도어 조작부를 사용합니다.'],
    steps: ['스마트 키의 파워 슬라이딩 도어 열림/닫힘 버튼을 누릅니다.', '도어가 열리거나 닫히는 동안 주변 안전을 확인합니다.', '차량 버튼 또는 도어 핸들 조작으로도 슬라이딩 도어를 열고 닫을 수 있습니다.'],
    disable: ['도어 작동 중 다시 버튼을 누르거나 차량 도어 조작부를 조작해 작동을 중지합니다.'],
    limitations: ['작동 가능 거리, 스마트 키 배터리 상태, 전파 간섭, 도어 주변 장애물에 따라 작동이 제한될 수 있습니다.'],
    warnings: ['도어가 움직이는 동안 사람이나 물체가 끼이지 않도록 확인하십시오.', '차량을 떠나기 전 도어 잠금 상태를 확인하십시오.'],
    related: ['스마트 키', '스마트 파워 테일게이트'],
    manualEvidence: { ...evidence.ice, section: '스마트 키 사용하기 / 파워 슬라이딩 도어 열림/닫힘', matchedKeywords: ['파워 슬라이딩 도어', '슬라이딩 도어'] }
  }, true);

  const hevDetails = {
    'hybrid-smart-regen': {
      section: '회생 제동',
      aliases: ['회생 제동', '하이브리드 회생 제동'],
      overview: '스타리아 하이브리드 매뉴얼 기준 회생 제동은 차량 감속 및 제동 시 전기 모터의 이동 에너지를 전기 에너지로 변환해 배터리를 충전하는 기능입니다.',
      summary: '하이브리드 주행 중 감속 에너지를 회수해 배터리를 충전하는 기능입니다.',
      preconditions: ['하이브리드 차량 주행 중 감속 또는 제동 상황이어야 합니다.'],
      settings: ['매뉴얼 본문에서는 회생 제동을 하이브리드 시스템의 작동 설명 및 표시 항목으로 안내합니다.'],
      steps: ['가속 페달에서 발을 떼거나 브레이크 페달을 밟으면 차량 속도와 엔진 부하 상태에 따라 회생 제동이 작동합니다.'],
      disable: ['별도 해제 절차는 매뉴얼 본문에서 확인되지 않았으며, 주행 조건에 따라 시스템이 자동 제어합니다.'],
      limitations: ['배터리 상태와 주행 조건에 따라 회생 제동 작동량이 달라질 수 있습니다.'],
      warnings: ['회생 제동 감속감이 일정하지 않을 수 있으므로 필요한 경우 브레이크 페달로 직접 감속하십시오.']
    },
    'hybrid-regen-level': {
      section: '회생 제동',
      aliases: ['회생 제동', '회생 제동량'],
      overview: '스타리아 하이브리드 매뉴얼 기준 회생 제동은 감속 및 제동 때 배터리 충전을 위해 작동하며 주행 조건에 따라 제동감이 달라질 수 있습니다.',
      summary: '감속 및 제동 시 에너지를 회수하는 하이브리드 회생 제동 기능입니다.',
      preconditions: ['하이브리드 주행 중 감속 조건이어야 합니다.'],
      settings: ['매뉴얼 본문에서는 회생 제동 관련 표시와 작동 설명을 하이브리드 주행 정보로 안내합니다.'],
      steps: ['가속 페달에서 발을 떼거나 브레이크 페달을 밟아 감속합니다.', '차량 속도와 엔진 부하 상태에 따라 회생 제동이 작동합니다.'],
      disable: ['별도 해제 절차는 매뉴얼 본문에서 확인되지 않았으며 시스템이 자동 제어합니다.'],
      limitations: ['주행 조건과 배터리 상태에 따라 작동 정도가 달라질 수 있습니다.'],
      warnings: ['회생 제동만으로 모든 감속이 보장되지 않으므로 운전자가 직접 제동해야 합니다.']
    },
    'hybrid-energy-flow': {
      section: '하이브리드 에너지 흐름도',
      aliases: ['하이브리드 에너지 흐름', '에너지 흐름도', '에너지 흐름'],
      overview: '스타리아 하이브리드 매뉴얼 기준 하이브리드 에너지 흐름도는 주행 상태에 따른 시스템 동력 전달 상태와 엔진 상태를 클러스터에 표시합니다.',
      summary: '엔진, 모터, 배터리 사이의 에너지 흐름을 클러스터에서 확인하는 하이브리드 전용 표시 기능입니다.',
      preconditions: ['차량 전원이 켜져 있고 클러스터 주행 정보 표시가 가능해야 합니다.'],
      settings: ['클러스터 주행 정보 화면에서 하이브리드 에너지 흐름도 항목을 확인합니다.'],
      steps: ['클러스터 주행 정보에서 하이브리드 에너지 흐름도를 확인합니다.', '정차, 모터 구동, 엔진/모터 구동, 엔진 구동 등 상태별 에너지 흐름을 확인합니다.'],
      disable: ['클러스터 표시 항목을 다른 주행 정보 화면으로 변경합니다.'],
      limitations: ['표시 내용은 실제 주행 상태와 시스템 제어 상태에 따라 달라집니다.'],
      warnings: ['표시는 운전자 정보 제공용이며 주행 판단은 운전자가 직접 해야 합니다.']
    },
    'hybrid-battery-status': {
      section: '고전압 배터리 충전량(SOC) 표시계',
      aliases: ['고전압 배터리', '배터리 충전 상태', 'SOC'],
      overview: '스타리아 하이브리드 매뉴얼 기준 고전압 배터리 충전량 표시계는 시동 ON 상태에서 고전압 배터리 충전 상태를 표시합니다.',
      summary: '고전압 배터리 충전 상태를 클러스터에서 확인하는 하이브리드 전용 표시 기능입니다.',
      preconditions: ['시동 ON 상태여야 합니다.'],
      settings: ['클러스터에서 고전압 배터리 충전량 표시계를 확인합니다.'],
      steps: ['클러스터의 고전압 배터리 충전량 표시계를 확인합니다.', 'L 위치는 용량 부족, H 위치는 완전 충전 상태를 의미합니다.'],
      disable: ['표시 항목을 다른 클러스터 화면으로 변경합니다.'],
      limitations: ['표시 상태는 주행 및 충전 상태에 따라 변동됩니다.'],
      warnings: ['배터리 관련 경고가 표시되면 안전한 곳에 정차 후 안내에 따라 조치하십시오.']
    },
    'hybrid-driving-info': {
      section: '하이브리드 자동차 주행하기',
      aliases: ['EV 모드 표시등', '하이브리드 주행 정보'],
      overview: '스타리아 하이브리드 매뉴얼 기준 EV 모드 표시등은 모터를 이용해 주행하는 상태를 표시합니다.',
      summary: '하이브리드 주행 중 모터 구동 상태와 주행 정보를 확인하는 기능입니다.',
      preconditions: ['하이브리드 차량 전원이 켜져 있고 클러스터 표시가 가능해야 합니다.'],
      settings: ['클러스터 주행 정보 또는 하이브리드 관련 표시 항목을 확인합니다.'],
      steps: ['클러스터에서 EV 모드 표시등 또는 하이브리드 주행 정보를 확인합니다.', '정차 중 엔진 정지 또는 주행 중 모터 단독 구동 상태를 확인합니다.'],
      disable: ['클러스터 표시 항목을 다른 화면으로 변경합니다.'],
      limitations: ['표시 정보는 주행 조건과 시스템 상태에 따라 달라집니다.'],
      warnings: ['표시 정보는 참고용이며 안전 주행을 우선하십시오.']
    }
  };

  Object.entries(hevDetails).forEach(([id, detail]) => {
    mark(id, {
      ice: false,
      hev: true,
      section: detail.section,
      aliases: detail.aliases,
      matchedKeywords: detail.aliases,
      update: detail
    });
  });

  [
    'rspa',
    'rspa2',
    'spa',
    'remote-smart-exit',
    'memory-reverse-assist',
    'memory-parking',
    'built-in-cam2',
    'built-in-cam2-plus',
    'feature-on-demand',
    'panoramic-curved-display',
    'tmed2-hybrid-system',
    'hybrid-stay-mode',
    'hybrid-stay-reservation',
    'hybrid-v2l',
    'hybrid-stationary-climate',
    'ev-charge-v2l',
    'plug-and-charge',
    'battery-conditioning',
    'scheduled-charging',
    'charge-limit',
    'passenger-talk',
    'passenger-view',
    'rear-voice-recognition',
    'swiveling-seat'
  ].forEach(removeApply);
};

window.applyStariaManualAudit();
