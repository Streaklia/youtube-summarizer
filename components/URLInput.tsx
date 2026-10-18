'use client';

import { useState } from 'react';
import { Link, Loader2, Sparkles, Search } from 'lucide-react';

interface URLInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function URLInput({ url, onUrlChange, onSubmit, loading }: URLInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {/* Hero section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Summarize any{' '}
          <span className="text-gradient">YouTube video</span>
        </h2>
        <p className="mt-3 text-gray-500 text-base sm:text-lg max-w-lg mx-auto">
          Paste a link and get AI-powered summaries, key takeaways,
          chapter breakdowns & more in seconds.
        </p>
      </div>

      {/* Input container */}
      <div
        className={`relative rounded-2xl transition-all duration-300 ${
          isFocused ? 'glow-red' : ''
        }`}
      >
        <div
          className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all duration-300 ${
            isFocused
              ? 'bg-white/[0.06] border-red-500/40'
              : 'bg-white/[0.03] border-white/[0.06] hover:border-white/[0.1]'
          }`}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !loading && onSubmit()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-gray-600 focus:outline-none text-sm sm:text-base"
              disabled={loading}
              aria-label="YouTube video URL"
            />
          </div>
          <button
            onClick={onSubmit}
            disabled={loading || !url.trim()}
            className="px-5 sm:px-7 py-3.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap text-sm shadow-lg shadow-red-500/20 disabled:shadow-none"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Summarize
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick hint */}
      <p className="mt-3 text-center text-xs text-gray-600">
        Works with youtube.com, youtu.be, shorts & embed links
      </p>
    </div>
  );
}
