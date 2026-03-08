import { ExternalLink, Clock, User } from 'lucide-react';
import Image from 'next/image';
import type { NewsItem } from '@/lib/types';
import { timeAgo, truncate, cn } from '@/lib/utils';

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex gap-3 p-3 rounded-lg border border-gray-700/40 bg-gray-800/60',
        'card-hover'
      )}
    >
      {/* Thumbnail */}
      {item.imageUrl && (
        <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden bg-gray-700">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={64}
            height={48}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2">
          {item.title}
        </p>

        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
            {truncate(item.description, 100)}
          </p>
        )}

        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="text-xs font-medium text-indigo-400">{item.source}</span>
          {item.author && (
            <span className="flex items-center gap-0.5 text-xs text-gray-500">
              <User size={10} />
              {truncate(item.author, 20)}
            </span>
          )}
          <span className="flex items-center gap-0.5 text-xs text-gray-500">
            <Clock size={10} />
            {timeAgo(item.publishedAt)}
          </span>
        </div>
      </div>

      <ExternalLink
        size={12}
        className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors mt-1"
      />
    </a>
  );
}
