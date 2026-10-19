import { cache } from 'react';
import {
  getVideoMetadata,
  getTranscript,
  formatTranscriptForAI,
} from '@/lib/youtube';
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
 * Fast server-side fetcher for a given YouTube video.
 * Extracts metadata and raw transcript in ~1-2 seconds.
 * AI summary generation is deferred to background streaming / lazy client fetching
 * so the initial page response is instantaneous.
 */
export const getVideoData = cache(async (videoId: string): Promise<ServerVideoData> => {
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
  let error: string | null = null;

  try {
    metadata = await getVideoMetadata(videoId);
  } catch (err: any) {
    console.error('Metadata fetch error:', err);
  }

  // Fast transcript extraction
  try {
    transcript = await getTranscript(videoId);
    formattedTranscript = formatTranscriptForAI(transcript);
  } catch (err: any) {
    transcriptWarning =
      'Subtitles are not directly available for this video. The AI will analyze the video content directly.';
  }

  return {
    videoId,
    metadata,
    transcript,
    formattedTranscript,
    transcriptWarning,
    summary: null,
    error,
  };
});
