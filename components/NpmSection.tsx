'use client';

import { Package } from 'lucide-react';
import type { SectionData, NpmPackage } from '@/lib/types';
import { NpmCard } from './NpmCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface NpmSectionProps {
  npmData: SectionData<NpmPackage> | null;
  isLoading: boolean;
}

export function NpmSection({ npmData, isLoading }: NpmSectionProps) {
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
        icon={Package}
        title="npm Downloads"
        source="npmjs.org — weekly downloads"
        isDemo={npmData?.isDemo}
        count={npmData?.data.length}
        iconClassName="text-red-400"
      />

      {npmData?.isDemo && npmData.error && (
        <div className="mb-3">
          <ErrorMessage message={npmData.error} />
        </div>
      )}

      {npmData && npmData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {npmData.data.map((item) => (
            <NpmCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No package data available</p>
      )}
    </div>
  );
}
