import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = 'https://www.mytranscript.pro';

export const metadata: Metadata = {
  title: 'MyTranscript – Free YouTube Transcript Generator & AI Summarizer',
  description:
    'Extract full YouTube transcripts with accurate timestamps, generate fast AI summaries, and convert video dialogue to text instantly with no sign-up.',
  keywords: [
    'youtube transcript',
    'youtube transcript generator',
    'youtube summarizer',
    'ai video summary',
    'youtube to text',
    'podcast transcript generator',
    'download youtube transcript',
    'chat with youtube video',
    'gemini ai youtube',
  ],
  authors: [{ name: 'MyTranscript' }],
  creator: 'MyTranscript',
  publisher: 'MyTranscript',
  icons: {
    icon: [
      { url: '/icon.png', sizes: 'any' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/icon.png'],
  },
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
    title: 'MyTranscript – Free YouTube Transcript Generator & AI Summarizer',
    description:
      'Extract full YouTube transcripts, generate AI summaries, and convert video dialogue to clean text instantly.',
    siteName: 'MyTranscript',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 800,
        height: 600,
        alt: 'mytranscript.pro logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyTranscript – YouTube Transcript Generator & AI Summarizer',
    description:
      'Extract full YouTube transcripts, generate AI summaries, and convert video dialogue to clean text instantly.',
    images: [`${SITE_URL}/logo.png`],
  },
  metadataBase: new URL(SITE_URL),
  verification: {
    google: '2DWnYjHyIzauCAhOmv7_BqjX9L8iECzcOdyU1oAOC2c',
  },
  alternates: {
    canonical: `${SITE_URL}/`,
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z79HZ87TPV" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z79HZ87TPV');
            `,
          }}
        />
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-site-verification" content="2DWnYjHyIzauCAhOmv7_BqjX9L8iECzcOdyU1oAOC2c" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        {/* Organization Schema for Google Search Knowledge Panels */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MyTranscript',
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              image: `${SITE_URL}/logo.png`,
              sameAs: [
                'https://www.mytranscript.pro',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'support@mytranscript.pro',
                url: `${SITE_URL}/contact-us`,
              },
            }),
          }}
        />

        {/* WebSite Schema with Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'MyTranscript',
              alternateName: 'MyTranscript.pro',
              url: SITE_URL,
              publisher: {
                '@type': 'Organization',
                name: 'MyTranscript',
                logo: {
                  '@type': 'ImageObject',
                  url: `${SITE_URL}/logo.png`,
                },
              },
            }),
          }}
        />

        {/* SoftwareApplication Schema with AggregateRating & Free Offer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'MyTranscript',
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'All',
              url: SITE_URL,
              image: `${SITE_URL}/logo.png`,
              description:
                'AI-powered YouTube video transcript generator, summarizer, and video Q&A. Extract timestamped text, chapters, and infographics from any video.',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '1900',
                bestRating: '5',
                worstRating: '1',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              author: {
                '@type': 'Organization',
                name: 'MyTranscript',
                logo: `${SITE_URL}/logo.png`,
              },
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}
