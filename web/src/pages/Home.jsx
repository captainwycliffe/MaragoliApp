import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page">
      {/* Header */}
      <div className="home-header">
        <div>
          <h1 className="home-greeting">Habari, Vuguvugu</h1>
          <p className="home-greeting-sub">Welcome back — keep building your Maragoli mastery.</p>
        </div>
        <div className="home-level-badge">
          <div className="home-level-val">Level 4</div>
          <div className="home-level-sub">Mastery Path</div>
        </div>
      </div>

      {/* Main grid */}
      <div className="home-grid">
        <div className="home-left">
          {/* Primary Translation Card */}
          <button className="primary-card" onClick={() => navigate('/translate')}>
            <div className="pc-icon-circle">
              <span className="material-icons">translate</span>
            </div>
            <div className="pc-title">Text Translation</div>
            <div className="pc-sub">Translate words and sentences instantly between Maragoli and English.</div>
            <div className="pc-cta">
              <span className="pc-cta-text">START TYPING</span>
              <span className="material-icons">arrow_forward</span>
            </div>
          </button>

          {/* Secondary cards row */}
          <div className="home-cards-row">
            <button className="home-sec-card" onClick={() => navigate('/saved')}>
              <div className="hsc-icon">
                <span className="material-icons">bookmark</span>
              </div>
              <div>
                <div className="hsc-title">Saved Phrases</div>
                <div className="hsc-sub">Browse and search your personal Maragoli phrase library.</div>
              </div>
            </button>

            <button className="home-sec-card" onClick={() => navigate('/offline')}>
              <div className="hsc-icon" style={{ background: 'rgba(194,201,187,0.4)' }}>
                <span className="material-icons" style={{ color: 'var(--outline)' }}>cloud_off</span>
              </div>
              <div>
                <div className="hsc-title">Offline Mode</div>
                <div className="hsc-sub">Access cached translations without an internet connection.</div>
              </div>
            </button>
          </div>

          {/* Contribute Card */}
          <button className="home-contrib-card" onClick={() => navigate('/contribution')}>
            <div className="hcc-icon-box">
              <span className="material-icons">volunteer_activism</span>
            </div>
            <div className="hcc-texts">
              <div className="hcc-title">Contribute Data</div>
              <div className="hcc-sub">
                Help improve our Maragoli AI engine by contributing your local knowledge and phrases.
              </div>
            </div>
            <span className="material-icons">chevron_right</span>
          </button>
        </div>

        {/* Word of the Day */}
        <div className="wotd-card">
          <div className="wotd-decor">
            <span className="material-icons">auto_stories</span>
          </div>
          <div className="wotd-inner">
            <div className="wotd-label-row">
              <span className="material-icons">auto_stories</span>
              <span className="wotd-label">Word of the Day</span>
            </div>

            <div className="wotd-word">Zimbavasi</div>
            <div className="wotd-meaning">Mercy</div>
            <div className="wotd-divider" />
            <div className="wotd-desc">
              "Zimbavasi" expresses the concept of mercy and compassion in Maragoli — a value central
              to Lulogooli culture and passed down through generations in proverbs, songs, and daily life.
            </div>

            <div style={{ marginTop: 28 }}>
              <div className="wotd-label-row" style={{ marginBottom: 8 }}>
                <span className="wotd-label">Example</span>
              </div>
              <div style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 600, fontSize: 16, color: 'var(--primary)', marginBottom: 4 }}>
                Zimbavasi zizie ziveeye ku makura namakura.
              </div>
              <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: 'var(--on-surface-variant)', fontStyle: 'italic' }}>
                His mercy is from generation to generation.
              </div>
            </div>

            <div className="wotd-divider" />
            <div className="wotd-footer">
              <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: 'var(--outline)' }}>
                Updated daily
              </span>
              <button className="wotd-explore-btn" onClick={() => navigate('/translate')}>
                Translate it →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
