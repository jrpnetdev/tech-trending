# ET Aggregator — API Sources Documentation

> **Document purpose:** Detailed documentation of every external data source used, including authentication requirements, rate limits, endpoint structures, and fallback strategies.

---

## 1. Google Trends (via `google-trends-api`)

### Overview
Google Trends provides insight into what people are searching for on Google. This is arguably the most authoritative source for what's genuinely trending in a country.

### Package
- **Package:** `google-trends-api` (npm)
- **Type:** Unofficial — reverse-engineered Google Trends internal API
- **Authentication:** None required
- **Rate Limits:** Unofficial; excessive requests trigger a 429 response (rate limit). Recommend ≤ 1 request per section per page load.

### Endpoints Used

#### Daily Trends
Returns the top ~25 trending searches for a specific date.
```typescript
import googleTrends from 'google-trends-api';

const result = await googleTrends.dailyTrends({
  trendDate: new Date(),   // Date to fetch trends for
  geo: 'GB',               // 'GB' for UK, 'US' for United States
});

const parsed = JSON.parse(result as string);
const trends = parsed.default.trendingSearchesDays[0].trendingSearches;
// Each trend: { title: { query }, formattedTraffic, articles: [...] }
```

#### Real-Time Trends
Returns currently trending stories (useful for "today" view):
```typescript
const result = await googleTrends.realTimeTrends({
  geo: 'GB',
  category: 'all', // 'b'=business, 'e'=entertainment, 'h'=health, 't'=tech
});
```

### Response Structure
```json
{
  "default": {
    "trendingSearchesDays": [{
      "date": "20260220",
      "trendingSearches": [{
        "title": { "query": "Taylor Swift" },
        "formattedTraffic": "2M+",
        "articles": [
          { "title": "...", "url": "...", "source": { "name": "..." } }
        ],
        "relatedQueries": [{ "query": "..." }]
      }]
    }]
  }
}
```

### Geographic Codes
- UK: `'GB'`
- US: `'US'`

### Fallback
If Google Trends fails (rate limit or error), mock trending data is returned, clearly labelled as "Demo Data".

---

## 2. Reddit Public JSON API

### Overview
Reddit's public JSON API is freely accessible without authentication for read-only operations. Reddit is excellent for organic, user-driven trending content and community discussions.

### Authentication
- **No API key required** for public subreddit reading
- Must include a descriptive `User-Agent` header (Reddit's Terms of Service requirement)

### Rate Limits
- 60 requests per minute per IP for unauthenticated access
- The dashboard makes ~4 requests per country per page load — well within limits

### Base URL
```
https://www.reddit.com/r/{subreddit}/{listing}.json
```

### Parameters
| Parameter | Description |
|---|---|
| `t` | Time range: `hour`, `day`, `week`, `month`, `year`, `all` |
| `limit` | Number of results: max 100 |
| `after` | Pagination token |

### Subreddits Used

#### UK Trends
| Subreddit | Purpose |
|---|---|
| `r/unitedkingdom` | General UK news and discussion |
| `r/ukpolitics` | UK political trends |
| `r/casualuk` | Casual UK culture and trends |
| `r/HotUKDeals` | Trending UK products and deals |
| `r/uktrending` | Explicitly trending UK topics |

#### US Trends
| Subreddit | Purpose |
|---|---|
| `r/popular` | Top content across all of Reddit (US-skewed) |
| `r/AskAmerica` | American cultural topics |
| `r/news` | General US-focused news |
| `r/deals` | US product deals |
| `r/AmazonDeals` | Amazon-specific trending products |

### Example Request
```typescript
const response = await fetch(
  'https://www.reddit.com/r/unitedkingdom/top.json?t=day&limit=25',
  {
    headers: {
      'User-Agent': 'ET-Aggregator/1.0',
    },
  }
);
const data = await response.json();
const posts = data.data.children; // Array of post objects
```

### Response Structure
```json
{
  "data": {
    "children": [{
      "data": {
        "id": "abc123",
        "title": "Post title here",
        "url": "https://...",
        "score": 4521,
        "num_comments": 342,
        "subreddit": "unitedkingdom",
        "permalink": "/r/unitedkingdom/comments/abc123/...",
        "created_utc": 1740059400
      }
    }]
  }
}
```

---

## 3. NewsAPI (newsapi.org)

### Overview
NewsAPI aggregates news from 150,000+ sources worldwide. The free tier provides sufficient coverage for a dashboard.

### Authentication
- **API Key required** — Free registration at [newsapi.org](https://newsapi.org)
- Set `NEWS_API_KEY` in `.env.local`

### Rate Limits (Free Tier)
- 100 requests per day
- Developer plan: suitable for development/testing
- Production use requires paid plan ($449/month for business)

### Endpoints Used

#### Top Headlines
```
GET https://newsapi.org/v2/top-headlines
  ?country=gb    # 'gb' for UK, 'us' for US
  &pageSize=20
  &apiKey={NEWS_API_KEY}
```

#### Everything (for 7-day view)
```
GET https://newsapi.org/v2/everything
  ?q=trending OR viral OR breaking
  &language=en
  &from=2026-02-13    # 7 days ago
  &to=2026-02-20      # today
  &sortBy=popularity
  &pageSize=20
  &apiKey={NEWS_API_KEY}
```

### Response Structure
```json
{
  "status": "ok",
  "totalResults": 1234,
  "articles": [{
    "source": { "id": "bbc-news", "name": "BBC News" },
    "author": "Jane Smith",
    "title": "Breaking: ...",
    "description": "Full article description...",
    "url": "https://bbc.co.uk/news/...",
    "urlToImage": "https://...",
    "publishedAt": "2026-02-20T14:30:00Z",
    "content": "Article content truncated..."
  }]
}
```

### Fallback
If `NEWS_API_KEY` is not set, 5 sample news headlines are returned with a "Demo Data" badge.

---

## 4. YouTube Data API v3

### Overview
YouTube's official API provides access to trending videos by region. Trending videos reflect what's popular in a country at a given time.

### Authentication
- **API Key required** — Free from [Google Cloud Console](https://console.cloud.google.com)
- Enable "YouTube Data API v3" in the API library
- Set `YOUTUBE_API_KEY` in `.env.local`

### Rate Limits (Free Tier)
- 10,000 units per day
- A `videos.list` request costs 1 unit
- The dashboard uses ~2 requests per page load — extremely conservative usage

### Endpoints Used

#### Most Popular Videos (Trending)
```
GET https://www.googleapis.com/youtube/v3/videos
  ?part=snippet,statistics
  &chart=mostPopular
  &regionCode=GB     # 'GB' for UK, 'US' for US
  &maxResults=10
  &key={YOUTUBE_API_KEY}
```

### Response Structure
```json
{
  "items": [{
    "id": "dQw4w9WgXcQ",
    "snippet": {
      "title": "Video Title",
      "channelTitle": "Channel Name",
      "publishedAt": "2026-02-20T10:00:00Z",
      "thumbnails": {
        "medium": { "url": "https://i.ytimg.com/vi/.../mqdefault.jpg" }
      },
      "categoryId": "10"
    },
    "statistics": {
      "viewCount": "1234567",
      "likeCount": "45678"
    }
  }]
}
```

### Video Category IDs
| ID | Category |
|---|---|
| 1 | Film & Animation |
| 10 | Music |
| 17 | Sports |
| 20 | Gaming |
| 22 | People & Blogs |
| 24 | Entertainment |
| 25 | News & Politics |
| 28 | Science & Technology |

### Fallback
If `YOUTUBE_API_KEY` is not set, 6 sample YouTube videos are returned with a "Demo Data" badge.

---

## 5. Twitter / X API v2 (Optional)

### Overview
Twitter/X was once the gold standard for real-time trending topics. The API has become significantly restricted and expensive since Elon Musk's acquisition.

### Authentication
- **Bearer Token required** (paid subscription)
- Basic access: $100/month
- Set `TWITTER_BEARER_TOKEN` in `.env.local`

### Rate Limits
- Basic tier: 50,000 tweets per month
- 1 request per 15 minutes for trends endpoint

### Endpoint (if available)
```
GET https://api.twitter.com/2/trends/by/woeid/{woeid}
Authorization: Bearer {TWITTER_BEARER_TOKEN}
```

**WOEID codes:**
- UK (London): `44418`
- US (United States): `23424977`

### Current Status
Due to the high cost of the Twitter/X API, this integration is **scaffolded but requires user-provided credentials**. Without a Bearer Token, the Twitter section displays clearly-labelled demo data.

### Alternative: Nitter Instances
Some open-source Nitter instances provide scraping of Twitter trends without authentication, but these are unreliable and may violate Twitter's Terms of Service. Not recommended for production.

---

## 6. Glimpse API (Optional)

### Overview
Glimpse (meetglimpse.com) is a B2B trend intelligence platform that provides early signals of emerging trends before they peak on mainstream platforms. It analyses Google Trends data with additional context.

### Authentication
- **Paid B2B API** — Contact Glimpse for pricing
- Set `GLIMPSE_API_KEY` in `.env.local`

### Use Case
Glimpse is particularly valuable for:
- Product trend discovery before items go viral
- Early-stage trend detection (months ahead of peak)
- Category-specific trend analysis

### Current Status
The Glimpse integration is **architecturally ready** (type definitions and route scaffolding in place) but shows demo data without an API key.

---

## 7. Product Trends — Reddit Deal Subreddits

Rather than requiring an expensive product data API (like Amazon Product Advertising API or similar), the dashboard uses Reddit's deal communities as a proxy for trending products. This is effective because:

- Deal communities specifically surface products that are in demand
- High upvote counts = community validation of product interest
- Free and publicly accessible

### UK Product Subreddits
- `r/HotUKDeals` — Primary UK deals community (500k+ members)
- `r/frugaluk` — Budget UK shopping
- `r/uktechdeals` — UK technology deals

### US Product Subreddits
- `r/deals` — General US deals (2M+ members)
- `r/AmazonDeals` — Amazon-specific trending products
- `r/frugal` — Budget US shopping

---

## 8. Fallback & Demo Data Strategy

The dashboard is designed to be **always usable**, even during development without API keys:

```
API Call Made
     │
     ├── Success → Return real data (with source label)
     │
     └── Failure (no key / rate limit / error)
              │
              └── Return mock data
                   ├── Clearly labelled "DEMO DATA"
                   ├── Badge in section header
                   └── Same data structure as real data
                        (so UI renders identically)
```

This means a developer can:
1. Clone the project
2. Run `npm install && npm run dev`
3. See a fully-rendered dashboard with demo data immediately
4. Add API keys one by one to replace demo data sections with real data

---

*Document generated: 2026-02-20*
*Project: ET Aggregator v0.1.0*
