# MyTranscript.pro — Complete Technical & SEO Audit

**Repository Root:** `c:\Users\Ousy\Documents\Antigravity\RAA`  
**Audit Date:** 2026-11-12  
**Domain:** `https://www.mytranscript.pro`

---

## 1. Project Directory & Routing Tree

### `/app` Directory (49 Files)

```text
app/
├── favicon.ico                                           # Static favicon asset
├── icon.png                                              # Next.js App Router icon
├── apple-icon.png                                        # Next.js App Router Apple touch icon
├── globals.css                                           # Tailwind layers, #040200 / #E02440 CSS variables, glass/glow styles
├── layout.tsx                                            # RootLayout: global metadata, GA4, Organization/WebSite/SoftwareApplication JSON-LD, NavigationShell
├── manifest.ts                                           # Dynamic PWA Web App Manifest (/manifest.webmanifest)
├── page.tsx                                              # Homepage (/) — Client Component ('use client')
├── robots.txt/
│   └── route.ts                                          # Static route handler serving /robots.txt
├── sitemap.xml/
│   └── route.ts                                          # Static route handler serving /sitemap.xml
├── feed.xml/
│   └── route.ts                                          # Static route handler serving RSS 2.0 /feed.xml
├── [slug]/
│   └── page.tsx                                          # SSG dynamic tool route (13 slugs in TOOL_SLUGS)
├── summary/
│   └── [videoId]/
│       └── page.tsx                                      # Dynamic SSR video workspace (/summary/[videoId])
├── chapters/
│   └── page.tsx                                          # SSG tool landing page (/chapters)
├── infographic/
│   └── page.tsx                                          # SSG tool landing page (/infographic)
├── prompt/
│   └── page.tsx                                          # SSG tool landing page (/prompt)
├── download-youtube-transcript/
│   └── page.tsx                                          # SSG tool landing page (/download-youtube-transcript)
├── youtube-to-srt/
│   └── page.tsx                                          # SSG tool landing page (/youtube-to-srt)
├── youtube-to-text-no-timestamps/
│   └── page.tsx                                          # SSG tool landing page (/youtube-to-text-no-timestamps)
├── articles/
│   ├── page.tsx                                          # SSG articles index (/articles)
│   ├── free-podcast-transcript-generator/
│   │   └── page.tsx                                      # SSG flagship article (/articles/free-podcast-transcript-generator)
│   └── [slug]/
│       └── page.tsx                                      # SSG article detail pages (10 posts in BLOG_POSTS excluding flagship)
├── app/
│   ├── page.tsx                                          # Permanent redirect /app -> /
│   ├── [tool]/
│   │   └── page.tsx                                      # SSG redirect handler (/app/key-takeaways, /app/podcast-transcript, /app/chatbot)
│   ├── articles/
│   │   └── free-podcast-transcript-generator/
│   │       └── page.tsx                                  # Redirect -> /articles/free-podcast-transcript-generator
│   ├── chapters/
│   │   └── page.tsx                                      # Re-exports default & metadata from @/app/chapters/page
│   ├── download-youtube-transcript/
│   │   └── page.tsx                                      # Re-exports default & metadata from @/app/download-youtube-transcript/page
│   ├── infographic/
│   │   └── page.tsx                                      # Re-exports default & metadata from @/app/infographic/page
│   ├── prompt/
│   │   └── page.tsx                                      # Re-exports default & metadata from @/app/prompt/page
│   ├── youtube-to-srt/
│   │   └── page.tsx                                      # Re-exports default & metadata from @/app/youtube-to-srt/page
│   └── youtube-to-text-no-timestamps/
│       └── page.tsx                                      # Re-exports default & metadata from @/app/youtube-to-text-no-timestamps/page
├── about-us/
│   └── page.tsx                                          # SSG static page (/about-us)
├── contact-us/
│   └── page.tsx                                          # SSG static page (/contact-us)
├── privacy-policy/
│   └── page.tsx                                          # SSG static page (/privacy-policy)
├── terms-of-service/
│   └── page.tsx                                          # SSG static page (/terms-of-service)
├── disclaimer/
│   └── page.tsx                                          # SSG static page (/disclaimer)
├── copyright-policy/
│   └── page.tsx                                          # SSG static page (/copyright-policy)
├── Xdmin99/
│   └── page.tsx                                          # Admin dashboard (/Xdmin99) — Client Component ('use client')
└── api/
    ├── transcript/
    │   └── route.ts                                      # POST: Extract video ID, metadata, 6-tier transcript + AI formatting
    ├── metadata/
    │   └── route.ts                                      # GET (cached 1h CDN) & POST: YouTube metadata lookup
    ├── summarize/
    │   └── route.ts                                      # POST: Single-section AI generation (defaults to 'takeaways')
    ├── regenerate/
    │   └── route.ts                                      # POST: On-demand AI generation/regeneration per tab section
    ├── chat/
    │   └── route.ts                                      # POST: Interactive transcript Q&A chat with fallback chain
    ├── models/
    │   ├── route.ts                                      # GET/POST: Lists Gemini presets & live free OpenRouter models
    │   └── test/
    │       └── route.ts                                  # POST: Latency/connectivity test for Gemini or OpenRouter models
    ├── pages/
    │   └── route.ts                                      # GET: Reads published CMS pages from data/pages.json
    └── admin/
        ├── check/
        │   └── route.ts                                  # GET: Validates admin_session cookie
        ├── login/
        │   └── route.ts                                  # POST: Authenticates admin & sets HTTP-only cookie
        ├── logout/
        │   └── route.ts                                  # POST: Clears admin_session cookie
        └── settings/
            └── route.ts                                  # GET/POST: In-memory admin settings & pages.json writer
```

### `/public` Directory (13 Files)

```text
public/
├── apple-touch-icon.png                                  # 23.0 KB — iOS home screen icon (180x180)
├── favicon.ico                                           # 6.7 KB — Legacy browser favicon
├── icon.png                                              # 174.7 KB — App icon (referenced by manifest & layout)
├── logo.png                                              # 174.7 KB — Primary brand emblem (header, footer, OG, PWA)
├── key-takeaways-preview.png                             # 69.9 KB — Flagship article screenshot (Section 4)
├── podcast-workflow-guide.png                            # 52.3 KB — Flagship article hero image
├── srt-subtitle-export.png                               # 73.2 KB — Flagship article screenshot (Section 3)
├── images/
│   └── articles/
│       ├── key-takeaways-preview.png                     # 69.9 KB — Duplicate copy of article image
│       ├── podcast-workflow-guide.png                    # 52.3 KB — Duplicate copy of article image
│       └── srt-subtitle-export.png                       # 73.2 KB — Duplicate copy of article image
├── llms.txt                                              # 6.7 KB — Concise AI/LLM site manifest
├── llms-full.txt                                         # 7.6 KB — Extended AI/LLM platform documentation
└── robots.txt                                            # 0.3 KB — Static robots.txt file (conflicts with app/robots.txt/route.ts)
```

---

## 2. Tech Stack & Core Dependencies

Source: `package.json` (`name: "youtube-summarizer"`, `version: "0.1.0"`).

| Category | Package / Technology | Version | Role in Codebase |
| :--- | :--- | :--- | :--- |
| **Framework** | `next` | `^14.2.0` | Next.js 14 App Router (SSG, dynamic routes, route handlers, `next/image`, Metadata API) |
| **UI Runtime** | `react`, `react-dom` | `^18.3.0` | React 18 client/server rendering |
| **Language** | `typescript`, `@types/node`, `@types/react`, `@types/react-dom` | `^5.5.0` / `^20.0.0` / `^18.3.0` | Strict static typing across `app/`, `components/`, and `lib/` |
| **AI SDK (Gemini)** | `@google/genai` | `^1.0.0` | Primary AI SDK (`GoogleGenAI`) used in `lib/aiFallback.ts`, `lib/gemini.ts`, `app/api/models/test/route.ts` |
| **AI Provider (OpenRouter)** | Native `fetch` REST client | N/A (built-in) | Calls `https://openrouter.ai/api/v1/chat/completions` & `/api/v1/models` |
| **Transcript Extraction** | `youtube-transcript` + custom `fetch` scrapers | `^1.3.0` | 2nd-tier fallback inside `lib/youtube.ts` alongside 5 custom InnerTube/HTML/TimedText/Invidious extractors |
| **UI Icons & Markdown** | `lucide-react`, `react-markdown` | `^0.400.0`, `^9.0.0` | Iconography and Markdown rendering for full AI summaries |
| **Styling** | `tailwindcss`, `@tailwindcss/typography`, `postcss`, `autoprefixer` | `^3.4.0`, `^0.5.0`, `^8.4.0`, `^10.4.0` | Custom dark palette (`#040200` base charcoal, `#E02440` ruby accent) in `tailwind.config.js` and `app/globals.css` |
| **Image Config** | `next.config.mjs` | — | Configures `images.remotePatterns` for `https://img.youtube.com` and `https://i.ytimg.com` |

---

## 3. Transcript & AI Processing Architecture

### Step-by-Step Request Lifecycle

1. **URL Submission & Immediate Navigation (`app/page.tsx`, `components/SeoLandingTool.tsx`, `components/GscLandingToolLayout.tsx`)**:
   - The user pastes a YouTube URL or 11-character ID. Client-side `extractVideoId()` (`lib/youtube.ts`) validates 6 formats: direct 11-char ID, `?v=`, `youtu.be/`, `/shorts/`, `/embed/`, `/live/`, and `/v/`.
   - Rather than blocking on the homepage, the app immediately navigates via `router.push('/summary/' + videoId)` (or `/summary/${videoId}?tab=${targetTab}` from tool landing pages).

2. **Parallel Video Embed & Metadata Load (`app/summary/[videoId]/page.tsx`, `components/SummaryClientView.tsx`, `components/VideoPlayerColumn.tsx`)**:
   - `SummaryPage` validates the 11-char `videoId` regex and renders `<SummaryClientView videoId={videoId} />` with no blocking server transcript call.
   - `VideoPlayerColumn` mounts `<iframe src="https://www.youtube.com/embed/${cleanVideoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1" />` immediately on initial render. The `"Syncing Transcript"` badge uses `pointer-events-none select-none` and only appears once `isPlaying && isIframeLoaded && !hasError`.
   - In parallel on mount, `SummaryClientView` fires `GET /api/metadata?videoId=${videoId}` (`maxDuration = 15`) to quickly populate video title, channel name, formatted views, publish date, duration, and category.

3. **6-Tier Transcript Extraction (`POST /api/transcript` → `lib/youtube.ts`)**:
   - `POST /api/transcript` (`maxDuration = 60`) calls `getVideoMetadata(videoId)` and `getTranscript(videoId)` sequentially:
     1. **Tier 1 — InnerTube `ANDROID` Client (`20.10.38`)**: `POST https://www.youtube.com/youtubei/v1/player?prettyPrint=false` (6s timeout), selects English or first caption track, fetches `track.baseUrl` (6s timeout).
     2. **Tier 2 — `youtube-transcript` NPM Package**: `YoutubeTranscript.fetchTranscript(videoId)`.
     3. **Tier 3 — InnerTube `TVHTML5_SIMPLY_EMBEDDED_PLAYER` Client (`2.0`)**: Embedded player API call (6s timeout) + `baseUrl` fetch (6s timeout).
     4. **Tier 4 — Watch Page HTML Scraping**: Fetches `https://www.youtube.com/watch?v=${videoId}` with consent cookies (`CONSENT=YES+1; SOCS=...; GPS=1`, 6s timeout), splits HTML at `"captionTracks":`, parses JSON track array, fetches `track.baseUrl`.
     5. **Tier 5 — Direct `/api/timedtext` Endpoints**: Tries 4 English URL variants (`fmt=json3`, `kind=asr&fmt=json3`, plain XML, `kind=asr` XML; 3.5s timeout each).
     6. **Tier 6 — Public Invidious Mirrors**: Queries `https://inv.nadeko.net`, `https://invidious.nerdvpn.de`, and `https://vid.puffyan.us` `/api/v1/captions/${videoId}` (4s timeout each).
   - **Universal Caption Parser (`parseTranscriptContent`)**: Handles `JSON3` (`events[].segs`), modern `srv3` (`<p t="..." d="...">`), classic XML (`<text start="..." dur="...">`), and `WebVTT` (`WEBVTT` / `-->`), decoding HTML numeric/named entities.
   - **AI Formatting & Sampling (`formatTranscriptForAI`)**: Downsamples evenly above `1,500` caption entries and caps output at `60,000` characters, appending `[... Transcript sampled to fit AI processing limits ...]` if truncated.
   - **No-Caption Fallback**: If all 6 tiers fail, `POST /api/transcript` catches the error and returns HTTP `200` with `transcript: []`, `formattedTranscript: ''`, and a `transcriptWarning` message so downstream AI calls analyze by `videoUrl` + `title` instead of failing hard.

4. **Lazy Single-Tab AI Summarization & Chat (`components/SummaryClientView.tsx` → `/api/regenerate` & `/api/chat`)**:
   - After `/api/transcript` resolves, `SummaryClientView` triggers **only one tab** via `triggerAutoGeneration()` → `POST /api/regenerate` (`takeaways` by default, or `summary` / `infographic` / `chapters` if specified in `?tab=`).
   - Other AI tabs remain idle and only call `POST /api/regenerate` on demand when clicked. Results are stored in React state and cached in `sessionStorage` (`yt-summary-${videoId}`).
   - Note: `POST /api/summarize` (`maxDuration = 60`) also exists and enforces `sectionToGen = section || 'takeaways'`, though `SummaryClientView` routes all section generations through `POST /api/regenerate` (`maxDuration = 60`).
   - `ChatRightColumn` sends conversation history + transcript context (or `videoUrl` fallback) to `POST /api/chat` (`maxDuration = 60`).

5. **Multi-Provider AI Fallback Chain (`lib/aiFallback.ts`)**:
   - `getFallbackTargets(options)` constructs an ordered target list:
     1. **User-Preferred OpenRouter Model** (if `preferredProvider === 'openrouter'` and `openrouterApiKey` + `openrouterModel` are supplied from `localStorage` `yt-summarizer-settings`).
     2. **Google Gemini Chain** (if `GEMINI_API_KEY` is set): `options.geminiModel` (defaults to `gemini-2.5-flash`) → `gemini-2.5-flash` → `gemini-3.5-flash` → `gemini-3.5-flash-lite`.
     3. **OpenRouter Free Fallback Models** (if `options.openrouterApiKey` or server `OPENROUTER_API_KEY` is set): `openrouter/free` → `google/gemma-4-31b-it:free` → `google/gemma-4-26b-a4b-it:free`.
   - `runWithFallbackChain()` sequentially executes each target inside a `try/catch` and only throws if every model in the chain fails.
   - Prompt builders (`getSectionPrompt`, `getSummaryPrompt`) and JSON fence strippers (`parseSectionResponse`, `parseSummaryResponse`) live in `lib/gemini.ts`.

6. **Caching & Rate Limits**:
   - **Caching**:
     - `lib/youtube.ts` caches `VideoMetadata` in an in-memory `Map` (`metadataCache`) for **1 hour** (`60 * 60 * 1000` ms) per serverless instance (lost on cold starts).
     - `GET /api/metadata` sets HTTP header `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.
     - Transcripts (`getTranscript`) and AI responses have **no server-side cache** (`sessionStorage` only on the client for AI sections).
   - **Rate Limits**:
     - **None implemented.** No IP throttling, token bucket, Upstash/Redis limiter, or request quota checks exist in `/api/transcript`, `/api/summarize`, `/api/regenerate`, `/api/chat`, or `/api/models/test`. All endpoints rely solely on upstream Gemini/OpenRouter quotas and Vercel's `maxDuration = 60` (`15` for `/api/metadata`, `30` for `/api/models/test`).

---

## 4. Technical SEO & Indexing Configuration

### Exact Contents / Logic of `robots.txt`

There are **two** `robots.txt` sources in the project:

1. **`app/robots.txt/route.ts`** (Route Handler with `dynamic = 'force-static'`):

```ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: /api/

# Core Sitemaps & Machine-Readable Feeds
Sitemap: https://www.mytranscript.pro/sitemap.xml
Feed: https://www.mytranscript.pro/feed.xml

# AI & LLM Documentation Endpoints
LLM: https://www.mytranscript.pro/llms.txt
LLM-Full: https://www.mytranscript.pro/llms-full.txt
`;

export function GET() {
  return new NextResponse(ROBOTS_TXT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=43200, s-maxage=43200',
    },
  });
}
```

2. **`public/robots.txt`** (Static Public File — identical text directives):

```text
User-agent: *
Allow: /
Disallow: /api/

# Core Sitemaps & Machine-Readable Feeds
Sitemap: https://www.mytranscript.pro/sitemap.xml
Feed: https://www.mytranscript.pro/feed.xml

# AI & LLM Documentation Endpoints
LLM: https://www.mytranscript.pro/llms.txt
LLM-Full: https://www.mytranscript.pro/llms-full.txt
```

> **Note:** `/Xdmin99` is **not** disallowed in `robots.txt`. Also, having both `public/robots.txt` and `app/robots.txt/route.ts` creates a static-vs-route conflict in Next.js App Router.

---

### Exact Logic of `app/sitemap.xml/route.ts` (and Dead `lib/sitemap.ts`)

The active sitemap is **`app/sitemap.xml/route.ts`** (`export const dynamic = 'force-static'`, base URL `https://www.mytranscript.pro`, cached for `43200` seconds). Note that there is **no `app/sitemap.ts`** file; Next.js serves `/sitemap.xml` from `app/sitemap.xml/route.ts`:

```ts
export function GET() {
  const today = new Date().toISOString().split('T')[0];

  const CORE_TOOL_PATHS = new Set([
    'youtube-transcript',
    'download-youtube-transcript',
    'youtube-to-srt',
    'youtube-summary',
  ]);

  const SECONDARY_FEATURE_PATHS = [
    'chapters',
    'infographic',
    'prompt',
    'youtube-to-text-no-timestamps',
    'podcast-transcript',
    'youtube-to-text',
    'youtube-transcript-chatbot',
    'youtube-transcript-generator',
    'youtube-summarizer',
    'youtube-subtitle-downloader',
    'transcript-ai',
  ];

  // 1. Homepage (Priority 1.0 | Changefreq: daily) -> https://www.mytranscript.pro/
  // 2. CORE_TOOL_PATHS (Priority 0.9 | Changefreq: weekly)
  // 3. SECONDARY_FEATURE_PATHS + any remaining TOOL_SLUGS (Priority 0.8 | Changefreq: weekly)
  //    (automatically captures 'youtube-transcript-without-timestamps', 'youtube-transcript-not-working', 'youtube-infographic')
  // 4. Articles Index (Priority 0.8 | Changefreq: daily) -> https://www.mytranscript.pro/articles/
  // 5. Individual Articles from BLOG_POSTS (Priority 0.7 | Changefreq: monthly) -> /articles/{post.slug} (uses post.isoDate)
  // 6. Web App UI route (Priority 0.7 | Changefreq: weekly) -> https://www.mytranscript.pro/app/
  // 7. LEGAL_PAGES (Priority 0.4 | Changefreq: monthly) -> about-us, contact-us, privacy-policy, terms-of-service, disclaimer, copyright-policy
}
```

- **Unused Legacy File (`lib/sitemap.ts`)**: `lib/sitemap.ts` is **not imported anywhere**. It defines unused helpers (`buildCoreEntries`, `buildToolEntries`, `renderSitemapIndex`) referencing removed routes (`/blog`, `/faq`, `/privacy`, `/terms`, `/${lang}/...`, `/p/${route}`, `sitemap-tools-1.xml`).

---

### Exact Contents of `public/llms.txt`

```markdown
# MyTranscript.pro

> MyTranscript (https://www.mytranscript.pro) is a high-performance, privacy-friendly AI web platform designed for automated YouTube transcription, plain-text extraction, subtitle downloads, and intelligent video summarization.

## Core Tools & Intent Routes

- [Homepage](https://www.mytranscript.pro/): Instant transcript extraction and AI video summarization engine.
- [YouTube Transcript Generator](https://www.mytranscript.pro/youtube-transcript): Extract and view accurate YouTube transcripts instantly online.
- [Free YouTube Transcript Generator](https://www.mytranscript.pro/youtube-transcript-generator): Generate full transcripts with timestamps, speaker text, and clean export.
- [AI YouTube Video Summarizer](https://www.mytranscript.pro/youtube-summary): Generate instant AI video summaries, bulleted key takeaways, and chapter breakdowns.
- [YouTube Summarizer](https://www.mytranscript.pro/youtube-summarizer): AI video notes, executive briefs, and chapter summaries in seconds.
- [YouTube to Text Converter](https://www.mytranscript.pro/youtube-to-text): Convert YouTube video and audio into clean plain text for notes and research.
- [Podcast Transcript Generator](https://www.mytranscript.pro/podcast-transcript): Generate clean transcripts from YouTube video podcasts.
- [Download YouTube Transcripts](https://www.mytranscript.pro/download-youtube-transcript): Export and download YouTube captions in TXT, SRT, or PDF formats.
- [YouTube to SRT Converter](https://www.mytranscript.pro/youtube-to-srt): Convert YouTube videos to standard SubRip (.srt) subtitle files with millisecond timecodes for Premiere Pro, DaVinci Resolve, and Final Cut.
- [YouTube to Text Without Timestamps](https://www.mytranscript.pro/youtube-to-text-no-timestamps): Extract continuous plain text dialogue without timecodes for ChatGPT, Claude, and study notes.
- [YouTube Subtitle Downloader](https://www.mytranscript.pro/youtube-subtitle-downloader): Free online downloader for closed captions and subtitles.
- [YouTube Transcript Chatbot](https://www.mytranscript.pro/youtube-transcript-chatbot): Chat directly with any YouTube video transcript using AI.
- [YouTube Transcript Without Timestamps](https://www.mytranscript.pro/youtube-transcript-without-timestamps): Clean text extraction without timecodes for pasting into notes or AI models.
- [YouTube Transcript Not Working](https://www.mytranscript.pro/youtube-transcript-not-working): Troubleshoot and extract transcripts when YouTube player captions fail.
- [YouTube to Infographic](https://www.mytranscript.pro/youtube-infographic): Transform video dialogue into visual stat cards and memorable quotes.
- [YouTube Chapters Generator](https://www.mytranscript.pro/chapters): Automatically generate YouTube chapters with timestamps for video description boxes and navigation.
- [Visual Infographic Generator](https://www.mytranscript.pro/infographic): Turn video transcripts into shareable visual infographic cards with key stats and quotes.
- [YouTube AI Prompt Generator](https://www.mytranscript.pro/prompt): Generate high-fidelity visual image prompts and 4-panel comic scripts from video dialogue.
- [Transcript AI Assistant](https://www.mytranscript.pro/transcript-ai): Interactive video Q&A and transcript comprehension assistant.
- [Web App Interface](https://www.mytranscript.pro/app/): Full-screen workspace for transcription processing and AI analysis.

## Key Articles & Guides

- [Free Podcast Transcript Generator](https://www.mytranscript.pro/articles/free-podcast-transcript-generator): Flagship tutorial on converting video podcasts into text, exporting SRT subtitles, and distilling AI takeaways for free.
- [Articles Knowledge Base](https://www.mytranscript.pro/articles/): Practical guides and tutorials on video transcription and AI summarization.
- [How to Get a YouTube Transcript](https://www.mytranscript.pro/articles/how-to-get-youtube-transcript): Step-by-step tutorial for desktop and mobile devices.
- [Why YouTube Transcript Is Not Showing & Fixes](https://www.mytranscript.pro/articles/why-youtube-transcript-not-showing-fix): Troubleshooting missing captions on YouTube.
- [How to Summarize Long YouTube Videos](https://www.mytranscript.pro/articles/how-to-summarize-youtube-videos-ai): Guide to extracting key takeaways with AI.
- [Download YouTube Subtitles as TXT/SRT](https://www.mytranscript.pro/articles/download-youtube-subtitles-srt-txt): How to export video subtitles for editors and creators.
- [Extract Transcripts from Video Podcasts](https://www.mytranscript.pro/articles/extract-podcast-transcript-youtube): Turning long video podcasts into readable notes.
- [AI Summarization Techniques](https://www.mytranscript.pro/articles/how-to-summarize-youtube-videos-with-ai): Comprehensive guide to summarizing video content with modern LLMs.
- [YouTube Transcript to Text Best Practices](https://www.mytranscript.pro/articles/youtube-transcript-to-text-best-practices): Professional workflows for repurposing video dialogue into blog posts and documentation.
- [Gemini vs OpenRouter for Video Analysis](https://www.mytranscript.pro/articles/gemini-vs-openrouter-for-video-analysis): Benchmarks comparing AI models on long-context video comprehension.
- [YouTube Caption Accuracy Study (2026)](https://www.mytranscript.pro/articles/youtube-caption-accuracy-study-2026): In-depth research on automatic speech recognition (ASR) accuracy.

## Technical Architecture & Privacy

- **Framework**: Next.js App Router, React, and Tailwind CSS.
- **AI Capabilities**: Powered by high-context LLMs (Google Gemini 2.5 Flash and OpenRouter) for rapid video comprehension and structured transcript formatting.
- **Privacy First**: Zero persistent user tracking, no mandatory registration, and zero data retention.

## Legal & Information

- [About Us](https://www.mytranscript.pro/about-us): Mission, technology, and background.
- [Contact Us](https://www.mytranscript.pro/contact-us): Support, inquiries, and feedback.
- [Privacy Policy](https://www.mytranscript.pro/privacy-policy): Privacy practices and zero-retention policy.
- [Terms of Service](https://www.mytranscript.pro/terms-of-service): Terms and acceptable use guidelines.
- [Disclaimer](https://www.mytranscript.pro/disclaimer): AI content liability information.
- [Copyright Policy](https://www.mytranscript.pro/copyright-policy): IP handling and DMCA notices.

## Machine-Readable Resources

- [XML Sitemap](https://www.mytranscript.pro/sitemap.xml): Primary sitemap index.
- [RSS Feed](https://www.mytranscript.pro/feed.xml): Automated RSS 2.0 articles and tutorials feed.
- [Robots.txt](https://www.mytranscript.pro/robots.txt): Crawler rules and indexing directives.
- [LLMs Manifest](https://www.mytranscript.pro/llms.txt): Machine-readable summary for AI agents and LLMs.
```

---

### Rendering Strategy, `generateMetadata`, and JSON-LD Verification

| Route / File | Rendering Mode | Metadata Implementation | JSON-LD Schema |
| :--- | :--- | :--- | :--- |
| `app/layout.tsx` | Server Component | Global `metadata` (`metadataBase: https://www.mytranscript.pro`, canonical `https://www.mytranscript.pro/`, `robots: index, follow`, verification, RSS alternate) | `Organization`, `WebSite`, `SoftwareApplication` (on every page) |
| `app/page.tsx` (`/`) | `'use client'` (Client Component) | Inherits `layout.tsx` defaults (no page-level `metadata` export) | Inherited from `layout.tsx` only |
| `app/chapters/page.tsx`, `app/infographic/page.tsx`, `app/prompt/page.tsx`, `app/download-youtube-transcript/page.tsx`, `app/youtube-to-srt/page.tsx`, `app/youtube-to-text-no-timestamps/page.tsx` | Server Wrapper (`page.tsx`) + `'use client'` UI (`GscLandingToolLayout`) | Static `export const metadata: Metadata` (title, description, keywords, canonical, OpenGraph, Twitter) | `SoftwareApplication` + `FAQPage` (`@graph`) injected inside `GscLandingToolLayout` |
| `app/[slug]/page.tsx` (13 slugs via `generateStaticParams`) | Server Wrapper + `'use client'` UI (`SeoPageLayout` → `SeoLandingTool`) | Dynamic `generateMetadata` (title, description, canonical, OpenGraph, Twitter) | **None** page-specific (no `FAQPage` or `SoftwareApplication` schema despite having `faqs` UI) |
| `app/articles/page.tsx` (`/articles`) | Server Component (SSG) | Static `export const metadata` (canonical `https://www.mytranscript.pro/articles/`, OG) | **None** (`CollectionPage` / `ItemList` missing) |
| `app/articles/free-podcast-transcript-generator/page.tsx` | Server Component (SSG) | Static `export const metadata` (canonical, `article` OG, Twitter, priority hero `<Image priority quality={80} />`) | `Article`, `HowTo`, `BreadcrumbList`, `FAQPage` (`@graph`) |
| `app/articles/[slug]/page.tsx` (10 slugs via `generateStaticParams`) | Server Component (SSG) | Dynamic `generateMetadata` (canonical, keywords, `article` OG, Twitter) | `Article` + `BreadcrumbList` |
| `app/summary/[videoId]/page.tsx` | Dynamic SSR (`page.tsx`) + `'use client'` (`SummaryClientView`) | Dynamic `generateMetadata` with explicit **`robots: { index: false, follow: false }`** | Client-rendered `SummaryJsonLd` (`VideoObject`, `Article`, `BreadcrumbList`) after `!isLoadingData` |
| `app/about-us`, `contact-us`, `privacy-policy`, `terms-of-service`, `disclaimer`, `copyright-policy` | Server Components (SSG) | Static `export const metadata` (`title`, `description`, `alternates.canonical`) | Inherited from `layout.tsx` only |
| `app/Xdmin99/page.tsx` | `'use client'` (Client Component) | **None** — inherits `robots: index, follow` from `layout.tsx` | Inherited from `layout.tsx` |
| `app/app/chapters`, `infographic`, `prompt`, `download-youtube-transcript`, `youtube-to-srt`, `youtube-to-text-no-timestamps` | Server Component (SSG) | Re-exports `metadata` from root counterparts (canonical points to root slug) | Same as root counterpart |

### SEO Flags: `noindex`, Canonicals, Trailing Slashes & Internal Links

1. **Intentional `noindex` Tag on Summary Pages**:
   - `app/summary/[videoId]/page.tsx` sets `robots: { index: false, follow: false }` so dynamic user-generated video pages are not indexed. (Good for crawl budget, though `SummaryJsonLd` still renders client-side on those pages.)
2. **Missing `noindex` on Admin Console (`/Xdmin99`)**:
   - `app/Xdmin99/page.tsx` is `'use client'` with no `layout.tsx` or `metadata` override, inheriting `robots: { index: true, follow: true }` from `app/layout.tsx`, and `/Xdmin99` is not blocked in `robots.txt`.
3. **`www` vs non-`www` Canonicals**:
   - All checked canonical URLs, `SITE_URL` constants, `app/sitemap.xml/route.ts`, `app/robots.txt/route.ts`, `app/feed.xml/route.ts`, `public/llms.txt`, and `public/llms-full.txt` consistently use `https://www.mytranscript.pro` (unless overridden by `NEXT_PUBLIC_SITE_URL`).
   - *Exception in old/unused code*: `lib/openrouter.ts` hardcodes `'HTTP-Referer': 'http://localhost:3000'` (unused module).
4. **Redirecting URL Listed in Sitemap & Linked in Footer & `llms.txt`**:
   - `/app/` (`app/app/page.tsx`) executes `redirect('/')` permanently, yet `https://www.mytranscript.pro/app/` is listed in `app/sitemap.xml/route.ts` (priority `0.7`), `public/llms.txt`, `public/llms-full.txt`, and linked from `components/Footer.tsx` (`/app`). Submitting a 307/308 redirecting URL in `sitemap.xml` triggers Search Console redirect warnings.
5. **Duplicate Page Routes Under `/app/*` Linked by Top Header**:
   - `components/Header.tsx` (`TOOLS_MENU_ITEMS`) points all 8 dropdown links to `/app/*`:
     - `/app/key-takeaways` → redirects to `/?tab=takeaways` (`app/page.tsx` ignores `?tab=`).
     - `/app/podcast-transcript` → redirects to `/podcast-transcript`.
     - `/app/chatbot` → redirects to `/youtube-transcript-chatbot`.
     - `/app/chapters`, `/app/infographic`, `/app/prompt`, `/app/youtube-to-srt`, `/app/youtube-to-text-no-timestamps` → serve **full duplicate SSR pages** (re-exporting `@/app/*/page`) rather than redirecting to canonical URLs, diluting internal link equity across `/app/*` vs root paths.
6. **Trailing-Slash Mismatches**:
   - `app/articles/page.tsx` sets `canonical: 'https://www.mytranscript.pro/articles/'`, `app/sitemap.xml/route.ts` uses `/articles/`, and `app/articles/[slug]/page.tsx` links `/articles/`, whereas `components/Header.tsx`, `components/Footer.tsx`, `components/GscLandingToolLayout.tsx`, and `app/articles/free-podcast-transcript-generator/page.tsx` link to `/articles` (without trailing slash, triggering Next.js default trailing-slash normalization).
7. **Broken Image & Legacy Branding in `SummaryJsonLd` (`components/SummaryJsonLd.tsx`)**:
   - `articleSchema.publisher.logo.url` points to `'https://img.youtube.com/vi/default/hqdefault.jpg'` (invalid placeholder YouTube thumbnail) instead of `https://www.mytranscript.pro/logo.png`.
   - `author.name`, `publisher.name`, and `app/summary/[videoId]/page.tsx` metadata still use `'YouTube Summarizer'` instead of `'MyTranscript'`.
8. **Missing Canonical/Href/Broken Reference in Admin Store (`lib/adminStore.ts`)**:
   - `DEFAULT_PAGES_AND_POSTS` (`post-5`) references `/articles/youtube-transcript-timestamps-guide`, which has **no matching entry** in `BLOG_POSTS` (`lib/contentData.ts`) → visiting it yields `404`.

---

## 5. Known Bugs, Incomplete Features, or Bottlenecks

### Active Bugs & UX Defects

1. **Duplicate `<header>` and `<footer>` on All 6 `GscLandingToolLayout` Pages**:
   - `app/layout.tsx` wraps every non-admin route in `<NavigationShell>` (which renders `<Header />` + `{children}` + `<Footer />`).
   - `components/GscLandingToolLayout.tsx` renders its **own** `<header>` (lines 112–167) and `<footer>` (lines 371–387).
   - **Impact**: `/chapters`, `/infographic`, `/prompt`, `/download-youtube-transcript`, `/youtube-to-srt`, `/youtube-to-text-no-timestamps` (and their `/app/*` mirrors) render **two stacked headers and two footers**.
2. **`/app/key-takeaways` Query Parameter `?tab=takeaways` Ignored on Homepage**:
   - `app/app/[tool]/page.tsx` redirects `/app/key-takeaways` → `/?tab=takeaways`, but `app/page.tsx` never reads `?tab=` and immediately redirects to `/summary/[videoId]` on URL submit without preserving `tab=takeaways`.
3. **Direct Landing on `/prompt` Does Not Auto-Generate Prompt Prerequisites**:
   - Submitting a URL from `app/prompt/page.tsx` navigates to `/summary/[videoId]?tab=prompt`.
   - In `components/SummaryClientView.tsx`, `isAITab()` only returns `true` for `'infographic' | 'summary' | 'takeaways' | 'chapters'` — `'prompt'` is excluded. Thus auto-generation is skipped on load, leaving the Prompt tab empty until the user manually clicks "Generate AI Prompt".
4. **Invalid Tailwind Grid Classes in Summary Split View (`components/SummaryClientView.tsx`)**:
   - Lines 663 & 674 use `xl:col-span-3.5` and `xl:col-span-5.5`. Fractional `col-span-*` utilities do not exist in Tailwind CSS v3.4 (`tailwind.config.js` does not extend `gridColumn`), so they compile to nothing and fall back to `lg:col-span-4` / `lg:col-span-5` (leaving 3 of 12 grid columns unused alongside `xl:col-span-3` on the right column, making `4 + 5 + 3 = 12` at `lg` and `xl`).
5. **Dual `robots.txt` Conflict (`app/robots.txt/route.ts` vs `public/robots.txt`)**:
   - Both `public/robots.txt` and `app/robots.txt/route.ts` attempt to serve `/robots.txt`, creating build ambiguity between static public asset serving and the Next.js route handler.
6. **Keyword Cannibalization / Duplicate Articles in `BLOG_POSTS` (`lib/contentData.ts`)**:
   - Two pairs of near-duplicate articles target identical topics/keywords:
     - `download-youtube-subtitles-srt-txt` vs `how-to-download-youtube-subtitles-srt-txt`
     - `how-to-summarize-youtube-videos-ai` vs `how-to-summarize-youtube-videos-with-ai`
7. **Flagship Article Images Exceed 50 KB Target & Are Duplicated in `/public`**:
   - Raw PNGs in `public/` (`podcast-workflow-guide.png` 52.3 KB, `key-takeaways-preview.png` 69.9 KB, `srt-subtitle-export.png` 73.2 KB) are duplicated identically under `public/images/articles/`. (Served through `next/image` optimization at runtime when image optimization is active, though the raw public assets are >50 KB and duplicated.)
8. **XSS Surface via Regex Markdown Rendering (`app/articles/[slug]/page.tsx`)**:
   - Lines 216–221 convert `post.content` strings via regex `.replace(...)` and render with `dangerouslySetInnerHTML`. Safe only as long as `lib/contentData.ts` remains trusted static data.

### Incomplete / Ephemeral Features & Dead Code

1. **Non-Persistent Admin CMS & Disconnected Settings (`app/Xdmin99/page.tsx`, `app/api/admin/settings/route.ts`)**:
   - `app/api/admin/settings/route.ts` stores SEO and monetization edits in a module-scoped `let store = ...` variable (wipes on serverless cold starts) and attempts `fs.writeFileSync` to `data/pages.json` (fails on read-only serverless filesystems like Vercel).
   - `app/layout.tsx` and public pages never consume `store.seo`, `store.monetization`, or `data/pages.json` (`AdSense` slots and dynamic `/p/[slug]` routes are not wired up).
2. **Hardcoded Fallback Admin Credentials (`app/api/admin/login/route.ts` & `check/route.ts`)**:
   - Falls back to `'user99'` / `'user99'` if `ADMIN_USERNAME` or `ADMIN_PASSWORD` is unset, and verifies against a static cookie value `'authenticated_user99_session'` rather than a signed HMAC/JWT token.
3. **Legacy Unreferenced Files / Dead Code**:
   - **Components (8 unused)**: `BlogIndexClient.tsx`, `BlogPostClient.tsx`, `DynamicPageView.tsx`, `FaqClient.tsx`, `LocalizedHomeClient.tsx`, `PrivacyClient.tsx`, `RelatedToolsSection.tsx`, `TermsClient.tsx` (remnants of an older `/${lang}/...` i18n/blog/CMS architecture).
   - **Lib modules (5 unused)**: `lib/languagesStore.ts`, `lib/openrouter.ts`, `lib/serverSummary.ts`, `lib/siteConfig.ts`, `lib/sitemap.ts`.
   - **Data & Scripts**: `data/languages.json`, `scripts/generateToolTranslations.mjs`, `scripts/localizedFeaturesFaqs.mjs` (no `package.json` script invokes them; `i18n` routes do not exist in `/app`).
   - **Homepage & Header dead props/state**: `app/page.tsx` retains unused `summarizing`, `metadata`, `summary`, `chatMessages`, `handleRegenerateSection`, and `handleChat` state despite unconditionally redirecting to `/summary/${videoId}` in `handleSubmit`. `components/Header.tsx` declares `HeaderProps` (`onOpenSettings`, `activeProvider`, etc.) but destructures `{}` and ignores all props.
   - **Missing Settings Trigger on Public Pages**: `Header.tsx` no longer renders the Settings gear button for users to open `SettingsModal` and configure custom OpenRouter keys/models; `SettingsModal` in `app/page.tsx` and `SummaryClientView.tsx` has no open trigger button.
   - **No `TODO`/`FIXME` Comments**: Codebase scan found zero `TODO`, `FIXME`, `XXX`, or `HACK` comments.

### Environment Variables & Bottlenecks

- **Environment Variables Referenced in Codebase** (all present in local `.env.local` as of audit):
  - `GEMINI_API_KEY` — Required for default Gemini AI summarization, regeneration, chat, and model testing (`lib/aiFallback.ts`, `lib/gemini.ts`, `app/api/models/route.ts`, `app/api/models/test/route.ts`).
  - `OPENROUTER_API_KEY` — Optional server fallback key (`lib/aiFallback.ts`, `app/api/models/route.ts`, `app/api/models/test/route.ts`).
  - `NEXT_PUBLIC_SITE_URL` — Used for base URL in `SummaryClientView.tsx`, `app/summary/[videoId]/page.tsx`, `lib/i18n.ts`, `lib/siteConfig.ts`, `lib/sitemap.ts` (defaults to `https://www.mytranscript.pro`). *Note: `app/layout.tsx`, `app/sitemap.xml/route.ts`, `app/robots.txt/route.ts`, `app/feed.xml/route.ts`, and `app/articles/*` hardcode `'https://www.mytranscript.pro'` instead of reading `NEXT_PUBLIC_SITE_URL`.*
  - `ADMIN_USERNAME` / `ADMIN_PASSWORD` — Admin login credentials (`app/api/admin/login/route.ts`; insecurely defaults to `'user99'` if omitted in production).
- **Operational Bottlenecks**:
  1. **Zero Rate Limiting** on `/api/transcript`, `/api/regenerate`, `/api/summarize`, `/api/chat`, and `/api/models/test` exposes server `GEMINI_API_KEY` / `OPENROUTER_API_KEY` quotas to abuse or 429 exhaustion.
  2. **Sequential 6-Tier Transcript Scraping Latency**: When YouTube blocks datacenter IPs (common on Vercel), `getTranscript()` tries 6 tiers sequentially with 3.5s–6s timeouts each—worst-case ~30–40s before falling back to title/URL-only AI analysis.
  3. **No Shared Persistent Transcript/Summary Cache**: Serverless `metadataCache` `Map` is per-instance ephemeral; repeated requests for viral videos re-scrape YouTube and re-invoke LLM APIs every time across tabs/sessions.
