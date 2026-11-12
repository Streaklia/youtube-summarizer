import type { Metadata } from 'next';
import { ArabicToolLandingLayout } from '@/components/ArabicToolLandingLayout';
import { MessageSquare, Sparkles, Search } from 'lucide-react';

const SITE_URL = 'https://www.mytranscript.pro';
const AR_URL = `${SITE_URL}/ar/youtube-transcript-chatbot`;
const EN_URL = `${SITE_URL}/youtube-transcript-chatbot`;

export const metadata: Metadata = {
  title: 'الدردشة مع فيديوهات يوتيوب بالذكاء الاصطناعي | MyTranscript',
  description:
    'اطرح أي سؤال حول محتوى الفيديو واحصل على إجابات دقيقة ومباشرة مستخرجة من نص الفيديو في ثوانٍ معدودة.',
  keywords: [
    'اسأل الفيديو بالذكاء الاصطناعي',
    'الدردشة مع فيديو يوتيوب',
    'شات يوتيوب',
  ],
  alternates: {
    canonical: AR_URL,
    languages: {
      ar: AR_URL,
      en: EN_URL,
      'x-default': EN_URL,
    },
  },
  openGraph: {
    title: 'الدردشة مع فيديوهات يوتيوب بالذكاء الاصطناعي | MyTranscript',
    description:
      'اطرح أي سؤال حول محتوى الفيديو واحصل على إجابات دقيقة ومباشرة مستخرجة من نص الفيديو في ثوانٍ.',
    url: AR_URL,
    siteName: 'MyTranscript',
    locale: 'ar_AR',
    type: 'website',
    images: [{ url: `${SITE_URL}/logo.png`, width: 800, height: 600, alt: 'الدردشة مع فيديوهات يوتيوب بالذكاء الاصطناعي' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الدردشة مع فيديوهات يوتيوب بالذكاء الاصطناعي | MyTranscript',
    description: 'اسأل أي فيديو يوتيوب واحصل على إجابات فورية باللغة العربية من محتوى الفيديو.',
    images: [`${SITE_URL}/logo.png`],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript — الدردشة مع فيديوهات يوتيوب بالذكاء الاصطناعي',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All Web Browsers',
      inLanguage: 'ar',
      url: AR_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1840',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'طرح أسئلة مباشرة على محتوى أي فيديو يوتيوب باللغة العربية',
        'استخراج إجابات مدعومة بالطوابع الزمنية من نص الفيديو',
        'أزرار أسئلة سريعة للوصول إلى الاقتباسات والخطوات العملية',
      ],
      description:
        'مساعد شات ذكاء اصطناعي يتيح لك محاورة محتوى فيديوهات يوتيوب واستخراج الإجابات الدقيقة باللغة العربية.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'كيف تعمل الدردشة مع فيديو يوتيوب بالذكاء الاصطناعي؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'بعد إدخال رابط الفيديو، يستخرج النظام النص الكامل ويزود به نموذج الذكاء الاصطناعي للإجابة عن جميع أسئلتك بناءً على ما قيل فعلياً في الفيديو.',
          },
        },
        {
          '@type': 'Question',
          name: 'هل يرد المساعد باللغة العربية حتى لو كان الفيديو بلغة أخرى؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'نعم، عند بدء الجلسة من الصفحة العربية أو اختيار العربية، يرد المساعد باللغة العربية الفصحى مع الإشارة إلى التوقيت الزمني داخل الفيديو.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <MessageSquare className="w-5 h-5 text-[#E02440]" />,
    title: 'إجابات فورية من داخل الفيديو',
    desc: 'بدلاً من البحث اليدوي في مقطع مدته ساعتان، اسأل المساعد الذكي ليخبرك بالإجابة الدقيقة فوراً.',
    highlight: 'شات مباشر',
  },
  {
    icon: <Search className="w-5 h-5 text-rose-400" />,
    title: 'تحديد التوقيت الزمني للإجابة',
    desc: 'استخرج الاقتباسات والأرقام والخطوات العملية مع ذكر الدقيقة التي وردت فيها.',
    highlight: 'توثيق زمني',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    title: 'تبسيط الشروحات المعقدة',
    desc: 'اطلب من الذكاء الاصطناعي شرح مفهوم تقني أو علمي ورد في الفيديو بأسلوب مبسط بالعربية.',
    highlight: 'دعم عربي',
  },
];

const FAQS = [
  {
    q: 'هل الدردشة مع فيديوهات يوتيوب مجانية؟',
    a: 'نعم، خدمة الشات التفاعلي متاحة مجاناً بدون حاجة لتسجيل حساب أو اشتراك شهري.',
  },
  {
    q: 'ما نوع الأسئلة التي يمكنني طرحها على الفيديو؟',
    a: 'يمكنك سؤال الذكاء الاصطناعي عن الفكرة الرئيسية، أو استخراج قائمة الكتب أو الأدوات المذكورة، أو مقارنة الحجج، أو طلب ترجمة فكرة معينة.',
  },
];

export default function ArabicYoutubeChatbotPage() {
  const articleContent = (
    <div className="space-y-6 text-zinc-300 leading-relaxed">
      <h2 className="text-2xl font-extrabold text-white">
        تحاور مع أي فيديو يوتيوب وكأنك تتحدث مع خبير قرأه بالكامل
      </h2>
      <p className="text-sm text-zinc-400">
        عند لصق رابط الفيديو هنا، تفتح لك منصة MyTranscript مساحة عمل متكاملة تضم مشغل الفيديو، وأهم النقاط، ونافذة الدردشة المباشرة بالعربية لطرح أي سؤال والحصول على إجابات دقيقة من نص الفيديو في ثوانٍ.
      </p>
    </div>
  );

  return (
    <ArabicToolLandingLayout
      currentPath="/ar/youtube-transcript-chatbot"
      badge="مساعد الفيديو الذكي"
      badgeEmoji="💬"
      badgeHighlight="اسأل الفيديو"
      h1Prefix="أداة"
      h1Highlight="الدردشة مع فيديوهات يوتيوب"
      h1Suffix="بالذكاء الاصطناعي"
      subheadline="اطرح أي سؤال حول محتوى الفيديو واحصل على إجابات دقيقة ومباشرة مستخرجة من نص الفيديو في ثوانٍ معدودة."
      inputPlaceholder="الصق رابط فيديو يوتيوب لبدء المحادثة معه..."
      buttonLabel="ابدأ الدردشة مع الفيديو"
      targetTab="takeaways"
      features={FEATURES}
      articleContent={articleContent}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
    />
  );
}
