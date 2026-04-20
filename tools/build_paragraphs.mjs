// essay md 파일을 파싱해서 paragraphs.js 생성
import fs from 'fs'
import path from 'path'

const ESSAY_DIR = '/Users/user/ws/buddhist/src/essay'
const OUTPUT = '/Users/user/ws/buddhist-app/webapp/assets/data/paragraphs.js'

const SECTIONS = [
  '단어 사전',
  '한자 풀이',
  '한자 구절 한국어 풀이',
  '이야기',
  '읽고 나서',
  '원문 전체 보기',
]

// 파일명 → slug 매핑
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

  const lines = content.split('\n')
  for (const line of lines) {
    const match = line.match(/^## (.+)$/)
    if (match) {
      if (currentSection) {
        result[currentSection] = currentLines.join('\n').trim()
      }
      currentSection = match[1].trim()
      currentLines = []
    } else if (currentSection) {
      currentLines.push(line)
    }
  }
  if (currentSection) {
    result[currentSection] = currentLines.join('\n').trim()
  }
  return result
}

function escapeBacktick(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

const entries = []

for (const [filename, slug] of Object.entries(SLUG_MAP)) {
  const filePath = path.join(ESSAY_DIR, filename + '.md')
  if (!fs.existsSync(filePath)) {
    console.warn(`파일 없음: ${filePath}`)
    continue
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  const parsed = parseEssay(content)

  const contents = SECTIONS.map((s) => escapeBacktick(parsed[s] ?? '(준비 중)'))
  const lines = contents.map((c, i) => `    \`${c}\``)
  entries.push(`  '${slug}': make('${slug}', [\n${lines.join(',\n')},\n  ])`)
}

const output = `// 경전별 단락 데이터 — /Users/user/ws/buddhist/src/essay 에서 자동 생성

export const SECTION_LABELS = [
  '단어 사전',
  '한자 풀이',
  '한자 구절 한국어 풀이',
  '이야기',
  '읽고 나서',
  '원문 전체 보기',
]

function make(slug, contents) {
  return SECTION_LABELS.map((section, i) => ({
    id: \`\${slug}-\${i}\`,
    sutraSlug: slug,
    orderIndex: i,
    section,
    content: contents[i] ?? '',
  }))
}

const DATA = {
${entries.join(',\n\n')},
}

export function getParagraphs(slug) {
  return DATA[slug] ?? SECTION_LABELS.map((section, i) => ({
    id: \`\${slug}-\${i}\`,
    sutraSlug: slug,
    orderIndex: i,
    section,
    content: '(준비 중)',
  }))
}
`

fs.writeFileSync(OUTPUT, output, 'utf-8')
console.log(`완료: ${Object.keys(SLUG_MAP).length}개 경전 → ${OUTPUT}`)
