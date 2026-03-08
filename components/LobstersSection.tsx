'use client';

import { Layers } from 'lucide-react';
import type { SectionData, LobstersStory } from '@/lib/types';
import { LobstersCard } from './LobstersCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface LobstersSectionProps {
  lobstersData: SectionData<LobstersStory> | null;
  isLoading: boolean;
}

export function LobstersSection({ lobstersData, isLoading }: LobstersSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gray-700/60 skeleton-pulse" />
          <div className="h-4 w-32 skeleton-pulse rounded" />
        </div>
        <SectionSkeleton count={10} type="trend" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      <SectionHeader
        icon={Layers}
        title="Lobste.rs"
        source="lobste.rs — tech link aggregator"
        isDemo={lobstersData?.isDemo}
        count={lobstersData?.data.length}
        iconClassName="text-teal-400"
      />

      {lobstersData?.isDemo && lobstersData.error && (
        <div className="mb-3">
          <ErrorMessage message={lobstersData.error} />
        </div>
      )}

      {lobstersData && lobstersData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {lobstersData.data.map((item) => (
            <LobstersCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No stories available</p>
      )}
    </div>
  );
}
