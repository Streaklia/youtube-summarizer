'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
  { href: '/youtube-transcript', label: 'Transcript' },
  { href: '/youtube-summary', label: 'AI Summary' },
  { href: '/youtube-to-text', label: 'To Text' },
  { href: '/podcast-transcript', label: 'Podcasts' },
  { href: '/download-youtube-transcript', label: 'Download' },
  { href: '/articles', label: 'Articles' },
  { href: '/about-us', label: 'About Us' },
];

export function Header({}: HeaderProps = {}) {
  const pathname = usePathname() || '/';

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/85 backdrop-blur-xl">
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
              My<span className="text-red-500">Transcript</span><span className="text-zinc-400 font-normal">.pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center p-1 bg-zinc-900/80 border border-zinc-800/90 rounded-full shadow-inner gap-1">
            {TOOL_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40 border border-transparent'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Primary Quick Action */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <span>Summarize Video</span>
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Pill Scroll */}
        <div className="flex md:hidden items-center gap-1.5 pt-2 pb-1.5 overflow-x-auto no-scrollbar border-t border-zinc-800/50 -mx-4 px-4 mt-1">
          {TOOL_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-700 font-semibold'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800/80'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
