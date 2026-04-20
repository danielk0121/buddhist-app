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

상세 전환 계획: [doc/todo_안드로이드_하이브리드_전환.md](doc/hold/todo_안드로이드_하이브리드_전환.md)

## 폴더 구조

```
buddhist-app/
├── android/     # Android 프로젝트 (2단계 전환 후 구현)
├── doc/         # 기획서, 작업 문서 (done / hold / discard)
├── public/      # 정적 에셋 (파비콘 등)
├── webapp/      # 웹앱 소스 (React)
└── tools/       # 유틸리티 스크립트
```

## 기술 스택

- 프레임워크: React 18 (Vite)
- 스타일링: Vanilla CSS (CSS Variables, 모바일 퍼스트)
- 상태 관리: React Context API
- 라우팅: React Router v6
- 백엔드: Supabase (추후 연동)

## 로컬 실행

```bash
npm install
npm run dev
```

## 참고 출처

- [danielk0121/buddhist](https://github.com/danielk0121/buddhist) — 콘텐츠 저장소
- [대한불교조계종](https://www.jogyesa.kr)
- [동국대학교 불교학술원 ABC 프로젝트](https://abc.dongguk.edu)
