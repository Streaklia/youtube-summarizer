'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SettingsModal } from '@/components/SettingsModal';
import { SupportedLanguage } from '@/lib/i18n';
import { AISettings } from '@/lib/types';
import { FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface TermsClientProps {
  lang: SupportedLanguage;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'gemini',
  openrouterApiKey: '',
  openrouterModel: '',
};

export function TermsClient({ lang }: TermsClientProps) {
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
            <FileText className="w-3.5 h-3.5" />
            <span>Legal & Terms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-zinc-500">Last updated: October 19, 2026</p>

          <div className="mt-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
            <section className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h2 className="text-base font-semibold text-white">
                1. Acceptance of Terms
              </h2>
              <p className="mt-2 text-xs text-zinc-400">
                By accessing and utilizing YouTube Summarizer, you acknowledge and agree to comply with these terms, our privacy policy, and all applicable digital copyright laws.
              </p>
            </section>

            <section className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h2 className="text-base font-semibold text-white">
                2. Intended Educational & Fair Use
              </h2>
              <p className="mt-2 text-xs text-zinc-400">
                Our application provides transformative AI summaries, study notes, and research aids. Video transcripts belong to their respective creators and copyright owners. You agree not to abuse the service for automated scraping or mass unauthorized redistribution.
              </p>
            </section>

            <section className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h2 className="text-base font-semibold text-white">
                3. Disclaimer & AI Accuracy
              </h2>
              <p className="mt-2 text-xs text-zinc-400">
                While AI models such as Gemini strive for high factual accuracy, machine learning summaries may occasionally contain omissions or interpretations. Users are encouraged to cross-reference timestamps with the original source video.
              </p>
            </section>

            {/* Contextual link back to tool */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
              <p className="text-xs text-zinc-400 mb-3">
                Questions or ready to get started?
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href={lang === 'en' ? '/faq' : `/${lang}/faq`}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors"
                >
                  FAQ & Support
                </Link>
                <Link
                  href={homeHref}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-1.5"
                >
                  <span>Summarize Video</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer currentLang={lang} />
      </div>
    </main>
  );
}
