# Korean CAR GUIDE 공식 매뉴얼 기반 주차 보조 기능 검증 1차 리포트

작성일: 2026-06-29

## manual-index.json 생성 결과

- 등록한 PDF 수: 36
- 브랜드별 PDF 수: Hyundai 28, Genesis 8
- 차종명 확인 필요 파일 수: 3
- 차종명 확인 필요 파일: CE1N_2025_ko_KR.pdf, ME_2027_ko_KR.pdf, US4EV_2027_ko_KR.pdf

## 검증 완료 기능

- 없음

사유: 현재 환경에서 PDF 본문 텍스트/정확한 페이지 범위/섹션명을 안정적으로 추출하지 못했습니다. 사용자 지침에 따라 pageRange가 정확히 확인되지 않은 기능은 verified.complete=true로 변경하지 않았습니다.

## 검증 진행 중 기능

- 원격 스마트 주차 보조 2 / RSPA 2 (rspa2)
- 메모리 리버스 어시스트 / MRA (mra)
- 측방 주차 거리 경고 (side-pdw)
- 주차 충돌방지 보조 (pca-parking)
- 원격 스마트 주차 보조 / RSPA (rspa)
- 스마트 주차 보조 / SPA (spa)
- 후방 모니터 (rear-view-monitor)
- 서라운드 뷰 모니터 / SVM (surround-view-monitor)
- 후측방 모니터 / BVM (blind-spot-view-monitor)
- 후방 교차 충돌방지 보조 (rear-cross-traffic-collision-avoidance)
- 주차 거리 경고 (parking-distance-warning)
- 후진 연동 사이드 미러 (reverse-tilt-mirror)
- 메모리 주차 / Memory Parking (memory-parking)
- 후진 가이드 (reverse-guide)

## 데이터베이스에 없는 검증 대상

- 원격 스마트 출차 보조: 현재 function-data.json에서 독립 기능 slug를 확인하지 못했습니다. 공식 매뉴얼 확인 후 기존 RSPA/RSPA 2 하위 항목인지, 별도 기능인지 판단 필요합니다.

## 차종별 절차 차이

- 이번 1차 작업에서는 차종별 절차 차이를 확정하지 않았습니다. 정확한 페이지 범위와 섹션 확인 전이므로 modelSpecificGuides는 빈 배열로 유지했습니다.

## 수정 원칙

- PDF 원본 파일은 저장소나 배포 폴더로 복사하지 않았습니다.
- 주차 보조 기능 외 기능 데이터는 수정하지 않았습니다.
- 공식 페이지 범위/섹션 미확정 기능은 모두 verified.complete=false 상태로 유지했습니다.
