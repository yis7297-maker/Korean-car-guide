/* 2026-06-22 feature-family expansion and monetization-ready layout */
const expansionSources = {
  hyundai: ['hyundaiCatalog', 'hyundaiManual'],
  kia: ['kiaCatalog', 'kiaManual'],
  genesis: ['genesisCatalog']
};

const hyEvIds = ids('아이오닉 5', '아이오닉 6', '아이오닉 9', '캐스퍼 일렉트릭');
const kiaEvIds = ids('EV3', 'EV4', 'EV5', 'EV6', 'EV9');
const genesisEvIds = ids('GV60');
const currentEvIds = [...hyEvIds, ...kiaEvIds, ...genesisEvIds];
const largeFamilyIds = ids('아이오닉 9', '팰리세이드', '스타리아', '카니발', 'EV9', 'G90', 'GV80');
const otaFeature = features.find(item => item.id === 'ccnc-ota');
if (otaFeature && !otaFeature.aliases.includes('OTA Update')) otaFeature.aliases.push('OTA Update');

function addExpandedFeature(config) {
  if (features.some(item => item.id === config.id)) return;
  features.push(F({
    aliases: [], preconditions: [],
    steps: [],
    disable: [],
    limitations: [],
    warnings: [],
    related: [], sources: ['hyundaiCatalog', 'kiaCatalog', 'genesisCatalog'], verify: verify(config.verified !== false),
    generation: { family: config.parent || config.category, generation: config.name, previous: [], differences: config.summary },
    ...config
  }));
}

const expandedFeatures = [
  {id:'plug-and-charge',name:'Plug & Charge',parent:'전동화',category:'전동화/충전',officialCategory:'EV / 충전',summary:'지원 급속 충전기에서 차량 인증과 결제를 자동으로 연계합니다.',applies:apply([...hyEvIds,...kiaEvIds,...genesisEvIds],'지원 차종/서비스 가입 필요','차종별 상이'),related:['EV Route Planner','충전 예약']},
  {id:'iccu-energy-control',name:'ICCU 에너지 변환 / 충전 제어',parent:'전동화',category:'전동화/충전',officialCategory:'EV / 전력 변환',summary:'고전압 배터리 충전과 12V 보조 배터리 충전, 외부 전력 공급에 필요한 전력 변환을 관리합니다.',applies:apply(currentEvIds,'전동화 전용','기본 시스템'),related:['실내 V2L','실외 V2L']},
  {id:'ev-route-planner',name:'EV Route Planner',parent:'전동화',category:'전동화/충전',officialCategory:'EV / 내비게이션',aliases:['EV 경로 플래너','전기차 경로 안내'],summary:'목적지까지의 배터리 잔량과 충전소 경유를 고려해 경로를 안내합니다.',applies:apply(currentEvIds,'지원 내비게이션 적용 차종','차종별 상이'),related:['Battery Conditioning','Plug & Charge']},
  {id:'battery-conditioning',name:'Battery Conditioning',parent:'전동화',category:'전동화/충전',officialCategory:'EV / 배터리 관리',aliases:['배터리 컨디셔닝'],summary:'급속 충전 또는 저온 주행에 적합하도록 고전압 배터리 온도를 조절합니다.',applies:apply(currentEvIds,'지원 전동화 차종','차종별 상이'),related:['EV Route Planner','충전 예약']},
  {id:'scheduled-charging',name:'충전 예약',parent:'전동화',category:'전동화/충전',officialCategory:'EV / 충전 설정',summary:'원하는 시간대에 충전이 시작되도록 예약합니다.',applies:apply(currentEvIds,'전동화 전용','기본/앱 연동'),related:['충전 한도 설정','Battery Conditioning']},
  {id:'charge-limit',name:'충전 한도 설정',parent:'전동화',category:'전동화/충전',officialCategory:'EV / 충전 설정',summary:'AC/DC 충전 시 목표 배터리 충전량을 설정합니다.',applies:apply(currentEvIds,'전동화 전용','기본 사양'),related:['충전 예약']},
  {id:'v2l-parent',name:'V2L',parent:'전동화',category:'전동화/충전',officialCategory:'EV / 전력 공급',summary:'고전압 배터리 전력을 외부 전기기기에 공급하는 기능군입니다.',applies:apply([...hyEvIds,...kiaEvIds,...genesisEvIds],'V2L 지원 차종','차종/트림별 상이'),related:['실내 V2L','실외 V2L']},
  {id:'v2l-indoor',name:'실내 V2L',parent:'V2L',category:'전동화/충전',officialCategory:'EV / 실내 전력 공급',summary:'차량 실내 콘센트로 전기기기에 전력을 공급합니다.',applies:apply(ids('아이오닉 5','아이오닉 6','아이오닉 9','EV6','EV9','GV60'),'지원 트림','차종별 상이'),related:['V2L','실외 V2L']},
  {id:'v2l-outdoor',name:'실외 V2L',parent:'V2L',category:'전동화/충전',officialCategory:'EV / 외부 전력 공급',summary:'충전구와 V2L 커넥터를 이용해 외부 전기기기에 전력을 공급합니다.',applies:apply([...hyEvIds,...kiaEvIds,...genesisEvIds],'V2L 지원 차종','커넥터 필요'),related:['V2L','실내 V2L']},
  {id:'camping-mode',name:'캠핑 모드',parent:'전동화',category:'전동화/충전',officialCategory:'EV / 정차 편의',summary:'정차 중 전기장치와 공조를 활용할 수 있도록 차량 전원을 관리합니다.',applies:apply(ids('아이오닉 9','EV9'),'지원 차종/소프트웨어','차종별 상이'),related:['유틸리티 모드','실내 V2L']},
  {id:'utility-mode',name:'유틸리티 모드',parent:'전동화',category:'전동화/충전',officialCategory:'EV / 정차 편의',summary:'주행 불가 상태에서 고전압 배터리로 차량 전장과 공조를 사용할 수 있게 합니다.',applies:apply(currentEvIds,'전동화 전용','기본 사양'),related:['캠핑 모드','실내 V2L']},
  {id:'v2h-roadmap',name:'V2H (향후)',parent:'전동화 로드맵',category:'전동화/충전',officialCategory:'향후 에너지 연계',summary:'차량 배터리 전력을 가정에 공급하는 향후 연계 기능입니다.',applies:[],verified:false,related:['V2G (향후)']},
  {id:'v2g-roadmap',name:'V2G (향후)',parent:'전동화 로드맵',category:'전동화/충전',officialCategory:'향후 에너지 연계',summary:'차량 배터리를 전력망과 양방향 연계하는 향후 기능입니다.',applies:[],verified:false,related:['V2H (향후)']},

  {id:'side-pdw',name:'측방 주차 거리 경고',parent:'주차 보조',category:'주차 편의',officialCategory:'주차 안전',aliases:['Side Parking Distance Warning'],summary:'저속 주차 중 차량 측면 장애물과의 거리를 경고합니다.',applies:apply([...hyEvIds,...kiaEvIds,...genesisAll,...hyPremium,...kiaPremium],'주차 패키지 적용 차종','차종별 상이'),related:['주차 충돌방지 보조','원격 스마트 주차 보조 2 / RSPA 2']},
  {id:'pca-parking',name:'주차 충돌방지 보조',parent:'주차 보조',category:'주차 편의',officialCategory:'주차 안전',aliases:['Parking Collision Avoidance Assist','PCA'],summary:'저속 주차 중 보행자나 장애물과의 충돌 위험을 감지해 경고하고 제동을 보조합니다.',applies:apply([...hyPremium,...kiaPremium,...genesisAll],'주차 안전 사양 적용 차종','차종별 상이'),related:['측방 주차 거리 경고','메모리 리버스 어시스트 / MRA']},
  {id:'remote-smart-exit',name:'원격 스마트 출차 보조',parent:'원격 주차',category:'주차 편의',officialCategory:'주차 편의',aliases:['Remote Smart Exit Assist'],summary:'차량 밖에서 스마트키 또는 앱으로 좁은 공간의 전진·후진 출차를 보조합니다.',applies:apply(ids('아이오닉 9','그랜저','팰리세이드','EV9','K9','G90','GV80'),'지원 주차 패키지','차종별 상이'),related:['원격 스마트 주차 보조 2 / RSPA 2','메모리 리버스 어시스트 / MRA']},

  {id:'e-hi-pass',name:'e-Hi Pass',parent:'디지털 / 인증',category:'디지털 키/인증',officialCategory:'결제 / 인증',summary:'차량 인포테인먼트와 연계해 하이패스 카드 관리와 결제 편의를 제공합니다.',applies:apply(ids('아이오닉 9','그랜저','EV9','K8','G90','GV80'),'지원 인포테인먼트 적용 차종','차종별 상이'),related:['지문 인증']},
  {id:'face-connect',name:'Face Connect',parent:'디지털 / 인증',category:'디지털 키/인증',officialCategory:'생체 인증',summary:'차량 외부 카메라의 얼굴 인식으로 도어 잠금 해제와 사용자 연계를 지원합니다.',applies:apply(ids('GV60','G90'),'지원 차종/트림','차종별 상이'),sources:expansionSources.genesis,related:['Genesis Digital Key 2','지문 인증']},
  {id:'genesis-dk2',name:'Genesis Digital Key 2',parent:'디지털 키',category:'디지털 키/인증',officialCategory:'제네시스 디지털 키',summary:'스마트폰 기반 차량 접근, 시동, 키 공유를 지원합니다.',applies:apply(genesisAll,'지원 스마트폰/차종','차종별 상이'),sources:expansionSources.genesis,related:['Genesis Digital Key 2 Touch','Face Connect']},
  {id:'genesis-dk2-touch',name:'Genesis Digital Key 2 Touch',parent:'디지털 키',category:'디지털 키/인증',officialCategory:'제네시스 디지털 키',summary:'스마트폰을 도어 핸들에 접촉해 잠금 해제하고 무선 충전 패드 인증으로 시동을 지원합니다.',applies:apply(genesisAll,'지원 스마트폰/차종','차종별 상이'),sources:expansionSources.genesis,related:['Genesis Digital Key 2']},
  {id:'hyundai-dk2',name:'Hyundai Digital Key 2',parent:'디지털 키',category:'디지털 키/인증',officialCategory:'현대 디지털 키',summary:'지원 스마트폰을 이용한 차량 접근, 시동과 키 공유를 지원합니다.',applies:apply(hyPremium,'지원 스마트폰/차종','차종별 상이'),sources:expansionSources.hyundai,related:['Hyundai Digital Key 2 Touch','지문 인증']},
  {id:'hyundai-dk2-touch',name:'Hyundai Digital Key 2 Touch',parent:'디지털 키',category:'디지털 키/인증',officialCategory:'현대 디지털 키',summary:'스마트폰 접촉 방식으로 도어 잠금 해제와 차량 시동 인증을 지원합니다.',applies:apply([...hyPremium,'hy-avante','hy-kona'],'지원 스마트폰/차종','차종별 상이'),sources:expansionSources.hyundai,related:['Hyundai Digital Key 2']},

  {id:'digital-center-mirror',name:'디지털 센터 미러',parent:'카메라 / 모니터링',category:'빌트인 캠/녹화',officialCategory:'후방 시야',aliases:['Digital Center Mirror'],summary:'후방 카메라 영상을 룸미러 디스플레이에 표시해 후방 시야를 보조합니다.',applies:apply(ids('아이오닉 9','팰리세이드','카니발','EV9','G90','GV80'),'지원 트림','차종별 상이'),related:['빌트인 캠 2 Plus']},
  {id:'built-in-cam',name:'빌트인 캠',parent:'카메라 / 모니터링',category:'빌트인 캠/녹화',officialCategory:'차량 녹화',aliases:['Built-in Cam','빌트인캠','주행 중 녹화','주차 중 녹화','이벤트 녹화','수동 녹화','SD 메모리'],summary:'차량에 장착된 전·후방 카메라로 주행 및 주차 중 영상과 음성을 저장하고, 차량 화면 또는 앱에서 영상을 확인할 수 있는 기능입니다.',overview:'차량에 장착된 빌트인 캠 카메라로 차량 전·후방의 영상과 음성을 저장하는 장치입니다. 주행/주차 중 상시 녹화, 이벤트 녹화, 수동 녹화, 타임랩스 녹화 항목을 차량 화면에서 관리합니다.',preconditions:['빌트인 캠 사양이 적용된 차량이어야 합니다.','인포테인먼트 시스템에서 원하는 주행/주차 녹화 조건을 선택해야 합니다.','녹화하려면 64GB 이상의 SD 메모리가 정상 삽입되어 있고 가용 용량이 32GB 이상 남아 있어야 합니다.','주차 중 녹화는 정품 12V 리튬 보조 배터리 장착 조건에서 사용할 수 있습니다.'],settings:['인포테인먼트 시스템 홈 화면에서 빌트인 캠을 선택합니다.','빌트인 캠 설정 메뉴를 선택합니다.','녹화 항목에서 주행 중 녹화, 주차 중 녹화, 음성 녹음 여부를 선택합니다.','주행 정보 표시 메뉴에서 시간, 속도, 기어, 방향지시등, 충격 감지 정도, GPS 위치 등 기록 항목을 선택합니다.'],steps:['시동(ACC 또는 IGN 전원) ON 상태에서 주행 중 상시 녹화 또는 주행 중 이벤트 녹화를 설정하면 주행 중 녹화가 작동합니다.','시동(ACC 또는 IGN 전원) OFF 상태에서 주차 중 상시 녹화 또는 주차 중 이벤트 녹화를 설정하면 주차 중 녹화가 작동합니다.','수동 녹화가 필요할 때는 빌트인 캠 수동 녹화 버튼을 누릅니다.','수동 녹화 버튼을 짧게 누르면 이벤트 영상이 녹화됩니다.','수동 녹화 버튼을 길게 누르면 타임랩스 녹화가 시작되고, 다시 길게 누르면 종료됩니다.','녹화 영상을 확인하려면 인포테인먼트 시스템 홈 화면에서 빌트인 캠을 선택합니다.'],disable:['주행/주차 중 녹화 설정을 끄면 해당 녹화가 작동하지 않습니다.','수동 녹화 중 시동을 끄거나 빌트인 캠 메뉴를 선택하면 녹화가 종료됩니다.','주차 중 녹화는 설정 시간이 초과되거나 12V 리튬 보조 배터리 충전량이 부족하면 종료됩니다.'],limitations:['SD 메모리가 제거된 상태에서는 녹화가 작동하지 않습니다.','SD 메모리 수명이 다했거나 고장 난 경우 녹화할 수 없습니다.','빌트인 캠 메뉴 사용 중에는 녹화 기능이 작동하지 않습니다.','시동 후 빌트인 캠 시스템 부팅 중에는 영상 녹화가 되지 않습니다.','소프트웨어 버전에 따라 화면과 설명에 차이가 있을 수 있습니다.'],warnings:['SD 메모리는 빌트인 캠 설정 > SD 메모리 메뉴의 연결 해제 버튼을 누른 뒤 제거해야 합니다.','중요한 영상은 자동 삭제될 수 있으므로 즉시 다운로드하거나 보관함에 저장하십시오.','음성 녹음 사용 시 탑승자에게 녹음 사실을 알리고 동의를 구하십시오.','전·후방 카메라 렌즈와 유리창이 오염되면 영상이 제대로 촬영되지 않을 수 있습니다.','빌트인 캠 Wi‑Fi 비밀번호가 타인에게 유출되지 않도록 주의하십시오.','제어기, 전·후방 카메라, 보조 배터리 커넥터를 강제로 분리하지 마십시오.'],sources:['hyundaiManual','genesisCatalog'],manualEvidence:{manualFile:'GN7_2026_ko_KR.txt',section:'빌트인 캠 (Built-in Cam) / 빌트인 캠 설정 / 빌트인 캠 작동 / 빌트인 캠 영상 확인',pageRange:'248-259'},related:['빌트인 캠 2','Bluelink/Kia Connect/Genesis Connected Services']},
  {id:'built-in-cam2',name:'빌트인 캠 2',parent:'카메라 / 모니터링',category:'빌트인 캠/녹화',officialCategory:'차량 녹화',aliases:['Built-in Cam 2','빌트인캠 2','주행 중 녹화','주차 중 녹화','이벤트 녹화','타임랩스','SD 메모리'],summary:'전·후방 녹화, 주행/주차 이벤트 저장, 차량 화면 및 앱 연계를 지원하는 내장 녹화 기능입니다.',overview:'공식 매뉴얼의 빌트인 캠 챕터 기준으로, 차량 전·후방 영상과 음성을 저장하고 녹화 영상 확인, 휴대폰 앱 연결, 소프트웨어 업데이트를 지원합니다.',preconditions:['빌트인 캠 사양이 적용된 차량이어야 합니다.','녹화 조건은 인포테인먼트 시스템의 빌트인 캠 설정에서 선택해야 합니다.','64GB 이상의 SD 메모리가 정상 삽입되어 있고 가용 용량이 32GB 이상 남아 있어야 합니다.','주차 중 녹화는 정품 12V 리튬 보조 배터리 장착 조건에서 사용할 수 있습니다.'],settings:['인포테인먼트 시스템 홈 화면에서 빌트인 캠을 선택합니다.','빌트인 캠 설정 메뉴에서 녹화 조건을 설정합니다.','주행 중 녹화, 주차 중 녹화, 음성 녹음 여부를 선택합니다.','휴대폰 앱 연결이 필요하면 빌트인 캠 화면의 휴대폰 연결 메뉴에서 Wi‑Fi 활성화를 선택합니다.'],steps:['설정한 녹화 조건에 따라 주행 중 또는 주차 중 녹화가 작동합니다.','수동 녹화 버튼을 짧게 눌러 이벤트 영상을 저장합니다.','수동 녹화 버튼을 길게 눌러 타임랩스 녹화를 시작하고, 다시 길게 눌러 종료합니다.','녹화 영상을 보려면 인포테인먼트 시스템 홈 화면에서 빌트인 캠을 선택합니다.','휴대폰 앱으로 확인하려면 마이현대 또는 MY GENESIS 앱에서 빌트인 캠 연결하기를 선택하고 Wi‑Fi로 연결합니다.'],disable:['녹화 설정을 해제하면 해당 녹화가 작동하지 않습니다.','수동 녹화 중 시동을 끄거나 빌트인 캠 메뉴에 진입하면 녹화가 종료됩니다.','주차 중 녹화는 설정 시간이 초과되거나 보조 배터리 충전량이 부족하면 종료됩니다.'],limitations:['빌트인 캠 메뉴 사용 중에는 녹화가 작동하지 않습니다.','SD 메모리 미삽입, 고장, 수명 종료 상태에서는 녹화할 수 없습니다.','휴대폰 앱은 휴대폰 기종이나 OS 버전에 따라 정상 작동하지 않을 수 있습니다.','업데이트 중에는 빌트인 캠 녹화 기능이 작동하지 않습니다.'],warnings:['SD 메모리를 작동 중 제거하면 저장 파일 또는 파일 시스템이 손상될 수 있습니다.','저장 공간이 부족하면 오래된 파일부터 자동 삭제됩니다.','카메라 렌즈나 전·후면 유리창 오염 시 영상 품질이 저하될 수 있습니다.','Wi‑Fi 연결 시 휴대폰의 모바일 네트워크 사용이 중단되므로 필요하면 Wi‑Fi 연결을 해제하십시오.'],sources:['hyundaiManual','genesisCatalog'],manualEvidence:{manualFile:'GN7_2026_ko_KR.txt',section:'빌트인 캠 (Built-in Cam) / 휴대폰 앱 연결 / 빌트인 캠 소프트웨어 업데이트',pageRange:'248-259'},applies:apply(ids('아이오닉 9','그랜저','싼타페','팰리세이드','G80','GV80'),'지원 트림/옵션','차종별 상이'),related:['빌트인 캠','빌트인 캠 2 Plus']},
  {id:'built-in-cam2-plus',name:'빌트인 캠 2 Plus',parent:'카메라 / 모니터링',category:'빌트인 캠/녹화',officialCategory:'차량 녹화',aliases:['Built-in Cam 2 Plus','빌트인캠 2 Plus','주행 중 녹화','주차 중 녹화','이벤트 녹화','휴대폰 앱 연결'],summary:'상위 사양 차량에서 제공되는 빌트인 캠 계열 기능입니다. 공식 매뉴얼에서 확인된 공통 빌트인 캠 절차를 기준으로 안내합니다.',overview:'공식 txt에서 Plus 전용 절차는 별도 확인되지 않았으므로, 빌트인 캠 공통 챕터에서 확인된 녹화 설정, 수동 녹화, 영상 확인, 앱 연결 절차만 제공합니다.',preconditions:['빌트인 캠 계열 사양이 적용된 차량이어야 합니다.','인포테인먼트 시스템에서 녹화 조건을 선택해야 합니다.','SD 메모리가 정상 삽입되어 있고 충분한 가용 용량이 있어야 합니다.','주차 중 녹화는 정품 12V 리튬 보조 배터리 장착 조건에서 사용할 수 있습니다.'],settings:['인포테인먼트 시스템 홈 화면에서 빌트인 캠을 선택합니다.','빌트인 캠 설정 메뉴에서 녹화 조건과 주행 정보 표시 항목을 설정합니다.','휴대폰 앱 연결이 필요한 경우 빌트인 캠 화면의 휴대폰 연결 메뉴에서 Wi‑Fi 활성화를 선택합니다.'],steps:['설정한 조건에 따라 주행 중 또는 주차 중 녹화가 작동합니다.','수동 녹화 버튼을 짧게 누르면 이벤트 영상이 저장됩니다.','수동 녹화 버튼을 길게 누르면 타임랩스 녹화가 시작되고 다시 길게 누르면 종료됩니다.','녹화 영상을 확인하려면 인포테인먼트 시스템 홈 화면에서 빌트인 캠을 선택합니다.'],disable:['녹화 설정을 해제하면 해당 녹화가 작동하지 않습니다.','수동 녹화 중 시동을 끄거나 빌트인 캠 메뉴를 선택하면 녹화가 종료됩니다.','주차 녹화 설정 시간이 초과되거나 보조 배터리 충전량이 부족하면 주차 중 녹화가 종료됩니다.'],limitations:['Plus 전용 화면명이나 별도 조작 절차는 현재 txt 본문에서 확인되지 않았습니다.','빌트인 캠 메뉴 사용 중에는 녹화 기능이 작동하지 않습니다.','SD 메모리 미삽입, 고장, 수명 종료 상태에서는 녹화할 수 없습니다.','소프트웨어 업데이트 중에는 빌트인 캠 녹화 기능이 작동하지 않습니다.'],warnings:['중요 영상은 자동 삭제될 수 있으므로 다운로드하거나 보관함에 저장하십시오.','음성 녹음 사용 시 탑승자 동의를 구하십시오.','카메라 렌즈와 유리창을 깨끗하게 유지하십시오.','Wi‑Fi 비밀번호가 유출되지 않도록 관리하십시오.'],sources:['hyundaiManual','genesisCatalog'],manualEvidence:{manualFile:'GN7_2026_ko_KR.txt',section:'빌트인 캠 (Built-in Cam) 공통 절차',pageRange:'248-259'},verified:false,related:['빌트인 캠 2','디지털 센터 미러']},

  {id:'dynamic-body-care-seat',name:'다이내믹 바디 케어 시트',parent:'시트',category:'시트',officialCategory:'시트 / 바디 케어',aliases:['Dynamic Body Care Seat'],summary:'주행 상태와 선택 모드에 따라 시트 지지부를 움직여 승객의 피로 완화를 돕습니다.',applies:apply(ids('G90','GV80'),'상위 시트 사양','차종/트림별 상이'),sources:expansionSources.genesis,related:['운전석 에르고 모션 시트','릴렉션 컴포트 시트']},
  {id:'swiveling-seat',name:'스위블링 시트',parent:'시트',category:'시트',officialCategory:'후석 / 회전 시트',aliases:['Swiveling Seat'],summary:'정차 시 좌석 방향을 회전해 승하차와 실내 활용을 돕습니다.',applies:apply(ids('스타리아','카니발'),'지원 좌석 구성','차종별 상이'),related:['워크인 디바이스']},
  {id:'walk-in-device',name:'워크인 디바이스',parent:'시트',category:'시트',officialCategory:'시트 / 승하차 편의',aliases:['Walk-in Device'],summary:'2열 좌석을 이동하거나 접어 3열 승하차 공간을 확보합니다.',applies:apply(largeFamilyIds,'3열 시트 적용 차종','차종별 상이'),related:['스위블링 시트']},
  {id:'smart-posture-assist',name:'스마트 자세 보조',parent:'시트',category:'시트',officialCategory:'시트 / 자세 설정',aliases:['Smart Posture Assist'],summary:'운전자 신체 정보를 바탕으로 권장 시트·스티어링 휠·미러 위치 설정을 돕습니다.',applies:apply(ids('그랜저','G80','G90','GV80'),'지원 시트/프로필 사양','차종별 상이'),related:['메모리 시트','운전석 에르고 모션 시트']},

  {id:'passenger-talk',name:'Passenger Talk',parent:'후석 편의',category:'편의',officialCategory:'후석 대화',aliases:['후석 대화 모드'],summary:'운전석 마이크 음성을 후석 스피커로 전달해 대화를 돕습니다.',applies:apply(largeFamilyIds,'3열/후석 편의 사양','차종별 상이'),related:['Passenger View','후석 음성 인식']},
  {id:'passenger-view',name:'Passenger View',parent:'후석 편의',category:'편의',officialCategory:'후석 모니터링',aliases:['후석 뷰'],summary:'실내 카메라 영상으로 후석 탑승자 상태를 확인합니다.',applies:apply(ids('아이오닉 9','팰리세이드','카니발','EV9'),'실내 카메라 적용 차종','차종별 상이'),related:['Passenger Talk']},
  {id:'rear-voice-recognition',name:'후석 음성 인식',parent:'후석 편의',category:'편의',officialCategory:'후석 인포테인먼트',summary:'후석 탑승자의 음성 명령으로 일부 공조·미디어 기능을 제어합니다.',applies:apply(ids('아이오닉 9','G90'),'지원 마이크/인포테인먼트','차종별 상이'),related:['후석 공조 제어','Passenger Talk']},
  {id:'rear-climate-control',name:'후석 공조 제어',parent:'후석 편의',category:'공조',officialCategory:'후석 공조',summary:'후석에서 온도, 풍량과 송풍 모드를 독립적으로 조절합니다.',applies:apply(largeFamilyIds,'후석 공조 적용 차종','차종별 상이'),related:['후석 음성 인식','듀얼 풀오토 에어컨']},

  {id:'pleos-connect',name:'Pleos Connect',parent:'커넥티드 / OTA',category:'커넥티드 서비스',officialCategory:'차세대 인포테인먼트',summary:'차세대 차량용 운영체제와 앱·서비스 연결을 위한 플랫폼입니다.',applies:apply(['hy-grandeur'],'공식 적용 트림 재확인','적용 범위 재확인'),sources:expansionSources.hyundai,verified:false,related:['Hyundai AI Assistant','OTA Update']},
  {id:'ccnc-system',name:'ccNC',parent:'커넥티드 / OTA',category:'인포테인먼트',officialCategory:'Connected Car Navigation Cockpit',summary:'내비게이션, 차량 설정, 커넥티드 서비스와 OTA를 통합하는 인포테인먼트 플랫폼입니다.',applies:apply([...hyPremium,...kiaPremium,...genesisAll],'ccNC 적용 차종','차종별 상이'),related:['OTA Update']},
  {id:'hyundai-ai',name:'Hyundai AI Assistant',parent:'커넥티드 / OTA',category:'커넥티드 서비스',officialCategory:'AI 음성 서비스',summary:'자연어 기반 차량 기능 검색과 음성 제어를 지원하는 현대 AI 서비스입니다.',applies:apply(['hy-grandeur'],'공식 적용 범위 재확인','적용 범위 재확인'),sources:expansionSources.hyundai,verified:false,related:['Pleos Connect']},
  {id:'kia-ai',name:'Kia AI Assistant',parent:'커넥티드 / OTA',category:'커넥티드 서비스',officialCategory:'AI 음성 서비스',summary:'자연어로 차량 기능과 정보를 이용하도록 돕는 기아 AI 음성 서비스입니다.',applies:apply(ids('EV3','EV4','EV5'),'지원 ccNC 차종','차종별 상이'),sources:expansionSources.kia,verified:false,related:['ccNC']},
  {id:'feature-on-demand',name:'Feature on Demand',parent:'커넥티드 / OTA',category:'커넥티드 서비스',officialCategory:'소프트웨어 기능 구매',aliases:['FoD'],summary:'차량 구매 후 지원 소프트웨어 기능을 추가로 활성화하는 서비스 구조입니다.',applies:apply([...genesisAll,...hyPremium,...kiaPremium],'지원 차량/시장/서비스','적용 범위 재확인'),verified:false,related:['OTA Update']},

  {id:'fcev-energy-flow',name:'FCEV 에너지 흐름도',parent:'FCEV 전용 기능',category:'FCEV',officialCategory:'FCEV / 에너지 정보',summary:'연료전지, 고전압 배터리와 구동 모터 사이의 에너지 흐름을 표시합니다.',applies:apply(fcevIds,'디 올 뉴 넥쏘 전용','기본 사양'),sources:expansionSources.hyundai,related:['FCEV 정보 화면 / 에너지 모니터','스마트 회생제동 / 회생제동 조절']},
  {id:'fcev-dedicated-system',name:'수소차 전용 시스템 정보',parent:'FCEV 전용 기능',category:'FCEV',officialCategory:'FCEV / 시스템 상태',summary:'수소 저장, 연료전지 시스템과 에너지 상태 등 수소전기차 전용 정보를 제공합니다.',applies:apply(fcevIds,'디 올 뉴 넥쏘 전용','기본 사양'),sources:expansionSources.hyundai,related:['수소 충전 / 충전구 개폐','FCEV 에너지 흐름도']}
];

expandedFeatures.forEach(addExpandedFeature);

function installAdLayout() {
  const workspace = document.querySelector('.workspace');
  if (!workspace || document.querySelector('.monetized-layout')) return;
  const layout = document.createElement('div');
  layout.className = 'monetized-layout';
  const left = document.createElement('aside');
  left.className = 'ad-slot ad-rail';
  left.setAttribute('aria-label', '좌측 광고 영역');
  left.textContent = 'AD 160×600 / 300×600';
  const right = left.cloneNode(true);
  right.setAttribute('aria-label', '우측 광고 영역');
  workspace.parentNode.insertBefore(layout, workspace);
  layout.append(left, workspace, right);
  const bottom = document.createElement('aside');
  bottom.className = 'ad-slot ad-bottom';
  bottom.setAttribute('aria-label', '하단 광고 영역');
  bottom.textContent = 'AD 728×90 / 970×250';
  layout.insertAdjacentElement('afterend', bottom);
}

installAdLayout();
render();
