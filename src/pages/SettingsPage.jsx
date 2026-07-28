import React, { useState, useEffect } from 'react';
import { Settings, Key, ShieldCheck, RefreshCw, Trash2, Check, Moon, Zap } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useTheme } from '../context/ThemeContext';

export function SettingsPage() {
  const { settings, updateSettings } = useTheme();
  const [apiKeyInput, setApiKeyInput] = useState(settings.customApiKey || '');
  const [healthStatus, setHealthStatus] = useState(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    setIsCheckingHealth(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealthStatus(data);
    } catch (e) {
      setHealthStatus({ status: 'error', message: 'Backend server offline or unreachable.' });
    } finally {
      setIsCheckingHealth(false);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings({ customApiKey: apiKeyInput.trim() });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all saved study sessions, bookmarks, and quiz scores?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <PageWrapper className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Application Settings</h1>
        <p className="text-slate-400 text-sm mt-1">
          Configure API keys, AI validation strictness, keyboard shortcuts, and local storage data.
        </p>
      </div>

      {/* Backend API Server Health Status Card */}
      <GlassCard className="space-y-4 border-brand-500/30" hoverEffect={false}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <span>Backend Express API Server Status</span>
          </div>

          <button
            onClick={checkServerHealth}
            disabled={isCheckingHealth}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCheckingHealth ? 'animate-spin' : ''}`} />
            <span>Test Health</span>
          </button>
        </div>

        {healthStatus && (
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Server Mode:</span>
              <Badge variant={healthStatus.mode === 'live' ? 'emerald' : 'amber'}>
                {healthStatus.mode || 'Offline / Local Fallback'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Gemini Key Configured:</span>
              <span className={healthStatus.apiKeyConfigured ? 'text-emerald-400' : 'text-amber-400'}>
                {healthStatus.apiKeyConfigured ? 'YES (Live Gemini API Active)' : 'NO (Mock Mode Active)'}
              </span>
            </div>
          </div>
        )}
      </GlassCard>

      {/* API Key Configuration Form */}
      <GlassCard className="space-y-4" hoverEffect={false}>
        <div className="flex items-center space-x-2 text-white font-bold text-base">
          <Key className="w-5 h-5 text-purple-400" />
          <span>Google Gemini API Key</span>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Client Key Override (Optional)
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500"
            />
            <p className="text-xs text-slate-500 mt-2">
              If left blank, the app connects to the Express server environment variable or fallback mock generator.
            </p>
          </div>

          <div className="flex items-center justify-between">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 font-medium flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Settings saved successfully!</span>
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl shadow-lg"
            >
              Save Key Settings
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Keyboard Shortcuts & Accessibility */}
      <GlassCard className="space-y-4" hoverEffect={false}>
        <div className="flex items-center space-x-2 text-white font-bold text-base">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>Preferences & Keyboard Navigation</span>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer">
            <span className="text-sm font-medium text-slate-200">Enable Keyboard Shortcuts</span>
            <input
              type="checkbox"
              checked={settings.enableShortcuts}
              onChange={(e) => updateSettings({ enableShortcuts: e.target.checked })}
              className="w-4 h-4 accent-brand-500 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer">
            <span className="text-sm font-medium text-slate-200">Strict Zod Schema Validation</span>
            <input
              type="checkbox"
              checked={settings.strictValidation}
              onChange={(e) => updateSettings({ strictValidation: e.target.checked })}
              className="w-4 h-4 accent-brand-500 rounded"
            />
          </label>
        </div>
      </GlassCard>

      {/* Clear Data Reset Card */}
      <GlassCard className="space-y-4 border-red-500/20 bg-red-950/10" hoverEffect={false}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-red-300">Reset Local Storage Data</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Clear all saved study sessions, bookmarks, mastered cards, and wrong answers.
            </p>
          </div>

          <button
            onClick={handleClearData}
            className="flex items-center space-x-1.5 px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset All Data</span>
          </button>
        </div>
      </GlassCard>
    </PageWrapper>
  );
}
