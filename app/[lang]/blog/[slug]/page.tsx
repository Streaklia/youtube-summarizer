import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostClient } from '@/components/BlogPostClient';
import { BLOG_POSTS } from '@/lib/contentData';
import { SUPPORTED_LANGUAGES, SupportedLanguage, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';

interface PageProps {
  params: {
    lang: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const nonDefaultLangs = (Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).filter(
    (l) => l !== 'en'
  );

  const params: { lang: string; slug: string }[] = [];
  for (const lang of nonDefaultLangs) {
    for (const post of BLOG_POSTS) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = params;
  if (!isSupportedLanguage(lang) || lang === 'en') {
    return { title: 'Article Not Found' };
  }

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${post.title} — YouTube Summarizer (${SUPPORTED_LANGUAGES[lang].name})`,
    description: post.excerpt,
    alternates: buildHrefLangAlternates(`/blog/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://youtube-summarizer.vercel.app/${lang}/blog/${post.slug}`,
    },
  };
}

export default function LocalizedBlogPostPage({ params }: PageProps) {
  const { lang, slug } = params;
  if (!isSupportedLanguage(lang) || lang === 'en') {
    notFound();
  }

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} lang={lang} />;
}
