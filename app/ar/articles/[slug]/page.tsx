import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ARABIC_BLOG_POSTS } from '@/lib/arabicContentData';
import { Sparkles, ArrowLeft, Clock, Calendar, CheckCircle2, Youtube } from 'lucide-react';

interface Props {
  params: { slug: string };
}

const SITE_URL = 'https://www.mytranscript.pro';

export async function generateStaticParams() {
  return ARABIC_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = ARABIC_BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  const canonicalUrl = `${SITE_URL}/ar/articles/${post.slug}`;

  return {
    title: `${post.title} | MyTranscript`,
    description: post.excerpt,
    keywords: post.targetKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      locale: 'ar_AR',
      type: 'article',
      publishedTime: post.isoDate,
      authors: ['فريق تحرير MyTranscript'],
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

export default function ArabicArticleDetailPage({ params }: Props) {
  const post = ARABIC_BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const canonicalUrl = `${SITE_URL}/ar/articles/${post.slug}`;
  const related = ARABIC_BLOG_POSTS.filter((p) => p.slug !== post.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    inLanguage: 'ar',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    author: {
      '@type': 'Organization',
      name: 'فريق تحرير MyTranscript',
      url: `${SITE_URL}/ar`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyTranscript',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: `${SITE_URL}/logo.png`,
    keywords: post.targetKeywords.join('، '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: `${SITE_URL}/ar`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'المقالات',
        item: `${SITE_URL}/ar/articles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-[#040200] text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/ar" className="hover:text-zinc-300 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/ar/articles" className="hover:text-zinc-300 transition-colors">
            المقالات
          </Link>
          <span>/</span>
          <span className="text-zinc-400 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E02440]/15 text-[#E02440] border border-[#E02440]/25">
              {post.category}
            </span>
            <span className="text-xs text-zinc-400 inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="text-xs text-zinc-600">·</span>
            <span className="text-xs text-zinc-400 inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Mid-header Interactive Tool Callout */}
        <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-[#040200] border border-[#E02440]/30 shadow-xl">
          <div className="flex items-start gap-3.5 mb-3">
            <div className="p-2 rounded-xl bg-[#E02440]/10 border border-[#E02440]/25 text-[#E02440] flex-shrink-0">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                جرّب الأداة المجانية على فيديوهاتك الآن
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">{post.cta.description}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-2.5">
            <Link
              href={post.cta.primaryHref}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E02440] hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-[#E02440]/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{post.cta.primaryLabel}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>

            {post.cta.secondaryHref && (
              <Link
                href={post.cta.secondaryHref}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs sm:text-sm font-medium rounded-xl transition-all border border-zinc-700/60"
              >
                <span>{post.cta.secondaryLabel || 'أداة مساعدة'}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Article Body */}
        <article className="prose prose-invert prose-base max-w-none text-zinc-300 leading-relaxed prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:my-4 prose-strong:text-white prose-a:text-[#E02440] hover:prose-a:text-rose-300">
          {post.content.map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i}>{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i}>{paragraph.replace('### ', '')}</h3>;
            }
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(
                      /\[([^\]]+)\]\(([^)]+)\)/g,
                      '<a href="$2" class="text-[#E02440] hover:underline font-medium">$1</a>'
                    )
                    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                    .replace(/`([^`]+)`/g, '<code dir="ltr" class="px-1.5 py-0.5 rounded bg-zinc-900 text-rose-300 text-xs">$1</code>'),
                }}
              />
            );
          })}
        </article>

        {/* Bottom CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 text-center shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E02440]/15 text-[#E02440] text-xs font-semibold mb-3 border border-[#E02440]/25">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>مجاني 100% · بدون تسجيل</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            استخرج ولخّص أي فيديو يوتيوب باللغة العربية الآن
          </h3>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-5 leading-relaxed">
            احصل على النص الكامل مع التوقيت الزمني، وملفات SRT، وأهم النقاط المستفادة بالذكاء الاصطناعي في ثوانٍ.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={post.cta.primaryHref}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E02440] hover:bg-rose-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-[#E02440]/30"
            >
              <span>{post.cta.primaryLabel}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            {post.cta.secondaryHref && (
              <Link
                href={post.cta.secondaryHref}
                className="inline-flex items-center gap-1.5 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-xl transition-all border border-zinc-700"
              >
                <span>{post.cta.secondaryLabel}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Related Arabic Articles */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-zinc-800/80">
            <h2 className="text-sm font-bold text-zinc-400 mb-6">مقالات وشروحات ذات صلة</h2>
            <div className="space-y-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/ar/articles/${rel.slug}`}
                  className="flex items-start justify-between gap-4 p-4 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900 hover:border-[#E02440]/40 transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-[#E02440]">{rel.category}</span>
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-rose-300 transition-colors mt-0.5 line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{rel.excerpt}</p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-[#E02440] transition-all mt-1 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
