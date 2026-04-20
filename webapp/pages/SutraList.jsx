import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Toolbar from '../components/layout/Toolbar'
import { useT } from '../i18n/useT'
import { CATEGORIES, SUTRAS } from '../assets/data/sutras'
import { getAllViewCounts } from '../utils/viewCount'
import { getCommentCount } from '../api/dummy/comment'
import './SutraList.css'

export default function SutraList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ALL = '__all__'
  const initialCategory = searchParams.get('category') || ALL
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState('default')
  const t = useT()

  const viewCounts = useMemo(() => getAllViewCounts(), [])

  const filtered = useMemo(() => {
    let list = SUTRAS.filter((s) => {
    const matchCategory = activeCategory === ALL || s.category === activeCategory
    if (!searchQuery.trim()) return matchCategory
    const q = searchQuery.trim().toLowerCase()
    const matchSearch =
      s.titleKo.toLowerCase().includes(q) ||
      (s.titleHanja && s.titleHanja.toLowerCase().includes(q)) ||
      s.category.toLowerCase().includes(q)
      return matchCategory && matchSearch
    })
    if (sortOrder === 'views') {
      list = [...list].sort((a, b) => (viewCounts[b.slug] || 0) - (viewCounts[a.slug] || 0))
    } else if (sortOrder === 'comments') {
      list = [...list].sort((a, b) => getCommentCount('sutra', b.slug) - getCommentCount('sutra', a.slug))
    }
    return list
  }, [activeCategory, searchQuery, sortOrder, viewCounts])

  return (
    <div className="page">
      <Helmet>
        <title>경전 목록 — 경필</title>
        <meta name="description" content="45종 불경을 계열별로 탐색하세요." />
        <meta property="og:title" content="경전 목록 — 경필" />
      </Helmet>
      <Toolbar
        title={t('sutra_list_title')}
        left={
          <button className="toolbar-btn" onClick={() => navigate('/')} aria-label={t('back')}>
            ←
          </button>
        }
        right={
          <button
            className="toolbar-btn"
            onClick={() => { setSearchOpen((v) => !v); setSearchQuery('') }}
            aria-label="검색"
          >
            {searchOpen ? '✕' : '🔍'}
          </button>
        }
      />

      <div className="page-content list-content">
        {searchOpen && (
          <input
            className="search-input"
            type="search"
            placeholder="경전명, 한자, 계열 검색…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        )}

        <div className="sort-row">
          {[
            { value: 'default', label: '기본순' },
            { value: 'views', label: '조회수순' },
            { value: 'comments', label: '댓글수순' },
          ].map((opt) => (
            <button
              key={opt.value}
              className={`sort-btn ${sortOrder === opt.value ? 'sort-btn--active' : ''}`}
              onClick={() => setSortOrder(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="tab-scroll">
          {[{ value: ALL, label: t('sutra_list_all') }, ...CATEGORIES.map((c) => ({ value: c, label: c }))].map((cat) => (
            <button
              key={cat.value}
              className={`tab-btn ${activeCategory === cat.value ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
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
                <div className="sutra-card__stats">
                  {viewCounts[s.slug] > 0 && (
                    <span className="sutra-card__views">조회 {viewCounts[s.slug].toLocaleString()}</span>
                  )}
                  {getCommentCount('sutra', s.slug) > 0 && (
                    <span className="sutra-card__comments">댓글 {getCommentCount('sutra', s.slug)}</span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="empty-msg">{t('sutra_list_empty')}</p>
        )}
      </div>
    </div>
  )
}
