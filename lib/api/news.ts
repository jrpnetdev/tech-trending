// ============================================================
// NewsAPI Client
// Requires NEWS_API_KEY environment variable
// Free tier: 100 requests/day — https://newsapi.org
// ============================================================

import type { NewsItem, Country, TimeRange } from '../types';
import { MOCK_NEWS_UK, MOCK_NEWS_US } from '../mock-data';
import { getCountryNewsCode, getSevenDaysAgo, getYesterdayFormatted, getTodayFormatted } from '../utils';

interface NewsApiArticle {
  source?: { id?: string | null; name?: string };
  author?: string | null;
  title?: string;
  description?: string | null;
  url?: string;
  urlToImage?: string | null;
  publishedAt?: string;
  content?: string | null;
}

interface NewsApiResponse {
  status: string;
  totalResults?: number;
  articles?: NewsApiArticle[];
  message?: string;
  code?: string;
}

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

function mapArticleToNewsItem(article: NewsApiArticle, idx: number): NewsItem {
  return {
    id: `news-${idx}-${Date.now()}`,
    title: article.title ?? 'Untitled',
    description: article.description ?? undefined,
    url: article.url ?? '#',
    source: article.source?.name ?? 'Unknown',
    author: article.author ?? undefined,
    publishedAt: article.publishedAt ?? new Date().toISOString(),
    imageUrl: article.urlToImage ?? undefined,
  };
}

export async function fetchNews(
  country: Country,
  timeRange: TimeRange
): Promise<{ data: NewsItem[]; isDemo: boolean; error?: string }> {
  const mockData = country === 'UK' ? MOCK_NEWS_UK : MOCK_NEWS_US;

  if (!NEWS_API_KEY) {
    return { data: mockData, isDemo: true, error: 'NEWS_API_KEY not configured' };
  }

  try {
    const buildEverythingUrl = (fromDate: string, toDate: string, sortBy: 'publishedAt' | 'popularity' = 'publishedAt', pageSize = 10) => {
      const language = 'en';
      const techTopics = '(AI OR "artificial intelligence" OR "machine learning" OR "web development" OR programming OR cybersecurity OR "open source" OR software OR startup OR semiconductor OR "large language model" OR LLM OR "neural network" OR "deep learning" OR "cloud computing" OR "quantum computing")';
      const q = `${techTopics}`;
      return `${BASE_URL}/everything?q=${encodeURIComponent(q)}&language=${language}&from=${fromDate}&to=${toDate}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
    };

    const fetchArticles = async (fetchUrl: string) => {
      const response = await fetch(fetchUrl, {
        headers: { 'User-Agent': 'ET-Aggregator/1.0' },
        next: { revalidate: 300 },
      });
      return (await response.json()) as NewsApiResponse;
    };

    let data: NewsApiResponse;
    let pickRandom = false;

    if (timeRange === 'today') {
      // Try top-headlines with technology category first, fall back to everything endpoint
      const countryCode = getCountryNewsCode(country);
      data = await fetchArticles(`${BASE_URL}/top-headlines?country=${countryCode}&category=technology&pageSize=10&apiKey=${NEWS_API_KEY}`);

      if (data.status === 'ok' && data.articles?.length === 0) {
        console.warn(`[NewsAPI] top-headlines returned 0 results for ${country}, falling back to everything endpoint`);
        data = await fetchArticles(buildEverythingUrl(getYesterdayFormatted(), getTodayFormatted(), 'publishedAt'));
        if (data.status === 'ok' && data.articles?.length === 0) {
          data = await fetchArticles(buildEverythingUrl(getSevenDaysAgo(), getTodayFormatted(), 'publishedAt'));
        }
      }
    } else {
      // Fetch 100 articles from 7 days ago up to yesterday (excludes last 24h)
      // then randomly sample 10 so results span the week
      data = await fetchArticles(buildEverythingUrl(getSevenDaysAgo(), getYesterdayFormatted(), 'publishedAt', 100));
      pickRandom = true;
    }

    if (data.status !== 'ok' || !data.articles) {
      const errorMsg = data.message ?? `NewsAPI returned status: ${data.status}`;
      console.error('[NewsAPI] Error:', errorMsg);
      return { data: mockData, isDemo: true, error: errorMsg };
    }

    // Filter out removed articles and articles with no title
    const filtered = data.articles.filter(
      (a) => a.title && a.title !== '[Removed]' && a.url
    );

    if (filtered.length === 0) {
      return { data: mockData, isDemo: true, error: 'No valid articles returned' };
    }

    // For 7-day view: randomly sample from the full pool so results span the week
    const selected = pickRandom && filtered.length > 10
      ? filtered.sort(() => Math.random() - 0.5).slice(0, 10)
      : filtered.slice(0, 10);

    const items = selected.map(mapArticleToNewsItem);
    return { data: items, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[NewsAPI] Error for ${country}:`, message);
    return { data: mockData, isDemo: true, error: message };
  }
}
