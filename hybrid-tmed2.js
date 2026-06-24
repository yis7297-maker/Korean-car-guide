/* 2026-06-24 TMED-2 hybrid feature audit */
const hybridCategory = '하이브리드 전용 기능';
if (!categories.includes(hybridCategory)) {
  const evIndex = categories.indexOf('EV 전용 기능');
  categories.splice(evIndex >= 0 ? evIndex + 1 : categories.length, 0, hybridCategory);
}

iconPaths[hybridCategory] = '<svg viewBox="0 0 24 24"><path d="M4 17c2-7 5-10 8-10s6 3 8 10"></path><path d="M7 14h10"></path><path d="M12 3v5"></path><path d="M9 5h6"></path><path d="M8 20h8"></path></svg>';

if (!sources.tmed2Official) {
  sources.tmed2Official = {
    label: '현대자동차그룹 차세대 하이브리드 시스템 공식 발표',
    url: 'https://www.hyundai.com/worldwide/en/newsroom',
    rank: '공식 발표'
  };
}
if (!sources.palisadeOfficial) {
  sources.palisadeOfficial = {
    label: '현대자동차 팰리세이드 공식 차량 페이지 및 다운로드 센터',
    url: 'https://www.hyundai.com/kr/ko/e/vehicles/palisade/intro',
    rank: '공식 차량 자료'
  };
}

if (!vehicles.some(vehicle => vehicle.id === 'hy-palisade-hev')) {
  vehicles.push({
    id: 'hy-palisade-hev',
    brand: '현대',
    name: '팰리세이드 하이브리드',
    group: 'SUV · 하이브리드',
    hybrid: true,
    system: 'TMED-2',
    performance: false
  });
}

const palisadeHevApply = apply(
  ['hy-palisade-hev'],
  'TMED-2 하이브리드 적용 트림 · 세부 트림은 최신 가격표 확인',
  '차종/트림 및 소프트웨어 조건별 상이'
);

function addHybridFeature(config) {
  addExpandedFeature({
    category: hybridCategory,
    parent: hybridCategory,
    officialCategory: `하이브리드 / ${config.subcategory}`,
    aliases: [],
    preconditions: ['TMED-2 또는 해당 하이브리드 전용 기능이 적용된 차량이어야 합니다.'],
    steps: ['차량 화면에서 하이브리드 또는 해당 기능 메뉴를 선택합니다.', '차량 상태와 화면 안내를 확인한 뒤 기능을 사용합니다.'],
    disable: ['기능 화면에서 종료를 선택하거나 차량 전원 상태를 변경합니다.'],
    limitations: ['고전압 배터리 충전량, 전력 사용량, 외기 온도와 차량 상태에 따라 작동 범위가 달라질 수 있습니다.'],
    warnings: ['밀폐된 공간에서는 엔진이 자동으로 작동할 가능성에 대비해 환기와 안전을 확인하세요.'],
    sources: ['tmed2Official', 'palisadeOfficial', 'hyundaiCatalog', 'hyundaiManual'],
    verify: verify(config.verified !== false),
    generation: {
      family: 'TMED-2 하이브리드',
      generation: config.name,
      previous: [],
      differences: config.summary
    },
    ...config
  });
}

[
  {
    id: 'tmed2-hybrid-system',
    name: 'TMED-2 하이브리드 시스템',
    subcategory: '하이브리드 시스템',
    aliases: ['TMED2', 'TMED-2', 'TMED II', '차세대 하이브리드', '하이브리드 시스템'],
    summary: '두 개의 모터를 활용하는 차세대 하이브리드 구동 시스템으로 효율, 동력 성능과 정차 편의 기능의 기반을 제공합니다.',
    applies: palisadeHevApply,
    related: ['스테이 모드', '하이브리드 스마트 회생제동', '하이브리드 에너지 흐름도']
  },
  {
    id: 'hybrid-stay-mode',
    name: '스테이 모드',
    subcategory: '정차 편의 / 전동화 편의',
    aliases: [
      'Stay Mode', '하이브리드 스테이 모드', 'HEV 스테이 모드', 'TMED-2',
      '차세대 하이브리드', '정차 중 공조', '하이브리드 유틸리티 모드',
      '엔진 없이 에어컨', '하이브리드 캠핑', '목적지 도착 시 스테이 모드',
      '하이브리드 스테이', '엔진 끄고 에어컨', '차 안에서 대기',
      '캠핑할 때 에어컨', '하이브리드 유틸리티', 'TMED2', '목적지 도착 스테이'
    ],
    summary: '하이브리드 차량이 정차한 상태에서 고전압 배터리 전력을 이용해 공조와 멀티미디어 등 편의 장치를 사용할 수 있도록 돕습니다. EV 유틸리티 모드와 비슷하지만 하이브리드 배터리 용량과 시스템 특성에 맞게 작동합니다.',
    overview: '정차 후 차 안에서 대기하거나 휴식할 때 고전압 배터리로 에어컨, 오디오와 디스플레이 등 편의 기능을 사용하는 모드입니다. 공식 소개에는 조건을 만족하면 최대 약 1시간 사용할 수 있는 것으로 안내되지만, 실제 시간은 배터리 충전량과 공조·전장 사용량, 외기 온도에 따라 짧아질 수 있습니다.',
    preconditions: [
      'TMED-2 하이브리드 시스템과 스테이 모드가 적용된 차량이어야 합니다.',
      '차량이 안전한 장소에 완전히 정차해 있어야 합니다.',
      '변속 위치가 P(주차)이고 주차 브레이크가 체결되어 있어야 합니다.',
      '고전압 배터리 충전량과 하이브리드 시스템 상태가 사용 조건을 만족해야 합니다.'
    ],
    settings: [
      '인포테인먼트 홈 → 하이브리드 또는 EV/에너지 메뉴 → 스테이 모드',
      '지원 차량은 목적지 도착 전 스테이 모드 사용 예약 또는 배터리 충전 유도 옵션을 설정할 수 있습니다.'
    ],
    steps: [
      '안전한 장소에 정차하고 P(주차) 상태를 유지합니다.',
      '차량 화면에서 스테이 모드를 선택합니다.',
      '예상 사용 가능 시간과 고전압 배터리 상태를 확인합니다.',
      '공조, 멀티미디어 등 필요한 편의 기능을 사용합니다.',
      '배터리 잔량과 시스템 안내를 수시로 확인합니다.'
    ],
    disable: [
      '스테이 모드 화면에서 종료를 선택합니다.',
      '주행을 시작하거나 차량 전원 상태를 변경하면 기능이 종료될 수 있습니다.'
    ],
    limitations: [
      '고전압 배터리 잔량이 부족하거나 시스템 온도가 조건을 벗어나면 시작되지 않거나 조기에 종료될 수 있습니다.',
      '강한 냉난방, 여러 전장 장치 사용과 낮거나 높은 외기 온도는 사용 가능 시간을 줄일 수 있습니다.',
      '차량 상태에 따라 엔진이 자동으로 작동하거나 기능 사용이 제한될 수 있습니다.',
      '목적지 도착 전 충전 유도 또는 예약 기능은 차종과 소프트웨어 사양에 따라 제공되지 않을 수 있습니다.'
    ],
    warnings: [
      '최대 약 1시간은 특정 조건에서의 안내 기준이며 실제 사용 시간을 보장하지 않습니다.',
      '밀폐된 차고나 환기가 어려운 장소에서는 엔진 자동 작동 가능성을 고려해 사용하지 마세요.',
      '차량을 떠난 상태로 장시간 사용하지 말고 시스템 경고를 확인하세요.'
    ],
    applies: palisadeHevApply,
    related: [
      '유틸리티 모드', '캠핑 모드', 'V2L', '충전 예약', 'Battery Conditioning',
      '하이브리드 스마트 회생제동', 'TMED-2 하이브리드 시스템', '스테이 모드 사용 예약'
    ]
  },
  {
    id: 'hybrid-stay-reservation',
    name: '스테이 모드 사용 예약',
    subcategory: '정차 편의 / 전동화 편의',
    aliases: ['목적지 도착 스테이 예약', '스테이 모드 예약', '목적지 도착 전 배터리 충전'],
    summary: '목적지 도착 후 스테이 모드 사용에 대비해 주행 중 고전압 배터리 충전 상태를 확보하도록 돕는 연계 기능입니다.',
    applies: palisadeHevApply,
    verified: false,
    related: ['스테이 모드', '하이브리드 배터리 충전 상태']
  },
  {
    id: 'hybrid-v2l',
    name: '하이브리드 V2L',
    subcategory: '전력 공급',
    aliases: ['HEV V2L', '하이브리드 외부 전력 공급'],
    summary: '하이브리드 고전압 배터리와 구동 시스템을 이용해 외부 전기기기에 전력을 공급하는 기능 후보입니다.',
    applies: [],
    verified: false,
    related: ['V2L', '스테이 모드', 'TMED-2 하이브리드 시스템']
  },
  {
    id: 'hybrid-smart-regen',
    name: '하이브리드 스마트 회생제동',
    subcategory: '회생제동',
    aliases: ['HEV 스마트 회생제동', '하이브리드 스마트 회생'],
    summary: '앞차와 도로 상황을 고려해 하이브리드 차량의 감속과 에너지 회수 수준을 자동으로 조절합니다.',
    applies: palisadeHevApply,
    related: ['하이브리드 회생제동 단계 조절', '하이브리드 에너지 흐름도']
  },
  {
    id: 'hybrid-regen-level',
    name: '하이브리드 회생제동 단계 조절',
    subcategory: '회생제동',
    aliases: ['HEV 회생제동 단계', '하이브리드 패들 회생제동'],
    summary: '패들 또는 차량 설정으로 하이브리드 회생제동의 감속감과 에너지 회수 수준을 조절합니다.',
    applies: palisadeHevApply,
    related: ['하이브리드 스마트 회생제동', '하이브리드 배터리 충전 상태']
  },
  {
    id: 'hybrid-energy-flow',
    name: '하이브리드 에너지 흐름도',
    subcategory: '에너지 관리',
    aliases: ['HEV 에너지 흐름', '하이브리드 에너지 모니터'],
    summary: '엔진, 구동 모터, 발전 모터와 고전압 배터리 사이의 에너지 흐름을 차량 화면에 표시합니다.',
    applies: palisadeHevApply,
    related: ['TMED-2 하이브리드 시스템', '하이브리드 배터리 충전 상태', '하이브리드 전용 주행 정보']
  },
  {
    id: 'hybrid-battery-status',
    name: '하이브리드 배터리 충전 상태',
    subcategory: '에너지 관리',
    aliases: ['HEV 배터리 잔량', '하이브리드 SOC'],
    summary: '하이브리드 고전압 배터리의 충전 상태와 에너지 사용 가능 수준을 표시합니다.',
    applies: palisadeHevApply,
    related: ['하이브리드 에너지 흐름도', '스테이 모드', '스테이 모드 사용 예약']
  },
  {
    id: 'hybrid-driving-info',
    name: '하이브리드 전용 주행 정보',
    subcategory: '주행 정보',
    aliases: ['HEV 주행 정보', '하이브리드 연비 정보'],
    summary: '전기 주행, 엔진 작동, 회생 에너지와 연비 등 하이브리드 전용 주행 정보를 제공합니다.',
    applies: palisadeHevApply,
    related: ['하이브리드 에너지 흐름도', '하이브리드 스마트 회생제동']
  },
  {
    id: 'hybrid-stationary-climate',
    name: '하이브리드 정차 공조',
    subcategory: '정차 편의 / 전동화 편의',
    aliases: ['정차 중 공조', '하이브리드 공조', '엔진 없이 에어컨'],
    summary: '정차 중 고전압 배터리와 하이브리드 시스템을 활용해 실내 냉난방을 유지하는 전동화 편의 기능입니다.',
    applies: palisadeHevApply,
    related: ['스테이 모드', '스테이 모드 사용 예약']
  }
].forEach(addHybridFeature);

features.forEach(feature => {
  feature.related = (feature.related || []).filter(name =>
    features.some(candidate => candidate.name === name || (candidate.aliases || []).includes(name))
  );
});

const stayFeature = features.find(feature => feature.id === 'hybrid-stay-mode');
if (stayFeature) {
  stayFeature.updatedAt = '2026-06-24';
}

render();
