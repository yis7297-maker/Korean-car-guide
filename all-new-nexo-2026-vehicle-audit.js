/* NH2 2026 Owners Manual vehicle-specific audit overlay.
 * Scope: Hyundai 디 올 뉴 넥쏘 NH2 2026 only.
 * Source:
 * - work/manual-text/NH2_2026_ko_KR.txt
 */
window.applyAllNewNexoManualAudit = function applyAllNewNexoManualAudit() {
  if (!Array.isArray(window.features) && typeof features === 'undefined') return;
  if (!Array.isArray(window.vehicles) && typeof vehicles === 'undefined') return;

  const today = '2026-07-13';
  const featureList = window.features || features;
  const vehicleList = window.vehicles || vehicles;
  const ensureArray = value => Array.isArray(value) ? value : [];
  const uniq = items => [...new Set(ensureArray(items).filter(Boolean))];
  const findFeature = id => featureList.find(feature => feature.id === id);

  const nexoApply = {
    vehicleId: 'hy-nexo',
    brand: '현대',
    model: '디 올 뉴 넥쏘',
    years: '2026',
    trim: 'NH2 해당 사양/트림',
    option: 'Owners Manual 수록 사양 기준'
  };

  const evidence = {
    manualFile: 'NH2_2026_ko_KR.txt',
    modelCode: 'NH2',
    modelName: '디 올 뉴 넥쏘',
    modelYear: '2026',
    basis: 'official_owner_manual',
    verifiedBy: 'vehicle-manual-audit',
    pageRange: 'NH2_2026_ko_KR.txt 본문/목차/색인 검색 확인'
  };

  const vehicle = vehicleList.find(item => item.id === 'hy-nexo');
  if (vehicle) {
    vehicle.brand = '현대';
    vehicle.name = '디 올 뉴 넥쏘';
    vehicle.group = '수소전기차';
    vehicle.fcev = true;
  } else {
    vehicleList.push({ id: 'hy-nexo', brand: '현대', name: '디 올 뉴 넥쏘', group: '수소전기차', fcev: true });
  }

  const upsertApply = (feature, apply) => {
    feature.applies = ensureArray(feature.applies);
    const existing = feature.applies.find(item => item.vehicleId === apply.vehicleId);
    if (existing) Object.assign(existing, apply);
    else feature.applies.push({ ...apply });
  };

  const removeNexoApply = id => {
    const feature = findFeature(id);
    if (!feature || !Array.isArray(feature.applies)) return;
    feature.applies = feature.applies.filter(apply => apply.vehicleId !== 'hy-nexo');
  };

  const addGuide = (feature, config) => {
    feature.modelSpecificGuides = ensureArray(feature.modelSpecificGuides)
      .filter(guide => !(guide.modelCode === 'NH2' && guide.modelYear === '2026'));
    feature.modelSpecificGuides.push({
      brand: 'Hyundai',
      modelCode: 'NH2',
      modelName: '디 올 뉴 넥쏘',
      modelYear: '2026',
      manualFile: 'NH2_2026_ko_KR.txt',
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
    upsertApply(feature, nexoApply);
    feature.sources = uniq([...(feature.sources || []), 'hyundaiManual']);
    feature.aliases = uniq([...(feature.aliases || []), ...(config.aliases || [])]);
    feature.keywords = uniq([...(feature.keywords || []), ...(config.aliases || []), ...(config.matchedKeywords || [])]);
    if (config.update) Object.assign(feature, config.update);
    feature.manualEvidence = {
      ...evidence,
      section: config.section || feature.name,
      matchedKeywords: config.matchedKeywords || config.aliases || [feature.name]
    };
    feature.vehicleAudit = {
      ...(feature.vehicleAudit || {}),
      hyAllNewNexoNh22026: {
        confirmed: true,
        manualFile: 'NH2_2026_ko_KR.txt',
        matchedKeywords: config.matchedKeywords || config.aliases || [feature.name],
        updatedAt: today
      }
    };
    feature.verified = {
      complete: true,
      date: today,
      basis: 'official_owner_manual',
      manualFile: 'NH2_2026_ko_KR.txt',
      brand: 'Hyundai',
      modelCode: 'NH2',
      modelName: '디 올 뉴 넥쏘',
      modelYear: '2026',
      pageRange: config.pageRange || '본문/목차/색인 검색 확인',
      section: config.section || feature.name,
      verifiedBy: 'vehicle-manual-audit'
    };
    feature.verificationLevel = 'official_manual_verified';
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
      category: feature.category || 'FCEV',
      officialCategory: feature.officialCategory || feature.name,
      aliases: uniq(feature.aliases),
      keywords: uniq([feature.name, ...(feature.aliases || []), ...(feature.matchedKeywords || [])]),
      summary: feature.summary,
      overview: feature.overview || feature.summary,
      preconditions: ensureArray(feature.preconditions),
      settings: ensureArray(feature.settings),
      steps: ensureArray(feature.steps),
      disable: ensureArray(feature.disable),
      limitations: ensureArray(feature.limitations),
      warnings: ensureArray(feature.warnings),
      related: uniq(feature.related),
      applies: [{ ...nexoApply }],
      sources: uniq([...(feature.sources || []), 'hyundaiManual']),
      verify: { catalog: false, price: false, webManual: false, ownerManual: true, homepage: false, complete: true },
      verified: {
        complete: true,
        date: today,
        basis: 'official_owner_manual',
        manualFile: 'NH2_2026_ko_KR.txt',
        brand: 'Hyundai',
        modelCode: 'NH2',
        modelName: '디 올 뉴 넥쏘',
        modelYear: '2026',
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
        modelCode: 'NH2',
        modelName: '디 올 뉴 넥쏘',
        modelYear: '2026',
        manualFile: 'NH2_2026_ko_KR.txt',
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

  const fcevCommonWarning = [
    '고전압 부품, 고전압 배터리, 배선 및 커넥터를 임의로 분리하거나 분해하지 않습니다.',
    '수소 전기차의 고전압/수소 계통 점검은 현대자동차 서비스 거점을 이용합니다.'
  ];

  const newFeatures = [
    {
      id: 'fcev-powertrain-system',
      slug: 'fcev-powertrain-system',
      name: '수소 전기차 시스템',
      aliases: ['FCEV 시스템', '수소전기차 시스템', '수소 전기차 파워트레인'],
      summary: '수소와 공기를 연료 전지 스택에 공급해 전기를 만들고, 이 전기로 구동 모터를 움직이는 디 올 뉴 넥쏘의 수소 전기차 구동 시스템입니다.',
      preconditions: ['시동이 가능한 차량 상태에서 수소 연료와 고전압 배터리 전원이 시스템에 공급되어야 합니다.'],
      settings: ['별도 사용자 설정 기능이 아니라 차량 구동 시스템으로 작동합니다.'],
      steps: ['시동 후 연료 전지 시스템이 수소와 공기를 이용해 전기를 생성합니다.', '생성된 전기와 고전압 배터리 전원이 구동 모터에 전달됩니다.', '감속 시 회생 제동으로 고전압 배터리를 충전합니다.'],
      disable: ['운전자가 개별 기능처럼 해제하지 않으며, 차량 전원을 끄면 구동 시스템 작동이 종료됩니다.'],
      limitations: ['수소 잔량, 고전압 배터리 상태, 외기 온도, 시스템 보호 조건에 따라 출력과 표시 정보가 달라질 수 있습니다.'],
      warnings: fcevCommonWarning,
      related: ['연료 전지 스택', '수소 저장 시스템', '수소전기차 고전압 배터리', 'FCEV 에너지 흐름도'],
      section: '수소 전기차 이해하기',
      matchedKeywords: ['수소 전기차 이해하기', '연료 전지 스택', '고전압 배터리'],
      pageRange: 'NH2_2026_ko_KR.txt: 수소 전기차 이해하기'
    },
    {
      id: 'fuel-cell-stack',
      slug: 'fuel-cell-stack',
      name: '연료 전지 스택',
      aliases: ['Fuel Cell Stack', '연료전지 스택', '연료 전지'],
      summary: '수소와 공기의 전기화학 반응으로 전기를 생성하는 수소 전기차 핵심 장치입니다.',
      preconditions: ['연료 전지 시스템이 정상 상태이고 수소와 공기 공급이 가능한 상태여야 합니다.'],
      settings: ['사용자가 별도로 설정하지 않는 차량 핵심 장치입니다.'],
      steps: ['수소 공급 장치가 스택으로 수소를 공급합니다.', '공기 공급 장치가 스택으로 공기를 공급합니다.', '스택 내부 반응으로 전기가 생성되어 구동 시스템과 고전압 배터리에 사용됩니다.'],
      disable: ['별도 해제 절차는 없으며 차량 전원 종료와 시스템 제어에 따라 작동이 멈춥니다.'],
      limitations: ['저온, 시스템 보호 조건, 수소 잔량, 관련 경고 상태에 따라 출력 및 작동이 제한될 수 있습니다.'],
      warnings: fcevCommonWarning,
      related: ['수소 전기차 시스템', '연료 전지 시스템 모듈', '수소 저장 시스템'],
      section: '수소 전기차 주요 장치 살펴보기',
      matchedKeywords: ['연료 전지 스택', '연료 전지 시스템 모듈'],
      pageRange: 'NH2_2026_ko_KR.txt: 수소 전기차 주요 장치 살펴보기'
    },
    {
      id: 'fuel-cell-system-module',
      slug: 'fuel-cell-system-module',
      name: '연료 전지 시스템 모듈',
      aliases: ['Fuel Cell System Module', '연료 전지 시스템', '공기 공급 장치', '수소 공급 장치'],
      summary: '연료 전지 스택, 공기 공급 장치, 수소 공급 장치 등으로 구성되어 연료 전지의 전기 생성을 제어하는 장치입니다.',
      preconditions: ['수소 저장 시스템과 공기 공급 계통이 정상 상태여야 합니다.'],
      settings: ['사용자 메뉴에서 직접 설정하는 기능이 아니라 시스템 제어 장치입니다.'],
      steps: ['공기 공급 장치가 스택에 공기를 공급합니다.', '수소 공급 장치가 스택에 수소를 공급합니다.', '냉각 및 열관리 장치가 시스템 온도를 관리합니다.'],
      disable: ['별도 해제 절차 없이 차량 전원 및 시스템 제어 상태에 따라 작동합니다.'],
      limitations: ['시스템 이상, 온도 조건, 수소 공급 상태에 따라 경고가 표시되거나 주행이 제한될 수 있습니다.'],
      warnings: fcevCommonWarning,
      related: ['연료 전지 스택', '수소 저장 시스템', '수소 누출 경고'],
      section: '수소 전기차 주요 장치 살펴보기',
      matchedKeywords: ['연료 전지 시스템 모듈', '연료 전지 시스템'],
      pageRange: 'NH2_2026_ko_KR.txt: 수소 전기차 주요 장치 살펴보기'
    },
    {
      id: 'hydrogen-storage-system',
      slug: 'hydrogen-storage-system',
      name: '수소 저장 시스템',
      aliases: ['Hydrogen Storage System', '수소 저장 장치', '수소 탱크'],
      summary: '차량 주행에 필요한 수소 가스를 고압 탱크에 저장하는 시스템입니다.',
      preconditions: ['수소 충전 후 저장 시스템과 충전구가 정상적으로 닫혀 있어야 합니다.'],
      settings: ['사용자 설정 기능이 아니라 수소 충전 및 저장 계통입니다.'],
      steps: ['수소 충전소에서 충전구를 열고 충전 장비를 연결합니다.', '충전 후 충전구와 커버가 닫힌 상태인지 확인합니다.', '차량은 수소 잔량과 주행 가능 거리를 계기판 및 FCEV 정보 화면에 표시합니다.'],
      disable: ['별도 해제 절차는 없으며 충전 완료 후 충전 장비를 분리하고 충전구를 닫습니다.'],
      limitations: ['수소 잔량, 수소 탱크 온도와 압력, 충전소 조건에 따라 충전량과 주행 가능 거리가 달라질 수 있습니다.'],
      warnings: ['수소 누출 경고 또는 수소 계통 경고가 표시되면 안전한 곳에 정차하고 제조사 안내에 따릅니다.', ...fcevCommonWarning],
      related: ['수소 충전 / 충전구 개폐', '수소 탱크 정보', '수소 주행 가능 거리', '수소 누출 경고'],
      section: '수소 전기차 주요 장치 살펴보기 / 수소 전기차 충전하기',
      matchedKeywords: ['수소 저장 시스템', '수소 탱크', '수소 충전'],
      pageRange: 'NH2_2026_ko_KR.txt: 수소 전기차 주요 장치 살펴보기, 수소 전기차 충전하기'
    },
    {
      id: 'fcev-high-voltage-battery',
      slug: 'fcev-high-voltage-battery',
      name: '수소전기차 고전압 배터리',
      aliases: ['FCEV 고전압 배터리', '고전압 배터리', 'High Voltage Battery'],
      summary: '구동 모터와 전동식 공조 장치 등에 전원을 공급하고, 연료 전지 및 회생 제동으로 충전되는 고전압 배터리입니다.',
      preconditions: ['연료 전지 시스템 또는 회생 제동을 통해 충전 가능한 차량 상태여야 합니다.'],
      settings: ['사용자가 직접 충전 설정을 조작하는 배터리가 아니며, 차량 시스템이 충전과 방전을 제어합니다.'],
      steps: ['연료 전지 시스템이 생성한 전기가 고전압 배터리를 충전합니다.', '감속 시 회생 제동으로 발생한 전기가 고전압 배터리에 저장됩니다.', '배터리 전력은 구동 모터와 전동식 공조 장치 등에 사용됩니다.'],
      disable: ['사용자가 별도로 해제하지 않으며 차량 전원 및 시스템 제어에 따라 작동합니다.'],
      limitations: ['배터리 충전 상태, 온도, 사용 전력량에 따라 주행 가능 거리와 전력 사용 가능 시간이 달라질 수 있습니다.'],
      warnings: fcevCommonWarning,
      related: ['수소 전기차 시스템', 'FCEV 에너지 흐름도', '스마트 회생제동 / 회생제동 조절'],
      section: '수소 전기차에 사용되는 배터리',
      matchedKeywords: ['수소 전기차에 사용되는 배터리', '고전압 배터리'],
      pageRange: 'NH2_2026_ko_KR.txt: 수소 전기차에 사용되는 배터리'
    },
    {
      id: 'fuel-cell-wake-up',
      slug: 'fuel-cell-wake-up',
      name: '주차 중 연료 전지 시스템 보호 기능',
      aliases: ['Wake Up 기능', '연료 전지 시스템 보호 기능', '주차 중 보호 기능'],
      summary: '영하 조건에서 주차 중 연료 전지 시스템 내부 결빙을 방지하기 위해 냉각수 가열 및 물 배출을 수행하는 보호 기능입니다.',
      preconditions: ['차량이 주차되어 있고 외기 온도 등 시스템 보호 조건이 충족되어야 합니다.', '고전압 배터리와 수소 연료가 사용 가능한 상태여야 합니다.'],
      settings: ['운전자가 별도 메뉴에서 켜는 기능이 아니라 시스템 보호 조건에 따라 작동합니다.'],
      steps: ['차량 주차 중 영하 조건에서 시스템이 보호 필요 여부를 판단합니다.', '필요 시 고전압 배터리와 수소 연료를 사용해 냉각수 가열 또는 물 배출을 수행합니다.', '물 배출 기능은 주차 중 1회 작동할 수 있으며 주변에 물이 고일 수 있습니다.'],
      disable: ['시동 버튼 조작, 후드 열림, 변속 위치 변경, 연료 주입구 열림, 관련 고장 발생 등 조건에서 기능이 종료될 수 있습니다.'],
      limitations: ['영하 조건에서만 작동하며 작동 조건은 온도에 따라 달라집니다.', '물 배출 기능은 수소 연료를 사용하므로 수소 잔량에 영향을 줄 수 있습니다.'],
      warnings: ['겨울철 차량과 연결된 텐트 사용 시 수증기와 수소가 텐트 안으로 유입될 수 있으므로 주의합니다.', '별도 배터리 차단 장치를 설치하거나 저전압 배터리를 임의로 분리하지 않습니다.'],
      related: ['주차 중 물 배출 기능', '수소전기차 고전압 배터리', '수소 저장 시스템'],
      section: '주차 중 연료 전지 시스템 보호 기능(Wake Up 기능)',
      matchedKeywords: ['주차 중 연료 전지 시스템 보호 기능', 'Wake Up 기능', '물 배출'],
      pageRange: 'NH2_2026_ko_KR.txt: 주차 중 연료 전지 시스템 보호 기능(Wake Up 기능)'
    },
    {
      id: 'fuel-cell-water-drain',
      slug: 'fuel-cell-water-drain',
      name: '주차 중 물 배출 기능',
      aliases: ['물 배출 기능', '연료 전지 물 배출', 'Water Drain'],
      summary: '연료 전지 시스템 보호를 위해 주차 중 내부 물을 배출하는 기능입니다.',
      preconditions: ['차량이 주차 중이고 영하 조건 등 시스템 보호 조건이 충족되어야 합니다.'],
      settings: ['사용자가 직접 켜는 기능이 아니라 연료 전지 시스템 보호 조건에 따라 작동합니다.'],
      steps: ['시스템이 주차 중 물 배출 필요 여부를 판단합니다.', '조건이 맞으면 수소 연료를 사용해 물 배출을 수행합니다.', '작동 후 차량 주변에 물이 고일 수 있습니다.'],
      disable: ['시동 버튼 조작, 후드 열림, 변속 위치 변경, 연료 주입구 열림, 관련 고장 발생 시 종료될 수 있습니다.'],
      limitations: ['주차 중 1회 작동할 수 있으며 수소 잔량에 영향을 줄 수 있습니다.'],
      warnings: ['겨울철 차량과 연결된 텐트 사용 시 수증기와 수소가 텐트로 유입될 수 있으므로 주의합니다.'],
      related: ['주차 중 연료 전지 시스템 보호 기능', '수소 저장 시스템'],
      section: '주차 중 연료 전지 시스템 보호 기능(Wake Up 기능)',
      matchedKeywords: ['물 배출', '주차 중 연료 전지 시스템 보호 기능'],
      pageRange: 'NH2_2026_ko_KR.txt: 주차 중 연료 전지 시스템 보호 기능(Wake Up 기능)'
    },
    {
      id: 'hydrogen-tank-info',
      slug: 'hydrogen-tank-info',
      name: '수소 탱크 정보',
      aliases: ['수소 탱크 온도', '수소 탱크 압력', '수소 탱크 충전 상태', 'Hydrogen Tank Info'],
      summary: 'FCEV 모드에서 수소 탱크의 온도, 압력, 충전 상태를 확인하는 기능입니다.',
      preconditions: ['차량 전원이 켜져 있고 인포테인먼트 시스템에서 FCEV 메뉴를 사용할 수 있어야 합니다.'],
      settings: ['홈 화면에서 FCEV 메뉴를 선택합니다.'],
      steps: ['인포테인먼트 홈 화면에서 FCEV를 선택합니다.', '수소 탱크 정보 화면에서 탱크 온도, 압력, 충전 상태를 확인합니다.'],
      disable: ['다른 화면으로 이동하거나 인포테인먼트 시스템을 종료합니다.'],
      limitations: ['표시 정보는 차량 상태와 센서 상태에 따라 달라질 수 있습니다.'],
      warnings: ['수소 계통 경고 또는 이상 표시가 있으면 차량을 안전한 곳에 정차하고 제조사 안내에 따릅니다.'],
      related: ['FCEV 정보 화면 / 에너지 모니터', '수소 충전 / 충전구 개폐', '수소 주행 가능 거리'],
      section: 'FCEV 모드 기능 사용하기',
      matchedKeywords: ['수소 탱크 정보', '수소 탱크 온도', '수소 탱크 압력'],
      pageRange: 'NH2_2026_ko_KR.txt: FCEV 모드 기능 사용하기'
    },
    {
      id: 'hydrogen-driving-range',
      slug: 'hydrogen-driving-range',
      name: '수소 주행 가능 거리',
      aliases: ['주행 가능 거리', '수소 잔량', 'FCEV 주행 가능 거리'],
      summary: '현재 수소 잔량을 기준으로 계기판에 주행 가능 거리를 표시하는 기능입니다.',
      preconditions: ['차량 전원이 켜져 있고 수소 잔량 및 주행 정보가 표시 가능한 상태여야 합니다.'],
      settings: ['계기판 또는 FCEV 관련 정보 화면에서 주행 가능 거리 정보를 확인합니다.'],
      steps: ['계기판에 표시되는 주행 가능 거리를 확인합니다.', '주행 가능 거리는 현재 수소 잔량과 최근 주행 조건을 기반으로 표시됩니다.'],
      disable: ['별도 해제 기능이 아니라 계기판 표시 정보입니다.'],
      limitations: ['운전 습관, 전기 부하, 외부 환경, 고전압 배터리 에너지와 상태에 따라 표시 거리가 달라질 수 있습니다.'],
      warnings: ['표시값 보정이나 초기화가 실제 주행 가능 거리를 늘리는 것은 아닙니다.'],
      related: ['수소 탱크 정보', '수소 충전 / 충전구 개폐', 'FCEV 에너지 흐름도'],
      section: '주행 가능 거리',
      matchedKeywords: ['주행 가능 거리', '수소 잔량'],
      pageRange: 'NH2_2026_ko_KR.txt: 주행 가능 거리'
    },
    {
      id: 'hydrogen-leak-warning',
      slug: 'hydrogen-leak-warning',
      name: '수소 누출 경고',
      aliases: ['Hydrogen Leak Warning', '수소 누출', '수소 경고'],
      summary: '수소 누출 또는 수소 계통 이상을 운전자에게 알려 안전 조치를 유도하는 경고 기능입니다.',
      preconditions: ['수소 저장 및 공급 계통이 감지 가능한 차량 상태여야 합니다.'],
      settings: ['사용자가 별도 설정하지 않으며, 이상 감지 시 경고등 또는 경고 메시지로 안내됩니다.'],
      steps: ['수소 계통 이상 또는 누출이 감지되면 경고가 표시됩니다.', '경고 표시 시 안전한 곳에 정차합니다.', '제조사 안내에 따라 점검을 받습니다.'],
      disable: ['문제 원인 해소 및 점검 후 경고가 해제됩니다.'],
      limitations: ['경고 표시 방식은 차량 상태와 고장 유형에 따라 달라질 수 있습니다.'],
      warnings: ['수소 누출이 의심되면 화기 사용을 피하고 안전한 장소에서 차량을 정지합니다.', '수소 계통은 임의로 분해하거나 수리하지 않습니다.'],
      related: ['수소 저장 시스템', '수소전기차 사고·화재·침수 대응'],
      section: '수소 전기차 사용 시 안전을 위한 주의사항',
      matchedKeywords: ['수소 누출', '수소 전기차 사용 시 안전을 위한 주의사항'],
      pageRange: 'NH2_2026_ko_KR.txt: 수소 전기차 사용 시 안전을 위한 주의사항'
    },
    {
      id: 'fcev-emergency-response',
      slug: 'fcev-emergency-response',
      name: '수소전기차 사고·화재·침수 대응',
      aliases: ['FCEV emergency response', '수소전기차 사고', '수소전기차 화재', '수소전기차 침수'],
      summary: '수소 전기차의 사고, 화재, 침수 등 비상 상황에서 운전자가 따라야 하는 안전 조치 안내입니다.',
      preconditions: ['사고, 화재, 침수 등 비상 상황이 발생했거나 관련 위험이 의심되는 경우입니다.'],
      settings: ['설정 메뉴가 아닌 안전 조치 안내입니다.'],
      steps: ['가능하면 안전한 장소에 정차하고 차량 전원을 끕니다.', '탑승자는 차량에서 벗어나 안전한 곳으로 이동합니다.', '필요 시 긴급 구조 기관과 현대자동차 서비스 거점에 연락합니다.'],
      disable: ['비상 상황 조치가 완료되고 차량 점검이 끝날 때까지 임의로 운행하지 않습니다.'],
      limitations: ['상황별 조치는 사고 유형, 화재 여부, 침수 정도에 따라 달라질 수 있습니다.'],
      warnings: ['고전압 부품과 수소 계통을 직접 만지거나 분해하지 않습니다.', '침수 또는 화재 후에는 반드시 전문 점검을 받습니다.'],
      related: ['수소 누출 경고', '수소 전기차 시스템', '수소 저장 시스템'],
      section: '수소 전기차 사고 및 화재 발생 시 조치 사항',
      matchedKeywords: ['수소 전기차 사고', '화재', '침수'],
      pageRange: 'NH2_2026_ko_KR.txt: 수소 전기차 사고 및 화재 발생 시 조치 사항'
    },
    {
      id: 'fcev-environmental-contribution',
      slug: 'fcev-environmental-contribution',
      name: '환경 기여도',
      aliases: ['FCEV 환경 기여도', '환경 기여도 표시', '친환경 정보'],
      summary: 'FCEV 에너지 정보 화면에서 수소 전기차 주행과 관련된 친환경 기여 정보를 확인하는 기능입니다.',
      preconditions: ['차량 전원이 켜져 있고 인포테인먼트 FCEV 메뉴를 사용할 수 있어야 합니다.'],
      settings: ['홈 화면에서 FCEV를 선택한 뒤 에너지 정보 화면으로 이동합니다.'],
      steps: ['인포테인먼트 홈 화면에서 FCEV를 선택합니다.', '에너지 정보를 선택합니다.', '수소 연비, 에너지 흐름, 환경 기여도 관련 정보를 확인합니다.'],
      disable: ['다른 화면으로 이동하거나 인포테인먼트 시스템을 종료합니다.'],
      limitations: ['표시되는 정보는 차량 주행 정보와 시스템 계산 기준에 따라 달라질 수 있습니다.'],
      warnings: ['주행 중 화면 조작은 안전을 해치지 않는 범위에서만 수행합니다.'],
      related: ['FCEV 정보 화면 / 에너지 모니터', 'FCEV 에너지 흐름도', '수소 주행 가능 거리'],
      section: '에너지 정보 확인하기',
      matchedKeywords: ['에너지 정보', '환경 기여도', '수소 연비'],
      pageRange: 'NH2_2026_ko_KR.txt: 에너지 정보 확인하기'
    }
  ];

  newFeatures.forEach(item => makeFeature(item.id, item));

  mark('nexo-h2-refuel', {
    aliases: ['수소 충전', '충전구', '수소 충전구', '수소 충전소'],
    section: '수소 전기차 충전하기',
    matchedKeywords: ['수소 전기차 충전하기', '수소 충전', '충전구'],
    preconditions: ['수소 충전소에서 안전하게 정차하고 충전 준비 상태를 확인합니다.', '수소 충전은 충전소의 안내와 안전 수칙에 따라 진행합니다.'],
    settings: ['FCEV 메뉴에서 수소 충전소 목록을 확인할 수 있습니다.'],
    steps: ['수소 충전소에서 차량을 정차합니다.', '충전구를 열고 충전 장비를 연결합니다.', '충전소 안내에 따라 충전을 진행합니다.', '충전 완료 후 충전 장비를 분리하고 충전구를 닫습니다.'],
    disable: ['충전 완료 후 충전 장비를 분리하고 충전구를 닫으면 충전 절차가 종료됩니다.'],
    limitations: ['충전소 설비, 수소 탱크 온도와 압력, 충전 상태에 따라 충전량과 시간이 달라질 수 있습니다.'],
    warnings: ['충전 전후 수소 냄새나 누출 경고가 있으면 충전을 중지하고 안전 조치를 따릅니다.']
  });

  mark('nexo-fcev-info', {
    aliases: ['FCEV 모드', 'FCEV 정보', '에너지 정보', '수소 탱크 정보'],
    section: 'FCEV 모드 기능 사용하기',
    matchedKeywords: ['FCEV 모드 기능 사용하기', '에너지 정보', '수소 탱크 정보'],
    preconditions: ['차량 전원이 켜져 있고 인포테인먼트 시스템이 사용 가능한 상태여야 합니다.'],
    settings: ['인포테인먼트 홈 화면에서 FCEV 메뉴를 선택합니다.'],
    steps: ['홈 화면에서 FCEV를 선택합니다.', '에너지 정보에서 에너지 흐름, 수소 연비, 환경 기여도를 확인합니다.', '수소 탱크 정보에서 온도, 압력, 충전 상태를 확인합니다.', 'FCEV 설정에서 유틸리티 모드, 스마트 회생 제동, i-Pedal 관련 설정을 확인합니다.'],
    disable: ['다른 화면으로 이동하거나 인포테인먼트 시스템을 종료합니다.'],
    limitations: ['표시 정보는 차량 상태와 시스템 계산 기준에 따라 달라질 수 있습니다.'],
    warnings: ['주행 중 화면 조작은 안전을 해치지 않는 범위에서만 수행합니다.']
  });

  mark('fcev-energy-flow', {
    aliases: ['FCEV 시스템 에너지 흐름도', '에너지 흐름도', '에너지 흐름'],
    section: 'FCEV 시스템 에너지 흐름도 확인하기',
    matchedKeywords: ['FCEV 시스템 에너지 흐름도 확인하기', '에너지 흐름도'],
    preconditions: ['차량 전원이 켜져 있고 계기판 또는 FCEV 에너지 정보 화면이 표시 가능한 상태여야 합니다.'],
    settings: ['계기판 또는 인포테인먼트 FCEV > 에너지 정보 화면에서 확인합니다.'],
    steps: ['계기판 또는 FCEV 에너지 정보 화면을 엽니다.', '정차, 전원 꺼짐, 배터리 주행, 배터리 충전 등 주행 상태별 에너지 흐름을 확인합니다.'],
    disable: ['다른 표시 화면으로 전환합니다.'],
    limitations: ['에너지 흐름 표시는 현재 주행 상태에 따라 달라집니다.'],
    warnings: ['표시 정보 확인을 위해 주행 중 과도하게 화면을 주시하지 않습니다.']
  });

  mark('nexo-smart-regen', {
    aliases: ['스마트 회생 제동', '회생 제동', '회생 제동 단계 조절', '아이 페달'],
    section: '스마트 회생 제동 기능 사용하기 / i-Pedal',
    matchedKeywords: ['스마트 회생 제동', '회생 제동', 'i-Pedal', '아이 페달'],
    preconditions: ['차량 전원이 켜져 있고 회생 제동 관련 설정을 사용할 수 있어야 합니다.'],
    settings: ['FCEV 설정에서 스마트 회생 제동과 i-Pedal 관련 항목을 확인합니다.'],
    steps: ['FCEV 설정 화면에서 스마트 회생 제동 또는 i-Pedal 항목을 선택합니다.', '주행 상황에 맞게 회생 제동 기능을 사용합니다.', '계기판 표시를 통해 회생 제동 상태를 확인합니다.'],
    disable: ['FCEV 설정에서 해당 기능을 끄거나, 회생 제동 조절 상태를 변경합니다.'],
    limitations: ['도로 조건, 배터리 충전 상태, 주행 상황에 따라 회생 제동량과 작동이 제한될 수 있습니다.'],
    warnings: ['회생 제동은 운전자를 보조하는 기능이며, 필요 시 반드시 브레이크 페달을 직접 조작합니다.']
  });
  mark('i-pedal', {
    aliases: ['아이 페달', 'i-Pedal', '원 페달 주행'],
    section: 'FCEV 설정 / i-Pedal',
    matchedKeywords: ['i-Pedal', '아이 페달'],
    preconditions: ['FCEV 설정에서 i-Pedal 관련 기능을 사용할 수 있는 차량 상태여야 합니다.'],
    settings: ['FCEV 설정 화면에서 i-Pedal 항목을 확인합니다.'],
    steps: ['FCEV 설정 또는 회생 제동 조작을 통해 i-Pedal 기능을 사용합니다.', '계기판 표시로 기능 작동 상태를 확인합니다.'],
    disable: ['기능 설정을 끄거나 회생 제동 조작 상태를 변경합니다.'],
    limitations: ['주행 조건과 차량 상태에 따라 감속 성능과 정차 보조 수준이 달라질 수 있습니다.'],
    warnings: ['i-Pedal 사용 중에도 필요한 경우 브레이크 페달을 직접 조작합니다.']
  });
  mark('one-pedal-driving', {
    aliases: ['원 페달 드라이빙', 'i-Pedal', '아이 페달'],
    section: 'FCEV 설정 / i-Pedal',
    matchedKeywords: ['i-Pedal', '아이 페달'],
    preconditions: ['i-Pedal 기능을 사용할 수 있는 차량 상태여야 합니다.'],
    settings: ['FCEV 설정에서 i-Pedal 항목을 확인합니다.'],
    steps: ['i-Pedal 기능을 켭니다.', '가속 페달 조작만으로 가속과 감속을 보조받습니다.', '계기판 표시를 확인합니다.'],
    disable: ['i-Pedal 설정을 끄거나 회생 제동 조작 상태를 변경합니다.'],
    limitations: ['도로 조건, 차량 상태, 배터리 상태에 따라 감속 보조가 달라질 수 있습니다.'],
    warnings: ['완전한 제동이 필요한 상황에서는 브레이크 페달을 직접 밟습니다.']
  });

  mark('v2l-parent', {
    aliases: ['전기 사용(V2L)', 'Vehicle to Load', 'V2L'],
    section: '전기 사용(V2L) 기능 활용하기',
    matchedKeywords: ['전기 사용(V2L) 기능 활용하기', 'V2L'],
    preconditions: ['차량 전원과 고전압 배터리 상태가 V2L 사용 조건을 만족해야 합니다.'],
    settings: ['FCEV 또는 전기 사용(V2L) 관련 화면에서 V2L 사용 조건과 방전 제한량을 확인합니다.'],
    steps: ['V2L 사용 조건을 확인합니다.', '실내 또는 실외 전원 연결 장치를 사용해 전기 제품을 연결합니다.', '사용 중 차량 표시 정보를 확인합니다.'],
    disable: ['전기 제품을 분리하고 V2L 사용을 종료합니다.'],
    limitations: ['사용 가능 전력과 시간은 고전압 배터리 상태와 전력 사용량에 따라 달라질 수 있습니다.'],
    warnings: ['정격 용량을 초과하는 전기 제품을 연결하지 않습니다.', '젖은 손이나 젖은 환경에서 전원 장치를 다루지 않습니다.']
  });
  ['v2l-indoor', 'v2l-outdoor', 'v2l-discharge-limit', 'utility-mode'].forEach(id => mark(id, {
    aliases: ['전기 사용(V2L)', 'V2L', '유틸리티 모드'],
    section: '전기 사용(V2L) 기능 활용하기 / FCEV 설정',
    matchedKeywords: ['전기 사용(V2L)', 'V2L', '유틸리티 모드'],
    preconditions: ['차량 전원과 고전압 배터리 상태가 기능 사용 조건을 만족해야 합니다.'],
    settings: ['FCEV 설정 또는 V2L 관련 화면에서 해당 기능을 확인합니다.'],
    steps: ['기능 화면에서 사용 조건을 확인합니다.', '전원 사용 또는 유틸리티 모드 사용을 시작합니다.', '사용 중 차량 표시 정보를 확인합니다.'],
    disable: ['연결 장치를 분리하거나 기능을 종료합니다.'],
    limitations: ['고전압 배터리 충전 상태와 전력 사용량에 따라 작동 시간이 달라질 수 있습니다.'],
    warnings: ['정격 용량과 매뉴얼의 안전 주의사항을 지켜 사용합니다.']
  }));

  [
    ['hyundai-digital-key', '디지털 키 사용하기', ['디지털 키', '스마트폰 키', 'NFC 카드 키']],
    ['nfc-card-key', '디지털 키 사용하기', ['NFC 카드 키', '카드 키', '디지털 키']],
    ['fingerprint-auth', '지문 인증 시스템 사용하기', ['지문 인증', '지문 등록', 'Fingerprint Authentication']],
    ['built-in-cam', '빌트인 캠(Built-in Cam)', ['빌트인 캠', 'Built-in Cam', '녹화']],
    ['digital-center-mirror', '디지털 센터 미러', ['디지털 센터 미러', 'Digital Center Mirror']],
    ['ccnc-ota', '무선 소프트웨어 업데이트', ['무선 소프트웨어 업데이트', 'OTA', '소프트웨어 업데이트']],
    ['voice-recognition-system', '음성 인식', ['음성 인식', '음성 명령']],
    ['bluelink-connected-services', '블루링크', ['블루링크', 'Connected Car Services']],
    ['remote-climate', '원격 공조', ['원격 공조', '블루링크']],
    ['smart-key', '스마트 키', ['스마트 키', '비상 키']],
    ['emergency-key', '스마트 키', ['비상 키', '스마트 키']],
    ['relaxation-comfort-seat', '릴렉션 컴포트 시트', ['릴렉션', '릴렉션 컴포트 시트']],
    ['memory-seat', '메모리 시트', ['메모리 시트', '운전자 자세 메모리']],
    ['smart-power-tailgate', '스마트 파워 테일게이트', ['스마트 파워 테일게이트', '파워 테일게이트', '테일게이트']],
    ['hud', '헤드업 디스플레이', ['헤드업 디스플레이', 'HUD']],
    ['heated-ventilated-seats', '열선/통풍 시트', ['열선 시트', '통풍 시트']]
  ].forEach(([id, section, aliases]) => mark(id, {
    aliases,
    section,
    matchedKeywords: aliases,
    preconditions: ['해당 사양이 적용된 디 올 뉴 넥쏘에서 차량 전원 또는 인포테인먼트 시스템이 사용 가능한 상태여야 합니다.'],
    settings: ['매뉴얼의 해당 기능 장 또는 인포테인먼트/차량 설정 화면에서 기능을 확인합니다.'],
    steps: ['매뉴얼의 해당 기능 장에 안내된 순서에 따라 등록, 설정 또는 작동을 진행합니다.', '기능 작동 상태를 계기판, 인포테인먼트 화면 또는 기능 표시로 확인합니다.'],
    disable: ['기능별 설정 화면에서 끄거나 작동 조건을 해제합니다.'],
    limitations: ['차량 사양, 연결 기기, 소프트웨어 버전, 외부 환경에 따라 기능 표시와 작동이 달라질 수 있습니다.'],
    warnings: ['주행 중 화면 조작 또는 기기 조작은 안전을 해치지 않는 범위에서만 수행합니다.']
  }));

  [
    ['rspa2', '원격 스마트 주차 보조 2(RSPA 2)', ['원격 스마트 주차 보조 2', 'RSPA 2']],
    ['parking-distance-warning', '주차 거리 경고', ['주차 거리 경고', '전방/측방/후방 주차 거리 경고']],
    ['side-pdw', '주차 거리 경고', ['측방 주차 거리 경고', '주차 거리 경고']],
    ['pca-parking', '주차 충돌방지 보조', ['주차 충돌방지 보조']],
    ['rear-cross-traffic-collision-avoidance', '후방 교차 충돌방지 보조', ['후방 교차 충돌방지 보조']],
    ['rear-view-monitor', '후방 모니터', ['후방 모니터']],
    ['surround-view-monitor', '서라운드 뷰 모니터', ['서라운드 뷰 모니터']],
    ['blind-spot-view-monitor', '후측방 모니터', ['후측방 모니터', 'Blind-Spot View Monitor']],
    ['nscc-hda2', '고속도로 주행 보조', ['고속도로 주행 보조', 'HDA', 'HDA 2', '내비게이션 기반 스마트 크루즈 컨트롤']],
    ['fca-suite', '전방 충돌방지 보조', ['전방 충돌방지 보조']],
    ['blind-spot-collision-avoidance-assist', '후측방 충돌방지 보조', ['후측방 충돌방지 보조']],
    ['safe-exit-assist', '안전 하차 보조', ['안전 하차 보조']],
    ['driver-attention-warning', '운전자 주의 경고', ['운전자 주의 경고']],
    ['intelligent-speed-limit-assist', '지능형 속도 제한 보조', ['지능형 속도 제한 보조', 'ISLA']],
    ['lane-following-assist', '차로 유지 보조', ['차로 유지 보조', 'LFA']],
    ['lane-keeping-assist', '차로 이탈방지 보조', ['차로 이탈방지 보조', 'LKA']],
    ['high-beam-assist', '하이빔 보조', ['하이빔 보조']]
  ].forEach(([id, section, aliases]) => mark(id, {
    aliases,
    section,
    matchedKeywords: aliases,
    preconditions: ['해당 운전자 보조 사양이 적용되어 있고 센서, 카메라, 레이더가 정상 상태여야 합니다.'],
    settings: ['차량 설정 또는 운전자 보조 관련 메뉴에서 해당 기능을 확인합니다.'],
    steps: ['기능별 매뉴얼 장에 안내된 조건에서 기능을 켭니다.', '계기판 또는 화면의 기능 상태 표시를 확인합니다.', '주행 또는 주차 상황에 맞게 운전자가 주변을 직접 확인하며 사용합니다.'],
    disable: ['기능 버튼 또는 차량 설정 메뉴에서 끄거나 작동 조건을 벗어나면 종료됩니다.'],
    limitations: ['센서 오염, 악천후, 도로/차선/장애물 조건, 주차 공간 조건에 따라 작동이 제한될 수 있습니다.'],
    warnings: ['운전자 보조 기능은 운전자를 대체하지 않으므로 항상 전방과 주변을 직접 확인합니다.']
  }));

  [
    'plug-and-charge',
    'ev-route-planner',
    'battery-conditioning',
    'scheduled-charging',
    'charge-limit',
    'ev-charge-status',
    'ev-energy-usage',
    'ev-battery-health',
    'ev-charging-current-setting',
    'charging-connector-lock',
    'ev-charging-information',
    'ev-menu-settings',
    'ev-charging-station-search',
    'ac-slow-charging',
    'dc-fast-charging',
    'portable-charger-iccb',
    'stop-charging-immediately',
    'tmed2-hybrid-system',
    'hybrid-energy-flow',
    'hybrid-battery-status',
    'hybrid-driving-info',
    'hybrid-regen-level',
    'hybrid-smart-regen',
    'hev-stay-mode',
    'hybrid-stay-mode',
    'hybrid-stay-reservation',
    'hybrid-stationary-climate',
    'hybrid-v2l',
    'camping-mode',
    'iccu-energy-control',
    'hyundai-ai',
    'hyundai-ai-assistant',
    'face-connect',
    'built-in-cam2',
    'built-in-cam-2',
    'built-in-cam2-plus',
    'built-in-cam-2-plus',
    'ccnc-system',
    'swiveling-seat',
    'dynamic-body-care-seat',
    'uv-c-sterilization-system'
  ].forEach(removeNexoApply);
};
