import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md skeleton-pulse',
        className
      )}
    />
  );
}

export function TrendCardSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-700/50">
      <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-5 w-12 rounded-full" />
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="p-3 rounded-lg border border-gray-700/50 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="p-3 rounded-lg border border-gray-700/50 space-y-2">
      <div className="flex justify-between items-start gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-3 w-full" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function YouTubeCardSkeleton() {
  return (
    <div className="flex gap-3 p-3 rounded-lg border border-gray-700/50">
      <Skeleton className="w-24 h-14 rounded flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export function SectionSkeleton({ count = 5, type = 'trend' }: { count?: number; type?: 'trend' | 'news' | 'product' | 'youtube' }) {
  const SkeletonComponent =
    type === 'news' ? NewsCardSkeleton :
    type === 'product' ? ProductCardSkeleton :
    type === 'youtube' ? YouTubeCardSkeleton :
    TrendCardSkeleton;

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
