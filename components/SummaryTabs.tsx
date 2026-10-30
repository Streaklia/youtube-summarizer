'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Copy,
  Check,
  Quote,
  Hash,
  TrendingUp,
  Sparkles,
  RefreshCw,
  ExternalLink,
  FileDown,
  Printer,
  Loader2,
  Brain,
  Zap,
} from 'lucide-react';
import { SummaryResult, TranscriptEntry, VideoMetadata } from '@/lib/types';

interface SummaryTabsProps {
  summary: SummaryResult | null;
  transcript: TranscriptEntry[];
  metadata?: VideoMetadata | null;
  loading?: boolean;
  onRegenerateSection?: (section: string) => Promise<void>;
  onGenerateSection?: (section: string) => Promise<void>;
  regeneratingSection?: string | null;
  initialTab?: string;
  onTabChange?: (tab: string) => void;
}

const tabs = [
  { id: 'takeaways', label: 'Key Takeaways', emoji: '📌', badge: 'AI' },
  { id: 'transcript', label: 'Transcript', emoji: '📄', badge: 'Instant' },
  { id: 'chapters', label: 'Chapters', emoji: '⏱️', badge: null },
  { id: 'summary', label: 'Full Summary', emoji: '📝', badge: null },
  { id: 'infographic', label: 'Infographic', emoji: '📊', badge: 'New' },
  { id: 'prompt', label: 'Prompt', emoji: '✨', badge: null },
] as const;

const LOADING_MESSAGES_BY_SECTION: Record<string, string[]> = {
  takeaways: [
    '✨ Distilling key insights with AI... Please hold on a moment',
    '🧠 Synthesizing video highlights & core takeaways...',
    '⚡ Extracting actionable knowledge and practical takeaways...',
    '📝 Formatting clear, bulleted takeaways for fast reading...',
  ],
  chapters: [
    '⏱️ Synthesizing timestamped chapters with AI... Please hold on',
    '🎯 Mapping video timeline, topics, and scene transitions...',
    '📌 Organizing structured chapters for instant navigation...',
  ],
  summary: [
    '📝 Synthesizing comprehensive executive video summary...',
    '✨ Distilling multi-chapter context into structured sections...',
    '💡 Reviewing key concepts, arguments, and takeaways...',
  ],
  infographic: [
    '📊 Designing visual stat cards and memorable quotes with AI...',
    '🎨 Extracting key data points and executive highlights...',
    '✨ Formatting interactive infographic cards for easy sharing...',
  ],
  prompt: [
    '✨ Formulating visual storytelling prompts with AI...',
    '🎨 Crafting high-context image generation prompts from video dialogue...',
  ],
};

function FriendlyAILoadingState({
  section,
}: {
  section: string;
}) {
  const messages = LOADING_MESSAGES_BY_SECTION[section] || [
    '✨ Distilling key insights with AI... Please hold on a moment',
    '🧠 Synthesizing video highlights...',
    '⚡ Analyzing spoken transcript dialogue...',
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="py-6 px-3 sm:px-6 space-y-6 max-w-2xl mx-auto">
      {/* Friendly engaging central banner */}
      <div className="relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-red-500/[0.08] via-zinc-900/60 to-zinc-950 border border-red-500/25 shadow-xl text-center space-y-4 animate-fade-in">
        {/* Glow backdrop */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-24 bg-red-500/20 blur-2xl rounded-full pointer-events-none" />

        {/* Animated Icon Ring */}
        <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl border-2 border-red-500/30 border-t-red-500 animate-spin" />
          <div className="w-11 h-11 rounded-xl bg-zinc-900/90 border border-red-500/40 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Sparkles className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
        </div>

        {/* Dynamic Rotating Message */}
        <div className="space-y-1.5">
          <div className="min-h-[28px] flex items-center justify-center">
            <p className="text-sm sm:text-base font-semibold text-white tracking-tight animate-fade-in transition-all duration-300">
              {messages[messageIndex]}
            </p>
          </div>
          <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>AI Engine analyzing transcript · Ready in moments</span>
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full max-w-md mx-auto h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-red-500 via-rose-400 to-teal-400 rounded-full animate-pulse w-full" />
        </div>

        <p className="text-[11px] text-zinc-500 pt-1">
          💡 You can click the <strong>Transcript</strong> tab to read the full video text while AI synthesizes this section.
        </p>
      </div>

      {/* Shimmer Skeleton Cards */}
      <div className="space-y-3 pt-2">
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] space-y-2.5 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400/50" />
            <div className="h-3.5 w-1/4 rounded bg-white/[0.08]" />
          </div>
          <div className="h-3 w-11/12 rounded bg-white/[0.04]" />
          <div className="h-3 w-4/5 rounded bg-white/[0.03]" />
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] space-y-2.5 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400/50" />
            <div className="h-3.5 w-1/3 rounded bg-white/[0.08]" />
          </div>
          <div className="h-3 w-full rounded bg-white/[0.04]" />
          <div className="h-3 w-2/3 rounded bg-white/[0.03]" />
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] space-y-2.5 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-400/50" />
            <div className="h-3.5 w-1/5 rounded bg-white/[0.08]" />
          </div>
          <div className="h-3 w-5/6 rounded bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}

function EmptyTabPlaceholder({
  icon,
  title,
  description,
  buttonLabel,
  onGenerate,
  disabled,
}: {
  icon: string;
  title: string;
  description: string;
  buttonLabel: string;
  onGenerate: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="py-12 px-6 text-center rounded-2xl bg-white/[0.02] border border-white/[0.04] max-w-lg mx-auto space-y-4 animate-fade-in-up">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-3xl shadow-inner">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-xs text-gray-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={disabled}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{buttonLabel}</span>
        </button>
      </div>
      <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
        <span>⚡</span>
        <span>Generates on-demand to save AI tokens and load fast</span>
      </p>
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

export function SummaryTabs({
  summary,
  transcript,
  metadata,
  loading,
  onRegenerateSection,
  onGenerateSection,
  regeneratingSection,
  initialTab,
  onTabChange,
}: SummaryTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    initialTab || (transcript.length > 0 ? 'transcript' : 'takeaways')
  );
  const [copied, setCopied] = useState(false);
  const [promptFormat, setPromptFormat] = useState<'infographic' | 'comic'>('infographic');
  const [promptSeed, setPromptSeed] = useState(0);

  // Sync initialTab when provided
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Per-section loaded check (Cached state)
  const hasTakeaways = Boolean(summary?.keyTakeaways && summary.keyTakeaways.length > 0);
  const hasChapters = Boolean(summary?.chapterSummaries && summary.chapterSummaries.length > 0);
  const hasSummary = Boolean(summary?.fullSummary && summary.fullSummary.trim().length > 0);
  const hasInfographic = Boolean(
    summary?.infographic && (summary.infographic.title || (summary.infographic.mainPoints && summary.infographic.mainPoints.length > 0))
  );
  const hasPromptReady = hasTakeaways || hasChapters || hasSummary || hasInfographic;

  const isTabLoaded = (id: string): boolean => {
    switch (id) {
      case 'transcript':
        return transcript.length > 0;
      case 'takeaways':
        return hasTakeaways;
      case 'chapters':
        return hasChapters;
      case 'summary':
        return hasSummary;
      case 'infographic':
        return hasInfographic;
      case 'prompt':
        return hasPromptReady;
      default:
        return false;
    }
  };

  const isCurrentTabLoaded = isTabLoaded(activeTab);
  const isCurrentSectionRegenerating = regeneratingSection === activeTab;
  const isAITab = activeTab !== 'transcript';

  const handleTriggerSection = (section: string) => {
    if (section === 'prompt') {
      if (hasPromptReady) {
        setPromptSeed((prev) => prev + 1);
        return;
      }
      if (onGenerateSection) {
        onGenerateSection('takeaways');
      } else if (onRegenerateSection) {
        onRegenerateSection('takeaways');
      }
      return;
    }

    if (onGenerateSection) {
      onGenerateSection(section);
    } else if (onRegenerateSection) {
      onRegenerateSection(section);
    }
  };

  const handleRegenerateCurrentTab = () => {
    handleTriggerSection(activeTab);
  };

  const generateComicPrompt = (): string => {
    const videoTitle = metadata?.title || 'YouTube Video';
    const channelName = metadata?.channelName || '';
    const points = summary?.chapterSummaries && summary.chapterSummaries.length > 0
      ? summary.chapterSummaries.slice(0, 4)
      : summary?.keyTakeaways && summary.keyTakeaways.length > 0
      ? summary.keyTakeaways.slice(0, 4).map((t, idx) => ({ title: `Panel ${idx + 1}`, summary: t }))
      : [
          { title: 'The Hook', summary: `Core premise of ${videoTitle}` },
          { title: 'The Exploration', summary: 'Deep dive into the problem and methodology' },
          { title: 'The Discovery', summary: 'Crucial breakthrough and surprising insight' },
          { title: 'The Resolution', summary: 'Practical takeaway and actionable future step' },
        ];

    const lines: string[] = [
      `Create a modern, clean 4-panel visual comic strip summarizing the key storyline of this YouTube video.`,
      ``,
      `VIDEO TITLE: "${videoTitle}"${channelName ? `\nCHANNEL: ${channelName}` : ''}`,
      ``,
      `COMIC STRIP SPECIFICATIONS:`,
      `- Format: 4-panel vertical webcomic or 2x2 grid layout`,
      `- Art Style: Modern digital cartoon / graphic novel with clean line-art, vibrant highlights, and moody dark-mode friendly framing`,
      `- Character & Atmosphere: Professional storyteller or expressive avatar navigating the core ideas and conflict`,
      `- Include speech bubbles or narrator caption boxes with punchy, readable dialogue`,
      ``,
      `STORYBOARD PANELS:`,
    ];

    points.forEach((item, idx) => {
      lines.push(`PANEL ${idx + 1}:`);
      lines.push(`  - Scene: Visual representation of "${item.title}"`);
      lines.push(`  - Dialogue / Caption: "${item.summary}"`);
    });

    lines.push(``);
    lines.push(`FINAL PUNCHLINE / OUTCOME:`);
    if (summary?.keyTakeaways && summary.keyTakeaways.length > 0) {
      lines.push(`  "${summary.keyTakeaways[0]}"`);
    } else {
      lines.push(`  Key lesson concluded with a witty insight.`);
    }

    lines.push(``);
    lines.push(`ADDITIONAL INSTRUCTIONS:`);
    lines.push(`- High contrast, expressive emotions, no blurry text`);
    lines.push(`- Make every frame distinct with dynamic camera angles`);

    return lines.join('\n');
  };

  const generateInfographicPrompt = (): string => {
    const videoTitle = metadata?.title || 'YouTube Video';
    const channelName = metadata?.channelName || '';
    const info = summary?.infographic;

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

    if (summary?.keyTakeaways && summary.keyTakeaways.length > 0) {
      lines.push(`SECTION 1 — KEY TAKEAWAYS (use bullet points or checkmark icons):`);
      summary.keyTakeaways.slice(0, 5).forEach((t, i) => {
        lines.push(`  ${i + 1}. ${t}`);
      });
      lines.push('');
    }

    if (info && info.keyStats && info.keyStats.length > 0) {
      lines.push(`SECTION 2 — KEY STATISTICS (display as bold number cards or stat callouts):`);
      info.keyStats.forEach((s) => {
        lines.push(`  • ${s.label}: ${s.value}`);
      });
      lines.push('');
    }

    if (info && info.mainPoints && info.mainPoints.length > 0) {
      lines.push(`SECTION 3 — MAIN POINTS (use numbered steps or a flow diagram style):`);
      info.mainPoints.forEach((p) => {
        lines.push(`  ${p.number}. ${p.title} — ${p.detail}`);
      });
      lines.push('');
    }

    if (info && info.quotes && info.quotes.length > 0) {
      lines.push(`SECTION 4 — NOTABLE QUOTES (display in a stylized quote block with quotation marks):`);
      info.quotes.forEach((q) => {
        lines.push(`  "${q}"`);
      });
      lines.push('');
    }

    if (info && info.conclusion) {
      lines.push(`SECTION 5 — TAKEAWAY / CONCLUSION:`);
      lines.push(`  "${info.conclusion}"`);
      lines.push('');
    } else if (!summary?.keyTakeaways?.length) {
      lines.push(`KEY SECTIONS:`);
      lines.push(`  - High-impact summary points based on "${videoTitle}"`);
      lines.push(`  - Core statistical metrics & timestamps`);
      lines.push(`  - Actionable conclusions`);
      lines.push('');
    }

    return lines.join('\n');
  };

  const getCopyText = (): string => {
    switch (activeTab) {
      case 'transcript':
        return transcript
          .map(
            (entry) =>
              `[${formatTimestamp(entry.offset)}] ${entry.text}`
          )
          .join('\n');
      case 'takeaways':
        return summary?.keyTakeaways
          ? summary.keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')
          : '';
      case 'chapters':
        return summary?.chapterSummaries
          ? summary.chapterSummaries
              .map((c) => `[${c.timestamp}] ${c.title}\n${c.summary}`)
              .join('\n\n')
          : '';
      case 'summary':
        return summary?.fullSummary || '';
      case 'infographic': {
        const info = summary?.infographic;
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
      case 'prompt':
        return promptFormat === 'comic'
          ? generateComicPrompt()
          : generateInfographicPrompt();
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

  const handleExportMarkdown = () => {
    if (!isCurrentTabLoaded && activeTab !== 'transcript' && transcript.length === 0) return;
    const title = metadata?.title || 'YouTube Summary';
    const channel = metadata?.channelName || '';
    const date = new Date().toLocaleDateString();

    let md = `# ${title}\n\n`;
    if (channel) md += `**Channel:** ${channel}\n`;
    md += `**Date:** ${date}\n\n---\n\n`;

    if (summary) {
      if (summary.keyTakeaways && summary.keyTakeaways.length > 0) {
        md += `## 📌 Key Takeaways\n\n`;
        summary.keyTakeaways.forEach((t, i) => {
          md += `${i + 1}. ${t}\n`;
        });
        md += `\n`;
      }

      if (summary.chapterSummaries && summary.chapterSummaries.length > 0) {
        md += `## ⏱️ Chapters\n\n`;
        summary.chapterSummaries.forEach((c) => {
          md += `### [${c.timestamp}] ${c.title}\n${c.summary}\n\n`;
        });
      }

      if (summary.fullSummary) {
        md += `## 📝 Full Summary\n\n${summary.fullSummary}\n\n`;
      }
    }

    if (transcript.length > 0) {
      md += `## 📄 Transcript\n\n`;
      transcript.forEach((e) => {
        md += `\`[${formatTimestamp(e.offset)}]\` ${e.text}\n\n`;
      });
    }

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-summary.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in-up">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 items-center overflow-x-auto p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        {tabs.map((tab) => {
          const loaded = isTabLoaded(tab.id);
          const isRegen = regeneratingSection === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setCopied(false);
                if (onTabChange) {
                  onTabChange(tab.id);
                }
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.08]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <span className="text-base leading-none flex-shrink-0">{tab.emoji}</span>
              <span className="leading-none">{tab.label}</span>
              {tab.badge && (
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase rounded-full shadow-sm flex-shrink-0 leading-none ${
                    tab.id === 'transcript'
                      ? 'bg-emerald-500/80'
                      : 'bg-gradient-to-r from-red-500 to-rose-500 animate-pulse'
                  }`}
                >
                  {tab.badge}
                </span>
              )}

              {/* Active generating spinner / pulsing dot */}
              {isRegen && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
              )}

              {/* Subtle green indicator showing tab is already generated and cached in memory */}
              {!isRegen && tab.id !== 'transcript' && loaded && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                  title="Generated & Cached"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="mt-3 glass">
        {/* Top Control Bar with Tab Name, Export Options, Regenerate/Generate, and Copy */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <span>{tabs.find((t) => t.id === activeTab)?.emoji}</span>
              <span>{tabs.find((t) => t.id === activeTab)?.label}</span>
            </h3>

            {isCurrentSectionRegenerating ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-medium animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>AI Generating...</span>
              </span>
            ) : isCurrentTabLoaded ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
                ✓ Ready
              </span>
            ) : isAITab ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-gray-400">
                ⚡ Auto-generates on view
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Export Markdown */}
            <button
              onClick={handleExportMarkdown}
              disabled={!isCurrentTabLoaded && activeTab !== 'transcript' && transcript.length === 0}
              title="Export to Markdown (.md)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] text-gray-400 hover:text-white"
            >
              <FileDown className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Markdown</span>
            </button>

            {/* Download PDF */}
            <button
              onClick={handleDownloadPDF}
              disabled={!isCurrentTabLoaded && activeTab !== 'transcript' && transcript.length === 0}
              title="Download or Print PDF"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] text-gray-400 hover:text-white"
            >
              <Printer className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">PDF</span>
            </button>

            {/* Generate / Regenerate Tab Button */}
            <button
              onClick={handleRegenerateCurrentTab}
              disabled={isCurrentSectionRegenerating}
              title={
                isCurrentTabLoaded
                  ? `Regenerate ${tabs.find((t) => t.id === activeTab)?.label}`
                  : `Generate ${tabs.find((t) => t.id === activeTab)?.label} with AI`
              }
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed ${
                !isCurrentTabLoaded && activeTab !== 'transcript'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20'
                  : 'bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] text-gray-400 hover:text-white'
              }`}
            >
              {isCurrentSectionRegenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400" />
                  <span className="hidden sm:inline">Generating...</span>
                </>
              ) : isCurrentTabLoaded ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Regenerate</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Generate</span>
                </>
              )}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              disabled={!isCurrentTabLoaded && activeTab !== 'transcript'}
              title="Copy to clipboard"
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
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* ─── Key Takeaways Tab: First Tab by Default ─── */}
          {activeTab === 'takeaways' && (
            <>
              {isCurrentSectionRegenerating ? (
                <FriendlyAILoadingState section="takeaways" />
              ) : hasTakeaways ? (
                <ul className="space-y-3">
                  {summary!.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex gap-3 items-start group">
                      <span className="mt-2 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 group-hover:shadow-lg group-hover:shadow-red-500/50 transition-all" />
                      <span className="text-gray-300 leading-relaxed text-sm">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyTabPlaceholder
                  icon="📌"
                  title="Key Takeaways"
                  description="Extract 5-10 actionable bullet points and core insights from this video in seconds."
                  buttonLabel="Generate Key Takeaways with AI"
                  onGenerate={() => handleTriggerSection('takeaways')}
                  disabled={Boolean(regeneratingSection)}
                />
              )}
            </>
          )}

          {/* ─── Instant Transcript Tab ─── */}
          {activeTab === 'transcript' && (
            <>
              {transcript.length > 0 ? (
                <div>
                  <div className="mb-3 flex items-center justify-between text-xs text-gray-500 pb-2 border-b border-white/[0.04]">
                    <span>{transcript.length} transcript segments loaded</span>
                    <span className="text-emerald-400">● Instant ready</span>
                  </div>
                  <div className="max-h-[520px] overflow-y-auto space-y-0.5 font-mono text-sm pr-2">
                    {transcript.map((entry, i) => (
                      <div key={i} className="flex gap-3 py-1.5 hover:bg-white/[0.02] rounded-lg px-2 -mx-2 transition-colors">
                        <span className="text-red-500/50 flex-shrink-0 select-none text-xs mt-0.5">
                          {formatTimestamp(entry.offset)}
                        </span>
                        <span className="text-gray-300 leading-relaxed">{entry.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 px-4 text-center rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-lg shadow-inner">
                    ⚠️
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    Transcript Unavailable from YouTube
                  </h4>
                  <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                    Captions for this video are either disabled by the creator or restricted by YouTube. Don&apos;t worry — our AI analyzes the video directly!
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('takeaways')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <span>📌 View Key Takeaways</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ─── Chapters Tab ─── */}
          {activeTab === 'chapters' && (
            <>
              {isCurrentSectionRegenerating ? (
                <FriendlyAILoadingState section="chapters" />
              ) : hasChapters ? (
                <div className="space-y-3">
                  {summary!.chapterSummaries.map((chapter, i) => (
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
                  ))}
                </div>
              ) : (
                <EmptyTabPlaceholder
                  icon="⏱️"
                  title="Timestamped Chapters"
                  description="Create structured timestamped sections breaking down every topic covered in the video."
                  buttonLabel="Generate Chapters with AI"
                  onGenerate={() => handleTriggerSection('chapters')}
                  disabled={Boolean(regeneratingSection)}
                />
              )}
            </>
          )}

          {/* ─── Full Summary Tab ─── */}
          {activeTab === 'summary' && (
            <>
              {isCurrentSectionRegenerating ? (
                <FriendlyAILoadingState section="summary" />
              ) : hasSummary ? (
                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-gray-400 prose-strong:text-gray-200 prose-a:text-red-400 prose-li:text-gray-400">
                  <ReactMarkdown>{summary!.fullSummary}</ReactMarkdown>
                </div>
              ) : (
                <EmptyTabPlaceholder
                  icon="📝"
                  title="Full Summary"
                  description="Read a comprehensive, article-style overview with clear headers, analysis, and conclusions."
                  buttonLabel="Generate Full Summary with AI"
                  onGenerate={() => handleTriggerSection('summary')}
                  disabled={Boolean(regeneratingSection)}
                />
              )}
            </>
          )}

          {/* ─── Infographic Tab ─── */}
          {activeTab === 'infographic' && (
            <>
              {isCurrentSectionRegenerating ? (
                <FriendlyAILoadingState section="infographic" />
              ) : hasInfographic ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white">
                      {summary!.infographic!.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {summary!.infographic!.subtitle}
                    </p>
                  </div>

                  {summary!.infographic!.keyStats && summary!.infographic!.keyStats.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-red-400" />
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                          Key Stats
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {summary!.infographic!.keyStats.map((stat, i) => (
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

                  {summary!.infographic!.mainPoints && summary!.infographic!.mainPoints.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Hash className="w-4 h-4 text-red-400" />
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                          Main Points
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {summary!.infographic!.mainPoints.map((point, i) => (
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

                  {summary!.infographic!.quotes && summary!.infographic!.quotes.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Quote className="w-4 h-4 text-red-400" />
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                          Notable Quotes
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {summary!.infographic!.quotes.map((quote, i) => (
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

                  {summary!.infographic!.conclusion && (
                    <div className="p-4 bg-gradient-to-r from-red-500/5 to-rose-500/5 border border-red-500/10 rounded-xl text-center">
                      <p className="text-sm font-medium text-red-300/80">
                        {summary!.infographic!.conclusion}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <EmptyTabPlaceholder
                  icon="📊"
                  title="Visual Infographic"
                  description="Transform the video into visual stat cards, highlight metrics, standout quotes, and structured key points."
                  buttonLabel="Generate Infographic with AI"
                  onGenerate={() => handleTriggerSection('infographic')}
                  disabled={Boolean(regeneratingSection)}
                />
              )}
            </>
          )}

          {/* ─── Prompt Tab ─── */}
          {activeTab === 'prompt' && (
            <>
              {isCurrentSectionRegenerating ? (
                <FriendlyAILoadingState section="prompt" />
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium">Prompt Style:</span>
                      <div className="flex gap-1 bg-white/[0.04] p-0.5 rounded-lg border border-white/[0.06]">
                        <button
                          onClick={() => setPromptFormat('infographic')}
                          className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                            promptFormat === 'infographic'
                              ? 'bg-red-500/20 text-white border border-red-500/30'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          📊 Infographic
                        </button>
                        <button
                          onClick={() => setPromptFormat('comic')}
                          className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                            promptFormat === 'comic'
                              ? 'bg-purple-500/20 text-white border border-purple-500/30'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          🎨 Comic Strip
                        </button>
                      </div>
                    </div>

                    <a
                      href="https://duck.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 transition-all"
                    >
                      <span>🦆 Open Duck.ai</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-500/5 to-red-500/5 border border-purple-500/10 rounded-xl">
                    <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {promptFormat === 'comic' ? 'Comic Strip Prompt' : 'ChatGPT Infographic Prompt'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Copy this ready-to-paste prompt into ChatGPT, Midjourney, DALL·E or Duck.ai to render visual stories from this video.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="max-h-[400px] overflow-y-auto rounded-xl bg-black border border-white/[0.06] p-5">
                      <pre className="text-sm text-gray-400 whitespace-pre-wrap font-mono leading-relaxed">
                        {promptFormat === 'comic' ? generateComicPrompt() : generateInfographicPrompt()}
                      </pre>
                    </div>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-500/10 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy {promptFormat === 'comic' ? 'Comic' : 'Infographic'} Prompt
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
