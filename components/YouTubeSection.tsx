'use client';

import { Youtube } from 'lucide-react';
import type { SectionData, YouTubeVideo } from '@/lib/types';
import { YouTubeCard } from './YouTubeCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface YouTubeSectionProps {
  youtubeData: SectionData<YouTubeVideo> | null;
  isLoading: boolean;
}

export function YouTubeSection({ youtubeData, isLoading }: YouTubeSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gray-700/60 skeleton-pulse" />
          <div className="h-4 w-36 skeleton-pulse rounded" />
        </div>
        <SectionSkeleton count={6} type="youtube" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      <SectionHeader
        icon={Youtube}
        title="YouTube Trending"
        source="YouTube Data API v3"
        isDemo={youtubeData?.isDemo}
        count={youtubeData?.data.length}
        iconClassName="text-red-400"
      />

      {youtubeData?.isDemo && youtubeData.error && (
        <div className="mb-3">
          <ErrorMessage message={youtubeData.error} />
        </div>
      )}

      {youtubeData && youtubeData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {youtubeData.data.map((video, idx) => (
            <YouTubeCard key={video.id} video={video} rank={idx + 1} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No YouTube trending data available</p>
      )}
    </div>
  );
}
