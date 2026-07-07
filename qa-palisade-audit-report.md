# Korean CAR GUIDE 팰리세이드 / 팰리세이드 하이브리드 공식 매뉴얼 감사 리포트

검증일: 2026-07-07  
작업 범위: 현대 팰리세이드 LX3 2026, 현대 팰리세이드 하이브리드 LX3HEV 2026  
사용 자료:

- `work/manual-text/LX3_2026_ko_KR.txt`
- `work/manual-text/LX3HEV_2026_ko_KR.txt`

브라우저 QA는 수행하지 않았다. 이번 작업의 QA는 요청 범위에 따라 정적 QA만 수행했다.

## 1. 검증 원칙

- 공식 Owners Manual(txt)만 사용했다.
- 비공식 사이트, 유튜브, 블로그는 사용하지 않았다.
- 다른 차량에는 적용하지 않았다.
- 기존 기능 삭제, 기존 slug 변경, 기존 URL 변경은 하지 않았다.
- 공식 매뉴얼에서 팰리세이드 적용을 확인하지 못한 기능은 팰리세이드 적용 목록에서 제외했다.
- HEV 전용 기능은 `hy-palisade-hev`에만 적용했다.

## 2. 팰리세이드 신규 기능

이번 감사에서 기존 DB에 독립 기능으로 없었고, 팰리세이드 Owners Manual에서 공식 섹션이 확인되어 신규 DB 항목으로 분리한 기능은 7개다.

- 차로 이탈방지 보조 / LKA
- 차로 유지 보조 / LFA
- 지능형 속도 제한 보조 / ISLA
- 운전자 주의 경고 / DAW
- 하이빔 보조 / HBA
- 후측방 충돌방지 보조 / BCA
- 안전 하차 보조 / SEA

팰리세이드 적용 기능 수:

- 작업 전 확인 기준: 13개
- 작업 후: 42개

## 3. 팰리세이드 하이브리드 신규 기능

팰리세이드 하이브리드 Owners Manual에서만 확인되어 HEV 전용으로 분리 적용한 기능은 다음 10개다.

- TMED-2 하이브리드 시스템
- 스테이 모드
- 스테이 모드 사용 예약
- 하이브리드 V2L
- 하이브리드 스마트 회생제동
- 하이브리드 회생제동 단계 조절
- 하이브리드 에너지 흐름도
- 하이브리드 배터리 충전 상태
- 하이브리드 전용 주행 정보
- 하이브리드 정차 공조

팰리세이드 하이브리드 적용 기능 수:

- 작업 전 확인 기준: 3개
- 작업 후: 52개

## 4. 설명/절차/주의사항 보강

공식 매뉴얼 본문 기준으로 상세 설명을 보강한 기능 수:

- 설명 보강 개수: 18개
- 절차 보강 개수: 18개
- 주의사항 보강 개수: 18개

주요 보강 기능:

- 스마트 파워 테일게이트
- Hyundai Digital Key 2
- 지문 인증
- 차로 이탈방지 보조 / LKA
- 차로 유지 보조 / LFA
- 지능형 속도 제한 보조 / ISLA
- 운전자 주의 경고 / DAW
- 하이빔 보조 / HBA
- 후측방 충돌방지 보조 / BCA
- 안전 하차 보조 / SEA
- 스테이 모드
- 스테이 모드 사용 예약
- 하이브리드 V2L
- 하이브리드 스마트 회생제동
- 하이브리드 회생제동 단계 조절
- 하이브리드 에너지 흐름도
- 하이브리드 배터리 충전 상태
- 하이브리드 전용 주행 정보
- 하이브리드 정차 공조

## 5. 과매핑 제거

아래 기능은 팰리세이드/LX3 및 팰리세이드 HEV/LX3HEV Owners Manual txt에서 해당 공식 기능명 또는 절차가 확인되지 않아 팰리세이드 적용 차량 목록에서 제거했다.

- 원격 스마트 주차 보조 2 / RSPA 2
- 빌트인 캠 2
- 빌트인 캠 2 Plus
- Feature on Demand
- 파노라믹 커브드 디스플레이

참고:

- 매뉴얼에는 `원격 스마트 주차 보조 (RSPA)`가 확인되어 `rspa`에 매핑했다.
- 매뉴얼에는 `빌트인 캠` 섹션이 확인되어 `built-in-cam`에 매핑했다.
- `빌트인 캠 2`, `빌트인 캠 2 Plus` 명칭은 두 txt에서 확인되지 않아 팰리세이드 적용에서 제외했다.

## 6. 추가된 공식 출처

- 공식 출처 파일 수: 2개
  - `LX3_2026_ko_KR.txt`
  - `LX3HEV_2026_ko_KR.txt`
- 기능별 공식 출처/감사 정보 반영:
  - 팰리세이드 적용 기능 42개
  - 팰리세이드 하이브리드 적용 기능 52개

## 7. 생성 결과

- 최종 DB 기능 수: 105개
- 생성된 function page 수: 105개
- sitemap 내 function URL 수: 105개
- duplicate slug: 0건
- broken internal link: 0건

## 8. 정적 QA 결과

| 항목 | 결과 |
|---|---|
| JS Parse | PASS |
| JSON Parse | PASS |
| HTML Parse | PASS |
| JSON-LD Parse | PASS |
| Broken Link Scan | PASS |
| Duplicate Slug Scan | PASS |
| sitemap 반영 | PASS |
| canonical 확인 | PASS |
| SEO metadata 확인 | PASS |
| function URL 생성 | PASS |
| 정적 Console Error Scan | PASS |
| 금지 문구 검색 | PASS |

금지 문구 검색 대상:

- `검증 진행 중`
- `자세히 보기`
- `해당 없음`
- 깨진 대체문자 `�`

검색 결과: 0건

## 9. 수정 파일 목록

- `index.html`
- `seo-runtime.js`
- `palisade-2026-vehicle-audit.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/palisade-2026-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-palisade-audit-report.md`

루트와 outputs 파일 동기화 확인:

- `palisade-2026-vehicle-audit.js`: synced
- `seo-runtime.js`: synced
- `function-data.generated.json`: synced
- `sitemap.xml`: synced

## 10. 최종 판정

PASS

PASS 근거:

- 팰리세이드 적용 기능 매핑 보강 완료
- 팰리세이드 하이브리드 HEV 전용 기능 분리 완료
- 공식 Owners Manual(txt) 기반으로 설명/절차/주의사항 보강 완료
- function page 105개 생성 완료
- sitemap 갱신 완료
- SEO/canonical/JSON-LD 유지
- JS/JSON/HTML 정적 QA 통과
- 브라우저 QA는 요청에 따라 수행하지 않았으며 FAIL 사유로 사용하지 않음

