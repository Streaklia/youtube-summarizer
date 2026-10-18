'use client';

import { useState, useEffect } from 'react';
import { X, Settings, Loader2, Search, Zap, ExternalLink } from 'lucide-react';
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
  const [freeOnly, setFreeOnly] = useState(false);
  const [error, setError] = useState('');

  // Sync form state when modal opens
  useEffect(() => {
    if (isOpen) {
      setProvider(settings.provider);
      setOpenrouterApiKey(settings.openrouterApiKey);
      setOpenrouterModel(settings.openrouterModel);
      setError('');
      setModelSearch('');
    }
  }, [isOpen, settings]);

  const fetchModels = async () => {
    if (!openrouterApiKey.trim()) {
      setError('Please enter your OpenRouter API key first');
      return;
    }
    setLoadingModels(true);
    setError('');
    try {
      const res = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: openrouterApiKey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setModels(data.models);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch models');
    } finally {
      setLoadingModels(false);
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
    if (freeOnly && !m.isFree) return false;
    if (
      modelSearch &&
      !m.name.toLowerCase().includes(modelSearch.toLowerCase()) &&
      !m.id.toLowerCase().includes(modelSearch.toLowerCase())
    )
      return false;
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
      <div className="relative w-full max-w-lg max-h-[90vh] mx-4 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white/[0.06]">
              <Settings className="w-4 h-4 text-gray-400" />
            </div>
            <h2 className="text-base font-semibold text-white">AI Settings</h2>
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
              Provider
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
                <div className="font-medium text-sm">✦ Gemini</div>
                <div className="text-xs mt-1.5 opacity-60">
                  Server API key · gemini-2.5-flash
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
                <div className="font-medium text-sm">🔀 OpenRouter</div>
                <div className="text-xs mt-1.5 opacity-60">
                  300+ models · free options
                </div>
              </button>
            </div>
          </div>

          {/* Gemini info */}
          {provider === 'gemini' && (
            <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-gray-500">
              Using{' '}
              <span className="text-white font-medium">gemini-2.5-flash</span>{' '}
              with the server&apos;s API key from{' '}
              <code className="text-red-400 bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">
                .env.local
              </code>
            </div>
          )}

          {/* OpenRouter config */}
          {provider === 'openrouter' && (
            <>
              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  OpenRouter API Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={openrouterApiKey}
                    onChange={(e) => setOpenrouterApiKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500/40 text-sm transition-all duration-200"
                  />
                  <button
                    onClick={fetchModels}
                    disabled={loadingModels || !openrouterApiKey.trim()}
                    className="px-4 py-2.5 bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.08] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                  >
                    {loadingModels ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Fetch Models'
                    )}
                  </button>
                </div>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-gray-600 hover:text-red-400 transition-colors"
                >
                  Get your API key at openrouter.ai{' '}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Model selection */}
              {models.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-400">
                      Model{' '}
                      <span className="text-gray-600">
                        ({filteredModels.length})
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={freeOnly}
                        onChange={(e) => setFreeOnly(e.target.checked)}
                        className="rounded border-white/10 bg-white/[0.06] text-red-500 focus:ring-red-500 w-3.5 h-3.5"
                      />
                      Free only
                    </label>
                  </div>

                  {/* Search */}
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                      type="text"
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      placeholder="Search models..."
                      className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500/40 text-sm transition-all"
                    />
                  </div>

                  {/* Model list */}
                  <div className="max-h-52 overflow-y-auto rounded-xl border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.04]">
                    {filteredModels.length === 0 && (
                      <div className="px-4 py-6 text-center text-sm text-gray-600">
                        No models match your search
                      </div>
                    )}
                    {filteredModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setOpenrouterModel(model.id)}
                        className={`w-full px-4 py-2.5 flex items-center justify-between text-left text-sm transition-all duration-200 ${
                          openrouterModel === model.id
                            ? 'bg-red-500/5 text-white'
                            : 'text-gray-400 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="min-w-0 flex-1 mr-2">
                          <div className="truncate font-medium">
                            {model.name}
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {model.id}
                            {model.contextLength > 0 &&
                              ` · ${Math.round(model.contextLength / 1000)}k ctx`}
                          </div>
                        </div>
                        {model.isFree && (
                          <span className="ml-2 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1 flex-shrink-0">
                            <Zap className="w-3 h-3" />
                            Free
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {openrouterModel && (
                    <div className="mt-2 text-xs text-gray-600">
                      Selected:{' '}
                      <span className="text-gray-400">{openrouterModel}</span>
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
