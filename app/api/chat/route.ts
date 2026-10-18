import { NextRequest, NextResponse } from 'next/server';
import { chatWithTranscript } from '@/lib/gemini';
import { chatWithTranscriptOpenRouter } from '@/lib/openrouter';

export const maxDuration = 60; // Allow up to 60s for Vercel functions

export async function POST(req: NextRequest) {
  try {
    const {
      transcript,
      messages,
      provider,
      openrouterApiKey,
      openrouterModel,
      videoUrl,
    } = await req.json();

    if (!messages) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    if (provider === 'openrouter') {
      if (!openrouterApiKey || !openrouterModel) {
        return NextResponse.json(
          { error: 'OpenRouter API key and model are required' },
          { status: 400 }
        );
      }
      const response = await chatWithTranscriptOpenRouter(
        transcript || '',
        messages,
        openrouterApiKey,
        openrouterModel,
        videoUrl
      );
      return NextResponse.json({ response });
    }

    // Default: Gemini
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured. Please add it to .env.local' },
        { status: 500 }
      );
    }

    const response = await chatWithTranscript(transcript || '', messages, videoUrl);
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}
