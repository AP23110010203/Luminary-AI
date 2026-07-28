import React from 'react';

export function PageWrapper({ children, className = '' }) {
  return (
    <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 ${className}`}>
      {children}
    </main>
  );
}
