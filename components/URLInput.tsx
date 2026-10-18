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
