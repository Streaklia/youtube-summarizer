import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MyTranscript – YouTube Transcript & AI Summarizer',
    short_name: 'MyTranscript',
    description:
      'Extract full YouTube transcripts, generate AI summaries, chapters, infographics, and download clean SRT subtitles instantly.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#040200',
    theme_color: '#E02440',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
