import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'YouTube Summarizer — AI-Powered Video Summary & Analysis',
  description:
    'Get instant AI-generated summaries, key takeaways, chapter breakdowns, and infographic prompts from any YouTube video. Chat with video content using Gemini AI or OpenRouter.',
  keywords: [
    'youtube summarizer',
    'ai video summary',
    'youtube transcript',
    'video analysis',
    'gemini ai',
    'youtube key takeaways',
    'video chapter summary',
    'youtube to text',
    'ai video notes',
    'youtube infographic',
  ],
  authors: [{ name: 'YouTube Summarizer' }],
  creator: 'YouTube Summarizer',
  publisher: 'YouTube Summarizer',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'YouTube Summarizer — AI-Powered Video Summary & Analysis',
    description:
      'Paste any YouTube URL and get instant AI summaries, key takeaways, timestamped chapters, and infographic prompts. Powered by Gemini AI.',
    siteName: 'YouTube Summarizer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Summarizer — AI Video Analysis',
    description:
      'Instant AI summaries, key takeaways & chapter breakdowns from any YouTube video.',
  },
  metadataBase: new URL('https://youtube-summarizer.vercel.app'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'YouTube Summarizer',
              description:
                'AI-powered YouTube video summarizer with key takeaways, chapter breakdowns, and chat.',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
