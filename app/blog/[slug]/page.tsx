import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostClient } from '@/components/BlogPostClient';
import { BLOG_POSTS } from '@/lib/contentData';
import { buildHrefLangAlternates } from '@/lib/i18n';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Article Not Found — YouTube Summarizer',
    };
  }

  return {
    title: `${post.title} — YouTube Summarizer Blog`,
    description: post.excerpt,
    alternates: buildHrefLangAlternates(`/blog/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://youtube-summarizer.vercel.app/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} lang="en" />;
}
