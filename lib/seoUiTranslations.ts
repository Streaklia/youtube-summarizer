import { SupportedLanguage } from './i18n';

export interface SeoUiStrings {
  invalidUrlError: string;
  trustBadge: string;
  faqTitle: string;
  relatedToolsTitle: string;
  relatedToolsSubtitle: string;
  exploreTool: string;
}

export const SEO_UI_TRANSLATIONS: Record<SupportedLanguage, SeoUiStrings> = {
  en: {
    invalidUrlError: 'Please provide a valid YouTube URL (e.g. youtube.com/watch?v=... or youtu.be/...)',
    trustBadge: 'Instant extraction • No sign-up required • 100% Free',
    faqTitle: 'Frequently Asked Questions',
    relatedToolsTitle: 'Explore Alternative Video & Transcript Tools',
    relatedToolsSubtitle: 'Seamlessly switch between transcription, AI summarization, text conversion, and subtitle downloads.',
    exploreTool: 'Open Tool',
  },
  ar: {
    invalidUrlError: 'يرجى إدخال رابط يوتيوب صالح (مثال: youtube.com/watch?v=... أو youtu.be/...)',
    trustBadge: 'استخراج فوري • لا يتطلب تسجيل الدخول • مجاني 100%',
    faqTitle: 'الأسئلة الشائعة',
    relatedToolsTitle: 'استكشف أدوات الفيديو والتفريغ النصي البديلة',
    relatedToolsSubtitle: 'تنقل بسلاسة بين التفريغ النصي، والتلخيص بالذكاء الاصطناعي، وتحويل الفيديو لنص، وتحميل الترجمة.',
    exploreTool: 'فتح الأداة',
  },
  es: {
    invalidUrlError: 'Por favor, ingresa una URL de YouTube válida (ej. youtube.com/watch?v=... o youtu.be/...)',
    trustBadge: 'Extracción instantánea • Sin registro previo • 100% Gratis',
    faqTitle: 'Preguntas Frecuentes',
    relatedToolsTitle: 'Explora Herramientas Alternativas de Video y Transcripción',
    relatedToolsSubtitle: 'Alterna sin esfuerzo entre transcripción, resúmenes con IA, conversión a texto y descarga de subtítulos.',
    exploreTool: 'Abrir Herramienta',
  },
  fr: {
    invalidUrlError: 'Veuillez fournir une URL YouTube valide (ex. youtube.com/watch?v=... ou youtu.be/...)',
    trustBadge: 'Extraction instantanée • Sans inscription • 100% Gratuit',
    faqTitle: 'Foire Aux Questions',
    relatedToolsTitle: 'Découvrez d’Autres Outils Vidéo et de Transcription',
    relatedToolsSubtitle: 'Basculez facilement entre transcription, résumés par IA, conversion en texte et téléchargement de sous-titres.',
    exploreTool: 'Ouvrir l’outil',
  },
  'zh-CN': {
    invalidUrlError: '请输入有效的YouTube视频链接（例如 youtube.com/watch?v=... 或 youtu.be/...）',
    trustBadge: '秒级提取 • 无需注册 • 100%免费',
    faqTitle: '常见问题解答',
    relatedToolsTitle: '探索更多YouTube视频与字幕处理工具',
    relatedToolsSubtitle: '在逐字稿提取、AI智能视频总结、语音转文字和字幕下载之间无缝切换。',
    exploreTool: '立即使用',
  },
  ja: {
    invalidUrlError: '有効なYouTube動画URLを入力してください（例: youtube.com/watch?v=... または youtu.be/...）',
    trustBadge: '即時抽出 • 登録不要 • 完全無料',
    faqTitle: 'よくある質問',
    relatedToolsTitle: '関連するYouTube動画・文字起こしツールを探す',
    relatedToolsSubtitle: '文字起こし、AI動画要約、テキスト抽出、字幕ダウンロードを自由に切り替えて利用可能。',
    exploreTool: 'ツールを開く',
  },
  ko: {
    invalidUrlError: '올바른 유튜브 동영상 URL을 입력해주세요 (예: youtube.com/watch?v=... 또는 youtu.be/...)',
    trustBadge: '즉각적인 추출 • 회원가입 없음 • 100% 무료',
    faqTitle: '자주 묻는 질문',
    relatedToolsTitle: '관련 유튜브 동영상 및 자막 도구 살펴보기',
    relatedToolsSubtitle: '자막 추출, AI 요약 정리, 텍스트 변환 및 자막 파일 다운로드를 편리하게 전환하세요.',
    exploreTool: '도구 열기',
  },
  'pt-BR': {
    invalidUrlError: 'Por favor, insira um link válido do YouTube (ex: youtube.com/watch?v=... ou youtu.be/...)',
    trustBadge: 'Extração instantânea • Sem cadastro • 100% Gratuito',
    faqTitle: 'Perguntas Frecuentes',
    relatedToolsTitle: 'Conheça Outras Ferramentas de Vídeo e Transcrição',
    relatedToolsSubtitle: 'Alterne com facilidade entre transcrição, resumos inteligentes por IA, extração de texto e download de legendas.',
    exploreTool: 'Abrir Ferramenta',
  },
  pt: {
    invalidUrlError: 'Por favor, insira um URL válido do YouTube (ex: youtube.com/watch?v=... ou youtu.be/...)',
    trustBadge: 'Extração instantânea • Sem registo • 100% Grátis',
    faqTitle: 'Perguntas Frequentes',
    relatedToolsTitle: 'Explore Outras Ferramentas de Vídeo e Transcrição',
    relatedToolsSubtitle: 'Alterne facilmente entre transcrição, resumo com IA, conversão para texto e download de legendas.',
    exploreTool: 'Abrir Ferramenta',
  },
  vi: {
    invalidUrlError: 'Vui lòng nhập đường dẫn YouTube hợp lệ (ví dụ: youtube.com/watch?v=... hoặc youtu.be/...)',
    trustBadge: 'Trích xuất tức thì • Không cần đăng ký • 100% Miễn phí',
    faqTitle: 'Câu hỏi thường gặp',
    relatedToolsTitle: 'Khám phá các công cụ video và phụ đề liên quan',
    relatedToolsSubtitle: 'Dễ dàng chuyển đổi giữa trích xuất văn bản, tóm tắt video bằng AI và tải xuống phụ đề.',
    exploreTool: 'Mở công cụ',
  },
  th: {
    invalidUrlError: 'โปรดระบุลิงก์ YouTube ที่ถูกต้อง (เช่น youtube.com/watch?v=... หรือ youtu.be/...)',
    trustBadge: 'ดึงข้อมูลทันที • ไม่ต้องลงทะเบียน • ฟรี 100%',
    faqTitle: 'คำถามที่พบบ่อย',
    relatedToolsTitle: 'สำรวจเครื่องมือถอดเสียงและสรุปวิดีโออื่นๆ',
    relatedToolsSubtitle: 'สลับระหว่างการถอดเสียง การสรุปเนื้อหาด้วย AI การแปลงเป็นข้อความ และการดาวน์โหลดได้อย่างง่ายดาย',
    exploreTool: 'เปิดใช้งานเครื่องมือ',
  },
  de: {
    invalidUrlError: 'Bitte geben Sie eine gültige YouTube-URL ein (z. B. youtube.com/watch?v=... oder youtu.be/...)',
    trustBadge: 'Sofortige Extraktion • Keine Registrierung • 100% Kostenlos',
    faqTitle: 'Häufig gestellte Fragen',
    relatedToolsTitle: 'Weitere YouTube-Video- und Transkript-Tools entdecken',
    relatedToolsSubtitle: 'Wechseln Sie nahtlos zwischen Transkription, KI-Zusammenfassung, Textextraktion und Untertitel-Download.',
    exploreTool: 'Tool öffnen',
  },
};

export function getSeoUiStrings(lang: SupportedLanguage = 'en'): SeoUiStrings {
  return SEO_UI_TRANSLATIONS[lang] || SEO_UI_TRANSLATIONS.en;
}
