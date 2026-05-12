import { useState, useEffect, useCallback } from 'react'
import { API_BASE_URL } from '../constants/api'

function PhraseCard({ phrase, bookmarked, onToggle }) {
  return (
    <div className="phrase-card">
      <div className="phrase-texts">
        <div className="phrase-maragoli">{phrase.maragoli}</div>
        <div className="phrase-english">{phrase.english}</div>
      </div>
      <button
        className={`phrase-bk-btn ${bookmarked ? 'on' : ''}`}
        onClick={onToggle}
        title={bookmarked ? 'Remove bookmark' : 'Bookmark phrase'}
      >
        <span className="material-icons">{bookmarked ? 'bookmark' : 'bookmark_border'}</span>
      </button>
    </div>
  )
}

export default function Saved() {
  const [search, setSearch] = useState('')
  const [phrases, setPhrases] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [bookmarks, setBookmarks] = useState(new Set())

  const fetchPhrases = useCallback((q) => {
    setLoading(true)
    const params = new URLSearchParams({ limit: '100' })
    if (q) params.set('q', q)
    fetch(`${API_BASE_URL}/api/phrases?${params}`)
      .then(r => r.json())
      .then(data => {
        setPhrases(data.phrases || [])
        setTotal(data.total ?? (data.phrases?.length ?? 0))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => fetchPhrases(search), search ? 300 : 0)
    return () => clearTimeout(timer)
  }, [search, fetchPhrases])

  function toggleBookmark(id) {
    setBookmarks(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const bookmarkCount = bookmarks.size

  return (
    <div className="page">
      {/* Header */}
      <div className="saved-header">
        <div>
          <h1 className="saved-title">Saved Phrases</h1>
          <p className="saved-sub">Your personal Maragoli library · {total} phrases</p>
        </div>
        {bookmarkCount > 0 && (
          <div className="badge badge-secondary">
            {bookmarkCount} bookmarked
          </div>
        )}
      </div>

      {/* Search */}
      <div className="saved-toolbar">
        <div className="saved-search">
          <span className="material-icons">search</span>
          <input
            className="saved-search-input"
            type="text"
            placeholder="Search by Maragoli or English…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="icon-btn" onClick={() => setSearch('')} style={{ marginRight: -8 }}>
              <span className="material-icons" style={{ fontSize: 18 }}>close</span>
            </button>
          )}
        </div>
        <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13, color: 'var(--outline)' }}>
          {loading ? '…' : `${phrases.length} result${phrases.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
          <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
        </div>
      ) : phrases.length > 0 ? (
        <div className="saved-grid">
          {phrases.map((phrase) => (
            <PhraseCard
              key={phrase.id ?? phrase.maragoli}
              phrase={phrase}
              bookmarked={bookmarks.has(phrase.id ?? phrase.maragoli)}
              onToggle={() => toggleBookmark(phrase.id ?? phrase.maragoli)}
            />
          ))}
        </div>
      ) : (
        <div className="saved-empty">{search ? `No phrases match "${search}"` : 'No phrases found.'}</div>
      )}

      {/* Daily Goal Card */}
      <div className="goal-card">
        <div className="goal-content">
          <div className="goal-badge">
            <span className="goal-badge-text">Daily Goal</span>
          </div>
          <div className="goal-title">Practice 5 More Phrases</div>
          <div className="goal-sub">Keep your streak alive and master the dialect.</div>
          <button className="goal-practice-btn">Practice Now</button>
        </div>
        <div className="goal-stat-pills">
          <div className="goal-pill">
            <div className="goal-pill-val">7</div>
            <div className="goal-pill-lbl">Day streak</div>
          </div>
          <div className="goal-pill">
            <div className="goal-pill-val">34</div>
            <div className="goal-pill-lbl">Phrases learnt</div>
          </div>
        </div>
        <div className="goal-decor">
          <span className="material-icons">translate</span>
        </div>
      </div>
    </div>
  )
}
