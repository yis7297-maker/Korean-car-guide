# Korean CAR GUIDE 오픈베타 품질 안정화 QA 리포트

생성일: 2026-07-01  
범위: 현대/제네시스 중심 오픈베타 안정화  
제외: 기아 공식 URL 검증, 기아 웹 매뉴얼 수집, 기아 신규 데이터 추가

## 1. 방문자 위젯 제거 확인 결과

PASS

검사 파일:

- `index.html`
- `app.js`
- `patch.js`
- `styles.css`
- `vehicle-ui-cleanup.js`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/app.js`
- `outputs/auto-guide-platform-v2/patch.js`
- `outputs/auto-guide-platform-v2/styles.css`
- `outputs/auto-guide-platform-v2/vehicle-ui-cleanup.js`

검색어 결과:

- `trafficWidget`: 0건
- `trafficAdminToggle`: 0건
- `todayVisitors`: 0건
- `totalVisitors`: 0건
- `방문자 위젯`: 0건
- `오늘 방문자`: 0건
- `누적 방문자`: 0건

브라우저 확인:

- 로컬 검증 서버 `http://127.0.0.1:8899/index.html`
- `#trafficWidget` DOM 미존재 확인

## 2. ESC 팝업 닫기 검증 결과

PASS

실제 브라우저 상호작용으로 확인:

- 기능 상세 팝업: ESC 1회 입력 시 닫힘
- 적용 차량 보기 팝업: 기능 상세 팝업 위에서 열린 상태에서 ESC 1회 입력 시 적용 차량 팝업만 닫힘
- 중첩 팝업: ESC 2회 입력 시 적용 차량 팝업 → 기능 상세 팝업 순서로 닫힘
- 업데이트 로그 팝업: ESC 1회 입력 시 닫힘

기존 동작 유지:

- X 버튼 닫기 유지
- 배경 클릭 닫기 유지

## 3. 검색 UX 검증 결과

PASS

실제 브라우저 상호작용으로 확인:

- `편의` 카테고리 선택 상태에서 `RSPA` 검색
- 결과에 `원격 스마트 주차 보조 / RSPA`, `원격 스마트 주차 보조 2 / RSPA 2`, `스마트 주차 보조 / SPA` 등 주차 편의 기능 표시
- 검색어 삭제 시 기존 선택 카테고리인 `편의` 결과로 복귀
- Enter 없이 입력 즉시 리스트 반영

수정 내용:

- 검색어 입력 중에는 브랜드/차량/연식/카테고리 필터를 무시하도록 수정
- 검색 대상 확장:
  - 기능 ID
  - 기능명
  - 카테고리
  - 공식 분류
  - 상위 분류
  - 요약/개요
  - aliases
  - keywords
  - related / relatedFeatures
  - supportedModels / supportedVehicles
  - applies의 브랜드, 차종, 연식, 트림, 옵션

## 4. summary-only에서 상세 표시로 복구한 기능 목록

이번 작업에서 신규로 상세 표시 전환한 기능은 없습니다.

사유:

- 현재 루트 빌드는 별도 `summary-only`, `summaryOnly`, `summary_only` 플래그 구조를 사용하지 않음
- 기존 상세 절차가 있는 기능은 수정하지 않음
- 공식 txt에서 절차를 새로 확정하지 못한 기능은 상세 절차를 임의 생성하지 않음

대신 수행한 안정화:

- 상세 절차가 없는 확장 기능에 일반 템플릿 절차가 자동 주입되던 로직 제거
- 빈 상세 섹션은 화면에 표시하지 않도록 `listHtml()` 동작 수정

## 5. summary-only로 유지한 기능 목록과 이유

명시적 summary-only 목록 파일은 현재 빌드에 존재하지 않습니다.

상세 절차를 유지하지 않은 대표 그룹:

- V2H / V2G 로드맵 기능
- 공식 절차가 현재 데이터에 확정되지 않은 일부 EV 확장 기능
- 공식 절차가 현재 데이터에 확정되지 않은 일부 하이브리드 확장 기능
- 적용 차량/서비스 범위가 확정되지 않은 일부 커넥티드 후보 기능

유지 이유:

- 공식 매뉴얼 절차가 현재 데이터 구조에 확인되어 있지 않음
- AI 추론으로 사용 조건, 버튼명, 메뉴 경로를 생성하지 않기 위함
- 사용자 화면에서는 빈 섹션 자체를 숨김

## 6. 사용자 화면 금지 문구 검색 결과

PASS

검사 대상:

- 루트 배포 파일
- outputs/auto-guide-platform-v2 배포 파일
- 주요 런타임 JS

검색 결과:

- `매뉴얼에서 별도 안내 없음`: 0건
- `해당 없음`: 0건
- `검증 진행 중`: 0건
- `방문자 위젯`: 0건
- `오늘 방문자`: 0건
- `누적 방문자`: 0건

브라우저 화면 확인:

- 본문 visible text 기준 금지 문구 0건
- 기능 카드 98개 렌더링 확인

## 7. 차량별 오매핑 수정 내역

수정:

- 이번 작업에서 차량 매핑 데이터를 새로 추가하지 않음
- 기아 데이터 추가 및 기아 공식 URL 검증 미수행

확인:

- MRA는 `patch.js` 기준 `hy-grandeur` 단독 적용으로 유지
- 아반떼 N에 MRA 적용 없음
- FCEV 기능은 `fcevIds` / 넥쏘 전용 적용 구조 유지
- EV 기능은 전기차 그룹 기반 적용 구조 유지
- 제네시스 디지털 키 / Face Connect는 제네시스 적용 구조 유지
- 현대 Digital Key 2 계열은 현대 프리미엄/일부 현대 차종 적용 구조 유지
- HEV/TMED-2 기능은 팰리세이드 하이브리드 전용 적용 구조 유지

주의:

- 현재 루트 빌드는 `vehicle-feature-map.json`을 사용하지 않고, `app.js` 및 확장 JS의 `applies` 배열을 기준으로 차량 매핑을 구성함

## 8. 베타 문구 정리 내역

유지:

- 비공식 서비스 고지
- 차량 연식, 트림, 옵션, 소프트웨어 버전에 따라 실제 사양이 다를 수 있다는 고지
- Beta/Open Beta 성격 안내

정리:

- 사용자 화면에 반복 노출될 수 있는 `해당 없음` 빈 섹션 문구 제거
- 상세 절차가 없는 기능에 일반 템플릿 절차가 자동으로 들어가던 로직 제거
- 불확실한 기능은 상세 절차를 임의 표시하지 않고 빈 섹션 숨김 처리

## 9. 수정 파일 목록

- `app.js`
- `patch.js`
- `data-expansion.js`
- `feature-improvements.js`
- `hybrid-tmed2.js`
- `outputs/auto-guide-platform-v2/app.js`
- `outputs/auto-guide-platform-v2/patch.js`
- `outputs/auto-guide-platform-v2/data-expansion.js`
- `outputs/auto-guide-platform-v2/feature-improvements.js`
- `outputs/auto-guide-platform-v2/hybrid-tmed2.js`
- `qa-open-beta-stabilization-report.md`

## 10. 루트/outputs 동기화 여부

PASS

동기화 확인 파일:

- `index.html`
- `app.js`
- `patch.js`
- `styles.css`
- `vehicle-ui-cleanup.js`
- `data-expansion.js`
- `feature-improvements.js`
- `hybrid-tmed2.js`

`Compare-Object` 결과 차이 없음.

현재 루트에 존재하지 않는 파일/폴더:

- `function-data.json`
- `vehicle-feature-map.json`
- `sitemap.xml`
- `404.html`
- `function/`

위 항목은 현재 빌드 구조에 없으므로 동기화 대상에서 제외됨.

## 11. GA4/AdSense 유지 여부

GA4: PASS

- `G-TSG1T3HMRY` 유지
- `googletagmanager.com/gtag/js` 유지

SEO 메타: PASS

- canonical 유지
- OG title 유지

AdSense:

- 현재 루트 `index.html`에서 `adsbygoogle` 또는 `pagead2` 코드는 발견되지 않음
- 기존 파일에 없는 광고 스크립트는 추가하지 않음

## 최종 판정

🟡 Open Beta Stabilized

정식 서비스 직전 품질을 위해 다음 후속 작업 권장:

1. 현재 빌드에 없는 `function-data.json`, `vehicle-feature-map.json`, `sitemap.xml`, `404.html`, `function/` 구조를 실제 배포 루트에 복구하거나, 현재 단일 페이지 구조를 공식 배포 구조로 확정
2. 현대/제네시스 공식 txt 기준으로 summary-only 후보를 별도 목록화
3. Kia 데이터는 별도 작업으로 분리하여 검증
