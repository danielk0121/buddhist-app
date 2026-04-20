import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/layout/Toolbar'
import { CATEGORIES, SUTRAS } from '../assets/data/sutras'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <Toolbar
        title="불경 에세이"
        right={
          <button className="toolbar-btn" onClick={() => navigate('/list')} aria-label="경전 목록">
            ☰
          </button>
        }
      />
      <div className="page-content">
        <section className="home-categories">
          <h2 className="home-section-title">계열별 경전</h2>
          <ul className="category-list">
            {CATEGORIES.map((cat) => {
              const count = SUTRAS.filter((s) => s.category === cat).length
              return (
                <li key={cat}>
                  <button
                    className="category-item"
                    onClick={() => navigate(`/list?category=${encodeURIComponent(cat)}`)}
                  >
                    <span className="category-name">{cat}</span>
                    <span className="category-count">{count}종</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}
