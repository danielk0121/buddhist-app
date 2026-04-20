# TODO: 안드로이드 하이브리드 앱 전환

## 개요

본 프로젝트는 **웹앱 우선 구현 → 안드로이드 하이브리드 앱 전환** 순서로 진행한다.

- 1단계: React (Vite) 웹앱으로 전체 기능 구현
- 2단계: Android WebView 기반 하이브리드 앱으로 패키징
- 최종 목표: Google Play 스토어 배포

---

## 1단계 — 웹앱 구현 (현재 진행 중)

웹앱 단계에서는 안드로이드를 고려하지 않고 웹 표준으로 구현한다.
단, 이후 하이브리드 전환을 염두에 두고 아래 사항을 준수한다.

- 모든 UI는 모바일 퍼스트(375px 기준)로 설계한다
- 고정 하단바(TTS 플레이어 등)는 안드로이드 네비게이션 바 영역을 고려한다
- `window.history` 기반 라우팅 사용 (React Router v6 BrowserRouter)
- 외부 폰트·리소스 최소화 (오프라인 환경 대비)
- `https` 환경 기준으로 개발 (WebView 보안 정책 대응)

세부 구현 단계는 [doc_불경_웹앱_기획서_초안.md](doc_불경_웹앱_기획서_초안.md) Phase 1~5 참고.

---

## 2단계 — 안드로이드 하이브리드 앱 전환

웹앱 구현 완료 후 진행한다.

### 전환 방식

- Android WebView 기반 네이티브 앱으로 패키징
- 웹앱 번들(Vite build 결과물)을 앱 assets에 포함하거나, 원격 URL 로딩 방식 선택

### 구현 항목

- [ ] `android/` 디렉터리 생성 — Android 프로젝트 초기화 (Android Studio)
- [ ] `MainActivity.java` (또는 Kotlin) — WebView 설정
  - `setJavaScriptEnabled(true)`
  - `setDomStorageEnabled(true)` — localStorage 사용
  - `WebViewClient` 설정 — 외부 링크 처리
- [ ] JavaScript Bridge 구현 — 웹 ↔ 네이티브 통신
  - 예시: 알림 권한 요청, 파일 저장, 네이티브 공유 기능
- [ ] 뒤로가기 버튼 처리 — WebView history 우선, 없으면 앱 종료
- [ ] 스플래시 화면 구현
- [ ] `AndroidManifest.xml` 설정 — 인터넷 권한, 화면 방향 등
- [ ] 앱 아이콘 및 서명 설정
- [ ] Google Play 스토어 배포 준비

### 안드로이드 전용 기능 (웹앱에 없는 기능)

- [ ] 푸시 알림 (FCM — Firebase Cloud Messaging)
- [ ] 네이티브 공유 (`ACTION_SEND` 인텐트)
- [ ] 오프라인 모드 (WebView 캐시 전략)
- [ ] 앱 업데이트 유도 (In-App Update API)

### 디렉터리 구조 (전환 후)

```
buddhist-app/
├── android/               # Android 프로젝트 (전환 후 생성)
│   ├── app/
│   │   ├── webapp/main/
│   │   │   ├── java/      # MainActivity 등
│   │   │   ├── res/       # 아이콘, 레이아웃
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   └── build.gradle
├── webapp/                   # 웹앱 소스 (공통)
├── tools/
└── ...
```

---

## 참고

- Android WebView 공식 문서: https://developer.android.com/reference/android/webkit/WebView
- Vite 빌드 결과물을 Android assets에 포함하는 방법: `android/app/src/main/assets/` 에 `dist/` 복사
