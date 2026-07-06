# Korean CAR GUIDE Daily QA Report

Date: 2026-07-06  
Scope: 90분 이내 품질 개선 / 현대·제네시스 공식 txt 매뉴얼 기준 / 기아 검증 제외

## 1. 오늘 보강한 기능 5개

아래 5개 기능만 보강했습니다. 신규 기능 추가, UI 대규모 개편, 기아 검증은 수행하지 않았습니다.

| 기능 ID | 기능명 | 보강 항목 | 기준 txt / 섹션 | 결과 |
|---|---|---|---|---|
| `utility-mode` | 유틸리티 모드 | 기능 설명, 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 주의 사항 | `US4EV_2027_ko_KR.txt` / 유틸리티 모드 설정하기 | PASS |
| `side-pdw` | 측방 주차 거리 경고 | 기능 설명, 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 주의 사항 | `US4_2026_ko_KR.txt` / 주차 거리 경고(PDW) / 측방 주차 거리 경고 | PASS |
| `pca-parking` | 주차 충돌방지 보조 | 기능 설명, 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 주의 사항 | `SX2_2027_ko_KR.txt` / 후방 주차 충돌방지 보조(PCA) | PASS |
| `remote-smart-exit` | 원격 스마트 출차 보조 | 기능 설명, 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 주의 사항 | `JX_2026_ko_KR.txt` / 원격 스마트 주차 보조 / 원격 전·후진 | PASS |
| `smart-power-tailgate` | 스마트 파워 테일게이트 | 기능 설명, 사용 전 조건, 설정 방법, 사용 방법, 해제 방법, 제한 사항, 주의 사항, 적용 차량 일부 복구 | `LX3_2026_ko_KR.txt`, `JX_2026_ko_KR.txt` / 파워 테일게이트, 스마트 테일게이트 | PASS |

## 2. 대표 기능 10개 QA

검증 방식: 최종 JS 로드 순서(`app.js` → `patch.js` → 데이터 확장/감사 스크립트 → `seo-runtime.js`)로 실행 후 데이터 필드, 금지 문구, ESC 핸들러 존재 여부를 확인했습니다.

| 기능 ID | 팝업 상세 | ESC 닫기 | 적용 차량 보기 데이터 | 깨진 한글 | 빈 섹션 | 판정 |
|---|---:|---:|---:|---:|---:|---|
| `built-in-cam` | PASS | PASS | WARNING: 0건 | PASS | PASS | WARNING |
| `built-in-cam2-plus` | PASS | PASS | WARNING: 0건 | PASS | PASS | WARNING |
| `utility-mode` | PASS | PASS | PASS: 10건 | PASS | PASS | PASS |
| `smart-power-tailgate` | PASS | PASS | PASS: 5건 | PASS | PASS | PASS |
| `side-pdw` | PASS | PASS | PASS: 27건 | PASS | PASS | PASS |
| `pca-parking` | PASS | PASS | PASS: 18건 | PASS | PASS | PASS |
| `remote-smart-exit` | PASS | PASS | PASS: 7건 | PASS | PASS | PASS |
| `rspa2` | PASS | PASS | PASS: 8건 | PASS | PASS | PASS |
| `hyundai-dk2` | WARNING | PASS | WARNING: 0건 | PASS | WARNING: 절차 필드 미보강 | WARNING |
| `v2l-parent` | WARNING | PASS | WARNING: 0건 | PASS | WARNING: 절차 필드 미보강 | WARNING |

### QA 요약

- 팝업 렌더링: PASS
- ESC 닫기 핸들러: PASS
- “자세히 보기” 버튼 재발: PASS, 검색 0건
- “검증 진행 중/검증 완료/검증 미완료” 노출: PASS, 검색 0건
- 방문자 위젯 재발: PASS, 검색 0건
- 오늘 보강한 5개 기능의 깨진 한글: PASS
- 대표 10개 중 TODO:
  - `built-in-cam`, `built-in-cam2-plus`: 상세 설명은 충분하지만 적용 차량 매핑이 0건입니다.
  - `hyundai-dk2`, `v2l-parent`: 오늘 범위 밖이므로 상세 절차 보강을 보류했습니다.

## 3. Search Console 제출용 대표 기능 페이지 목록

색인 요청은 수행하지 않았고, 제출 후보 목록만 정리했습니다.

```text
https://korean-car-guide.vercel.app/function/rspa2/
https://korean-car-guide.vercel.app/function/mra/
https://korean-car-guide.vercel.app/function/stay-mode/
https://korean-car-guide.vercel.app/function/built-in-cam/
https://korean-car-guide.vercel.app/function/built-in-cam-2-plus/
https://korean-car-guide.vercel.app/function/utility-mode/
https://korean-car-guide.vercel.app/function/smart-power-tailgate/
https://korean-car-guide.vercel.app/function/parking-collision-avoidance-assist/
https://korean-car-guide.vercel.app/function/side-parking-distance-warning/
https://korean-car-guide.vercel.app/function/remote-smart-exit/
https://korean-car-guide.vercel.app/function/digital-key-2/
https://korean-car-guide.vercel.app/function/v2l/
https://korean-car-guide.vercel.app/function/apple-carplay/
https://korean-car-guide.vercel.app/function/android-auto/
```

주의: 현재 워크스페이스 루트와 `outputs/auto-guide-platform-v2`에는 실제 `function/` 정적 디렉터리가 확인되지 않았습니다. 오늘 작업은 목록 작성까지만 수행했으며, Search Console 제출 전에는 `function/*/index.html` 생성 및 배포 상태를 별도 확인해야 합니다.

## 4. GitHub README 개선 제안

README 파일 자체는 오늘 수정하지 않았습니다. 아래 항목 추가를 권장합니다.

1. 프로젝트 소개
   - Korean CAR GUIDE가 현대·제네시스 차량 기능 정보를 소비자 검색형 UI로 제공하는 비공식 베타 서비스임을 명시
2. 데이터 원칙
   - 공식 취급설명서, 웹 매뉴얼, 카탈로그 기반
   - AI 추론 금지
   - 차종/연식/트림/옵션별 차이 고지
3. 배포 구조
   - 정적 HTML/CSS/JS 기반
   - `function/*` SEO 페이지 유지
   - GA4/AdSense 코드 보존 원칙
4. QA 체크리스트
   - 검색, 카테고리, 팝업, ESC 닫기, 적용 차량 보기, 금지 문구 검색, 모바일 확인
5. 업데이트 정책
   - 기능 보강은 소량 단위로 진행
   - 기아 검증과 현대/제네시스 검증 범위를 분리

## 5. 수정 파일

- `seo-runtime.js`
- `outputs/auto-guide-platform-v2/seo-runtime.js`
- `qa-daily-report.md`

## 6. 남은 TODO

- `built-in-cam`, `built-in-cam2-plus` 적용 차량 매핑 보강
- `hyundai-dk2` 공식 매뉴얼 기반 상세 절차 보강
- `v2l-parent` 및 V2L 하위 기능의 차종별 절차/적용 차량 정리
- `feature-improvements.js`, `parking-manual-audit.js` 내부에 남아 있는 과거 mojibake 원문은 최종 렌더링에서 일부 보정했으나, 장기적으로 원본 스크립트 정리가 필요합니다.

## 7. 최종 판정

오늘 범위 기준: PASS  
서비스 전체 기준: Release Ready 유지 가능, 단 위 TODO는 다음 품질 개선 세션에서 처리 권장
