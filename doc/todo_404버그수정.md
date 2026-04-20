## 작업 내용

GitHub Pages에서 SPA 라우팅 404 버그 수정

- 증상: `/sutra/:slug`, `/list`, `/audio`, `/settings` 등 직접 URL 접근 시 GitHub Pages 404 페이지 표시
- 원인: GitHub Pages는 정적 호스팅이므로 SPA의 클라이언트 라우팅 경로를 서버가 인식하지 못함
- 해결 방법
  - `public/404.html` 생성 — GitHub Pages의 404를 index.html로 리다이렉트
  - `index.html`에 리다이렉트 스크립트 수신 처리 추가

## 작업 결과

- `public/404.html` 생성
  - GitHub Pages가 알 수 없는 경로 접근 시 이 파일을 반환함
  - 현재 전체 URL을 `sessionStorage.redirect`에 저장 후 앱 루트(`/buddhist-app/`)로 리다이렉트
- `webapp/index.html`에 경로 복원 스크립트 추가
  - sessionStorage에서 원래 URL을 꺼내 `history.replaceState`로 경로 복원
  - React Router가 복원된 경로를 기준으로 정상 렌더링
