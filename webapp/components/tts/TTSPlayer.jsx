import { useTTS } from '../../context/TTSContext'
import { useT } from '../../i18n/useT'
import './TTSPlayer.css'

export default function TTSPlayer({ paragraphs }) {
  const { playing, currentIdx, speak, pause, resume, stop, prev, next } = useTTS()
  const t = useT()
  const active = currentIdx !== null

  return (
    <div className={`tts-player ${active ? 'tts-player--active' : ''}`}>
      <button
        className="tts-btn"
        onClick={prev}
        disabled={!active || currentIdx <= 0}
        aria-label="이전 단락"
      >{t('audio_prev')}</button>

      {!active ? (
        <button className="tts-btn tts-btn--play" onClick={() => speak(paragraphs, 0)} aria-label={t('audio_tts_play')}>
          {t('audio_tts_play')}
        </button>
      ) : playing ? (
        <button className="tts-btn tts-btn--play" onClick={pause} aria-label={t('audio_pause')}>{t('audio_pause')}</button>
      ) : (
        <button className="tts-btn tts-btn--play" onClick={resume} aria-label={t('audio_resume')}>{t('audio_resume')}</button>
      )}

      <button
        className="tts-btn"
        onClick={next}
        disabled={!active || currentIdx >= paragraphs.length - 1}
        aria-label={t('audio_next')}
      >{t('audio_next')}</button>

      {active && (
        <>
          <button className="tts-btn" onClick={stop} aria-label={t('audio_stop')}>{t('audio_stop')}</button>
          <span className="tts-info">{currentIdx + 1}/{paragraphs.length}</span>
        </>
      )}
    </div>
  )
}
