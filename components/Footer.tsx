'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Youtube, Globe, Heart, Shield, FileText, HelpCircle, BookOpen, Sparkles, Info, Lightbulb } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage, isSupportedLanguage } from '@/lib/i18n';
import { extractLangFromPath, getSavedLanguage, localizedUrl, persistLanguage } from '@/lib/localizedUrl';

interface FooterProps {
  currentLang?: SupportedLanguage | string;
}

export function Footer({ currentLang }: FooterProps) {
  const pathname = usePathname() || '/';

  // Dynamically resolve active language: explicit prop -> path segment -> client saved storage -> 'en'
  const pathLang = extractLangFromPath(pathname);
  const activeLang: SupportedLanguage =
    (currentLang && isSupportedLanguage(currentLang) ? currentLang : null) ||
    pathLang ||
    (typeof window !== 'undefined' ? getSavedLanguage() : 'en');

  return (
    <footer className="mt-20 border-t border-zinc-900 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-900">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <Link href={localizedUrl('/', activeLang)} className="inline-flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-red-600/10 border border-red-500/20 group-hover:bg-red-600/20 transition-colors">
                <Youtube className="w-5 h-5 text-red-500" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                YouTube<span className="text-red-500">Summarizer</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              AI-powered YouTube video summarizer, transcript extractor, and interactive chat. Free, instant, and privacy-friendly.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Free Forever · 4.9/5 Rating</span>
            </div>
          </div>

          {/* Quick Tools Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Tools & Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href={localizedUrl('/', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Home Tool</span>
                </Link>
              </li>
              <li>
                <Link
                  href={localizedUrl('/youtube-transcript', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  YouTube Transcript Generator
                </Link>
              </li>
              <li>
                <Link
                  href={localizedUrl('/youtube-summary', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  AI Video Summarizer
                </Link>
              </li>
              <li>
                <Link
                  href={localizedUrl('/youtube-infographic', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Infographic Generator
                </Link>
              </li>
              <li>
                <Link
                  href={localizedUrl('/podcast-transcript', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Podcast Transcripts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Help (Internal Links) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Resources & Help
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href={localizedUrl('/blog', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Blog & Articles</span>
                </Link>
              </li>
              <li>
                <Link
                  href={localizedUrl('/faq', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                  <span>FAQ & Help Center</span>
                </Link>
              </li>
              <li>
                <Link
                  href={localizedUrl('/how-to-use', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-zinc-500" />
                  <span>How to Use YouTubeSummarizer</span>
                </Link>
              </li>
              <li>
                <Link
                  href={localizedUrl('/about', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-zinc-500" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link
                  href={localizedUrl('/privacy', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href={localizedUrl('/terms', activeLang)}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages Selector Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-red-400" />
              <span>Language (Idiomas)</span>
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.values(SUPPORTED_LANGUAGES).map((lang) => {
                const isActive = activeLang === lang.code;
                const targetUrl = localizedUrl(pathname, lang.code);
                return (
                  <Link
                    key={lang.code}
                    href={targetUrl}
                    onClick={() => persistLanguage(lang.code)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors border ${
                      isActive
                        ? 'bg-red-500/10 text-red-400 border-red-500/30 font-medium'
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800/80 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.nativeName}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Attribution Line (Requested: "Powered by Cody · Built with love") */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Powered by <strong className="text-zinc-300 font-medium">Cody</strong></span>
            <span className="text-zinc-700">·</span>
            <span className="inline-flex items-center gap-1">
              Built with love <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
            <span>© {new Date().getFullYear()} YouTube Summarizer</span>
            <span>·</span>
            <Link href={localizedUrl('/privacy', activeLang)} className="hover:text-zinc-400 transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href={localizedUrl('/terms', activeLang)} className="hover:text-zinc-400 transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="/admin" className="text-zinc-700 hover:text-zinc-500 transition-colors">
              Console
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
