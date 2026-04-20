import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SettingsProvider } from './context/SettingsContext'
import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
