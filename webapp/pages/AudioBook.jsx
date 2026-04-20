import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/layout/Toolbar'
import TTSPlayer from '../components/tts/TTSPlayer'
import { useTTS } from '../context/TTSContext'
import { useT } from '../i18n/useT'
import { SUTRAS } from '../assets/data/sutras'
import { getParagraphs } from '../assets/data/paragraphs'
import './AudioBook.css'

const RECOMMENDED = ['반야심경', '금강경', '법화경', '지장경', '천수경', '법구경', '아미타경', '유마경']

export default function AudioBook() {
  const navigate = useNavigate()
  const { currentIdx, currentSlug, playing, speak, stop, paragraphs } = useTTS()

  const t = useT()
  const nowSutra = currentSlug ? SUTRAS.find((s) => s.slug === currentSlug) : null
  const nowParagraphs = currentSlug ? paragraphs.current : getParagraphs(RECOMMENDED[0])

  return (
    <div className="page page--with-tts">
      <Toolbar title={t('audio_title')} />

      <div className="page-content">

        {nowSutra && currentIdx !== null ? (
          <section className="audio-now">
            <p className="audio-now__label">{t('audio_now_playing')}</p>
            <div className="audio-now__card">
              <span className="audio-now__icon">TTS</span>
              <div className="audio-now__info">
                <p className="audio-now__title">{nowSutra.titleKo}</p>
                <p className="audio-now__sub">
                  {nowParagraphs[currentIdx]?.section ?? ''} · {playing ? '재생 중' : '일시정지'}
                </p>
              </div>
              <button className="audio-stop-btn" onClick={stop}>{t('audio_stop')}</button>
            </div>
          </section>
        ) : (
          <section className="audio-intro">
            <div className="audio-intro__icon">오디오북</div>
            <p className="audio-intro__text">{t('audio_select_prompt')}</p>
          </section>
        )}

        <section className="audio-section">
          <h2 className="audio-section-title">{t('audio_listen')}</h2>
          <ul className="audio-list">
            {RECOMMENDED.map((slug) => {
              const sutra = SUTRAS.find((s) => s.slug === slug)
              if (!sutra) return null
              const paras = getParagraphs(slug)
              const isPlaying = currentSlug === slug && currentIdx !== null
              return (
                <li key={slug}>
                  <div className={`audio-item ${isPlaying ? 'audio-item--active' : ''}`}>
                    <button
                      className="audio-item__info"
                      onClick={() => navigate(`/sutra/${slug}`)}
                    >
                      <span className="audio-item__title">{sutra.titleKo}</span>
                      <span className="audio-item__hanja">{sutra.titleHanja}</span>
                      <span className="audio-item__meta">{sutra.category} · {paras.length}단락</span>
                    </button>
                    <button
                      className="audio-item__play"
                      onClick={() => speak(paras, 0, slug)}
                      aria-label={`${sutra.titleKo} TTS 재생`}
                    >
                      {isPlaying && playing ? t('audio_pause') : t('audio_play')}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="audio-section">
          <h2 className="audio-section-title">{t('audio_guide_title')}</h2>
          <ul className="audio-guide-list">
            <li>{t('audio_guide_1')}</li>
            <li>{t('audio_guide_2')}</li>
            <li>{t('audio_guide_3')}</li>
            <li>{t('audio_guide_4')}</li>
          </ul>
        </section>

        <div className="tts-spacer" />
      </div>

      <TTSPlayer paragraphs={nowParagraphs} />
    </div>
  )
}
