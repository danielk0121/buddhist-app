import './Toolbar.css'

export default function Toolbar({ title, left, right }) {
  return (
    <header className="toolbar">
      <div className="toolbar__left">{left}</div>
      <h1 className="toolbar__title">{title}</h1>
      <div className="toolbar__right">{right}</div>
    </header>
  )
}
