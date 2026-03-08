# CLAUDE.md — Technology Trends Dashboard

## Project Overview

A full-stack Next.js dashboard that aggregates technology trends in real-time from GitHub, Hacker News, Dev.to, npm, crates.io, Lobste.rs, Docker Hub, Stack Overflow, NewsAPI, YouTube, and Reddit — with a **Global** tab (default) and separate **UK** / **US** country tabs.

## Tech Stack

- **Next.js 14** (App Router) — framework, API routes, SSR
- **React 18 / TypeScript 5** — UI and type safety
- **Tailwind CSS 3.4** — styling (deep navy dark theme)
- **Recharts** — interest-over-time trend chart
- **date-fns** — date formatting and arithmetic
- **GitHub Search API** — no package needed, direct fetch to `api.github.com`

## Commands

```bash
npm run dev       # Dev server → http://localhost:3000
npm run build     # Production build
npm start         # Production server
npm run lint      # ESLint
```

## Project Structure

```
app/
  layout.tsx              # Root HTML layout
  page.tsx                # Entry point → renders Dashboard
  globals.css             # Global styles
  api/
    trends/route.ts       # GitHub Trending + Reddit
    news/route.ts         # NewsAPI headlines
    youtube/route.ts      # YouTube trending videos (supports timeRange)
    stackoverflow/route.ts # Stack Exchange hot questions
    hackernews/route.ts   # Hacker News top/best stories
    devto/route.ts        # Dev.to top articles
    npm/route.ts          # npm weekly download counts
    crates/route.ts       # crates.io trending Rust packages
    lobsters/route.ts     # Lobste.rs hottest tech stories
    docker/route.ts       # Docker Hub top images by pull count

components/
  Dashboard.tsx           # Root — state, fetching, layout
  Header.tsx              # Sticky header with country/time controls
  TrendsSection.tsx       # GitHub + Reddit trends + chart
  NewsSection.tsx         # News headlines
  YouTubeSection.tsx      # YouTube trending videos
  StackOverflowSection.tsx # Stack Overflow hot questions
  HackerNewsSection.tsx   # Hacker News top stories
  DevToSection.tsx        # Dev.to top articles
  NpmSection.tsx          # npm weekly download rankings
  CratesSection.tsx       # crates.io trending Rust packages
  LobstersSection.tsx     # Lobste.rs hottest tech stories
  DockerSection.tsx       # Docker Hub top images
  NewsCard.tsx            # Individual news article card
  YouTubeCard.tsx         # Individual YouTube video card
  TrendCard.tsx           # Individual trend list item
  StackOverflowCard.tsx   # Individual SO question card (vote score, tags, answered)
  HackerNewsCard.tsx      # Individual HN story card
  DevToCard.tsx           # Individual Dev.to article card
  NpmCard.tsx             # Individual npm package card
  CratesCard.tsx          # Individual crates.io package card
  LobstersCard.tsx        # Individual Lobste.rs story card
  DockerCard.tsx          # Individual Docker Hub image card
  TrendsChart.tsx         # Recharts chart
  SectionHeader.tsx       # Reusable section header with DEMO badge
  Badge.tsx               # Coloured status badge
  LoadingSkeleton.tsx     # Skeleton placeholders
  ErrorMessage.tsx        # Error display

lib/
  types.ts                # Shared TypeScript types (NewsItem, Country, TimeRange, NpmPackage, CratesPackage, etc.)
  utils.ts                # Helpers: cn(), date formatters, country code mapping
  mock-data.ts            # Fallback demo data for all sections
  api/
    news.ts               # NewsAPI client — with UK top-headlines fallback logic
    youtube.ts            # YouTube Data API v3 client (today=mostPopular, 7days=search+detail)
    reddit.ts             # Reddit client (trends + products)
    github-trending.ts    # GitHub Search API client (replaces defunct google-trends-api)
    stackoverflow.ts      # Stack Exchange API v2.3 client (hot questions, no auth required)
    hackernews.ts         # HN Firebase API client (topstories/beststories)
    devto.ts              # Dev.to public API client (top articles by time range)
    npm.ts                # npm Registry + Downloads API (curated package list)
    crates.ts             # crates.io API v1 (sort by recent-downloads or downloads)
    lobsters.ts           # Lobste.rs JSON API (hottest/newest)
    docker.ts             # Docker Hub v2 API (official library images)
```

## Environment Variables

Copy `.env.local.example` → `.env.local` and fill in keys. App works without any keys (shows DEMO data).

| Variable | Source | Required |
|---|---|---|
| `NEWS_API_KEY` | [newsapi.org](https://newsapi.org) — free | For live news |
| `YOUTUBE_API_KEY` | [Google Cloud Console](https://console.cloud.google.com) — free | For live YouTube |
| `TWITTER_BEARER_TOKEN` | [developer.twitter.com](https://developer.twitter.com) — $100/mo | Optional |
| `GLIMPSE_API_KEY` | [meetglimpse.com](https://meetglimpse.com) — paid B2B | Optional |
| `STACKOVERFLOW_KEY` | [stackapps.com](https://stackapps.com/apps/oauth/register) — free | Optional (10k req/day vs 300/day) |
| `CACHE_TTL` | — | Default: 300 (seconds) |
| `NEXT_PUBLIC_APP_URL` | — | Default: http://localhost:3000 |

## Key Patterns

### Data fetching
- All 10 API endpoints fetched **in parallel** from the browser via `Promise.allSettled()`
- Each resolves independently — sections appear as their data arrives, no waiting for the slowest source
- Each Route Handler caches responses for 5 minutes (`next: { revalidate: 300 }`)
- Every API call returns `{ data, isDemo, error? }` — demo data is always available as fallback

### Graceful degradation
- Missing API key → returns mock data with `isDemo: true`
- API error / rate limit → same fallback, error logged server-side
- DEMO badge shown in UI whenever `isDemo: true`

### Google Trends — replaced
- The `google-trends-api` npm package (last updated 2021) calls dead Google endpoints — returns 404 HTML
- Replaced with **GitHub Trending** via `lib/api/github-trending.ts`
- Uses `https://api.github.com/search/repositories?q=created:>DATE&sort=stars&order=desc`
- No auth required (60 req/hr); set `GITHUB_TOKEN` env var for 5,000 req/hr
- Data is global (not country-specific) — same repos shown for UK and US

### NewsAPI UK quirk
- The `top-headlines?country=gb` endpoint returns 0 results on the free tier
- `lib/api/news.ts` automatically falls back to the `everything` endpoint for UK when this happens
- Fallback chain: top-headlines → everything (today) → everything (last 7 days)
- **7-day view:** fetches 100 articles from 7 days ago up to **yesterday** (excludes last 24h), then randomly samples 10 to spread results across the week. Using `getYesterdayFormatted()` as the `to` date ensures articles from the last 24 hours cannot appear.
- Sports filtering: query excludes `-sport -sports -football -cricket -rugby -tennis -golf -athletics -motorsport -F1 -NBA -NFL -MLB -NHL`

### YouTube time range
- **Today** (`timeRange=today`): uses `chart=mostPopular` with `regionCode` — YouTube's live trending chart. Returns up to 10 videos. Single API call.
- **7 Days** (`timeRange=7days`): two-step fetch:
  1. `/youtube/v3/search?type=video&order=viewCount&publishedAfter=<7daysAgo>&regionCode=...&maxResults=10` — find most-viewed videos published in the last 7 days
  2. `/youtube/v3/videos?part=snippet,statistics&id=<ids>` — fetch full details (statistics, categoryId)

### Reddit subreddit restrictions
- Reddit silently blocks non-browser server-side requests to some communities (returns HTTP 200 but 0 posts)
- Tech subreddits used: `technology`, `artificial`, `MachineLearning`, `webdev`, `programming` (confirmed working for both UK and US)
- Node.js fetch requires `Accept: application/json` header — without it Reddit returns an HTML error page
- HTML guard: response text is checked for `<` prefix; if detected, a clear error is thrown rather than a JSON parse failure
- If a subreddit stops returning posts, test with: `curl -s -A "TechnologyTrends/1.0" -H "Accept: application/json" "https://www.reddit.com/r/{sub}/top.json?t=day&limit=3"`

## Dashboard Layout

**Global tab** (default, leftmost):
- Row 1: GitHub Trending + Hacker News (50/50 grid)
- Row 2: Star Activity chart (full width)
- Row 3: Dev.to + Stack Overflow (50/50 grid)
- Row 4: npm Downloads + crates.io (50/50 grid)
- Row 5: Lobste.rs + Docker Hub (50/50 grid)

**UK / US tabs**:
- Row 1: News + YouTube (50/50 grid)
- Row 2: Reddit Trending (full width)

## Data Flow

```
Browser (React)
    │  fetch() — 10 endpoints in parallel
    ▼
Next.js Route Handlers (/api/*)
    │  validate params → call external API → normalise → return JSON
    │  on any failure → return mock data
    ▼
External APIs (Global — no auth)
    ├── GitHub Search API
    ├── hacker-news.firebaseio.com
    ├── dev.to public API
    ├── Stack Exchange API v2.3
    ├── npmjs.org (registry + downloads)
    ├── crates.io API v1
    ├── lobste.rs JSON API
    └── Docker Hub v2 API
External APIs (Country-specific)
    ├── newsapi.org          (NEWS_API_KEY)
    └── YouTube Data API v3  (YOUTUBE_API_KEY)
Reddit public JSON API       (no auth — used for UK/US tech subreddits)
```

## Types

Core types in `lib/types.ts`:
- `Country` — `'UK' | 'US'`
- `TimeRange` — `'today' | '7days'`
- `TrendItem`, `NewsItem`, `YouTubeVideo`, `StackOverflowQuestion`
- `HackerNewsStory`, `DevToArticle`
- `NpmPackage`, `CratesPackage`, `LobstersStory`, `DockerImage`
