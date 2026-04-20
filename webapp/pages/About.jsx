import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/layout/Toolbar'
import { useT } from '../i18n/useT'
import './About.css'

const APP_VERSION = '0.1.0'

const OPEN_SOURCE_LIBS = [
  { name: 'React',           version: '18.3.1',  license: 'MIT' },
  { name: 'React Router',    version: '6.28.0',  license: 'MIT' },
  { name: 'Vite',            version: '6.0.5',   license: 'MIT' },
  { name: '@vitejs/plugin-react', version: '4.3.4', license: 'MIT' },
]

export default function About() {
  const navigate = useNavigate()
  const t = useT()

  return (
    <div className="page page--no-tabbar">
      <Toolbar
        title={t('about_title')}
        left={<button className="toolbar-btn" onClick={() => navigate(-1)} aria-label={t('back')}>←</button>}
      />
      <div className="page-content">

        <section className="about-section about-hero">
          <div className="about-app-icon">경필</div>
          <h2 className="about-app-name">{t('appName')}</h2>
          <p className="about-version">{t('about_version')} {APP_VERSION}</p>
        </section>

        <div className="divider" />

        <section className="about-section">
          <h3 className="about-section-title">{t('about_developer')}</h3>
          <ul className="about-list">
            <li>danielk0121</li>
            <li>GitHub: github.com/danielk0121/buddhist-app</li>
          </ul>
        </section>

        <div className="divider" />

        <section className="about-section">
          <h3 className="about-section-title">{t('about_copyright')}</h3>
          <ul className="about-list">
            <li>{t('about_copyright_1')}</li>
            <li>{t('about_copyright_2')}</li>
            <li>{t('about_copyright_3')}</li>
          </ul>
        </section>

        <div className="divider" />

        <section className="about-section">
          <h3 className="about-section-title">{t('about_opensource')}</h3>
          <ul className="about-list opensource-list">
            {OPEN_SOURCE_LIBS.map((lib) => (
              <li key={lib.name} className="opensource-item">
                <span className="opensource-name">{lib.name} v{lib.version}</span>
                <span className="opensource-license">{lib.license}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  )
}
