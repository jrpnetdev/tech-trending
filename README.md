# Technology Trends — Tech Trends Dashboard

A responsive, dark-themed dashboard that aggregates technology trends in real-time from GitHub, Hacker News, Dev.to, npm, crates.io, Lobste.rs, Docker Hub, news sources, YouTube, Reddit, and Stack Overflow — with a **Global** tab and separate views for the **United Kingdom** and **United States**.

---

## Screenshots

> Run `npm run dev` and visit `http://localhost:3000` to see the live dashboard.

The dashboard features:
- **Global tab** (default): GitHub Trending, Hacker News, Dev.to, Stack Overflow, npm Downloads, crates.io, Lobste.rs, Docker Hub
- **Country tabs** (🇬🇧 UK / 🇺🇸 US): News, YouTube trending, Reddit tech communities
- Time range toggle (Today / Last 7 Days)
- All sections load independently and in parallel
- A dark deep-navy theme with colour-coded trend indicators
- Skeleton loading states so the page is never blank

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9 or later

### Installation

```bash
# Clone or open the project directory
cd tech-trending

# Install dependencies
npm install

# Copy the environment variable template
cp .env.local.example .env.local
```

### Configuration

Open `.env.local` and add your API keys. The dashboard works immediately without any keys — each section shows clearly-labelled demo data until a real key is provided.

```env
NEWS_API_KEY=your_newsapi_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here

# Optional — premium/paid APIs
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
GLIMPSE_API_KEY=your_glimpse_api_key_here
```

See [API Keys](#api-keys) below for where to obtain each key.

### Running

```bash
# Development (hot reload)
npm run dev
# → http://localhost:3000

# Production build
npm run build

# Production server
npm start

# Lint
npm run lint
```

---

## Features

### Dashboard Sections

**Global tab** (default) — universal tech data, no country filter:

| Section | Source | Auth Required |
|---|---|---|
| **GitHub Trending** | GitHub Search API — new repos by stars | None (optional `GITHUB_TOKEN` for 5k req/hr) |
| **Hacker News** | Firebase HN API — top/best stories | None |
| **Dev.to Top Articles** | Dev.to public API — top articles by reactions | None |
| **Stack Overflow** | Stack Exchange API v2.3 — hot questions | None (optional `STACKOVERFLOW_KEY`) |
| **npm Downloads** | npmjs.org registry + downloads API — curated popular packages | None |
| **crates.io Trending** | crates.io API v1 — Rust packages by recent downloads | None |
| **Lobste.rs** | lobste.rs JSON API — hottest tech stories | None |
| **Docker Hub** | Docker Hub v2 API — official images by pull count | None |

**UK / US tabs** — country-specific content:

| Section | Source | Auth Required |
|---|---|---|
| **Top Headlines** | NewsAPI — technology category + AI/ML keywords | Free API key |
| **YouTube Trending** | YouTube Data API v3 — Science & Technology (category 28) | Free API key |
| **Reddit Trending** | Reddit public JSON API — tech/AI/webdev subreddits | None |

### Time Range

- **Today** — real-time / daily trends (HN topstories, GitHub last 24h, Dev.to top=1, YouTube mostPopular)
- **7 Days** — weekly aggregates (HN beststories, GitHub last 7d, Dev.to top=7, YouTube search by viewCount)

### Performance

- All 10 API endpoints are fetched **in parallel** on page load
- Sections render independently as data arrives — no waiting for the slowest source
- Server-side Route Handlers cache responses for 5 minutes (`revalidate: 300`)

### Graceful Degradation

Every section falls back to rich, realistic demo data when:
- An API key is not configured
- An external API is rate-limited or unavailable
- A network error occurs

A clear **DEMO** badge is shown so you always know which sections are live vs. demo.

---

## Project Structure

```
tech-trending/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root HTML layout and metadata
│   ├── page.tsx                  # Entry point — renders Dashboard
│   ├── globals.css               # Global styles and animations
│   └── api/                      # Server-side API Route Handlers
│       ├── trends/route.ts       # GitHub Trending + Reddit
│       ├── news/route.ts         # NewsAPI headlines
│       ├── youtube/route.ts      # YouTube trending videos (supports timeRange)
│       ├── stackoverflow/route.ts # Stack Exchange hot questions
│       ├── hackernews/route.ts   # Hacker News top/best stories
│       ├── devto/route.ts        # Dev.to top articles
│       ├── npm/route.ts          # npm weekly download counts
│       ├── crates/route.ts       # crates.io trending Rust packages
│       ├── lobsters/route.ts     # Lobste.rs hottest tech stories
│       └── docker/route.ts       # Docker Hub top images by pull count
│
├── components/                   # React UI components
│   ├── Dashboard.tsx             # Root — state, fetching, tab layout
│   ├── Header.tsx                # Sticky header with time range controls
│   ├── TrendsSection.tsx         # GitHub + Reddit trends + optional chart
│   ├── HackerNewsSection.tsx     # Hacker News top stories
│   ├── DevToSection.tsx          # Dev.to top articles
│   ├── StackOverflowSection.tsx  # Stack Overflow hot questions
│   ├── NpmSection.tsx            # npm weekly download rankings
│   ├── CratesSection.tsx         # crates.io trending Rust packages
│   ├── LobstersSection.tsx       # Lobste.rs hottest tech stories
│   ├── DockerSection.tsx         # Docker Hub top images
│   ├── NewsSection.tsx           # News headlines
│   ├── YouTubeSection.tsx        # YouTube trending videos
│   ├── TrendCard.tsx             # GitHub / Reddit trend item
│   ├── HackerNewsCard.tsx        # HN story card
│   ├── DevToCard.tsx             # Dev.to article card
│   ├── StackOverflowCard.tsx     # SO question (score, tags, answered)
│   ├── NpmCard.tsx               # npm package card
│   ├── CratesCard.tsx            # crates.io package card
│   ├── LobstersCard.tsx          # Lobste.rs story card
│   ├── DockerCard.tsx            # Docker Hub image card
│   ├── NewsCard.tsx              # News article card
│   ├── YouTubeCard.tsx           # YouTube video card
│   ├── TrendsChart.tsx           # Recharts star-activity chart
│   ├── SectionHeader.tsx         # Reusable section header with DEMO badge
│   ├── Badge.tsx                 # Coloured status badge
│   ├── LoadingSkeleton.tsx       # Skeleton placeholder components
│   └── ErrorMessage.tsx          # Error/warning display
│
├── lib/                          # Shared logic
│   ├── types.ts                  # TypeScript interfaces for all data types
│   ├── utils.ts                  # Helper functions (cn, timeAgo, country utils)
│   ├── mock-data.ts              # Fallback demo data for all 10 sections
│   └── api/                      # External API client modules
│       ├── github-trending.ts    # GitHub Search API
│       ├── reddit.ts             # Reddit public JSON API
│       ├── news.ts               # NewsAPI (with UK fallback logic)
│       ├── youtube.ts            # YouTube Data API v3
│       ├── stackoverflow.ts      # Stack Exchange API v2.3
│       ├── hackernews.ts         # HN Firebase API
│       ├── devto.ts              # Dev.to public API
│       ├── npm.ts                # npm Registry + Downloads API
│       ├── crates.ts             # crates.io API v1
│       ├── lobsters.ts           # Lobste.rs JSON API
│       └── docker.ts             # Docker Hub v2 API
│
├── research/                     # Architecture and design documentation
│
├── .env.local.example            # Environment variable template
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS customisation
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 14.2 | Full-stack framework (App Router, API Routes, SSR) |
| **React** | 18.3 | UI component library |
| **TypeScript** | 5 | Static typing across the entire codebase |
| **Tailwind CSS** | 3.4 | Utility-first styling and responsive design |
| **Recharts** | 2.12 | Interest-over-time trend chart |
| **Lucide React** | 0.363 | SVG icon library |
| **clsx + tailwind-merge** | — | Conditional className utilities |
| **date-fns** | 3.6 | Lightweight date formatting (time-ago, date arithmetic) |

### Why these choices?

Full reasoning is documented in [research/research.md](research/research.md). In summary:

- **Next.js App Router** — handles API route secrets server-side, enables parallel streaming data fetching, and ships a single codebase for both frontend and backend
- **Tailwind CSS** — produces smaller CSS than CSS-in-JS libraries (purged at build time), with responsive utilities inline and dark theme colours defined once in config
- **No database / no persistence** — per project requirements; stateless Route Handlers mean the app scales horizontally with zero infrastructure beyond a Node.js server
- **`Promise.allSettled()`** — used throughout so a failure in one API never blocks the rest; partial data is always better than no data

---

## API Keys

### Free — Required for live data

#### NewsAPI
- Sign up at [newsapi.org](https://newsapi.org) (free developer account)
- Provides up to 100 requests/day on the free tier
- Set `NEWS_API_KEY` in `.env.local`
- **Note:** The `top-headlines` endpoint returns 0 results for UK (`gb`) on the free tier. The client automatically falls back to the `everything` endpoint for UK when this happens, so UK news will still populate correctly.
- **7-day view:** fetches 100 articles from 7 days ago up to yesterday (excludes last 24 hours), then randomly samples 10 to spread results across the week. Sports topics are filtered out via query exclusions.

#### YouTube Data API v3
- Go to [Google Cloud Console](https://console.cloud.google.com)
- Create a project → Enable **YouTube Data API v3** → Create an API key
- Free tier: 10,000 units/day (the dashboard uses ~2–3 units per page load — 1 for Today, 2 for 7 Days)
- Set `YOUTUBE_API_KEY` in `.env.local`
- **Today:** uses `chart=mostPopular` (YouTube's live trending chart, 10 videos)
- **7 Days:** uses the Search API to find the most-viewed videos published in the last 7 days, then fetches full statistics for those IDs (2 API calls)

### Free — No key needed

| Source | Notes |
|---|---|
| GitHub Trending | Uses the GitHub Search API (`api.github.com/search/repositories`); no auth required (60 req/hr). Set optional `GITHUB_TOKEN` env var for 5,000 req/hr. Shows globally trending new repos. |
| Reddit | Uses the public JSON API (`reddit.com/r/{sub}.json`); no authentication needed. **Note:** some subreddits (e.g. `HotUKDeals`) silently return 0 posts for server-side requests — UK products section uses `r/UKPersonalFinance`, `r/gadgets`, `r/buyitforlife` which are confirmed working |

#### Stack Overflow (Stack Exchange API)
- No key required — free tier gives 300 requests/day per IP
- For higher quota (10,000 req/day): register a free app at [stackapps.com](https://stackapps.com/apps/oauth/register) and set `STACKOVERFLOW_KEY` in `.env.local`
- Shows globally hot questions (no country filter available)

### Optional — Paid

#### Twitter / X API
- [developer.twitter.com](https://developer.twitter.com) — Basic access starts at $100/month
- Set `TWITTER_BEARER_TOKEN` in `.env.local`
- Without a token the Twitter section shows demo data with a clear badge

#### Glimpse API
- B2B trend intelligence platform — contact [meetglimpse.com](https://meetglimpse.com)
- Set `GLIMPSE_API_KEY` in `.env.local`
- Without a key the Glimpse section shows demo data

---

## Architecture Overview

```
Browser (React)
    │
    │  fetch() — all 10 endpoints in parallel
    │  sections render independently as each resolves
    │
    ▼
Next.js Server (Route Handlers)
    │
    │  validate params → fetch external API → normalise → JSON
    │  any failure → return mock data with isDemo: true
    │
    ├──► GitHub Search API        (no auth)
    ├──► HN Firebase API          (no auth)
    ├──► Dev.to public API        (no auth)
    ├──► Stack Exchange API v2.3  (no auth)
    ├──► npm Registry + Downloads (no auth)
    ├──► crates.io API v1         (no auth)
    ├──► Lobste.rs JSON API       (no auth)
    ├──► Docker Hub v2 API        (no auth)
    ├──► NewsAPI                  (NEWS_API_KEY)
    ├──► YouTube Data API v3      (YOUTUBE_API_KEY)
    └──► Reddit public JSON API   (no auth)
```

Each Route Handler:
1. Validates query parameters (`country`, `timeRange`)
2. Fetches from one or more external APIs in parallel
3. Normalises responses into consistent TypeScript interfaces
4. Returns clean JSON — or falls back to demo data on any failure

See [research/architecture.md](research/architecture.md) for full UML diagrams, data flow diagrams, and a sequence diagram of the request lifecycle.

---

## Design System

The dashboard uses a **deep navy dark theme** — not pure black — which reduces eye strain and avoids harsh contrast glare:

| Role | Colour | Tailwind |
|---|---|---|
| Page background | `#111827` | `gray-900` |
| Card background | `#1f2937` | `gray-800` |
| Borders | `#374151` | `gray-700` |
| Brand / primary | `#6366f1` | `indigo-500` |
| Trend hot | `#f97316` | `orange-500` |
| Trend up | `#22c55e` | `green-500` |
| Trend new | `#f59e0b` | `amber-500` |

Full colour palette, typography scale, responsive breakpoints, and component patterns are documented in [research/design-system.md](research/design-system.md).

---

## Research Documentation

The [research/](research/) folder contains four documents written as part of the architectural design process:

| Document | Contents |
|---|---|
| [research.md](research/research.md) | Technology choices with full rationale and alternatives considered |
| [architecture.md](research/architecture.md) | System architecture diagrams (ASCII + Mermaid UML), data flow, sequence diagrams, folder structure, state management and error handling strategies |
| [api-sources.md](research/api-sources.md) | Every external API documented: endpoints, authentication, rate limits, request/response examples, and fallback strategy |
| [design-system.md](research/design-system.md) | Colour palette, typography, responsive grid layouts (mobile/tablet/desktop), component patterns, loading states, error states, accessibility notes |

---

## Extending the Dashboard

### Adding a new data source

1. Create `lib/api/your-source.ts` — implement the fetch function returning `{ data, isDemo, error? }`
2. Add mock data to `lib/mock-data.ts`
3. Wire it into the appropriate Route Handler in `app/api/`
4. Create a card component in `components/`
5. Add a section component and include it in `components/Dashboard.tsx`

### Adding a new country

1. Add the country code to the `Country` type in `lib/types.ts`
2. Add subreddit lists to `lib/api/reddit.ts`
3. Add API geo codes to `lib/utils.ts`
4. Add mock data to `lib/mock-data.ts`
5. Add a tab to `components/Dashboard.tsx`

---

## License

Private project. All rights reserved.
