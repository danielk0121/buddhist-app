import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Toolbar from '../components/layout/Toolbar'
import { useT } from '../i18n/useT'
import { SUTRAS } from '../assets/data/sutras'
import { SUTRA_EMOJI } from '../assets/data/sutraEmoji'
import { getBookmarks, toggleBookmark } from '../api/dummy/bookmark'
import './Bookmarks.css'

export default function Bookmarks() {
  const navigate = useNavigate()
  const t = useT()
  const [slugs, setSlugs] = useState(() => getBookmarks())

  const bookmarked = SUTRAS.filter((s) => slugs.includes(s.slug))

  const handleToggle = useCallback((e, slug) => {
    e.stopPropagation()
    toggleBookmark(slug)
    setSlugs(getBookmarks())
  }, [])

  return (
    <div className="page">
      <Helmet>
        <title>북마크 — 경필</title>
      </Helmet>
      <Toolbar
        title="북마크"
        left={<button className="toolbar-btn" onClick={() => navigate(-1)} aria-label={t('back')}>←</button>}
      />

      <div className="page-content list-content">
        {bookmarked.length === 0 ? (
          <p className="empty-msg">북마크한 경전이 없습니다.</p>
        ) : (
          <ul className="sutra-list">
            {bookmarked.map((s) => (
              <li key={s.slug}>
                <button
                  className="sutra-card bookmark-card"
                  onClick={() => navigate(`/sutra/${s.slug}`)}
                >
                  <span className="bookmark-card__emoji">{SUTRA_EMOJI[s.slug] ?? '📄'}</span>
                  <div className="bookmark-card__info">
                    <div className="sutra-card__title">{s.titleKo}</div>
                    <div className="sutra-card__hanja">{s.titleHanja}</div>
                    <div className="sutra-card__category">{s.category}</div>
                  </div>
                  <button
                    className="bookmark-remove-btn"
                    onClick={(e) => handleToggle(e, s.slug)}
                    aria-label="북마크 해제"
                  >
                    ★
                  </button>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
