// 더미 댓글 API — localStorage 기반. 추후 Supabase 로 교체.

const STORAGE_KEY = 'bh_comments'

function loadAll() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}

function saveAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export async function getComments(targetType, targetId) {
  const all = loadAll()
  return all.filter((c) => c.targetType === targetType && c.targetId === targetId)
}

export async function postComment({ targetType, targetId, authorName, content }) {
  const all = loadAll()
  const comment = {
    id: Date.now(),
    targetType,
    targetId,
    authorName: authorName || '익명',
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
  }
  all.push(comment)
  saveAll(all)
  return comment
}

export async function likeComment(commentId) {
  const all = loadAll()
  const idx = all.findIndex((c) => c.id === commentId)
  if (idx !== -1) {
    all[idx] = { ...all[idx], likes: (all[idx].likes || 0) + 1 }
    saveAll(all)
    return all[idx]
  }
  return null
}
