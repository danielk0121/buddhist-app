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
        title="경필 (經筆)"
        right={
          <button className="toolbar-btn" onClick={() => navigate('/list')} aria-label="경전 목록">
            목록
          </button>
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

        {/* 경전 타일 그리드 — 참고 이미지 기반 세로형 카드 3열 */}
        <section className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">전체 경전</h2>
            <button className="home-more-btn" onClick={() => navigate('/list')}>전체보기</button>
          </div>
          <ul className="sutra-tile-grid">
            {SUTRAS.map((sutra) => (
              <li key={sutra.id}>
                <button
                  className="sutra-tile"
                  onClick={() => navigate(`/sutra/${sutra.slug}`)}
                >
                  <div className="sutra-tile__cover">
                    <span className="sutra-tile__hanja">{sutra.titleHanja}</span>
                  </div>
                  <div className="sutra-tile__info">
                    <span className="sutra-tile__title">{sutra.titleKo}</span>
                    <span className="sutra-tile__category">{sutra.category}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  )
}
