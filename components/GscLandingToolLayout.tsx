'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  Loader2,
  CheckCircle2,
  Download,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { extractVideoId } from '@/lib/youtube';
import { RelatedTools } from '@/components/RelatedTools';

export interface GscLandingFeature {
  icon: React.ReactNode;
  title: string;
  desc: string;
  highlight?: string;
}

export interface GscFaqItem {
  q: string;
  a: string;
}

export interface GscLandingToolLayoutProps {
  slug: string;
  badge: string;
  badgeEmoji: string;
  badgeHighlight?: string;
  h1Prefix: string;
  h1Highlight: string;
  h1Suffix?: string;
  subheadline: string;
  inputPlaceholder: string;
  buttonLabel: string;
  targetTab?: 'transcript' | 'summary' | 'infographic' | 'chat';
  features: GscLandingFeature[];
  articleContent: React.ReactNode;
  faqs: GscFaqItem[];
  schemaData: object;
}

export function GscLandingToolLayout({
  slug,
  badge,
  badgeEmoji,
  badgeHighlight,
  h1Prefix,
  h1Highlight,
  h1Suffix = '',
  subheadline,
  inputPlaceholder,
  buttonLabel,
  targetTab = 'transcript',
  features,
  articleContent,
  faqs,
  schemaData,
}: GscLandingToolLayoutProps) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim() || loading) return;

    setError(null);
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Please paste a valid YouTube video URL (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or youtu.be link)');
      return;
    }

    setLoading(true);
    router.push(`/summary/${videoId}?tab=${targetTab}`);
  };

  const handlePasteSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-zinc-100 font-sans antialiased selection:bg-[#FF2B4A]/30 selection:text-white">
      {/* Inject Structured Data (JSON-LD) for Search Engines & GEO (Generative Engine Optimization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Ambient Radial Gradient Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-b from-[#FF2B4A]/12 to-transparent blur-3xl opacity-75" />
        <div className="absolute top-[35%] -right-40 w-[500px] h-[500px] bg-teal-500/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[65%] -left-40 w-[450px] h-[450px] bg-[#FF2B4A]/8 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-20 border-b border-zinc-800/80 bg-[#0a0c10]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 p-1 flex items-center justify-center group-hover:border-[#FF2B4A]/50 transition-colors shadow-sm">
              <Image
                src="/logo.png"
                alt="MyTranscript Logo"
                width={26}
                height={26}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1">
                MyTranscript<span className="text-[#FF2B4A]">.pro</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono -mt-1">Free AI Video Tools</span>
            </div>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-3 text-xs font-semibold">
            <Link
              href="/youtube-transcript"
              className="hidden sm:inline-block px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              Transcript Generator
            </Link>
            <Link
              href="/youtube-summary"
              className="hidden md:inline-block px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              AI Summarizer
            </Link>
            <Link
              href="/youtube-to-text"
              className="hidden sm:inline-block px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              YouTube to Text
            </Link>
            <Link
              href="/articles"
              className="px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FF2B4A] to-rose-600 hover:from-rose-500 hover:to-red-600 text-white font-bold transition-all shadow-sm shadow-[#FF2B4A]/25"
            >
              Open App
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-200 mb-6 shadow-sm">
            <span className="text-base">{badgeEmoji}</span>
            <span>{badge}</span>
            {badgeHighlight && (
              <span className="px-2 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-[10px] font-bold tracking-wide">
                {badgeHighlight}
              </span>
            )}
          </div>

          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {h1Prefix}{' '}
            <span className="bg-gradient-to-r from-[#FF2B4A] via-rose-400 to-teal-400 bg-clip-text text-transparent">
              {h1Highlight}
            </span>{' '}
            {h1Suffix}
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* Core Interactive Extraction Tool Box */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF2B4A] via-rose-500 to-teal-500 rounded-2xl blur-sm opacity-50 group-hover:opacity-85 transition duration-300" />
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-2xl">
                <div className="relative flex-1 flex items-center">
                  <Search className="w-5 h-5 text-zinc-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={inputPlaceholder}
                    className="w-full pl-11 pr-4 py-3 bg-transparent text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none"
                    disabled={loading}
                    aria-label="YouTube video URL"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF2B4A] to-rose-600 hover:from-rose-500 hover:to-red-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#FF2B4A]/30 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Extracting...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>{buttonLabel}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-3 p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-200 text-left flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Trust & Spec Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>100% Free &amp; Instant</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>No Login or Software Required</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2B4A]" />
                <span>Auto-Captions &amp; CC Supported</span>
              </span>
            </div>

            {/* Quick Demo Links */}
            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <span>Try sample:</span>
              <button
                type="button"
                onClick={() => handlePasteSample('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                className="text-zinc-400 hover:text-teal-400 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Music Video
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => handlePasteSample('https://www.youtube.com/watch?v=jNQXAC9IVRw')}
                className="text-zinc-400 hover:text-[#FF2B4A] underline underline-offset-2 transition-colors cursor-pointer"
              >
                First YouTube Video
              </button>
            </div>
          </div>
        </div>

        {/* Feature Value Props (Grid) */}
        <section aria-label="Tool Capabilities and Features" className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xl shadow-inner group-hover:border-[#FF2B4A]/40 transition-colors">
                      {feat.icon}
                    </div>
                    {feat.highlight && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">
                        {feat.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-teal-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Programmatic Semantic Article Section (Deep SEO Content) */}
        <article className="mt-16 sm:mt-24 pt-12 border-t border-zinc-800/80 max-w-4xl mx-auto">
          {articleContent}
        </article>

        {/* FAQ Accordion Section */}
        {faqs && faqs.length > 0 && (
          <section aria-label="Frequently Asked Questions" className="mt-20 pt-12 border-t border-zinc-800/80 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Got Questions?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4.5 px-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/70 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-xs sm:text-sm font-bold text-zinc-200">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#FF2B4A]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/40 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Internal Linking Related Tools Section */}
        <RelatedTools currentSlug={slug} />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">MyTranscript.pro</span>
            <span>— Free YouTube Video Transcripts &amp; Subtitle Downloads</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-zinc-400">
            <Link href="/about-us" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
            <Link href="/feed.xml" className="hover:text-white transition-colors">RSS</Link>
            <Link href="/llms.txt" className="hover:text-white transition-colors">LLMs.txt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
