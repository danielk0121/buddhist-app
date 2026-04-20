import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/layout/Toolbar'
import { CATEGORIES, SUTRAS } from '../assets/data/sutras'
import './Home.css'

const TOP_SLUGS = ['반야심경', '금강경', '법화경', '지장경', '천수경']

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <Toolbar
        title="불경 에세이"
        right={
          <div className="toolbar-actions">
            <button className="toolbar-btn" onClick={() => navigate('/list')} aria-label="경전 목록">☰</button>
            <button className="toolbar-btn" onClick={() => navigate('/settings')} aria-label="설정">⚙</button>
          </div>
        }
      />
      <div className="page-content">

        <section className="home-section">
          <h2 className="home-section-title">인기 경전 TOP 5</h2>
          <ul className="top-list">
            {TOP_SLUGS.map((slug, i) => {
              const sutra = SUTRAS.find((s) => s.slug === slug)
              if (!sutra) return null
              return (
                <li key={slug}>
                  <button className="top-item" onClick={() => navigate(`/sutra/${slug}`)}>
                    <span className="top-rank">{i + 1}</span>
                    <span className="top-title">{sutra.titleKo}</span>
                    <span className="top-hanja">{sutra.titleHanja}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="home-section">
          <h2 className="home-section-title">계열별 경전</h2>
          <ul className="category-list">
            {CATEGORIES.map((cat) => {
              const count = SUTRAS.filter((s) => s.category === cat).length
              return (
                <li key={cat}>
                  <button
                    className="category-item"
                    onClick={() => navigate(`/list?category=${encodeURIComponent(cat)}`)}
                  >
                    <span className="category-name">{cat}</span>
                    <span className="category-count">{count}종</span>
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
