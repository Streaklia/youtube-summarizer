'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { URLInput } from '@/components/URLInput';
import { VideoInfo } from '@/components/VideoInfo';
import { SummaryTabs } from '@/components/SummaryTabs';
import { ChatWithVideo } from '@/components/ChatWithVideo';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SettingsModal } from '@/components/SettingsModal';
import { Footer } from '@/components/Footer';
import { AlertCircle } from 'lucide-react';
import {
  VideoMetadata,
  SummaryResult,
  TranscriptEntry,
  ChatMessage,
  AISettings,
} from '@/lib/types';
import { extractVideoId } from '@/lib/youtube';
import { LanguageConfig } from '@/lib/i18n';

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

interface LocalizedHomeClientProps {
  langConfig: LanguageConfig;
}

export function LocalizedHomeClient({ langConfig }: LocalizedHomeClientProps) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [formattedTranscript, setFormattedTranscript] = useState('');
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);
  const [activeSection, setActiveSection] = useState('summarizer');

  const summaryRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleSettingsSave = (newSettings: AISettings) => {
    setSettings(newSettings);
    localStorage.setItem('yt-summarizer-settings', JSON.stringify(newSettings));
  };

  const getProviderPayload = () => {
    if (settings.provider === 'openrouter') {
      return {
        provider: 'openrouter',
        openrouterApiKey: settings.openrouterApiKey,
        openrouterModel: settings.openrouterModel,
      };
    }
    return { provider: 'gemini' };
  };

  const handleSubmit = async () => {
    if (!url.trim()) return;

    const detectedId = extractVideoId(url);
    if (detectedId) {
      router.push(`/summary/${detectedId}`);
      return;
    }

    setLoading(true);
    setError(null);
    setMetadata(null);
    setTranscript([]);
    setFormattedTranscript('');
    setSummary(null);
    setChatMessages([]);

    try {
      const transcriptRes = await fetch('/api/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const transcriptData = await transcriptRes.json();
      if (!transcriptRes.ok) {
        throw new Error(transcriptData.error || 'Failed to fetch transcript');
      }

      setMetadata(transcriptData.metadata);
      setTranscript(transcriptData.transcript);
      setFormattedTranscript(transcriptData.formattedTranscript);
      setLoading(false);
      setSummarizing(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      setSummarizing(false);
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

  const handleRegenerateSection = async (section: string) => {
    if (!formattedTranscript) return;
    setRegeneratingSection(section);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: formattedTranscript,
          section,
          ...getProviderPayload(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate section');
      setSummary((prev) => ({
        keyTakeaways: data.keyTakeaways || prev?.keyTakeaways || [],
        chapterSummaries: data.chapterSummaries || prev?.chapterSummaries || [],
        fullSummary: data.fullSummary || prev?.fullSummary || '',
        infographic: data.infographic || prev?.infographic,
      }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRegeneratingSection(null);
    }
  };

  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden" dir={langConfig.dir || 'ltr'}>
      {/* Ambient gradient blobs */}
      <div className="gradient-blob w-[600px] h-[600px] bg-red-600 -top-48 -right-48" />
      <div className="gradient-blob w-[500px] h-[500px] bg-rose-700 top-[60%] -left-64" style={{ animationDelay: '-8s' }} />

      <div className="relative z-10">
        <Header
          onOpenSettings={() => setSettingsOpen(true)}
          activeProvider={settings.provider}
          activeModel={settings.openrouterModel}
          activeSection={activeSection}
          onNavigate={(sec) => setActiveSection(sec)}
          hasResults={Boolean(summary || transcript.length > 0)}
        />

        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={settings}
          onSave={handleSettingsSave}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Localized Hero Banner */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-3">
              <span>{langConfig.flag}</span>
              <span>{langConfig.name}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {langConfig.heroHeadline}{' '}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                {langConfig.heroGradient}
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {langConfig.heroSubtitle}
            </p>
          </div>

          <URLInput
            url={url}
            onUrlChange={setUrl}
            onSubmit={handleSubmit}
            loading={loading}
          />

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

          {loading && (
            <div className="mt-12 flex flex-col items-center gap-4 animate-fade-in-up">
              <LoadingSpinner />
              <p className="text-gray-400 text-sm">Fetching raw transcript in 1-2 seconds...</p>
            </div>
          )}

          {metadata && !loading && (
            <div className="mt-8 animate-fade-in-up">
              <VideoInfo metadata={metadata} />
            </div>
          )}

          <div ref={summaryRef}>
            {(summary || transcript.length > 0) && (
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
          </div>

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

        <Footer currentLang={langConfig.code} />
      </div>
    </main>
  );
}
