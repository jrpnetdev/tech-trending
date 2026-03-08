'use client';

import { TrendingUp, Hash } from 'lucide-react';
import type { SectionData, TrendItem } from '@/lib/types';
import { TrendCard } from './TrendCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';
import { TrendsChart } from './TrendsChart';

interface TrendsSectionProps {
  googleTrends?: SectionData<TrendItem> | null;
  redditTrends?: SectionData<TrendItem> | null;
  isLoading: boolean;
  showChart?: boolean;
}

function TrendsList({
  sectionData,
  icon,
  title,
  source,
  iconClass,
}: {
  sectionData: SectionData<TrendItem> | null;
  icon: typeof TrendingUp;
  title: string;
  source: string;
  iconClass?: string;
}) {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      <SectionHeader
        icon={icon}
        title={title}
        source={source}
        isDemo={sectionData?.isDemo}
        count={sectionData?.data.length}
        iconClassName={iconClass}
      />

      {sectionData?.isDemo && sectionData.error && (
        <div className="mb-3">
          <ErrorMessage message={sectionData.error} />
        </div>
      )}

      {sectionData && sectionData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {sectionData.data.map((item) => (
            <TrendCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">No trend data available</p>
      )}
    </div>
  );
}

export function TrendsSection({ googleTrends, redditTrends, isLoading, showChart = true }: TrendsSectionProps) {
  const showGithub = googleTrends !== undefined;
  const showReddit = redditTrends !== undefined;
  const panelCount = (showGithub ? 1 : 0) + (showReddit ? 1 : 0);

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 ${panelCount > 1 ? 'lg:grid-cols-2' : ''} gap-4`}>
        {Array.from({ length: panelCount }).map((_, i) => (
          <div key={i} className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gray-700/60 skeleton-pulse" />
              <div className="h-4 w-32 skeleton-pulse rounded" />
            </div>
            <SectionSkeleton count={8} type="trend" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className={`grid grid-cols-1 ${panelCount > 1 ? 'lg:grid-cols-2' : ''} gap-4`}>
        {showGithub && (
          <TrendsList
            sectionData={googleTrends}
            icon={TrendingUp}
            title="GitHub Trending"
            source="GitHub — trending repositories"
            iconClass="text-green-400"
          />
        )}
        {showReddit && (
          <TrendsList
            sectionData={redditTrends}
            icon={Hash}
            title="Reddit Trending"
            source="Reddit — tech & AI community"
            iconClass="text-orange-400"
          />
        )}
      </div>

      {/* Interest over time chart — only when github data is present and not suppressed */}
      {showChart && showGithub && googleTrends && googleTrends.data.length > 0 && (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-700/60 flex items-center justify-center">
              <TrendingUp size={14} className="text-green-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wide">
                Star Activity Over Time
              </h2>
              <p className="text-xs text-gray-500">Simulated relative interest (0–100)</p>
            </div>
          </div>
          <TrendsChart trends={googleTrends.data} />
        </div>
      )}
    </div>
  );
}
