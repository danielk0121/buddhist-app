import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../i18n/useT'
import { SUTRAS } from '../assets/data/sutras'
import { SUTRA_EMOJI } from '../assets/data/sutraEmoji'
import { getTopSlugs, getAllViewCounts } from '../utils/viewCount'
import './Home.css'

// 기본 추천 TOP 5 (조회수 없을 때)
const DEFAULT_TOP5 = ['반야심경', '금강경', '법화경', '화엄경', '지장경']

export default function Home() {
  const navigate = useNavigate()
  const t = useT()

  const top5 = useMemo(() => {
    const counts = getAllViewCounts()
    const hasCounts = Object.keys(counts).length > 0
    const slugs = hasCounts ? getTopSlugs(5) : DEFAULT_TOP5
    // 5개 미만이면 기본 추천으로 채움
    const merged = [...slugs]
    for (const s of DEFAULT_TOP5) {
      if (merged.length >= 5) break
      if (!merged.includes(s)) merged.push(s)
    }
    return merged.slice(0, 5)
      .map(slug => SUTRAS.find(s => s.slug === slug))
      .filter(Boolean)
  }, [])

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
