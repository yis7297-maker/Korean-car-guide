(function installVehicleUiCleanup() {
  const map = window.KCG_VEHICLE_FEATURE_MAP;
  const mappedVehicleIds = new Set((map?.vehicles || []).map(vehicle => vehicle.vehicleId));
  const mappedByFeature = new Map();
  const cleanDisplay = value => String(value || '').replace(/검증\s*(미완료|진행 중|예정)/g, '').trim();
  const brandLabel = vehicle => vehicle.brandKo || (vehicle.brand === 'Hyundai' ? '현대자동차' : vehicle.brand === 'Genesis' ? '제네시스' : vehicle.brand);

  (map?.vehicles || []).forEach(vehicle => {
    (vehicle.features || []).forEach(item => {
      if (!item.available || !item.featureId) return;
      if (!mappedByFeature.has(item.featureId)) mappedByFeature.set(item.featureId, []);
      mappedByFeature.get(item.featureId).push({
        vehicleId: vehicle.vehicleId,
        brand: brandLabel(vehicle),
        model: vehicle.modelName,
        years: vehicle.modelYear,
        trim: vehicle.powertrain || '',
        option: item.section || item.matchedKeyword || '',
        verificationLevel: item.verificationLevel,
        manualFile: item.manualFile || vehicle.manualFile,
        section: item.section || item.matchedKeyword || ''
      });
    });
  });

  function uniqueApplications(items) {
    const seen = new Set();
    const normalized = [];
    items.forEach(item => {
      const next = { ...item, option: cleanDisplay(item.option || item.note || '') };
      const key = [next.vehicleId, next.brand, next.model, next.years, next.trim, next.option]
        .map(value => String(value || '').toLowerCase().replace(/\s+/g, ''))
        .join('|');
      if (!seen.has(key)) {
        seen.add(key);
        normalized.push(next);
      }
    });
    return normalized;
  }

  function applicationsFor(feature) {
    return window.KCG_normalizeFeatureApplications ? window.KCG_normalizeFeatureApplications(feature) : (feature.applies || []);
  }

  if (map && Array.isArray(features)) {
    window.KCG_normalizeFeatureApplications = function normalizeFeatureApplicationsWithAuthoritativeMap(feature) {
      const legacy = (feature.applies || []).filter(item => !mappedVehicleIds.has(item.vehicleId));
      return uniqueApplications([...legacy, ...(mappedByFeature.get(feature.id) || [])]);
    };
    features.forEach(feature => {
      feature.applies = window.KCG_normalizeFeatureApplications(feature);
      feature.supportedModels = feature.applies.map(item => ({ ...item })).filter(item => item.model);
    });
    if (typeof featureAppliesTo === 'function') {
      featureAppliesTo = function featureAppliesToAuthoritativeMap(feature, vehicleId) {
        return applicationsFor(feature).some(item => item.vehicleId === vehicleId);
      };
    }
  }

  if (typeof listHtml === 'function') {
    listHtml = function listHtmlWithoutFallback(title, rows, empty = '') {
      const values = Array.isArray(rows) ? rows.map(cleanDisplay).filter(Boolean) : [];
      return `<div class="detail-section"><h3>${title}</h3>${values.length ? `<ol>${values.map(row => `<li>${row}</li>`).join('')}</ol>` : (empty ? `<p class="muted">${empty}</p>` : '')}</div>`;
    };
  }

  if (typeof renderDatabaseView === 'function') {
    renderDatabaseView = function renderDatabaseViewClean() {
      ensureDatabaseView();
      const brandSelect = document.querySelector('#brandSelect');
      const vehicleSelect = document.querySelector('#vehicleSelect');
      const yearSelect = document.querySelector('#yearSelect');
      if (!brandSelect || !vehicleSelect || !yearSelect) return;

      brandSelect.innerHTML = ['전체', '현대', '기아', '제네시스']
        .map(brand => `<option value="${brand}" ${brand === state.brand ? 'selected' : ''}>${brand === '현대' ? '현대자동차' : brand}</option>`)
        .join('');
      const brandVehicles = state.brand === '전체' ? vehicles : vehicles.filter(vehicle => vehicle.brand === state.brand);
      vehicleSelect.innerHTML = `<option value="">전체</option>${brandVehicles.map(vehicle => `<option value="${vehicle.id}" ${vehicle.id === state.vehicleId ? 'selected' : ''}>${vehicle.name}${vehicle.future ? ' · 정보 제공 예정' : ''}</option>`).join('')}`;
      yearSelect.innerHTML = ['전체', '2027', '2026', '2025']
        .map(year => `<option value="${year}" ${year === state.year ? 'selected' : ''}>${year}</option>`)
        .join('');
      brandSelect.onchange = event => { state.brand = event.target.value; state.vehicleId = null; render(); };
      vehicleSelect.onchange = event => { state.vehicleId = event.target.value || null; render(); };
      yearSelect.onchange = event => { state.year = event.target.value; render(); };

      const summary = document.querySelector('#dbSummary');
      const vehicle = currentVehicle();
      if (!summary) return;
      if (!vehicle) {
        summary.innerHTML = '<h3>차량을 선택하세요</h3><p>차량을 선택하면 해당 차량에 매핑된 기능과 적용 연식, 파워트레인, 출처가 표시됩니다.</p>';
        return;
      }
      const groups = categories.filter(category => category !== '전체').map(category => ({
        category,
        items: features.filter(feature => feature.category === category && featureAppliesTo(feature, vehicle.id))
      })).filter(group => group.items.length);
      summary.innerHTML = `<h3>${vehicle.brand} ${vehicle.name} 기능 매핑</h3>${groups.map(group => `<div class="vehicle-category"><strong>${group.category}</strong><div>${group.items.map(feature => {
        const match = applicationsFor(feature).find(item => item.vehicleId === vehicle.id) || {};
        const primaryCondition = (feature.preconditions || feature.conditions || []).slice(0, 2).map(cleanDisplay).filter(Boolean).join(' · ') || cleanDisplay(match.option) || '차량별 적용 정보 확인';
        const related = (feature.related || feature.relatedFeatures || []).slice(0, 3).join(', ');
        return `<button type="button" data-feature="${feature.id}">
          <span class="vehicle-feature-name">${feature.name}</span>
          <small>${feature.officialCategory || feature.category}</small>
          <small>${feature.summary || feature.overview || ''}</small>
          <small>사용 조건: ${primaryCondition}</small>
          ${related ? `<small>관련 기능: ${related}</small>` : ''}
          <small>연식 ${match.years || vehicle.years || ''} · ${match.trim || vehicle.type || ''}</small>
        </button>`;
      }).join('')}</div></div>`).join('') || '<p class="no-results">선택한 차량에 연결된 기능이 없습니다.</p>'}`;
      summary.querySelectorAll('[data-feature]').forEach(button => {
        button.onclick = () => openModal(features.find(feature => feature.id === button.dataset.feature), true);
      });
    };
  }

  if (typeof renderCards === 'function') {
    renderCards = function renderCardsClean(list) {
      if (typeof cardsEl === 'undefined' || typeof cardTemplate === 'undefined') return;
      cardsEl.innerHTML = '';
      const vehicle = currentVehicle();
      if (vehicle?.future) {
        cardsEl.innerHTML = '<div class="future-vehicle-card"><div><strong>정보 제공 예정</strong><p>차세대 모델 공개 후 업데이트 예정</p></div></div>';
        return;
      }
      if (!list.length) {
        cardsEl.innerHTML = '<div class="no-results">선택한 차량/조건에 연결된 기능이 없습니다.</div>';
        return;
      }
      list.forEach(feature => {
        const applications = applicationsFor(feature);
        const match = vehicle ? applications.find(item => item.vehicleId === vehicle.id) : null;
        const node = cardTemplate.content.firstElementChild.cloneNode(true);
        const primaryCondition = (feature.preconditions || feature.conditions || []).slice(0, 1).map(cleanDisplay).filter(Boolean).join('') || cleanDisplay(match?.option) || '차량 선택 시 적용 여부 확인';
        const related = (feature.related || feature.relatedFeatures || []).slice(0, 2).join(', ');
        node.querySelector('.badge').className = `badge ${brandClass(applications[0]?.brand || '현대')}`;
        node.querySelector('.badge').textContent = feature.category;
        node.querySelector('h3').innerHTML = `<span class="feature-icon">${iconFor(feature)}</span><span>${feature.name}</span>`;
        node.querySelector('.description').textContent = feature.summary || feature.overview || '';
        node.querySelector('.meta-row').innerHTML = [
          `<span class="meta">${feature.officialCategory || feature.category}</span>`,
          `<span class="meta">${match ? `${match.years || vehicle?.years || ''} · ${match.trim || vehicle?.type || ''}` : '차량 선택 시 적용 여부 확인'}</span>`,
          `<span class="meta">사용 조건: ${primaryCondition}</span>`,
          related ? `<span class="meta">관련: ${related}</span>` : ''
        ].filter(Boolean).join('');
        node.querySelector('.bookmark').style.display = 'none';
        node.onclick = () => openModal(feature, Boolean(match));
        node.onkeydown = event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openModal(feature, Boolean(match));
          }
        };
        cardsEl.appendChild(node);
      });
    };
  }

  if (typeof render === 'function') render();
})();
