import { MetadataRoute } from 'next';

/**
 * Returns a list of known or featured video IDs to seed the sitemap.
 * Can be connected to any Redis / Postgres / KV store database in the future.
 */
async function getIndexedVideoIds(): Promise<string[]> {
  // Common high-demand / educational video IDs seeded into sitemap
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

  // Root Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

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
