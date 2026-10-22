import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/contentData';
import { Footer } from '@/components/Footer';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | MyTranscript`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.mytranscript.pro/articles/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.mytranscript.pro/articles/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function ArticleDetailPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  // Related articles (exclude current)
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Back nav */}
        <Link
          href="/articles/"
          className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors mb-8"
        >
          ← All Articles
        </Link>

        {/* Article header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              {post.category}
            </span>
            <span className="text-xs text-gray-500">{post.date}</span>
            <span className="text-xs text-gray-500">·</span>
            <span className="text-xs text-gray-500">{post.readTime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            {post.title}
          </h1>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">{post.excerpt}</p>
        </header>

        {/* Article body */}
        <article className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-red-400 hover:prose-a:text-red-300">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>

        {/* CTA */}
        <div className="mt-12 p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Try It Free — No Sign-Up</h3>
          <p className="text-gray-400 text-sm mb-4">
            Paste any YouTube URL and get instant transcripts and AI summaries.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Open YouTube Summarizer →
          </Link>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">
              Related Articles
            </h2>
            <div className="space-y-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articles/${rel.slug}`}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {rel.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{rel.readTime}</p>
                  </div>
                  <span className="text-gray-600 group-hover:text-red-400 transition-colors mt-0.5">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
