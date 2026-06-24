import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(await fs.readFile(path.join(root, 'function-data.json'), 'utf8'));
const config = JSON.parse(await fs.readFile(path.join(root, 'seo-config.json'), 'utf8'));
const baseUrl = config.baseUrl.replace(/\/+$/, '');
const functionRoot = path.join(root, 'function');
const publicSlugs = {
  'rspa2': 'rspa2',
  'memory-reverse-assist': 'mra',
  'hybrid-stay-mode': 'stay-mode',
  'hyundai-dk2': 'digital-key-2',
  'apple-carplay-wireless': 'apple-carplay',
  'android-auto-wireless': 'android-auto',
  'v2l-parent': 'v2l'
};
const slugFor = feature => publicSlugs[feature.id] || feature.id;

const escapeHtml = value => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const toArray = value => Array.isArray(value) ? value : value ? [value] : [];
const compactDescription = feature => {
  const text = `${feature.name}의 기능 개요, 설정 방법, 사용 방법, 제한 사항과 적용 차량을 확인하세요. ${feature.summary || feature.overview || ''}`;
  return text.replace(/\s+/g, ' ').trim().slice(0, 155);
};
const absoluteUrl = pathname => `${baseUrl}/${String(pathname).replace(/^\/+/, '')}`;
const functionUrl = feature => absoluteUrl(`function/${encodeURIComponent(slugFor(feature))}/`);
const relatedFeature = (name, features) => features.find(candidate =>
  candidate.name === name || toArray(candidate.aliases).includes(name)
);
const rows = (items, ordered = true) => {
  const values = toArray(items).filter(Boolean);
  if (!values.length) return '<p>해당 차량의 공식 자료에서 별도 안내를 확인하세요.</p>';
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag}>${values.map(value => `<li>${escapeHtml(value)}</li>`).join('')}</${tag}>`;
};
const section = (title, content) => `<section class="content-section"><h2>${title}</h2>${content}</section>`;

function pageHtml(feature, features) {
  const title = `${feature.name} 사용법 및 적용 차량 | ${config.siteName}`;
  const description = compactDescription(feature);
  const canonical = functionUrl(feature);
  const related = toArray(feature.related)
    .map(name => relatedFeature(name, features))
    .filter(Boolean);
  const applications = toArray(feature.applies);
  const sources = toArray(feature.sourceDetails);
  const updatedAt = feature.updatedAt || data.generatedAt.slice(0, 10);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: feature.name,
    description,
    dateModified: updatedAt,
    inLanguage: 'ko-KR',
    mainEntityOfPage: canonical,
    publisher: { '@type': 'Organization', name: config.siteName }
  };

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="${escapeHtml(config.siteName)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(absoluteUrl(config.ogImage))}">
  <meta property="article:modified_time" content="${escapeHtml(updatedAt)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../../function-pages.css">
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
</head>
<body>
  <header class="function-header">
    <div class="function-header__inner">
      <a class="site-name" href="../../">${escapeHtml(config.siteName)}</a>
      <a class="back-link" href="../../">기능 검색으로 돌아가기</a>
    </div>
  </header>
  <main class="function-main">
    <p class="breadcrumb"><a href="../">전체 기능</a> › ${escapeHtml(feature.category || '자동차 기능')}</p>
    <article>
      <header class="function-hero">
        <div class="function-hero__top">
          <span class="feature-icon" aria-hidden="true">${feature.icon || ''}</span>
          <div>
            <p class="eyebrow">${escapeHtml(feature.officialCategory || feature.category || '자동차 기능')}</p>
            <h1>${escapeHtml(feature.name)}</h1>
          </div>
        </div>
        <p class="lead">${escapeHtml(feature.overview || feature.summary || '')}</p>
        <span class="status ${feature.verify?.complete ? '' : 'pending'}">${feature.verify?.complete ? '공식 자료 검증 완료' : '추가 검증 진행 중'}</span>
      </header>
      <div class="function-content">
        ${section('기능 설명', `<p>${escapeHtml(feature.overview || feature.summary || '')}</p>`)}
        ${section('사용 전 조건', rows(feature.preconditions, false))}
        ${section('설정 방법', rows(feature.settings))}
        ${section('사용 방법', rows(feature.steps))}
        ${section('해제 방법', rows(feature.disable))}
        ${section('제한 사항', rows(feature.limitations, false))}
        ${section('주의 사항', rows(feature.warnings, false))}
        ${section('관련 기능', related.length
          ? `<div class="related-grid">${related.map(item => `<a class="related-link" href="../${encodeURIComponent(slugFor(item))}/">${escapeHtml(item.name)}</a>`).join('')}</div>`
          : '<p>연결된 관련 기능이 없습니다.</p>')}
        ${section('적용 차량', applications.length
          ? `<div class="vehicle-grid">${applications.map(item => `<div class="vehicle-card"><strong>${escapeHtml(item.brand)} ${escapeHtml(item.model)}</strong><span>연식 ${escapeHtml(item.years)}</span><span>트림 ${escapeHtml(item.trim)}</span><span>${escapeHtml(item.option)}</span></div>`).join('')}</div>`
          : '<p>현재 확정된 적용 차량 정보가 없습니다.</p>')}
        ${section('공식 출처', sources.length
          ? `<div class="source-list">${sources.map(source => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a>`).join('')}</div>`
          : '<p>공식 자료 추가 확인이 필요합니다.</p>')}
        ${section('업데이트 날짜', `<p class="updated-at">${escapeHtml(updatedAt)}</p>`)}
      </div>
    </article>
  </main>
  <footer class="function-footer">
    <div class="function-footer__inner">
      <strong>${escapeHtml(config.siteName)} Beta</strong>
      <p>본 서비스는 비공식 정보 플랫폼이며 실제 적용 여부는 연식, 트림, 옵션 및 소프트웨어 버전에 따라 달라질 수 있습니다.</p>
    </div>
  </footer>
</body>
</html>`;
}

await fs.rm(functionRoot, { recursive: true, force: true });
await fs.mkdir(functionRoot, { recursive: true });

for (const feature of data.features) {
  const directory = path.join(functionRoot, slugFor(feature));
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, 'index.html'), pageHtml(feature, data.features), 'utf8');
}

const directoryDescription = '현대자동차, 기아, 제네시스의 자동차 기능별 사용법과 적용 차량을 확인하세요.';
const directoryHtml = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>전체 자동차 기능 | ${escapeHtml(config.siteName)}</title>
  <meta name="description" content="${directoryDescription}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="전체 자동차 기능 | ${escapeHtml(config.siteName)}">
  <meta property="og:description" content="${directoryDescription}">
  <meta property="og:url" content="${absoluteUrl('function/')}">
  <meta property="og:image" content="${absoluteUrl(config.ogImage)}">
  <link rel="canonical" href="${absoluteUrl('function/')}">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../function-pages.css">
</head>
<body>
  <header class="function-header"><div class="function-header__inner"><a class="site-name" href="../">${escapeHtml(config.siteName)}</a><a class="back-link" href="../">기능 검색으로 돌아가기</a></div></header>
  <main class="function-main">
    <p class="eyebrow">기능 디렉터리</p>
    <h1>전체 자동차 기능</h1>
    <p class="lead">${directoryDescription}</p>
    <nav class="function-directory" aria-label="전체 기능">
      ${data.features.map(feature => `<a class="directory-card" href="${encodeURIComponent(slugFor(feature))}/"><strong>${escapeHtml(feature.name)}</strong><span>${escapeHtml(feature.category)}</span></a>`).join('')}
    </nav>
  </main>
</body>
</html>`;
await fs.writeFile(path.join(functionRoot, 'index.html'), directoryHtml, 'utf8');

const sitemapEntries = [
  { loc: `${baseUrl}/`, priority: '1.0' },
  { loc: `${baseUrl}/function/`, priority: '0.9' },
  ...data.features.map(feature => ({ loc: functionUrl(feature), priority: '0.8', lastmod: feature.updatedAt }))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${escapeHtml(entry.loc)}</loc>
    <lastmod>${escapeHtml(entry.lastmod || data.generatedAt.slice(0, 10))}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
await fs.writeFile(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
await fs.writeFile(path.join(root, 'robots.txt'), robots, 'utf8');

const notFoundHtml = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>기능을 찾을 수 없습니다 | ${escapeHtml(config.siteName)}</title>
  <meta name="description" content="요청한 자동차 기능 페이지를 찾을 수 없습니다. 전체 기능 검색에서 원하는 기능을 확인하세요.">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/function-pages.css">
</head>
<body>
  <header class="function-header"><div class="function-header__inner"><a class="site-name" href="/">${escapeHtml(config.siteName)}</a></div></header>
  <main class="function-main">
    <section class="function-hero">
      <p class="eyebrow">404</p>
      <h1>기능을 찾을 수 없습니다</h1>
      <p class="lead">주소가 변경되었거나 아직 등록되지 않은 기능입니다.</p>
      <p><a class="related-link" href="/">메인 기능 검색으로 이동</a></p>
    </section>
  </main>
</body>
</html>`;
await fs.writeFile(path.join(root, '404.html'), notFoundHtml, 'utf8');

console.log(`Generated ${data.features.length} function pages, ${sitemapEntries.length} sitemap URLs, robots.txt, and 404.html.`);
