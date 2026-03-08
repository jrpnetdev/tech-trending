// ============================================================
// Lobste.rs API Client
// Uses lobste.rs/hottest.json — no auth required
// ============================================================

import type { LobstersStory, TimeRange } from '../types';
import { MOCK_LOBSTERS } from '../mock-data';

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'TechnologyTrends/1.0',
};

interface LobstersItem {
  short_id: string;
  title: string;
  url?: string;
  comments_url?: string;
  score?: number;
  comment_count?: number;
  submitter_user?: { username?: string };
  created_at?: string;
  tags?: string[];
}

export async function fetchLobsters(
  timeRange: TimeRange
): Promise<{ data: LobstersStory[]; isDemo: boolean; error?: string }> {
  // hottest = currently hot stories; newest = most recently submitted
  const endpoint = timeRange === 'today' ? 'hottest' : 'newest';

  try {
    const res = await fetch(
      `https://lobste.rs/${endpoint}.json`,
      { headers: HEADERS, next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return { data: MOCK_LOBSTERS, isDemo: true, error: `Lobste.rs API returned ${res.status}` };
    }

    const text = await res.text();
    if (text.trim().startsWith('<')) {
      return { data: MOCK_LOBSTERS, isDemo: true, error: 'Received HTML instead of JSON' };
    }

    const items = JSON.parse(text) as LobstersItem[];

    if (!Array.isArray(items) || items.length === 0) {
      return { data: MOCK_LOBSTERS, isDemo: true, error: 'No stories returned' };
    }

    const stories: LobstersStory[] = items.slice(0, 10).map((item) => ({
      id: `lb-${item.short_id}`,
      title: item.title,
      url: item.url || item.comments_url || `https://lobste.rs/s/${item.short_id}`,
      score: item.score ?? 0,
      commentCount: item.comment_count ?? 0,
      author: item.submitter_user?.username ?? 'unknown',
      publishedAt: item.created_at ?? new Date().toISOString(),
      tags: item.tags?.slice(0, 4) ?? [],
    }));

    return { data: stories, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Lobsters] Error:', message);
    return { data: MOCK_LOBSTERS, isDemo: true, error: message };
  }
}
