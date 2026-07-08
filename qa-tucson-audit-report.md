# Korean CAR GUIDE — Tucson / Tucson Hybrid Vehicle Manual Audit

작성일: 2026-07-08  
작업 범위: 현대 투싼(NX4) / 투싼 하이브리드(NX4HEV)만 검증  
사용 자료:

- `work/manual-text/NX4_2026_ko_KR.txt`
- `work/manual-text/NX4HEV_2026_ko_KR.txt`

## 1. 작업 원칙 준수

- 비공식 자료, 블로그, 유튜브 사용 안 함
- PDF 원본 수정 안 함
- Owners Manual txt에서 확인된 기능명/용어만 사용
- 투싼 일반 모델과 투싼 하이브리드 적용 기능 분리
- 투싼 하이브리드에 TMED-2, 스테이 모드, V2L을 전제로 추가하지 않음
- 기존 기능 slug, function URL, canonical, SEO 구조 변경 없음
- 작업 차량 외 다른 차량의 적용 차량 데이터 수정 없음

## 2. Manual keyword scan 결과

| 키워드 | NX4 일반 | NX4HEV |
|---|---:|---:|
| 전방 충돌방지 보조 | 84 | 84 |
| 스마트 크루즈 컨트롤 | 93 | 95 |
| 고속도로 주행 보조 | 33 | 33 |
| 차로 유지 보조 | 37 | 37 |
| 차로 이탈방지 보조 | 40 | 40 |
| 지능형 속도 제한 보조 | 29 | 29 |
| 운전자 주의 경고 | 33 | 33 |
| 하이빔 보조 | 39 | 39 |
| 후측방 충돌방지 보조 | 40 | 40 |
| 안전 하차 보조 | 2 | 2 |
| 주차 거리 경고 | 80 | 81 |
| 주차 충돌방지 보조 | 30 | 30 |
| 원격 스마트 주차 보조 | 42 | 42 |
| 서라운드 뷰 모니터 | 51 | 51 |
| 후측방 모니터 | 21 | 21 |
| 후방 모니터 | 33 | 33 |
| 디지털 키 | 138 | 139 |
| 지문 인증 | 39 | 39 |
| 빌트인 캠 | 70 | 71 |
| 무선 소프트웨어 업데이트 | 4 | 4 |
| 파워 테일게이트 | 58 | 58 |
| 스마트 테일게이트 | 19 | 19 |
| 헤드업 디스플레이 | 3 | 3 |
| 공기 청정 | 6 | 6 |
| 애프터 블로우 | 3 | 3 |
| 하이패스 | 49 | 49 |
| 하이브리드 | 0 | 90 |
| 회생 제동 | 0 | 84 |
| 에너지 흐름도 | 0 | 3 |
| 하이브리드 에너지 흐름 | 0 | 3 |
| 고전압 배터리 | 0 | 40 |
| EV 모드 | 0 | 3 |
| TMED | 0 | 0 |
| 스테이 모드 | 0 | 0 |
| V2L | 0 | 0 |

## 3. 교차 검증 표

| 구분 | Owners Manual 발견 기능 수 | 사이트 반영 기능 수 | 누락 기능 수 | 신규 추가 기능 수 |
|---|---:|---:|---:|---:|
| 투싼(NX4) | 35 | 35 | 0 | 0 |
| 투싼 하이브리드(NX4HEV) | 40 | 40 | 0 | 0 |

## 4. 사이트 반영 기능 수

- 투싼: 35개
- 투싼 하이브리드: 40개
- 전체 기능 DB: 105개
- 전체 차량 DB: 41개

## 5. 신규 추가 기능 목록

신규 기능 객체는 추가하지 않았습니다.

이번 작업은 기존 DB 기능을 투싼/투싼 하이브리드에 정확히 매핑하고, 하이브리드 전용 상세 데이터를 보강하는 감사 작업으로 처리했습니다.

## 6. 설명/절차/주의사항 보강

하이브리드 전용 기능 5개를 NX4HEV txt 기준으로 보강했습니다.

1. `hybrid-smart-regen`
2. `hybrid-regen-level`
3. `hybrid-energy-flow`
4. `hybrid-battery-status`
5. `hybrid-driving-info`

보강 개수:

- 설명 보강: 5건
- 설정 방법 보강: 5건
- 사용 방법 보강: 5건
- 주의사항 보강: 5건
- 공식 출처/매뉴얼 근거 추가: 75건(투싼 35 + 투싼 HEV 40 매핑 기준)

## 7. 일반/하이브리드 기능 분리

PASS

- 투싼 일반 모델: 일반/공통 기능만 적용
- 투싼 하이브리드: 공통 기능 + HEV 전용 표시/회생/에너지 관련 기능만 적용
- NX4HEV txt에서 확인되지 않은 `TMED`, `스테이 모드`, `V2L`, `정차 공조` 관련 기능은 투싼 하이브리드 적용 차량에서 제외

제외 유지 항목:

- `tmed2-hybrid-system`
- `hybrid-stay-mode`
- `hybrid-stay-reservation`
- `hybrid-v2l`
- `hybrid-stationary-climate`
- `rspa2`
- `built-in-cam2`
- `built-in-cam2-plus`
- `feature-on-demand`
- `panoramic-curved-display`

## 8. 생성/갱신 결과

- `tucson-2026-vehicle-audit.js` 생성
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
| Duplicate Slug Scan | PASS |
| sitemap 등록 | PASS |
| canonical | PASS |
| JSON-LD | PASS |
| function URL 생성 | PASS |
| SEO metadata | PASS |
| Console Error Scan(정적) | PASS |

세부 결과:

- 현재 DB 기준 function URL: 105개
- sitemap URL: 106개(홈 1 + 기능 105)
- sitemap 누락: 0건
- 중복 slug: 0건
- 현재 DB slug 기준 function 내부 broken link: 0건
- canonical 누락: 0건
- JSON-LD 오류: 0건
- meta description 누락: 0건

## 10. 수정 파일 목록

- `tucson-2026-vehicle-audit.js`
- `index.html`
- `seo-runtime.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/tucson-2026-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-tucson-audit-report.md`

## 11. 최종 판정

PASS

투싼 / 투싼 하이브리드 범위에서 Owners Manual txt 기준 기능 누락 0건, 일반/HEV 적용 혼동 0건, TMED-2 임의 추가 0건, function page 및 sitemap 재생성, JS/JSON/HTML Parse PASS를 확인했습니다.
