import { NavLink } from 'react-router-dom'

const mainNav = [
  { path: '/home', icon: 'home', label: 'Home' },
  { path: '/translate', icon: 'translate', label: 'Translate' },
  { path: '/saved', icon: 'bookmark', label: 'Saved Phrases' },
  { path: '/contribution', icon: 'volunteer_activism', label: 'Contribute' },
]

const secondaryNav = [
  { path: '/settings', icon: 'settings', label: 'Settings' },
  { path: '/offline', icon: 'cloud_off', label: 'Offline Mode' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <span className="material-icons">translate</span>
        </div>
        <span className="sidebar-logo-text">Maragoli<br />Translate</span>
      </div>

      {/* Main nav */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main</div>
        {mainNav.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
          >
            <span className="material-icons">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <div className="sidebar-divider" style={{ margin: '12px 0' }} />
        <div className="sidebar-section-label">More</div>
        {secondaryNav.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
          >
            <span className="material-icons">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4_gQ7YIEiB_S0cxs45Yv4eR_faLG2-TU5-iAd4PJR8MkgzzeZE1qMUUm7WkW-X6mN65_1oSAXhwB0ZpQCWgxJXw6a7qPbFNasaFJUiIMIoJ4zltTlKQipnKJbuh6oNo1QfmDWPBHD1k4Foj-Mh-URZXx7pAiuJIQNkTFE4lDibYtaMZr8xtP4aZbtguSmN-YNdbn6IYrd0vljkPDTtxtZTbDb1Cbqw2aMONPI2CZvwVnMHDBV03wtGAnRZE3EFIiyWVgueTyCExk"
            alt="User avatar"
            className="sidebar-user-avatar"
          />
          <div>
            <div className="sidebar-user-name">Vuguvugu</div>
            <div className="sidebar-user-sub">Level 4 · Mastery Path</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
