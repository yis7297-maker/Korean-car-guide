/* CE1 2025 Owners Manual vehicle-specific audit overlay.
 * Scope: Hyundai IONIQ 6 CE1 2025 only. IONIQ 6 N or other EVs are excluded.
 * Source:
 * - work/manual-text/CE1_2025_ko_KR.txt
 */
window.applyIoniq6ManualAudit = function applyIoniq6ManualAudit() {
  if (!Array.isArray(window.features) && typeof features === 'undefined') return;

  const today = '2026-07-09';
  const featureList = window.features || features;
  const ensureArray = value => Array.isArray(value) ? value : [];
  const uniq = items => [...new Set(ensureArray(items).filter(Boolean))];
  const findFeature = id => featureList.find(feature => feature.id === id);
  const applyIoniq6 = {
    vehicleId: 'hy-ioniq6',
    brand: '현대',
    model: '아이오닉 6',
    years: '2025',
    trim: 'CE1 해당 사양/트림',
    option: 'Owners Manual 수록 사양 기준'
  };
  const evidence = {
    manualFile: 'CE1_2025_ko_KR.txt',
    modelCode: 'CE1',
    modelName: '아이오닉 6',
    modelYear: '2025',
    basis: 'official_owner_manual',
    verifiedBy: 'vehicle-manual-audit',
    pageRange: 'CE1_2025_ko_KR.txt 본문 검색 확인'
  };

  const upsertApply = (feature, apply) => {
    feature.applies = ensureArray(feature.applies);
    const existing = feature.applies.find(item => item.vehicleId === apply.vehicleId);
    if (existing) Object.assign(existing, apply);
    else feature.applies.push({ ...apply });
  };
  const removeIoniq6Apply = id => {
    const feature = findFeature(id);
    if (!feature || !Array.isArray(feature.applies)) return;
    feature.applies = feature.applies.filter(apply => apply.vehicleId !== 'hy-ioniq6');
  };
  const mark = (id, config = {}) => {
    const feature = findFeature(id);
    if (!feature) return false;
    upsertApply(feature, applyIoniq6);
    feature.sources = uniq([...(feature.sources || []), 'hyundaiManual']);
    feature.aliases = uniq([...(feature.aliases || []), ...(config.aliases || [])]);
    feature.keywords = uniq([...(feature.keywords || []), ...(config.aliases || [])]);
    if (config.update) Object.assign(feature, config.update);
    feature.manualEvidence = {
      ...evidence,
      section: config.section || feature.name,
      matchedKeywords: config.matchedKeywords || config.aliases || [feature.name]
    };
    feature.vehicleAudit = {
      ...(feature.vehicleAudit || {}),
      hyIoniq6Ce12025: { confirmed: true, manualFile: 'CE1_2025_ko_KR.txt', matchedKeywords: config.matchedKeywords || config.aliases || [feature.name], updatedAt: today }
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
      category: feature.category || 'EV 전용 기능',
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
  const addFeature = (id, feature) => {
    makeFeature(id, feature);
    const f = findFeature(id);
    if (!f) return;
    upsertApply(f, applyIoniq6);
    f.sources = uniq([...(f.sources || []), 'hyundaiManual']);
    f.manualEvidence = feature.manualEvidence || { ...evidence, section: feature.officialCategory || feature.name, matchedKeywords: feature.aliases || [feature.name] };
    f.vehicleAudit = {
      ...(f.vehicleAudit || {}),
      hyIoniq6Ce12025: { confirmed: true, manualFile: 'CE1_2025_ko_KR.txt', matchedKeywords: feature.aliases || [feature.name], updatedAt: today }
    };
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
    ['rspa', '원격 스마트 주차 보조 (RSPA)'],
    ['spa', '스마트 주차 보조 (SPA)'],
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
    ['ccnc-ota', '무선 소프트웨어 업데이트 / OTA'],
    ['apple-carplay-wired', 'Apple CarPlay / 카플레이'],
    ['android-auto-wired', 'Android Auto / 안드로이드 오토'],
    ['smart-key', '스마트 키'],
    ['emergency-key', '비상 키'],
    ['remote-engine-start', '원격 시동'],
    ['remote-climate', '원격 공조'],
    ['climate-control', '히터 및 에어컨'],
    ['air-purification', '공기 청정'],
    ['after-blow', '애프터 블로우'],
    ['heated-ventilated-seats', '열선/통풍 시트'],
    ['relaxation-comfort-seat', '릴렉션 컴포트 시트'],
    ['walk-in-device', '동승석 측면 워크인 스위치'],
    ['e-hi-pass', '하이패스'],
    ['voice-recognition-system', '음성인식 시스템'],
    ['bluelink-connected-services', '블루링크 (Bluelink)'],
    ['wireless-phone-charging', '스마트폰 무선 충전 시스템']
  ];
  commonConfirmed.forEach(([id, section]) => mark(id, { section, aliases: section.split(' / '), matchedKeywords: section.split(' / ') }));

  const evUpdates = {
    'plug-and-charge': {
      section: 'Plug & Charge',
      aliases: ['Plug & Charge', '플러그 앤 차지'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 Plug & Charge는 Electric Vehicle의 EV 설정에서 제공되는 전기차 특화 기능입니다.',
        settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 설정 > Plug & Charge를 선택합니다.'],
        steps: ['EV 설정에서 Plug & Charge 항목을 확인하고 안내에 따라 기능을 사용합니다.'],
        limitations: ['지원 충전기, 서비스 가입 상태, 차량 설정 상태에 따라 사용 가능 여부가 달라질 수 있습니다.'],
        warnings: ['충전기 안내와 차량 화면 안내를 함께 확인하십시오.']
      }
    },
    'ev-route-planner': {
      section: '충전소 검색 기능 / 배터리 컨디셔닝 내비게이션 연동',
      aliases: ['충전소 검색 기능 사용하기', '급속 충전소 목적지', '목적지나 경유지'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 충전소 검색 기능과 배터리 컨디셔닝 내비게이션 연동은 충전소 위치 확인 및 급속/초급속 충전소 목적지 설정과 연계됩니다.',
        settings: ['주변 충전소 위치는 충전소 검색 기능을 사용합니다.', '배터리 컨디셔닝은 Electric Vehicle > EV 충전 설정 > 배터리 컨디셔닝 모드에서 설정합니다.'],
        steps: ['충전소 검색 기능으로 주변 충전소를 확인합니다.', '내비게이션에서 급속 또는 초급속 충전소를 목적지나 경유지로 설정하면 배터리 컨디셔닝 기능이 충전소 도착 시간에 맞춰 작동할 수 있습니다.'],
        limitations: ['배터리 충전량이 적거나 배터리 온도가 이미 적합한 경우 배터리 컨디셔닝 기능이 작동하지 않을 수 있습니다.'],
        warnings: ['충전소 도착 전 주행 가능 거리와 충전소 운영 상태를 확인하십시오.']
      }
    },
    'battery-conditioning': {
      section: '배터리 컨디셔닝 기능',
      aliases: ['배터리 컨디셔닝', '배터리 컨디셔닝 모드'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 배터리 컨디셔닝은 고속 충전에 적합한 배터리 온도를 제공하기 위해 고전압 배터리 온도를 조절하는 기능입니다.',
        settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 충전 설정 > 배터리 컨디셔닝 모드를 선택한 후 사용을 누릅니다.'],
        steps: ['EV 충전 설정에서 배터리 컨디셔닝 모드를 켭니다.', '내비게이션에서 급속 또는 초급속 충전소를 목적지나 경유지로 설정하면 충전소 도착 시간에 맞춰 기능이 작동할 수 있습니다.'],
        disable: ['인포테인먼트 시스템의 배터리 컨디셔닝 모드 화면에서 기능을 끕니다.'],
        limitations: ['배터리 충전량이 적거나 배터리 온도가 이미 주행 및 충전에 적합한 경우 작동하지 않을 수 있습니다.'],
        warnings: ['배터리 온도 조절에 고전압 배터리 에너지를 사용하므로 주행 가능 거리가 짧아질 수 있습니다.']
      }
    },
    'scheduled-charging': {
      section: '예약 충전 / 완속 충전 설정',
      aliases: ['예약 충전', '충전 스케줄', '출발 시간 연동', '완속 충전 설정'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 예약 충전은 EV 충전 설정에서 완속 충전 조건과 출발 시간 연동을 설정해 충전 시간을 관리하는 기능입니다.',
        settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 충전 설정 > 완속 충전 설정을 선택합니다.'],
        steps: ['완속 충전 설정에서 예약 충전 옵션과 충전 전류를 설정합니다.', '필요한 경우 출발 시간 연동을 설정합니다.', '예약 충전 설정 중이면 충전 연결 시 예약 충전 메시지가 표시됩니다.'],
        disable: ['EV 충전 설정의 완속 충전 설정에서 예약 충전 옵션을 해제합니다.'],
        limitations: ['예약 공조 작동 중에는 충전 예상 소요 시간이 다르게 표시될 수 있습니다.'],
        warnings: ['충전 케이블 연결 상태와 충전기 상태를 확인하십시오.']
      }
    },
    'charge-limit': {
      section: '충전 목표 배터리량 설정',
      aliases: ['충전 목표 배터리량', '목표 배터리량', '충전 한도'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 충전 목표 배터리량 설정은 급속 충전 및 완속 충전 시 목표 배터리량을 설정하는 기능입니다.',
        settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 충전 설정 > 충전 목표 배터리량 설정을 선택합니다.'],
        steps: ['급속 충전과 완속 충전에 사용할 목표 배터리량을 설정합니다.', '설정한 목표량에 따라 충전이 관리됩니다.'],
        limitations: ['충전기 상태, 외기 온도, 배터리 온도에 따라 실제 충전 전력과 시간이 달라질 수 있습니다.'],
        warnings: ['장기간 보관 전에는 배터리 충전량을 확인하십시오.']
      }
    },
    'v2l-parent': {
      section: '전기 사용(V2L) 기능 활용하기',
      aliases: ['전기 사용(V2L)', 'V2L', '방전 제한량'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 전기 사용(V2L)은 구동용 고전압 배터리의 전력을 외부 전기기기에 공급하는 기능입니다.',
        settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 설정 > 전기 사용(V2L) 설정을 선택합니다.', '전기 사용(V2L) 기능 사용 시 구동용 배터리의 방전 제한량을 설정합니다.'],
        steps: ['V2L 커넥터 또는 차량 내 전원 공급 장치를 연결합니다.', '전기 사용 후 V2L 커넥터의 스위치를 눌러 전원을 끕니다.'],
        disable: ['V2L 커넥터의 스위치를 눌러 전원을 끄고 차량 도어 잠금을 해제하면 커넥터 잠금이 해제됩니다.'],
        limitations: ['전기 사용(V2L)은 고전압 배터리 에너지를 사용하므로 주행 가능 거리가 감소합니다.'],
        warnings: ['전기 사용 기능을 빈번하게 사용하면 고전압 배터리 수명이 짧아질 수 있습니다.']
      }
    },
    'v2l-indoor': { section: '전기 사용(V2L) 기능 활용하기', aliases: ['전기 사용(V2L)', '실내 V2L'] },
    'v2l-outdoor': { section: '전기 사용(V2L) 기능 활용하기', aliases: ['전기 사용(V2L)', '실외 V2L', 'V2L 커넥터'] },
    'utility-mode': {
      section: '유틸리티 모드',
      aliases: ['유틸리티 모드'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 유틸리티 모드는 EV 설정에서 제공되는 전기차 특화 기능입니다.',
        settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 설정 > 유틸리티 모드를 선택합니다.'],
        steps: ['EV 설정에서 유틸리티 모드를 선택하고 화면 안내에 따라 사용합니다.'],
        limitations: ['배터리 충전량과 차량 상태에 따라 사용 가능 여부가 달라질 수 있습니다.'],
        warnings: ['고전압 배터리 잔량과 주행 가능 거리를 확인하십시오.']
      }
    },
    'ev-charge-status': {
      section: '충전 상태 확인하기',
      aliases: ['충전 상태 확인', '충전 표시등', '충전 상태'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 충전 상태는 충전 도어 내부 또는 차량 외부 충전 상태 표시등으로 확인합니다.',
        settings: ['차량 도어가 잠금 해제된 상태에서 충전 도어의 열림 표시부를 눌러 충전 도어를 엽니다.'],
        steps: ['충전 도어 내부의 충전 표시등을 확인합니다.', '충전 표시등을 참고해 충전 상태를 확인합니다.'],
        limitations: ['표시 정보는 충전 상태와 차량 상태에 따라 달라질 수 있습니다.'],
        warnings: ['충전 중에는 충전 커넥터를 강제로 분리하지 마십시오.']
      }
    },
    'ev-energy-usage': {
      section: '에너지 정보 확인하기 / 전력 소비량 확인하기',
      aliases: ['에너지 정보', '전력 소비량', '연비 이력', '에너지 사용량'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 에너지 정보 화면에서는 전력 소비량과 연비 이력을 확인할 수 있습니다.',
        settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > 에너지 정보를 선택합니다.'],
        steps: ['에너지 정보 화면에서 전력 소비량을 선택합니다.', '차량 내부 시스템별 현재 전력 소비량을 확인합니다.'],
        limitations: ['표시 정보는 주행 상태와 차량 시스템 사용 상태에 따라 달라집니다.'],
        warnings: ['에너지 정보는 참고용이며 주행 가능 거리와 충전 계획을 함께 확인하십시오.']
      }
    },
    'ev-battery-health': {
      section: '배터리 사용 시 주의사항 / 배터리 상태',
      aliases: ['배터리 상태', '고전압 배터리', '주행 가능 거리'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 고전압 배터리 상태와 주행 가능 거리는 충전량, 외기 온도, 주행 조건, 공조 사용에 따라 달라집니다.',
        settings: ['클러스터와 Electric Vehicle 화면에서 배터리 충전량과 주행 가능 거리를 확인합니다.'],
        steps: ['고전압 배터리 충전량과 주행 가능 거리를 확인합니다.', '장기간 차량을 사용하지 않는 경우 약 3개월에 한 번씩 차량을 충전합니다.'],
        limitations: ['고속 주행, 오르막길, 냉난방 사용, 외기 온도에 따라 주행 가능 거리가 짧아질 수 있습니다.'],
        warnings: ['고전압 배터리 충전계 게이지가 10% 이하로 내려가지 않도록 유지하십시오.', '충돌 및 사고가 발생해 차량이 큰 충격을 받은 경우 점검을 받으십시오.']
      }
    },
    'i-pedal': {
      section: '아이 페달(i-PEDAL) 사용하기',
      aliases: ['i-PEDAL', 'i-Pedal', '아이 페달', '원 페달 드라이빙'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 아이 페달(i-PEDAL)은 가속 페달만으로 차량을 가속하거나 감속 또는 정차할 수 있도록 돕는 기능입니다.',
        settings: ['회생 제동량이 3단계일 때 회생 제동 증가 레버를 한 번 당깁니다.'],
        steps: ['회생 제동량을 3단계로 설정합니다.', '회생 제동 증가 레버를 한 번 당겨 아이 페달 기능을 켭니다.', '가속 페달로 가속, 감속 또는 정차를 조절합니다.'],
        disable: ['아이 페달 기능을 끄려면 회생 제동 감소 레버를 조작합니다.'],
        limitations: ['경사로, 미끄러운 도로, 적재 중량이 높은 경우 등에서는 차량 정지 기능이 제한될 수 있습니다.'],
        warnings: ['아이 페달 기능으로 차량을 멈출 수 없을 수 있으므로 필요할 경우 직접 브레이크 페달을 밟아 감속하십시오.']
      }
    },
    'ev-smart-regeneration': {
      section: '스마트 회생 제동 기능 사용하기',
      aliases: ['스마트 회생 제동', '스마트 회생제동'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 스마트 회생 제동은 주행 상황에 따라 회생 제동을 보조하는 기능입니다.',
        settings: ['차량 설정 또는 회생 제동 관련 설정에서 스마트 회생 제동 기능을 확인합니다.'],
        steps: ['스마트 회생 제동 기능을 켠 뒤 주행합니다.', '차량이 주행 상황에 따라 회생 제동을 조절합니다.'],
        limitations: ['센서 인식 상태, 주행 환경, 도로 조건에 따라 작동이 제한될 수 있습니다.'],
        warnings: ['회생 제동 보조 기능이며 운전자가 직접 감속과 제동을 책임져야 합니다.']
      }
    },
    'ev-regen-level': {
      section: '회생 제동 기능 사용하기',
      aliases: ['회생 제동', '회생 제동 단계', '회생 제동량'],
      update: {
        overview: '아이오닉 6 매뉴얼 기준 회생 제동은 스티어링 휠 레버로 제동량을 조절해 감속 에너지를 회수하는 기능입니다.',
        settings: ['스티어링 휠의 회생 제동 증가/감소 레버를 사용합니다.'],
        steps: ['회생 제동 증가 레버를 당겨 제동량을 높입니다.', '회생 제동 감소 레버를 당겨 제동량을 낮춥니다.', '클러스터에서 회생 제동량 단계를 확인합니다.'],
        limitations: ['브레이크 페달로 감속 중이거나 스마트 크루즈 컨트롤 작동 중, 배터리 충전량이 100%인 경우 등에서는 회생 제동량 변경이 제한될 수 있습니다.'],
        warnings: ['회생 제동만으로 정차가 보장되지 않으므로 필요 시 브레이크 페달을 밟으십시오.']
      }
    }
  };
  Object.entries(evUpdates).forEach(([id, config]) => mark(id, config));

  addFeature('ev-driving-range', {
    slug: 'ev-driving-range',
    name: 'EV 주행 가능 거리',
    category: 'EV 전용 기능',
    officialCategory: '전기차 / 주행 가능 거리',
    aliases: ['주행 가능 거리', 'EV 주행 가능 거리', '고전압 배터리 주행 가능 거리'],
    summary: '고전압 배터리 충전량과 주행 조건을 바탕으로 차량의 주행 가능 거리를 표시합니다.',
    preconditions: ['차량 전원이 켜져 있고 클러스터 또는 EV 화면 표시가 가능해야 합니다.'],
    settings: ['클러스터와 Electric Vehicle 화면에서 주행 가능 거리와 배터리 충전량을 확인합니다.'],
    steps: ['고전압 배터리 충전량과 주행 가능 거리를 확인합니다.', '히터, 에어컨, 고속 주행, 오르막길 등 주행 가능 거리에 영향을 주는 조건을 함께 확인합니다.'],
    limitations: ['외기 온도, 주행 조건, 공조 사용, 고속 주행, 오르막길 주행에 따라 주행 가능 거리가 달라집니다.'],
    warnings: ['주행 가능 거리에 여유를 두고 충전 계획을 세우십시오.'],
    related: ['충전 상태 확인', '에너지 사용량'],
    manualEvidence: { ...evidence, section: '배터리 사용 시 주의사항 / 주행 가능 거리', matchedKeywords: ['주행 가능 거리', '고전압 배터리'] }
  });
  addFeature('ev-charging-current-setting', {
    slug: 'ev-charging-current-setting',
    name: '충전 전류 설정',
    category: 'EV 전용 기능',
    officialCategory: '전기차 / 완속 충전 설정',
    aliases: ['충전 전류', '충전 전류 설정', '완속 충전 설정'],
    summary: '완속 충전 또는 휴대용 충전 시 충전 전류를 설정하는 기능입니다.',
    preconditions: ['완속 충전 또는 휴대용 충전 조건이어야 합니다.'],
    settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 충전 설정 > 완속 충전 설정을 선택합니다.'],
    steps: ['완속 충전 설정에서 충전 전류를 설정합니다.', '휴대용 충전기 사용 시 제어 박스의 버튼을 길게 눌러 충전 전류를 설정합니다.'],
    disable: ['충전 설정에서 충전 전류를 변경하거나 충전을 종료합니다.'],
    limitations: ['공급 전원의 정격 전류와 충전기 사양에 따라 설정 가능한 전류가 제한됩니다.'],
    warnings: ['가정용 전력의 충전 전압, 전류 및 부하 조건을 확인한 후 사용하십시오.'],
    related: ['충전 예약', '충전 상태 확인'],
    manualEvidence: { ...evidence, section: '완속 충전 설정 / 충전 전류 설정', matchedKeywords: ['충전 전류', '완속 충전 설정'] }
  });
  addFeature('charging-connector-lock', {
    slug: 'charging-connector-lock',
    name: '충전 커넥터 잠금 모드',
    category: 'EV 전용 기능',
    officialCategory: '전기차 / 충전 커넥터 잠금',
    aliases: ['충전 커넥터 잠금', '충전 중 잠금', '상시 잠금'],
    summary: '완속 충전 중 충전 커넥터가 의도치 않게 분리되는 것을 방지하기 위해 잠금 방식을 설정합니다.',
    preconditions: ['충전 커넥터가 차량에 연결되어 있거나 완속 충전 설정을 변경할 수 있어야 합니다.'],
    settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 충전 설정 > 완속 충전 설정을 선택합니다.'],
    steps: ['완속 충전 설정의 상세 기능에서 상시 잠금, 충전 중 잠금, 사용 안 함 중 하나를 선택합니다.', '급속 충전 및 전기 사용(V2L) 기능 사용 중에는 설정과 관계없이 커넥터가 자동으로 잠깁니다.'],
    disable: ['사용 안 함을 선택하거나 충전 종료 후 도어 잠금을 해제해 커넥터 잠금을 해제합니다.'],
    limitations: ['급속 충전 및 V2L 사용 중에는 설정과 관계없이 커넥터가 자동으로 잠깁니다.'],
    warnings: ['충전 커넥터 잠금 해제 버튼을 누르지 않은 상태로 강제로 분리하지 마십시오.'],
    related: ['충전 예약', 'V2L'],
    manualEvidence: { ...evidence, section: '충전 커넥터 잠금 모드 설정하기', matchedKeywords: ['충전 커넥터 잠금 모드', '상시 잠금', '충전 중 잠금'] }
  });
  addFeature('ev-charging-information', {
    slug: 'ev-charging-information',
    name: '전기차 충전 정보',
    category: 'EV 전용 기능',
    officialCategory: '전기차 / 충전 정보',
    aliases: ['전기차 충전 정보', '완속 충전', '급속 충전', '휴대용 충전'],
    summary: '완속 충전, 급속 충전, 휴대용 충전 방식과 충전 전 안전 정보를 확인하는 기능입니다.',
    preconditions: ['차량 충전 전 충전 방식과 충전기 상태를 확인해야 합니다.'],
    settings: ['전기차 충전 정보 화면과 매뉴얼의 충전 방식 안내를 확인합니다.'],
    steps: ['완속 충전, 급속 충전, 휴대용 충전 중 사용할 충전 방식을 확인합니다.', '충전 케이블과 충전기 상태를 확인한 뒤 차량 충전을 시작합니다.'],
    disable: ['충전 완료 후 충전 커넥터를 정상 절차에 따라 분리하고 충전 도어를 닫습니다.'],
    limitations: ['배터리 상태, 사용 기간, 충전기 사양, 주변 온도에 따라 충전 시간이 달라질 수 있습니다.'],
    warnings: ['의료용 전기 기기 사용자는 충전 전 의료진 및 기기 제조 업체에 문의하십시오.', '급속 충전을 지속적으로 반복하면 배터리 성능과 수명이 감소할 수 있습니다.'],
    related: ['충전 상태 확인', '충전 커넥터 잠금 모드'],
    manualEvidence: { ...evidence, section: '전기차 충전 정보 확인하기', matchedKeywords: ['전기차 충전 정보', '완속 충전', '급속 충전', '휴대용 충전'] }
  });
  addFeature('ev-menu-settings', {
    slug: 'ev-menu-settings',
    name: 'EV 메뉴 / EV 설정',
    category: 'EV 전용 기능',
    officialCategory: '전기차 / Electric Vehicle 메뉴',
    aliases: ['EV 메뉴', 'EV 설정', 'Electric Vehicle', 'EV 충전 설정'],
    summary: 'Electric Vehicle 화면에서 에너지 정보, EV 충전 설정, EV 설정 등 전기차 전용 기능을 관리합니다.',
    preconditions: ['인포테인먼트 시스템에서 Electric Vehicle 메뉴 접근이 가능해야 합니다.'],
    settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle을 선택합니다.'],
    steps: ['Electric Vehicle 화면에서 에너지 정보를 선택해 전력 소비량과 연비 이력을 확인합니다.', 'EV 충전 설정에서 완속 충전 설정, 충전 목표 배터리량, V2L 설정을 조정합니다.', 'EV 설정에서 배터리 컨디셔닝, 유틸리티 모드, Plug & Charge를 확인합니다.'],
    disable: ['다른 인포테인먼트 화면으로 이동합니다.'],
    limitations: ['인포테인먼트 시스템 소프트웨어 버전에 따라 화면 구성이 달라질 수 있습니다.'],
    warnings: ['주행 중 화면 조작은 안전한 상태에서 최소화하십시오.'],
    related: ['충전 예약', 'Battery Conditioning', 'V2L'],
    manualEvidence: { ...evidence, section: 'EV 모드 기능 사용하기 / Electric Vehicle', matchedKeywords: ['Electric Vehicle', 'EV 충전 설정', 'EV 설정'] }
  });
  addFeature('ev-charging-station-search', {
    slug: 'ev-charging-station-search',
    name: '충전소 검색 기능',
    category: 'EV 전용 기능',
    officialCategory: '전기차 / 충전소 검색',
    aliases: ['충전소 검색 기능 사용하기', '충전소 검색', '전기 충전소 목록'],
    summary: '주변 충전소 위치를 검색하고 전기 충전소 목록을 확인하는 전기차 전용 기능입니다.',
    preconditions: ['인포테인먼트 시스템에서 Electric Vehicle 메뉴를 사용할 수 있어야 합니다.'],
    settings: ['Electric Vehicle 화면의 메뉴에서 전기 충전소 목록 또는 충전소 검색 기능을 선택합니다.'],
    steps: ['Electric Vehicle 메뉴에서 충전소 검색 기능을 실행합니다.', '주변 충전소 위치 또는 전기 충전소 목록을 확인합니다.'],
    disable: ['다른 메뉴로 이동하거나 충전소 검색 화면을 닫습니다.'],
    limitations: ['충전소 정보는 차량 통신 상태, 내비게이션 정보, 충전소 운영 상태에 따라 달라질 수 있습니다.'],
    warnings: ['충전소까지 이동하기 전 주행 가능 거리와 충전소 이용 가능 여부를 확인하십시오.'],
    related: ['EV Route Planner', 'Battery Conditioning'],
    manualEvidence: { ...evidence, section: '충전소 검색 기능 사용하기', matchedKeywords: ['충전소 검색 기능 사용하기', '전기 충전소 목록'] }
  });
  addFeature('v2l-discharge-limit', {
    slug: 'v2l-discharge-limit',
    name: 'V2L 방전 제한량 설정',
    category: 'EV 전용 기능',
    officialCategory: '전기차 / 전기 사용(V2L) 설정',
    aliases: ['전기 사용(V2L) 시 방전 제한량 설정하기', '방전 제한량', 'V2L 방전 제한량'],
    summary: 'V2L 사용 중 고전압 배터리가 설정한 방전 제한량에 도달하면 전기 사용을 차단하도록 설정하는 기능입니다.',
    preconditions: ['전기 사용(V2L) 기능을 사용할 수 있는 차량이어야 합니다.'],
    settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 충전 설정 > 전기 사용(V2L) 설정을 선택합니다.'],
    steps: ['원하는 방전 제한량을 설정합니다.', '방전 제한량은 20% 이상 80% 이하로 설정할 수 있습니다.', '배터리 충전량이 설정된 방전 제한량에 도달하면 전기 사용(V2L) 기능이 자동으로 차단됩니다.'],
    disable: ['전기 사용(V2L) 설정에서 방전 제한량을 변경하거나 V2L 사용을 종료합니다.'],
    limitations: ['고전압 배터리 충전량과 전기 사용량에 따라 사용 시간이 달라집니다.'],
    warnings: ['전기 사용(V2L)은 고전압 배터리 에너지를 사용하므로 주행 가능 거리가 감소합니다.'],
    related: ['V2L', '실외 V2L', '실내 V2L'],
    manualEvidence: { ...evidence, section: '전기 사용(V2L) 시 방전 제한량 설정하기', matchedKeywords: ['방전 제한량', '전기 사용(V2L) 설정'] }
  });
  addFeature('one-pedal-driving', {
    slug: 'one-pedal-driving',
    name: '원 페달 드라이빙',
    category: 'EV 전용 기능',
    officialCategory: '전기차 / 회생 제동',
    aliases: ['원 페달 드라이빙', '회생 제동 증가 레버', '원 페달'],
    summary: '회생 제동 증가 레버를 길게 당겨 제동량을 높이고 차량 정차까지 보조하는 전기차 주행 기능입니다.',
    preconditions: ['차량이 D(주행) 상태이고 회생 제동 레버 조작이 가능한 상태여야 합니다.'],
    settings: ['스티어링 휠의 회생 제동 증가 레버와 회생 제동 감소 레버를 사용합니다.'],
    steps: ['회생 제동 증가 레버를 0.5초 이상 길게 당깁니다.', '당긴 상태를 유지하면 제동량이 증가하고 차량이 정차합니다.'],
    disable: ['회생 제동 증가 레버 조작을 중지하거나 회생 제동 단계를 변경합니다.'],
    limitations: ['경사로, 미끄러운 도로, 휠 슬립, 높은 적재 중량, 차량 기울어짐 등에서는 정지 기능이 제한될 수 있습니다.'],
    warnings: ['차량 또는 도로 상태에 따라 원 페달 드라이빙 기능으로 차량을 멈출 수 없을 수 있으므로 필요 시 직접 브레이크 페달을 밟으십시오.'],
    related: ['i-Pedal', '회생제동 단계 조절'],
    manualEvidence: { ...evidence, section: '원 페달 드라이빙 사용하기', matchedKeywords: ['원 페달 드라이빙', '회생 제동 증가 레버'] }
  });
  addFeature('ev-efficiency-history', {
    slug: 'ev-efficiency-history',
    name: 'EV 연비 이력',
    category: 'EV 전용 기능',
    officialCategory: '전기차 / 에너지 정보',
    aliases: ['연비 이력', 'EV 연비 이력', '에너지 정보'],
    summary: 'Electric Vehicle의 에너지 정보 화면에서 전력 소비량과 함께 연비 이력을 확인하는 기능입니다.',
    preconditions: ['인포테인먼트 시스템에서 Electric Vehicle 메뉴와 에너지 정보 화면을 사용할 수 있어야 합니다.'],
    settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > 에너지 정보를 선택합니다.'],
    steps: ['에너지 정보 화면에서 연비 이력을 확인합니다.', '전력 소비량 화면과 함께 주행 후 효율 정보를 참고합니다.'],
    disable: ['다른 Electric Vehicle 화면 또는 인포테인먼트 메뉴로 이동합니다.'],
    limitations: ['표시되는 이력은 차량 사용 상태와 저장된 주행 정보에 따라 달라질 수 있습니다.'],
    warnings: ['연비 이력은 참고용 정보이며 실제 주행 가능 거리는 도로 조건과 공조 사용 등에 따라 달라질 수 있습니다.'],
    related: ['에너지 사용량', 'EV 주행 가능 거리'],
    manualEvidence: { ...evidence, section: '에너지 정보 확인하기 / 연비 이력', matchedKeywords: ['연비 이력', '에너지 정보'] }
  });

  [
    'iccu-energy-control',
    'camping-mode',
    'ccnc-system',
    'built-in-cam2',
    'built-in-cam2-plus',
    'tmed2-hybrid-system',
    'hybrid-stay-mode',
    'hybrid-stay-reservation',
    'hybrid-v2l',
    'hybrid-smart-regen',
    'hybrid-regen-level',
    'hybrid-energy-flow',
    'hybrid-battery-status',
    'hybrid-driving-info',
    'hybrid-stationary-climate',
    'nexo-h2-refuel',
    'nexo-fcev-info',
    'nexo-smart-regen',
    'nexo-eco-coaching',
    'fcev-energy-flow',
    'fcev-dedicated-system',
    'swiveling-seat'
  ].forEach(removeIoniq6Apply);
};

window.applyIoniq6ManualAudit();
