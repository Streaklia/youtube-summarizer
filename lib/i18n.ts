export type SupportedLanguage =
  | 'en'
  | 'ar'
  | 'es'
  | 'fr'
  | 'zh-CN'
  | 'ja'
  | 'ko'
  | 'pt-BR'
  | 'vi'
  | 'th'
  | 'de'
  | 'pt';

export const ALL_SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  'en',
  'ar',
  'es',
  'fr',
  'zh-CN',
  'ja',
  'ko',
  'pt-BR',
  'vi',
  'th',
  'de',
  'pt',
];

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
  'zh-CN': {
    code: 'zh-CN',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳',
    dir: 'ltr',
    heroHeadline: '将任何YouTube视频转化为',
    heroGradient: '即时AI摘要与逐字稿',
    heroSubtitle:
      '1秒内提取完整带时间戳字幕、核心要点、章节拆解，并使用Google Gemini AI与视频对话。',
    ctaButtonText: '生成视频摘要',
    metaTitle: 'YouTube摘要神器 — AI视频智能总结与字幕提取',
    metaDescription:
      '秒级提取YouTube完整字幕、关键要点与思维导图，免费好用的AI视频总结工具。',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    dir: 'ltr',
    heroHeadline: 'あらゆるYouTube動画を',
    heroGradient: 'AI要約と文字起こしに即時変換',
    heroSubtitle:
      'タイムスタンプ付き字幕の抽出、重要ポイント、チャプター要約、AIチャット対話を1秒で。',
    ctaButtonText: '動画を要約する',
    metaTitle: 'YouTube要約ツール — AIによる動画要約と文字起こし抽出',
    metaDescription:
      'YouTube動画の文字起こし、要点まとめ、AIチャット対話を一瞬で実行できる無料ツール。',
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    dir: 'ltr',
    heroHeadline: '모든 유튜브 영상을',
    heroGradient: '실시간 AI 요약 및 자막 추출로',
    heroSubtitle:
      '1초 만에 타임스탬프 자막 추출, 핵심 요약, 챕터 정리, AI 대화 기능까지 무료로 경험하세요.',
    ctaButtonText: '영상 요약하기',
    metaTitle: '유튜브 요약기 — AI 동영상 분석 및 텍스트 자막 추출',
    metaDescription:
      '유튜브 자막 추출 및 핵심 요약, AI 질의응답을 무료로 즉시 생성하는 가장 빠른 요약 서비스.',
  },
  'pt-BR': {
    code: 'pt-BR',
    name: 'Portuguese (Brazil)',
    nativeName: 'Português (Brasil)',
    flag: '🇧🇷',
    dir: 'ltr',
    heroHeadline: 'Transforme Qualquer Vídeo do YouTube em',
    heroGradient: 'Resumos e Transcrições com IA',
    heroSubtitle:
      'Extraia transcrições completas em 1 segundo, pontos-chave, capítulos com minutagem e converse com o vídeo usando IA.',
    ctaButtonText: 'Resumir Vídeo',
    metaTitle: 'Resumidor de Vídeos do YouTube — Transcrição e Resumos Rápidos com IA',
    metaDescription:
      'Obtenha transcrições completas e resumos inteligentes com IA de qualquer vídeo do YouTube gratuitamente.',
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    dir: 'ltr',
    heroHeadline: 'Chuyển đổi mọi video YouTube thành',
    heroGradient: 'Tóm tắt & Bản ghi phụ đề AI',
    heroSubtitle:
      'Trích xuất phụ đề có dấu thời gian trong 1 giây, nắm bắt ý chính và trò chuyện trực tiếp với video bằng AI.',
    ctaButtonText: 'Tóm tắt video',
    metaTitle: 'Công cụ tóm tắt YouTube — Trích xuất phụ đề & Tóm tắt AI',
    metaDescription:
      'Trích xuất bản ghi phụ đề tiếng Việt và tóm tắt ý chính từ video YouTube tức thì hoàn toàn miễn phí.',
  },
  th: {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    dir: 'ltr',
    heroHeadline: 'เปลี่ยนทุกวิดีโอ YouTube ให้เป็น',
    heroGradient: 'สรุปย่อและถอดเสียงด้วย AI',
    heroSubtitle:
      'ถอดเสียงพร้อมระบุเวลาใน 1 วินาที สรุปใจความสำคัญ และพูดคุยสอบถามข้อมูลจากวิดีโอด้วย AI.',
    ctaButtonText: 'สรุปวิดีโอ',
    metaTitle: 'โปรแกรมสรุป YouTube — ถอดเสียงและสรุปเนื้อหาวิดีโอด้วย AI',
    metaDescription:
      'ถอดข้อความจากวิดีโอ YouTube พร้อมสรุปประเด็นสำคัญได้อย่างรวดเร็วและแม่นยำ ฟรี 100%',
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
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export function isSupportedLanguage(lang: string | null | undefined): lang is SupportedLanguage {
  if (!lang) return false;
  return ALL_SUPPORTED_LANGUAGES.some(
    (code) => code.toLowerCase() === lang.toLowerCase()
  );
}

export function normalizeLanguageCode(lang: string | null | undefined): SupportedLanguage {
  if (!lang) return DEFAULT_LANGUAGE;
  const match = ALL_SUPPORTED_LANGUAGES.find(
    (code) => code.toLowerCase() === lang.toLowerCase()
  );
  return match || DEFAULT_LANGUAGE;
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
export function buildHrefLangAlternates(
  pathWithoutLang: string,
  currentLang?: string,
  baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mytranscript.pro'
) {
  const cleanPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;
  const isRoot = cleanPath === '/' || cleanPath === '';

  const languages: Record<string, string> = {};

  ALL_SUPPORTED_LANGUAGES.forEach((lang) => {
    if (lang === 'en') {
      languages[lang] = isRoot ? baseUrl : `${baseUrl}${cleanPath}`;
    } else {
      languages[lang] = isRoot ? `${baseUrl}/${lang}` : `${baseUrl}/${lang}${cleanPath}`;
    }
  });

  // Default fallback for unmatched language settings
  languages['x-default'] = isRoot ? baseUrl : `${baseUrl}${cleanPath}`;

  const resolvedLang = currentLang ? normalizeLanguageCode(currentLang) : 'en';
  const canonical = languages[resolvedLang] || languages.en;

  return {
    canonical,
    languages,
  };
}
