# Korean CAR GUIDE — IONIQ 5 Vehicle Manual Audit

작성일: 2026-07-08  
작업 범위: 현대 아이오닉 5(NE1)만 검증  
제외 범위: 아이오닉 5 N(NE1N), 아이오닉 6, 아이오닉 9, 코나 EV 등 다른 전기차  
사용 자료:

- `work/manual-text/NE1_2026_ko_KR.txt`

## 1. 작업 원칙 준수

- 비공식 자료, 블로그, 유튜브 사용 안 함
- PDF 원본 수정 안 함
- Owners Manual txt에서 확인된 기능명/용어만 사용
- 아이오닉 5 일반 모델(`hy-ioniq5`)에만 적용
- 아이오닉 5 N(`hy-ioniq5-n`)은 이번 작업에서 수정하지 않음
- 기존 기능 삭제 안 함
- 기존 slug, URL, canonical, SEO 구조 변경 없음
- 공식 매뉴얼에서 별도 기능으로 확인된 항목은 기존 기능과 임의 병합하지 않음

## 2. Manual keyword scan 결과

| 키워드 | NE1 |
|---|---:|
| 전방 충돌방지 보조 | 45 |
| 스마트 크루즈 컨트롤 | 105 |
| 고속도로 주행 보조 | 38 |
| 차로 유지 보조 | 38 |
| 차로 이탈방지 보조 | 39 |
| 지능형 속도 제한 보조 | 18 |
| 운전자 주의 경고 | 11 |
| 하이빔 보조 | 28 |
| 후측방 충돌방지 보조 | 42 |
| 안전 하차 보조 | 29 |
| 후방 교차 충돌방지 보조 | 35 |
| 주차 거리 경고 | 46 |
| 주차 충돌방지 보조 | 25 |
| 원격 스마트 주차 보조 | 63 |
| 스마트 주차 보조 | 63 |
| 서라운드 뷰 모니터 | 44 |
| 후측방 모니터 | 12 |
| 후방 모니터 | 32 |
| 디지털 키 | 127 |
| NFC | 18 |
| 카드 키 | 50 |
| 빌트인 캠 | 71 |
| 무선 소프트웨어 업데이트 | 3 |
| 파워 테일게이트 | 48 |
| 스마트 테일게이트 | 18 |
| 공기 청정 | 6 |
| 애프터 블로우 | 2 |
| 하이패스 | 44 |
| 스마트 키 | 235 |
| 비상 키 | 20 |
| 원격 시동 | 31 |
| 원격 공조 | 2 |
| 열선 | 68 |
| 통풍 | 29 |
| 릴렉션 | 17 |
| 워크인 | 1 |
| 무선 충전 | 47 |
| 블루링크 | 14 |
| Bluelink | 2 |
| 음성 인식 | 2 |
| EV 설정 | 7 |
| 주행 가능 거리 | 42 |
| 배터리 컨디셔닝 | 13 |
| Plug n Charge | 23 |
| Plug & Charge | 0 |
| 충전소 검색 기능 | 6 |
| 급속 또는 초급속 충전소 목적지/경유지 | 1 |
| 예약 충전 | 24 |
| 완속 충전 설정 | 10 |
| 충전 전류 | 17 |
| 충전 목표 배터리량 | 7 |
| 충전 커넥터 잠금 | 9 |
| 충전 상태 | 20 |
| 충전 정보 | 3 |
| V2L | 58 |
| 전기 사용(V2L) | 17 |
| 방전 제한량 | 11 |
| 배터리 상태 | 2 |
| 전력 소비량 | 5 |
| 연비 이력 | 4 |
| 에너지 흐름 | 1 |
| 회생 제동 | 128 |
| 스마트 회생 제동 | 32 |
| i-PEDAL | 2 |
| 유틸리티 모드 | 17 |
| ICCU | 0 |
| 캠핑 모드 | 0 |

## 3. 교차 검증 표

| 구분 | Owners Manual 발견 기능 수 | 사이트 반영 기능 수 | 누락 기능 수 | 신규 추가 기능 수 |
|---|---:|---:|---:|---:|
| 아이오닉 5(NE1) | 66 | 66 | 0 | 9 |

## 4. 사이트 반영 기능 수

- 아이오닉 5 반영 기능 수: 66개
- EV 전용/전동화 관련 기능 수: 25개
- 전체 기능 DB: 119개
- 전체 차량 DB: 43개

## 5. EV 전용 신규 기능 목록

공식 NE1 txt에서 별도 절차/메뉴가 확인되어 추가한 기능입니다.

1. `ev-driving-range` — EV 주행 가능 거리
2. `ev-charging-current-setting` — 충전 전류 설정
3. `charging-connector-lock` — 충전 커넥터 잠금 모드
4. `ev-charging-information` — 전기차 충전 정보
5. `ev-menu-settings` — EV 메뉴 / EV 설정
6. `ev-charging-station-search` — 충전소 검색 기능
7. `v2l-discharge-limit` — V2L 방전 제한량 설정
8. `one-pedal-driving` — 원 페달 드라이빙
9. `ev-efficiency-history` — EV 연비 이력

## 6. 기존 EV 기능 보강/매핑

아이오닉 5에 적용하고 공식 txt 기준으로 설명/절차를 보강한 기존 기능:

- `plug-and-charge` — 공식 표기 `Plug n Charge`
- `ev-route-planner` — 충전소 검색 기능 및 배터리 컨디셔닝 내비게이션 연동 범위
- `battery-conditioning`
- `scheduled-charging`
- `charge-limit`
- `v2l-parent`
- `v2l-indoor`
- `v2l-outdoor`
- `utility-mode`
- `ev-charge-status`
- `ev-energy-usage`
- `ev-battery-health`
- `i-pedal`
- `ev-smart-regeneration`
- `ev-regen-level`

## 7. 보강 개수

- 설명 보강: 24건
- 설정 방법 보강: 24건
- 사용 방법 보강: 24건
- 주의사항 보강: 24건
- 공식 출처/매뉴얼 근거 추가: 66건

## 8. 제외/미반영 항목

NE1 txt에서 확인되지 않았거나 이번 차량 범위가 아닌 항목은 아이오닉 5 적용에서 제외했습니다.

- `iccu-energy-control` — `ICCU` 직접 명칭 0건
- `camping-mode` — `캠핑 모드` 0건
- 하이브리드 전용 기능 전체
- FCEV 전용 기능 전체
- `swiveling-seat`

아이오닉 5 N(`hy-ioniq5-n`)은 이번 작업 대상이 아니므로 수정하지 않았습니다.

## 9. 생성/갱신 결과

- `ioniq5-2026-vehicle-audit.js` 생성
- `function-data.generated.json` 재생성
- `function/*/index.html` 재생성
- `sitemap.xml` 갱신
- outputs 배포 폴더 동기화 완료

## 10. 정적 QA 결과

| 항목 | 결과 |
|---|---|
| JS Parse | PASS |
| JSON Parse | PASS |
| HTML Parse | PASS |
| Broken Link Scan | PASS |
| Duplicate Scan | PASS |
| sitemap 등록 | PASS |
| canonical | PASS |
| JSON-LD | PASS |
| function URL 생성 | PASS |
| SEO metadata | PASS |

세부 결과:

- 현재 DB 기준 function URL: 119개
- sitemap URL: 120개(홈 1 + 기능 119)
- sitemap 누락: 0건
- 중복 slug: 0건
- 현재 DB slug 기준 function 내부 broken link: 0건
- canonical 누락: 0건
- JSON-LD 오류: 0건
- meta description 누락: 0건
- 금지 문구/깨진 문자 검색 결과: 0건

## 11. 수정 파일 목록

- `ioniq5-2026-vehicle-audit.js`
- `index.html`
- `seo-runtime.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/ioniq5-2026-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-ioniq5-audit-report.md`

## 12. 최종 판정

PASS

아이오닉 5(NE1) 범위에서 Owners Manual txt 기준 기능 누락 0건, EV 전용 기능 누락 0건, 적용 차량 누락 0건, 공식 매뉴얼 기반 보강, function page 및 sitemap 재생성, JS/JSON/HTML Parse PASS를 확인했습니다.
