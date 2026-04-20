import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SutraList from './pages/SutraList'
import SutraDetail from './pages/SutraDetail'
import Settings from './pages/Settings'
import About from './pages/About'

export default function App() {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/list"        element={<SutraList />} />
      <Route path="/sutra/:slug" element={<SutraDetail />} />
      <Route path="/settings"    element={<Settings />} />
      <Route path="/about"       element={<About />} />
    </Routes>
  )
}
