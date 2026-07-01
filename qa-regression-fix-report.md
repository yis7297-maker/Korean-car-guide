# Korean CAR GUIDE Regression Fix Report

작성일: 2026-07-01

## 1. 검증 상태 문구 재발 원인

- `app.js`의 기본 렌더러가 기능 카드, 차량별 기능 매핑, 기능 상세 팝업에서 검증 상태 배지와 상태 문구를 직접 생성하고 있었다.
- `render()`가 숨겨진 상태 필터용 칩을 계속 생성하고 있었고, `filteredFeatures()`도 상태 필터 값을 참조하고 있었다.
- `digital-feature-manual-audit.js`가 빌트인 캠 계열을 감사 대상에 포함한 뒤, 나중에 로드되면서 상세 절차와 적용 차량을 빈 값으로 덮어쓸 수 있었다.
- `styles.css`에 더 이상 사용하지 않는 상태 배지 스타일이 남아 있었다.
- `outputs/auto-guide-platform-v2`에는 수정 전 파일이 남아 있어 루트와 배포 폴더가 불일치했다.

## 2. 제거한 렌더링 위치

- `app.js`
  - 기능 카드의 상태 메타 표시 제거
  - 차량별 기능 목록의 상태 표시 제거
  - 기능 상세 팝업의 상태 배지 제거
  - 출처 검증 상태 섹션 제거
  - 상태 필터 칩 생성 제거
  - 상태 필터 기반 검색 로직 제거
- `styles.css`
  - 상태 배지 관련 CSS 제거
- `index.html`
  - 존재하지 않는 `official-verification-system.js` 스크립트 로드 제거
- `patch.js`
  - 사용자 화면에 영향을 줄 수 있는 상태 관련 주석 표현 정리
- `outputs/auto-guide-platform-v2`
  - 루트 수정 내용을 동일하게 반영

## 3. 빌트인 캠 데이터 보강 결과

기준 자료:

- `work/manual-text/GN7_2026_ko_KR.txt`
- 확인 섹션:
  - `빌트인 캠 (Built-in Cam)`
  - `빌트인 캠 설정`
  - `빌트인 캠 작동`
  - `빌트인 캠 영상 확인`
  - `휴대폰 앱 연결`
  - `빌트인 캠 소프트웨어 업데이트`
  - `빌트인 캠 사양`
  - `영상 저장 위치 및 저장 기준`
- 확인 페이지 범위: 248-259

보강 기능:

- `built-in-cam`
- `built-in-cam2`
- `built-in-cam2-plus`

주의:

- txt 전체 검색에서 `빌트인 캠 2 Plus` 고유 절차명은 확인되지 않았다.
- 따라서 `built-in-cam2-plus`에는 Plus 전용 추정 절차를 추가하지 않고, 공식 `빌트인 캠 (Built-in Cam)` 챕터에서 확인된 공통 녹화/설정/확인 절차만 반영했다.

## 4. built-in-cam 계열 최종 상세 항목 현황

| 기능 ID | 기능 개요 | 사용 전 조건 | 설정 방법 | 사용 방법 | 해제 방법 | 제한 사항 | 주의 사항 | 관련 기능 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| built-in-cam | 보강 | 보강 | 보강 | 보강 | 보강 | 보강 | 보강 | 보강 |
| built-in-cam2 | 보강 | 보강 | 보강 | 보강 | 보강 | 보강 | 보강 | 보강 |
| built-in-cam2-plus | 공통 절차 기준 보강 | 보강 | 보강 | 보강 | 보강 | 보강 | 보강 | 보강 |

## 5. 중복 정의 충돌 수정 여부

- 수정 완료.
- `digital-feature-manual-audit.js`에서 빌트인 캠 3종을 후속 빈 데이터 덮어쓰기 대상에서 제외했다.
- 같은 파일의 상태 문구 할당은 빈 문자열로 변경해 UI 노출 가능성을 차단했다.
- `data-expansion.js`의 빌트인 캠 3종에 상세 배열을 직접 보강해 최종 렌더링 데이터가 비지 않도록 했다.

## 6. 사용자 화면 금지 문구 검색 결과

검색 대상:

- 루트: `index.html`, `app.js`, `patch.js`, `data-expansion.js`, `feature-improvements.js`, `hybrid-tmed2.js`, `seo-runtime.js`, `vehicle-ui-cleanup.js`, `styles.css`, `digital-feature-manual-audit.js`, `convenience-manual-audit.js`
- outputs: 위 동일 파일의 `outputs/auto-guide-platform-v2` 사본

검색 결과:

- 사용자 화면 금지 상태 문구: 0건
- 방문자 위젯 관련 문구/ID: 0건
- 상태 배지 클래스명: 0건
- 빈 섹션 대체 문구: 0건

내부 데이터 필드:

- `verify`, `verified` 등 내부 데이터 필드는 기존 구조 보존을 위해 유지했다.
- 해당 내부 필드는 렌더링 UI에서 상태 문구나 배지로 출력하지 않는다.

## 7. 수정 파일 목록

- `index.html`
- `app.js`
- `patch.js`
- `data-expansion.js`
- `digital-feature-manual-audit.js`
- `convenience-manual-audit.js`
- `styles.css`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/app.js`
- `outputs/auto-guide-platform-v2/patch.js`
- `outputs/auto-guide-platform-v2/data-expansion.js`
- `outputs/auto-guide-platform-v2/digital-feature-manual-audit.js`
- `outputs/auto-guide-platform-v2/convenience-manual-audit.js`
- `outputs/auto-guide-platform-v2/styles.css`

## 8. 루트/outputs 동기화 여부

- 동기화 완료.
- 동일 반영 파일:
  - `index.html`
  - `app.js`
  - `patch.js`
  - `data-expansion.js`
  - `feature-improvements.js`
  - `hybrid-tmed2.js`
  - `seo-runtime.js`
  - `vehicle-ui-cleanup.js`
  - `styles.css`
  - `digital-feature-manual-audit.js`
  - `convenience-manual-audit.js`

## 9. GA4/AdSense 유지 여부

- GA4 코드: 유지
- AdSense 코드: 현재 `index.html` 및 outputs `index.html`에서 별도 `pagead2`/`adsbygoogle` 스크립트는 확인되지 않음. 이번 작업에서 광고 관련 코드는 추가/삭제하지 않음.
- SEO URL/canonical/sitemap 구조: 변경 없음

## 10. 추가 검증

- 주요 JS 파일 9개를 `vm.Script` 기준으로 구문 파싱했다.
- 결과:
  - `app.js`: PASS
  - `patch.js`: PASS
  - `data-expansion.js`: PASS
  - `feature-improvements.js`: PASS
  - `hybrid-tmed2.js`: PASS
  - `seo-runtime.js`: PASS
  - `vehicle-ui-cleanup.js`: PASS
  - `digital-feature-manual-audit.js`: PASS
  - `convenience-manual-audit.js`: PASS

브라우저 직접 검증 메모:

- 인앱 브라우저에서 `file://` 직접 이동은 보안 정책으로 차단되었다.
- 임시 로컬 서버 방식은 현재 환경에서 연결이 거부되어 DOM 기반 동작 검증은 완료하지 못했다.
- 대신 루트/outputs 파일 검색, JS 구문 파싱, 데이터 덮어쓰기 경로 점검으로 재발 원인을 수정했다.
