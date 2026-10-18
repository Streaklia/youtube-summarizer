import { NextRequest, NextResponse } from 'next/server';
import { chatWithTranscript } from '@/lib/gemini';
import { chatWithTranscriptOpenRouter } from '@/lib/openrouter';

export async function POST(req: NextRequest) {
  try {
    const {
      transcript,
      messages,
      provider,
      openrouterApiKey,
      openrouterModel,
    } = await req.json();

    if (!transcript || !messages) {
      return NextResponse.json(
        { error: 'Transcript and messages are required' },
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
        transcript,
        messages,
        openrouterApiKey,
        openrouterModel
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

    const response = await chatWithTranscript(transcript, messages);
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}
