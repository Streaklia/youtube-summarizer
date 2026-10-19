'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Youtube, Settings, Sparkles } from 'lucide-react';
import { extractLangFromPath, getSavedLanguage, localizedUrl } from '@/lib/localizedUrl';
import { isSupportedLanguage } from '@/lib/i18n';

interface HeaderProps {
  onOpenSettings: () => void;
  activeProvider?: string;
  activeModel?: string;
  activeSection?: string;
  onNavigate?: (section: string) => void;
  hasResults?: boolean;
  currentLang?: string;
}

// Core navigation tools targeting high-volume keywords
const baseToolLinks = [
  { path: '/', label: 'Summarizer', emoji: '⚡' },
  { path: '/youtube-transcript', label: 'Transcript', emoji: '📄' },
  { path: '/youtube-summary', label: 'AI Summary', emoji: '📝' },
  { path: '/youtube-infographic', label: 'Infographic', emoji: '📊', badge: 'New' },
  { path: '/youtube-to-text', label: 'To Text', emoji: '✍️' },
  { path: '/podcast-transcript', label: 'Podcasts', emoji: '🎙️' },
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
  currentLang,
}: HeaderProps) {
  const pathname = usePathname();

  // Dynamically resolve active language: explicit prop -> path segment -> client saved storage -> 'en'
  const pathLang = extractLangFromPath(pathname);
  const activeLang =
    (currentLang && isSupportedLanguage(currentLang) ? currentLang : null) ||
    pathLang ||
    (typeof window !== 'undefined' ? getSavedLanguage() : 'en');

  const providerLabel =
    activeProvider === 'openrouter'
      ? activeModel
        ? activeModel.split('/').pop() || 'OpenRouter'
        : 'OpenRouter'
      : 'Gemini';

  const homeHref = localizedUrl('/', activeLang);

  const toolLinks = baseToolLinks.map((tool) => ({
    href: localizedUrl(tool.path, activeLang),
    label: tool.label,
    emoji: tool.emoji,
    badge: tool.badge,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col justify-center">
        {/* Main Header Flex Row: Left (Logo) | Center (Pill Nav) | Right (Actions) */}
        <div className="flex items-center justify-between gap-4">
          {/* Left section: Brand Logo + Name */}
          <Link href={homeHref} className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-red-500/25 rounded-xl blur-md group-hover:bg-red-500/35 transition-all" />
              <div className="relative p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-md shadow-red-500/20">
                <Youtube className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-baseline font-bold text-base sm:text-lg tracking-tight select-none">
              <span className="text-white">YouTube</span>
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                Summarizer
              </span>
            </div>
          </Link>

          {/* Center section: Sleek pill-shaped navigation container */}
          <nav className="hidden md:flex items-center p-1 bg-zinc-900/80 border border-zinc-800/90 rounded-full shadow-inner gap-1">
            {toolLinks.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40 border border-transparent'
                  }`}
                >
                  <span className="text-xs leading-none">{tool.emoji}</span>
                  <span>{tool.label}</span>
                  {tool.badge && (
                    <span className="px-1.5 py-0.2 bg-gradient-to-r from-red-500 to-rose-500 text-[9px] font-bold text-white uppercase rounded-full shadow-sm">
                      {tool.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right section: Action buttons (Model badge + Settings gear) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span className="truncate max-w-[90px] sm:max-w-[120px]">{providerLabel}</span>
            </div>

            <button
              type="button"
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-sm"
              title="AI Settings"
              aria-label="Open AI Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar: clean horizontal pill row without ugly scrollbars */}
        <div className="flex md:hidden items-center gap-1.5 pt-2 pb-0.5 overflow-x-auto no-scrollbar border-t border-zinc-800/50 -mx-4 px-4 mt-2">
          {toolLinks.map((tool) => {
            const isActive = pathname === tool.href;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-700 font-semibold'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800/80'
                }`}
              >
                <span className="text-xs">{tool.emoji}</span>
                <span>{tool.label}</span>
                {tool.badge && (
                  <span className="px-1 py-0.2 bg-gradient-to-r from-red-500 to-rose-500 text-[8px] font-bold text-white uppercase rounded-full">
                    {tool.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* In-Page Result navigation tabs (visible on summary view if hasResults is enabled) */}
        {hasResults && (
          <nav className="-mb-px flex gap-1 pb-0 border-t border-zinc-800/60 pt-1 mt-2">
            {resultNavItems.map((item) => (
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
