'use client';

import { ShoppingBag } from 'lucide-react';
import type { SectionData, ProductItem } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { SectionHeader } from './SectionHeader';
import { SectionSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface ProductsSectionProps {
  productsData: SectionData<ProductItem> | null;
  isLoading: boolean;
}

export function ProductsSection({ productsData, isLoading }: ProductsSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gray-700/60 skeleton-pulse" />
          <div className="h-4 w-40 skeleton-pulse rounded" />
        </div>
        <SectionSkeleton count={6} type="product" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      <SectionHeader
        icon={ShoppingBag}
        title="Trending Products &amp; Deals"
        source="Reddit (r/HotUKDeals, r/deals)"
        isDemo={productsData?.isDemo}
        count={productsData?.data.length}
        iconClassName="text-pink-400"
      />

      {productsData?.isDemo && productsData.error && (
        <div className="mb-3">
          <ErrorMessage message={productsData.error} />
        </div>
      )}

      {productsData && productsData.data.length > 0 ? (
        <div className="space-y-1.5 stagger-children">
          {productsData.data.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">No product trends available</p>
      )}
    </div>
  );
}
