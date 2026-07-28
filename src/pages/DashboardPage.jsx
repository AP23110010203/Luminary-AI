import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Flame, Layers, Trophy, Bookmark, AlertCircle, Trash2, ArrowRight, Clock, Plus } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useStudy } from '../context/StudyContext';
import TextPressure from '../components/ui/TextPressure';
import ShinyText from '../components/ui/ShinyText';
import FuzzyText from '../components/ui/FuzzyText';
import DecryptedText from '../components/ui/DecryptedText';

export function DashboardPage() {
  const navigate = useNavigate();
  const { stats, sessions, deleteSession, setActiveSession } = useStudy();
  const [quickTopic, setQuickTopic] = useState('');

  const handleQuickGenerate = (e) => {
    e.preventDefault();
    if (quickTopic.trim()) {
      navigate('/generate', { state: { presetTopic: quickTopic.trim() } });
    }
  };

  const handleOpenSession = (session) => {
    setActiveSession(session);
    navigate('/study-session');
  };

  return (
    <PageWrapper className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-full max-w-xl">
          <TextPressure
            text="STUDY COMMAND CENTER"
            minFontSize={28}
            textColor="#FFFFFF"
            width={true}
            weight={true}
            italic={false}
            flex={true}
          />
          <div className="w-full flex justify-start text-left mt-1">
            <FuzzyText color="#94a3b8" fontSize="0.875rem" baseIntensity={0.08} hoverIntensity={0.35}>
              Track your study streak, review active sessions, and generate structured modules.
            </FuzzyText>
          </div>
        </div>

        <Link
          to="/generate"
          className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-brand-500/20 transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Topic Session</span>
        </Link>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <GlassCard className="p-4" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{stats.streakDays}</span>
              <p className="text-[11px] text-slate-400 font-medium">Day Streak</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{stats.masteredCardsCount}</span>
              <p className="text-[11px] text-slate-400 font-medium">Mastered Cards</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-brand-500/20 border border-brand-500/30 rounded-xl text-brand-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{stats.totalSessions}</span>
              <p className="text-[11px] text-slate-400 font-medium">Active Sessions</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-pink-500/20 border border-pink-500/30 rounded-xl text-pink-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{stats.totalBookmarks}</span>
              <p className="text-[11px] text-slate-400 font-medium">Bookmarks</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{stats.wrongAnswersCount}</span>
              <p className="text-[11px] text-slate-400 font-medium">Wrong Answers</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Quick Generator Box */}
      <GlassCard className="space-y-4 border-brand-500/30 bg-brand-950/20" hoverEffect={false}>
        <div className="flex items-center space-x-2 text-brand-300 font-semibold">
          <Sparkles className="w-5 h-5 text-brand-400" />
          <span>Quick Topic Generator</span>
        </div>

        <form onSubmit={handleQuickGenerate} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={quickTopic}
            onChange={(e) => setQuickTopic(e.target.value)}
            placeholder="Enter any topic or paste study notes (e.g. 'Operating System', 'React Hooks')..."
            className="flex-1 px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-brand-500/20 active:scale-95 shrink-0"
          >
            Generate Kit
          </button>
        </form>
      </GlassCard>

      {/* Saved Study Sessions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <ShinyText text="Recent Study Sessions" color="#e2e8f0" shineColor="#00E5FF" speed={3} />
          </h2>
          <span className="text-xs text-slate-400 font-mono">{sessions.length} Saved</span>
        </div>

        {sessions.length === 0 ? (
          <GlassCard className="text-center py-12 space-y-4">
            <Brain className="w-12 h-12 text-slate-600 mx-auto" />
            <div>
              <h3 className="text-base font-semibold text-slate-300">No Study Sessions Created Yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                <DecryptedText text="Enter a topic above or click Generate to build your first AI study kit." speed={30} />
              </p>
            </div>
            <Link
              to="/generate"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Kit</span>
            </Link>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map((session) => (
              <GlassCard
                key={session.id}
                onClick={() => handleOpenSession(session)}
                className="group cursor-pointer flex flex-col justify-between p-5 space-y-4 border-slate-800 hover:border-brand-500/40"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="purple" className="mb-1">
                      {session.data?.flashcards?.cards?.length || 0} Flashcards
                    </Badge>
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                      {session.topic}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {session.data?.summary?.overview || 'Interactive study blocks ready.'}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="font-mono text-[11px]">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-1 text-brand-400 font-medium group-hover:translate-x-1 transition-transform">
                    <span>Open Study Kit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
