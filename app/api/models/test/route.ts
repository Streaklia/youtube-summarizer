import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const { provider = 'gemini', model, apiKey, message } = await req.json();
    const promptMessage =
      message && typeof message === 'string' && message.trim().length > 0
        ? message.trim()
        : 'Hello! Please reply in one short sentence confirming you are working.';

    // =========================================================================
    // 1. Google Gemini Provider
    // =========================================================================
    if (provider === 'gemini') {
      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        return NextResponse.json(
          {
            success: false,
            error: 'GEMINI_API_KEY is missing on server. Check .env.local or production environment variables.',
            elapsedMs: Date.now() - startTime,
          },
          { status: 400 }
        );
      }

      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const requestedModel = model || 'gemini-2.5-flash';

      let reply = '';
      let usedModel = requestedModel;

      try {
        const response = await ai.models.generateContent({
          model: requestedModel,
          contents: promptMessage,
        });
        reply = response.text || 'OK (Gemini responded)';
      } catch (geminiErr: any) {
        // If specified model fails and it was 2.5, try 1.5-flash fallback
        if (requestedModel !== 'gemini-1.5-flash') {
          try {
            usedModel = 'gemini-1.5-flash';
            const fallbackResp = await ai.models.generateContent({
              model: 'gemini-1.5-flash',
              contents: promptMessage,
            });
            reply = fallbackResp.text || 'OK (Gemini 1.5-flash fallback responded)';
          } catch (fallbackErr: any) {
            throw new Error(`Gemini error (${geminiErr.message || geminiErr})`);
          }
        } else {
          throw geminiErr;
        }
      }

      const elapsedMs = Date.now() - startTime;
      return NextResponse.json({
        success: true,
        provider: 'gemini',
        model: usedModel,
        reply: reply.trim(),
        elapsedMs,
      });
    }

    // =========================================================================
    // 2. OpenRouter Provider
    // =========================================================================
    const key = apiKey || process.env.OPENROUTER_API_KEY;

    if (!key) {
      return NextResponse.json(
        {
          success: false,
          error: 'OpenRouter API key is required. Please paste your key in the OpenRouter API Key input above.',
          elapsedMs: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    const openrouterModel = model || 'meta-llama/llama-3-8b-instruct:free';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.mytranscript.pro',
        'X-Title': 'MyTranscript API Playground',
      },
      body: JSON.stringify({
        model: openrouterModel,
        messages: [{ role: 'user', content: promptMessage }],
        max_tokens: 150,
      }),
    });

    const elapsedMs = Date.now() - startTime;

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: err.error?.message || `HTTP ${response.status}: Failed to reach OpenRouter model`,
          elapsedMs,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'OK';

    return NextResponse.json({
      success: true,
      provider: 'openrouter',
      model: openrouterModel,
      reply: reply.trim(),
      elapsedMs,
    });
  } catch (error: any) {
    const elapsedMs = Date.now() - startTime;
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'API test request failed',
        elapsedMs,
      },
      { status: 500 }
    );
  }
}
