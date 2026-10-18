# app\api\chat\route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { chatWithTranscript } from '@/lib/gemini';
import { chatWithTranscriptOpenRouter } from '@/lib/openrouter';

export async function POST(req: NextRequest) {
  try {
    const {
      transcript,
      messages,
      provider,
      openrouterApiKey,
      openrouterModel,
    } = await req.json();

    if (!transcript || !messages) {
      return NextResponse.json(
        { error: 'Transcript and messages are required' },
        { status: 400 }
      );
    }

    if (provider === 'openrouter') {
      if (!openrouterApiKey || !openrouterModel) {
        return NextResponse.json(
          { error: 'OpenRouter API key and model are required' },
          { status: 400 }
        );
      }
      const response = await chatWithTranscriptOpenRouter(
        transcript,
        messages,
        openrouterApiKey,
        openrouterModel
      );
      return NextResponse.json({ response });
    }

    // Default: Gemini
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured. Please add it to .env.local' },
        { status: 500 }
      );
    }

    const response = await chatWithTranscript(transcript, messages);
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}

```

# app\api\models\route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch models. Check your API key.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    const models = (data.data || [])
      .map((m: any) => ({
        id: m.id,
        name: m.name || m.id,
        isFree:
          parseFloat(m.pricing?.prompt || '1') === 0 &&
          parseFloat(m.pricing?.completion || '1') === 0,
        contextLength: m.context_length || 0,
      }))
      .sort((a: any, b: any) => {
        // Free models first, then alphabetically
        if (a.isFree && !b.isFree) return -1;
        if (!a.isFree && b.isFree) return 1;
        return a.name.localeCompare(b.name);
      });

    return NextResponse.json({ models });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

```

# app\api\summarize\route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/gemini';
import { generateSummaryOpenRouter } from '@/lib/openrouter';

export async function POST(req: NextRequest) {
  try {
    const { transcript, provider, openrouterApiKey, openrouterModel } =
      await req.json();

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    if (provider === 'openrouter') {
      if (!openrouterApiKey || !openrouterModel) {
        return NextResponse.json(
          { error: 'OpenRouter API key and model are required' },
          { status: 400 }
        );
      }
      const summary = await generateSummaryOpenRouter(
        transcript,
        openrouterApiKey,
        openrouterModel
      );
      return NextResponse.json(summary);
    }

    // Default: Gemini
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured. Please add it to .env.local' },
        { status: 500 }
      );
    }

    const summary = await generateSummary(transcript);
    return NextResponse.json(summary);
  } catch (error: any) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate summary' },
      { status: 500 }
    );
  }
}

```

# app\api\transcript\route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import {
  extractVideoId,
  getVideoMetadata,
  getTranscript,
  formatTranscriptForAI,
} from '@/lib/youtube';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        {
          error:
            'Invalid YouTube URL. Please provide a valid youtube.com or youtu.be link.',
        },
        { status: 400 }
      );
    }

    const [metadata, transcript] = await Promise.all([
      getVideoMetadata(videoId),
      getTranscript(videoId),
    ]);

    const formattedTranscript = formatTranscriptForAI(transcript);

    return NextResponse.json({
      metadata,
      transcript,
      formattedTranscript,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process video' },
      { status: 500 }
    );
  }
}

```

# app\globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-950 text-gray-100 antialiased;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-gray-900;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-700 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-600;
  }
}

```

# app\layout.tsx

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YouTube Summarizer — AI-Powered Video Analysis',
  description:
    'Get instant AI-generated summaries, key takeaways, and chapter breakdowns from any YouTube video. Chat with video content using Gemini AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

```

# app\page.tsx

```tsx
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

```

# components\ChatWithVideo.tsx

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader2, Bot, User } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

interface ChatWithVideoProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  loading: boolean;
}

export function ChatWithVideo({
  messages,
  onSendMessage,
  loading,
}: ChatWithVideoProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-red-400" />
        <h3 className="font-semibold text-white">💬 Chat with Video</h3>
        <span className="text-sm text-gray-400 ml-2">
          Ask questions about the video content
        </span>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            Ask a question about the video to get started...
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-red-400" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-red-400" />
            </div>
            <div className="bg-gray-800 px-4 py-2.5 rounded-xl">
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the video..."
            className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

```

# components\Header.tsx

```tsx
import { Youtube, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  activeProvider?: string;
  activeModel?: string;
}

export function Header({ onOpenSettings, activeProvider, activeModel }: HeaderProps) {
  const providerLabel =
    activeProvider === 'openrouter'
      ? activeModel
        ? activeModel.split('/').pop() || 'OpenRouter'
        : 'OpenRouter'
      : 'Gemini';

  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 rounded-xl">
            <Youtube className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">YouTube Summarizer</h1>
            <p className="text-sm text-gray-400">
              AI-powered video transcript analysis
            </p>
          </div>
        </div>
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-sm text-gray-300 hover:text-white transition-all"
          title="AI Settings"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline max-w-[120px] truncate">
            {providerLabel}
          </span>
        </button>
      </div>
    </header>
  );
}

```

# components\LoadingSpinner.tsx

```tsx
export function LoadingSpinner() {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border-2 border-gray-700" />
      <div className="absolute inset-0 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
    </div>
  );
}

```

# components\SettingsModal.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Settings, Loader2, Search, Zap, ExternalLink } from 'lucide-react';
import { AISettings } from '@/lib/types';

interface OpenRouterModelInfo {
  id: string;
  name: string;
  isFree: boolean;
  contextLength: number;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AISettings;
  onSave: (settings: AISettings) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: SettingsModalProps) {
  const [provider, setProvider] = useState(settings.provider);
  const [openrouterApiKey, setOpenrouterApiKey] = useState(
    settings.openrouterApiKey
  );
  const [openrouterModel, setOpenrouterModel] = useState(
    settings.openrouterModel
  );
  const [models, setModels] = useState<OpenRouterModelInfo[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [modelSearch, setModelSearch] = useState('');
  const [freeOnly, setFreeOnly] = useState(false);
  const [error, setError] = useState('');

  // Sync form state when modal opens
  useEffect(() => {
    if (isOpen) {
      setProvider(settings.provider);
      setOpenrouterApiKey(settings.openrouterApiKey);
      setOpenrouterModel(settings.openrouterModel);
      setError('');
      setModelSearch('');
    }
  }, [isOpen, settings]);

  const fetchModels = async () => {
    if (!openrouterApiKey.trim()) {
      setError('Please enter your OpenRouter API key first');
      return;
    }
    setLoadingModels(true);
    setError('');
    try {
      const res = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: openrouterApiKey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setModels(data.models);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch models');
    } finally {
      setLoadingModels(false);
    }
  };

  const handleSave = () => {
    const newSettings: AISettings = {
      provider,
      openrouterApiKey:
        provider === 'openrouter'
          ? openrouterApiKey
          : settings.openrouterApiKey,
      openrouterModel:
        provider === 'openrouter'
          ? openrouterModel
          : settings.openrouterModel,
    };
    onSave(newSettings);
    onClose();
  };

  const filteredModels = models.filter((m) => {
    if (freeOnly && !m.isFree) return false;
    if (
      modelSearch &&
      !m.name.toLowerCase().includes(modelSearch.toLowerCase()) &&
      !m.id.toLowerCase().includes(modelSearch.toLowerCase())
    )
      return false;
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] mx-4 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">AI Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Provider selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Provider
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setProvider('gemini')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === 'gemini'
                    ? 'border-red-500 bg-red-500/10 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="font-medium text-sm">✦ Gemini</div>
                <div className="text-xs mt-1 opacity-70">
                  Server API key · gemini-2.5-flash
                </div>
              </button>
              <button
                onClick={() => setProvider('openrouter')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === 'openrouter'
                    ? 'border-red-500 bg-red-500/10 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="font-medium text-sm">🔀 OpenRouter</div>
                <div className="text-xs mt-1 opacity-70">
                  300+ models · free options
                </div>
              </button>
            </div>
          </div>

          {/* Gemini info */}
          {provider === 'gemini' && (
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-sm text-gray-400">
              Using{' '}
              <span className="text-white font-medium">gemini-2.5-flash</span>{' '}
              with the server&apos;s API key from{' '}
              <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">
                .env.local
              </code>
            </div>
          )}

          {/* OpenRouter config */}
          {provider === 'openrouter' && (
            <>
              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  OpenRouter API Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={openrouterApiKey}
                    onChange={(e) => setOpenrouterApiKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                  <button
                    onClick={fetchModels}
                    disabled={loadingModels || !openrouterApiKey.trim()}
                    className="px-4 py-2.5 bg-gray-800 border border-gray-700 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    {loadingModels ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Fetch Models'
                    )}
                  </button>
                </div>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-red-400 transition-colors"
                >
                  Get your API key at openrouter.ai{' '}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Model selection */}
              {models.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Model{' '}
                      <span className="text-gray-500">
                        ({filteredModels.length})
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={freeOnly}
                        onChange={(e) => setFreeOnly(e.target.checked)}
                        className="rounded border-gray-600 bg-gray-800 text-red-500 focus:ring-red-500 w-3.5 h-3.5"
                      />
                      Free only
                    </label>
                  </div>

                  {/* Search */}
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      placeholder="Search models..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  </div>

                  {/* Model list */}
                  <div className="max-h-52 overflow-y-auto rounded-xl border border-gray-700 bg-gray-800/50 divide-y divide-gray-700/50">
                    {filteredModels.length === 0 && (
                      <div className="px-4 py-6 text-center text-sm text-gray-500">
                        No models match your search
                      </div>
                    )}
                    {filteredModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setOpenrouterModel(model.id)}
                        className={`w-full px-4 py-2.5 flex items-center justify-between text-left text-sm transition-colors ${
                          openrouterModel === model.id
                            ? 'bg-red-500/10 text-white'
                            : 'text-gray-300 hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="min-w-0 flex-1 mr-2">
                          <div className="truncate font-medium">
                            {model.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {model.id}
                            {model.contextLength > 0 &&
                              ` · ${Math.round(model.contextLength / 1000)}k ctx`}
                          </div>
                        </div>
                        {model.isFree && (
                          <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1 flex-shrink-0">
                            <Zap className="w-3 h-3" />
                            Free
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {openrouterModel && (
                    <div className="mt-2 text-xs text-gray-500">
                      Selected:{' '}
                      <span className="text-gray-300">{openrouterModel}</span>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={
              provider === 'openrouter' &&
              (!openrouterApiKey.trim() || !openrouterModel)
            }
            className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

```

# components\SummaryTabs.tsx

```tsx
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

```

# components\URLInput.tsx

```tsx
'use client';

import { Link, Loader2, ArrowRight } from 'lucide-react';

interface URLInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function URLInput({ url, onUrlChange, onSubmit, loading }: URLInputProps) {
  return (
    <div className="mt-8">
      <label
        htmlFor="url-input"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Paste a YouTube video URL
      </label>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && onSubmit()}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full pl-12 pr-4 py-3.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            disabled={loading}
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={loading || !url.trim()}
          className="px-6 py-3.5 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Summarize
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

```

# components\VideoInfo.tsx

```tsx
import { User, Clock } from 'lucide-react';
import { VideoMetadata } from '@/lib/types';

interface VideoInfoProps {
  metadata: VideoMetadata;
}

export function VideoInfo({ metadata }: VideoInfoProps) {
  return (
    <div className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded-xl flex gap-4">
      <img
        src={metadata.thumbnail}
        alt={metadata.title}
        className="w-48 h-28 object-cover rounded-lg flex-shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${metadata.videoId}/hqdefault.jpg`;
        }}
      />
      <div className="flex flex-col justify-center min-w-0">
        <h2 className="text-lg font-semibold text-white line-clamp-2">
          {metadata.title}
        </h2>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {metadata.channelName}
          </span>
          {metadata.duration && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {metadata.duration}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

```

# lib\gemini.ts

```ts
import { GoogleGenAI } from '@google/genai';
import { SummaryResult, ChatMessage } from './types';

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set.');
  }
  return new GoogleGenAI({ apiKey });
}

const SUMMARY_PROMPT_TEMPLATE = `You are an expert content analyst. Analyze the following YouTube video transcript and provide a comprehensive summary.

TRANSCRIPT:
{{TRANSCRIPT}}

Respond with ONLY valid JSON (no markdown code fences, no extra text) in this exact format:
{
  "keyTakeaways": ["takeaway 1", "takeaway 2"],
  "chapterSummaries": [
    {
      "timestamp": "MM:SS",
      "title": "Chapter Title",
      "summary": "Brief summary of this section"
    }
  ],
  "fullSummary": "A detailed, well-structured article-style summary using markdown formatting with headers (##), paragraphs, bold, and emphasis.",
  "infographic": {
    "title": "A short, catchy title for an infographic",
    "subtitle": "A one-line hook or tagline",
    "keyStats": [
      { "label": "Stat Name", "value": "Stat Value or Number" }
    ],
    "mainPoints": [
      { "number": 1, "title": "Point Title", "detail": "One-sentence explanation" }
    ],
    "quotes": ["A notable or impactful quote from the video"],
    "conclusion": "A concise concluding takeaway"
  }
}

Guidelines:
- Key Takeaways: 5-10 concise, actionable bullet points capturing the most important insights
- Chapter Summaries: Break the video into logical sections with accurate timestamps from the transcript
- Full Summary: A comprehensive, SEO-friendly article (500-1000 words) that captures all important information with proper markdown structure
- Infographic: Extract 3-6 key stats/numbers mentioned (or derived from) the video, 3-5 main points suitable for a visual layout, 1-3 memorable quotes, and a punchy conclusion`;

export function getSummaryPrompt(transcript: string): string {
  return SUMMARY_PROMPT_TEMPLATE.replace('{{TRANSCRIPT}}', transcript);
}

export function parseSummaryResponse(text: string): SummaryResult {
  try {
    let jsonStr = text.trim();
    const jsonMatch = jsonStr.match(/\`\`\`(?:json)?\s*([\s\S]*?)\`\`\`/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const parsed = JSON.parse(jsonStr);
    return {
      keyTakeaways: parsed.keyTakeaways || [],
      chapterSummaries: parsed.chapterSummaries || [],
      fullSummary: parsed.fullSummary || '',
      infographic: parsed.infographic || undefined,
    };
  } catch {
    return {
      keyTakeaways: [
        'Summary generated but could not be structured. See full summary below.',
      ],
      chapterSummaries: [],
      fullSummary: text,
    };
  }
}

export async function generateSummary(
  transcript: string
): Promise<SummaryResult> {
  const ai = getClient();
  const prompt = getSummaryPrompt(transcript);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const text = response.text?.trim() || '';
  return parseSummaryResponse(text);
}

export async function chatWithTranscript(
  transcript: string,
  messages: ChatMessage[]
): Promise<string> {
  const ai = getClient();

  const systemPrompt = `You are a helpful AI assistant that answers questions about a YouTube video based on its transcript. Be concise, accurate, and reference specific parts of the video with timestamps when relevant.

VIDEO TRANSCRIPT:
${transcript}`;

  const chatContents = [
    { role: 'user' as const, parts: [{ text: systemPrompt }] },
    {
      role: 'model' as const,
      parts: [
        {
          text: "I have read the transcript. I'm ready to answer your questions about this video.",
        },
      ],
    },
    ...messages.map((m) => ({
      role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.content }],
    })),
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: chatContents,
  });

  return response.text || 'Sorry, I could not generate a response.';
}

```

# lib\openrouter.ts

```ts
import { SummaryResult, ChatMessage } from './types';
import { getSummaryPrompt, parseSummaryResponse } from './gemini';

async function callOpenRouter(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[]
): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'YouTube Summarizer',
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.error?.message || `OpenRouter API error (${response.status})`
    );
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function generateSummaryOpenRouter(
  transcript: string,
  apiKey: string,
  model: string
): Promise<SummaryResult> {
  const prompt = getSummaryPrompt(transcript);

  const text = await callOpenRouter(apiKey, model, [
    { role: 'user', content: prompt },
  ]);

  return parseSummaryResponse(text);
}

export async function chatWithTranscriptOpenRouter(
  transcript: string,
  messages: ChatMessage[],
  apiKey: string,
  model: string
): Promise<string> {
  const systemPrompt = `You are a helpful AI assistant that answers questions about a YouTube video based on its transcript. Be concise, accurate, and reference specific parts of the video with timestamps when relevant.

VIDEO TRANSCRIPT:
${transcript}`;

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role === 'user' ? 'user' : ('assistant' as string),
      content: m.content,
    })),
  ];

  return callOpenRouter(apiKey, model, apiMessages);
}

```

# lib\types.ts

```ts
export interface VideoMetadata {
  title: string;
  thumbnail: string;
  channelName: string;
  duration: string;
  videoId: string;
}

export interface TranscriptEntry {
  text: string;
  offset: number;
  duration: number;
}

export interface ChapterSummary {
  timestamp: string;
  title: string;
  summary: string;
}

export interface InfographicData {
  title: string;
  subtitle: string;
  keyStats: { label: string; value: string }[];
  mainPoints: { number: number; title: string; detail: string }[];
  quotes: string[];
  conclusion: string;
}

export interface SummaryResult {
  keyTakeaways: string[];
  chapterSummaries: ChapterSummary[];
  fullSummary: string;
  infographic?: InfographicData;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AISettings {
  provider: 'gemini' | 'openrouter';
  openrouterApiKey: string;
  openrouterModel: string;
}

```

# lib\youtube.ts

```ts
import { VideoMetadata, TranscriptEntry } from './types';
import { YoutubeTranscript } from 'youtube-transcript';

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  // Handle case where user just pastes a video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim();
  }

  return null;
}

export async function getVideoMetadata(videoId: string): Promise<VideoMetadata> {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const response = await fetch(oembedUrl);

  if (!response.ok) {
    throw new Error(
      'Failed to fetch video metadata. The video may be private or does not exist.'
    );
  }

  const data = await response.json();

  // Try to extract duration from the YouTube page
  let duration = '';
  try {
    const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    const html = await pageRes.text();
    const durationMatch = html.match(/"lengthSeconds":"(\d+)"/);
    if (durationMatch) {
      const totalSeconds = parseInt(durationMatch[1], 10);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      duration =
        hours > 0
          ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          : `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  } catch {
    // Duration extraction is best-effort
  }

  return {
    title: data.title,
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    channelName: data.author_name,
    duration,
    videoId,
  };
}

export async function getTranscript(videoId: string): Promise<TranscriptEntry[]> {
  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
    return transcriptItems.map((item) => ({
      text: item.text,
      offset: item.offset,
      duration: item.duration,
    }));
  } catch (error: any) {
    throw new Error(
      'Could not retrieve transcript. The video may have captions disabled, be private, or not exist.'
    );
  }
}

export function formatTranscriptForAI(transcript: TranscriptEntry[]): string {
  return transcript
    .map((entry) => {
      const totalSeconds = Math.floor(entry.offset / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const timestamp = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
      return `[${timestamp}] ${entry.text}`;
    })
    .join('\n');
}

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

# next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

export default nextConfig;

```

# package.json

```json
{
  "name": "youtube-summarizer",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@google/genai": "^1.0.0",
    "lucide-react": "^0.400.0",
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-markdown": "^9.0.0",
    "youtube-transcript": "^1.3.0"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.5.0"
  }
}

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

