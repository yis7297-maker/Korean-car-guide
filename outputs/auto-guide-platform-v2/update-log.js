/* Update history is fetched only when the modal is opened. */
let updateLogDataCache = null;

const updateTypeClass = {
  '신규 기능': 'new',
  '기능 수정': 'modify',
  '차량 추가': 'vehicle',
  'UI 개선': 'ui',
  '오류 수정': 'fix'
};

function createUpdateModal() {
  let modal = document.querySelector('#updateModal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'updateModal';
  modal.className = 'update-modal';
  modal.innerHTML = `
    <div class="update-modal__backdrop"></div>
    <section class="update-modal__panel" role="dialog" aria-modal="true" aria-labelledby="updateModalTitle">
      <header class="update-modal__header">
        <div class="update-modal__title-row">
          <h2 id="updateModalTitle">업데이트 내역</h2>
          <button class="update-modal__close" type="button" aria-label="업데이트 내역 닫기">×</button>
        </div>
        <label class="update-search">
          <span class="sr-only">업데이트 검색</span>
          <input id="updateSearchInput" type="search" placeholder="업데이트 검색 — 예: MRA, EV, 스테이 모드">
        </label>
      </header>
      <div class="update-modal__body" id="updateModalBody">
        <p class="update-log-loading">업데이트 내역을 불러오는 중입니다.</p>
      </div>
    </section>`;

  document.body.appendChild(modal);
  modal.querySelector('.update-modal__backdrop').onclick = closeUpdateModal;
  modal.querySelector('.update-modal__close').onclick = closeUpdateModal;
  modal.querySelector('#updateSearchInput').addEventListener('input', event => {
    renderUpdateLogModal(updateLogDataCache || [], event.target.value);
  });
  return modal;
}

function renderUpdateLogModal(data, query = '') {
  const body = document.querySelector('#updateModalBody');
  if (!body) return;
  const keyword = query.trim().toLowerCase();
  const filtered = data.map(group => ({
    ...group,
    items: group.items.filter(item =>
      !keyword || `${group.date} ${item.type} ${item.text}`.toLowerCase().includes(keyword)
    )
  })).filter(group => group.items.length);

  body.innerHTML = filtered.length
    ? filtered.map(group => `
      <section class="update-log-group">
        <time datetime="${group.date.replace(/\./g, '-')}">${group.date}</time>
        <ul>${group.items.map(item => `
          <li>
            <span class="update-type update-type--${updateTypeClass[item.type] || 'modify'}">${item.type}</span>
            <span>${item.text}</span>
          </li>`).join('')}</ul>
      </section>`).join('')
    : '<p class="update-log-empty">검색 결과가 없습니다.</p>';
}

async function loadUpdateLogData() {
  if (updateLogDataCache) return updateLogDataCache;
  const response = await fetch('updates.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('업데이트 데이터를 불러오지 못했습니다.');
  updateLogDataCache = await response.json();
  return updateLogDataCache;
}

async function openUpdateModal() {
  const modal = createUpdateModal();
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
  const search = modal.querySelector('#updateSearchInput');
  search.value = '';
  modal.querySelector('#updateModalBody').innerHTML = '<p class="update-log-loading">업데이트 내역을 불러오는 중입니다.</p>';
  try {
    renderUpdateLogModal(await loadUpdateLogData());
    search.focus();
  } catch (error) {
    modal.querySelector('#updateModalBody').innerHTML = `<p class="update-log-empty">${error.message}</p>`;
  }
}

function closeUpdateModal() {
  document.querySelector('#updateModal')?.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-open-update-log]').forEach(button => {
  button.addEventListener('click', openUpdateModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.querySelector('#updateModal.is-open')) closeUpdateModal();
});
