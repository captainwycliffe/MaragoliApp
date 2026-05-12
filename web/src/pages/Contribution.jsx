import { useState } from 'react'
import { API_BASE_URL } from '../constants/api'

export default function Contribution() {
  const [maragoliPhrase, setMaragoliPhrase] = useState('')
  const [englishTranslation, setEnglishTranslation] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/contribute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maragoli: maragoliPhrase.trim(), english: englishTranslation.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Submission failed. Please try again.'); return }
      setShowSuccess(true)
      setMaragoliPhrase('')
      setEnglishTranslation('')
    } catch {
      setError('Could not reach the server. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="contrib-layout">
        {/* Main Form */}
        <div>
          <div className="contrib-hero">
            <h1 className="contrib-hero-title">Share Your Knowledge</h1>
            <p className="contrib-hero-sub">
              Help preserve the Maragoli language by contributing phrases to our
              community dictionary. Every entry helps train a better AI model.
            </p>
          </div>

          <form className="contrib-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label">Maragoli Phrase</label>
              <input
                className="field-input"
                type="text"
                placeholder="e.g. Mulembe muno"
                value={maragoliPhrase}
                onChange={e => setMaragoliPhrase(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label className="field-label">English Translation</label>
              <input
                className="field-input"
                type="text"
                placeholder="e.g. Good morning"
                value={englishTranslation}
                onChange={e => setEnglishTranslation(e.target.value)}
              />
            </div>

            {/* Voice Recording */}
            <div className="voice-card">
              <div className="voice-left">
                <div className="voice-title">Voice Recording</div>
                <div className="voice-sub">Optional: Add audio for pronunciation guidance</div>
              </div>
              <button type="button" className="mic-btn" title="Record audio">
                <span className="material-icons">mic</span>
              </button>
            </div>
            <div className="voice-prog">
              <div className="voice-fill" />
            </div>

            {/* Submit */}
            <div style={{ paddingTop: 8 }}>
              <button
                type="submit"
                className="btn-primary submit-btn"
                disabled={loading || !maragoliPhrase.trim() || !englishTranslation.trim()}
              >
                {loading ? <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff', width: 20, height: 20, borderWidth: 2 }} /> : (
                  <>
                    Submit Contribution
                    <span className="material-icons" style={{ fontSize: 22 }}>send</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="tr-error" style={{ marginTop: 12 }}>
                <span className="material-icons">error_outline</span>
                <span className="tr-error-text">{error}</span>
              </div>
            )}

            {showSuccess && (
              <div className="success-banner">
                <div className="success-icon">
                  <span className="material-icons">check</span>
                </div>
                <div>
                  <div className="success-title">Asante sana!</div>
                  <div className="success-body">
                    Your contribution has been saved and is being reviewed by the community.
                    Thank you for helping preserve Maragoli.
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Sidebar */}
        <div className="contrib-sidebar">
          {/* Community Card */}
          <div className="community-card">
            <div className="community-card-title">Join the Community</div>
            <div className="avatar-stack">
              <img
                className="comm-av"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLzyu4Q6JVmGK6aUMT5T8JrQWTW7CFGdpOlHy9vI_XdBOBdSDR68qGR7JAUbjGn85LJ-mUAYU7vfzxAqx8Z7z2qRsi2hYclD2cd7DOR9dEMsZ3Zs2QKZbt-BBCgkhXaov28qAiKB1zNUifZCfgrrKJYbSez1U1Lwto8yEuNKXPxDPCALsCD-Sb2VBJhiSc80Xg0m1hWDIuBEVGP7sjAvd93Fy5A-AVKvhebPFRw--nZpCVVp3Qqkjgma9kJQqxJjn98hnUh8dsSiU"
                alt="contributor"
              />
              <img
                className="comm-av"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWHCwfp3hEg4GN5AS8wZ3XUkqOcZWW0wg-p5BivWgOKujG7NQtm7Ta9VoPXtitU9pPl33fX-n52N6BgaKdIxueQsk4CPfpblDQjpuNSzCGz4ZDzw79fxI0JKSI6ZjwCKbtNJ8Eo8r7pHm3dhMcLJXFqfVxgraYjDB52Jg2AZ7eJ9QiYQVlmexAGgetfa433P1-sErimGcqMt5Kvmwx_xiVtF54bwz2j9grssVh-hEzhYLgxyA6JEgoJK09lyn0ePEH855YiCdeVdw"
                alt="contributor"
              />
              <div className="comm-av-extra">
                <span>+8k</span>
              </div>
            </div>
            <p className="community-text">
              Join 8,421 contributors helping preserve the Logooli dialect for future generations.
            </p>
          </div>

          {/* Tip Card */}
          <div className="contrib-tip-card">
            <div className="contrib-tip-label">Contribution Tips</div>
            <p className="contrib-tip-text">
              Focus on everyday conversational phrases, greetings, and culturally significant
              expressions. Avoid overly literal translations — natural phrasing is valued most.
            </p>
          </div>

          {/* Stats Card */}
          <div className="community-card">
            <div className="community-card-title">Dataset Progress</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
              {[
                { label: 'Total phrases', value: '2,000+' },
                { label: 'Reviewed pairs', value: '1,596' },
                { label: 'BLEU score', value: '14.82' },
                { label: 'Model checkpoint', value: 'Epoch 13' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13, color: 'var(--on-surface-variant)' }}>
                    {s.label}
                  </span>
                  <span style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
