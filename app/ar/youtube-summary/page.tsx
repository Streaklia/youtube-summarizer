import type { Metadata } from 'next';
import { ArabicToolLandingLayout } from '@/components/ArabicToolLandingLayout';
import { Sparkles, ListOrdered, Brain } from 'lucide-react';

const SITE_URL = 'https://www.mytranscript.pro';
const AR_URL = `${SITE_URL}/ar/youtube-summary`;
const EN_URL = `${SITE_URL}/youtube-summary`;

export const metadata: Metadata = {
  title: 'تلخيص فيديوهات يوتيوب الطويلة بالذكاء الاصطناعي مجاناً | MyTranscript',
  description:
    'اختصر ساعات من المشاهدة في ثوانٍ. احصل على ملخص شامل، أهم الأفكار الرئيسية، وتقسيم الفصول لأي فيديو يوتيوب باستخدام الذكاء الاصطناعي.',
  keywords: [
    'تلخيص فيديو يوتيوب',
    'تلخيص يوتيوب بالذكاء الاصطناعي',
    'ملخص فيديو طويل',
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
    title: 'تلخيص فيديوهات يوتيوب الطويلة بالذكاء الاصطناعي مجاناً | MyTranscript',
    description:
      'اختصر ساعات من المشاهدة في ثوانٍ واحصل على ملخص شامل وأهم الأفكار الرئيسية باللغة العربية.',
    url: AR_URL,
    siteName: 'MyTranscript',
    locale: 'ar_AR',
    type: 'website',
    images: [{ url: `${SITE_URL}/logo.png`, width: 800, height: 600, alt: 'تلخيص فيديوهات يوتيوب بالذكاء الاصطناعي' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تلخيص فيديوهات يوتيوب الطويلة بالذكاء الاصطناعي مجاناً | MyTranscript',
    description: 'لخّص الفيديوهات الطويلة واستخرج أهم الأفكار والفصول الزمنية بالعربية مجاناً.',
    images: [`${SITE_URL}/logo.png`],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript — ملخص فيديوهات يوتيوب بالذكاء الاصطناعي',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All Web Browsers',
      inLanguage: 'ar',
      url: AR_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2150',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'توليد ملخص شامل منسق بالعربية لفيديوهات يوتيوب الطويلة',
        'استخلاص أهم النقاط المستفادة والأفكار المحورية',
        'تقسيم الفيديو إلى فصول زمنية تلقائياً',
      ],
      description:
        'أداة ذكاء اصطناعي مجانية لتلخيص فيديوهات يوتيوب الطويلة والمحاضرات باللغة العربية في ثوانٍ.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'كم يستغرق تلخيص فيديو يوتيوب طويل بالذكاء الاصطناعي؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'تتم عملية قراءة النص وتلخيصه غالباً خلال 3 إلى 6 ثوانٍ فقط، حتى للمحاضرات وحلقات البودكاست الطويلة.',
          },
        },
        {
          '@type': 'Question',
          name: 'هل يصدر الملخص باللغة العربية حتى لو كان الفيديو إنجليزياً؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'نعم، يدعم الذكاء الاصطناعي الترجمة الفهمية وتوليد الملخص الكامل والنقاط الأساسية باللغة العربية الفصحى.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <Brain className="w-5 h-5 text-[#E02440]" />,
    title: 'فهم عميق للمحتوى الطويل',
    desc: 'نماذج Gemini عالية الاستيعاب تقرأ كامل سياق الفيديو لتقديم ملخص مترابط ومنظم بالعناوين.',
    highlight: 'ذكاء متقدم',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-rose-400" />,
    title: 'أهم الأفكار في نقاط مركّزة',
    desc: 'استخرج الزبدة والخلاصة العملية من أي محاضرة أو ندوة في قائمة نقاط واضحة وسهلة القراءة.',
    highlight: 'توفير الوقت',
  },
  {
    icon: <ListOrdered className="w-5 h-5 text-emerald-400" />,
    title: 'تقسيم الفصول والأفكار',
    desc: 'احصل على فهرس زمني للموضوعات الرئيسية داخل الفيديو مع تصدير بصيغة Markdown أو PDF.',
    highlight: 'تصدير PDF',
  },
];

const FAQS = [
  {
    q: 'ما طول الفيديوهات التي يمكن تلخيصها مجاناً؟',
    a: 'يمكنك تلخيص الفيديوهات القصيرة والطويلة بما فيها المحاضرات العلمية وحلقات البودكاست التي تتجاوز ساعتين مجاناً.',
  },
  {
    q: 'هل أحتاج إلى مفتاح API لاستخدام الملخص؟',
    a: 'لا، الخدمة متكاملة وتعمل مباشرة من المتصفح دون الحاجة لإنشاء حساب أو إضافة مفاتيح مدفوعة.',
  },
  {
    q: 'هل يمكنني توليد إنفوجرافيك أو فصول بعد الملخص؟',
    a: 'نعم، يمكنك التنقل في تبويبات صفحة التحليل لتوليد الفصول أو الإنفوجرافيك أو النقاط الرئيسية عند الطلب.',
  },
];

export default function ArabicYoutubeSummaryPage() {
  const articleContent = (
    <div className="space-y-6 text-zinc-300 leading-relaxed">
      <h2 className="text-2xl font-extrabold text-white">
        اختصر ساعات من المشاهدة إلى قراءة ذكية خلال دقيقة واحدة
      </h2>
      <p className="text-sm text-zinc-400">
        كثيراً ما نجد فيديوهات تعليمية ممتازة على يوتيوب تتجاوز مدتها الساعة، لكننا نحتاج إلى معرفة محتواها بسرعة قبل التعمق فيها. يقوم محرك MyTranscript بتحليل سياق الحديث وتوليد ملخص منسّق باللغة العربية يحتوي على المحاور الرئيسية والاستنتاجات العملية.
      </p>
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
        <h3 className="text-base font-bold text-white">ماذا يشمل التلخيص الذكي؟</h3>
        <ul className="list-disc list-inside text-xs sm:text-sm text-zinc-400 space-y-1.5">
          <li>ملخص تنفيذي منسق بالعناوين والفقرات الواضحة.</li>
          <li>أهم 5 إلى 10 نقاط عملية مستخلصة من الفيديو.</li>
          <li>إمكانية التحقق وطرح الأسئلة التكميلية في نافذة الدردشة الجانبية.</li>
        </ul>
      </div>
    </div>
  );

  return (
    <ArabicToolLandingLayout
      currentPath="/ar/youtube-summary"
      badge="تلخيص الذكاء الاصطناعي"
      badgeEmoji="🤖"
      badgeHighlight="ملخص عربي ذكي"
      h1Prefix="أداة"
      h1Highlight="تلخيص فيديوهات يوتيوب"
      h1Suffix="الطويلة بالذكاء الاصطناعي مجاناً"
      subheadline="اختصر ساعات من المشاهدة في ثوانٍ. احصل على ملخص شامل، أهم الأفكار الرئيسية، وتقسيم الفصول لأي فيديو يوتيوب باستخدام الذكاء الاصطناعي."
      inputPlaceholder="الصق رابط فيديو يوتيوب لتلخيصه بالذكاء الاصطناعي..."
      buttonLabel="لخّص الفيديو الآن"
      targetTab="summary"
      features={FEATURES}
      articleContent={articleContent}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
    />
  );
}
