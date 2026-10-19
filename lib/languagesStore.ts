import fs from 'fs';
import path from 'path';
import { SUPPORTED_LANGUAGES, SupportedLanguage, LanguageConfig, isSupportedLanguage } from './i18n';
import { LanguageSetting } from './adminTypes';

const LANGUAGES_DATA_FILE = path.join(process.cwd(), 'data', 'languages.json');

const NATIVE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  ar: 'العربية',
  es: 'Español',
  fr: 'Français',
  'zh-CN': '简体中文',
  ja: '日本語',
  ko: '한국어',
  'pt-BR': 'Português (Brasil)',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  de: 'Deutsch',
  pt: 'Português',
};

/**
 * Reads languages from data/languages.json (synced from admin dashboard).
 * Falls back to default static definitions if file is not found.
 */
export function readLanguagesFromStorage(): Record<SupportedLanguage, LanguageConfig> {
  try {
    if (fs.existsSync(LANGUAGES_DATA_FILE)) {
      const raw = fs.readFileSync(LANGUAGES_DATA_FILE, 'utf-8');
      const list = JSON.parse(raw) as LanguageSetting[];
      const map: Partial<Record<SupportedLanguage, LanguageConfig>> = {};

      for (const item of list) {
        if (isSupportedLanguage(item.code)) {
          map[item.code] = {
            code: item.code,
            name: item.name,
            nativeName: NATIVE_NAMES[item.code] || item.name,
            flag: item.flag,
            dir: item.code === 'ar' ? 'rtl' : 'ltr',
            heroHeadline: item.heroHeadline,
            heroGradient: item.heroGradient,
            heroSubtitle: item.heroSubtitle,
            ctaButtonText: item.ctaButtonText,
            metaTitle: item.metaTitle,
            metaDescription: item.metaDescription,
          };
        }
      }

      return { ...SUPPORTED_LANGUAGES, ...map };
    }
  } catch (err) {
    console.warn('[languagesStore] Failed to read languages.json, using defaults:', err);
  }
  return SUPPORTED_LANGUAGES;
}

/**
 * Writes language list to data/languages.json
 */
export function writeLanguagesToStorage(languages: LanguageSetting[]): void {
  try {
    const dir = path.dirname(LANGUAGES_DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LANGUAGES_DATA_FILE, JSON.stringify(languages, null, 2), 'utf-8');
  } catch (err) {
    console.error('[languagesStore] Failed to write languages.json:', err);
  }
}

/**
 * Returns LanguageConfig for a specific language code, synced with admin storage.
 */
export function getLanguageConfig(lang: string): LanguageConfig {
  if (!isSupportedLanguage(lang)) {
    return SUPPORTED_LANGUAGES.en;
  }
  const storage = readLanguagesFromStorage();
  return storage[lang] || SUPPORTED_LANGUAGES[lang];
}
