## 작업 내용

단락(段落) 단위 댓글 UI 구현 — Phase 2 미완료 항목

- 기획서 4.2, Phase 2 항목 기반
- 경전 상세 화면에서 각 단락 아래 댓글 버튼 표시
- 버튼 탭 시 해당 단락의 댓글 영역 인라인 펼침/접기 토글
- 단락 댓글 표시 내용
  - 댓글 목록 (작성자명, 내용, 작성일)
  - 댓글 입력 폼 (닉네임 + 내용, 더미 단계)
  - 단락 댓글수 배지 표시
- API: 기존 `webapp/api/dummy/comment.js`의 `getComments`, `postComment` 활용
  - `targetType: 'paragraph'`, `targetId: paragraphIndex` 형태 사용

## 작업 결과
