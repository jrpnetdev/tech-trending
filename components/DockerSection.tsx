'use client';

import { Container } from 'lucide-react';
import type { SectionData, DockerImage } from '@/lib/types';
import { DockerCard } from './DockerCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface DockerSectionProps {
  dockerData: SectionData<DockerImage> | null;
  isLoading: boolean;
}

export function DockerSection({ dockerData, isLoading }: DockerSectionProps) {
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
        icon={Container}
        title="Docker Hub"
        source="hub.docker.com — top images by pulls"
        isDemo={dockerData?.isDemo}
        count={dockerData?.data.length}
        iconClassName="text-blue-400"
      />

      {dockerData?.isDemo && dockerData.error && (
        <div className="mb-3">
          <ErrorMessage message={dockerData.error} />
        </div>
      )}

      {dockerData && dockerData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {dockerData.data.map((item) => (
            <DockerCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No image data available</p>
      )}
    </div>
  );
}
