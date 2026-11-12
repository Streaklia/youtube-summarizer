'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  Loader2,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { extractVideoId } from '@/lib/youtube';
import { persistLanguage } from '@/lib/localizedUrl';

export interface ArabicFeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  highlight?: string;
}

export interface ArabicFaqItem {
  q: string;
  a: string;
}

export interface ArabicToolLandingLayoutProps {
  currentPath: string;
  badge: string;
  badgeEmoji: string;
  badgeHighlight?: string;
  h1Prefix: string;
  h1Highlight: string;
  h1Suffix?: string;
  subheadline: string;
  inputPlaceholder: string;
  buttonLabel: string;
  targetTab?: 'takeaways' | 'transcript' | 'chapters' | 'summary' | 'infographic' | 'prompt';
  features: ArabicFeatureItem[];
  articleContent: React.ReactNode;
  faqs: ArabicFaqItem[];
  schemaData: object;
}

const ARABIC_TOOLS_NAV = [
  {
    href: '/ar',
    title: 'الرئيسية — ملخص وتفريغ يوتيوب',
    desc: 'استخراج النص والملخص الذكي وأهم النقاط في ثوانٍ.',
    emoji: '🚀',
  },
  {
    href: '/ar/youtube-transcript',
    title: 'تفريغ فيديو يوتيوب إلى نص',
    desc: 'تحويل الفيديو إلى نص مكتوب مع التوقيت الزمني أو بدونه.',
    emoji: '📄',
  },
  {
    href: '/ar/youtube-summary',
    title: 'تلخيص فيديوهات يوتيوب بالذكاء الاصطناعي',
    desc: 'ملخصات شاملة وأهم الأفكار للفيديوهات الطويلة.',
    emoji: '🤖',
  },
  {
    href: '/ar/youtube-to-srt',
    title: 'تحميل ترجمة يوتيوب SRT و TXT',
    desc: 'تصدير ملفات ترجمة متوافقة مع Premiere و DaVinci.',
    emoji: '🎬',
  },
  {
    href: '/ar/podcast-transcript',
    title: 'تفريغ حلقات البودكاست إلى نص',
    desc: 'تحويل البودكاست الطويل إلى مقالات ونصوص قابلة للبحث.',
    emoji: '🎙️',
  },
  {
    href: '/ar/youtube-transcript-chatbot',
    title: 'الدردشة مع فيديوهات يوتيوب بالذكاء الاصطناعي',
    desc: 'اسأل أي سؤال حول الفيديو واحصل على إجابة فورية.',
    emoji: '💬',
  },
];

export function ArabicToolLandingLayout({
  currentPath,
  badge,
  badgeEmoji,
  badgeHighlight,
  h1Prefix,
  h1Highlight,
  h1Suffix = '',
  subheadline,
  inputPlaceholder,
  buttonLabel,
  targetTab = 'takeaways',
  features,
  articleContent,
  faqs,
  schemaData,
}: ArabicToolLandingLayoutProps) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim() || loading) return;

    setError(null);
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('يرجى لصق رابط فيديو يوتيوب صحيح (مثال: https://www.youtube.com/watch?v=dQw4w9WgXcQ أو رابط youtu.be)');
      return;
    }

    persistLanguage('ar');
    setLoading(true);
    router.push(`/summary/${videoId}?tab=${targetTab}&lang=ar`);
  };

  const handlePasteSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
  };

  const otherTools = ARABIC_TOOLS_NAV.filter((t) => t.href !== currentPath);

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-[#040200] text-zinc-100 relative overflow-hidden">
      {/* Localized SoftwareApplication + FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Ambient Brand Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-b from-[#E02440]/14 to-transparent blur-3xl opacity-80" />
        <div className="absolute top-[35%] -left-40 w-[480px] h-[480px] bg-[#E02440]/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[65%] -right-40 w-[450px] h-[450px] bg-rose-600/8 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-200 mb-6 shadow-sm">
            <span className="text-base">{badgeEmoji}</span>
            <span>{badge}</span>
            {badgeHighlight && (
              <span className="px-2 py-0.5 rounded-full bg-[#E02440]/15 border border-[#E02440]/30 text-rose-300 text-[10px] font-bold">
                {badgeHighlight}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.25]">
            {h1Prefix}{' '}
            <span className="bg-gradient-to-l from-[#E02440] via-rose-400 to-orange-400 bg-clip-text text-transparent">
              {h1Highlight}
            </span>{' '}
            {h1Suffix}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* Interactive YouTube URL Form */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E02440] via-rose-500 to-orange-500 rounded-2xl blur-sm opacity-45 group-hover:opacity-80 transition duration-300" />
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-[#040200] border border-zinc-800/90 shadow-2xl">
                <div className="relative flex-1 flex items-center">
                  <Search className="w-5 h-5 text-zinc-500 absolute right-3.5 pointer-events-none" />
                  <input
                    type="url"
                    dir="ltr"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={inputPlaceholder}
                    className="w-full pr-11 pl-4 py-3 bg-transparent text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none text-right sm:text-left"
                    disabled={loading}
                    aria-label="رابط فيديو يوتيوب"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-[#E02440] to-rose-600 hover:from-rose-500 hover:to-red-600 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#E02440]/30 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>جاري المعالجة...</span>
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

            {error && (
              <div className="mt-3 p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-200 text-right flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>مجاني 100% وفوري</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>بدون تسجيل أو إضافات</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E02440]" />
                <span>دعم كامل للغة العربية</span>
              </span>
            </div>

            {/* Quick Sample Links */}
            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <span>جرّب مثالاً سريعاً:</span>
              <button
                type="button"
                onClick={() => handlePasteSample('https://www.youtube.com/watch?v=jNQXAC9IVRw')}
                className="text-zinc-400 hover:text-[#E02440] underline underline-offset-2 transition-colors cursor-pointer"
              >
                أول فيديو على يوتيوب
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => handlePasteSample('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                className="text-zinc-400 hover:text-emerald-400 underline underline-offset-2 transition-colors cursor-pointer"
              >
                فيديو تجريبي
              </button>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section aria-label="مميزات الأداة" className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-[#E02440]/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xl shadow-inner group-hover:border-[#E02440]/40 transition-colors">
                      {feat.icon}
                    </div>
                    {feat.highlight && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E02440]/10 border border-[#E02440]/25 text-rose-300">
                        {feat.highlight}
                      </span>
                    )}
                  </div>
                  <h2 className="text-sm font-bold text-white mb-1.5 group-hover:text-rose-300 transition-colors">
                    {feat.title}
                  </h2>
                  <p className="text-xs text-zinc-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rich Arabic SEO Article Content */}
        <article className="mt-16 sm:mt-20 pt-12 border-t border-zinc-800/80 max-w-4xl mx-auto">
          {articleContent}
        </article>

        {/* FAQ Accordion */}
        {faqs && faqs.length > 0 && (
          <section aria-label="الأسئلة الشائعة" className="mt-20 pt-12 border-t border-zinc-800/80 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E02440]/10 border border-[#E02440]/25 text-rose-300 text-xs font-semibold mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>إجابات سريعة</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                الأسئلة الشائعة
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
                      className="w-full py-4 px-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/70 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-xs sm:text-sm font-bold text-zinc-200">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#E02440]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/40 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Internal Links Grid to Other Arabic Tools & Articles */}
        <section aria-label="أدوات عربية أخرى" className="mt-20 pt-12 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">أدوات يوتيوب العربية الأخرى</h2>
              <p className="text-xs text-zinc-400 mt-1">
                استكشف كافة أدوات التفريغ والترجمة والتلخيص بالذكاء الاصطناعي.
              </p>
            </div>
            <Link
              href="/ar/articles"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E02440] hover:underline"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>تصفح المقالات والشروحات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-[#E02440]/50 hover:bg-zinc-900 transition-all group"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-lg">{tool.emoji}</span>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#E02440] transition-colors">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
