// 브라우저에서 sql.js(WebAssembly)로 sutra.db 로드 및 쿼리

import initSqlJs from 'sql.js'

let _db = null

export async function loadDb() {
  if (_db) return _db

  const SQL = await initSqlJs({
    locateFile: () => `${import.meta.env.BASE_URL}sql-wasm.wasm`,
  })

  const res = await fetch(`${import.meta.env.BASE_URL}sutra.db`)
  const buf = await res.arrayBuffer()
  _db = new SQL.Database(new Uint8Array(buf))
  return _db
}

export function queryParagraphs(db, slug) {
  const stmt = db.prepare(
    'SELECT id, sutra_slug, order_index, section, content FROM paragraphs WHERE sutra_slug = ? ORDER BY order_index'
  )
  stmt.bind([slug])
  const rows = []
  while (stmt.step()) {
    const r = stmt.getAsObject()
    rows.push({
      id: r.id,
      sutraSlug: r.sutra_slug,
      orderIndex: r.order_index,
      section: r.section,
      content: r.content,
    })
  }
  stmt.free()
  return rows
}

export function queryAllSlugs(db) {
  const stmt = db.prepare('SELECT DISTINCT sutra_slug FROM paragraphs ORDER BY sutra_slug')
  const slugs = []
  while (stmt.step()) slugs.push(stmt.getAsObject().sutra_slug)
  stmt.free()
  return slugs
}
