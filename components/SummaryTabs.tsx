'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Quote, Hash, TrendingUp, Sparkles } from 'lucide-react';
import { SummaryResult, TranscriptEntry, VideoMetadata } from '@/lib/types';

interface SummaryTabsProps {
  summary: SummaryResult | null;
  transcript: TranscriptEntry[];
  metadata?: VideoMetadata | null;
  loading?: boolean;
}

const tabs = [
  { id: 'takeaways', label: 'Key Takeaways', emoji: '📌' },
  { id: 'chapters', label: 'Chapters', emoji: '⏱️' },
  { id: 'summary', label: 'Full Summary', emoji: '📝' },
  { id: 'infographic', label: 'Infographic', emoji: '📊' },
  { id: 'transcript', label: 'Transcript', emoji: '📄' },
  { id: 'prompt', label: 'Prompt', emoji: '✨' },
] as const;

function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`shimmer rounded-lg ${className}`}
      style={style}
    />
  );
}

function SkeletonLines({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: `${75 + Math.random() * 25}%` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function formatTimestamp(offsetMs: number): string {
  const totalSeconds = Math.floor(offsetMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

export function SummaryTabs({ summary, transcript, metadata, loading }: SummaryTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('takeaways');
  const [copied, setCopied] = useState(false);

  const generateInfographicPrompt = (): string => {
    if (!summary) return '';

    const videoTitle = metadata?.title || 'YouTube Video';
    const channelName = metadata?.channelName || '';
    const info = summary.infographic;

    const lines: string[] = [
      `Create a professional, visually stunning vertical infographic image for the following YouTube video breakdown.`,
      ``,
      `VIDEO TITLE: "${videoTitle}"${channelName ? `\nCHANNEL: ${channelName}` : ''}`,
      ``,
      `DESIGN REQUIREMENTS:`,
      `- Modern, clean design with a dark premium color scheme (deep navy/charcoal background with vibrant accent colors)`,
      `- Vertical layout optimized for social media sharing (1080×1920 or similar)`,
      `- Use clear visual hierarchy with sections separated by subtle dividers or spacing`,
      `- Include a bold, eye-catching title header at the top`,
      `- Use icons, mini-illustrations, or visual metaphors to represent each section`,
      `- Typography should be clean and modern (mix of bold headers and readable body text)`,
      `- Include a subtle YouTube-red accent color throughout`,
      ``,
      `CONTENT TO INCLUDE IN THE INFOGRAPHIC:`,
      ``,
    ];

    // Key Takeaways
    if (summary.keyTakeaways.length > 0) {
      lines.push(`SECTION 1 — KEY TAKEAWAYS (use bullet points or checkmark icons):`);
      summary.keyTakeaways.slice(0, 5).forEach((t, i) => {
        lines.push(`  ${i + 1}. ${t}`);
      });
      lines.push('');
    }

    // Stats from infographic data
    if (info && info.keyStats.length > 0) {
      lines.push(`SECTION 2 — KEY STATISTICS (display as bold number cards or stat callouts):`);
      info.keyStats.forEach((s) => {
        lines.push(`  • ${s.label}: ${s.value}`);
      });
      lines.push('');
    }

    // Main Points
    if (info && info.mainPoints.length > 0) {
      lines.push(`SECTION 3 — MAIN POINTS (use numbered steps or a flow diagram style):`);
      info.mainPoints.forEach((p) => {
        lines.push(`  ${p.number}. ${p.title} — ${p.detail}`);
      });
      lines.push('');
    }

    // Quotes
    if (info && info.quotes.length > 0) {
      lines.push(`SECTION 4 — NOTABLE QUOTES (display in a stylized quote block with quotation marks):`);
      info.quotes.forEach((q) => {
        lines.push(`  "${q}"`);
      });
      lines.push('');
    }

    // Conclusion
    if (info?.conclusion) {
      lines.push(`FOOTER / CONCLUSION BANNER:`);
      lines.push(`  "${info.conclusion}"`);
      lines.push('');
    }

    lines.push(`ADDITIONAL INSTRUCTIONS:`);
    lines.push(`- Make the infographic look like it was designed by a professional graphic designer`);
    lines.push(`- All text must be fully readable and properly sized`);
    lines.push(`- Use visual flow that guides the eye from top to bottom`);
    lines.push(`- Add a small "Source: YouTube" credit at the very bottom`);
    lines.push(`- Do NOT include any placeholder text — use only the content provided above`);

    return lines.join('\n');
  };

  const getCopyText = (): string => {
    if (activeTab === 'transcript') {
      return transcript
        .map((e) => `[${formatTimestamp(e.offset)}] ${e.text}`)
        .join('\n');
    }
    if (activeTab === 'prompt') {
      return generateInfographicPrompt();
    }
    if (!summary) return '';

    switch (activeTab) {
      case 'takeaways':
        return summary.keyTakeaways
          .map((t, i) => `${i + 1}. ${t}`)
          .join('\n');
      case 'chapters':
        return summary.chapterSummaries
          .map((c) => `[${c.timestamp}] ${c.title}\n${c.summary}`)
          .join('\n\n');
      case 'summary':
        return summary.fullSummary;
      case 'infographic': {
        const info = summary.infographic;
        if (!info) return '';
        const parts = [
          info.title,
          info.subtitle,
          '',
          'Key Stats:',
          ...info.keyStats.map((s) => `• ${s.label}: ${s.value}`),
          '',
          'Main Points:',
          ...info.mainPoints.map(
            (p) => `${p.number}. ${p.title} — ${p.detail}`
          ),
          '',
          'Quotes:',
          ...info.quotes.map((q) => `"${q}"`),
          '',
          info.conclusion,
        ];
        return parts.join('\n');
      }
      default:
        return '';
    }
  };

  const handleCopy = async () => {
    const text = getCopyText();
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showContent = !loading && summary;
  const showTranscript = !loading && transcript.length > 0;

  return (
    <div className="animate-fade-in-up">
      {/* Tab buttons */}
      <div className="flex gap-0.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setCopied(false);
            }}
            className={`relative flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap min-w-0 ${
              activeTab === tab.id
                ? 'bg-white/[0.08] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
            }`}
          >
            <span className="text-base">{tab.emoji}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-3 glass">
        {/* Copy bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <span>{tabs.find((t) => t.id === activeTab)?.emoji}</span>
            {tabs.find((t) => t.id === activeTab)?.label}
          </h3>
          <button
            onClick={handleCopy}
            disabled={loading || (!summary && activeTab !== 'transcript')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] text-gray-400 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {/* ─── Loading skeleton ─── */}
          {loading && (
            <div className="space-y-4">
              <SkeletonLines count={6} />
            </div>
          )}

          {/* ─── Key Takeaways ─── */}
          {activeTab === 'takeaways' && showContent && (
            <ul className="space-y-3">
              {summary.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex gap-3 items-start group">
                  <span className="mt-2 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 group-hover:shadow-lg group-hover:shadow-red-500/50 transition-all" />
                  <span className="text-gray-300 leading-relaxed text-sm">
                    {takeaway}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* ─── Chapters ─── */}
          {activeTab === 'chapters' && showContent && (
            <div className="space-y-3">
              {summary.chapterSummaries.length > 0 ? (
                summary.chapterSummaries.map((chapter, i) => (
                  <div key={i} className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/[0.02] transition-all duration-200 -mx-3">
                    <span className="px-2.5 py-1 bg-white/[0.06] text-red-400 text-xs font-mono rounded-lg flex-shrink-0 border border-white/[0.04]">
                      {chapter.timestamp}
                    </span>
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        {chapter.title}
                      </h4>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                        {chapter.summary}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center py-4">
                  No chapter summaries available.
                </p>
              )}
            </div>
          )}

          {/* ─── Full Summary ─── */}
          {activeTab === 'summary' && showContent && (
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-gray-400 prose-strong:text-gray-200 prose-a:text-red-400 prose-li:text-gray-400">
              <ReactMarkdown>{summary.fullSummary}</ReactMarkdown>
            </div>
          )}

          {/* ─── Infographic Data ─── */}
          {activeTab === 'infographic' && showContent && (
            <>
              {summary.infographic ? (
                <div className="space-y-6">
                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white">
                      {summary.infographic.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {summary.infographic.subtitle}
                    </p>
                  </div>

                  {/* Key Stats */}
                  {summary.infographic.keyStats.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-red-400" />
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                          Key Stats
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {summary.infographic.keyStats.map((stat, i) => (
                          <div
                            key={i}
                            className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center hover:bg-white/[0.05] transition-all duration-200"
                          >
                            <div className="text-lg font-bold text-white">
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main Points */}
                  {summary.infographic.mainPoints.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Hash className="w-4 h-4 text-red-400" />
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                          Main Points
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {summary.infographic.mainPoints.map((point, i) => (
                          <div
                            key={i}
                            className="flex gap-3 items-start p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl hover:bg-white/[0.04] transition-all duration-200"
                          >
                            <span className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-red-500 to-rose-600 text-white text-xs font-bold rounded-lg flex-shrink-0 shadow-sm">
                              {point.number}
                            </span>
                            <div>
                              <div className="font-semibold text-white text-sm">
                                {point.title}
                              </div>
                              <div className="text-gray-500 text-sm mt-0.5">
                                {point.detail}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quotes */}
                  {summary.infographic.quotes.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Quote className="w-4 h-4 text-red-400" />
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                          Notable Quotes
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {summary.infographic.quotes.map((quote, i) => (
                          <blockquote
                            key={i}
                            className="border-l-2 border-red-500/50 pl-4 py-2 text-gray-400 italic text-sm bg-white/[0.02] rounded-r-xl pr-4"
                          >
                            &ldquo;{quote}&rdquo;
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conclusion */}
                  {summary.infographic.conclusion && (
                    <div className="p-4 bg-gradient-to-r from-red-500/5 to-rose-500/5 border border-red-500/10 rounded-xl text-center">
                      <p className="text-sm font-medium text-red-300/80">
                        {summary.infographic.conclusion}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">
                  Infographic data is not available for this summary.
                </p>
              )}
            </>
          )}

          {/* ─── Transcript ─── */}
          {activeTab === 'transcript' && (
            <>
              {showTranscript ? (
                <div className="max-h-[500px] overflow-y-auto space-y-0.5 font-mono text-sm pr-2">
                  {transcript.map((entry, i) => (
                    <div key={i} className="flex gap-3 py-1.5 hover:bg-white/[0.02] rounded-lg px-2 -mx-2 transition-colors">
                      <span className="text-red-500/50 flex-shrink-0 select-none text-xs mt-0.5">
                        {formatTimestamp(entry.offset)}
                      </span>
                      <span className="text-gray-400">{entry.text}</span>
                    </div>
                  ))}
                </div>
              ) : loading ? null : (
                <p className="text-gray-600 text-center py-4">
                  No transcript available.
                </p>
              )}
            </>
          )}

          {/* ─── Prompt ─── */}
          {activeTab === 'prompt' && (
            <>
              {showContent ? (
                <div className="space-y-4">
                  {/* Description */}
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-500/5 to-red-500/5 border border-purple-500/10 rounded-xl">
                    <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        ChatGPT Infographic Prompt
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Copy this prompt and paste it into ChatGPT (with DALL·E) or any AI image generator to create a professional infographic about this video.
                      </p>
                    </div>
                  </div>

                  {/* Prompt preview */}
                  <div className="relative">
                    <div className="max-h-[400px] overflow-y-auto rounded-xl bg-black border border-white/[0.06] p-5">
                      <pre className="text-sm text-gray-400 whitespace-pre-wrap font-mono leading-relaxed">
                        {generateInfographicPrompt()}
                      </pre>
                    </div>
                  </div>

                  {/* Big copy button */}
                  <button
                    onClick={handleCopy}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-500/10"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Prompt to Clipboard
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">
                  Generate a summary first to create the infographic prompt.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
