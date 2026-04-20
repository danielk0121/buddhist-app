## 작업 내용

PWA(Progressive Web App) 오프라인 읽기 구현 — Phase 5 항목

- 기획서 Phase 5 항목 기반
- 구현 범위
  - `vite-plugin-pwa` 설치 및 설정
  - `vite.config.js` PWA 플러그인 추가
    - Service Worker 자동 생성 (Workbox)
    - 캐시 전략: 앱 셸(HTML/CSS/JS) + 정적 에셋 precache
    - `sutra.db`, `sql-wasm.wasm` 등 대용량 에셋 캐시 전략 별도 설정
  - `public/manifest.json` 생성
    - 앱 이름, 아이콘, 테마 색상, display: standalone
  - 앱 아이콘 (`public/icons/`) 추가 — 192x192, 512x512
  - `index.html` manifest 링크 및 theme-color 메타 태그 추가
  - 오프라인 fallback 페이지 구현 (네트워크 없을 때 안내)

## 작업 결과
