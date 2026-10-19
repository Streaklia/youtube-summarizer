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
    const body = await req.json();
    const rawInput = body.url || body.videoId;

    if (!rawInput) {
      return NextResponse.json(
        { error: 'YouTube URL or Video ID is required' },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(rawInput);
    if (!videoId) {
      return NextResponse.json(
        {
          error:
            'Invalid YouTube URL. Please provide a valid youtube.com or youtu.be link or video ID.',
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
      console.warn('Transcript unavailable for', videoId, ':', err.message);
      // Don't fail the request! Set fallback notice so AI analyzes video directly
      transcriptWarning =
        'Subtitles could not be extracted directly from YouTube for this video (captions may be disabled by the creator or restricted). AI video summarization is analyzing the video directly!';
    }

    return NextResponse.json({
      metadata,
      transcript,
      formattedTranscript,
      transcriptWarning,
    });
  } catch (error: any) {
    console.error('Transcript API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process video' },
      { status: 500 }
    );
  }
}
