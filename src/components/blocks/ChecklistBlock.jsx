import React, { useState } from 'react';
import { CheckSquare, Square, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

export function ChecklistBlock({ checklistBlockData, className = '' }) {
  const { items: rawItems = [], topic } = checklistBlockData || {};
  const [items, setItems] = useState(rawItems);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(items.map((i) => i.category || 'General'))];

  const toggleCheck = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const filteredItems = items.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header & Progress */}
      <GlassCard className="space-y-4" hoverEffect={false}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              Interactive Checklist
            </span>
            <h3 className="text-xl font-bold text-white">{topic || 'Study Checklist'}</h3>
          </div>

          <div className="text-right">
            <span className="text-2xl font-bold text-emerald-400">{progressPercent}%</span>
            <p className="text-xs text-slate-400">
              {completedCount} of {items.length} Tasks Completed
            </p>
          </div>
        </div>

        <div className="w-full bg-slate-800/60 h-2.5 rounded-full overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Category Filters */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Filter className="w-4 h-4 text-slate-400 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Task Checklist Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <GlassCard
            key={item.id}
            onClick={() => toggleCheck(item.id)}
            className={`p-4 transition-all duration-200 border ${
              item.completed
                ? 'bg-emerald-950/20 border-emerald-500/30'
                : 'bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <div className="mt-0.5 shrink-0">
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`text-sm font-medium transition-all ${
                    item.completed ? 'line-through text-slate-400' : 'text-slate-100'
                  }`}
                >
                  {item.task}
                </p>
                {item.category && (
                  <span className="text-[11px] text-slate-500 font-mono mt-1 inline-block">
                    [{item.category}]
                  </span>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
