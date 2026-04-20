import { createContext, useContext, useEffect, useState } from 'react'
import { loadDb, queryParagraphs } from '../db/sutraDb'

const DBContext = createContext(null)

export function DBProvider({ children }) {
  const [db, setDb] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDb()
      .then((d) => { setDb(d); setLoading(false) })
      .catch((e) => { setError(e.message); setLoading(false) })
  }, [])

  function getParagraphs(slug) {
    if (!db) return []
    return queryParagraphs(db, slug)
  }

  return (
    <DBContext.Provider value={{ db, loading, error, getParagraphs }}>
      {children}
    </DBContext.Provider>
  )
}

export function useDB() {
  return useContext(DBContext)
}
