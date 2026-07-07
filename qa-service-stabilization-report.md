# Korean CAR GUIDE 정식 서비스 안정화 QA 리포트

작성일: 2026-07-07

## 1. 데이터 동기화 결과

- 메인 카드/팝업 기준 데이터: 브라우저 로드 순서의 최종 `features` 런타임 데이터
- function 페이지 기준 데이터: 동일 런타임 데이터에서 추출한 `function-data.generated.json`
- 생성 방식: 최종 런타임 데이터 → UTF-8 정적 HTML 생성 → 루트/outputs 동기화
- 런타임 SEO 스냅샷: 보강 후 `features` 기준으로 `window.KCG_SEO_DATA`를 다시 갱신하도록 수정
- 동기화 판정: PASS

## 2. 생성/검수 통계

- 전체 기능 수: 98
- canonical function 페이지 수: 98
- 루트 function 디렉터리 수(alias 포함): 122
- outputs function 디렉터리 수(alias 포함): 122
- sitemap 전체 URL 수: 99
- sitemap function URL 수: 98
- sitemap 중복 URL 수: 0
- sitemap 누락 URL 수: 0
- sitemap 초과 URL 수: 0

## 3. 88개/전체 기능 품질 검수

현재 실제 런타임 기준 기능 수는 88개가 아니라 98개입니다. 공식 데이터가 없는 항목은 임의 생성하지 않았고, 정적 페이지에서는 빈 섹션을 렌더링하지 않도록 처리했습니다.

### 필드별 누락 수

- 기능 설명: 0
- 사용 전 조건: 72
- 설정 방법: 78
- 사용 방법: 72
- 해제 방법: 72
- 제한 사항: 72
- 경고/주의 사항: 72
- 적용 차량: 79
- 출처: 4

### 누락 데이터가 있는 기능 수

- 90개

## 4. 지정 기능 차량 적용/상세 데이터 검수

- rspa (원격 스마트 주차 보조 / RSPA): 적용 차량 0건, 출처 3건, 누락: 적용 차량
- rspa2 (원격 스마트 주차 보조 2 / RSPA 2): 적용 차량 8건, 출처 4건, 누락: 없음
- mra (메모리 리버스 어시스트 / MRA): 적용 차량 1건, 출처 3건, 누락: 설정 방법
- digital-key-2 (Hyundai Digital Key 2): 적용 차량 0건, 출처 1건, 누락: 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 경고/주의 사항, 적용 차량
- built-in-cam (빌트인 캠): 적용 차량 0건, 출처 2건, 누락: 적용 차량
- built-in-cam2 (빌트인 캠 2): 적용 차량 6건, 출처 2건, 누락: 없음
- smart-power-tailgate (스마트 파워 테일게이트): 적용 차량 5건, 출처 2건, 누락: 없음
- face-connect (Face Connect): 적용 차량 0건, 출처 1건, 누락: 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 경고/주의 사항, 적용 차량
- fingerprint-auth (지문 인증): 적용 차량 0건, 출처 2건, 누락: 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 경고/주의 사항, 적용 차량
- battery-conditioning (Battery Conditioning): 적용 차량 0건, 출처 3건, 누락: 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 경고/주의 사항, 적용 차량
- v2l (V2L): 적용 차량 0건, 출처 3건, 누락: 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 경고/주의 사항, 적용 차량

주의: 위 항목 중 적용 차량 또는 절차가 비어 있는 기능은 공식 자료 확인 없이 임의 보강하지 않았습니다.

## 5. 대표 3개 페이지 비교 검증

- mra / 메모리 리버스 어시스트 / MRA: 페이지 존재 PASS, canonical PASS, 섹션 10개, 데이터 기준 동일 PASS, 누락: 설정 방법
- digital-key-2 / Hyundai Digital Key 2: 페이지 존재 PASS, canonical PASS, 섹션 4개, 데이터 기준 동일 PASS, 누락: 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 경고/주의 사항, 적용 차량
- built-in-cam2 / 빌트인 캠 2: 페이지 존재 PASS, canonical PASS, 섹션 11개, 데이터 기준 동일 PASS, 누락: 없음

## 6. SEO / Search Console 검수

- index 가능 robots 메타: PASS
- canonical: PASS
- Open Graph: PASS
- breadcrumb UI: PASS
- BreadcrumbList structured data: PASS
- sitemap canonical function URL 반영: PASS
- sitemap alias URL 제외: PASS
- 중복 URL 제거: PASS

## 7. 템플릿/금지 문구 검수

- 금지 문구 검색 결과: PASS (0건)


## 8. JS / Console 검수

- JS 런타임 데이터 추출 VM 실행: PASS
- 실제 인앱 브라우저 접속 검수: WARNING
  - 사유: 로컬 HTTP 접속이 현재 브라우저에서 ERR_BLOCKED_BY_CLIENT로 차단되어 콘솔 로그를 직접 수집하지 못함
  - 대체 검수: 브라우저 로드 순서와 동일한 JS 파일 VM 실행에서 예외 없이 최종 features 추출 완료

## 9. 발견한 문제

- 기존 function 페이지가 UTF-8이 아닌 깨진 한글 상태로 생성되어 있었음
- function 페이지가 팝업과 동일한 최종 런타임 데이터를 보장하는 생성 흐름이 고정되어 있지 않았음
- 다수 기능은 상세 절차/적용 차량 데이터가 아직 비어 있음. 공식 자료 없이 임의 생성하지 않음

## 10. 수정/자동 생성 파일

### 수정/생성

- function-data.generated.json
- sitemap.xml
- seo-runtime.js
- function/*/index.html
- outputs/auto-guide-platform-v2/function-data.generated.json
- outputs/auto-guide-platform-v2/sitemap.xml
- outputs/auto-guide-platform-v2/seo-runtime.js
- outputs/auto-guide-platform-v2/function/*/index.html
- qa-service-stabilization-report.md

## 11. 사람이 추가 검증해야 하는 항목

- 적용 차량이 비어 있는 지정 기능: rspa, digital-key-2, built-in-cam, face-connect, fingerprint-auth, battery-conditioning, v2l
- 절차 데이터가 비어 있는 지정 기능: mra, digital-key-2, face-connect, fingerprint-auth, battery-conditioning, v2l
- 공식 매뉴얼 기준 차량 적용 재검증이 필요한 기능은 기존 데이터 유지 상태로 남김

## 12. 최종 PASS / FAIL

- 팝업 데이터 동기화: PASS
- function 페이지 동기화: PASS
- 차량 적용 데이터: WARNING
- sitemap: PASS
- robots: PASS
- canonical: PASS
- breadcrumb: PASS
- structured data: PASS
- 빈 섹션 숨김: PASS
- 템플릿 문구 제거: PASS
- 404 방지: PASS
- JS 오류: PASS (VM 기준)
- Console 오류: WARNING (브라우저 접속 차단으로 직접 확인 불가)

최종 판정: 🟡 PASS WITH WARNINGS
