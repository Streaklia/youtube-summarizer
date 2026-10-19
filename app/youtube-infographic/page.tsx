import { Metadata } from 'next';
import { SeoPageLayout } from '@/components/SeoPageLayout';

export const metadata: Metadata = {
  title: 'YouTube Infographic & Comic Generator — Visual AI Video Prompts',
  description:
    'Turn any YouTube video into stunning infographics or 4-panel comic strips. Generate ready-to-paste prompts for ChatGPT, Midjourney, DALL·E, and Duck.ai.',
  keywords: [
    'youtube infographic generator',
    'youtube to infographic',
    'youtube to comic strip',
    'visual video summary',
    'ai infographic prompt',
    'video storyboard generator',
  ],
  alternates: {
    canonical: 'https://youtube-summarizer.vercel.app/youtube-infographic',
  },
  openGraph: {
    title: 'YouTube Infographic & Comic Generator — Create Visual Video Breakdowns',
    description:
      'Extract stats, quotes, and storylines to generate ready-to-paste prompts for AI image models and infographics.',
    url: 'https://youtube-summarizer.vercel.app/youtube-infographic',
    siteName: 'YouTube Summarizer',
  },
};

export default function YouTubeInfographicPage() {
  return (
    <SeoPageLayout
      badge="Visual Storytelling"
      badgeEmoji="🎨"
      headlinePrefix="Convert Any Video into"
      headlineGradient="Infographics & Comics"
      headlineSuffix="with AI"
      description="Extract key metrics, memorable quotes, and step-by-step storylines. Generate ready-to-paste prompts optimized for ChatGPT (DALL·E), Midjourney, and Duck.ai."
      inputPlaceholder="Paste YouTube URL to generate visual prompts..."
      buttonLabel="Create Visuals"
      features={[
        {
          icon: '📊',
          title: 'Structured Infographic Data',
          description: 'Key statistics, main numbered points, and bold callout quotes ready for visual layouts.',
        },
        {
          icon: '🎨',
          title: '4-Panel Comic Strip Prompts',
          description: 'Transform talk shows or tutorials into engaging storyboards with characters, scenes, and witty punchlines.',
        },
        {
          icon: '🦆',
          title: 'Duck.ai 1-Click Launch',
          description: 'Copy formatted prompts and immediately launch Duck.ai or ChatGPT in a fresh tab.',
        },
      ]}
      faqs={[
        {
          question: 'What image generators work with these prompts?',
          answer: 'The prompts are designed for ChatGPT (GPT-4o DALL·E 3), Midjourney v6, Stable Diffusion, and Duck.ai free models.',
        },
        {
          question: 'Can I choose between comic strips and standard infographics?',
          answer: 'Yes! Inside the Prompt tab, you can toggle between Infographic and Comic Strip styles with a single click.',
        },
      ]}
    />
  );
}
