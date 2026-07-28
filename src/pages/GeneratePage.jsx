import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Code, Terminal, Layers, RefreshCw, XCircle, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useAIGenerate } from '../hooks/useAIGenerate';
import { useStudy } from '../context/StudyContext';
import { useTheme } from '../context/ThemeContext';
import TextPressure from '../components/ui/TextPressure';
import ShinyText from '../components/ui/ShinyText';
import FuzzyText from '../components/ui/FuzzyText';

export function GeneratePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useTheme();
  const { saveNewSession } = useStudy();

  const [promptText, setPromptText] = useState('');
  const [apiKeyOverride, setApiKeyOverride] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const { status, data, meta, error, isLoading, isError, generate, cancel, retry } = useAIGenerate();

  const savedDataRef = React.useRef(null);

  // If passed a presetTopic from location state (e.g. from landing page)
  useEffect(() => {
    if (location.state?.presetTopic) {
      setPromptText(location.state.presetTopic);
      generate(location.state.presetTopic, settings.customApiKey || apiKeyOverride);
    }
  }, [location.state, generate, settings.customApiKey, apiKeyOverride]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (promptText.trim()) {
      savedDataRef.current = null;
      generate(promptText.trim(), settings.customApiKey || apiKeyOverride);
    }
  };

  // On successful generation, save session and navigate to StudySessionPage (ONCE)
  useEffect(() => {
    if (status === 'success' && data && savedDataRef.current !== data) {
      savedDataRef.current = data;
      saveNewSession(data);
      navigate('/study-session');
    }
  }, [status, data, saveNewSession, navigate]);

  const topicPresets = [
    "Operating System",
    "React Hooks",
    "Database Management Systems",
    "Computer Networks",
    "Data Structures & Algorithms"
  ];

  return (
    <PageWrapper className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <Badge variant="purple" className="mb-1">Zod Schema Enforced AI Engine</Badge>
        <div className="max-w-2xl mx-auto py-1">
          <TextPressure
            text="GENERATE AI STUDY COMPANION"
            minFontSize={26}
            textColor="#FFFFFF"
            width={true}
            weight={true}
            italic={false}
            flex={true}
          />
        </div>
        <div className="w-full flex justify-center text-center mt-1">
          <FuzzyText color="#94a3b8" fontSize="0.875rem" baseIntensity={0.08} hoverIntensity={0.35}>
            Enter any topic or paste your study notes below to build interactive Flashcards, Quizzes, Summaries, Checklists & Mind Maps.
          </FuzzyText>
        </div>
      </div>

      {/* Input Generator Form */}
      <GlassCard className="space-y-6 border-brand-500/30" hoverEffect={false}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              <ShinyText text="Topic or Notes Input" color="#e2e8f0" shineColor="#00E5FF" speed={3} />
            </label>
            <textarea
              rows={4}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              disabled={isLoading}
              placeholder="Enter a topic (e.g. 'Operating System', 'React Hooks') or paste your lecture notes here..."
              className="w-full p-4 bg-slate-950/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Quick Preset Pills */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-medium">Quick Topic Presets:</span>
            <div className="flex flex-wrap gap-2">
              {topicPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setPromptText(preset);
                    generate(preset, settings.customApiKey || apiKeyOverride);
                  }}
                  className="px-3 py-1.5 bg-slate-800/80 hover:bg-brand-500/20 hover:border-brand-500/40 border border-slate-700 rounded-xl text-xs font-medium text-slate-300 transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* API Key Override Drawer Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1"
            >
              <Key className="w-3.5 h-3.5 text-brand-400" />
              <span>{showApiKeyInput ? 'Hide API Key Settings' : 'Custom Gemini API Key (Optional)'}</span>
            </button>

            {showApiKeyInput && (
              <div className="mt-3 p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <input
                  type="password"
                  value={apiKeyOverride}
                  onChange={(e) => setApiKeyOverride(e.target.value)}
                  placeholder="Paste GEMINI_API_KEY (leave empty to use server default or mock mode)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <p className="text-[11px] text-slate-500">
                  Keys are never stored publicly. If empty, server mock mode will provide instant realistic payloads.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            {isLoading ? (
              <button
                type="button"
                onClick={cancel}
                className="flex items-center space-x-2 px-4 py-2.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancel Generation</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isLoading || !promptText.trim()}
              className="flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 hover:from-brand-500 hover:to-pink-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50 active:scale-95 ml-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Synthesizing...' : 'Generate Complete Kit'}</span>
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Loading Skeleton */}
      {isLoading && <SkeletonLoader />}

      {/* Error Message with Retry */}
      {isError && (
        <ErrorMessage
          message={error}
          onRetry={() => retry(settings.customApiKey || apiKeyOverride)}
          errorDetails={meta?.fallbackReason}
        />
      )}
    </PageWrapper>
  );
}
