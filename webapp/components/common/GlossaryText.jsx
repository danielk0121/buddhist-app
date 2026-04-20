import { useState, useCallback } from 'react'
import './GlossaryText.css'

// 본문 텍스트에서 사전 용어를 찾아 툴팁 스팬으로 감싸 렌더링
export default function GlossaryText({ text, glossary }) {
  const [active, setActive] = useState(null)

  const terms = Object.keys(glossary)

  const handleToggle = useCallback((term, e) => {
    e.stopPropagation()
    setActive((prev) => (prev === term ? null : term))
  }, [])

  if (!terms.length) return <span>{text}</span>

  // 용어를 긴 것 우선으로 정렬해 중복 매칭 방지
  const sorted = [...terms].sort((a, b) => b.length - a.length)
  const pattern = new RegExp(`(${sorted.map(escapeRe).join('|')})`, 'g')

  const parts = text.split(pattern)

  return (
    <span onClick={() => setActive(null)}>
      {parts.map((part, i) => {
        if (glossary[part]) {
          return (
            <span key={i} className="glossary-term" onClick={(e) => handleToggle(part, e)}>
              {part}
              {active === part && (
                <span className="glossary-tooltip" role="tooltip">
                  <strong>{part}</strong>
                  <span>{glossary[part]}</span>
                </span>
              )}
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
