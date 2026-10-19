'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SettingsModal } from '@/components/SettingsModal';
import { SeoLandingTool, SeoLandingToolProps } from '@/components/SeoLandingTool';
import { AISettings } from '@/lib/types';

const DEFAULT_SETTINGS: AISettings = {
  provider: 'gemini',
  openrouterApiKey: '',
  openrouterModel: '',
};

function loadSettings(): AISettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem('yt-summarizer-settings');
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function SeoPageLayout(props: SeoLandingToolProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleSettingsSave = (newSettings: AISettings) => {
    setSettings(newSettings);
    localStorage.setItem('yt-summarizer-settings', JSON.stringify(newSettings));
  };

  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="gradient-blob w-[600px] h-[600px] bg-red-600 -top-48 -right-48" />
      <div
        className="gradient-blob w-[500px] h-[500px] bg-rose-700 top-[60%] -left-64"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="gradient-blob w-[400px] h-[400px] bg-orange-600 top-[30%] right-[20%]"
        style={{ animationDelay: '-15s' }}
      />

      <div className="relative z-10">
        <Header
          onOpenSettings={() => setSettingsOpen(true)}
          activeProvider={settings.provider}
          activeModel={settings.openrouterModel}
        />

        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={settings}
          onSave={handleSettingsSave}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <SeoLandingTool {...props} />

          {/* Footer */}
          <footer className="mt-24 pb-8 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-700">
              <span>Powered by</span>
              <span className="text-gray-500">
                {settings.provider === 'openrouter' ? 'OpenRouter' : 'Google Gemini AI'}
              </span>
              <span className="text-gray-800">·</span>
              <span>Built with Next.js & Tailwind CSS</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
