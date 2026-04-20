import { useNavigate } from 'react-router-dom'
import { useT } from '../i18n/useT'
import { SUTRAS } from '../assets/data/sutras'
import { SUTRA_EMOJI } from '../assets/data/sutraEmoji'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const t = useT()

  return (
    <div className="page">
      <div className="page-content">

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
