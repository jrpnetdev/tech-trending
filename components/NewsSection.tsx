'use client';

import { Newspaper } from 'lucide-react';
import type { SectionData, NewsItem } from '@/lib/types';
import { NewsCard } from './NewsCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface NewsSectionProps {
  newsData: SectionData<NewsItem> | null;
  isLoading: boolean;
}

export function NewsSection({ newsData, isLoading }: NewsSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gray-700/60 skeleton-pulse" />
          <div className="h-4 w-36 skeleton-pulse rounded" />
        </div>
        <SectionSkeleton count={6} type="news" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      <SectionHeader
        icon={Newspaper}
        title="Top Headlines"
        source="NewsAPI"
        isDemo={newsData?.isDemo}
        count={newsData?.data.length}
        iconClassName="text-blue-400"
      />

      {newsData?.isDemo && newsData.error && (
        <div className="mb-3">
          <ErrorMessage message={newsData.error} />
        </div>
      )}

      {newsData && newsData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {newsData.data.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No news articles available</p>
      )}
    </div>
  );
}
