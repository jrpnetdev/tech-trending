import { ExternalLink, Eye, ThumbsUp, Tv } from 'lucide-react';
import Image from 'next/image';
import type { YouTubeVideo } from '@/lib/types';
import { formatViewCount, timeAgo, truncate, cn } from '@/lib/utils';
import { Badge } from './Badge';

interface YouTubeCardProps {
  video: YouTubeVideo;
  rank: number;
}

export function YouTubeCard({ video, rank }: YouTubeCardProps) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex gap-3 p-3 rounded-lg border border-gray-700/40 bg-gray-800/60',
        'card-hover'
      )}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 relative w-24 h-14 rounded overflow-hidden bg-gray-700">
        {video.thumbnailUrl ? (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            sizes="96px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Tv size={20} className="text-gray-500" />
          </div>
        )}
        {/* Rank overlay */}
        <div className="absolute top-1 left-1 bg-black/70 text-white text-xs font-bold px-1 rounded">
          #{rank}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2">
          {video.title}
        </p>

        <p className="text-xs text-gray-400 mt-0.5 truncate">
          {video.channelTitle}
        </p>

        <div className="flex items-center gap-3 mt-1 flex-wrap">
          {video.viewCount && (
            <span className="flex items-center gap-0.5 text-xs text-gray-500">
              <Eye size={10} />
              {formatViewCount(video.viewCount)}
            </span>
          )}
          {video.likeCount && (
            <span className="flex items-center gap-0.5 text-xs text-gray-500">
              <ThumbsUp size={10} />
              {formatViewCount(video.likeCount)}
            </span>
          )}
          {video.categoryName && (
            <Badge variant="ghost" size="sm">
              {video.categoryName}
            </Badge>
          )}
        </div>
      </div>

      <ExternalLink
        size={12}
        className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors mt-1"
      />
    </a>
  );
}
