import { useNavigate } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import { useT } from '../i18n/useT'
import './Settings.css'


export default function Settings() {
  const navigate = useNavigate()
  const { settings, set } = useSettings()
  const t = useT()

  const THEME_OPTIONS = [
    { value: 'light',  label: t('settings_theme_light') },
    { value: 'dark',   label: t('settings_theme_dark') },
    { value: 'system', label: t('settings_theme_system') },
  ]

  const FONT_OPTIONS = [
    { value: 'sm', label: t('settings_font_sm') },
    { value: 'md', label: t('settings_font_md') },
    { value: 'lg', label: t('settings_font_lg') },
  ]

  const LANG_OPTIONS = [
    { value: 'ko', label: t('settings_lang_ko') },
    { value: 'en', label: t('settings_lang_en') },
  ]

  return (
    <div className="page">
      <div className="page-content">

        <section className="settings-section">
          <h2 className="settings-section-title">{t('settings_theme')}</h2>
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
          <h2 className="settings-section-title">{t('settings_font')}</h2>
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
          <h2 className="settings-section-title">{t('settings_tts_speed')} — {settings.ttsSpeed.toFixed(1)}x</h2>
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
          <h2 className="settings-section-title">{t('settings_language')}</h2>
          <div className="option-group">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`option-btn ${settings.lang === opt.value ? 'option-btn--active' : ''}`}
                onClick={() => set('lang', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <div className="divider" />

        <section className="settings-section">
          <button className="about-link" onClick={() => navigate('/bookmarks')}>
            북마크 목록
          </button>
        </section>

        <div className="divider" />

        <section className="settings-section">
          <button className="about-link" onClick={() => navigate('/about')}>
            {t('settings_about')}
          </button>
        </section>

      </div>
    </div>
  )
}
