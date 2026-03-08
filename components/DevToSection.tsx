'use client';

import { BookOpen } from 'lucide-react';
import type { SectionData, DevToArticle } from '@/lib/types';
import { DevToCard } from './DevToCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface DevToSectionProps {
  devtoData: SectionData<DevToArticle> | null;
  isLoading: boolean;
}

export function DevToSection({ devtoData, isLoading }: DevToSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gray-700/60 skeleton-pulse" />
          <div className="h-4 w-36 skeleton-pulse rounded" />
        </div>
        <SectionSkeleton count={10} type="trend" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      <SectionHeader
        icon={BookOpen}
        title="Dev.to Top Articles"
        source="dev.to — developer community"
        isDemo={devtoData?.isDemo}
        count={devtoData?.data.length}
        iconClassName="text-indigo-400"
      />

      {devtoData?.isDemo && devtoData.error && (
        <div className="mb-3">
          <ErrorMessage message={devtoData.error} />
        </div>
      )}

      {devtoData && devtoData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {devtoData.data.map((item) => (
            <DevToCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No articles available</p>
      )}
    </div>
  );
}
