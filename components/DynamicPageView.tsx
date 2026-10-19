'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SettingsModal } from '@/components/SettingsModal';
import { AISettings } from '@/lib/types';
import { ManagedPage } from '@/lib/pagesStore';
import { extractLangFromPath, getSavedLanguage, localizedUrl } from '@/lib/localizedUrl';
import { FileText, Calendar, ArrowLeft, ArrowRight, Youtube } from 'lucide-react';

interface DynamicPageViewProps {
  page: ManagedPage;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'gemini',
  openrouterApiKey: '',
  openrouterModel: '',
};

export function DynamicPageView({ page }: DynamicPageViewProps) {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);

  const activeLang =
    extractLangFromPath(pathname) ||
    (typeof window !== 'undefined' ? getSavedLanguage() : 'en');

  const isLegalPage =
    page.route === '/privacy' ||
    page.route === '/terms' ||
    page.type === 'PAGE';

  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Background glow */}
      <div className="gradient-blob w-[500px] h-[500px] bg-red-600 -top-40 -right-40 opacity-20" />
      <div className="gradient-blob w-[400px] h-[400px] bg-rose-700 top-[60%] -left-48 opacity-15" />

      <div className="relative z-10">
        <Header
          onOpenSettings={() => setSettingsOpen(true)}
          activeProvider={settings.provider}
          activeModel={settings.openrouterModel}
          currentLang={activeLang}
        />

        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={settings}
          onSave={setSettings}
        />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
            <Link href={localizedUrl('/', activeLang)} className="hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-zinc-400">{page.title}</span>
          </nav>

          {/* Page badge & type indicator */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <FileText className="w-3 h-3" />
              <span>{page.type === 'POST' ? 'Article' : 'Page'}</span>
            </span>
            {page.updatedAt && (
              <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                <Calendar className="w-3 h-3" />
                <span>Updated {page.updatedAt}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {page.title}
          </h1>

          {/* Divider */}
          <div className="my-8 border-t border-zinc-800" />

          {/* Content rendered as Markdown */}
          {page.content ? (
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-zinc-300 prose-p:leading-relaxed
              prose-a:text-red-400 prose-a:no-underline hover:prose-a:text-red-300
              prose-strong:text-white
              prose-code:text-red-300 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
              prose-ul:text-zinc-300 prose-ol:text-zinc-300
              prose-li:marker:text-red-500
              prose-blockquote:border-red-500 prose-blockquote:text-zinc-400
            ">
              <ReactMarkdown>{page.content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-zinc-400 italic">No content has been added to this page yet.</p>
          )}

          {/* Bottom CTA */}
          <div className="mt-14 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-600/20 border border-red-500/30">
                <Youtube className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Ready to summarize a video?</p>
                <p className="text-xs text-zinc-400">Free, instant, no signup required.</p>
              </div>
            </div>
            <Link
              href={localizedUrl('/', activeLang)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-red-600/25 transition-all whitespace-nowrap"
            >
              <span>Try Summarizer Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>

        <Footer currentLang={activeLang} />
      </div>
    </main>
  );
}
