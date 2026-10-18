import { NextRequest, NextResponse } from 'next/server';
import {
  extractVideoId,
  getVideoMetadata,
  getTranscript,
  formatTranscriptForAI,
} from '@/lib/youtube';

export const maxDuration = 60; // Allow up to 60s for Vercel functions

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        {
          error:
            'Invalid YouTube URL. Please provide a valid youtube.com or youtu.be link.',
        },
        { status: 400 }
      );
    }

    const [metadata, transcript] = await Promise.all([
      getVideoMetadata(videoId),
      getTranscript(videoId),
    ]);

    const formattedTranscript = formatTranscriptForAI(transcript);

    return NextResponse.json({
      metadata,
      transcript,
      formattedTranscript,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process video' },
      { status: 500 }
    );
  }
}
