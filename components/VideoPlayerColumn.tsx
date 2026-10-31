'use client';

import { useState, useEffect, useRef } from 'react';
import {
  User,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Eye,
  Calendar,
  Tag,
  Play,
  Volume2,
  RefreshCw,
  AlertCircle,
  Film,
} from 'lucide-react';
import { VideoMetadata } from '@/lib/types';

interface VideoPlayerColumnProps {
  videoId: string;
  metadata: VideoMetadata;
  onTimeUpdate?: (currentTimeSeconds: number) => void;
}

export function VideoPlayerColumn({
  videoId,
  metadata,
  onTimeUpdate,
}: VideoPlayerColumnProps) {
  const [descExpanded, setDescExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const onTimeUpdateRef = useRef(onTimeUpdate);

  // Keep onTimeUpdate callback ref up to date without triggering effect re-runs
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  const cleanVideoId = videoId ? videoId.trim() : '';
  const isValidVideoId = Boolean(cleanVideoId && /^[a-zA-Z0-9_-]{5,20}$/.test(cleanVideoId));

  // Listen for custom seek events (dispatched from transcript clicks) and postMessage
  useEffect(() => {
    // 1. Handle timestamp clicks from transcript list
    const handleCustomSeek = (event: Event) => {
      const customEvent = event as CustomEvent<{ seconds: number }>;
      const targetSeconds = customEvent.detail?.seconds;
      if (typeof targetSeconds === 'number' && iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'seekTo',
            args: [targetSeconds, true],
          }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: [],
          }),
          '*'
        );
      }
    };
    window.addEventListener('yt-seek-to', handleCustomSeek);

    // 2. PostMessage listener for playback time sync
    const handleWindowMessage = (event: MessageEvent) => {
      if (
        typeof event.origin === 'string' &&
        !event.origin.includes('youtube.com') &&
        !event.origin.includes('youtube-nocookie.com')
      ) {
        return;
      }

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data?.event === 'infoDelivery' && data?.info) {
          if (typeof data.info.currentTime === 'number') {
            onTimeUpdateRef.current?.(data.info.currentTime);
          }
          if (typeof data.info.playerState === 'number') {
            // 1 = playing, 2 = paused, 0 = ended
            setIsPlaying(data.info.playerState === 1);
          }
        }
      } catch {
        // Ignore unrelated message events
      }
    };
    window.addEventListener('message', handleWindowMessage);

    return () => {
      window.removeEventListener('yt-seek-to', handleCustomSeek);
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [cleanVideoId]);

  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
    setHasError(false);
    // Tell the YouTube iframe to start broadcasting postMessage playback updates
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'listening' }),
        '*'
      );
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsPlaying(false);
    setIsIframeLoaded(false);
    setRetryKey((prev) => prev + 1);
  };

  const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="glass p-3.5 space-y-4">
      {/* 16:9 Interactive Embedded YouTube Player - Playable Instantly */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/90 border border-white/[0.08] shadow-2xl">
        {!isValidVideoId ? (
          /* Error State 1: Invalid / Missing Video ID */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-zinc-950/95">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">Video ID Unavailable</h3>
              <p className="text-xs text-gray-400 max-w-xs">
                Missing or invalid YouTube video ID. Please check the URL and try again.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-xs font-medium text-white transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
              <span>Retry</span>
            </button>
          </div>
        ) : hasError ? (
          /* Error State 2: Embedding restricted or player error */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-zinc-950/95">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Film className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">Playback Interrupted</h3>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                The video player couldn&apos;t load. This video may have creator playback restrictions.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-xs font-medium text-white transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
                <span>Retry Player</span>
              </button>
              <a
                href={`https://www.youtube.com/watch?v=${cleanVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          /* Main Interactive YouTube Iframe — Renders Immediately Without Blocking */
          <>
            <iframe
              key={`${cleanVideoId}-${retryKey}`}
              ref={iframeRef}
              id={`yt-player-${cleanVideoId}`}
              src={embedUrl}
              title={metadata.title || 'YouTube Video Player'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={() => setHasError(true)}
              className="absolute inset-0 w-full h-full border-0"
            />

            {/* Live sync indicator overlay: strictly pointer-events-none & select-none so it never blocks clicks */}
            {isPlaying && isIframeLoaded && !hasError && (
              <div
                aria-hidden="true"
                className="absolute top-2.5 left-2.5 pointer-events-none select-none z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-red-500/30 text-[10px] font-medium text-red-300 shadow-md animate-fade-in"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                <Volume2 className="w-2.5 h-2.5 text-red-400" />
                <span>Syncing Transcript</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Video Details & Rich Metadata */}
      <div className="space-y-3">
        <h2 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
          {metadata.title || 'Loading video details...'}
        </h2>

        {/* Rich Metadata Badges Grid (Channel, Publish Date, Category, Total Views) */}
        <div className="grid grid-cols-2 gap-2 pt-0.5 text-xs">
          {/* Channel Name */}
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] min-w-0">
            <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-gray-500 block leading-none">Channel</span>
              <span className="truncate font-medium text-gray-200 block text-xs mt-0.5">
                {metadata.channelName || 'YouTube Creator'}
              </span>
            </div>
          </div>

          {/* Total Views */}
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] min-w-0">
            <div className="w-5 h-5 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
              <Eye className="w-3 h-3 text-teal-400" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-gray-500 block leading-none">Total Views</span>
              <span className="truncate font-medium text-gray-200 block text-xs mt-0.5">
                {metadata.formattedViews || metadata.viewCount || 'Views available'}
              </span>
            </div>
          </div>

          {/* Publish Date */}
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] min-w-0">
            <div className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3 h-3 text-amber-400" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-gray-500 block leading-none">Published</span>
              <span className="truncate font-medium text-gray-200 block text-xs mt-0.5">
                {metadata.formattedPublishDate || metadata.publishDate || 'Recent'}
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] min-w-0">
            <div className="w-5 h-5 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
              <Tag className="w-3 h-3 text-rose-400" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-gray-500 block leading-none">Category</span>
              <span className="truncate font-medium text-gray-200 block text-xs mt-0.5">
                {metadata.category || 'General'}
              </span>
            </div>
          </div>
        </div>

        {/* Duration & Watch on YouTube row */}
        <div className="flex items-center justify-between gap-2 pt-1 text-xs text-gray-400 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            {metadata.duration && (
              <span className="flex items-center gap-1 font-mono text-[11px] text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]">
                <Clock className="w-3 h-3 text-gray-400" />
                <span>{metadata.duration}</span>
              </span>
            )}
            {isPlaying && !hasError ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <Volume2 className="w-3 h-3 text-emerald-400" />
                <span>Syncing Transcript</span>
              </span>
            ) : (
              <span className="text-[11px] text-teal-400/90 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                <span>Watch & Read</span>
              </span>
            )}
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${cleanVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/[0.06]"
            title="Watch on YouTube"
          >
            <span>YouTube</span>
            <ExternalLink className="w-3 h-3 text-red-400" />
          </a>
        </div>

        {/* Collapsible Info / About */}
        <div className="pt-1">
          <button
            onClick={() => setDescExpanded(!descExpanded)}
            className="flex items-center justify-between w-full text-[11px] text-gray-500 hover:text-gray-300 transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Interactive Player & Transcript Tips</span>
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
              <p className="text-[11px] text-gray-400 leading-relaxed pt-1">
                💡 <strong>Watch & Read Sync:</strong> Clicking any timestamp in the transcript jumps the video directly to that sentence. When the video plays, subtitles auto-scroll and highlight in real time!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
