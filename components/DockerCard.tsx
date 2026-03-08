import { ExternalLink, Star, ShieldCheck } from 'lucide-react';
import type { DockerImage } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DockerCardProps {
  item: DockerImage;
}

function formatCount(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function DockerCard({ item }: DockerCardProps) {
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
      {/* Pull count */}
      <div className="flex-shrink-0 flex flex-col items-center justify-start pt-0.5 w-10 text-center">
        <span className="text-[10px] text-blue-400 font-mono leading-none">pulls</span>
        <span className="text-xs font-bold text-blue-400 mt-0.5">{formatCount(item.pullCount)}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors font-mono truncate">
            {item.name}
          </p>
          {item.isOfficial && (
            <ShieldCheck size={12} className="flex-shrink-0 text-blue-400" />
          )}
        </div>

        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.description}</p>
        )}

        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-0.5 text-xs text-gray-500">
            <Star size={10} className="text-yellow-500" />
            {formatCount(item.starCount)}
          </span>
          {item.isOfficial && (
            <span className="text-xs text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded font-mono">
              official
            </span>
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
