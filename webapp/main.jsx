import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SettingsProvider } from './context/SettingsContext'
import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>
)
