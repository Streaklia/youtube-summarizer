import { SupportedLanguage, isSupportedLanguage, DEFAULT_LANGUAGE } from './i18n';

export const LANGUAGE_COOKIE = 'NEXT_LOCALE';
export const LANGUAGE_STORAGE_KEY = 'yt_selected_lang';

/**
 * Extracts language code from a pathname.
 * E.g.:
 * '/es/youtube-transcript' -> 'es'
 * '/ar' -> 'ar'
 * '/youtube-summary' -> null
 */
export function extractLangFromPath(pathname: string | null | undefined): SupportedLanguage | null {
  if (!pathname) return null;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isSupportedLanguage(segments[0])) {
    return segments[0];
  }
  return null;
}

/**
 * Strips any leading language prefix from a path.
 * E.g.:
 * '/es/youtube-transcript' -> '/youtube-transcript'
 * '/ar' -> '/'
 * '/blog/hello' -> '/blog/hello'
 */
export function stripLangFromPath(pathname: string | null | undefined): string {
  if (!pathname) return '/';
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isSupportedLanguage(segments[0])) {
    const rest = '/' + segments.slice(1).join('/');
    return rest === '/' ? '/' : rest;
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

/**
 * Generates a localized URL for any internal route given a target language.
 *
 * Rules:
 *  - If target language is 'en', returns clean path:
 *      e.g. localizedUrl('/youtube-transcript', 'en') -> '/youtube-transcript'
 *  - If target language is 'es', 'ar', etc., prefixes with /[lang]:
 *      e.g. localizedUrl('/youtube-transcript', 'ar') -> '/ar/youtube-transcript'
 *      e.g. localizedUrl('/', 'ar') -> '/ar'
 *  - Preserves any hash or query parameters attached.
 */
export function localizedUrl(path: string, lang: string = DEFAULT_LANGUAGE): string {
  // If external or anchor, return as is
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }

  // Separate hash and search params if present
  const [baseAndQuery, hash] = path.split('#');
  const [cleanBase, query] = baseAndQuery.split('?');

  const unlocalized = stripLangFromPath(cleanBase);
  const normalizedPath = unlocalized === '/' ? '' : unlocalized;
  const targetLang = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  let localizedBasePath = '';
  if (targetLang === 'en') {
    localizedBasePath = normalizedPath || '/';
  } else {
    localizedBasePath = `/${targetLang}${normalizedPath}`;
  }

  const queryPart = query ? `?${query}` : '';
  const hashPart = hash ? `#${hash}` : '';

  return `${localizedBasePath}${queryPart}${hashPart}`;
}

/**
 * Reads the preferred language from client storage (localStorage / cookie).
 */
export function getSavedLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && isSupportedLanguage(stored)) {
      return stored;
    }
    // Check cookie
    const match = document.cookie.match(new RegExp(`(^|;\\s*)${LANGUAGE_COOKIE}=([^;]+)`));
    if (match && isSupportedLanguage(match[2])) {
      return match[2] as SupportedLanguage;
    }
  } catch {}
  return DEFAULT_LANGUAGE;
}

/**
 * Persists the selected language to both localStorage and cookie (1 year expiry).
 */
export function persistLanguage(lang: string): void {
  if (typeof window === 'undefined') return;
  if (!isSupportedLanguage(lang)) return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=${maxAge}; SameSite=Lax`;
  } catch {}
}

/**
 * Maps a tool slug or URL pathname to its corresponding results page tab.
 * E.g.:
 *  'youtube-infographic' or '/es/youtube-infographic' -> 'infographic'
 *  'youtube-summary' or '/youtube-summary' -> 'summary'
 *  'youtube-transcript' or '/podcast-transcript' -> 'transcript'
 *  'transcript-ai' -> 'takeaways'
 */
export function resolveTabFromToolOrPath(toolOrPath: string | null | undefined): string | null {
  if (!toolOrPath) return null;
  const clean = toolOrPath.toLowerCase().replace(/^\/+/, '');
  const segment = clean.split('/').pop() || clean;

  if (segment.includes('infographic') || segment.includes('comic')) {
    return 'infographic';
  }
  if (segment.includes('summary')) {
    return 'summary';
  }
  if (segment.includes('transcript') || segment.includes('to-text') || segment.includes('podcast')) {
    return 'transcript';
  }
  if (segment.includes('chapter')) {
    return 'chapters';
  }
  if (segment.includes('takeaway') || segment.includes('ai')) {
    return 'takeaways';
  }
  if (segment.includes('prompt')) {
    return 'prompt';
  }
  return null;
}
