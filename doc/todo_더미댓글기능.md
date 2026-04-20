## 작업 내용

더미 댓글 기능 구현 — API + UI (Phase 2)

- 기획서 4.2, Phase 2 항목 기반
- 더미 댓글 API 구현
  - `webapp/api/dummy/comment.js` — getComments, postComment
  - 로컬 SQLite `comment` 테이블에 저장/조회
- 경전 상세 화면 하단에 경전 단위 댓글 UI 추가
  - 댓글 목록 표시 (작성자명, 내용, 작성일)
  - 댓글 입력 폼 (비로그인도 닉네임 입력 후 작성 가능, 더미 단계)
- 댓글수 표기 (경전 목록 카드, 상세 헤더)
- 단락 단위 댓글은 추후 구현 (Phase 2 후속)

## 작업 결과

- `webapp/api/dummy/comment.js` 확인 — localStorage 기반 더미 API 이미 구현됨
  - `getComments`, `postComment`, `likeComment` 완성 상태
  - `getCommentCount(targetType, targetId)` 동기 함수 추가 (목록 카드 표시용)
- `webapp/components/comment/CommentBox.jsx` 확인 — 댓글 UI 이미 구현됨
  - 경전 상세 화면 단락별 + 경전 전체 댓글 모두 연결된 상태
- `webapp/pages/SutraList.jsx` 수정
  - 경전 카드에 조회수 + 댓글수 통계 표시 (0건 시 숨김)
