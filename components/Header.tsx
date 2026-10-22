'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Youtube, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenSettings?: () => void;
  activeProvider?: string;
  activeModel?: string;
  activeSection?: string;
  onNavigate?: (section: string) => void;
  hasResults?: boolean;
  showAiSettings?: boolean;
}

const TOOL_LINKS = [
  { href: '/youtube-transcript', label: 'Transcript', emoji: '📄' },
  { href: '/youtube-summary', label: 'AI Summary', emoji: '🤖' },
  { href: '/youtube-to-text', label: 'To Text', emoji: '✍️' },
  { href: '/podcast-transcript', label: 'Podcasts', emoji: '🎙️' },
  { href: '/download-youtube-transcript', label: 'Download', emoji: '📥' },
  { href: '/articles/', label: 'Articles', emoji: '📖' },
];

const RESULT_NAV_ITEMS = [
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
  showAiSettings = false,
}: HeaderProps) {
  const pathname = usePathname();

  const providerLabel =
    activeProvider === 'openrouter'
      ? activeModel
        ? activeModel.split('/').pop() || 'OpenRouter'
        : 'OpenRouter'
      : 'Gemini';

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="p-1.5 rounded-lg bg-red-600/10 border border-red-500/20 group-hover:bg-red-600/20 transition-colors">
              <Youtube className="w-4 h-4 text-red-500" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight hidden sm:block">
              My<span className="text-red-500">Transcript</span>
            </span>
          </Link>

          {/* Desktop nav with key English tool variations */}
          <nav className="hidden md:flex items-center p-1 bg-zinc-900/80 border border-zinc-800/90 rounded-full shadow-inner gap-1">
            {TOOL_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40 border border-transparent'
                  }`}
                >
                  <span className="text-xs leading-none">{link.emoji}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: AI Settings badge */}
          {showAiSettings && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-300 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <span className="truncate max-w-[90px] sm:max-w-[120px]">{providerLabel}</span>
              </div>
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-sm"
                  title="AI Settings"
                  aria-label="Open AI Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-1.5 pt-2 pb-1 overflow-x-auto no-scrollbar border-t border-zinc-800/50 -mx-4 px-4 mt-1">
          {TOOL_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-700 font-semibold'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800/80'
                }`}
              >
                <span className="text-xs">{link.emoji}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* In-page result nav tabs (shown when hasResults) */}
        {hasResults && (
          <nav className="flex gap-1 border-t border-zinc-800/60 pt-1 mt-1">
            {RESULT_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate?.(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-white bg-zinc-800/60'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
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
