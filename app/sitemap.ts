import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/contentData';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/i18n';

/**
 * Returns a list of known or featured video IDs to seed the sitemap.
 */
async function getIndexedVideoIds(): Promise<string[]> {
  return [
    'wkf-U9ccODzI',
    'dQw4w9WgXcQ',
    'jNQXAC9IVRw',
    'kJQP7kiw5Fk',
    'fJ9rUzIMcZQ',
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://youtube-summarizer.vercel.app';
  const currentDate = new Date();

  // High-Volume SEO Landing Pages
  const dedicatedSeoPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/youtube-transcript', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/youtube-summary', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/youtube-infographic', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/youtube-to-text', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/podcast-transcript', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/transcript-ai', priority: 0.9, changeFrequency: 'weekly' as const },
    // Resources & Legal
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Add primary English routes
  for (const page of dedicatedSeoPages) {
    routes.push({
      url: `${baseUrl}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // Add individual blog articles
  for (const post of BLOG_POSTS) {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    });
  }

  // Multi-Language routes for non-English locales
  const nonEnglishLangs = (Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).filter(
    (l) => l !== 'en'
  );

  for (const lang of nonEnglishLangs) {
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    });
    routes.push({
      url: `${baseUrl}/${lang}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    });
    routes.push({
      url: `${baseUrl}/${lang}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    });
    routes.push({
      url: `${baseUrl}/${lang}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    });
    routes.push({
      url: `${baseUrl}/${lang}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    });
  }

  // Dynamic /summary/[videoId] programmatic SEO entries
  const videoIds = await getIndexedVideoIds();
  for (const id of videoIds) {
    routes.push({
      url: `${baseUrl}/summary/${id}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  return routes;
}
