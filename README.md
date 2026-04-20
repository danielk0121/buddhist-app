# 경필 (經筆)

[![Deploy](https://github.com/danielk0121/buddhist-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/danielk0121/buddhist-app/actions/workflows/deploy.yml)

**웹앱 바로가기: [https://danielk0121.github.io/buddhist-app/](https://danielk0121.github.io/buddhist-app/)**

---

한문·고어로 된 불경을 현대 한국어 수필 형태로 재구성하여, 누구나 쉽게 읽고 이해할 수 있는 불교 경전 서비스.

> **저작권 고지**
> 모든 콘텐츠는 한문·팔리어 원전(공유 저작물)을 저본으로 독립 작성한 번역·재구성물입니다.
> 콘텐츠 출처: [danielk0121/buddhist](https://github.com/danielk0121/buddhist)

## 목적

[danielk0121/buddhist](https://github.com/danielk0121/buddhist) 저장소의 45종 경전 마크다운 콘텐츠를 기반으로, 웹소설 플랫폼 방식의 소통 구조를 접목한 불교 경전 서비스.

## 개발 방향

**웹앱 우선 구현 → 안드로이드 하이브리드 앱 전환** 순서로 진행한다.

- 1단계: React (Vite) 웹앱으로 전체 기능 구현 (현재)
- 2단계: Android WebView 기반 하이브리드 앱으로 패키징 후 Google Play 배포

## 폴더 구조

```
buddhist-app/
├── android/          # Android 프로젝트 (2단계 전환 후 구현)
├── doc/              # 기획서, 작업 문서 (done / hold / discard)
├── public/           # 정적 에셋 (sutra.db, sql-wasm.wasm, 파비콘 등)
├── tools/            # 빌드 스크립트 (build_db.mjs 등)
└── webapp/           # 웹앱 소스 (React + Vite)
    ├── api/          # 더미 API (auth, bookmark, comment)
    ├── assets/data/  # 경전 메타 데이터 (sutras.js, sutraEmoji.js)
    ├── components/   # 공통 컴포넌트 (Toolbar, TabBar, TTSPlayer, CommentBox 등)
    ├── context/      # React Context (SettingsContext, TTSContext, DBContext)
    ├── db/           # sql.js 쿼리 헬퍼 (sutraDb.js)
    ├── i18n/         # 다국어 (translations.js, useT 훅)
    ├── pages/        # 화면 컴포넌트
    ├── styles/       # CSS (variables.css, global.css)
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 기술 스택

- 프레임워크: React 18 (Vite)
- 스타일링: Vanilla CSS (CSS Variables, 모바일 퍼스트)
- 상태 관리: React Context API
- 라우팅: React Router v6
- 로컬 DB: SQLite — 빌드 시 better-sqlite3으로 생성, 브라우저에서 sql.js(WebAssembly)로 로드
- TTS: Web Speech API (SpeechSynthesis)
- 다국어: 자체 구현 i18n (한국어 / 영어)
- 백엔드: Supabase (추후 연동 예정)

## 화면 구성

- 경전 탭: 홈(계열별 타일 그리드) → 경전 목록 → 경전 상세
- 오디오북 탭: TTS 바로 듣기 목록
- 설정 탭: 테마(라이트/다크/시스템), 폰트 크기, TTS 속도, 언어, 개발자 정보

## 로컬 실행

```bash
# 의존성 설치
cd webapp
npm install

# 개발 서버
npm run dev

# DB 재생성 (경전 데이터 변경 시)
cd ..
node tools/build_db.mjs

# 프로덕션 빌드
cd webapp
npm run build
```

## 개발 단계 (Phase)

- Phase 1 — 읽기 MVP
  - [x] 45종 경전 데이터 SQLite DB 전환 (sutra.db, sql.js)
  - [x] 홈, 경전 목록, 경전 상세 화면 구현
  - [x] 상단 툴바 + 탭바 공통 레이아웃
  - [x] 계열별 타일 그리드 (3열), 경전별 고유 이모지
  - [x] 흰색/하늘색/검정/회색 컬러 시스템, 다크 모드 지원
  - [x] 한국어/영어 다국어 지원
  - [x] 한자 훈음 인라인 툴팁 UI (GlossaryText 컴포넌트)
  - [x] 조회수 카운트 (localStorage 기반)
  - [x] No-Cache 헤더 + OG 태그 기본 적용
  - [x] 경전 상세 동적 OG 태그 (react-helmet-async)

- Phase 2 — 소통 기능
  - [x] 더미 댓글 API (localStorage 저장)
  - [x] 경전 단위 / 단락 단위 댓글 UI (인라인 토글)
  - [x] 댓글수 표기 (경전 목록 카드)

- Phase 3 — TTS 오디오북
  - [x] Web Speech API TTS 연동
  - [x] 하단 고정 TTS 플레이어 (단락 하이라이트, 재생 속도 조절)
  - [x] 오디오북 탭 구현

- Phase 4 — 회원 기능 (더미 단계)
  - [x] 더미 Auth API (localStorage 기반 로그인/로그아웃)
  - [x] 로그인 화면 구현 (이메일 + 비밀번호 폼)
  - [x] 북마크 더미 기능 (경전 상세 툴바 북마크 버튼)
  - [x] 북마크 목록 화면 구현
  - [ ] Supabase Auth 실 연동 (이메일, 소셜 로그인)
  - [ ] 읽기 기록, 커스텀 설정 Supabase 저장

- Phase 5 — 고도화
  - [ ] SSR / Pre-rendering (동적 OG 태그 완전 지원)
  - [ ] 전문 검색 (경전명, 내용, 한자)
  - [ ] PWA (오프라인 읽기)
  - [ ] 외부 TTS API 연동 (고품질 음성)
  - [ ] 소셜 로그인 (Google, Kakao)

## 참고 출처

- [danielk0121/buddhist](https://github.com/danielk0121/buddhist) — 콘텐츠 저장소
- [대한불교조계종](https://www.jogyesa.kr)
- [동국대학교 불교학술원 ABC 프로젝트](https://abc.dongguk.edu)
- [sql.js (SQLite WebAssembly)](https://sql.js.org)
- [Supabase](https://supabase.com/docs)
