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
