import { Metadata } from 'next';
import { GscLandingToolLayout } from '@/components/GscLandingToolLayout';
import { Sparkles, Palette, MessageSquareCode, Image as ImageIcon, Zap, FileCode2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YouTube AI Prompt Generator – Free Midjourney, DALL-E & Comic Scripts',
  description:
    'Extract high-context visual image prompts and 4-panel comic strip scripts from any YouTube video dialogue. Engineered for Midjourney v6, FLUX, Stable Diffusion & DALL-E 3.',
  keywords: [
    'youtube ai prompt generator',
    'video to midjourney prompt',
    'youtube prompt maker',
    'video comic script generator',
    'ai image prompt from video dialogue',
    'dall-e prompt from youtube',
    'flux prompt generator video',
    'video storyboard prompt generator',
  ],
  alternates: {
    canonical: 'https://www.mytranscript.pro/prompt',
  },
  openGraph: {
    title: 'YouTube AI Prompt Generator – Free Midjourney, DALL-E & Comic Scripts',
    description:
      'Turn YouTube video dialogue into ready-to-run image generation prompts and visual comic storyboards with AI.',
    url: 'https://www.mytranscript.pro/prompt',
    siteName: 'MyTranscript',
    type: 'website',
    images: [
      {
        url: 'https://www.mytranscript.pro/logo.png',
        width: 800,
        height: 600,
        alt: 'YouTube AI Prompt Generator - MyTranscript.pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube AI Prompt Generator – Free Midjourney, DALL-E & Comic Scripts',
    description:
      'Generate high-fidelity AI visual prompts and comic scripts directly from video dialogue.',
    images: ['https://www.mytranscript.pro/logo.png'],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript YouTube AI Prompt Generator',
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
        ratingCount: '1380',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'Midjourney and FLUX photo-style and infographic prompts',
        '4-panel comic strip storyboard generator with dialogue captions',
        'Direct token optimization for popular image generation models',
        '1-click prompt copying and prompt regeneration seed generator',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What does the YouTube AI Prompt Generator do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It analyzes video dialogue and automatically authors comprehensive, production-ready prompts for Midjourney, FLUX, Stable Diffusion, and DALL-E 3, as well as 4-panel comic strip scripts illustrating the video\'s narrative arc.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which AI image generators are supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The generated prompts follow industry standards for Midjourney (v5 & v6), FLUX.1, DALL-E 3, Leonardo AI, and Stable Diffusion XL, including aspect ratios and lighting terminology.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I regenerate or customize the prompt format?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Inside the prompt tab, you can switch seamlessly between "Infographic Design Prompt" and "4-Panel Comic Strip Script" formats, and regenerate new variations on demand.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <Palette className="w-5 h-5 text-red-400" />,
    title: 'Midjourney & FLUX Ready',
    desc: 'Structured with cinematography terms, color palettes, lighting cues, and clean composition directives.',
    highlight: 'Photorealistic & Vector',
  },
  {
    icon: <MessageSquareCode className="w-5 h-5 text-teal-400" />,
    title: '4-Panel Comic Storyboard',
    desc: 'Translates speech into a 4-panel visual comic script complete with character scene descriptions and punchy dialogue.',
    highlight: 'Narrative Storytelling',
  },
  {
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    title: '1-Click Prompt Copying',
    desc: 'Instantly copy formatted prompt text to your clipboard and paste into Discord or your image generator tool.',
    highlight: 'Fast Production',
  },
];

const FAQS = [
  {
    q: 'How does the AI create image prompts from video?',
    a: 'Our AI processes transcript timestamps to isolate key emotional climaxes, analogies, and main takeaways, transforming abstract verbal explanations into concrete visual scenes.',
  },
  {
    q: 'Is this tool free?',
    a: 'Yes, MyTranscript YouTube AI Prompt Generator is completely free to use with no account required.',
  },
  {
    q: 'Can I generate social media carousels from these prompts?',
    a: 'Yes! The 4-panel comic storyboard format is specifically optimized for LinkedIn, Instagram, and Twitter/X carousel graphics.',
  },
];

export default function PromptPage() {
  return (
    <GscLandingToolLayout
      slug="prompt"
      badge="Visual Storytelling AI"
      badgeEmoji="✨"
      badgeHighlight="Midjourney / FLUX"
      h1Prefix="YouTube"
      h1Highlight="AI Prompt Generator"
      h1Suffix="for Images & Storyboards"
      subheadline="Turn video transcripts into rich visual image generation prompts and 4-panel comic strip scripts. Engineered for Midjourney v6, FLUX, Stable Diffusion, and DALL-E 3."
      inputPlaceholder="Paste YouTube link to generate AI prompts (e.g., https://www.youtube.com/watch?v=...)"
      buttonLabel="Generate AI Prompts"
      targetTab="prompt"
      features={FEATURES}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
      articleContent={
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            Repurposing long-form video content into visual social media assets is essential for modern
            creators. The <strong>MyTranscript AI Prompt Generator</strong> extracts the core ideas
            and narrative beats from any YouTube video and formulates detailed prompts tailored for
            modern text-to-image models.
          </p>

          <h3 className="text-xl font-bold text-white pt-2">Two Specialized Formats:</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <h4 className="font-semibold text-white text-sm mb-1">
                🎨 1. Professional Infographic Poster Prompt
              </h4>
              <p className="text-xs text-gray-400">
                Crafts a 9:16 vertical design prompt specifying color grading, section dividers,
                minimalist icons, and typography hierarchy for visual explainers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <h4 className="font-semibold text-white text-sm mb-1">
                💬 2. 4-Panel Comic Strip Storyboard
              </h4>
              <p className="text-xs text-gray-400">
                Breaks the video into: <em>Panel 1 (The Hook)</em>, <em>Panel 2 (The Conflict)</em>,{' '}
                <em>Panel 3 (The Discovery)</em>, and <em>Panel 4 (The Punchline / Resolution)</em>{' '}
                with exact speech bubble dialogue and scene descriptions.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}
