import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(await fs.readFile(path.join(root, 'function-data.json'), 'utf8'));
const config = JSON.parse(await fs.readFile(path.join(root, 'seo-config.json'), 'utf8'));
const baseUrl = config.baseUrl.replace(/\/+$/, '');
const functionRoot = path.join(root, 'function');
const features = data.features || data;

const slugDefinitions = {
  rspa2: { slug: 'rspa2', aliases: ['rspa-2', 'remote-smart-parking-assist-2', 'remote-smart-parking-assist'] },
  'memory-reverse-assist': { slug: 'mra', aliases: ['memory-reverse-assist', 'memory-reverse-assist-mra'] },
  'hybrid-stay-mode': { slug: 'stay-mode', aliases: ['staymode', 'tmed2-stay-mode', 'hev-stay-mode'] },
  'hyundai-dk2': { slug: 'digital-key-2', aliases: ['hyundai-digital-key-2', 'digital-key2'] },
  'apple-carplay-wireless': { slug: 'apple-carplay', aliases: ['carplay', 'wireless-apple-carplay'] },
  'android-auto-wireless': { slug: 'android-auto', aliases: ['androidauto', 'wireless-android-auto'] },
  'v2l-parent': { slug: 'v2l', aliases: ['vehicle-to-load', 'vehicle-2-load'] },
  'built-in-cam2-plus': { slug: 'built-in-cam-2-plus', aliases: ['built-in-cam2-plus', 'builtincam-2-plus'] }
};

const escapeHtml = value => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const toArray = value => Array.isArray(value) ? value : value ? [value] : [];
const cleanSlug = value => String(value || '')
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9가-힣]+/g, '-')
  .replace(/^-+|-+$/g, '');
const absoluteUrl = pathname => `${baseUrl}/${String(pathname).replace(/^\/+/, '')}`;
const slugFor = feature => feature.slug || cleanSlug(feature.id);
const functionUrl = feature => absoluteUrl(`function/${encodeURIComponent(slugFor(feature))}/`);
const cleanRows = items => toArray(items).map(item => String(item || '').trim()).filter(Boolean);
const listHtml = (items, ordered = true) => {
  const rows = cleanRows(items);
  if (!rows.length) return '';
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag}>${rows.map(row => `<li>${escapeHtml(row)}</li>`).join('')}</${tag}>`;
};
const section = (title, content) => content ? `<section class="content-section"><h2>${escapeHtml(title)}</h2>${content}</section>` : '';
const relatedFeature = (name, allFeatures) => allFeatures.find(candidate =>
  candidate.name === name || toArray(candidate.aliases).includes(name)
);
const isOfficialVerified = feature => {
  if (feature.verified === true) return true;
  return Boolean(feature.verified && typeof feature.verified === 'object' && feature.verified.complete === true);
};
const verificationValue = (feature, flatKey, objectKey = flatKey) => {
  if (feature[flatKey]) return feature[flatKey];
  if (feature.verified && typeof feature.verified === 'object') return feature.verified[objectKey] || '';
  return '';
};
const compactDescription = feature => {
  const source = `${feature.name} 기능의 개요, 적용 차량, 사용 조건과 공식 매뉴얼 기반 정보를 확인하세요. ${feature.summary || feature.overview || ''}`;
  return source.replace(/\s+/g, ' ').trim().slice(0, 155);
};
const googleTag = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-TSG1T3HMRY"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TSG1T3HMRY');
  </script>`;

for (const feature of features) {
  const definition = slugDefinitions[feature.id] || {};
  feature.slug = cleanSlug(feature.slug || definition.slug || feature.id);
  const aliases = [
    ...toArray(definition.aliases),
    ...toArray(feature.slugAliases),
    feature.id !== feature.slug ? feature.id : ''
  ].map(cleanSlug).filter(Boolean);
  feature.slugAliases = [...new Set(aliases)].filter(alias => alias !== feature.slug);
}

function guideValue(feature, selectedGuide, guideKey, featureKey) {
  const fromGuide = selectedGuide ? cleanRows(selectedGuide[guideKey]) : [];
  return fromGuide.length ? fromGuide : cleanRows(feature[featureKey]);
}

function pageHtml(feature, allFeatures) {
  const title = `${feature.name} 사용법 | ${config.siteName}`;
  const description = compactDescription(feature);
  const canonical = functionUrl(feature);
  const updatedAt = feature.updatedAt || data.generatedAt?.slice(0, 10) || '2026-06-30';
  const related = toArray(feature.related).map(name => relatedFeature(name, allFeatures)).filter(Boolean);
  const applications = toArray(feature.applies);
  const sources = toArray(feature.sourceDetails).filter(source => source?.label && source?.url);
  const isVerified = isOfficialVerified(feature);
  const isSummaryOnly = feature.displayMode === 'summary-only';
  const selectedGuide = toArray(feature.modelSpecificGuides).find(guide =>
    ['preconditions', 'settings', 'steps', 'exitSteps', 'limitations', 'warnings'].some(key => cleanRows(guide[key]).length)
  );
  const guideLabel = selectedGuide
    ? `${selectedGuide.brand || ''} ${selectedGuide.modelName || selectedGuide.modelCode || ''} ${selectedGuide.modelYear || ''} 공식 매뉴얼 기준`.replace(/\s+/g, ' ').trim()
    : '';
  const verificationRows = isVerified ? [
    ['출처', verificationValue(feature, 'verifiedSource', 'basis')],
    ['브랜드', verificationValue(feature, 'verifiedBrand', 'brand')],
    ['차량', verificationValue(feature, 'verifiedModel', 'modelName')],
    ['연식', verificationValue(feature, 'verifiedModelYear', 'modelYear')],
    ['매뉴얼', verificationValue(feature, 'verifiedManual', 'manualFile')],
    ['섹션', verificationValue(feature, 'verifiedSection', 'section')],
    ['검증일', verificationValue(feature, 'verifiedDate', 'date')]
  ].filter(([, value]) => value) : [];
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
  const detailSections = isSummaryOnly ? '' : [
    section('사용 전 조건', listHtml(guideValue(feature, selectedGuide, 'preconditions', 'preconditions'), false)),
    section('설정 방법', listHtml(guideValue(feature, selectedGuide, 'settings', 'settings'))),
    section('사용 방법', listHtml(guideValue(feature, selectedGuide, 'steps', 'steps'))),
    section('해제 방법', listHtml(guideValue(feature, selectedGuide, 'exitSteps', 'disable'))),
    section('작동 제한 상황', listHtml(guideValue(feature, selectedGuide, 'limitations', 'limitations'), false)),
    section('주의 사항', listHtml(guideValue(feature, selectedGuide, 'warnings', 'warnings'), false))
  ].join('');

  return `<!doctype html>
<html lang="ko">
<head>
${googleTag}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="${escapeHtml(toArray(feature.keywords).join(', '))}">
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
<body data-feature-id="${escapeHtml(feature.id)}" data-feature-slug="${escapeHtml(feature.slug)}">
  <header class="function-header">
    <div class="function-header__inner">
      <a class="site-name" href="../../">${escapeHtml(config.siteName)}</a>
      <a class="back-link" href="../../">기능 검색으로 돌아가기</a>
    </div>
  </header>
  <main class="function-main">
    <p class="breadcrumb"><a href="../">전체 기능</a> · ${escapeHtml(feature.category || '자동차 기능')}</p>
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
        ${isSummaryOnly ? '<span class="status">상세 절차 준비 중</span>' : ''}
        ${isVerified && !isSummaryOnly ? '<span class="status">공식 검증 완료</span>' : ''}
      </header>
      <div class="function-content">
        ${section('기능 개요', `<p>${escapeHtml(feature.overview || feature.summary || '')}</p>`)}
        ${selectedGuide && !isSummaryOnly ? section('차종별 공식 절차 기준', `<p>${escapeHtml(guideLabel)}</p>`) : ''}
        ${detailSections}
        ${verificationRows.length ? section('공식 출처', `<dl class="verification-record">${verificationRows.map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`).join('')}</dl>`) : ''}
        ${related.length ? section('관련 기능', `<div class="related-grid">${related.map(item => `<a class="related-link" href="../${encodeURIComponent(slugFor(item))}/">${escapeHtml(item.name)}</a>`).join('')}</div>`) : ''}
        ${applications.length ? section('적용 차량', `<div class="vehicle-grid">${applications.map(item => `<div class="vehicle-card"><strong>${escapeHtml(item.brand || '')} ${escapeHtml(item.model || item.modelName || '')}</strong><span>연식 ${escapeHtml(item.years || item.modelYear || '')}</span><span>${escapeHtml(item.trim || '')}</span><span>${escapeHtml(item.option || '')}</span></div>`).join('')}</div>`) : ''}
        ${sources.length ? section('공식 자료 링크', `<div class="source-list">${sources.map(source => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a>`).join('')}</div>`) : ''}
        ${section('마지막 업데이트', `<p class="updated-at">${escapeHtml(updatedAt)}</p>`)}
      </div>
    </article>
  </main>
  <footer class="function-footer">
    <div class="function-footer__inner">
      <strong>${escapeHtml(config.siteName)} Beta</strong>
      <p>본 서비스는 비공식 정보 플랫폼이며, 실제 적용 여부는 차량 연식, 트림, 옵션, 국가별 사양 및 소프트웨어 버전에 따라 달라질 수 있습니다.</p>
    </div>
  </footer>
</body>
</html>`;
}

await fs.rm(functionRoot, { recursive: true, force: true });
await fs.mkdir(functionRoot, { recursive: true });

const claimedSlugs = new Map();
for (const feature of features) {
  claimedSlugs.set(feature.slug, feature.id);
  const directory = path.join(functionRoot, feature.slug);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, 'index.html'), pageHtml(feature, features), 'utf8');
}
for (const feature of features) {
  for (const slug of feature.slugAliases) {
    if (claimedSlugs.has(slug) && claimedSlugs.get(slug) !== feature.id) continue;
    claimedSlugs.set(slug, feature.id);
    const directory = path.join(functionRoot, slug);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, 'index.html'), pageHtml(feature, features), 'utf8');
  }
}

await fs.writeFile(path.join(root, 'function-data.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
const canonicalSlugIndex = Object.fromEntries(features.map(feature => [feature.slug, feature.id]));
const aliasSlugIndex = {};
for (const feature of features) {
  for (const alias of feature.slugAliases) {
    if (canonicalSlugIndex[alias] || aliasSlugIndex[alias]) continue;
    aliasSlugIndex[alias] = feature.id;
  }
}
await fs.writeFile(path.join(root, 'function-slug-map.json'), `${JSON.stringify({
  matchingOrder: ['canonicalSlugIndex', 'aliasSlugIndex'],
  canonicalSlugIndex,
  aliasSlugIndex,
  entries: features.map(feature => ({
    id: feature.id,
    name: feature.name,
    slug: feature.slug,
    aliases: feature.slugAliases.filter(alias => !canonicalSlugIndex[alias]),
    canonical: functionUrl(feature)
  }))
}, null, 2)}\n`, 'utf8');

const directoryDescription = '현대자동차, 기아, 제네시스 차량 기능별 사용법과 적용 차량 정보를 확인하세요.';
const directoryHtml = `<!doctype html>
<html lang="ko">
<head>
${googleTag}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>전체 자동차 기능 | ${escapeHtml(config.siteName)}</title>
  <meta name="description" content="${escapeHtml(directoryDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="전체 자동차 기능 | ${escapeHtml(config.siteName)}">
  <meta property="og:description" content="${escapeHtml(directoryDescription)}">
  <meta property="og:url" content="${escapeHtml(absoluteUrl('function/'))}">
  <meta property="og:image" content="${escapeHtml(absoluteUrl(config.ogImage))}">
  <link rel="canonical" href="${escapeHtml(absoluteUrl('function/'))}">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../function-pages.css">
</head>
<body>
  <header class="function-header"><div class="function-header__inner"><a class="site-name" href="../">${escapeHtml(config.siteName)}</a><a class="back-link" href="../">기능 검색으로 돌아가기</a></div></header>
  <main class="function-main">
    <p class="eyebrow">기능 디렉터리</p>
    <h1>전체 자동차 기능</h1>
    <p class="lead">${escapeHtml(directoryDescription)}</p>
    <nav class="function-directory" aria-label="전체 기능">
      ${features.map(feature => `<a class="directory-card" href="${encodeURIComponent(slugFor(feature))}/"><strong>${escapeHtml(feature.name)}</strong><span>${escapeHtml(feature.category)}</span></a>`).join('')}
    </nav>
  </main>
</body>
</html>`;
await fs.writeFile(path.join(functionRoot, 'index.html'), directoryHtml, 'utf8');

const sitemapEntries = [
  { loc: `${baseUrl}/`, priority: '1.0' },
  { loc: `${baseUrl}/function/`, priority: '0.9' },
  ...features.map(feature => ({ loc: functionUrl(feature), priority: '0.8', lastmod: feature.updatedAt }))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${escapeHtml(entry.loc)}</loc>
    <lastmod>${escapeHtml(entry.lastmod || data.generatedAt?.slice(0, 10) || '2026-06-30')}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
await fs.writeFile(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
await fs.writeFile(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`, 'utf8');

const notFoundHtml = `<!doctype html>
<html lang="ko">
<head>
${googleTag}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>기능을 찾을 수 없습니다 | ${escapeHtml(config.siteName)}</title>
  <meta name="description" content="해당 기능 정보를 찾을 수 없습니다. 기능명이 변경되었거나 아직 준비 중일 수 있습니다.">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/function-pages.css">
</head>
<body>
  <header class="function-header"><div class="function-header__inner"><a class="site-name" href="/">${escapeHtml(config.siteName)}</a></div></header>
  <main class="function-main">
    <section class="function-hero">
      <p class="eyebrow">404</p>
      <h1>기능을 찾을 수 없습니다</h1>
      <p class="lead">해당 기능 정보를 찾을 수 없습니다. 기능명이 변경되었거나 아직 준비 중일 수 있습니다.</p>
      <form class="not-found-search" action="/" method="get">
        <label for="missingFeatureSearch">기능 검색</label>
        <div>
          <input id="missingFeatureSearch" name="search" type="search" placeholder="예: RSPA 2, 디지털 키, V2L">
          <button type="submit">검색</button>
        </div>
      </form>
      <p><a class="related-link" href="/">메인으로 돌아가기</a></p>
    </section>
  </main>
</body>
</html>`;
await fs.writeFile(path.join(root, '404.html'), notFoundHtml, 'utf8');

console.log(`Generated ${features.length} canonical function pages, ${claimedSlugs.size} matched slug pages, ${sitemapEntries.length} sitemap URLs, robots.txt, and 404.html.`);
