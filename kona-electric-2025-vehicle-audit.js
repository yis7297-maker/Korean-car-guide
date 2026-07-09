/* SX2EV 2025 Owners Manual vehicle-specific audit overlay.
 * Scope: Hyundai Kona Electric SX2EV 2025 only.
 * Source:
 * - work/manual-text/SX2EV_2025_ko_KR.txt
 */
window.applyKonaElectricManualAudit = function applyKonaElectricManualAudit() {
  if (!Array.isArray(window.features) && typeof features === 'undefined') return;
  if (!Array.isArray(window.vehicles) && typeof vehicles === 'undefined') return;

  const today = '2026-07-09';
  const featureList = window.features || features;
  const vehicleList = window.vehicles || vehicles;
  const ensureArray = value => Array.isArray(value) ? value : [];
  const uniq = items => [...new Set(ensureArray(items).filter(Boolean))];
  const findFeature = id => featureList.find(feature => feature.id === id);
  const konaEvApply = {
    vehicleId: 'hy-kona-ev',
    brand: '현대',
    model: '코나 일렉트릭',
    years: '2025',
    trim: 'SX2EV 해당 사양/트림',
    option: 'Owners Manual 수록 사양 기준'
  };
  const evidence = {
    manualFile: 'SX2EV_2025_ko_KR.txt',
    modelCode: 'SX2EV',
    modelName: '코나 일렉트릭',
    modelYear: '2025',
    basis: 'official_owner_manual',
    verifiedBy: 'vehicle-manual-audit',
    pageRange: 'SX2EV_2025_ko_KR.txt 본문/목차/색인 검색 확인'
  };

  if (!vehicleList.some(vehicle => vehicle.id === 'hy-kona-ev')) {
    vehicleList.push({ id: 'hy-kona-ev', brand: '현대', name: '코나 일렉트릭', group: '전기차', electric: true, performance: false });
  }

  const upsertApply = (feature, apply) => {
    feature.applies = ensureArray(feature.applies);
    const existing = feature.applies.find(item => item.vehicleId === apply.vehicleId);
    if (existing) Object.assign(existing, apply);
    else feature.applies.push({ ...apply });
  };
  const removeKonaEvApply = id => {
    const feature = findFeature(id);
    if (!feature || !Array.isArray(feature.applies)) return;
    feature.applies = feature.applies.filter(apply => apply.vehicleId !== 'hy-kona-ev');
  };
  const addGuide = (feature, config) => {
    feature.modelSpecificGuides = ensureArray(feature.modelSpecificGuides).filter(guide => !(guide.modelCode === 'SX2EV' && guide.modelYear === '2025'));
    feature.modelSpecificGuides.push({
      brand: 'Hyundai',
      modelCode: 'SX2EV',
      modelName: '코나 일렉트릭',
      modelYear: '2025',
      manualFile: 'SX2EV_2025_ko_KR.txt',
      pageRange: config.pageRange || '본문/목차/색인 검색 확인',
      section: config.section || feature.name,
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
    upsertApply(feature, konaEvApply);
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
      hyKonaElectricSx2ev2025: {
        confirmed: true,
        manualFile: 'SX2EV_2025_ko_KR.txt',
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
      related: uniq(feature.related),
      applies: [{ ...konaEvApply }],
      sources: uniq([...(feature.sources || []), 'hyundaiManual']),
      verify: { catalog: false, price: false, webManual: false, ownerManual: true, homepage: false, complete: true },
      verified: {
        complete: true,
        date: today,
        basis: 'official_owner_manual',
        manualFile: 'SX2EV_2025_ko_KR.txt',
        brand: 'Hyundai',
        modelCode: 'SX2EV',
        modelName: '코나 일렉트릭',
        modelYear: '2025',
        pageRange: feature.pageRange || '본문/목차/색인 검색 확인',
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
        modelCode: 'SX2EV',
        modelName: '코나 일렉트릭',
        modelYear: '2025',
        manualFile: 'SX2EV_2025_ko_KR.txt',
        pageRange: feature.pageRange || '본문/목차/색인 검색 확인',
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

  const commonSource = { pageRange: 'SX2EV_2025_ko_KR.txt 본문/목차/색인 검색 확인' };
  const evGuide = {
    preconditions: ['차량 전원이 켜져 있고 Electric Vehicle 메뉴를 사용할 수 있어야 합니다.'],
    settings: ['전체 메뉴 화면 또는 홈 화면에서 Electric Vehicle 메뉴를 선택합니다.'],
    warnings: ['전기차 충전, V2L, 배터리 관련 기능은 매뉴얼의 안전 정보를 확인한 뒤 사용합니다.']
  };

  makeFeature('ac-slow-charging', {
    slug: 'ac-slow-charging',
    name: '완속 충전',
    category: 'EV 전용 기능',
    officialCategory: '전기차 충전 / 완속 충전',
    aliases: ['완속 충전기', 'AC 충전', '완속 충전기 사용하기'],
    summary: '코나 일렉트릭의 완속 충전기를 이용해 고전압 배터리를 충전하는 기능입니다.',
    preconditions: ['완속 충전기와 차량 충전 커넥터를 사용할 수 있어야 합니다.', '충전 전 안전 주의 사항을 확인해야 합니다.'],
    settings: ['필요 시 Electric Vehicle > EV 충전 설정 > 완속 충전 설정에서 충전 관련 항목을 확인합니다.'],
    steps: ['완속 충전기 사용하기 절차에 따라 충전 커넥터를 차량에 연결합니다.', '충전 상태 표시 정보를 확인합니다.', '충전이 완료되면 매뉴얼 안내에 따라 충전 커넥터를 분리합니다.'],
    disable: ['충전 완료 후 충전 커넥터를 분리합니다.', '필요 시 충전 즉시 중단 기능을 사용합니다.'],
    limitations: ['충전 설비, 케이블 정격, 충전 전류 설정, 차량 배터리 상태에 따라 충전 시간이 달라질 수 있습니다.'],
    warnings: ['젖은 손이나 손상된 충전 케이블로 충전하지 않습니다.'],
    related: ['급속 충전', '충전 전류 설정', '충전 커넥터 잠금 모드'],
    section: '완속 충전기 사용하기',
    matchedKeywords: ['완속 충전기 사용하기', '완속 충전'],
    pageRange: '목차 및 본문 검색 확인'
  });
  makeFeature('dc-fast-charging', {
    slug: 'dc-fast-charging',
    name: '급속 충전',
    category: 'EV 전용 기능',
    officialCategory: '전기차 충전 / 급속 충전',
    aliases: ['급속 충전기', 'DC 급속 충전', '급속 충전기 사용하기'],
    summary: '코나 일렉트릭의 급속 충전기를 이용해 고전압 배터리를 빠르게 충전하는 기능입니다.',
    preconditions: ['급속 충전기를 사용할 수 있는 충전소와 차량 충전 조건을 만족해야 합니다.'],
    settings: ['충전 목표 배터리량과 충전 상태를 Electric Vehicle 화면에서 확인합니다.'],
    steps: ['급속 충전기 사용하기 절차에 따라 충전 커넥터를 연결합니다.', '충전 상태와 예상 충전 정보를 확인합니다.', '충전 완료 후 커넥터 잠금 해제 상태를 확인하고 분리합니다.'],
    disable: ['급속 충전이 끝나면 잠금이 자동으로 해제됩니다.', '필요 시 충전 즉시 중단 기능을 사용합니다.'],
    limitations: ['배터리 온도, 충전기 출력, 충전 목표량, 충전소 상태에 따라 충전 속도가 달라질 수 있습니다.'],
    warnings: ['급속 충전 중에는 충전기와 차량 안내를 따릅니다.'],
    related: ['완속 충전', '배터리 컨디셔닝', '충전 상태 확인'],
    section: '급속 충전기 사용하기',
    matchedKeywords: ['급속 충전기 사용하기', '급속 충전'],
    pageRange: '목차 및 본문 검색 확인'
  });
  makeFeature('portable-charger-iccb', {
    slug: 'portable-charger-iccb',
    name: '휴대용 충전기(ICCB)',
    category: 'EV 전용 기능',
    officialCategory: '전기차 충전 / 휴대용 충전기',
    aliases: ['휴대용 충전기', 'ICCB', '휴대용 충전기(ICCB) 사용하기'],
    summary: '코나 일렉트릭 매뉴얼에 수록된 휴대용 충전기(ICCB)를 이용한 충전 기능입니다.',
    preconditions: ['휴대용 충전기(ICCB)를 사용할 수 있는 전원 환경과 차량 충전 조건을 만족해야 합니다.'],
    settings: ['충전 전류 및 충전 상태를 확인합니다.'],
    steps: ['휴대용 충전기(ICCB) 사용하기 절차에 따라 전원과 차량을 연결합니다.', '충전 상태 표시 정보를 확인합니다.', '충전 완료 후 매뉴얼 안내에 따라 분리합니다.'],
    disable: ['충전 완료 또는 중단 후 충전 장치를 분리합니다.'],
    limitations: ['전원 환경과 충전 장치 상태에 따라 충전 시간이 길어질 수 있습니다.'],
    warnings: ['정격에 맞지 않는 전원이나 손상된 충전 장치를 사용하지 않습니다.'],
    related: ['완속 충전', '충전 상태 확인'],
    section: '휴대용 충전기(ICCB) 사용하기',
    matchedKeywords: ['휴대용 충전기(ICCB) 사용하기', 'ICCB'],
    pageRange: '목차 및 본문 검색 확인'
  });
  makeFeature('stop-charging-immediately', {
    slug: 'stop-charging-immediately',
    name: '충전 즉시 중단',
    category: 'EV 전용 기능',
    officialCategory: '전기차 충전 / 충전 중단',
    aliases: ['충전 즉시 중단', '충전 중단'],
    summary: '코나 일렉트릭에서 진행 중인 충전을 즉시 중단하기 위한 매뉴얼 수록 기능입니다.',
    preconditions: ['차량이 충전 중이어야 합니다.'],
    settings: ['충전 상태 화면 또는 충전 관련 조작부를 확인합니다.'],
    steps: ['충전 즉시 중단하기 항목의 안내에 따라 충전을 중단합니다.', '충전 상태 표시가 중단 상태로 바뀌었는지 확인합니다.'],
    disable: ['충전 중단 후 커넥터 잠금 상태를 확인하고 분리합니다.'],
    limitations: ['충전기 종류와 커넥터 잠금 상태에 따라 분리 절차가 달라질 수 있습니다.'],
    warnings: ['비상시 충전 커넥터 분리 절차는 매뉴얼의 별도 안내를 따릅니다.'],
    related: ['완속 충전', '급속 충전', '충전 커넥터 잠금 모드'],
    section: '충전 즉시 중단하기',
    matchedKeywords: ['충전 즉시 중단하기'],
    pageRange: '목차 및 본문 검색 확인'
  });
  makeFeature('hyundai-digital-key', {
    slug: 'digital-key',
    name: 'Hyundai Digital Key',
    category: '디지털 키/인증',
    officialCategory: '편의 장치 / 디지털 키',
    aliases: ['디지털 키', '스마트폰 디지털 키', 'Digital Key'],
    summary: '스마트폰 또는 카드 키를 이용해 도어 잠금/잠금 해제와 시동을 보조하는 현대 디지털 키 기능입니다.',
    preconditions: ['디지털 키 적용 사양이어야 하며, 스마트폰 디지털 키 또는 카드 키 등록이 필요합니다.'],
    settings: ['인포테인먼트 시스템의 설정 > 차량 > 디지털 키 메뉴를 사용합니다.'],
    steps: ['스마트폰 또는 카드 키를 등록합니다.', '도어 핸들 또는 실내 인증 패드에 디지털 키를 태그해 도어 잠금/잠금 해제 또는 시동 기능을 사용합니다.'],
    disable: ['디지털 키 메뉴에서 등록된 키를 삭제하거나 사용 설정을 해제합니다.'],
    limitations: ['차량 시스템에 등록된 카드 키가 있으면 새 카드 키를 등록할 수 없습니다.'],
    warnings: ['디지털 키 등록 시 스마트 키 2개를 휴대합니다.', '차량에 등록한 카드 키는 다른 차량에서 등록할 수 없습니다.'],
    related: ['NFC 카드 키', '스마트 키'],
    section: '디지털 키',
    matchedKeywords: ['디지털 키', 'NFC 카드 키', '스마트폰 디지털 키'],
    pageRange: '본문/색인 검색 확인'
  });

  mark('ac-slow-charging', { section: '완속 충전기 사용하기', matchedKeywords: ['완속 충전기 사용하기'] });
  mark('dc-fast-charging', { section: '급속 충전기 사용하기', matchedKeywords: ['급속 충전기 사용하기'] });
  mark('portable-charger-iccb', { section: '휴대용 충전기(ICCB) 사용하기', matchedKeywords: ['휴대용 충전기(ICCB) 사용하기'] });
  mark('stop-charging-immediately', { section: '충전 즉시 중단하기', matchedKeywords: ['충전 즉시 중단하기'] });
  mark('hyundai-digital-key', { section: '디지털 키', matchedKeywords: ['디지털 키'] });

  mark('battery-conditioning', {
    ...evGuide,
    section: '배터리 컨디셔닝 사용하기',
    aliases: ['배터리 컨디셔닝', 'Battery Conditioning'],
    matchedKeywords: ['배터리 컨디셔닝'],
    settings: ['인포테인먼트 시스템의 홈 화면에서 Electric Vehicle > EV 설정 > 배터리 컨디셔닝 모드 > 사용을 선택합니다.'],
    steps: ['고전압 배터리 온도가 높거나 낮을 때 수동으로 작동하거나 내비게이션 연동 기능을 활용합니다.', '급속 충전 성능에 최적화된 배터리 온도를 유지하도록 작동 상태를 확인합니다.'],
    limitations: ['배터리 히터가 장착된 차량에서만 사용할 수 있습니다.', '배터리 충전량이 적거나 배터리 온도가 이미 적합한 경우 작동하지 않을 수 있습니다.'],
    warnings: ['배터리 온도를 높이기 위해 충전된 전력을 사용하므로 주행 가능 거리가 짧아질 수 있습니다.']
  });
  mark('ev-route-planner', {
    ...evGuide,
    section: '내비게이션 연동 / 급속 충전소',
    aliases: ['내비게이션 연동', '급속 충전소', 'EV Route Planner'],
    matchedKeywords: ['급속 또는 초급속 충전소', '목적지', '경유지'],
    steps: ['내비게이션에서 급속 또는 초급속 충전소를 목적지나 경유지로 설정합니다.', '배터리 컨디셔닝 기능이 도착 시간에 맞춰 고속 충전에 적합한 배터리 온도를 제공할 수 있습니다.'],
    limitations: ['내비게이션 목적지/경유지 설정과 배터리 상태에 따라 작동 조건이 달라집니다.']
  });
  mark('scheduled-charging', {
    ...evGuide,
    section: '예약 충전 기능 활용하기',
    aliases: ['예약 충전', '충전 예약', '충전 스케줄'],
    matchedKeywords: ['예약 충전 기능 활용하기'],
    settings: ['Electric Vehicle의 충전 설정에서 예약 충전 관련 항목을 설정합니다.'],
    steps: ['예약 충전 설정 후 충전 대기 및 충전 상태 정보를 확인합니다.'],
    limitations: ['예약 공조 또는 충전 조건에 따라 예상 소요 시간 표시가 달라질 수 있습니다.']
  });
  mark('charge-limit', {
    ...evGuide,
    section: '충전 목표 배터리량 설정하기',
    aliases: ['충전 목표 배터리량', '충전 제한 설정', '충전 한도'],
    matchedKeywords: ['충전 목표 배터리량 설정하기'],
    settings: ['Electric Vehicle > EV 충전 설정에서 충전 목표 배터리량을 설정합니다.'],
    steps: ['완속/급속 충전 목표 배터리량을 설정합니다.'],
    limitations: ['배터리 상태와 충전기 조건에 따라 실제 충전 종료 시점이 달라질 수 있습니다.']
  });
  mark('ev-charging-current-setting', {
    ...evGuide,
    section: '완속 충전 설정하기',
    aliases: ['충전 전류', '완속 충전 전류', '충전 전류 설정'],
    matchedKeywords: ['충전 전류', '완속 충전 설정하기'],
    settings: ['Electric Vehicle > EV 충전 설정 > 완속 충전 설정을 선택합니다.'],
    steps: ['충전 환경에 맞춰 완속 충전 전류를 설정합니다.'],
    limitations: ['충전 설비와 케이블 정격에 맞는 범위에서 사용합니다.']
  });
  mark('charging-connector-lock', {
    ...evGuide,
    section: '충전 커넥터 잠금 모드 설정하기',
    aliases: ['충전 커넥터 잠금', '충전구 잠금'],
    matchedKeywords: ['충전 커넥터 잠금 모드 설정하기'],
    settings: ['전체 메뉴 화면에서 Electric Vehicle > EV 충전 설정 > 완속 충전 설정을 선택합니다.'],
    steps: ['상시 잠금, 충전 중 잠금, 사용 안함 중 원하는 잠금 모드를 선택합니다.'],
    limitations: ['급속 충전 및 V2L 기능 사용 중에는 설정과 관계없이 커넥터가 자동으로 잠깁니다.'],
    warnings: ['잠금 해제 버튼이 작동하지 않는 경우 비상시 충전 커넥터 분리 절차를 따릅니다.']
  });
  mark('ev-charge-status', {
    ...evGuide,
    section: '충전 상태 표시',
    aliases: ['충전 상태', '충전 상태 확인'],
    matchedKeywords: ['충전 상태'],
    steps: ['충전 상태 표시 정보를 확인합니다.', 'POWER ON 상태에서는 충전 상태 표시 정보가 지속적으로 표시될 수 있습니다.']
  });
  mark('ev-charging-information', {
    ...evGuide,
    section: '전기차 충전 관련 기본 정보 확인하기',
    aliases: ['전기차 충전 정보', '충전 정보'],
    matchedKeywords: ['전기차 충전 관련 기본 정보 확인하기'],
    steps: ['전기차 충전 관련 기본 정보를 확인한 뒤 충전기를 사용합니다.']
  });
  mark('v2l-parent', {
    ...evGuide,
    section: '전기 사용(V2L) 기능 활용하기',
    aliases: ['전기 사용(V2L)', 'Vehicle to Load', 'V2L'],
    matchedKeywords: ['전기 사용(V2L) 기능 활용하기'],
    settings: ['Electric Vehicle > EV 충전 설정에서 전기 사용(V2L) 관련 설정을 확인합니다.'],
    steps: ['차량 외부 또는 내부에서 전기 사용 기능을 활용합니다.'],
    limitations: ['방전 제한량, 고전압 배터리 잔량, V2L 커넥터 상태에 따라 제한됩니다.']
  });
  mark('v2l-indoor', {
    ...evGuide,
    section: '차량 내부에서 전기 사용하기',
    aliases: ['차량 내부에서 전기 사용하기', '실내 V2L'],
    matchedKeywords: ['차량 내부에서 전기 사용하기'],
    steps: ['차량 내부 전원 공급 장치에 전기 제품을 연결해 사용합니다.'],
    limitations: ['사용 가능한 전력과 방전 제한량을 확인합니다.']
  });
  mark('v2l-outdoor', {
    ...evGuide,
    section: '차량 외부에서 전기 사용하기',
    aliases: ['차량 외부에서 전기 사용하기', '실외 V2L'],
    matchedKeywords: ['차량 외부에서 전기 사용하기'],
    steps: ['외부 V2L 커넥터를 연결해 차량 외부에서 전기를 사용합니다.'],
    limitations: ['커넥터 잠금 상태와 방전 제한량 조건을 확인합니다.']
  });
  mark('v2l-discharge-limit', {
    ...evGuide,
    section: '전기 사용(V2L)시 방전 제한량 설정하기',
    aliases: ['방전 제한량', 'V2L 방전 제한량'],
    matchedKeywords: ['전기 사용(V2L)시 방전 제한량 설정하기'],
    settings: ['Electric Vehicle > EV 충전 설정에서 전기 사용(V2L) 방전 제한량을 설정합니다.'],
    steps: ['원하는 방전 제한량을 설정합니다.'],
    limitations: ['설정된 방전 제한량에 도달하면 V2L 기능이 차단됩니다.']
  });
  mark('utility-mode', {
    ...evGuide,
    section: '유틸리티 모드 설정하기',
    aliases: ['유틸리티 모드'],
    matchedKeywords: ['유틸리티 모드 설정하기'],
    preconditions: ['클러스터에 주행 가능 표시등이 표시되어 있어야 합니다.', '변속단이 P(주차) 위치에 있어야 합니다.'],
    steps: ['유틸리티 모드의 작동 조건을 확인합니다.', 'Electric Vehicle의 EV 설정에서 유틸리티 모드를 설정합니다.'],
    limitations: ['유틸리티 모드 사용 중에는 차량을 주행할 수 없으며 P(주차) 이외의 위치로 변속할 수 없습니다.']
  });
  mark('ev-energy-usage', {
    ...evGuide,
    section: '에너지 정보 확인하기',
    aliases: ['전력 소비량', '에너지 사용량', '에너지 정보'],
    matchedKeywords: ['에너지 정보 확인하기', '전력 소비량'],
    settings: ['EV 모드 화면에서 에너지 정보를 선택합니다.'],
    steps: ['전력 소비량과 시스템별 에너지 사용 정보를 확인합니다.']
  });
  mark('ev-driving-range', {
    ...evGuide,
    section: '전기차 주행 정보 확인하기',
    aliases: ['주행 가능 거리', 'EV 주행 가능 거리'],
    matchedKeywords: ['주행 가능 거리'],
    steps: ['클러스터 또는 EV 모드 화면에서 주행 가능 거리와 전기차 주행 정보를 확인합니다.']
  });
  mark('ev-battery-health', {
    ...evGuide,
    section: '배터리 상태',
    aliases: ['배터리 상태', '고전압 배터리'],
    matchedKeywords: ['배터리 상태'],
    steps: ['고전압 배터리 충전량 및 상태 표시를 확인합니다.']
  });
  mark('ev-menu-settings', {
    ...evGuide,
    section: 'EV 모드 기능 사용하기',
    aliases: ['EV 모드', 'EV 설정', 'EV 모드 화면 구성'],
    matchedKeywords: ['EV 모드 기능 사용하기', 'EV 모드 화면 구성 확인하기'],
    steps: ['EV 모드 화면 구성에서 충전, 에너지 정보, EV 설정 항목을 확인합니다.']
  });
  mark('ev-regen-level', {
    section: '회생 제동 시스템',
    aliases: ['회생 제동', '회생 제동 단계', '회생제동 단계 조절'],
    matchedKeywords: ['회생 제동'],
    preconditions: ['차량이 주행 가능한 상태여야 합니다.'],
    steps: ['패들 쉬프트 레버 조작으로 회생 제동 단계를 설정합니다.', '클러스터에서 회생 제동 단계와 스마트 회생 시스템 작동 상태를 확인합니다.'],
    limitations: ['주행 조건과 배터리 상태에 따라 회생 제동량이 달라질 수 있습니다.'],
    warnings: ['필요 시 브레이크 페달을 직접 사용합니다.']
  });
  mark('i-pedal', {
    section: '아이 페달(i-PEDAL) 사용하기',
    aliases: ['i-PEDAL', 'i-Pedal', '아이 페달'],
    matchedKeywords: ['아이 페달(i-PEDAL) 사용하기'],
    preconditions: ['회생 제동 기능을 사용할 수 있는 주행 상태여야 합니다.'],
    steps: ['아이 페달(i-PEDAL) 사용하기 항목의 안내에 따라 회생 제동 레버를 조작합니다.'],
    limitations: ['도로 및 차량 상태에 따라 감속 또는 정차 성능이 달라질 수 있습니다.'],
    warnings: ['주변 상황을 확인하고 필요 시 브레이크 페달을 직접 밟습니다.']
  });
  mark('one-pedal-driving', {
    section: '원 페달 드라이빙 사용하기',
    aliases: ['원 페달 드라이빙', '원 페달'],
    matchedKeywords: ['원 페달 드라이빙 사용하기'],
    preconditions: ['회생 제동 레버 조작이 가능한 주행 상태여야 합니다.'],
    steps: ['원 페달 드라이빙 사용하기 항목의 안내에 따라 회생 제동 증가 레버를 사용합니다.'],
    limitations: ['차량 또는 도로 상태에 따라 완전 정지하지 못할 수 있습니다.'],
    warnings: ['필요 시 브레이크 페달을 직접 밟아 감속합니다.']
  });
  mark('ev-smart-regeneration', {
    section: '스마트 회생 시스템',
    aliases: ['스마트 회생 제동', '스마트 회생 시스템'],
    matchedKeywords: ['스마트 회생 시스템'],
    preconditions: ['스마트 회생 시스템 작동 조건을 만족해야 합니다.'],
    steps: ['스마트 회생 시스템 켜기/끄기 항목에 따라 기능을 설정합니다.', '스마트 회생 제동량을 확인하고 설정합니다.'],
    limitations: ['전방 감지 센서 조건, 도로 상황, 내비게이션 정보 상태에 따라 제한됩니다.'],
    warnings: ['스마트 회생 시스템 사용 시의 주의 사항을 확인합니다.']
  });

  [
    ['fca-suite', '전방 충돌방지 보조 (FCA)'],
    ['lane-keeping-assist', '차로 이탈방지 보조 (LKA)'],
    ['blind-spot-collision-avoidance-assist', '후측방 충돌방지 보조 (BCA)'],
    ['safe-exit-assist', '안전 하차 경고/보조'],
    ['intelligent-speed-limit-assist', '지능형 속도 제한 보조 (ISLA)'],
    ['driver-attention-warning', '운전자 주의 경고 (DAW)'],
    ['blind-spot-view-monitor', '후측방 모니터 (BVM)'],
    ['nscc-hda2', '스마트 크루즈 컨트롤 (SCC) / 내비게이션 기반 SCC / 고속도로 주행 보조 (HDA)'],
    ['lane-following-assist', '차로 유지 보조 (LFA)'],
    ['rear-view-monitor', '후방 모니터 (RVM)'],
    ['surround-view-monitor', '서라운드 뷰 모니터 (SVM)'],
    ['rear-cross-traffic-collision-avoidance', '후방 교차 충돌방지 보조 (RCCA)'],
    ['parking-distance-warning', '주차 거리 경고 (PDW)'],
    ['side-pdw', '전방/측방/후방 주차 거리 경고 (PDW)'],
    ['pca-parking', '주차 충돌방지 보조 (PCA)'],
    ['rspa', '원격 스마트 주차 보조 (RSPA)']
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

  mark('nfc-card-key', {
    ...commonSource,
    section: 'NFC 카드 키',
    aliases: ['NFC 카드 키', '디지털 키(카드 키)', '터치 제어'],
    matchedKeywords: ['NFC 카드 키'],
    preconditions: ['인포테인먼트 시스템에서 설정 > 차량 > 디지털 키 > NFC 카드 키의 사용 체크 박스가 선택되어 있어야 합니다.', '카드 키 등록 시 스마트 키 2개를 휴대해야 합니다.'],
    settings: ['차량 전원 ON 상태에서 등록하려는 카드 키를 실내 인증 패드(무선 충전 패드)에 올립니다.', '설정 > 차량 > 디지털 키 > NFC 카드 키 > 등록을 선택합니다.'],
    steps: ['카드 키를 차량 도어 손잡이에 터치하여 도어 잠금/잠금 해제를 사용합니다.', '차량 내 실내 인증 패드 위에 올려놓고 시동을 걸 수 있습니다.'],
    limitations: ['차량 시스템에 등록된 디지털 키(카드 키)가 있으면 새 카드 키를 등록할 수 없습니다.'],
    warnings: ['차량에 등록한 카드 키는 다른 차량에서 등록할 수 없습니다.']
  });
  mark('smart-key', {
    ...commonSource,
    section: '스마트 키',
    aliases: ['스마트 키'],
    matchedKeywords: ['스마트 키'],
    preconditions: ['스마트 키를 휴대해야 합니다.'],
    steps: ['스마트 키 버튼 또는 차량 도어 조작으로 잠금/잠금 해제와 시동 기능을 사용합니다.'],
    warnings: ['스마트 키를 분실한 경우 가까운 직영 하이테크센터나 블루핸즈로 차량을 견인해 조치를 받습니다.']
  });
  mark('built-in-cam', {
    ...commonSource,
    section: '빌트인 캠 (Built-in Cam)',
    aliases: ['빌트인 캠', 'Built-in Cam', '빌트인 캠 설정', '빌트인 캠 작동'],
    matchedKeywords: ['빌트인 캠 (Built-in Cam)', '빌트인 캠 설정'],
    preconditions: ['빌트인 캠 적용 사양이어야 합니다.'],
    settings: ['빌트인 캠 설정 메뉴에서 녹화 관련 항목을 설정합니다.'],
    steps: ['빌트인 캠 작동 상태를 확인합니다.', '빌트인 캠 영상 확인, 휴대폰 앱 연결, 소프트웨어 업데이트 항목을 매뉴얼 안내에 따라 사용합니다.'],
    limitations: ['영상 저장 위치 및 저장 기준, 저장 장치 상태에 따라 녹화 보관 방식이 달라집니다.'],
    warnings: ['녹화 및 영상 활용 시 개인정보와 법적 책임을 확인합니다.']
  });
  mark('ccnc-ota', {
    ...commonSource,
    section: '무선 소프트웨어 업데이트',
    aliases: ['무선 소프트웨어 업데이트', 'OTA'],
    matchedKeywords: ['무선 소프트웨어 업데이트', 'OTA'],
    preconditions: ['차량 통신 및 업데이트 조건을 만족해야 합니다.'],
    steps: ['소프트웨어 자동 다운로드 및 소프트웨어 업데이트 승인 안내에 따라 업데이트를 진행합니다.']
  });
  mark('voice-recognition-system', {
    ...commonSource,
    section: '음성 인식 버튼',
    aliases: ['음성 인식', '음성 인식 버튼'],
    matchedKeywords: ['음성 인식 버튼'],
    preconditions: ['인포테인먼트 시스템 음성 인식 기능을 사용할 수 있어야 합니다.'],
    steps: ['스티어링 휠의 음성 인식 버튼을 사용합니다.']
  });
  mark('apple-carplay-wired', {
    ...commonSource,
    section: '스마트폰 연동 기능',
    aliases: ['CarPlay', 'Apple CarPlay'],
    matchedKeywords: ['CarPlay'],
    preconditions: ['CarPlay 지원 스마트폰과 차량 연결 조건이 필요합니다.'],
    steps: ['인포테인먼트 시스템에서 스마트폰 연동 기능을 사용합니다.']
  });
  mark('android-auto-wired', {
    ...commonSource,
    section: '스마트폰 연동 기능',
    aliases: ['Android Auto'],
    matchedKeywords: ['Android Auto'],
    preconditions: ['Android Auto 지원 스마트폰과 차량 연결 조건이 필요합니다.'],
    steps: ['인포테인먼트 시스템에서 스마트폰 연동 기능을 사용합니다.']
  });
  mark('climate-control', {
    ...commonSource,
    section: '히터와 에어컨',
    aliases: ['히터와 에어컨', '공조', '운전석 개별 공조'],
    matchedKeywords: ['히터와 에어컨', '공조'],
    preconditions: ['차량 전원이 켜져 있어야 합니다.'],
    steps: ['히터와 에어컨 사용량을 조절합니다.', '운전자 단독 주행 중에는 운전석 개별 공조(DRIVER ONLY)를 사용할 수 있습니다.'],
    limitations: ['냉난방 사용은 고전압 배터리 전력을 사용하므로 주행 가능 거리에 영향을 줄 수 있습니다.'],
    warnings: ['냉난방이 필요하지 않을 때는 히터 및 에어컨을 끄고 주행합니다.']
  });
  mark('remote-climate', {
    ...commonSource,
    section: '원격 공조 / 블루링크',
    aliases: ['원격 공조', '블루링크', '마이현대'],
    matchedKeywords: ['원격 공조', '블루링크'],
    preconditions: ['블루링크 서비스 가입 및 앱 사용 조건이 필요합니다.'],
    steps: ['마이현대 앱을 이용해 주차 중 차량의 배터리 컨디셔닝 또는 공조 관련 기능을 원격으로 제어할 수 있습니다.'],
    limitations: ['블루링크 서비스 사용법은 별도 설명서를 참고합니다.']
  });
  mark('bluelink-connected-services', {
    ...commonSource,
    section: '블루링크 (Bluelink)',
    aliases: ['블루링크', 'Bluelink', '마이현대'],
    matchedKeywords: ['블루링크', 'Bluelink'],
    preconditions: ['블루링크 서비스 가입이 필요합니다.'],
    steps: ['마이현대 앱과 블루링크 서비스를 통해 지원되는 원격 기능을 사용합니다.'],
    limitations: ['상세한 블루링크 서비스 사용법은 별도 설명서를 참고합니다.']
  });

  [
    'hyundai-dk2',
    'hyundai-dk2-touch',
    'built-in-cam2',
    'built-in-cam2-plus',
    'ccnc-system',
    'hyundai-ai',
    'iccu-energy-control',
    'camping-mode',
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
    'n-performance',
    'rspa2'
  ].forEach(removeKonaEvApply);
};
