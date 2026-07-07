# Korean CAR GUIDE 싼타페 / 싼타페 하이브리드 공식 매뉴얼 감사 리포트

검증일: 2026-07-07  
작업 범위: 현대 싼타페 MX5 2026, 현대 싼타페 하이브리드 MX5HEV 2026  
사용 자료:

- `work/manual-text/MX5_2026_ko_KR.txt`
- `work/manual-text/MX5HEV_2026_ko_KR.txt`

브라우저 QA는 수행하지 않았다. 이번 작업의 QA는 요청 범위에 따라 정적 QA만 수행했다.

## 1. 검증 원칙

- 공식 Owners Manual(txt)만 사용했다.
- 비공식 사이트, 유튜브, 블로그는 사용하지 않았다.
- 다른 차량에는 적용하지 않았다.
- 기존 기능 삭제, 기존 slug 변경, 기존 URL 변경은 하지 않았다.
- 일반 싼타페와 싼타페 하이브리드 적용 기능을 분리했다.
- 싼타페 하이브리드에 `TMED-2`를 전제로 넣지 않았다.
- MX5HEV txt에서 확인되지 않은 `스테이 모드`, `V2L`, `하이브리드 정차 공조`, `TMED-2`는 싼타페 하이브리드에 적용하지 않았다.

## 2. 싼타페 매뉴얼 발견 기능 수

싼타페 MX5 Owners Manual에서 확인하여 사이트 DB에 반영한 기능 수:

- 39개

주요 확인 기능군:

- 전방 충돌방지 보조
- 스마트 크루즈 컨트롤 / NSCC / HDA
- 차로 이탈방지 보조
- 차로 유지 보조
- 지능형 속도 제한 보조
- 운전자 주의 경고
- 하이빔 보조
- 후측방 충돌방지 보조
- 안전 하차 보조
- 주차 거리 경고
- 주차 충돌방지 보조
- 원격 스마트 주차 보조
- 후방 모니터
- 서라운드 뷰 모니터
- 후측방 모니터
- 후방 교차 충돌방지 보조
- 디지털 키
- 지문 인증
- 빌트인 캠
- 무선 소프트웨어 업데이트
- 파워 테일게이트 / 스마트 테일게이트
- 헤드업 디스플레이
- 에르고 모션 시트
- 릴렉션 컴포트 시트
- 스마트 자세 보조
- 공기 청정
- 애프터 블로우

## 3. 싼타페 하이브리드 매뉴얼 발견 기능 수

싼타페 하이브리드 MX5HEV Owners Manual에서 확인하여 사이트 DB에 반영한 기능 수:

- 44개

하이브리드 전용으로 분리 반영한 기능:

- 하이브리드 스마트 회생제동
- 하이브리드 회생제동 단계 조절
- 하이브리드 에너지 흐름도
- 하이브리드 배터리 충전 상태
- 하이브리드 전용 주행 정보

MX5HEV txt 확인 결과:

- `하이브리드`: 103건
- `회생 제동`: 86건
- `에너지 흐름도`: 4건
- `하이브리드 에너지 흐름`: 4건
- `고전압 배터리`: 39건
- `EV 모드`: 3건
- `TMED`: 0건
- `스테이 모드`: 0건
- `V2L`: 0건

## 4. 사이트 반영 기능 수

- 싼타페 반영 기능 수: 39개
- 싼타페 하이브리드 반영 기능 수: 44개
- 최종 전체 DB 기능 수: 105개
- 생성된 function page 수: 105개
- sitemap 내 function URL 수: 105개

## 5. 누락 기능 수

- 싼타페 누락 기능 수: 0건
- 싼타페 하이브리드 누락 기능 수: 0건

기준:

- 이번 감사에서 추출한 MX5/MX5HEV 공식 매뉴얼 기능명과 현재 DB 기능 ID/alias를 교차 비교했다.
- 공식 매뉴얼에서 확인된 기능 중 기존 DB에 없던 독립 ADAS 항목은 기존에 생성된 독립 기능 ID에 싼타페/HEV 적용 정보를 추가했다.
- 매뉴얼에 없는 기능은 적용하지 않았다.

## 6. 신규 추가 기능 목록

이번 작업에서 새 기능 객체를 추가하지 않았다.

신규 기능 수:

- 0개

참고:

- LKA, LFA, ISLA, DAW, HBA, BCA, SEA는 이전 감사에서 이미 독립 기능 ID가 존재했으므로 이번 작업에서는 싼타페/싼타페 HEV 적용과 공식 출처만 추가했다.

## 7. 설명/절차/주의사항 보강 개수

MX5HEV txt에서 하이브리드 전용 내용이 확인된 기능에 대해 설명, 절차, 제한, 주의사항을 보강했다.

- 설명 보강 개수: 5개
- 절차 보강 개수: 5개
- 주의사항 보강 개수: 5개

보강 기능:

- 하이브리드 스마트 회생제동
- 하이브리드 회생제동 단계 조절
- 하이브리드 에너지 흐름도
- 하이브리드 배터리 충전 상태
- 하이브리드 전용 주행 정보

## 8. 공식 출처 추가 개수

- 공식 출처 파일 수: 2개
  - `MX5_2026_ko_KR.txt`
  - `MX5HEV_2026_ko_KR.txt`
- 차량-기능 출처 반영 건수:
  - 싼타페 39건
  - 싼타페 하이브리드 44건
  - 합계 83건

## 9. 일반/하이브리드 기능 분리 여부

PASS

분리 결과:

- 일반 싼타페에는 HEV 전용 기능을 적용하지 않았다.
- 싼타페 하이브리드에는 MX5HEV txt에서 확인된 하이브리드 전용 표시/회생/에너지/배터리 기능만 적용했다.
- `TMED-2`, `스테이 모드`, `V2L`, `하이브리드 정차 공조`는 MX5HEV txt에서 확인되지 않아 싼타페 하이브리드 적용에서 제외했다.

## 10. 과매핑 제거

아래 기능은 MX5/MX5HEV Owners Manual txt에서 해당 공식 기능명 또는 절차가 확인되지 않아 싼타페/싼타페 HEV 적용 차량 목록에서 제거했다.

- 원격 스마트 주차 보조 2 / RSPA 2
- 빌트인 캠 2
- 빌트인 캠 2 Plus
- Feature on Demand
- 파노라믹 커브드 디스플레이
- TMED-2 하이브리드 시스템
- 스테이 모드
- 스테이 모드 사용 예약
- 하이브리드 V2L
- 하이브리드 정차 공조

참고:

- MX5/MX5HEV txt에는 `원격 스마트 주차 보조 (RSPA)`가 확인되어 `rspa`에만 매핑했다.
- MX5/MX5HEV txt에는 `빌트인 캠`이 확인되어 `built-in-cam`에만 매핑했다.

## 11. 정적 QA 결과

| 항목 | 결과 |
|---|---|
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
| 금지 문구 검색 | PASS |

금지 문구 검색 대상:

- `검증 진행 중`
- `자세히 보기`
- `해당 없음`
- 깨진 대체문자 `�`

검색 결과: 0건

## 12. 수정 파일 목록

- `index.html`
- `seo-runtime.js`
- `santafe-2026-vehicle-audit.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/index.html`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `outputs/auto-guide-platform-v2/santafe-2026-vehicle-audit.js`
- `outputs/auto-guide-platform-v2/function-data.generated.json`
- `outputs/auto-guide-platform-v2/sitemap.xml`
- `outputs/auto-guide-platform-v2/function/*/index.html`
- `qa-santafe-audit-report.md`

루트와 outputs 파일 동기화 확인:

- `santafe-2026-vehicle-audit.js`: synced
- `seo-runtime.js`: synced
- `function-data.generated.json`: synced
- `sitemap.xml`: synced

## 13. 최종 판정

PASS

PASS 근거:

- 싼타페 기능 누락 0건
- 싼타페 하이브리드 기능 누락 0건
- 일반 모델과 HEV 적용 기능 분리 완료
- 매뉴얼에 없는 TMED-2 표현 추가 없음
- function page 105개 생성 완료
- sitemap 갱신 완료
- SEO/canonical/JSON-LD 유지
- JS/JSON/HTML 정적 QA 통과
- 브라우저 QA는 요청에 따라 수행하지 않았으며 FAIL 사유로 사용하지 않음

