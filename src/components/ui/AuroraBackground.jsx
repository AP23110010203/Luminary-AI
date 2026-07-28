import React from 'react';

export function AuroraBackground({ children, className = '' }) {
  return (
    <div className={`relative min-h-screen bg-[#090d16] text-slate-100 overflow-hidden ${className}`}>
      {/* Background Aurora Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        {/* Purple glow orb */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse-glow" />
        {/* Blue glow orb */}
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-brand-500/25 rounded-full blur-[140px] animate-float" />
        {/* Cyan glow orb */}
        <div className="absolute -bottom-40 left-1/4 w-[28rem] h-[28rem] bg-cyan-500/20 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
