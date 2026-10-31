/**
 * Sitemap generation — one source of truth for every XML sitemap this app
 * serves, so the flat /sitemap.xml and the segmented files can never drift
 * apart.
 *
 *   /sitemap.xml          flat sitemap with every indexable URL (keeps the
 *                         existing Search Console property working)
 *   /sitemap_index.xml    master index -> the segments below
 *   /sitemap-main.xml     static & core pages (home, blog, faq, legal, blog
 *                         articles, localized homepages, admin /p/ pages)
 *   /sitemap-tools-1.xml  tool pages (root + localized), chunk 1
 *   /sitemap-tools-2.xml  tool pages, chunk 2 (404s while it is unused)
 *   /sitemap-tools-3.xml  tool pages, chunk 3 (404s while it is unused)
 */
import { BLOG_POSTS } from '@/lib/contentData';
import { ALL_SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { getPublishedPages } from '@/lib/pagesStore';
import { TOOL_SLUGS } from '@/lib/toolTranslations';

export const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mytranscript.pro').replace(/\/+$/, '');

/** Google allows 50,000 URLs per file; 500 keeps every segment small and
 *  makes the chunking visible before the site grows into the limits. */
export const SITEMAP_CHUNK_SIZE = 500;

/**
 * Root-level tool pages that are real routes. Every other root tool slug is a
 * 308 redirect to /{lang}/{tool} (see middleware.ts) — redirecting URLs must
 * never be listed in a sitemap, or Search Console reports them as errors.
 */
export const ROOT_TOOL_ROUTES = new Set<string>([
  'youtube-transcript',
  'download-youtube-transcript',
  'youtube-to-srt',
  'youtube-summary',
  'chapters',
  'infographic',
  'prompt',
  'youtube-to-text-no-timestamps',
  'youtube-to-text',
  'podcast-transcript',
  'youtube-infographic',
  'transcript-ai',
]);

const CORE_TOOLS = new Set<string>([
  'youtube-transcript',
  'download-youtube-transcript',
  'youtube-to-srt',
  'youtube-summary',
]);

/** Language codes whose pages canonicalise to the root English pages
 *  (/en -> /, /en/blog -> /blog, ...). Listing them would make Search
 *  Console report "Submitted URL is not canonical", so they stay out. */
const CANONICAL_TO_ROOT = new Set<string>(['en']);

export type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: ChangeFreq;
  priority: number;
}

const today = (): string => new Date().toISOString().split('T')[0];

const entry = (
  path: string,
  lastmod: string,
  changefreq: ChangeFreq,
  priority: number
): SitemapEntry => ({
  loc: path === '/' ? BASE_URL : `${BASE_URL}${path}`,
  lastmod,
  changefreq,
  priority,
});

/** Blog posts carry a human date ("Oct 18, 2026") — normalise it to ISO. */
const blogLastmod = (post: { date: string }): string => {
  const parsed = new Date(post.date);
  return Number.isNaN(parsed.getTime()) ? today() : parsed.toISOString().split('T')[0];
};

/** Static & core pages. */
export function buildCoreEntries(): SitemapEntry[] {
  const now = today();
  const out: SitemapEntry[] = [
    entry('/', now, 'daily', 1.0),
    entry('/articles/', now, 'daily', 0.8),
    entry('/blog', now, 'daily', 0.8),
    entry('/faq', now, 'weekly', 0.8),
    entry('/privacy', now, 'monthly', 0.4),
    entry('/terms', now, 'monthly', 0.4),
  ];

  for (const post of BLOG_POSTS) {
    out.push(entry(`/articles/${post.slug}`, post.isoDate || blogLastmod(post), 'monthly', 0.7));
  }

  for (const lang of ALL_SUPPORTED_LANGUAGES) {
    if (CANONICAL_TO_ROOT.has(lang)) continue;
    out.push(entry(`/${lang}`, now, 'daily', 0.9));
    out.push(entry(`/${lang}/articles/`, now, 'daily', 0.8));
    out.push(entry(`/${lang}/blog`, now, 'weekly', 0.7));
    out.push(entry(`/${lang}/faq`, now, 'weekly', 0.7));
    out.push(entry(`/${lang}/privacy`, now, 'monthly', 0.4));
    out.push(entry(`/${lang}/terms`, now, 'monthly', 0.4));
    for (const post of BLOG_POSTS) {
      out.push(entry(`/${lang}/articles/${post.slug}`, post.isoDate || blogLastmod(post), 'monthly', 0.7));
    }
  }

  for (const page of getPublishedPages()) {
    const route = page.route.replace(/^\/+/, '');
    if (!route) continue;
    out.push(entry(`/p/${route}`, page.updatedAt || now, 'monthly', 0.6));
  }

  return out;
}

/** Tool pages: the root tool routes that exist, plus every localized tool. */
export function buildToolEntries(): SitemapEntry[] {
  const now = today();
  const out: SitemapEntry[] = [];

  Array.from(ROOT_TOOL_ROUTES).forEach((tool) => {
    const isCore = CORE_TOOLS.has(tool);
    const priority = isCore ? 0.9 : 0.8;
    out.push(entry(`/${tool}`, now, 'weekly', priority));
  });

  for (const lang of ALL_SUPPORTED_LANGUAGES) {
    for (const tool of TOOL_SLUGS) {
      out.push(entry(`/${lang}/${tool}`, now, 'weekly', 0.8));
    }
  }

  return out;
}

/** Every indexable URL, in sitemap order. */
export function buildAllEntries(): SitemapEntry[] {
  return [...buildCoreEntries(), ...buildToolEntries()];
}

/** Split a list into files of at most `size` items. */
export function chunk<T>(items: T[], size: number = SITEMAP_CHUNK_SIZE): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

/** Segment file names for the tool chunks that actually contain URLs. */
export function toolSegmentFiles(): string[] {
  return chunk(buildToolEntries()).map((_, i) => `sitemap-tools-${i + 1}.xml`);
}

/** Escape the five XML entities so a stray "&" can never break a sitemap. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** A <urlset> document. Pure XML — no HTML, no scripts, no client payload. */
export function renderUrlset(entries: SitemapEntry[]): string {
  const body = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/** A <sitemapindex> document pointing at the segment files. */
export function renderSitemapIndex(files: string[]): string {
  const now = today();
  const body = files
    .map(
      (file) => `  <sitemap>
    <loc>${escapeXml(`${BASE_URL}/${file}`)}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

/** Explicit response headers for every sitemap file. */
export const SITEMAP_HEADERS: Record<string, string> = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
};
