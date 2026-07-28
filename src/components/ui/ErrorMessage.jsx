import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp, Code } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function ErrorMessage({
  title = "Generation Error",
  message,
  onRetry,
  errorDetails,
  className = ''
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <GlassCard className={`border-red-500/30 bg-red-950/20 ${className}`} hoverEffect={false}>
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400 shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-300 mb-1">{title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            {message || "We encountered an issue processing your study topic. Don't worry, your progress is safe!"}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-red-900/30 active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Generation</span>
              </button>
            )}

            {errorDetails && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-colors"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{showDetails ? 'Hide Debug Details' : 'View Schema Debug Info'}</span>
                {showDetails ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
              </button>
            )}
          </div>

          {showDetails && errorDetails && (
            <div className="mt-4 p-3 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 overflow-x-auto max-h-48">
              <pre>{typeof errorDetails === 'object' ? JSON.stringify(errorDetails, null, 2) : String(errorDetails)}</pre>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
