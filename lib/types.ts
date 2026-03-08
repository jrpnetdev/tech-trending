// ============================================================
// ET Aggregator — Core Type Definitions
// ============================================================

export type Country = 'UK' | 'US';
export type TimeRange = 'today' | '7days';
export type TrendSource = 'google' | 'github' | 'reddit' | 'twitter' | 'glimpse';
export type TrendDirection = 'up' | 'down' | 'new' | 'hot' | 'stable';
export type TrendCategory =
  | 'news'
  | 'entertainment'
  | 'sports'
  | 'technology'
  | 'business'
  | 'health'
  | 'politics'
  | 'science'
  | 'lifestyle'
  | 'other';

// --- Trend Items (Google Trends / Reddit) ---

export interface TrendItem {
  id: string;
  rank: number;
  title: string;
  description?: string;
  searchVolume?: string;   // e.g. "2M+" from Google Trends
  score?: number;          // Reddit upvotes
  commentCount?: number;
  relatedTopics?: string[];
  url?: string;
  source: TrendSource;
  category?: TrendCategory;
  direction?: TrendDirection;
  subreddit?: string;      // for Reddit items
  imageUrl?: string;
}

// --- News Items ---

export interface NewsItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  source: string;
  author?: string;
  publishedAt: string;
  imageUrl?: string;
  category?: TrendCategory;
}

// --- Product Items ---

export interface ProductItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  score: number;           // Reddit upvotes = community endorsement
  commentCount?: number;
  source: string;          // e.g. "r/HotUKDeals"
  subreddit?: string;
  category?: string;
  imageUrl?: string;
  postedAt?: string;
}

// --- Stack Overflow Questions ---

export interface StackOverflowQuestion {
  id: string;
  title: string;
  url: string;
  score: number;
  answerCount: number;
  viewCount: number;
  isAnswered: boolean;
  tags: string[];
  askedAt: string;        // ISO timestamp
  owner?: string;         // display name
}

// --- YouTube Videos ---

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl?: string;
  viewCount?: string;
  likeCount?: string;
  url: string;
  publishedAt: string;
  categoryId?: string;
  categoryName?: string;
}

// --- Hacker News Stories ---

export interface HackerNewsStory {
  id: string;
  title: string;
  url: string;
  score: number;
  commentCount: number;
  author: string;
  publishedAt: string;
  type: string;
}

// --- Dev.to Articles ---

export interface DevToArticle {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags: string[];
  reactions: number;
  commentCount: number;
  readingTime?: number;
  coverImage?: string;
  author: string;
  publishedAt: string;
}

// --- npm Packages ---

export interface NpmPackage {
  id: string;
  name: string;
  description?: string;
  weeklyDownloads: number;
  version?: string;
  keywords: string[];
  url: string;
  publishedAt?: string;
}

// --- crates.io Packages ---

export interface CratesPackage {
  id: string;
  name: string;
  description?: string;
  recentDownloads: number;
  totalDownloads: number;
  version?: string;
  keywords: string[];
  url: string;
  updatedAt: string;
}

// --- Lobste.rs Stories ---

export interface LobstersStory {
  id: string;
  title: string;
  url: string;
  score: number;
  commentCount: number;
  author: string;
  publishedAt: string;
  tags: string[];
}

// --- Docker Hub Images ---

export interface DockerImage {
  id: string;
  name: string;
  description?: string;
  pullCount: number;
  starCount: number;
  isOfficial: boolean;
  url: string;
  updatedAt?: string;
}

// --- Section Data Wrapper ---
// Wraps any data type with metadata about the fetch

export interface SectionData<T> {
  data: T[];
  error?: string;
  isDemo: boolean;        // true when showing fallback mock data
  source?: string;        // human-readable data source label
  lastUpdated: string;    // ISO timestamp
}

// --- Per-Country Dashboard Data ---

export interface CountryData {
  googleTrends: SectionData<TrendItem>;
  redditTrends: SectionData<TrendItem>;
  news: SectionData<NewsItem>;
  products: SectionData<ProductItem>;
  youtube: SectionData<YouTubeVideo>;
}

// --- Full Dashboard API Response ---

export interface DashboardApiResponse {
  country: Country;
  timeRange: TimeRange;
  data: CountryData;
  fetchedAt: string;
}

// --- API Route Query Params ---

export interface TrendsQueryParams {
  country: Country;
  timeRange: TimeRange;
}

// --- Recharts data shape for trend chart ---

export interface TrendChartPoint {
  name: string;   // search term / topic
  interest: number; // 0-100 interest score
  date?: string;
}
