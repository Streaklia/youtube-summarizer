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

    // Always fetch metadata first
    const metadata = await getVideoMetadata(videoId);

    // Try fetching transcript with fallback handling
    let transcript: any[] = [];
    let formattedTranscript = '';
    let transcriptWarning: string | null = null;

    try {
      transcript = await getTranscript(videoId);
      formattedTranscript = formatTranscriptForAI(transcript);
    } catch (err: any) {
      // Don't fail the request! Set fallback notice so Gemini analyzes video directly
      transcriptWarning = 'Subtitles are disabled or restricted for this video. Summarizing directly using AI video analysis.';
    }

    return NextResponse.json({
      metadata,
      transcript,
      formattedTranscript,
      transcriptWarning,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process video' },
      { status: 500 }
    );
  }
}
