import { GoogleGenAI } from '@google/genai';
import { SummaryResult, ChatMessage } from './types';

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set.');
  }
  return new GoogleGenAI({ apiKey });
}

const SUMMARY_PROMPT_TEMPLATE = `You are an expert content analyst. Analyze the following YouTube video transcript and provide a comprehensive summary.

TRANSCRIPT:
{{TRANSCRIPT}}

Respond with ONLY valid JSON (no markdown code fences, no extra text) in this exact format:
{
  "keyTakeaways": ["takeaway 1", "takeaway 2"],
  "chapterSummaries": [
    {
      "timestamp": "MM:SS",
      "title": "Chapter Title",
      "summary": "Brief summary of this section"
    }
  ],
  "fullSummary": "A detailed, well-structured article-style summary using markdown formatting with headers (##), paragraphs, bold, and emphasis.",
  "infographic": {
    "title": "A short, catchy title for an infographic",
    "subtitle": "A one-line hook or tagline",
    "keyStats": [
      { "label": "Stat Name", "value": "Stat Value or Number" }
    ],
    "mainPoints": [
      { "number": 1, "title": "Point Title", "detail": "One-sentence explanation" }
    ],
    "quotes": ["A notable or impactful quote from the video"],
    "conclusion": "A concise concluding takeaway"
  }
}

Guidelines:
- Key Takeaways: 5-10 concise, actionable bullet points capturing the most important insights
- Chapter Summaries: Break the video into logical sections with accurate timestamps from the transcript
- Full Summary: A comprehensive, SEO-friendly article (500-1000 words) that captures all important information with proper markdown structure
- Infographic: Extract 3-6 key stats/numbers mentioned (or derived from) the video, 3-5 main points suitable for a visual layout, 1-3 memorable quotes, and a punchy conclusion`;

export function getSummaryPrompt(transcript: string): string {
  return SUMMARY_PROMPT_TEMPLATE.replace('{{TRANSCRIPT}}', transcript);
}

export function parseSummaryResponse(text: string): SummaryResult {
  try {
    let jsonStr = text.trim();
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const parsed = JSON.parse(jsonStr);
    return {
      keyTakeaways: parsed.keyTakeaways || [],
      chapterSummaries: parsed.chapterSummaries || [],
      fullSummary: parsed.fullSummary || '',
      infographic: parsed.infographic || undefined,
    };
  } catch {
    return {
      keyTakeaways: [
        'Summary generated but could not be structured. See full summary below.',
      ],
      chapterSummaries: [],
      fullSummary: text,
    };
  }
}

export async function generateSummary(
  transcript: string
): Promise<SummaryResult> {
  const ai = getClient();
  const prompt = getSummaryPrompt(transcript);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const text = response.text?.trim() || '';
  return parseSummaryResponse(text);
}

export async function chatWithTranscript(
  transcript: string,
  messages: ChatMessage[]
): Promise<string> {
  const ai = getClient();

  const systemPrompt = `You are a helpful AI assistant that answers questions about a YouTube video based on its transcript. Be concise, accurate, and reference specific parts of the video with timestamps when relevant.

VIDEO TRANSCRIPT:
${transcript}`;

  const chatContents = [
    { role: 'user' as const, parts: [{ text: systemPrompt }] },
    {
      role: 'model' as const,
      parts: [
        {
          text: "I have read the transcript. I'm ready to answer your questions about this video.",
        },
      ],
    },
    ...messages.map((m) => ({
      role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.content }],
    })),
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: chatContents,
  });

  return response.text || 'Sorry, I could not generate a response.';
}
