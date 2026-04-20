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

- `webapp/package.json` 수정 — `vite-plugin-pwa`, `workbox-window` devDependency 추가
- `webapp/vite.config.js` 수정
  - `VitePWA` 플러그인 추가
  - manifest 설정: 앱 이름·설명·아이콘·테마 색상·display standalone
  - workbox precache: JS/CSS/HTML/SVG/PNG 전체
  - runtimeCaching: `sutra.db`, `sql-wasm.wasm` — CacheFirst (30일)
- `webapp/index.html` 수정
  - Apple PWA 메타 태그 추가 (`apple-mobile-web-app-capable` 등)
- 빌드 결과 확인
  - `dist/sw.js` — Service Worker 자동 생성 (Workbox)
  - `dist/workbox-*.js` — Workbox 런타임
  - `dist/manifest.webmanifest` — PWA manifest
  - precache 16개 항목 등록 완료
