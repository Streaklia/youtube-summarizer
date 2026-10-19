/**
 * Central site configuration for production domain & SEO defaults
 */
export const SITE_DOMAIN = 'www.mytranscript.pro';
export const SITE_URL = `https://${SITE_DOMAIN}`;

export function getBaseUrl(): string {
  // Respect environment variable if explicitly set, otherwise use production domain
  return process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
}
