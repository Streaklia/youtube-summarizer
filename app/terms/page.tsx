import { Metadata } from 'next';
import { TermsClient } from '@/components/TermsClient';
import { buildHrefLangAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Terms of Service — YouTube Summarizer',
  description:
    'Terms of service, fair use guidelines, and conditions for utilizing our free AI YouTube video summarizer.',
  alternates: buildHrefLangAlternates('/terms'),
  openGraph: {
    title: 'Terms of Service — YouTube Summarizer',
    description: 'Read the terms and conditions for using YouTube Summarizer.',
    url: 'https://youtube-summarizer.vercel.app/terms',
    type: 'website',
  },
};

export default function TermsPage() {
  return <TermsClient lang="en" />;
}
