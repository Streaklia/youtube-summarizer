import { NextRequest, NextResponse } from 'next/server';
import { regenerateSection } from '@/lib/gemini';
import { regenerateSectionOpenRouter } from '@/lib/openrouter';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const {
      section,
      transcript,
      provider,
      openrouterApiKey,
      openrouterModel,
      videoUrl,
      title,
    } = await req.json();

    const validSections = ['takeaways', 'chapters', 'summary', 'infographic'];
    if (!section || !validSections.includes(section)) {
      return NextResponse.json(
        { error: `Invalid section. Must be one of: ${validSections.join(', ')}` },
        { status: 400 }
      );
    }

    if (!transcript && !videoUrl) {
      return NextResponse.json(
        { error: 'Transcript or Video URL is required' },
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
      const partial = await regenerateSectionOpenRouter(
        section,
        transcript || '',
        openrouterApiKey,
        openrouterModel,
        videoUrl,
        title
      );
      return NextResponse.json(partial);
    }

    // Default: Gemini
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const partial = await regenerateSection(section, transcript || '', videoUrl, title);
    return NextResponse.json(partial);
  } catch (error: any) {
    console.error('Regeneration error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to regenerate section' },
      { status: 500 }
    );
  }
}
