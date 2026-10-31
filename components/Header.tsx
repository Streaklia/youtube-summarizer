'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Sparkles, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenSettings?: () => void;
  activeProvider?: string;
  activeModel?: string;
  activeSection?: string;
  onNavigate?: (section: string) => void;
  hasResults?: boolean;
  showAiSettings?: boolean;
}

const MAIN_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/youtube-transcript', label: 'Transcript' },
  { href: '/youtube-summary', label: 'AI Summary' },
  { href: '/download-youtube-transcript', label: 'Download' },
  { href: '/articles', label: 'Articles' },
];

interface ToolMenuItem {
  href: string;
  emoji: string;
  title: string;
  description: string;
  badge?: string | null;
}

const TOOLS_MENU_ITEMS: ToolMenuItem[] = [
  {
    href: '/app/key-takeaways',
    emoji: '📌',
    title: 'Key Takeaways',
    description: 'Instant bulleted takeaways & action points',
    badge: null,
  },
  {
    href: '/app/chapters',
    emoji: '⏱️',
    title: 'Chapters Breakdown',
    description: 'Timestamped scene & topic navigation',
    badge: null,
  },
  {
    href: '/app/infographic',
    emoji: '📊',
    title: 'Infographic Generator',
    description: 'Visual stat cards & shareable summaries',
    badge: 'NEW',
  },
  {
    href: '/app/prompt',
    emoji: '✨',
    title: 'AI Prompt Generator',
    description: 'Image prompts & visual comic scripts',
    badge: null,
  },
  {
    href: '/app/youtube-to-srt',
    emoji: '🎬',
    title: 'YouTube to SRT Converter',
    description: 'Export clean .SRT subtitle files',
    badge: null,
  },
  {
    href: '/app/youtube-to-text-no-timestamps',
    emoji: '📝',
    title: 'YouTube to Text',
    description: 'Clean transcript prose without timestamps',
    badge: null,
  },
  {
    href: '/app/podcast-transcript',
    emoji: '🎙️',
    title: 'Podcast Transcripts',
    description: 'Multi-hour audio & podcast text conversion',
    badge: null,
  },
  {
    href: '/app/chatbot',
    emoji: '💬',
    title: 'Transcript Chatbot',
    description: 'Converse & ask questions with video AI',
    badge: null,
  },
];

export function Header({}: HeaderProps = {}) {
  const pathname = usePathname() || '/';
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setToolsOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setToolsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToolsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 180);
  };

  const isToolActive = TOOLS_MENU_ITEMS.some(
    (item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/80 bg-gray-950/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Website Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 transition-transform group-hover:scale-105 duration-200">
              <Image
                src="/logo.png"
                alt="mytranscript.pro logo"
                width={32}
                height={32}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-white text-base tracking-tight">
              My<span className="text-[#FF2B4A]">Transcript</span>
              <span className="text-gray-400 font-normal">.pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center p-1 bg-gray-950/80 border border-gray-800 rounded-full shadow-inner gap-1">
            {MAIN_NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-gray-800 text-white shadow-sm border border-gray-700/80 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/60 border border-transparent'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Tools Dropdown Trigger */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setToolsOpen(!toolsOpen)}
                aria-expanded={toolsOpen}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  toolsOpen || isToolActive
                    ? 'bg-gray-800 text-white shadow-sm border border-gray-700/80 font-semibold text-[#FF2B4A]'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/60 border border-transparent'
                }`}
              >
                <span>Tools</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    toolsOpen ? 'rotate-180 text-[#FF2B4A]' : 'text-gray-500'
                  }`}
                />
              </button>

              {/* Clean Dark-Mode Dropdown Card */}
              <div
                className={`absolute top-full right-0 pt-2 z-[100] transition-all duration-200 ease-out ${
                  toolsOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-gray-950 border border-gray-800 p-2.5 sm:p-3 shadow-2xl shadow-black/90 backdrop-blur-2xl relative overflow-hidden">
                  {/* Subtle ambient ruby glow */}
                  <div className="absolute -top-10 right-10 w-48 h-20 bg-[#FF2B4A]/10 blur-2xl rounded-full pointer-events-none" />

                  {/* Header bar inside dropdown */}
                  <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-gray-800/80 text-[11px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF2B4A]" />
                      <span className="font-semibold text-white">Specialized Tools</span>
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">8 utilities</span>
                  </div>

                  {/* Neatly bounded list of Tools */}
                  <div className="space-y-1">
                    {TOOLS_MENU_ITEMS.map((item) => {
                      const isCurrent = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setToolsOpen(false)}
                          className={`group flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl transition-all duration-150 border ${
                            isCurrent
                              ? 'bg-gray-900 border-[#FF2B4A]/40 text-white shadow-sm'
                              : 'bg-transparent hover:bg-gray-900/80 border-transparent hover:border-gray-800/80 text-gray-300'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-800 group-hover:border-[#FF2B4A]/30 flex items-center justify-center text-sm flex-shrink-0 group-hover:scale-105 transition-all shadow-inner">
                            {item.emoji}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-white group-hover:text-[#FF2B4A] transition-colors truncate">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase tracking-wide bg-[#FF2B4A] text-white shadow-sm shadow-[#FF2B4A]/30 animate-pulse">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-400 group-hover:text-gray-300 truncate leading-snug">
                              {item.description}
                            </p>
                          </div>

                          <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#FF2B4A] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer Bar inside Dropdown */}
                  <div className="mt-2 pt-2 border-t border-gray-800/80 flex items-center justify-between px-2 text-[11px] text-gray-500">
                    <span>Zero signup required · 100% Free</span>
                    <Link
                      href="/"
                      onClick={() => setToolsOpen(false)}
                      className="inline-flex items-center gap-1 text-[#FF2B4A] hover:underline font-medium"
                    >
                      <span>Explore all</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Primary CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF2B4A] hover:bg-[#e02440] text-white text-xs font-semibold shadow-md shadow-[#FF2B4A]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Summarize Video</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 border border-gray-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Pill Scroll (Primary) */}
        <div className="flex md:hidden items-center gap-1.5 pt-2 pb-2 overflow-x-auto no-scrollbar border-t border-gray-800/60 -mx-4 px-4 mt-1">
          {MAIN_NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                  isActive
                    ? 'bg-gray-800 text-white border border-gray-700 font-semibold'
                    : 'bg-gray-950 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Mobile Tools Pill */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
              mobileMenuOpen || isToolActive
                ? 'bg-gray-800 text-[#FF2B4A] border border-[#FF2B4A]/40 font-semibold'
                : 'bg-gray-950 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <span>Tools</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform ${mobileMenuOpen ? 'rotate-180 text-[#FF2B4A]' : ''}`}
            />
          </button>
        </div>

        {/* Mobile Expanded Drawer with All Tools */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-800/80 animate-fade-in-up">
            <div className="p-3 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-2 text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF2B4A]" />
                  <span>All Specialized Tools</span>
                </span>
                <span className="text-[10px] text-gray-500">8 utilities</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOOLS_MENU_ITEMS.map((item) => {
                  const isCurrent = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl text-xs border transition-colors ${
                        isCurrent
                          ? 'bg-gray-900 border-[#FF2B4A]/40 text-white'
                          : 'bg-gray-900/40 border-gray-800/60 text-gray-300 hover:text-white hover:border-gray-700'
                      }`}
                    >
                      <span className="text-base flex-shrink-0">{item.emoji}</span>
                      <span className="font-medium truncate flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#FF2B4A] text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
