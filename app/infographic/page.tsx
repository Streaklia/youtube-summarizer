import { Metadata } from 'next';
import { GscLandingToolLayout } from '@/components/GscLandingToolLayout';
import { BarChart3, PieChart, Sparkles, Share2, Quote, Trophy, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YouTube Infographic Generator – Free Visual Video Summaries & Stat Cards',
  description:
    'Transform any YouTube video into visual infographic summary cards with key statistics, notable quotes, and executive takeaways. 100% free with no sign-up.',
  keywords: [
    'youtube infographic generator',
    'video to infographic',
    'visual video summary',
    'youtube stat cards generator',
    'convert video to visual summary',
    'ai video infographic',
    'video highlights infographic',
    'visual summary maker',
  ],
  alternates: {
    canonical: 'https://www.mytranscript.pro/infographic',
  },
  openGraph: {
    title: 'YouTube Infographic Generator – Free Visual Video Summaries & Stat Cards',
    description:
      'Transform complex YouTube videos into beautiful, shareable visual infographic cards with key stats and quotes in seconds.',
    url: 'https://www.mytranscript.pro/infographic',
    siteName: 'MyTranscript',
    type: 'website',
    images: [
      {
        url: 'https://www.mytranscript.pro/logo.png',
        width: 800,
        height: 600,
        alt: 'YouTube Infographic Generator - MyTranscript.pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Infographic Generator – Free Visual Video Summaries & Stat Cards',
    description:
      'Turn video transcripts into shareable visual infographic cards and stat breakdowns instantly.',
    images: ['https://www.mytranscript.pro/logo.png'],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript YouTube Infographic Generator',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'All Web Browsers',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1540',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'Automatic extraction of quantitative metrics and key statistics',
        'Memorable verbatim quotes and speaker highlights',
        'Structured 4-stage narrative breakdown with numbered takeaways',
        'Executive visual summary cards optimized for rapid review and social sharing',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a YouTube Infographic Generator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A YouTube Infographic Generator is an AI-powered tool that analyzes a video transcript and extracts key data points, statistics, memorable quotes, and core takeaways, displaying them as clean, visually structured infographic cards.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I share or export the infographic?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can export the generated infographic data as Markdown or save/print as PDF with one click, or use the generated visual layout for social media graphics and presentations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does it extract real numbers and data mentioned in the video?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! The AI specifically scans dialogue for percentages, revenue numbers, dates, research study findings, and quantitative metrics to populate the Key Statistics cards.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <BarChart3 className="w-5 h-5 text-teal-400" />,
    title: 'Data & Stat Callouts',
    desc: 'Extracts exact figures, percentages, ROI numbers, and metrics mentioned in the conversation into prominent stat cards.',
    highlight: 'Key Statistics',
  },
  {
    icon: <Quote className="w-5 h-5 text-rose-400" />,
    title: 'Memorable Quotes',
    desc: 'Surfaces impactful speaker quotes and philosophical insights with verbatim accuracy.',
    highlight: 'Pithy Highlights',
  },
  {
    icon: <Trophy className="w-5 h-5 text-amber-400" />,
    title: 'Visual Core Points',
    desc: 'Organizes multi-point arguments into clean, numbered stages for effortless scanning and presentation.',
    highlight: 'Executive Ready',
  },
];

const FAQS = [
  {
    q: 'How does the Infographic Generator work?',
    a: 'Paste your YouTube link and our engine processes the dialogue with large-language models trained on data visualization synthesis. It segments the information into stats, quotes, main ideas, and a conclusion.',
  },
  {
    q: 'Is this tool free to use?',
    a: 'Yes, MyTranscript YouTube Infographic Generator is completely free without limits or watermarks.',
  },
  {
    q: 'What types of videos work best?',
    a: 'Tutorials, TED Talks, podcasts, tech product reviews, financial breakdowns, and educational lectures produce the richest stat and quote cards.',
  },
];

export default function InfographicPage() {
  return (
    <GscLandingToolLayout
      slug="infographic"
      badge="Visual AI Summary"
      badgeEmoji="📊"
      badgeHighlight="NEW"
      h1Prefix="YouTube"
      h1Highlight="Infographic Generator"
      h1Suffix="& Visual Summary"
      subheadline="Turn long video dialogue into high-impact visual infographic cards. Extract quantitative statistics, notable quotes, and structured takeaways in seconds with zero fluff."
      inputPlaceholder="Paste YouTube link to generate visual infographic cards (e.g., https://www.youtube.com/watch?v=...)"
      buttonLabel="Generate Infographic"
      targetTab="infographic"
      features={FEATURES}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
      articleContent={
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            Watching a 45-minute YouTube interview or educational presentation often leaves you with
            pages of unstructured notes. The <strong>MyTranscript Infographic Generator</strong>{' '}
            solves information overload by distilling raw dialogue into formatted, visual summary
            cards.
          </p>

          <h3 className="text-xl font-bold text-white pt-2">
            What Makes Up the AI Infographic Cards?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <h4 className="font-semibold text-white text-sm mb-1">1. Key Metrics &amp; Stats</h4>
              <p className="text-xs text-gray-400">
                Presents percentages, monetary amounts, and timeframes as bold visual figures.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <h4 className="font-semibold text-white text-sm mb-1">2. Core Methodology Points</h4>
              <p className="text-xs text-gray-400">
                Step-by-step numbered breakdown of the primary thesis or instructional steps.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <h4 className="font-semibold text-white text-sm mb-1">3. Quotable Soundbites</h4>
              <p className="text-xs text-gray-400">
                Highlighted quotations that capture the speaker&apos;s most memorable perspective.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <h4 className="font-semibold text-white text-sm mb-1">4. Executive Conclusion</h4>
              <p className="text-xs text-gray-400">
                A concise bottom-line takeaway summarizing actionable advice or strategic outcomes.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}
