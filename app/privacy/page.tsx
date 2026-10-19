import { Metadata } from 'next';
import { PrivacyClient } from '@/components/PrivacyClient';
import { buildHrefLangAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Privacy Policy — YouTube Summarizer',
  description:
    'Our privacy commitments: zero personal data logging, local browser storage for API keys, and privacy-by-default video processing.',
  alternates: buildHrefLangAlternates('/privacy'),
  openGraph: {
    title: 'Privacy Policy — YouTube Summarizer',
    description: 'Learn how YouTube Summarizer protects your personal privacy and client-side data.',
    url: 'https://www.mytranscript.pro/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return <PrivacyClient lang="en" />;
}
