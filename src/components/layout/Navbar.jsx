import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Layers, BookOpen, HelpCircle, Bookmark, AlertCircle, Settings, PlusCircle, Search, ShieldCheck, User, LogIn, LogOut, Menu, X } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';
import GradientText from '../ui/GradientText';
import PillNav from '../ui/PillNav';
import Dock from '../ui/Dock';
import AbsoluteSymbol from '../ui/AbsoluteSymbol';

export function Navbar({ onOpenCommandMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pillNavItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Generate', href: '/generate' },
    { label: 'Flashcards', href: '/flashcards' },
    { label: 'Quiz', href: '/quiz' },
    { label: 'Summary', href: '/summary' },
    ...(isAdmin ? [{ label: 'Admin Portal', href: '/admin' }] : []),
  ];

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#040816]/90 border-b border-[#4F8CFF]/20 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-[#040816] border border-[#00E5FF]/40 flex items-center justify-center shadow-lg shadow-[#00E5FF]/20 group-hover:scale-105 transition-transform p-1.5">
              <AbsoluteSymbol className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <GradientText
                  colors={['#00E5FF', '#7B61FF', '#FF9FFC', '#4F8CFF']}
                  animationSpeed={6}
                  showBorder={false}
                  className="font-extrabold text-lg tracking-tight"
                >
                  LuminaryAI
                </GradientText>
                <Badge variant="purple" className="text-[10px] py-0 px-1.5">v2.0 SaaS</Badge>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase block font-mono">AI Study OS</span>
            </div>
          </Link>

          {/* Desktop Interactive PillNav */}
          <div className="hidden lg:block">
            <PillNav
              items={pillNavItems}
              activeHref={location.pathname}
              baseColor="#94a3b8"
              pillColor="#090d16"
              hoveredPillTextColor="#00E5FF"
              initialLoadAnimation={false}
            />
          </div>

          {/* Action Tools & Animated Dock */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block">
              <Dock
                items={[
                  {
                    label: 'Quick Command (⌘K)',
                    icon: <Search className="w-4 h-4 text-slate-300" />,
                    onClick: onOpenCommandMenu,
                  },
                  {
                    label: 'Create AI Kit',
                    icon: <PlusCircle className="w-4 h-4 text-[#00E5FF]" />,
                    onClick: () => navigate('/generate'),
                  },
                  {
                    label: isLoggedIn ? 'Sign Out' : 'Sign In',
                    icon: isLoggedIn ? <LogOut className="w-4 h-4 text-red-400" /> : <LogIn className="w-4 h-4 text-[#00E5FF]" />,
                    onClick: handleAuthAction,
                    className: isLoggedIn ? 'hover:bg-red-500/20 hover:border-red-500/50' : '',
                  },
                ]}
                magnification={48}
                baseItemSize={36}
                panelHeight={44}
              />
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1023]/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl">
          {pillNavItems.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'bg-[#4F8CFF]/20 text-[#00E5FF] border border-[#00E5FF]/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }
              `}
            >
              <span>{link.label}</span>
            </Link>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleAuthAction();
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
          </button>
        </div>
      )}
    </header>
  );
}
