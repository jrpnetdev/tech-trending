// ============================================================
// Reddit API Client
// Uses Reddit's public JSON API (no authentication required)
// ============================================================

import type { TrendItem, ProductItem, Country, TimeRange } from '../types';
import {
  MOCK_REDDIT_TRENDS_UK,
  MOCK_REDDIT_TRENDS_US,
  MOCK_PRODUCTS_UK,
  MOCK_PRODUCTS_US,
} from '../mock-data';

const REDDIT_UA = 'TechnologyTrends/1.0 (Technology Trends Dashboard)';

// ─── Subreddit Configuration ──────────────────────────────────

const TREND_SUBREDDITS: Record<Country, string[]> = {
  UK: ['technology', 'artificial', 'MachineLearning', 'webdev', 'programming'],
  US: ['technology', 'artificial', 'MachineLearning', 'webdev', 'programming'],
};

const PRODUCT_SUBREDDITS: Record<Country, string[]> = {
  UK: ['gadgets', 'hardware', 'homelab'],
  US: ['gadgets', 'hardware', 'buildapc'],
};

// ─── Reddit Post Type ─────────────────────────────────────────

interface RedditPost {
  data: {
    id: string;
    title: string;
    selftext?: string;
    url: string;
    permalink: string;
    score: number;
    num_comments: number;
    subreddit: string;
    subreddit_display_name?: string;
    created_utc: number;
    thumbnail?: string;
    link_flair_text?: string;
  };
}

interface RedditListingResponse {
  data?: {
    children?: RedditPost[];
  };
}

async function fetchSubreddit(
  subreddit: string,
  timeParam: 't=day' | 't=week',
  limit = 10
): Promise<RedditPost[]> {
  const url = `https://www.reddit.com/r/${subreddit}/top.json?${timeParam}&limit=${limit}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': REDDIT_UA,
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    next: { revalidate: 300 }, // Cache 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Reddit ${subreddit}: HTTP ${response.status}`);
  }

  const text = await response.text();
  if (text.trim().startsWith('<')) {
    throw new Error(`Reddit ${subreddit}: received HTML instead of JSON (likely blocked)`);
  }

  const data = JSON.parse(text) as RedditListingResponse;
  return data?.data?.children ?? [];
}

function mapPostToTrend(post: RedditPost, rank: number): TrendItem {
  const { id, title, permalink, score, num_comments, subreddit, created_utc } = post.data;
  return {
    id: `reddit-${id}`,
    rank,
    title,
    score,
    commentCount: num_comments,
    url: `https://www.reddit.com${permalink}`,
    source: 'reddit',
    subreddit: `r/${subreddit}`,
    direction: rank <= 3 ? 'hot' : rank <= 6 ? 'up' : 'stable',
    category: 'other',
    description: `${score.toLocaleString()} upvotes • ${num_comments.toLocaleString()} comments`,
  };
}

function mapPostToProduct(post: RedditPost, rank: number): ProductItem {
  const { id, title, selftext, url, permalink, score, num_comments, subreddit, created_utc } = post.data;

  // Try to extract price from title (common in deal subreddits)
  const priceMatch = title.match(/[£$€][\d,.]+(?:\.\d{2})?/g);
  const prices = priceMatch ?? [];

  return {
    id: `reddit-product-${id}`,
    title,
    description: selftext ? selftext.slice(0, 150) : undefined,
    url: url !== 'https://www.reddit.com' + permalink ? url : `https://www.reddit.com${permalink}`,
    price: prices[0],
    originalPrice: prices[1],
    score,
    commentCount: num_comments,
    source: `r/${subreddit}`,
    subreddit,
    postedAt: new Date(created_utc * 1000).toISOString(),
  };
}

// ─── Public API Functions ─────────────────────────────────────

export async function fetchRedditTrends(
  country: Country,
  timeRange: TimeRange
): Promise<{ data: TrendItem[]; isDemo: boolean; error?: string }> {
  const mockData = country === 'UK' ? MOCK_REDDIT_TRENDS_UK : MOCK_REDDIT_TRENDS_US;
  const subreddits = TREND_SUBREDDITS[country];
  const timeParam = timeRange === 'today' ? 't=day' : 't=week';

  try {
    const results = await Promise.allSettled(
      subreddits.map((sr) => fetchSubreddit(sr, timeParam, 5))
    );

    const allPosts: RedditPost[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allPosts.push(...result.value);
      }
    }

    if (allPosts.length === 0) {
      return { data: mockData, isDemo: true, error: 'No Reddit posts returned' };
    }

    // Sort by score descending, de-duplicate by id
    const seen = new Set<string>();
    const sorted = allPosts
      .filter((p) => {
        if (seen.has(p.data.id)) return false;
        seen.add(p.data.id);
        return true;
      })
      .sort((a, b) => b.data.score - a.data.score)
      .slice(0, 10);

    const items = sorted.map((post, idx) => mapPostToTrend(post, idx + 1));
    return { data: items, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[Reddit Trends] Error for ${country}:`, message);
    return { data: mockData, isDemo: true, error: message };
  }
}

export async function fetchRedditProducts(
  country: Country,
  timeRange: TimeRange
): Promise<{ data: ProductItem[]; isDemo: boolean; error?: string }> {
  const mockData = country === 'UK' ? MOCK_PRODUCTS_UK : MOCK_PRODUCTS_US;
  const subreddits = PRODUCT_SUBREDDITS[country];
  const timeParam = timeRange === 'today' ? 't=day' : 't=week';

  try {
    const results = await Promise.allSettled(
      subreddits.map((sr) => fetchSubreddit(sr, timeParam, 10))
    );

    const allPosts: RedditPost[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allPosts.push(...result.value);
      }
    }

    if (allPosts.length === 0) {
      return { data: mockData, isDemo: true, error: 'No Reddit deal posts returned' };
    }

    const seen = new Set<string>();
    const sorted = allPosts
      .filter((p) => {
        if (seen.has(p.data.id)) return false;
        seen.add(p.data.id);
        return true;
      })
      .sort((a, b) => b.data.score - a.data.score)
      .slice(0, 8);

    const items = sorted.map((post, idx) => mapPostToProduct(post, idx + 1));
    return { data: items, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[Reddit Products] Error for ${country}:`, message);
    return { data: mockData, isDemo: true, error: message };
  }
}
