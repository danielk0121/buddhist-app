## 작업 내용

북마크 더미 기능 구현 — Phase 4 준비 항목

- 기획서 4.5, Phase 4 항목 기반 (더미 단계)
- 구현 범위
  - `webapp/api/dummy/bookmark.js` 구현
    - `getBookmarks()` — localStorage에서 북마크 목록 반환
    - `addBookmark(slug)` — 북마크 추가
    - `removeBookmark(slug)` — 북마크 제거
    - `isBookmarked(slug)` — 북마크 여부 확인
  - 경전 상세 화면 툴바 우측 북마크(★) 버튼 동작 연결
    - 현재 북마크 버튼이 툴바에 있으나 실제 동작 없음
    - 탭 시 저장/해제 토글, 상태에 따라 아이콘 변경
  - 설정 탭 또는 별도 화면에 북마크 목록 보기 추가 (추후 검토)

## 작업 결과

- `webapp/api/dummy/bookmark.js` 신규 생성
  - localStorage 기반 북마크 저장/조회
  - `getBookmarks()`, `isBookmarked(slug)`, `addBookmark(slug)`, `removeBookmark(slug)`, `toggleBookmark(slug)` 구현
- `webapp/pages/SutraDetail.jsx` 수정
  - `bookmarked` useState 추가, slug 변경 시 초기값 동기화
  - 툴바 우측 북마크 버튼(★/☆) 추가 — 클릭 시 토글, 상태에 따라 아이콘 변경
