'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SettingsModal } from '@/components/SettingsModal';
import { SupportedLanguage } from '@/lib/i18n';
import { BlogPost, BLOG_POSTS } from '@/lib/contentData';
import { AISettings } from '@/lib/types';
import { BookOpen, Clock, Calendar, ArrowLeft, ArrowRight, Youtube, CheckCircle2, Share2 } from 'lucide-react';

interface BlogPostClientProps {
  post: BlogPost;
  lang: SupportedLanguage;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'gemini',
  openrouterApiKey: '',
  openrouterModel: '',
};

export function BlogPostClient({ post, lang }: BlogPostClientProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);

  const homeHref = lang === 'en' ? '/' : `/${lang}`;
  const blogIndexHref = lang === 'en' ? '/blog' : `/${lang}/blog`;

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

        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-20">
          {/* Back link */}
          <Link
            href={blogIndexHref}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all articles</span>
          </Link>

          {/* Metadata Header */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
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

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base text-zinc-300 leading-relaxed border-l-2 border-red-500 pl-4 py-1 italic">
            {post.excerpt}
          </p>

          {/* Contextual In-Article Callout Box */}
          <div className="my-8 p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Experience it in action</p>
                <p className="text-xs text-zinc-400">
                  Ready to test video summarization? Use our free tool on any video right now.
                </p>
              </div>
            </div>
            <Link
              href={homeHref}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-red-600/25 transition-all whitespace-nowrap"
            >
              <span>Launch Summarizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Body paragraphs */}
          <div className="space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Footer Call to Action with Contextual Internal Links */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 text-center">
            <h3 className="text-lg font-bold text-white">Ready to save hours watching long videos?</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
              Our free AI tool analyzes any YouTube video URL and generates structured takeaways in seconds.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={homeHref}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-red-600/25 transition-all"
              >
                <span>Summarize a YouTube Video</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/youtube-transcript"
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
              >
                Transcript Tool
              </Link>
            </div>
          </div>
        </article>

        <Footer currentLang={lang} />
      </div>
    </main>
  );
}
