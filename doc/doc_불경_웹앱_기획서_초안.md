# 불경 웹앱 기획서

> 프로젝트: [danielk0121/buddhist](https://github.com/danielk0121/buddhist) 기반 웹앱  
> 작성일: 2026-04-20  
> 버전: v0.1

---

## 1. 프로젝트 개요

### 1.1 서비스 소개

한문·고어로 된 불경을 현대 한국어 수필 형태로 재구성하여, 누구나 쉽게 읽고 이해할 수 있는 불교 경전 웹 서비스.  
웹소설 플랫폼의 소통 구조를 접목하여 독자 참여와 커뮤니티를 형성한다.

### 1.2 서비스명 (가칭)

**불경 에세이** / `buddhist-essay`

### 1.3 벤치마크

- **불교경전 불경 독경 앱** (Fresh Things Company, Google Play 기준)
  - 불경 경전 읽기, 부처님 말씀 제공, 불경 모음 듣기 기능
  - 평점 4.6 / 리뷰 89개 / 5만 이상 다운로드
  - 본 서비스는 위 앱 대비 **수필 형식 + SNS 소통** 으로 차별화

### 1.4 핵심 차별점

| 항목 | 기존 앱 | 본 서비스 |
|------|---------|----------|
| 콘텐츠 형식 | 경전 원문 번역 | 수필 형식 재구성 |
| 한자·용어 처리 | 번역 위주 | 원어 노출 + 훈음 해설 |
| 소통 구조 | 없음 | 경전/단락 단위 댓글 |
| 인기 지표 | 없음 | 조회수 · 댓글수 표기 |
| 오디오 | 독송 영상 | TTS 오디오북 |

---

## 2. 콘텐츠 구조

### 2.1 데이터 소스

GitHub 저장소 `danielk0121/buddhist` 의 마크다운 파일을 기반으로 한다.

- `webapp/sutra/` — 경전 원문 기반 문서 (45종)
- `webapp/essay/` — 수필 형식 재구성 문서 (45종)

### 2.2 경전 목록 (45종)

| 계열 | 경전 |
|------|------|
| 반야 계열 | 반야심경, 금강경, 대품반야경, 소품반야경, 인왕경 |
| 법화 계열 | 법화경, 무량의경, 관세음보살보문품 |
| 화엄 계열 | 화엄경, 십지경, 입법계품 |
| 정토경전 | 아미타경, 무량수경, 관무량수경 |
| 여래장·유식 계열 | 능엄경, 원각경, 승만경, 해심밀경, 입능가경, 열반경 |
| 대승 집성 | 대집경, 보적경 |
| 재가·효 계열 | 유마경, 부모은중경, 우란분경 |
| 보살계·계율 | 범망경, 사분율 |
| 지장·약사 계열 | 지장경, 약사경 |
| 미륵 계열 | 미륵상생경, 미륵하생경 |
| 밀교경전 | 대일경, 금강정경 |
| 의식·다라니 | 천수경 |
| 아함경전 | 장아함경, 중아함경, 잡아함경, 증일아함경 |
| 팔리어·아함 | 법구경, 숫타니파타 |
| 팔리어 경전 | 디가 니카야, 맛지마 니카야, 상윳타 니카야, 앙굿타라 니카야, 쿳다카 니카야 |

### 2.3 수필 문서 구성 단락

각 경전의 수필 파일은 다음 단락으로 구성된다.

- 단어 사전
- 한자 풀이
- 한자 구절 한국어 풀이
- 이야기 (본문)
- 읽고 나서
- 원문 전체 보기

> 댓글은 **경전 단위** 및 **각 단락 단위** 양쪽에서 허용한다.

---

## 3. 주요 기능

### 3.1 경전 읽기

- 수필 형식으로 재구성한 본문 제공
- 한자·불교 용어를 원문 그대로 노출, 훈음 및 해설 인라인 표시
- 단락별 구분 UI로 긴 경전도 읽기 편하게 제공
- 원문(한문) 전체 보기 토글

### 3.2 SNS 소통 (댓글)

- 경전 단위 댓글, 단락 단위 댓글 (웹소설 플랫폼 방식)
- 댓글 작성에는 로그인 필요 (Supabase Auth)
- 댓글 좋아요, 답글 기능
- 비로그인 사용자도 댓글 읽기 가능

### 3.3 인기 지표

- 경전별·단락별 조회수 표기
- 댓글수 표기
- 인기순 정렬 (조회수 / 댓글수 / 최신순)
- 메인 화면에 인기 경전 배너 노출

### 3.4 TTS 오디오북

- Web Speech API (브라우저 기본 TTS) 활용
- 단락 단위 재생, 정지, 이전/다음 단락 이동
- 읽기 속도 조절 (0.5x ~ 2.0x)
- 재생 중 현재 단락 하이라이트
- 향후: 외부 TTS API 연동 확장 고려

### 3.5 회원 기능 (Supabase)

- 소셜 로그인 (Google, Kakao — 추후 구현)
- 이메일 회원가입 / 로그인
- 북마크 (즐겨찾기 경전 저장)
- 읽기 기록 저장
- 커스텀 설정 저장 (폰트 크기, 테마, TTS 속도 등)

> **현재 단계:** 더미 API 코드로 구현, 추후 Supabase 실 연동

---

## 4. 화면 구성 (UI 흐름)

```
홈 (메인)
├── 경전 목록 페이지
│   ├── 계열별 필터
│   ├── 인기순 / 최신순 정렬
│   └── 검색
├── 경전 상세 페이지
│   ├── 경전 소개 (수트라 요약)
│   ├── 수필 본문 (단락 리스트)
│   │   ├── 단락별 조회수 / 댓글수
│   │   ├── 단락별 댓글 토글
│   │   └── TTS 재생 버튼
│   ├── 원문 전체 보기 (토글)
│   └── 경전 전체 댓글
├── 로그인 / 회원가입
└── 마이페이지
    ├── 북마크 목록
    ├── 읽기 기록
    └── 설정 (테마, 폰트, TTS)
```

### 4.1 주요 화면 설명

**홈 화면**
- 인기 경전 TOP 5 배너
- 최근 업데이트 경전
- 계열별 빠른 진입 카드

**경전 목록 화면**
- 계열별 탭 필터
- 경전 카드: 제목(한글) + 한자 + 짧은 소개 + 조회수/댓글수

**경전 상세 화면**
- 상단: 경전명(한글 + 한자), 계열, 조회수/댓글수
- TTS 플레이어 고정 하단바
- 단락 목록: 단락 제목 → 본문 → 댓글 버튼
- 단락 클릭 시 댓글 영역 인라인 펼침

---

## 5. 기술 스펙

### 5.1 프론트엔드

| 항목 | 기술 |
|------|------|
| 프레임워크 | React (Vite 기반) |
| 스타일링 | Pure Vanilla CSS (CSS Variables 활용) |
| 상태관리 | React Context API + useReducer |
| 라우팅 | React Router v6 |
| TTS | Web Speech API (SpeechSynthesis) |
| 로컬 DB | SQLite (sql.js — WebAssembly 기반) |

### 5.2 백엔드 (Supabase — 추후 연동)

| 항목 | 기술 |
|------|------|
| Auth | Supabase Auth (이메일, 소셜) |
| DB | Supabase PostgreSQL |
| Storage | Supabase Storage (향후 오디오 파일 등) |
| 현재 단계 | 더미 API 함수로 인터페이스 구현 |

### 5.3 로컬 DB 스키마 (SQLite)

```sql
-- 경전
CREATE TABLE sutra (
  id          INTEGER PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,   -- 'banyasimgyeong'
  title_ko    TEXT NOT NULL,          -- '반야심경'
  title_hanja TEXT,                   -- '般若心經'
  category    TEXT,                   -- '반야 계열'
  view_count  INTEGER DEFAULT 0
);

-- 단락
CREATE TABLE paragraph (
  id          INTEGER PRIMARY KEY,
  sutra_id    INTEGER REFERENCES sutra(id),
  order_index INTEGER NOT NULL,
  section     TEXT,   -- '이야기', '읽고 나서', ...
  content     TEXT NOT NULL,
  view_count  INTEGER DEFAULT 0
);

-- 댓글 (더미 — 추후 Supabase 교체)
CREATE TABLE comment (
  id           INTEGER PRIMARY KEY,
  target_type  TEXT NOT NULL,   -- 'sutra' | 'paragraph'
  target_id    INTEGER NOT NULL,
  author_name  TEXT NOT NULL,
  content      TEXT NOT NULL,
  created_at   TEXT NOT NULL
);
```

### 5.4 더미 API 인터페이스 (추후 Supabase 교체 대상)

```javascript
// webapp/api/dummy/auth.js
export const signUp = async (email, password) => { /* dummy */ }
export const signIn = async (email, password) => { /* dummy */ }
export const signOut = async () => { /* dummy */ }
export const getSession = () => { /* dummy */ }

// webapp/api/dummy/bookmark.js
export const getBookmarks = async (userId) => { /* dummy */ }
export const addBookmark = async (userId, sutraId) => { /* dummy */ }
export const removeBookmark = async (userId, sutraId) => { /* dummy */ }

// webapp/api/dummy/comment.js
export const getComments = async (targetType, targetId) => { /* dummy */ }
export const postComment = async (payload) => { /* dummy */ }
```

---

## 6. 웹 서비스 기본 적용 사항

### 6.1 캐시 제어 (No-Cache)

```html
<!-- index.html -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

Vite 빌드 시 정적 에셋은 content hash 파일명 적용 (`main.a1b2c3.js`).

### 6.2 SNS OG Tag

```html
<!-- 기본 (홈) -->
<meta property="og:title" content="불경 에세이 — 누구나 읽는 불경">
<meta property="og:description" content="한문 불경을 현대 한국어 수필로 만나다. 45종 경전을 쉽게 읽고, 듣고, 함께 이야기 나눠요.">
<meta property="og:image" content="/og-default.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">

<!-- 경전 상세 (동적 생성) -->
<meta property="og:title" content="반야심경 (般若心經) — 불경 에세이">
<meta property="og:description" content="반야바라밀다심경, 260자 압축 핵심 경전을 수필로 읽다.">
```

> React SPA 특성상 동적 OG 태그는 **SSR 또는 Pre-rendering** 또는 서버사이드 메타 태그 주입으로 처리 필요.  
> 초기 단계: `react-helmet-async` 로 클라이언트 적용, 추후 SSR(Next.js 마이그레이션) 검토.

---

## 7. 디렉터리 구조

```
buddhist-essay/
├── public/
│   ├── favicon/
│   └── og-default.png
├── webapp/
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
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SutraList.jsx
│   │   ├── SutraDetail.jsx
│   │   ├── Login.jsx
│   │   └── MyPage.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── TTSContext.jsx
│   ├── db/
│   │   └── sqlite.js      # sql.js 초기화 및 쿼리 헬퍼
│   ├── styles/
│   │   ├── reset.css
│   │   ├── variables.css  # CSS Custom Properties (테마)
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── tools/                 # 마크다운 → JSON 변환 스크립트
├── index.html
├── vite.config.js
└── package.json
```

---

## 8. 개발 단계 (Phase)

### Phase 1 — 읽기 MVP

- [ ] 마크다운 → JSON 변환 스크립트 작성
- [ ] SQLite(sql.js) 초기화 및 데이터 로딩
- [ ] 홈, 경전 목록, 경전 상세 화면 구현
- [ ] 한자 훈음 인라인 툴팁 UI
- [ ] 조회수 카운트 (로컬 SQLite)
- [ ] No-Cache 헤더 + OG 태그 기본 적용

### Phase 2 — 소통 기능

- [ ] 더미 댓글 API 구현 (로컬 SQLite 저장)
- [ ] 경전 단위 댓글 UI
- [ ] 단락 단위 댓글 UI (인라인 토글)
- [ ] 댓글수 표기 및 인기순 정렬

### Phase 3 — TTS 오디오북

- [ ] Web Speech API 연동
- [ ] TTS 하단 플레이어 UI
- [ ] 단락 하이라이트 동기화
- [ ] 재생 속도 조절

### Phase 4 — 회원 기능

- [ ] 더미 Auth API → Supabase Auth 연동
- [ ] 이메일 회원가입 / 로그인
- [ ] 북마크 기능 (Supabase DB)
- [ ] 읽기 기록, 커스텀 설정 저장

### Phase 5 — 고도화

- [ ] 소셜 로그인 (Google, Kakao)
- [ ] SSR or Pre-rendering (동적 OG 태그 완전 지원)
- [ ] 외부 TTS API 연동 (고품질 음성)
- [ ] 전문 검색 (경전명, 내용, 한자)
- [ ] PWA 적용 (오프라인 읽기)

---

## 9. 저작권 및 법적 고지

- 모든 문서는 한문·팔리어 원전(공유 저작물)을 저본으로 독립 작성한 번역·재구성물
- 조계종·동국역경원 등 현대 번역본을 그대로 수록하지 않음
- 상세 내용: 저장소 `doc/저작권_분석.md` 참고
- 서비스 내 저작권 안내 페이지 제공 필요

---

## 10. 참고 자료

- GitHub 저장소: https://github.com/danielk0121/buddhist
- 벤치마크 앱: 불교경전 불경 독경 (Fresh Things Company)
- 대한불교조계종: https://www.jogyesa.kr
- 동국대학교 불교학술원 ABC 프로젝트: https://abc.dongguk.edu
- Supabase 공식 문서: https://supabase.com/docs
- sql.js (SQLite WebAssembly): https://sql.js.org
