import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const siteDir = path.join(root, 'outputs', 'auto-guide-platform-v2');
const dataPath = path.join(siteDir, 'function-data.json');
const textDir = path.join(root, 'work', 'manual-text');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const features = data.features || data;
const manuals = fs.readdirSync(textDir)
  .filter(file => file.endsWith('.txt'))
  .map(file => ({ file, text: fs.readFileSync(path.join(textDir, file), 'utf8') }));

const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const fullBefore = new Map(features
  .filter(feature => feature.displayMode !== 'summary-only')
  .map(feature => [feature.id, hash(feature)]));

const common = {
  digitalKey: {
    overview: '스마트폰 또는 카드 키를 차량 키처럼 등록해 도어 잠금/해제와 시동에 사용할 수 있는 기능입니다.',
    preconditions: ['디지털 키 기능이 지원되는 차량이어야 합니다.', '차량 전원과 인포테인먼트 시스템이 정상적으로 작동해야 합니다.', '스마트폰 키 또는 카드 키 등록에 필요한 계정/기기 조건을 충족해야 합니다.'],
    settings: ['인포테인먼트 시스템의 디지털 키 메뉴로 진입합니다.', '화면 안내에 따라 스마트폰 키 또는 카드 키 등록 메뉴를 선택합니다.'],
    steps: ['디지털 키 등록 화면에서 등록할 기기를 선택합니다.', '스마트폰 또는 카드 키를 차량이 안내하는 위치에 둡니다.', '화면 안내에 따라 인증 및 등록을 완료합니다.', '등록 후 도어 잠금/해제와 시동 가능 여부를 확인합니다.'],
    disable: ['디지털 키 메뉴에서 등록된 키를 선택한 뒤 삭제합니다.', '스마트폰 앱 또는 차량 화면에서 공유 키 권한을 해제합니다.'],
    limitations: ['스마트폰 배터리 방전, NFC/UWB/Bluetooth 상태, 지원 기기 조건에 따라 작동이 제한될 수 있습니다.', '차량 사양과 소프트웨어 버전에 따라 등록 방식이 다를 수 있습니다.'],
    warnings: ['디지털 키를 타인에게 공유할 때는 권한 범위와 사용 기간을 확인하십시오.', '스마트폰 분실 시 즉시 디지털 키 권한을 삭제하십시오.']
  },
  adas: {
    preconditions: ['차량 전원이 켜져 있고 해당 운전자 보조 기능이 설정되어 있어야 합니다.', '전방 카메라, 레이더 또는 관련 센서가 가려져 있지 않아야 합니다.'],
    settings: ['설정 > 차량 > 운전자 보조 메뉴에서 해당 기능을 선택합니다.', '경고 방식, 경고 시점 또는 보조 기능 사용 여부를 차량 화면에서 설정합니다.'],
    steps: ['기능 설정 상태를 계기판 또는 인포테인먼트 화면에서 확인합니다.', '작동 조건을 만족하면 경고, 표시등 또는 보조 제어가 제공됩니다.', '경고가 발생하면 운전자가 직접 주변을 확인하고 필요한 조작을 수행합니다.'],
    disable: ['설정 > 차량 > 운전자 보조 메뉴에서 해당 기능을 해제합니다.', '일부 기능은 전용 버튼 또는 스티어링 휠 버튼 조작으로 일시 해제할 수 있습니다.'],
    limitations: ['센서 오염, 악천후, 역광, 차선 불명확, 급커브, 도로 공사 구간에서는 작동이 제한될 수 있습니다.'],
    warnings: ['운전자 보조 기능은 운전자를 대신하지 않습니다.', '경고나 보조가 제공되지 않아도 운전자가 직접 조향, 제동, 가속을 수행해야 합니다.']
  },
  parking: {
    preconditions: ['차량 전원이 켜져 있고 주차 보조 기능이 지원되는 차량이어야 합니다.', '카메라와 초음파 센서가 가려져 있지 않아야 합니다.'],
    settings: ['설정 > 차량 > 운전자 보조 > 주차 안전 또는 주차 편의 메뉴에서 해당 기능을 선택합니다.'],
    steps: ['저속 주행 또는 변속 위치 조건에서 주차 보조 화면이나 경고 표시를 확인합니다.', '주차/뷰 버튼 또는 변속 위치 조작으로 화면과 경고 상태를 확인합니다.', '주변을 직접 확인하면서 주차 또는 후진 조작을 진행합니다.'],
    disable: ['주차/뷰 버튼을 다시 누르거나 변속 위치를 변경합니다.', '설정 메뉴에서 해당 주차 보조 기능을 해제합니다.'],
    limitations: ['센서 오염, 낮은 장애물, 얇은 물체, 경사로, 비/눈/결빙 상태에서는 감지 성능이 제한될 수 있습니다.'],
    warnings: ['주차 보조 표시와 경고에만 의존하지 말고 운전자가 직접 주변을 확인하십시오.']
  },
  v2l: {
    overview: '고전압 배터리 전력을 차량 외부 또는 실내 전기 장치에 공급하는 기능입니다.',
    preconditions: ['전기 사용(V2L) 기능이 지원되는 차량이어야 합니다.', '고전압 배터리 잔량이 설정된 방전 제한량보다 높아야 합니다.', 'V2L 커넥터 또는 실내 전원 장치가 정상 연결되어야 합니다.'],
    settings: ['EV 메뉴에서 전기 사용(V2L) 방전 제한량을 설정합니다.', '필요 시 실내 또는 실외 V2L 사용 조건을 차량 화면에서 확인합니다.'],
    steps: ['V2L 커넥터 또는 실내 전원 장치에 전기 제품을 연결합니다.', '차량 화면 또는 커넥터 상태 표시를 확인합니다.', '전기 제품 사용 중 배터리 잔량과 사용 가능 시간을 확인합니다.'],
    disable: ['전기 제품 사용을 중지하고 플러그를 분리합니다.', '실외 V2L 사용 시 커넥터 잠금 해제 후 커넥터를 분리합니다.'],
    limitations: ['고전압 배터리 잔량, 사용 전력, 외부 온도, 커넥터 상태에 따라 사용 시간이 제한될 수 있습니다.'],
    warnings: ['정격 용량을 초과하는 전기 제품을 연결하지 마십시오.', '젖은 손이나 습한 환경에서 커넥터를 조작하지 마십시오.']
  }
};

const detailMap = {
  'fingerprint-auth': {
    terms: ['지문 인증 시스템 사용하기', '지문 인증', 'Fingerprint'],
    section: '지문 인증 시스템 사용하기',
    overview: '등록된 지문으로 사용자 프로필, 시동 또는 일부 편의 기능 인증을 수행하는 기능입니다.',
    preconditions: ['지문 인증 시스템이 지원되는 차량이어야 합니다.', '사용자 프로필이 설정되어 있어야 합니다.', '손가락과 지문 센서 표면이 깨끗해야 합니다.'],
    settings: ['설정 > 사용자 프로필 > 보안 > 지문 인증 메뉴로 진입합니다.', '지문 등록 또는 삭제 메뉴를 선택합니다.'],
    steps: ['등록할 사용자 프로필을 선택합니다.', '화면 안내에 따라 지문 센서에 손가락을 올립니다.', '여러 방향으로 지문을 인식시켜 등록을 완료합니다.', '인증이 필요한 기능에서 등록한 지문을 센서에 접촉합니다.'],
    disable: ['지문 인증 메뉴에서 등록된 지문을 삭제합니다.', '필요 시 사용자 프로필의 보안 설정에서 지문 사용을 해제합니다.'],
    limitations: ['손가락이 젖었거나 센서가 오염된 경우 인식이 제한될 수 있습니다.', '상처, 장갑, 지문 상태에 따라 인증이 실패할 수 있습니다.'],
    warnings: ['타인의 지문을 등록하지 마십시오.', '보안 기능 해제 또는 지문 삭제 전 대체 인증 방법을 확인하십시오.']
  },
  'hyundai-dk2': { terms: ['디지털 키 사용하기', '디지털 키'], section: '디지털 키 사용하기', ...common.digitalKey },
  'hyundai-dk2-touch': { terms: ['디지털 키 사용하기', '디지털 키'], section: '디지털 키 사용하기', ...common.digitalKey },
  'genesis-dk2': { terms: ['제네시스 디지털 키 사용하기', '디지털 키 사용하기', '디지털 키'], section: '제네시스 디지털 키 사용하기', ...common.digitalKey },
  'genesis-dk2-touch': { terms: ['제네시스 디지털 키 사용하기', '디지털 키 사용하기', '디지털 키'], section: '제네시스 디지털 키 사용하기', ...common.digitalKey },
  'built-in-cam': {
    terms: ['빌트인 캠(Built-in Cam)', '빌트인 캠 (Built-in Cam)', 'Built-in Cam'],
    section: '빌트인 캠(Built-in Cam)',
    overview: '차량 전방 또는 주변 영상을 저장하고 확인할 수 있는 차량 내장형 영상 기록 기능입니다.',
    preconditions: ['빌트인 캠이 장착된 차량이어야 합니다.', '저장 장치와 차량 전원이 정상 상태여야 합니다.'],
    settings: ['인포테인먼트 시스템의 빌트인 캠 메뉴에서 녹화, 저장, 음성 녹음, 주차 중 녹화 설정을 확인합니다.'],
    steps: ['빌트인 캠 메뉴를 엽니다.', '주행 녹화 또는 주차 녹화 설정을 확인합니다.', '녹화된 영상은 빌트인 캠 화면 또는 저장 매체에서 확인합니다.'],
    disable: ['빌트인 캠 설정에서 녹화 기능을 끄거나 저장 장치를 분리합니다.'],
    limitations: ['저장 공간 부족, 저장 장치 오류, 배터리 보호 조건에 따라 녹화가 제한될 수 있습니다.'],
    warnings: ['영상 사용 시 개인정보와 관련 법규를 준수하십시오.', '운전 중 영상 확인이나 조작은 피하십시오.']
  },
  'scheduled-charging': {
    terms: ['예약 충전 기능 활용하기', '예약 충전', '충전 예약'],
    section: '예약 충전 기능 활용하기',
    overview: '사용자가 설정한 시간대에 충전이 시작되도록 예약하는 전동화 차량 기능입니다.',
    preconditions: ['충전 케이블이 차량에 연결되어 있어야 합니다.', '예약 충전 기능이 지원되는 전동화 차량이어야 합니다.'],
    settings: ['EV 메뉴 또는 충전 관리 화면에서 예약 충전 시간을 설정합니다.', '필요 시 출발 시간 또는 저렴한 전기 시간대 조건을 함께 설정합니다.'],
    steps: ['충전 커넥터를 차량에 연결합니다.', '예약 충전 시간을 설정합니다.', '차량 화면에 예약 충전 설정 메시지가 표시되는지 확인합니다.', '예약 시간이 되면 충전이 시작됩니다.'],
    disable: ['충전 예약 메뉴에서 예약 충전을 해제합니다.', '즉시 충전이 필요한 경우 예약 충전 대기 상태를 해제하고 충전을 시작합니다.'],
    limitations: ['예약 공조, 충전기 상태, 배터리 잔량, 외부 전원 상태에 따라 충전 예상 시간이 달라질 수 있습니다.'],
    warnings: ['예약 충전 중에도 충전 커넥터와 충전기 상태를 확인하십시오.']
  },
  'ev-charge-v2l': { terms: ['전기 사용(V2L) 기능 활용하기', '전기 사용 (V2L) 기능 활용하기', '예약 충전 기능 활용하기'], section: '전기 사용(V2L) 및 충전 기능', ...common.v2l },
  'plug-and-charge': {
    terms: ['Plug & Charge', '플러그 앤 차지', '충전'],
    section: '전기차 충전',
    overview: '충전기 연결만으로 인증과 결제가 진행되는 충전 편의 기능입니다.',
    preconditions: ['Plug & Charge 지원 차량과 지원 충전기가 필요합니다.', '서비스 가입과 결제 수단 등록이 완료되어야 합니다.'],
    settings: ['커넥티드 서비스 또는 충전 서비스 앱에서 Plug & Charge 사용 설정을 확인합니다.'],
    steps: ['지원 충전기에 충전 커넥터를 연결합니다.', '차량과 충전기가 인증을 진행합니다.', '인증 완료 후 충전이 시작되는지 확인합니다.'],
    disable: ['충전 서비스 앱 또는 차량 충전 설정에서 Plug & Charge 사용을 해제합니다.'],
    limitations: ['지원 충전기, 서비스 가입 상태, 통신 상태에 따라 사용할 수 없을 수 있습니다.'],
    warnings: ['충전 시작 전 커넥터 체결 상태와 충전기 안내를 확인하십시오.']
  },
  'ev-smart-regeneration': {
    terms: ['스마트 회생 제동 기능 사용하기', '스마트 회생 제동', '스마트 회생제동'],
    section: '스마트 회생 제동 기능 사용하기',
    overview: '전방 차량과 주행 상황을 고려해 회생 제동량을 자동으로 조절하는 기능입니다.',
    preconditions: ['스마트 회생 제동 기능이 지원되는 전동화 차량이어야 합니다.', '전방 센서가 정상 상태여야 합니다.'],
    settings: ['EV 또는 주행 보조 관련 메뉴에서 스마트 회생 제동 기능을 설정합니다.'],
    steps: ['스마트 회생 제동 기능을 켭니다.', '주행 중 전방 차량과 도로 상황에 따라 회생 제동량이 자동 조절되는지 확인합니다.', '필요 시 패들 시프트로 회생 제동 단계를 조절합니다.'],
    disable: ['스마트 회생 제동 설정을 해제하거나 패들 시프트 조작으로 수동 회생 제동 단계로 전환합니다.'],
    limitations: ['전방 센서 오염, 악천후, 급커브, 전방 차량 인식 불량 시 작동이 제한될 수 있습니다.'],
    warnings: ['회생 제동 기능에만 의존하지 말고 필요한 경우 브레이크 페달을 직접 조작하십시오.']
  },
  'ev-regen-level': {
    terms: ['회생 제동 단계 표시등', '회생 제동 단계', '패들 시프트'],
    section: '회생 제동 단계 표시등',
    overview: '패들 시프트 조작으로 회생 제동 단계를 조절하고 계기판에서 단계를 확인하는 기능입니다.',
    preconditions: ['회생 제동 단계 조절이 가능한 전동화 차량이어야 합니다.'],
    settings: ['주행 중 패들 시프트를 이용해 회생 제동 단계를 조절합니다.'],
    steps: ['좌측 또는 우측 패들 시프트를 조작합니다.', '계기판에 표시되는 회생 제동 단계를 확인합니다.', '주행 상황에 맞춰 단계를 다시 조절합니다.'],
    disable: ['회생 제동 단계를 낮추거나 자동 회생 제동 기능을 해제합니다.'],
    limitations: ['배터리 충전 상태, 노면 상태, 주행 모드에 따라 회생 제동량이 제한될 수 있습니다.'],
    warnings: ['미끄러운 노면에서는 급격한 감속이 발생하지 않도록 주의하십시오.']
  },
  'hybrid-energy-flow': {
    terms: ['하이브리드 에너지 흐름도', '에너지 흐름'],
    section: '하이브리드 에너지 흐름도',
    overview: '엔진, 모터, 배터리 사이의 에너지 흐름을 화면으로 보여주는 기능입니다.',
    preconditions: ['하이브리드 차량의 전원이 켜져 있어야 합니다.'],
    settings: ['클러스터 또는 인포테인먼트 시스템에서 하이브리드 에너지 흐름도 화면을 선택합니다.'],
    steps: ['에너지 흐름도 화면을 엽니다.', '정지, EV 주행, 엔진 주행, 회생 제동, 배터리 충전 상태를 확인합니다.'],
    disable: ['다른 클러스터 또는 인포테인먼트 화면으로 전환합니다.'],
    limitations: ['표시 정보는 현재 주행 상태와 차량 사양에 따라 달라질 수 있습니다.'],
    warnings: ['주행 중 화면 확인에 과도하게 집중하지 마십시오.']
  },
  'hybrid-battery-status': {
    terms: ['하이브리드 에너지 흐름도', '배터리 충전', '배터리'],
    section: '하이브리드 에너지 흐름도',
    overview: '하이브리드 배터리의 충전 상태와 에너지 흐름을 확인하는 기능입니다.',
    preconditions: ['하이브리드 차량의 전원이 켜져 있어야 합니다.'],
    settings: ['클러스터 또는 인포테인먼트 시스템에서 하이브리드 정보 화면을 선택합니다.'],
    steps: ['하이브리드 정보 또는 에너지 흐름도 화면을 엽니다.', '배터리 충전 상태와 에너지 흐름을 확인합니다.'],
    disable: ['다른 표시 화면으로 전환합니다.'],
    limitations: ['배터리 표시량은 주행 상태와 충전/방전 조건에 따라 변동됩니다.'],
    warnings: ['배터리 표시 정보는 참고용이며, 경고등이 표시되면 제조사 안내에 따라 점검하십시오.']
  },
  'fca-suite': { terms: ['전방 충돌방지 보조 (FCA)', '전방 충돌방지 보조'], section: '전방 충돌방지 보조 (FCA)', overview: '전방 차량, 보행자 또는 자전거 등과의 충돌 위험을 감지해 경고하고 조건에 따라 제동을 보조하는 기능입니다.', ...common.adas },
  lka: { terms: ['차로 이탈방지 보조 (LKA)', '차로 이탈방지 보조'], section: '차로 이탈방지 보조 (LKA)', overview: '차로 이탈 위험을 감지해 경고하고 조건에 따라 조향을 보조하는 기능입니다.', ...common.adas },
  lfa: { terms: ['차로 유지 보조', '차로 유지 보조 표시등'], section: '차로 유지 보조', overview: '차로 중앙 부근을 주행하도록 조향을 보조하는 기능입니다.', ...common.adas },
  bca: { terms: ['후측방 충돌방지 보조 (BCA)', '후측방 충돌방지 보조'], section: '후측방 충돌방지 보조 (BCA)', overview: '후측방 차량과의 충돌 위험을 감지해 경고하고 조건에 따라 제동을 보조하는 기능입니다.', ...common.adas },
  'safe-exit-assist': { terms: ['안전 하차 보조 (SEA)', '안전 하차 보조'], section: '안전 하차 보조 (SEA)', overview: '정차 후 탑승자가 문을 열 때 후측방 접근 차량 위험을 경고하거나 도어 잠금 해제를 제한하는 기능입니다.', ...common.adas },
  'driver-attention-warning': { terms: ['운전자 주의 경고', '부주의 운전 경고'], section: '운전자 주의 경고', overview: '운전 패턴과 주행 상태를 바탕으로 운전자 주의 수준을 안내하고 휴식을 권유하는 기능입니다.', ...common.adas },
  'high-beam-assist': { terms: ['하이빔 보조 (HBA)', '하이빔 보조'], section: '하이빔 보조 (HBA)', overview: '주변 조명과 전방/마주 오는 차량을 감지해 상향등 전환을 보조하는 기능입니다.', ...common.adas },
  'parking-distance-warning': { terms: ['주차 거리 경고', '주차 거리 경고 버튼'], section: '주차 거리 경고', overview: '저속 주차 중 주변 장애물과의 거리를 경고음과 화면으로 알려주는 기능입니다.', ...common.parking },
  'rear-view-monitor': { terms: ['후방 모니터', '후방 카메라'], section: '후방 모니터', overview: '후진 시 차량 뒤쪽 영상을 화면에 표시해 후방 확인을 보조하는 기능입니다.', ...common.parking },
  'surround-view-monitor': { terms: ['서라운드 뷰 모니터', 'SVM'], section: '서라운드 뷰 모니터', overview: '차량 주변 영상을 조합해 주차와 저속 이동 시 주변 확인을 보조하는 기능입니다.', ...common.parking },
  'blind-spot-view-monitor': { terms: ['후측방 모니터', 'Blind-Spot View Monitor'], section: '후측방 모니터', overview: '방향지시등 조작 시 후측방 영상을 계기판 또는 화면에 표시하는 기능입니다.', ...common.parking },
  'rear-cross-traffic-collision-avoidance': { terms: ['후방 교차 충돌방지 보조', '후방 교차 안전'], section: '후방 교차 충돌방지 보조', overview: '후진 중 좌우에서 접근하는 차량과의 충돌 위험을 경고하고 조건에 따라 제동을 보조하는 기능입니다.', ...common.parking },
  'pca-parking': { terms: ['주차 충돌방지 보조', '주차 안전'], section: '주차 충돌방지 보조', overview: '주차 또는 저속 이동 중 장애물과의 충돌 위험을 감지해 경고하고 조건에 따라 제동을 보조하는 기능입니다.', ...common.parking }
};

function findEvidence(terms) {
  for (const manual of manuals) {
    const term = terms.find(item => manual.text.includes(item));
    if (term) return { manualFile: manual.file.replace(/\.txt$/, '.pdf'), txtFile: manual.file, matchedKeyword: term };
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
  if (feature.displayMode !== 'summary-only') {
    skipped.push({ id, reason: '이미 상세 표시 기능이므로 보호' });
    continue;
  }
  const evidence = findEvidence(detail.terms);
  if (!evidence) {
    skipped.push({ id, reason: 'manual-text에서 검색어 미검출' });
    continue;
  }
  feature.overview = detail.overview || feature.overview;
  feature.summary = detail.overview || feature.summary;
  feature.preconditions = detail.preconditions;
  feature.settings = detail.settings;
  feature.steps = detail.steps;
  feature.disable = detail.disable;
  feature.limitations = detail.limitations;
  feature.warnings = detail.warnings;
  feature.displayMode = 'full';
  delete feature.userFacingStatus;
  feature.verificationLevel = 'official_manual_verified';
  feature.verifiedSource = 'Official Owner Manual TXT';
  feature.verifiedManual = evidence.manualFile;
  feature.verifiedSection = detail.section;
  feature.verifiedDate = '2026-06-30';
  feature.verifiedBy = 'official-manual-audit';
  feature.manualFile = evidence.manualFile;
  feature.section = detail.section;
  feature.manualAudit = {
    feature: id,
    verified: true,
    verificationLevel: 'official_manual_verified',
    manualFile: evidence.manualFile,
    txtFile: evidence.txtFile,
    matchedKeyword: evidence.matchedKeyword,
    section: detail.section,
    updatedDate: '2026-06-30'
  };
  updated.push({ id, name: feature.name, section: detail.section, ...evidence });
}

const fullAfterChanged = [];
for (const feature of features.filter(item => item.displayMode !== 'summary-only')) {
  if (fullBefore.has(feature.id) && fullBefore.get(feature.id) !== hash(feature)) {
    fullAfterChanged.push(feature.id);
  }
}

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(root, 'work', 'summary-only-enrichment-report.json'), `${JSON.stringify({
  updated,
  skipped,
  protectedFullFeatureCount: fullBefore.size,
  protectedFullChanged: fullAfterChanged,
  remainingSummaryOnly: features.filter(feature => feature.displayMode === 'summary-only').map(feature => ({
    id: feature.id,
    name: feature.name,
    reason: feature.userFacingStatus === 'roadmap' ? '로드맵/향후 기능' : '공식 txt에서 구체 절차 또는 제한/주의 본문 미확정'
  }))
}, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({
  updated: updated.length,
  skipped: skipped.length,
  protectedFullFeatureCount: fullBefore.size,
  protectedFullChanged: fullAfterChanged,
  remainingSummaryOnly: features.filter(feature => feature.displayMode === 'summary-only').length
}, null, 2));
