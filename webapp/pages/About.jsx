import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/layout/Toolbar'
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

  return (
    <div className="page page--no-tabbar">
      <Toolbar
        title="개발자 정보"
        left={<button className="toolbar-btn" onClick={() => navigate(-1)} aria-label="뒤로가기">←</button>}
      />
      <div className="page-content">

        <section className="about-section about-hero">
          <div className="about-app-icon">경필</div>
          <h2 className="about-app-name">경필 (經筆)</h2>
          <p className="about-version">버전 {APP_VERSION}</p>
        </section>

        <div className="divider" />

        <section className="about-section">
          <h3 className="about-section-title">개발자</h3>
          <ul className="about-list">
            <li>이름: danielk0121</li>
            <li>GitHub: github.com/danielk0121/buddhist-app</li>
          </ul>
        </section>

        <div className="divider" />

        <section className="about-section">
          <h3 className="about-section-title">저작권 안내</h3>
          <ul className="about-list">
            <li>모든 콘텐츠는 한문·팔리어 원전(공유 저작물)을 저본으로 독립 작성한 번역·재구성물입니다.</li>
            <li>조계종·동국역경원 등 현대 번역본을 그대로 수록하지 않습니다.</li>
            <li>콘텐츠 출처: github.com/danielk0121/buddhist</li>
          </ul>
        </section>

        <div className="divider" />

        <section className="about-section">
          <h3 className="about-section-title">오픈소스 고지</h3>
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
