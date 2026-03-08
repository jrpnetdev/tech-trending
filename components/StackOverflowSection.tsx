'use client';

import { MessageSquareCode } from 'lucide-react';
import type { SectionData, StackOverflowQuestion } from '@/lib/types';
import { StackOverflowCard } from './StackOverflowCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface StackOverflowSectionProps {
  soData: SectionData<StackOverflowQuestion> | null;
  isLoading: boolean;
}

export function StackOverflowSection({ soData, isLoading }: StackOverflowSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gray-700/60 skeleton-pulse" />
          <div className="h-4 w-44 skeleton-pulse rounded" />
        </div>
        <SectionSkeleton count={6} type="news" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      <SectionHeader
        icon={MessageSquareCode}
        title="Stack Overflow Hot Questions"
        source="Stack Exchange API — stackoverflow.com"
        isDemo={soData?.isDemo}
        count={soData?.data.length}
        iconClassName="text-orange-400"
      />

      {soData?.isDemo && soData.error && (
        <div className="mb-3">
          <ErrorMessage message={soData.error} />
        </div>
      )}

      {soData && soData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {soData.data.map((item) => (
            <StackOverflowCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No questions available</p>
      )}
    </div>
  );
}
