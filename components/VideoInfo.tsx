import { User, Clock } from 'lucide-react';
import { VideoMetadata } from '@/lib/types';

interface VideoInfoProps {
  metadata: VideoMetadata;
}

export function VideoInfo({ metadata }: VideoInfoProps) {
  return (
    <div className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded-xl flex gap-4">
      <img
        src={metadata.thumbnail}
        alt={metadata.title}
        className="w-48 h-28 object-cover rounded-lg flex-shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${metadata.videoId}/hqdefault.jpg`;
        }}
      />
      <div className="flex flex-col justify-center min-w-0">
        <h2 className="text-lg font-semibold text-white line-clamp-2">
          {metadata.title}
        </h2>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {metadata.channelName}
          </span>
          {metadata.duration && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {metadata.duration}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
