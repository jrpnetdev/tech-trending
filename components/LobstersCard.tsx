import { ExternalLink, MessageSquare, ChevronUp } from 'lucide-react';
import type { LobstersStory } from '@/lib/types';
import { timeAgo, cn } from '@/lib/utils';

interface LobstersCardProps {
  item: LobstersStory;
}

function tagColour(tag: string): string {
  const colours = [
    'text-teal-400 bg-teal-400/10',
    'text-sky-400 bg-sky-400/10',
    'text-lime-400 bg-lime-400/10',
    'text-fuchsia-400 bg-fuchsia-400/10',
    'text-rose-400 bg-rose-400/10',
    'text-amber-400 bg-amber-400/10',
  ];
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) | 0;
  return colours[Math.abs(h) % colours.length];
}

export function LobstersCard({ item }: LobstersCardProps) {
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
        <ChevronUp size={12} className="text-teal-400" />
        <span className="text-xs font-bold text-teal-400 mt-0.5">{item.score}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white leading-tight group-hover:text-teal-300 transition-colors line-clamp-2">
          {item.title}
        </p>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={cn('text-xs px-1.5 py-0.5 rounded font-mono', tagColour(tag))}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-xs text-gray-500">{item.author}</span>
          <span className="flex items-center gap-0.5 text-xs text-gray-500">
            <MessageSquare size={11} />
            {item.commentCount}
          </span>
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
