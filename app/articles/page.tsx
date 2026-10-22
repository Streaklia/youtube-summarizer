import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/contentData';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Articles & Guides — YouTube Transcript & AI Summarizer | MyTranscript',
  description:
    'Explore tutorials, AI benchmarks, and productivity guides on YouTube video summarization, transcript extraction, and AI-powered analysis.',
  alternates: {
    canonical: 'https://www.mytranscript.pro/articles/',
  },
  openGraph: {
    title: 'Articles & Guides — MyTranscript',
    description:
      'Tutorials and AI benchmarks on YouTube summarization and transcript extraction.',
    url: 'https://www.mytranscript.pro/articles/',
    type: 'website',
  },
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <header className="mb-12">
          <Link href="/" className="text-sm text-red-400 hover:text-red-300 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
            Articles &amp; Guides
          </h1>
          <p className="text-gray-400 text-lg">
            Tutorials, AI benchmarks, and productivity guides for YouTube content analysis.
          </p>
        </header>

        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
                <span className="text-xs text-gray-500">·</span>
                <span className="text-xs text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                <Link href={`/articles/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <Link
                href={`/articles/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
