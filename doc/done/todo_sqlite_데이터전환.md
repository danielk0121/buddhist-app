## 작업 내용

경전 단락 데이터를 paragraphs.js 정적 배열에서 SQLite DB 파일로 전환한다.

- SQLite DB 파일 생성 (sutra.db)
- sql.js (WebAssembly) 로 브라우저에서 DB 로드
- 기존 getParagraphs() 인터페이스 유지하여 UI 코드 변경 최소화
- DB 로드는 앱 초기화 시 1회 수행, Context로 공유

## 작업 결과

- tools/build_db.mjs 생성 — essay .md 파일 45개 파싱 → public/sutra.db 생성 (270행, ~328KB)
- public/sql-wasm.wasm 복사 (sql.js WebAssembly 런타임)
- webapp/db/sutraDb.js 생성 — loadDb(), queryParagraphs(), queryAllSlugs()
- webapp/context/DBContext.jsx 생성 — DBProvider, useDB() 훅
- webapp/main.jsx 수정 — DBProvider 래핑 추가
- webapp/pages/SutraDetail.jsx 수정 — useDB() 사용, 정적 getParagraphs import 제거, DB 로딩 중 안내 메시지 표시
