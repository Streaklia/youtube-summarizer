import type { Metadata } from 'next';
import { ArabicToolLandingLayout } from '@/components/ArabicToolLandingLayout';
import { Sparkles, FileText, Download } from 'lucide-react';

const SITE_URL = 'https://www.mytranscript.pro';
const AR_URL = `${SITE_URL}/ar`;
const EN_URL = `${SITE_URL}/`;

export const metadata: Metadata = {
  title: 'تفريغ وتلخيص فيديوهات يوتيوب بالذكاء الاصطناعي مجاناً | MyTranscript',
  description:
    'استخرج النص الكامل لأي فيديو يوتيوب، حمّل ملفات الترجمة SRT، واحصل على ملخص ذكي وأهم النقاط في ثوانٍ بدون تسجيل وبدعم كامل للعربية.',
  keywords: [
    'تفريغ فيديو يوتيوب',
    'تحويل يوتيوب إلى نص',
    'تلخيص فيديو بالذكاء الاصطناعي',
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
    title: 'تفريغ وتلخيص فيديوهات يوتيوب بالذكاء الاصطناعي مجاناً | MyTranscript',
    description:
      'استخرج النص الكامل لأي فيديو يوتيوب، حمّل ملفات الترجمة SRT، واحصل على ملخص ذكي وأهم النقاط في ثوانٍ بدون تسجيل وبدعم كامل للعربية.',
    url: AR_URL,
    siteName: 'MyTranscript',
    locale: 'ar_AR',
    type: 'website',
    images: [{ url: `${SITE_URL}/logo.png`, width: 800, height: 600, alt: 'MyTranscript العربية' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تفريغ وتلخيص فيديوهات يوتيوب بالذكاء الاصطناعي مجاناً | MyTranscript',
    description:
      'استخرج النص الكامل لأي فيديو يوتيوب وحمّل ملفات SRT واحصل على ملخص ذكي باللغة العربية مجاناً.',
    images: [`${SITE_URL}/logo.png`],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript — تفريغ وتلخيص فيديوهات يوتيوب بالذكاء الاصطناعي',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All Web Browsers',
      inLanguage: 'ar',
      url: AR_URL,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2450',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'تفريغ فيديوهات يوتيوب إلى نص مكتوب خلال ثوانٍ',
        'تلخيص الفيديوهات الطويلة وأهم النقاط باللغة العربية',
        'تصدير ملفات الترجمة بصيغة SRT و TXT و Markdown',
        'الدردشة التفاعلية مع محتوى الفيديو بالذكاء الاصطناعي',
      ],
      description:
        'منصة مجانية لتفريغ وتلخيص فيديوهات يوتيوب بالذكاء الاصطناعي وتحميل ملفات الترجمة SRT و TXT بدعم كامل للغة العربية.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'هل أداة تفريغ وتلخيص فيديوهات يوتيوب مجانية بالكامل؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'نعم، جميع أدوات تفريغ النصوص، وتنزيل ملفات SRT، والتلخيص بالذكاء الاصطناعي على MyTranscript مجانية 100% ولا تتطلب إنشاء حساب.',
          },
        },
        {
          '@type': 'Question',
          name: 'هل يدعم الموقع تلخيص الفيديوهات الإنجليزية باللغة العربية؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'نعم! عند لصق أي رابط فيديو يوتيوب من الصفحات العربية، يتم تحويل مخرجات التلخيص والنقاط الرئيسية والشات إلى اللغة العربية تلقائياً، مع إمكانية التبديل بين العربية والإنجليزية بضغطة زر.',
          },
        },
        {
          '@type': 'Question',
          name: 'كيف أحمّل ملف ترجمة يوتيوب بصيغة SRT؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'بعد لصق رابط الفيديو والانتقال لصفحة التحليل، افتح تبويب Transcript ثم اضغط على زر .SRT لتنزيل ملف الترجمة الموقّت فوراً.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <FileText className="w-5 h-5 text-[#E02440]" />,
    title: 'تفريغ نصي فوري ودقيق',
    desc: 'استخرج النص الحرفي الكامل لأي فيديو يوتيوب مع الطوابع الزمنية وإمكانية النقر للانتقال إلى أي لحظة.',
    highlight: 'دقة عالية',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-rose-400" />,
    title: 'ملخصات ذكية باللغة العربية',
    desc: 'حوّل المحاضرات الطويلة والبودكاست إلى أهم الأفكار الرئيسية والفصول الزمنية بلغة عربية واضحة.',
    highlight: 'Gemini AI',
  },
  {
    icon: <Download className="w-5 h-5 text-emerald-400" />,
    title: 'تصدير SRT و TXT و PDF',
    desc: 'حمّل الترجمة جاهزة لبرامج المونتاج أو انسخ النص الصافي للدراسة وكتابة المقالات بضغطة زر.',
    highlight: 'مجاني 100%',
  },
];

const FAQS = [
  {
    q: 'هل أداة تفريغ وتلخيص فيديوهات يوتيوب مجانية بالكامل؟',
    a: 'نعم، الخدمة مجانية تماماً بدون حدود يومية معقدة وبدون الحاجة لتسجيل الدخول أو إدخال بطاقة بنكية.',
  },
  {
    q: 'هل يمكنني تلخيص فيديو باللغة الإنجليزية والحصول على النتيجة بالعربية؟',
    a: 'بكل تأكيد. بمجرد تشغيل الأداة من النسخة العربية أو اختيار العربية في صفحة الفيديو، يقوم الذكاء الاصطناعي بتلخيص المحتوى وتوليد النقاط والفصول باللغة العربية مباشرة.',
  },
  {
    q: 'هل تدعم المنصة الفيديوهات الطويلة وحلقات البودكاست؟',
    a: 'نعم، المحرك مُحسّن للتعامل مع المحاضرات والندوات وحلقات البودكاست التي تمتد لعدة ساعات مع تقسيمها إلى فصول زمنية واضحة.',
  },
  {
    q: 'هل يعمل الموقع على الجوال (آيفون وأندرويد)؟',
    a: 'نعم، تم تصميم الواجهة لتعمل بسلاسة كاملة على متصفحات الهواتف والحواسيب مع دعم كامل للاتجاه من اليمين إلى اليسار (RTL).',
  },
];

export default function ArabicHomePage() {
  const articleContent = (
    <div className="space-y-8 text-zinc-300 leading-relaxed">
      <header className="space-y-3 pb-6 border-b border-zinc-800">
        <span className="text-xs font-bold text-[#E02440] tracking-wide">
          منصة تفريغ وتلخيص يوتيوب بالذكاء الاصطناعي
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          كل ما تحتاجه لتحويل فيديوهات يوتيوب إلى معرفة مقروءة باللغة العربية
        </h2>
        <p className="text-sm text-zinc-400">
          يجمع MyTranscript بين سرعة استخراج النصوص (YouTube Transcript) وقوة الذكاء الاصطناعي لتلخيص المقاطع، وتقسيم الفصول، واستخراج ملفات الترجمة SRT في مكان واحد مجاناً.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white">كيف تبدأ خلال 3 خطوات بسيطة؟</h3>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-bold text-[#E02440]">الخطوة 1</span>
            <h4 className="font-bold text-white text-sm mt-1">انسخ رابط الفيديو</h4>
            <p className="text-xs text-zinc-400 mt-1">
              انسخ رابط أي فيديو عادي أو Shorts أو بث مباشر أو بودكاست من يوتيوب.
            </p>
          </li>
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-bold text-[#E02440]">الخطوة 2</span>
            <h4 className="font-bold text-white text-sm mt-1">الصق الرابط وابدأ التحليل</h4>
            <p className="text-xs text-zinc-400 mt-1">
              يبدأ مشغل الفيديو فوراً بينما يتم جلب النص وتوليد أهم النقاط بالذكاء الاصطناعي بالعربية.
            </p>
          </li>
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-bold text-[#E02440]">الخطوة 3</span>
            <h4 className="font-bold text-white text-sm mt-1">انسخ، حمّل، أو اسأل الفيديو</h4>
            <p className="text-xs text-zinc-400 mt-1">
              نزّل الترجمة كملف SRT أو TXT، أو تصفّح الملخص الكامل، أو اطرح أسئلتك في الشات المباشر.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );

  return (
    <ArabicToolLandingLayout
      currentPath="/ar"
      badge="الإصدار العربي الشامل"
      badgeEmoji="✨"
      badgeHighlight="ذكاء اصطناعي مجاني"
      h1Prefix="تفريغ وتلخيص"
      h1Highlight="فيديوهات يوتيوب"
      h1Suffix="بالذكاء الاصطناعي مجاناً"
      subheadline="استخرج النص الكامل لأي فيديو يوتيوب، حمّل ملفات الترجمة SRT، واحصل على ملخص ذكي وأهم النقاط باللغة العربية في ثوانٍ بدون تسجيل."
      inputPlaceholder="الصق رابط فيديو يوتيوب هنا (https://www.youtube.com/watch?v=...)"
      buttonLabel="تلخيص وتفريغ الفيديو"
      targetTab="takeaways"
      features={FEATURES}
      articleContent={articleContent}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
    />
  );
}
