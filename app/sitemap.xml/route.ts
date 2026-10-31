import { NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/lib/contentData';
import { TOOL_SLUGS } from '@/lib/toolTranslations';

const BASE_URL = 'https://www.mytranscript.pro';

export const dynamic = 'force-static';

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: 'daily' | 'weekly' | 'monthly',
  priority: string
): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function GET() {
  const today = new Date().toISOString().split('T')[0];

  // Core Tool & Download Pages (Priority 0.9 | Changefreq: weekly)
  const CORE_TOOL_PATHS = new Set([
    'youtube-transcript',
    'download-youtube-transcript',
    'youtube-to-srt',
    'youtube-summary',
  ]);

  // Secondary Feature Tools (Priority 0.8 | Changefreq: weekly)
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

  const seenUrls = new Set<string>();
  const entries: string[] = [];

  const addEntry = (
    url: string,
    lastmod: string,
    changefreq: 'daily' | 'weekly' | 'monthly',
    priority: string
  ) => {
    if (!seenUrls.has(url)) {
      seenUrls.add(url);
      entries.push(urlEntry(url, lastmod, changefreq, priority));
    }
  };

  // 1. Homepage (Priority 1.0 | Changefreq: daily)
  addEntry(`${BASE_URL}/`, today, 'daily', '1.0');

  // 2. Core Tool & Download Pages (Priority 0.9 | Changefreq: weekly)
  CORE_TOOL_PATHS.forEach((slug) => {
    addEntry(`${BASE_URL}/${slug}`, today, 'weekly', '0.9');
  });

  // 3. Secondary Feature Tools (Priority 0.8 | Changefreq: weekly)
  SECONDARY_FEATURE_PATHS.forEach((slug) => {
    addEntry(`${BASE_URL}/${slug}`, today, 'weekly', '0.8');
  });

  // Any remaining TOOL_SLUGS not yet added
  TOOL_SLUGS.forEach((slug) => {
    if (!CORE_TOOL_PATHS.has(slug)) {
      addEntry(`${BASE_URL}/${slug}`, today, 'weekly', '0.8');
    }
  });

  // 4. Articles & Guides Index (Priority 0.8 | Changefreq: daily)
  addEntry(`${BASE_URL}/articles/`, today, 'daily', '0.8');

  // 5. Individual Articles & Blog Posts (Priority 0.7 | Changefreq: monthly)
  BLOG_POSTS.forEach((post) => {
    const postDate = post.isoDate || today;
    addEntry(`${BASE_URL}/articles/${post.slug}`, postDate, 'monthly', '0.7');
  });

  // Web App UI route
  addEntry(`${BASE_URL}/app/`, today, 'weekly', '0.7');

  // Legal & Corporate Pages (Priority 0.4 | Changefreq: monthly)
  const LEGAL_PAGES = [
    'about-us',
    'contact-us',
    'privacy-policy',
    'terms-of-service',
    'disclaimer',
    'copyright-policy',
  ];

  LEGAL_PAGES.forEach((slug) => {
    addEntry(`${BASE_URL}/${slug}`, today, 'monthly', '0.4');
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=43200, s-maxage=43200',
    },
  });
}
