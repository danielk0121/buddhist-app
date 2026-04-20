import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/layout/Toolbar'
import TTSPlayer from '../components/tts/TTSPlayer'
import { useTTS } from '../context/TTSContext'
import { useT } from '../i18n/useT'
import { SUTRAS } from '../assets/data/sutras'
import { getParagraphs } from '../assets/data/paragraphs'
import './AudioBook.css'

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

export default function AudioBook() {
  const navigate = useNavigate()
  const { currentIdx, currentSlug, playing, speak, stop, paragraphs } = useTTS()
  const t = useT()

  const nowSutra = currentSlug ? SUTRAS.find((s) => s.slug === currentSlug) : null
  const nowParagraphs = currentSlug ? paragraphs.current : getParagraphs(SUTRAS[0].slug)

  return (
    <div className="page page--with-tts">
      <Toolbar title={t('audio_title')} />

      <div className="page-content">

        {nowSutra && currentIdx !== null && (
          <section className="audio-now">
            <p className="audio-now__label">▶ {t('audio_now_playing')} — {nowSutra.titleKo}</p>
            <p className="audio-now__sub">
              {nowParagraphs[currentIdx]?.section ?? ''} · {playing ? t('audio_status_playing') : t('audio_status_paused')}
              <button className="audio-stop-btn" onClick={stop}>⏹ {t('audio_stop')}</button>
            </p>
          </section>
        )}

        <section className="home-section">
          <h2 className="home-section-title">{t('audio_listen')}</h2>
          <ul className="sutra-tile-grid">
            {SUTRAS.map((sutra, idx) => {
              const paras = getParagraphs(sutra.slug)
              const isActive = currentSlug === sutra.slug && currentIdx !== null
              return (
                <li key={sutra.id}>
                  <div className={`sutra-tile-wrap ${isActive ? 'sutra-tile-wrap--active' : ''}`}>
                    <button
                      className="sutra-tile"
                      onClick={() => navigate(`/sutra/${sutra.slug}`)}
                    >
                      <div className="sutra-tile__cover">
                        <span className="sutra-tile__cover-num">{idx + 1}</span>
                        <span className="sutra-tile__cover-symbol">{CATEGORY_EMOJI[sutra.category] ?? '經'}</span>
                        <span className="sutra-tile__cover-title">{sutra.titleKo}</span>
                      </div>
                      <div className="sutra-tile__info">
                        <span className="sutra-tile__title">{sutra.titleKo}</span>
                        <span className="sutra-tile__category">{sutra.category}</span>
                      </div>
                    </button>
                    <button
                      className="audio-tile-play-btn"
                      onClick={() => speak(paras, 0, sutra.slug)}
                      aria-label={`${sutra.titleKo} TTS 재생`}
                    >
                      {isActive && playing ? '⏸' : '▶'}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <div className="tts-spacer" />
      </div>

      <TTSPlayer paragraphs={nowParagraphs} />
    </div>
  )
}
