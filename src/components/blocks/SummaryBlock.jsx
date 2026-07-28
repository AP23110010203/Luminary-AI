import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Copy, Check, ChevronDown, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

export function SummaryBlock({ summaryBlockData, className = '' }) {
  const { title, topic, overview, keyTakeaways = [], sections = [] } = summaryBlockData || {};
  const [openSections, setOpenSections] = useState({});
  const [copied, setCopied] = useState(false);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCopySummary = () => {
    const textToCopy = `
# ${title || topic || 'Study Summary'}

## Overview
${overview}

## Key Takeaways
${keyTakeaways.map((t) => `- ${t}`).join('\n')}

## Detailed Breakdown
${sections
  .map(
    (s) => `### ${s.title}\n${s.content}\n${(s.subPoints || []).map((sp) => `  * ${sp}`).join('\n')}`
  )
  .join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header & Copy Button */}
      <GlassCard className="space-y-4" hoverEffect={false}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="purple" className="mb-2">AI Generated Summary</Badge>
            <h2 className="text-2xl font-bold text-white">{title || `${topic} Summary`}</h2>
            <p className="text-sm text-slate-400 mt-1">Topic: {topic}</p>
          </div>

          <button
            onClick={handleCopySummary}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>
        </div>

        {overview && (
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-300 text-sm leading-relaxed">
            {overview}
          </div>
        )}
      </GlassCard>

      {/* Key Takeaways Section */}
      {keyTakeaways.length > 0 && (
        <GlassCard className="border-brand-500/30 bg-brand-950/15" hoverEffect={false}>
          <div className="flex items-center space-x-2 text-brand-300 font-semibold mb-4">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <span>Key Takeaways</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {keyTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-900/80 border border-slate-800/80 rounded-xl flex items-start space-x-3 text-xs sm:text-sm text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Collapsible Sections Accordion */}
      {sections.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span>Detailed Breakdown</span>
          </h3>

          <div className="space-y-3">
            {sections.map((section, idx) => {
              const isOpen = openSections[idx] !== false; // Default expanded

              return (
                <GlassCard key={idx} className="p-0 overflow-hidden" hoverEffect={false}>
                  <button
                    onClick={() => toggleSection(idx)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="font-semibold text-white text-base">{section.title}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-400' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 pt-1 border-t border-slate-800/60 text-slate-300 text-sm space-y-3"
                      >
                        <p className="leading-relaxed">{section.content}</p>

                        {section.subPoints && section.subPoints.length > 0 && (
                          <div className="mt-3 pl-4 border-l-2 border-brand-500/40 space-y-1.5 text-xs sm:text-sm text-slate-300">
                            {section.subPoints.map((sp, sIdx) => (
                              <div key={sIdx} className="flex items-start space-x-2">
                                <span className="text-brand-400 font-bold">•</span>
                                <span>{sp}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
