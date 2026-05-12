const CACHED = [
  { id: 1, english: 'Good Morning', maragoli: 'Mirembe' },
  { id: 2, english: 'How are you doing today?', maragoli: 'Muli muli muno?' },
  { id: 3, english: 'Thank you very much', maragoli: 'Asante muno' },
]

export default function Offline() {
  return (
    <div className="page">
      <div className="offline-header">
        <h1 className="offline-title">Offline Mode</h1>
        <p className="offline-sub">Cached translations and limited features available without internet.</p>
      </div>

      {/* Banner */}
      <div className="offline-banner">
        <div className="off-banner-icon">
          <span className="material-icons">signal_wifi_off</span>
        </div>
        <div>
          <div className="off-banner-title">Offline Mode Active</div>
          <div className="off-banner-sub">
            You're currently disconnected. Voice and real-time AI features are unavailable —
            only cached translations and phrase lookup are supported.
          </div>
        </div>
      </div>

      <div className="offline-layout">
        {/* Left: main content */}
        <div>
          {/* Translation card (disabled) */}
          <div className="offline-trans-card">
            <div className="off-lang-row">
              <button className="off-lang-btn">
                <span>English</span>
                <span className="material-icons">expand_more</span>
              </button>
              <span className="material-icons">swap_horiz</span>
              <button className="off-lang-btn">
                <span>Lulogooli</span>
                <span className="material-icons">expand_more</span>
              </button>
            </div>
            <div className="offline-empty">
              <span className="material-icons">edit</span>
              <div className="offline-empty-title">Enter text to translate</div>
              <div className="offline-empty-sub">Available for offline Maragoli dictionary</div>
            </div>
          </div>

          {/* Limited features */}
          <div className="off-limited-grid" style={{ marginTop: 20 }}>
            <div className="off-limited-card">
              <span className="material-icons">mic</span>
              <div>
                <div className="off-lc-title">Voice Input</div>
                <div className="off-lc-sub">Connection required for voice recognition and processing.</div>
              </div>
            </div>
            <div className="off-limited-card">
              <span className="material-icons">photo_camera</span>
              <div>
                <div className="off-lc-title">Camera Translation</div>
                <div className="off-lc-sub">Visual translation unavailable in offline mode.</div>
              </div>
            </div>
            <div className="off-limited-card">
              <span className="material-icons">psychology</span>
              <div>
                <div className="off-lc-title">AI Translation</div>
                <div className="off-lc-sub">mBART-50 model requires server connection.</div>
              </div>
            </div>
            <div className="off-limited-card">
              <span className="material-icons">volunteer_activism</span>
              <div>
                <div className="off-lc-title">Contributions</div>
                <div className="off-lc-sub">Phrase submissions require an internet connection.</div>
              </div>
            </div>
          </div>

          {/* Cached translations */}
          <div className="cached-section" style={{ marginTop: 28 }}>
            <div className="cached-hdr">
              <div className="cached-title">Cached Translations</div>
              <div className="cached-label">RECENT</div>
            </div>
            <div className="cached-list">
              {CACHED.map(item => (
                <div className="cache-card" key={item.id}>
                  <div className="cache-content">
                    <div className="cache-lang">English</div>
                    <div className="cache-src">{item.english}</div>
                    <div className="cache-div" />
                    <div className="cache-lang">Lulogooli</div>
                    <div className="cache-res">{item.maragoli}</div>
                  </div>
                  <span className="material-icons">bookmark</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="offline-sidebar">
          <div className="dl-card">
            <div className="dl-img-wrap">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuArvaJz-PoXpuhE_qEOXYhrqsa469Qu_29pxj4sv8RIP4hSX0S1OqzCDA_O46gIsFnoOfUcc-HifYLT6I_rV58agzb0EFxH7Yb2Mar0EzjxJc_1aNlrhr0u6ceWJUUGGNCCADjnAZcRnCckRRTojLWe46Z_mhyNl0aDkMhfZ-bSLWPTp7fU_7ecsC4v5dj7tdlrkawBy8y08lNIr4TwgVo-6GUpiU4zaXIfF7xPN6rBV6F8A7am97mq49hH-HBwZV6AgVixFmYMDLQ"
                alt="offline language pack"
              />
            </div>
            <div className="dl-text">
              Download the full Lulogooli language pack to translate 2,000+ words offline without any internet connection.
            </div>
            <button className="dl-btn">
              <span className="material-icons">file_download</span>
              GET LANGUAGE PACK
            </button>
          </div>

          {/* Info card */}
          <div className="community-card">
            <div className="community-card-title">What's Available Offline</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              {[
                { icon: 'check_circle', text: 'Cached phrase lookup', ok: true },
                { icon: 'check_circle', text: 'Saved phrases library', ok: true },
                { icon: 'check_circle', text: 'Word of the Day', ok: true },
                { icon: 'cancel', text: 'AI translation', ok: false },
                { icon: 'cancel', text: 'Voice & camera', ok: false },
                { icon: 'cancel', text: 'Community contributions', ok: false },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="material-icons" style={{ fontSize: 18, color: f.ok ? 'var(--primary)' : 'var(--outline)' }}>
                    {f.icon}
                  </span>
                  <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13, color: f.ok ? 'var(--on-surface)' : 'var(--on-surface-variant)', opacity: f.ok ? 1 : 0.6 }}>
                    {f.text}
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
