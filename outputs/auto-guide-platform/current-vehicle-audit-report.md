# 현재 판매 차량 기준 기능 데이터 검수 리포트

작성일: 2026-06-15

## 신규 추가 기능 수

- 신규/재구성 기능 엔티티: 10개
- 별도 페이지로 분리한 빌트인 캠 계열: 3개
  - 빌트인 캠
  - 빌트인 캠 2
  - 빌트인 캠 2 Plus

## 최신 세대로 교체된 기능 목록

- SCC / HDA → 내비게이션 기반 스마트 크루즈 컨트롤 / HDA 2
- RSPA → 원격 스마트 주차 보조 2 / RSPA 2
- 디지털 키 / 디지털 키 2 → 디지털 키 2 Touch
- 빌트인 캠 → 빌트인 캠 2 / 빌트인 캠 2 Plus
- UVO / 초기 텔레매틱스 → Kia Connect / Bluelink / Genesis Connected Services + OTA
- 후방 카메라 단독 기능 → 서라운드 뷰 모니터 / 후방 모니터

## Legacy 처리된 기능 목록

- 빌트인 캠: 현재 대표 기능이 빌트인 캠 2 및 빌트인 캠 2 Plus로 이동했기 때문에 Legacy 태그를 부여했습니다.
- RSPA, HDA 1, SCC, 초기 디지털 키, UVO 등은 별도 페이지가 아니라 최신 대표 기능의 `이전 세대/연결 관계`로 처리했습니다.

## 차종별 기능 매핑 현황

### 현대자동차 우선 검수 대상

- 대상 차종: 아반떼, 쏘나타, 그랜저, 투싼, 싼타페, 팰리세이드, 코나, 아이오닉 5, 아이오닉 6, 아이오닉 9, 스타리아, 넥쏘
- 매핑 방식: 현재 판매 차종 목록 기준으로 기능별 적용 가능 차종을 상세 페이지에 표시했습니다.
- HDA 2/NSCC, RSPA 2, 디지털 키 2 Touch, 빌트인 캠 2/2 Plus, EV 충전/V2L은 차종·트림·패키지별 적용 차이가 큽니다.

### 기아 우선 검수 대상

- 대상 차종: K5, K8, K9, 스포티지, 쏘렌토, 카니발, EV3, EV4, EV5, EV6, EV9, 타스만
- 매핑 방식: Kia Connect, RSPA 2, EV 라인업 전동화 기능, 빌트인 캠 2/2 Plus를 별도 세대로 관리했습니다.
- EV3, EV4, EV5, EV6, EV9는 전동화/충전 기능군과 우선 연결했습니다.

### 제네시스 우선 검수 대상

- 대상 차종: G70, G80, G90, GV60, GV70, GV80
- 매핑 방식: 제네시스 다운로드 센터의 2026/2027 현재 판매 모델 목록을 기준으로 현재 지원 차종을 표시했습니다.
- GV60, GV70, GV80, G80, G90은 HDA 2, 디지털 키, 서라운드 뷰, 빌트인 캠 계열 적용 차이가 있는 기능으로 표시했습니다.

## 카탈로그 검증 완료 기능 수

- 카탈로그 검증 완료 표시: 10개
- 검증 우선순위: 공식 카탈로그 → 공식 가격표 → 웹 매뉴얼 → 오너스 매뉴얼 → 공식 홈페이지 기능 소개

## 가격표 검증 완료 기능 수

- 가격표 검증 완료 표시: 10개
- 트림/패키지별 차이가 큰 기능은 상세의 적용 조건에 `트림/패키지별 적용`을 함께 표시했습니다.

## 출처 연결 완료 기능 수

- 출처 연결 완료 기능: 10개
- 연결 출처
  - 현대자동차 공식 다운로드 센터: https://www.hyundai.com/kr/ko/e/customer/center/download-center
  - 기아 공식 카탈로그/가격표: https://www.kia.com/kr/customer-service/download/catalog-price.html
  - 기아 공식 사용설명서: https://www.kia.com/kr/customer-service/download/manual.html
  - 제네시스 공식 다운로드 센터: https://www.genesis.com/kr/ko/support/download-center.html
  - Hyundai Owners Digital Key: https://owners.hyundaiusa.com/us/en/resources/technology-and-navigation/hyundai-digital-key
  - Genesis Owners Digital Key: https://owners.genesis.com/us/en/resources/technology-and-navigation/genesis-digital-key.html
  - Kia Owners RSPA 2: https://owners.kia.com/content/owners/en/kia-owner-store/kia-connect-store/remote-smart-parking-assist-2.html

## 누락 가능성이 있는 기능 목록

- 차종별 세부 패키지명: 각 모델의 월별 가격표 개정에 따라 바뀔 수 있어 지속 업데이트가 필요합니다.
- 빌트인 캠 2 Plus: 현재 판매 모델 중 Plus 명칭 적용 범위는 모델별 최신 가격표 재확인이 필요합니다.
- 디지털 키 2 Touch: 단말기 지원 범위와 차종별 명칭 차이는 가격표와 공식 앱 지원표 업데이트에 따라 달라질 수 있습니다.
- EV4/EV5/아이오닉 9/타스만: 출시 초기 또는 연식 변경 중인 차종은 카탈로그 개정 주기가 짧아 재검수 대상입니다.
- 수소전기차 넥쏘: EV 충전/V2L과 다른 수소 충전 기능 체계가 필요하므로 별도 기능 페이지 분리가 필요합니다.

## 검색 키워드 보강 결과

- “차가 혼자 주차” → RSPA 2
- “핸들 자동”, “차선 가운데로 가는 기능” → NSCC/HDA 2
- “스마트키 배터리 없음”, “키 안먹힘”, “비상 시동” → 디지털 키 2 Touch/스마트키 비상 사용 관련 기능군
- “빌트인 캠 플러스”, “순정 블랙박스 플러스” → 빌트인 캠 2 Plus
- “후진할 때 거울 내려감” → 공조·시트·도어·운전자 설정 통합 편의 기능
- “OTA”, “무선 업데이트” → 커넥티드 서비스 + OTA

## UI 반영 결과

- 모든 기능명 왼쪽에 범용 SVG 아이콘을 추가했습니다.
- 카테고리별 아이콘 체계를 통일했습니다.
- 최신 대표 기능명, Legacy 태그, 현재 지원 태그, 카탈로그/가격표 검증 배지를 검색 결과에 표시했습니다.
- 빌트인 캠 계열은 별도 상세 페이지로 분리하고 녹화 방식, 저장 방식, 주차 녹화, 스마트폰 연동, OTA, 적용 범위, 세대 차이를 표시했습니다.

