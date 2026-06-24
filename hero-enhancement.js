/* Move the existing live search into the hero without duplicating its event bindings. */
const heroSearchMount = document.querySelector('#heroSearchMount');
const liveSearchBox = document.querySelector('.search-box');

if (heroSearchMount && liveSearchBox) {
  heroSearchMount.appendChild(liveSearchBox);
  const input = liveSearchBox.querySelector('#searchInput');
  input.placeholder = '기능 검색 — 원격 스마트 주차, 디지털 키, 애플 카플레이…';
  input.setAttribute('aria-label', '자동차 기능 검색');

  const suggestions = document.createElement('div');
  suggestions.className = 'hero-search-suggestions';
  ['원격 스마트 주차', '디지털 키', '애플 카플레이', '빌트인 캠', '스마트 회생제동'].forEach(keyword => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = keyword;
    button.onclick = () => {
      input.value = keyword;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('.results-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    suggestions.appendChild(button);
  });
  heroSearchMount.appendChild(suggestions);
}
