import { ExternalLink, MessageSquare, ChevronUp } from 'lucide-react';
import type { HackerNewsStory } from '@/lib/types';
import { timeAgo, cn } from '@/lib/utils';

interface HackerNewsCardProps {
  item: HackerNewsStory;
}

const TYPE_LABEL: Record<string, string> = {
  ask: 'Ask HN',
  show: 'Show HN',
  story: '',
};

export function HackerNewsCard({ item }: HackerNewsCardProps) {
  const typeLabel = TYPE_LABEL[item.type] ?? '';
  const commentUrl = `https://news.ycombinator.com/item?id=${item.id.replace('hn-', '')}`;

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
      {/* Score */}
      <div className="flex-shrink-0 flex flex-col items-center justify-start pt-0.5 w-8 text-center">
        <ChevronUp size={12} className="text-gray-500" />
        <span className={cn(
          'text-xs font-bold',
          item.score >= 300 ? 'text-orange-400' : item.score >= 100 ? 'text-amber-400' : 'text-gray-300'
        )}>
          {item.score}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1.5">
          {typeLabel && (
            <span className="flex-shrink-0 text-xs font-semibold text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded mt-0.5">
              {typeLabel}
            </span>
          )}
          <p className="text-sm font-medium text-white leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2">
            {item.title}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="text-xs text-gray-500">by {item.author}</span>
          <a
            href={commentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-0.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <MessageSquare size={11} />
            {item.commentCount}
          </a>
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
