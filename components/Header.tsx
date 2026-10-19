'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Youtube, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  activeProvider?: string;
  activeModel?: string;
  activeSection?: string;
  onNavigate?: (section: string) => void;
  hasResults?: boolean;
}

// Global top navigation items targeting high-volume search tools
const toolLinks = [
  { href: '/', label: 'Summarizer', emoji: '⚡' },
  { href: '/youtube-transcript', label: 'Transcript', emoji: '📄' },
  { href: '/youtube-summary', label: 'AI Summary', emoji: '📝' },
  { href: '/youtube-infographic', label: 'Infographic', emoji: '📊', badge: 'New' },
  { href: '/youtube-to-text', label: 'To Text', emoji: '✍️' },
  { href: '/podcast-transcript', label: 'Podcasts', emoji: '🎙️' },
  { href: '/transcript-ai', label: 'AI Chat', emoji: '💬' },
];

const resultNavItems = [
  { id: 'home', label: 'Search', icon: '🔍' },
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
  const pathname = usePathname();

  const providerLabel =
    activeProvider === 'openrouter'
      ? activeModel
        ? activeModel.split('/').pop() || 'OpenRouter'
        : 'OpenRouter'
      : 'Gemini';

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/85 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top row: Brand Logo + Primary Tool Navigation + Settings */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-lg group-hover:bg-red-500/30 transition-all" />
              <div className="relative p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg shadow-red-500/20">
                <Youtube className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                YouTube<span className="text-gradient">Summarizer</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu to switch between SEO tools */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto py-1">
            {toolLinks.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white/[0.08] text-white shadow-sm border border-white/[0.08]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <span>{tool.emoji}</span>
                  <span>{tool.label}</span>
                  {tool.badge && (
                    <span className="px-1 py-0.2 bg-gradient-to-r from-red-500 to-rose-500 text-[9px] font-bold text-white uppercase rounded-full">
                      {tool.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side: Provider badge + Settings */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-gray-400">
              <Sparkles className="w-3 h-3 text-red-400" />
              <span className="truncate max-w-[90px]">{providerLabel}</span>
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

        {/* Mobile Scrolling Tool Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto gap-1 pb-2 pt-1 scrollbar-none border-t border-white/[0.04] -mx-4 px-4">
          {toolLinks.map((tool) => {
            const isActive = pathname === tool.href;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-white/[0.08] text-white border border-white/[0.08]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{tool.emoji}</span>
                <span>{tool.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom row: In-Page Result navigation tabs (visible on summary view) */}
        {hasResults && (
          <nav className="-mb-px flex gap-1 pb-0 border-t border-white/[0.04] pt-1">
            {resultNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-white bg-white/[0.06]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </span>
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
