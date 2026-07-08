# Korean CAR GUIDE — Staria / Staria Hybrid Vehicle Manual Audit

작성일: 2026-07-08  
작업 범위: 현대 스타리아(US4) / 스타리아 하이브리드(US4HEV)만 검증  
사용 자료:

- `work/manual-text/US4_2026_ko_KR.txt`
- `work/manual-text/US4HEV_2026_ko_KR.txt`

## 1. 작업 원칙 준수

- 비공식 자료, 블로그, 유튜브 사용 안 함
- PDF 원본 수정 안 함
- Owners Manual txt에서 확인된 기능명/용어만 사용
- 스타리아 일반 모델과 스타리아 하이브리드 적용 기능 분리
- 스타리아 하이브리드에 TMED-2, 스테이 모드, V2L을 전제로 추가하지 않음
- 공식 매뉴얼에서 별도 기능으로 확인된 항목은 기존 기능과 임의 병합하지 않음
- 기존 slug, 기존 URL, 기존 SEO 구조 변경 없음
- 작업 차량 외 다른 현대/제네시스 차량 적용 데이터 수정 없음

## 2. Manual keyword scan 결과

| 키워드 | US4 일반 | US4HEV |
|---|---:|---:|
| 전방 충돌방지 보조 | 50 | 46 |
| 스마트 크루즈 컨트롤 | 99 | 99 |
| 고속도로 주행 보조 | 41 | 41 |
| 차로 유지 보조 | 45 | 45 |
| 차로 이탈방지 보조 | 45 | 45 |
| 지능형 속도 제한 보조 | 21 | 21 |
| 운전자 주의 경고 | 14 | 14 |
| 하이빔 보조 | 28 | 28 |
| 후측방 충돌방지 보조 | 38 | 38 |
| 안전 하차 보조 | 27 | 27 |
| 후방 교차 충돌방지 보조 | 31 | 31 |
| 주차 거리 경고 | 44 | 44 |
| 주차 충돌방지 보조 | 1 | 1 |
| 서라운드 뷰 모니터 | 37 | 37 |
| 후측방 모니터 | 13 | 13 |
| 후방 모니터 | 34 | 34 |
| 원격 스마트 주차 보조 | 0 | 0 |
| 스마트 주차 보조 | 0 | 0 |
| 메모리 리버스 어시스트 | 0 | 0 |
| 메모리 주차 | 0 | 0 |
| 디지털 키 | 134 | 135 |
| 빌트인 캠 | 70 | 71 |
| 무선 소프트웨어 업데이트 | 3 | 3 |
| 파워 테일게이트 | 57 | 57 |
| 스마트 테일게이트 | 19 | 19 |
| 슬라이딩 도어 | 94 | 95 |
| 파워 슬라이딩 도어 | 57 | 58 |
| 후석 공조 | 2 | 확인됨 |
| 공기 청정 | 5 | 5 |
| 애프터 블로우 | 2 | 3 |
| 하이패스 | 44 | 44 |
| 스마트 키 | 229 | 230 |
| 비상 키 | 14 | 14 |
| 원격 시동 | 20 | 20 |
| 원격 공조 | 1 | 1 |
| 열선 | 67 | 40 |
| 통풍 | 37 | 41 |
| 무선 충전 | 50 | 확인됨 |
| NFC/카드 키 | 확인됨 | 확인됨 |
| 블루링크/Bluelink | 19 | 확인됨 |
| 음성 인식 | 2 | 확인됨 |
| 릴렉션 좌석 | 10 | 확인됨 |
| 워크인 스위치 | 8 | 확인됨 |
| Passenger Talk | 0 | 0 |
| Passenger View | 0 | 0 |
| 스위블링 시트 | 0 | 0 |
| 하이브리드 | 0 | 89 |
| 회생 제동 | 0 | 25 |
| 에너지 흐름도 | 0 | 2 |
| 하이브리드 에너지 흐름 | 0 | 2 |
| 배터리 충전 상태 | 1 | 3 |
| 고전압 배터리 | 0 | 53 |
| EV 모드 | 0 | 3 |
| TMED | 0 | 0 |
| 스테이 모드 | 0 | 0 |
| V2L | 0 | 0 |
| 정차 공조 | 0 | 0 |

## 3. 교차 검증 표

| 구분 | Owners Manual 발견 기능 수 | 사이트 반영 기능 수 | 누락 기능 수 | 신규 추가 기능 수 |
|---|---:|---:|---:|---:|
| 스타리아(US4) | 42 | 42 | 0 | 1 |
| 스타리아 하이브리드(US4HEV) | 47 | 47 | 0 | 1 |

## 4. 사이트 반영 기능 수

- 스타리아: 42개
- 스타리아 하이브리드: 47개
- 전체 기능 DB: 110개
- 전체 차량 DB: 43개

## 5. 신규 추가 기능 목록

공식 US4/US4HEV txt에서 별도 항목으로 확인되어 추가한 기능입니다.

1. `power-sliding-door` — 파워 슬라이딩 도어

## 6. 설명/절차/주의사항 보강

보강 기능:

- HEV 전용 기능 5개
  - `hybrid-smart-regen`
  - `hybrid-regen-level`
  - `hybrid-energy-flow`
  - `hybrid-battery-status`
  - `hybrid-driving-info`
- 스타리아 전용 도어 기능 1개
  - `power-sliding-door`

보강 개수:

- 설명 보강: 6건
- 설정 방법 보강: 6건
- 사용 방법 보강: 6건
- 주의사항 보강: 6건
- 공식 출처/매뉴얼 근거 추가: 89건(스타리아 42 + 스타리아 HEV 47 매핑 기준)

## 7. 일반/하이브리드 기능 분리

PASS

- 스타리아 일반 모델: 일반/공통 기능만 적용
- 스타리아 하이브리드: 공통 기능 + HEV 전용 표시/회생/에너지 관련 기능만 적용
- US4HEV txt에서 확인되지 않은 `TMED`, `스테이 모드`, `V2L`, `정차 공조` 관련 기능은 스타리아 하이브리드 적용 차량에서 제외
- 자동 주차 계열, Passenger Talk/View, 스위블링 시트는 US4/US4HEV txt에서 기능 본문이 확인되지 않아 스타리아 적용 차량에서 제외

제외 유지 항목:

- `rspa`
- `rspa2`
- `spa`
- `remote-smart-exit`
- `memory-reverse-assist`
- `memory-parking`
- `tmed2-hybrid-system`
- `hybrid-stay-mode`
- `hybrid-stay-reservation`
- `hybrid-v2l`
- `hybrid-stationary-climate`
- `ev-charge-v2l`
- `plug-and-charge`
- `battery-conditioning`
- `scheduled-charging`
- `charge-limit`
- `passenger-talk`
- `passenger-view`
- `rear-voice-recognition`
- `swiveling-seat`
- `built-in-cam2`
- `built-in-cam2-plus`
- `feature-on-demand`
- `panoramic-curved-display`

## 8. 생성/갱신 결과

- `staria-2026-vehicle-audit.js` 생성
- `function-data.generated.json` 재생성
- `function/*/index.html` 재생성
- `sitemap.xml` 갱신
- outputs 배포 폴더 동기화 완료

## 9. 정적 QA 결과

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
| Console Error Scan(정적) | PASS |

세부 결과:

- 현재 DB 기준 function URL: 110개
- sitemap URL: 111개(홈 1 + 기능 110)
- sitemap 누락: 0건
- 중복 slug: 0건
- 현재 DB slug 기준 function 내부 broken link: 0건
- canonical 누락: 0건
- JSON-LD 오류: 0건
- meta description 누락: 0건
- 금지 문구/깨진 문자 검색 결과: 0건

## 10. 수정 파일 목록

- `staria-2026-vehicle-audit.js`
- `index.html`
- `seo-runtime.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/staria-2026-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-staria-audit-report.md`

## 11. 최종 판정

PASS

스타리아 / 스타리아 하이브리드 범위에서 Owners Manual txt 기준 기능 누락 0건, 일반/HEV 적용 혼동 0건, 매뉴얼에 없는 시스템명 임의 추가 0건, function page 및 sitemap 재생성, JS/JSON/HTML Parse PASS를 확인했습니다.
