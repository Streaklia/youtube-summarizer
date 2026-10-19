'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2, Sparkles, Search, AlertCircle } from 'lucide-react';
import { extractVideoId } from '@/lib/youtube';
import { extractLangFromPath, getSavedLanguage, persistLanguage, resolveTabFromToolOrPath } from '@/lib/localizedUrl';

export interface SeoLandingToolProps {
  badge?: string;
  badgeEmoji?: string;
  headlinePrefix: string;
  headlineGradient: string;
  headlineSuffix?: string;
  description: string;
  inputPlaceholder?: string;
  buttonLabel?: string;
  features?: { title: string; description: string; icon: string }[];
  faqs?: { question: string; answer: string }[];
  seoBottomContent?: React.ReactNode;
  lang?: string;
  toolSlug?: string;
  targetTab?: string;
}

export function SeoLandingTool({
  badge = 'Free AI Tool',
  badgeEmoji = '⚡',
  headlinePrefix,
  headlineGradient,
  headlineSuffix = '',
  description,
  inputPlaceholder = 'https://www.youtube.com/watch?v=...',
  buttonLabel = 'Process Video',
  features,
  faqs,
  seoBottomContent,
  lang,
  toolSlug,
  targetTab,
}: SeoLandingToolProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim() || loading) return;

    setError(null);
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Please provide a valid YouTube URL (e.g. youtube.com/watch?v=... or youtu.be/...)');
      return;
    }

    const activeLang =
      lang ||
      extractLangFromPath(pathname) ||
      (typeof window !== 'undefined' ? getSavedLanguage() : 'en');

    persistLanguage(activeLang);

    setLoading(true);

    // Resolve context-aware target tab based on explicit prop or active route pathname
    const determinedTab = targetTab || resolveTabFromToolOrPath(toolSlug || pathname);

    const params = new URLSearchParams();
    if (activeLang && activeLang !== 'en') {
      params.set('lang', activeLang);
    }
    if (determinedTab) {
      params.set('tab', determinedTab);
    }

    const queryStr = params.toString();
    const targetUrl = `/summary/${videoId}${queryStr ? `?${queryStr}` : ''}`;
    router.push(targetUrl);
  };

  return (
    <div className="w-full">
      {/* Hero Headline */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-gray-300 mb-5 shadow-sm">
          <span>{badgeEmoji}</span>
          <span>{badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {headlinePrefix}{' '}
          <span className="text-gradient">{headlineGradient}</span>{' '}
          {headlineSuffix}
        </h1>

        <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Modern URL Input Container */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="glow-border-wrapper">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/90 backdrop-blur-xl transition-all duration-300">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-gray-600 focus:outline-none text-sm sm:text-base"
                disabled={loading}
                aria-label="YouTube video URL"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="button-glow px-5 sm:px-7 py-3.5 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 hover:from-red-400 hover:to-rose-400 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap text-sm disabled:shadow-none"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{buttonLabel}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 glass border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <p className="mt-3 text-center text-xs text-gray-600">
          Instant extraction • No sign-up required • 100% Free
        </p>
      </div>

      {/* Feature Value Props */}
      {features && features.length > 0 && (
        <div className="mt-16 pt-12 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="glass p-5 rounded-2xl hover:border-white/[0.1] transition-all duration-200"
            >
              <div className="text-2xl mb-3">{feat.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{feat.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* SEO Bottom Content / FAQ */}
      {faqs && faqs.length > 0 && (
        <div className="mt-16 pt-10 border-t border-white/[0.06] max-w-2xl mx-auto">
          <h2 className="text-lg font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass p-4 rounded-xl">
                <h3 className="text-white font-medium text-sm mb-1">{faq.question}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {seoBottomContent && (
        <div className="mt-12 text-gray-400 text-xs leading-relaxed max-w-2xl mx-auto">
          {seoBottomContent}
        </div>
      )}
    </div>
  );
}
