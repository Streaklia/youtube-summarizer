export interface VideoMetadata {
  title: string;
  thumbnail: string;
  channelName: string;
  duration: string;
  videoId: string;
  publishDate?: string;
  formattedPublishDate?: string;
  category?: string;
  viewCount?: string;
  formattedViews?: string;
}

export interface TranscriptEntry {
  text: string;
  offset: number;
  duration: number;
}

export interface ChapterSummary {
  timestamp: string;
  title: string;
  summary: string;
}

export interface InfographicData {
  title: string;
  subtitle: string;
  keyStats: { label: string; value: string }[];
  mainPoints: { number: number; title: string; detail: string }[];
  quotes: string[];
  conclusion: string;
}

export interface SummaryResult {
  keyTakeaways: string[];
  chapterSummaries: ChapterSummary[];
  fullSummary: string;
  infographic?: InfographicData;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AISettings {
  provider: 'gemini' | 'openrouter';
  geminiModel?: string;
  openrouterApiKey: string;
  openrouterModel: string;
}
