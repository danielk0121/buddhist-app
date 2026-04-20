import { useNavigate, useLocation } from 'react-router-dom'
import { useT } from '../../i18n/useT'
import './TabBar.css'

export default function TabBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const t = useT()

  const TABS = [
    { path: '/',         label: t('tab_sutra') },
    { path: '/audio',    label: t('tab_audio') },
    { path: '/settings', label: t('tab_settings') },
  ]

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
          <span className="tabbar-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
