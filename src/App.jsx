import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { IntroAnimation } from './components/ui/IntroAnimation'
import { ElegantGridBackground } from './components/ui/ElegantGridBackground'
import { ToastProvider } from './components/Toast'
import { useState } from 'react'

import Home from './pages/Home'
import PublishedIssues from './pages/PublishedIssues'
import PublishedPapers from './pages/PublishedPapers'
import FutureIssues from './pages/FutureIssues'
import PaperDetail from './pages/PaperDetail'
import EditorialBoard from './pages/EditorialBoard'
import About from './pages/About'
import NotFound from './pages/NotFound'
import ComingSoon from './pages/ComingSoon'

/* ── Layout wrapper ───────────────────────────────────────────────── */
function PublicLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  )
}

/* ── App ──────────────────────────────────────────────────────────── */
export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem('intro_played') !== 'true'
  })

  const handleIntroComplete = () => {
    sessionStorage.setItem('intro_played', 'true')
    setShowIntro(false)
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <ElegantGridBackground />
      <ScrollProgress />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                {/* ── Public pages ── */}
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/published-issues" element={<PublicLayout><PublishedIssues /></PublicLayout>} />
                <Route path="/published-papers" element={<PublicLayout><PublishedPapers /></PublicLayout>} />
                <Route path="/future-issues" element={<PublicLayout><FutureIssues /></PublicLayout>} />
                <Route path="/editorial-board" element={<PublicLayout><EditorialBoard /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/paper/:id" element={<PublicLayout><PaperDetail /></PublicLayout>} />

                {/* ── Coming Soon — auth & dashboard routes ── */}
                <Route path="/coming-soon" element={<PublicLayout><ComingSoon /></PublicLayout>} />
                <Route path="/login" element={<Navigate to="/coming-soon" replace />} />
                <Route path="/register" element={<Navigate to="/coming-soon" replace />} />
                <Route path="/forgot-password" element={<Navigate to="/coming-soon" replace />} />
                <Route path="/pending-approval" element={<Navigate to="/coming-soon" replace />} />
                <Route path="/notifications" element={<Navigate to="/coming-soon" replace />} />
                <Route path="/student/*" element={<Navigate to="/coming-soon" replace />} />
                <Route path="/reviewer/*" element={<Navigate to="/coming-soon" replace />} />
                <Route path="/admin/*" element={<Navigate to="/coming-soon" replace />} />

                {/* ── Fallback ── */}
                <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}
