import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Layers, HelpCircle, BookOpen, CheckSquare, Network, ArrowRight, ShieldCheck, Zap, Code, Terminal } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { PageWrapper } from '../components/layout/PageWrapper';

export function LandingPage() {
  const navigate = useNavigate();

  const presets = [
    { title: "Operating System", icon: Terminal, desc: "Kernel, processes, paging & scheduling" },
    { title: "React Hooks", icon: Code, desc: "useState, useEffect, useMemo & custom hooks" },
    { title: "Database Systems", icon: Layers, desc: "ACID properties, indexing, SQL vs NoSQL" },
  ];

  const handleLaunchPreset = async (topicName) => {
    navigate('/generate', { state: { presetTopic: topicName } });
  };

  return (
    <PageWrapper className="space-y-20 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-500/10 border border-[#00E5FF]/30 rounded-full backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          <span className="text-xs font-semibold text-[#00E5FF]">
            Next-Gen AI SaaS Platform with Interactive Knowledge Graph
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          Transform Any Topic Into An{' '}
          <span className="bg-gradient-to-r from-[#4F8CFF] via-[#7B61FF] to-[#00E5FF] bg-clip-text text-transparent">
            Interactive Study Engine
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Not a chatbot. Enter notes or topics to generate strictly validated JSON rendered into 3D flashcards, quizzes, summaries, checklists, and an interactive Obsidian-style AI Knowledge Graph.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link
            to="/generate"
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#4F8CFF] via-[#7B61FF] to-[#00E5FF] hover:from-[#00E5FF] hover:to-[#4F8CFF] text-white font-bold text-base rounded-2xl shadow-xl shadow-[#4F8CFF]/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate Study Companion Now</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center space-x-2 px-6 py-4 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base rounded-2xl transition-all"
          >
            <Brain className="w-5 h-5 text-[#00E5FF]" />
            <span>Explore Dashboard</span>
          </Link>
        </motion.div>
      </div>

      {/* Preset Quick Launch Launcher */}
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="text-center">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Instant Topic Starters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presets.map((p, idx) => {
            const Icon = p.icon;
            return (
              <GlassCard
                key={idx}
                onClick={() => handleLaunchPreset(p.title)}
                glow
                className="group cursor-pointer p-5 flex items-center space-x-4 border-slate-800 hover:border-[#00E5FF]/50"
              >
                <div className="p-3 bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 rounded-xl text-[#00E5FF] group-hover:bg-[#4F8CFF] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base group-hover:text-[#00E5FF] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{p.desc}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Feature Block Modules Grid */}
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">5 Intelligent SaaS Block Modules</h2>
          <p className="text-slate-400 text-sm mt-2">
            Every study topic is rendered into specialized, interactive components built with React and Tailwind CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="space-y-3 border-[#00E5FF]/30 bg-[#0A1023]/80">
            <div className="w-10 h-10 bg-[#00E5FF]/20 border border-[#00E5FF]/40 rounded-xl flex items-center justify-center text-[#00E5FF]">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Knowledge Graph</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Obsidian Graph View with React Flow: drag nodes, zoom, search concepts, highlight neighbors, and open glass detail drawers.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">3D Animated Flashcards</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Framer Motion 3D card flip with question hints, mastery toggles, shuffle, and keyboard shortcuts.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="w-10 h-10 bg-brand-500/20 border border-brand-500/30 rounded-xl flex items-center justify-center text-brand-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Interactive Quizzes</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Instant answer feedback, choice explanations, score tallying, confetti celebration, and wrong answer tracking.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="w-10 h-10 bg-pink-500/20 border border-pink-500/30 rounded-xl flex items-center justify-center text-pink-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Structured Summaries</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Collapsible sections, overview notes, key takeaway bullet highlights, and one-click markdown clipboard export.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Action Checklists</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Step-by-step checklist items with category tagging, strike-through progress, and completion percentages.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3 border-brand-500/30 bg-brand-950/20">
            <div className="w-10 h-10 bg-brand-500/20 border border-brand-500/30 rounded-xl flex items-center justify-center text-brand-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Zod Schema Validated</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Strict runtime JSON parsing guarantees zero crashes, automatic payload repair, and complete error resilience.
            </p>
          </GlassCard>
        </div>
      </div>
    </PageWrapper>
  );
}
