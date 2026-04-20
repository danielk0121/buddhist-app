import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Toolbar from '../components/layout/Toolbar'
import { useT } from '../i18n/useT'
import { CATEGORIES, SUTRAS } from '../assets/data/sutras'
import { getAllViewCounts } from '../utils/viewCount'
import './SutraList.css'

export default function SutraList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ALL = '__all__'
  const initialCategory = searchParams.get('category') || ALL
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const t = useT()

  const viewCounts = useMemo(() => getAllViewCounts(), [])

  const filtered = SUTRAS.filter((s) =>
    activeCategory === ALL || s.category === activeCategory
  )

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
      />

      <div className="page-content list-content">
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
                {viewCounts[s.slug] > 0 && (
                  <div className="sutra-card__views">조회 {viewCounts[s.slug].toLocaleString()}</div>
                )}
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
