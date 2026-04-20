import { useNavigate, useParams } from 'react-router-dom'
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
