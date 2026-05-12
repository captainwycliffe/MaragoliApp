import { useState } from 'react'

function Toggle({ on, onToggle }) {
  return (
    <button className={`toggle ${on ? 'on' : ''}`} onClick={onToggle} type="button">
      <div className="toggle-thumb" />
    </button>
  )
}

function SettingsRow({ icon, title, subtitle, right, onClick }) {
  return (
    <button className="settings-row" onClick={onClick} type="button">
      <div className="sr-left">
        <div className="sr-icon">
          <span className="material-icons">{icon}</span>
        </div>
        <div>
          <div className="sr-title">{title}</div>
          <div className="sr-sub">{subtitle}</div>
        </div>
      </div>
      {right}
    </button>
  )
}

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [offlineMode, setOfflineMode] = useState(true)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="page">
      {/* Profile Hero */}
      <div className="settings-profile-card">
        <div className="spc-text">
          <div className="spc-title">Manage Preferences</div>
          <div className="spc-sub">
            Customize your Maragoli Translate experience. Adjust language settings, appearance,
            offline capabilities, and more from this panel.
          </div>
        </div>
        <div className="spc-icon">
          <span className="material-icons">person</span>
        </div>
      </div>

      <div className="settings-layout">
        {/* General Preferences */}
        <div className="settings-group">
          <div className="settings-group-title">General Preferences</div>

          <SettingsRow
            icon="language"
            title="Language"
            subtitle="Luluhya (Maragoli)"
            right={<span className="material-icons">chevron_right</span>}
          />
          <SettingsRow
            icon="dark_mode"
            title="Dark Mode"
            subtitle={darkMode ? 'Currently on' : 'Currently off'}
            right={<Toggle on={darkMode} onToggle={() => setDarkMode(v => !v)} />}
          />
          <SettingsRow
            icon="download_done"
            title="Offline Translation"
            subtitle="Download language packs for offline use"
            right={<Toggle on={offlineMode} onToggle={() => setOfflineMode(v => !v)} />}
          />
          <SettingsRow
            icon="notifications"
            title="Word of the Day"
            subtitle="Daily notification with a new Maragoli word"
            right={<Toggle on={notifications} onToggle={() => setNotifications(v => !v)} />}
          />
        </div>

        {/* About App */}
        <div className="settings-group">
          <div className="settings-group-title">About App</div>

          <SettingsRow
            icon="info_outline"
            title="Privacy Policy"
            subtitle="How we handle your data"
            right={<span className="material-icons">open_in_new</span>}
          />
          <SettingsRow
            icon="contact_support"
            title="Help & Support"
            subtitle="Get assistance and FAQs"
            right={<span className="material-icons">chevron_right</span>}
          />
          <SettingsRow
            icon="star_rate"
            title="Rate the App"
            subtitle="Share your feedback with us"
            right={<span className="material-icons">open_in_new</span>}
          />
          <SettingsRow
            icon="code"
            title="Version"
            subtitle="Maragoli Translate v2.4.0"
            right={
              <span style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 600, fontSize: 12, color: 'var(--outline)', letterSpacing: '0.5px' }}>
                v2.4.0
              </span>
            }
          />
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <span className="settings-footer-text">MARAGOLI TRANSLATE © 2024</span>
        </div>
      </div>
    </div>
  )
}
