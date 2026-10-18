import { SummaryResult, ChatMessage } from './types';
import { getSummaryPrompt, parseSummaryResponse } from './gemini';

async function callOpenRouter(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[]
): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'YouTube Summarizer',
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.error?.message || `OpenRouter API error (${response.status})`
    );
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function generateSummaryOpenRouter(
  transcript: string,
  apiKey: string,
  model: string,
  videoUrl?: string,
  title?: string
): Promise<SummaryResult> {
  const prompt = getSummaryPrompt(transcript, videoUrl, title);

  const text = await callOpenRouter(apiKey, model, [
    { role: 'user', content: prompt },
  ]);

  return parseSummaryResponse(text);
}

export async function chatWithTranscriptOpenRouter(
  transcript: string,
  messages: ChatMessage[],
  apiKey: string,
  model: string,
  videoUrl?: string
): Promise<string> {
  const contextIntro = transcript && transcript.trim().length > 0
    ? `VIDEO TRANSCRIPT:\n${transcript}`
    : `YOUTUBE VIDEO: ${videoUrl || ''}\n(Answer questions using your knowledge of this video)`;

  const systemPrompt = `You are a helpful AI assistant that answers questions about a YouTube video. Be concise, accurate, and reference specific parts of the video with timestamps when relevant.

${contextIntro}`;

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role === 'user' ? 'user' : ('assistant' as string),
      content: m.content,
    })),
  ];

  return callOpenRouter(apiKey, model, apiMessages);
}
