import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostClient } from '@/components/BlogPostClient';
import { BLOG_POSTS } from '@/lib/contentData';
import { ALL_SUPPORTED_LANGUAGES, SUPPORTED_LANGUAGES, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';

interface PageProps {
  params: {
    lang: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const languages = ALL_SUPPORTED_LANGUAGES;

  const params: { lang: string; slug: string }[] = [];
  for (const lang of languages) {
    for (const post of BLOG_POSTS) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = params;
  if (!isSupportedLanguage(lang)) {
    return { title: 'Article Not Found' };
  }

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Article Not Found' };
  }

  const langName = SUPPORTED_LANGUAGES[lang]?.name || lang;

  return {
    title: `${post.title} — MyTranscript (${langName})`,
    description: post.excerpt,
    alternates: buildHrefLangAlternates(`/blog/${post.slug}`, lang),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://www.mytranscript.pro/${lang}/blog/${post.slug}`,
    },
  };
}

export default function LocalizedBlogPostPage({ params }: PageProps) {
  const { lang, slug } = params;
  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} lang={lang} />;
}
