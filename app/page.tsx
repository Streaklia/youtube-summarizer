'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { URLInput } from '@/components/URLInput';
import { VideoInfo } from '@/components/VideoInfo';
import { SummaryTabs } from '@/components/SummaryTabs';
import { ChatWithVideo } from '@/components/ChatWithVideo';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SettingsModal } from '@/components/SettingsModal';
import {
  VideoMetadata,
  SummaryResult,
  TranscriptEntry,
  ChatMessage,
  AISettings,
} from '@/lib/types';

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
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [formattedTranscript, setFormattedTranscript] = useState('');
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleSettingsSave = (newSettings: AISettings) => {
    setSettings(newSettings);
    localStorage.setItem('yt-summarizer-settings', JSON.stringify(newSettings));
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

  const handleSubmit = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setMetadata(null);
    setTranscript([]);
    setFormattedTranscript('');
    setSummary(null);
    setChatMessages([]);

    try {
      // Step 1: Fetch transcript and metadata
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

      // Step 2: Generate AI summary
      setSummarizing(true);
      const summaryRes = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: transcriptData.formattedTranscript,
          ...getProviderPayload(),
        }),
      });

      const summaryData = await summaryRes.json();

      if (!summaryRes.ok) {
        throw new Error(summaryData.error || 'Failed to generate summary');
      }

      setSummary(summaryData);
    } catch (err: any) {
      setError(err.message);
    } finally {
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
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <Header
        onOpenSettings={() => setSettingsOpen(true)}
        activeProvider={settings.provider}
        activeModel={settings.openrouterModel}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSave={handleSettingsSave}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <URLInput
          url={url}
          onUrlChange={setUrl}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {/* Error display */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-xl text-red-300 text-sm">
            <p className="font-medium">Something went wrong</p>
            <p className="mt-1 text-red-400">{error}</p>
          </div>
        )}

        {/* Loading: fetching transcript */}
        {loading && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <LoadingSpinner />
            <p className="text-gray-400 text-sm">Fetching transcript...</p>
          </div>
        )}

        {/* Video metadata */}
        {metadata && !loading && <VideoInfo metadata={metadata} />}

        {/* Summary tabs (shown during loading with skeletons, and after completion) */}
        {(summarizing || summary) && (
          <SummaryTabs
            summary={summary}
            transcript={transcript}
            metadata={metadata}
            loading={summarizing}
          />
        )}

        {/* Show transcript tab even before summarization if transcript is available */}
        {!summarizing && !summary && transcript.length > 0 && !loading && (
          <SummaryTabs
            summary={null}
            transcript={transcript}
            metadata={metadata}
            loading={false}
          />
        )}

        {/* Chat with video */}
        {formattedTranscript && !loading && (
          <ChatWithVideo
            messages={chatMessages}
            onSendMessage={handleChat}
            loading={chatLoading}
          />
        )}

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center text-xs text-gray-600">
          Powered by{' '}
          {settings.provider === 'openrouter' ? 'OpenRouter' : 'Google Gemini AI'}{' '}
          · Built with Next.js &amp; Tailwind CSS
        </footer>
      </div>
    </main>
  );
}
