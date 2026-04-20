import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/layout/Toolbar'
import { useSettings } from '../context/SettingsContext'
import './Settings.css'

const THEME_OPTIONS = [
  { value: 'light', label: '라이트' },
  { value: 'dark',  label: '다크' },
  { value: 'system', label: '시스템' },
]

const FONT_OPTIONS = [
  { value: 'sm', label: '작게' },
  { value: 'md', label: '보통' },
  { value: 'lg', label: '크게' },
]

export default function Settings() {
  const navigate = useNavigate()
  const { settings, set } = useSettings()

  return (
    <div className="page">
      <Toolbar
        title="설정"
        left={<button className="toolbar-btn" onClick={() => navigate(-1)} aria-label="뒤로가기">←</button>}
      />
      <div className="page-content">

        <section className="settings-section">
          <h2 className="settings-section-title">테마</h2>
          <div className="option-group">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`option-btn ${settings.theme === opt.value ? 'option-btn--active' : ''}`}
                onClick={() => set('theme', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <div className="divider" />

        <section className="settings-section">
          <h2 className="settings-section-title">글자 크기</h2>
          <div className="option-group">
            {FONT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`option-btn ${settings.fontSize === opt.value ? 'option-btn--active' : ''}`}
                onClick={() => set('fontSize', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <div className="divider" />

        <section className="settings-section">
          <h2 className="settings-section-title">TTS 속도 — {settings.ttsSpeed.toFixed(1)}x</h2>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={settings.ttsSpeed}
            onChange={(e) => set('ttsSpeed', parseFloat(e.target.value))}
            className="tts-slider"
          />
          <div className="tts-slider-labels">
            <span>0.5x</span>
            <span>2.0x</span>
          </div>
        </section>

        <div className="divider" />

        <section className="settings-section">
          <button className="about-link" onClick={() => navigate('/about')}>
            개발자 정보
          </button>
        </section>

      </div>
    </div>
  )
}
