# 불경 에세이

한문·고어로 된 불경을 현대 한국어 수필 형태로 재구성하여, 누구나 쉽게 읽고 이해할 수 있는 불교 경전 서비스.

> **저작권 고지**
> 모든 콘텐츠는 한문·팔리어 원전(공유 저작물)을 저본으로 독립 작성한 번역·재구성물입니다.
> 조계종·동국역경원 등 현대 번역본을 그대로 수록하지 않습니다.
> 콘텐츠 출처: [danielk0121/buddhist](https://github.com/danielk0121/buddhist)

## 목적

[danielk0121/buddhist](https://github.com/danielk0121/buddhist) 저장소의 45종 경전 마크다운 콘텐츠를 기반으로, 웹소설 플랫폼 방식의 소통 구조를 접목한 불교 경전 서비스입니다.

- 수필 형식으로 재구성한 경전 본문 제공
- 한자·불교 용어 인라인 훈음 해설
- 경전·단락 단위 댓글 (SNS 소통)
- TTS 오디오북 (Web Speech API)
- 북마크·읽기 기록 회원 기능 (Supabase 연동 예정)

## 개발 방향

**웹앱 우선 구현 → 안드로이드 하이브리드 앱 전환** 순서로 진행한다.

- 1단계: React (Vite) 웹앱으로 전체 기능 구현 (현재)
- 2단계: Android WebView 기반 하이브리드 앱으로 패키징 후 Google Play 배포

상세 전환 계획: [doc/todo_안드로이드_하이브리드_전환.md](doc/todo_안드로이드_하이브리드_전환.md)

## 구조

```
buddhist-app/
├── android/               # Android 프로젝트 (2단계 전환 후 구현)
│   └── app/src/main/
│       ├── java/          # MainActivity (WebView 설정)
│       ├── res/           # 아이콘, 레이아웃
│       └── assets/        # 웹앱 빌드 결과물 (dist/)
├── doc/                   # 기획서, 작업 문서
│   ├── done/              # 완료된 작업 문서
│   ├── hold/              # 보류 중 작업 문서
│   └── discard/           # 폐기된 작업 문서
├── public/
│   └── favicon/           # 파비콘 에셋
├── webapp/                   # 웹앱 소스 (React)
│   ├── api/
│   │   ├── dummy/         # 더미 API (auth, bookmark, comment)
│   │   └── supabase/      # 추후 실 연동
│   ├── assets/
│   │   └── data/          # 마크다운 → JSON 변환 데이터
│   ├── components/
│   │   ├── layout/        # Header, Footer, NavBar
│   │   ├── sutra/         # SutraCard, SutraList, ParagraphBlock
│   │   ├── comment/       # CommentBox, CommentItem
│   │   ├── tts/           # TTSPlayer, TTSControls
│   │   └── common/        # Button, Modal, Spinner
│   ├── context/           # AuthContext, TTSContext
│   ├── db/                # sql.js 초기화 및 쿼리 헬퍼
│   ├── pages/             # Home, SutraList, SutraDetail, Login, MyPage
│   └── styles/            # reset.css, variables.css, global.css
└── tools/                 # 마크다운 → JSON 변환 스크립트
```

## 기술 스택

### 웹앱 (1단계)

- 프레임워크: React (Vite)
- 스타일링: Vanilla CSS (CSS Variables, 모바일 퍼스트)
- 상태 관리: React Context API + useReducer
- 라우팅: React Router v6
- TTS: Web Speech API (SpeechSynthesis)
- 로컬 DB: SQLite (sql.js — WebAssembly)
- 백엔드: Supabase (추후 연동)

### 안드로이드 앱 (2단계)

- Android WebView 기반 하이브리드 앱
- JavaScript Bridge — 웹 ↔ 네이티브 통신
- FCM 푸시 알림 (예정)
- Google Play 배포

## 개발 단계

- Phase 1 — 읽기 MVP: 마크다운 → JSON 변환, SQLite 로딩, 홈·목록·상세 화면
- Phase 2 — 소통 기능: 경전·단락 단위 댓글, 인기순 정렬
- Phase 3 — TTS 오디오북: Web Speech API, 단락 하이라이트, 속도 조절
- Phase 4 — 회원 기능: Supabase Auth, 북마크, 읽기 기록
- Phase 5 — 고도화: 소셜 로그인, SSR, PWA
- Phase 6 — 안드로이드 전환: WebView 패키징, Google Play 배포

상세 내용: [doc/doc_불경_웹앱_기획서_초안.md](doc/doc_불경_웹앱_기획서_초안.md)

## 참고 출처

- [danielk0121/buddhist](https://github.com/danielk0121/buddhist) — 콘텐츠 저장소
- [대한불교조계종](https://www.jogyesa.kr)
- [동국대학교 불교학술원 ABC 프로젝트](https://abc.dongguk.edu)
