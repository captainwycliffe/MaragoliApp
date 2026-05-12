import { useState, useRef } from 'react'
import { API_BASE_URL } from '../constants/api'

export default function Translate() {
  const [fromLang, setFromLang] = useState('maragoli')
  const [toLang, setToLang] = useState('english')
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef(null)

  const fromLabel = fromLang === 'maragoli' ? 'Maragoli' : 'English'
  const toLabel = toLang === 'maragoli' ? 'Maragoli' : 'English'
  const placeholder = fromLang === 'maragoli' ? 'Andika madi hano...' : 'Type your text here...'

  function swapLangs() {
    setFromLang(toLang)
    setToLang(fromLang)
    setInputText('')
    setError('')
    setResult(null)
    textareaRef.current?.focus()
  }

  async function handleTranslate() {
    if (!inputText.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    setBookmarked(false)

    try {
      const res = await fetch(`${API_BASE_URL}/api/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText.trim(), from: fromLang, to: toLang }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Translation failed. Please try again.'); return }
      setResult({
        sourceText: inputText.trim(),
        translation: data.translation,
        notes: data.notes,
        wordBreakdown: data.wordBreakdown,
        fromLang,
        toLang,
      })
    } catch {
      setError('Could not reach the server. Check your connection and API URL.')
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleTranslate()
  }

  function copyText() {
    if (!result) return
    navigator.clipboard.writeText(result.translation).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="page">
      {/* Header */}
      <div className="tr-header">
        <div>
          <h1 className="tr-title">Translate</h1>
          <p className="tr-sub">Powered by mBART-50 fine-tuned on Lulogooli Scripture corpus</p>
        </div>
      </div>

      {/* Language Bar */}
      <div className="tr-lang-bar">
        <div className="tr-lang-pill">
          <span className="tr-lang-pill-text">{fromLabel}</span>
        </div>
        <button className="tr-swap-btn" onClick={swapLangs} title="Swap languages">
          <span className="material-icons">swap_horiz</span>
        </button>
        <div className="tr-lang-pill">
          <span className="tr-lang-pill-text">{toLabel}</span>
        </div>
      </div>

      {/* Panels */}
      <div className="tr-panels">
        {/* Input Panel */}
        <div className="tr-input-panel">
          <div className="tr-input-label">ENTER {fromLabel.toUpperCase()} TEXT</div>
          <textarea
            ref={textareaRef}
            className="tr-textarea"
            placeholder={placeholder}
            value={inputText}
            onChange={e => { setInputText(e.target.value); setError('') }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="tr-input-actions">
            <span className="tr-char-count">{inputText.length} characters · Ctrl+Enter to translate</span>
            {inputText && (
              <button
                className="tr-clear-btn"
                onClick={() => { setInputText(''); setError(''); setResult(null); textareaRef.current?.focus() }}
              >
                <span className="material-icons">close</span>
                Clear
              </button>
            )}
          </div>
          {error && (
            <div className="tr-error" style={{ marginTop: 12 }}>
              <span className="material-icons">error_outline</span>
              <span className="tr-error-text">{error}</span>
            </div>
          )}
          <button
            className="btn-primary tr-btn"
            onClick={handleTranslate}
            disabled={loading || !inputText.trim()}
          >
            {loading ? <div className="spinner" /> : (
              <>
                <span className="material-icons" style={{ fontSize: 18 }}>translate</span>
                Translate
              </>
            )}
          </button>
        </div>

        {/* Result Panel */}
        <div className="tr-result-panel">
          {!result && !loading ? (
            <div className="tr-result-empty">
              <span className="material-icons">translate</span>
              <span className="tr-result-empty-text">
                {inputText ? 'Press Translate to see results' : 'Enter text on the left to begin'}
              </span>
            </div>
          ) : loading ? (
            <div className="tr-result-empty">
              <div className="spinner" style={{ borderColor: 'rgba(21,66,18,0.2)', borderTopColor: 'var(--primary)', width: 36, height: 36, borderWidth: 3 }} />
              <span className="tr-result-empty-text">Translating…</span>
            </div>
          ) : result && (
            <>
              <div className="tr-result-label">
                {result.toLang === 'maragoli' ? 'MARAGOLI' : 'ENGLISH'} TRANSLATION
              </div>
              <div className="tr-src-text">"{result.sourceText}"</div>
              <div className="tr-res-text">{result.translation}</div>

              <div className="tr-result-actions">
                <button className="tr-action-btn" onClick={copyText} title="Copy translation">
                  <span className="material-icons">{copied ? 'check' : 'content_copy'}</span>
                </button>
                <button
                  className={`tr-action-btn ${bookmarked ? 'bookmarked' : ''}`}
                  onClick={() => setBookmarked(b => !b)}
                  title="Bookmark"
                >
                  <span className="material-icons">{bookmarked ? 'bookmark' : 'bookmark_border'}</span>
                </button>
                <button className="tr-action-btn" title="Share" onClick={() => navigator.share?.({ text: result.translation })}>
                  <span className="material-icons">share</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Cultural Note */}
      {result?.notes && (
        <div className="tr-notes-card">
          <span className="material-icons">lightbulb_outline</span>
          <div>
            <div className="tr-notes-label">Cultural Note</div>
            <div className="tr-notes-text">{result.notes}</div>
          </div>
        </div>
      )}

      {/* Word Breakdown */}
      {result?.wordBreakdown?.length > 0 && (
        <div className="tr-breakdown-card" style={{ marginTop: 16 }}>
          <div className="tr-breakdown-title">Word Breakdown</div>
          {result.wordBreakdown.map((item, i) => (
            <div className="tr-bk-row" key={i}>
              <span className="tr-bk-word">{item.word}</span>
              <span className="tr-bk-meaning">{item.meaning}</span>
            </div>
          ))}
        </div>
      )}

      {/* Illustration Banner */}
      <div className="tr-illus" style={{ marginTop: 28 }}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5asvDD4TvZRfPYqXpDMGcKz8rUMTpsAiBj-11-aRGQFwtBnRGzUk5fafeLKL5xtjzuKRhnWCRTOzA40v57_3wMu-WI8S_z9Hyyq5uyoxDF6Aktp8VlNtAkyOOhaPqxLGTI3JfUfvYmOJZj24okT74kmBsXJ2JgVE3NKwZMSL2FPk2XPTvGsZhnQz4eU9Sz7r-mHnQaj3qJbXPbPvMJcMVO5gdeDLupMhynH94reb7E-TM88WrEErQJJdNyW0xqd4UiYNx2Y3ZUjo"
          alt="Translation illustration"
        />
        <div className="tr-illus-overlay">
          <span className="tr-illus-caption">Rooted in heritage, powered by AI.</span>
        </div>
      </div>
    </div>
  )
}
