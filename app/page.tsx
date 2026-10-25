'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { URLInput } from '@/components/URLInput';
import { VideoInfo } from '@/components/VideoInfo';
import { SummaryTabs } from '@/components/SummaryTabs';
import { ChatWithVideo } from '@/components/ChatWithVideo';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SettingsModal } from '@/components/SettingsModal';
import { AlertCircle } from 'lucide-react';
import {
  VideoMetadata,
  SummaryResult,
  TranscriptEntry,
  ChatMessage,
  AISettings,
} from '@/lib/types';
import { extractVideoId } from '@/lib/youtube';


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

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [formattedTranscript, setFormattedTranscript] = useState('');
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);
  const [activeSection, setActiveSection] = useState('home');
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);

  // Section refs for scroll-to
  const summaryRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    setSettings(loadSettings());
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

  /** Build the provider fields to include in API request bodies */
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

  const hasResults = !!(metadata || summary || transcript.length > 0);

  const handleSubmit = async () => {
    if (!url.trim()) return;

    const videoId = extractVideoId(url);
    if (videoId) {
      setLoading(true);
      setError(null);
      router.push(`/summary/${videoId}`);
      return;
    }

    setError('Invalid YouTube URL. Please provide a valid youtube.com or youtu.be link.');
  };

  const handleRegenerateSection = async (section: string) => {
    if (!summary && section !== 'transcript') return;

    // If user clicked regenerate on transcript, refetch transcript
    if (section === 'transcript') {
      if (!url.trim()) return;
      setRegeneratingSection('transcript');
      try {
        const transcriptRes = await fetch('/api/transcript', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
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
          videoUrl: url,
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
          videoUrl: url,
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
      <div className="gradient-blob w-[500px] h-[500px] bg-rose-700 top-[60%] -left-64" style={{ animationDelay: '-8s' }} />
      <div className="gradient-blob w-[400px] h-[400px] bg-orange-600 top-[30%] right-[20%]" style={{ animationDelay: '-15s' }} />

      {/* Content */}
      <div className="relative z-10">
        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={settings}
          onSave={handleSettingsSave}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* URL Input / Hero */}
          <URLInput
            url={url}
            onUrlChange={setUrl}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {/* Error display */}
          {error && (
            <div className="mt-8 p-4 glass border-red-500/20 animate-fade-in-up">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-red-500/10">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-red-300 text-sm">Something went wrong</p>
                  <p className="mt-1 text-red-400/80 text-xs">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Informative Warning Banner */}
          {warning && (
            <div className="mt-6 p-4 glass border-amber-500/10 animate-fade-in-up">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-amber-500/10">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-amber-300 text-sm">Direct Video Analysis</p>
                  <p className="mt-0.5 text-xs text-amber-300/60">{warning}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading: fetching video info */}
          {loading && (
            <div className="mt-12">
              <LoadingSpinner label="Processing video details..." />
            </div>
          )}

          {/* Video metadata */}
          {metadata && !loading && (
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

            {/* Show transcript tab even before summarization if transcript is available */}
            {!summarizing && !summary && transcript.length > 0 && !loading && (
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
            {(summary || formattedTranscript) && !loading && !summarizing && (
              <div className="mt-8">
                <ChatWithVideo
                  messages={chatMessages}
                  onSendMessage={handleChat}
                  loading={chatLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
