const KEY = 'gyeongpil_bookmarks'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function getBookmarks() {
  return load()
}

export function isBookmarked(slug) {
  return load().includes(slug)
}

export function addBookmark(slug) {
  const list = load()
  if (!list.includes(slug)) {
    save([...list, slug])
  }
}

export function removeBookmark(slug) {
  save(load().filter((s) => s !== slug))
}

export function toggleBookmark(slug) {
  if (isBookmarked(slug)) {
    removeBookmark(slug)
    return false
  } else {
    addBookmark(slug)
    return true
  }
}
