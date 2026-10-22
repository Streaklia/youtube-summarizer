'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SettingsModal } from '@/components/SettingsModal';
import { SupportedLanguage } from '@/lib/i18n';
import { BLOG_POSTS, BlogPost } from '@/lib/contentData';
import { AISettings } from '@/lib/types';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, Youtube, CheckCircle2 } from 'lucide-react';

interface BlogIndexClientProps {
  lang: SupportedLanguage;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'gemini',
  openrouterApiKey: '',
  openrouterModel: '',
};

export function BlogIndexClient({ lang }: BlogIndexClientProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);

  const homeHref = lang === 'en' ? '/' : `/${lang}`;
  const prefix = lang === 'en' ? '' : `/${lang}`;

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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guides, Benchmarks & Insights</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            YouTube Summarizer{' '}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
              Blog & Articles
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Discover in-depth tutorials on video transcript extraction, AI model benchmarks, and productivity tips to learn faster from video.
          </p>

          {/* Contextual CTA linking back to main tool */}
          <div className="mt-8 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Have a video to summarize right now?</p>
                <p className="text-xs text-zinc-400">Paste any link into our free AI engine and get instant takeaways in 2 seconds.</p>
              </div>
            </div>
            <Link
              href={homeHref}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-red-600/25 transition-all whitespace-nowrap"
            >
              <span>Try Summarizer Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 gap-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all group"
              >
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-medium">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                  <Link href={`${prefix}/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between pt-4 border-t border-zinc-800/60">
                  <Link
                    href={`${prefix}/blog/${post.slug}`}
                    className="text-xs font-medium text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <span>Read full article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  {/* Contextual link to tool */}
                  <Link
                    href={homeHref}
                    className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors hidden sm:inline"
                  >
                    Use YouTube Tool →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
