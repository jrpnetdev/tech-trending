import { ExternalLink, Download } from 'lucide-react';
import type { NpmPackage } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NpmCardProps {
  item: NpmPackage;
}

function formatDownloads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function keywordColour(kw: string): string {
  const colours = [
    'text-red-400 bg-red-400/10',
    'text-yellow-400 bg-yellow-400/10',
    'text-green-400 bg-green-400/10',
    'text-blue-400 bg-blue-400/10',
    'text-purple-400 bg-purple-400/10',
    'text-pink-400 bg-pink-400/10',
  ];
  let h = 0;
  for (let i = 0; i < kw.length; i++) h = (h * 31 + kw.charCodeAt(i)) | 0;
  return colours[Math.abs(h) % colours.length];
}

export function NpmCard({ item }: NpmCardProps) {
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
      {/* Downloads */}
      <div className="flex-shrink-0 flex flex-col items-center justify-start pt-0.5 w-10 text-center">
        <Download size={12} className="text-red-400" />
        <span className="text-xs font-bold text-red-400 mt-0.5">{formatDownloads(item.weeklyDownloads)}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-semibold text-white group-hover:text-red-300 transition-colors font-mono truncate">
            {item.name}
          </p>
          {item.version && (
            <span className="text-xs text-gray-600 font-mono flex-shrink-0">v{item.version}</span>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.description}</p>
        )}

        {item.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.keywords.slice(0, 3).map((kw) => (
              <span
                key={kw}
                className={cn('text-xs px-1.5 py-0.5 rounded font-mono', keywordColour(kw))}
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      <ExternalLink
        size={12}
        className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors mt-1"
      />
    </a>
  );
}
