# 기능별 SEO 페이지 빌드

## 생성 결과

- `function/<기능 ID>/index.html`: 기능별 정적 상세 페이지
- `function/index.html`: 검색엔진과 사용자를 위한 전체 기능 디렉터리
- `sitemap.xml`: 메인, 기능 디렉터리, 전체 기능 URL
- `robots.txt`: 사이트맵 위치

## 데이터 흐름

1. 메인 사이트가 `app.js`부터 `hybrid-tmed2.js`까지 순서대로 실행해 최종 기능 데이터베이스를 구성합니다.
2. `seo-runtime.js`가 최종 병합 데이터와 기능별 URL을 생성합니다.
3. 최종 데이터 스냅샷은 `function-data.json`으로 관리합니다.
4. `generate-function-pages.mjs`가 스냅샷을 읽어 모든 상세 페이지와 사이트맵을 일괄 생성합니다.

기능 데이터 추가·수정 후에는 최신 스냅샷으로 `function-data.json`을 갱신하고 생성 스크립트를 다시 실행합니다. 기능 ID가 URL 슬러그로 사용되므로 ID는 변경하지 않는 것을 권장합니다.

## 배포 전 필수 설정

운영 기본 URL은 `https://korean-car-guide.vercel.app`으로 설정되어 있습니다. 다른 도메인을 연결할 경우 `seo-config.json`의 `baseUrl`을 변경한 뒤 페이지를 다시 생성해야 합니다.

예:

```json
{
  "baseUrl": "https://example.com"
}
```

주요 공개 URL은 데이터 ID와 별도로 고정 관리합니다.

- RSPA 2: `/function/rspa2/`
- MRA: `/function/mra/`
- 스테이 모드: `/function/stay-mode/`
- 디지털 키 2: `/function/digital-key-2/`
- Apple CarPlay: `/function/apple-carplay/`
- Android Auto: `/function/android-auto/`
- V2L: `/function/v2l/`
