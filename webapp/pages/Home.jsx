import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/layout/Toolbar'
import { useT } from '../i18n/useT'
import { SUTRAS } from '../assets/data/sutras'
import './Home.css'

const CATEGORY_EMOJI = {
  '반야 계열':       '般',
  '법화 계열':       '法',
  '화엄 계열':       '華',
  '정토경전':        '淨',
  '여래장·유식 계열': '如',
  '대승 집성':       '大',
  '재가·효 계열':    '孝',
  '보살계·계율':     '戒',
  '지장·약사 계열':  '藥',
  '미륵 계열':       '彌',
  '밀교경전':        '密',
  '의식·다라니':     '陀',
  '아함경전':        '阿',
  '팔리어·아함':     '巴',
  '팔리어 경전':     '巴',
}

export default function Home() {
  const navigate = useNavigate()
  const t = useT()

  return (
    <div className="page">
      <Toolbar
        title="경필 (經筆)"
        right={
          <button className="toolbar-btn toolbar-btn--menu" onClick={() => navigate('/list')} aria-label="경전 목록">
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        }
      />
      <div className="page-content">

        <section className="home-section">
          <h2 className="home-section-title">{t('home_all_sutras')}</h2>
          <ul className="sutra-tile-grid">
            {SUTRAS.map((sutra) => (
              <li key={sutra.id}>
                <button
                  className="sutra-tile"
                  onClick={() => navigate(`/sutra/${sutra.slug}`)}
                >
                  <div className="sutra-tile__cover">
                    <span className="sutra-tile__cover-symbol">{CATEGORY_EMOJI[sutra.category] ?? '經'}</span>
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
