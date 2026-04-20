import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Toolbar from '../components/layout/Toolbar'
import CommentBox from '../components/comment/CommentBox'
import TTSPlayer from '../components/tts/TTSPlayer'
import { useTTS } from '../context/TTSContext'
import { useT } from '../i18n/useT'
import { useDB } from '../context/DBContext'
import { SUTRAS } from '../assets/data/sutras'
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
  const t = useT()
  const sutra = SUTRAS.find((s) => s.slug === slug)
  const { getParagraphs, loading: dbLoading } = useDB()
  const paragraphs = dbLoading ? [] : getParagraphs(slug)
  const { currentIdx, speak, stop } = useTTS()

  useEffect(() => {
    return () => stop()
  }, [slug, stop])

  if (!sutra) {
    return (
      <div className="page">
        <Helmet><title>경전 없음 — 경필</title></Helmet>
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
    <div className="page page--with-tts page--no-tabbar">
      <Helmet>
        <title>{sutra.titleKo} ({sutra.titleHanja}) — 경필</title>
        <meta name="description" content={`${sutra.titleKo}, ${sutra.category}. 한문 불경을 현대 한국어 수필로 읽다.`} />
        <meta property="og:title" content={`${sutra.titleKo} (${sutra.titleHanja}) — 경필`} />
        <meta property="og:description" content={`${sutra.titleKo}, ${sutra.category}. 한문 불경을 현대 한국어 수필로 읽다.`} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Toolbar
        title={sutra.titleKo}
        left={<button className="toolbar-btn" onClick={() => navigate(-1)} aria-label="뒤로가기">←</button>}
        right={<button className="toolbar-btn" onClick={() => navigate('/settings')} aria-label={t('settings')}>{t('settings')}</button>}
      />

      <div className="page-content">
        <div className="detail-header">
          <h2 className="detail-title">{sutra.titleKo}</h2>
          <p className="detail-hanja">{sutra.titleHanja}</p>
          <p className="detail-category">{sutra.category}</p>
        </div>

        <div className="divider" />

        <div className="para-list">
          {dbLoading && <p className="empty-msg">경전 데이터 불러오는 중…</p>}
          {paragraphs.map((para) => (
            <ParagraphBlock
              key={para.id}
              para={para}
              isActive={currentIdx === para.orderIndex}
              onPlayFrom={(idx) => speak(paragraphs, idx, slug)}
            />
          ))}
        </div>

        <div className="divider" />

        <section className="sutra-comment-section">
          <h3 className="sutra-comment-title">{t('sutra_comments_title')}</h3>
          <CommentBox targetType="sutra" targetId={slug} />
        </section>

        <div className="tts-spacer" />
      </div>

      <TTSPlayer paragraphs={paragraphs} />
    </div>
  )
}
