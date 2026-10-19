import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const apiKey = body.apiKey || process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured in .env or settings.' },
        { status: 400 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch models from OpenRouter. Please verify your API key.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Map and filter exclusively for free models (:free in ID or 0 pricing)
    const allModels = (data.data || []).map((m: any) => {
      const isFree =
        m.id.endsWith(':free') ||
        (parseFloat(m.pricing?.prompt || '1') === 0 &&
          parseFloat(m.pricing?.completion || '1') === 0);

      return {
        id: m.id,
        name: m.name || m.id,
        isFree,
        contextLength: m.context_length || 0,
      };
    });

    // Filter to only free models as requested
    const freeModels = allModels
      .filter((m: any) => m.isFree)
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    return NextResponse.json({
      models: freeModels,
      hasEnvKey: !!process.env.OPENROUTER_API_KEY,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
