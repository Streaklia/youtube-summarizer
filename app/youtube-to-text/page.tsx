import { Metadata } from 'next';
import { SeoPageLayout } from '@/components/SeoPageLayout';
import { buildHrefLangAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'YouTube to Text Converter — Transcribe Video to Clean Text & Markdown',
  description:
    'Convert YouTube video speech to clean, formatted text online for free. Transcribe lectures, interviews, and tutorials into readable Markdown, Word, or PDF.',
  keywords: [
    'youtube to text',
    'convert youtube to text',
    'youtube speech to text',
    'transcribe youtube video',
    'youtube video to text converter online free',
    'download youtube video text',
  ],
  alternates: buildHrefLangAlternates('/youtube-to-text'),
  openGraph: {
    title: 'YouTube to Text Converter — Fast, Accurate, and 100% Free',
    description:
      'Transcribe any YouTube video into readable, editable text format in seconds. No registration required.',
    url: 'https://youtube-summarizer.vercel.app/youtube-to-text',
    siteName: 'YouTube Summarizer',
  },
};

export default function YouTubeToTextPage() {
  return (
    <SeoPageLayout
      badge="Speech to Text"
      badgeEmoji="✍️"
      headlinePrefix="Convert Any"
      headlineGradient="YouTube Video to Text"
      headlineSuffix="Instantly"
      description="Turn spoken audio and interviews into clean, formatted text. Download as Markdown (.md) or printable PDF for studying, content repurposing, and note-taking."
      inputPlaceholder="Paste YouTube URL to convert to text..."
      buttonLabel="Convert to Text"
      features={[
        {
          icon: '✍️',
          title: 'Clean Text Formatting',
          description: 'Removes redundant timestamp clutter when needed and formats spoken language into readable paragraphs.',
        },
        {
          icon: '📚',
          title: 'Ideal for Research & Study',
          description: 'Search, highlight, and take study notes on lectures and documentaries without having to replay videos.',
        },
        {
          icon: '💾',
          title: 'Export to Multiple Formats',
          description: 'One-click download as Markdown (.md) or print directly to PDF for offline reading.',
        },
      ]}
      faqs={[
        {
          question: 'Can I convert long 2-hour or 3-hour videos to text?',
          answer: 'Yes! Our system samples and extracts full long-form videos, podcasts, and university lectures without crashing.',
        },
        {
          question: 'Do I need to install any software or Chrome extension?',
          answer: 'No installation required. Everything operates entirely in your browser with zero bloat.',
        },
      ]}
    />
  );
}
