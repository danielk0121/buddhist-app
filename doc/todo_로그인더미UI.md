## 작업 내용

로그인/로그아웃 더미 UI 구현 — Phase 4 준비 항목

- 기획서 4.5, 5.2 항목 기반 (더미 단계)
- 구현 범위
  - `webapp/api/dummy/auth.js` 구현
    - `signIn(email, password)` — localStorage에 더미 세션 저장
    - `signOut()` — 세션 삭제
    - `getSession()` — 현재 로그인 세션 반환 (null이면 비로그인)
  - 로그인 화면 (`webapp/pages/Login.jsx`) 신규 생성
    - 이메일 + 비밀번호 입력 폼
    - 더미 로그인 처리 (임의 이메일이면 성공 처리)
    - 로그인 성공 시 설정 화면으로 이동
  - 설정 화면 (`webapp/pages/Settings.jsx`) 수정
    - 로그인 상태 표시 (이메일 표시)
    - 로그인 버튼 — 비로그인 시 표시, 로그인 화면으로 이동
    - 로그아웃 버튼 — 로그인 시 표시, 클릭 시 세션 삭제 후 갱신
  - 라우트 추가 (`webapp/App.jsx`)
    - `/login` 경로 추가
    - 로그인 화면은 탭바 숨김 처리

## 작업 결과

- `webapp/api/dummy/auth.js` 신규 생성
  - localStorage 기반 더미 세션 저장/조회
  - `signIn(email, password)` — 세션 저장 (어떤 이메일/비밀번호도 허용)
  - `signOut()` — 세션 삭제
  - `getSession()` — 현재 세션 반환 (null이면 비로그인)
- `webapp/pages/Login.jsx` 신규 생성
  - 이메일 + 비밀번호 폼 UI
  - 더미 로그인 처리, 성공 시 이전 화면으로 이동
  - 더미 로그인임을 안내하는 문구 표시
- `webapp/pages/Login.css` 신규 생성
- `webapp/pages/Settings.jsx` 수정
  - 로그인 세션 상태 표시 (이메일)
  - 비로그인 시 로그인 버튼 표시 → `/login` 이동
  - 로그인 시 로그아웃 버튼 표시 → 세션 삭제 후 갱신
- `webapp/App.jsx` 수정
  - `Login` import 및 `/login` 라우트 추가
  - `/login` 탭바 숨김 처리 (`NO_TABBAR`에 추가)
