import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/layout/Toolbar'
import { CATEGORIES, SUTRAS } from '../assets/data/sutras'
import './Home.css'

const TOP_SLUGS = ['반야심경', '금강경', '법화경', '지장경', '천수경']

// 계열별 대표 아이콘
const CATEGORY_ICON = {
  '반야 계열':      '🔷',
  '법화 계열':      '🌸',
  '화엄 계열':      '🌐',
  '정토경전':       '🪷',
  '여래장·유식 계열': '💎',
  '대승 집성':      '📚',
  '재가·효 계열':   '🏠',
  '보살계·계율':    '⚖️',
  '지장·약사 계열': '🌿',
  '미륵 계열':      '🌅',
  '밀교경전':       '🔯',
  '의식·다라니':    '🔔',
  '아함경전':       '📜',
  '팔리어·아함':    '🌴',
  '팔리어 경전':    '🌏',
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <Toolbar
        title="경필 (經筆)"
        right={
          <button className="toolbar-btn" onClick={() => navigate('/list')} aria-label="경전 목록">☰</button>
        }
      />
      <div className="page-content">

        {/* 인기 경전 TOP 5 — 가로 스크롤 카드 */}
        <section className="home-section">
          <h2 className="home-section-title">인기 경전 TOP 5</h2>
          <ul className="top-scroll">
            {TOP_SLUGS.map((slug, i) => {
              const sutra = SUTRAS.find((s) => s.slug === slug)
              if (!sutra) return null
              return (
                <li key={slug}>
                  <button className="top-card" onClick={() => navigate(`/sutra/${slug}`)}>
                    <span className="top-card__rank">{i + 1}</span>
                    <span className="top-card__title">{sutra.titleKo}</span>
                    <span className="top-card__hanja">{sutra.titleHanja}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        {/* 계열별 경전 — 2열 타일 그리드 */}
        <section className="home-section">
          <h2 className="home-section-title">계열별 경전</h2>
          <ul className="category-grid">
            {CATEGORIES.map((cat) => {
              const count = SUTRAS.filter((s) => s.category === cat).length
              return (
                <li key={cat}>
                  <button
                    className="category-tile"
                    onClick={() => navigate(`/list?category=${encodeURIComponent(cat)}`)}
                  >
                    <span className="category-tile__icon">{CATEGORY_ICON[cat] ?? '📖'}</span>
                    <span className="category-tile__name">{cat}</span>
                    <span className="category-tile__count">{count}종</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

      </div>
    </div>
  )
}
