'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SupportedLanguage } from '@/lib/i18n';
import { TOOL_SLUGS, ToolSlug, getToolDefinition } from '@/lib/toolTranslations';
import { getSeoUiStrings } from '@/lib/seoUiTranslations';

interface RelatedToolsSectionProps {
  currentSlug?: string;
  lang?: SupportedLanguage | string;
}

// Contextually relevant related tools cluster map
const RELATED_TOOLS_MAP: Record<string, ToolSlug[]> = {
  'youtube-transcript': [
    'youtube-summary',
    'youtube-to-text',
    'download-youtube-transcript',
    'podcast-transcript',
    'youtube-transcript-chatbot',
    'youtube-transcript-without-timestamps',
  ],
  'youtube-transcript-generator': [
    'youtube-transcript',
    'youtube-summarizer',
    'youtube-subtitle-downloader',
    'youtube-to-text',
    'youtube-transcript-without-timestamps',
    'youtube-infographic',
  ],
  'youtube-summary': [
    'youtube-summarizer',
    'youtube-transcript',
    'youtube-infographic',
    'transcript-ai',
    'youtube-to-text',
    'youtube-transcript-chatbot',
  ],
  'youtube-summarizer': [
    'youtube-summary',
    'youtube-transcript',
    'youtube-to-text',
    'transcript-ai',
    'youtube-transcript-chatbot',
    'download-youtube-transcript',
  ],
  'youtube-to-text': [
    'youtube-transcript',
    'download-youtube-transcript',
    'youtube-summary',
    'youtube-transcript-without-timestamps',
    'podcast-transcript',
    'youtube-subtitle-downloader',
  ],
  'podcast-transcript': [
    'youtube-transcript',
    'youtube-summary',
    'youtube-to-text',
    'transcript-ai',
    'download-youtube-transcript',
    'youtube-transcript-chatbot',
  ],
  'youtube-transcript-chatbot': [
    'youtube-summary',
    'transcript-ai',
    'youtube-transcript',
    'youtube-summarizer',
    'podcast-transcript',
    'youtube-to-text',
  ],
  'youtube-transcript-without-timestamps': [
    'youtube-transcript',
    'youtube-to-text',
    'download-youtube-transcript',
    'youtube-summary',
    'youtube-subtitle-downloader',
    'youtube-transcript-generator',
  ],
  'youtube-transcript-not-working': [
    'youtube-transcript',
    'youtube-transcript-generator',
    'download-youtube-transcript',
    'youtube-subtitle-downloader',
    'youtube-to-text',
    'youtube-summary',
  ],
  'download-youtube-transcript': [
    'youtube-subtitle-downloader',
    'youtube-transcript',
    'youtube-to-text',
    'youtube-transcript-without-timestamps',
    'youtube-summary',
    'podcast-transcript',
  ],
  'youtube-subtitle-downloader': [
    'download-youtube-transcript',
    'youtube-transcript',
    'youtube-transcript-generator',
    'youtube-to-text',
    'youtube-transcript-without-timestamps',
    'youtube-summary',
  ],
  'youtube-infographic': [
    'youtube-summary',
    'transcript-ai',
    'youtube-summarizer',
    'youtube-transcript',
    'youtube-to-text',
    'podcast-transcript',
  ],
  'transcript-ai': [
    'youtube-transcript-chatbot',
    'youtube-summary',
    'youtube-infographic',
    'youtube-summarizer',
    'youtube-transcript',
    'podcast-transcript',
  ],
};

export function RelatedToolsSection({ currentSlug = 'youtube-transcript', lang = 'en' }: RelatedToolsSectionProps) {
  const activeLang = (lang as SupportedLanguage) || 'en';
  const isRtl = activeLang === 'ar';
  const ui = getSeoUiStrings(activeLang);

  // Get mapped related slugs, fallback to all tool slugs excluding current
  const relatedSlugs =
    RELATED_TOOLS_MAP[currentSlug] ||
    TOOL_SLUGS.filter((s) => s !== currentSlug).slice(0, 6);

  return (
    <nav aria-label="Related tools" className="mt-16 pt-12 border-t border-white/[0.08]">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {ui.relatedToolsTitle}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
          {ui.relatedToolsSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedSlugs.map((slug) => {
          const tool = getToolDefinition(slug, activeLang);
          const href = `/${activeLang}/${slug}`;
          // Distinct localized anchor text
          const anchorText = `${tool.headlinePrefix} ${tool.headlineGradient} ${tool.headlineSuffix}`.trim();

          return (
            <Link
              key={slug}
              href={href}
              className="group glass p-4 rounded-xl hover:border-red-500/30 hover:bg-white/[0.04] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-medium text-gray-300">
                    <span>{tool.badgeEmoji}</span>
                    <span className="truncate max-w-[140px]">{tool.badge}</span>
                  </div>
                  <div className="text-gray-500 group-hover:text-red-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all">
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-red-300 transition-colors line-clamp-1">
                  {anchorText}
                </h3>

                <p className="mt-1 text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500 group-hover:text-zinc-300">
                <span className="font-mono text-[10px] text-zinc-600 truncate">/{activeLang}/{slug}</span>
                <span className="text-red-400 font-medium inline-flex items-center gap-1">
                  {ui.exploreTool}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
