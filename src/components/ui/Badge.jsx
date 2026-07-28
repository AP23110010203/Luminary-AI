import React from 'react';

export function Badge({ children, variant = 'brand', className = '' }) {
  const variants = {
    brand: 'bg-brand-500/15 border-brand-500/30 text-brand-300',
    purple: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
    emerald: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    amber: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    red: 'bg-red-500/15 border-red-500/30 text-red-300',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${variants[variant] || variants.brand} ${className}`}
    >
      {children}
    </span>
  );
}
