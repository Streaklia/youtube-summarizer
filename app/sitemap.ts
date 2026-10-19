import { MetadataRoute } from 'next';

/**
 * Returns a list of known or featured video IDs to seed the sitemap.
 * Can be connected to any Redis / Postgres / KV store database in the future.
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
  ];

  const routes: MetadataRoute.Sitemap = dedicatedSeoPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

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
