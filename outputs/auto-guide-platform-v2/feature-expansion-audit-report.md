# Korean CAR GUIDE 기능 데이터 확장 검수 리포트

검수일: 2026-06-22

## 최종 집계

- 신규 추가 기능 수: 41개
- EV 기능 수: 14개
- FCEV 기능 수: 6개
- 시트 기능 수: 8개
- 디지털/인증 기능 수: 7개
- 후석 기능 수: 4개
- Pleos 기능 수: 1개
- 최종 데이터베이스 기능 수: 68개
- 중복 신규 기능 ID: 0개
- JavaScript 문법 검사: 통과

## 추가 기능군

### EV / 전동화

- Plug & Charge
- ICCU 에너지 변환 / 충전 제어
- EV Route Planner
- Battery Conditioning
- 충전 예약
- 충전 한도 설정
- V2L
- 실내 V2L
- 실외 V2L
- 캠핑 모드
- 유틸리티 모드
- V2H (향후)
- V2G (향후)

V2H와 V2G는 현재 적용 기능과 구분해 `전동화 로드맵` 계층 및 재확인 상태로 등록했습니다.

### 주행 / 주차

- 측방 주차 거리 경고
- 주차 충돌방지 보조
- 원격 스마트 출차 보조
- 기존 메모리 리버스 어시스트(MRA) 유지

### 디지털 / 인증

- e-Hi Pass
- Face Connect
- Genesis Digital Key 2
- Genesis Digital Key 2 Touch
- Hyundai Digital Key 2
- Hyundai Digital Key 2 Touch
- 기존 지문 인증 유지

### 카메라 / 모니터링

- 디지털 센터 미러
- 빌트인 캠
- 빌트인 캠 2
- 빌트인 캠 2 Plus

### 시트

- 다이내믹 바디 케어 시트
- 스위블링 시트
- 워크인 디바이스
- 스마트 자세 보조
- 기존 에르고 모션 시트, 릴렉션 컴포트 시트, 메모리 시트, 열선/통풍 시트 유지

### 후석 편의

- Passenger Talk
- Passenger View
- 후석 음성 인식
- 후석 공조 제어

### 커넥티드 / OTA

- Pleos Connect
- ccNC
- Hyundai AI Assistant
- Kia AI Assistant
- Feature on Demand
- 기존 ccNC OTA 업데이트에 `OTA Update` 별칭 연결

### FCEV

- 기존 수소 충전/충전구 개폐
- 기존 FCEV 정보 화면/에너지 모니터
- 기존 회생제동/스마트 회생제동
- 기존 에코 코칭
- FCEV 에너지 흐름도
- 수소차 전용 시스템 정보

## 기능 계층 구조

각 확장 기능에 `parent` 필드를 추가했습니다. 카드와 상세 팝업에서 아래와 같이 표시됩니다.

- 전동화 › Battery Conditioning
- V2L › 실내 V2L
- V2L › 실외 V2L
- 시트 › 다이내믹 바디 케어 시트
- 후석 편의 › Passenger Talk
- 커넥티드 / OTA › Pleos Connect
- FCEV 전용 기능 › FCEV 에너지 흐름도

## 광고 수익화 레이아웃

- 데스크톱 좌측 광고 슬롯: 160×600
- 데스크톱 우측 광고 슬롯: 160×600
- 1780px 이상 화면: 좌우 300×600 대응
- 하단 광고 슬롯: 728×90 / 970×250 대응
- 1280px 미만에서는 좌우 광고 슬롯 자동 숨김
- 모바일에서는 하단 반응형 슬롯만 유지
- 실제 AdSense 스크립트와 광고 단위 ID를 삽입할 수 있는 독립 `aside` 영역 확보

광고 영역 확보 여부: 완료

AdSense 대응 여부: 레이아웃 준비 완료. 실제 운영 전 AdSense 계정 승인, 광고 단위 ID, 개인정보/쿠키 동의 구성이 추가로 필요합니다.

## 누락 또는 재검증 가능성이 있는 기능

공식 사이트 원문 자동 접속이 현재 네트워크 계층에서 차단되어 다음 항목은 최신 카탈로그·가격표·웹 매뉴얼과 트림 단위 재대조가 필요합니다.

- Pleos Connect의 실제 적용 차종, 연식, 트림과 기본/선택 여부
- Hyundai AI Assistant 및 Kia AI Assistant의 국내 적용 범위
- Feature on Demand의 국내 판매 차량별 제공 기능
- 빌트인 캠 2 Plus의 공식 명칭과 적용 차종
- V2H/V2G 국내 상용화 시점과 지원 차량
- Plug & Charge 지원 충전 사업자 및 차종별 서비스 조건
- ICCU 관련 사용자 노출 기능과 정비/진단 정보의 구분
- 캠핑 모드와 유틸리티 모드의 차종별 공식 명칭 차이
- e-Hi Pass 지원 차종과 결제 서비스 조건
- Face Connect 및 각 디지털 키 세대의 연식별 구분
- N Line 개별 모델의 전용 표시·주행 설정
- 상용차와 일부 단종 전환 모델의 2026/2027 판매 상태

이 항목들은 화면에서 확정 사양으로 단정하지 않도록 `공식 적용 범위 재확인`, `차종별 상이`, `향후` 상태로 분리했습니다.

## 검수 결론

- 기능 데이터 확장: 완료
- 계층 구조 적용: 완료
- 광고 슬롯 적용: 완료
- 지속 검수 필드: `parent`, `verified`, `sources`, `applies`, `generation` 유지
- 최종 데이터베이스 기능 수: 68개
