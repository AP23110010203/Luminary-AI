import React from 'react';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

export function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  onClick,
  glowColor = '210 100 65',
  colors = ['#00E5FF', '#7B61FF', '#4F8CFF'],
  borderRadius = 24,
  ...props
}) {
  return (
    <BorderGlow
      borderRadius={borderRadius}
      glowColor={glowColor}
      colors={colors}
      backgroundColor="transparent"
      className="w-full h-full"
    >
      <motion.div
        whileHover={hoverEffect ? { y: -3, transition: { duration: 0.2 } } : undefined}
        onClick={onClick}
        className={`
          relative backdrop-blur-xl bg-[#0A1023]/80 
          border border-slate-800/50 rounded-[inherit] p-6 shadow-xl 
          transition-all duration-200 h-full
          ${glow ? 'shadow-[0_0_25px_rgba(0,229,255,0.25)] border-[#00E5FF]/50' : ''}
          ${onClick ? 'cursor-pointer hover:border-slate-700/60' : ''}
          ${className}
        `}
        {...props}
      >
        {/* Subtle glass reflection highlight top border */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-[inherit] pointer-events-none" />
        {children}
      </motion.div>
    </BorderGlow>
  );
}
