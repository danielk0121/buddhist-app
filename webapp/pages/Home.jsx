import { useNavigate } from 'react-router-dom'
import { useT } from '../i18n/useT'
import { SUTRAS } from '../assets/data/sutras'
import { SUTRA_EMOJI } from '../assets/data/sutraEmoji'
import './Home.css'

// 초기 추천 TOP 5 (slug 기준)
const TOP5_SLUGS = ['반야심경', '금강경', '법화경', '화엄경', '지장경']

export default function Home() {
  const navigate = useNavigate()
  const t = useT()

  const top5 = TOP5_SLUGS
    .map(slug => SUTRAS.find(s => s.slug === slug))
    .filter(Boolean)

  return (
    <div className="page">
      <div className="page-content">

        <section className="home-section">
          <h2 className="home-section-title">인기 경전 TOP 5</h2>
          <div className="top5-banner">
            {top5.map((sutra, idx) => (
              <button
                key={sutra.id}
                className="top5-card"
                onClick={() => navigate(`/sutra/${sutra.slug}`)}
              >
                <span className="top5-card__rank">{idx + 1}</span>
                <span className="top5-card__emoji">{SUTRA_EMOJI[sutra.slug] ?? '📄'}</span>
                <span className="top5-card__title">{sutra.titleKo}</span>
                <span className="top5-card__hanja">{sutra.titleHanja}</span>
                <span className="top5-card__category">{sutra.category}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-section-title">{t('home_all_sutras')}</h2>
          <ul className="sutra-tile-grid">
            {SUTRAS.map((sutra, idx) => (
              <li key={sutra.id}>
                <button
                  className="sutra-tile"
                  onClick={() => navigate(`/sutra/${sutra.slug}`)}
                >
                  <div className="sutra-tile__cover">
                    <span className="sutra-tile__cover-num">{idx + 1}</span>
                    <span className="sutra-tile__cover-symbol">{SUTRA_EMOJI[sutra.slug] ?? '📄'}</span>
                    <span className="sutra-tile__cover-title">{sutra.titleKo}</span>
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
