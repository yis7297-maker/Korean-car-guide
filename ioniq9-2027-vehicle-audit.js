/* ME 2027 Owners Manual vehicle-specific audit overlay.
 * Scope: Hyundai IONIQ 9 ME 2027 only.
 * Source:
 * - work/manual-text/ME_2027_ko_KR.txt
 */
window.applyIoniq9ManualAudit = function applyIoniq9ManualAudit() {
  if (!Array.isArray(window.features) && typeof features === 'undefined') return;

  const today = '2026-07-09';
  const featureList = window.features || features;
  const ensureArray = value => Array.isArray(value) ? value : [];
  const uniq = items => [...new Set(ensureArray(items).filter(Boolean))];
  const findFeature = id => featureList.find(feature => feature.id === id);
  const applyIoniq9 = {
    vehicleId: 'hy-ioniq9',
    brand: '현대',
    model: '아이오닉 9',
    years: '2027',
    trim: 'ME 해당 사양/트림',
    option: 'Owners Manual 수록 사양 기준'
  };
  const evidence = {
    manualFile: 'ME_2027_ko_KR.txt',
    modelCode: 'ME',
    modelName: '아이오닉 9',
    modelYear: '2027',
    basis: 'official_owner_manual',
    verifiedBy: 'vehicle-manual-audit',
    pageRange: 'ME_2027_ko_KR.txt 본문 검색 확인'
  };

  const upsertApply = (feature, apply) => {
    feature.applies = ensureArray(feature.applies);
    const existing = feature.applies.find(item => item.vehicleId === apply.vehicleId);
    if (existing) Object.assign(existing, apply);
    else feature.applies.push({ ...apply });
  };
  const removeIoniq9Apply = id => {
    const feature = findFeature(id);
    if (!feature || !Array.isArray(feature.applies)) return;
    feature.applies = feature.applies.filter(apply => apply.vehicleId !== 'hy-ioniq9');
  };
  const addGuide = (feature, config) => {
    feature.modelSpecificGuides = ensureArray(feature.modelSpecificGuides).filter(guide => !(guide.modelCode === 'ME' && guide.modelYear === '2027'));
    feature.modelSpecificGuides.push({
      brand: 'Hyundai',
      modelCode: 'ME',
      modelName: '아이오닉 9',
      modelYear: '2027',
      manualFile: 'ME_2027_ko_KR.txt',
      section: config.section || feature.name,
      pageRange: config.pageRange || '본문 검색 확인',
      preconditions: ensureArray(config.preconditions),
      settings: ensureArray(config.settings),
      steps: ensureArray(config.steps),
      exitSteps: ensureArray(config.disable),
      limitations: ensureArray(config.limitations),
      warnings: ensureArray(config.warnings)
    });
  };
  const mark = (id, config = {}) => {
    const feature = findFeature(id);
    if (!feature) return false;
    upsertApply(feature, applyIoniq9);
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
      hyIoniq9Me2027: {
        confirmed: true,
        manualFile: 'ME_2027_ko_KR.txt',
        matchedKeywords: config.matchedKeywords || config.aliases || [feature.name],
        updatedAt: today
      }
    };
    addGuide(feature, config);
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
      related: uniq(feature.related),
      applies: [{ ...applyIoniq9 }],
      sources: uniq([...(feature.sources || []), 'hyundaiManual']),
      verify: { catalog: false, price: false, webManual: false, ownerManual: true, homepage: false, complete: true },
      verified: {
        complete: true,
        date: today,
        basis: 'official_owner_manual',
        manualFile: 'ME_2027_ko_KR.txt',
        brand: 'Hyundai',
        modelCode: 'ME',
        modelName: '아이오닉 9',
        modelYear: '2027',
        pageRange: feature.pageRange || '본문 검색 확인',
        section: feature.section || feature.name,
        verifiedBy: 'vehicle-manual-audit'
      },
      verificationLevel: 'official_manual_verified',
      manualEvidence: {
        ...evidence,
        section: feature.section || feature.name,
        matchedKeywords: feature.matchedKeywords || feature.aliases || [feature.name]
      },
      modelSpecificGuides: [{
        brand: 'Hyundai',
        modelCode: 'ME',
        modelName: '아이오닉 9',
        modelYear: '2027',
        manualFile: 'ME_2027_ko_KR.txt',
        pageRange: feature.pageRange || '본문 검색 확인',
        section: feature.section || feature.name,
        preconditions: ensureArray(feature.preconditions),
        settings: ensureArray(feature.settings),
        steps: ensureArray(feature.steps),
        exitSteps: ensureArray(feature.disable),
        limitations: ensureArray(feature.limitations),
        warnings: ensureArray(feature.warnings)
      }]
    });
    return true;
  };

  const commonSource = { pageRange: 'ME_2027_ko_KR.txt 본문 검색 확인' };
  const evGuide = {
    preconditions: ['차량 전원이 켜져 있고 Electric Vehicle 메뉴를 사용할 수 있어야 합니다.'],
    settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle 메뉴를 선택합니다.'],
    warnings: ['전기차 충전, V2L, 배터리 관련 기능은 매뉴얼의 안전 정보를 확인한 뒤 사용합니다.']
  };

  [
    ['fca-suite', '전방 충돌방지 보조 (FCA)'],
    ['lane-keeping-assist', '차로 이탈방지 보조 (LKA)'],
    ['blind-spot-collision-avoidance-assist', '후측방 충돌방지 보조 (BCA)'],
    ['safe-exit-assist', '안전 하차 보조 (SEA)'],
    ['intelligent-speed-limit-assist', '지능형 속도 제한 보조 (ISLA)'],
    ['driver-attention-warning', '운전자 주의 경고 (DAW)'],
    ['blind-spot-view-monitor', '후측방 모니터 (BVM)'],
    ['nscc-hda2', '스마트 크루즈 컨트롤 (SCC) / 내비게이션 기반 SCC / 고속도로 주행 보조 (HDA)'],
    ['lane-following-assist', '차로 유지 보조 (LFA)'],
    ['rear-view-monitor', '후방 모니터 (RVM)'],
    ['surround-view-monitor', '서라운드 뷰 모니터 (SVM)'],
    ['rear-cross-traffic-collision-avoidance', '후방 교차 충돌방지 보조 (RCCA)'],
    ['parking-distance-warning', '전방/측방/후방 주차 거리 경고 (PDW)'],
    ['side-pdw', '전방/측방/후방 주차 거리 경고 (PDW)'],
    ['pca-parking', '주차 충돌방지 보조 (PCA)'],
    ['rspa2', '원격 스마트 주차 보조 2 (RSPA 2)'],
    ['remote-smart-exit', '원격 스마트 주차 보조 2 (RSPA 2)']
  ].forEach(([id, section]) => mark(id, {
    ...commonSource,
    section,
    aliases: [section],
    matchedKeywords: [section],
    preconditions: ['DRIVE READY 상태와 각 운전자 보조 기능의 인식 조건을 만족해야 합니다.'],
    settings: ['인포테인먼트 시스템의 설정 > 차량 > 운전자 보조 메뉴에서 관련 기능을 설정합니다.'],
    steps: ['각 기능의 표시등, 경고 문구, 카메라/센서 인식 상태를 확인하며 매뉴얼 안내 순서에 따라 사용합니다.'],
    limitations: ['카메라/레이더/초음파 센서 오염, 악천후, 차선 훼손, 주변 장애물 조건에서는 작동이 제한될 수 있습니다.'],
    warnings: ['운전자 보조 기능은 운전자를 보조하는 기능이며 운전 책임은 운전자에게 있습니다.']
  }));

  mark('plug-and-charge', {
    ...evGuide,
    section: 'Plug & Charge',
    aliases: ['Plug & Charge', '플러그 앤 차지'],
    matchedKeywords: ['Plug & Charge'],
    steps: ['EV 설정 화면에서 Plug & Charge 항목을 확인합니다.', '충전기 및 서비스 가입 조건을 만족하는 경우 케이블 연결 후 인증/결제 과정을 간소화해 충전합니다.'],
    limitations: ['지원 충전기, 서비스 가입, 차량/계정 상태에 따라 사용할 수 있습니다.']
  });
  mark('battery-conditioning', {
    ...evGuide,
    section: '배터리 컨디셔닝 사용하기',
    aliases: ['배터리 컨디셔닝', 'Battery Conditioning'],
    matchedKeywords: ['배터리 컨디셔닝'],
    settings: ['인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 설정 > 배터리 컨디셔닝 모드를 선택한 후 사용을 누릅니다.'],
    steps: ['배터리 온도가 급속 충전 성능에 적합하지 않을 때 수동 작동하거나 내비게이션 연동 기능을 활용합니다.', '작동 상태는 인포테인먼트 시스템 화면에서 확인합니다.'],
    limitations: ['고전압 배터리 온도, 목적지/충전소 설정, 차량 상태에 따라 작동 조건이 달라집니다.']
  });
  mark('ev-route-planner', {
    ...evGuide,
    section: '충전소 검색',
    aliases: ['충전소 검색', '급속 충전소 검색', 'EV Route Planner'],
    matchedKeywords: ['충전소 검색'],
    settings: ['Electric Vehicle 화면에서 충전소 검색 기능을 사용합니다.'],
    steps: ['충전소 검색 메뉴에서 주변 또는 경로상 충전소 정보를 확인합니다.'],
    limitations: ['인포테인먼트 시스템 및 내비게이션 정보 상태에 따라 검색 결과가 달라질 수 있습니다.']
  });
  mark('scheduled-charging', {
    ...evGuide,
    section: '예약 충전',
    aliases: ['예약 충전', '충전 예약', 'Scheduled Charging'],
    matchedKeywords: ['예약 충전'],
    settings: ['Electric Vehicle > EV 충전 설정에서 예약 충전 관련 항목을 설정합니다.'],
    steps: ['예약 충전을 설정하면 충전 상태 표시 영역에 예약 충전 메시지가 표시됩니다.'],
    limitations: ['예약 공조가 작동하는 경우 충전 예상 소요 시간이 제한적으로 표시될 수 있습니다.']
  });
  mark('charge-limit', {
    ...evGuide,
    section: '충전 목표 배터리량',
    aliases: ['충전 목표 배터리량', '충전 한도', '충전 한도 설정'],
    matchedKeywords: ['충전 목표 배터리량'],
    settings: ['Electric Vehicle > EV 충전 설정에서 충전 목표 배터리량을 설정합니다.'],
    steps: ['급속/완속 충전 목표 배터리량을 원하는 수준으로 설정합니다.'],
    limitations: ['충전기 상태와 배터리 상태에 따라 실제 충전 종료 시점이 달라질 수 있습니다.']
  });
  mark('ev-charging-current-setting', {
    ...evGuide,
    section: '충전 전류 설정',
    aliases: ['충전 전류', '완속 충전 전류', '충전 전류 설정'],
    matchedKeywords: ['충전 전류'],
    settings: ['Electric Vehicle > EV 충전 설정 > 완속 충전 설정에서 충전 전류 관련 항목을 선택합니다.'],
    steps: ['충전 환경에 맞춰 완속 충전 전류를 설정합니다.'],
    limitations: ['충전 설비와 케이블 정격에 맞는 범위에서 설정해야 합니다.']
  });
  mark('charging-connector-lock', {
    ...evGuide,
    section: '충전 커넥터 잠금 모드 설정하기',
    aliases: ['충전 커넥터 잠금', '충전구 잠금'],
    matchedKeywords: ['충전 커넥터 잠금'],
    settings: ['Electric Vehicle > EV 충전 설정 > 완속 충전 설정에서 충전 커넥터 잠금 모드를 선택합니다.'],
    steps: ['상시 잠금, 충전 중 잠금, 사용 안 함 중 원하는 잠금 방식을 선택합니다.'],
    limitations: ['급속 충전 및 V2L 사용 중에는 설정과 관계없이 커넥터가 자동으로 잠길 수 있습니다.']
  });
  mark('ev-charge-status', {
    ...evGuide,
    section: '충전 상태 표시',
    aliases: ['충전 상태', '충전 상태 확인'],
    matchedKeywords: ['충전 상태'],
    steps: ['핸들 중앙의 충전 표시등 또는 인포테인먼트 시스템 화면에서 충전 상태를 확인합니다.'],
    limitations: ['OFF 상태에서는 충전 상태 표시가 제한 시간 동안 표시될 수 있습니다.']
  });
  mark('ev-charging-information', {
    ...evGuide,
    section: '전기차 충전하기',
    aliases: ['충전 정보', '전기차 충전 정보'],
    matchedKeywords: ['충전 정보'],
    steps: ['충전 화면에서 충전량, 충전 상태, 예상 소요 시간 등 표시 정보를 확인합니다.']
  });
  mark('v2l-parent', {
    ...evGuide,
    section: '전기 사용(V2L) 기능 활용하기',
    aliases: ['전기 사용(V2L)', 'Vehicle to Load', 'V2L'],
    matchedKeywords: ['전기 사용(V2L)', 'V2L'],
    settings: ['Electric Vehicle > EV 충전 설정 > 전기 사용(V2L) 설정을 선택합니다.'],
    steps: ['차량 배터리에 충전된 전기를 이용해 전기 제품 또는 전자 기기를 작동합니다.', '비상 시 다른 전기차 충전에 활용할 수 있습니다.'],
    limitations: ['설정한 방전 제한량에 도달하면 V2L 기능이 자동 차단됩니다.']
  });
  mark('v2l-indoor', {
    ...evGuide,
    section: '전기 사용(V2L) 기능 활용하기',
    aliases: ['실내 V2L', '전기 사용(V2L)'],
    matchedKeywords: ['전기 사용(V2L)'],
    settings: ['Electric Vehicle > EV 충전 설정 > 전기 사용(V2L) 설정에서 방전 제한량을 확인합니다.'],
    steps: ['차량 실내 전원 공급 장치에 전기 제품을 연결해 사용합니다.'],
    limitations: ['사용 가능한 전력과 방전 제한량 조건을 확인해야 합니다.']
  });
  mark('v2l-outdoor', {
    ...evGuide,
    section: '전기 사용(V2L) 기능 활용하기',
    aliases: ['외부 V2L', '실외 V2L', '전기 사용(V2L)'],
    matchedKeywords: ['전기 사용(V2L)'],
    settings: ['Electric Vehicle > EV 충전 설정 > 전기 사용(V2L) 설정에서 방전 제한량을 확인합니다.'],
    steps: ['외부 V2L 커넥터를 차량 충전구에 연결해 전원을 공급합니다.'],
    limitations: ['외부 커넥터 상태, 방전 제한량, 고전압 배터리 잔량에 따라 제한됩니다.']
  });
  mark('v2l-discharge-limit', {
    ...evGuide,
    section: '전기 사용(V2L)시 방전 제한량 설정하기',
    aliases: ['방전 제한량', 'V2L 방전 제한량'],
    matchedKeywords: ['방전 제한량'],
    settings: ['Electric Vehicle > EV 충전 설정 > 전기 사용(V2L) 설정을 선택합니다.'],
    steps: ['원하는 방전 제한량을 설정합니다.', '방전 제한량은 20% 이상 80% 이하로 설정할 수 있습니다.'],
    limitations: ['배터리 충전량이 설정된 방전 제한량에 도달하면 전기 사용(V2L) 기능이 자동 차단됩니다.']
  });
  mark('utility-mode', {
    ...evGuide,
    section: '유틸리티 모드',
    aliases: ['유틸리티 모드'],
    matchedKeywords: ['유틸리티 모드'],
    settings: ['Electric Vehicle > EV 설정 화면에서 유틸리티 모드를 선택합니다.'],
    limitations: ['차량 상태와 고전압 배터리 잔량 조건에 따라 사용할 수 있습니다.']
  });
  mark('ev-energy-usage', {
    ...evGuide,
    section: '에너지 정보 확인하기',
    aliases: ['전력 소비량', '에너지 사용량', '에너지 정보'],
    matchedKeywords: ['전력 소비량', '에너지 정보'],
    settings: ['Electric Vehicle > 에너지 정보를 선택합니다.'],
    steps: ['전력 소비량 화면에서 구동계와 전자 장치 등 시스템별 전력 사용 정보를 확인합니다.']
  });
  mark('ev-driving-range', {
    ...evGuide,
    section: '에너지 정보 확인하기',
    aliases: ['주행 가능 거리', 'EV 주행 가능 거리'],
    matchedKeywords: ['주행 가능 거리'],
    settings: ['Electric Vehicle > 에너지 정보를 선택합니다.'],
    steps: ['에너지 정보 화면에서 주행 가능 거리 이력과 관련 정보를 확인합니다.']
  });
  mark('ev-efficiency-history', {
    ...evGuide,
    section: '에너지 정보 확인하기',
    aliases: ['연비 이력', '전비 이력'],
    matchedKeywords: ['연비 이력'],
    settings: ['Electric Vehicle > 에너지 정보를 선택합니다.'],
    steps: ['에너지 정보 화면에서 연비 이력을 확인합니다.']
  });
  mark('ev-battery-health', {
    ...evGuide,
    section: '배터리 상태',
    aliases: ['배터리 상태', '고전압 배터리'],
    matchedKeywords: ['배터리 상태'],
    steps: ['클러스터 또는 인포테인먼트 시스템의 배터리 관련 표시를 확인합니다.']
  });
  mark('ev-smart-regeneration', {
    section: '스마트 회생 제동 기능 사용하기',
    aliases: ['스마트 회생 제동', '스마트 회생제동'],
    matchedKeywords: ['스마트 회생 제동'],
    preconditions: ['회생 제동을 사용할 수 있는 주행 상태여야 합니다.'],
    settings: ['스마트 회생 시스템 관련 설정을 확인합니다.'],
    steps: ['스마트 회생 제동 기능 안내에 따라 앞차 및 도로 조건 기반 감속 보조 상태를 확인합니다.'],
    limitations: ['도로 상태, 전방 차량 인식, 배터리 상태에 따라 회생 제동 감속감이 달라질 수 있습니다.'],
    warnings: ['회생 제동만으로 정차가 보장되지 않으므로 필요 시 브레이크 페달을 직접 밟습니다.']
  });
  mark('ev-regen-level', {
    section: '회생 제동 기능 사용하기',
    aliases: ['회생 제동', '회생 제동 단계', '회생제동 단계 조절'],
    matchedKeywords: ['회생 제동'],
    preconditions: ['차량이 주행 가능한 상태여야 합니다.'],
    steps: ['회생 제동 증가 레버를 당겨 회생 제동량을 올립니다.', '회생 제동 감소 레버를 당겨 회생 제동량을 내립니다.', '클러스터에서 회생 제동량을 확인합니다.'],
    limitations: ['노면, 속도, 배터리 충전 상태에 따라 제동감이 달라질 수 있습니다.'],
    warnings: ['회생 제동 조작 중에도 주변 상황을 확인하고 필요 시 브레이크 페달을 사용합니다.']
  });
  mark('i-pedal', {
    section: '원 페달 드라이빙 / i-PEDAL',
    aliases: ['i-PEDAL', 'i-Pedal', '아이 페달'],
    matchedKeywords: ['i-PEDAL'],
    preconditions: ['회생 제동 레버 조작이 가능한 주행 상태여야 합니다.'],
    steps: ['원 페달 드라이빙 사용 중 조건에 따라 i-PEDAL 기능처럼 작동할 수 있음을 확인합니다.'],
    limitations: ['차량 또는 도로 상태에 따라 원 페달 드라이빙만으로 완전 정지하지 못할 수 있습니다.'],
    warnings: ['필요할 경우 직접 브레이크 페달을 밟아 감속합니다.']
  });
  mark('one-pedal-driving', {
    section: '원 페달 드라이빙 사용하기',
    aliases: ['원 페달 드라이빙', '원 페달'],
    matchedKeywords: ['원 페달 드라이빙'],
    preconditions: ['타력 주행 중 회생 제동 증가 레버를 사용할 수 있어야 합니다.'],
    steps: ['회생 제동 증가 레버를 0.5초 이상 당긴 채 유지합니다.', '차량 속도에 따라 레버를 놓았을 때 기존 회생 제동 단계 또는 정지까지의 제동량 증가가 적용됩니다.'],
    limitations: ['차량 또는 도로 상태에 따라 완전 정지하지 못할 수 있습니다.'],
    warnings: ['주변 상황을 살핀 후 필요할 경우 직접 브레이크 페달을 밟아 감속합니다.']
  });

  [
    ['hyundai-dk2', '디지털 키 사용하기'],
    ['hyundai-dk2-touch', '디지털 키 사용하기'],
    ['nfc-card-key', '디지털 키 사용하기']
  ].forEach(([id, section]) => mark(id, {
    ...commonSource,
    section,
    aliases: ['디지털 키', '스마트폰 디지털 키', '디지털 카드 키', 'UWB', 'NFC'],
    matchedKeywords: ['디지털 키'],
    preconditions: ['스마트폰 디지털 키는 블루링크 서비스 가입 후 사용할 수 있습니다.', '디지털 키 또는 카드 키 등록이 필요합니다.'],
    settings: ['스마트폰 디지털 키 등록 또는 디지털 카드 키 등록 메뉴를 사용합니다.'],
    steps: ['스마트폰 또는 카드 키를 도어 핸들 중앙 인증 센서에 2초 이상 태그해 도어를 잠그거나 잠금 해제합니다.'],
    warnings: ['차량을 떠날 때 디지털 키를 휴대합니다.', '디지털 키가 차량 안에 있으면 중앙 도어 잠금/잠금 해제 버튼 조작 시 도어가 잠길 수 있습니다.']
  }));
  mark('fingerprint-auth', {
    ...commonSource,
    section: '지문 인증 시스템 사용하기',
    aliases: ['지문 인증', 'Fingerprint Authentication', '지문 등록'],
    matchedKeywords: ['지문 인증 시스템'],
    preconditions: ['인포테인먼트 시스템에 지문이 등록되어 있어야 합니다.', '지문 등록 시 스마트 키 2개를 모두 차량 안에 두어야 합니다.'],
    settings: ['DRIVE READY 상태에서 설정 > 사용자 프로필 > 운전자 1 또는 운전자 2 > 보안 > 지문인식을 선택합니다.'],
    steps: ['프로필 비밀번호를 입력합니다.', '지문등록/삭제 > 등록을 선택합니다.', '안내에 따라 지문 인식 센서에 손가락을 올려 진행률이 100%가 될 때까지 등록합니다.'],
    limitations: ['운전자 1, 운전자 2 각각 1개씩 등록할 수 있습니다.'],
    warnings: ['지문 인식 센서 위 필름 및 이물질을 제거한 뒤 등록합니다.', '일부 기능은 블루링크 서비스 가입이 필요합니다.']
  });
  mark('built-in-cam', {
    ...commonSource,
    section: '빌트인 캠 (Built-in Cam)',
    aliases: ['빌트인 캠', 'Built-in Cam', '주행 중 녹화', '주차 중 녹화', '이벤트 녹화'],
    matchedKeywords: ['빌트인 캠 (Built-in Cam)'],
    preconditions: ['사양 적용 차량이어야 하며, 차량 출고 시 녹화 기능은 해제되어 있습니다.'],
    settings: ['인포테인먼트 시스템의 설정 > 차량 > 빌트인 캠을 선택합니다.'],
    steps: ['녹화 조건을 선택해 기능을 사용합니다.', '주행 또는 주차 시 녹화, 음성 녹음, 주행 정보 표시, 녹화 시간, 충격 감지 민감도 등을 설정합니다.'],
    limitations: ['SD 메모리 용량이 가득 차면 오래된 녹화 파일부터 삭제됩니다.'],
    warnings: ['음성 녹음 및 영상 저장은 법적 규정과 사생활 보호 책임을 사용자가 확인해야 합니다.']
  });
  mark('built-in-cam2-plus', {
    ...commonSource,
    section: '빌트인 캠 (Built-in Cam)',
    aliases: ['빌트인 캠', 'Built-in Cam', '빌트인 캠 2 Plus'],
    matchedKeywords: ['빌트인 캠 (Built-in Cam)', '주차 중 녹화', '이벤트 녹화'],
    preconditions: ['사양 적용 차량이어야 하며, 차량 출고 시 녹화 기능은 해제되어 있습니다.'],
    settings: ['인포테인먼트 시스템의 설정 > 차량 > 빌트인 캠을 선택합니다.'],
    steps: ['녹화, 녹화 시간, 충격 감지 민감도, 디스플레이 설정, 앱 연결, SD 메모리 항목을 설정합니다.'],
    limitations: ['SD 메모리 상태와 용량, 설정한 녹화 조건에 따라 저장 방식이 달라집니다.'],
    warnings: ['녹화물 사용에 따른 사생활 및 법적 책임은 사용자에게 있습니다.'],
    update: { summary: '아이오닉 9 매뉴얼의 빌트인 캠 섹션 기준으로 전방/후방 영상과 음성을 저장하고 녹화 조건을 설정하는 기능입니다.' }
  });
  removeIoniq9Apply('built-in-cam2');
  mark('digital-center-mirror', {
    ...commonSource,
    section: '디지털 센터 미러(DCM)',
    aliases: ['디지털 센터 미러', 'DCM'],
    matchedKeywords: ['디지털 센터 미러', 'DCM'],
    preconditions: ['디지털 센터 미러 적용 사양이어야 합니다.'],
    steps: ['디지털 센터 미러 카메라와 미러 표시 상태를 확인해 후방 시야를 보조합니다.'],
    limitations: ['카메라 오염, 눈비, 후방 시야 조건에 따라 표시 품질이 달라질 수 있습니다.']
  });
  mark('ccnc-ota', {
    ...commonSource,
    section: '무선 소프트웨어 업데이트',
    aliases: ['무선 소프트웨어 업데이트', 'OTA', 'Software Update'],
    matchedKeywords: ['무선 소프트웨어 업데이트', 'OTA'],
    preconditions: ['차량 통신 및 업데이트 조건을 만족해야 합니다.'],
    steps: ['인포테인먼트 시스템 안내에 따라 소프트웨어 업데이트를 진행합니다.'],
    limitations: ['업데이트로 인해 일부 상세 설정이 변경될 수 있습니다.']
  });
  mark('voice-recognition-system', {
    ...commonSource,
    section: '음성 인식',
    aliases: ['음성 인식', '음성 명령'],
    matchedKeywords: ['음성 인식'],
    preconditions: ['인포테인먼트 시스템 음성 인식 기능을 사용할 수 있어야 합니다.'],
    steps: ['음성 인식 버튼 또는 화면 안내에 따라 음성 명령을 사용합니다.']
  });
  mark('apple-carplay-wired', {
    ...commonSource,
    section: 'USB 단자 / 스마트폰 연동',
    aliases: ['Apple CarPlay', 'CarPlay'],
    matchedKeywords: ['CarPlay'],
    preconditions: ['CarPlay 지원 스마트폰과 USB 연결 또는 지원 연결 조건이 필요합니다.'],
    steps: ['스마트폰을 차량에 연결한 뒤 인포테인먼트 시스템에서 CarPlay를 사용합니다.']
  });
  mark('android-auto-wired', {
    ...commonSource,
    section: 'USB 단자 / 스마트폰 연동',
    aliases: ['Android Auto'],
    matchedKeywords: ['Android Auto'],
    preconditions: ['Android Auto 지원 스마트폰과 USB 연결 또는 지원 연결 조건이 필요합니다.'],
    steps: ['스마트폰을 차량에 연결한 뒤 인포테인먼트 시스템에서 Android Auto를 사용합니다.']
  });

  [
    ['relaxation-comfort-seat', '릴렉션 컴포트 시트'],
    ['swiveling-seat', '스위블 조절(6인승)'],
    ['dynamic-body-care-seat', '다이내믹 바디 케어']
  ].forEach(([id, section]) => mark(id, {
    ...commonSource,
    section,
    aliases: [section, '아이오닉 9 시트'],
    matchedKeywords: [section],
    preconditions: ['사양 적용 차량이어야 합니다.'],
    settings: ['인포테인먼트 시스템에서 설정 > 차량 > 시트를 선택해 좌석 관련 편의 기능을 설정할 수 있습니다.'],
    steps: ['시트 조작부 명칭과 각 좌석 조절 스위치 위치를 확인한 뒤 해당 기능을 조작합니다.'],
    limitations: ['6인승/7인승 및 수동식/전동식 좌석 사양에 따라 제공 기능이 다릅니다.'],
    warnings: ['주행 중에는 좌석을 조절하지 마십시오.', '좌석 조절 시 좌석 아래나 작동 부위에 손을 넣지 마십시오.']
  }));
  mark('heated-ventilated-seats', {
    ...commonSource,
    section: '열선 시트 및 통풍 시트 사용하기',
    aliases: ['열선 시트', '통풍 시트'],
    matchedKeywords: ['열선 시트', '통풍 시트'],
    preconditions: ['해당 좌석에 열선/통풍 사양이 적용되어야 합니다.'],
    steps: ['시트 열선 또는 통풍 버튼을 눌러 단계별로 조절합니다.'],
    warnings: ['열선 사용 시 저온 화상에 주의합니다.']
  });
  mark('walk-in-device', {
    ...commonSource,
    section: '워크인 스위치',
    aliases: ['워크인 스위치', '워크인 디바이스'],
    matchedKeywords: ['워크인 스위치'],
    preconditions: ['워크인 스위치 적용 좌석이어야 합니다.'],
    steps: ['좌석 조작부의 워크인 스위치를 사용해 승하차 편의를 보조합니다.']
  });
  mark('rear-climate-control', {
    ...commonSource,
    section: '뒷좌석 히터와 에어컨',
    aliases: ['뒷좌석 히터와 에어컨', '후석 공조'],
    matchedKeywords: ['뒷좌석 히터와 에어컨'],
    preconditions: ['후석 공조 조작부가 적용된 사양이어야 합니다.'],
    steps: ['뒷좌석 히터와 에어컨 조작부에서 온도와 송풍을 조절합니다.']
  });
  mark('climate-control', {
    ...commonSource,
    section: '히터와 에어컨',
    aliases: ['히터와 에어컨', '공조'],
    matchedKeywords: ['히터와 에어컨'],
    preconditions: ['차량 전원이 켜져 있어야 합니다.'],
    steps: ['공조 조작부 또는 인포테인먼트 시스템 공조 화면에서 온도, 풍량, 송풍 방향을 조절합니다.']
  });
  mark('smart-key', {
    ...commonSource,
    section: '스마트 키 사용하기',
    aliases: ['스마트 키'],
    matchedKeywords: ['스마트 키'],
    preconditions: ['스마트 키를 휴대해야 합니다.'],
    steps: ['스마트 키 버튼 또는 도어 핸들 조작으로 도어/테일게이트/후드/시동 기능을 사용합니다.'],
    warnings: ['스마트 키 배터리와 보관 안전 주의사항을 확인합니다.']
  });
  mark('remote-engine-start', {
    ...commonSource,
    section: '스마트 키 사용하기',
    aliases: ['원격 시동', '시동 켜기'],
    matchedKeywords: ['시동 켜기'],
    preconditions: ['스마트 키를 소지한 상태에서 차량 조건을 만족해야 합니다.'],
    steps: ['스마트 키 또는 차량 안내에 따라 시동 기능을 사용합니다.']
  });

  makeFeature('uv-c-sterilization-system', {
    slug: 'uv-c-sterilization-system',
    name: 'UV-C 살균 시스템',
    category: '편의',
    officialCategory: '편의 장치 / UV-C 살균 시스템',
    aliases: ['UV-C', 'UV-C 살균', '살균 트레이', '살균 시스템'],
    summary: '아이오닉 9의 보관함 내부 UV-C LED를 이용해 보관한 물건을 일정 시간 살균하는 편의 기능입니다.',
    preconditions: ['시동이 켜져 있어야 합니다.', 'UV-C 살균 시스템 적용 사양이어야 합니다.'],
    settings: ['보관함 내부의 UV-C 살균 시스템 작동 버튼을 사용합니다.'],
    steps: ['보관함 커버를 엽니다.', '보관함 내부의 UV-C 살균 시스템 작동 버튼을 누릅니다.', '살균할 물건을 보관함 내부 중앙에 놓고 커버를 닫습니다.', '살균 작동 표시등이 켜지고 UV-C LED가 켜지며 살균이 시작됩니다.', '살균 시작 10분 후 살균 작동 표시등이 자동으로 꺼지며 살균이 종료됩니다.'],
    disable: ['10분 이내에 직접 종료할 경우 UV-C 살균 시스템 작동 버튼을 눌러 기능을 끕니다.'],
    limitations: ['살균 트레이가 작동 가능한 상태여야 합니다.'],
    warnings: ['UV-C 살균 시스템 사용 중에는 매뉴얼의 안전 주의사항을 준수합니다.'],
    related: ['스마트폰 무선 충전 시스템', '슬라이딩 콘솔'],
    section: 'UV-C 살균 시스템',
    matchedKeywords: ['UV-C 살균 시스템', '살균 트레이'],
    pageRange: 'ME_2027_ko_KR.txt 본문 검색 확인'
  });
  makeFeature('sliding-console', {
    slug: 'sliding-console',
    name: '슬라이딩 콘솔',
    category: '편의',
    officialCategory: '편의 장치 / 슬라이딩 콘솔',
    aliases: ['슬라이딩 콘솔', '슬라이딩 타입 중앙 콘솔박스', '콘솔박스'],
    summary: '아이오닉 9의 슬라이딩 타입 중앙 콘솔박스를 앞뒤로 이동해 실내 공간 활용을 돕는 기능입니다.',
    preconditions: ['슬라이딩 콘솔 적용 사양이어야 합니다.'],
    settings: ['별도 설정 메뉴가 아니라 콘솔의 레버를 사용합니다.'],
    steps: ['레버를 당깁니다.', '콘솔박스를 앞 또는 뒤로 힘을 주어 밀거나 당깁니다.', '콘솔박스가 “딸깍” 하며 고정되는 소리가 나는지 확인합니다.'],
    disable: ['원하는 위치에 고정되면 레버 조작을 멈춥니다.'],
    limitations: ['과도한 힘으로 이동시키면 콘솔박스 레일 또는 레버가 손상될 수 있습니다.'],
    warnings: ['차가 움직이는 동안에는 슬라이딩 콘솔을 움직이지 마십시오. 급정차나 충돌 시 위험할 수 있습니다.'],
    related: ['UV-C 살균 시스템', '100W USB 충전 단자'],
    section: '슬라이딩 콘솔',
    matchedKeywords: ['슬라이딩 콘솔'],
    pageRange: 'ME_2027_ko_KR.txt 본문 검색 확인'
  });

  [
    'iccu-energy-control',
    'camping-mode',
    'ccnc-system',
    'face-connect',
    'hyundai-ai',
    'digital-side-mirror',
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
    'n-performance'
  ].forEach(removeIoniq9Apply);
};
