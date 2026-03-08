'use client';

import { Box } from 'lucide-react';
import type { SectionData, CratesPackage } from '@/lib/types';
import { CratesCard } from './CratesCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface CratesSectionProps {
  cratesData: SectionData<CratesPackage> | null;
  isLoading: boolean;
}

export function CratesSection({ cratesData, isLoading }: CratesSectionProps) {
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
        icon={Box}
        title="crates.io Trending"
        source="crates.io — Rust package registry"
        isDemo={cratesData?.isDemo}
        count={cratesData?.data.length}
        iconClassName="text-orange-400"
      />

      {cratesData?.isDemo && cratesData.error && (
        <div className="mb-3">
          <ErrorMessage message={cratesData.error} />
        </div>
      )}

      {cratesData && cratesData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {cratesData.data.map((item) => (
            <CratesCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No crate data available</p>
      )}
    </div>
  );
}
