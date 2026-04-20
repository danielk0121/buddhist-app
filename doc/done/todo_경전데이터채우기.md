## 작업 내용

/Users/user/ws/buddhist 폴더의 경전 원본 데이터를 참고하여
웹앱(webapp/assets/data/paragraphs.js)에 경전 단락 데이터를 채운다.

## 작업 결과

- 소스: `/Users/user/ws/buddhist/src/essay/` 45개 essay md 파일
- 파싱 스크립트: `tools/build_paragraphs.mjs` 생성
- 출력: `webapp/assets/data/paragraphs.js` (8,622줄)
- 45개 경전 × 6개 섹션(단어 사전 / 한자 풀이 / 한자 구절 한국어 풀이 / 이야기 / 읽고 나서 / 원문 전체 보기) 전량 채움
- 빌드 정상 확인 (vite build ✓)
