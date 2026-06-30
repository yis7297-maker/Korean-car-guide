import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, 'outputs', 'auto-guide-platform-v2');
const functionDataPath = path.join(siteDir, 'function-data.json');
const vehicleMapPath = path.join(siteDir, 'vehicle-feature-map.json');

const functionData = JSON.parse(fs.readFileSync(functionDataPath, 'utf8'));
const vehicleMap = JSON.parse(fs.readFileSync(vehicleMapPath, 'utf8'));
const features = functionData.features || functionData;

const mappedVehicleIds = new Set(vehicleMap.vehicles.map(vehicle => vehicle.vehicleId));
const additionsByFeature = new Map();

function brandKo(vehicle) {
  if (vehicle.brandKo) return vehicle.brandKo;
  if (vehicle.brand === 'Hyundai') return '현대';
  if (vehicle.brand === 'Genesis') return '제네시스';
  if (vehicle.brand === 'Kia') return '기아';
  return vehicle.brand || '';
}

for (const vehicle of vehicleMap.vehicles) {
  for (const item of vehicle.features || []) {
    if (!item.available || !item.featureId) continue;
    if (!additionsByFeature.has(item.featureId)) additionsByFeature.set(item.featureId, []);
    additionsByFeature.get(item.featureId).push({
      vehicleId: vehicle.vehicleId,
      brand: brandKo(vehicle),
      model: vehicle.modelName,
      years: vehicle.modelYear,
      trim: vehicle.powertrain || '',
      option: item.verificationLevel === 'official_manual_verified' ? '공식 매뉴얼 절차 확인' : '공식 매뉴얼 명칭 확인',
      verificationLevel: item.verificationLevel || 'official_source_verified',
      manualFile: item.manualFile || vehicle.manualFile,
      section: item.section || item.matchedKeyword || '',
      sourceType: vehicle.sourceType || 'official_owner_manual_txt'
    });
  }
}

function key(item) {
  return [
    item.vehicleId,
    item.brand,
    item.model,
    item.years,
    item.trim,
    item.option
  ].map(value => String(value || '').toLowerCase().replace(/\s+/g, '')).join('|');
}

let changedFeatures = 0;
const removed = [];
const added = [];

for (const feature of features) {
  const before = Array.isArray(feature.applies) ? feature.applies : [];
  const kept = before.filter(item => !mappedVehicleIds.has(item.vehicleId));
  const incoming = additionsByFeature.get(feature.id) || [];
  const seen = new Set();
  const next = [];

  for (const item of [...kept, ...incoming]) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    next.push(item);
  }

  const beforeKeys = new Set(before.map(key));
  const nextKeys = new Set(next.map(key));
  for (const item of before) {
    if (!nextKeys.has(key(item))) removed.push({ featureId: feature.id, vehicleId: item.vehicleId, model: item.model });
  }
  for (const item of next) {
    if (!beforeKeys.has(key(item))) added.push({ featureId: feature.id, vehicleId: item.vehicleId, model: item.model });
  }

  if (JSON.stringify(before) !== JSON.stringify(next)) {
    feature.applies = next;
    feature.supportedModels = next.map(item => ({ ...item })).filter(item => item.model);
    changedFeatures += 1;
  }
}

fs.writeFileSync(functionDataPath, JSON.stringify(functionData, null, 2), 'utf8');
fs.writeFileSync(path.join(root, 'work', 'vehicle-map-sync-summary.json'), JSON.stringify({
  changedFeatures,
  removedCount: removed.length,
  addedCount: added.length,
  removed,
  added
}, null, 2), 'utf8');

console.log(JSON.stringify({
  changedFeatures,
  removedCount: removed.length,
  addedCount: added.length
}, null, 2));
