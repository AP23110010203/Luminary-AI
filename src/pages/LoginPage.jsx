import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Lock, Mail, ArrowRight, UserCheck, Shield, Key, AlertCircle, X } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import GradientText from '../components/ui/GradientText';
import ScrollVelocity from '../components/ui/ScrollVelocity';
import AbsoluteSymbol from '../components/ui/AbsoluteSymbol';
import Shuffle from '../components/ui/Shuffle';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginAsGuest, isLoggedIn, isAdmin } = useAuth();

  // Redirect if user navigates to /login while already authenticated
  useEffect(() => {
    if (isLoggedIn) {
      navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
    }
  }, [isLoggedIn, isAdmin, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin Security Modal State
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  // Standard User Sign In (strictly redirects to User Dashboard)
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const userEmail = email || 'scholar@luminary.ai';
      const userPass = password || 'user123';
      await login(userEmail, userPass);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('[Login Error]', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Admin Portal Sign In (Requires secure Admin Passcode)
  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    setAdminError('');

    // Valid admin passcodes
    const validPasscodes = ['admin123', 'admin2026', 'adminsecret', 'password123'];

    if (validPasscodes.includes(adminPasscode.trim())) {
      setIsSubmitting(true);
      try {
        await login('admin@luminary.ai', adminPasscode);
        setShowAdminModal(false);
        navigate('/admin', { replace: true });
      } catch (err) {
        setAdminError('Access Denied: Admin authentication failed');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setAdminError('Access Denied: Invalid Security Key');
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/dashboard', { replace: true });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Floating Parallax Glassmorphic Card Container */}
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard
          glow
          className="p-8 sm:p-10 border-[#4F8CFF]/30 bg-[#0A1023]/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6"
          hoverEffect={false}
        >
          {/* Top Bar with Side Small Admin Access Button */}
          <div className="flex items-center justify-between pb-1">
            <Badge variant="purple" className="text-[10px]">
              AI OS Protected
            </Badge>

            {/* Small Side Option for Admin Access */}
            <button
              type="button"
              onClick={() => {
                setAdminError('');
                setAdminPasscode('');
                setShowAdminModal(true);
              }}
              className="flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white bg-purple-950/50 hover:bg-purple-900/60 border border-purple-700/50 hover:border-purple-500/80 px-2.5 py-1 rounded-xl transition-all shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-semibold">Admin Portal</span>
            </button>
          </div>

          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#4F8CFF] via-[#7B61FF] to-[#00E5FF] p-0.5 shadow-lg shadow-[#00E5FF]/25">
              <div className="w-full h-full bg-[#040816] rounded-[14px] flex items-center justify-center p-2">
                <AbsoluteSymbol className="w-9 h-9" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                <span>Welcome to</span>
                <GradientText
                  colors={['#00E5FF', '#7B61FF', '#FF9FFC', '#4F8CFF']}
                  animationSpeed={6}
                  showBorder={false}
                >
                  LuminaryAI
                </GradientText>
              </h1>
              <Shuffle
                text="Enter your credentials or continue as a guest scholar"
                className="text-xs text-slate-400 mt-1 block text-center"
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scholar@luminary.ai"
                  className="w-full pl-10 pr-4 py-3 bg-[#040816]/90 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#00E5FF] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#040816]/90 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#4F8CFF] rounded"
                />
                <span>Remember session</span>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#4F8CFF] via-[#7B61FF] to-[#00E5FF] hover:from-[#00E5FF] hover:to-[#4F8CFF] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#4F8CFF]/25 hover:shadow-[#00E5FF]/40 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>Sign In to Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Animated Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-[#0A1023] px-3 text-[11px] text-slate-500 uppercase tracking-widest absolute">
              OR
            </span>
          </div>

          {/* Guest Button */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-3 px-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
          >
            <UserCheck className="w-4 h-4 text-[#00E5FF]" />
            <span>Continue as Guest Scholar</span>
          </button>

          {/* Footer Note */}
          <div className="w-full overflow-hidden pt-2">
            <ScrollVelocity
              texts={["Structured JSON Generation • Gemini API • Zod Validation"]}
              velocity={25}
              className="text-[11px] text-slate-500 font-mono"
              numCopies={3}
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* ADMIN PORTAL SECURITY ACCESS MODAL */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="w-full max-w-md"
            >
              <GlassCard glow className="p-6 border-purple-500/40 bg-[#070b19]/95 space-y-5 rounded-2xl shadow-2xl relative">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                  <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">System Admin Access</h3>
                    <p className="text-xs text-purple-300 font-medium">Restricted Administrative Portal</p>
                  </div>
                </div>

                <form onSubmit={handleAdminSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Admin Security Passcode
                    </label>
                    <div className="relative">
                      <Key className="w-4 h-4 text-purple-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        placeholder="••••••••••••"
                        autoFocus
                        className="w-full pl-10 pr-4 py-3 bg-[#040816] border border-purple-900/60 focus:border-purple-400 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                      />
                    </div>
                  </div>

                  {adminError && (
                    <div className="flex items-center space-x-2 text-xs text-rose-400 bg-rose-950/50 border border-rose-800/50 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{adminError}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAdminModal(false)}
                      className="w-1/2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Authorize Admin</span>
                    </button>
                  </div>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
