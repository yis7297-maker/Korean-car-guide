# Genesis G70 공식 매뉴얼 기반 감사 리포트

작성일: 2026-07-16  
대상 차량: Genesis G70(IK, 2026)  
사용 자료: `work/manual-text/IK_2026_ko_KR.txt`

## 교차 검증 표

| 항목 | 개수 |
|---|---:|
| Owners Manual 발견 기능 | 31 |
| 사이트 기존 기능 | 138 |
| 신규 추가 기능 | 3 |
| 최종 사이트 기능 | 141 |
| 최종 누락 기능 | 0 |

## Genesis 전용 신규 기능 목록

- Genesis Digital Key (`genesis-digital-key`)
- Genesis Connected Services (`genesis-connected-services`)
- 스마트 트렁크 (`smart-trunk`)

## 보강 결과

1. Owners Manual 발견 기능 수: 31
2. 사이트 기존 기능 수: 138
3. 신규 추가 기능 수: 3
4. 최종 누락 기능 수: 0
5. 설명 보강 개수: 31
6. 절차 보강 개수: 31
7. 주의사항 보강 개수: 31
8. 공식 출처 추가 개수: 31
9. 기존 기능 삭제 개수: 0
10. 기존 ID 삭제 개수: 0
11. 기존 slug 삭제 개수: 0

## 미반영 확인 항목

IK 매뉴얼에서 `Face Connect`, `지문 인증`, `빌트인 캠 2`, `빌트인 캠 2 Plus`, `ccIC`, `ccNC`, `디지털 센터 미러`, `디지털 사이드 미러`, `이지 클로즈 도어`, `에르고 모션 시트`, `무드 큐레이터`는 직접 확인되지 않아 Genesis G70에 임의 적용하지 않았다.

## 수정 파일 목록

- `genesis-g70-2026-vehicle-audit.js`
- `index.html`
- `seo-runtime.js`
- `function-data.generated.json`
- `sitemap.xml`
- `function/*/index.html`
- `outputs/auto-guide-platform-v2/*`
- `qa-genesis-g70-audit-report.md`

## 정적 QA 결과

- JS Parse: PASS
- JSON Parse: PASS
- HTML Parse: PASS
- Broken Link Scan: PASS
- Duplicate Slug Scan: PASS
- Duplicate ID Scan: PASS
- 기존 기능 보존 검사: PASS
- sitemap: PASS
- canonical: PASS
- JSON-LD: PASS
- function URL: PASS

## PASS / FAIL

PASS

