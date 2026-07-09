# Korean CAR GUIDE - IONIQ 6 Owners Manual Audit

작성일: 2026-07-09  
대상 차량: 현대 아이오닉 6  
대상 매뉴얼: `CE1_2025_ko_KR.txt`  
제외 차량: 아이오닉 6 N (`CE1N_2025_ko_KR.txt`)  
검증 방식: 공식 Owners Manual txt 기준 차량 중심 정적 감사

## 1. 감사 범위

- 이번 작업은 현대 아이오닉 6만 대상으로 수행했다.
- 아이오닉 6 N, 아이오닉 5, 아이오닉 9, 코나 EV, 넥쏘 등 다른 차량의 적용 데이터는 확대 수정하지 않았다.
- 공식 Owners Manual txt에서 확인되지 않은 기능은 아이오닉 6 적용 기능으로 추가하지 않았다.
- 기존 기능 삭제, 기존 slug 변경, 기존 URL 변경, 기존 SEO 구조 변경은 수행하지 않았다.

## 2. Owners Manual 검색 및 반영 요약

| 항목 | 수량 |
| --- | ---: |
| Owners Manual 발견 기능 수 | 64 |
| 사이트 반영 기능 수 | 64 |
| 누락 기능 수 | 0 |
| 신규 추가 기능 수 | 0 |

비고:

- 신규 기능 객체는 이번 작업에서 새로 증가하지 않았다.
- EV 세부 기능 중 공식 매뉴얼에서 별도 기능/메뉴로 확인되는 항목은 기존 DB에 이미 존재하는 분리 기능을 재사용하여 아이오닉 6 적용 차량, 출처, 절차 데이터를 반영했다.
- 기존 기능과 유사하다는 이유로 병합하거나 다른 기능으로 변경한 항목은 없다.

## 3. 아이오닉 6 반영 기능 수

- 사이트 전체 기능 수: 119
- 아이오닉 6 적용 기능 수: 64
- 아이오닉 6 EV 전용 기능 수: 24
- 기능 누락 수: 0
- EV 기능 누락 수: 0

## 4. EV 전용 기능 반영 목록

아래 기능은 `CE1_2025_ko_KR.txt`에서 관련 명칭/메뉴/절차가 확인되어 아이오닉 6에만 적용했다.

- Plug & Charge
- EV Route Planner
- 배터리 컨디셔닝
- 충전 예약
- 충전 한도 설정
- V2L
- 실내 V2L
- 실외 V2L
- 유틸리티 모드
- 충전 상태 확인
- EV 에너지 사용량
- EV Battery Health
- i-Pedal
- 스마트 회생제동
- 회생제동 단계 조절
- EV 주행 가능 거리
- 충전 전류 설정
- 충전 커넥터 잠금
- 충전 정보
- EV 메뉴/설정
- 충전소 검색
- V2L 방전 제한량
- 원 페달 드라이빙
- 전비 이력

## 5. 아이오닉 6에서 제외 확인한 항목

아래 항목은 `CE1_2025_ko_KR.txt` 기준 아이오닉 6 기능으로 적용하지 않았다.

- ICCU 관련 별도 기능
- 캠핑 모드
- ccNC 시스템 명칭 기반 기능
- Built-in Cam 2
- Built-in Cam 2 Plus
- TMED-2 / 하이브리드 전용 기능
- 수소전기차/FCEV 전용 기능
- 스위블링 시트

## 6. 보강 수량

| 항목 | 수량 |
| --- | ---: |
| 설명 보강 개수 | 24 |
| 설정 방법 보강 개수 | 24 |
| 사용 방법/절차 보강 개수 | 24 |
| 주의사항 보강 개수 | 24 |
| 공식 출처 추가 개수 | 64 |

보강 내용은 공식 매뉴얼에서 확인되는 기능명, 메뉴명, 사용 조건, 사용 순서, 제한/주의 항목만 반영했다.

## 7. 자동 생성 결과

- function page 생성: 119개
- `function-data.generated.json` 생성/갱신: 완료
- `sitemap.xml` 갱신: 완료
- JSON-LD 포함: 완료
- canonical URL 포함: 완료
- SEO title/meta description/Open Graph 유지: 완료

## 8. 정적 QA 결과

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

## 9. 루트/outputs 동기화

동기화 확인 파일:

- `index.html`
- `seo-runtime.js`
- `ioniq6-2025-vehicle-audit.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*`

루트와 `outputs/auto-guide-platform-v2`의 주요 파일 해시 일치: PASS

## 10. 수정 파일 목록

- `index.html`
- `seo-runtime.js`
- `ioniq6-2025-vehicle-audit.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/ioniq6-2025-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-ioniq6-audit-report.md`

## 11. 최종 판정

PASS

근거:

- 기능 누락 0건
- EV 기능 누락 0건
- 기존 기능 삭제 0건
- 기존 기능 병합 0건
- function page 생성 완료
- sitemap 갱신 완료
- JS / JSON / HTML Parse PASS
