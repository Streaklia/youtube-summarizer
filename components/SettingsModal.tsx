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

  // Testing states
  const [testingModel, setTestingModel] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});

  useEffect(() => {
    if (isOpen) {
      setProvider(settings.provider);
      setOpenrouterApiKey(settings.openrouterApiKey);
      setOpenrouterModel(settings.openrouterModel);
      setError('');
      setModelSearch('');
      // Auto-fetch free models if opening OpenRouter or key is present
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

      // Auto-select first free model if none selected yet
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] mx-4 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white/[0.06]">
              <Settings className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">AI Engine & Fallback Settings</h2>
              <p className="text-[11px] text-gray-500">Auto-fails over between Gemini & OpenRouter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all duration-200"
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
                onClick={() => setProvider('gemini')}
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
                onClick={() => setProvider('openrouter')}
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
                  Llama, Mistral & Qwen free endpoints
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-1.5">
                      <span>Select Free Model</span>
                      <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] rounded font-bold uppercase">
                        {filteredModels.length} Free
                      </span>
                    </label>
                    <span className="text-[11px] text-gray-500">Includes response test</span>
                  </div>

                  {/* Search */}
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                      type="text"
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      placeholder="Search free models..."
                      className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500/40 text-sm transition-all"
                    />
                  </div>

                  {/* Model list with interactive Test Button */}
                  <div className="max-h-56 overflow-y-auto rounded-xl border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.04]">
                    {filteredModels.length === 0 && (
                      <div className="px-4 py-6 text-center text-sm text-gray-600">
                        No free models match your search
                      </div>
                    )}
                    {filteredModels.map((model) => {
                      const isSelected = openrouterModel === model.id;
                      const test = testResults[model.id];
                      const isTesting = testingModel === model.id;

                      return (
                        <div
                          key={model.id}
                          className={`w-full px-4 py-2.5 flex items-center justify-between transition-all duration-200 ${
                            isSelected
                              ? 'bg-red-500/10 text-white border-l-2 border-red-500'
                              : 'text-gray-400 hover:bg-white/[0.04]'
                          }`}
                        >
                          {/* Selection Button */}
                          <button
                            onClick={() => setOpenrouterModel(model.id)}
                            className="min-w-0 flex-1 mr-2 text-left"
                          >
                            <div className="flex items-center gap-2">
                              <span className="truncate font-medium text-sm text-gray-200">
                                {model.name}
                              </span>
                              {isSelected && (
                                <span className="px-1.5 py-0.2 bg-red-500/20 text-red-300 text-[10px] rounded font-semibold">
                                  Selected
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-600 truncate mt-0.5">
                              {model.id}
                              {model.contextLength > 0 &&
                                ` · ${Math.round(model.contextLength / 1000)}k ctx`}
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
                              title="Test model response & latency"
                              className="px-2 py-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.1] rounded-lg text-xs text-gray-300 hover:text-white transition-all flex items-center gap-1"
                            >
                              {isTesting ? (
                                <Loader2 className="w-3 h-3 animate-spin text-red-400" />
                              ) : (
                                <Play className="w-3 h-3 text-rose-400 fill-rose-400/20" />
                              )}
                              <span>Test</span>
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
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.06] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 hover:text-white text-sm transition-colors"
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
            className="px-5 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all duration-200"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
