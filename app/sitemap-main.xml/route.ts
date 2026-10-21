import { NextResponse } from 'next/server';
import { ALL_SUPPORTED_LANGUAGES } from '@/lib/i18n';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mytranscript.pro';

// Static blog post slugs (mirrors BLOG_POSTS in lib/contentData.ts)
const BLOG_SLUGS = [
  'how-to-summarize-youtube-videos-with-ai',
  'youtube-transcript-to-text-best-practices',
  'gemini-vs-openrouter-for-video-analysis',
  'youtube-caption-accuracy-study-2026',
  'how-to-download-youtube-subtitles-srt-txt',
];

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
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
  const entries: string[] = [];

  // Root homepage
  entries.push(urlEntry(`${BASE_URL}`, today, 'daily', '1.0'));

  // Root static pages
  const rootStatics = [
    { path: '/blog',    freq: 'weekly',  pri: '0.8' },
    { path: '/faq',     freq: 'weekly',  pri: '0.8' },
    { path: '/privacy', freq: 'monthly', pri: '0.5' },
    { path: '/terms',   freq: 'monthly', pri: '0.5' },
  ];
  for (const { path, freq, pri } of rootStatics) {
    entries.push(urlEntry(`${BASE_URL}${path}`, today, freq, pri));
  }

  // Root blog articles
  for (const slug of BLOG_SLUGS) {
    entries.push(urlEntry(`${BASE_URL}/blog/${slug}`, today, 'weekly', '0.7'));
  }

  // Localized homepages
  for (const lang of ALL_SUPPORTED_LANGUAGES) {
    entries.push(urlEntry(`${BASE_URL}/${lang}`, today, 'daily', '0.9'));
  }

  // Localized static pages
  const localStatics = [
    { path: '/blog',    freq: 'weekly',  pri: '0.7' },
    { path: '/faq',     freq: 'weekly',  pri: '0.7' },
    { path: '/privacy', freq: 'monthly', pri: '0.4' },
    { path: '/terms',   freq: 'monthly', pri: '0.4' },
  ];
  for (const lang of ALL_SUPPORTED_LANGUAGES) {
    for (const { path, freq, pri } of localStatics) {
      entries.push(urlEntry(`${BASE_URL}/${lang}${path}`, today, freq, pri));
    }
    for (const slug of BLOG_SLUGS) {
      entries.push(urlEntry(`${BASE_URL}/${lang}/blog/${slug}`, today, 'weekly', '0.7'));
    }
  }

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
