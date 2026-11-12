import type { Metadata } from 'next';
import { ArabicToolLandingLayout } from '@/components/ArabicToolLandingLayout';
import { FileCode, Film, Clock } from 'lucide-react';

const SITE_URL = 'https://www.mytranscript.pro';
const AR_URL = `${SITE_URL}/ar/youtube-to-srt`;
const EN_URL = `${SITE_URL}/youtube-to-srt`;

export const metadata: Metadata = {
  title: 'تحميل ترجمة يوتيوب بصيغة SRT و TXT مجاناً | MyTranscript',
  description:
    'استخرج وحمّل ملفات الترجمة والـ Subtitles من أي فيديو يوتيوب بصيغة SRT أو نص عادي جاهز لبرامج المونتاج والدراسة مجاناً.',
  keywords: [
    'تحميل ترجمة يوتيوب SRT',
    'تحويل يوتيوب إلى SRT',
    'استخراج ملف ترجمة يوتيوب',
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
    title: 'تحميل ترجمة يوتيوب بصيغة SRT و TXT مجاناً | MyTranscript',
    description:
      'استخرج وحمّل ملفات الترجمة من أي فيديو يوتيوب بصيغة SRT أو نص عادي لبرامج المونتاج والدراسة مجاناً.',
    url: AR_URL,
    siteName: 'MyTranscript',
    locale: 'ar_AR',
    type: 'website',
    images: [{ url: `${SITE_URL}/logo.png`, width: 800, height: 600, alt: 'تحميل ترجمة يوتيوب بصيغة SRT' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تحميل ترجمة يوتيوب بصيغة SRT و TXT مجاناً | MyTranscript',
    description: 'حوّل فيديوهات يوتيوب إلى ملفات ترجمة .SRT و .TXT متوافقة مع Premiere و DaVinci.',
    images: [`${SITE_URL}/logo.png`],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript — محوّل وتحميل ترجمة يوتيوب SRT و TXT',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All Web Browsers',
      inLanguage: 'ar',
      url: AR_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2040',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'تصدير ملفات ترجمة يوتيوب القياسية SubRip (.srt)',
        'ضبط التوقيت الزمني بالميلي ثانية لمنع تداخل النصوص',
        'تصدير ملف نصي صافٍ (.txt) بدون طوابع زمنية',
      ],
      description:
        'أداة مجانية لاستخراج وتحميل ملفات الترجمة من فيديوهات يوتيوب بصيغة SRT و TXT جاهزة لبرامج المونتاج.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'هل ملف SRT المستخرج يعمل في Premiere Pro و CapCut؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'نعم، يستخدم الملف التنسيق القياسي لملفات SubRip مع ترقيم متسلسل وتوقيت بالميلي ثانية متوافق مع Premiere Pro و DaVinci Resolve و CapCut و Final Cut و VLC.',
          },
        },
        {
          '@type': 'Question',
          name: 'هل يمكنني تحميل النص العادي TXT بدون توقيت؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'نعم، يتيح تبويب Transcript أزرار تحميل مباشرة لكل من .SRT و .TXT و Markdown.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <FileCode className="w-5 h-5 text-[#E02440]" />,
    title: 'تنسيق SubRip (.SRT) قياسي',
    desc: 'تصدير ملفات SRT بترقيم متسلسل وطوابع زمنية مضبوطة تمنع تداخل الجمل على الشاشة.',
    highlight: '.SRT قياسي',
  },
  {
    icon: <Film className="w-5 h-5 text-rose-400" />,
    title: 'متوافق مع برامج المونتاج',
    desc: 'اسحب الملف مباشرة إلى Adobe Premiere أو DaVinci Resolve أو CapCut أو مشغل VLC.',
    highlight: 'Premiere & CapCut',
  },
  {
    icon: <Clock className="w-5 h-5 text-emerald-400" />,
    title: 'نسخة TXT صافية للدراسة',
    desc: 'نزّل النص الصافي بدون توقيت بنقرة واحدة إذا كنت تستخدمه في الدراسة أو الترجمة.',
    highlight: 'دعم TXT',
  },
];

const FAQS = [
  {
    q: 'كيف أحمّل ملف ترجمة يوتيوب بصيغة SRT؟',
    a: 'الصق رابط الفيديو أعلاه واضغط على "استخراج ملف SRT"، وفي تبويب Transcript ستجد زر التحميل المباشر بصيغة .SRT و .TXT.',
  },
  {
    q: 'هل يعمل التحميل على الترجمة التلقائية في يوتيوب؟',
    a: 'نعم، إذا لم يرفع صاحب القناة ملف ترجمة يدوي، تستخرج الأداة الترجمة التلقائية وتنسقها في ملف SRT متكامل.',
  },
  {
    q: 'هل توجد أي علامات مائية أو قيود على عدد الملفات؟',
    a: 'لا، الملفات نظيفة 100% ومجانية بالكامل بدون أي علامات مائية أو حدود تحميل.',
  },
];

export default function ArabicYoutubeToSrtPage() {
  const articleContent = (
    <div className="space-y-6 text-zinc-300 leading-relaxed">
      <h2 className="text-2xl font-extrabold text-white">
        استخراج ملفات الترجمة الزمنية (.SRT) من يوتيوب في ثوانٍ
      </h2>
      <p className="text-sm text-zinc-400">
        يعتمد صانعو الفيديو والمترجمون على صيغة <strong>.SRT</strong> لدمج الترجمات الاحترافية على المقاطع القصيرة والطويلة. تتيح لك هذه الأداة توليد ملف الترجمة القياسي مباشرة من يوتيوب مع إمكانية تنزيله بصيغة <code>.srt</code> أو <code>.txt</code> بضغطة زر.
      </p>
      <div dir="ltr" className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1 text-left">
        <div className="text-emerald-400 font-bold">1</div>
        <div className="text-[#E02440]">00:00:01,250 --&gt; 00:00:04,800</div>
        <div className="text-white">Welcome back to our podcast!</div>
      </div>
    </div>
  );

  return (
    <ArabicToolLandingLayout
      currentPath="/ar/youtube-to-srt"
      badge="مستخرج الترجمات الزمنية"
      badgeEmoji="🎬"
      badgeHighlight="صيغة .SRT & .TXT"
      h1Prefix="أداة"
      h1Highlight="تحميل ترجمة يوتيوب"
      h1Suffix="بصيغة SRT و TXT مجاناً"
      subheadline="استخرج وحمّل ملفات الترجمة والـ Subtitles من أي فيديو يوتيوب بصيغة SRT أو نص عادي جاهز لبرامج المونتاج والدراسة مجاناً."
      inputPlaceholder="الصق رابط فيديو يوتيوب لتحميل ملف الترجمة SRT..."
      buttonLabel="استخراج ملف SRT"
      targetTab="transcript"
      features={FEATURES}
      articleContent={articleContent}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
    />
  );
}
