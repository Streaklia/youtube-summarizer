import type { Metadata } from 'next';
import { ArabicToolLandingLayout } from '@/components/ArabicToolLandingLayout';
import { Mic, Clock, Search } from 'lucide-react';

const SITE_URL = 'https://www.mytranscript.pro';
const AR_URL = `${SITE_URL}/ar/podcast-transcript`;
const EN_URL = `${SITE_URL}/podcast-transcript`;

export const metadata: Metadata = {
  title: 'تفريغ حلقات البودكاست من يوتيوب إلى نص مجاناً | MyTranscript',
  description:
    'حوّل حلقات البودكاست الطويلة على يوتيوب إلى مقالات ونصوص قابلة للبحث والاقتباس بدقة عالية ومجاناً بالكامل.',
  keywords: [
    'تفريغ بودكاست إلى نص',
    'تحويل بودكاست يوتيوب إلى نص',
    'تفريغ صوتي مجاني',
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
    title: 'تفريغ حلقات البودكاست من يوتيوب إلى نص مجاناً | MyTranscript',
    description:
      'حوّل حلقات البودكاست الطويلة على يوتيوب إلى مقالات ونصوص قابلة للبحث والاقتباس مجاناً.',
    url: AR_URL,
    siteName: 'MyTranscript',
    locale: 'ar_AR',
    type: 'website',
    images: [{ url: `${SITE_URL}/logo.png`, width: 800, height: 600, alt: 'تفريغ حلقات البودكاست إلى نص' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تفريغ حلقات البودكاست من يوتيوب إلى نص مجاناً | MyTranscript',
    description: 'استخرج نصوص واقتباسات حلقات البودكاست الطويلة من يوتيوب في ثوانٍ مجاناً.',
    images: [`${SITE_URL}/logo.png`],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript — أداة تفريغ حلقات البودكاست إلى نص',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All Web Browsers',
      inLanguage: 'ar',
      url: AR_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1760',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'تفريغ حلقات البودكاست الطويلة التي تمتد من ساعة إلى 4 ساعات',
        'استخراج الاقتباسات والمحاور الحوارية بدقة زمنية',
        'إمكانية تلخيص الحلقة واستخلاص أهم الأفكار بالعربية',
      ],
      description:
        'أداة مجانية لتحويل حلقات البودكاست المرئية على يوتيوب إلى نصوص مقروءة ومقالات واقتباسات منظمة.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'هل تستطيع الأداة تفريغ حلقة بودكاست مدتها 3 ساعات؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'نعم، المحرك مُهيأ لمعالجة المقابلات الطويلة وحلقات البودكاست متعددة الساعات واستخراج النص الكامل مع التوقيت الزمني.',
          },
        },
        {
          '@type': 'Question',
          name: 'هل يمكنني تلخيص حلقة البودكاست بعد تفريغها؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'نعم، بعد ظهور النص يمكنك الانتقال بنقرة واحدة إلى تبويب Key Takeaways أو Full Summary للحصول على خلاصة الحلقة بالعربية.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <Mic className="w-5 h-5 text-[#E02440]" />,
    title: 'مصمم للحلقات الحوارية الطويلة',
    desc: 'تابع تسلسل الأفكار والحوار في المقابلات والبودكاست دون الحاجة لإعادة تشغيل الصوت عشرات المرات.',
    highlight: 'دعم الساعات الطويلة',
  },
  {
    icon: <Search className="w-5 h-5 text-rose-400" />,
    title: 'اقتباس وبحث سريع',
    desc: 'اعثر على الاقتباسات المهمة وأسماء الكتب والأفكار المذكورة في الحلقة مع رابط مباشر للثانية المحددة.',
    highlight: 'دقة الاقتباس',
  },
  {
    icon: <Clock className="w-5 h-5 text-emerald-400" />,
    title: 'ملخصات وفصول للحلقات',
    desc: 'قسّم الحلقة إلى فصول زمنية وحوّلها إلى ملاحظات جاهزة للنشر أو الأرشفة في Notion و Word.',
    highlight: 'إنتاجية مضاعفة',
  },
];

const FAQS = [
  {
    q: 'هل يعمل تفريغ البودكاست مجاناً للحلقات العربية والأجنبية؟',
    a: 'نعم، يعمل مجاناً تماماً للبودكاست العربي والإنجليزي طالما يتوفر مسار شرح أو ترجمة تلقائية على يوتيوب.',
  },
  {
    q: 'كيف أحوّل حلقة بودكاست إلى مقال مكتوب؟',
    a: 'الصق رابط الحلقة على يوتيوب لتفريغ النص، ثم استخدم تبويب Full Summary باللغة العربية للحصول على صياغة مقالية منظمة.',
  },
];

export default function ArabicPodcastTranscriptPage() {
  const articleContent = (
    <div className="space-y-6 text-zinc-300 leading-relaxed">
      <h2 className="text-2xl font-extrabold text-white">
        حوّل حلقات البودكاست المفضلة إلى مكتبة نصوص واقتباسات قابلة للبحث
      </h2>
      <p className="text-sm text-zinc-400">
        تحتوي حلقات البودكاست على كم هائل من المعرفة، لكن تصفّح ملف صوتي مدته ثلاث ساعات للوصول إلى معلومة واحدة مهمة قد يستغرق وقتاً طويلاً. عبر MyTranscript يمكنك تحويل الحلقة كاملة إلى نص مقروء خلال ثوانٍ، واستخراج أهم الأفكار وتنزيل النص للدراسة أو التدوين.
      </p>
    </div>
  );

  return (
    <ArabicToolLandingLayout
      currentPath="/ar/podcast-transcript"
      badge="تفريغ البودكاست والمقابلات"
      badgeEmoji="🎙️"
      badgeHighlight="حلقات طويلة"
      h1Prefix="أداة"
      h1Highlight="تفريغ حلقات البودكاست"
      h1Suffix="من يوتيوب إلى نص مجاناً"
      subheadline="حوّل حلقات البودكاست الطويلة على يوتيوب إلى مقالات ونصوص قابلة للبحث والاقتباس بدقة عالية ومجاناً بالكامل."
      inputPlaceholder="الصق رابط حلقة البودكاست على يوتيوب..."
      buttonLabel="تفريغ البودكاست"
      targetTab="transcript"
      features={FEATURES}
      articleContent={articleContent}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
    />
  );
}
