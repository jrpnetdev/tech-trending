import { ExternalLink, ArrowUp, Tag, MessageSquare } from 'lucide-react';
import type { ProductItem } from '@/lib/types';
import { formatNumber, timeAgo, truncate, cn } from '@/lib/utils';
import { Badge } from './Badge';

interface ProductCardProps {
  item: ProductItem;
}

export function ProductCard({ item }: ProductCardProps) {
  const CardWrapper = item.url ? 'a' : 'div';
  const wrapperProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <CardWrapper
      {...(wrapperProps as Record<string, string>)}
      className={cn(
        'group flex gap-3 p-3 rounded-lg border border-gray-700/40 bg-gray-800/60',
        'card-hover',
        item.url ? 'cursor-pointer' : ''
      )}
    >
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-white leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2 flex-1">
            {item.title}
          </p>
          {item.discount && (
            <Badge variant="success" size="sm" className="flex-shrink-0">
              {item.discount}
            </Badge>
          )}
        </div>

        {/* Price row */}
        {(item.price || item.originalPrice) && (
          <div className="flex items-center gap-2 mt-1">
            <Tag size={11} className="text-green-400" />
            {item.price && (
              <span className="text-sm font-bold text-green-400">{item.price}</span>
            )}
            {item.originalPrice && (
              <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
            )}
          </div>
        )}

        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
            {truncate(item.description, 90)}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="text-xs font-medium text-violet-400">{item.source}</span>
          <span className="flex items-center gap-0.5 text-xs text-gray-500">
            <ArrowUp size={10} />
            {formatNumber(item.score)}
          </span>
          {item.commentCount !== undefined && (
            <span className="flex items-center gap-0.5 text-xs text-gray-500">
              <MessageSquare size={10} />
              {formatNumber(item.commentCount)}
            </span>
          )}
          {item.postedAt && (
            <span className="text-xs text-gray-500">{timeAgo(item.postedAt)}</span>
          )}
          {item.category && (
            <span className="text-xs text-gray-500">{item.category}</span>
          )}
        </div>
      </div>

      {item.url && (
        <ExternalLink
          size={12}
          className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors mt-1"
        />
      )}
    </CardWrapper>
  );
}
