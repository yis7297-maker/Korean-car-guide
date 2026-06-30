import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, 'outputs', 'auto-guide-platform-v2');
const dataPath = path.join(siteDir, 'function-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const features = data.features || data;
const noGuide = '매뉴얼에서 별도 안내 없음';

const names = {
  'fca-suite': '전방 충돌방지 보조',
  'nscc-hda2': '내비게이션 기반 스마트 크루즈 컨트롤 / 고속도로 주행 보조 2',
  rspa2: '원격 스마트 주차 보조 2 / RSPA 2',
  'dual-auto-ac': '듀얼 풀오토 에어컨',
  'air-purification': '공기청정 모드',
  'after-blow': '애프터 블로우',
  'remote-climate': '원격 공조',
  'heated-ventilated-seats': '열선/통풍 시트',
  'ergo-motion-seat': '에르고 모션 시트',
  'relaxation-comfort-seat': '릴렉션 컴포트 시트',
  'memory-seat': '메모리 시트',
  'smart-power-tailgate': '스마트 파워 테일게이트',
  hud: '헤드업 디스플레이 / HUD',
  'panoramic-curved-display': '파노라믹 커브드 디스플레이',
  'apple-carplay-wired': 'Apple CarPlay',
  'apple-carplay-wireless': '무선 Apple CarPlay',
  'android-auto-wired': 'Android Auto',
  'android-auto-wireless': '무선 Android Auto',
  'ccnc-ota': '무선 소프트웨어 업데이트 / OTA',
  'fingerprint-auth': '지문 인증',
  'ev-charge-v2l': 'EV 충전 예약 / 배터리 컨디셔닝 / V2L',
  'nexo-h2-refuel': '수소 충전 / 충전구 개폐',
  'nexo-fcev-info': 'FCEV 정보 화면 / 에너지 모니터',
  'nexo-smart-regen': '스마트 회생제동 / 회생제동 조절',
  'nexo-eco-coaching': '에코 코칭 / 주행 효율 안내',
  'n-performance': 'N 전용 주행/성능 기능',
  'memory-reverse-assist': '메모리 리버스 어시스트 / MRA',
  'plug-and-charge': 'Plug & Charge',
  'iccu-energy-control': 'ICCU 에너지 변환 / 충전 제어',
  'ev-route-planner': 'EV Route Planner',
  'battery-conditioning': '배터리 컨디셔닝',
  'scheduled-charging': '충전 예약',
  'charge-limit': '충전 한도 설정',
  'v2l-parent': 'V2L',
  'v2l-indoor': '실내 V2L',
  'v2l-outdoor': '실외 V2L',
  'camping-mode': '캠핑 모드',
  'utility-mode': '유틸리티 모드',
  'v2h-roadmap': 'V2H',
  'v2g-roadmap': 'V2G',
  'side-pdw': '측방 주차 거리 경고',
  'pca-parking': '주차 충돌방지 보조',
  'remote-smart-exit': '원격 스마트 출차 보조',
  'e-hi-pass': '하이패스 시스템 / e-Hi Pass',
  'face-connect': 'Face Connect',
  'genesis-dk2': 'Genesis Digital Key 2',
  'genesis-dk2-touch': 'Genesis Digital Key 2 Touch',
  'hyundai-dk2': 'Hyundai Digital Key 2',
  'hyundai-dk2-touch': 'Hyundai Digital Key 2 Touch',
  'digital-center-mirror': '디지털 센터 미러',
  'built-in-cam': '빌트인 캠',
  'built-in-cam2': '빌트인 캠 2',
  'built-in-cam2-plus': '빌트인 캠 2 Plus',
  'dynamic-body-care-seat': '다이내믹 바디케어 시트',
  'swiveling-seat': '스위블링 시트',
  'walk-in-device': '워크인 디바이스',
  'smart-posture-assist': '스마트 자세 제어 시스템',
  'passenger-talk': 'Passenger Talk',
  'passenger-view': 'Passenger View',
  'rear-voice-recognition': '후석 음성 인식',
  'rear-climate-control': '후석 공조 제어',
  'pleos-connect': 'Pleos Connect',
  'ccnc-system': 'ccNC',
  'hyundai-ai': 'Hyundai AI Assistant',
  'kia-ai': 'Kia AI Assistant',
  'feature-on-demand': 'Feature on Demand',
  'fcev-energy-flow': 'FCEV 에너지 흐름도',
  'fcev-dedicated-system': '수소차 전용 시스템 정보',
  'ev-charge-status': '충전 상태 확인',
  'ev-energy-usage': '에너지 사용량',
  'ev-battery-health': '배터리 상태 확인',
  'i-pedal': 'i-Pedal',
  'ev-smart-regeneration': '스마트 회생제동',
  'ev-regen-level': '회생제동 단계 조절',
  'tmed2-hybrid-system': 'TMED-2 하이브리드 시스템',
  'hybrid-stay-mode': '스테이 모드',
  'hybrid-stay-reservation': '스테이 모드 사용 예약',
  'hybrid-v2l': '하이브리드 V2L',
  'hybrid-smart-regen': '하이브리드 스마트 회생제동',
  'hybrid-regen-level': '하이브리드 회생제동 단계 조절',
  'hybrid-energy-flow': '하이브리드 에너지 흐름도',
  'hybrid-battery-status': '하이브리드 배터리 충전 상태',
  'hybrid-driving-info': '하이브리드 전용 주행 정보',
  'hybrid-stationary-climate': '하이브리드 정차 공조',
  rspa: '원격 스마트 주차 보조 / RSPA',
  spa: '스마트 주차 보조 / SPA',
  'rear-view-monitor': '후방 모니터',
  'surround-view-monitor': '서라운드 뷰 모니터 / SVM',
  'blind-spot-view-monitor': '후측방 모니터 / BVM',
  'rear-cross-traffic-collision-avoidance': '후방 교차 충돌방지 보조',
  'parking-distance-warning': '주차 거리 경고',
  'reverse-tilt-mirror': '후진 연동 사이드 미러',
  'memory-parking': '메모리 주차',
  'reverse-guide': '후진 가이드',
  'climate-control': '공조',
  'smart-key': '스마트 키',
  'emergency-key': '비상 키',
  'remote-engine-start': '원격 시동',
  scc: '스마트 크루즈 컨트롤 / SCC',
  hda: '고속도로 주행 보조 / HDA',
  lfa: '차로 유지 보조 / LFA',
  lka: '차로 이탈방지 보조 / LKA',
  bca: '후측방 충돌방지 보조 / BCA',
  'safe-exit-assist': '안전 하차 보조 / SEA',
  'driver-attention-warning': '운전자 주의 경고 / DAW',
  'intelligent-speed-limit-assist': '지능형 속도 제한 보조 / ISLA',
  'high-beam-assist': '하이빔 보조 / HBA'
};

const categories = {
  safety: '주행 보조',
  parking: '주차 보조',
  convenience: '편의 기능',
  digital: '디지털/커넥티드',
  ev: 'EV 전용 기능',
  fcev: 'FCEV 전용 기능',
  hev: '하이브리드 전용 기능',
  seat: '시트',
  roadmap: '로드맵/준비 중'
};

const categoryById = id => {
  if (['v2h-roadmap','v2g-roadmap'].includes(id)) return categories.roadmap;
  if (['fca-suite','nscc-hda2','scc','hda','lfa','lka','bca','safe-exit-assist','driver-attention-warning','intelligent-speed-limit-assist','high-beam-assist'].includes(id)) return categories.safety;
  if (['rspa2','rspa','spa','side-pdw','pca-parking','remote-smart-exit','rear-view-monitor','surround-view-monitor','blind-spot-view-monitor','rear-cross-traffic-collision-avoidance','parking-distance-warning','reverse-tilt-mirror','memory-parking','memory-reverse-assist','reverse-guide'].includes(id)) return categories.parking;
  if (['apple-carplay-wired','apple-carplay-wireless','android-auto-wired','android-auto-wireless','ccnc-ota','fingerprint-auth','e-hi-pass','face-connect','genesis-dk2','genesis-dk2-touch','hyundai-dk2','hyundai-dk2-touch','built-in-cam','built-in-cam2','built-in-cam2-plus','pleos-connect','ccnc-system','hyundai-ai','kia-ai','feature-on-demand'].includes(id)) return categories.digital;
  if (['ev-charge-v2l','plug-and-charge','iccu-energy-control','ev-route-planner','battery-conditioning','scheduled-charging','charge-limit','v2l-parent','v2l-indoor','v2l-outdoor','camping-mode','utility-mode','v2h-roadmap','v2g-roadmap','ev-charge-status','ev-energy-usage','ev-battery-health','i-pedal','ev-smart-regeneration','ev-regen-level'].includes(id)) return categories.ev;
  if (['nexo-h2-refuel','nexo-fcev-info','nexo-smart-regen','nexo-eco-coaching','fcev-energy-flow','fcev-dedicated-system'].includes(id)) return categories.fcev;
  if (['tmed2-hybrid-system','hybrid-stay-mode','hybrid-stay-reservation','hybrid-v2l','hybrid-smart-regen','hybrid-regen-level','hybrid-energy-flow','hybrid-battery-status','hybrid-driving-info','hybrid-stationary-climate'].includes(id)) return categories.hev;
  if (['heated-ventilated-seats','ergo-motion-seat','relaxation-comfort-seat','memory-seat','dynamic-body-care-seat','swiveling-seat','walk-in-device','smart-posture-assist'].includes(id)) return categories.seat;
  return categories.convenience;
};

const defaultSummary = id => {
  const name = names[id] || id;
  if (id.endsWith('-roadmap') || ['hyundai-ai','kia-ai','feature-on-demand','pleos-connect'].includes(id)) {
    return `${name}은 공식 자료 기반 세부 절차 확인 후 업데이트할 예정입니다.`;
  }
  return `${name} 기능의 개요와 적용 차량 정보를 제공합니다. 세부 조작 절차는 공식 매뉴얼에서 확인된 항목만 표시합니다.`;
};

const detailKeys = ['preconditions', 'settings', 'steps', 'disable', 'limitations', 'warnings'];
const brokenPattern = /[�]|[留筌癒袁雅獄揶蹂遺]|(\?[^ ?.,/)-]{1,})/;
const isBroken = value => {
  const text = String(value ?? '');
  if (!text.trim()) return true;
  if (text === noGuide) return true;
  return brokenPattern.test(text);
};
const cleanList = value => Array.isArray(value)
  ? value.map(item => String(item || '').trim()).filter(item => item && !isBroken(item))
  : [];

let sanitizedStrings = 0;
let hiddenDetailFeatures = 0;
for (const feature of features) {
  const id = feature.id;
  const canonicalName = names[id] || id;
  feature.name = canonicalName;
  feature.category = categoryById(id);
  feature.officialCategory = feature.category;
  feature.subcategory = feature.subcategory && !isBroken(feature.subcategory) ? feature.subcategory : feature.category;
  feature.summary = feature.summary && !isBroken(feature.summary) ? feature.summary : defaultSummary(id);
  feature.overview = feature.overview && !isBroken(feature.overview) ? feature.overview : feature.summary;
  feature.keywords = cleanList([...(feature.keywords || []), canonicalName, ...(feature.aliases || [])]);
  feature.related = cleanList(feature.related).filter(name => Object.values(names).includes(name));
  feature.faq = [];
  feature.generation = undefined;
  feature.sourceDetails = Array.isArray(feature.sourceDetails)
    ? feature.sourceDetails.filter(item => item && !isBroken(item.label) && !isBroken(item.url))
    : [];
  for (const key of detailKeys) {
    const before = Array.isArray(feature[key]) ? feature[key].length : 0;
    feature[key] = cleanList(feature[key]);
    sanitizedStrings += Math.max(0, before - feature[key].length);
  }
  if (detailKeys.some(key => !feature[key]?.length)) {
    feature.displayMode = 'summary-only';
    feature.userFacingStatus = feature.category === categories.ev && id.endsWith('-roadmap') ? 'roadmap' : 'coming-soon';
    feature.category = ['v2h-roadmap','v2g-roadmap'].includes(id) ? categories.roadmap : feature.category;
    hiddenDetailFeatures += 1;
  } else {
    feature.displayMode = 'full';
    delete feature.userFacingStatus;
  }
  if (Array.isArray(feature.modelSpecificGuides)) {
    feature.modelSpecificGuides = feature.modelSpecificGuides.map(guide => {
      const next = { ...guide };
      for (const key of ['preconditions', 'settings', 'steps', 'exitSteps', 'limitations', 'warnings']) {
        next[key] = cleanList(next[key]);
      }
      return next;
    }).filter(guide => ['preconditions', 'settings', 'steps', 'exitSteps', 'limitations', 'warnings'].some(key => guide[key]?.length));
  }
}

function scrubBrokenStrings(value, key = '') {
  if (Array.isArray(value)) {
    return value
      .map(item => scrubBrokenStrings(item, key))
      .filter(item => item !== '' && item !== null && item !== undefined && !(Array.isArray(item) && !item.length));
  }
  if (value && typeof value === 'object') {
    for (const [childKey, childValue] of Object.entries(value)) {
      value[childKey] = scrubBrokenStrings(childValue, childKey);
      if (value[childKey] === '' || value[childKey] === null || value[childKey] === undefined) {
        delete value[childKey];
      }
    }
    return value;
  }
  if (typeof value === 'string') {
    if (['url', 'canonical'].includes(key)) return value;
    if (value === noGuide || isBroken(value)) return '';
  }
  return value;
}

for (const feature of features) {
  scrubBrokenStrings(feature);
  feature.name = names[feature.id] || feature.name || feature.id;
  feature.category = categoryById(feature.id);
  feature.officialCategory = feature.category;
  feature.summary = feature.summary || defaultSummary(feature.id);
  feature.overview = feature.overview || feature.summary;
}

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
fs.writeFileSync(
  path.join(root, 'work', 'function-data-sanitize-report.json'),
  `${JSON.stringify({
    sanitizedStrings,
    hiddenDetailFeatures,
    summaryOnlyFeatures: features.filter(feature => feature.displayMode === 'summary-only').map(feature => ({
      id: feature.id,
      name: feature.name,
      category: feature.category
    }))
  }, null, 2)}\n`,
  'utf8'
);
console.log(JSON.stringify({
  features: features.length,
  sanitizedStrings,
  hiddenDetailFeatures
}, null, 2));
