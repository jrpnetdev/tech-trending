import { ExternalLink, TrendingDown } from 'lucide-react';
import type { CratesPackage } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CratesCardProps {
  item: CratesPackage;
}

function formatCount(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function keywordColour(kw: string): string {
  const colours = [
    'text-orange-400 bg-orange-400/10',
    'text-amber-400 bg-amber-400/10',
    'text-yellow-400 bg-yellow-400/10',
    'text-lime-400 bg-lime-400/10',
    'text-cyan-400 bg-cyan-400/10',
    'text-violet-400 bg-violet-400/10',
  ];
  let h = 0;
  for (let i = 0; i < kw.length; i++) h = (h * 31 + kw.charCodeAt(i)) | 0;
  return colours[Math.abs(h) % colours.length];
}

export function CratesCard({ item }: CratesCardProps) {
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
      {/* Recent downloads */}
      <div className="flex-shrink-0 flex flex-col items-center justify-start pt-0.5 w-10 text-center">
        <TrendingDown size={12} className="text-orange-400 rotate-180" />
        <span className="text-xs font-bold text-orange-400 mt-0.5">{formatCount(item.recentDownloads)}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors font-mono truncate">
            {item.name}
          </p>
          {item.version && (
            <span className="text-xs text-gray-600 font-mono flex-shrink-0">v{item.version}</span>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.description}</p>
        )}

        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          {item.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className={cn('text-xs px-1.5 py-0.5 rounded font-mono', keywordColour(kw))}
            >
              {kw}
            </span>
          ))}
          <span className="text-xs text-gray-600 ml-auto">{formatCount(item.totalDownloads)} total</span>
        </div>
      </div>

      <ExternalLink
        size={12}
        className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors mt-1"
      />
    </a>
  );
}
