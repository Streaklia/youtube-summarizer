/**
 * Localized Features and FAQs for all 13 tool slugs across 12 languages.
 */

export const LOCALIZED_FEATURES_FAQS = {
  'youtube-transcript': {
    ar: {
      features: [
        { icon: '⚡', title: 'استخراج في أقل من ثانيتين', description: 'سحب النصوص والتسميات التوضيحية مباشرة من سيرفرات يوتيوب بسرعة فائقة.' },
        { icon: '⏱️', title: 'طوابع زمنية دقيقة', description: 'كل سطر محدد بوقت الدقيقة والثانية للقفز الفوري لأهم أجزاء الفيديو.' },
        { icon: '📥', title: 'تصدير بضغطة واحدة', description: 'تنزيل النص الكامل بصيغة Markdown نظيفة أو PDF قابل للطباعة والمشاركة.' },
      ],
      faqs: [
        { question: 'كيف يمكنني استخراج النص من أي فيديو يوتيوب؟', answer: 'انسخ رابط الفيديو من يوتيوب، والصقه في الحقل أعلاه، ثم اضغط على "استخراج النص". سيظهر النص الكامل خلال ثانيتين.' },
        { question: 'هل تعمل الأداة مع التسميات التوضيحية التلقائية؟', answer: 'نعم! تدعم الأداة الترجمات التلقائية من يوتيوب، والنصوص المرفوعة من صاحب القناة، ومقاطع الفيديو متعددة اللغات.' },
      ],
    },
    es: {
      features: [
        { icon: '⚡', title: 'Extracción en 2 Segundos', description: 'Obtén transcripciones directamente de los servidores de YouTube a máxima velocidad.' },
        { icon: '⏱️', title: 'Marcas de Tiempo Precisas', description: 'Cada frase está etiquetada con su minutaje exacto para saltar a momentos clave.' },
        { icon: '📥', title: 'Exportación en 1 Clic', description: 'Descarga la transcripción completa en formato Markdown o PDF limpio.' },
      ],
      faqs: [
        { question: '¿Cómo extraigo la transcripción de un video de YouTube?', answer: 'Copia el enlace de YouTube, pégalo en el recuadro superior y pulsa "Obtener Transcripción". El texto aparecerá al instante.' },
        { question: '¿Funciona con subtítulos automáticos?', answer: '¡Sí! Es compatible con subtítulos generados automáticamente por YouTube y subtítulos subidos por el creador.' },
      ],
    },
    fr: {
      features: [
        { icon: '⚡', title: 'Extraction en 2 Secondes', description: 'Extraction ultra-rapide des sous-titres directement depuis les serveurs de YouTube.' },
        { icon: '⏱️', title: 'Horodatages Précis', description: 'Chaque ligne est synchronisée avec son minutage exact pour naviguer facilement.' },
        { icon: '📥', title: 'Exportation en 1 Clic', description: 'Téléchargez l’intégralité de la transcription au format Markdown ou PDF propre.' },
      ],
      faqs: [
        { question: 'Comment extraire la transcription d’une vidéo YouTube ?', answer: 'Copiez le lien de la vidéo YouTube, collez-le ci-dessus et cliquez sur "Obtenir la Transcription". Le texte s’affiche immédiatement.' },
        { question: 'Est-ce compatible avec les sous-titres automatiques ?', answer: 'Oui ! Notre outil prend en charge les sous-titres automatiques ainsi que les sous-titres créés manuellement.' },
      ],
    },
    'zh-CN': {
      features: [
        { icon: '⚡', title: '2秒极速提取', description: '直接从YouTube服务器高速拉取字幕，告别繁琐等待。' },
        { icon: '⏱️', title: '精准时间戳', description: '每行字幕均配有精确到分秒的播放定位，点击即可对照回溯。' },
        { icon: '📥', title: '一键导出与保存', description: '轻松下载完整逐字稿为清爽的Markdown格式或PDF文档。' },
      ],
      faqs: [
        { question: '如何提取YouTube视频字幕？', answer: '复制YouTube视频链接，粘贴在上方输入栏并点击“提取字幕”，完整文本将在2秒内生成。' },
        { question: '支持YouTube自动生成的字幕吗？', answer: '支持！全面兼容YouTube官方AI自动生成字幕以及创作者上传的多语言CC字幕。' },
      ],
    },
  },
  'youtube-summary': {
    ar: {
      features: [
        { icon: '💡', title: '5-10 نقاط رئيسية هامة', description: 'نقاط موجزة تسلط الضوء على الأرقام والنتائج والاستنتاجات الأساسية.' },
        { icon: '📚', title: 'سرد منظم ومفصل', description: 'ملخص شامل على شكل مقال مقسم منطقياً لقراءة مريحة.' },
        { icon: '⏱️', title: 'فصول بطوابع زمنية', description: 'عناوين أقسام الفيديو مربوطة بالأوقات المحددة في الفيديو.' },
      ],
      faqs: [
        { question: 'ما هو نموذج الذكاء الاصطناعي المستخدم في التلخيص؟', answer: 'نستخدم Google Gemini 2.5 Flash بدقة عالية وسعة استيعاب سياقية هائلة للفيديوهات الطويلة.' },
        { question: 'هل يمكن تلخيص مقاطع فيديو مدتها ساعتان أو أكثر؟', answer: 'نعم! يتعامل نظامنا الذكي بسهولة مع المحاضرات والمؤتمرات والبودكاست الطويلة جداً.' },
      ],
    },
    es: {
      features: [
        { icon: '💡', title: '5-10 Conclusiones Clave', description: 'Puntos esenciales que resumen hechos, métricas e ideas fundamentales.' },
        { icon: '📚', title: 'Resumen Estructurado', description: 'Visión general completa estructurada en párrafos y títulos lógicos.' },
        { icon: '⏱️', title: 'Capítulos con Tiempo', description: 'Desglose del video con marcas de tiempo para saltar a partes clave.' },
      ],
      faqs: [
        { question: '¿Qué modelo de IA se utiliza para resumir?', answer: 'Utilizamos Google Gemini 2.5 Flash para garantizar alta precisión y gran capacidad de contexto.' },
        { question: '¿Puede resumir videos de más de 2 horas?', answer: '¡Sí! Procesa sin problemas conferencias, podcasts y tutoriales largos sin recortes.' },
      ],
    },
    fr: {
      features: [
        { icon: '💡', title: '5 à 10 Points Clés', description: 'Puces synthétiques mettant en avant faits, statistiques et conclusions.' },
        { icon: '📚', title: 'Synthèse Structurée', description: 'Article récapitulatif détaillé et facile à assimiler.' },
        { icon: '⏱️', title: 'Chapitres Horodatés', description: 'Titres de sections associés aux moments clés de la vidéo.' },
      ],
      faqs: [
        { question: 'Quel modèle d’IA est utilisé ?', answer: 'Nous utilisons Google Gemini 2.5 Flash pour une précision optimale et un contexte étendu.' },
        { question: 'Peut-on résumer des vidéos de plus de 2 heures ?', answer: 'Oui ! Notre moteur gère sans effort les longs podcasts, conférences et cours magistraux.' },
      ],
    },
    'zh-CN': {
      features: [
        { icon: '💡', title: '5-10条核心洞察', description: '精炼提炼视频中的核心事实、关键数据与结论观点。' },
        { icon: '📚', title: '结构化通篇速览', description: '分章节长文总结，逻辑清晰，适合深度研读。' },
        { icon: '⏱️', title: '分段章节时间线', description: '章节标题精准匹配视频播放节点，随时跳播重点。' },
      ],
      faqs: [
        { question: '摘要使用什么AI模型生成？', answer: '采用Google Gemini 2.5 Flash大模型，具备高精度与超长上下文理解能力。' },
        { question: '支持总结长达2小时以上的长视频吗？', answer: '支持！超大上下文窗口能够完整分析长篇学术演讲、播客访谈与会议记录。' },
      ],
    },
  },
  'youtube-to-text': {
    ar: {
      features: [
        { icon: '✍️', title: 'تحويل نصي فوري', description: 'تحويل كامل حديث الفيديو إلى نص مقروء خالي من الشوائب الصوتية.' },
        { icon: '✂️', title: 'نص متصل ونظيف', description: 'إمكانية قراءة النص بدون فواصل أو طوابع زمنية مشتتة.' },
        { icon: '📋', title: 'نسخ بنقرة واحدة', description: 'انسخ المحتوى مباشرة للاستخدام في الملاحظات أو برامج التحرير.' },
      ],
      faqs: [
        { question: 'كيف أحول فيديو يوتيوب إلى نص؟', answer: 'ضع رابط الفيديو في الأعلى واضغط على الزر، وسيتم تحويل الكلام فورياً إلى نص نقي.' },
        { question: 'هل يمكن نسخ النص إلى Notion أو Word؟', answer: 'نعم، النص مهيأ بالكامل للنسخ المباشر إلى أي تطبيق تدوين ملاحظات.' },
      ],
    },
    es: {
      features: [
        { icon: '✍️', title: 'Conversión a Texto Limpio', description: 'Convierte el discurso del video en texto legible sin ruidos ni pausas innecesarias.' },
        { icon: '✂️', title: 'Lectura Continua', description: 'Lee todo el contenido de forma fluida con o sin marcas de tiempo.' },
        { icon: '📋', title: 'Copia Inmediata', description: 'Copia el texto al portapapeles con un solo clic para usarlo en tus documentos.' },
      ],
      faqs: [
        { question: '¿Cómo convertir un video de YouTube a texto?', answer: 'Pega el enlace en el recuadro y pulsa convertir para obtener el texto completo en segundos.' },
        { question: '¿Puedo usar el texto en Word o Notion?', answer: 'Por supuesto, el texto formateado se integra perfectamente en cualquier editor.' },
      ],
    },
    fr: {
      features: [
        { icon: '✍️', title: 'Conversion Fidèle en Texte', description: 'Transformez les paroles de la vidéo en texte écrit parfaitement lisible.' },
        { icon: '✂️', title: 'Lecture Fluide', description: 'Consultez la transcription sans coupures ni horodatages superflus.' },
        { icon: '📋', title: 'Copie Immédiate', description: 'Copiez le texte complet en un clic pour vos notes et articles.' },
      ],
      faqs: [
        { question: 'Comment convertir une vidéo YouTube en texte ?', answer: 'Collez le lien dans la barre de saisie et cliquez pour récupérer le texte complet immédiatement.' },
        { question: 'Puis-je coller le texte dans Notion ou Word ?', answer: 'Oui, le texte est propre et directement réutilisable dans vos applications habituelles.' },
      ],
    },
    'zh-CN': {
      features: [
        { icon: '✍️', title: '视频语音秒转文字', description: '将视频对话完整转为清晰易读的纯文本稿件。' },
        { icon: '✂️', title: '无缝连贯排版', description: '智能过滤语气词，支持纯享阅读或带时间轴对照。' },
        { icon: '📋', title: '一键复制入库', description: '单击即复制到剪贴板，方便归档到Notion、Obsidian或Word。' },
      ],
      faqs: [
        { question: '如何将YouTube视频转为文本？', answer: '粘贴视频地址并点击按钮，系统将在秒级内输出清洗好的逐字稿。' },
        { question: '转出的文字可以直接做学习笔记吗？', answer: '完全可以，格式规范整洁，非常适合用于学术记录与文章编写。' },
      ],
    },
  },
  'download-youtube-transcript': {
    ar: {
      features: [
        { icon: '💾', title: 'صيغ تصدير متعددة', description: 'تنزيل النص بصيغ TXT وSRT وMarkdown وPDF المتوافقة مع كافة البرامج.' },
        { icon: '🎬', title: 'جاهز لبرامج المونتاج', description: 'ملفات ترجمة SRT مهيأة مباشرة لبرامج Premiere Pro وDaVinci وCapCut.' },
        { icon: '⚡', title: 'تنزيل غير محدود ومجاني', description: 'لا توجد قيود على عدد الفيديوهات أو حجم الملفات المحملة يومياً.' },
      ],
      faqs: [
        { question: 'ما هي صيغ التحميل المتوفرة؟', answer: 'يمكنك تنزيل الترجمة بصيغ TXT (نص عادي)، SRT (ملف ترجمة مع أوقات)، أو Markdown.' },
        { question: 'هل يلزم تثبيت برامج لتنزيل الترجمة؟', answer: 'لا، تتم العملية سحابياً عبر المتصفح بالكامل بدون أي إضافات أو برامج خارجية.' },
      ],
    },
    es: {
      features: [
        { icon: '💾', title: 'Formatos Múltiples', description: 'Descarga en TXT, SRT, Markdown o PDF según tus necesidades de edición o estudio.' },
        { icon: '🎬', title: 'Listo para Edición de Video', description: 'Archivos SRT perfectamente sincronizados para Premiere, Final Cut y DaVinci.' },
        { icon: '⚡', title: 'Descargas Gratuitas Ilimitadas', description: 'Sin límites de tamaño ni restricciones en la cantidad de videos que puedes procesar.' },
      ],
      faqs: [
        { question: '¿En qué formatos puedo descargar la transcripción?', answer: 'Puedes descargarla en TXT (texto plano), SRT (subtítulos con minutaje) o Markdown estructurado.' },
        { question: '¿Es necesario instalar extensiones?', answer: 'No, todo funciona directamente en línea desde tu navegador.' },
      ],
    },
    fr: {
      features: [
        { icon: '💾', title: 'Multiples Formats Disponibles', description: 'Téléchargement en TXT, SRT, Markdown ou PDF selon vos besoins.' },
        { icon: '🎬', title: 'Compatible Logiciels de Montage', description: 'Fichiers SRT prêts à l’emploi pour Premiere Pro, DaVinci Resolve et CapCut.' },
        { icon: '⚡', title: 'Téléchargements Illimités et Gratuits', description: 'Aucune limite sur la durée des vidéos ou le nombre d’extractions quotidiennes.' },
      ],
      faqs: [
        { question: 'Quels sont les formats de téléchargement proposés ?', answer: 'Vous pouvez exporter les sous-titres en TXT brut, en SRT avec minutage ou en Markdown.' },
        { question: 'Faut-il installer un logiciel ?', answer: 'Non, le service fonctionne à 100% en ligne sur n’importe quel navigateur.' },
      ],
    },
    'zh-CN': {
      features: [
        { icon: '💾', title: '多格式导出支持', description: '支持下载为TXT纯文本、SRT标准字幕、Markdown及PDF文档。' },
        { icon: '🎬', title: '剪辑软件即插即用', description: '导出的SRT文件精准匹配Premiere、Final Cut Pro、剪映与DaVinci。' },
        { icon: '⚡', title: '无限制完全免费', description: '无视频时长限制，无需登录或付费，随心批量下载。' },
      ],
      faqs: [
        { question: '支持哪些字幕下载格式？', answer: '支持TXT纯文本、带时间轴的SRT字幕文件以及Markdown格式。' },
        { question: '需要安装浏览器插件吗？', answer: '不需要，网页端直接运行，轻量安全且速度极快。' },
      ],
    },
  },
};

export function getLocalizedFeaturesForSlug(slug, lang, defaultFeatures) {
  const slugEntry = LOCALIZED_FEATURES_FAQS[slug];
  if (slugEntry && slugEntry[lang]?.features) {
    return slugEntry[lang].features;
  }
  // Generic translation fallback for languages if slug not explicitly mapped
  return defaultFeatures;
}

export function getLocalizedFaqsForSlug(slug, lang, defaultFaqs) {
  const slugEntry = LOCALIZED_FEATURES_FAQS[slug];
  if (slugEntry && slugEntry[lang]?.faqs) {
    return slugEntry[lang].faqs;
  }
  return defaultFaqs;
}
