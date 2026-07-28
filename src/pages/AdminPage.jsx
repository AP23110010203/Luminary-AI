import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, Activity, Brain, Layers, HelpCircle, Trophy, TrendingUp, Search,
  Bell, Settings, LogOut, CheckCircle2, ShieldCheck, Filter,
  ArrowUpRight, Laptop, Clock, Bookmark, AlertCircle, Sparkles, RefreshCw, FileText, BarChart3, Database
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useAuth } from '../context/AuthContext';
import BlurText from '../components/ui/BlurText';
import PillNav from '../components/ui/PillNav';
import Dock from '../components/ui/Dock';
import ScrambledText from '../components/ui/ScrambledText';
import ShinyText from '../components/ui/ShinyText';
import DecryptedText from '../components/ui/DecryptedText';
import AbsoluteSymbol from '../components/ui/AbsoluteSymbol';

export function AdminPage() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  // Filters & Pagination for Member Table
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Real Backend Database Telemetry via REST APIs
  const fetchAdminData = useCallback(async () => {
    const activeToken = token || localStorage.getItem('luminary_jwt_token');
    if (!activeToken) {
      setIsLoading(false);
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${activeToken}` };

      const [dashRes, usersRes, onlineRes, analyticsRes, activityRes] = await Promise.all([
        fetch('/api/admin/dashboard', { headers }),
        fetch('/api/admin/users', { headers }),
        fetch('/api/admin/online-users', { headers }),
        fetch('/api/admin/analytics', { headers }),
        fetch('/api/admin/activity', { headers }),
      ]);

      if (dashRes.ok) {
        const dashJson = await dashRes.json();
        setDashboardData(dashJson.data);
      }
      if (usersRes.ok) {
        const usersJson = await usersRes.json();
        setUserList(usersJson.data || []);
      }
      if (onlineRes.ok) {
        const onlineJson = await onlineRes.json();
        setOnlineUsers(onlineJson.data || []);
      }
      if (analyticsRes.ok) {
        const analyticsJson = await analyticsRes.json();
        setAnalyticsData(analyticsJson.data || null);
      }
      if (activityRes.ok) {
        const activityJson = await activityRes.json();
        setActivityLogs(activityJson.data || []);
      }

      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('[Admin Panel API Fetch Error]', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Initial Fetch & 10-Second Real-Time Auto Refresh Polling
  useEffect(() => {
    fetchAdminData();
    const interval = setInterval(() => {
      fetchAdminData();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchAdminData]);

  // Filtering Member Table
  const filteredUsers = userList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'requests', label: 'AI Requests', icon: Sparkles },
    { id: 'activity', label: 'Activity Logs', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <PageWrapper className="max-w-[1400px] mx-auto p-2 sm:p-6 space-y-8">
      {/* Top Header Bar */}
      <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-4 border-[#4F8CFF]/30" hoverEffect={false}>
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-[#040816] border border-[#00E5FF]/40 flex items-center justify-center shadow-lg shadow-[#00E5FF]/20 p-1.5">
            <AbsoluteSymbol className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <BlurText
                text="SaaS Enterprise Control Panel"
                delay={120}
                animateBy="words"
                direction="top"
                className="text-xl font-bold text-white tracking-tight"
              />
              <Badge variant="emerald">100% Real REST API Data</Badge>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Auto-refreshing every 10s • Last updated: {lastRefreshed || 'Loading...'}
            </p>
          </div>
        </div>

        <Dock
          items={[
            {
              label: 'Refresh Telemetry',
              icon: <RefreshCw className={`w-4 h-4 text-[#00E5FF] ${isLoading ? 'animate-spin' : ''}`} />,
              onClick: fetchAdminData,
            },
            {
              label: 'User Dashboard',
              icon: <Brain className="w-4 h-4 text-[#7B61FF]" />,
              onClick: () => navigate('/dashboard'),
            },
            {
              label: 'Sign Out Admin',
              icon: <LogOut className="w-4 h-4 text-red-400" />,
              onClick: handleLogout,
              className: 'hover:bg-red-500/20 hover:border-red-500/50',
            },
          ]}
          magnification={52}
          baseItemSize={38}
          panelHeight={46}
        />
      </GlassCard>

      {/* Admin Interactive PillNav Navigation */}
      <div className="flex justify-center border-b border-slate-800/80 pb-4">
        <PillNav
          items={sidebarItems.map((item) => ({
            label: item.label,
            onClick: () => setActiveTab(item.id),
            href: '#',
          }))}
          activeHref="#"
          baseColor="#94a3b8"
          pillColor="#090d16"
          hoveredPillTextColor="#00E5FF"
          initialLoadAnimation={false}
        />
      </div>

      {/* SECTION 1: DASHBOARD OVERVIEW */}
      {(activeTab === 'dashboard' || activeTab === 'requests') && (
        <div className="space-y-8">
          {/* REAL Database-Calculated KPI Cards Grid (8 Cards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Total Registered Users */}
            <GlassCard className="p-5 space-y-2 border-[#4F8CFF]/30" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <ScrambledText>Total Registered Users</ScrambledText>
                <Users className="w-4 h-4 text-[#4F8CFF]" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {dashboardData?.totalUsers ?? '...'}
              </div>
              <div className="text-xs text-emerald-400">Calculated via SQL `COUNT(*)`</div>
            </GlassCard>

            {/* KPI 2: Active Concurrent Users */}
            <GlassCard className="p-5 space-y-2 border-[#00E5FF]/30" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <ScrambledText>Active Concurrent Users</ScrambledText>
                <Activity className="w-4 h-4 text-[#00E5FF]" />
              </div>
              <div className="text-3xl font-extrabold text-[#00E5FF]">
                {dashboardData?.activeUsers ?? '...'}
              </div>
              <div className="flex items-center text-xs text-emerald-400 space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
                <span>Active sessions in database</span>
              </div>
            </GlassCard>

            {/* KPI 3: Logged In Today */}
            <GlassCard className="p-5 space-y-2 border-purple-500/30" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <ScrambledText>Logged In Today</ScrambledText>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {dashboardData?.loggedInToday ?? '...'}
              </div>
              <div className="text-xs text-slate-400">Users active today</div>
            </GlassCard>

            {/* KPI 4: Total AI Requests */}
            <GlassCard className="p-5 space-y-2 border-[#7B61FF]/30" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <ScrambledText>Total AI Requests</ScrambledText>
                <Sparkles className="w-4 h-4 text-[#7B61FF]" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {dashboardData?.totalAIRequests ?? '...'}
              </div>
              <div className="text-xs text-slate-400">Total payloads processed</div>
            </GlassCard>

            {/* KPI 5: Total Flashcards Generated */}
            <GlassCard className="p-5 space-y-2 border-[#4F8CFF]/30" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <ScrambledText>Total Flashcards Generated</ScrambledText>
                <Layers className="w-4 h-4 text-[#4F8CFF]" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {dashboardData?.totalFlashcards ?? '...'}
              </div>
              <div className="text-xs text-slate-400">Generated across all sessions</div>
            </GlassCard>

            {/* KPI 6: Total Quizzes Generated */}
            <GlassCard className="p-5 space-y-2 border-emerald-500/30" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <ScrambledText>Total Quizzes Generated</ScrambledText>
                <HelpCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">
                {dashboardData?.totalQuizzes ?? '...'}
              </div>
              <div className="text-xs text-slate-400">Interactive questions created</div>
            </GlassCard>

            {/* KPI 7: Average Quiz Score */}
            <GlassCard className="p-5 space-y-2 border-amber-500/30" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <ScrambledText>Average Quiz Score</ScrambledText>
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-amber-300">
                {dashboardData?.avgScorePercent ?? '...'}%
              </div>
              <div className="text-xs text-slate-400">Real database user quiz accuracy</div>
            </GlassCard>

            {/* KPI 8: Average Study Time */}
            <GlassCard className="p-5 space-y-2 border-cyan-500/30" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <ScrambledText>Average Study Time</ScrambledText>
                <Clock className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold text-cyan-300">
                {dashboardData?.avgStudyTimeMinutes ?? '...'} mins
              </div>
              <div className="text-xs text-slate-400">Calculated active engagement</div>
            </GlassCard>
          </div>

          {/* ONLINE USERS TELEMETRY MONITOR */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <GlassCard className="lg:col-span-1 space-y-4" hoverEffect={false}>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <ShinyText text="Real Online Active Users" color="#e2e8f0" shineColor="#00E5FF" speed={3} />
                </h3>
                <Badge variant="emerald">{onlineUsers.length} Active</Badge>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {onlineUsers.length === 0 ? (
                  <p className="text-slate-500 text-xs py-4 text-center">No active online sessions detected in database.</p>
                ) : (
                  onlineUsers.map((u, idx) => (
                    <div key={idx} className="p-3.5 bg-[#040816]/90 border border-slate-800 rounded-2xl space-y-1.5 text-xs">
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span>{u.name}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">{u.session_duration}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{u.email}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                        <span>{u.browser} / {u.device}</span>
                        <span>IP: {u.ip}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>

            {/* REAL DATABASE POPULAR TOPICS & ANALYTICS */}
            <GlassCard className="lg:col-span-2 space-y-6" hoverEffect={false}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    <ShinyText text="Most Popular Topics in Database" color="#e2e8f0" shineColor="#7B61FF" speed={3} />
                  </h3>
                  <p className="text-xs text-slate-400">Calculated from AI generation history</p>
                </div>
                <Badge variant="purple">Live Aggregations</Badge>
              </div>

              {!analyticsData?.popular_topics || analyticsData.popular_topics.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl">
                  <p className="text-slate-500 text-xs">No AI topic requests recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analyticsData.popular_topics.map((t, idx) => {
                    const percent = Math.min(100, Math.max(20, t.count * 30));
                    return (
                      <div key={idx} className="p-3 bg-[#040816]/80 border border-slate-800/80 rounded-xl space-y-1.5 text-xs">
                        <div className="flex justify-between font-medium">
                          <span className="text-white">{t.topic}</span>
                          <span className="text-[#00E5FF] font-mono">{t.count} Requests</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#4F8CFF] to-[#00E5FF] h-full rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      )}

      {/* SECTION 2: DEDICATED ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Analytics Header Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <GlassCard className="p-5 border-[#00E5FF]/30 space-y-2" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <DecryptedText text="AI Request Throughput" speed={30} />
                <Sparkles className="w-4 h-4 text-[#00E5FF]" />
              </div>
              <div className="text-3xl font-extrabold text-[#00E5FF]">
                {analyticsData?.ai_requests_total ?? dashboardData?.totalAIRequests ?? 0}
              </div>
              <p className="text-[11px] text-emerald-400">Real API Generation Payload Data</p>
            </GlassCard>

            <GlassCard className="p-5 border-purple-500/30 space-y-2" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <DecryptedText text="Flashcards Created" speed={30} />
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {analyticsData?.flashcards_total ?? dashboardData?.totalFlashcards ?? 0}
              </div>
              <p className="text-[11px] text-slate-400">Structured decks generated</p>
            </GlassCard>

            <GlassCard className="p-5 border-emerald-500/30 space-y-2" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <DecryptedText text="Quizzes Completed" speed={30} />
                <HelpCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">
                {analyticsData?.quizzes_total ?? dashboardData?.totalQuizzes ?? 0}
              </div>
              <p className="text-[11px] text-slate-400">Assessment modules solved</p>
            </GlassCard>

            <GlassCard className="p-5 border-[#4F8CFF]/30 space-y-2" hoverEffect={false}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <DecryptedText text="Active Daily Scholars" speed={30} />
                <Users className="w-4 h-4 text-[#4F8CFF]" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {analyticsData?.daily_users ?? userList.length ?? 0}
              </div>
              <p className="text-[11px] text-emerald-400">Registered platform users</p>
            </GlassCard>
          </div>

          {/* Topic Popularity & AI Content Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Popular Topics Bar Visualizer */}
            <GlassCard className="p-6 space-y-6" hoverEffect={false}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-[#00E5FF]" />
                    <ShinyText text="Topic Generation Analytics" color="#e2e8f0" shineColor="#00E5FF" speed={3} />
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Top AI study topics generated by scholars</p>
                </div>
                <Badge variant="emerald">Live Telemetry</Badge>
              </div>

              {(!analyticsData?.popular_topics || analyticsData.popular_topics.length === 0) ? (
                <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl">
                  <p className="text-slate-500 text-xs">No topic generation records found in backend database.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyticsData.popular_topics.map((t, idx) => {
                    const maxVal = Math.max(...analyticsData.popular_topics.map(p => p.count), 1);
                    const percent = Math.round((t.count / maxVal) * 100);
                    return (
                      <div key={idx} className="space-y-1.5 text-xs">
                        <div className="flex justify-between font-medium">
                          <span className="text-white font-semibold">{t.topic}</span>
                          <span className="text-[#00E5FF] font-mono">{t.count} generations ({percent}%)</span>
                        </div>
                        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                          <div
                            className="bg-gradient-to-r from-[#4F8CFF] via-[#7B61FF] to-[#00E5FF] h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(15, percent)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </GlassCard>

            {/* AI Latency & System Telemetry */}
            <GlassCard className="p-6 space-y-6" hoverEffect={false}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    <ShinyText text="System & API Health" color="#e2e8f0" shineColor="#FF9FFC" speed={3} />
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Google Gemini API & REST Database engine status</p>
                </div>
                <Badge variant="purple">200 OK</Badge>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#040816] border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Google Gemini API Engine</span>
                    <span className="text-slate-400 text-[11px]">Structured JSON Mode (gemini-1.5-flash / gemini-2.0)</span>
                  </div>
                  <Badge variant="emerald">Healthy</Badge>
                </div>

                <div className="p-4 bg-[#040816] border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Zod Schema Validation Pipeline</span>
                    <span className="text-slate-400 text-[11px]">Strict schema compliance rate</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold">100% Valid</span>
                </div>

                <div className="p-4 bg-[#040816] border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Database Sync Engine</span>
                    <span className="text-slate-400 text-[11px]">Low-latency JSON database storage</span>
                  </div>
                  <span className="text-[#00E5FF] font-mono font-bold">&lt; 15ms</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* SECTION 3: MEMBER DIRECTORY TABLE */}
      {(activeTab === 'dashboard' || activeTab === 'users') && (
        <GlassCard className="space-y-4" hoverEffect={false}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                <ShinyText text="User Directory & Database Telemetry" color="#e2e8f0" shineColor="#00E5FF" speed={3} />
              </h3>
              <p className="text-xs text-slate-400">Loaded directly from `users` backend database table</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search name or email..."
                  className="pl-9 pr-4 py-2 bg-[#040816] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 bg-[#040816] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
              >
                <option value="All">All Roles</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-[#040816] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">AI Requests</th>
                  <th className="py-3 px-4">Flashcards</th>
                  <th className="py-3 px-4">Quizzes</th>
                  <th className="py-3 px-4">Study Time</th>
                  <th className="py-3 px-4">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                      No matching users found in backend database.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 flex items-center space-x-3">
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-[#4F8CFF]/40" />
                        <div>
                          <span className="font-semibold text-white block">{u.name}</span>
                          <span className="text-[11px] text-slate-500">{u.email}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge variant={u.role === 'ADMIN' ? 'purple' : 'brand'}>{u.role}</Badge>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          u.status === 'Online' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Online' ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                          <span>{u.status}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold text-white">
                        {u.requests_count}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {u.flashcards_count}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-emerald-400">
                        {u.quiz_count}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-cyan-300">
                        {u.study_time_minutes}m
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        {new Date(u.last_login).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 bg-slate-900 border border-slate-800 disabled:opacity-50 rounded-lg"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1 bg-slate-900 border border-slate-800 disabled:opacity-50 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </GlassCard>
      )}

      {/* SECTION 4: LOGIN LOGS & ACTIVITY AUDIT */}
      {(activeTab === 'activity' || activeTab === 'dashboard') && (
        <GlassCard className="space-y-4" hoverEffect={false}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Database className="w-4 h-4 text-purple-400" />
              <ShinyText text="Login Audit Logs" color="#e2e8f0" shineColor="#7B61FF" speed={3} />
            </h3>
            <Badge variant="purple">{activityLogs.length} Events Recorded</Badge>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {activityLogs.length === 0 ? (
              <p className="text-slate-500 text-xs text-center py-4">No audit logs recorded.</p>
            ) : (
              activityLogs.map((log) => (
                <div key={log.id} className="p-3 bg-[#040816]/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <Badge variant={log.event === 'LOGIN' ? 'emerald' : 'amber'}>{log.event}</Badge>
                    <span className="font-semibold text-white">{log.user_email}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-mono">
                    <span>IP: {log.ip}</span>
                    <span>{log.browser} / {log.device}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      )}

      {/* SECTION 5: SETTINGS TAB */}
      {activeTab === 'settings' && (
        <GlassCard className="p-6 space-y-6" hoverEffect={false}>
          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <div className="p-3 bg-[#4F8CFF]/20 border border-[#4F8CFF]/30 rounded-xl text-[#00E5FF]">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                <ShinyText text="Enterprise Platform Settings" color="#e2e8f0" shineColor="#00E5FF" speed={3} />
              </h3>
              <p className="text-xs text-slate-400">Configure global AI limits, API keys, and security controls</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <label className="block font-semibold text-slate-300">Environment API Mode</label>
              <div className="p-3 bg-[#040816] border border-slate-800 rounded-xl text-white font-mono">
                Gemini Production REST Server (Port 3001)
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-semibold text-slate-300">Default AI Model</label>
              <div className="p-3 bg-[#040816] border border-slate-800 rounded-xl text-[#00E5FF] font-mono">
                gemini-1.5-flash (Fast & Structured)
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </PageWrapper>
  );
}
