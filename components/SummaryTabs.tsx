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
      className={`animate-pulse bg-gray-800 rounded-lg ${className}`}
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
    <div className="mt-8">
      {/* Tab buttons */}
      <div className="flex gap-1 bg-gray-900 p-1 rounded-xl border border-gray-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setCopied(false);
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap min-w-0 ${
              activeTab === tab.id
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <span>{tab.emoji}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4 bg-gray-900 border border-gray-800 rounded-xl">
        {/* Copy bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
          <h3 className="text-sm font-medium text-gray-400">
            {tabs.find((t) => t.id === activeTab)?.emoji}{' '}
            {tabs.find((t) => t.id === activeTab)?.label}
          </h3>
          <button
            onClick={handleCopy}
            disabled={loading || (!summary && activeTab !== 'transcript')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gray-800 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="p-6">
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
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                  <span className="text-gray-200 leading-relaxed">
                    {takeaway}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* ─── Chapters ─── */}
          {activeTab === 'chapters' && showContent && (
            <div className="space-y-4">
              {summary.chapterSummaries.length > 0 ? (
                summary.chapterSummaries.map((chapter, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="px-2.5 py-1 bg-gray-800 text-red-400 text-sm font-mono rounded-lg flex-shrink-0">
                      {chapter.timestamp}
                    </span>
                    <div>
                      <h4 className="font-semibold text-white">
                        {chapter.title}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                        {chapter.summary}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">
                  No chapter summaries available.
                </p>
              )}
            </div>
          )}

          {/* ─── Full Summary ─── */}
          {activeTab === 'summary' && showContent && (
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-red-400">
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
                    <p className="text-sm text-gray-400 mt-1">
                      {summary.infographic.subtitle}
                    </p>
                  </div>

                  {/* Key Stats */}
                  {summary.infographic.keyStats.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-red-400" />
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                          Key Stats
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {summary.infographic.keyStats.map((stat, i) => (
                          <div
                            key={i}
                            className="p-3 bg-gray-800 border border-gray-700 rounded-xl text-center"
                          >
                            <div className="text-lg font-bold text-white">
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
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
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                          Main Points
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {summary.infographic.mainPoints.map((point, i) => (
                          <div
                            key={i}
                            className="flex gap-3 items-start p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl"
                          >
                            <span className="w-7 h-7 flex items-center justify-center bg-red-600 text-white text-sm font-bold rounded-lg flex-shrink-0">
                              {point.number}
                            </span>
                            <div>
                              <div className="font-semibold text-white text-sm">
                                {point.title}
                              </div>
                              <div className="text-gray-400 text-sm mt-0.5">
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
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                          Notable Quotes
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {summary.infographic.quotes.map((quote, i) => (
                          <blockquote
                            key={i}
                            className="border-l-3 border-red-500 pl-4 py-2 text-gray-300 italic text-sm bg-gray-800/30 rounded-r-lg pr-4"
                          >
                            &ldquo;{quote}&rdquo;
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conclusion */}
                  {summary.infographic.conclusion && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
                      <p className="text-sm font-medium text-red-300">
                        {summary.infographic.conclusion}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  Infographic data is not available for this summary.
                </p>
              )}
            </>
          )}

          {/* ─── Transcript ─── */}
          {activeTab === 'transcript' && (
            <>
              {showTranscript ? (
                <div className="max-h-[500px] overflow-y-auto space-y-1 font-mono text-sm pr-2">
                  {transcript.map((entry, i) => (
                    <div key={i} className="flex gap-3 py-1 hover:bg-gray-800/50 rounded px-2 -mx-2">
                      <span className="text-red-400/70 flex-shrink-0 select-none">
                        {formatTimestamp(entry.offset)}
                      </span>
                      <span className="text-gray-300">{entry.text}</span>
                    </div>
                  ))}
                </div>
              ) : loading ? null : (
                <p className="text-gray-400 text-center py-4">
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
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-500/10 to-red-500/10 border border-purple-500/20 rounded-xl">
                    <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        ChatGPT Infographic Prompt
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Copy this prompt and paste it into ChatGPT (with DALL·E) or any AI image generator to create a professional infographic about this video.
                      </p>
                    </div>
                  </div>

                  {/* Prompt preview */}
                  <div className="relative">
                    <div className="max-h-[400px] overflow-y-auto rounded-xl bg-gray-950 border border-gray-700 p-5">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                        {generateInfographicPrompt()}
                      </pre>
                    </div>
                  </div>

                  {/* Big copy button */}
                  <button
                    onClick={handleCopy}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
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
                <p className="text-gray-400 text-center py-4">
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
