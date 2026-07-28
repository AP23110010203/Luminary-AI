import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../ui/GlassCard';
import { AlertCircle } from 'lucide-react';

export function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <GlassCard className="max-w-md text-center p-8 space-y-4 border-red-500/30 bg-red-950/20">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-bold text-red-300">403 Forbidden Access</h2>
          <p className="text-xs text-slate-300">
            You do not have Administrator permissions. Admin routes are restricted exclusively to ADMIN accounts.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold"
          >
            Return to User Dashboard
          </button>
        </GlassCard>
      </div>
    );
  }

  return children;
}
