/* Official-source verification badges follow the split verified / verificationLevel policy. */
(function installOfficialVerificationSystem() {
  const levels = {
    official_manual_verified: '공식 매뉴얼 검증',
    official_source_verified: '공식 자료 검증',
    pending_verification: '검증 진행 중'
  };

  const defaults = {
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

  const isVerified = feature => {
    if (feature.verified === true) return true;
    return Boolean(feature.verified && typeof feature.verified === 'object' && feature.verified.complete === true);
  };

  const verificationValue = (feature, flatKey, objectKey = flatKey) => {
    if (feature[flatKey]) return feature[flatKey];
    if (objectKey && feature[objectKey]) return feature[objectKey];
    if (feature.verified && typeof feature.verified === 'object') return feature.verified[objectKey] || '';
    return '';
  };

  features.forEach(feature => {
    Object.entries(defaults).forEach(([key, value]) => {
      if (feature[key] === undefined || feature[key] === null) feature[key] = value;
    });

    const complete = isVerified(feature);
    feature.verificationLevel = complete
      ? (feature.verificationLevel === 'pending_verification' ? 'official_source_verified' : feature.verificationLevel)
      : 'pending_verification';
    feature.status = complete ? '공식 검증 완료' : '검증 진행 중';
    feature._isOfficialVerified = complete;
  });

  const rows = feature => feature._isOfficialVerified ? [
    `검증 수준: ${levels[feature.verificationLevel] || feature.verificationLevel}`,
    `출처: ${verificationValue(feature, 'verifiedSource', 'basis')}`,
    `브랜드: ${verificationValue(feature, 'verifiedBrand', 'brand')}`,
    `차량: ${verificationValue(feature, 'verifiedModel', 'modelName')}`,
    `연식: ${verificationValue(feature, 'verifiedModelYear', 'modelYear')}`,
    `매뉴얼: ${verificationValue(feature, 'verifiedManual', 'manualFile')}`,
    `페이지 범위: ${verificationValue(feature, 'verifiedPageRange', 'pageRange') || '확인 필요'}`,
    `섹션: ${verificationValue(feature, 'verifiedSection', 'section') || '확인 필요'}`,
    `검증일: ${verificationValue(feature, 'verifiedDate', 'date')}`,
    `검증자: ${verificationValue(feature, 'verifiedBy', 'verifiedBy')}`
  ].filter(row => !row.endsWith(': ')) : [
    '공식 자료에서 기능과 절차를 확인하는 중입니다.'
  ];

  const previousRenderCards = renderCards;
  renderCards = function renderCardsWithOfficialStatus(list) {
    previousRenderCards(list);
    [...document.querySelectorAll('#cards .feature-card')].forEach((card, index) => {
      const feature = list[index];
      const metaRow = card.querySelector('.meta-row');
      if (!feature || !metaRow || metaRow.querySelector('[data-official-verification]')) return;
      const badge = document.createElement('span');
      badge.className = `meta ${feature._isOfficialVerified ? 'ok' : 'pending'}`;
      badge.dataset.officialVerification = 'true';
      badge.textContent = feature._isOfficialVerified
        ? (levels[feature.verificationLevel] || '공식 검증 완료')
        : '검증 진행 중';
      metaRow.prepend(badge);
    });
  };

  const previousOpenModal = openModal;
  openModal = function openModalWithOfficialStatus(feature, hasVehicleContext = false) {
    previousOpenModal(feature, hasVehicleContext);
    const body = document.querySelector('#featureModalBody');
    if (!body || body.querySelector('[data-official-verification]')) return;

    const title = body.querySelector('.detail-title-row > div');
    if (title) {
      const badge = document.createElement('span');
      badge.className = `status-pill ${feature._isOfficialVerified ? 'ok' : 'pending'}`;
      badge.dataset.officialVerification = 'true';
      badge.textContent = feature._isOfficialVerified
        ? (levels[feature.verificationLevel] || '공식 검증 완료')
        : '검증 진행 중';
      title.prepend(badge);
    }

    const section = document.createElement('section');
    section.className = 'detail-section';
    section.dataset.officialVerification = 'true';
    section.innerHTML = `<h3>공식 검증 기록</h3><ul class="step-list">${rows(feature)
      .map(row => `<li>${row}</li>`).join('')}</ul>`;
    const faq = body.querySelector('[data-audit-faq]');
    body.insertBefore(section, faq || null);
  };

  render();
})();
