import { useTTS } from '../../context/TTSContext'
import './TTSPlayer.css'

export default function TTSPlayer({ paragraphs }) {
  const { playing, currentIdx, speak, pause, resume, stop, prev, next } = useTTS()
  const active = currentIdx !== null

  return (
    <div className={`tts-player ${active ? 'tts-player--active' : ''}`}>
      <button
        className="tts-btn"
        onClick={prev}
        disabled={!active || currentIdx <= 0}
        aria-label="이전 단락"
      >이전</button>

      {!active ? (
        <button className="tts-btn tts-btn--play" onClick={() => speak(paragraphs, 0)} aria-label="재생">
          TTS 재생
        </button>
      ) : playing ? (
        <button className="tts-btn tts-btn--play" onClick={pause} aria-label="일시정지">일시정지</button>
      ) : (
        <button className="tts-btn tts-btn--play" onClick={resume} aria-label="계속 재생">계속</button>
      )}

      <button
        className="tts-btn"
        onClick={next}
        disabled={!active || currentIdx >= paragraphs.length - 1}
        aria-label="다음 단락"
      >다음</button>

      {active && (
        <>
          <button className="tts-btn" onClick={stop} aria-label="정지">정지</button>
          <span className="tts-info">{currentIdx + 1}/{paragraphs.length}</span>
        </>
      )}
    </div>
  )
}
