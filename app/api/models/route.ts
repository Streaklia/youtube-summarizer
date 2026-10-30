import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = searchParams.get('provider') || 'gemini';
  return handleFetchModels(provider);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const provider = body.provider || 'gemini';
  const apiKey = body.apiKey;
  return handleFetchModels(provider, apiKey);
}

async function handleFetchModels(provider: string, apiKeyOverride?: string) {
  try {
    // -------------------------------------------------------------------------
    // 1. Google Gemini Provider Models (Free Tier Text Models)
    // -------------------------------------------------------------------------
    if (provider === 'gemini') {
      const geminiKey = process.env.GEMINI_API_KEY;
      const hasEnvKey = !!geminiKey && geminiKey.trim().length > 0;

      const geminiFreeTextModels = [
        {
          id: 'gemini-2.5-flash',
          name: 'Gemini 2.5 Flash',
          tag: 'RECOMMENDED',
          type: 'Text & Multimodal',
          isFree: true,
          contextLength: 1048576,
          desc: 'Flagship free-tier model: ultra-fast text reasoning, deep transcript analysis and summary formatting.',
        },
        {
          id: 'gemini-3.5-flash',
          name: 'Gemini 3.5 Flash',
          tag: 'LATEST',
          type: 'Text',
          isFree: true,
          contextLength: 1048576,
          desc: 'Next-generation speed and quality for instant video transcript breakdowns and bulleted notes.',
        },
        {
          id: 'gemini-3.5-flash-lite',
          name: 'Gemini 3.5 Flash Lite',
          tag: 'FASTEST',
          type: 'Text',
          isFree: true,
          contextLength: 1048576,
          desc: 'Ultra lightweight, zero-latency text model designed for instant response times and high throughput.',
        },
        {
          id: 'gemini-flash-lite-latest',
          name: 'Gemini Flash Lite Latest',
          tag: 'STABLE',
          type: 'Text',
          isFree: true,
          contextLength: 1048576,
          desc: 'Production-stable lightweight text endpoint for real-time plain-text conversions.',
        },
      ];

      return NextResponse.json({
        success: true,
        provider: 'gemini',
        hasEnvKey,
        keySource: hasEnvKey ? 'Auto-detected from server GEMINI_API_KEY (.env)' : 'Missing from server environment',
        models: geminiFreeTextModels,
      });
    }

    // -------------------------------------------------------------------------
    // 2. OpenRouter Provider Models
    // -------------------------------------------------------------------------
    const key = apiKeyOverride || process.env.OPENROUTER_API_KEY;
    const hasEnvKey = !!process.env.OPENROUTER_API_KEY;

    if (!key) {
      return NextResponse.json(
        {
          success: false,
          error: 'OpenRouter API key is not configured in .env or settings.',
          hasEnvKey: false,
          models: [],
        },
        { status: 400 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch models from OpenRouter. Please verify your API key.',
          hasEnvKey,
          models: [],
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    const allModels = (data.data || []).map((m: any) => {
      const isFree =
        m.id.endsWith(':free') ||
        (parseFloat(m.pricing?.prompt || '1') === 0 &&
          parseFloat(m.pricing?.completion || '1') === 0);

      return {
        id: m.id,
        name: m.name || m.id,
        tag: 'FREE',
        type: 'Text',
        isFree,
        contextLength: m.context_length || 0,
        desc: `${Math.round((m.context_length || 0) / 1000)}k context window free endpoint`,
      };
    });

    const freeModels = allModels
      .filter((m: any) => m.isFree)
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    return NextResponse.json({
      success: true,
      provider: 'openrouter',
      hasEnvKey,
      keySource: hasEnvKey ? 'Loaded from OPENROUTER_API_KEY (.env)' : 'User Provided Key',
      models: freeModels,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
