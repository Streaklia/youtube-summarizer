'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SettingsModal } from '@/components/SettingsModal';
import { VideoPlayerColumn } from '@/components/VideoPlayerColumn';
import { SummaryTabs } from '@/components/SummaryTabs';
import { ChatRightColumn } from '@/components/ChatRightColumn';
import { SummaryJsonLd } from '@/components/SummaryJsonLd';
import {
  extractLangFromPath,
  getSavedLanguage,
  localizedUrl,
  persistLanguage,
  resolveTabFromToolOrPath,
} from '@/lib/localizedUrl';
import { isSupportedLanguage, SupportedLanguage } from '@/lib/i18n';
import {
  VideoMetadata,
  SummaryResult,
  TranscriptEntry,
  ChatMessage,
  AISettings,
} from '@/lib/types';
import { extractVideoId } from '@/lib/youtube';
import { PlusCircle, Search, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';

interface SummaryClientViewProps {
  videoId: string;
  /** All initial* props are optional — when omitted, data is fetched client-side on mount */
  initialMetadata?: VideoMetadata;
  initialTranscript?: TranscriptEntry[];
  initialFormattedTranscript?: string;
  initialTranscriptWarning?: string | null;
  initialSummary?: SummaryResult | null;
  initialError?: string | null;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'gemini',
  openrouterApiKey: '',
  openrouterModel: '',
};

const VALID_TABS = ['takeaways', 'transcript', 'chapters', 'summary', 'infographic', 'prompt'];

/**
 * Placeholder metadata used during the initial client-side fetch.
 * The YouTube iframe only needs videoId to work, so the video starts loading instantly.
 */
function placeholderMetadata(videoId: string): VideoMetadata {
  return {
    title: 'Loading video details…',
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    channelName: '',
    duration: '',
    videoId,
  };
}

function loadSettings(): AISettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem('yt-summarizer-settings');
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function SummaryClientView({
  videoId,
  initialMetadata,
  initialTranscript,
  initialFormattedTranscript,
  initialTranscriptWarning,
  initialSummary,
  initialError,
}: SummaryClientViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlLang = searchParams?.get('lang');
  const activeLang: SupportedLanguage =
    (urlLang && isSupportedLanguage(urlLang) ? (urlLang as SupportedLanguage) : null) ||
    extractLangFromPath(pathname) ||
    (typeof window !== 'undefined' ? getSavedLanguage() : 'en');

  // Resolve requested tab from query parameters (?tab=infographic or ?tool=youtube-infographic)
  const requestedTab = (() => {
    const tabParam = searchParams?.get('tab');
    if (tabParam && VALID_TABS.includes(tabParam.toLowerCase())) {
      return tabParam.toLowerCase();
    }
    const toolParam = searchParams?.get('tool');
    if (toolParam) {
      const fromTool = resolveTabFromToolOrPath(toolParam);
      if (fromTool && VALID_TABS.includes(fromTool)) {
        return fromTool;
      }
    }
    return null;
  })();

  // Track active tab state for deep linking - Key Takeaways is the default first tab
  const [activeTab, setActiveTab] = useState<string>(
    requestedTab || 'takeaways'
  );

  // Sync activeTab if query params change
  useEffect(() => {
    if (requestedTab) {
      setActiveTab(requestedTab);
    }
  }, [requestedTab]);

  // Hash check on client mount (e.g. /summary/xyz#infographic)
  useEffect(() => {
    if (typeof window !== 'undefined' && !requestedTab && window.location.hash) {
      const hashTab = resolveTabFromToolOrPath(window.location.hash);
      if (hashTab && VALID_TABS.includes(hashTab)) {
        setActiveTab(hashTab);
      }
    }
  }, [requestedTab]);

  // Determine whether server provided initial data or we need to fetch client-side
  const hasInitialData = Boolean(initialMetadata);

  // Dialog / Input state for '+ Load a different video'
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [loadUrl, setLoadUrl] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);

  // Loading state for initial client-side data fetch
  const [isLoadingData, setIsLoadingData] = useState(!hasInitialData);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isGeneratingTakeaways, setIsGeneratingTakeaways] = useState<boolean>(
    !hasInitialData && !initialSummary?.keyTakeaways?.length
  );

  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [warning, setWarning] = useState<string | null>(initialTranscriptWarning ?? null);
  const [metadata, setMetadata] = useState<VideoMetadata>(
    initialMetadata || placeholderMetadata(videoId)
  );
  const [transcript, setTranscript] = useState<TranscriptEntry[]>(initialTranscript || []);
  const [formattedTranscript, setFormattedTranscript] = useState<string>(
    initialFormattedTranscript || ''
  );
  const [summary, setSummary] = useState<SummaryResult | null>(initialSummary ?? null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);

  // Immediate fast metadata fetch (< 200ms) to populate title, channel, duration, views & category
  useEffect(() => {
    if (hasInitialData) return;
    let cancelled = false;

    fetch(`/api/metadata?videoId=${videoId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.metadata) {
          setMetadata((prev) => ({
            ...prev,
            ...data.metadata,
          }));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [videoId, hasInitialData]);

  // Track auto-triggered generations so we never fire multiple times in a loop
  const autoTriggeredRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    setSettings(loadSettings());
    if (urlLang && isSupportedLanguage(urlLang)) {
      persistLanguage(urlLang);
    }
  }, [urlLang]);

  // Hydrate cached sections from sessionStorage on mount / videoId change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const cached = sessionStorage.getItem(`yt-summary-${videoId}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        setSummary((prev) => ({
          keyTakeaways: parsed.keyTakeaways || prev?.keyTakeaways || [],
          chapterSummaries: parsed.chapterSummaries || prev?.chapterSummaries || [],
          fullSummary: parsed.fullSummary || prev?.fullSummary || '',
          infographic: parsed.infographic || prev?.infographic || null,
        }));
      }
    } catch {}
  }, [videoId]);

  const isAITab = (tab: string | null) =>
    tab === 'infographic' || tab === 'summary' || tab === 'takeaways' || tab === 'chapters';

  /**
   * Automatically triggers AI generation for landed tool intent (e.g. ?tab=infographic or ?tab=summary)
   * if the section is not already present in state or sessionStorage cache.
   */
  const triggerAutoGeneration = async (
    targetTabToGen: string,
    transcriptText: string,
    videoTitle: string
  ) => {
    if (!isAITab(targetTabToGen)) return;

    const triggerKey = `${videoId}-${targetTabToGen}`;
    if (autoTriggeredRef.current[triggerKey]) return;
    autoTriggeredRef.current[triggerKey] = true;

    // Check if section is already cached in sessionStorage
    if (typeof window !== 'undefined') {
      try {
        const cached = sessionStorage.getItem(`yt-summary-${videoId}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (targetTabToGen === 'infographic' && parsed.infographic) return;
          if (targetTabToGen === 'summary' && parsed.fullSummary) return;
          if (targetTabToGen === 'takeaways' && parsed.keyTakeaways?.length) return;
          if (targetTabToGen === 'chapters' && parsed.chapterSummaries?.length) return;
        }
      } catch {}
    }

    // Auto-generate immediately
    await handleGenerateSection(targetTabToGen, transcriptText, videoTitle);
  };

  /**
   * Client-side data fetch — runs on mount when no initial data was provided
   * by the server (i.e. instant navigation via router.push).
   * The YouTube iframe embed loads immediately in parallel since it only needs videoId.
   */
  useEffect(() => {
    if (hasInitialData) return; // Server already provided data

    let cancelled = false;

    async function fetchVideoData() {
      try {
        setIsGeneratingTakeaways(true);
        const res = await fetch('/api/transcript', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId }),
        });

        if (cancelled) return;

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Failed to fetch video data');
          setIsLoadingData(false);
          setIsGeneratingTakeaways(false);
          return;
        }

        if (data.metadata) {
          setMetadata((prev) => ({
            ...prev,
            ...data.metadata,
          }));
        }
        setTranscript(data.transcript || []);
        setFormattedTranscript(data.formattedTranscript || '');
        if (data.transcriptWarning) {
          setWarning(data.transcriptWarning);
        }
        setIsLoadingData(false);

        // Phase 2: Asynchronously generate Key Takeaways in the background without blocking player
        const tabToTrigger =
          requestedTab ||
          (typeof window !== 'undefined' ? resolveTabFromToolOrPath(window.location.hash) : null) ||
          'takeaways';

        if (isAITab(tabToTrigger)) {
          triggerAutoGeneration(
            tabToTrigger,
            data.formattedTranscript || '',
            data.metadata?.title || metadata.title
          ).finally(() => {
            if (!cancelled) setIsGeneratingTakeaways(false);
          });
        } else {
          setIsGeneratingTakeaways(false);
        }
      } catch (err: any) {
        if (cancelled) return;
        setError(err.message || 'Failed to fetch video data');
        setIsLoadingData(false);
        setIsGeneratingTakeaways(false);
      }
    }

    fetchVideoData();
    return () => {
      cancelled = true;
    };
  }, [videoId, hasInitialData]);

  // When initial data was provided by server, auto-trigger Key Takeaways immediately
  useEffect(() => {
    if (hasInitialData) {
      const tabToTrigger =
        requestedTab ||
        (typeof window !== 'undefined' ? resolveTabFromToolOrPath(window.location.hash) : null) ||
        'takeaways';
      if (isAITab(tabToTrigger)) {
        triggerAutoGeneration(tabToTrigger, formattedTranscript, metadata?.title);
      }
    }
  }, [hasInitialData, requestedTab]);

  const handleSettingsSave = (newSettings: AISettings) => {
    setSettings(newSettings);
    localStorage.setItem('yt-summarizer-settings', JSON.stringify(newSettings));
  };

  const getProviderPayload = () => {
    if (settings.provider === 'openrouter') {
      return {
        provider: 'openrouter' as const,
        openrouterApiKey: settings.openrouterApiKey,
        openrouterModel: settings.openrouterModel,
      };
    }
    return { provider: 'gemini' as const };
  };

  const handleLoadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loadUrl.trim()) return;
    const nextVideoId = extractVideoId(loadUrl);
    if (!nextVideoId) {
      setLoadError('Please enter a valid YouTube URL');
      return;
    }
    setShowLoadModal(false);
    setLoadUrl('');
    const targetUrl =
      activeLang && activeLang !== 'en'
        ? `/summary/${nextVideoId}?lang=${activeLang}`
        : `/summary/${nextVideoId}`;
    router.push(targetUrl);
  };

  /**
   * Deep-linking handler when user changes tabs: updates the browser URL
   * with ?tab=... using replaceState so it can be bookmarked or shared without reloading.
   */
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', newTab);
      window.history.replaceState(null, '', url.toString());
    }
    // Auto-trigger generation if user clicks an AI tab that has not been generated yet
    if (isAITab(newTab)) {
      triggerAutoGeneration(newTab, formattedTranscript, metadata?.title);
    }
  };

  /**
   * On-demand generation and regeneration for any tab section.
   * Generates only the requested tab to conserve tokens and reduce latency.
   * Results are persisted in state and cached in sessionStorage.
   */
  const handleGenerateSection = async (
    section: string,
    overrideTranscript?: string,
    overrideTitle?: string
  ) => {
    if (regeneratingSection) return;

    if (section === 'transcript') {
      setRegeneratingSection('transcript');
      try {
        const transcriptRes = await fetch('/api/transcript', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: `https://www.youtube.com/watch?v=${videoId}` }),
        });
        const transcriptData = await transcriptRes.json();
        if (transcriptRes.ok) {
          setTranscript(transcriptData.transcript || []);
          setFormattedTranscript(transcriptData.formattedTranscript || '');
        }
      } catch (err: any) {
        console.error('Transcript re-fetch failed:', err);
      } finally {
        setRegeneratingSection(null);
      }
      return;
    }

    setRegeneratingSection(section);
    try {
      const transcriptToUse =
        overrideTranscript !== undefined ? overrideTranscript : formattedTranscript;
      const titleToUse =
        overrideTitle !== undefined ? overrideTitle : (metadata?.title || '');

      const res = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          transcript: transcriptToUse,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          title: titleToUse,
          ...getProviderPayload(),
        }),
      });

      const updatedPart = await res.json();
      if (!res.ok) {
        throw new Error(updatedPart.error || `Failed to generate ${section}`);
      }

      setSummary((prev) => {
        const updated: SummaryResult = {
          keyTakeaways: prev?.keyTakeaways || [],
          chapterSummaries: prev?.chapterSummaries || [],
          fullSummary: prev?.fullSummary || '',
          infographic: prev?.infographic || null,
          ...updatedPart,
        };

        // Cache in sessionStorage so switching tabs never triggers unnecessary re-fetch
        try {
          sessionStorage.setItem(`yt-summary-${videoId}`, JSON.stringify(updated));
        } catch {}

        return updated;
      });
    } catch (err: any) {
      console.error(`Generate section '${section}' error:`, err);
    } finally {
      setRegeneratingSection(null);
    }
  };

  const handleChat = async (message: string) => {
    const newMessages: ChatMessage[] = [
      ...chatMessages,
      { role: 'user', content: message },
    ];
    setChatMessages(newMessages);
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: formattedTranscript,
          messages: newMessages,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          ...getProviderPayload(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setChatMessages([
        ...newMessages,
        { role: 'assistant', content: data.response },
      ]);
    } catch (err: any) {
      setChatMessages([
        ...newMessages,
        { role: 'assistant', content: `Error: ${err.message}` },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mytranscript.pro';
  const canonicalUrl = `${baseUrl}/summary/${videoId}`;

  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden flex flex-col">
      {/* Background ambient lighting */}
      <div className="gradient-blob w-[600px] h-[600px] bg-red-600 -top-48 -right-48" />
      <div
        className="gradient-blob w-[500px] h-[500px] bg-rose-700 top-[60%] -left-64"
        style={{ animationDelay: '-8s' }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={settings}
          onSave={handleSettingsSave}
        />

        {/* Render JSON-LD structured data once metadata is loaded */}
        {!isLoadingData && (
          <SummaryJsonLd
            videoId={videoId}
            metadata={metadata}
            summary={summary}
            canonicalUrl={canonicalUrl}
          />
        )}

        {/* Clean Top Action Bar with '+ Load a different video' and Breadcrumb */}
        <div className="border-b border-white/[0.04] bg-white/[0.01]">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <Link
                href={localizedUrl('/', activeLang)}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <span className="text-gray-600">/</span>
              {isLoadingData ? (
                <span className="h-4 w-48 bg-white/[0.06] rounded animate-pulse" />
              ) : (
                <span className="text-gray-300 font-medium truncate max-w-[280px] sm:max-w-md">
                  {metadata.title}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLoadModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.1] text-xs font-medium text-gray-200 hover:text-white transition-all shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Load a different video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal for '+ Load a different video' */}
        {showLoadModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowLoadModal(false)}
            />
            <div className="relative w-full max-w-lg glass p-5 rounded-2xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <h3 className="text-sm font-semibold text-white">Load YouTube Video</h3>
                </div>
                <button
                  onClick={() => setShowLoadModal(false)}
                  className="text-gray-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleLoadSubmit} className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="url"
                    value={loadUrl}
                    onChange={(e) => setLoadUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    autoFocus
                    className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 text-xs sm:text-sm"
                  />
                </div>
                {loadError && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{loadError}</span>
                  </p>
                )}
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowLoadModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-semibold shadow-sm"
                  >
                    Summarize
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Global error */}
        {error && !isLoadingData && (
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 pt-3 w-full">
            <div className="p-2.5 glass border-red-500/10 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Global Warning / Notice */}
        {warning && (
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 pt-3 w-full">
            <div className="p-2.5 glass border-amber-500/10 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{warning}</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODERN 3-COLUMN SPLIT LAYOUT (Desktop) / STACKED (Tablet & Mobile)
           ========================================================================= */}
        <div className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* -------------------------------------------------------------
                LEFT COLUMN (3.5 cols on desktop): Video Player & Rich Metadata
               ------------------------------------------------------------- */}
            <div className="lg:col-span-4 xl:col-span-3.5 space-y-4">
              <VideoPlayerColumn
                videoId={videoId}
                metadata={metadata}
                onTimeUpdate={(t) => setCurrentTime(t)}
              />
            </div>

            {/* -------------------------------------------------------------
                MIDDLE COLUMN (5.5 cols on desktop): Interactive Tabs & Content
               ------------------------------------------------------------- */}
            <div className="lg:col-span-5 xl:col-span-5.5 min-w-0">
              <SummaryTabs
                summary={summary}
                transcript={transcript}
                metadata={metadata}
                loading={Boolean(regeneratingSection) || isGeneratingTakeaways}
                onRegenerateSection={handleGenerateSection}
                onGenerateSection={handleGenerateSection}
                regeneratingSection={regeneratingSection}
                initialTab={activeTab}
                onTabChange={handleTabChange}
                currentTime={currentTime}
                onSeek={(seconds) => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent('yt-seek-to', { detail: { seconds } })
                    );
                  }
                }}
              />
            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN (3 cols on desktop): AI Chat & Quick Actions
               ------------------------------------------------------------- */}
            <div className="lg:col-span-3 xl:col-span-3">
              <ChatRightColumn
                messages={chatMessages}
                onSendMessage={handleChat}
                loading={chatLoading}
                onQuickAction={(prompt) => handleChat(prompt)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
