/* Convenience-feature audit: keeps only information that does not imply unverified model-specific procedures. */
(function applyConvenienceManualAudit() {
  const targetIds = new Set([
    'dual-auto-ac',
    'air-purification',
    'after-blow',
    'remote-climate',
    'heated-ventilated-seats',
    'ergo-motion-seat',
    'relaxation-comfort-seat',
    'dynamic-body-care-seat',
    'memory-seat',
    'smart-power-tailgate',
    'hud',
    'camping-mode',
    'digital-center-mirror',
    'swiveling-seat',
    'walk-in-device',
    'smart-posture-assist',
    'passenger-talk',
    'passenger-view',
    'rear-climate-control',
    'climate-control',
    'smart-key',
    'emergency-key',
    'remote-engine-start'
  ]);

  const reviewFeatures = [
    {
      id: 'climate-control',
      slug: 'climate-control',
      name: '공조',
      category: '공조',
      officialCategory: '공조',
      aliases: ['에어컨', '히터', '냉난방', 'climate control']
    },
    {
      id: 'smart-key',
      slug: 'smart-key',
      name: '스마트 키',
      category: '편의',
      officialCategory: '키 / 도어',
      aliases: ['스마트키', 'smart key']
    },
    {
      id: 'emergency-key',
      slug: 'emergency-key',
      name: '비상 키',
      category: '편의',
      officialCategory: '키 / 도어',
      aliases: ['비상키', '기계식 키', 'mechanical key']
    },
    {
      id: 'remote-engine-start',
      slug: 'remote-engine-start',
      name: '원격 시동',
      category: '편의',
      officialCategory: '키 / 원격 시동',
      aliases: ['리모트 스타트', 'remote start', '스마트키 원격 시동']
    }
  ];

  reviewFeatures.forEach(item => {
    if (features.some(feature => feature.id === item.id)) return;
    features.push({
      ...item,
      status: '차종별 공식 매뉴얼 검증 필요',
      latest: true,
      updatedAt: '2026-06-25',
      overview: '차종별 공식 매뉴얼에서 메뉴, 버튼, 작동 조건과 절차를 확인한 뒤 제공할 예정입니다.',
      summary: '차종별 공식 매뉴얼 검증 후 제공 예정입니다.',
      preconditions: [],
      settings: [],
      steps: [],
      disable: [],
      limitations: [],
      warnings: [],
      related: [],
      applies: [],
      sources: [],
      sourceDetails: [],
      verify: verify(false),
      generation: {
        family: item.name,
        generation: '차종별 검증 대기',
        previous: [],
        differences: '차종별 공식 매뉴얼 확인 전에는 공통 절차를 제공하지 않습니다.'
      }
    });
  });

  features.forEach(feature => {
    if (!targetIds.has(feature.id)) return;
    feature.verify = verify(false);
    feature.status = '차종별 공식 매뉴얼 검증 필요';
    feature.preconditions = [];
    feature.settings = [];
    feature.steps = [];
    feature.disable = [];
    feature.limitations = [];
    feature.warnings = [];
    feature.applies = [];
    feature.modelVariants = [];
    feature.requiresModelSpecificManual = true;
    feature.updatedAt = '2026-06-25';
  });

  render();
})();
