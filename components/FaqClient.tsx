'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SettingsModal } from '@/components/SettingsModal';
import { SupportedLanguage } from '@/lib/i18n';
import { FAQ_ITEMS, FaqItem } from '@/lib/contentData';
import { AISettings } from '@/lib/types';
import { HelpCircle, ChevronDown, Youtube, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface FaqClientProps {
  lang: SupportedLanguage;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'gemini',
  openrouterApiKey: '',
  openrouterModel: '',
};

export function FaqClient({ lang }: FaqClientProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const homeHref = lang === 'en' ? '/' : `/${lang}`;

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="gradient-blob w-[600px] h-[600px] bg-red-600 -top-48 -right-48 opacity-20" />
      <div className="gradient-blob w-[500px] h-[500px] bg-rose-700 top-[60%] -left-64 opacity-20" />

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

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center & FAQ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our YouTube video summarizer, transcript extraction speed, AI models, and privacy.
          </p>

          {/* Contextual Link Box back to main tool */}
          <div className="mt-8 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Ready to test it yourself?</p>
                <p className="text-xs text-zinc-400">Jump over to the main summarizer tool — no registration needed.</p>
              </div>
            </div>
            <Link
              href={homeHref}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-red-600/25 transition-all whitespace-nowrap"
            >
              <span>Go to Summarizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/70 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-red-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60">
                      <p>{item.answer}</p>
                      {/* Contextual nudge in answers */}
                      {item.id === 'faq-1' && (
                        <p className="mt-3 text-xs text-red-400">
                          → Try pasting a link on the{' '}
                          <Link href={homeHref} className="underline font-medium hover:text-red-300">
                            YouTube Summarizer Home Tool
                          </Link>{' '}
                          to see the 3-column analysis in action.
                        </p>
                      )}
                      {item.id === 'faq-6' && (
                        <p className="mt-3 text-xs text-red-400">
                          → Configure keys anytime on the{' '}
                          <Link href={homeHref} className="underline font-medium hover:text-red-300">
                            Main Application
                          </Link>{' '}
                          via the Settings dialog.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contextual Internal Linking Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-black border border-zinc-800 text-center">
            <h3 className="text-base font-bold text-white">Still have questions?</h3>
            <p className="text-xs text-zinc-400 mt-1.5 max-w-md mx-auto">
              Check out our step-by-step video tutorials and in-depth guides in the articles section.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={lang === 'en' ? '/blog' : `/${lang}/blog`}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors"
              >
                Read Blog Articles
              </Link>
              <Link
                href={homeHref}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-medium shadow-md shadow-red-600/20 transition-colors"
              >
                Launch Summarizer
              </Link>
            </div>
          </div>
        </div>

        <Footer currentLang={lang} />
      </div>
    </main>
  );
}
