## 작업 내용

경전 조회수 카운트 기능 구현 (로컬 SQLite)

- 기획서 Phase 1, 4.3 항목 기반
- 경전 상세 페이지 진입 시 해당 경전의 `view_count` 1 증가
- `sutra.db`의 `sutra` 테이블 `view_count` 컬럼 활용
- sql.js는 인메모리 DB이므로 세션 내 유지, 페이지 새로고침 시 초기화 (현재 단계)
- 홈 화면 TOP5 배너와 연동 (조회수 높은 순 정렬)
- 경전 목록 카드에 조회수 표시

## 작업 결과

- `webapp/utils/viewCount.js` 신규 생성
  - localStorage 기반 조회수 저장/조회
  - `incrementViewCount(slug)` — 경전 상세 진입 시 호출
  - `getViewCount(slug)`, `getAllViewCounts()` — 조회수 읽기
  - `getTopSlugs(n)` — 조회수 상위 n개 slug 반환
- `webapp/pages/SutraDetail.jsx` 수정
  - 경전 상세 진입(mount) 시 해당 slug 조회수 증가
- `webapp/pages/SutraList.jsx` 수정
  - 카드에 조회수 표시 (조회수가 1 이상인 경우만)
- `webapp/pages/Home.jsx` 수정
  - TOP5 배너를 조회수 기반 동적 정렬로 변경 (조회수 없을 때는 기본 5종 표시)
