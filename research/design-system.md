# ET Aggregator — Design System & UI Decisions

> **Document purpose:** Documents the visual design language, UI/UX decisions, component patterns, and responsive design strategy.

---

## 1. Design Philosophy

The ET Aggregator dashboard follows three core design principles:

1. **Information density with clarity** — A trends dashboard must show a lot of data at once without overwhelming the user. Cards, badges, and hierarchical typography create visual order.
2. **Scannable layout** — Trends are consumed quickly. The layout must allow users to scan the page and immediately understand what's trending without reading every word.
3. **Dark theme professionalism** — A dark theme reduces eye strain during extended use and gives the dashboard a professional, data-tool aesthetic.

---

## 2. Colour Palette

### Base Colours (Tailwind Config)
```
Background:     #111827  (gray-900)   — Primary page background
Card:           #1f2937  (gray-800)   — Card / section backgrounds
Raised Card:    #283344               — Slightly elevated elements (hover states)
Border:         #374151  (gray-700)   — Card borders, dividers
Muted Border:   #4b5563  (gray-600)   — Secondary borders
```

**Why not pure black?**
Pure black (#000000) creates harsh, fatiguing contrast against white text. A dark navy-grey (#111827) provides sufficient dark theme aesthetics while being softer on the eyes. On OLED screens, pure black can cause pixel burn-in with high-contrast interfaces.

### Brand Colours
```
Primary:        #6366f1  (indigo-500) — Brand, section headers, active states
Secondary:      #8b5cf6  (violet-500) — Accent, secondary badges
Accent:         #ec4899  (pink-500)   — Highlight, special badges
```

### Semantic Colours
```
Trend Up:       #22c55e  (green-500)  — Rising trends, positive change
Trend Hot:      #f97316  (orange-500) — Viral/very hot trends
Trend New:      #f59e0b  (amber-500)  — New/emerging trends
Trend Down:     #ef4444  (red-500)    — Declining trends
Demo Badge:     #f59e0b  (amber-400)  — Demo data indicator
```

### Text Hierarchy
```
Primary Text:   #f9fafb  (gray-50)    — Headings, important content
Body Text:      #d1d5db  (gray-300)   — Standard body text
Muted Text:     #9ca3af  (gray-400)   — Timestamps, metadata
Disabled Text:  #6b7280  (gray-500)   — Placeholders, disabled states
```

---

## 3. Typography

### Font Stack
**Primary:** Inter (Google Fonts) → system-ui → sans-serif

Inter was chosen because:
- Excellent legibility at small sizes (critical for dense data)
- Tabular numerals option for aligned statistics
- Works extremely well on dark backgrounds
- Free (Google Fonts)

### Scale
```
xs:    12px  — Timestamps, labels, badges
sm:    14px  — Card body text, metadata
base:  16px  — Default body text
lg:    18px  — Card titles
xl:    20px  — Section headings
2xl:   24px  — Page section titles
3xl:   30px  — App title
```

### Weight Usage
```
normal (400):   Body text
medium (500):   Card titles, labels
semibold (600): Section headings
bold (700):     App title, rank numbers
```

---

## 4. Layout System

### Responsive Breakpoints (Tailwind)
```
sm:   640px   — Small tablet (landscape phone)
md:   768px   — Tablet
lg:   1024px  — Small desktop / large tablet
xl:   1280px  — Standard desktop
2xl:  1536px  — Wide desktop
```

### Grid Strategy

The dashboard uses CSS Grid for the main layout, adapting to screen size:

**Mobile (< 768px):**
```
┌─────────────────────┐
│ Header              │
├─────────────────────┤
│ Tabs: [UK] [US]     │
├─────────────────────┤
│ Section: Trends     │
├─────────────────────┤
│ Section: News       │
├─────────────────────┤
│ Section: YouTube    │
├─────────────────────┤
│ Section: Products   │
└─────────────────────┘
Single column, sections stack vertically
```

**Tablet (768px - 1024px):**
```
┌──────────────────────────────────┐
│ Header                           │
├──────────────────────────────────┤
│ Tabs: [UK] [US]                  │
├───────────────────┬──────────────┤
│ Trends (60%)      │ News (40%)   │
├──────────────────────────────────┤
│ YouTube (50%)    │ Products (50%)│
└──────────────────────────────────┘
2-column grid
```

**Desktop (≥ 1024px):**
```
┌────────────────────────────────────────────────────────────┐
│ Header                                                      │
├────────────────────────────────────────────────────────────┤
│ [🇬🇧 UK] [🇺🇸 US]     [Today] [7 Days]     [↻ Refresh]    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────┐ ┌──────────────┐ ┌───────────────┐  │
│  │  GOOGLE TRENDS   │ │     NEWS     │ │    YOUTUBE    │  │
│  │  (33%)           │ │    (33%)     │ │    (33%)      │  │
│  │  • trending 1    │ │  • story 1   │ │  • video 1   │  │
│  │  • trending 2    │ │  • story 2   │ │  • video 2   │  │
│  │  • trending 3    │ │  • story 3   │ │  • video 3   │  │
│  └──────────────────┘ └──────────────┘ └───────────────┘  │
│                                                            │
│  ┌─────────────────────────────────┐ ┌───────────────────┐ │
│  │  REDDIT TRENDS                  │ │   PRODUCTS        │ │
│  │  (55%)                          │ │   (45%)           │ │
│  │  • topic 1                      │ │   • product 1     │ │
│  │  • topic 2                      │ │   • product 2     │ │
│  └─────────────────────────────────┘ └───────────────────┘ │
└────────────────────────────────────────────────────────────┘
3-column + 2-column layout
```

---

## 5. Component Design Patterns

### Card Components

All cards follow a consistent pattern:
```
┌──────────────────────────────┐
│  [Icon] [Rank/Badge] [Source] │  ← Header row
│  Card Title                   │  ← Primary content (bold, truncate)
│  Description text...          │  ← Secondary content (muted, 2 lines max)
│  [Meta] [Meta] [Link ↗]       │  ← Footer with metadata
└──────────────────────────────┘
```

Visual specifications:
- `rounded-xl` (12px border radius)
- `border border-surface-border`
- `bg-surface-card`
- Hover: `bg-surface-raised` with smooth transition
- Padding: `p-4`

### Section Headers

Each data section has a consistent header:
```
┌─────────────────────────────────────────┐
│ [Icon] SECTION NAME        [DEMO] badge  │
│        Source: API Name                  │
└─────────────────────────────────────────┘
```

### Badge Component
Used for categories, sources, and statuses:
```
Variants: primary | secondary | success | warning | danger | ghost
Sizes: sm | md
```

### Skeleton Loaders
Every section shows skeleton placeholders during loading:
- Matches the exact dimensions of the real content
- Uses a pulsing animation (`animate-pulse`)
- Creates a "ghost" of the final layout

---

## 6. Loading States

### Strategy: Section-by-Section Loading

Rather than a single full-page loader, each section loads independently:

```
Page Load (t=0ms):
  All sections: ████████████  (skeleton)

Google Trends (t=800ms):
  Trends section: REAL DATA
  Others: ████████████  (skeleton)

News (t=1200ms):
  Trends: REAL DATA
  News: REAL DATA
  Others: ████████████  (skeleton)

Complete (t=~1500ms):
  All sections: REAL DATA
```

This makes the dashboard feel significantly faster than waiting for all data to load before showing anything.

---

## 7. Error States

When a section fails to load:
```
┌─────────────────────────────────────────┐
│  [!] SECTION NAME          [DEMO DATA]  │
│  ─────────────────────────────────────  │
│  ⚠ Could not fetch live data.           │
│    Showing sample data.                  │
│                                          │
│  [demo card 1]                           │
│  [demo card 2]                           │
└─────────────────────────────────────────┘
```

The amber "DEMO DATA" badge clearly communicates to the user that the section isn't showing live data.

---

## 8. Interactive States

### Tabs (UK / US)
- Inactive: `bg-surface-card text-gray-400 border-transparent`
- Active: `bg-brand-primary/10 text-brand-primary border-brand-primary`
- Transition: 150ms

### Time Range Toggle
- Toggle pill design (Today / 7 Days)
- Active button: `bg-brand-primary text-white`
- Inactive: `bg-surface-card text-gray-400`

### Refresh Button
- Idle: `text-gray-400 hover:text-white`
- Loading: Icon spins with `animate-spin`

### Cards
- Rest: `bg-surface-card`
- Hover: `bg-surface-raised ring-1 ring-surface-border`
- Transition: 150ms ease-in-out

---

## 9. Accessibility Considerations

- All interactive elements have visible focus rings
- Colour is never the sole means of conveying information (icons + text used alongside colour)
- Text contrast ratios meet WCAG AA standard (4.5:1 minimum for normal text)
- `aria-label` attributes on icon-only buttons
- Semantic HTML throughout (nav, main, section, article, header)
- External links open in new tab with `rel="noopener noreferrer"`

---

## 10. Trend Indicators

Visual language for communicating trend momentum:

| Indicator | Colour | Icon | Meaning |
|---|---|---|---|
| 🔥 HOT | Orange | Flame | Trending very rapidly |
| ↑ UP | Green | TrendingUp | Increasing trend |
| ↓ DOWN | Red | TrendingDown | Declining trend |
| ✨ NEW | Amber | Sparkles | New entry to trending |
| ─ STABLE | Gray | Minus | Consistent trend |

---

*Document generated: 2026-02-20*
*Project: ET Aggregator v0.1.0*
