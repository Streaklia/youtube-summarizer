import type { Metadata } from 'next';
import { ArabicToolLandingLayout } from '@/components/ArabicToolLandingLayout';
import { FileText, Clock, Copy } from 'lucide-react';

const SITE_URL = 'https://www.mytranscript.pro';
const AR_URL = `${SITE_URL}/ar/youtube-transcript`;
const EN_URL = `${SITE_URL}/youtube-transcript`;

export const metadata: Metadata = {
  title: 'تفريغ فيديو يوتيوب إلى نص مجاناً وبدقة عالية | MyTranscript',
  description:
    'حوّل أي فيديو يوتيوب إلى نص مكتوب فوراً. استخرج النصوص مع التوقيت الزمني أو بدونه مع إمكانية النسخ والتحميل بضغطة زر.',
  keywords: [
    'تفريغ يوتيوب إلى نص',
    'استخراج نص فيديو يوتيوب',
    'تحويل الصوت إلى نص يوتيوب',
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
    title: 'تفريغ فيديو يوتيوب إلى نص مجاناً وبدقة عالية | MyTranscript',
    description:
      'حوّل أي فيديو يوتيوب إلى نص مكتوب فوراً مع التوقيت الزمني وإمكانية النسخ والتحميل بضغطة زر.',
    url: AR_URL,
    siteName: 'MyTranscript',
    locale: 'ar_AR',
    type: 'website',
    images: [{ url: `${SITE_URL}/logo.png`, width: 800, height: 600, alt: 'تفريغ فيديو يوتيوب إلى نص' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تفريغ فيديو يوتيوب إلى نص مجاناً وبدقة عالية | MyTranscript',
    description: 'استخرج نصوص فيديوهات يوتيوب فوراً مع التوقيت الزمني أو بدونه مجاناً.',
    images: [`${SITE_URL}/logo.png`],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript — أداة تفريغ فيديو يوتيوب إلى نص',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All Web Browsers',
      inLanguage: 'ar',
      url: AR_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1980',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'استخراج نص فيديو يوتيوب مع الطوابع الزمنية الدقيقة',
        'دعم الشرح التلقائي والترجمات المرفوعة متعددة اللغات',
        'نسخ فوري أو تحميل بصيغة TXT و SRT و Markdown',
      ],
      description:
        'أداة مجانية لتحويل أي فيديو يوتيوب إلى نص مكتوب بدقة عالية مع إمكانية المزامنة التلقائية مع الفيديو.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'كيف أستخرج النص من فيديو يوتيوب بسرعة؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'انسخ رابط الفيديو، الصقه في الصندوق أعلاه، واضغط على استخراج النص. سيظهر النص الكامل خلال ثانيتين مع التوقيت الزمني لكل جملة.',
          },
        },
        {
          '@type': 'Question',
          name: 'هل تدعم الأداة تفريغ الفيديوهات باللغة العربية والإنجليزية؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'نعم، تستخرج الأداة النصوص العربية والإنجليزية وكافة اللغات المتوفرة في مسار الترجمة للفيديو، مع إمكانية تلخيصها بالعربية.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <FileText className="w-5 h-5 text-[#E02440]" />,
    title: 'استخراج النص خلال ثوانٍ',
    desc: 'قراءة مباشرة لمسارات الترجمة السحابية دون انتظار تحميل ملفات الصوت أو الفيديو.',
    highlight: 'فوري',
  },
  {
    icon: <Clock className="w-5 h-5 text-rose-400" />,
    title: 'توقيت زمني تفاعلي',
    desc: 'انقر على أي جملة في النص لينتقل مشغل يوتيوب تلقائياً إلى نفس الثانية في الفيديو.',
    highlight: 'مزامنة دقيقة',
  },
  {
    icon: <Copy className="w-5 h-5 text-emerald-400" />,
    title: 'نسخ وتحميل بضغطة زر',
    desc: 'انسخ النص كاملاً أو نزّله بصيغة TXT صافية أو SRT للترجمة والمونتاج.',
    highlight: 'TXT & SRT',
  },
];

const FAQS = [
  {
    q: 'كيف أستخرج النص الكامل من أي فيديو يوتيوب مجاناً؟',
    a: 'كل ما عليك هو لصق رابط الفيديو في الأداة أعلاه والضغط على "استخراج النص الآن" ليظهر التفريغ فوراً بدون تسجيل.',
  },
  {
    q: 'هل يمكنني الحصول على النص بدون طوابع زمنية؟',
    a: 'نعم، يمكنك تنزيل ملف .TXT نظيف خالٍ من الأرقام والطوابع الزمنية لاستخدامه مباشرة في المقالات والملاحظات.',
  },
  {
    q: 'ماذا لو لم يظهر خيار النص في تطبيق يوتيوب على هاتفي؟',
    a: 'تعتمد منصتنا على 6 مسارات استخراج متعددة الطبقات للوصول إلى مسار الترجمة حتى عندما لا يظهر في واجهة تطبيق يوتيوب.',
  },
];

export default function ArabicYoutubeTranscriptPage() {
  const articleContent = (
    <div className="space-y-6 text-zinc-300 leading-relaxed">
      <h2 className="text-2xl font-extrabold text-white">
        أسرع طريقة لتحويل الصوت والفيديو في يوتيوب إلى نص مكتوب
      </h2>
      <p className="text-sm text-zinc-400">
        سواء كنت تحضّر بحثاً جامعياً، أو تدوّن ملاحظات من دورة تدريبية، أو تستخرج اقتباساً لكتابة مقال، توفر لك أداة تفريغ يوتيوب إلى نص نصاً منظماً قابلاً للنسخ والبحث الفوري.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <h3 className="font-bold text-white text-sm mb-1">للطلاب والباحثين</h3>
          <p className="text-xs text-zinc-400">
            حوّل المحاضرات الطويلة إلى نصوص مكتوبة تسهل مراجعتها وتلخيصها قبل الامتحانات.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <h3 className="font-bold text-white text-sm mb-1">لصنّاع المحتوى والمسوقين</h3>
          <p className="text-xs text-zinc-400">
            أعد تدوير فيديوهات يوتيوب إلى مقالات SEO ومنشورات منصات التواصل خلال دقائق.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ArabicToolLandingLayout
      currentPath="/ar/youtube-transcript"
      badge="تفريغ النصوص من يوتيوب"
      badgeEmoji="📄"
      badgeHighlight="استخراج فوري"
      h1Prefix="أداة"
      h1Highlight="تفريغ فيديو يوتيوب إلى نص"
      h1Suffix="مجاناً وبدقة عالية"
      subheadline="حوّل أي فيديو يوتيوب إلى نص مكتوب فوراً. استخرج النصوص مع التوقيت الزمني أو بدونه مع إمكانية النسخ والتحميل بضغطة زر."
      inputPlaceholder="الصق رابط فيديو يوتيوب لتفريغ النص..."
      buttonLabel="استخراج النص الآن"
      targetTab="transcript"
      features={FEATURES}
      articleContent={articleContent}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
    />
  );
}
