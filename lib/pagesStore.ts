import fs from 'fs';
import path from 'path';
import { DEFAULT_PAGES_AND_POSTS } from './adminStore';
import { PageOrPost } from './adminTypes';

/**
 * Extended page type with optional SEO fields stored in pages.json.
 */
export interface ManagedPage extends PageOrPost {
  metaTitle?: string;
  metaDescription?: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'pages.json');

/**
 * Read all pages from the persistent JSON file.
 * Falls back to DEFAULT_PAGES_AND_POSTS if file doesn't exist or is unreadable.
 */
export function readPages(): ManagedPage[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw) as ManagedPage[];
    }
  } catch (err) {
    console.warn('[pagesStore] Failed to read pages.json, using defaults:', err);
  }
  return DEFAULT_PAGES_AND_POSTS as ManagedPage[];
}

/**
 * Write pages array to the persistent JSON file.
 * Creates the data/ directory if it doesn't exist.
 */
export function writePages(pages: ManagedPage[]): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(pages, null, 2), 'utf-8');
  } catch (err) {
    console.error('[pagesStore] Failed to write pages.json:', err);
    throw new Error('Could not persist pages to storage.');
  }
}

/**
 * Look up a single published page by its route slug.
 * Accepts both '/about' and 'about' formats.
 */
export function getPageBySlug(slug: string): ManagedPage | null {
  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
  const pages = readPages();
  return (
    pages.find(
      (p) =>
        p.status === 'Published' &&
        p.route.toLowerCase() === normalizedSlug.toLowerCase()
    ) ?? null
  );
}

/**
 * Returns all published pages.
 */
export function getPublishedPages(): ManagedPage[] {
  return readPages().filter((p) => p.status === 'Published');
}
