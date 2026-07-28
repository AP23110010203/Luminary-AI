import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Brain, Sparkles, Layers, HelpCircle, BookOpen, Bookmark, AlertCircle, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandMenuModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const options = [
    { name: 'Go to Dashboard', path: '/dashboard', icon: Brain, category: 'Navigation' },
    { name: 'Generate Study Kit', path: '/generate', icon: Sparkles, category: 'Navigation' },
    { name: 'Interactive Flashcards', path: '/flashcards', icon: Layers, category: 'Navigation' },
    { name: 'Take Quiz', path: '/quiz', icon: HelpCircle, category: 'Navigation' },
    { name: 'View Summary', path: '/summary', icon: BookOpen, category: 'Navigation' },
    { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark, category: 'Navigation' },
    { name: 'Wrong Answers Review', path: '/wrong-answers', icon: AlertCircle, category: 'Navigation' },
    { name: 'Settings', path: '/settings', icon: Settings, category: 'Navigation' },
  ];

  const filtered = options.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3 border-b border-slate-800">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or navigate to page..."
              className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-72 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-slate-500 text-sm">No matching commands found.</div>
            ) : (
              filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-brand-500/20 hover:border-brand-500/30 border border-transparent text-left text-sm text-slate-200 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-brand-500/30 text-brand-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-white">{item.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Jump →</span>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
