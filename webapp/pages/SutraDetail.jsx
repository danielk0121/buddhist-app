import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Toolbar from '../components/layout/Toolbar'
import CommentBox from '../components/comment/CommentBox'
import TTSPlayer from '../components/tts/TTSPlayer'
import { useTTS } from '../context/TTSContext'
import { SUTRAS } from '../assets/data/sutras'
import { getParagraphs } from '../assets/data/paragraphs'
import './SutraDetail.css'

function ParagraphBlock({ para, isActive, onPlayFrom }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isActive])

  return (
    <div ref={ref} className={`para-block ${isActive ? 'para-block--active' : ''}`}>
      <div className="para-header">
        <h3 className="para-section">{para.section}</h3>
        <button
          className="para-tts-btn"
          onClick={() => onPlayFrom(para.orderIndex)}
          aria-label={`${para.section} TTS 재생`}
        >▶</button>
      </div>
      <div className="para-content">{para.content}</div>
      <CommentBox targetType="paragraph" targetId={para.id} />
    </div>
  )
}

export default function SutraDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const sutra = SUTRAS.find((s) => s.slug === slug)
  const paragraphs = getParagraphs(slug)
  const { currentIdx, speak, stop } = useTTS()

  useEffect(() => {
    return () => stop()
  }, [slug, stop])

  if (!sutra) {
    return (
      <div className="page">
        <Helmet><title>경전 없음 — 불경 에세이</title></Helmet>
        <Toolbar
          title="경전 없음"
          left={<button className="toolbar-btn" onClick={() => navigate(-1)}>←</button>}
        />
        <div className="page-content">
          <p className="empty-msg">경전을 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page page--with-tts">
      <Helmet>
        <title>{sutra.titleKo} ({sutra.titleHanja}) — 불경 에세이</title>
        <meta name="description" content={`${sutra.titleKo}, ${sutra.category}. 한문 불경을 현대 한국어 수필로 읽다.`} />
        <meta property="og:title" content={`${sutra.titleKo} (${sutra.titleHanja}) — 불경 에세이`} />
        <meta property="og:description" content={`${sutra.titleKo}, ${sutra.category}. 한문 불경을 현대 한국어 수필로 읽다.`} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Toolbar
        title={sutra.titleKo}
        left={<button className="toolbar-btn" onClick={() => navigate(-1)} aria-label="뒤로가기">←</button>}
        right={<button className="toolbar-btn" onClick={() => navigate('/settings')} aria-label="설정">⚙</button>}
      />

      <div className="page-content">
        <div className="detail-header">
          <h2 className="detail-title">{sutra.titleKo}</h2>
          <p className="detail-hanja">{sutra.titleHanja}</p>
          <p className="detail-category">{sutra.category}</p>
        </div>

        <div className="divider" />

        <div className="para-list">
          {paragraphs.map((para) => (
            <ParagraphBlock
              key={para.id}
              para={para}
              isActive={currentIdx === para.orderIndex}
              onPlayFrom={(idx) => speak(paragraphs, idx)}
            />
          ))}
        </div>

        <div className="divider" />

        <section className="sutra-comment-section">
          <h3 className="sutra-comment-title">경전 전체 댓글</h3>
          <CommentBox targetType="sutra" targetId={slug} />
        </section>

        <div className="tts-spacer" />
      </div>

      <TTSPlayer paragraphs={paragraphs} />
    </div>
  )
}
