const KEY = 'sutra_view_counts'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

function save(counts) {
  localStorage.setItem(KEY, JSON.stringify(counts))
}

export function incrementViewCount(slug) {
  const counts = load()
  counts[slug] = (counts[slug] || 0) + 1
  save(counts)
  return counts[slug]
}

export function getViewCount(slug) {
  return load()[slug] || 0
}

export function getAllViewCounts() {
  return load()
}

// 조회수 기준 상위 N개 slug 반환
export function getTopSlugs(n = 5) {
  const counts = load()
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([slug]) => slug)
}
