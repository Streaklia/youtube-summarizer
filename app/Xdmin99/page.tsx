'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Youtube,
  Lock,
  ExternalLink,
  LogOut,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  Check,
  AlertCircle,
  TrendingUp,
  Globe,
  DollarSign,
  FileText,
  Sliders,
  BarChart3,
  Sparkles,
  Settings,
  Code,
  Eye,
  X,
} from 'lucide-react';
import { SettingsModal } from '@/components/SettingsModal';
import { AISettings } from '@/lib/types';
import {
  SiteSeoSettings,
  MonetizationSettings,
  PageOrPost,
  KeywordToolPage,
  TelemetryData,
} from '@/lib/adminTypes';
import {
  DEFAULT_SITE_SEO_SETTINGS,
  DEFAULT_MONETIZATION_SETTINGS,
  DEFAULT_PAGES_AND_POSTS,
  DEFAULT_KEYWORD_TOOLS,
  DEFAULT_TELEMETRY,
} from '@/lib/adminStore';

type AdminTab = 'telemetry' | 'seo' | 'monetization' | 'pages' | 'tools';

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('telemetry');

  // Dashboard Data State
  const [seoSettings, setSeoSettings] = useState<SiteSeoSettings>(DEFAULT_SITE_SEO_SETTINGS);
  const [monetizationSettings, setMonetizationSettings] = useState<MonetizationSettings>(DEFAULT_MONETIZATION_SETTINGS);
  const [pagesList, setPagesList] = useState<PageOrPost[]>(DEFAULT_PAGES_AND_POSTS);
  const [toolsList, setToolsList] = useState<KeywordToolPage[]>(DEFAULT_KEYWORD_TOOLS);
  const [telemetryData, setTelemetryData] = useState<TelemetryData>(DEFAULT_TELEMETRY);
  const [telemetryTimeframe, setTelemetryTimeframe] = useState('Past 30 Days');

  // Modals & Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [syncLoading, setSyncLoading] = useState(false);

  // Page / Post Modal
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageOrPost | null>(null);

  // Tool Modal
  const [toolModalOpen, setToolModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<KeywordToolPage | null>(null);

  // AI & Gemini Settings Modal (Protected Admin Console Only)
  const [aiSettingsModalOpen, setAiSettingsModalOpen] = useState(false);
  const [aiSettings, setAiSettings] = useState<AISettings>({
    provider: 'gemini',
    openrouterApiKey: '',
    openrouterModel: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('yt-summarizer-settings');
        if (stored) {
          setAiSettings(JSON.parse(stored));
        }
      } catch {}
    }
  }, []);

  const handleSaveAiSettings = (newSettings: AISettings) => {
    setAiSettings(newSettings);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('yt-summarizer-settings', JSON.stringify(newSettings));
      } catch {}
    }
    showToast('AI Provider & Model Settings updated successfully!');
  };

  // Check existing session on load
  useEffect(() => {
    checkSession();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const checkSession = async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (res.ok) {
        setIsAuthenticated(true);
        loadServerData();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const loadServerData = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.seo) setSeoSettings(data.seo);
        if (data.monetization) setMonetizationSettings(data.monetization);
        if (data.pages) setPagesList(data.pages);
        if (data.tools) setToolsList(data.tools);
        if (data.telemetry) setTelemetryData(data.telemetry);
      }
    } catch (e) {
      console.warn('Using local fallback state for admin dashboard:', e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setIsAuthenticated(true);
      showToast('Welcome to MyTranscript Command Console');
      loadServerData();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid credentials');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {}
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleSyncDefaults = async () => {
    setSyncLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync_defaults' }),
      });
      if (res.ok) {
        const data = await res.json();
        setSeoSettings(data.store.seo);
        setMonetizationSettings(data.store.monetization);
        setPagesList(data.store.pages);
        setToolsList(data.store.tools);
        setTelemetryData(data.store.telemetry);
        showToast('System defaults synchronized successfully');
      }
    } catch {
      showToast('Defaults refreshed locally');
    } finally {
      setSyncLoading(false);
    }
  };

  const handleSaveSeo = async () => {
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_seo', payload: seoSettings }),
      });
      showToast('Site & SEO Settings saved successfully!');
    } catch {
      showToast('Settings saved locally');
    }
  };

  const handleSaveMonetization = async () => {
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_monetization', payload: monetizationSettings }),
      });
      showToast('Monetization & Ads settings saved successfully!');
    } catch {
      showToast('Monetization saved locally');
    }
  };

  // Pages / Posts Handlers
  const handleSavePageModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage?.title || !editingPage?.route) return;

    let updated: PageOrPost[];
    if (editingPage.id) {
      updated = pagesList.map((p) => (p.id === editingPage.id ? { ...editingPage, updatedAt: 'Just now' } : p));
    } else {
      const newPage: PageOrPost = {
        ...editingPage,
        id: `p-${Date.now()}`,
        updatedAt: 'Just now',
      };
      updated = [newPage, ...pagesList];
    }

    setPagesList(updated);
    setPageModalOpen(false);
    setEditingPage(null);

    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_pages', payload: updated }),
      });
      showToast('Page saved successfully!');
    } catch {}
  };

  const handleDeletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    const updated = pagesList.filter((p) => p.id !== id);
    setPagesList(updated);
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_pages', payload: updated }),
      });
      showToast('Page deleted');
    } catch {}
  };

  // Keywords & Tool Engine Handlers
  const handleSaveToolModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool?.englishTitle || !editingTool?.slug) return;

    let updated: KeywordToolPage[];
    if (editingTool.id) {
      updated = toolsList.map((t) => (t.id === editingTool.id ? editingTool : t));
    } else {
      const newTool: KeywordToolPage = {
        ...editingTool,
        id: `tool-${Date.now()}`,
        badge: editingTool.badge || 'AI TOOL',
        status: 'Active',
      };
      updated = [newTool, ...toolsList];
    }

    setToolsList(updated);
    setToolModalOpen(false);
    setEditingTool(null);

    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_tools', payload: updated }),
      });
      showToast('Tool page saved successfully!');
    } catch {}
  };

  const handleDeleteTool = async (id: string) => {
    if (!confirm('Are you sure you want to remove this tool page?')) return;
    const updated = toolsList.filter((t) => t.id !== id);
    setToolsList(updated);
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_tools', payload: updated }),
      });
      showToast('Tool page removed');
    } catch {}
  };

  // Loading Session Screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 text-zinc-300">
        <div className="flex items-center gap-3 text-sm">
          <RefreshCw className="w-4 h-4 animate-spin text-red-500" />
          <span>Verifying Command Console Session...</span>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              MyTranscript <span className="text-red-500 font-semibold">Command Console</span>
            </h1>
            <p className="text-xs text-zinc-400">
              Enter authorized administrator credentials to access the console
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Console</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-center text-[11px] text-zinc-500">
            <span>Security: Protected Session · Access Restricted</span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Command Console Dashboard
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans antialiased pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[100] px-4 py-2.5 bg-zinc-800 text-white rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium animate-fade-in-up border border-zinc-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Console Bar */}
      <header className="bg-zinc-950/90 border-b border-zinc-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: Brand Identity & Active Status */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-sm">
                <Youtube className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-white tracking-tight">
                    MyTranscript <span className="font-medium text-zinc-400">Command Console</span>
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-rose-400 bg-rose-950/60 border border-rose-800/80">
                    Active Session
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">
                  Route: /Xdmin99 <span className="text-zinc-700">|</span> English Architecture
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAiSettingsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl transition-all shadow-sm cursor-pointer"
                title="Configure Gemini & OpenRouter AI settings"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="capitalize">{aiSettings.provider || 'Gemini'}</span>
                <span className="text-red-300">·</span>
                <Settings className="w-3.5 h-3.5" />
                <span>AI Settings</span>
              </button>

              <button
                type="button"
                onClick={handleSyncDefaults}
                disabled={syncLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-zinc-400 ${syncLoading ? 'animate-spin' : ''}`} />
                <span>Sync Defaults</span>
              </button>

              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 text-zinc-400" />
                <span>View Site</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/60 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-zinc-800/80 bg-zinc-950 overflow-x-auto no-scrollbar">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'telemetry'
                  ? 'border-red-500 text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Telemetry &amp; Funnel</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'seo'
                  ? 'border-red-500 text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Site Identity &amp; Global SEO</span>
            </button>

            <button
              onClick={() => setActiveTab('monetization')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'monetization'
                  ? 'border-red-500 text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Monetization &amp; Ads</span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'pages'
                  ? 'border-red-500 text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Pages &amp; Articles</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'tools'
                  ? 'border-red-500 text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <Sliders className="w-4 h-4 text-rose-400" />
              <span>Keyword Tool Engine</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        {/* =============================================================
            TAB 1: TELEMETRY & FUNNEL
           ============================================================= */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            {/* Top Bar: Live Traffic Telemetry Header */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">
                      Live Traffic &amp; Conversion Telemetry
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Real-time user extractions, search impressions, and download performance
                    </p>
                  </div>
                </div>

                {/* Timeframe Selector */}
                <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-medium">
                  {['Today', 'Past 7 Days', 'Past 30 Days', 'Past 90 Days'].map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setTelemetryTimeframe(tf)}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        telemetryTimeframe === tf
                          ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Unique Visitors
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">
                    {telemetryData.uniqueVisitors.toLocaleString()}
                  </div>
                  <span className="text-xs text-emerald-400 font-medium mt-1 inline-flex items-center gap-1">
                    Direct &amp; Organic Search
                  </span>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Media Extractions
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">
                    {telemetryData.mediaExtractions.toLocaleString()}
                  </div>
                  <span className="text-xs text-rose-400 font-medium mt-1 inline-flex items-center gap-1">
                    Transcripts &amp; Summaries Processed
                  </span>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Completed Downloads
                  </span>
                  <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                    {telemetryData.completedDownloads.toLocaleString()}
                  </div>
                  <span className="text-xs text-zinc-400 font-mono mt-1 block">
                    TXT, PDF, SRT Downloads
                  </span>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Overall Conversion Rate
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">
                    {telemetryData.conversionRate}%
                  </div>
                  <span className="text-xs text-zinc-400 mt-1 block">
                    Visitors to Completed Downloads
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Grid: Traffic Channels & Top Visitor Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Channels */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Traffic Channels
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                        <th className="pb-2">Channel</th>
                        <th className="pb-2">Visitors</th>
                        <th className="pb-2 text-right">Share %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {telemetryData.trafficChannels.map((tc, idx) => (
                        <tr key={idx} className="hover:bg-zinc-800/30">
                          <td className="py-2.5 font-medium text-zinc-200">{tc.channel}</td>
                          <td className="py-2.5 text-zinc-400">{tc.visitors.toLocaleString()}</td>
                          <td className="py-2.5 text-right font-bold text-rose-400">{tc.share}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Visitor Countries */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Top Visitor Countries
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                        <th className="pb-2">Country</th>
                        <th className="pb-2">Visitors</th>
                        <th className="pb-2 text-right">Share %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {telemetryData.visitorCountries.map((vc, idx) => (
                        <tr key={idx} className="hover:bg-zinc-800/30">
                          <td className="py-2.5 font-medium text-zinc-200 flex items-center gap-2">
                            <span>{vc.flag}</span>
                            <span>{vc.country}</span>
                          </td>
                          <td className="py-2.5 text-zinc-400">{vc.visitors.toLocaleString()}</td>
                          <td className="py-2.5 text-right font-bold text-indigo-400">{vc.share}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Real-Time Activity Stream */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Recent Extraction &amp; Download Activity
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                  channel: live_stream
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                      <th className="pb-2">Userhandle</th>
                      <th className="pb-2">Format</th>
                      <th className="pb-2">Country</th>
                      <th className="pb-2 text-right">Logged Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-mono text-[11px]">
                    {telemetryData.activityStream.map((act) => (
                      <tr key={act.id} className="hover:bg-zinc-800/30">
                        <td className="py-3 text-zinc-200 font-medium">{act.userHandle}</td>
                        <td className="py-3 text-zinc-400">{act.format}</td>
                        <td className="py-3 text-zinc-400">{act.country}</td>
                        <td className="py-3 text-right text-zinc-500">{act.loggedTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB 2: SITE & SEO SETTINGS
           ============================================================= */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            {/* Card 1: Site Identity & Branding */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-rose-400">🌐</span>
                <h3 className="text-sm font-bold text-white">Site Identity &amp; Branding</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Site Name</label>
                  <input
                    type="text"
                    value={seoSettings.siteName}
                    onChange={(e) => setSeoSettings({ ...seoSettings, siteName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Logo Text</label>
                  <input
                    type="text"
                    value={seoSettings.logoText}
                    onChange={(e) => setSeoSettings({ ...seoSettings, logoText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Favicon URL</label>
                  <input
                    type="text"
                    value={seoSettings.faviconUrl}
                    onChange={(e) => setSeoSettings({ ...seoSettings, faviconUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">OpenGraph Share Image URL</label>
                  <input
                    type="text"
                    value={seoSettings.openGraphImageUrl}
                    onChange={(e) => setSeoSettings({ ...seoSettings, openGraphImageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Global SEO Defaults */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">✨</span>
                <h3 className="text-sm font-bold text-white">Global SEO Defaults</h3>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Site Meta Title</label>
                  <input
                    type="text"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Meta Keywords</label>
                  <input
                    type="text"
                    value={seoSettings.metaKeywords}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Raw Scripts Inserter */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Raw Scripts Inserter (Header &amp; Footer)</h3>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Custom Head HTML / Tracking Scripts (<code className="text-red-400">&lt;head&gt;</code>)
                  </label>
                  <textarea
                    rows={4}
                    value={seoSettings.headerScripts}
                    onChange={(e) => setSeoSettings({ ...seoSettings, headerScripts: e.target.value })}
                    className="w-full font-mono text-xs px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Custom Footer Scripts (Before <code className="text-red-400">&lt;/body&gt;</code>)
                  </label>
                  <textarea
                    rows={3}
                    value={seoSettings.footerScripts}
                    onChange={(e) => setSeoSettings({ ...seoSettings, footerScripts: e.target.value })}
                    className="w-full font-mono text-xs px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveSeo}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Site &amp; SEO Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB 3: MONETIZATION & ADS
           ============================================================= */}
        {activeTab === 'monetization' && (
          <div className="space-y-6">
            {/* Download Interstitial Countdown Timer Ad */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">⏱️</span>
                <h3 className="text-sm font-bold text-white">Download Interstitial Countdown Timer Ad</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Enable Countdown Ad Modal</span>
                    <span className="text-[11px] text-zinc-400">
                      Shows interstitial ad and runs countdown before file download starts
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={monetizationSettings.enableCountdownModal}
                    onChange={(e) =>
                      setMonetizationSettings({
                        ...monetizationSettings,
                        enableCountdownModal: e.target.checked,
                      })
                    }
                    className="w-5 h-5 accent-red-600 rounded cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                  <label className="block text-xs font-bold text-white">
                    Countdown Duration (Seconds)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={monetizationSettings.countdownDuration}
                    onChange={(e) =>
                      setMonetizationSettings({
                        ...monetizationSettings,
                        countdownDuration: parseInt(e.target.value, 10) || 5,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white font-semibold"
                  />
                  <span className="text-[10px] text-zinc-500 block">
                    Recommended: 5 to 7 seconds. Set to 0 to trigger immediate downloads.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Interstitial Ad HTML/Script Code
                </label>
                <textarea
                  rows={4}
                  value={monetizationSettings.interstitialAdHtml}
                  onChange={(e) =>
                    setMonetizationSettings({
                      ...monetizationSettings,
                      interstitialAdHtml: e.target.value,
                    })
                  }
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Grid of 4 Ad Slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-2">
                <label className="block text-xs font-bold text-white">Header Ad Slot (Top of Page)</label>
                <textarea
                  rows={4}
                  value={monetizationSettings.headerAdSlot}
                  onChange={(e) =>
                    setMonetizationSettings({ ...monetizationSettings, headerAdSlot: e.target.value })
                  }
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-2">
                <label className="block text-xs font-bold text-white">Above Results Ad Slot</label>
                <textarea
                  rows={4}
                  value={monetizationSettings.aboveResultsAdSlot}
                  onChange={(e) =>
                    setMonetizationSettings({
                      ...monetizationSettings,
                      aboveResultsAdSlot: e.target.value,
                    })
                  }
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-2">
                <label className="block text-xs font-bold text-white">Below Results Ad Slot</label>
                <textarea
                  rows={4}
                  value={monetizationSettings.belowResultsAdSlot}
                  onChange={(e) =>
                    setMonetizationSettings({
                      ...monetizationSettings,
                      belowResultsAdSlot: e.target.value,
                    })
                  }
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-2">
                <label className="block text-xs font-bold text-white">Footer Ad Slot (Above website footer)</label>
                <textarea
                  rows={4}
                  value={monetizationSettings.footerAdSlot}
                  onChange={(e) =>
                    setMonetizationSettings({ ...monetizationSettings, footerAdSlot: e.target.value })
                  }
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveMonetization}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Monetization Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB 4: PAGES & ARTICLES
           ============================================================= */}
        {activeTab === 'pages' && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-950/60 text-purple-400 border border-purple-800/80 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Pages &amp; Articles Management</h2>
                  <p className="text-xs text-zinc-400">
                    Manage static pages (/about-us, /privacy-policy, etc.) and published articles (/articles/[slug]).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingPage({
                    id: '',
                    title: '',
                    type: 'PAGE',
                    route: '/new-page',
                    menuPlacement: 'Footer',
                    status: 'Published',
                    content: '',
                  });
                  setPageModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Page or Article</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold bg-zinc-950/50">
                    <th className="py-2.5 px-3">Title</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Route Path</th>
                    <th className="py-2.5 px-3">Placement</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {pagesList.map((page) => (
                    <tr key={page.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-3 font-semibold text-zinc-100">{page.title}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${
                            page.type === 'POST'
                              ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80'
                              : 'text-purple-400 bg-purple-950/60 border-purple-800/80'
                          }`}
                        >
                          {page.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-zinc-400">{page.route}</td>
                      <td className="py-3 px-3 text-zinc-400">{page.menuPlacement}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80">
                          {page.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-1.5">
                        <Link
                          href={page.route}
                          target="_blank"
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg inline-block transition-colors"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPage(page);
                            setPageModalOpen(true);
                          }}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg inline-block transition-colors cursor-pointer"
                          title="Edit Page"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePage(page.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg inline-block transition-colors cursor-pointer"
                          title="Delete Page"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB 5: KEYWORDS & TOOLS ENGINE
           ============================================================= */}
        {activeTab === 'tools' && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-950/60 text-rose-400 border border-rose-800/80 rounded-xl">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Keywords &amp; Landing Tools Engine</h2>
                  <p className="text-xs text-zinc-400">
                    Manage programmatic SEO tool routes (/youtube-transcript, /youtube-summary, etc.).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingTool({
                    id: '',
                    badge: 'NEW TOOL',
                    slug: '/tool-slug',
                    targetKeyword: 'youtube keyword',
                    englishTitle: 'Title for New Tool Page',
                    description: 'Tool meta description',
                    status: 'Active',
                  });
                  setToolModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tool Page</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold bg-zinc-950/50">
                    <th className="py-2.5 px-3">Badge</th>
                    <th className="py-2.5 px-3">Slug Route</th>
                    <th className="py-2.5 px-3">Target Keyword</th>
                    <th className="py-2.5 px-3">English H1 / Title</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {toolsList.map((tool) => (
                    <tr key={tool.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-mono text-[10px] font-bold text-zinc-300 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded uppercase">
                          {tool.badge}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-red-400 font-medium">
                        {tool.slug}
                      </td>
                      <td className="py-3 px-3 text-zinc-400 italic">{tool.targetKeyword}</td>
                      <td className="py-3 px-3 font-medium text-zinc-200">{tool.englishTitle}</td>
                      <td className="py-3 px-3 text-right space-x-1.5">
                        <Link
                          href={tool.slug}
                          target="_blank"
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg inline-block transition-colors"
                          title="Open Tool Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTool(tool);
                            setToolModalOpen(true);
                          }}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg inline-block transition-colors cursor-pointer"
                          title="Edit Tool Configuration"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTool(tool.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg inline-block transition-colors cursor-pointer"
                          title="Delete Tool"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* =============================================================
          PAGE / POST MODAL
         ============================================================= */}
      {pageModalOpen && editingPage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setPageModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-4 text-zinc-100">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingPage.id ? 'Edit Page / Article' : 'Create New Page or Article'}
              </h3>
              <button onClick={() => setPageModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePageModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  placeholder="e.g. Privacy Policy or How to Get YouTube Transcript"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Type</label>
                  <select
                    value={editingPage.type}
                    onChange={(e) => {
                      const newType = e.target.value as 'PAGE' | 'POST';
                      const defaultRoute =
                        newType === 'POST' && !editingPage.route.startsWith('/articles')
                          ? `/articles/${editingPage.route.replace(/^\//, '') || 'new-article'}`
                          : editingPage.route;
                      setEditingPage({ ...editingPage, type: newType, route: defaultRoute });
                    }}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="PAGE">PAGE (Static Canonical Route)</option>
                    <option value="POST">POST (Article under /articles/)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Menu Placement</label>
                  <select
                    value={editingPage.menuPlacement}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        menuPlacement: e.target.value as 'Header' | 'Footer' | 'Both' | 'None',
                      })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="Header">Header</option>
                    <option value="Footer">Footer</option>
                    <option value="Both">Both</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Route Path ({editingPage.type === 'POST' ? '/articles/[slug]' : '/[slug]'})
                </label>
                <input
                  type="text"
                  required
                  value={editingPage.route}
                  onChange={(e) => setEditingPage({ ...editingPage, route: e.target.value })}
                  placeholder={editingPage.type === 'POST' ? '/articles/my-article-slug' : '/my-page'}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-red-500"
                />
                <p className="mt-1.5 text-[11px] text-zinc-500">
                  Must start with a slash, e.g.{' '}
                  <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-300 border border-zinc-800">
                    {editingPage.type === 'POST' ? '/articles/my-guide' : '/privacy-policy'}
                  </code>
                </p>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Page Body Content</label>
                <textarea
                  rows={4}
                  value={editingPage.content || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  placeholder="Markdown or HTML body content..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setPageModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-sm transition-all cursor-pointer"
                >
                  Save Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =============================================================
          KEYWORD TOOL MODAL
         ============================================================= */}
      {toolModalOpen && editingTool && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setToolModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-4 text-zinc-100">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingTool.id ? 'Edit Tool Page' : 'Add New Tool Landing Page'}
              </h3>
              <button onClick={() => setToolModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveToolModal} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    required
                    value={editingTool.badge}
                    onChange={(e) => setEditingTool({ ...editingTool, badge: e.target.value.toUpperCase() })}
                    placeholder="TRANSCRIPT"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs uppercase text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Slug Route</label>
                  <input
                    type="text"
                    required
                    value={editingTool.slug}
                    onChange={(e) => setEditingTool({ ...editingTool, slug: e.target.value })}
                    placeholder="/youtube-transcript"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs text-red-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Target SEO Keyword</label>
                <input
                  type="text"
                  required
                  value={editingTool.targetKeyword}
                  onChange={(e) => setEditingTool({ ...editingTool, targetKeyword: e.target.value })}
                  placeholder="youtube transcript generator"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">English Title</label>
                <input
                  type="text"
                  required
                  value={editingTool.englishTitle}
                  onChange={(e) => setEditingTool({ ...editingTool, englishTitle: e.target.value })}
                  placeholder="YouTube Transcript Generator – Free Online Video to Text"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={editingTool.description}
                  onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                  placeholder="Description for search engines and social cards..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setToolModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-sm transition-all cursor-pointer"
                >
                  Save Tool Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Settings Modal (Exclusive to Protected Admin Console) */}
      <SettingsModal
        isOpen={aiSettingsModalOpen}
        onClose={() => setAiSettingsModalOpen(false)}
        settings={aiSettings}
        onSave={handleSaveAiSettings}
      />
    </div>
  );
}
