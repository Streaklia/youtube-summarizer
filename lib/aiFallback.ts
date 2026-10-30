import { GoogleGenAI } from '@google/genai';
import { SummaryResult, ChatMessage } from './types';
import {
  getSummaryPrompt,
  parseSummaryResponse,
  getSectionPrompt,
  parseSectionResponse,
} from './gemini';

export interface ProviderTarget {
  provider: 'gemini' | 'openrouter';
  model: string;
  name: string;
  apiKey?: string;
}

export interface FallbackOptions {
  preferredProvider?: 'gemini' | 'openrouter';
  geminiModel?: string;
  openrouterApiKey?: string;
  openrouterModel?: string;
}

/**
 * Builds the prioritized chain of free/standard models and providers.
 * Priority:
 * 1. User preferred model (if configured in settings)
 * 2. Primary: gemini-2.5-flash (Google Gemini Free Tier)
 * 3. Secondary: gemini-3.5-flash (Google Gemini Free Tier)
 * 4. Tertiary: gemini-3.5-flash-lite (Google Gemini Free Tier)
 * 5. Quaternary: OpenRouter Free Models (Llama 3, Mistral)
 */
export function getFallbackTargets(options?: FallbackOptions): ProviderTarget[] {
  const targets: ProviderTarget[] = [];
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const userOpenRouterKey = options?.openrouterApiKey || process.env.OPENROUTER_API_KEY;

  // If user explicitly chose OpenRouter in settings, put it first
  if (options?.preferredProvider === 'openrouter' && userOpenRouterKey && options?.openrouterModel) {
    targets.push({
      provider: 'openrouter',
      model: options.openrouterModel,
      name: `OpenRouter (${options.openrouterModel.split('/').pop()})`,
      apiKey: userOpenRouterKey,
    });
  }

  // Google Gemini Free Tier Chain (Prioritize selected model if any)
  if (geminiApiKey) {
    const selectedGemini = options?.geminiModel || 'gemini-2.5-flash';
    targets.push({
      provider: 'gemini',
      model: selectedGemini,
      name: `Gemini (${selectedGemini})`,
      apiKey: geminiApiKey,
    });

    if (selectedGemini !== 'gemini-2.5-flash') {
      targets.push({
        provider: 'gemini',
        model: 'gemini-2.5-flash',
        name: 'Gemini (gemini-2.5-flash)',
        apiKey: geminiApiKey,
      });
    }

    targets.push({
      provider: 'gemini',
      model: 'gemini-3.5-flash',
      name: 'Gemini (gemini-3.5-flash)',
      apiKey: geminiApiKey,
    });

    targets.push({
      provider: 'gemini',
      model: 'gemini-3.5-flash-lite',
      name: 'Gemini (gemini-3.5-flash-lite)',
      apiKey: geminiApiKey,
    });
  }

  // 3. OpenRouter Free Models (if user or server provided an OpenRouter key)
  if (userOpenRouterKey) {
    const freeModels = [
      'meta-llama/llama-3-8b-instruct:free',
      'mistralai/mistral-7b-instruct:free',
      'google/gemini-2.0-flash-exp:free',
    ];

    for (const freeModel of freeModels) {
      // Don't add duplicate if user already selected it as preferred
      if (options?.openrouterModel !== freeModel) {
        targets.push({
          provider: 'openrouter',
          model: freeModel,
          name: `OpenRouter (${freeModel.split('/')[1] || freeModel})`,
          apiKey: userOpenRouterKey,
        });
      }
    }
  }

  return targets;
}

/** Low-level Gemini executor */
async function executeGemini(
  model: string,
  apiKey: string,
  prompt: string
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });
  return response.text?.trim() || '';
}

/** Low-level Gemini chat executor */
async function executeGeminiChat(
  model: string,
  apiKey: string,
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  const chatContents = [
    { role: 'user' as const, parts: [{ text: systemPrompt }] },
    {
      role: 'model' as const,
      parts: [
        {
          text: "I have reviewed the video details. I'm ready to answer your questions about this video.",
        },
      ],
    },
    ...messages.map((m) => ({
      role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.content }],
    })),
  ];

  const response = await ai.models.generateContent({
    model,
    contents: chatContents,
  });

  return response.text?.trim() || '';
}

/** Low-level OpenRouter executor */
async function executeOpenRouter(
  model: string,
  apiKey: string,
  messages: { role: string; content: string }[]
): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.mytranscript.pro',
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
      error.error?.message || `OpenRouter API returned HTTP ${response.status}`
    );
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Universal Try-Catch Fallback runner that attempts each target in sequence.
 */
export async function runWithFallbackChain<T>(
  targets: ProviderTarget[],
  taskName: string,
  runner: (target: ProviderTarget) => Promise<T>
): Promise<T> {
  if (targets.length === 0) {
    throw new Error(
      'No AI providers are configured. Please set GEMINI_API_KEY in your environment or provide an OpenRouter API key in settings.'
    );
  }

  const errors: string[] = [];

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    try {
      return await runner(target);
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      console.warn(
        `[Fallback Chain] ${taskName} failed with ${target.name} (Attempt ${i + 1}/${targets.length}): ${errMsg}`
      );
      errors.push(`${target.name}: ${errMsg}`);
    }
  }

  throw new Error(
    `All available AI models in the fallback chain failed (${targets.length} attempted). Details: ${errors.join(' | ')}`
  );
}

/**
 * Summarize with Multi-Model / Multi-Provider Fallback
 */
export async function generateSummaryWithFallback(
  transcript: string,
  videoUrl?: string,
  title?: string,
  options?: FallbackOptions
): Promise<SummaryResult> {
  const targets = getFallbackTargets(options);
  const prompt = getSummaryPrompt(transcript, videoUrl, title);

  return runWithFallbackChain(targets, 'Generate Summary', async (target) => {
    let text = '';
    if (target.provider === 'gemini') {
      text = await executeGemini(target.model, target.apiKey!, prompt);
    } else {
      text = await executeOpenRouter(target.model, target.apiKey!, [
        { role: 'user', content: prompt },
      ]);
    }
    return parseSummaryResponse(text);
  });
}

/**
 * Regenerate Section with Multi-Model / Multi-Provider Fallback
 */
export async function regenerateSectionWithFallback(
  section: string,
  transcript: string,
  videoUrl?: string,
  title?: string,
  options?: FallbackOptions
): Promise<Partial<SummaryResult>> {
  const targets = getFallbackTargets(options);
  const prompt = getSectionPrompt(section, transcript, videoUrl, title);

  return runWithFallbackChain(targets, `Regenerate Section [${section}]`, async (target) => {
    let text = '';
    if (target.provider === 'gemini') {
      text = await executeGemini(target.model, target.apiKey!, prompt);
    } else {
      text = await executeOpenRouter(target.model, target.apiKey!, [
        { role: 'user', content: prompt },
      ]);
    }
    return parseSectionResponse(section, text);
  });
}

/**
 * Chat with Video with Multi-Model / Multi-Provider Fallback
 */
export async function chatWithTranscriptWithFallback(
  transcript: string,
  messages: ChatMessage[],
  videoUrl?: string,
  options?: FallbackOptions
): Promise<string> {
  const targets = getFallbackTargets(options);
  const contextIntro = transcript && transcript.trim().length > 0
    ? `VIDEO TRANSCRIPT:\n${transcript}`
    : `YOUTUBE VIDEO: ${videoUrl || ''}\n(Answer questions using your knowledge of this video)`;

  const systemPrompt = `You are a helpful AI assistant that answers questions about a YouTube video. Be concise, accurate, and reference specific parts of the video with timestamps when relevant.\n\n${contextIntro}`;

  return runWithFallbackChain(targets, 'Chat with Video', async (target) => {
    if (target.provider === 'gemini') {
      return await executeGeminiChat(target.model, target.apiKey!, systemPrompt, messages);
    } else {
      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role === 'user' ? 'user' : ('assistant' as string),
          content: m.content,
        })),
      ];
      return await executeOpenRouter(target.model, target.apiKey!, apiMessages);
    }
  });
}
