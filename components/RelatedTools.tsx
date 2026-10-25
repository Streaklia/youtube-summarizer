import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOL_SLUGS } from '@/lib/toolTranslations';
import { getSlugConfig } from '@/lib/slugConfig';

interface RelatedToolsProps {
  currentSlug?: string;
}

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  // Filter out current slug and present all alternative tools cleanly
  const tools = TOOL_SLUGS.filter((s) => s !== currentSlug);

  return (
    <nav aria-label="Explore Related YouTube & Transcript Tools" className="mt-20 pt-14 border-t border-zinc-800/80">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-400 mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>More Free AI Tools</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Explore Alternative YouTube &amp; Audio Tools
        </h2>
        <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Switch seamlessly between transcript generation, AI video summarization, podcast text conversion, and subtitle downloads.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((slug) => {
          const config = getSlugConfig(slug);
          return (
            <Link
              key={slug}
              href={`/${slug}`}
              className="group p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-red-500/40 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-medium text-zinc-300">
                    <span>{config.badgeEmoji}</span>
                    <span className="truncate max-w-[130px]">{config.badge}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-red-300 transition-colors line-clamp-1">
                  {config.h1}
                </h3>

                <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {config.metaDescription}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
                <span className="font-mono text-[10px] text-zinc-500">/{slug}</span>
                <span className="text-red-400 font-medium group-hover:text-red-300">
                  Open Tool →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
