import { createContext, useContext, useRef, useState, useCallback } from 'react'
import { useSettings } from './SettingsContext'

const TTSContext = createContext(null)

export function TTSProvider({ children }) {
  const { settings } = useSettings()
  const [playing, setPlaying] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(null)
  const paragraphsRef = useRef([])

  const speak = useCallback((paragraphs, idx) => {
    window.speechSynthesis.cancel()
    if (!paragraphs || idx >= paragraphs.length) {
      setPlaying(false)
      setCurrentIdx(null)
      return
    }
    paragraphsRef.current = paragraphs
    setCurrentIdx(idx)
    setPlaying(true)

    const utt = new SpeechSynthesisUtterance(paragraphs[idx].content)
    utt.lang = 'ko-KR'
    utt.rate = settings.ttsSpeed

    utt.onend = () => {
      const next = idx + 1
      if (next < paragraphsRef.current.length) {
        speak(paragraphsRef.current, next)
      } else {
        setPlaying(false)
        setCurrentIdx(null)
      }
    }
    utt.onerror = () => {
      setPlaying(false)
      setCurrentIdx(null)
    }
    window.speechSynthesis.speak(utt)
  }, [settings.ttsSpeed])

  const pause = useCallback(() => {
    window.speechSynthesis.pause()
    setPlaying(false)
  }, [])

  const resume = useCallback(() => {
    window.speechSynthesis.resume()
    setPlaying(true)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setPlaying(false)
    setCurrentIdx(null)
  }, [])

  const prev = useCallback(() => {
    if (currentIdx == null || currentIdx <= 0) return
    speak(paragraphsRef.current, currentIdx - 1)
  }, [currentIdx, speak])

  const next = useCallback(() => {
    if (currentIdx == null) return
    speak(paragraphsRef.current, currentIdx + 1)
  }, [currentIdx, speak])

  return (
    <TTSContext.Provider value={{ playing, currentIdx, speak, pause, resume, stop, prev, next }}>
      {children}
    </TTSContext.Provider>
  )
}

export function useTTS() {
  return useContext(TTSContext)
}
