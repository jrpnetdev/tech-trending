// ============================================================
// GET /api/products?country=UK|US&timeRange=today|7days
// Returns trending products from Reddit deal communities
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import type { Country, TimeRange } from '@/lib/types';
import { fetchRedditProducts } from '@/lib/api/reddit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = (searchParams.get('country') ?? 'UK').toUpperCase() as Country;
  const timeRange = (searchParams.get('timeRange') ?? 'today') as TimeRange;

  if (!['UK', 'US'].includes(country)) {
    return NextResponse.json({ error: 'Invalid country. Use UK or US.' }, { status: 400 });
  }

  const result = await fetchRedditProducts(country, timeRange);

  return NextResponse.json({
    data: result.data,
    isDemo: result.isDemo,
    error: result.error,
    source: 'Reddit (r/UKPersonalFinance, r/deals)',
    lastUpdated: new Date().toISOString(),
  });
}
