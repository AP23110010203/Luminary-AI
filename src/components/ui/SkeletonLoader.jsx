import React from 'react';
import { GlassCard } from './GlassCard';

export function SkeletonLoader({ type = 'all' }) {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Loading Skeleton */}
      <GlassCard hoverEffect={false}>
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 w-48 bg-slate-800 rounded-lg" />
          <div className="h-6 w-24 bg-slate-800 rounded-full" />
        </div>
        <div className="h-4 w-full bg-slate-800/60 rounded mb-2" />
        <div className="h-4 w-3/4 bg-slate-800/60 rounded" />
      </GlassCard>

      {/* Block Loading Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skeleton Card 1 */}
        <GlassCard hoverEffect={false}>
          <div className="h-6 w-32 bg-slate-800 rounded mb-4" />
          <div className="h-40 bg-slate-800/40 rounded-xl mb-4" />
          <div className="flex justify-between items-center">
            <div className="h-8 w-20 bg-slate-800 rounded-lg" />
            <div className="h-8 w-20 bg-slate-800 rounded-lg" />
          </div>
        </GlassCard>

        {/* Skeleton Card 2 */}
        <GlassCard hoverEffect={false}>
          <div className="h-6 w-36 bg-slate-800 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-12 bg-slate-800/50 rounded-xl" />
            <div className="h-12 bg-slate-800/50 rounded-xl" />
            <div className="h-12 bg-slate-800/50 rounded-xl" />
          </div>
        </GlassCard>
      </div>

      {/* Progress / Status banner */}
      <div className="flex items-center justify-center space-x-3 p-4 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-400 text-sm font-medium">
        <svg className="animate-spin h-5 w-5 text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Synthesizing topic structure & parsing Zod schemas...</span>
      </div>
    </div>
  );
}
