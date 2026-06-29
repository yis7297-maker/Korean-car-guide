# Korean CAR GUIDE 검증 기준 변경 리포트

작성일: 2026-06-29

## 변경 내용

- `verified`와 `verificationLevel`을 분리했습니다.
- `verified=true`는 공식 자료에서 기능과 절차를 확인한 경우를 의미합니다.
- 페이지 번호, 일부 차종별 메타데이터, 섹션명이 미완성이라는 이유만으로 `verified=false`가 되지 않도록 기준을 변경했습니다.
- `verificationLevel`은 아래 세 단계로 관리합니다.
  - `official_manual_verified`: 공식 PDF/매뉴얼에서 차종, 절차, 주요 제한사항 확인
  - `official_source_verified`: 공식 자료에서 기능과 절차 확인, 단 일부 메타데이터 미완성
  - `pending_verification`: 공식 자료 확인 전 또는 절차 확인 불충분

## 현재 데이터 재평가 결과

- 총 기능 수: 98
- `verified=true`: 0
- `verified=false`: 98
- Level A `official_manual_verified`: 0
- Level B `official_source_verified`: 0
- Level C `pending_verification`: 98

## 주차 보조 기능 재평가

- 대상 주차 보조 기능 수: 14
- `verified=true`: 0
- `pending_verification`: 14

지난 1차 작업에서는 PDF 파일 색인과 검증 필드 구조는 생성했지만, 실행 환경에서 PDF 본문 텍스트와 공식 절차를 안정적으로 추출하지 못했습니다. 따라서 새 기준에서도 해당 기능들을 `verified=true`로 승격하지 않았습니다.

## 수정 파일

- `function-data.json`
- `outputs/auto-guide-platform-v2/function-data.json`
- `official-verification-system.js`
- `outputs/auto-guide-platform-v2/official-verification-system.js`
- `generate-function-pages.mjs`
- `outputs/auto-guide-platform-v2/generate-function-pages.mjs`
- `apply-official-verification-schema.mjs`

## 주의

공식 취급설명서 PDF 또는 공식 웹매뉴얼에서 기능과 절차를 실제 확인한 기능만 `verified=true`로 변경합니다. `pageRange`는 확인이 불완전한 경우 `확인 필요`로 둘 수 있습니다.
