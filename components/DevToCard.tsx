import { ExternalLink, Heart, MessageSquare, Clock } from 'lucide-react';
import type { DevToArticle } from '@/lib/types';
import { timeAgo, cn } from '@/lib/utils';

interface DevToCardProps {
  item: DevToArticle;
}

function tagColour(tag: string): string {
  const colours = [
    'text-blue-400 bg-blue-400/10',
    'text-violet-400 bg-violet-400/10',
    'text-amber-400 bg-amber-400/10',
    'text-green-400 bg-green-400/10',
    'text-pink-400 bg-pink-400/10',
    'text-cyan-400 bg-cyan-400/10',
  ];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) | 0;
  return colours[Math.abs(hash) % colours.length];
}

export function DevToCard({ item }: DevToCardProps) {
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
      {/* Cover image or reactions pill */}
      <div className="flex-shrink-0 flex flex-col items-center justify-start pt-0.5 w-8 text-center">
        <Heart size={12} className="text-pink-400" />
        <span className="text-xs font-bold text-pink-400 mt-0.5">{item.reactions}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2">
          {item.title}
        </p>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={cn('text-xs px-1.5 py-0.5 rounded font-mono', tagColour(tag))}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="text-xs text-gray-500">{item.author}</span>
          <span className="flex items-center gap-0.5 text-xs text-gray-500">
            <MessageSquare size={11} />
            {item.commentCount}
          </span>
          {item.readingTime && (
            <span className="flex items-center gap-0.5 text-xs text-gray-500">
              <Clock size={11} />
              {item.readingTime} min
            </span>
          )}
          <span className="text-xs text-gray-600">{timeAgo(item.publishedAt)}</span>
        </div>
      </div>

      <ExternalLink
        size={12}
        className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors mt-1"
      />
    </a>
  );
}
