import { Metadata } from 'next';
import { FaqClient } from '@/components/FaqClient';
import { buildHrefLangAlternates } from '@/lib/i18n';
import { FAQ_ITEMS } from '@/lib/contentData';

export const metadata: Metadata = {
  title: 'FAQ & Help Center — YouTube Summarizer Questions & Answers',
  description:
    'Got questions about our YouTube video summarizer? Learn about transcript extraction speed, AI models, rate limits, and language support.',
  alternates: buildHrefLangAlternates('/faq'),
  openGraph: {
    title: 'YouTube Summarizer FAQ & Help',
    description: 'Find answers to common questions about using our AI video summarizer.',
    url: 'https://www.mytranscript.pro/faq',
    type: 'website',
  },
};

export default function FaqPage() {
  // Inject FAQPage Schema.org structured data for Google Rich Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient lang="en" />
    </>
  );
}
