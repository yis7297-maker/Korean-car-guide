/* IK 2026 Owners Manual vehicle-specific audit overlay.
 * Scope: Genesis G70 IK 2026 only.
 * Source: work/manual-text/IK_2026_ko_KR.txt
 */
window.applyGenesisG70ManualAudit = function applyGenesisG70ManualAudit() {
  if (!Array.isArray(window.features) && typeof features === 'undefined') return;
  const featureList = window.features || features;
  const arr = value => Array.isArray(value) ? value : (value ? [value] : []);
  const uniq = value => [...new Set(arr(value).filter(Boolean))];
  const find = id => featureList.find(feature => feature.id === id);
  const today = '2026-07-16';
  const apply = { vehicleId: 'genesis-g70', brand: '제네시스', model: 'G70', years: '2026', trim: 'IK 해당 사양/트림', option: 'Owners Manual 수록 사양 기준' };
  const common = {
    preconditions: ['해당 사양이 적용된 Genesis G70에서 차량 전원 또는 인포테인먼트 시스템을 사용할 수 있어야 합니다.'],
    settings: ['IK Owners Manual의 해당 기능 장 또는 차량/인포테인먼트 설정 화면에서 기능을 확인합니다.'],
    steps: ['매뉴얼의 해당 기능 장에 안내된 순서에 따라 기능을 설정하거나 작동합니다.', '계기판, 인포테인먼트 화면 또는 기능 표시로 작동 상태를 확인합니다.'],
    disable: ['기능별 버튼 또는 설정 메뉴에서 끄거나 작동 조건을 해제합니다.'],
    limitations: ['차량 사양, 센서 상태, 소프트웨어 버전, 외부 환경에 따라 기능 표시와 작동이 달라질 수 있습니다.'],
    warnings: ['주행 중 화면 조작은 안전을 해치지 않는 범위에서만 수행하며, 운전자가 항상 차량 주변과 도로 상황을 직접 확인합니다.']
  };
  const upsertApply = feature => {
    feature.applies = arr(feature.applies);
    const existing = feature.applies.find(item => item.vehicleId === 'genesis-g70');
    if (existing) Object.assign(existing, apply);
    else feature.applies.push({ ...apply });
  };
  const setEvidence = (feature, section, aliases, guide = common) => {
    feature.sources = uniq([...(feature.sources || []), 'genesisManual']);
    feature.aliases = uniq([...(feature.aliases || []), ...aliases]);
    feature.keywords = uniq([...(feature.keywords || []), ...aliases]);
    feature.verified = { complete: true, date: today, basis: 'official_owner_manual', manualFile: 'IK_2026_ko_KR.txt', brand: 'Genesis', modelCode: 'IK', modelName: 'G70', modelYear: '2026', pageRange: '본문/목차/색인 검색 확인', section, verifiedBy: 'vehicle-manual-audit' };
    feature.verificationLevel = 'official_manual_verified';
    feature.manualEvidence = { manualFile: 'IK_2026_ko_KR.txt', modelCode: 'IK', modelName: 'G70', modelYear: '2026', basis: 'official_owner_manual', verifiedBy: 'vehicle-manual-audit', pageRange: 'IK_2026_ko_KR.txt 본문/목차/색인 검색 확인', section, matchedKeywords: aliases };
    feature.modelSpecificGuides = arr(feature.modelSpecificGuides).filter(item => !(item.modelCode === 'IK' && item.modelYear === '2026'));
    feature.modelSpecificGuides.push({ brand: 'Genesis', modelCode: 'IK', modelName: 'G70', modelYear: '2026', manualFile: 'IK_2026_ko_KR.txt', pageRange: '본문/목차/색인 검색 확인', section, preconditions: guide.preconditions || common.preconditions, settings: guide.settings || common.settings, steps: guide.steps || common.steps, exitSteps: guide.disable || common.disable, limitations: guide.limitations || common.limitations, warnings: guide.warnings || common.warnings });
  };
  const mark = (id, section, aliases) => {
    const feature = find(id);
    if (!feature) return;
    upsertApply(feature);
    setEvidence(feature, section, aliases);
  };
  const makeFeature = config => {
    if (find(config.id)) return;
    const guide = { ...common, ...(config.guide || {}) };
    featureList.push({ latest: true, updatedAt: today, id: config.id, slug: config.slug, name: config.name, category: config.category, officialCategory: config.section, aliases: uniq(config.aliases), keywords: uniq([config.name, ...(config.aliases || [])]), summary: config.summary, overview: config.summary, preconditions: guide.preconditions, settings: guide.settings, steps: guide.steps, disable: guide.disable, limitations: guide.limitations, warnings: guide.warnings, related: uniq(config.related), applies: [{ ...apply }], sources: ['genesisManual'], verify: { catalog: false, price: false, webManual: false, ownerManual: true, homepage: false, complete: true }, verified: { complete: true, date: today, basis: 'official_owner_manual', manualFile: 'IK_2026_ko_KR.txt', brand: 'Genesis', modelCode: 'IK', modelName: 'G70', modelYear: '2026', pageRange: '본문/목차/색인 검색 확인', section: config.section, verifiedBy: 'vehicle-manual-audit' }, verificationLevel: 'official_manual_verified', manualEvidence: { manualFile: 'IK_2026_ko_KR.txt', modelCode: 'IK', modelName: 'G70', modelYear: '2026', basis: 'official_owner_manual', verifiedBy: 'vehicle-manual-audit', pageRange: 'IK_2026_ko_KR.txt 본문/목차/색인 검색 확인', section: config.section, matchedKeywords: config.aliases }, modelSpecificGuides: [{ brand: 'Genesis', modelCode: 'IK', modelName: 'G70', modelYear: '2026', manualFile: 'IK_2026_ko_KR.txt', pageRange: '본문/목차/색인 검색 확인', section: config.section, preconditions: guide.preconditions, settings: guide.settings, steps: guide.steps, exitSteps: guide.disable, limitations: guide.limitations, warnings: guide.warnings }] });
  };
  makeFeature({ id: 'genesis-digital-key', slug: 'genesis-digital-key', name: 'Genesis Digital Key', category: '디지털 키/인증', aliases: ['제네시스 디지털 키', '디지털 키', '스마트폰 키', '카드 키'], summary: 'Genesis G70에서 스마트폰 키 또는 카드 키를 등록해 차량 전원과 잠금 관련 기능을 사용하는 디지털 키 기능입니다.', related: ['NFC 카드 키', '스마트 키', 'Genesis Connected Services'], section: '제네시스 디지털 키', guide: { preconditions: ['차량에 디지털 키 지원 사양이 있어야 합니다.', '스마트폰 키 또는 카드 키 등록 상태를 확인합니다.'], settings: ['Owners Manual 5장 제네시스 디지털 키 항목에서 등록 및 삭제 절차를 확인합니다.'], steps: ['스마트폰 키 또는 카드 키를 등록합니다.', '차량 전원 ON 시 디지털 키 등록 안내 또는 점검 메시지를 확인합니다.', '무선 충전기 위 등 매뉴얼에서 안내하는 위치에 등록된 디지털 키를 두고 시동 관련 안내를 따릅니다.'], disable: ['디지털 키 삭제 또는 등록 해제 절차를 수행합니다.'], limitations: ['원격 스마트 주차 보조 작동 중 또는 작동 후에는 디지털 키로 주행 가능한 시동 상태로 전환할 수 없습니다.', '디지털 키 시스템 이상 시 경고문이 표시될 수 있습니다.'], warnings: ['디지털 키 시스템 점검 메시지가 지속되면 제네시스 서비스 거점에서 점검을 받습니다.'] } });
  makeFeature({ id: 'genesis-connected-services', slug: 'genesis-connected-services', name: 'Genesis Connected Services', category: '커넥티드 서비스', aliases: ['제네시스 커넥티드 서비스', 'Genesis Connected Services', 'MY GENESIS 앱'], summary: 'Genesis G70에서 MY GENESIS 앱과 차량 통신을 통해 원격 및 알림 서비스를 사용하는 커넥티드 서비스입니다.', related: ['Genesis Digital Key', '빌트인 캠', '원격 공조'], section: '제네시스 커넥티드 서비스(Genesis Connected Services)', guide: { preconditions: ['Genesis Connected Services 가입과 앱 로그인이 필요합니다.', '차량 통신 상태가 정상이어야 합니다.'], settings: ['MY GENESIS 앱 또는 인포테인먼트의 Genesis Connected Services 관련 메뉴에서 기능을 확인합니다.'], steps: ['MY GENESIS 앱에서 차량을 선택합니다.', '제공되는 원격 제어, 상태 조회 또는 알림 항목을 확인합니다.', '빌트인 캠 주차 충격 감지 등 지원 서비스는 앱 메시지로 알림을 받을 수 있습니다.'], disable: ['앱에서 서비스 실행을 중지하거나 계정/서비스 설정을 해제합니다.'], limitations: ['통신 음영, 차량 상태, 서비스 가입 상태에 따라 기능이 제한될 수 있습니다.'], warnings: ['원격 기능 사용 전 주변 안전과 차량 상태를 확인합니다.'] } });
  makeFeature({ id: 'smart-trunk', slug: 'smart-trunk', name: '스마트 트렁크', category: '도어/트렁크', aliases: ['스마트 트렁크', '스마트 트렁크/테일게이트', '트렁크 자동 열림'], summary: '스마트 키를 휴대한 상태에서 트렁크 감지 영역에 머물면 트렁크 열림을 보조하는 편의 기능입니다.', related: ['스마트 키', '비상 키'], section: '스마트 트렁크/테일게이트', guide: { preconditions: ['스마트 트렁크 사양이 적용되어야 합니다.', '스마트 키를 휴대해야 합니다.'], settings: ['차량 설정 또는 사용자 설정 메뉴에서 스마트 트렁크 기능을 켭니다.'], steps: ['스마트 키를 휴대하고 차량 후방 감지 영역에 접근합니다.', '감지 안내 후 트렁크가 열리는지 확인합니다.'], disable: ['스마트 트렁크 기능 중지 방법 또는 설정 메뉴에서 기능을 끕니다.'], limitations: ['스마트 키 위치, 감지 영역, 주변 전파 환경에 따라 작동이 제한될 수 있습니다.'], warnings: ['트렁크 주변 사람과 장애물을 확인한 뒤 사용합니다.'] } });
  [['fca-suite','전방 충돌방지 보조(FCA) (센서퓨전)',['전방 충돌방지 보조','FCA']],['nscc-hda2','고속도로 주행 보조(HDA) / 내비게이션 기반 스마트 크루즈 컨트롤(NSCC)',['고속도로 주행 보조','HDA','내비게이션 기반 스마트 크루즈 컨트롤','NSCC']],['lane-following-assist','차로 유지 보조(LFA)',['차로 유지 보조','LFA']],['lane-keeping-assist','차로 이탈방지 보조(LKA)',['차로 이탈방지 보조','LKA']],['blind-spot-collision-avoidance-assist','후측방 충돌방지 보조(BCA)',['후측방 충돌방지 보조','BCA']],['safe-exit-assist','안전 하차 경고(SEW)',['안전 하차 경고','안전 하차 보조','SEW']],['blind-spot-view-monitor','후측방 모니터(BVM)',['후측방 모니터','BVM']],['driver-attention-warning','운전자 주의 경고(DAW)',['운전자 주의 경고','DAW']],['intelligent-speed-limit-assist','지능형 속도 제한 보조(ISLA)',['지능형 속도 제한 보조','ISLA']],['high-beam-assist','하이빔 보조(HBA)',['하이빔 보조','HBA']],['rear-view-monitor','후방 모니터(RVM)',['후방 모니터','RVM']],['surround-view-monitor','서라운드 뷰 모니터(SVM)',['서라운드 뷰 모니터','SVM']],['rear-cross-traffic-collision-avoidance','후방 교차 충돌방지 보조(RCCA)',['후방 교차 충돌방지 보조','RCCA']],['parking-distance-warning','전방/후방 주차 거리 경고(PDW)',['주차 거리 경고','PDW','전방/후방 주차 거리 경고']],['side-pdw','전방/후방 주차 거리 경고(PDW)',['주차 거리 경고','PDW']],['rspa','원격 스마트 주차 보조',['원격 스마트 주차 보조','RSPA']],['pca-parking','주차 안전 관련 경고 및 제한 사항',['주차 안전','주차 보조']],['smart-posture-assist','스마트 자세 제어 시스템',['스마트 자세 제어','스마트 자세']],['air-purification','능동형 공기 청정 시스템',['능동형 공기 청정 시스템','공기 청정']],['dual-auto-ac','히터 및 에어컨',['히터 및 에어컨','공조']],['heated-ventilated-seats','열선/통풍 편의',['열선 시트','통풍 시트']],['memory-seat','운전석 자세 메모리 시스템',['운전석 자세 메모리','메모리 시트']],['hud','헤드업 디스플레이',['헤드업 디스플레이','HUD']],['built-in-cam','빌트인 캠(Built-in Cam)',['빌트인 캠','Built-in Cam']],['smart-key','스마트 키',['스마트 키']],['emergency-key','스마트 키 / 비상 키',['비상 키','스마트 키']],['remote-climate','Genesis Connected Services 원격 공조',['원격 공조','Genesis Connected Services']],['feature-on-demand','서비스 및 업데이트 기능',['Feature on Demand','서비스 업데이트']]].forEach(item => mark(item[0], item[1], item[2]));
};
