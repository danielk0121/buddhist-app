import { createContext, useContext, useReducer, useEffect } from 'react'

const SettingsContext = createContext(null)

const STORAGE_KEY = 'bh_settings'

const defaults = {
  theme: 'light',   // 'light' | 'dark' | 'system'
  fontSize: 'md',   // 'sm' | 'md' | 'lg'
  ttsSpeed: 1.0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET': return { ...state, [action.key]: action.value }
    case 'RESET': return defaults
    default: return state
  }
}

const fontScaleMap = { sm: 0.9, md: 1, lg: 1.15 }

function resolveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

export function SettingsProvider({ children }) {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  const [settings, dispatch] = useReducer(reducer, { ...defaults, ...saved })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    const resolved = resolveTheme(settings.theme)
    document.documentElement.setAttribute('data-theme', resolved)
    document.documentElement.style.setProperty('--font-scale', fontScaleMap[settings.fontSize])
  }, [settings])

  const set = (key, value) => dispatch({ type: 'SET', key, value })

  return (
    <SettingsContext.Provider value={{ settings, set }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
