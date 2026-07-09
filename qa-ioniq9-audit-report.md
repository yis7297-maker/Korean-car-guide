# Korean CAR GUIDE - IONIQ 9 Owners Manual Audit

작성일: 2026-07-09  
대상 차량: 현대 아이오닉 9  
대상 매뉴얼: `ME_2027_ko_KR.txt`  
검증 방식: 공식 Owners Manual txt 기준 차량 중심 정적 감사

## 1. 감사 범위

- 이번 작업은 현대 아이오닉 9만 대상으로 수행했다.
- 아이오닉 5, 아이오닉 6, 코나 Electric, 넥쏘 등 다른 차량으로 적용 범위를 확대하지 않았다.
- 공식 Owners Manual txt에서 확인되지 않은 기능은 아이오닉 9 적용 기능으로 추가하지 않았다.
- 기존 기능 삭제, 기존 slug 변경, 기존 URL 변경, 기존 SEO 구조 변경은 수행하지 않았다.
- 기존 기능과 이름이 비슷하다는 이유로 병합하지 않았다.

## 2. Owners Manual 발견 및 사이트 반영 수

| 항목 | 수량 |
| --- | ---: |
| Owners Manual 발견 기능 수 | 65 |
| 사이트 기존 기능 수 | 119 |
| 신규 추가 기능 수 | 2 |
| 사이트 반영 기능 수 | 65 |
| 기능 누락 수 | 0 |

## 3. 아이오닉 9 전용 신규 기능 목록

공식 `ME_2027_ko_KR.txt` 본문에서 별도 기능/항목으로 확인되어 신규 기능으로 분리했다.

- UV-C 살균 시스템
  - 확인 키워드: `UV-C 살균 시스템`, `살균 트레이`
  - 생성 URL: `/function/uv-c-sterilization-system/`
- 슬라이딩 콘솔
  - 확인 키워드: `슬라이딩 콘솔`
  - 생성 URL: `/function/sliding-console/`

비고:

- `Universal Island 2.0`, `Universal`, `Island`, `유니버설`, `아일랜드` 정확 명칭은 `ME_2027_ko_KR.txt`에서 확인되지 않았다.
- 따라서 마케팅 명칭을 임의로 추가하지 않고, 공식 Owners Manual에 수록된 명칭인 `슬라이딩 콘솔`로 별도 기능을 생성했다.

## 4. 핵심 기능 검증 결과

### EV

- 배터리 컨디셔닝: 반영
- EV Route Planner/충전소 검색: 반영
- 충전 예약: 반영
- 충전 전류 설정: 반영
- 충전 상태 확인: 반영
- 충전 커넥터 잠금: 반영
- V2L: 반영
- 실내 V2L: 반영
- 실외 V2L: 반영
- V2L 방전 제한량: 반영
- 에너지 정보/전력 소비량: 반영
- 배터리 상태: 반영
- 회생 제동 단계 조절: 반영
- i-PEDAL: 반영
- 스마트 회생 제동: 반영
- 원 페달 드라이빙: 반영

### ADAS / 주차

- Highway Driving Assist / NSCC / SCC: 반영
- Lane Following Assist: 반영
- Forward Collision-Avoidance Assist: 반영
- Blind-Spot View Monitor: 반영
- Blind-Spot Collision-Avoidance Assist: 반영
- Remote Smart Parking Assist 2: 반영
- Parking Collision-Avoidance Assist: 반영
- 주차 거리 경고: 반영
- 후방 모니터: 반영
- 서라운드 뷰 모니터: 반영
- 후방 교차 충돌방지 보조: 반영

### Digital

- OTA / 무선 소프트웨어 업데이트: 반영
- Digital Key 2: 반영
- Digital Key 2 Touch: 반영
- NFC 카드 키: 반영
- Fingerprint Authentication: 반영
- Built-in Cam: 반영
- Built-in Cam 2 Plus: 반영
- Digital Center Mirror: 반영
- 음성 인식: 반영
- Apple CarPlay: 반영
- Android Auto: 반영

비고:

- `ccNC`, `Hyundai AI Assistant`, `Face Connect`, `Digital Side Mirror` 정확 명칭은 `ME_2027_ko_KR.txt`에서 확인되지 않아 신규 적용하지 않았다.
- `Built-in Cam 2 Plus`는 사이트 DB의 분리 기능을 유지하되, 아이오닉 9 매뉴얼의 공식 섹션명 `빌트인 캠 (Built-in Cam)`과 녹화/주차 중 녹화/이벤트 녹화 본문을 기준으로 아이오닉 9 적용 정보를 보강했다.

### Premium / Convenience

- Swiveling Seat: 반영
- Relaxation Seat: 반영
- Dynamic Body Care Seat: 반영
- UV-C Sterilization Tray/System: 신규 생성 및 반영
- Sliding Console: 신규 생성 및 반영
- Rear Climate Control: 반영
- Climate Control: 반영
- Smart Key: 반영
- Remote Start: 반영
- Walk-in Device: 반영

## 5. 보강 수량

| 항목 | 수량 |
| --- | ---: |
| 설명 보강 개수 | 65 |
| 절차 보강 개수 | 65 |
| 주의사항 보강 개수 | 65 |
| 공식 출처 추가 개수 | 65 |

아이오닉 9 적용 기능에는 `ME_2027_ko_KR.txt` 기준 `manualEvidence`와 `modelSpecificGuides`를 추가했다.

## 6. 자동 생성 결과

- function page 생성: 121개
- `function-data.generated.json` 생성/갱신: 완료
- `sitemap.xml` 갱신: 완료
- JSON-LD 포함: 완료
- canonical URL 포함: 완료
- SEO title/meta description/Open Graph 유지: 완료

## 7. 정적 QA 결과

| 검증 항목 | 결과 |
| --- | --- |
| JS Parse | PASS |
| JSON Parse | PASS |
| HTML Parse | PASS |
| Broken Link Scan | PASS |
| Duplicate Scan | PASS |
| sitemap | PASS |
| canonical | PASS |
| JSON-LD | PASS |
| function URL 생성 | PASS |
| SEO metadata | PASS |

세부 결과:

- JS Parse 실패: 0건
- JSON Parse: PASS
- function HTML 누락: 0건
- duplicate slug: 0건
- sitemap 누락 URL: 0건
- sitemap 내 존재하지 않는 function URL: 0건
- canonical 누락/오류: 0건
- SEO meta 누락/오류: 0건
- JSON-LD 누락/오류: 0건
- 내부 function broken link: 0건

## 8. 오적용 방지 확인

아이오닉 9에 적용하지 않은 항목:

- ICCU 관련 별도 기능
- 캠핑 모드
- ccNC 시스템 명칭 기반 기능
- Face Connect
- Hyundai AI Assistant
- TMED-2 / HEV 전용 기능
- FCEV / 수소전기차 전용 기능
- N 전용 성능 기능

오적용 검사 결과: 0건

## 9. 루트/outputs 동기화

동기화 확인 파일:

- `index.html`
- `seo-runtime.js`
- `ioniq9-2027-vehicle-audit.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*`

루트와 `outputs/auto-guide-platform-v2`의 주요 파일 해시 일치: PASS

## 10. 수정 파일 목록

- `index.html`
- `seo-runtime.js`
- `ioniq9-2027-vehicle-audit.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/ioniq9-2027-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-ioniq9-audit-report.md`

## 11. 최종 판정

PASS

근거:

- Owners Manual 확인 기능 누락 0건
- 아이오닉 9 핵심 기능 누락 0건
- Swiveling Seat 반영
- Relaxation Seat 반영
- Dynamic Body Care Seat 반영
- UV-C Sterilization Tray/System 신규 반영
- Built-in Cam 2 Plus 반영
- Digital Key 2 Touch 반영
- 신규 기능 생성 완료
- 기존 기능 삭제 0건
- 기존 기능 병합 0건
- function page 생성 완료
- sitemap 갱신 완료
- JS / JSON / HTML Parse PASS
