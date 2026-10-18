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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] mx-4 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">AI Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Provider selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Provider
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setProvider('gemini')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === 'gemini'
                    ? 'border-red-500 bg-red-500/10 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="font-medium text-sm">✦ Gemini</div>
                <div className="text-xs mt-1 opacity-70">
                  Server API key · gemini-2.5-flash
                </div>
              </button>
              <button
                onClick={() => setProvider('openrouter')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === 'openrouter'
                    ? 'border-red-500 bg-red-500/10 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="font-medium text-sm">🔀 OpenRouter</div>
                <div className="text-xs mt-1 opacity-70">
                  300+ models · free options
                </div>
              </button>
            </div>
          </div>

          {/* Gemini info */}
          {provider === 'gemini' && (
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-sm text-gray-400">
              Using{' '}
              <span className="text-white font-medium">gemini-2.5-flash</span>{' '}
              with the server&apos;s API key from{' '}
              <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">
                .env.local
              </code>
            </div>
          )}

          {/* OpenRouter config */}
          {provider === 'openrouter' && (
            <>
              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  OpenRouter API Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={openrouterApiKey}
                    onChange={(e) => setOpenrouterApiKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                  <button
                    onClick={fetchModels}
                    disabled={loadingModels || !openrouterApiKey.trim()}
                    className="px-4 py-2.5 bg-gray-800 border border-gray-700 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm transition-all flex items-center gap-2 whitespace-nowrap"
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
                  className="inline-flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-red-400 transition-colors"
                >
                  Get your API key at openrouter.ai{' '}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Model selection */}
              {models.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Model{' '}
                      <span className="text-gray-500">
                        ({filteredModels.length})
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={freeOnly}
                        onChange={(e) => setFreeOnly(e.target.checked)}
                        className="rounded border-gray-600 bg-gray-800 text-red-500 focus:ring-red-500 w-3.5 h-3.5"
                      />
                      Free only
                    </label>
                  </div>

                  {/* Search */}
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      placeholder="Search models..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  </div>

                  {/* Model list */}
                  <div className="max-h-52 overflow-y-auto rounded-xl border border-gray-700 bg-gray-800/50 divide-y divide-gray-700/50">
                    {filteredModels.length === 0 && (
                      <div className="px-4 py-6 text-center text-sm text-gray-500">
                        No models match your search
                      </div>
                    )}
                    {filteredModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setOpenrouterModel(model.id)}
                        className={`w-full px-4 py-2.5 flex items-center justify-between text-left text-sm transition-colors ${
                          openrouterModel === model.id
                            ? 'bg-red-500/10 text-white'
                            : 'text-gray-300 hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="min-w-0 flex-1 mr-2">
                          <div className="truncate font-medium">
                            {model.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {model.id}
                            {model.contextLength > 0 &&
                              ` · ${Math.round(model.contextLength / 1000)}k ctx`}
                          </div>
                        </div>
                        {model.isFree && (
                          <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1 flex-shrink-0">
                            <Zap className="w-3 h-3" />
                            Free
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {openrouterModel && (
                    <div className="mt-2 text-xs text-gray-500">
                      Selected:{' '}
                      <span className="text-gray-300">{openrouterModel}</span>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={
              provider === 'openrouter' &&
              (!openrouterApiKey.trim() || !openrouterModel)
            }
            className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
