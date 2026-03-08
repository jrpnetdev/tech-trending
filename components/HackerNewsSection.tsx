'use client';

import { Flame } from 'lucide-react';
import type { SectionData, HackerNewsStory } from '@/lib/types';
import { HackerNewsCard } from './HackerNewsCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface HackerNewsSectionProps {
  hnData: SectionData<HackerNewsStory> | null;
  isLoading: boolean;
}

export function HackerNewsSection({ hnData, isLoading }: HackerNewsSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gray-700/60 skeleton-pulse" />
          <div className="h-4 w-40 skeleton-pulse rounded" />
        </div>
        <SectionSkeleton count={10} type="trend" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      <SectionHeader
        icon={Flame}
        title="Hacker News"
        source="hacker-news.firebaseio.com — top stories"
        isDemo={hnData?.isDemo}
        count={hnData?.data.length}
        iconClassName="text-orange-500"
      />

      {hnData?.isDemo && hnData.error && (
        <div className="mb-3">
          <ErrorMessage message={hnData.error} />
        </div>
      )}

      {hnData && hnData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {hnData.data.map((item) => (
            <HackerNewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No stories available</p>
      )}
    </div>
  );
}
