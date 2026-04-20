// paragraphs.js → sutra.db (SQLite) 변환 스크립트
// 실행: node tools/build_db.mjs

import Database from 'better-sqlite3'
import { createRequire } from 'module'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// paragraphs.js를 직접 텍스트로 읽어 eval 없이 essay 파일에서 재파싱
import fs from 'fs'

const ESSAY_DIR = '/Users/user/ws/buddhist/src/essay'
const DB_PATH = path.join(ROOT, 'public', 'sutra.db')

const SECTIONS = [
  '단어 사전',
  '한자 풀이',
  '한자 구절 한국어 풀이',
  '이야기',
  '읽고 나서',
  '원문 전체 보기',
]

const SLUG_MAP = {
  '01_반야심경_essay': '반야심경',
  '02_금강경_essay': '금강경',
  '03_대품반야경_essay': '대품반야경',
  '04_소품반야경_essay': '소품반야경',
  '05_인왕경_essay': '인왕경',
  '06_법화경_essay': '법화경',
  '07_무량의경_essay': '무량의경',
  '08_관세음보살보문품_essay': '관세음보살보문품',
  '09_화엄경_essay': '화엄경',
  '10_십지경_essay': '십지경',
  '11_입법계품_essay': '입법계품',
  '12_아미타경_essay': '아미타경',
  '13_무량수경_essay': '무량수경',
  '14_관무량수경_essay': '관무량수경',
  '15_능엄경_essay': '능엄경',
  '16_원각경_essay': '원각경',
  '17_승만경_essay': '승만경',
  '18_해심밀경_essay': '해심밀경',
  '19_입능가경_essay': '입능가경',
  '20_열반경_essay': '열반경',
  '21_대집경_essay': '대집경',
  '22_보적경_essay': '보적경',
  '23_유마경_essay': '유마경',
  '24_부모은중경_essay': '부모은중경',
  '25_우란분경_essay': '우란분경',
  '26_범망경_essay': '범망경',
  '27_사분율_essay': '사분율',
  '28_지장경_essay': '지장경',
  '29_약사경_essay': '약사경',
  '30_미륵상생경_essay': '미륵상생경',
  '31_미륵하생경_essay': '미륵하생경',
  '32_대일경_essay': '대일경',
  '33_금강정경_essay': '금강정경',
  '34_천수경_essay': '천수경',
  '35_장아함경_essay': '장아함경',
  '36_중아함경_essay': '중아함경',
  '37_잡아함경_essay': '잡아함경',
  '38_증일아함경_essay': '증일아함경',
  '39_법구경_essay': '법구경',
  '40_숫타니파타_essay': '숫타니파타',
  '41_디가니카야_essay': '디가니카야',
  '42_맛지마니카야_essay': '맛지마니카야',
  '43_상윳타니카야_essay': '상윳타니카야',
  '44_앙굿타라니카야_essay': '앙굿타라니카야',
  '45_쿳다카니카야_essay': '쿳다카니카야',
}

function parseEssay(content) {
  const result = {}
  let currentSection = null
  let currentLines = []
  for (const line of content.split('\n')) {
    const m = line.match(/^## (.+)$/)
    if (m) {
      if (currentSection) result[currentSection] = currentLines.join('\n').trim()
      currentSection = m[1].trim()
      currentLines = []
    } else if (currentSection) {
      currentLines.push(line)
    }
  }
  if (currentSection) result[currentSection] = currentLines.join('\n').trim()
  return result
}

// public 폴더가 없으면 생성
fs.mkdirSync(path.join(ROOT, 'public'), { recursive: true })

// DB 생성
if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH)
const db = new Database(DB_PATH)

db.exec(`
  CREATE TABLE paragraphs (
    id          TEXT PRIMARY KEY,
    sutra_slug  TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    section     TEXT NOT NULL,
    content     TEXT NOT NULL
  );
  CREATE INDEX idx_slug ON paragraphs(sutra_slug);
`)

const insert = db.prepare(
  'INSERT INTO paragraphs (id, sutra_slug, order_index, section, content) VALUES (?, ?, ?, ?, ?)'
)

const insertAll = db.transaction((rows) => {
  for (const r of rows) insert.run(r.id, r.sutraSlug, r.orderIndex, r.section, r.content)
})

let total = 0
const rows = []

for (const [filename, slug] of Object.entries(SLUG_MAP)) {
  const filePath = path.join(ESSAY_DIR, filename + '.md')
  if (!fs.existsSync(filePath)) { console.warn(`없음: ${filePath}`); continue }
  const parsed = parseEssay(fs.readFileSync(filePath, 'utf-8'))
  SECTIONS.forEach((section, i) => {
    rows.push({
      id: `${slug}-${i}`,
      sutraSlug: slug,
      orderIndex: i,
      section,
      content: parsed[section] ?? '(준비 중)',
    })
    total++
  })
}

insertAll(rows)
db.close()

const size = (fs.statSync(DB_PATH).size / 1024).toFixed(1)
console.log(`완료: ${total}개 행 → ${DB_PATH} (${size} KB)`)
