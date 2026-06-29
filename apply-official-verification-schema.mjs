import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const today = '2026-06-29';

const verificationDefaults = {
  verified: false,
  verificationLevel: 'pending_verification',
  verifiedSource: '',
  verifiedBrand: '',
  verifiedModel: '',
  verifiedModelYear: '',
  verifiedManual: '',
  manualFile: '',
  pageRange: '',
  section: '',
  verifiedSection: '',
  verifiedDate: '',
  verifiedBy: ''
};

function normalizeFeature(feature) {
  const previous = feature.verified;
  const detail = previous && typeof previous === 'object' ? previous : {};
  const complete = previous === true || detail.complete === true;

  for (const [key, value] of Object.entries(verificationDefaults)) {
    if (feature[key] === undefined || feature[key] === null) feature[key] = value;
  }

  feature.verified = complete;
  feature.verificationLevel = complete
    ? (feature.verificationLevel && feature.verificationLevel !== 'pending_verification'
      ? feature.verificationLevel
      : (detail.basis === 'official_owner_manual' ? 'official_manual_verified' : 'official_source_verified'))
    : 'pending_verification';
  feature.verifiedSource ||= detail.basis || '';
  feature.verifiedBrand ||= detail.brand || '';
  feature.verifiedModel ||= detail.modelName || '';
  feature.verifiedModelYear ||= detail.modelYear || '';
  feature.verifiedManual ||= detail.manualFile || '';
  feature.manualFile ||= detail.manualFile || '';
  feature.pageRange ||= detail.pageRange || '';
  feature.section ||= detail.section || '';
  feature.verifiedSection ||= detail.section || '';
  feature.verifiedDate ||= detail.date || '';
  feature.verifiedBy ||= detail.verifiedBy || '';
  feature.verificationNotes ||= detail.notes || '';
  feature.status = complete ? '공식 검증 완료' : '검증 진행 중';

  if (feature.verify && typeof feature.verify === 'object') feature.verify.complete = complete;
}

async function updateSite(siteRoot) {
  const dataPath = path.join(siteRoot, 'function-data.json');
  const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));

  for (const feature of data.features) normalizeFeature(feature);

  data.verificationPolicy = {
    verifiedTrueRule: [
      'Hyundai official owner manual PDF confirms feature and procedure',
      'Genesis official owner manual PDF confirms feature and procedure',
      'Kia official web manual confirms feature and procedure',
      'Official homepage confirms feature existence and official manual/web manual confirms procedure'
    ],
    verifiedFalseRule: [
      'Feature not found in attached PDF or official web manual',
      'Only AI-inferred content exists without official source',
      'Procedure could not be confirmed by official source'
    ],
    levels: {
      official_manual_verified: 'Official PDF/manual confirms model, procedure, and major limitations',
      official_source_verified: 'Official source confirms feature and procedure, but page number or partial metadata remains incomplete',
      pending_verification: 'Official source verification is pending or source is insufficient'
    },
    pageRangeRule: 'pageRange may remain 확인 필요 without forcing verified=false when feature and procedure are confirmed by official source.',
    updatedAt: today
  };
  data.generatedAt = new Date().toISOString();

  await fs.writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  await import(`${pathToFileURL(path.join(siteRoot, 'generate-function-pages.mjs')).href}?verification=${Date.now()}`);
  return { siteRoot, features: data.features.length };
}

console.log(JSON.stringify([
  await updateSite(root),
  await updateSite(path.join(root, 'outputs', 'auto-guide-platform-v2'))
], null, 2));
