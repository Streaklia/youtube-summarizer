'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Loader2,
  Search,
  Zap,
  ExternalLink,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Send,
  MessageSquare,
  Cpu,
} from 'lucide-react';
import { AISettings } from '@/lib/types';

interface OpenRouterModelInfo {
  id: string;
  name: string;
  isFree: boolean;
  contextLength: number;
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

const GEMINI_MODELS = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    desc: 'Ultra-fast, latest high-context multimodal reasoning model',
    tag: 'RECOMMENDED',
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    desc: 'Balanced high-speed summarization & transcript parsing',
    tag: 'STABLE',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    desc: 'Deep analytical reasoning for lengthy 2+ hour video transcripts',
    tag: 'ADVANCED',
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
    settings.openrouterModel || 'meta-llama/llama-3-8b-instruct:free'
  );

  const [models, setModels] = useState<OpenRouterModelInfo[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [modelSearch, setModelSearch] = useState('');
  const [hasEnvKey, setHasEnvKey] = useState(false);
  const [error, setError] = useState('');

  // Ping test state per individual model
  const [testingModel, setTestingModel] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});

  // Live Interactive Testing Console
  const [testMessage, setTestMessage] = useState('Hello! Are you working properly?');
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
      setOpenrouterModel(settings.openrouterModel || 'meta-llama/llama-3-8b-instruct:free');
      setError('');
      setModelSearch('');
      setLiveResponse(null);
      fetchFreeModels(settings.openrouterApiKey);
    }
  }, [isOpen, settings]);

  const fetchFreeModels = async (keyOverride?: string) => {
    const key = keyOverride !== undefined ? keyOverride : openrouterApiKey;
    setLoadingModels(true);
    setError('');
    try {
      const res = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setModels(data.models || []);
      setHasEnvKey(!!data.hasEnvKey);

      if (!openrouterModel && data.models && data.models.length > 0) {
        setOpenrouterModel(data.models[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch free models');
    } finally {
      setLoadingModels(false);
    }
  };

  const handleTestOpenRouterModel = async (modelId: string) => {
    setTestingModel(modelId);
    try {
      const res = await fetch('/api/models/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'openrouter',
          model: modelId,
          apiKey: openrouterApiKey,
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
          apiKey: openrouterApiKey,
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

  const filteredOpenRouterModels = models.filter((m) => {
    if (
      modelSearch &&
      !m.name.toLowerCase().includes(modelSearch.toLowerCase()) &&
      !m.id.toLowerCase().includes(modelSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0e0e11] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <Settings className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                AI Engine &amp; API Configuration
              </h2>
              <p className="text-xs text-zinc-400">
                Choose provider, choose model, and test live responses
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              1. Select Primary AI Provider
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
                    ? 'border-red-500 bg-red-950/30 text-white shadow-lg shadow-red-950/20'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    ✦ Google Gemini
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    Primary
                  </span>
                </div>
                <div className="text-xs mt-2 text-zinc-400">
                  Native high-speed video understanding models
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProvider('openrouter');
                  setLiveResponse(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  provider === 'openrouter'
                    ? 'border-red-500 bg-red-950/30 text-white shadow-lg shadow-red-950/20'
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    🔀 OpenRouter
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                    Open Ecosystem
                  </span>
                </div>
                <div className="text-xs mt-2 text-zinc-400">
                  Llama 3, Mistral, Qwen &amp; DeepSeek models
                </div>
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Provider Option A: Google Gemini Model Selector               */}
          {/* ------------------------------------------------------------- */}
          {provider === 'gemini' && (
            <div className="space-y-3 p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-red-400" />
                  2. Choose Google Gemini Model
                </label>
                <span className="text-[11px] font-mono text-zinc-500">
                  Active: <strong className="text-red-400">{geminiModel}</strong>
                </span>
              </div>

              <div className="space-y-2">
                {GEMINI_MODELS.map((item) => {
                  const isSelected = geminiModel === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setGeminiModel(item.id);
                        setLiveResponse(null);
                      }}
                      className={`w-full p-3 rounded-xl border text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-red-500/80 bg-red-950/30 text-white shadow-sm'
                          : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                            {item.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0 ${
                          isSelected
                            ? 'bg-red-500 text-white'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 text-[11px] text-zinc-500 flex items-center justify-between border-t border-zinc-900">
                <span>Server API Key: Configured in environment</span>
                <span className="text-emerald-400 font-mono">● Ready</span>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* Provider Option B: OpenRouter Configuration                   */}
          {/* ------------------------------------------------------------- */}
          {provider === 'openrouter' && (
            <div className="space-y-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    2. OpenRouter API Key
                  </label>
                  {hasEnvKey && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ✓ Present in .env
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="password"
                    value={openrouterApiKey}
                    onChange={(e) => setOpenrouterApiKey(e.target.value)}
                    placeholder={hasEnvKey ? 'Loaded from OPENROUTER_API_KEY (.env)' : 'sk-or-v1-...'}
                    className="flex-1 px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => fetchFreeModels(openrouterApiKey)}
                    disabled={loadingModels}
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    {loadingModels ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      'Load Models'
                    )}
                  </button>
                </div>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1.5 text-[11px] text-zinc-500 hover:text-red-400 transition-colors"
                >
                  Get free OpenRouter API key at openrouter.ai <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Models List */}
              {models.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-900">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-yellow-500" />
                      Choose OpenRouter Model ({filteredOpenRouterModels.length})
                    </label>
                    <div className="relative w-40">
                      <Search className="w-3 h-3 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                        placeholder="Search models..."
                        className="w-full pl-7 pr-2 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[11px] text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {filteredOpenRouterModels.map((model) => {
                      const isSelected = openrouterModel === model.id;
                      const test = testResults[model.id];
                      const isTesting = testingModel === model.id;

                      return (
                        <div
                          key={model.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                            isSelected
                              ? 'border-red-500/80 bg-red-950/30 text-white'
                              : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/60'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setOpenrouterModel(model.id);
                              setLiveResponse(null);
                            }}
                            className="flex-1 text-left min-w-0 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs text-white truncate">
                                {model.name}
                              </span>
                              <span className="text-[10px] px-1.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                                FREE
                              </span>
                            </div>
                            <div className="text-[10px] text-zinc-500 truncate font-mono mt-0.5">
                              {model.id}
                            </div>
                          </button>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {test && (
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                                  test.success
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'bg-red-500/10 text-red-400'
                                }`}
                              >
                                {test.success ? `${test.elapsedMs}ms` : 'Fail'}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleTestOpenRouterModel(model.id)}
                              disabled={isTesting}
                              title="Ping test model response"
                              className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              {isTesting ? (
                                <Loader2 className="w-3 h-3 animate-spin text-red-400" />
                              ) : (
                                <Play className="w-3 h-3 text-red-400" />
                              )}
                              <span>Ping</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {openrouterModel && (
                    <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1">
                      <span>Selected: <strong className="text-zinc-200">{openrouterModel}</strong></span>
                      <span className="text-emerald-400">● 100% Free Endpoint</span>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-800 rounded-xl text-red-300 text-xs">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* ============================================================= */}
          {/* 3. LIVE INTERACTIVE PROMPT TESTER CONSOLE                     */}
          {/* ============================================================= */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    3. Live Prompt Response Test
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Testing with{' '}
                    <span className="text-red-400 font-semibold uppercase">{provider}</span>:{' '}
                    <code className="text-zinc-200 font-mono text-[11px]">
                      {provider === 'gemini' ? geminiModel : openrouterModel}
                    </code>
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                Endpoint: /api/models/test
              </span>
            </div>

            {/* Input & Send Action */}
            <div className="flex gap-2">
              <input
                type="text"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isSendingMessage) {
                    e.preventDefault();
                    handleSendLiveTest();
                  }
                }}
                placeholder="Type a test message (e.g. Reply with OK in 2 words)..."
                className="flex-1 px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
              />
              <button
                type="button"
                onClick={handleSendLiveTest}
                disabled={isSendingMessage || !testMessage.trim()}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
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

            {/* Output Box */}
            {liveResponse && (
              <div
                className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                  liveResponse.success
                    ? 'bg-emerald-950/20 border-emerald-800/40'
                    : 'bg-red-950/20 border-red-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5">
                    {liveResponse.success ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-bold text-emerald-400">Response Received</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                        <span className="font-bold text-red-400">Test Failed</span>
                      </>
                    )}
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-300 truncate max-w-[220px]">
                      {liveResponse.model}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-zinc-400">
                    <Clock className="w-3 h-3" />
                    <span>{liveResponse.elapsedMs}ms</span>
                  </div>
                </div>

                {liveResponse.success ? (
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans text-xs leading-relaxed whitespace-pre-wrap">
                    {liveResponse.reply}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/40 text-red-200 text-xs font-mono">
                    {liveResponse.error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/80 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-zinc-400 hover:text-white text-xs font-semibold rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={
              provider === 'openrouter' &&
              !hasEnvKey &&
              (!openrouterApiKey.trim() || !openrouterModel)
            }
            className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
