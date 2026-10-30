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
  Bot,
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

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: SettingsModalProps) {
  const [provider, setProvider] = useState(settings.provider);
  const [openrouterApiKey, setOpenrouterApiKey] = useState(
    settings.openrouterApiKey
  );
  const [openrouterModel, setOpenrouterModel] = useState(
    settings.openrouterModel
  );
  const [models, setModels] = useState<OpenRouterModelInfo[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [modelSearch, setModelSearch] = useState('');
  const [hasEnvKey, setHasEnvKey] = useState(false);
  const [error, setError] = useState('');

  // Individual model ping state
  const [testingModel, setTestingModel] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});

  // Interactive Live Message Tester State
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
      setProvider(settings.provider);
      setOpenrouterApiKey(settings.openrouterApiKey);
      setOpenrouterModel(settings.openrouterModel);
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

  const handleTestModel = async (modelId: string) => {
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

    const activeModel = provider === 'gemini' ? 'gemini-2.5-flash' : openrouterModel;

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
          model: activeModel || 'Default Model',
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
        model: activeModel || 'Default Model',
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
      openrouterApiKey:
        provider === 'openrouter'
          ? openrouterApiKey
          : settings.openrouterApiKey,
      openrouterModel:
        provider === 'openrouter'
          ? openrouterModel
          : settings.openrouterModel,
    };
    onSave(newSettings);
    onClose();
  };

  const filteredModels = models.filter((m) => {
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
      <div className="relative w-full max-w-2xl bg-[#0e0e11] border border-white/[0.08] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/30 flex items-center justify-center">
              <Settings className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                AI Provider &amp; Model Engine
              </h2>
              <p className="text-xs text-gray-500">
                Select your LLM pipeline &amp; test live responses
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Provider selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Preferred Primary Provider
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setProvider('gemini');
                  setLiveResponse(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  provider === 'gemini'
                    ? 'border-red-500/50 bg-red-500/5 text-white glow-red'
                    : 'border-white/[0.06] bg-white/[0.02] text-gray-400 hover:border-white/[0.1] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">✦ Gemini</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                </div>
                <div className="text-xs mt-1.5 opacity-60">
                  gemini-1.5-flash ➔ gemini-2.5-flash
                </div>
              </button>
              <button
                onClick={() => {
                  setProvider('openrouter');
                  setLiveResponse(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  provider === 'openrouter'
                    ? 'border-red-500/50 bg-red-500/5 text-white glow-red'
                    : 'border-white/[0.06] bg-white/[0.02] text-gray-400 hover:border-white/[0.1] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">🔀 OpenRouter</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Free Models</span>
                </div>
                <div className="text-xs mt-1.5 opacity-60">
                  Llama, Mistral &amp; Qwen free endpoints
                </div>
              </button>
            </div>
          </div>

          {/* Fallback Notice */}
          <div className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center gap-2.5 text-xs text-gray-400">
            <Sparkles className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>
              <strong>Smart Auto-Switch:</strong> If your selected model hits rate limits or goes down, requests will automatically switch to alternative free models.
            </span>
          </div>

          {/* Gemini info */}
          {provider === 'gemini' && (
            <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-gray-500 space-y-1">
              <div className="text-white font-medium text-xs">Priority Chain:</div>
              <div className="text-xs text-gray-400">1. gemini-1.5-flash (Fast, Primary)</div>
              <div className="text-xs text-gray-400">2. gemini-2.5-flash (Automatic Fallback)</div>
              <div className="text-xs text-gray-400">3. OpenRouter Free Models (Secondary Failover)</div>
            </div>
          )}

          {/* OpenRouter config */}
          {provider === 'openrouter' && (
            <>
              {/* API Key */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-400">
                    OpenRouter API Key
                  </label>
                  {hasEnvKey && (
                    <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ✓ Configured in .env
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={openrouterApiKey}
                    onChange={(e) => setOpenrouterApiKey(e.target.value)}
                    placeholder={hasEnvKey ? 'Loaded from OPENROUTER_API_KEY (.env)' : 'sk-or-v1-...'}
                    className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500/40 text-sm transition-all duration-200"
                  />
                  <button
                    onClick={() => fetchFreeModels(openrouterApiKey)}
                    disabled={loadingModels}
                    className="px-4 py-2.5 bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.08] disabled:opacity-40 text-white rounded-xl text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                  >
                    {loadingModels ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Fetch Free Models'
                    )}
                  </button>
                </div>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-gray-600 hover:text-red-400 transition-colors"
                >
                  Get your free OpenRouter API key at openrouter.ai{' '}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Free Models List */}
              {models.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-yellow-500" />
                      Select Model ({filteredModels.length} available)
                    </label>
                    <div className="relative w-48">
                      <Search className="w-3 h-3 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                        placeholder="Search models..."
                        className="w-full pl-7 pr-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-red-500/40"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {filteredModels.map((model) => {
                      const isSelected = openrouterModel === model.id;
                      const test = testResults[model.id];
                      const isTesting = testingModel === model.id;

                      return (
                        <div
                          key={model.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all duration-150 ${
                            isSelected
                              ? 'border-red-500/50 bg-red-500/5 text-white'
                              : 'border-white/[0.04] bg-white/[0.01] text-gray-400 hover:border-white/[0.08] hover:bg-white/[0.03]'
                          }`}
                        >
                          <button
                            onClick={() => {
                              setOpenrouterModel(model.id);
                              setLiveResponse(null);
                            }}
                            className="flex-1 text-left min-w-0"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-xs text-white truncate">
                                {model.name}
                              </span>
                              <span className="text-[10px] px-1 rounded bg-emerald-500/10 text-emerald-400 font-mono flex-shrink-0">
                                FREE
                              </span>
                            </div>
                            <div className="text-[11px] text-gray-500 truncate font-mono mt-0.5">
                              {model.id}
                            </div>
                          </button>

                          {/* Test Status & Trigger Button */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {test && (
                              <div
                                className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${
                                  test.success
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'bg-red-500/10 text-red-400'
                                }`}
                                title={test.error || 'Model is working!'}
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
                              onClick={() => handleTestModel(model.id)}
                              disabled={isTesting}
                              title="Ping test model response"
                              className="px-2 py-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.1] rounded-lg text-xs text-gray-300 hover:text-white transition-all flex items-center gap-1"
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

                  {openrouterModel && (
                    <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                      <div>
                        Selected:{' '}
                        <span className="text-gray-300 font-medium">{openrouterModel}</span>
                      </div>
                      <span className="text-[11px] text-emerald-400/80">● 100% Free Endpoint</span>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* LIVE API PLAYGROUND / TEST MESSAGE CONSOLE                */}
          {/* ======================================================== */}
          <div className="pt-2 border-t border-white/[0.06]">
            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Live API Connection Test
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Send a message to test <span className="text-zinc-200 font-semibold capitalize">{provider}</span> {provider === 'openrouter' && openrouterModel ? `(${openrouterModel.split('/').pop()})` : ''}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  {provider === 'gemini' ? 'Gemini API' : 'OpenRouter API'}
                </span>
              </div>

              {/* Message Input Field */}
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
                  placeholder="Type a test prompt (e.g. Say hello in 5 words)..."
                  className="flex-1 px-3.5 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                />
                <button
                  type="button"
                  onClick={handleSendLiveTest}
                  disabled={isSendingMessage || !testMessage.trim()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  {isSendingMessage ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Testing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Response Box */}
              {liveResponse && (
                <div
                  className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all animate-fade-in ${
                    liveResponse.success
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                      : 'bg-red-950/20 border-red-800/40 text-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-1.5">
                      {liveResponse.success ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-semibold text-emerald-400">Response Received</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                          <span className="font-semibold text-red-400">API Test Failed</span>
                        </>
                      )}
                      <span className="text-zinc-500">·</span>
                      <span className="text-zinc-400 truncate max-w-[200px]">{liveResponse.model}</span>
                    </div>

                    <div className="flex items-center gap-1 text-zinc-400">
                      <Clock className="w-3 h-3" />
                      <span>{liveResponse.elapsedMs}ms</span>
                    </div>
                  </div>

                  {liveResponse.success ? (
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans text-xs leading-relaxed whitespace-pre-wrap">
                      {liveResponse.reply}
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-900/40 text-red-200 text-xs font-mono">
                      {liveResponse.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.06] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 hover:text-white text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={
              provider === 'openrouter' &&
              !hasEnvKey &&
              (!openrouterApiKey.trim() || !openrouterModel)
            }
            className="px-5 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
