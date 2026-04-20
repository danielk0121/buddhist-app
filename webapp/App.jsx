import { Routes, Route, useLocation } from 'react-router-dom'
import TabBar from './components/layout/TabBar'
import Toolbar from './components/layout/Toolbar'
import Home from './pages/Home'
import SutraList from './pages/SutraList'
import SutraDetail from './pages/SutraDetail'
import AudioBook from './pages/AudioBook'
import Settings from './pages/Settings'
import About from './pages/About'

// 공통 Toolbar + TabBar를 사용하는 탭 화면
const TAB_PATHS = ['/', '/audio', '/settings']
// 탭바를 숨기는 경로
const NO_TABBAR = ['/about']

function AppToolbar() {
  return <Toolbar title="경필 (經筆) - 경전 수필" />
}

export default function App() {
  const { pathname } = useLocation()
  const isTabPage = TAB_PATHS.includes(pathname)
  const showTabBar = !NO_TABBAR.includes(pathname)

  return (
    <>
      {isTabPage && <AppToolbar />}
      {showTabBar && <TabBar />}
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/list"        element={<SutraList />} />
        <Route path="/sutra/:slug" element={<SutraDetail />} />
        <Route path="/audio"       element={<AudioBook />} />
        <Route path="/settings"    element={<Settings />} />
        <Route path="/about"       element={<About />} />
      </Routes>
    </>
  )
}
