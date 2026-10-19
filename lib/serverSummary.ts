import { cache } from 'react';
import {
  getVideoMetadata,
  getTranscript,
  formatTranscriptForAI,
} from '@/lib/youtube';
import { generateSummary } from '@/lib/gemini';
import { SummaryResult, TranscriptEntry, VideoMetadata } from '@/lib/types';

export interface ServerVideoData {
  videoId: string;
  metadata: VideoMetadata;
  transcript: TranscriptEntry[];
  formattedTranscript: string;
  transcriptWarning: string | null;
  summary: SummaryResult | null;
  error: string | null;
}

/**
 * Cached server-side fetcher for a given YouTube video.
 * Uses React `cache` so that metadata generation and page rendering share the same single fetch per request.
 */
export const getVideoData = cache(async (videoId: string): Promise<ServerVideoData> => {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  let metadata: VideoMetadata = {
    title: 'YouTube Video',
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    channelName: 'YouTube Channel',
    duration: '',
    videoId,
  };
  let transcript: TranscriptEntry[] = [];
  let formattedTranscript = '';
  let transcriptWarning: string | null = null;
  let summary: SummaryResult | null = null;
  let error: string | null = null;

  try {
    metadata = await getVideoMetadata(videoId);
  } catch (err: any) {
    console.error('Metadata fetch error:', err);
  }

  // Attempt transcript extraction
  try {
    transcript = await getTranscript(videoId);
    formattedTranscript = formatTranscriptForAI(transcript);
  } catch (err: any) {
    transcriptWarning =
      'Subtitles are not directly available for this video. The AI will analyze the video content directly.';
  }

  // Generate AI Summary server-side if GEMINI_API_KEY is available
  if (process.env.GEMINI_API_KEY) {
    try {
      summary = await generateSummary(
        formattedTranscript,
        watchUrl,
        metadata.title
      );
    } catch (err: any) {
      console.error('Server summary generation error:', err);
      error = err.message || 'Failed to generate summary on server';
    }
  }

  return {
    videoId,
    metadata,
    transcript,
    formattedTranscript,
    transcriptWarning,
    summary,
    error,
  };
});
