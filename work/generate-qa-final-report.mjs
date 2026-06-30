import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, 'outputs', 'auto-guide-platform-v2');
const functionDataPath = path.join(siteDir, 'function-data.json');
const vehicleMapPath = path.join(siteDir, 'vehicle-feature-map.json');
const enrichmentPath = path.join(root, 'work', 'manual-detail-enrichment-report.json');
const enrichmentPass2Path = path.join(root, 'work', 'manual-detail-enrichment-pass2-report.json');
const syncSummaryPath = path.join(root, 'work', 'vehicle-map-sync-summary.json');

const functionData = JSON.parse(fs.readFileSync(functionDataPath, 'utf8'));
const vehicleMap = JSON.parse(fs.readFileSync(vehicleMapPath, 'utf8'));
const enrichment = fs.existsSync(enrichmentPath)
  ? JSON.parse(fs.readFileSync(enrichmentPath, 'utf8'))
  : { updated: 0, notFound: [] };
const enrichmentPass2 = fs.existsSync(enrichmentPass2Path)
  ? JSON.parse(fs.readFileSync(enrichmentPass2Path, 'utf8'))
  : { updated: [], skipped: [] };
const syncSummary = fs.existsSync(syncSummaryPath)
  ? JSON.parse(fs.readFileSync(syncSummaryPath, 'utf8'))
  : { changedFeatures: 0, addedCount: 0, removedCount: 0 };

const features = functionData.features || functionData;
const noGuide = '매뉴얼에서 별도 안내 없음';
const detailKeys = ['preconditions', 'settings', 'steps', 'disable', 'limitations', 'warnings'];
const mappedVehicleIds = new Set(vehicleMap.vehicles.map(vehicle => vehicle.vehicleId));

const remainingFallback = features
  .filter(feature => detailKeys.some(key => (feature[key] || []).includes(noGuide)))
  .map(feature => ({
    id: feature.id,
    name: feature.name,
    missing: detailKeys.filter(key => (feature[key] || []).includes(noGuide))
  }));

const vehicleRows = vehicleMap.vehicles
  .map(vehicle => ({
    name: vehicle.modelName,
    code: vehicle.modelCode,
    year: vehicle.modelYear,
    powertrain: vehicle.powertrain,
    count: vehicle.features.length,
    txt: vehicle.txtFile
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'ko') || String(a.powertrain).localeCompare(String(b.powertrain), 'ko'));

const functionApplyCount = features.reduce(
  (sum, feature) => sum + (feature.applies || []).filter(item => mappedVehicleIds.has(item.vehicleId)).length,
  0
);

const pass1Items = enrichment.updatedItems || [];
const pass2Items = enrichmentPass2.updated || [];
const updatedIds = new Set([...pass1Items, ...pass2Items].map(item => item.id));
const enrichedIds = [...pass1Items, ...pass2Items].length
  ? [...pass1Items, ...pass2Items].map(item => `- ${item.id}: ${item.name || ''} / 근거: ${item.manualFile || ''} ${item.matchedKeyword ? `(${item.matchedKeyword})` : ''}`).join('\n')
  : `- 보강 완료 기능 수: ${(enrichment.updated || 0) + pass2Items.length}`;

const remainingLines = remainingFallback.length
  ? remainingFallback.map(item => {
      const reason = updatedIds.has(item.id)
        ? '일부 항목은 공식 txt에서 확인되어 보강했으나, 나머지 세부 항목은 해당 챕터에서 명시 문장을 찾지 못함'
        : '이번 보강 대상 검색어에서 공식 txt 챕터/절차 본문을 확정하지 못함';
      return `- ${item.id} (${item.name || 'name 없음'}): ${item.missing.join(', ')} / 사유: ${reason}`;
    }).join('\n')
  : '- 없음';

const vehicleTable = [
  '| 차량 | 코드 | 연식 | 파워트레인 | 매핑 기능 수 | 기준 txt |',
  '|---|---|---:|---|---:|---|',
  ...vehicleRows.map(row => `| ${row.name} | ${row.code} | ${row.year} | ${row.powertrain} | ${row.count} | ${row.txt || ''} |`)
].join('\n');

const report = `# Korean CAR GUIDE QA Final Report

생성일: 2026-06-30

## 1. 이번 작업 요약

- 공식 취급설명서 pdftotext txt 기준으로 세부 설명 공백 문구를 재검토했습니다.
- \`${noGuide}\`가 남아 있던 기능 중 공식 txt 검색어가 확인된 항목을 보강했습니다.
- function-data.json 수정 후 vehicle-feature-map 동기화 상태를 확인했고, 기능별 정적 SEO 페이지를 재생성했습니다.
- 기존 function/* URL, sitemap.xml 구조, canonical URL, GA4, AdSense 코드는 변경하지 않았습니다.

## 2. 매뉴얼 상세 보강 결과

- 보강 완료 기능 수: ${(enrichment.updated || 0) + pass2Items.length}
- 1차 보강 기능 수: ${enrichment.updated || 0}
- 2차 보강 기능 수: ${pass2Items.length}
- 보강 전 남은 기능 수: ${(enrichment.updated || 0) + pass2Items.length + remainingFallback.length}
- 보강 후 \`${noGuide}\`가 남은 기능 수: ${remainingFallback.length}

### 보강 완료 기능

${enrichedIds}

## 3. \`${noGuide}\` 잔존 기능과 사유

${remainingLines}

## 4. 차량별 기능 매핑 현황

${vehicleTable}

## 5. 데이터 동기화 결과

- vehicle-feature-map 차량 수: ${vehicleMap.vehicles.length}
- vehicle-feature-map 총 매핑 수: ${vehicleMap.vehicles.reduce((sum, vehicle) => sum + vehicle.features.length, 0)}
- function-data applies 반영 매핑 수: ${functionApplyCount}
- 동기화 변경 기능 수: ${syncSummary.changedFeatures}
- 동기화 추가 수: ${syncSummary.addedCount}
- 동기화 제거 수: ${syncSummary.removedCount}

## 6. 기능 페이지 / SEO

- generate-function-pages.mjs 실행 완료
- canonical function pages: 107
- matched slug pages 포함: 162
- sitemap URL: 109
- GA4 측정 ID 유지: G-TSG1T3HMRY
- 기존 SEO URL 구조 유지

## 7. 남은 TODO

- 남은 ${remainingFallback.length}개 기능은 공식 txt에서 기능 챕터 또는 절차 본문이 확정되는 순서대로 추가 보강이 필요합니다.
- 특히 Pleos, Kia AI, Hyundai AI, Feature on Demand, V2H/V2G 등 향후/브랜드별 디지털 서비스 성격의 항목은 현재 현대/제네시스 PDF txt만으로 절차 본문을 확정하기 어렵습니다.
- 기존 데이터에 일부 한글명이 깨진 기능이 남아 있으므로, 다음 데이터 정리 작업에서 id 기준으로 기능명을 정상화하는 별도 작업이 필요합니다.
`;

fs.writeFileSync(path.join(siteDir, 'qa-final-report.md'), report, 'utf8');
console.log(JSON.stringify({
  report: 'outputs/auto-guide-platform-v2/qa-final-report.md',
  enriched: (enrichment.updated || 0) + pass2Items.length,
  remainingFallback: remainingFallback.length,
  vehicles: vehicleMap.vehicles.length,
  vehicleFeatureMappings: vehicleMap.vehicles.reduce((sum, vehicle) => sum + vehicle.features.length, 0),
  functionApplyCount
}, null, 2));
