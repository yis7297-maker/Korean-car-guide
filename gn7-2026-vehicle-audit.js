/* GN7 2026 Owners Manual vehicle-specific audit overlay.
 * Scope: Hyundai Grandeur GN7 2026 only.
 * Source: work/manual-text/GN7_2026_ko_KR.txt
 * This file does not create new features; it only adds GN7 vehicle mapping, aliases, and official manual evidence to existing features confirmed in the manual.
 */
window.applyGn7ManualAudit = function applyGn7ManualAudit(){
  if (!Array.isArray(window.features) && typeof features === 'undefined') return;
  const confirmed = [
  {
    "id": "fca-suite",
    "found": [
      {
        "term": "전방 충돌방지 보조",
        "count": 60
      },
      {
        "term": "FCA",
        "count": 56
      }
    ]
  },
  {
    "id": "nscc-hda2",
    "found": [
      {
        "term": "스마트 크루즈 컨트롤",
        "count": 122
      },
      {
        "term": "고속도로 주행 보조",
        "count": 42
      },
      {
        "term": "내비게이션 기반 스마트 크루즈 컨트롤",
        "count": 28
      },
      {
        "term": "HDA",
        "count": 15
      }
    ]
  },
  {
    "id": "rspa2",
    "found": [
      {
        "term": "원격 스마트 주차 보조",
        "count": 41
      },
      {
        "term": "RSPA",
        "count": 18
      }
    ]
  },
  {
    "id": "dual-auto-ac",
    "found": [
      {
        "term": "공조",
        "count": 44
      }
    ]
  },
  {
    "id": "air-purification",
    "found": [
      {
        "term": "공기청정",
        "count": 5
      },
      {
        "term": "공기 청정",
        "count": 5
      }
    ]
  },
  {
    "id": "heated-ventilated-seats",
    "found": [
      {
        "term": "열선/통풍",
        "count": 17
      },
      {
        "term": "시트 열선",
        "count": 3
      }
    ]
  },
  {
    "id": "ergo-motion-seat",
    "found": [
      {
        "term": "에르고 모션 시트",
        "count": 8
      }
    ]
  },
  {
    "id": "relaxation-comfort-seat",
    "found": [
      {
        "term": "릴렉션 컴포트 시트",
        "count": 12
      }
    ]
  },
  {
    "id": "smart-power-tailgate",
    "found": [
      {
        "term": "파워 트렁크",
        "count": 49
      },
      {
        "term": "스마트 트렁크",
        "count": 22
      }
    ]
  },
  {
    "id": "hud",
    "found": [
      {
        "term": "헤드업 디스플레이",
        "count": 8
      },
      {
        "term": "HUD",
        "count": 26
      }
    ]
  },
  {
    "id": "panoramic-curved-display",
    "found": [
      {
        "term": "인포테인먼트 시스템",
        "count": 264
      }
    ]
  },
  {
    "id": "apple-carplay-wired",
    "found": [
      {
        "term": "Apple CarPlay",
        "count": 1
      }
    ]
  },
  {
    "id": "android-auto-wired",
    "found": [
      {
        "term": "Android Auto",
        "count": 3
      },
      {
        "term": "안드로이드 오토",
        "count": 2
      }
    ]
  },
  {
    "id": "ccnc-ota",
    "found": [
      {
        "term": "무선 소프트웨어 업데이트",
        "count": 4
      },
      {
        "term": "소프트웨어 업데이트",
        "count": 25
      },
      {
        "term": "OTA",
        "count": 5
      }
    ]
  },
  {
    "id": "fingerprint-auth",
    "found": [
      {
        "term": "지문 인증",
        "count": 41
      },
      {
        "term": "지문 등록",
        "count": 3
      }
    ]
  },
  {
    "id": "hyundai-dk2",
    "found": [
      {
        "term": "디지털 키",
        "count": 143
      }
    ]
  },
  {
    "id": "built-in-cam",
    "found": [
      {
        "term": "빌트인 캠",
        "count": 74
      },
      {
        "term": "Built-in Cam",
        "count": 3
      }
    ]
  },
  {
    "id": "e-hi-pass",
    "found": [
      {
        "term": "하이패스",
        "count": 49
      }
    ]
  },
  {
    "id": "side-pdw",
    "found": [
      {
        "term": "측방 주차 거리 경고",
        "count": 5
      },
      {
        "term": "주차 거리 경고",
        "count": 93
      }
    ]
  },
  {
    "id": "pca-parking",
    "found": [
      {
        "term": "주차 충돌방지 보조",
        "count": 34
      },
      {
        "term": "PCA",
        "count": 5
      }
    ]
  },
  {
    "id": "remote-smart-exit",
    "found": [
      {
        "term": "원격 전/후진",
        "count": 36
      }
    ]
  },
  {
    "id": "rear-view-monitor",
    "found": [
      {
        "term": "후방 모니터",
        "count": 35
      }
    ]
  },
  {
    "id": "surround-view-monitor",
    "found": [
      {
        "term": "서라운드 뷰 모니터",
        "count": 57
      }
    ]
  },
  {
    "id": "blind-spot-view-monitor",
    "found": [
      {
        "term": "후측방 모니터",
        "count": 20
      }
    ]
  },
  {
    "id": "rear-cross-traffic-collision-avoidance",
    "found": [
      {
        "term": "후방 교차 충돌방지 보조",
        "count": 43
      },
      {
        "term": "후방 교차 안전",
        "count": 1
      }
    ]
  },
  {
    "id": "parking-distance-warning",
    "found": [
      {
        "term": "주차 거리 경고",
        "count": 93
      }
    ]
  },
  {
    "id": "reverse-guide",
    "found": [
      {
        "term": "후진 가이드",
        "count": 4
      }
    ]
  },
  {
    "id": "smart-key",
    "found": [
      {
        "term": "스마트 키",
        "count": 260
      }
    ]
  },
  {
    "id": "emergency-key",
    "found": [
      {
        "term": "비상 키",
        "count": 17
      }
    ]
  },
  {
    "id": "remote-engine-start",
    "found": [
      {
        "term": "원격 시동",
        "count": 39
      }
    ]
  },
  {
    "id": "climate-control",
    "found": [
      {
        "term": "에어컨",
        "count": 114
      }
    ]
  },
  {
    "id": "smart-posture-assist",
    "found": [
      {
        "term": "스마트 자세",
        "count": 5
      },
      {
        "term": "자세 보조",
        "count": 4
      }
    ]
  }
];
  const sourceKey = 'hyundaiManual';
  const vehicleApply = { vehicleId: 'hy-grandeur', brand: '현대', model: '그랜저', years: '2026', trim: 'GN7 해당 사양/트림', option: 'Owners Manual 수록 사양 기준' };
  const evidenceBase = {
    manualFile: 'GN7_2026_ko_KR.txt',
    modelCode: 'GN7',
    modelName: '그랜저',
    modelYear: '2026',
    basis: 'official_owner_manual',
    verifiedBy: 'vehicle-manual-audit'
  };
  const sectionHints = {
    'fca-suite': '전방 충돌방지 보조(FCA)',
    'nscc-hda2': '스마트 크루즈 컨트롤 / 내비게이션 기반 스마트 크루즈 컨트롤 / 고속도로 주행 보조',
    'rspa2': '원격 스마트 주차 보조(RSPA)',
    'dual-auto-ac': '공조 시스템',
    'air-purification': '공기청정 모드',
    'after-blow': '애프터 블로우',
    'heated-ventilated-seats': '시트 열선/통풍',
    'ergo-motion-seat': '에르고 모션 시트',
    'relaxation-comfort-seat': '릴렉션 컴포트 시트',
    'memory-seat': '운전자세 메모리 시스템',
    'smart-power-tailgate': '파워 트렁크 / 스마트 트렁크',
    'hud': '헤드업 디스플레이(HUD)',
    'panoramic-curved-display': '인포테인먼트 시스템',
    'apple-carplay-wired': 'Apple CarPlay',
    'android-auto-wired': 'Android Auto',
    'ccnc-ota': '무선 소프트웨어 업데이트',
    'fingerprint-auth': '지문 인증 시스템',
    'hyundai-dk2': '현대 디지털 키 / 디지털 키(스마트폰)',
    'hyundai-dk2-touch': '현대 디지털 키 / 디지털 키 터치 제어',
    'built-in-cam': '빌트인 캠(Built-in Cam)',
    'built-in-cam2': '빌트인 캠(Built-in Cam)',
    'e-hi-pass': '하이패스 / e-Hi Pass',
    'side-pdw': '주차 거리 경고 / 측방 주차 거리 경고',
    'pca-parking': '주차 충돌방지 보조(PCA)',
    'remote-smart-exit': '원격 스마트 주차 보조 / 원격 전·후진',
    'memory-reverse-assist': '메모리 리버스 어시스트(MRA)',
    'rear-view-monitor': '후방 모니터',
    'surround-view-monitor': '서라운드 뷰 모니터',
    'blind-spot-view-monitor': '후측방 모니터',
    'rear-cross-traffic-collision-avoidance': '후방 교차 충돌방지 보조',
    'parking-distance-warning': '주차 거리 경고',
    'reverse-tilt-mirror': '후진 연동 사이드 미러',
    'reverse-guide': '후진 가이드',
    'smart-key': '스마트 키',
    'emergency-key': '비상 키',
    'remote-engine-start': '원격 시동',
    'climate-control': '공조 시스템',
    'smart-posture-assist': '스마트 서포트 / 자세 보조',
    'digital-center-mirror': '디지털 센터 미러'
  };
  const aliasesById = {
    'nscc-hda2': ['스마트 크루즈 컨트롤', 'SCC', '내비게이션 기반 스마트 크루즈 컨트롤', 'NSCC', '고속도로 주행 보조', 'HDA'],
    'hyundai-dk2': ['현대 디지털 키', '디지털 키', '디지털 키 스마트폰', 'UWB 디지털 키'],
    'smart-power-tailgate': ['파워 트렁크', '스마트 트렁크', '트렁크 열림/닫힘 버튼'],
    'ccnc-ota': ['무선 소프트웨어 업데이트', '소프트웨어 자동 다운로드', '소프트웨어 업데이트 승인'],
    'fingerprint-auth': ['지문 인증 시스템', '지문 등록', '지문 인식 시동'],
    'side-pdw': ['주차 거리 경고', '전방 주차 거리 경고', '후방 주차 거리 경고', '측방 주차 거리 경고'],
    'memory-reverse-assist': ['메모리 리버스 어시스트', 'MRA'],
    'ergo-motion-seat': ['에르고 모션 시트', '컴포트 스트레칭', '자세 보조', '주행 중 허리 보호 기능'],
    'built-in-cam': ['빌트인 캠', 'Built-in Cam'],
    'built-in-cam2': ['빌트인 캠', 'Built-in Cam']
  };
  const detailById = {
    'hyundai-dk2': {
      overview: '현대 디지털 키는 스마트 키 없이 스마트폰 또는 카드 키로 도어와 트렁크를 잠그거나 열고, 차량 시동을 걸 수 있도록 하는 시스템입니다.',
      preconditions: [
        '디지털 키 기능을 지원하는 스마트폰이 필요합니다.',
        '마이현대 앱 설치, 회원 가입 및 서비스 가입이 필요합니다.',
        '스마트폰 등록 시 스마트 키를 이용해 차량 전원을 ON으로 하고 스마트 키를 차량 실내에 두어야 합니다.'
      ],
      settings: [
        '인포테인먼트 시스템에서 설정 > 차량 > 디지털 키 > 스마트폰 키 > 나의 스마트폰 키를 선택해 등록 화면으로 이동합니다.',
        '스마트폰에서 마이현대 앱의 더보기 메뉴 > 차량 디지털 키 > 등록하기를 선택합니다.'
      ],
      steps: [
        '스마트폰 화면 안내에 따라 디지털 키 등록을 진행합니다.',
        'UWB 미지원 스마트폰은 실내 인증 패드(무선 충전 패드)에 스마트폰 뒷면을 아래로 향하게 올려놓습니다.',
        'UWB 지원 스마트폰은 차량 실내에서 스마트폰을 휴대하고 있으면 무선 등록을 진행할 수 있습니다.',
        '차량 화면에서 등록 버튼을 눌러 등록을 시작합니다.',
        '등록이 완료되면 인포테인먼트 시스템 화면의 등록완료 상태를 확인합니다.',
        '등록된 스마트폰의 NFC 안테나를 도어 핸들 인증 패드에 접촉하거나, UWB 지원 스마트폰은 도어 핸들 센서부를 터치해 도어를 잠그거나 잠금 해제합니다.',
        '시동은 NFC 방식의 경우 실내 인증 패드 중앙에 스마트폰을 올리고 브레이크 페달을 밟은 상태에서 시동 버튼을 누릅니다.',
        'UWB 지원 스마트폰은 차량 실내에 스마트폰을 휴대한 상태에서 브레이크 페달을 밟고 시동 버튼을 누릅니다.'
      ],
      disable: [
        '인포테인먼트 시스템의 스마트폰 키 메뉴에서 등록된 디지털 키를 삭제할 수 있습니다.'
      ],
      limitations: [
        '등록 중 실내 인증 패드에서 스마트폰을 떼거나, 인포테인먼트 화면을 변경하거나, 차량 전원을 끄거나, 기어를 변경하면 등록이 취소될 수 있습니다.',
        '실내에 스마트 키가 없으면 등록이 시작되지 않습니다.',
        '일부 스마트폰은 내부 구조에 따라 실내 인증 패드에서 인식이 원활하지 않을 수 있습니다.',
        '디지털 키 제어기 업데이트 중에는 스마트 키와 지문 시동 기능이 일시적으로 동작하지 않을 수 있습니다.'
      ],
      warnings: [
        '도어 잠금 후 반드시 잠금 상태를 확인하십시오.',
        '트렁크를 닫을 때 실내에 스마트폰이 있는지 확인하십시오. 스마트폰을 차량 안에 둔 채 트렁크를 닫으면 외부에서 잠금 해제가 어려울 수 있습니다.'
      ]
    },
    'fingerprint-auth': {
      overview: '지문 인증 시스템은 차량 내 지문 인증 센서로 시동, 프로필 잠금 해제, 발레 모드 해제, 인카페이먼트 등 일부 편의 기능을 사용할 수 있게 합니다.',
      preconditions: [
        '지문 등록 전 스마트 키 2개를 모두 차량 안에 두어야 합니다.',
        '시동 ON 상태에서 인포테인먼트 시스템의 사용자 프로필 메뉴를 사용할 수 있어야 합니다.'
      ],
      settings: [
        '인포테인먼트 시스템의 설정 > 사용자 프로필 > 운전자 1 또는 운전자 2 > 보안 > 지문인식 메뉴에서 지문 연동 편의 기능을 설정하거나 해제합니다.'
      ],
      steps: [
        '인포테인먼트 시스템의 프로필 메뉴에서 지문 등록을 선택합니다.',
        '안내에 따라 지문 인식 센서 위에 손가락을 올립니다.',
        '진행률이 100%가 될 때까지 손가락의 여러 부위가 골고루 인식되도록 지문을 등록합니다.',
        '지문 스캔 후 등록 진행 안내가 표시되면 시스템 등록이 완료될 때까지 기다립니다.',
        '지문 인증이 필요한 화면에서 지문 인식 센서에 손가락을 올려 인증합니다.'
      ],
      disable: [
        '인포테인먼트 시스템의 사용자 프로필 보안 메뉴에서 등록된 지문을 삭제하거나 지문 연동 편의 기능을 해제합니다.'
      ],
      limitations: [
        '지문 등록 중 인포테인먼트 화면을 변경하거나 시동 버튼을 사용하거나 차량 기어를 변경하고 주행하면 등록이 취소됩니다.',
        '지문 전자 결제 등 일부 기능은 블루링크 서비스 가입이 필요합니다.',
        '지문 인증이 작동하지 않으면 손가락을 지문 인식 센서에서 뗀 후 다시 올려야 합니다.'
      ],
      warnings: [
        '지문을 등록하기 전에 지문 센서 위 필름과 이물질을 제거하십시오.'
      ]
    },
    'ccnc-ota': {
      overview: '무선 소프트웨어 업데이트는 하이테크센터 방문 없이 차량 내 제어기 소프트웨어를 최신 상태로 유지할 수 있도록 하는 기능입니다.',
      preconditions: [
        '무선 소프트웨어 업데이트 기능은 블루링크에 가입한 경우 사용할 수 있습니다.',
        '업데이트 시작 전 시동 OFF, 기어 P(주차), 전자식 파킹 브레이크 체결, 외장 램프 꺼짐, 후드 닫힘, 충분한 배터리 잔량 조건을 만족해야 합니다.'
      ],
      settings: [
        '소프트웨어가 자동 다운로드되면 차량 화면이나 휴대폰 안내로 업데이트 준비 완료를 확인합니다.'
      ],
      steps: [
        '시동을 끄면 업데이트 시작 승인 화면을 확인할 수 있습니다.',
        '업데이트를 시작하려면 지금 설치 또는 시작을 선택합니다.',
        '업데이트를 미루려면 다음에 하기를 선택합니다.',
        '업데이트 승인 후 차량은 업데이트 준비를 진행합니다.',
        '조건을 만족하면 업데이트가 시작되고 완료 후 시스템이 꺼집니다.'
      ],
      disable: [
        '승인 화면에서 다음에 하기를 선택해 업데이트를 연기합니다.'
      ],
      limitations: [
        '차량에 설치된 소프트웨어 버전에 따라 업데이트 항목이 다를 수 있습니다.',
        '조건을 만족하지 않으면 업데이트를 시작할 수 없습니다.'
      ],
      warnings: [
        '업데이트 또는 복구가 실패하면 현대 고객센터, 직영 하이테크센터 또는 블루핸즈 점검이 필요합니다.',
        '업데이트 후 기능의 작동 사양이 변경될 수 있습니다.'
      ]
    },
    'smart-power-tailgate': {
      overview: '그랜저 GN7 매뉴얼 기준 파워 트렁크는 스마트 키 또는 차량 버튼으로 트렁크를 전동 개폐하고, 스마트 트렁크 설정 시 후방 감지 영역 접근으로 자동 열림을 지원합니다.',
      preconditions: [
        '3 km/h 이상의 속도로 이동 중에는 트렁크를 열 수 없습니다.',
        '스마트 트렁크는 모든 도어가 닫히고 잠긴 상태에서 약 15초 이후 작동 조건을 만족해야 합니다.',
        '스마트 키를 휴대하고 트렁크 뒤쪽 감지 영역 약 50~100 cm 이내에 접근해야 합니다.'
      ],
      settings: [
        '시동 ON 상태에서 인포테인먼트 시스템의 설정 > 차량 > 도어 > 스마트 트렁크를 선택하면 스마트 트렁크 기능이 켜집니다.'
      ],
      steps: [
        '스마트 키의 트렁크 열림/닫힘 버튼을 길게 누르면 경고음과 함께 트렁크가 열립니다.',
        '스마트 키를 휴대하고 파워 트렁크 핸들 스위치를 눌러 트렁크를 열 수 있습니다.',
        '열린 트렁크는 스마트 키의 트렁크 열림/닫힘 버튼을 길게 누르거나 파워 트렁크 닫힘 버튼으로 닫습니다.',
        '스마트 트렁크 설정 후 스마트 키를 휴대하고 후방 감지 영역에 접근하면 비상 경고등과 경고음이 작동합니다.',
        '열림 준비가 끝나면 트렁크가 자동으로 열립니다.'
      ],
      disable: [
        '스마트 트렁크 감지 및 경보 중 도어 잠금 버튼, 도어 잠금 해제 버튼, 트렁크 작동 버튼, 비상 경보 버튼을 짧게 누르면 기능이 즉시 중지됩니다.',
        '인포테인먼트 시스템의 설정 > 차량 > 도어 > 스마트 트렁크에서 기능을 해제합니다.'
      ],
      limitations: [
        '영하의 기온에서는 시스템 특성상 트렁크 자동 열림이 원활하지 않을 수 있습니다.',
        '차량 안에 스마트 키가 있으면 스마트 트렁크가 작동하지 않습니다.',
        '차량에 충전 케이블이 연결되어 있거나 충전 중일 경우 스마트 트렁크가 작동하지 않습니다.',
        '주파수 혼선 환경에서는 스마트 트렁크 작동이 지연되거나 작동 거리가 달라질 수 있습니다.'
      ],
      warnings: [
        '차 안에 어린이나 애완동물만 남겨두고 차량을 떠나지 마십시오.',
        '파워 트렁크 작동 중 물체 끼임 인식 기능을 확인하려고 신체나 물건을 작동 범위에 두지 마십시오.',
        '세차 시 스마트 트렁크 기능을 중지한 후 세차하십시오.',
        '어린이가 스마트 키를 휴대하면 스마트 트렁크를 작동시킬 수 있으므로 주의하십시오.'
      ]
    }
  };
  confirmed.forEach(item => {
    const feature = features.find(f => f.id === item.id);
    if (!feature) return;
    if (detailById[item.id]) {
      Object.assign(feature, detailById[item.id]);
    }
    feature.applies = Array.isArray(feature.applies) ? feature.applies : [];
    const existing = feature.applies.find(apply => apply.vehicleId === vehicleApply.vehicleId);
    if (existing) Object.assign(existing, vehicleApply);
    else feature.applies.push({ ...vehicleApply });
    feature.sources = Array.isArray(feature.sources) ? [...new Set([...feature.sources, sourceKey])] : [sourceKey];
    feature.aliases = [...new Set([...(feature.aliases || []), ...(aliasesById[item.id] || []), ...item.found.map(hit => hit.term)])];
    feature.manualEvidence = { ...evidenceBase, section: sectionHints[item.id] || item.found.map(hit => hit.term).join(' / '), matchedKeywords: item.found.map(hit => hit.term), pageRange: 'GN7_2026_ko_KR.txt 본문 검색 확인' };
    feature.vehicleAudit = { ...(feature.vehicleAudit || {}), hyGrandeur2026: { confirmed: true, manualFile: 'GN7_2026_ko_KR.txt', matchedKeywords: item.found, updatedAt: '2026-07-07' } };
  });
};
window.applyGn7ManualAudit();
