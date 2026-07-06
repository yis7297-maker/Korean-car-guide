# Korean CAR GUIDE Function Page Data Sync Report

Date: 2026-07-06

## 1. 원인 분석

### 1) 팝업이 참조하는 데이터 소스

메인 사이트 팝업은 브라우저에서 아래 스크립트를 순서대로 실행한 뒤 최종 `features` 배열을 참조합니다.

1. `app.js`
2. `patch.js`
3. `data-expansion.js`
4. `feature-improvements.js`
5. `hybrid-tmed2.js`
6. `parking-manual-audit.js`
7. `digital-feature-manual-audit.js`
8. `electrification-manual-audit.js`
9. `convenience-manual-audit.js`
10. `final-release-audit.js`
11. `seo-runtime.js`

특히 `seo-runtime.js`의 마지막 렌더링 보정 로직이 최종 팝업 표시 데이터에 반영됩니다.

### 2) `/function/*` 페이지가 참조하던 데이터 소스

현재 워크스페이스에는 기존 `function/` 정적 디렉터리가 없었습니다. 따라서 배포된 `/function/mra/`가 기본 템플릿만 표시했다면, 현재 팝업의 최종 `features` 배열이 아니라 과거에 생성된 정적 HTML 또는 다른 템플릿/데이터 스냅샷을 보고 있었던 것으로 판단됩니다.

### 3) 불일치 원인

- 팝업: 런타임에서 여러 JS 패치가 누적된 최신 `features` 배열 사용
- function 페이지: 현재 저장소 기준 정적 페이지 파일이 없거나, 과거 생성물/별도 데이터 사용 가능성
- 결과: MRA처럼 팝업에는 `preconditions`, `steps`, `limitations`, `warnings`가 있지만 `/function/mra/`에는 기본 템플릿만 표시되는 불일치 발생

## 2. 수정 내용

최종 팝업 데이터와 동일한 스크립트 로드 순서를 VM으로 실행하여 최종 병합 `features` 데이터를 생성하고, 해당 데이터로 정적 SEO 페이지를 다시 생성했습니다.

생성/수정 파일:

- `function-data.generated.json`
- `function/*/index.html`
- `sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`

생성 결과:

- 최종 기능 데이터 수: 98개
- 생성된 대표 function 페이지 수: 98개
- alias redirect 페이지 추가:
  - `/function/memory-reverse-assist/` → `/function/mra/`
  - `/function/memory-reverse-assist-mra/` → `/function/mra/`
  - `/function/hyundai-digital-key-2/` → `/function/digital-key-2/`
  - `/function/digital-key2/` → `/function/digital-key-2/`
  - `/function/built-in-cam-2/` → `/function/built-in-cam2/`

## 3. 3개 대표 페이지 비교 검증

비교 기준:

- 팝업 최종 데이터: 최종 `features` 배열
- function 페이지: 생성된 `function/{slug}/index.html`
- 확인 항목: 제목, 기능 개요, 첫 사용 전 조건, 첫 사용 방법, 기본 템플릿 문구 제거 여부

| 대상 | 대표 slug | 페이지 존재 | 팝업 데이터 상세 필드 | function 페이지 반영 | 판정 |
|---|---|---:|---:|---:|---|
| MRA | `/function/mra/` | PASS | 사용 전 조건 3, 사용 방법 4, 해제 1, 제한 1, 주의 1 | PASS | PASS |
| Digital Key | `/function/digital-key-2/` | PASS | 공통 원천 데이터 자체가 요약 중심, 상세 절차 0 | 동일하게 요약 중심 표시 | WARNING |
| Built-in Cam 2 | `/function/built-in-cam2/` | PASS | 사용 전 조건 4, 설정 4, 사용 방법 5, 해제 3, 제한 4, 주의 4 | PASS | PASS |

### Digital Key 판정 설명

`/function/digital-key-2/`는 팝업과 function 페이지가 서로 다른 데이터를 쓰는 문제는 해결되었습니다. 다만 현재 최종 공통 데이터에서 `Hyundai Digital Key 2` 자체가 아직 상세 절차 미보강 상태입니다. 따라서 이 항목은 데이터 동기화 문제는 PASS, 콘텐츠 충실도는 WARNING입니다.

## 4. 금지 템플릿 문구 확인

아래 문구는 3개 대표 페이지에서 발견되지 않았습니다.

- `해당 기능이 적용된 차종과 트림이어야 합니다`
- `설정 → 차량 →`
- `기능을 찾을 수 없습니다`

## 5. 결론

이번 수정으로 `/function/*` 정적 페이지는 현재 팝업과 동일한 최종 병합 데이터를 기준으로 생성되었습니다.

남은 과제:

1. Digital Key 계열 상세 절차 보강
2. function 페이지 자동 재생성 스크립트의 정식화
3. 배포 전 `function/` 디렉터리와 `sitemap.xml`이 GitHub/Vercel 배포 루트에 포함되는지 확인
