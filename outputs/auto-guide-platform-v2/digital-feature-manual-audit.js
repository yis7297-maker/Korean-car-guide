/* Digital-feature conservative audit: removes generated instructions not tied to a direct official manual. */
(function applyDigitalFeatureManualAudit() {
  const targetIds = new Set([
    'apple-carplay-wired', 'apple-carplay-wireless',
    'android-auto-wired', 'android-auto-wireless',
    'fingerprint-auth', 'face-connect',
    'genesis-dk2', 'genesis-dk2-touch',
    'hyundai-dk2', 'hyundai-dk2-touch',
    'built-in-cam', 'built-in-cam2', 'built-in-cam2-plus',
    'ccnc-system', 'ccnc-ota', 'pleos-connect',
    'rear-voice-recognition', 'hyundai-ai', 'kia-ai',
    'hyundai-ai-assistant', 'pleos-ai-voice',
    'pleos-personalization', 'pleos-ota-apps'
  ]);
  const generatedSettings = new Set([
    '설정 → 차량 → 디지털 키 또는 사용자 인증',
    '홈 → 빌트인 캠 또는 카메라',
    '홈 → 설정 → 기기 연결 또는 시스템',
    '홈 → 커넥티드 서비스 또는 공식 앱'
  ]);
  const generatedSteps = new Set([
    '차량 화면 또는 전용 버튼에서 기능을 선택합니다.',
    '화면 안내와 차량 상태를 확인한 뒤 사용합니다.'
  ]);
  const genericLimitations = new Set([
    '차종, 연식, 트림, 옵션과 차량 상태에 따라 지원 범위가 달라질 수 있습니다.'
  ]);

  features.forEach(feature => {
    if (!targetIds.has(feature.id)) return;

    feature.settings = (feature.settings || []).filter(item => !generatedSettings.has(item));
    feature.steps = (feature.steps || []).filter(item => !generatedSteps.has(item));
    feature.limitations = (feature.limitations || []).filter(item => !genericLimitations.has(item));

    const hasOnlyHubSources = (feature.sources || []).every(source =>
      ['hyundaiCatalog', 'hyundaiManual', 'kiaCatalog', 'kiaManual', 'genesisCatalog', 'pleosPending'].includes(source)
    );
    if (hasOnlyHubSources) {
      feature.verify = verify(false);
      feature.status = '공식 세부 절차 검증 필요';
      feature.preconditions = [];
      feature.settings = [];
      feature.steps = [];
      feature.disable = [];
      feature.limitations = [];
      feature.warnings = [];
      feature.applies = [];
    }
    feature.updatedAt = '2026-06-25';
  });

  render();
})();
