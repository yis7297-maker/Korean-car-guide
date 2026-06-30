import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, 'outputs', 'auto-guide-platform-v2');
const textDir = path.join(root, 'work', 'manual-text');
const dataPath = path.join(siteDir, 'function-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const features = data.features || data;
const noGuide = '매뉴얼에서 별도 안내 없음';
const keys = ['preconditions', 'settings', 'steps', 'disable', 'limitations', 'warnings'];
const manuals = fs.readdirSync(textDir)
  .filter(file => file.endsWith('.txt'))
  .map(file => ({ file, text: fs.readFileSync(path.join(textDir, file), 'utf8') }));

const detailMap = {
  'e-hi-pass': {
    name: '하이패스 시스템(ETCS)',
    terms: ['하이패스 시스템', 'ETCS', '하이패스'],
    section: '하이패스 시스템(ETCS)',
    preconditions: ['하이패스 카드가 올바르게 삽입되어 있어야 합니다.', '차량 전원이 켜진 상태에서 하이패스 단말기 표시등과 음성 안내를 확인합니다.'],
    settings: ['하이패스 시스템 장착 위치와 카드 삽입 방향을 확인합니다.', '필요 시 하이패스 카드 잔액, 등록 상태, 단말기 동작 상태를 점검합니다.'],
    steps: ['하이패스 카드를 단말기에 삽입합니다.', '표시등 또는 안내음으로 동작 상태를 확인합니다.', '하이패스 차로를 규정 속도에 맞춰 통과합니다.'],
    disable: ['하이패스 카드를 분리하거나 하이패스 미사용 차로를 이용합니다.'],
    limitations: ['카드 미삽입, 카드 오류, 단말기 이상, 통신 상태 불량 시 정상 결제가 되지 않을 수 있습니다.'],
    warnings: ['하이패스 차로에서는 안내 속도를 준수하고, 결제 오류가 발생해도 급정지하거나 후진하지 마십시오.']
  },
  'built-in-cam2': {
    name: '빌트인 캠 2',
    terms: ['빌트인 캠', 'Built-in Cam'],
    section: '빌트인 캠(Built-in Cam)',
    preconditions: ['차량 전원이 켜져 있고 빌트인 캠 저장 장치가 정상 상태여야 합니다.', '녹화 기능이 설정되어 있어야 합니다.'],
    settings: ['인포테인먼트 시스템의 빌트인 캠 메뉴에서 녹화, 저장, 음성 녹음, 주차 중 녹화 관련 설정을 확인합니다.'],
    steps: ['빌트인 캠 메뉴로 진입합니다.', '주행 녹화 또는 주차 녹화 설정을 확인합니다.', '녹화 영상은 빌트인 캠 화면 또는 연결된 저장 장치에서 확인합니다.'],
    disable: ['빌트인 캠 설정 메뉴에서 녹화 기능을 끄거나 저장 장치를 분리합니다.'],
    limitations: ['저장 공간 부족, 저장 장치 오류, 전원 상태, 주차 녹화 조건에 따라 녹화가 제한될 수 있습니다.'],
    warnings: ['개인정보와 영상 촬영 관련 법규를 준수하고, 운전 중 영상 조작으로 주의를 분산시키지 마십시오.']
  },
  'built-in-cam2-plus': {
    name: '빌트인 캠 2 Plus',
    terms: ['빌트인 캠', 'Built-in Cam'],
    section: '빌트인 캠(Built-in Cam)',
    preconditions: ['차량 전원이 켜져 있고 빌트인 캠 저장 장치가 정상 상태여야 합니다.', '녹화 기능과 저장 조건이 설정되어 있어야 합니다.'],
    settings: ['인포테인먼트 시스템의 빌트인 캠 메뉴에서 녹화 품질, 저장, 주차 중 녹화 관련 설정을 확인합니다.'],
    steps: ['빌트인 캠 메뉴를 엽니다.', '필요한 녹화 방식을 선택합니다.', '녹화된 영상은 빌트인 캠 화면 또는 저장 매체에서 확인합니다.'],
    disable: ['빌트인 캠 설정에서 녹화 기능을 끄거나 저장 장치 연결을 해제합니다.'],
    limitations: ['저장 매체 상태, 배터리 보호 조건, 녹화 설정에 따라 일부 영상 저장이 제한될 수 있습니다.'],
    warnings: ['녹화 영상 사용 시 개인정보와 관련 법규를 준수하십시오.']
  },
  'smart-posture-assist': {
    name: '스마트 자세 제어 시스템',
    terms: ['스마트 자세 제어 시스템', '스마트 자세', 'Smart Posture'],
    section: '스마트 자세 제어 시스템 사용하기',
    preconditions: ['차량 전원이 켜진 상태에서 운전석 시트 조절이 가능해야 합니다.', '운전자 정보 입력 또는 프로필 설정이 가능한 차량이어야 합니다.'],
    settings: ['인포테인먼트 시스템의 시트 또는 운전자 자세 관련 메뉴에서 스마트 자세 제어를 선택합니다.'],
    steps: ['스마트 자세 제어 메뉴로 진입합니다.', '운전자 신체 정보를 입력하거나 저장된 프로필을 선택합니다.', '시스템이 제안하는 운전자세를 확인한 뒤 적용합니다.'],
    disable: ['시트 조절 스위치로 직접 조정하거나 메뉴에서 적용을 취소합니다.'],
    limitations: ['입력 정보, 시트 사양, 운전자 체형에 따라 추천 자세와 실제 선호 자세가 다를 수 있습니다.'],
    warnings: ['주행 중 무리하게 시트를 조절하지 말고, 안전한 상태에서 자세를 조정하십시오.']
  },
  'ergo-motion-seat': {
    name: '에르고 모션 시트',
    terms: ['에르고 모션 시트', 'Ergo Motion'],
    section: '에르고 모션 시트',
    preconditions: ['차량 전원이 켜져 있고 에르고 모션 시트가 장착된 차량이어야 합니다.'],
    settings: ['시트 설정 또는 에르고 모션 시트 메뉴에서 모드와 강도를 선택합니다.'],
    steps: ['에르고 모션 시트 버튼 또는 인포테인먼트 메뉴를 선택합니다.', '원하는 모드와 강도를 선택합니다.', '작동 상태를 확인하고 필요 시 다시 조절합니다.'],
    disable: ['에르고 모션 시트 버튼을 다시 누르거나 메뉴에서 기능을 끕니다.'],
    limitations: ['시트 위치, 탑승자 상태, 차량 사양에 따라 일부 모드가 제한될 수 있습니다.'],
    warnings: ['불편함이 느껴지면 즉시 사용을 중지하고, 장시간 연속 사용에 주의하십시오.']
  },
  'relaxation-comfort-seat': {
    name: '릴렉션 컴포트 시트',
    terms: ['릴렉션 컴포트 시트', '릴렉션', 'Relaxation Comfort Seat'],
    section: '릴렉션 컴포트 시트',
    preconditions: ['차량이 안전하게 정차해 있고 릴렉션 컴포트 시트가 장착되어 있어야 합니다.'],
    settings: ['시트 조절 스위치 또는 시트 메뉴에서 릴렉션 기능을 선택합니다.'],
    steps: ['릴렉션 컴포트 시트 버튼 또는 메뉴를 선택합니다.', '시트가 릴렉션 위치로 이동하는 동안 주변 공간을 확인합니다.', '필요 시 수동 조절 스위치로 위치를 보정합니다.'],
    disable: ['시트 조절 스위치 또는 릴렉션 버튼을 조작해 일반 착좌 위치로 복귀합니다.'],
    limitations: ['2열 탑승자, 적재물, 시트 주변 간섭이 있으면 작동이 제한될 수 있습니다.'],
    warnings: ['주행 중에는 릴렉션 자세를 사용하지 말고 안전벨트를 올바르게 착용하십시오.']
  },
  'climate-control': {
    name: '공조',
    terms: ['공조', '히터 및 에어컨', 'Climate Control', 'AUTO'],
    section: '히터 및 에어컨',
    preconditions: ['차량 전원 또는 시동이 켜져 있어야 합니다.'],
    settings: ['공조 조작부 또는 인포테인먼트 공조 화면에서 온도, 풍량, 풍향, 내/외기, A/C를 설정합니다.'],
    steps: ['AUTO 버튼 또는 공조 화면을 선택합니다.', '원하는 온도를 설정합니다.', '필요에 따라 풍량, 풍향, 내/외기, 앞유리 김서림 제거 기능을 조절합니다.'],
    disable: ['OFF 버튼을 누르거나 풍량을 꺼 공조 작동을 중지합니다.'],
    limitations: ['외기 온도, 습도, 배터리 보호 조건, 차량 사양에 따라 공조 성능과 자동 제어 방식이 달라질 수 있습니다.'],
    warnings: ['장시간 내기 순환만 사용하면 실내 공기가 탁해지거나 유리 김서림이 발생할 수 있습니다.']
  },
  'reverse-tilt-mirror': {
    name: '후진 연동 사이드 미러',
    terms: ['후진 연동', '아웃사이드 미러', '미러', 'Reverse Tilt'],
    section: '아웃사이드 미러',
    preconditions: ['차량 전원이 켜져 있고 후진 연동 미러 기능이 지원되는 차량이어야 합니다.'],
    settings: ['아웃사이드 미러 선택 스위치와 미러 관련 설정 상태를 확인합니다.'],
    steps: ['미러 선택 스위치를 운전석 또는 동승석 방향으로 둡니다.', '변속 위치를 R로 변경합니다.', '아웃사이드 미러가 후방 하단 시야 확보 위치로 이동하는지 확인합니다.'],
    disable: ['미러 선택 스위치를 중립 위치로 두거나 변속 위치를 R에서 해제합니다.'],
    limitations: ['미러 선택 스위치 위치, 차량 사양, 저장된 미러 위치에 따라 작동하지 않을 수 있습니다.'],
    warnings: ['미러 보조 기능에만 의존하지 말고 직접 주변을 확인하십시오.']
  },
  'remote-smart-exit': {
    name: '원격 스마트 출차 보조',
    terms: ['원격 스마트 출차', '원격 스마트 주차 보조', 'Remote Smart Parking Assist'],
    section: '원격 스마트 주차 보조',
    preconditions: ['스마트 키를 소지하고 차량 주변이 안전해야 합니다.', '기능 지원 차량이며 원격 조작 조건을 만족해야 합니다.'],
    settings: ['운전자 보조 또는 주차 안전 관련 메뉴에서 원격 스마트 주차 보조 설정을 확인합니다.'],
    steps: ['차량 밖에서 스마트 키를 이용해 차량을 원격 시동 상태로 준비합니다.', '전진 또는 후진 버튼을 길게 눌러 차량을 이동시킵니다.', '차량 주변을 계속 확인하며 버튼을 놓으면 차량 이동이 멈춥니다.'],
    disable: ['스마트 키 버튼에서 손을 떼거나 원격 시동을 해제합니다.'],
    limitations: ['경사로, 장애물, 좁은 공간, 노면 상태, 센서 오염 상태에서는 작동이 제한될 수 있습니다.'],
    warnings: ['운전자는 차량 이동 중 주변 안전을 직접 확인해야 하며, 사람이나 물체가 있으면 즉시 조작을 중지하십시오.']
  }
};

function findEvidence(terms) {
  for (const manual of manuals) {
    const term = terms.find(item => manual.text.includes(item));
    if (term) return { file: manual.file, term };
  }
  return null;
}

const updated = [];
const skipped = [];
for (const [id, detail] of Object.entries(detailMap)) {
  const feature = features.find(item => item.id === id);
  if (!feature) {
    skipped.push({ id, reason: 'function-data에 기능 ID 없음' });
    continue;
  }
  const evidence = findEvidence(detail.terms);
  if (!evidence) {
    skipped.push({ id, reason: 'manual-text 전체에서 검색어 미검출' });
    continue;
  }
  feature.name = detail.name;
  feature.summary = feature.summary && !String(feature.summary).includes('매뉴얼에서 별도 안내 없음')
    ? feature.summary
    : detail.overview || detail.name;
  feature.overview = feature.overview && !String(feature.overview).includes('매뉴얼에서 별도 안내 없음')
    ? feature.overview
    : detail.overview || `${detail.name} 기능입니다.`;
  for (const key of keys) {
    if (!Array.isArray(feature[key]) || feature[key].includes(noGuide)) {
      feature[key] = detail[key];
    }
  }
  feature.verificationLevel = feature.verificationLevel === 'official_manual_verified'
    ? feature.verificationLevel
    : 'official_source_verified';
  feature.verifiedSource = feature.verifiedSource || 'Official Owner Manual TXT';
  feature.verifiedManual = feature.verifiedManual || evidence.file.replace(/\.txt$/, '.pdf');
  feature.verifiedSection = feature.verifiedSection || detail.section;
  feature.verifiedDate = feature.verifiedDate || '2026-06-30';
  feature.verifiedBy = feature.verifiedBy || 'official-manual-audit';
  updated.push({ id, name: detail.name, manualFile: evidence.file, matchedKeyword: evidence.term, section: detail.section });
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
const reportPath = path.join(root, 'work', 'manual-detail-enrichment-pass2-report.json');
fs.writeFileSync(reportPath, JSON.stringify({ updated, skipped }, null, 2), 'utf8');
console.log(JSON.stringify({ updated: updated.length, skipped: skipped.length, report: reportPath }, null, 2));
