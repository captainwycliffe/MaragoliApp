import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Translate from './pages/Translate'
import Saved from './pages/Saved'
import Contribution from './pages/Contribution'
import Settings from './pages/Settings'
import Offline from './pages/Offline'

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/translate" element={<Layout><Translate /></Layout>} />
        <Route path="/saved" element={<Layout><Saved /></Layout>} />
        <Route path="/contribution" element={<Layout><Contribution /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/offline" element={<Layout><Offline /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
