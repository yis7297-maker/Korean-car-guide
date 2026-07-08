# Korean CAR GUIDE — Kona / Kona Hybrid Vehicle Manual Audit

작성일: 2026-07-08  
작업 범위: 현대 코나(SX2) / 코나 하이브리드(SX2HEV)만 검증  
사용 자료:

- `work/manual-text/SX2_2027_ko_KR.txt`
- `work/manual-text/SX2HEV_2027_ko_KR.txt`

## 1. 작업 원칙 준수

- 비공식 자료, 블로그, 유튜브 사용 안 함
- PDF 원본 수정 안 함
- Owners Manual txt에서 확인된 기능명/용어만 사용
- 코나 일반 모델과 코나 하이브리드 적용 기능 분리
- 코나 하이브리드에 TMED-2, 스테이 모드, V2L을 전제로 추가하지 않음
- 공식 매뉴얼에서 별도 기능으로 확인된 항목은 기존 기능과 임의 병합하지 않음
- 기존 slug, 기존 URL, 기존 SEO 구조 변경 없음
- 작업 차량 외 다른 현대/제네시스 차량 적용 데이터 수정 없음

## 2. Manual keyword scan 결과

| 키워드 | SX2 일반 | SX2HEV |
|---|---:|---:|
| 전방 충돌방지 보조 | 92 | 95 |
| 스마트 크루즈 컨트롤 | 108 | 115 |
| 고속도로 주행 보조 | 36 | 37 |
| 차로 유지 보조 | 35 | 35 |
| 차로 이탈방지 보조 | 41 | 44 |
| 지능형 속도 제한 보조 | 27 | 27 |
| 운전자 주의 경고 | 36 | 35 |
| 하이빔 보조 | 35 | 35 |
| 후측방 충돌방지 보조 | 54 | 54 |
| 안전 하차 보조 | 1 | 1 |
| 후방 교차 충돌방지 보조 | 39 | 42 |
| 주차 거리 경고 | 88 | 91 |
| 주차 충돌방지 보조 | 36 | 36 |
| 원격 스마트 주차 보조 | 42 | 45 |
| 서라운드 뷰 모니터 | 53 | 53 |
| 후측방 모니터 | 21 | 21 |
| 후방 모니터 | 36 | 36 |
| 디지털 키 | 116 | 124 |
| 빌트인 캠 | 71 | 74 |
| 무선 소프트웨어 업데이트 | 4 | 4 |
| 파워 테일게이트 | 59 | 60 |
| 스마트 테일게이트 | 27 | 27 |
| 공기 청정 | 8 | 8 |
| 애프터 블로우 | 0 | 1 |
| 하이패스 | 48 | 48 |
| 스마트 키 | 236 | 240 |
| 비상 키 | 16 | 16 |
| 원격 시동 | 24 | 24 |
| 원격 공조 | 1 | 1 |
| 열선 | 87 | 87 |
| 통풍 | 46 | 43 |
| Android Auto | 2 | 3 |
| 카플레이/CarPlay | 1 | 1 |
| 무선 충전 | 56 | 57 |
| NFC | 32 | 34 |
| 카드 키 | 38 | 39 |
| 블루링크/Bluelink | 13 | 13 |
| 운전석 자세 메모리 시스템 | 15 | 확인됨 |
| 릴렉션 컴포트 시트 | 12 | 확인됨 |
| 동승석 측면 워크인 | 1 | 확인됨 |
| 하이브리드 | 0 | 107 |
| 회생 제동 | 0 | 95 |
| 에너지 흐름도 | 0 | 4 |
| 하이브리드 에너지 흐름 | 0 | 4 |
| 배터리 충전 상태 | 1 | 5 |
| 고전압 배터리 | 0 | 45 |
| EV 모드 | 0 | 3 |
| TMED | 0 | 0 |
| 스테이 모드 | 0 | 0 |
| V2L | 0 | 0 |
| 정차 공조 | 0 | 0 |

## 3. 교차 검증 표

| 구분 | Owners Manual 발견 기능 수 | 사이트 반영 기능 수 | 누락 기능 수 | 신규 추가 기능 수 |
|---|---:|---:|---:|---:|
| 코나(SX2) | 42 | 42 | 0 | 4 |
| 코나 하이브리드(SX2HEV) | 48 | 48 | 0 | 4 |

## 4. 사이트 반영 기능 수

- 코나: 42개
- 코나 하이브리드: 48개
- 전체 기능 DB: 109개
- 전체 차량 DB: 42개

## 5. 신규 추가 기능 목록

공식 SX2/SX2HEV txt에서 별도 항목으로 확인되어 추가한 기능입니다.

1. `nfc-card-key` — NFC 카드 키
2. `wireless-phone-charging` — 스마트폰 무선 충전 시스템
3. `voice-recognition-system` — 음성인식 시스템
4. `bluelink-connected-services` — Bluelink

## 6. 설명/절차/주의사항 보강

보강 기능:

- HEV 전용 기능 5개
  - `hybrid-smart-regen`
  - `hybrid-regen-level`
  - `hybrid-energy-flow`
  - `hybrid-battery-status`
  - `hybrid-driving-info`
- 신규 편의/디지털 기능 4개
  - `nfc-card-key`
  - `wireless-phone-charging`
  - `voice-recognition-system`
  - `bluelink-connected-services`

보강 개수:

- 설명 보강: 9건
- 설정 방법 보강: 9건
- 사용 방법 보강: 9건
- 주의사항 보강: 9건
- 공식 출처/매뉴얼 근거 추가: 90건(코나 42 + 코나 HEV 48 매핑 기준)

## 7. 일반/하이브리드 기능 분리

PASS

- 코나 일반 모델: 일반/공통 기능만 적용
- 코나 하이브리드: 공통 기능 + HEV 전용 표시/회생/에너지 관련 기능만 적용
- `애프터 블로우`는 SX2 일반 txt에서 0건, SX2HEV txt에서 1건 확인되어 코나 하이브리드에만 수동 검증 매핑
- SX2HEV txt에서 확인되지 않은 `TMED`, `스테이 모드`, `V2L`, `정차 공조` 관련 기능은 코나 하이브리드 적용 차량에서 제외

제외 유지 항목:

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
- `rspa2`
- `built-in-cam2`
- `built-in-cam2-plus`
- `feature-on-demand`
- `panoramic-curved-display`

## 8. 생성/갱신 결과

- `kona-2027-vehicle-audit.js` 생성
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

- 현재 DB 기준 function URL: 109개
- sitemap URL: 110개(홈 1 + 기능 109)
- sitemap 누락: 0건
- 중복 slug: 0건
- 현재 DB slug 기준 function 내부 broken link: 0건
- canonical 누락: 0건
- JSON-LD 오류: 0건
- meta description 누락: 0건
- 금지 문구/깨진 문자 검색 결과: 0건

## 10. 수정 파일 목록

- `kona-2027-vehicle-audit.js`
- `index.html`
- `seo-runtime.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/kona-2027-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-kona-audit-report.md`

## 11. 최종 판정

PASS

코나 / 코나 하이브리드 범위에서 Owners Manual txt 기준 기능 누락 0건, 일반/HEV 적용 혼동 0건, TMED-2 임의 추가 0건, function page 및 sitemap 재생성, JS/JSON/HTML Parse PASS를 확인했습니다.
