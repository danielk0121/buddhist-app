import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Toolbar from '../components/layout/Toolbar'
import { signIn } from '../api/dummy/auth'
import { useT } from '../i18n/useT'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const t = useT()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate(-1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page--no-tabbar">
      <Helmet>
        <title>로그인 — 경필</title>
      </Helmet>
      <Toolbar
        title="로그인"
        left={<button className="toolbar-btn" onClick={() => navigate(-1)} aria-label={t('back')}>←</button>}
      />
      <div className="page-content login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            이메일
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              autoComplete="email"
              required
            />
          </label>
          <label className="login-label">
            비밀번호
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? '로그인 중…' : '로그인'}
          </button>
        </form>
        <p className="login-notice">현재는 더미 로그인입니다. 어떤 이메일/비밀번호나 사용할 수 있습니다.</p>
      </div>
    </div>
  )
}
