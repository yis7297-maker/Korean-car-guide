# Korean CAR GUIDE - Kona Electric Owners Manual Audit

작성일: 2026-07-09  
대상 차량: 현대 코나 일렉트릭  
대상 매뉴얼: `SX2EV_2025_ko_KR.txt`  
검증 방식: 공식 Owners Manual txt 기준 차량 중심 정적 감사

## 1. 감사 범위

- 이번 작업은 현대 코나 일렉트릭만 대상으로 수행했다.
- 코나 ICE, 코나 하이브리드, 아이오닉 5, 아이오닉 6, 아이오닉 9, 넥쏘 등 다른 차량으로 적용 범위를 확대하지 않았다.
- 공식 Owners Manual txt에서 확인되지 않은 기능은 코나 일렉트릭 적용 기능으로 추가하지 않았다.
- 기존 기능 삭제, 기존 slug 변경, 기존 URL 변경, 기존 SEO 구조 변경은 수행하지 않았다.
- 기존 기능과 이름이 비슷하다는 이유로 병합하지 않았다.

## 2. Owners Manual 발견 및 사이트 반영 수

| 항목 | 수량 |
| --- | ---: |
| Owners Manual 발견 기능 수 | 52 |
| 사이트 기존 기능 수 | 121 |
| 신규 추가 기능 수 | 5 |
| 사이트 반영 기능 수 | 52 |
| 기능 누락 수 | 0 |

## 3. 코나 일렉트릭 전용 신규 기능 목록

공식 `SX2EV_2025_ko_KR.txt` 목차/본문/색인에서 별도 기능 또는 별도 절차 항목으로 확인되어 신규 기능으로 분리했다.

- 완속 충전
  - 확인 키워드: `완속 충전기 사용하기`, `완속 충전`
  - 생성 URL: `/function/ac-slow-charging/`
- 급속 충전
  - 확인 키워드: `급속 충전기 사용하기`, `급속 충전`
  - 생성 URL: `/function/dc-fast-charging/`
- 휴대용 충전기(ICCB)
  - 확인 키워드: `휴대용 충전기(ICCB) 사용하기`, `ICCB`
  - 생성 URL: `/function/portable-charger-iccb/`
- 충전 즉시 중단
  - 확인 키워드: `충전 즉시 중단하기`
  - 생성 URL: `/function/stop-charging-immediately/`
- Hyundai Digital Key
  - 확인 키워드: `디지털 키`, `NFC 카드 키`, `스마트폰 디지털 키`
  - 생성 URL: `/function/digital-key/`

비고:

- `Digital Key 2`, `Digital Key 2 Touch` 정확 명칭은 `SX2EV_2025_ko_KR.txt`에서 확인되지 않아 코나 일렉트릭에 적용하지 않았다.
- `Built-in Cam 2`, `Built-in Cam 2 Plus`, `ccNC`, `Hyundai AI Assistant`, `ICCU` 정확 명칭도 해당 txt에서 확인되지 않아 적용하지 않았다.

## 4. 핵심 기능 검증 결과

### EV

- 배터리 컨디셔닝: 반영
- EV Route Planner/내비게이션 연동 급속 충전소 목적지 설정: 반영
- 예약 충전: 반영
- 충전 목표 배터리량/충전 제한 설정: 반영
- 충전 전류 설정: 반영
- 충전 상태 확인: 반영
- 충전 커넥터 잠금: 반영
- 완속 충전: 신규 생성 및 반영
- 급속 충전: 신규 생성 및 반영
- 휴대용 충전기(ICCB): 신규 생성 및 반영
- 충전 즉시 중단: 신규 생성 및 반영
- V2L: 반영
- 실내 V2L: 반영
- 실외 V2L: 반영
- V2L 방전 제한량: 반영
- EV 모드 / EV 설정: 반영
- 에너지 정보 / 전력 소비량: 반영
- 배터리 상태: 반영
- 주행 가능 거리: 반영
- 회생 제동 단계 조절: 반영
- i-PEDAL: 반영
- 원 페달 드라이빙: 반영
- 스마트 회생 시스템: 반영

### ADAS / 주차

- Smart Cruise Control / NSCC / HDA: 반영
- Lane Following Assist: 반영
- Lane Keeping Assist: 반영
- Blind-Spot Collision-Avoidance Assist: 반영
- Blind-Spot View Monitor: 반영
- Forward Collision-Avoidance Assist: 반영
- Rear Cross-Traffic Collision-Avoidance Assist: 반영
- Safe Exit Warning/Assist: 반영
- Parking Distance Warning: 반영
- Parking Collision-Avoidance Assist: 반영
- Remote Smart Parking Assist: 반영

비고:

- `원격 스마트 주차 보조 2`, `RSPA 2` 정확 명칭은 `SX2EV_2025_ko_KR.txt`에서 확인되지 않아 코나 일렉트릭에 적용하지 않았다.

### Digital / Convenience

- Hyundai Digital Key: 신규 생성 및 반영
- NFC 카드 키: 반영
- Built-in Cam: 반영
- OTA / 무선 소프트웨어 업데이트: 반영
- 음성 인식 버튼: 반영
- Apple CarPlay / CarPlay: 반영
- Android Auto: 반영
- 블루링크: 반영
- 원격 공조: 반영
- 히터와 에어컨 / 공조: 반영

## 5. 보강 수량

| 항목 | 수량 |
| --- | ---: |
| 설명 보강 개수 | 52 |
| 절차 보강 개수 | 52 |
| 주의사항 보강 개수 | 52 |
| 공식 출처 추가 개수 | 52 |

코나 일렉트릭 적용 기능에는 `SX2EV_2025_ko_KR.txt` 기준 `manualEvidence`와 `modelSpecificGuides`를 추가했다.

## 6. 자동 생성 결과

- function page 생성: 126개
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

코나 일렉트릭에 적용하지 않은 항목:

- Hyundai Digital Key 2
- Hyundai Digital Key 2 Touch
- Built-in Cam 2
- Built-in Cam 2 Plus
- ccNC 시스템 명칭 기반 기능
- Hyundai AI Assistant
- ICCU 관련 별도 기능
- 캠핑 모드
- TMED-2 / HEV 전용 기능
- FCEV / 수소전기차 전용 기능
- N 전용 성능 기능
- RSPA 2

오적용 검사 결과: 0건

## 9. 루트/outputs 동기화

동기화 확인 파일:

- `index.html`
- `seo-runtime.js`
- `kona-electric-2025-vehicle-audit.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*`

루트와 `outputs/auto-guide-platform-v2`의 주요 파일 해시 일치: PASS

## 10. 수정 파일 목록

- `index.html`
- `seo-runtime.js`
- `kona-electric-2025-vehicle-audit.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/kona-electric-2025-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-kona-electric-audit-report.md`

## 11. 최종 판정

PASS

근거:

- Owners Manual 확인 기능 누락 0건
- EV 전용 기능 누락 0건
- 신규 기능 생성 완료
- 기존 기능 삭제 0건
- 기존 기능 병합 0건
- function page 생성 완료
- sitemap 갱신 완료
- JS / JSON / HTML Parse PASS
