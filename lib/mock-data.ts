// ============================================================
// ET Aggregator — Demo / Fallback Mock Data
// Used when API keys are missing or APIs are unavailable
// ============================================================

import type { TrendItem, NewsItem, ProductItem, YouTubeVideo, StackOverflowQuestion, HackerNewsStory, DevToArticle, NpmPackage, CratesPackage, LobstersStory, DockerImage } from './types';

// ─── GitHub Trending Mock ─────────────────────────────────────
// Global trending — same data shown for both UK and US

export const MOCK_GITHUB_TRENDS_UK: TrendItem[] = [
  { id: 'gh-1', rank: 1, title: 'anthropics/claude-code', searchVolume: '12.4k ⭐', direction: 'hot', source: 'github', category: 'technology', description: 'AI coding assistant CLI by Anthropic', subreddit: 'TypeScript', url: 'https://github.com' },
  { id: 'gh-2', rank: 2, title: 'ollama/ollama', searchVolume: '9.8k ⭐', direction: 'hot', source: 'github', category: 'technology', description: 'Get up and running with local large language models', subreddit: 'Go', url: 'https://github.com' },
  { id: 'gh-3', rank: 3, title: 'microsoft/vscode', searchVolume: '7.2k ⭐', direction: 'up', source: 'github', category: 'technology', description: 'Visual Studio Code — open source code editor', subreddit: 'TypeScript', url: 'https://github.com' },
  { id: 'gh-4', rank: 4, title: 'vercel/next.js', searchVolume: '5.6k ⭐', direction: 'up', source: 'github', category: 'technology', description: 'The React framework for the web', subreddit: 'JavaScript', url: 'https://github.com' },
  { id: 'gh-5', rank: 5, title: 'openai/whisper', searchVolume: '4.1k ⭐', direction: 'new', source: 'github', category: 'technology', description: 'Robust speech recognition via large-scale weak supervision', subreddit: 'Python', url: 'https://github.com' },
  { id: 'gh-6', rank: 6, title: 'huggingface/transformers', searchVolume: '3.8k ⭐', direction: 'up', source: 'github', category: 'technology', description: 'State-of-the-art ML for PyTorch, TensorFlow and JAX', subreddit: 'Python', url: 'https://github.com' },
  { id: 'gh-7', rank: 7, title: 'astral-sh/uv', searchVolume: '3.2k ⭐', direction: 'new', source: 'github', category: 'technology', description: 'An extremely fast Python package and project manager', subreddit: 'Rust', url: 'https://github.com' },
  { id: 'gh-8', rank: 8, title: 'golang/go', searchVolume: '2.9k ⭐', direction: 'stable', source: 'github', category: 'technology', description: 'The Go programming language', subreddit: 'Go', url: 'https://github.com' },
  { id: 'gh-9', rank: 9, title: 'rustlang/rust', searchVolume: '2.4k ⭐', direction: 'up', source: 'github', category: 'technology', description: 'Empowering everyone to build reliable and efficient software', subreddit: 'Rust', url: 'https://github.com' },
  { id: 'gh-10', rank: 10, title: 'facebook/react', searchVolume: '2.1k ⭐', direction: 'stable', source: 'github', category: 'technology', description: 'The library for web and native user interfaces', subreddit: 'JavaScript', url: 'https://github.com' },
];

export const MOCK_GITHUB_TRENDS_US: TrendItem[] = MOCK_GITHUB_TRENDS_UK.map((item) => ({
  ...item,
  id: item.id.replace('gh-', 'gh-us-'),
}));

// ─── Reddit Trends Mock ───────────────────────────────────────

export const MOCK_REDDIT_TRENDS_UK: TrendItem[] = [
  { id: 'r-uk-1', rank: 1, title: "Anyone else getting charged more on their energy bill this month?", score: 12400, commentCount: 843, source: 'reddit', subreddit: 'r/unitedkingdom', category: 'news', direction: 'hot', url: 'https://reddit.com' },
  { id: 'r-uk-2', rank: 2, title: "First time buyer - finally got the keys! After 3 years saving", score: 9800, commentCount: 412, source: 'reddit', subreddit: 'r/HousingUK', category: 'lifestyle', direction: 'up', url: 'https://reddit.com' },
  { id: 'r-uk-3', rank: 3, title: "The state of UK broadband in rural areas is genuinely embarrassing", score: 8700, commentCount: 621, source: 'reddit', subreddit: 'r/unitedkingdom', category: 'technology', direction: 'stable', url: 'https://reddit.com' },
  { id: 'r-uk-4', rank: 4, title: "Is the High Street really dying? Photos from my town", score: 7200, commentCount: 387, source: 'reddit', subreddit: 'r/casualuk', category: 'business', direction: 'up', url: 'https://reddit.com' },
  { id: 'r-uk-5', rank: 5, title: "AI is replacing junior developer jobs faster than anyone expected", score: 6500, commentCount: 891, source: 'reddit', subreddit: 'r/technology', category: 'technology', direction: 'hot', url: 'https://reddit.com' },
  { id: 'r-uk-6', rank: 6, title: "Just got back from Iceland - food prices there vs UK", score: 5800, commentCount: 294, source: 'reddit', subreddit: 'r/casualuk', category: 'lifestyle', direction: 'new', url: 'https://reddit.com' },
  { id: 'r-uk-7', rank: 7, title: "England cricket tour results - live match thread", score: 5200, commentCount: 1200, source: 'reddit', subreddit: 'r/Cricket', category: 'sports', direction: 'hot', url: 'https://reddit.com' },
  { id: 'r-uk-8', rank: 8, title: "What's everyone watching on Netflix this weekend?", score: 4900, commentCount: 567, source: 'reddit', subreddit: 'r/casualuk', category: 'entertainment', direction: 'stable', url: 'https://reddit.com' },
];

export const MOCK_REDDIT_TRENDS_US: TrendItem[] = [
  { id: 'r-us-1', rank: 1, title: "Student loan forgiveness program update - what's happening?", score: 24500, commentCount: 2100, source: 'reddit', subreddit: 'r/personalfinance', category: 'business', direction: 'hot', url: 'https://reddit.com' },
  { id: 'r-us-2', rank: 2, title: "OpenAI GPT-5 leaked benchmarks analysis - the numbers are wild", score: 18200, commentCount: 1543, source: 'reddit', subreddit: 'r/MachineLearning', category: 'technology', direction: 'new', url: 'https://reddit.com' },
  { id: 'r-us-3', rank: 3, title: "My FAANG offer got rescinded after accepting - is this normal now?", score: 15400, commentCount: 987, source: 'reddit', subreddit: 'r/cscareerquestions', category: 'business', direction: 'up', url: 'https://reddit.com' },
  { id: 'r-us-4', rank: 4, title: "Healthcare bill passes Senate - what it means for regular Americans", score: 12800, commentCount: 2874, source: 'reddit', subreddit: 'r/politics', category: 'politics', direction: 'up', url: 'https://reddit.com' },
  { id: 'r-us-5', rank: 5, title: "Housing bubble or just the new normal? Compared 2020 vs 2026 prices", score: 11200, commentCount: 834, source: 'reddit', subreddit: 'r/REBubble', category: 'business', direction: 'stable', url: 'https://reddit.com' },
  { id: 'r-us-6', rank: 6, title: "Game of the year nominee released today - first impressions thread", score: 9800, commentCount: 1231, source: 'reddit', subreddit: 'r/gaming', category: 'entertainment', direction: 'hot', url: 'https://reddit.com' },
  { id: 'r-us-7', rank: 7, title: "Surgeon General warns about social media effects on teen mental health", score: 8700, commentCount: 743, source: 'reddit', subreddit: 'r/science', category: 'health', direction: 'up', url: 'https://reddit.com' },
  { id: 'r-us-8', rank: 8, title: "The Oscars are tonight - who's winning what?", score: 7600, commentCount: 1892, source: 'reddit', subreddit: 'r/movies', category: 'entertainment', direction: 'hot', url: 'https://reddit.com' },
];

// ─── News Mock ────────────────────────────────────────────────

export const MOCK_NEWS_UK: NewsItem[] = [
  { id: 'n-uk-1', title: 'Bank of England holds interest rates amid inflation concerns', description: 'The Monetary Policy Committee voted to maintain the base rate at 4.75%, citing persistent services inflation above the 2% target.', url: 'https://www.bbc.co.uk/news', source: 'BBC News', publishedAt: new Date(Date.now() - 3600000).toISOString(), category: 'business' },
  { id: 'n-uk-2', title: 'NHS announces largest recruitment drive in its history', description: 'The health service plans to hire 50,000 additional staff over the next two years as it tackles record waiting lists.', url: 'https://www.bbc.co.uk/news', source: 'The Guardian', publishedAt: new Date(Date.now() - 7200000).toISOString(), category: 'health' },
  { id: 'n-uk-3', title: 'UK tech startups raise record £8bn in first quarter 2026', description: 'British AI and fintech companies attracted more venture capital investment in Q1 than any previous quarter.', url: 'https://www.bbc.co.uk/news', source: 'Financial Times', publishedAt: new Date(Date.now() - 10800000).toISOString(), category: 'technology' },
  { id: 'n-uk-4', title: 'England qualify for World Cup with dominant 4-0 win', description: 'Jude Bellingham scored twice as England secured their World Cup place with a commanding victory at Wembley.', url: 'https://www.bbc.co.uk/sport', source: 'BBC Sport', publishedAt: new Date(Date.now() - 14400000).toISOString(), category: 'sports' },
  { id: 'n-uk-5', title: 'Housing affordability at record low as wages fail to keep pace', description: 'Average house prices are now 9.2 times average earnings in England, the highest ratio since records began.', url: 'https://www.theguardian.com', source: 'The Times', publishedAt: new Date(Date.now() - 18000000).toISOString(), category: 'business' },
  { id: 'n-uk-6', title: 'New AI regulation framework published by UK government', description: 'The government sets out a principles-based approach to AI governance, avoiding heavy-handed legislation.', url: 'https://www.gov.uk', source: 'Gov.uk', publishedAt: new Date(Date.now() - 21600000).toISOString(), category: 'technology' },
];

export const MOCK_NEWS_US: NewsItem[] = [
  { id: 'n-us-1', title: 'Federal Reserve signals two rate cuts possible in 2026', description: 'Fed Chair hints at potential monetary easing if inflation continues downward trend toward 2% target.', url: 'https://www.wsj.com', source: 'Wall Street Journal', publishedAt: new Date(Date.now() - 2700000).toISOString(), category: 'business' },
  { id: 'n-us-2', title: 'Congress passes bipartisan infrastructure maintenance bill', description: 'A $280 billion package focuses on bridge repairs, water system upgrades, and expanding broadband access.', url: 'https://www.nytimes.com', source: 'New York Times', publishedAt: new Date(Date.now() - 5400000).toISOString(), category: 'politics' },
  { id: 'n-us-3', title: 'Apple announces Vision Pro 2 with improved resolution and battery', description: 'The second-generation spatial computing headset features a 40% faster chip and all-day battery performance.', url: 'https://www.theverge.com', source: 'The Verge', publishedAt: new Date(Date.now() - 8100000).toISOString(), category: 'technology' },
  { id: 'n-us-4', title: 'NASA Artemis V crew announced for 2027 Moon landing', description: 'Four astronauts named for the mission that will put the first woman and person of colour on the Moon.', url: 'https://www.nasa.gov', source: 'NASA', publishedAt: new Date(Date.now() - 10800000).toISOString(), category: 'science' },
  { id: 'n-us-5', title: 'US jobs report beats expectations with 285,000 new positions', description: 'The unemployment rate holds at 3.8% as the labour market remains resilient despite higher borrowing costs.', url: 'https://www.bls.gov', source: 'Associated Press', publishedAt: new Date(Date.now() - 13500000).toISOString(), category: 'business' },
  { id: 'n-us-6', title: 'New FDA-approved obesity drug shows 24% weight reduction in trials', description: 'A once-monthly injection outperforms existing GLP-1 treatments in the largest clinical trial to date.', url: 'https://www.fda.gov', source: 'Reuters', publishedAt: new Date(Date.now() - 16200000).toISOString(), category: 'health' },
];

// ─── Products Mock ────────────────────────────────────────────

export const MOCK_PRODUCTS_UK: ProductItem[] = [
  { id: 'p-uk-1', title: 'Samsung 65" QLED 4K TV - Huge Price Drop', description: 'QN85B down from £1,499 to £699 at Currys - 53% off, best price ever tracked', price: '£699', originalPrice: '£1,499', discount: '53% off', score: 4821, commentCount: 234, source: 'r/HotUKDeals', subreddit: 'HotUKDeals', category: 'Electronics', url: 'https://reddit.com' },
  { id: 'p-uk-2', title: 'Ninja Air Fryer Dual Zone - £89.99 (Was £149)', description: 'AF300UK dual zone air fryer at Amazon UK - perfect for two different foods at once', price: '£89.99', originalPrice: '£149.99', discount: '40% off', score: 3654, commentCount: 187, source: 'r/HotUKDeals', subreddit: 'HotUKDeals', category: 'Kitchen', url: 'https://reddit.com' },
  { id: 'p-uk-3', title: 'LEGO Technic McLaren Formula 1 - £59.99 at John Lewis', description: 'Set 42141 reduced from £89.99. Best LEGO deal this year according to community', price: '£59.99', originalPrice: '£89.99', discount: '33% off', score: 2987, commentCount: 142, source: 'r/HotUKDeals', subreddit: 'HotUKDeals', category: 'Toys', url: 'https://reddit.com' },
  { id: 'p-uk-4', title: 'Dyson V15 Detect Cordless Vacuum - £299 Refurbished', description: 'Dyson Outlet refurbished with 2-year warranty - saves £300 vs new', price: '£299', originalPrice: '£599', discount: '50% off', score: 2456, commentCount: 98, source: 'r/HotUKDeals', subreddit: 'HotUKDeals', category: 'Home', url: 'https://reddit.com' },
  { id: 'p-uk-5', title: 'Microsoft 365 Family - 12 months £49.99 at Costco', description: 'For 6 users, includes 1TB OneDrive per person. Price is £10 cheaper than direct', price: '£49.99', originalPrice: '£59.99', discount: '17% off', score: 2134, commentCount: 76, source: 'r/HotUKDeals', subreddit: 'HotUKDeals', category: 'Software', url: 'https://reddit.com' },
  { id: 'p-uk-6', title: 'PlayStation 5 Slim Bundle + 2 Games at GAME', description: 'PS5 Slim + Spider-Man 2 + FIFA 26 for £479. Games worth £100 separately', price: '£479', originalPrice: '£579', discount: '17% off', score: 1876, commentCount: 203, source: 'r/HotUKDeals', subreddit: 'HotUKDeals', category: 'Gaming', url: 'https://reddit.com' },
];

export const MOCK_PRODUCTS_US: ProductItem[] = [
  { id: 'p-us-1', title: 'Apple AirPods Pro 2 - $149 at Amazon (All-time Low)', description: 'H2 chip, active noise cancellation, USB-C charging case. Best price since release', price: '$149', originalPrice: '$249', discount: '40% off', score: 8234, commentCount: 567, source: 'r/deals', subreddit: 'deals', category: 'Electronics', url: 'https://reddit.com' },
  { id: 'p-us-2', title: 'Instant Pot Duo 7-in-1 8qt - $59 at Walmart', description: 'Largest size, 15 smart programs. Same price as last Black Friday - grab it now', price: '$59', originalPrice: '$119', discount: '50% off', score: 6543, commentCount: 321, source: 'r/deals', subreddit: 'deals', category: 'Kitchen', url: 'https://reddit.com' },
  { id: 'p-us-3', title: 'Nintendo Switch OLED + $40 eShop Credit - $299', description: 'Bundle at Best Buy, effectively the same price as Switch OLED alone. Free game money!', price: '$299', originalPrice: '$339', discount: '$40 bonus', score: 5876, commentCount: 412, source: 'r/NintendoDeals', subreddit: 'NintendoDeals', category: 'Gaming', url: 'https://reddit.com' },
  { id: 'p-us-4', title: 'Anker 100W GaN Charger 4-Port - $35 at Amazon', description: 'Charges MacBook Pro + iPhone + two other devices simultaneously. Incredible value', price: '$35', originalPrice: '$65', discount: '46% off', score: 4321, commentCount: 198, source: 'r/deals', subreddit: 'deals', category: 'Electronics', url: 'https://reddit.com' },
  { id: 'p-us-5', title: 'Kindle Paperwhite 16GB - $99 (Signature Edition)', description: 'Wireless charging, larger screen, 3 months Kindle Unlimited included for free', price: '$99', originalPrice: '$139', discount: '29% off', score: 3987, commentCount: 276, source: 'r/AmazonDeals', subreddit: 'AmazonDeals', category: 'Electronics', url: 'https://reddit.com' },
  { id: 'p-us-6', title: 'LEGO Icons Orchid Plant Set - $39.99 at Target', description: 'Evergreen botanical set reduced. Great gift, always sells at full price', price: '$39.99', originalPrice: '$49.99', discount: '20% off', score: 2654, commentCount: 143, source: 'r/deals', subreddit: 'deals', category: 'Hobbies', url: 'https://reddit.com' },
];

// ─── YouTube Mock ─────────────────────────────────────────────

export const MOCK_YOUTUBE_UK: YouTubeVideo[] = [
  { id: 'yt-uk-1', title: 'England vs France - Full Match Highlights | UEFA Nations League', channelTitle: 'England Football', viewCount: '4500000', likeCount: '87000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 86400000).toISOString(), categoryName: 'Sports' },
  { id: 'yt-uk-2', title: 'I Tried Every Meal Deal in London - The Definitive Ranking', channelTitle: 'Joshua Weissman UK', viewCount: '2800000', likeCount: '156000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 172800000).toISOString(), categoryName: 'Food' },
  { id: 'yt-uk-3', title: 'Is the UK Housing Market About to Crash? 2026 Analysis', channelTitle: 'Property Hub', viewCount: '1900000', likeCount: '43000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 259200000).toISOString(), categoryName: 'Finance' },
  { id: 'yt-uk-4', title: 'Sam Fender - People Watching (Official Video)', channelTitle: 'Sam Fender', viewCount: '3400000', likeCount: '201000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 345600000).toISOString(), categoryName: 'Music' },
  { id: 'yt-uk-5', title: 'Gordon Ramsay Cooks A Perfect Sunday Roast | Masterclass', channelTitle: 'Gordon Ramsay', viewCount: '5100000', likeCount: '312000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 432000000).toISOString(), categoryName: 'Food' },
  { id: 'yt-uk-6', title: 'The Traitors Season 3 - Who Was The Best Player?', channelTitle: 'BBC Three', viewCount: '2200000', likeCount: '89000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 518400000).toISOString(), categoryName: 'Entertainment' },
];

export const MOCK_YOUTUBE_US: YouTubeVideo[] = [
  { id: 'yt-us-1', title: 'Every Super Bowl 2026 Commercial Ranked', channelTitle: 'Nerdist', viewCount: '12000000', likeCount: '345000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 86400000).toISOString(), categoryName: 'Entertainment' },
  { id: 'yt-us-2', title: 'I Built The Worlds Smallest Working PC', channelTitle: 'Linus Tech Tips', viewCount: '8700000', likeCount: '412000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 172800000).toISOString(), categoryName: 'Science & Tech' },
  { id: 'yt-us-3', title: 'Sabrina Carpenter - Espresso (Live at the Grammys 2026)', channelTitle: 'Recording Academy', viewCount: '21000000', likeCount: '890000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 259200000).toISOString(), categoryName: 'Music' },
  { id: 'yt-us-4', title: 'Wall Street Bets on AI: Why 2026 Is Different', channelTitle: 'Bloomberg Technology', viewCount: '3400000', likeCount: '76000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 345600000).toISOString(), categoryName: 'News & Politics' },
  { id: 'yt-us-5', title: 'Exposing Every Ingredient in Ultra-Processed Food', channelTitle: 'What I\'ve Learned', viewCount: '5600000', likeCount: '234000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 432000000).toISOString(), categoryName: 'Education' },
  { id: 'yt-us-6', title: 'LeBron vs. Bronny: Side-by-Side Comparison at the Same Age', channelTitle: 'House of Highlights', viewCount: '7800000', likeCount: '287000', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', publishedAt: new Date(Date.now() - 518400000).toISOString(), categoryName: 'Sports' },
];

// ─── Stack Overflow Mock ──────────────────────────────────────
// Global data — same for both UK and US

export const MOCK_STACKOVERFLOW: StackOverflowQuestion[] = [
  { id: 'so-1', title: 'Why does TypeScript infer `never` when using conditional types with generics?', url: 'https://stackoverflow.com', score: 142, answerCount: 3, viewCount: 8400, isAnswered: true, tags: ['typescript', 'generics', 'conditional-types'], askedAt: new Date(Date.now() - 3600000).toISOString(), owner: 'dev_user_42' },
  { id: 'so-2', title: 'How to properly handle async errors in React Server Components in Next.js 14?', url: 'https://stackoverflow.com', score: 98, answerCount: 2, viewCount: 6200, isAnswered: true, tags: ['next.js', 'react', 'server-components'], askedAt: new Date(Date.now() - 7200000).toISOString(), owner: 'react_dev' },
  { id: 'so-3', title: 'What is the difference between `structuredClone` and JSON parse/stringify?', url: 'https://stackoverflow.com', score: 87, answerCount: 5, viewCount: 12000, isAnswered: true, tags: ['javascript', 'deep-copy', 'web-api'], askedAt: new Date(Date.now() - 14400000).toISOString(), owner: 'js_curious' },
  { id: 'so-4', title: 'Python asyncio: why does my event loop block when calling `await` inside a thread?', url: 'https://stackoverflow.com', score: 76, answerCount: 1, viewCount: 4800, isAnswered: false, tags: ['python', 'asyncio', 'multithreading'], askedAt: new Date(Date.now() - 21600000).toISOString(), owner: 'async_confused' },
  { id: 'so-5', title: 'Postgres query planner ignoring index on large table with LIKE operator', url: 'https://stackoverflow.com', score: 65, answerCount: 4, viewCount: 9100, isAnswered: true, tags: ['postgresql', 'indexing', 'performance'], askedAt: new Date(Date.now() - 28800000).toISOString(), owner: 'db_admin_uk' },
  { id: 'so-6', title: 'How to cancel an in-flight fetch request when component unmounts in React?', url: 'https://stackoverflow.com', score: 54, answerCount: 3, viewCount: 7300, isAnswered: true, tags: ['react', 'fetch', 'abort-controller'], askedAt: new Date(Date.now() - 36000000).toISOString(), owner: 'frontend_eng' },
  { id: 'so-7', title: 'Rust lifetime error: cannot borrow `x` as mutable more than once at a time', url: 'https://stackoverflow.com', score: 48, answerCount: 2, viewCount: 3200, isAnswered: true, tags: ['rust', 'borrow-checker', 'lifetimes'], askedAt: new Date(Date.now() - 43200000).toISOString(), owner: 'rustacean_new' },
  { id: 'so-8', title: 'Docker container exits immediately after starting — no error in logs', url: 'https://stackoverflow.com', score: 41, answerCount: 6, viewCount: 18000, isAnswered: true, tags: ['docker', 'containers', 'debugging'], askedAt: new Date(Date.now() - 50400000).toISOString(), owner: 'devops_james' },
];

// ─── Hacker News Mock ─────────────────────────────────────────
// Global data — same for UK and US

export const MOCK_HACKERNEWS: HackerNewsStory[] = [
  { id: 'hn-1', title: 'Show HN: I built a terminal code review tool with the Claude API', url: 'https://news.ycombinator.com', score: 487, commentCount: 134, author: 'devhacker42', publishedAt: new Date(Date.now() - 3600000).toISOString(), type: 'show' },
  { id: 'hn-2', title: 'The hidden cost of LLM context windows (2025)', url: 'https://news.ycombinator.com', score: 412, commentCount: 98, author: 'ai_researcher', publishedAt: new Date(Date.now() - 7200000).toISOString(), type: 'story' },
  { id: 'hn-3', title: 'Rust is now the fastest-growing language on GitHub for the third year running', url: 'https://news.ycombinator.com', score: 389, commentCount: 211, author: 'rustacean_pro', publishedAt: new Date(Date.now() - 10800000).toISOString(), type: 'story' },
  { id: 'hn-4', title: "Ask HN: What's your current AI coding assistant setup?", url: 'https://news.ycombinator.com', score: 341, commentCount: 287, author: 'curious_dev', publishedAt: new Date(Date.now() - 14400000).toISOString(), type: 'ask' },
  { id: 'hn-5', title: 'PostgreSQL 18 released with native columnar storage', url: 'https://news.ycombinator.com', score: 298, commentCount: 143, author: 'db_nerd', publishedAt: new Date(Date.now() - 18000000).toISOString(), type: 'story' },
  { id: 'hn-6', title: 'WebAssembly components are changing how we think about microservices', url: 'https://news.ycombinator.com', score: 267, commentCount: 89, author: 'wasm_fan', publishedAt: new Date(Date.now() - 21600000).toISOString(), type: 'story' },
  { id: 'hn-7', title: 'Show HN: Open-source alternative to Vercel built on Cloudflare Workers', url: 'https://news.ycombinator.com', score: 243, commentCount: 112, author: 'indie_hacker', publishedAt: new Date(Date.now() - 25200000).toISOString(), type: 'show' },
  { id: 'hn-8', title: 'The end of the junior developer? A data-driven look at hiring trends', url: 'https://news.ycombinator.com', score: 218, commentCount: 334, author: 'hiring_analyst', publishedAt: new Date(Date.now() - 28800000).toISOString(), type: 'story' },
  { id: 'hn-9', title: 'Deno 3.0 ships with full Node.js compatibility and 10x faster cold starts', url: 'https://news.ycombinator.com', score: 197, commentCount: 76, author: 'js_runtime', publishedAt: new Date(Date.now() - 32400000).toISOString(), type: 'story' },
  { id: 'hn-10', title: 'Ask HN: How are you using AI agents in production today?', url: 'https://news.ycombinator.com', score: 176, commentCount: 198, author: 'prod_engineer', publishedAt: new Date(Date.now() - 36000000).toISOString(), type: 'ask' },
];

// ─── Dev.to Mock ──────────────────────────────────────────────
// Global data — same for UK and US

export const MOCK_DEVTO: DevToArticle[] = [
  { id: 'dt-1', title: 'Building a Real-Time Dashboard with Next.js 14 and Server-Sent Events', url: 'https://dev.to', description: 'A step-by-step guide to streaming live data into your React app without WebSockets.', tags: ['nextjs', 'typescript', 'react'], reactions: 892, commentCount: 67, readingTime: 8, author: 'Sarah Chen', publishedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'dt-2', title: 'Why I Switched From REST to tRPC and Never Looked Back', url: 'https://dev.to', description: 'End-to-end type safety changed how I think about API design entirely.', tags: ['typescript', 'trpc', 'api'], reactions: 743, commentCount: 54, readingTime: 6, author: 'Marcus O\'Brien', publishedAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'dt-3', title: 'Understanding Rust Ownership in 10 Minutes', url: 'https://dev.to', description: 'The borrow checker doesn\'t have to be scary. Here\'s the mental model that finally made it click.', tags: ['rust', 'beginners', 'programming'], reactions: 681, commentCount: 43, readingTime: 10, author: 'Lena Müller', publishedAt: new Date(Date.now() - 14400000).toISOString() },
  { id: 'dt-4', title: 'CSS Container Queries Are Here — Here\'s How to Use Them Today', url: 'https://dev.to', description: 'Stop relying on viewport widths. Container queries let components respond to their own size.', tags: ['css', 'webdev', 'frontend'], reactions: 612, commentCount: 38, readingTime: 5, author: 'Jake Torres', publishedAt: new Date(Date.now() - 18000000).toISOString() },
  { id: 'dt-5', title: 'I Analysed 1,000 AI-Generated PRs — Here\'s What I Found', url: 'https://dev.to', description: 'Six months of data on code quality, review time, and bug rates from AI-assisted development.', tags: ['ai', 'productivity', 'devops'], reactions: 578, commentCount: 92, readingTime: 12, author: 'Priya Sharma', publishedAt: new Date(Date.now() - 21600000).toISOString() },
  { id: 'dt-6', title: 'Stop Over-Engineering Your Database Schema', url: 'https://dev.to', description: 'Most apps need three tables and a foreign key. Here\'s when to reach for complexity.', tags: ['database', 'postgres', 'architecture'], reactions: 534, commentCount: 61, readingTime: 7, author: 'Tom Wu', publishedAt: new Date(Date.now() - 28800000).toISOString() },
  { id: 'dt-7', title: 'The Complete Guide to Streaming LLM Responses in a React App', url: 'https://dev.to', description: 'How to wire up Server-Sent Events, useReducer, and the Vercel AI SDK for buttery-smooth streaming.', tags: ['ai', 'react', 'tutorial'], reactions: 498, commentCount: 45, readingTime: 9, author: 'Amara Diallo', publishedAt: new Date(Date.now() - 36000000).toISOString() },
  { id: 'dt-8', title: 'Practical Guide to Web Performance in 2026', url: 'https://dev.to', description: 'INP replaced FID in Core Web Vitals. Here\'s what to actually measure and fix.', tags: ['performance', 'webdev', 'javascript'], reactions: 467, commentCount: 33, readingTime: 11, author: 'Nico Bianchi', publishedAt: new Date(Date.now() - 43200000).toISOString() },
  { id: 'dt-9', title: 'How I Built a $5k/month SaaS With Just Next.js and SQLite', url: 'https://dev.to', description: 'No Kubernetes, no microservices, no drama. Sometimes boring is best.', tags: ['nextjs', 'saas', 'indie'], reactions: 441, commentCount: 78, readingTime: 14, author: 'Finn Larsen', publishedAt: new Date(Date.now() - 50400000).toISOString() },
  { id: 'dt-10', title: 'Why Your useState Is Lying to You (and How to Fix It)', url: 'https://dev.to', description: 'Stale closures, batched updates, and the three patterns that eliminate 90% of React state bugs.', tags: ['react', 'javascript', 'hooks'], reactions: 412, commentCount: 57, readingTime: 6, author: 'Dev Kapoor', publishedAt: new Date(Date.now() - 57600000).toISOString() },
];

// ─── npm Downloads Mock ───────────────────────────────────────
// Global data — most downloaded npm packages this week

export const MOCK_NPM: NpmPackage[] = [
  { id: 'npm-1', name: 'react', description: 'React is a JavaScript library for building user interfaces.', weeklyDownloads: 52400000, version: '18.3.1', keywords: ['react'], url: 'https://www.npmjs.com/package/react', publishedAt: new Date(Date.now() - 2592000000).toISOString() },
  { id: 'npm-2', name: 'typescript', description: 'TypeScript is a language for application-scale JavaScript development.', weeklyDownloads: 48100000, version: '5.4.5', keywords: ['typescript', 'language'], url: 'https://www.npmjs.com/package/typescript', publishedAt: new Date(Date.now() - 5184000000).toISOString() },
  { id: 'npm-3', name: 'next', description: 'The React Framework for the Web.', weeklyDownloads: 7800000, version: '14.2.3', keywords: ['react', 'nextjs', 'ssr'], url: 'https://www.npmjs.com/package/next', publishedAt: new Date(Date.now() - 604800000).toISOString() },
  { id: 'npm-4', name: 'tailwindcss', description: 'A utility-first CSS framework for rapidly building custom user interfaces.', weeklyDownloads: 11200000, version: '3.4.3', keywords: ['css', 'tailwind'], url: 'https://www.npmjs.com/package/tailwindcss', publishedAt: new Date(Date.now() - 1209600000).toISOString() },
  { id: 'npm-5', name: 'zod', description: 'TypeScript-first schema declaration and validation library.', weeklyDownloads: 6900000, version: '3.23.8', keywords: ['typescript', 'validation'], url: 'https://www.npmjs.com/package/zod', publishedAt: new Date(Date.now() - 864000000).toISOString() },
  { id: 'npm-6', name: 'vite', description: 'Next generation frontend tooling. It is fast!', weeklyDownloads: 14500000, version: '5.2.11', keywords: ['vite', 'bundler'], url: 'https://www.npmjs.com/package/vite', publishedAt: new Date(Date.now() - 432000000).toISOString() },
  { id: 'npm-7', name: 'openai', description: 'The official Node.js / Typescript library for the OpenAI API.', weeklyDownloads: 3200000, version: '4.52.7', keywords: ['openai', 'ai'], url: 'https://www.npmjs.com/package/openai', publishedAt: new Date(Date.now() - 259200000).toISOString() },
  { id: 'npm-8', name: 'drizzle-orm', description: 'Headless TypeScript ORM with a head.', weeklyDownloads: 980000, version: '0.31.2', keywords: ['orm', 'database', 'sql'], url: 'https://www.npmjs.com/package/drizzle-orm', publishedAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'npm-9', name: 'shadcn-ui', description: 'Beautifully designed components that you can copy and paste into your apps.', weeklyDownloads: 420000, version: '0.8.0', keywords: ['ui', 'components', 'radix'], url: 'https://www.npmjs.com/package/shadcn-ui', publishedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'npm-10', name: '@anthropic-ai/sdk', description: 'The official TypeScript library for the Anthropic API.', weeklyDownloads: 780000, version: '0.24.3', keywords: ['anthropic', 'claude', 'ai'], url: 'https://www.npmjs.com/package/@anthropic-ai/sdk', publishedAt: new Date(Date.now() - 518400000).toISOString() },
];

// ─── crates.io Mock ───────────────────────────────────────────
// Global data — trending Rust crates

export const MOCK_CRATES: CratesPackage[] = [
  { id: 'cr-1', name: 'serde', description: 'A generic serialization/deserialization framework.', recentDownloads: 14800000, totalDownloads: 890000000, version: '1.0.203', keywords: ['serde', 'serialization'], url: 'https://crates.io/crates/serde', updatedAt: new Date(Date.now() - 604800000).toISOString() },
  { id: 'cr-2', name: 'tokio', description: 'An event-driven, non-blocking I/O platform for writing async Rust.', recentDownloads: 9200000, totalDownloads: 540000000, version: '1.38.0', keywords: ['async', 'runtime', 'io'], url: 'https://crates.io/crates/tokio', updatedAt: new Date(Date.now() - 432000000).toISOString() },
  { id: 'cr-3', name: 'reqwest', description: 'An ergonomic, batteries-included HTTP Client for Rust.', recentDownloads: 6700000, totalDownloads: 320000000, version: '0.12.5', keywords: ['http', 'client', 'async'], url: 'https://crates.io/crates/reqwest', updatedAt: new Date(Date.now() - 1209600000).toISOString() },
  { id: 'cr-4', name: 'clap', description: 'A full featured, fast Command Line Argument Parser for Rust.', recentDownloads: 5900000, totalDownloads: 280000000, version: '4.5.7', keywords: ['cli', 'argument', 'parser'], url: 'https://crates.io/crates/clap', updatedAt: new Date(Date.now() - 864000000).toISOString() },
  { id: 'cr-5', name: 'axum', description: 'Web framework that focuses on ergonomics and modularity.', recentDownloads: 4100000, totalDownloads: 160000000, version: '0.7.5', keywords: ['web', 'http', 'async'], url: 'https://crates.io/crates/axum', updatedAt: new Date(Date.now() - 259200000).toISOString() },
  { id: 'cr-6', name: 'anyhow', description: 'Flexible concrete Error type built on std::error::Error.', recentDownloads: 7800000, totalDownloads: 420000000, version: '1.0.86', keywords: ['error', 'handling'], url: 'https://crates.io/crates/anyhow', updatedAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'cr-7', name: 'sqlx', description: 'Async, pure Rust SQL crate featuring compile-time checked queries.', recentDownloads: 2800000, totalDownloads: 120000000, version: '0.7.4', keywords: ['sql', 'database', 'async'], url: 'https://crates.io/crates/sqlx', updatedAt: new Date(Date.now() - 518400000).toISOString() },
  { id: 'cr-8', name: 'candle-core', description: 'Minimalist ML framework for Rust.', recentDownloads: 890000, totalDownloads: 28000000, version: '0.6.0', keywords: ['ml', 'machine-learning', 'tensor'], url: 'https://crates.io/crates/candle-core', updatedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'cr-9', name: 'ratatui', description: 'A Rust library to build rich terminal user interfaces.', recentDownloads: 1200000, totalDownloads: 42000000, version: '0.27.0', keywords: ['tui', 'terminal', 'ui'], url: 'https://crates.io/crates/ratatui', updatedAt: new Date(Date.now() - 345600000).toISOString() },
  { id: 'cr-10', name: 'tauri', description: 'Make tiny, secure apps for all desktop platforms with Rust.', recentDownloads: 760000, totalDownloads: 32000000, version: '1.8.0', keywords: ['desktop', 'gui', 'web'], url: 'https://crates.io/crates/tauri', updatedAt: new Date(Date.now() - 691200000).toISOString() },
];

// ─── Lobste.rs Mock ───────────────────────────────────────────
// Global data — hottest tech stories

export const MOCK_LOBSTERS: LobstersStory[] = [
  { id: 'lb-1', title: 'Writing a simple garbage collector in C', url: 'https://lobste.rs', score: 112, commentCount: 34, author: 'hacker_gc', publishedAt: new Date(Date.now() - 3600000).toISOString(), tags: ['c', 'programming'] },
  { id: 'lb-2', title: 'Why I stopped using Kubernetes for my side projects', url: 'https://lobste.rs', score: 98, commentCount: 67, author: 'devops_honest', publishedAt: new Date(Date.now() - 7200000).toISOString(), tags: ['devops', 'kubernetes'] },
  { id: 'lb-3', title: 'The unreasonable effectiveness of simple hash tables', url: 'https://lobste.rs', score: 87, commentCount: 21, author: 'algo_nerd', publishedAt: new Date(Date.now() - 10800000).toISOString(), tags: ['algorithms', 'performance'] },
  { id: 'lb-4', title: 'Building a programming language in a weekend with Rust', url: 'https://lobste.rs', score: 76, commentCount: 45, author: 'rustlang_fan', publishedAt: new Date(Date.now() - 14400000).toISOString(), tags: ['rust', 'compilers'] },
  { id: 'lb-5', title: 'How I reduced my PostgreSQL query time by 100x', url: 'https://lobste.rs', score: 71, commentCount: 28, author: 'pg_wizard', publishedAt: new Date(Date.now() - 18000000).toISOString(), tags: ['postgresql', 'performance'] },
  { id: 'lb-6', title: 'The return of the monolith: rethinking microservices in 2026', url: 'https://lobste.rs', score: 65, commentCount: 89, author: 'arch_thinker', publishedAt: new Date(Date.now() - 21600000).toISOString(), tags: ['architecture', 'web'] },
  { id: 'lb-7', title: 'An interactive guide to Flexbox', url: 'https://lobste.rs', score: 58, commentCount: 12, author: 'css_lover', publishedAt: new Date(Date.now() - 28800000).toISOString(), tags: ['css', 'webdev'] },
  { id: 'lb-8', title: 'SQLite is not a toy database', url: 'https://lobste.rs', score: 54, commentCount: 43, author: 'sqlite_fan', publishedAt: new Date(Date.now() - 36000000).toISOString(), tags: ['databases', 'sqlite'] },
  { id: 'lb-9', title: 'The history and future of RSS', url: 'https://lobste.rs', score: 49, commentCount: 31, author: 'rss_believer', publishedAt: new Date(Date.now() - 43200000).toISOString(), tags: ['web', 'standards'] },
  { id: 'lb-10', title: 'Making a CPU from scratch: day 30 update', url: 'https://lobste.rs', score: 44, commentCount: 18, author: 'hardware_hacker', publishedAt: new Date(Date.now() - 50400000).toISOString(), tags: ['hardware', 'electronics'] },
];

// ─── Docker Hub Mock ──────────────────────────────────────────
// Global data — most pulled official Docker images

export const MOCK_DOCKER: DockerImage[] = [
  { id: 'dk-1', name: 'nginx', description: 'Official build of Nginx, the high-performance HTTP server and reverse proxy.', pullCount: 1800000000, starCount: 20200, isOfficial: true, url: 'https://hub.docker.com/_/nginx', updatedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'dk-2', name: 'python', description: 'The official Python Docker image for all Python versions.', pullCount: 1600000000, starCount: 9800, isOfficial: true, url: 'https://hub.docker.com/_/python', updatedAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'dk-3', name: 'node', description: 'Official Node.js Docker image, built from the official Node.js release.', pullCount: 1500000000, starCount: 13200, isOfficial: true, url: 'https://hub.docker.com/_/node', updatedAt: new Date(Date.now() - 259200000).toISOString() },
  { id: 'dk-4', name: 'postgres', description: 'The PostgreSQL object-relational database system.', pullCount: 1100000000, starCount: 15400, isOfficial: true, url: 'https://hub.docker.com/_/postgres', updatedAt: new Date(Date.now() - 345600000).toISOString() },
  { id: 'dk-5', name: 'redis', description: 'Redis is an open-source, in-memory key-value data structure store.', pullCount: 1000000000, starCount: 13100, isOfficial: true, url: 'https://hub.docker.com/_/redis', updatedAt: new Date(Date.now() - 432000000).toISOString() },
  { id: 'dk-6', name: 'mysql', description: 'MySQL is the world\'s most popular open source database.', pullCount: 980000000, starCount: 15300, isOfficial: true, url: 'https://hub.docker.com/_/mysql', updatedAt: new Date(Date.now() - 518400000).toISOString() },
  { id: 'dk-7', name: 'grafana/grafana', description: 'The open and composable observability and data visualization platform.', pullCount: 420000000, starCount: 3200, isOfficial: false, url: 'https://hub.docker.com/r/grafana/grafana', updatedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'dk-8', name: 'ollama/ollama', description: 'Get up and running with local large language models.', pullCount: 38000000, starCount: 890, isOfficial: false, url: 'https://hub.docker.com/r/ollama/ollama', updatedAt: new Date(Date.now() - 43200000).toISOString() },
  { id: 'dk-9', name: 'qdrant/qdrant', description: 'Vector database for the next generation of AI applications.', pullCount: 18000000, starCount: 420, isOfficial: false, url: 'https://hub.docker.com/r/qdrant/qdrant', updatedAt: new Date(Date.now() - 129600000).toISOString() },
  { id: 'dk-10', name: 'traefik', description: 'The Cloud Native Application Proxy for modern infrastructure.', pullCount: 580000000, starCount: 5600, isOfficial: true, url: 'https://hub.docker.com/_/traefik', updatedAt: new Date(Date.now() - 216000000).toISOString() },
];
