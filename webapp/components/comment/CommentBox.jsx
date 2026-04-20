import { useState, useEffect } from 'react'
import { getComments, postComment, likeComment, getCommentCount } from '../../api/dummy/comment'
import './CommentBox.css'

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function CommentBox({ targetType, targetId }) {
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) getComments(targetType, targetId).then(setComments)
  }, [open, targetType, targetId])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    const c = await postComment({ targetType, targetId, authorName: name.trim() || '익명', content: text.trim() })
    setComments((prev) => [...prev, c])
    setText('')
  }

  async function handleLike(id) {
    const updated = await likeComment(id)
    if (updated) setComments((prev) => prev.map((c) => (c.id === id ? updated : c)))
  }

  return (
    <div className="comment-box">
      <button className="comment-toggle" onClick={() => setOpen((v) => !v)}>
        댓글{open ? (comments.length > 0 ? ` ${comments.length}개` : '') : (getCommentCount(targetType, targetId) > 0 ? ` ${getCommentCount(targetType, targetId)}개` : '')} {open ? '▲' : '▼'}
      </button>

      {open && (
        <div className="comment-body">
          {comments.length === 0 && <p className="comment-empty">첫 댓글을 남겨보세요.</p>}
          <ul className="comment-list">
            {comments.map((c) => (
              <li key={c.id} className="comment-item">
                <div className="comment-meta">
                  <span className="comment-author">{c.authorName}</span>
                  <span className="comment-date">{formatDate(c.createdAt)}</span>
                </div>
                <p className="comment-content">{c.content}</p>
                <button className="comment-like" onClick={() => handleLike(c.id)}>
                  ♡ {c.likes || 0}
                </button>
              </li>
            ))}
          </ul>

          <form className="comment-form" onSubmit={handleSubmit}>
            <input
              className="comment-input comment-input--name"
              type="text"
              placeholder="이름 (선택)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
            <textarea
              className="comment-input comment-input--text"
              placeholder="댓글을 입력하세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <button className="comment-submit" type="submit" disabled={!text.trim()}>
              등록
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
