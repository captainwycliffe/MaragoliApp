import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()

  return (
    <div className="ob-page">
      {/* Left panel */}
      <div className="ob-left">
        <div className="ob-logo">
          <div className="ob-logo-icon">
            <span className="material-icons">translate</span>
          </div>
          <span className="ob-logo-text">Maragoli Translate</span>
        </div>

        <div className="ob-content">
          <h1 className="ob-title">
            Translate and<br />
            Preserve{' '}
            <span className="ob-title-accent">Maragoli</span><br />
            Language
          </h1>
          <p className="ob-body">
            Join our community in bridging languages and cultures. Learn, speak, and save
            the rich heritage of the Lulogooli people of Western Kenya.
          </p>

          <div className="ob-stats">
            <div>
              <div className="ob-stat-value">8,421+</div>
              <div className="ob-stat-label">Contributors</div>
            </div>
            <div>
              <div className="ob-stat-value">2,000+</div>
              <div className="ob-stat-label">Phrases</div>
            </div>
            <div>
              <div className="ob-stat-value">14.82</div>
              <div className="ob-stat-label">BLEU Score</div>
            </div>
          </div>

          <div className="ob-actions">
            <button
              className="btn-primary ob-btn-primary"
              onClick={() => navigate('/home')}
            >
              Get Started
              <span className="material-icons">arrow_forward</span>
            </button>
            <button
              className="ob-btn-ghost"
              onClick={() => navigate('/home')}
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Right panel — image */}
      <div className="ob-right">
        <div className="ob-image-wrap">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfxAYdVNTUoo3-WJHs1cXmZ7wRvmXFCeJx-eLjGWk_tLLB4LpzqEjtJ2PmD_JMweZiiFQ6rM-3xXS85LDLA0MQN6NvFburACf35TR3sc1kvH089nlt57ptrPLYZq0_mkRe-gT-GTTgW-iESSd49PC5RG3P2zqcZDex72jWiU5yCKbZM7V6Wo5RqCEMNyb4E76pI5A30VHPvj--B-av8mrb6hvLDXPmWKOpbMoSKWcwYUDUcRaAZ9NW_ArwuwqcGrKCmj0UMcm6HI4"
            alt="Maragoli community"
          />
          <div className="ob-image-gradient" />
        </div>
        <div className="ob-float-card">
          <div className="ob-float-icon">
            <span className="material-icons">translate</span>
          </div>
          <div>
            <div className="ob-float-sub">Culture First</div>
            <div className="ob-float-text">Mirembe — Welcome</div>
          </div>
        </div>
      </div>
    </div>
  )
}
