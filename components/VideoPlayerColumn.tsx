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
} from 'lucide-react';
import { VideoMetadata } from '@/lib/types';

interface VideoPlayerColumnProps {
  videoId: string;
  metadata: VideoMetadata;
  onTimeUpdate?: (currentTimeSeconds: number) => void;
}

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function VideoPlayerColumn({
  videoId,
  metadata,
  onTimeUpdate,
}: VideoPlayerColumnProps) {
  const [descExpanded, setDescExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize YouTube IFrame API and postMessage listener for real-time subtitle sync
  useEffect(() => {
    let isMounted = true;

    // 1. Listen for custom seek events (dispatched when user clicks a transcript timestamp)
    const handleCustomSeek = (event: Event) => {
      const customEvent = event as CustomEvent<{ seconds: number }>;
      const targetSeconds = customEvent.detail?.seconds;
      if (typeof targetSeconds === 'number') {
        if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
          playerRef.current.seekTo(targetSeconds, true);
          playerRef.current.playVideo();
        } else if (iframeRef.current?.contentWindow) {
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
      }
    };
    window.addEventListener('yt-seek-to', handleCustomSeek);

    // 2. PostMessage listener fallback for time updates
    const handleWindowMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data?.event === 'infoDelivery' && data?.info) {
          if (typeof data.info.currentTime === 'number' && onTimeUpdate) {
            onTimeUpdate(data.info.currentTime);
          }
          if (typeof data.info.playerState === 'number') {
            setIsPlaying(data.info.playerState === 1);
          }
        }
      } catch {
        // Not a JSON message or unrelated
      }
    };
    window.addEventListener('message', handleWindowMessage);

    // 3. YouTube IFrame API initialization
    const initYT = () => {
      if (!isMounted || !window.YT || !window.YT.Player) return;
      try {
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch {}
        }
        playerRef.current = new window.YT.Player(`yt-player-${videoId}`, {
          events: {
            onReady: (e: any) => {
              if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                  JSON.stringify({ event: 'listening' }),
                  '*'
                );
              }
            },
            onStateChange: (e: any) => {
              if (e.data === 1) {
                // Playing
                setIsPlaying(true);
                if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                pollIntervalRef.current = setInterval(() => {
                  if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                    const t = playerRef.current.getCurrentTime();
                    if (onTimeUpdate) onTimeUpdate(t);
                  }
                }, 250);
              } else {
                // Paused / Ended / Buffering
                setIsPlaying(false);
                if (pollIntervalRef.current) {
                  clearInterval(pollIntervalRef.current);
                  pollIntervalRef.current = null;
                }
                if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                  const t = playerRef.current.getCurrentTime();
                  if (onTimeUpdate) onTimeUpdate(t);
                }
              }
            },
          },
        });
      } catch (err) {
        console.warn('YT Player init notice:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      const existingScript = document.getElementById('yt-iframe-api-script');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initYT();
      };
    }

    return () => {
      isMounted = false;
      window.removeEventListener('yt-seek-to', handleCustomSeek);
      window.removeEventListener('message', handleWindowMessage);
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
      }
    };
  }, [videoId, onTimeUpdate]);

  const originUrl =
    typeof window !== 'undefined' ? window.location.origin : 'https://www.mytranscript.pro';

  return (
    <div className="glass p-3.5 space-y-4">
      {/* 16:9 Interactive Embedded YouTube Player - Playable Instantly */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/80 border border-white/[0.08] shadow-2xl group">
        <iframe
          ref={iframeRef}
          id={`yt-player-${videoId}`}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${encodeURIComponent(
            originUrl
          )}&rel=0&modestbranding=1&playsinline=1`}
          title={metadata.title || 'YouTube Video Player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />

        {/* Live sync indicator overlay */}
        {isPlaying && (
          <div className="absolute top-2.5 left-2.5 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-red-500/30 text-[10px] font-medium text-red-300 shadow-sm animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            <Volume2 className="w-2.5 h-2.5 text-red-400" />
            <span>Syncing Transcript</span>
          </div>
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
            <span className="text-[11px] text-teal-400/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
              <span>Watch & Read</span>
            </span>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
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
