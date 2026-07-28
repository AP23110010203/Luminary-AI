import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { StudyProvider } from './context/StudyContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import { SideRays } from './components/ui/SideRays';
import { CustomCursor } from './components/ui/CustomCursor';
import { GradualBlur } from './components/ui/GradualBlur';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandMenuModal } from './components/ui/CommandMenuModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { GeneratePage } from './pages/GeneratePage';
import { StudySessionPage } from './pages/StudySessionPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { QuizPage } from './pages/QuizPage';
import { SummaryPage } from './pages/SummaryPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { WrongAnswersPage } from './pages/WrongAnswersPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';

import { AdminRoute } from './components/auth/AdminRoute';
import { UserRoute } from './components/auth/UserRoute';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Clean Page Transition Animation Wrapper
function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="w-full relative z-10"
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, isAdmin } = useAuth();

  useKeyboardShortcuts({
    'ctrl+k': () => setCommandMenuOpen(true),
  });

  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen bg-[#040816] text-slate-100 selection:bg-[#00E5FF] selection:text-[#040816]">
      <SideRays />
      <CustomCursor />

      {/* Mount GradualBlur ONLY on main content pages so login card & footers are never blurred */}
      {!isLoginPage && (
        <>
          <GradualBlur target="page" position="bottom" height="5rem" strength={1.5} zIndex={10} />
          <GradualBlur target="page" position="top" height="3rem" strength={1.0} zIndex={10} style={{ top: '64px' }} />
        </>
      )}

      {/* Show Navbar for non-login and non-admin pages */}
      {!isLoginPage && !isAdminPage && <Navbar onOpenCommandMenu={() => setCommandMenuOpen(true)} />}

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          {/* Public Auth Route */}
          <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />

          {/* Admin Protected Route (Restricted strictly to ADMIN) */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AnimatedPage>
                  <AdminPage />
                </AnimatedPage>
              </AdminRoute>
            }
          />

          {/* User Protected Routes (ADMIN is strictly blocked and redirected to /admin) */}
          <Route path="/" element={<UserRoute><AnimatedPage><LandingPage /></AnimatedPage></UserRoute>} />
          <Route path="/dashboard" element={<UserRoute><AnimatedPage><DashboardPage /></AnimatedPage></UserRoute>} />
          <Route path="/generate" element={<UserRoute><AnimatedPage><GeneratePage /></AnimatedPage></UserRoute>} />
          <Route path="/study-session" element={<UserRoute><AnimatedPage><StudySessionPage /></AnimatedPage></UserRoute>} />
          <Route path="/flashcards" element={<UserRoute><AnimatedPage><FlashcardsPage /></AnimatedPage></UserRoute>} />
          <Route path="/quiz" element={<UserRoute><AnimatedPage><QuizPage /></AnimatedPage></UserRoute>} />
          <Route path="/summary" element={<UserRoute><AnimatedPage><SummaryPage /></AnimatedPage></UserRoute>} />
          <Route path="/bookmarks" element={<UserRoute><AnimatedPage><BookmarksPage /></AnimatedPage></UserRoute>} />
          <Route path="/wrong-answers" element={<UserRoute><AnimatedPage><WrongAnswersPage /></AnimatedPage></UserRoute>} />
          <Route path="/settings" element={<UserRoute><AnimatedPage><SettingsPage /></AnimatedPage></UserRoute>} />

          {/* Catch-all Fallback Route */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? (isAdmin ? "/admin" : "/dashboard") : "/login"} replace />}
          />
        </Routes>
      </AnimatePresence>

      {/* Show Footer on all content pages including Admin Panel */}
      {!isLoginPage && <Footer />}
      <CommandMenuModal isOpen={commandMenuOpen} onClose={() => setCommandMenuOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StudyProvider>
          <Router>
            <AppContent />
          </Router>
        </StudyProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
