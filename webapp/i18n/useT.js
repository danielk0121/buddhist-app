import { useSettings } from '../context/SettingsContext'
import translations from './translations'

export function useT() {
  const { settings } = useSettings()
  const lang = settings.lang ?? 'ko'
  const dict = translations[lang] ?? translations.ko
  return (key) => dict[key] ?? key
}
