'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SettingsModal } from '@/components/SettingsModal';
import { SupportedLanguage } from '@/lib/i18n';
import { AISettings } from '@/lib/types';
import { Shield, Lock, EyeOff, Server, ArrowRight, Youtube } from 'lucide-react';

interface PrivacyClientProps {
  lang: SupportedLanguage;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'gemini',
  openrouterApiKey: '',
  openrouterModel: '',
};

export function PrivacyClient({ lang }: PrivacyClientProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);

  const homeHref = lang === 'en' ? '/' : `/${lang}`;

  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      <div className="gradient-blob w-[600px] h-[600px] bg-red-600 -top-48 -right-48 opacity-20" />

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
          onSave={setSettings}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy & Security</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-zinc-500">Last updated: October 19, 2026</p>

          <div className="mt-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
            <section className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                <span>1. Zero Personal Data Collection</span>
              </h2>
              <p className="mt-2 text-xs text-zinc-400">
                YouTube Summarizer is designed with privacy-by-default. We do not require account registration, email addresses, credit cards, or passwords to use the core video summarizer.
              </p>
            </section>

            <section className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-red-400" />
                <span>2. Client-Side API Keys Storage</span>
              </h2>
              <p className="mt-2 text-xs text-zinc-400">
                Any custom API keys you enter in the Settings modal (such as OpenRouter keys) are stored purely on your local device via browser <code className="text-zinc-200">localStorage</code>. They are never sent to or logged on our permanent database servers.
              </p>
            </section>

            <section className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-red-400" />
                <span>3. YouTube Data Processing</span>
              </h2>
              <p className="mt-2 text-xs text-zinc-400">
                When you submit a video URL, our serverless API retrieves public subtitles and metadata using YouTube's standard protocols solely to generate the requested summary. We do not store or sell your search history.
              </p>
            </section>

            {/* Contextual link back to tool */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
              <p className="text-xs text-zinc-400 mb-3">
                Experience safe and anonymous video summarization today.
              </p>
              <Link
                href={homeHref}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <span>Return to YouTube Summarizer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <Footer currentLang={lang} />
      </div>
    </main>
  );
}
