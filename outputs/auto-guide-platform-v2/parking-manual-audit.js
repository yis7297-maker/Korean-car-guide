/* Parking-assistance content audit. Scope: official Hyundai/Kia/Genesis owner-manual terminology only. */
(function applyParkingManualAudit() {
  const officialSources = ['hyundaiManual', 'kiaManual', 'genesisCatalog'];
  const commonWarning = ['카메라 영상과 경고는 주변 확인을 대신하지 않습니다. 운전자가 직접 차량 주변을 확인하고 제동과 조향을 수행해야 합니다.'];
  const parkingFeatures = [
    {
      id: 'rspa', name: '원격 스마트 주차 보조 / RSPA', category: '주차 편의', officialCategory: '원격 스마트 주차 보조',
      aliases: ['Remote Smart Parking Assist', 'RSPA', '원격 주차'],
      summary: '차량 밖에서 스마트키의 원격 전진 또는 후진 버튼을 눌러 차량의 직선 이동을 보조합니다.',
      preconditions: ['차량 주변에 사람과 장애물이 없는지 확인합니다.', '스마트키를 휴대하고 기능 안내에 표시된 작동 가능 거리 안에 있어야 합니다.'],
      settings: ['차량의 주차/뷰 버튼과 스마트키의 원격 시동·전진·후진 버튼을 사용합니다.'],
      steps: ['차량을 기능을 사용할 위치에 정차합니다.', '차량 밖으로 나온 뒤 도어를 닫고 스마트키로 원격 시동합니다.', '원격 전진 또는 후진 버튼을 누르고 있는 동안 차량 이동을 확인합니다.'],
      disable: ['스마트키 버튼에서 손을 떼면 차량이 정지합니다.', '기능 종료 또는 원격 시동 버튼을 눌러 종료합니다.'],
      limitations: ['도어 또는 테일게이트가 열려 있거나 센서가 정상적으로 감지하지 못하는 상황에서는 작동하지 않거나 중지될 수 있습니다.'],
      warnings: commonWarning, related: ['원격 스마트 주차 보조 2 / RSPA 2', '주차 거리 경고'], applies: []
    },
    {
      id: 'spa', name: '스마트 주차 보조 / SPA', category: '주차 편의', officialCategory: '스마트 주차 보조',
      aliases: ['Smart Parking Assist', 'SPA', '자동 주차'],
      summary: '주차 공간을 탐색한 뒤 차량의 조향을 보조하는 주차 기능입니다.',
      preconditions: ['주차 공간 주변을 직접 확인하고 저속으로 이동해야 합니다.', '클러스터 또는 인포테인먼트 화면의 안내를 확인할 수 있어야 합니다.'],
      settings: ['주차/뷰 버튼을 눌러 주차 기능 화면을 실행합니다.'],
      steps: ['주차 공간 옆을 저속으로 통과하며 공간을 탐색합니다.', '화면에 표시된 주차 공간과 방향을 선택합니다.', '화면 안내에 따라 변속, 가속 및 제동을 수행합니다.'],
      disable: ['주차/뷰 버튼을 누르거나 운전자가 조향하면 기능이 해제될 수 있습니다.'],
      limitations: ['공간 형태, 주차선 상태, 주변 차량과 장애물의 위치에 따라 공간을 인식하지 못할 수 있습니다.'],
      warnings: commonWarning, related: ['원격 스마트 주차 보조 / RSPA', '서라운드 뷰 모니터 / SVM'], applies: []
    },
    {
      id: 'rear-view-monitor', name: '후방 모니터', category: '주차 편의', officialCategory: '후방 모니터',
      aliases: ['Rear View Monitor', 'RVM', '후방 카메라'],
      summary: '후진 시 후방 카메라 영상을 화면에 표시해 차량 뒤쪽 확인을 돕습니다.',
      preconditions: ['카메라 렌즈가 가려져 있지 않아야 합니다.'],
      settings: ['변속 위치를 R(후진)로 전환하면 후방 영상이 표시됩니다. 지원 차량은 주차/뷰 버튼으로 영상을 표시할 수 있습니다.'],
      steps: ['R(후진)로 전환합니다.', '화면의 후방 영상과 가이드라인을 확인하면서 차량 주변을 직접 확인합니다.'],
      disable: ['R(후진) 이외의 위치로 변속하면 차량 조건에 따라 화면이 종료됩니다.', '주차/뷰 버튼 또는 화면의 종료 버튼으로 종료할 수 있습니다.'],
      limitations: ['카메라 렌즈 오염, 어두운 장소, 강한 빛과 악천후에서는 영상이 선명하지 않을 수 있습니다.'],
      warnings: commonWarning, related: ['후진 가이드', '서라운드 뷰 모니터 / SVM'], applies: []
    },
    {
      id: 'surround-view-monitor', name: '서라운드 뷰 모니터 / SVM', category: '주차 편의', officialCategory: '서라운드 뷰 모니터',
      aliases: ['Surround View Monitor', 'SVM', '어라운드 뷰'],
      summary: '차량 주변 카메라 영상을 조합해 주차와 저속 이동 시 주변 확인을 돕습니다.',
      preconditions: ['전방, 후방 및 사이드 미러 카메라가 가려져 있지 않아야 합니다.'],
      settings: ['주차/뷰 버튼을 누르거나 R(후진)로 전환해 화면을 실행합니다.'],
      steps: ['주차/뷰 버튼 또는 R(후진) 변속으로 영상을 표시합니다.', '화면에서 확인할 뷰를 선택합니다.', '영상과 실제 주변을 함께 확인하며 이동합니다.'],
      disable: ['주차/뷰 버튼을 누르거나 화면의 종료 버튼을 선택합니다.', '차량 속도와 변속 조건에 따라 자동 종료될 수 있습니다.'],
      limitations: ['합성 영상의 물체 위치와 거리는 실제와 다르게 보일 수 있습니다.'],
      warnings: commonWarning, related: ['후방 모니터', '후측방 모니터 / BVM'], applies: []
    },
    {
      id: 'blind-spot-view-monitor', name: '후측방 모니터 / BVM', category: '주차 편의', officialCategory: '후측방 모니터',
      aliases: ['Blind-Spot View Monitor', 'BVM'],
      summary: '방향지시등 작동 시 해당 방향의 후측방 영상을 클러스터에 표시합니다.',
      preconditions: ['후측방 모니터가 차량 설정에서 사용하도록 설정되어 있어야 합니다.', '사이드 미러 카메라가 가려져 있지 않아야 합니다.'],
      settings: ['설정 → 차량 → 운전자 보조 → 주행 안전 → 후측방 모니터'],
      steps: ['좌측 또는 우측 방향지시등을 작동합니다.', '클러스터에 표시된 해당 방향의 후측방 영상을 확인합니다.'],
      disable: ['방향지시등을 끄면 영상이 종료됩니다.', '차량 설정에서 후측방 모니터를 끌 수 있습니다.'],
      limitations: ['카메라 렌즈 오염, 악천후와 조도 조건에 따라 영상 확인이 제한될 수 있습니다.'],
      warnings: commonWarning, related: ['서라운드 뷰 모니터 / SVM'], applies: []
    },
    {
      id: 'rear-cross-traffic-collision-avoidance', name: '후방 교차 충돌방지 보조', category: '주차 편의', officialCategory: '주차 안전',
      aliases: ['Rear Cross-Traffic Collision-Avoidance Assist', 'RCCA'],
      summary: '후진 중 좌우에서 접근하는 차량과의 충돌 위험을 감지해 경고하고 조건에 따라 제동을 보조합니다.',
      preconditions: ['주차 안전 설정에서 후방 교차 안전 기능이 켜져 있어야 합니다.', '후측방 레이더가 가려져 있지 않아야 합니다.'],
      settings: ['설정 → 차량 → 운전자 보조 → 주차 안전 → 후방 교차 안전'],
      steps: ['R(후진)로 전환하고 천천히 후진합니다.', '경고음과 클러스터 또는 화면의 접근 방향 표시를 확인합니다.', '위험이 있으면 운전자가 브레이크를 밟아 정지합니다.'],
      disable: ['차량 설정의 후방 교차 안전 항목에서 기능을 끌 수 있습니다.'],
      limitations: ['주변 차량이 빠르게 접근하거나 센서가 가려진 경우 감지와 제동 보조가 제한될 수 있습니다.'],
      warnings: commonWarning, related: ['주차 충돌방지 보조', '후방 모니터'], applies: []
    },
    {
      id: 'parking-distance-warning', name: '주차 거리 경고', category: '주차 편의', officialCategory: '주차 거리 경고',
      aliases: ['Parking Distance Warning', 'PDW', '전방 주차 거리 경고', '후방 주차 거리 경고'],
      summary: '주차 또는 저속 이동 중 센서가 감지한 장애물과의 거리를 단계별 경고음과 화면으로 알립니다.',
      preconditions: ['초음파 센서 표면에 눈, 흙 또는 이물질이 없어야 합니다.'],
      settings: ['차량 조건에 따라 R(후진) 변속 또는 주차 안전 버튼으로 작동합니다.'],
      steps: ['주차 또는 저속 이동 중 경고음 간격과 화면의 감지 위치를 확인합니다.', '장애물과의 거리를 직접 확인하며 제동합니다.'],
      disable: ['지원 차량은 주차 안전 버튼으로 경고를 일시 해제할 수 있습니다.', '변속 및 속도 조건을 벗어나면 자동 종료될 수 있습니다.'],
      limitations: ['가늘거나 낮은 물체, 흡음성 물체와 센서 감지 범위 밖의 장애물은 감지하지 못할 수 있습니다.'],
      warnings: commonWarning, related: ['측방 주차 거리 경고', '후방 모니터'], applies: []
    },
    {
      id: 'reverse-tilt-mirror', name: '후진 연동 사이드 미러', category: '주차 편의', officialCategory: '후진 연동 미러',
      aliases: ['오토 리버스 미러', 'Reverse Tilt Mirror'],
      summary: '후진 시 사이드 미러 각도를 주차 확인 위치로 조절하고 후진 종료 후 원래 위치로 복귀합니다.',
      preconditions: ['사이드 미러 선택 스위치가 차량 매뉴얼에 안내된 작동 위치에 있어야 합니다.'],
      settings: ['사이드 미러 선택 스위치와 미러 조절 스위치로 후진 위치를 설정합니다.'],
      steps: ['R(후진)로 전환해 미러가 내려가는지 확인합니다.', '필요한 경우 미러 조절 스위치로 후진 위치를 조절합니다.'],
      disable: ['사이드 미러 선택 스위치를 중립 위치로 두면 기능이 작동하지 않습니다.', 'R(후진) 이외의 위치로 변속하면 미러가 복귀합니다.'],
      limitations: ['작동 및 저장 방식은 차량 사양에 따라 다릅니다.'],
      warnings: ['미러에 보이는 거리와 실제 거리가 다를 수 있으므로 직접 주변을 확인하세요.'], related: ['후방 모니터'], applies: []
    },
    {
      id: 'memory-parking', name: '메모리 주차 / Memory Parking', category: '주차 편의', officialCategory: '메모리 주차',
      aliases: ['Memory Parking', '메모리 파킹'],
      summary: '공식 매뉴얼에서 메모리 주차로 명시된 차량의 저장·재생형 주차 기능입니다.',
      preconditions: ['해당 기능이 적용된 차량이어야 하며 차량 화면의 안내 조건을 충족해야 합니다.'],
      settings: ['공식 매뉴얼에 표시된 주차 보조 메뉴에서 메모리 주차를 선택합니다.'],
      steps: ['차량 화면의 안내에 따라 경로 저장을 시작합니다.', '저장 완료 안내를 확인합니다.', '재생 시 화면 안내에 따라 차량 주변을 확인하며 기능을 실행합니다.'],
      disable: ['브레이크 조작 또는 화면의 취소·종료 항목으로 종료합니다.'],
      limitations: ['공식 매뉴얼에서 지원이 명시된 차량에만 사용할 수 있습니다.'],
      warnings: commonWarning, related: ['메모리 리버스 어시스트 / MRA'], applies: []
    },
    {
      id: 'reverse-guide', name: '후진 가이드', category: '주차 편의', officialCategory: '후방 모니터 안내선',
      aliases: ['Rear Parking Guidelines', '후방 가이드라인'],
      summary: '후방 모니터 화면에 차량의 예상 이동 경로와 차체 기준선을 표시합니다.',
      preconditions: ['후방 모니터 영상이 표시되어야 합니다.'],
      settings: ['지원 차량은 후방 모니터 설정에서 주차 안내선 표시 여부를 선택합니다.'],
      steps: ['R(후진)로 전환합니다.', '스티어링 휠 조작에 따라 움직이는 예상 경로와 고정 안내선을 확인합니다.', '실제 주변과 거리를 직접 확인하며 후진합니다.'],
      disable: ['후방 모니터를 종료하거나 설정에서 안내선 표시를 끕니다.'],
      limitations: ['안내선은 예상 경로이며 노면 경사, 적재 상태와 조향 상태에 따라 실제 경로와 다를 수 있습니다.'],
      warnings: commonWarning, related: ['후방 모니터'], applies: []
    }
  ];

  const existingUpdates = {
    rspa2: {
      name: '원격 스마트 주차 보조 2 / RSPA 2',
      summary: '차량 안 또는 차량 밖에서 주차 공간 탐색과 주차·출차 조작을 보조합니다.',
      settings: ['센터 콘솔의 주차/뷰 버튼과 화면의 원격 스마트 주차 보조 메뉴를 사용합니다.', '차량 밖에서는 스마트키의 원격 시동 및 전진·후진 버튼을 사용합니다.'],
      warnings: commonWarning
    },
    'memory-reverse-assist': {
      name: '메모리 리버스 어시스트 / MRA',
      summary: '저속 전진으로 이동한 경로를 저장한 뒤 같은 경로를 따라 후진할 수 있도록 조향을 보조합니다.',
      warnings: commonWarning
    },
    'side-pdw': {
      name: '측방 주차 거리 경고',
      summary: '주차 또는 저속 이동 중 차량 측면의 장애물 감지 정보를 화면과 경고음으로 알립니다.',
      warnings: commonWarning
    },
    'pca-parking': {
      name: '주차 충돌방지 보조',
      summary: '주차 또는 저속 이동 중 충돌 위험을 감지해 경고하고 기능 조건에 따라 긴급 제동을 보조합니다.',
      warnings: commonWarning
    }
  };

  parkingFeatures.forEach(config => {
    if (features.some(feature => feature.id === config.id)) return;
    features.push(F({
      ...config,
      sources: officialSources,
      verify: verify(true),
      generation: { family: 'Parking Assistance', generation: config.name, previous: [], differences: config.summary }
    }));
  });
  Object.entries(existingUpdates).forEach(([id, update]) => {
    const feature = features.find(item => item.id === id);
    if (feature) Object.assign(feature, update, { overview: update.summary || feature.overview, updatedAt: '2026-06-25' });
  });
  features.filter(feature => feature.category === '주차 편의').forEach(feature => {
    feature.sources = [...new Set([...(feature.sources || []), ...officialSources])];
    feature.updatedAt = '2026-06-25';
  });
  render();
})();
