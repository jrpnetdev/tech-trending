// ============================================================
// GitHub Trending Client
// Uses GitHub Search API (no auth required — 60 req/hr)
// Optional: set GITHUB_TOKEN for 5,000 req/hr
// ============================================================

import type { TrendItem, Country, TimeRange, TrendCategory } from '../types';
import { MOCK_GITHUB_TRENDS_UK, MOCK_GITHUB_TRENDS_US } from '../mock-data';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BASE_URL = 'https://api.github.com/search/repositories';

interface GitHubRepo {
  id: number;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  created_at: string;
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubRepo[];
  message?: string; // present on error
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k ⭐`;
  return `${n} ⭐`;
}

function mapLanguageToCategory(language: string | null, topics: string[]): TrendCategory {
  const all = [language ?? '', ...topics].map((s) => s.toLowerCase()).join(' ');
  if (/machine.?learning|ai|llm|neural|deep.?learn|nlp|gpt|diffusion/.test(all)) return 'technology';
  if (/covid|health|medical|drug|clinical|bio/.test(all)) return 'health';
  if (/finance|stock|trading|crypto|blockchain|defi/.test(all)) return 'business';
  if (/space|astronomy|physics|science|research/.test(all)) return 'science';
  if (/game|unity|godot|unreal|gaming/.test(all)) return 'entertainment';
  if (/typescript|javascript|python|rust|go|swift|java|kotlin|c\+\+|react|vue|svelte/.test(all)) return 'technology';
  return 'technology';
}

function getDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

export async function fetchGithubTrending(
  country: Country,
  timeRange: TimeRange
): Promise<{ data: TrendItem[]; isDemo: boolean; error?: string }> {
  const mockData = country === 'UK' ? MOCK_GITHUB_TRENDS_UK : MOCK_GITHUB_TRENDS_US;

  try {
    const since = timeRange === 'today' ? getDateString(1) : getDateString(7);
    const url = `${BASE_URL}?q=created:>${since}&sort=stars&order=desc&per_page=10`;

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 300 },
    });

    const data = (await response.json()) as GitHubSearchResponse;

    if (!response.ok || !data.items) {
      const errorMsg = data.message ?? `GitHub API returned ${response.status}`;
      console.error('[GitHub Trending] Error:', errorMsg);
      return { data: mockData, isDemo: true, error: errorMsg };
    }

    if (data.items.length === 0) {
      return { data: mockData, isDemo: true, error: 'No trending repositories returned' };
    }

    const items: TrendItem[] = data.items.slice(0, 10).map((repo, idx) => ({
      id: `github-${repo.id}`,
      rank: idx + 1,
      title: repo.full_name,
      description: repo.description ?? undefined,
      url: repo.html_url,
      score: repo.stargazers_count,
      commentCount: repo.forks_count,
      searchVolume: formatStars(repo.stargazers_count),
      source: 'github' as const,
      category: mapLanguageToCategory(repo.language, repo.topics ?? []),
      direction: idx < 3 ? 'hot' : idx < 6 ? 'up' : 'new',
      subreddit: repo.language ?? undefined, // reuse subreddit slot to show language
    }));

    return { data: items, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[GitHub Trending] Error for ${country}:`, message);
    return { data: mockData, isDemo: true, error: message };
  }
}
