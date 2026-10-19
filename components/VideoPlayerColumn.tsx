'use client';

import { useState } from 'react';
import { User, Clock, ExternalLink, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { VideoMetadata } from '@/lib/types';

interface VideoPlayerColumnProps {
  videoId: string;
  metadata: VideoMetadata;
}

export function VideoPlayerColumn({ videoId, metadata }: VideoPlayerColumnProps) {
  const [descExpanded, setDescExpanded] = useState(false);

  return (
    <div className="glass p-3 space-y-3.5">
      {/* 16:9 Clean Embedded YouTube Player */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/[0.08] shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={metadata.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>

      {/* Video Details */}
      <div className="space-y-2">
        <h2 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
          {metadata.title}
        </h2>

        {/* Creator & Duration Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-gray-400">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 text-red-400" />
            </div>
            <span className="truncate font-medium text-gray-300">{metadata.channelName}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-500 font-mono text-[11px]">
            {metadata.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{metadata.duration}</span>
              </span>
            )}
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors"
              title="Watch on YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Collapsible Info / About */}
        <div className="pt-2 border-t border-white/[0.04]">
          <button
            onClick={() => setDescExpanded(!descExpanded)}
            className="flex items-center justify-between w-full text-[11px] text-gray-500 hover:text-gray-300 transition-colors py-1"
          >
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Video Info & Notes</span>
            </span>
            {descExpanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>

          {descExpanded && (
            <div className="mt-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-gray-400 space-y-1.5 animate-fade-in-up">
              <p>
                <strong>Video ID:</strong> <span className="font-mono text-gray-300">{videoId}</span>
              </p>
              <p>
                <strong>Channel:</strong> {metadata.channelName}
              </p>
              <p className="text-[11px] text-gray-500 leading-relaxed pt-1">
                Use the middle tab column to explore timestamped transcript segments, AI summaries, or export to Markdown/PDF.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
