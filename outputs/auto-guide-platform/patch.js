/* 2026-06-22 requested content and UI revision */
// Unverified Pleos candidates are not published. Only confirmed features may return later.
for (let i = features.length - 1; i >= 0; i -= 1) {
  if (features[i].category === '플레오스' || /pleos|gleo|hyundai-ai-assistant/i.test(features[i].id)) features.splice(i, 1);
}
const pleosCategoryIndex = categories.indexOf('플레오스');
if (pleosCategoryIndex >= 0) categories.splice(pleosCategoryIndex, 1);

vehicles.push(
  { id: 'hy-avante-cn8-next', brand: '현대', name: '아반떼(CN8 후속)', group: '차세대 FMC', future: true, performance: false },
  { id: 'hy-tucson-nx5-next', brand: '현대', name: '투싼(NX5 후속)', group: '차세대 FMC', future: true, performance: false }
);

features.push(F({
  id: 'memory-reverse-assist',
  name: '메모리 리버스 어시스트 / MRA',
  category: '주차 편의',
  officialCategory: '주차 편의 / 후진 보조',
  aliases: ['MRA', 'Memory Reverse Assist', '메모리 후진', '후진 경로 재생'],
  summary: '저속 전진 시 지나온 경로를 저장하고, 필요할 때 해당 경로를 따라 후진하도록 조향을 보조합니다.',
  preconditions: ['더 뉴 그랜저의 해당 사양 적용 차량이어야 합니다.', '차량 주변과 저장할 전진 경로에 장애물이 없는지 확인합니다.', '차량 안내 화면에서 경로 저장 가능 상태인지 확인합니다.'],
  steps: ['저속으로 전진하면서 주차 보조 화면에서 메모리 리버스 어시스트를 선택해 경로를 저장합니다.', '후진이 필요한 위치에 정차한 뒤 기능을 활성화합니다.', '화면 안내에 따라 브레이크와 주변을 확인하며 후진 경로 재생을 시작합니다.', '차량이 저장 경로를 따라 조향하는 동안 운전자가 속도와 주변 안전을 계속 관리합니다.'],
  disable: ['브레이크를 밟거나 기능 종료를 선택해 경로 재생을 중지합니다.'],
  limitations: ['저장 경로를 벗어난 차량 위치, 경사가 큰 도로, 미끄러운 노면, 센서 오염, 장애물 감지 또는 시스템 안전 조건 미충족 시 제한되거나 종료될 수 있습니다.'],
  warnings: ['자동 주차나 자율주행 기능이 아니며, 충돌 방지와 제동 책임은 운전자에게 있습니다.'],
  related: ['원격 스마트 주차 보조 2 / RSPA 2', '서라운드 뷰 모니터', '주차 충돌방지 보조'],
  applies: apply(['hy-grandeur'], '더 뉴 그랜저 해당 사양', '트림/옵션별 적용 여부 확인'),
  sources: ['hyundaiCatalog', 'hyundaiManual'],
  verify: verify(true),
  generation: { family: 'Memory Reverse Assist', generation: 'MRA', previous: [], differences: '저장한 전진 경로를 기반으로 후진 조향을 보조합니다.' }
}));

function relatedLinksHtml(f) {
  const links = f.related.map(name => {
    const target = features.find(item => item.name === name || item.aliases?.includes(name));
    return target
      ? `<button type="button" class="related-link" data-related-id="${target.id}">${name}</button>`
      : `<span class="related-unlinked">${name}</span>`;
  });
  return `<div class="detail-section"><h3>관련 기능</h3><div class="related-links">${links.join('')}</div></div>`;
}

ensureDatabaseView = function () {
  document.querySelector('#databaseView')?.remove();
  if (document.querySelector('#compactVehiclePicker')) return;
  const picker = document.createElement('div');
  picker.id = 'compactVehiclePicker';
  picker.className = 'compact-picker';
  picker.innerHTML = `
    <p class="filter-title">차량 선택</p>
    <label>브랜드<select id="brandSelect"></select></label>
    <label>차종<select id="vehicleSelect"></select></label>
    <label>연식<select id="yearSelect"><option>2026/2027 현재 판매 기준</option><option>정보 제공 예정</option></select></label>`;
  document.querySelector('.filters').insertBefore(picker, document.querySelector('.search-box'));
};

renderDatabaseView = function () {
  ensureDatabaseView();
  const brandSelect = document.querySelector('#brandSelect');
  const vehicleSelect = document.querySelector('#vehicleSelect');
  brandSelect.innerHTML = ['현대', '기아', '제네시스'].map(brand => `<option value="${brand}" ${brand === state.brand ? 'selected' : ''}>${brand === '현대' ? '현대자동차' : brand}</option>`).join('');
  const brandVehicles = vehicles.filter(v => v.brand === state.brand);
  vehicleSelect.innerHTML = brandVehicles.map(v => `<option value="${v.id}" ${v.id === state.vehicleId ? 'selected' : ''}>${v.name}${v.future ? ' · 정보 제공 예정' : ''}</option>`).join('');
  if (!brandVehicles.some(v => v.id === state.vehicleId)) state.vehicleId = brandVehicles[0]?.id || null;
  const selected = currentVehicle();
  document.querySelector('#yearSelect').value = selected?.future ? '정보 제공 예정' : '2026/2027 현재 판매 기준';
  document.querySelector('#yearSelect').disabled = true;
  brandSelect.onchange = event => { state.brand = event.target.value; state.vehicleId = vehicles.find(v => v.brand === state.brand)?.id || null; render(); };
  vehicleSelect.onchange = event => { state.vehicleId = event.target.value; render(); };
};

renderCards = function (list) {
  cardsEl.innerHTML = '';
  const vehicle = currentVehicle();
  if (vehicle?.future) {
    cardsEl.innerHTML = `<div class="future-vehicle-card"><span class="feature-icon">${iconPaths['편의']}</span><div><strong>정보 제공 예정</strong><p>차세대 모델 공개 후 업데이트 예정</p></div></div>`;
    return;
  }
  if (!list.length) { cardsEl.innerHTML = '<div class="no-results">선택한 차량/조건에 연결된 기능이 없습니다.</div>'; return; }
  list.forEach(f => {
    const n = cardTemplate.content.firstElementChild.cloneNode(true);
    const match = vehicle ? f.applies.find(a => a.vehicleId === vehicle.id) : null;
    n.querySelector('.badge').className = `badge ${brandClass(f.applies[0]?.brand || '현대')}`;
    n.querySelector('.badge').textContent = f.category;
    n.querySelector('h3').innerHTML = `<span class="feature-icon">${iconFor(f)}</span><span>${f.name}</span>`;
    n.querySelector('.description').textContent = f.summary;
    n.querySelector('.meta-row').innerHTML = `<span class="meta">${f.officialCategory}</span><span class="meta">${match ? match.trim : '차량 선택 후 적용 여부 확인'}</span>`;
    n.querySelector('.bookmark').style.display = 'none';
    n.onclick = () => openModal(f, !!match);
    n.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openModal(f, !!match); } };
    cardsEl.appendChild(n);
  });
};

openModal = function (f, hasVehicleContext = false) {
  let modal = document.querySelector('#featureModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'featureModal';
    modal.className = 'feature-modal';
    modal.innerHTML = '<div class="feature-modal__backdrop"></div><div class="feature-modal__panel" role="dialog" aria-modal="true"><button class="feature-modal__close" type="button" aria-label="닫기">×</button><div id="featureModalBody"></div></div>';
    document.body.appendChild(modal);
    modal.querySelector('.feature-modal__close').onclick = closeModal;
    modal.querySelector('.feature-modal__backdrop').onclick = closeModal;
  }
  const vehicle = currentVehicle();
  const match = vehicle ? f.applies.find(a => a.vehicleId === vehicle.id) : null;
  const context = hasVehicleContext && match
    ? [`선택 차량: ${match.brand} ${match.model}`, `적용 연식: ${match.years}`, `적용 트림: ${match.trim}`, `기본/선택 옵션 여부: ${match.option}`]
    : ['차량을 선택하면 적용 연식, 트림, 기본/선택 옵션 여부를 확인할 수 있습니다.'];
  document.querySelector('#featureModalBody').innerHTML = `
    <div class="detail-title-row"><span class="feature-icon large">${iconFor(f)}</span><div><h2>${f.name}</h2><p class="muted">공식 분류: ${f.officialCategory}</p></div></div>
    <p>${f.overview}</p>
    ${listHtml(hasVehicleContext && match ? '선택 차량 적용 정보' : '적용 여부 안내', context)}
    ${listHtml('사용 전 조건', f.preconditions)}
    ${listHtml('사용 절차', f.steps)}
    ${listHtml('작동 제한 상황', f.limitations)}
    ${listHtml('주의사항', f.warnings)}
    ${relatedLinksHtml(f)}`;
  modal.querySelectorAll('[data-related-id]').forEach(button => button.onclick = () => openModal(features.find(item => item.id === button.dataset.relatedId), false));
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
};

render = function () {
  makeChips(categories, '#categoryFilters', 'category');
  document.querySelectorAll('.brand-tab').forEach(tab => tab.classList.toggle('is-active', (tab.dataset.brand === 'all' ? '현대' : tab.dataset.brand) === state.brand));
  renderDatabaseView();
  const list = filteredFeatures();
  const vehicle = currentVehicle();
  document.querySelector('#resultCount').textContent = vehicle?.future ? '업데이트 대기' : `${list.length}개 기능`;
  document.querySelector('#sectionTitle').textContent = vehicle ? `${vehicle.name} 기능 데이터` : '전체 기능 데이터';
  renderCards(list);
  renderStats();
};

function initTrafficWidget() {
  const todayKey = `kcg-visits-${new Date().toISOString().slice(0, 10)}`;
  if (!sessionStorage.getItem('kcg-counted')) {
    localStorage.setItem(todayKey, String(Number(localStorage.getItem(todayKey) || 0) + 1));
    localStorage.setItem('kcg-total-visits', String(Number(localStorage.getItem('kcg-total-visits') || 0) + 1));
    sessionStorage.setItem('kcg-counted', '1');
  }
  document.querySelector('#todayVisitors').textContent = Number(localStorage.getItem(todayKey) || 0).toLocaleString('ko-KR');
  document.querySelector('#totalVisitors').textContent = Number(localStorage.getItem('kcg-total-visits') || 0).toLocaleString('ko-KR');
  const widget = document.querySelector('#trafficWidget');
  const toggle = document.querySelector('#trafficAdminToggle');
  const sync = () => {
    const enabled = localStorage.getItem('kcg-traffic-enabled') !== 'false';
    widget.hidden = !enabled;
    toggle.textContent = `방문자 위젯 ${enabled ? 'ON' : 'OFF'}`;
    toggle.setAttribute('aria-pressed', String(enabled));
  };
  toggle.onclick = () => { localStorage.setItem('kcg-traffic-enabled', String(localStorage.getItem('kcg-traffic-enabled') === 'false')); sync(); };
  sync();
}

initTrafficWidget();
render();
