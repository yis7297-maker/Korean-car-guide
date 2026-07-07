# Korean CAR GUIDE 차량 기준 공식 매뉴얼 검증 리포트

검증일: 2026-07-07  
작업 범위: 현대/제네시스 Owners Manual(txt) 중 1개 차량만 검증  
선택 차량: 현대 그랜저 GN7 2026  
기준 파일: `work/manual-text/GN7_2026_ko_KR.txt`

## 1. 워크스페이스 Owners Manual(txt) 스캔 결과

현재 워크스페이스 `work/manual-text`에 존재하는 txt 파일 수: 36개

- AX_2026_ko_KR.txt
- AXEV_2026_ko_KR.txt
- CE1_2025_ko_KR.txt
- CE1N_2025_ko_KR.txt
- CN7_2026_ko_KR.txt
- CN7HEV_2026_ko_KR.txt
- CN7N_2026_ko_KR.txt
- DN8_2026_ko_KR.txt
- DN8HEV_2026_ko_KR.txt
- GN7_2026_ko_KR.txt
- GN7HEV_2026_ko_KR.txt
- IK_2026_ko_KR.txt
- JK_2026_ko_KR.txt
- JKEV_2027_ko_KR.txt
- JW_2027_ko_KR.txt
- JX_2026_ko_KR.txt
- LX3_2026_ko_KR.txt
- LX3HEV_2026_ko_KR.txt
- ME_2027_ko_KR.txt
- MX5_2026_ko_KR.txt
- MX5HEV_2026_ko_KR.txt
- NE1_2026_ko_KR.txt
- NE1N_2026_ko_KR.txt
- NH2_2026_ko_KR.txt
- NX4_2026_ko_KR.txt
- NX4HEV_2026_ko_KR.txt
- QX_2026_ko_KR.txt
- RG3_2027_ko_KR.txt
- RG3EV_2027_ko_KR.txt
- RS4_2027_ko_KR.txt
- SX2_2027_ko_KR.txt
- SX2EV_2025_ko_KR.txt
- SX2HEV_2027_ko_KR.txt
- US4_2026_ko_KR.txt
- US4EV_2027_ko_KR.txt
- US4HEV_2026_ko_KR.txt

주의: 이번 작업은 위 목록 중 `GN7_2026_ko_KR.txt` 1개만 대상으로 수행했다. 다른 차량 txt는 스캔 목록 확인 외에는 수정하지 않았다.

## 2. 선택 차량

- 브랜드: 현대
- 차량명: 그랜저
- 모델 코드: GN7
- 연식: 2026
- 검증 파일: `GN7_2026_ko_KR.txt`

## 3. 매뉴얼 스캔 및 DB 비교 결과

- GN7 매뉴얼에서 기존 DB 기능과 매칭된 기능 참조: 32개
- 사이트 DB에 이미 존재한 기능: 32개
- 신규 기능 객체 추가: 0개
- 현재 `hy-grandeur`에 매핑된 기능 수: 35개

GN7 매뉴얼 기준으로 확인되어 기존 DB와 매칭한 기능 ID:

- fca-suite
- nscc-hda2
- rspa2
- dual-auto-ac
- air-purification
- heated-ventilated-seats
- ergo-motion-seat
- relaxation-comfort-seat
- smart-power-tailgate
- hud
- panoramic-curved-display
- apple-carplay-wired
- android-auto-wired
- ccnc-ota
- fingerprint-auth
- hyundai-dk2
- built-in-cam
- e-hi-pass
- side-pdw
- pca-parking
- remote-smart-exit
- rear-view-monitor
- surround-view-monitor
- blind-spot-view-monitor
- rear-cross-traffic-collision-avoidance
- parking-distance-warning
- reverse-guide
- smart-key
- emergency-key
- remote-engine-start
- climate-control
- smart-posture-assist

## 4. 보강 내용

공식 매뉴얼 본문에서 절차와 조건을 확인할 수 있었던 아래 4개 기능에 한해 GN7 기준 상세 데이터를 보강했다.

| 기능 ID | 기능명 | 사용 전 조건 | 설정/사용 절차 | 주의사항 | 공식 출처 |
|---|---:|---:|---:|---:|---|
| hyundai-dk2 | Hyundai Digital Key 2 | 3개 | 8개 | 2개 | GN7_2026_ko_KR.txt |
| fingerprint-auth | 지문 인증 | 2개 | 5개 | 1개 | GN7_2026_ko_KR.txt |
| ccnc-ota | ccNC OTA 업데이트 | 2개 | 5개 | 2개 | GN7_2026_ko_KR.txt |
| smart-power-tailgate | 스마트 파워 테일게이트 | 3개 | 5개 | 4개 | GN7_2026_ko_KR.txt |

보강 원칙:

- 신규 기능을 만들지 않았다.
- 기존 slug와 SEO URL은 유지했다.
- GN7 그랜저 2026에만 적용 차량 정보를 추가했다.
- 다른 차량으로 적용 범위를 확대하지 않았다.
- 공식 txt에서 확인한 절차와 제한/주의 내용만 반영했다.

## 5. 수정/재생성 결과

- `gn7-2026-vehicle-audit.js` 생성 및 루트/outputs 동기화
- `seo-runtime.js`에서 SEO 스냅샷 생성 직전 GN7 audit overlay를 재적용하도록 수정
- `function-data.generated.json` 재생성 및 루트/outputs 동기화
- `function/*/index.html` 98개 재생성 및 루트/outputs 동기화
- `sitemap.xml` 재생성 및 루트/outputs 동기화

## 6. 정적 파일 QA

PASS:

- `function/digital-key-2/index.html`에 GN7 출처, 그랜저 적용 차량, 상세 사용 절차 반영
- `function/fingerprint-auth/index.html`에 GN7 출처, 그랜저 적용 차량, 상세 사용 절차 반영
- `function/ccnc-ota/index.html`에 GN7 출처, 그랜저 적용 차량, 상세 사용 절차 반영
- `function/smart-power-tailgate/index.html`에 GN7 출처, 그랜저 적용 차량, 파워 트렁크/스마트 트렁크 절차 반영
- `검증 진행 중`, `자세히 보기`, `해당 없음`, 깨진 대체문자 `�` 검색 결과 0건
- GA4 스크립트 유지
- canonical, breadcrumb, JSON-LD 유지

WARNING:

- `gn7-2026-manual-scan.json`은 원본 txt 검색 흔적을 담는 작업용 파일이며, 일부 검색어가 pdftotext/콘솔 인코딩 영향으로 깨져 보일 수 있다. 사용자 노출용 function 페이지에는 정상 한글이 반영되어 있다.

FAIL:

- 브라우저 기준 QA는 수행하지 못했다. in-app browser가 로컬 `file://` URL 접근을 보안 정책으로 차단했다. 따라서 사용자가 요구한 “브라우저 기준 확인” 항목은 PASS로 판정하지 않는다.

## 7. 최종 요청 항목별 결과

- 차량명: 현대 그랜저 GN7 2026
- 신규 발견 기능: 0개
- 누락 수정 개수: 32개 기존 기능에 GN7 매뉴얼 근거 적용/출처/alias/감사 정보 보강
- 설명 보강 개수: 4개
- 절차 보강 개수: 4개
- 주의사항 보강 개수: 4개
- function 페이지 수정 개수: 98개 재생성
- 최종 판정: FAIL

FAIL 사유:

브라우저 기반 QA가 보안 정책으로 차단되어 완료되지 않았다. 데이터/정적 파일 기준 수정은 완료되었지만, 사용자가 명시한 브라우저 기준 검증 조건을 만족하지 못했다.

