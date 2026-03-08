import { ExternalLink, TrendingUp, TrendingDown, Flame, Sparkles, Minus, MessageSquare } from 'lucide-react';
import type { TrendItem } from '@/lib/types';
import { cn, formatNumber, truncate, getRankBadgeStyle, getCategoryColour } from '@/lib/utils';
import { Badge } from './Badge';

interface TrendCardProps {
  item: TrendItem;
}

function DirectionIcon({ direction }: { direction?: TrendItem['direction'] }) {
  switch (direction) {
    case 'hot':    return <Flame size={12} className="text-orange-400" />;
    case 'up':     return <TrendingUp size={12} className="text-green-400" />;
    case 'down':   return <TrendingDown size={12} className="text-red-400" />;
    case 'new':    return <Sparkles size={12} className="text-amber-400" />;
    default:       return <Minus size={12} className="text-gray-500" />;
  }
}

export function TrendCard({ item }: TrendCardProps) {
  const CardWrapper = item.url ? 'a' : 'div';
  const wrapperProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <CardWrapper
      {...(wrapperProps as Record<string, string>)}
      className={cn(
        'group flex items-start gap-3 p-3 rounded-lg border border-gray-700/40 bg-gray-800/60',
        'card-hover cursor-pointer'
      )}
    >
      {/* Rank badge */}
      <span
        className={cn(
          'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
          getRankBadgeStyle(item.rank)
        )}
      >
        {item.rank}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1.5">
          <DirectionIcon direction={item.direction} />
          <p className="text-sm font-medium text-white leading-tight group-hover:text-indigo-300 transition-colors truncate">
            {item.title}
          </p>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
            {truncate(item.description, 80)}
          </p>
        )}

        {/* Metadata row */}
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {item.subreddit && (
            <span className="text-xs text-gray-500">{item.subreddit}</span>
          )}
          {item.score !== undefined && (
            <span className="text-xs text-gray-500">
              ↑ {formatNumber(item.score)}
            </span>
          )}
          {item.commentCount !== undefined && (
            <span className="flex items-center gap-0.5 text-xs text-gray-500">
              <MessageSquare size={10} />
              {formatNumber(item.commentCount)}
            </span>
          )}
          {item.searchVolume && (
            <span className="text-xs text-gray-400 font-medium">{item.searchVolume}</span>
          )}
          {item.category && (
            <Badge
              variant="ghost"
              size="sm"
              className={cn('text-xs', getCategoryColour(item.category))}
            >
              {item.category}
            </Badge>
          )}
        </div>
      </div>

      {/* External link icon */}
      {item.url && (
        <ExternalLink
          size={12}
          className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors mt-1"
        />
      )}
    </CardWrapper>
  );
}
