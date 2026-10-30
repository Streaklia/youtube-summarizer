import { User, Clock, ExternalLink, Calendar, Eye, Tag } from 'lucide-react';
import { VideoMetadata } from '@/lib/types';

interface VideoInfoProps {
  metadata: VideoMetadata;
}

export function VideoInfo({ metadata }: VideoInfoProps) {
  return (
    <div className="animate-fade-in-up glass p-3">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Thumbnail with overlay */}
        <div className="relative group flex-shrink-0 sm:w-56">
          <img
            src={metadata.thumbnail}
            alt={metadata.title}
            className="w-full sm:w-56 h-32 object-cover rounded-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${metadata.videoId}/hqdefault.jpg`;
            }}
          />
          {/* Duration badge */}
          {metadata.duration && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm text-white text-xs font-mono rounded-md">
              {metadata.duration}
            </span>
          )}
          {/* Hover overlay */}
          <a
            href={`https://www.youtube.com/watch?v=${metadata.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <ExternalLink className="w-5 h-5 text-white" />
          </a>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center min-w-0 px-2 pb-2 sm:px-0 sm:pb-0 sm:py-1 space-y-2">
          <h2 className="text-base sm:text-lg font-semibold text-white line-clamp-2 leading-snug">
            {metadata.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 font-medium text-gray-300">
              <div className="w-4 h-4 rounded-full bg-red-500/15 flex items-center justify-center">
                <User className="w-2.5 h-2.5 text-red-400" />
              </div>
              {metadata.channelName}
            </span>

            {(metadata.formattedViews || metadata.viewCount) && (
              <span className="flex items-center gap-1 text-gray-400">
                <Eye className="w-3 h-3 text-teal-400" />
                <span>{metadata.formattedViews || metadata.viewCount}</span>
              </span>
            )}

            {(metadata.formattedPublishDate || metadata.publishDate) && (
              <span className="flex items-center gap-1 text-gray-400">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>{metadata.formattedPublishDate || metadata.publishDate}</span>
              </span>
            )}

            {metadata.category && (
              <span className="flex items-center gap-1 text-gray-400">
                <Tag className="w-3 h-3 text-rose-400" />
                <span>{metadata.category}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
