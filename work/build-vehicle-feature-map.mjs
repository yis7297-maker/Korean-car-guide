import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const siteDir = path.join(root, 'outputs', 'auto-guide-platform-v2');
const textDir = path.join(root, 'work', 'manual-text');

function makeElement() {
  return {
    style: {},
    dataset: {},
    className: '',
    value: '',
    textContent: '',
    children: [],
    _innerHTML: '',
    classList: { add() {}, remove() {}, toggle() {} },
    appendChild(node) { this.children.push(node); return node; },
    insertBefore(node) { this.children.push(node); return node; },
    insertAdjacentElement() {},
    insertAdjacentHTML() {},
    addEventListener() {},
    remove() {},
    setAttribute(key, value) { this[key] = value; },
    getAttribute(key) { return this[key]; },
    querySelector() { return makeElement(); },
    querySelectorAll() { return []; },
    cloneNode() { return makeElement(); },
    set innerHTML(value) { this._innerHTML = value; },
    get innerHTML() { return this._innerHTML; },
    content: { firstElementChild: { cloneNode() { return makeElement(); } } }
  };
}

function loadRuntime() {
  const cardTemplate = { content: { firstElementChild: { cloneNode() { return makeElement(); } } } };
  const known = {
    '#cardTemplate': cardTemplate,
    '#cards': makeElement(),
    '#categoryFilters': makeElement(),
    '#typeFilters': makeElement(),
    '#brandSelect': makeElement(),
    '#vehicleSelect': makeElement(),
    '#yearSelect': makeElement(),
    '#resultCount': makeElement(),
    '#sectionTitle': makeElement(),
    '#sortSelect': makeElement(),
    '#searchInput': makeElement(),
    '.quick-card': makeElement(),
    '.results-area': makeElement(),
    '.summary-row': makeElement(),
    '.search-box': makeElement(),
    '.site-footer__meta': makeElement()
  };
  const document = {
    head: makeElement(),
    body: makeElement(),
    createElement() { return makeElement(); },
    querySelector(selector) { return known[selector] || makeElement(); },
    querySelectorAll() { return []; },
    addEventListener() {}
  };
  const context = {
    console,
    document,
    window: { addEventListener() {}, location: { href: '' } },
    navigator: { serviceWorker: null },
    location: { hostname: '', search: '' },
    URLSearchParams,
    setTimeout,
    clearTimeout
  };
  context.window.window = context.window;
  context.window.document = document;
  vm.createContext(context);

  const scripts = [
    'app.js',
    'patch.js',
    'data-expansion.js',
    'hero-enhancement.js',
    'feature-improvements.js',
    'hybrid-tmed2.js',
    'parking-manual-audit.js',
    'digital-feature-manual-audit.js',
    'electrification-manual-audit.js',
    'convenience-manual-audit.js',
    'final-release-audit.js',
    'official-verification-system.js'
  ];

  for (const file of scripts) {
    try {
      vm.runInContext(fs.readFileSync(path.join(siteDir, file), 'utf8'), context, { filename: file });
    } catch (error) {
      console.warn(`[runtime-load-warning] ${file}: ${error.message}`);
    }
  }
  vm.runInContext('globalThis.__dump = { features, vehicles, categories };', context);
  return context.__dump;
}

const targetManuals = [
  { vehicleId: 'hy-grandeur', brand: 'Hyundai', brandKo: '현대', modelName: '그랜저', modelCode: 'GN7', modelYear: '2026', powertrain: 'ICE', fileName: 'GN7_2026_ko_KR.txt' },
  { vehicleId: 'hy-grandeur-hev', brand: 'Hyundai', brandKo: '현대', modelName: '그랜저 하이브리드', modelCode: 'GN7HEV', modelYear: '2026', powertrain: 'HEV', fileName: 'GN7HEV_2026_ko_KR.txt' },
  { vehicleId: 'hy-santafe', brand: 'Hyundai', brandKo: '현대', modelName: '싼타페', modelCode: 'MX5', modelYear: '2026', powertrain: 'ICE', fileName: 'MX5_2026_ko_KR.txt' },
  { vehicleId: 'hy-santafe-hev', brand: 'Hyundai', brandKo: '현대', modelName: '싼타페 하이브리드', modelCode: 'MX5HEV', modelYear: '2026', powertrain: 'HEV', fileName: 'MX5HEV_2026_ko_KR.txt' },
  { vehicleId: 'hy-palisade', brand: 'Hyundai', brandKo: '현대', modelName: '팰리세이드', modelCode: 'LX3', modelYear: '2026', powertrain: 'ICE', fileName: 'LX3_2026_ko_KR.txt' },
  { vehicleId: 'hy-palisade-hev', brand: 'Hyundai', brandKo: '현대', modelName: '팰리세이드 하이브리드', modelCode: 'LX3HEV', modelYear: '2026', powertrain: 'HEV', fileName: 'LX3HEV_2026_ko_KR.txt' },
  { vehicleId: 'hy-casper', brand: 'Hyundai', brandKo: '현대', modelName: '캐스퍼', modelCode: 'AX', modelYear: '2026', powertrain: 'ICE', fileName: 'AX_2026_ko_KR.txt' },
  { vehicleId: 'hy-casper-ev', brand: 'Hyundai', brandKo: '현대', modelName: '캐스퍼 일렉트릭', modelCode: 'AXEV', modelYear: '2026', powertrain: 'EV', fileName: 'AXEV_2026_ko_KR.txt' },
  { vehicleId: 'hy-nexo', brand: 'Hyundai', brandKo: '현대', modelName: '디 올 뉴 넥쏘', modelCode: 'NH2', modelYear: '2026', powertrain: 'FCEV', fileName: 'NH2_2026_ko_KR.txt' },
  { vehicleId: 'hy-avante', brand: 'Hyundai', brandKo: '현대', modelName: '아반떼', modelCode: 'CN7', modelYear: '2026', powertrain: 'ICE', fileName: 'CN7_2026_ko_KR.txt' },
  { vehicleId: 'hy-avante-hev', brand: 'Hyundai', brandKo: '현대', modelName: '아반떼 하이브리드', modelCode: 'CN7HEV', modelYear: '2026', powertrain: 'HEV', fileName: 'CN7HEV_2026_ko_KR.txt' },
  { vehicleId: 'hy-avante-n', brand: 'Hyundai', brandKo: '현대', modelName: '아반떼 N', modelCode: 'CN7N', modelYear: '2026', powertrain: 'High-performance ICE', fileName: 'CN7N_2026_ko_KR.txt' },
  { vehicleId: 'hy-sonata', brand: 'Hyundai', brandKo: '현대', modelName: '쏘나타', modelCode: 'DN8', modelYear: '2026', powertrain: 'ICE', fileName: 'DN8_2026_ko_KR.txt' },
  { vehicleId: 'hy-sonata-hev', brand: 'Hyundai', brandKo: '현대', modelName: '쏘나타 하이브리드', modelCode: 'DN8HEV', modelYear: '2026', powertrain: 'HEV', fileName: 'DN8HEV_2026_ko_KR.txt' },
  { vehicleId: 'hy-venue', brand: 'Hyundai', brandKo: '현대', modelName: '베뉴', modelCode: 'QX', modelYear: '2026', powertrain: 'ICE', fileName: 'QX_2026_ko_KR.txt' },
  { vehicleId: 'hy-kona', brand: 'Hyundai', brandKo: '현대', modelName: '코나', modelCode: 'SX2', modelYear: '2027', powertrain: 'ICE', fileName: 'SX2_2027_ko_KR.txt' },
  { vehicleId: 'hy-kona-hev', brand: 'Hyundai', brandKo: '현대', modelName: '코나 하이브리드', modelCode: 'SX2HEV', modelYear: '2027', powertrain: 'HEV', fileName: 'SX2HEV_2027_ko_KR.txt' },
  { vehicleId: 'hy-kona-ev', brand: 'Hyundai', brandKo: '현대', modelName: '코나 일렉트릭', modelCode: 'SX2EV', modelYear: '2025', powertrain: 'EV', fileName: 'SX2EV_2025_ko_KR.txt' },
  { vehicleId: 'hy-tucson', brand: 'Hyundai', brandKo: '현대', modelName: '투싼', modelCode: 'NX4', modelYear: '2026', powertrain: 'ICE', fileName: 'NX4_2026_ko_KR.txt' },
  { vehicleId: 'hy-tucson-hev', brand: 'Hyundai', brandKo: '현대', modelName: '투싼 하이브리드', modelCode: 'NX4HEV', modelYear: '2026', powertrain: 'HEV', fileName: 'NX4HEV_2026_ko_KR.txt' },
  { vehicleId: 'hy-staria', brand: 'Hyundai', brandKo: '현대', modelName: '스타리아', modelCode: 'US4', modelYear: '2026', powertrain: 'ICE', fileName: 'US4_2026_ko_KR.txt' },
  { vehicleId: 'hy-staria-hev', brand: 'Hyundai', brandKo: '현대', modelName: '스타리아 하이브리드', modelCode: 'US4HEV', modelYear: '2026', powertrain: 'HEV', fileName: 'US4HEV_2026_ko_KR.txt' },
  { vehicleId: 'hy-staria-ev', brand: 'Hyundai', brandKo: '현대', modelName: '스타리아 일렉트릭', modelCode: 'US4EV', modelYear: '2027', powertrain: 'EV', fileName: 'US4EV_2027_ko_KR.txt' },
  { vehicleId: 'hy-ioniq5', brand: 'Hyundai', brandKo: '현대', modelName: '아이오닉 5', modelCode: 'NE1', modelYear: '2026', powertrain: 'EV', fileName: 'NE1_2026_ko_KR.txt' },
  { vehicleId: 'hy-ioniq5-n', brand: 'Hyundai', brandKo: '현대', modelName: '아이오닉 5 N', modelCode: 'NE1N', modelYear: '2026', powertrain: 'High-performance EV', fileName: 'NE1N_2026_ko_KR.txt' },
  { vehicleId: 'hy-ioniq6', brand: 'Hyundai', brandKo: '현대', modelName: '아이오닉 6', modelCode: 'CE1', modelYear: '2025', powertrain: 'EV', fileName: 'CE1_2025_ko_KR.txt' },
  { vehicleId: 'hy-ioniq6-n', brand: 'Hyundai', brandKo: '현대', modelName: '아이오닉 6 고성능 모델', modelCode: 'CE1N', modelYear: '2025', powertrain: 'High-performance EV', fileName: 'CE1N_2025_ko_KR.txt', notes: '차종명 확인 필요' },
  { vehicleId: 'hy-ioniq9', brand: 'Hyundai', brandKo: '현대', modelName: '아이오닉 9', modelCode: 'ME', modelYear: '2027', powertrain: 'EV', fileName: 'ME_2027_ko_KR.txt' },
  { vehicleId: 'gen-g70', brand: 'Genesis', brandKo: '제네시스', modelName: 'G70', modelCode: 'IK', modelYear: '2026', powertrain: 'ICE', fileName: 'IK_2026_ko_KR.txt' },
  { vehicleId: 'gen-g80', brand: 'Genesis', brandKo: '제네시스', modelName: 'G80', modelCode: 'RG3', modelYear: '2027', powertrain: 'ICE', fileName: 'RG3_2027_ko_KR.txt' },
  { vehicleId: 'gen-g80-ev', brand: 'Genesis', brandKo: '제네시스', modelName: '전동화 G80', modelCode: 'RG3EV', modelYear: '2027', powertrain: 'EV', fileName: 'RG3EV_2027_ko_KR.txt' },
  { vehicleId: 'gen-g90', brand: 'Genesis', brandKo: '제네시스', modelName: 'G90', modelCode: 'RS4', modelYear: '2027', powertrain: 'ICE', fileName: 'RS4_2027_ko_KR.txt' },
  { vehicleId: 'gen-gv60', brand: 'Genesis', brandKo: '제네시스', modelName: 'GV60', modelCode: 'JW', modelYear: '2027', powertrain: 'EV', fileName: 'JW_2027_ko_KR.txt' },
  { vehicleId: 'gen-gv70', brand: 'Genesis', brandKo: '제네시스', modelName: 'GV70', modelCode: 'JK', modelYear: '2026', powertrain: 'ICE', fileName: 'JK_2026_ko_KR.txt' },
  { vehicleId: 'gen-gv70-ev', brand: 'Genesis', brandKo: '제네시스', modelName: '전동화 GV70', modelCode: 'JKEV', modelYear: '2027', powertrain: 'EV', fileName: 'JKEV_2027_ko_KR.txt' },
  { vehicleId: 'gen-gv80', brand: 'Genesis', brandKo: '제네시스', modelName: 'GV80', modelCode: 'JX', modelYear: '2026', powertrain: 'ICE', fileName: 'JX_2026_ko_KR.txt' }
];

const genericTerms = new Set([
  '차량', '자동차', '기능', '설정', '정보', '사용', '모드', '보조', '시스템', '경고', '주의',
  '편의', '주행', '주차', '안전', '전용', '고급', '스마트', '원격', '차로', '후방', '전방',
  '자동 주차', '차 빼기', '주행 정보', '실내 공기', '후방 시야', '디스플레이', '인포테인먼트',
  'EV', 'HEV', 'SUV', 'USB', 'N', 'AUTO', 'ON', 'OFF'
]);

function normalize(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, '');
}

function splitCandidate(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .split(/[\/,|·・()（）\[\]]/g)
    .map(item => item.trim())
    .filter(Boolean);
}

function candidatesFor(feature) {
  const raw = [
    feature.id,
    feature.name,
    ...(feature.aliases || []),
    ...(feature.keywords || [])
  ];
  const expanded = raw.flatMap(splitCandidate);
  const candidates = [];
  for (const item of expanded) {
    const cleaned = item.replace(/^[\-\s]+|[\-\s]+$/g, '').trim();
    const compact = normalize(cleaned);
    if (!cleaned || genericTerms.has(cleaned) || genericTerms.has(cleaned.toUpperCase())) continue;
    const hasKorean = /[가-힣]/.test(cleaned);
    const hasLatin = /[a-z]/i.test(cleaned);
    const hasDigit = /\d/.test(cleaned);
    if (hasKorean && cleaned.replace(/\s/g, '').length >= 4) candidates.push(cleaned);
    else if (hasLatin && (compact.length >= 4 || hasDigit)) candidates.push(cleaned);
  }
  return [...new Set(candidates)].slice(0, 20);
}

function featureAllowedForVehicle(feature, manual) {
  const id = feature.id;
  const category = String(feature.category || '');
  const official = String(feature.officialCategory || '');
  const powertrain = String(manual.powertrain || '');
  const isEV = powertrain.includes('EV') && !powertrain.includes('HEV') && !powertrain.includes('FCEV');
  const isHEV = powertrain.includes('HEV');
  const isFCEV = powertrain.includes('FCEV');
  const isPerformance = powertrain.includes('High-performance');

  if ((category.includes('EV 전용') || official.startsWith('EV /') || id.startsWith('ev-') || id.includes('v2l') || ['plug-and-charge', 'iccu-energy-control', 'battery-conditioning', 'scheduled-charging', 'charge-limit', 'camping-mode', 'utility-mode', 'i-pedal'].includes(id)) && !isEV) return false;
  if ((category.includes('FCEV') || id.includes('nexo') || id.includes('fcev')) && !isFCEV) return false;
  if ((category.includes('하이브리드') || id.startsWith('hybrid-') || id.includes('tmed2')) && !isHEV) return false;
  if (id === 'n-performance' && !isPerformance) return false;
  if ((id.startsWith('genesis-') || id === 'face-connect') && manual.brand !== 'Genesis') return false;
  if (id.startsWith('hyundai-') && manual.brand !== 'Hyundai') return false;
  if (id === 'kia-ai') return false;
  if (['v2h-roadmap', 'v2g-roadmap'].includes(id)) return false;
  return true;
}

function findMatch(text, candidates) {
  const lower = text.toLowerCase();
  const compact = normalize(text);
  for (const keyword of candidates) {
    if (lower.includes(keyword.toLowerCase()) || compact.includes(normalize(keyword))) return keyword;
  }
  return null;
}

function inferSection(text, keyword) {
  const lines = text.split(/\r?\n/);
  const index = lines.findIndex(line => normalize(line).includes(normalize(keyword)));
  if (index === -1) return keyword;
  for (let i = index; i >= Math.max(0, index - 8); i -= 1) {
    const line = lines[i].trim();
    if (line && line.length <= 40 && /[가-힣A-Za-z]/.test(line)) return line;
  }
  return lines[index].trim().slice(0, 60) || keyword;
}

const { features, vehicles } = loadRuntime();
const featureById = new Map(features.map(feature => [feature.id, feature]));

const vehiclesOutput = targetManuals.map(manual => {
  const textPath = path.join(textDir, manual.fileName);
  const text = fs.existsSync(textPath) ? fs.readFileSync(textPath, 'utf8') : '';
  const featuresForVehicle = [];

  for (const feature of features) {
    if (!featureAllowedForVehicle(feature, manual)) continue;
    const keywords = candidatesFor(feature);
    const matchedKeyword = text ? findMatch(text, keywords) : null;
    if (!matchedKeyword) continue;
    featuresForVehicle.push({
      featureId: feature.id,
      featureName: feature.name,
      available: true,
      verificationLevel: 'official_source_verified',
      manualFile: manual.fileName.replace(/\.txt$/, '.pdf'),
      txtFile: manual.fileName,
      matchedKeyword,
      section: inferSection(text, matchedKeyword),
      note: '공식 취급설명서 txt에서 기능 명칭 확인'
    });
  }

  return {
    brand: manual.brand,
    brandKo: manual.brandKo,
    modelName: manual.modelName,
    modelCode: manual.modelCode,
    modelYear: manual.modelYear,
    powertrain: manual.powertrain,
    vehicleId: manual.vehicleId,
    manualFile: manual.fileName.replace(/\.txt$/, '.pdf'),
    txtFile: manual.fileName,
    sourceType: 'official_owner_manual_txt',
    notes: manual.notes || '',
    features: featuresForVehicle.sort((a, b) => a.featureName.localeCompare(b.featureName, 'ko'))
  };
});

const ioniq9 = vehiclesOutput.find(vehicle => vehicle.vehicleId === 'hy-ioniq9');
if (ioniq9 && featureById.has('swiveling-seat')) {
  const hasSwivel = fs.readFileSync(path.join(textDir, 'ME_2027_ko_KR.txt'), 'utf8').includes('스위블 기능 사용하기');
  const current = ioniq9.features.find(item => item.featureId === 'swiveling-seat');
  if (hasSwivel && !current) {
    ioniq9.features.push({
      featureId: 'swiveling-seat',
      featureName: featureById.get('swiveling-seat').name,
      available: true,
      verificationLevel: 'official_manual_verified',
      manualFile: 'ME_2027_ko_KR.pdf',
      txtFile: 'ME_2027_ko_KR.txt',
      matchedKeyword: '스위블 기능 사용하기',
      section: '스위블 기능 사용하기 (6인승)',
      note: '6인승 2열 스위블 기능 절차 본문 확인'
    });
  } else if (hasSwivel && current) {
    current.verificationLevel = 'official_manual_verified';
    current.matchedKeyword = '스위블 기능 사용하기';
    current.section = '스위블 기능 사용하기 (6인승)';
    current.note = '6인승 2열 스위블 기능 절차 본문 확인';
  }
  ioniq9.features.sort((a, b) => a.featureName.localeCompare(b.featureName, 'ko'));
}

const output = {
  generatedAt: '2026-06-30',
  source: 'official_owner_manual_txt',
  scope: 'Hyundai target vehicle feature mapping reinforcement',
  vehicles: vehiclesOutput
};

fs.writeFileSync(path.join(siteDir, 'vehicle-feature-map.json'), JSON.stringify(output, null, 2), 'utf8');
fs.writeFileSync(
  path.join(siteDir, 'vehicle-feature-map.js'),
  `window.KCG_VEHICLE_FEATURE_MAP = ${JSON.stringify(output, null, 2)};\n\n` +
`(function () {
  const map = window.KCG_VEHICLE_FEATURE_MAP;
  if (!map || !Array.isArray(map.vehicles) || !Array.isArray(window.features || features)) return;

  const runtimeFeatures = window.features || features;
  const runtimeVehicles = window.vehicles || vehicles;
  const featureEntries = new Map();

  const brandLabel = vehicle => vehicle.brandKo || (vehicle.brand === 'Hyundai' ? '현대' : vehicle.brand);
  const text = value => String(value || '').trim();
  const normalize = value => text(value).toLowerCase().replace(/\\s+/g, '');

  function ensureVehicle(vehicle) {
    if (!vehicle.vehicleId || runtimeVehicles.some(item => item.id === vehicle.vehicleId)) return;
    runtimeVehicles.push({
      id: vehicle.vehicleId,
      brand: brandLabel(vehicle),
      name: vehicle.modelName,
      years: vehicle.modelYear,
      type: vehicle.powertrain,
      tags: [vehicle.powertrain, vehicle.modelCode].filter(Boolean),
      launch: '공식 취급설명서 기반 차량 매핑',
      manualFile: vehicle.manualFile
    });
  }

  map.vehicles.forEach(vehicle => {
    ensureVehicle(vehicle);
    (vehicle.features || []).forEach(item => {
      if (!item.available || !item.featureId) return;
      const entry = {
        vehicleId: vehicle.vehicleId,
        brand: brandLabel(vehicle),
        model: vehicle.modelName,
        years: vehicle.modelYear,
        trim: vehicle.powertrain || '공식 매뉴얼 확인',
        option: item.verificationLevel === 'official_manual_verified' ? '공식 매뉴얼 절차 확인' : '공식 매뉴얼 명칭 확인',
        verificationLevel: item.verificationLevel,
        manualFile: item.manualFile || vehicle.manualFile,
        txtFile: item.txtFile || vehicle.txtFile,
        section: item.section || item.matchedKeyword || '',
        note: item.note || ''
      };
      if (!featureEntries.has(item.featureId)) featureEntries.set(item.featureId, []);
      featureEntries.get(item.featureId).push(entry);
    });
  });

  function pushUnique(list, item) {
    if (!item) return;
    const model = text(item.model || item.modelName || item.name);
    const vehicleId = text(item.vehicleId || item.id);
    if (!model && !vehicleId) return;
    const normalized = {
      vehicleId,
      brand: text(item.brand || item.brandKo || ''),
      model,
      years: text(item.years || item.modelYear || item.year || ''),
      trim: text(item.trim || item.powertrain || ''),
      option: text(item.option || item.note || ''),
      verificationLevel: text(item.verificationLevel || ''),
      manualFile: text(item.manualFile || ''),
      section: text(item.section || '')
    };
    const key = [normalized.vehicleId, normalized.brand, normalized.model, normalized.years, normalized.trim, normalized.option].map(normalize).join('|');
    if (!list.some(existing => [existing.vehicleId, existing.brand, existing.model, existing.years, existing.trim, existing.option].map(normalize).join('|') === key)) {
      list.push(normalized);
    }
  }

  window.KCG_normalizeFeatureApplications = function normalizeFeatureApplications(feature) {
    const list = [];
    (feature.applies || []).forEach(item => pushUnique(list, item));
    [...(feature.supportedModels || []), ...(feature.supportedVehicles || []), ...(feature.applicableModels || [])].forEach(item => {
      if (typeof item === 'string') pushUnique(list, { model: item, option: '지원 차량 데이터' });
      else pushUnique(list, item);
    });
    (feature.modelSpecificGuides || []).forEach(guide => pushUnique(list, {
      brand: guide.brand,
      model: guide.modelName || guide.model,
      years: guide.modelYear,
      trim: guide.powertrain,
      option: guide.section || '차종별 공식 절차 확인',
      verificationLevel: guide.verificationLevel || feature.verificationLevel,
      manualFile: guide.manualFile,
      section: guide.section
    }));
    (featureEntries.get(feature.id) || []).forEach(item => pushUnique(list, item));
    return list;
  };

  runtimeFeatures.forEach(feature => {
    feature.applies = window.KCG_normalizeFeatureApplications(feature);
    feature.supportedModels = feature.applies.map(item => item.model).filter(Boolean);
  });

  if (typeof featureAppliesTo === 'function') {
    featureAppliesTo = function (feature, vehicleId) {
      return window.KCG_normalizeFeatureApplications(feature).some(item => item.vehicleId === vehicleId);
    };
  }

  if (typeof renderDatabaseView === 'function') {
    const baseRenderDatabaseView = renderDatabaseView;
    renderDatabaseView = function () {
      baseRenderDatabaseView();
    };
  }

  if (typeof renderCards === 'function') {
    const baseRenderCards = renderCards;
    renderCards = function (list) {
      runtimeFeatures.forEach(feature => { feature.applies = window.KCG_normalizeFeatureApplications(feature); });
      baseRenderCards(list);
    };
  }

  if (typeof render === 'function') render();
})();\n`,
  'utf8'
);

console.log(JSON.stringify({
  vehicles: output.vehicles.length,
  featureMappings: output.vehicles.reduce((sum, vehicle) => sum + vehicle.features.length, 0),
  swivelingSeatIoniq9: output.vehicles.find(vehicle => vehicle.vehicleId === 'hy-ioniq9')?.features.some(item => item.featureId === 'swiveling-seat') || false,
  counts: Object.fromEntries(output.vehicles.map(vehicle => [vehicle.modelName, vehicle.features.length]))
}, null, 2));
