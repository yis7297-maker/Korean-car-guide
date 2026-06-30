/* Final release audit normalization. No feature-specific facts are invented here. */
(function applyFinalReleaseAudit() {
  const normalize = value => String(value || '').trim();
  const unique = values => [...new Set(values.map(normalize).filter(Boolean))];
  const genericFaq = feature => [{
    question: `${feature.name} 기능의 적용 여부는 어떻게 확인하나요?`,
    answer: feature.applies?.length
      ? '차량 연식, 트림, 옵션과 소프트웨어 버전에 따라 다를 수 있으므로 해당 차량의 공식 매뉴얼과 제조사 안내를 최종 기준으로 확인하세요.'
      : '현재 차종별 적용 정보가 공식 원문 기준으로 확정되지 않았습니다. 해당 차량의 공식 매뉴얼과 제조사 안내를 확인하세요.'
  }];

  features.forEach(feature => {
    feature.subcategory = normalize(feature.subcategory)
      || normalize(feature.officialCategory).split('/').map(value => value.trim()).filter(Boolean).at(-1)
      || feature.category;
    feature.keywords = unique([feature.name, feature.slug, feature.id, ...(feature.aliases || []), ...(feature.slugAliases || [])]);
    feature.faq = genericFaq(feature);
    feature.settings = Array.isArray(feature.settings) ? feature.settings : [];
    feature.sourceDetails = Array.isArray(feature.sourceDetails) ? feature.sourceDetails : [];
    feature.related = (feature.related || []).filter(name => features.some(candidate =>
      [candidate.name, candidate.id, candidate.slug, ...(candidate.aliases || [])]
        .some(value => normalize(value).toLowerCase() === normalize(name).toLowerCase())
    ));
  });

  const previousOpenModal = openModal;
  openModal = function openAuditedModal(feature, hasVehicleContext = false) {
    previousOpenModal(feature, hasVehicleContext);
    const body = document.querySelector('#featureModalBody');
    if (!body || body.querySelector('[data-audit-faq]')) return;
    const faq = document.createElement('section');
    faq.className = 'detail-section';
    faq.dataset.auditFaq = 'true';
    faq.innerHTML = `<h3>FAQ</h3>${(feature.faq || []).map(item =>
      `<details><summary>${item.question}</summary><p>${item.answer}</p></details>`
    ).join('')}`;
    const detailLink = body.querySelector('.feature-detail-link');
    body.insertBefore(faq, detailLink || null);
  };

  render();
})();
