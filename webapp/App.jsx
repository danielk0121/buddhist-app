import { Routes, Route, useLocation } from 'react-router-dom'
import TabBar from './components/layout/TabBar'
import Home from './pages/Home'
import SutraList from './pages/SutraList'
import SutraDetail from './pages/SutraDetail'
import AudioBook from './pages/AudioBook'
import Settings from './pages/Settings'
import About from './pages/About'

// 탭바를 숨기는 경로 (상세 화면 등)
const NO_TABBAR = ['/about']

export default function App() {
  const { pathname } = useLocation()
  const showTabBar = !NO_TABBAR.includes(pathname)

  return (
    <>
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
