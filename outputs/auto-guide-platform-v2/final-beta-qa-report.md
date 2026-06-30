# Korean CAR GUIDE 베타 런칭 최종 QA

검수일: 2026-06-24

## 판정 요약

- PASS: 44
- WARNING: 7
- FAIL: 6
- 전체 평가 항목: 57
- PASS 비율: 77.2%
- 최종 판정: **수정 후 런칭 권장**

## [PASS 항목]

### 기능

- PASS — 기능 검색: `스테이 모드` 검색 시 결과 2건, 정확한 기능 카드 1건 표시
- PASS — 브랜드 선택: 현대 선택 시 결과 갱신
- PASS — 차종 선택: 팰리세이드 하이브리드 선택 시 제목 및 기능 목록 갱신
- PASS — 연식 선택: 2026 선택 시 결과 갱신
- PASS — 기능 팝업: 실제 카드 클릭 후 모달 오픈
- PASS — 관련 기능 하이퍼링크: 스테이 모드 관련 링크 8개, 클릭 후 다른 기능 팝업으로 전환
- PASS — 차량 역검색: `적용 차량 보기` 버튼과 적용 차량 모달 오픈
- PASS — 업데이트 로그 팝업: 날짜 그룹 30개, 기록 44개 로드
- PASS — 방문자 위젯: DOM 및 표시 확인
- PASS — Footer 디스클레이머: 비공식 서비스 및 책임 제한 문구 확인

### 모바일

- PASS — iPhone 390×844 및 Galaxy 412×915 기준 가로 오버플로 없음
- PASS — 필터 컨트롤 렌더링 및 선택 가능
- PASS — 검색 기능 동작
- PASS — 기능 팝업 모바일 바텀시트 동작
- PASS — 업데이트 로그 전체 화면 모달 동작
- PASS — 본문 기본 글자 크기 16px, 레이아웃 깨짐 없음

### SEO

- PASS — `assets/favicon.svg` 존재 및 연결
- PASS — title: `Korean CAR GUIDE`
- PASS — meta description 존재
- PASS — og:title 존재
- PASS — og:description 존재
- PASS — 모바일 viewport 존재

### 법적 고지

- PASS — 비공식 정보 플랫폼 명시
- PASS — 공식 자료 기반 명시
- PASS — 연식·트림·옵션·국가·소프트웨어 차이 안내
- PASS — 베타 서비스 명시
- PASS — 현대자동차그룹 비운영·비인증 서비스 명시
- PASS — 자체 생성 이미지 사용 및 제3자 입력 이미지 미사용 기록
- PASS — 참고용 정보 및 공식 매뉴얼 확인 의무 명시

### 데이터 및 링크

- PASS — EV 전용 기능 20개
- PASS — FCEV 기능 6개
- PASS — HEV/TMED-2 기능 10개
- PASS — 스테이 모드 존재
- PASS — MRA 존재
- PASS — RSPA 2 존재
- PASS — Hyundai/Genesis Digital Key 2 Touch 존재
- PASS — 관련 기능 링크 138개, 내부 누락 0개
- PASS — 차량 선택 컨트롤 동작
- PASS — 업데이트 내역 버튼 및 검색 동작

### 성능·파일

- PASS — 브라우저 콘솔 오류·경고 0건
- PASS — JavaScript 7개 문법 검사 통과
- PASS — CSS 파일 존재 및 정상 로드
- PASS — 히어로 이미지와 favicon 정상 로드
- PASS — HTML이 참조하는 로컬 파일 누락 0개

## [WARNING 항목]

- WARNING — 모바일 터치 영역: 추천 검색 버튼 높이 30px, 필터 칩 37px, 셀렉트 38px, 모달 닫기 버튼 38px입니다. 권장 터치 영역 44×44px보다 작습니다.
- WARNING — robots.txt: 파일은 있으나 sitemap URL이 `https://YOUR-DOMAIN.example`입니다.
- WARNING — sitemap.xml: 파일은 있으나 실제 배포 주소가 아닌 placeholder입니다.
- WARNING — Pleos Connect: DB에 있으나 공식 적용 범위 재확인 상태입니다.
- WARNING — Built-in Cam 2 Plus: DB에 있으나 공식 적용 차종 재확인 상태입니다.
- WARNING — 모바일 성능: 84개 기능 카드를 초기 DOM에 모두 렌더링합니다.
- WARNING — 데스크톱/모바일 공통: 히어로 PNG가 1,717,252 bytes로 WebP/AVIF 최적화 여지가 있습니다.

추가 데이터 WARNING:

- 검증 미완료 기능 9개: V2H, V2G, Built-in Cam 2 Plus, Pleos Connect, Hyundai AI Assistant, Kia AI Assistant, Feature on Demand, 스테이 모드 사용 예약, 하이브리드 V2L
- 방문자 위젯은 브라우저 `localStorage` 기반으로 실제 전체 방문자 통계가 아닙니다.
- 공식 출처 링크는 일부 공통 다운로드 센터로 연결되며 개별 기능 문서의 딥링크가 아닙니다.

## [FAIL 항목]

- FAIL — 문의 이메일 링크 없음: `mailto:` 링크 0개
- FAIL — canonical: `https://YOUR-DOMAIN.example/` placeholder 상태
- FAIL — 현대 전체 차종: DB 20개이며 승용·SUV·상용·N Line·파생 모델 전체를 포함하지 않음
- FAIL — 기아 전체 차종: DB 12개. 공식 현재 EV 목록의 레이 EV, EV3 GT, EV4 GT, EV5 GT, EV6 GT, EV9 GT 등이 누락
- FAIL — 제네시스 전체 차종: DB 6개. Electrified G80, Electrified GV70, G70 Shooting Brake, GV80 Coupe 및 Black/LWB 파생 모델 누락
- FAIL — 문의 링크 검수: 링크 자체가 없어 사용자 문의 경로 제공 불가

Broken Link 판정:

- 내부 파일 및 관련 기능 링크: Broken Link 없음
- 배포 SEO 주소: 실제 도메인이 아닌 placeholder이므로 배포 환경에서는 유효하지 않음
- 문의 링크: 미생성

## [런칭 전 수정 권장 사항]

### 반드시 수정

1. Footer에 실제 문의 이메일 `mailto:` 링크 추가
2. `index.html`, `robots.txt`, `sitemap.xml`의 `YOUR-DOMAIN.example`을 실제 배포 URL로 교체
3. “현대·기아·제네시스 전체 차종”을 표방하려면 공식 현재 라인업을 다시 수집하거나, 서비스 범위를 “주요 차종”으로 명확히 축소 표기

### 우선 개선

4. 모바일 버튼·필터·닫기 버튼의 최소 높이를 44px 이상으로 확대
5. 히어로 PNG를 WebP 또는 AVIF로 변환하고 PNG fallback 제공
6. 기능 카드 페이지네이션, 가상 스크롤 또는 초기 표시 개수 제한
7. 방문자 통계를 실제 분석 도구 또는 서버 기반 집계로 교체
8. 검증 미완료 9개 기능을 사용자 화면에서 명확한 상태 배지로 표시
9. 공식 출처를 기능별 카탈로그·매뉴얼 상세 URL로 세분화

## [최종 런칭 가능 여부]

**수정 후 런칭 권장**

현재 사이트는 정적 호스팅에서 실행 가능하고 핵심 UI는 동작합니다. 그러나 문의 수단 부재, SEO 배포 주소 미설정, “전체 차종” 데이터 누락은 베타 공개 전 수정해야 할 항목입니다.
