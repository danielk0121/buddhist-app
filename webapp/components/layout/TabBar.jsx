import { useNavigate, useLocation } from 'react-router-dom'
import './TabBar.css'

const TABS = [
  { path: '/',        label: '경전',    icon: '📖' },
  { path: '/audio',   label: '오디오북', icon: '🎧' },
  { path: '/settings', label: '설정',   icon: '⚙' },
]

export default function TabBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function isActive(path) {
    if (path === '/') return pathname === '/' || pathname === '/list' || pathname.startsWith('/sutra')
    return pathname.startsWith(path)
  }

  return (
    <nav className="tabbar">
      {TABS.map((tab) => (
        <button
          key={tab.path}
          className={`tabbar-item ${isActive(tab.path) ? 'tabbar-item--active' : ''}`}
          onClick={() => navigate(tab.path)}
          aria-label={tab.label}
        >
          <span className="tabbar-icon">{tab.icon}</span>
          <span className="tabbar-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
