// ============================================================
// Stack Overflow API Client
// Uses Stack Exchange API v2.3 (free, no key required)
// Free tier: 300 req/day (no key) | 10,000 req/day (with key)
// Optional key: set STACKOVERFLOW_KEY in .env.local
// Get a free key at: https://stackapps.com/apps/oauth/register
// ============================================================

import type { StackOverflowQuestion, TimeRange } from '../types';
import { MOCK_STACKOVERFLOW } from '../mock-data';

const STACKOVERFLOW_KEY = process.env.STACKOVERFLOW_KEY;
const BASE_URL = 'https://api.stackexchange.com/2.3';

interface SOApiQuestion {
  question_id: number;
  title: string;
  link: string;
  score: number;
  answer_count: number;
  view_count: number;
  is_answered: boolean;
  tags: string[];
  creation_date: number; // Unix timestamp
  owner?: { display_name?: string };
}

interface SOApiResponse {
  items?: SOApiQuestion[];
  error_message?: string;
  quota_remaining?: number;
}

export async function fetchStackOverflow(
  timeRange: TimeRange
): Promise<{ data: StackOverflowQuestion[]; isDemo: boolean; error?: string }> {
  try {
    // "hot" = Stack Overflow's own trending algorithm (active + high vote velocity)
    // "week" sort with fromdate gives best-voted new questions over the past week
    const sort = timeRange === 'today' ? 'hot' : 'votes';
    const params = new URLSearchParams({
      order: 'desc',
      sort,
      site: 'stackoverflow',
      pagesize: '10',
      ...(STACKOVERFLOW_KEY ? { key: STACKOVERFLOW_KEY } : {}),
    });

    if (timeRange === '7days') {
      const sevenDaysAgo = Math.floor((Date.now() - 7 * 86400000) / 1000);
      params.set('fromdate', String(sevenDaysAgo));
    }

    const response = await fetch(`${BASE_URL}/questions?${params}`, {
      next: { revalidate: 300 },
    });

    const data = (await response.json()) as SOApiResponse;

    if (!response.ok || data.error_message) {
      const errorMsg = data.error_message ?? `Stack Overflow API returned ${response.status}`;
      console.error('[StackOverflow] Error:', errorMsg);
      return { data: MOCK_STACKOVERFLOW, isDemo: true, error: errorMsg };
    }

    if (!data.items?.length) {
      return { data: MOCK_STACKOVERFLOW, isDemo: true, error: 'No questions returned' };
    }

    if (data.quota_remaining !== undefined && data.quota_remaining < 10) {
      console.warn('[StackOverflow] Low quota remaining:', data.quota_remaining);
    }

    const items: StackOverflowQuestion[] = data.items.slice(0, 10).map((q) => ({
      id: `so-${q.question_id}`,
      title: q.title,
      url: q.link,
      score: q.score,
      answerCount: q.answer_count,
      viewCount: q.view_count,
      isAnswered: q.is_answered,
      tags: q.tags.slice(0, 4),
      askedAt: new Date(q.creation_date * 1000).toISOString(),
      owner: q.owner?.display_name,
    }));

    return { data: items, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[StackOverflow] Error:', message);
    return { data: MOCK_STACKOVERFLOW, isDemo: true, error: message };
  }
}
