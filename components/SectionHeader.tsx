import type { LucideIcon } from 'lucide-react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  source?: string;
  isDemo?: boolean;
  isDemoAll?: boolean;
  count?: number;
  iconClassName?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  source,
  isDemo,
  count,
  iconClassName = 'text-indigo-400',
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-700/60 flex items-center justify-center">
          <Icon size={14} className={iconClassName} />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide leading-tight">
            {title}
          </h2>
          {source && (
            <p className="text-xs text-gray-500 leading-tight mt-0.5">{source}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
        {count !== undefined && (
          <span className="text-xs text-gray-500">{count} items</span>
        )}
        {isDemo && (
          <Badge variant="demo" size="sm">
            DEMO
          </Badge>
        )}
      </div>
    </div>
  );
}
