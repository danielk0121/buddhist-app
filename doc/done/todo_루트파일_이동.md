## 작업 내용

루트에 있는 웹앱 관련 파일을 webapp 폴더로 이동한다.
- index.html, package.json, package-lock.json, vite.config.js → webapp/
- vite root, publicDir, resolve.alias 경로 수정
- index.html의 main.jsx 스크립트 경로 수정

## 작업 결과

- index.html, package.json, package-lock.json, vite.config.js → webapp/ 으로 이동
- webapp/index.html: 스크립트 경로 `/webapp/main.jsx` → `/main.jsx`
- webapp/vite.config.js: `publicDir: '../public'`, `build.outDir: '../dist'` 로 수정
- 루트의 구버전 파일 삭제
- `cd webapp && npm run build` 로 빌드 확인 완료
