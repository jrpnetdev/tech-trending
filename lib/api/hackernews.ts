// ============================================================
// Hacker News API Client
// Uses hacker-news.firebaseio.com — no auth, no rate limits
// ============================================================

import type { HackerNewsStory, TimeRange } from '../types';
import { MOCK_HACKERNEWS } from '../mock-data';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

interface HNItem {
  id: number;
  title?: string;
  url?: string;
  score?: number;
  descendants?: number; // comment count
  by?: string;
  time?: number; // Unix timestamp
  type?: string;
  dead?: boolean;
  deleted?: boolean;
}

async function fetchItem(id: number): Promise<HNItem | null> {
  try {
    const response = await fetch(`${BASE_URL}/item/${id}.json`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    return (await response.json()) as HNItem;
  } catch {
    return null;
  }
}

export async function fetchHackerNews(
  timeRange: TimeRange
): Promise<{ data: HackerNewsStory[]; isDemo: boolean; error?: string }> {
  try {
    // topstories = current front page, beststories = all-time high-voted recent
    const endpoint = timeRange === 'today' ? 'topstories' : 'beststories';
    const listRes = await fetch(`${BASE_URL}/${endpoint}.json`, {
      next: { revalidate: 300 },
    });

    if (!listRes.ok) {
      return { data: MOCK_HACKERNEWS, isDemo: true, error: `HN API returned ${listRes.status}` };
    }

    const ids = (await listRes.json()) as number[];
    if (!Array.isArray(ids) || ids.length === 0) {
      return { data: MOCK_HACKERNEWS, isDemo: true, error: 'No story IDs returned' };
    }

    // Fetch top 12 in parallel to ensure we get 10 after filtering dead/deleted
    const items = await Promise.all(ids.slice(0, 12).map(fetchItem));

    const stories: HackerNewsStory[] = items
      .filter((item): item is HNItem =>
        item !== null &&
        !item.dead &&
        !item.deleted &&
        !!item.title &&
        item.type !== 'job'
      )
      .slice(0, 10)
      .map((item) => ({
        id: `hn-${item.id}`,
        title: item.title!,
        url: item.url ?? `https://news.ycombinator.com/item?id=${item.id}`,
        score: item.score ?? 0,
        commentCount: item.descendants ?? 0,
        author: item.by ?? 'unknown',
        publishedAt: new Date((item.time ?? 0) * 1000).toISOString(),
        type: item.type ?? 'story',
      }));

    if (stories.length === 0) {
      return { data: MOCK_HACKERNEWS, isDemo: true, error: 'No valid stories returned' };
    }

    return { data: stories, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[HackerNews] Error:', message);
    return { data: MOCK_HACKERNEWS, isDemo: true, error: message };
  }
}
