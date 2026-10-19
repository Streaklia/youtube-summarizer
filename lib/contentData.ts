export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  category: string;
  content: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Features' | 'Accuracy & AI' | 'Troubleshooting';
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-summarize-youtube-videos-with-ai',
    title: 'How to Summarize Any YouTube Video with AI (Step-by-Step Guide)',
    excerpt: 'Learn how to transform 2-hour podcasts, tutorials, and lectures into structured 3-minute key takeaways using modern AI.',
    readTime: '4 min read',
    date: 'Oct 18, 2026',
    category: 'Guides',
    content: [
      'Video content is exploding on YouTube, with over 500 hours of video uploaded every minute. While video is engaging, consuming lengthy 1-2 hour interviews, academic lectures, and tech tutorials can be an immense drain on your productive time.',
      'That is where our free AI YouTube Summarizer steps in. By extracting timestamped subtitles directly from YouTube videos and feeding them into high-speed neural models like Gemini and Llama, you can instantly read bulleted key takeaways, navigate chapter breakdowns, and even chat with video content interactively.',
      'To get started, simply copy any YouTube video URL, paste it into the homepage input bar, and click Summarize. You will receive an instant 1-second raw transcript preview followed by an in-depth summary breakdown.',
      'Whether you are studying for college exams, reviewing financial earnings calls, or staying up to date with tech trends, AI video summarization saves hours every week.',
    ],
  },
  {
    slug: 'youtube-transcript-to-text-best-practices',
    title: 'YouTube Transcript to Text: How to Extract & Clean Captions Effortlessly',
    excerpt: 'Discover why clean timestamped transcripts matter for content repurposing, quote extraction, and research note-taking.',
    readTime: '3 min read',
    date: 'Oct 15, 2026',
    category: 'Productivity',
    content: [
      'Transcripts are the foundation of modern audio-visual knowledge management. When you extract a clean text version of a YouTube video, you unlock full-text searchability, copy-paste quote capability, and instant translation.',
      'Our tool automatically parses YouTube closed captions (both manual CC and auto-generated transcripts) and organizes them into clean, chronological timestamps.',
      'You can easily export or copy the transcript with one click, or switch to the Key Takeaways and Infographic tabs to visualize the core concepts without reading pages of dialogue.',
      'Try pasting your favorite YouTube educational video into the tool to test it right now.',
    ],
  },
  {
    slug: 'gemini-vs-openrouter-for-video-analysis',
    title: 'Google Gemini vs OpenRouter Free Models: Which AI Summarizes Better?',
    excerpt: 'A comprehensive benchmark of speed, rate limits, and contextual accuracy when analyzing long-form video transcripts.',
    readTime: '5 min read',
    date: 'Oct 12, 2026',
    category: 'AI Research',
    content: [
      'Choosing the right LLM provider makes all the difference when processing long transcripts. Gemini 1.5 and 2.5 Flash offer massive token context windows (up to 1M+ tokens), making them ideal for full-length 3-hour conference keynotes and podcasts.',
      'OpenRouter, on the other hand, gives you access to a rich ecosystem of open-weights models such as Meta Llama 3, Mistral, and Google Gemma at zero cost with transparent rate-limit handling.',
      'Our multi-provider fallback engine seamlessly bridges both worlds: if Gemini encounters a temporary quota delay, our backend immediately switches to an OpenRouter free endpoint so your workflow is never interrupted.',
      'Check out the Settings gear in the top navigation to test response latencies and select your preferred model.',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does the YouTube Summarizer work?',
    answer:
      'Our application extracts public captions directly from YouTube and processes them using advanced AI models (such as Google Gemini and Llama via OpenRouter). It extracts core insights, creates timestamped chapters, renders visual infographic outlines, and lets you chat directly with the video content.',
    category: 'General',
  },
  {
    id: 'faq-2',
    question: 'Is this YouTube Summarizer completely free to use?',
    answer:
      'Yes! The core tool is 100% free with no signup or credit card required. You can paste any valid YouTube video link and generate instant summaries, transcripts, and key takeaways.',
    category: 'General',
  },
  {
    id: 'faq-3',
    question: 'What types of YouTube videos can be summarized?',
    answer:
      'Any public or unlisted YouTube video that has subtitles/captions enabled (either creator-provided or YouTube automatic captions) can be summarized. This includes tutorials, podcasts, webinars, product reviews, news broadcasts, and university lectures.',
    category: 'Features',
  },
  {
    id: 'faq-4',
    question: 'Can I summarize long videos like 2-hour or 3-hour podcasts?',
    answer:
      'Absolutely! Because we utilize high-context AI models like Gemini with large context windows, the summarizer can handle lengthy videos, conferences, and full audiobooks without truncation.',
    category: 'Features',
  },
  {
    id: 'faq-5',
    question: 'What happens if a video does not have closed captions?',
    answer:
      'If a video has captions completely disabled by the creator or is set to private, the transcript fetcher cannot retrieve subtitles. In this case, our app displays a clear notification explaining that captions are unavailable for that specific video.',
    category: 'Troubleshooting',
  },
  {
    id: 'faq-6',
    question: 'How can I customize the AI provider or model?',
    answer:
      'Click the Settings gear icon in the top header navigation. From there you can choose between Google Gemini (default free tier) or OpenRouter (with free community models), test your API connection, and monitor response latency in milliseconds.',
    category: 'Accuracy & AI',
  },
  {
    id: 'faq-7',
    question: 'Can I use this tool in other languages besides English?',
    answer:
      'Yes! We provide multi-language routing and support for Spanish (Español), German (Deutsch), French (Français), Portuguese (Português), and Arabic (العربية). You can toggle languages at any time from the site footer.',
    category: 'General',
  },
];
