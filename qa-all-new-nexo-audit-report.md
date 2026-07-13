# Korean CAR GUIDE 디 올 뉴 넥쏘(NH2) 공식 매뉴얼 기반 감사 리포트

작성일: 2026-07-13  
대상 차량: 현대 디 올 뉴 넥쏘(NH2, 2026)  
사용 자료: `work/manual-text/NH2_2026_ko_KR.txt`  
작업 범위: 디 올 뉴 넥쏘만 검증. 기존 넥쏘 및 다른 차량은 수정하지 않음.

## 기준 및 주의 사항

- 이번 작업은 비공식 자료, 블로그, 유튜브, 추론을 사용하지 않고 `NH2_2026_ko_KR.txt`만 기준으로 수행했다.
- 현재 DB에서 `hy-nexo`의 표시명은 “디 올 뉴 넥쏘”이며, 별도 기존 넥쏘 ID는 존재하지 않는다. 따라서 이번 작업은 `hy-nexo`의 NH2 2026 데이터만 갱신했다.
- 아이오닉/코나 EV 등 BEV 전용 기능과 하이브리드 전용 기능은 디 올 뉴 넥쏘에 확대 적용하지 않았다.
- 기존 기능 ID, slug, URL, SEO 구조는 유지했다.

## Owners Manual 검색 근거 요약

`NH2_2026_ko_KR.txt`에서 다음 핵심 기능군을 확인했다.

- 수소 전기차 이해하기
- 수소 전기차 주요 장치 살펴보기
- 수소 전기차에 사용되는 배터리
- 주차 중 연료 전지 시스템 보호 기능(Wake Up 기능)
- 수소 전기차 주행하기
- FCEV 시스템 에너지 흐름도 확인하기
- 수소 전기차 충전하기
- FCEV 모드 기능 사용하기
- 에너지 정보 확인하기
- 전기 사용(V2L) 기능 활용하기
- 수소 전기차 사용 시 안전을 위한 주의사항
- 수소 전기차 사고 및 화재 발생 시 조치 사항

## 교차 검증 표

| 항목 | 개수 |
|---|---:|
| Owners Manual 발견 기능 | 57 |
| 기존 사이트 반영 기능 | 45 |
| 신규 추가 기능 | 12 |
| 최종 사이트 반영 기능 | 57 |
| 최종 누락 기능 | 0 |

## 신규 추가 기능 목록

| 기능 ID | slug | 기능명 |
|---|---|---|
| `fcev-powertrain-system` | `fcev-powertrain-system` | 수소 전기차 시스템 |
| `fuel-cell-stack` | `fuel-cell-stack` | 연료 전지 스택 |
| `fuel-cell-system-module` | `fuel-cell-system-module` | 연료 전지 시스템 모듈 |
| `hydrogen-storage-system` | `hydrogen-storage-system` | 수소 저장 시스템 |
| `fcev-high-voltage-battery` | `fcev-high-voltage-battery` | 수소전기차 고전압 배터리 |
| `fuel-cell-wake-up` | `fuel-cell-wake-up` | 주차 중 연료 전지 시스템 보호 기능 |
| `fuel-cell-water-drain` | `fuel-cell-water-drain` | 주차 중 물 배출 기능 |
| `hydrogen-tank-info` | `hydrogen-tank-info` | 수소 탱크 정보 |
| `hydrogen-driving-range` | `hydrogen-driving-range` | 수소 주행 가능 거리 |
| `hydrogen-leak-warning` | `hydrogen-leak-warning` | 수소 누출 경고 |
| `fcev-emergency-response` | `fcev-emergency-response` | 수소전기차 사고·화재·침수 대응 |
| `fcev-environmental-contribution` | `fcev-environmental-contribution` | 환경 기여도 |

## FCEV 전용 신규 기능 목록

신규 추가 기능 12개 모두 FCEV 전용 기능으로 분류했다.

- 수소 전기차 시스템
- 연료 전지 스택
- 연료 전지 시스템 모듈
- 수소 저장 시스템
- 수소전기차 고전압 배터리
- 주차 중 연료 전지 시스템 보호 기능
- 주차 중 물 배출 기능
- 수소 탱크 정보
- 수소 주행 가능 거리
- 수소 누출 경고
- 수소전기차 사고·화재·침수 대응
- 환경 기여도

## 보강 결과

| 항목 | 개수 |
|---|---:|
| 설명 보강 개수 | 57 |
| 설정 방법 보강 개수 | 57 |
| 사용 방법 보강 개수 | 57 |
| 주의사항 보강 개수 | 57 |
| 공식 출처 추가 개수 | 57 |
| 기존 기능 삭제 개수 | 0 |
| 기존 ID 손실 개수 | 0 |
| 기존 slug 손실 개수 | 0 |

## 적용 차량 분리 결과

- 디 올 뉴 넥쏘 확인 기능은 `hy-nexo`에만 적용했다.
- 기존 넥쏘 별도 ID가 없으므로 기존 넥쏘로 확대 적용하지 않았다.
- 아이오닉 5, 아이오닉 6, 아이오닉 9, 코나 Electric 등 BEV 차량으로 확대 적용하지 않았다.
- BEV 전용 기능 중 `Plug & Charge`, EV Route Planner, Battery Conditioning, AC/DC 충전, 휴대용 충전기, 충전 예약/한도/전류, ICCU 제어 등은 NH2 매뉴얼 기준으로 디 올 뉴 넥쏘 적용에서 제외했다.
- HEV 전용 기능 및 TMED-2 관련 기능은 디 올 뉴 넥쏘 적용에서 제외했다.
- NH2 매뉴얼에 존재하는 V2L, 유틸리티 모드, i-Pedal, 스마트 회생 제동은 디 올 뉴 넥쏘에 반영했다.

## 자동 생성 결과

| 항목 | 결과 |
|---|---|
| 최종 기능 수 | 138 |
| 신규 추가 기능 수 | 12 |
| 디 올 뉴 넥쏘 적용 기능 수 | 57 |
| function page 생성 | PASS |
| `function-data.generated.json` 갱신 | PASS |
| `sitemap.xml` 갱신 | PASS |
| sitemap URL 수 | 146 |
| JSON-LD 생성 | PASS |
| SEO metadata 생성 | PASS |

## 정적 QA 결과

| 항목 | 결과 |
|---|---|
| JS Parse | PASS |
| JSON Parse | PASS |
| HTML Parse | PASS |
| Broken Link Scan | PASS |
| Duplicate ID Scan | PASS |
| Duplicate Slug Scan | PASS |
| Existing feature ID preservation | PASS |
| Existing slug preservation | PASS |
| sitemap | PASS |
| canonical | PASS |
| JSON-LD | PASS |
| function URL 생성 | PASS |
| SEO metadata | PASS |
| Console Error Scan(정적) | PASS |

## 수정 파일 목록

- `all-new-nexo-2026-vehicle-audit.js`
- `index.html`
- `seo-runtime.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/all-new-nexo-2026-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-all-new-nexo-audit-report.md`

## PASS / FAIL

PASS

### PASS 근거

- Owners Manual 기준 디 올 뉴 넥쏘 기능 누락 0건
- FCEV 전용 기능 누락 0건
- 매뉴얼에는 있으나 사이트 DB에 없던 기능 12개 신규 생성
- 기존 기능 삭제 0건
- 기존 ID 손실 0건
- 기존 slug 손실 0건
- 기존 넥쏘/타 차량/BEV/HEV로 확대 적용 없음
- function page 생성 완료
- sitemap 갱신 완료
- JS / JSON / HTML Parse PASS
