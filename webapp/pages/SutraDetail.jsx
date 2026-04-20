import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Toolbar from '../components/layout/Toolbar'
import { SUTRAS } from '../assets/data/sutras'
import './SutraDetail.css'

export default function SutraDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const sutra = SUTRAS.find((s) => s.slug === slug)

  if (!sutra) {
    return (
      <div className="page">
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
    <div className="page">
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
      />
      <div className="page-content">
        <div className="detail-header">
          <h2 className="detail-title">{sutra.titleKo}</h2>
          <p className="detail-hanja">{sutra.titleHanja}</p>
          <p className="detail-category">{sutra.category}</p>
        </div>
        <div className="divider" />
        <p className="detail-placeholder">
          수필 본문은 콘텐츠 데이터 연동 후 표시됩니다.
        </p>
      </div>
    </div>
  )
}
