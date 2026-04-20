import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Toolbar from '../components/layout/Toolbar'
import { CATEGORIES, SUTRAS } from '../assets/data/sutras'
import './SutraList.css'

export default function SutraList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || '전체'
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [query, setQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const filtered = SUTRAS.filter((s) => {
    const matchCategory = activeCategory === '전체' || s.category === activeCategory
    const matchQuery = !query || s.titleKo.includes(query) || s.titleHanja.includes(query)
    return matchCategory && matchQuery
  })

  return (
    <div className="page">
      <Helmet>
        <title>경전 목록 — 경필</title>
        <meta name="description" content="45종 불경을 계열별로 탐색하세요." />
        <meta property="og:title" content="경전 목록 — 경필" />
      </Helmet>
      <Toolbar
        title="경전 목록"
        left={
          <button className="toolbar-btn" onClick={() => navigate('/')} aria-label="뒤로가기">
            ←
          </button>
        }
        right={
          <button className="toolbar-btn" onClick={() => setShowSearch((v) => !v)} aria-label="검색">
            검색
          </button>
        }
      />

      <div className="page-content list-content">
        {showSearch && (
          <input
            className="search-input"
            type="search"
            placeholder="경전명 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        )}

        <div className="tab-scroll">
          {['전체', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="sutra-list">
          {filtered.map((s) => (
            <li key={s.id}>
              <button
                className="sutra-card"
                onClick={() => navigate(`/sutra/${s.slug}`)}
              >
                <div className="sutra-card__title">{s.titleKo}</div>
                <div className="sutra-card__hanja">{s.titleHanja}</div>
                <div className="sutra-card__category">{s.category}</div>
              </button>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="empty-msg">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  )
}
