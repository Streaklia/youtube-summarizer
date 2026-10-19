import { Metadata } from 'next';
import { BlogIndexClient } from '@/components/BlogIndexClient';
import { buildHrefLangAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Blog & Articles — YouTube Summarizer Guides & AI Benchmarks',
  description:
    'Explore guides on YouTube video summarization, transcript extraction tutorials, and AI LLM benchmarks for Gemini and OpenRouter.',
  alternates: buildHrefLangAlternates('/blog'),
  openGraph: {
    title: 'YouTube Summarizer Blog & Articles',
    description: 'Learn how to transform long YouTube videos into instant AI summaries and clean transcripts.',
    url: 'https://www.mytranscript.pro/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogIndexClient lang="en" />;
}
