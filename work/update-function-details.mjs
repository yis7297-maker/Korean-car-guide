import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'outputs', 'auto-guide-platform-v2', 'function-data.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const features = data.features || data;

const manualFallback = '매뉴얼에서 별도 안내 없음';
const v2lCommon = {
  name: 'V2L',
  summary: '차량의 고전압 배터리를 이용해 전자 기기나 가전 제품에 전원을 공급하는 기능입니다.',
  overview: '전기 사용(Vehicle to Load, V2L)은 차량의 고전압 배터리 전원을 이용해 가전 제품이나 전자 기기를 작동할 수 있게 하는 기능입니다.',
  preconditions: [
    'V2L 기능이 적용된 전기차여야 합니다.',
    '고전압 배터리 충전량이 설정한 방전 제한량보다 높아야 합니다.',
    '사용할 전기 제품과 전원 플러그, V2L 커넥터 또는 실내 전원 패널이 정상 상태여야 합니다.'
  ],
  settings: [
    '인포테인먼트 시스템 홈 화면에서 Electric Vehicle > EV 충전 설정 > 전기 사용(V2L) 설정을 선택합니다.',
    '전기 사용(V2L) 시 방전 제한량을 설정합니다.',
    '방전 제한량은 매뉴얼 기준 20% 이상 80% 이하 범위에서 설정할 수 있습니다.'
  ],
  steps: [
    '전기 사용(V2L) 기능 사용 전 안전 주의사항을 확인합니다.',
    '실내 사용 시 차량 내부 전원 패널 커버를 열고 전원 소켓에 전자 기기의 전원 플러그를 연결합니다.',
    '전원 패널 표시등 또는 클러스터/인포테인먼트 화면에서 전원 공급 상태와 V2L 사용 가능 시간을 확인합니다.',
    '외부 사용 시 V2L 커넥터에 전기 제품 플러그를 연결한 뒤 충전 인렛에 커넥터를 연결하고 전원 스위치를 누릅니다.'
  ],
  disable: [
    '사용을 마치면 연결한 전기 제품의 전원 플러그를 분리합니다.',
    '외부 V2L은 V2L 커넥터 전원 스위치를 끄고 도어 잠금을 해제한 뒤 커넥터를 분리합니다.',
    '실내 V2L 사용 중 시동을 끄면 전기 사용이 중단됩니다.'
  ],
  limitations: [
    '고전압 배터리 충전량이 설정한 방전 제한량에 도달하면 전기 사용이 중지됩니다.',
    '정격 용량을 초과하는 전기 제품을 연결하면 경고가 표시되고 전원 공급이 중단될 수 있습니다.',
    '실내 전기 사용 중 충전 도어를 열거나 V2L 커넥터를 충전 인렛에 연결하면 실내 전기 사용이 자동으로 중단될 수 있습니다.',
    'V2L 커넥터 내부 회로 과열이 감지되면 전기 사용이 자동 차단됩니다.'
  ],
  warnings: [
    'V2L 커넥터, 충전 인렛, 전원 플러그 또는 케이블이 손상·부식된 경우 사용하지 마십시오.',
    'V2L 커넥터와 충전 인렛, 전원 플러그를 젖은 손으로 만지지 마십시오.',
    '차량 내부에서 전열 제품(전기 주전자, 토스터, 다리미 등)을 사용하지 마십시오.',
    'V2L 커넥터를 임의로 개조하거나 분해하지 마십시오.',
    'V2L 커넥터로 차량을 충전하지 마십시오.'
  ],
  verified: {
    complete: true,
    date: '2026-06-30',
    basis: 'official_owner_manual_txt',
    manualFile: 'NE1_2026_ko_KR.pdf',
    brand: 'Hyundai',
    modelCode: 'NE1',
    modelName: '아이오닉 5',
    modelYear: '2026',
    pageRange: '전기차 시작하기 28쪽 인근',
    section: '전기 사용(V2L) 기능 활용하기',
    verifiedBy: 'official-manual-audit'
  },
  verificationLevel: 'official_manual_verified',
  verifiedSource: 'Hyundai Owners Manual',
  verifiedBrand: 'Hyundai',
  verifiedModel: '아이오닉 5',
  verifiedModelYear: '2026',
  verifiedManual: 'NE1_2026_ko_KR.pdf',
  verifiedSection: '전기 사용(V2L) 기능 활용하기',
  verifiedDate: '2026-06-30',
  verifiedBy: 'official-manual-audit'
};

const targets = new Set(['v2l-indoor', 'v2l-parent', 'v2l-outdoor']);
for (const feature of features) {
  if (targets.has(feature.id)) {
    Object.assign(feature, v2lCommon);
    feature.updatedAt = '2026-06-30';
    if (feature.id === 'v2l-indoor') {
      feature.name = '실내 V2L';
      feature.summary = '차량 내부 전원 패널을 통해 고전압 배터리 전원을 전자 기기나 가전 제품에 공급하는 기능입니다.';
      feature.overview = '실내 V2L은 차량 내부 전원 패널을 통해 고전압 배터리 전원을 전자 기기나 가전 기기에 공급하는 기능입니다.';
      feature.steps = [
        '전기 사용(V2L) 기능 사용 전 안전 주의사항을 확인합니다.',
        '차량 내부 전원 패널 커버를 엽니다.',
        '전원 소켓에 전자 기기의 전원 플러그를 연결합니다.',
        '표시등과 클러스터/인포테인먼트 화면에서 전원 공급 상태, V2L 사용 가능 시간, 사용 한도 시점의 주행 가능 거리를 확인합니다.'
      ];
      feature.disable = [
        '사용을 마치면 전자 기기의 전원 플러그를 전원 패널에서 분리합니다.',
        '시동을 끄면 실내 전기 사용이 중단됩니다.'
      ];
      feature.verified.section = '차량 내부에서 전기 사용하기';
      feature.verifiedSection = '차량 내부에서 전기 사용하기';
    }
    if (feature.id === 'v2l-outdoor') {
      feature.name = '실외 V2L';
      feature.summary = '차량 충전 인렛에 V2L 커넥터를 연결해 차량 외부에서 전기 제품에 전원을 공급하는 기능입니다.';
      feature.overview = '실외 V2L은 차량 충전 인렛에 V2L 커넥터를 연결해 차량 외부에서 전기 제품에 전원을 공급하는 기능입니다.';
      feature.steps = [
        'V2L 커넥터의 콘센트 덮개를 엽니다.',
        '연결하려는 제품의 플러그를 커넥터 콘센트에 연결한 후 덮개를 닫습니다.',
        '열림 스위치를 누른 상태로 커넥터의 연결 단자 보호 캡을 엽니다.',
        '충전 도어를 열고 V2L 커넥터를 차량 충전 인렛에 연결합니다.',
        'V2L 커넥터의 전원 스위치를 눌러 전원을 공급합니다.'
      ];
      feature.disable = [
        '전기 제품을 끄고 V2L 커넥터 전원 스위치를 누릅니다.',
        '차량 도어 잠금을 해제한 후 열림 스위치를 누른 상태로 커넥터를 당겨 분리합니다.'
      ];
      feature.verified.section = '차량 외부에서 전기 사용하기';
      feature.verifiedSection = '차량 외부에서 전기 사용하기';
    }
  }

  for (const key of ['preconditions', 'settings', 'steps', 'disable', 'limitations', 'warnings']) {
    if (!Array.isArray(feature[key]) || feature[key].length === 0) feature[key] = [manualFallback];
    feature[key] = feature[key].map(value => String(value || '').trim() || manualFallback);
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log(JSON.stringify({
  updated: [...targets],
  fallbackApplied: features.filter(feature => ['preconditions', 'settings', 'steps', 'disable', 'limitations', 'warnings'].some(key => feature[key]?.includes(manualFallback))).length
}, null, 2));
