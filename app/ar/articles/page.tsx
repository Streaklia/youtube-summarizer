import type { Metadata } from 'next';
import Link from 'next/link';
import { ARABIC_BLOG_POSTS } from '@/lib/arabicContentData';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const SITE_URL = 'https://www.mytranscript.pro';
const AR_ARTICLES_URL = `${SITE_URL}/ar/articles`;
const EN_ARTICLES_URL = `${SITE_URL}/articles`;

export const metadata: Metadata = {
  title: 'المقالات والشروحات — تفريغ وتلخيص يوتيوب بالعربية | MyTranscript',
  description:
    'أدلة عملية وشروحات تفصيلية حول تفريغ فيديوهات يوتيوب إلى نص، التلخيص بالذكاء الاصطناعي، وتحميل ملفات الترجمة SRT مجاناً.',
  alternates: {
    canonical: AR_ARTICLES_URL,
    languages: {
      ar: AR_ARTICLES_URL,
      en: EN_ARTICLES_URL,
      'x-default': EN_ARTICLES_URL,
    },
  },
  openGraph: {
    title: 'المقالات والشروحات — MyTranscript العربية',
    description:
      'شروحات عملية حول تفريغ فيديوهات يوتيوب والتلخيص بالذكاء الاصطناعي وتحميل ملفات SRT.',
    url: AR_ARTICLES_URL,
    locale: 'ar_AR',
    type: 'website',
  },
};

export default function ArabicArticlesIndexPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'المقالات والشروحات — MyTranscript العربية',
    url: AR_ARTICLES_URL,
    inLanguage: 'ar',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: ARABIC_BLOG_POSTS.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${AR_ARTICLES_URL}/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-[#040200] text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <header className="mb-12">
          <Link
            href="/ar"
            className="text-sm text-[#E02440] hover:text-rose-300 transition-colors mb-6 inline-flex items-center gap-1.5"
          >
            <span>العودة إلى الرئيسية</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-3">
            المقالات والأدلة الإرشادية
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            شروحات خطوة بخطوة لتفريغ فيديوهات يوتيوب، تحميل ملفات الترجمة SRT، واستخدام الذكاء الاصطناعي لتلخيص المحاضرات والبودكاست باللغة العربية.
          </p>
        </header>

        <div className="space-y-6">
          {ARABIC_BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-[#E02440]/50 transition-colors group"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
                <span className="font-semibold px-2.5 py-1 rounded-full bg-[#E02440]/15 text-[#E02440] border border-[#E02440]/25">
                  {post.category}
                </span>
                <span className="text-zinc-400 inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400 inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#E02440] transition-colors">
                <Link href={`/ar/articles/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>

              <Link
                href={`/ar/articles/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-[#E02440] hover:text-rose-300 font-semibold transition-colors"
              >
                <span>اقرأ المقال كاملاً</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
