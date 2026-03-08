# ET Aggregator — Technology Research & Rationale

> **Document purpose:** Explains every technology and architectural decision made for the Emerging Trends Aggregator dashboard, including the reasoning, trade-offs considered, and alternatives rejected.

---

## 1. Framework: Next.js 14 (App Router)

### Why Next.js?

**Next.js** was chosen as the full-stack framework over alternatives because it uniquely satisfies all requirements in a single, opinionated package:

| Requirement | How Next.js Addresses It |
|---|---|
| Fast initial load | React Server Components render HTML on the server |
| API key security | Server-side API Routes keep secrets out of the browser |
| Parallel data fetching | Native `Promise.all` / `Promise.allSettled` in Route Handlers |
| Scalability | Vercel Edge Network / any Node.js server |
| TypeScript-first | Built-in TypeScript support, zero config |
| Modern architecture | App Router implements RSC, Streaming, and Suspense |

### Why App Router over Pages Router?

The **App Router** (introduced in Next.js 13, stable in Next.js 14) is the modern standard because:

- **React Server Components** — Components that render on the server, reducing client-side JavaScript bundle size
- **Streaming with Suspense** — UI sections load progressively rather than waiting for all data
- **Route Handlers** replace the old `pages/api/` approach with a cleaner, more explicit API
- **Layouts** are nested and persistent — the header does not re-render on navigation
- **Colocation** — data fetching logic lives alongside components, not in a separate `pages/` folder

### Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| **Vite + React + Express** | Two separate codebases (frontend + backend), more DevOps overhead, no built-in SSR |
| **Remix** | Excellent framework but smaller ecosystem, fewer community resources |
| **Astro** | Outstanding for content-heavy static sites but not ideal for a live-data dashboard requiring frequent client-side updates |
| **SvelteKit** | Excellent DX but smaller talent pool and ecosystem versus React/Next.js |
| **Create React App** | Deprecated, no SSR, no API routes — unsuitable |

---

## 2. Language: TypeScript

TypeScript is non-negotiable for a production dashboard application because:

- **API response typing** — External APIs (Reddit, NewsAPI, YouTube) return complex JSON. Types catch mismatches at compile time, not runtime.
- **Component prop safety** — Passing wrong props is a compile error, not a runtime crash.
- **Refactoring confidence** — When changing data structures (e.g., adding a `category` field to `TrendItem`), TypeScript highlights every place that needs updating.
- **IDE productivity** — IntelliSense autocomplete across the entire codebase.

---

## 3. Styling: Tailwind CSS

### Why Tailwind?

**Tailwind CSS** was chosen over CSS Modules, styled-components, and plain CSS because:

1. **Utility-first = speed** — Building responsive, dark-mode layouts without context-switching to a separate `.css` file
2. **Design tokens** — Custom colours (the dashboard palette) are defined once in `tailwind.config.ts` and used consistently everywhere
3. **Responsive built-in** — `sm:`, `md:`, `lg:`, `xl:` breakpoints are inline with the markup, making responsive design explicit
4. **No runtime overhead** — Unlike styled-components or Emotion, Tailwind generates static CSS at build time (zero runtime JS)
5. **Purging** — Production builds remove unused styles automatically, resulting in tiny CSS files (typically 5–20KB)

### Why not shadcn/ui?

**shadcn/ui** is a component collection rather than a library — components are copied into the project and customised. While excellent, it was skipped for this project because:
- It adds ~30 files of boilerplate for components not all needed here
- The custom design requirements of a trend dashboard benefit from hand-crafted components
- Tailwind alone is sufficient and gives more control

### Dark Theme Design

The dark theme uses **deep slate/navy** tones rather than pure black:

```
Background:  #111827  (Tailwind gray-900)  — avoids OLED burn-in risk, softer on eyes
Card:        #1f2937  (Tailwind gray-800)  — 12% lighter than background, clear hierarchy
Border:      #374151  (Tailwind gray-700)  — subtle separation
Primary:     #6366f1  (Tailwind indigo-500) — brand colour for headings, badges
Trend Up:    #22c55e  (Tailwind green-500)
Trend Hot:   #f97316  (Tailwind orange-500)
```

Pure black (#000000) was deliberately avoided because:
- Creates harsh contrast glare on non-OLED screens
- OLED screens can suffer burn-in patterns with high-contrast pure black UIs
- Dark navy feels more professional and less "developer terminal"

---

## 4. Data Visualisation: Recharts

**Recharts** was selected for the Google Trends interest-over-time line chart because:

- Native **React** components (not a wrapper around D3 like react-chartjs-2)
- Excellent TypeScript definitions
- Lightweight, tree-shakeable
- Responsive out of the box (`ResponsiveContainer`)
- Dark-theme friendly (full control over colours, tooltips, axes)

Alternatives considered: Chart.js (requires canvas, harder to customise), D3.js (too low-level for this use case), Victory (heavier bundle).

---

## 5. Icons: Lucide React

**Lucide React** provides clean, consistent SVG icons as React components. Chosen over:
- **Heroicons** — Also excellent but Lucide has a larger icon set (1,300+)
- **React Icons** — Multiple icon sets in one package, but inconsistent visual styles
- **Font Awesome** — Heavier, requires font loading

---

## 6. Utility Libraries

| Library | Purpose |
|---|---|
| `clsx` | Conditional className joining without string interpolation bugs |
| `tailwind-merge` | Intelligently merges conflicting Tailwind classes (e.g., `bg-red-500 bg-blue-500 → bg-blue-500`) |
| `date-fns` | Lightweight date manipulation (time-ago formatting, date arithmetic). Zero dependencies. |
| `google-trends-api` | Unofficial Node.js wrapper for Google Trends data. Runs server-side only. |

---

## 7. API Data Sources

See [api-sources.md](./api-sources.md) for detailed documentation of each data source.

### Summary

| Source | API | Cost | Authentication | UK Support | US Support |
|---|---|---|---|---|---|
| Google Trends | `google-trends-api` (npm) | Free | None required | ✅ (geo=GB) | ✅ (geo=US) |
| Reddit | Public JSON API | Free | None required | ✅ (r/unitedkingdom etc) | ✅ (r/popular etc) |
| News Headlines | NewsAPI (newsapi.org) | Free tier (100 req/day) | API Key | ✅ (country=gb) | ✅ (country=us) |
| YouTube Trending | YouTube Data API v3 | Free (10k units/day) | API Key | ✅ (regionCode=GB) | ✅ (regionCode=US) |
| Twitter/X | Twitter API v2 | $100+/month | Bearer Token | ✅ | ✅ |
| Glimpse | Glimpse API | Paid (B2B) | API Key | ✅ | ✅ |

**Key principle:** APIs that require paid subscriptions (Twitter/X, Glimpse) are scaffolded with proper integration code but fall back to clearly-labelled **demo data** when keys are not provided. The architecture makes adding real keys trivial — just add them to `.env.local`.

---

## 8. Architecture Pattern: API Route Aggregation

### The Problem
External APIs have CORS restrictions and contain secret keys — they cannot be called directly from the browser.

### The Solution: Server-Side Route Handlers
Next.js **Route Handlers** (`app/api/*/route.ts`) act as a **Backend for Frontend (BFF)**:

```
Browser → Next.js API Route → External APIs (parallel)
                           ↓
                     Normalised JSON
                           ↓
                        Browser
```

Each Route Handler:
1. Validates incoming query parameters
2. Fetches from multiple external APIs **in parallel** using `Promise.allSettled()`
3. Normalises responses into consistent TypeScript interfaces
4. Returns a single clean JSON response

`Promise.allSettled()` is used instead of `Promise.all()` so that if one source (e.g., YouTube API is rate-limited) fails, the other sources still return data — the dashboard degrades gracefully rather than failing completely.

### Client-Side Data Fetching Strategy
The client (browser) fetches from our own API routes using standard `fetch()`. All 4 endpoints are fetched in parallel:

```typescript
const [trendsData, newsData, productsData, youtubeData] = await Promise.all([
  fetch('/api/trends?country=uk&timeRange=today'),
  fetch('/api/news?country=uk&timeRange=today'),
  fetch('/api/products?country=uk&timeRange=today'),
  fetch('/api/youtube?country=uk&timeRange=today'),
]);
```

This means the total wait time equals the **slowest single API call**, not the sum of all calls.

---

## 9. Performance Considerations

| Technique | Implementation |
|---|---|
| **Parallel API calls** | `Promise.allSettled()` in server routes, `Promise.all()` on client |
| **Skeleton loading** | Sections render loading placeholders immediately, fill in as data arrives |
| **Next.js caching** | Route Handlers use `{ next: { revalidate: 300 } }` — cached for 5 minutes, auto-refreshed |
| **Image optimisation** | Next.js `<Image>` component for YouTube thumbnails |
| **Code splitting** | Next.js automatically splits by route and component |
| **Tailwind purging** | Production CSS is < 20KB after unused class removal |

---

## 10. Scalability Considerations

The architecture is designed to scale horizontally:

- **Stateless Route Handlers** — No in-memory state, each request is independent. Can run on multiple serverless instances.
- **No database dependency** — Per requirements, no data persistence. Removing this constraint simplifies scaling dramatically.
- **Environment-based configuration** — All API keys and settings via environment variables, making deployment to any cloud trivial.
- **Adding new data sources** — New API source = new `lib/api/*.ts` file + new section in the Route Handler. No architectural changes needed.
- **Adding new countries** — The `Country` type in `lib/types.ts` and country-specific subreddit/API configurations are the only changes needed.

---

## 11. Security Considerations

- All API keys stored in server-side environment variables (`.env.local`) — never exposed to the browser
- Route Handlers validate and sanitise query parameters before using them in API calls
- No user input is passed to external API calls without validation
- No database = no SQL injection risk
- Content Security Policy can be added via `next.config.ts` headers if deployed to production

---

## 12. Developer Experience

- **TypeScript strict mode** — Catches bugs at compile time
- **ESLint with Next.js rules** — Enforces React and Next.js best practices
- **Tailwind IntelliSense** — VS Code extension provides autocomplete for all Tailwind classes
- **Hot Module Replacement** — Changes appear instantly during development
- **`.env.local.example`** — Documents all required environment variables

---

*Document generated: 2026-02-20*
*Project: ET Aggregator v0.1.0*
