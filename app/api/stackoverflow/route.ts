// ============================================================
// GET /api/stackoverflow?timeRange=today|7days
// Returns hot/trending Stack Overflow questions
// Country param accepted but data is global (SO has no geo-filter)
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import type { TimeRange } from '@/lib/types';
import { fetchStackOverflow } from '@/lib/api/stackoverflow';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const timeRange = (searchParams.get('timeRange') ?? 'today') as TimeRange;

  if (!['today', '7days'].includes(timeRange)) {
    return NextResponse.json({ error: 'Invalid timeRange. Use today or 7days.' }, { status: 400 });
  }

  const result = await fetchStackOverflow(timeRange);

  return NextResponse.json({
    data: result.data,
    isDemo: result.isDemo,
    error: result.error,
    source: 'Stack Overflow',
    lastUpdated: new Date().toISOString(),
  });
}
