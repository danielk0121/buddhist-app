// '단어 사전' 단락 content에서 용어→해설 맵 파싱
// 형식: - **용어** — 해설
export function parseDictionary(content) {
  if (!content) return {}
  const map = {}
  const lines = content.split('\n')
  for (const line of lines) {
    const m = line.match(/^\s*-\s+\*\*(.+?)\*\*\s*[—–-]\s*(.+)/)
    if (m) {
      map[m[1].trim()] = m[2].trim()
    }
  }
  return map
}
