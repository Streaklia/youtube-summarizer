'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { URLInput } from '@/components/URLInput';
import { VideoInfo } from '@/components/VideoInfo';
import { SummaryTabs } from '@/components/SummaryTabs';
import { ChatWithVideo } from '@/components/ChatWithVideo';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SettingsModal } from '@/components/SettingsModal';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  VideoMetadata,
  SummaryResult,
  TranscriptEntry,
  ChatMessage,
  AISettings,
} from '@/lib/types';
import { extractVideoId } from '@/lib/youtube';

interface SummaryClientViewProps {
  videoId: string;
  initialMetadata: VideoMetadata;
  initialTranscript: TranscriptEntry[];
  initialFormattedTranscript: string;
  initialTranscriptWarning: string | null;
  initialSummary: SummaryResult | null;
  initialError: string | null;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'gemini',
  openrouterApiKey: '',
  openrouterModel: '',
};

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
  const [url, setUrl] = useState(`https://www.youtube.com/watch?v=${videoId}`);
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [warning, setWarning] = useState<string | null>(initialTranscriptWarning);
  const [metadata, setMetadata] = useState<VideoMetadata>(initialMetadata);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>(initialTranscript);
  const [formattedTranscript, setFormattedTranscript] = useState<string>(
    initialFormattedTranscript
  );
  const [summary, setSummary] = useState<SummaryResult | null>(initialSummary);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);
  const [activeSection, setActiveSection] = useState('summary');
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);

  const summaryRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  // If initialSummary is missing (e.g. server had no API key or failed), trigger client-side summarization
  useEffect(() => {
    if (!initialSummary && !error) {
      triggerSummarize();
    }
  }, []);

  const handleSettingsSave = (newSettings: AISettings) => {
    setSettings(newSettings);
    localStorage.setItem('yt-summarizer-settings', JSON.stringify(newSettings));
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'summary' && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'chat' && chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  const triggerSummarize = async () => {
    setSummarizing(true);
    setError(null);
    try {
      const summaryRes = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: formattedTranscript,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          title: metadata.title,
          ...getProviderPayload(),
        }),
      });

      const summaryData = await summaryRes.json();
      if (!summaryRes.ok) {
        throw new Error(summaryData.error || 'Failed to generate summary');
      }

      setSummary(summaryData);
      setActiveSection('summary');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSummarizing(false);
    }
  };

  // When user enters a new URL in the input bar on this page, navigate to its clean programmatic route
  const handleUrlSubmit = () => {
    if (!url.trim()) return;
    const nextVideoId = extractVideoId(url);
    if (nextVideoId) {
      if (nextVideoId === videoId) {
        // Same video: just re-summarize
        triggerSummarize();
      } else {
        router.push(`/summary/${nextVideoId}`);
      }
    } else {
      setError('Invalid YouTube URL. Please enter a valid YouTube video link.');
    }
  };

  const handleRegenerateSection = async (section: string) => {
    if (!summary && section !== 'transcript') return;

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
      const res = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          transcript: formattedTranscript,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          title: metadata?.title || '',
          ...getProviderPayload(),
        }),
      });

      const updatedPart = await res.json();
      if (!res.ok) {
        throw new Error(updatedPart.error || `Failed to regenerate ${section}`);
      }

      setSummary((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          ...updatedPart,
        };
      });
    } catch (err: any) {
      console.error('Regenerate section error:', err);
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

  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="gradient-blob w-[600px] h-[600px] bg-red-600 -top-48 -right-48" />
      <div
        className="gradient-blob w-[500px] h-[500px] bg-rose-700 top-[60%] -left-64"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="gradient-blob w-[400px] h-[400px] bg-orange-600 top-[30%] right-[20%]"
        style={{ animationDelay: '-15s' }}
      />

      <div className="relative z-10">
        <Header
          onOpenSettings={() => setSettingsOpen(true)}
          activeProvider={settings.provider}
          activeModel={settings.openrouterModel}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          hasResults={true}
        />

        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={settings}
          onSave={handleSettingsSave}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Back to Home Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to search</span>
            </Link>
          </div>

          {/* Quick Input Bar to summarize another video */}
          <URLInput
            url={url}
            onUrlChange={setUrl}
            onSubmit={handleUrlSubmit}
            loading={loading || summarizing}
          />

          {/* Error display */}
          {error && (
            <div className="mt-8 p-4 glass border-red-500/20 animate-fade-in-up">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-red-500/10">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-red-300 text-sm">Notice</p>
                  <p className="mt-1 text-red-400/80 text-xs">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Warning Banner */}
          {warning && (
            <div className="mt-6 p-4 glass border-amber-500/10 animate-fade-in-up">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-amber-500/10">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-amber-300 text-sm">
                    Direct Video Analysis
                  </p>
                  <p className="mt-0.5 text-xs text-amber-300/60">{warning}</p>
                </div>
              </div>
            </div>
          )}

          {/* Video metadata */}
          {metadata && (
            <div className="mt-8">
              <VideoInfo metadata={metadata} />
            </div>
          )}

          {/* Loading: generating summary */}
          {summarizing && (
            <div className="mt-8">
              <LoadingSpinner
                label={
                  settings.provider === 'openrouter'
                    ? `Generating summary with ${settings.openrouterModel.split('/').pop()}...`
                    : 'Generating AI summary with Gemini...'
                }
              />
            </div>
          )}

          {/* Summary tabs */}
          <div ref={summaryRef}>
            {(summarizing || summary) && (
              <div className="mt-8">
                <SummaryTabs
                  summary={summary}
                  transcript={transcript}
                  metadata={metadata}
                  loading={summarizing}
                  onRegenerateSection={handleRegenerateSection}
                  regeneratingSection={regeneratingSection}
                />
              </div>
            )}

            {!summarizing && !summary && transcript.length > 0 && (
              <div className="mt-8">
                <SummaryTabs
                  summary={null}
                  transcript={transcript}
                  metadata={metadata}
                  loading={false}
                  onRegenerateSection={handleRegenerateSection}
                  regeneratingSection={regeneratingSection}
                />
              </div>
            )}
          </div>

          {/* Chat with video */}
          <div ref={chatRef}>
            {(summary || formattedTranscript) && !summarizing && (
              <div className="mt-8">
                <ChatWithVideo
                  messages={chatMessages}
                  onSendMessage={handleChat}
                  loading={chatLoading}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-20 pb-8 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-700">
              <span>Powered by</span>
              <span className="text-gray-500">
                {settings.provider === 'openrouter' ? 'OpenRouter' : 'Google Gemini AI'}
              </span>
              <span className="text-gray-800">·</span>
              <span>Built with Next.js & Tailwind CSS</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
