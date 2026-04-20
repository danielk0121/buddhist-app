## 작업 내용

경전 목록 인기순 정렬 기능 구현 — Phase 2, 기획서 4.3 항목

- 기획서 4.3 인기 지표 항목 기반
- 경전 목록 화면에 정렬 옵션 추가
  - 기본순 (계열별)
  - 조회수 순 (높은 순)
  - 댓글수 순 (많은 순)
  - 최신순 (고정 순서 — slug 기준)
- 정렬 상태는 UI 상에 표시 (선택된 항목 강조)
- `webapp/utils/viewCount.js`의 `getViewCount` 및 `getCommentCount` 활용

## 작업 결과

- `webapp/pages/SutraList.jsx` 수정
  - 정렬 상태 `sortOrder` useState 추가 (기본순 / 조회수순 / 댓글수순)
  - `filtered` useMemo 내에서 정렬 로직 적용
  - 정렬 버튼 3개 UI 추가 (기본순, 조회수순, 댓글수순)
- `webapp/pages/SutraList.css` — `.sort-row`, `.sort-btn`, `.sort-btn--active` 스타일 추가
