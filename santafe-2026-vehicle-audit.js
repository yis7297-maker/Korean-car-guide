/* MX5/MX5HEV 2026 Owners Manual vehicle-specific audit overlay.
 * Scope: Hyundai Santa Fe MX5 2026 and Santa Fe Hybrid MX5HEV 2026 only.
 * Sources:
 * - work/manual-text/MX5_2026_ko_KR.txt
 * - work/manual-text/MX5HEV_2026_ko_KR.txt
 * No TMED-2, Stay Mode, or V2L mapping is added because those terms are not present in the MX5HEV txt audit.
 */
window.applySantafeManualAudit = function applySantafeManualAudit() {
  if (!Array.isArray(window.features) && typeof features === 'undefined') return;
  if (!Array.isArray(window.vehicles) && typeof vehicles === 'undefined') return;

  const today = '2026-07-07';
  const iceApply = {
    vehicleId: 'hy-santafe',
    brand: '현대',
    model: '싼타페',
    years: '2026',
    trim: 'MX5 해당 사양/트림',
    option: 'Owners Manual 수록 사양 기준'
  };
  const hevApply = {
    vehicleId: 'hy-santafe-hev',
    brand: '현대',
    model: '싼타페 하이브리드',
    years: '2026',
    trim: 'MX5 HEV 해당 사양/트림',
    option: 'Owners Manual 수록 HEV 사양 기준'
  };

  if (!vehicles.some(v => v.id === 'hy-santafe-hev')) {
    vehicles.push({ id: 'hy-santafe-hev', brand: '현대', name: '싼타페 하이브리드', group: 'SUV · 하이브리드', hybrid: true, performance: false });
  }

  const ensureArray = value => Array.isArray(value) ? value : [];
  const uniq = items => [...new Set(ensureArray(items).filter(Boolean))];
  const findFeature = id => features.find(feature => feature.id === id);
  const upsertApply = (feature, apply) => {
    feature.applies = ensureArray(feature.applies);
    const existing = feature.applies.find(item => item.vehicleId === apply.vehicleId);
    if (existing) Object.assign(existing, apply);
    else feature.applies.push({ ...apply });
  };
  const evidence = {
    ice: {
      manualFile: 'MX5_2026_ko_KR.txt',
      modelCode: 'MX5',
      modelName: '싼타페',
      modelYear: '2026',
      basis: 'official_owner_manual',
      verifiedBy: 'vehicle-manual-audit',
      pageRange: 'MX5_2026_ko_KR.txt 본문 검색 확인'
    },
    hev: {
      manualFile: 'MX5HEV_2026_ko_KR.txt',
      modelCode: 'MX5HEV',
      modelName: '싼타페 하이브리드',
      modelYear: '2026',
      basis: 'official_owner_manual',
      verifiedBy: 'vehicle-manual-audit',
      pageRange: 'MX5HEV_2026_ko_KR.txt 본문 검색 확인'
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
    const ev = config.hev && config.ice === false ? evidence.hev : evidence.ice;
    feature.manualEvidence = {
      ...ev,
      section: config.section || feature.name,
      matchedKeywords: config.matchedKeywords || config.aliases || [feature.name]
    };
    feature.vehicleAudit = {
      ...(feature.vehicleAudit || {}),
      ...(config.ice !== false ? { hySantafe2026: { confirmed: true, manualFile: 'MX5_2026_ko_KR.txt', matchedKeywords: config.matchedKeywords || config.aliases || [feature.name], updatedAt: today } } : {}),
      ...(config.hev ? { hySantafeHev2026: { confirmed: true, manualFile: 'MX5HEV_2026_ko_KR.txt', matchedKeywords: config.matchedKeywords || config.aliases || [feature.name], updatedAt: today } } : {})
    };
    return true;
  };

  const makeFeature = (id, feature) => {
    if (findFeature(id)) return false;
    features.push({
      latest: true,
      updatedAt: today,
      id,
      slug: feature.slug || id,
      name: feature.name,
      category: feature.category || '지능형 안전 기술',
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

  const addManualFeature = (id, f, both = true) => {
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
  };

  const commonConfirmed = [
    ['fca-suite', '전방 충돌방지 보조 (FCA)'],
    ['nscc-hda2', '스마트 크루즈 컨트롤 (SCC) / 내비게이션 기반 스마트 크루즈 컨트롤 (NSCC) / 고속도로 주행 보조 (HDA)'],
    ['rspa', '원격 스마트 주차 보조 (RSPA)'],
    ['spa', '스마트 주차 보조 (SPA)'],
    ['side-pdw', '전방/측방/후방 주차 거리 경고'],
    ['parking-distance-warning', '주차 거리 경고 (PDW)'],
    ['pca-parking', '주차 충돌방지 보조 (PCA)'],
    ['rear-view-monitor', '후방 모니터 (RVM)'],
    ['surround-view-monitor', '서라운드 뷰 모니터 (SVM)'],
    ['blind-spot-view-monitor', '후측방 모니터 (BVM)'],
    ['rear-cross-traffic-collision-avoidance', '후방 교차 충돌방지 보조 (RCCA)'],
    ['reverse-guide', '후진 가이드'],
    ['hyundai-dk2', '디지털 키'],
    ['fingerprint-auth', '지문 인증 시스템'],
    ['built-in-cam', '빌트인 캠'],
    ['ccnc-ota', '무선 소프트웨어 업데이트'],
    ['apple-carplay-wired', 'Apple CarPlay / 카플레이'],
    ['android-auto-wired', 'Android Auto / 안드로이드 오토'],
    ['smart-key', '스마트 키'],
    ['emergency-key', '비상 키'],
    ['remote-engine-start', '원격 시동'],
    ['remote-climate', '원격 공조'],
    ['climate-control', '히터와 에어컨'],
    ['air-purification', '공기 청정'],
    ['after-blow', '애프터 블로우'],
    ['heated-ventilated-seats', '열선/통풍 시트'],
    ['memory-seat', '메모리 버튼'],
    ['ergo-motion-seat', '에르고 모션 시트'],
    ['relaxation-comfort-seat', '릴렉션 컴포트 시트'],
    ['smart-posture-assist', '스마트 자세 보조'],
    ['smart-power-tailgate', '파워 테일게이트 / 스마트 테일게이트'],
    ['hud', '헤드업 디스플레이']
  ];

  commonConfirmed.forEach(([id, section]) => {
    mark(id, {
      hev: true,
      section,
      aliases: section.split(' / '),
      matchedKeywords: section.split(' / ')
    });
  });

  const adas = [
    {
      id: 'lane-keeping-assist',
      slug: 'lane-keeping-assist',
      name: '차로 이탈방지 보조 / LKA',
      aliases: ['Lane Keeping Assist', 'LKA', '차로 이탈방지 보조'],
      section: '차로 이탈방지 보조 (LKA)',
      summary: '전방 카메라로 차선을 인식해 차로 이탈 위험이 있을 때 경고하고 조향을 보조하는 기능입니다.',
      settings: ['시동 ON 상태에서 인포테인먼트 시스템의 설정 > 차량 > 운전자 보조 > 주행 안전 메뉴에서 차로 안전 기능을 설정합니다.'],
      steps: ['차선이 인식된 주행 중 차량이 차로를 이탈할 위험이 있으면 경고와 조향 보조가 작동합니다.', '클러스터의 차로 안전 표시와 경고 상태를 확인합니다.'],
      limitations: ['전방 카메라 가림, 차선 불명확, 악천후, 공사 구간 등에서는 작동이 제한될 수 있습니다.'],
      warnings: ['운전자를 위한 보조 기능이며 조향 책임은 운전자에게 있습니다.']
    },
    {
      id: 'lane-following-assist',
      slug: 'lane-following-assist',
      name: '차로 유지 보조 / LFA',
      aliases: ['Lane Following Assist', 'LFA', '차로 유지 보조'],
      section: '차로 유지 보조 (LFA)',
      summary: '차로 중앙을 유지하도록 조향을 보조하는 주행 보조 기능입니다.',
      settings: ['스티어링 휠의 차로 주행 보조 버튼 또는 차량 설정의 운전자 보조 메뉴에서 기능을 켭니다.'],
      steps: ['차선이 인식되면 클러스터에 차로 유지 보조 상태가 표시됩니다.', '초록색 표시 상태에서 차로 중앙 주행 보조가 작동합니다.'],
      limitations: ['차선이 불명확하거나 전방 카메라 인식이 제한되는 상황에서는 대기 또는 중지될 수 있습니다.'],
      warnings: ['자율주행 기능이 아니므로 스티어링 휠을 잡고 주행해야 합니다.']
    },
    {
      id: 'intelligent-speed-limit-assist',
      slug: 'intelligent-speed-limit-assist',
      name: '지능형 속도 제한 보조 / ISLA',
      aliases: ['Intelligent Speed Limit Assist', 'ISLA', '지능형 속도 제한 보조'],
      section: '지능형 속도 제한 보조 (ISLA)',
      summary: '전방 카메라와 내비게이션 정보를 이용해 제한속도 정보를 표시하고 속도 제한 준수를 보조하는 기능입니다.',
      settings: ['시동 ON 상태에서 설정 > 차량 > 운전자 보조 > 속도 제한 메뉴에서 기능을 설정합니다.'],
      steps: ['주행 중 인식한 제한속도 정보를 클러스터에 표시합니다.', '운전자 설정에 따라 경고 또는 보조 방식으로 작동합니다.'],
      limitations: ['시동 또는 전방 카메라 초기화 후 일정 시간 작동하지 않을 수 있으며, 표지판 인식이 어려운 상황에서는 제한됩니다.'],
      warnings: ['도로교통법에 따른 제한속도 준수 책임은 운전자에게 있습니다.']
    },
    {
      id: 'driver-attention-warning',
      slug: 'driver-attention-warning',
      name: '운전자 주의 경고 / DAW',
      aliases: ['Driver Attention Warning', 'DAW', '운전자 주의 경고', '전방 차량 출발 알림'],
      section: '운전자 주의 경고 (DAW)',
      summary: '주행 중 운전 패턴을 판단해 주의 수준이 낮아지면 휴식을 권유하고, 정차 중 앞 차량 출발 알림을 제공합니다.',
      settings: ['시동 ON 상태에서 인포테인먼트 시스템의 설정 > 차량 > 운전자 보조 > 운전자 주의 경고를 선택합니다.'],
      steps: ['운전자 주의 수준이 낮아지면 휴식 권유 문구와 경고음이 제공됩니다.', '정차 중 앞 차량이 출발하면 알림 문구와 알림음이 제공됩니다.'],
      limitations: ['주행 시간이 짧거나 휴식 권유 후 일정 시간이 지나지 않은 경우 휴식 권유가 나오지 않을 수 있습니다.'],
      warnings: ['휴식 권유가 없더라도 피곤하면 안전한 장소에 정차한 후 휴식하십시오.']
    },
    {
      id: 'high-beam-assist',
      slug: 'high-beam-assist',
      name: '하이빔 보조 / HBA',
      aliases: ['High Beam Assist', 'HBA', '하이빔 보조'],
      section: '하이빔 보조 (HBA)',
      summary: '마주 오는 차량이나 선행 차량을 감지해 상향등과 하향등 전환을 보조하는 기능입니다.',
      settings: ['조명 스위치를 AUTO 위치에 두고 하이빔 조작 방향으로 레버를 밀었다 놓으면 기능이 켜집니다.'],
      steps: ['하이빔 보조 표시등이 켜지면 작동 대기 상태가 됩니다.', '주행 중 선행 차량이나 마주 오는 차량을 감지하면 하향등으로 자동 전환합니다.'],
      disable: ['조명 스위치 위치를 변경하거나 하이빔 레버를 조작해 기능을 해제합니다.'],
      limitations: ['전방 카메라 인식 제한, 주변 조명, 날씨, 도로 환경에 따라 작동이 제한될 수 있습니다.'],
      warnings: ['상향 전조등은 다른 운전자의 시야를 방해할 수 있으므로 사용 시 주의하십시오.']
    },
    {
      id: 'blind-spot-collision-avoidance-assist',
      slug: 'blind-spot-collision-avoidance-assist',
      name: '후측방 충돌방지 보조 / BCA',
      aliases: ['Blind-Spot Collision-Avoidance Assist', 'BCA', '후측방 충돌방지 보조'],
      section: '후측방 충돌방지 보조 (BCA)',
      summary: '차로 변경 또는 출차 상황에서 후측방 접근 차량과의 충돌 위험을 경고하고 일부 상황에서 제동을 보조하는 기능입니다.',
      settings: ['시동 ON 상태에서 설정 > 차량 > 운전자 보조 > 주행 안전 메뉴에서 후측방 안전 기능을 설정합니다.'],
      steps: ['후측방 차량이 감지되면 경고등 또는 경고음으로 알려줍니다.', '충돌 위험이 높아지면 조건에 따라 충돌방지 보조가 작동할 수 있습니다.'],
      limitations: ['센서 가림, 급격한 선회, 악천후, 주변 차량의 빠른 접근 등에서는 작동이 제한될 수 있습니다.'],
      warnings: ['후측방 안전 확인과 차로 변경 판단은 운전자가 직접 해야 합니다.']
    },
    {
      id: 'safe-exit-assist',
      slug: 'safe-exit-assist',
      name: '안전 하차 보조 / SEA',
      aliases: ['Safe Exit Assist', 'SEA', '안전 하차 보조', '전자식 차일드 락 연동'],
      section: '안전 하차 보조 (SEA)',
      summary: '정차 후 후측방에서 접근하는 차량이 감지되면 뒷좌석 탑승자가 도어를 여는 것을 방지하도록 보조하는 기능입니다.',
      settings: ['차량 설정의 운전자 보조 또는 도어/전자식 차일드 락 관련 메뉴에서 안전 하차 보조 기능을 사용합니다.'],
      steps: ['차량 정차 후 후측방 접근 차량이 감지되면 안전 하차 경고가 제공됩니다.', '전자식 차일드 락 연동 사양에서는 차일드 락 해제가 제한될 수 있습니다.'],
      limitations: ['후측방 센서 인식 제한, 접근 차량 속도와 거리 조건에 따라 작동하지 않을 수 있습니다.'],
      warnings: ['하차 전 주변 차량과 보행자를 직접 확인하십시오.']
    }
  ];

  adas.forEach(item => {
    addManualFeature(item.id, {
      slug: item.slug,
      name: item.name,
      category: '지능형 안전 기술',
      officialCategory: item.section,
      aliases: item.aliases,
      summary: item.summary,
      preconditions: ['시동 ON 상태에서 해당 운전자 보조 기능이 설정되어 있어야 합니다.', '전방 카메라 또는 후측방 센서 등 인식 센서가 가려져 있지 않아야 합니다.'],
      settings: item.settings || [],
      steps: item.steps || [],
      disable: item.disable || ['차량 설정의 해당 운전자 보조 메뉴에서 기능을 끄거나 경고/보조 단계를 변경합니다.'],
      limitations: item.limitations || [],
      warnings: item.warnings || [],
      related: ['전방 충돌방지 보조', 'NSCC / HDA 2'],
      manualEvidence: { ...evidence.ice, section: item.section, matchedKeywords: item.aliases },
      vehicleAudit: {
        hySantafe2026: { confirmed: true, manualFile: 'MX5_2026_ko_KR.txt', matchedKeywords: item.aliases, updatedAt: today },
        hySantafeHev2026: { confirmed: true, manualFile: 'MX5HEV_2026_ko_KR.txt', matchedKeywords: item.aliases, updatedAt: today }
      }
    }, true);
  });

  const hevDetails = {
    'hybrid-smart-regen': {
      section: '회생 제동',
      aliases: ['회생 제동', '하이브리드 회생 제동'],
      overview: '싼타페 하이브리드 매뉴얼 기준 회생 제동은 차량 감속 및 제동 시 전기 모터의 운동 에너지를 전기 에너지로 변환해 배터리를 충전하는 기능입니다.',
      summary: '하이브리드 주행 중 감속 에너지를 전기 에너지로 회수해 배터리를 충전하는 기능입니다.',
      preconditions: ['하이브리드 차량 주행 중 감속 또는 제동 상황이어야 합니다.'],
      steps: ['가속 페달에서 발을 떼거나 브레이크 페달을 밟으면 차량 속도와 엔진 부하 상태에 따라 회생 제동이 작동합니다.'],
      limitations: ['배터리 상태와 주행 조건에 따라 회생 제동 작동량이 달라질 수 있습니다.'],
      warnings: ['회생 제동 감속감이 느껴질 수 있으며 필요한 경우 브레이크 페달로 직접 감속하십시오.']
    },
    'hybrid-regen-level': {
      section: '회생 제동',
      aliases: ['회생 제동', '회생 제동량'],
      overview: '싼타페 하이브리드 매뉴얼 기준 회생 제동은 감속 및 제동 시 배터리 충전을 위해 작동하며 주행 조건에 따라 제동감이 달라질 수 있습니다.',
      summary: '감속 및 제동 시 에너지를 회수하는 하이브리드 회생 제동 기능입니다.',
      preconditions: ['하이브리드 주행 중 감속 조건이어야 합니다.'],
      steps: ['가속 페달에서 발을 떼거나 브레이크 페달을 밟아 감속합니다.', '차량 속도와 엔진 부하 상태에 따라 회생 제동이 작동합니다.'],
      limitations: ['주행 조건과 배터리 상태에 따라 작동 정도가 달라질 수 있습니다.'],
      warnings: ['회생 제동만으로 모든 감속이 보장되지 않으므로 운전자가 직접 제동해야 합니다.']
    },
    'hybrid-energy-flow': {
      section: '하이브리드 에너지 흐름도 확인하기',
      aliases: ['하이브리드 에너지 흐름도', '에너지 흐름도'],
      overview: '싼타페 하이브리드 매뉴얼 기준 하이브리드 에너지 흐름도는 주행 상태에 따른 시스템 동력 전달 상태와 엔진 상태를 클러스터에 표시합니다.',
      summary: '엔진, 모터, 배터리, 휠 사이의 에너지 흐름을 클러스터에서 확인하는 하이브리드 전용 표시 기능입니다.',
      preconditions: ['차량 전원이 켜져 있고 클러스터 주행 정보 표시가 가능해야 합니다.'],
      steps: ['클러스터 주행 정보에서 하이브리드 에너지 흐름도를 확인합니다.', '정지, 모터 구동, 엔진/모터 구동, 엔진 구동 등 상태별 에너지 흐름을 확인합니다.'],
      limitations: ['표시 내용은 실제 주행 상태와 시스템 제어 상태에 따라 달라집니다.'],
      warnings: ['표시는 운전자 정보 제공용이며 주행 판단은 운전자가 직접 해야 합니다.']
    },
    'hybrid-battery-status': {
      section: '고전압 배터리 충전량(SOC) 표시계',
      aliases: ['고전압 배터리', '배터리 충전 상태', 'SOC'],
      overview: '싼타페 하이브리드 매뉴얼 기준 고전압 배터리 충전량 표시계는 시동 ON 상태에서 고전압 배터리 충전 상태를 표시합니다.',
      summary: '고전압 배터리 충전 상태를 클러스터에서 확인하는 하이브리드 전용 표시 기능입니다.',
      preconditions: ['시동 ON 상태여야 합니다.'],
      steps: ['클러스터의 고전압 배터리 충전량 표시계를 확인합니다.', 'L 위치는 잔량 부족, H 위치는 완전 충전 상태를 의미합니다.'],
      limitations: ['표시 상태는 주행 및 충전 상태에 따라 변동됩니다.'],
      warnings: ['배터리 부족 관련 경고가 표시되면 안전한 곳에 정차 후 안내에 따라 조치하십시오.']
    },
    'hybrid-driving-info': {
      section: '하이브리드 자동차 주행하기',
      aliases: ['EV 모드 표시등', '하이브리드 주행 정보'],
      overview: '싼타페 하이브리드 매뉴얼 기준 EV 모드 표시등은 모터를 이용해 주행하는 상태를 표시합니다.',
      summary: '하이브리드 주행 중 모터 구동 상태와 주행 정보를 확인하는 기능입니다.',
      preconditions: ['하이브리드 차량 전원이 켜져 있고 클러스터 표시가 가능해야 합니다.'],
      steps: ['클러스터에서 EV 모드 표시등 또는 하이브리드 주행 정보를 확인합니다.', '정차 중 엔진 정지 또는 주행 중 모터 단독 구동 상태를 확인합니다.'],
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

  const removeSantafeApply = id => {
    const feature = findFeature(id);
    if (!feature || !Array.isArray(feature.applies)) return;
    feature.applies = feature.applies.filter(apply => !['hy-santafe', 'hy-santafe-hev'].includes(apply.vehicleId));
  };

  [
    'rspa2',
    'built-in-cam2',
    'built-in-cam2-plus',
    'feature-on-demand',
    'panoramic-curved-display',
    'tmed2-hybrid-system',
    'hybrid-stay-mode',
    'hybrid-stay-reservation',
    'hybrid-v2l',
    'hybrid-stationary-climate'
  ].forEach(removeSantafeApply);
};

window.applySantafeManualAudit();
