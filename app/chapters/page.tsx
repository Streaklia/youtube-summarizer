import { Metadata } from 'next';
import { GscLandingToolLayout } from '@/components/GscLandingToolLayout';
import { Clock, ListOrdered, Sparkles, CheckCircle, Video, Layers, Bookmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YouTube Chapters Generator – Free AI Timestamps & Video Outlines',
  description:
    'Automatically generate YouTube chapters with timestamps in seconds. Divide any video into clear, timestamped sections for video description boxes and fast scene navigation.',
  keywords: [
    'youtube chapters generator',
    'youtube timestamp generator',
    'youtube chapter breakdown',
    'video chapters with timestamps',
    'generate youtube timestamps',
    'youtube video outline maker',
    'automatic chapter markers',
    'youtube video chapters online',
  ],
  alternates: {
    canonical: 'https://www.mytranscript.pro/chapters',
  },
  openGraph: {
    title: 'YouTube Chapters Generator – Free AI Timestamps & Video Outlines',
    description:
      'Divide any YouTube video into clear, timestamped chapters in seconds using AI. 100% free with 1-click copy.',
    url: 'https://www.mytranscript.pro/chapters',
    siteName: 'MyTranscript',
    type: 'website',
    images: [
      {
        url: 'https://www.mytranscript.pro/logo.png',
        width: 800,
        height: 600,
        alt: 'YouTube Chapters Generator - MyTranscript.pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Chapters Generator – Free AI Timestamps & Video Outlines',
    description:
      'Generate timestamped chapters for your YouTube video descriptions instantly with AI.',
    images: ['https://www.mytranscript.pro/logo.png'],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript YouTube Chapters Generator',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All Web Browsers',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1680',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'Automatic semantic scene and topic transition detection',
        'Standard YouTube timestamp format (MM:SS Title)',
        '1-click copy directly into YouTube Studio description box',
        'Interactive chapter navigation synced with video playback',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I generate chapters for a YouTube video?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Paste any YouTube URL into the input field above and click "Generate Chapters". Our AI analyzes the video dialogue and produces timestamped chapter markers (e.g., 00:00 Intro, 02:15 Main Topic) in seconds.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I copy these timestamps directly into my YouTube description?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! The generated chapters follow YouTube official formatting standards (starting at 00:00 with at least 3 chapters). You can copy the entire list with one click and paste it into YouTube Studio.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does YouTube require timestamps to start at 00:00?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, YouTube automated chapter recognition requires the first timestamp to start exactly at 00:00, have at least three timestamp entries in ascending order, and each chapter must be at least 10 seconds long. Our tool enforces these rules automatically.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <Clock className="w-5 h-5 text-red-400" />,
    title: 'Precise Timecodes',
    desc: 'Detects natural topic boundaries and scene changes to generate exact MM:SS and HH:MM:SS timestamps.',
    highlight: 'YouTube Studio Ready',
  },
  {
    icon: <ListOrdered className="w-5 h-5 text-teal-400" />,
    title: 'Descriptive Chapter Titles',
    desc: 'Creates engaging, search-optimized chapter headlines that improve video viewer retention and SEO.',
    highlight: 'High Click-Through',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    title: '1-Click Clipboard Copy',
    desc: 'Format is pre-configured for YouTube video descriptions. Simply copy and paste directly into YouTube Studio.',
    highlight: 'Instant Workflow',
  },
];

const FAQS = [
  {
    q: 'How does the YouTube Chapters Generator work?',
    a: 'Our tool reads the spoken audio transcript of the video and uses advanced natural language processing to identify major concept transitions, topic shifts, and narrative sections, pairing each with its exact timestamp.',
  },
  {
    q: 'How do chapters help my YouTube video SEO?',
    a: 'Chapters allow Google to display "Key Moments" directly in Google Search results. This gives your video prominent search real estate and allows viewers to jump right to the exact answer they searched for.',
  },
  {
    q: 'Is this chapter generator completely free?',
    a: 'Yes, MyTranscript YouTube Chapters Generator is 100% free with unlimited usage and no account registration required.',
  },
];

export default function ChaptersPage() {
  return (
    <GscLandingToolLayout
      slug="chapters"
      badge="AI Video Outline"
      badgeEmoji="⏱️"
      badgeHighlight="YouTube SEO"
      h1Prefix="YouTube"
      h1Highlight="Chapters Generator"
      h1Suffix="with AI Timestamps"
      subheadline="Automatically divide any YouTube video into organized, timestamped chapters. Boost video SEO, improve watch retention, and export ready-to-paste YouTube Studio descriptions in seconds."
      inputPlaceholder="Paste YouTube URL to generate video chapters (e.g., https://www.youtube.com/watch?v=...)"
      buttonLabel="Generate Chapters"
      targetTab="chapters"
      features={FEATURES}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
      articleContent={
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            Adding <strong>video chapters with timestamps</strong> to your YouTube videos is one of
            the most effective strategies to double viewer retention and qualify for Google
            Search&apos;s coveted <em>Key Moments</em> carousel. However, scrubbing through a 30-minute
            video to manually log timestamps takes hours.
          </p>

          <h3 className="text-xl font-bold text-white pt-2">
            Why Use an AI YouTube Chapters Generator?
          </h3>
          <p>
            MyTranscript analyzes the full dialogue cadence of any video to pinpoint exactly when
            speakers shift subjects. It groups relevant talking points into cohesive chapters and
            formats the output to comply strictly with YouTube&apos;s automated chapter algorithm:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <strong>First Chapter Starts at 00:00:</strong> Mandatory requirement for YouTube to
              render the timeline scrubber segments.
            </li>
            <li>
              <strong>Minimum 3 Chapters:</strong> Ensures rich navigation and structured topic
              hierarchy.
            </li>
            <li>
              <strong>Concise, Click-Worthy Titles:</strong> Formulated to trigger relevant query
              matches on Google Search and YouTube Search.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-white pt-2">
            How to Add Generated Chapters to Your YouTube Video
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-300">
            <li>Paste your YouTube video link in the tool above and click &quot;Generate Chapters&quot;.</li>
            <li>Review the generated chapter breakdown and click &quot;Copy&quot;.</li>
            <li>Open YouTube Studio and navigate to your video&apos;s &quot;Details&quot; tab.</li>
            <li>Paste the timestamps into the &quot;Description&quot; field and click Save.</li>
          </ol>
        </div>
      }
    />
  );
}
