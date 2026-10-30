'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Loader2,
  Search,
  Zap,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Send,
  MessageSquare,
  Cpu,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { AISettings } from '@/lib/types';

interface ModelInfo {
  id: string;
  name: string;
  tag?: string;
  type?: string;
  isFree: boolean;
  contextLength?: number;
  desc?: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AISettings;
  onSave: (settings: AISettings) => void;
}

interface TestResult {
  model: string;
  success: boolean;
  elapsedMs: number;
  error?: string;
}

const DEFAULT_GEMINI_MODELS: ModelInfo[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    tag: 'RECOMMENDED',
    type: 'Text & Multimodal',
    isFree: true,
    contextLength: 1048576,
    desc: 'Flagship free-tier model: high-speed reasoning, deep transcript analysis, and instant summaries.',
  },
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    tag: 'LATEST',
    type: 'Text',
    isFree: true,
    contextLength: 1048576,
    desc: 'Next-generation speed and quality for instant video transcript breakdowns and bulleted notes.',
  },
  {
    id: 'gemini-3.5-flash-lite',
    name: 'Gemini 3.5 Flash Lite',
    tag: 'FASTEST',
    type: 'Text',
    isFree: true,
    contextLength: 1048576,
    desc: 'Ultra lightweight, zero-latency text model designed for instant response times and high throughput.',
  },
  {
    id: 'gemini-flash-lite-latest',
    name: 'Gemini Flash Lite Latest',
    tag: 'STABLE',
    type: 'Text',
    isFree: true,
    contextLength: 1048576,
    desc: 'Production-stable lightweight text endpoint for real-time plain-text conversions.',
  },
];

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: SettingsModalProps) {
  const [provider, setProvider] = useState<'gemini' | 'openrouter'>(
    settings.provider || 'gemini'
  );
  const [geminiModel, setGeminiModel] = useState<string>(
    settings.geminiModel || 'gemini-2.5-flash'
  );
  const [openrouterApiKey, setOpenrouterApiKey] = useState(
    settings.openrouterApiKey || ''
  );
  const [openrouterModel, setOpenrouterModel] = useState(
    settings.openrouterModel || 'openrouter/free'
  );

  // Gemini models state
  const [geminiModels, setGeminiModels] = useState<ModelInfo[]>(DEFAULT_GEMINI_MODELS);
  const [loadingGemini, setLoadingGemini] = useState(false);
  const [hasGeminiEnvKey, setHasGeminiEnvKey] = useState(true);
  const [geminiKeySource, setGeminiKeySource] = useState('GEMINI_API_KEY in .env');

  // OpenRouter models state
  const [openrouterModels, setOpenrouterModels] = useState<ModelInfo[]>([]);
  const [loadingOpenRouter, setLoadingOpenRouter] = useState(false);
  const [hasOpenRouterEnvKey, setHasOpenRouterEnvKey] = useState(false);

  // Search filter
  const [modelSearch, setModelSearch] = useState('');
  const [error, setError] = useState('');

  // Ping test state per individual model
  const [testingModel, setTestingModel] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});

  // Live Interactive Testing Console (at bottom of modal)
  const [testMessage, setTestMessage] = useState('Hello! Please confirm you are working and ready to transcribe.');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [liveResponse, setLiveResponse] = useState<{
    success: boolean;
    provider: string;
    model: string;
    reply: string;
    elapsedMs: number;
    error?: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setProvider(settings.provider || 'gemini');
      setGeminiModel(settings.geminiModel || 'gemini-2.5-flash');
      setOpenrouterApiKey(settings.openrouterApiKey || '');
      setOpenrouterModel(settings.openrouterModel || 'openrouter/free');
      setError('');
      setModelSearch('');
      setLiveResponse(null);

      // Load Gemini models & detect env key
      fetchGeminiModels();

      // If user had OpenRouter key or selected OpenRouter, also fetch OpenRouter models
      fetchOpenRouterModels(settings.openrouterApiKey);
    }
  }, [isOpen, settings]);

  const fetchGeminiModels = async () => {
    setLoadingGemini(true);
    try {
      const res = await fetch('/api/models?provider=gemini');
      if (res.ok) {
        const data = await res.json();
        if (data.models && data.models.length > 0) {
          setGeminiModels(data.models);
        }
        setHasGeminiEnvKey(!!data.hasEnvKey);
        if (data.keySource) {
          setGeminiKeySource(data.keySource);
        }
      }
    } catch {
      // Keep DEFAULT_GEMINI_MODELS fallback
    } finally {
      setLoadingGemini(false);
    }
  };

  const fetchOpenRouterModels = async (keyOverride?: string) => {
    const key = keyOverride !== undefined ? keyOverride : openrouterApiKey;
    setLoadingOpenRouter(true);
    try {
      const res = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'openrouter', apiKey: key }),
      });
      const data = await res.json();
      if (res.ok && data.models) {
        setOpenrouterModels(data.models);
        setHasOpenRouterEnvKey(!!data.hasEnvKey);
        if (!openrouterModel && data.models.length > 0) {
          setOpenrouterModel(data.models[0].id);
        }
      } else {
        setHasOpenRouterEnvKey(!!data.hasEnvKey);
      }
    } catch {
      // Silent error on initial load
    } finally {
      setLoadingOpenRouter(false);
    }
  };

  // Test individual model ping
  const handleTestIndividualModel = async (targetProvider: 'gemini' | 'openrouter', modelId: string) => {
    setTestingModel(modelId);
    try {
      const res = await fetch('/api/models/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: targetProvider,
          model: modelId,
          apiKey: targetProvider === 'openrouter' ? openrouterApiKey : undefined,
          message: 'Ping test. Reply with OK.',
        }),
      });

      const data = await res.json();
      setTestResults((prev) => ({
        ...prev,
        [modelId]: {
          model: modelId,
          success: res.ok && data.success,
          elapsedMs: data.elapsedMs || 0,
          error: data.error,
        },
      }));
    } catch (err: any) {
      setTestResults((prev) => ({
        ...prev,
        [modelId]: {
          model: modelId,
          success: false,
          elapsedMs: 0,
          error: err.message || 'Connection failed',
        },
      }));
    } finally {
      setTestingModel(null);
    }
  };

  // Live Prompt Response Test at bottom of modal
  const handleSendLiveTest = async () => {
    if (!testMessage.trim()) return;
    setIsSendingMessage(true);
    setLiveResponse(null);

    const activeModel = provider === 'gemini' ? geminiModel : openrouterModel;

    try {
      const res = await fetch('/api/models/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          model: activeModel,
          apiKey: provider === 'openrouter' ? openrouterApiKey : undefined,
          message: testMessage.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setLiveResponse({
          success: false,
          provider,
          model: activeModel || 'Selected Model',
          reply: '',
          elapsedMs: data.elapsedMs || 0,
          error: data.error || 'Request failed',
        });
      } else {
        setLiveResponse({
          success: true,
          provider: data.provider,
          model: data.model,
          reply: data.reply,
          elapsedMs: data.elapsedMs,
        });
      }
    } catch (err: any) {
      setLiveResponse({
        success: false,
        provider,
        model: activeModel || 'Selected Model',
        reply: '',
        elapsedMs: 0,
        error: err.message || 'Network error connecting to API',
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleSave = () => {
    const newSettings: AISettings = {
      provider,
      geminiModel: provider === 'gemini' ? geminiModel : settings.geminiModel,
      openrouterApiKey:
        provider === 'openrouter' ? openrouterApiKey : settings.openrouterApiKey,
      openrouterModel:
        provider === 'openrouter' ? openrouterModel : settings.openrouterModel,
    };
    onSave(newSettings);
    onClose();
  };

  // Filtered lists for model selection
  const currentModels = provider === 'gemini' ? geminiModels : openrouterModels;
  const filteredModels = currentModels.filter((m) => {
    if (!modelSearch) return true;
    const q = modelSearch.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q) ||
      (m.desc && m.desc.toLowerCase().includes(q))
    );
  });

  const activeModelDisplay = provider === 'gemini' ? geminiModel : openrouterModel;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0e0e11] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <Settings className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                AI Engine &amp; Fallback Settings
              </h2>
              <p className="text-xs text-zinc-400">
                Auto-fails over between Gemini &amp; OpenRouter
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Section 1: Provider Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Preferred Primary Provider
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setProvider('gemini');
                  setLiveResponse(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  provider === 'gemini'
                    ? 'border-red-500 bg-red-950/30 text-white shadow-lg shadow-red-950/20 ring-1 ring-red-500/40'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    ✦ Gemini
                  </span>
                  {provider === 'gemini' ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                      Free Text
                    </span>
                  )}
                </div>
                <div className="text-xs mt-2 text-zinc-400">
                  gemini-2.5-flash → gemini-3.5-flash
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProvider('openrouter');
                  setLiveResponse(null);
                  if (openrouterModels.length === 0) {
                    fetchOpenRouterModels();
                  }
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  provider === 'openrouter'
                    ? 'border-red-500 bg-red-950/30 text-white shadow-lg shadow-red-950/20 ring-1 ring-red-500/40'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    🔀 OpenRouter
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                    Free Models
                  </span>
                </div>
                <div className="text-xs mt-2 text-zinc-400">
                  Llama, Mistral &amp; Qwen free endpoints
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Google Gemini Model Selection */}
          {provider === 'gemini' && (
            <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
              {/* Server Key Auto-Detection Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-semibold text-white">Google Gemini API Key: </span>
                    <span className="text-zinc-400">
                      {hasGeminiEnvKey
                        ? 'Auto-detected from server environment'
                        : 'Not detected in .env'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {geminiKeySource}
                  </span>
                </div>
              </div>

              {/* Header & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-red-400" />
                    Available Free Text Models
                  </label>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    All listed models are 100% free and optimized for YouTube text &amp; transcript extraction.
                  </p>
                </div>
                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                    placeholder="Search Gemini models..."
                    className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Models List */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {filteredModels.map((item) => {
                  const isSelected = geminiModel === item.id;
                  const isTesting = testingModel === item.id;
                  const test = testResults[item.id];

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        isSelected
                          ? 'border-red-500/80 bg-red-950/25 text-white shadow-sm ring-1 ring-red-500/30'
                          : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/80'
                      }`}
                    >
                      {/* Clickable Area to Select */}
                      <button
                        type="button"
                        onClick={() => {
                          setGeminiModel(item.id);
                          setLiveResponse(null);
                        }}
                        className="flex-1 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                            {item.id}
                          </span>
                          {/* Badges */}
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                            FREE
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                            TEXT
                          </span>
                          {item.tag && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-300 border border-purple-500/20">
                              {item.tag}
                            </span>
                          )}
                          {isSelected && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-500 text-white flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" />
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                          {item.desc}
                        </p>
                      </button>

                      {/* Individual Ping Test Button & Result */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {test && (
                          <div
                            className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${
                              test.success
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                            title={test.error || 'Connection verified'}
                          >
                            {test.success ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>{test.elapsedMs}ms</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 text-red-400" />
                                <span>Failed</span>
                              </>
                            )}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => handleTestIndividualModel('gemini', item.id)}
                          disabled={isTesting}
                          title="Ping test this model"
                          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {isTesting ? (
                            <Loader2 className="w-3 h-3 animate-spin text-red-400" />
                          ) : (
                            <Play className="w-3 h-3 text-rose-400 fill-rose-400/20" />
                          )}
                          <span>Ping</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-zinc-500 flex items-center justify-between border-t border-zinc-900 pt-2">
                <span>Selected Active Model: <strong className="text-red-400 font-mono">{geminiModel}</strong></span>
                <span className="text-emerald-400 font-mono text-[10px]">● All Endpoints Free</span>
              </div>
            </div>
          )}

          {/* Section 2 (Alternative): OpenRouter Configuration */}
          {provider === 'openrouter' && (
            <div className="space-y-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    OpenRouter API Key
                  </label>
                  {hasOpenRouterEnvKey && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ✓ Detected from OPENROUTER_API_KEY in .env
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="password"
                    value={openrouterApiKey}
                    onChange={(e) => setOpenrouterApiKey(e.target.value)}
                    placeholder={hasOpenRouterEnvKey ? 'Using server key from .env' : 'sk-or-v1-...'}
                    className="flex-1 px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => fetchOpenRouterModels(openrouterApiKey)}
                    disabled={loadingOpenRouter}
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    {loadingOpenRouter ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      'Load Models'
                    )}
                  </button>
                </div>
              </div>

              {/* OpenRouter Model Search & List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Free OpenRouter Models ({filteredModels.length})
                  </label>
                  <div className="relative w-44">
                    <Search className="w-3 h-3 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      placeholder="Filter..."
                      className="w-full pl-7 pr-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {filteredModels.map((m) => {
                    const isSelected = openrouterModel === m.id;
                    const isTesting = testingModel === m.id;
                    const test = testResults[m.id];

                    return (
                      <div
                        key={m.id}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all ${
                          isSelected
                            ? 'border-red-500/80 bg-red-950/20 text-white'
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-300 hover:bg-zinc-900/70'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setOpenrouterModel(m.id);
                            setLiveResponse(null);
                          }}
                          className="flex-1 text-left truncate cursor-pointer"
                        >
                          <div className="font-semibold truncate">{m.name}</div>
                          <div className="text-[11px] text-zinc-500 truncate">{m.id}</div>
                        </button>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {test && (
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                test.success
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : 'bg-red-500/10 text-red-400'
                              }`}
                            >
                              {test.success ? `${test.elapsedMs}ms` : 'Failed'}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleTestIndividualModel('openrouter', m.id)}
                            disabled={isTesting}
                            className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-[11px] text-zinc-300 flex items-center gap-1 cursor-pointer"
                          >
                            {isTesting ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Play className="w-2.5 h-2.5" />}
                            <span>Ping</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Smart Auto-Switch & Priority Notice */}
          <div className="p-3 bg-zinc-950/70 border border-zinc-800/80 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>Smart Auto-Switch &amp; Priority Chain:</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              If your selected model hits rate limits or goes down, requests will automatically fail over cleanly in order:
              <span className="text-zinc-200"> 1. {activeModelDisplay}</span> →
              <span className="text-zinc-300"> 2. gemini-3.5-flash</span> →
              <span className="text-zinc-400"> 3. OpenRouter Free Endpoints</span>.
            </p>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Section 4: INTERACTIVE LIVE PROMPT TEST CONSOLE (AT BOTTOM)    */}
          {/* ------------------------------------------------------------- */}
          <div className="p-4 rounded-xl border border-red-500/30 bg-gradient-to-b from-zinc-950 to-zinc-900/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-red-400" />
                Live Prompt Response Test
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-400">Testing Target:</span>
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-[10px] font-mono font-bold">
                  {provider.toUpperCase()} : {activeModelDisplay}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400">
              Type any test message below and click <strong>Send Test Prompt</strong> to verify live connection, model output, and response latency.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isSendingMessage) {
                    handleSendLiveTest();
                  }
                }}
                placeholder="Type a test message (e.g. Say hello and give a one-sentence tip)..."
                className="flex-1 px-3.5 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 shadow-inner"
              />
              <button
                type="button"
                onClick={handleSendLiveTest}
                disabled={isSendingMessage || !testMessage.trim()}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-red-950/40 cursor-pointer flex-shrink-0"
              >
                {isSendingMessage ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Response Box */}
            {liveResponse && (
              <div
                className={`p-3.5 rounded-xl border transition-all animate-fade-in ${
                  liveResponse.success
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-zinc-200'
                    : 'border-red-500/40 bg-red-950/20 text-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    {liveResponse.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    )}
                    <span className="text-xs font-bold text-white">
                      {liveResponse.success ? 'Model Responded Successfully' : 'Test Call Failed'}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {liveResponse.model}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {liveResponse.elapsedMs} ms
                    </span>
                  </div>
                </div>

                {liveResponse.success ? (
                  <div className="text-xs text-zinc-200 bg-black/40 p-3 rounded-lg border border-white/[0.04] font-mono leading-relaxed whitespace-pre-wrap">
                    {liveResponse.reply}
                  </div>
                ) : (
                  <div className="text-xs text-red-300 bg-red-950/30 p-2.5 rounded-lg border border-red-500/20 font-mono">
                    {liveResponse.error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-950/90 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-950/50 transition-all cursor-pointer flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
