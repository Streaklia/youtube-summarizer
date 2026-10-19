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
  Languages,
  Sliders,
  BarChart3,
  Search,
  Sparkles,
  Code,
  ShieldCheck,
  Eye,
  X,
} from 'lucide-react';
import {
  SiteSeoSettings,
  MonetizationSettings,
  PageOrPost,
  LanguageSetting,
  KeywordToolPage,
  TelemetryData,
} from '@/lib/adminTypes';
import {
  DEFAULT_SITE_SEO_SETTINGS,
  DEFAULT_MONETIZATION_SETTINGS,
  DEFAULT_PAGES_AND_POSTS,
  DEFAULT_LANGUAGES,
  DEFAULT_KEYWORD_TOOLS,
  DEFAULT_TELEMETRY,
} from '@/lib/adminStore';

type AdminTab = 'telemetry' | 'seo' | 'monetization' | 'pages' | 'languages' | 'tools';

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
  const [languagesList, setLanguagesList] = useState<LanguageSetting[]>(DEFAULT_LANGUAGES);
  const [selectedLangCode, setSelectedLangCode] = useState('en');
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
        if (data.languages) setLanguagesList(data.languages);
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
      showToast('Welcome to YouTubeSummarizer Command Console');
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
        setLanguagesList(data.store.languages);
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
      showToast('Settings saved locally');
    }
  };

  const handleSaveLanguages = async () => {
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_languages', payload: languagesList }),
      });
      showToast('Language translations saved successfully!');
    } catch {
      showToast('Translations saved locally');
    }
  };

  // -------------------------------------------------------------
  // Pages / Posts Handlers
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // Keywords & Tool Engine Handlers
  // -------------------------------------------------------------
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
      updated = [...toolsList, newTool];
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
      showToast('Keyword Tool saved successfully!');
    } catch {}
  };

  const handleDeleteTool = async (id: string) => {
    if (!confirm('Delete this tool page from the engine?')) return;
    const updated = toolsList.filter((t) => t.id !== id);
    setToolsList(updated);
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_tools', payload: updated }),
      });
      showToast('Tool page deleted');
    } catch {}
  };

  // -------------------------------------------------------------
  // Loading & Unauthenticated View
  // -------------------------------------------------------------
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <RefreshCw className="w-4 h-4 animate-spin text-red-500" />
          <span>Verifying Command Console Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              YouTubeSummarizer <span className="text-red-500 font-semibold">Command Console</span>
            </h1>
            <p className="text-xs text-slate-500">
              Enter authorized administrator credentials to access the console
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="user99"
                required
                autoFocus
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
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

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Security: Protected Session</span>
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">user99 / user7</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Authenticated Command Console Dashboard
  // -------------------------------------------------------------
  const activeLanguageObj = languagesList.find((l) => l.code === selectedLangCode) || languagesList[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[100] px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium animate-fade-in-up border border-slate-800">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Console Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: Brand Identity & Active Status */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-sm">
                <Youtube className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-slate-900 tracking-tight">
                    YouTubeSummarizer <span className="font-medium text-slate-600">Command Console</span>
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-rose-600 bg-rose-50 border border-rose-200">
                    Active Session
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Route: /admin <span className="text-slate-300">|</span> Protected Console
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSyncDefaults}
                disabled={syncLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${syncLoading ? 'animate-spin' : ''}`} />
                <span>Sync Defaults</span>
              </button>

              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Site</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-slate-100 bg-white overflow-x-auto no-scrollbar">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'telemetry'
                  ? 'border-slate-900 text-slate-900 bg-slate-50/60'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/40'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <span>Telemetry &amp; Funnel</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'seo'
                  ? 'border-slate-900 text-slate-900 bg-slate-50/60'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/40'
              }`}
            >
              <Globe className="w-4 h-4 text-rose-500" />
              <span>Site &amp; SEO Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('monetization')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'monetization'
                  ? 'border-slate-900 text-slate-900 bg-slate-50/60'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/40'
              }`}
            >
              <DollarSign className="w-4 h-4 text-amber-500" />
              <span>Monetization &amp; Ads</span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'pages'
                  ? 'border-slate-900 text-slate-900 bg-slate-50/60'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/40'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>Pages &amp; Blog Posts</span>
            </button>

            <button
              onClick={() => setActiveTab('languages')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'languages'
                  ? 'border-slate-900 text-slate-900 bg-slate-50/60'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/40'
              }`}
            >
              <Languages className="w-4 h-4 text-blue-500" />
              <span>Languages</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'tools'
                  ? 'border-slate-900 text-slate-900 bg-slate-50/60'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/40'
              }`}
            >
              <Sliders className="w-4 h-4 text-violet-500" />
              <span>Keywords &amp; Tools Engine</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        {/* =============================================================
            TAB 1: TELEMETRY & FUNNEL (Matches Reference Screenshot 1)
           ============================================================= */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            {/* Header + Timeframe Pills */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Conversion Funnel &amp; Traffic Telemetry</h2>
                    <p className="text-xs text-slate-500">
                      Real-time visitors, acquisition channels, completed downloads, and country metrics from PostgreSQL
                    </p>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {['Today', 'This Week', 'Past 30 Days', 'This Month', 'Last Month', 'Custom Range'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTelemetryTimeframe(tf)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        telemetryTimeframe === tf
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Unique Visitors (PostgreSQL)
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">
                    {telemetryData.uniqueVisitors.toLocaleString()}
                  </div>
                  <span className="text-xs text-emerald-600 font-medium mt-1 inline-flex items-center gap-1">
                    Direct &amp; External Referrals
                  </span>
                </div>

                <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Media Extractions
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">
                    {telemetryData.mediaExtractions.toLocaleString()}
                  </div>
                  <span className="text-xs text-rose-500 font-medium mt-1 inline-flex items-center gap-1">
                    Parsed Video &amp; Subtitle Requests
                  </span>
                </div>

                <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Completed File Downloads
                  </span>
                  <div className="text-3xl font-extrabold text-emerald-600 mt-1">
                    {telemetryData.completedDownloads.toLocaleString()}
                  </div>
                  <span className="text-xs text-slate-500 font-mono mt-1 block">
                    Logged in download_logs
                  </span>
                </div>

                <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Overall Conversion Rate
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">
                    {telemetryData.conversionRate}%
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Visitors to Completed Downloads
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Grid: Traffic Channels & Top Visitor Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Channels */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Traffic Channels
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        <th className="pb-2">Channel</th>
                        <th className="pb-2">Visitors</th>
                        <th className="pb-2 text-right">Share %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {telemetryData.trafficChannels.map((tc, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 font-medium text-slate-800">{tc.channel}</td>
                          <td className="py-2.5 text-slate-600">{tc.visitors}</td>
                          <td className="py-2.5 text-right font-bold text-rose-500">{tc.share}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Visitor Countries */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Top Visitor Countries
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        <th className="pb-2">Country</th>
                        <th className="pb-2">Visitors</th>
                        <th className="pb-2 text-right">Share %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {telemetryData.visitorCountries.map((vc, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 font-medium text-slate-800 flex items-center gap-2">
                            <span>{vc.flag}</span>
                            <span>{vc.country}</span>
                          </td>
                          <td className="py-2.5 text-slate-600">{vc.visitors}</td>
                          <td className="py-2.5 text-right font-bold text-indigo-600">{vc.share}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Language Performance */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-violet-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Language Performance
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      <th className="pb-2">Language</th>
                      <th className="pb-2">Visits</th>
                      <th className="pb-2 text-right">Conv. %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {telemetryData.languagePerformance.map((lp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2.5 font-medium text-slate-800 flex items-center gap-2">
                          <span>{lp.flag}</span>
                          <span>{lp.language}</span>
                        </td>
                        <td className="py-2.5 text-slate-600">{lp.visits}</td>
                        <td className="py-2.5 text-right font-bold text-emerald-600">{lp.convRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real-Time Activity Stream */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Real-Time PostgreSQL Download Activity Stream
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  table: download_logs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      <th className="pb-2">Userhandle</th>
                      <th className="pb-2">Quality</th>
                      <th className="pb-2">Format</th>
                      <th className="pb-2">Country</th>
                      <th className="pb-2 text-right">Logged Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {telemetryData.activityStream.map((act) => (
                      <tr key={act.id} className="hover:bg-slate-50/50">
                        <td className="py-3 text-slate-700 font-medium">{act.userHandle}</td>
                        <td className="py-3 text-slate-600">{act.quality}</td>
                        <td className="py-3 text-slate-600">{act.format}</td>
                        <td className="py-3 text-slate-600">{act.country}</td>
                        <td className="py-3 text-right text-slate-400">{act.loggedTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB 2: SITE & SEO SETTINGS (Matches Reference Screenshot 2)
           ============================================================= */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            {/* Card 1: Site Identity & Branding */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-rose-500">🌐</span>
                <h3 className="text-sm font-bold text-slate-900">Site Identity &amp; Branding</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Site Name</label>
                  <input
                    type="text"
                    value={seoSettings.siteName}
                    onChange={(e) => setSeoSettings({ ...seoSettings, siteName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Logo Text</label>
                  <input
                    type="text"
                    value={seoSettings.logoText}
                    onChange={(e) => setSeoSettings({ ...seoSettings, logoText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Favicon URL</label>
                  <input
                    type="text"
                    value={seoSettings.faviconUrl}
                    onChange={(e) => setSeoSettings({ ...seoSettings, faviconUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">OpenGraph Share Image URL</label>
                  <input
                    type="text"
                    value={seoSettings.openGraphImageUrl}
                    onChange={(e) => setSeoSettings({ ...seoSettings, openGraphImageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Global SEO Defaults */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-500">✨</span>
                <h3 className="text-sm font-bold text-slate-900">Global SEO Defaults</h3>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Site Meta Title</label>
                  <input
                    type="text"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Meta Keywords</label>
                  <input
                    type="text"
                    value={seoSettings.metaKeywords}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Raw Scripts Inserter */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-500" />
                <h3 className="text-sm font-bold text-slate-900">Raw Scripts Inserter (Header &amp; Footer)</h3>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Header Scripts (Injected inside &lt;head&gt;)
                  </label>
                  <textarea
                    rows={4}
                    value={seoSettings.headerScripts}
                    onChange={(e) => setSeoSettings({ ...seoSettings, headerScripts: e.target.value })}
                    className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-900 text-slate-100 border border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Footer Scripts (Injected right before &lt;/body&gt;)
                  </label>
                  <textarea
                    rows={4}
                    value={seoSettings.footerScripts}
                    onChange={(e) => setSeoSettings({ ...seoSettings, footerScripts: e.target.value })}
                    className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-900 text-slate-100 border border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveSeo}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Save Site Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB 3: MONETIZATION & ADS (Matches Reference Screenshot 4)
           ============================================================= */}
        {activeTab === 'monetization' && (
          <div className="space-y-6">
            {/* Download Interstitial Countdown Timer Ad */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-500">⏱️</span>
                <h3 className="text-sm font-bold text-slate-900">Download Interstitial Countdown Timer Ad</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Enable Countdown Ad Modal</span>
                    <span className="text-[11px] text-slate-500">
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

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
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
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Recommended: 5 to 7 seconds. Set to 0 to trigger immediate downloads.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
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
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Grid of 4 Ad Slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                <label className="block text-xs font-bold text-slate-800">Header Ad Slot (Top of Page)</label>
                <textarea
                  rows={4}
                  value={monetizationSettings.headerAdSlot}
                  onChange={(e) =>
                    setMonetizationSettings({ ...monetizationSettings, headerAdSlot: e.target.value })
                  }
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                <label className="block text-xs font-bold text-slate-800">Above Results Ad Slot</label>
                <textarea
                  rows={4}
                  value={monetizationSettings.aboveResultsAdSlot}
                  onChange={(e) =>
                    setMonetizationSettings({
                      ...monetizationSettings,
                      aboveResultsAdSlot: e.target.value,
                    })
                  }
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                <label className="block text-xs font-bold text-slate-800">Below Results Ad Slot</label>
                <textarea
                  rows={4}
                  value={monetizationSettings.belowResultsAdSlot}
                  onChange={(e) =>
                    setMonetizationSettings({
                      ...monetizationSettings,
                      belowResultsAdSlot: e.target.value,
                    })
                  }
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                <label className="block text-xs font-bold text-slate-800">Footer Ad Slot (Above website footer)</label>
                <textarea
                  rows={4}
                  value={monetizationSettings.footerAdSlot}
                  onChange={(e) =>
                    setMonetizationSettings({ ...monetizationSettings, footerAdSlot: e.target.value })
                  }
                  className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveMonetization}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Save Monetization Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB 4: PAGES & BLOG POSTS (Matches Reference Screenshot 5)
           ============================================================= */}
        {activeTab === 'pages' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Pages &amp; Blog Posts Management</h2>
                  <p className="text-xs text-slate-500">
                    Manage static pages (/slug) with menu placement and articles (/blog/slug).
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
                    route: '/',
                    menuPlacement: 'Footer',
                    status: 'Published',
                    content: '',
                  });
                  setPageModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Page or Post</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-semibold bg-slate-50/50">
                    <th className="py-2.5 px-3">Title</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Route</th>
                    <th className="py-2.5 px-3">Menu Placement</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pagesList.map((page) => (
                    <tr key={page.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900">{page.title}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider text-purple-700 bg-purple-50 border border-purple-200 uppercase">
                          {page.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{page.route}</td>
                      <td className="py-3 px-3 text-slate-600">{page.menuPlacement}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                          {page.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-1.5">
                        <Link
                          href={page.route}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg inline-block transition-colors"
                          title="View Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPage(page);
                            setPageModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg inline-block transition-colors"
                          title="Edit Page"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePage(page.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg inline-block transition-colors"
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
            TAB 5: LANGUAGES (Multi-Language Copy & SEO Editor)
           ============================================================= */}
        {activeTab === 'languages' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Multi-Language &amp; Regional Copy Management</h2>
                  <p className="text-xs text-slate-500">
                    Configure local headline variants, translated CTA buttons, and SEO tags per market.
                  </p>
                </div>
              </div>

              {/* Language Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLangCode(lang.code)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedLangCode === lang.code
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Language Editor */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Hero Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={activeLanguageObj.heroHeadline}
                    onChange={(e) => {
                      const updated = languagesList.map((l) =>
                        l.code === activeLanguageObj.code ? { ...l, heroHeadline: e.target.value } : l
                      );
                      setLanguagesList(updated);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Hero Gradient Highlight Text
                  </label>
                  <input
                    type="text"
                    value={activeLanguageObj.heroGradient}
                    onChange={(e) => {
                      const updated = languagesList.map((l) =>
                        l.code === activeLanguageObj.code ? { ...l, heroGradient: e.target.value } : l
                      );
                      setLanguagesList(updated);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Hero Subtitle Description
                </label>
                <textarea
                  rows={3}
                  value={activeLanguageObj.heroSubtitle}
                  onChange={(e) => {
                    const updated = languagesList.map((l) =>
                      l.code === activeLanguageObj.code ? { ...l, heroSubtitle: e.target.value } : l
                    );
                    setLanguagesList(updated);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={activeLanguageObj.ctaButtonText}
                    onChange={(e) => {
                      const updated = languagesList.map((l) =>
                        l.code === activeLanguageObj.code ? { ...l, ctaButtonText: e.target.value } : l
                      );
                      setLanguagesList(updated);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Localized Meta Title
                  </label>
                  <input
                    type="text"
                    value={activeLanguageObj.metaTitle}
                    onChange={(e) => {
                      const updated = languagesList.map((l) =>
                        l.code === activeLanguageObj.code ? { ...l, metaTitle: e.target.value } : l
                      );
                      setLanguagesList(updated);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveLanguages}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Language Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB 6: KEYWORDS & TOOLS ENGINE (Matches Reference Screenshot 3)
           ============================================================= */}
        {activeTab === 'tools' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-violet-50 text-violet-600 rounded-xl">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Keywords &amp; Landing Tools Engine</h2>
                  <p className="text-xs text-slate-500">
                    Manage high-intent keyword landing pages stored in system.
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
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tool Page</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-semibold bg-slate-50/50">
                    <th className="py-2.5 px-3">Badge</th>
                    <th className="py-2.5 px-3">Slug</th>
                    <th className="py-2.5 px-3">Target Keyword</th>
                    <th className="py-2.5 px-3">English Title</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {toolsList.map((tool) => (
                    <tr key={tool.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-mono text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase">
                          {tool.badge}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-rose-600 font-medium">
                        {tool.slug}
                      </td>
                      <td className="py-3 px-3 text-slate-600 italic">{tool.targetKeyword}</td>
                      <td className="py-3 px-3 font-medium text-slate-800">{tool.englishTitle}</td>
                      <td className="py-3 px-3 text-right space-x-1.5">
                        <Link
                          href={tool.slug}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg inline-block transition-colors"
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
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg inline-block transition-colors"
                          title="Edit Tool Configuration"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTool(tool.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg inline-block transition-colors"
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
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setPageModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingPage.id ? 'Edit Page / Blog Post' : 'Create New Page or Post'}
              </h3>
              <button onClick={() => setPageModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePageModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  placeholder="Privacy Policy"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Type</label>
                  <select
                    value={editingPage.type}
                    onChange={(e) => setEditingPage({ ...editingPage, type: e.target.value as 'PAGE' | 'POST' })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none"
                  >
                    <option value="PAGE">PAGE</option>
                    <option value="POST">POST</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Menu Placement</label>
                  <select
                    value={editingPage.menuPlacement}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        menuPlacement: e.target.value as 'Header' | 'Footer' | 'Both' | 'None',
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none"
                  >
                    <option value="Header">Header</option>
                    <option value="Footer">Footer</option>
                    <option value="Both">Both</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Route Path (Slug)</label>
                <input
                  type="text"
                  required
                  value={editingPage.route}
                  onChange={(e) => setEditingPage({ ...editingPage, route: e.target.value })}
                  placeholder="/my-new-page"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Use format <code className="bg-slate-100 px-1 rounded">/slug-name</code>.
                  This page will be live at{' '}
                  <code className="bg-slate-100 px-1 rounded">
                    /p{editingPage.route || '/slug-name'}
                  </code>
                  . Visitors using the bare URL <code className="bg-slate-100 px-1 rounded">{editingPage.route || '/slug-name'}</code> will be automatically redirected there.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Page Body Content</label>
                <textarea
                  rows={4}
                  value={editingPage.content || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  placeholder="Markdown or HTML body content..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPageModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white shadow-sm"
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
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setToolModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingTool.id ? 'Edit Tool Page' : 'Add New Tool Landing Page'}
              </h3>
              <button onClick={() => setToolModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveToolModal} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    required
                    value={editingTool.badge}
                    onChange={(e) => setEditingTool({ ...editingTool, badge: e.target.value.toUpperCase() })}
                    placeholder="YOUTUBE TRANSCRIPT"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs uppercase text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Slug Route</label>
                  <input
                    type="text"
                    required
                    value={editingTool.slug}
                    onChange={(e) => setEditingTool({ ...editingTool, slug: e.target.value })}
                    placeholder="/youtube-transcript"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-rose-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Target SEO Keyword</label>
                <input
                  type="text"
                  required
                  value={editingTool.targetKeyword}
                  onChange={(e) => setEditingTool({ ...editingTool, targetKeyword: e.target.value })}
                  placeholder="youtube transcript generator"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">English Title</label>
                <input
                  type="text"
                  required
                  value={editingTool.englishTitle}
                  onChange={(e) => setEditingTool({ ...editingTool, englishTitle: e.target.value })}
                  placeholder="YouTube Transcript Generator — Free Instant Text Extractor"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={editingTool.description}
                  onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                  placeholder="Description for search engines and social cards..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setToolModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white shadow-sm"
                >
                  Save Tool Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
