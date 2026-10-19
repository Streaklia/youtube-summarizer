export type SupportedLanguage = 'en' | 'es' | 'de' | 'fr' | 'pt' | 'ar';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
  heroHeadline: string;
  heroGradient: string;
  heroSubtitle: string;
  ctaButtonText: string;
  metaTitle: string;
  metaDescription: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    dir: 'ltr',
    heroHeadline: 'Turn Any YouTube Video Into',
    heroGradient: 'Instant AI Summaries & Transcripts',
    heroSubtitle:
      'Extract full transcripts in 1 second, key takeaways, timestamped chapters, visual infographics, and chat with any video using Google Gemini AI.',
    ctaButtonText: 'Summarize Video',
    metaTitle: 'YouTube Summarizer — AI-Powered Video Analysis & Transcripts',
    metaDescription:
      'Extract instant transcripts, key takeaways, and chat with any YouTube video in seconds. Free AI YouTube video summarizer.',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
    heroHeadline: 'Convierte Cualquier Video de YouTube en',
    heroGradient: 'Resúmenes y Transcripciones con IA',
    heroSubtitle:
      'Extrae transcripciones completas en 1 segundo, puntos clave, capítulos con marcas de tiempo y chatea con cualquier video usando IA.',
    ctaButtonText: 'Resumir Video',
    metaTitle: 'Resumidor de YouTube — Análisis y Transcripciones con IA',
    metaDescription:
      'Obtén transcripciones instantáneas y puntos clave de videos de YouTube con Inteligencia Artificial gratuita.',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    dir: 'ltr',
    heroHeadline: 'Verwandeln Sie Jedes YouTube-Video in',
    heroGradient: 'KI-Zusammenfassungen & Transkripte',
    heroSubtitle:
      'Extrahieren Sie vollständige Transkripte in 1 Sekunde, Kernpunkte, Zeitstempel-Kapitel und chatten Sie mit jedem Video über KI.',
    ctaButtonText: 'Video zusammenfassen',
    metaTitle: 'YouTube Zusammenfasser — KI-gestützte Videoanalyse & Transkripte',
    metaDescription:
      'Erhalten Sie sofortige Transkripte, wichtigste Kernaussagen und chatten Sie kostenlos mit jedem YouTube-Video in Sekunden.',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
    heroHeadline: 'Transformez N’importe Quelle Vidéo YouTube en',
    heroGradient: 'Résumés et Transcriptions par IA',
    heroSubtitle:
      'Extrayez des transcriptions complètes en 1 seconde, points clés, chapitres horodatés et discutez avec la vidéo grâce à l’IA.',
    ctaButtonText: 'Résumer la Vidéo',
    metaTitle: 'Résumeur YouTube — Analyse Vidéo et Transcriptions par IA',
    metaDescription:
      'Transcrivez et résumez n’importe quelle vidéo YouTube instantanément grâce à l’IA gratuite.',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    dir: 'ltr',
    heroHeadline: 'Transforme Qualquer Vídeo do YouTube em',
    heroGradient: 'Resumos e Transcrições com IA',
    heroSubtitle:
      'Extraia transcrições completas em 1 segundo, tópicos principais, capítulos com timestamps e converse com qualquer vídeo usando IA.',
    ctaButtonText: 'Resumir Vídeo',
    metaTitle: 'Resumidor do YouTube — Análise e Transcrições com IA',
    metaDescription:
      'Obtenha transcrições instantâneas e resumos com IA de qualquer vídeo do YouTube gratuitamente.',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl',
    heroHeadline: 'حوّل أي فيديو يوتيوب إلى',
    heroGradient: 'ملخصات ذكية وتفريغ نصي فوري',
    heroSubtitle:
      'استخرج النصوص الكاملة في ثانية واحدة، أهم النقاط، الفصول الزمنية، والإنفوجرافيك، وتحاور مع محتوى الفيديو بالذكاء الاصطناعي.',
    ctaButtonText: 'تلخيص الفيديو',
    metaTitle: 'ملخص يوتيوب — تفريغ وتحليل مقاطع الفيديو بالذكاء الاصطناعي',
    metaDescription:
      'احصل على ملخص فوري وتفريغ نصي لأي فيديو يوتيوب بدقة عالية وسرعة فائقة مجاناً.',
  },
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return ['en', 'es', 'de', 'fr', 'pt', 'ar'].includes(lang);
}

/**
 * Generates an alternates languages mapping for Next.js metadata.
 * Produces clean hreflang tags:
 * {
 *   'en': 'https://www.mytranscript.pro/en/youtube-summary',
 *   'es': 'https://www.mytranscript.pro/es/youtube-summary',
 *   ...
 *   'x-default': 'https://www.mytranscript.pro/youtube-summary'
 * }
 */
export function buildHrefLangAlternates(pathWithoutLang: string, baseUrl = 'https://www.mytranscript.pro') {
  const cleanPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;
  const isRoot = cleanPath === '/' || cleanPath === '';

  const languages: Record<string, string> = {};

  (['en', 'es', 'de', 'fr', 'pt', 'ar'] as SupportedLanguage[]).forEach((lang) => {
    if (lang === 'en') {
      languages[lang] = isRoot ? baseUrl : `${baseUrl}${cleanPath}`;
    } else {
      languages[lang] = isRoot ? `${baseUrl}/${lang}` : `${baseUrl}/${lang}${cleanPath}`;
    }
  });

  // Default fallback for unmatched language settings
  languages['x-default'] = isRoot ? baseUrl : `${baseUrl}${cleanPath}`;

  return {
    canonical: languages.en,
    languages,
  };
}
