'use client';

import { Youtube, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  activeProvider?: string;
  activeModel?: string;
  activeSection?: string;
  onNavigate?: (section: string) => void;
  hasResults?: boolean;
}

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'chat', label: 'Chat', icon: '💬' },
];

export function Header({
  onOpenSettings,
  activeProvider,
  activeModel,
  activeSection = 'home',
  onNavigate,
  hasResults = false,
}: HeaderProps) {
  const providerLabel =
    activeProvider === 'openrouter'
      ? activeModel
        ? activeModel.split('/').pop() || 'OpenRouter'
        : 'OpenRouter'
      : 'Gemini';

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-2xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top row: Logo + Settings */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-lg" />
              <div className="relative p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg shadow-red-500/20">
                <Youtube className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                YouTube<span className="text-gradient">Summarizer</span>
              </h1>
            </div>
          </div>

          {/* Right side: Provider badge + Settings */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-gray-400">
              <Sparkles className="w-3 h-3 text-red-400" />
              <span>{providerLabel}</span>
            </div>
            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.1] text-gray-400 hover:text-white transition-all duration-200"
              title="AI Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom row: Navigation tabs (visible when there are results) */}
        {hasResults && (
          <nav className="-mb-px flex gap-1 pb-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className={`relative px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-white bg-white/[0.06]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </span>
                {/* Active indicator bar */}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
