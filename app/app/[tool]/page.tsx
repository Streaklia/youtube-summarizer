import { redirect } from 'next/navigation';

const TOOL_REDIRECTS: Record<string, string> = {
  'key-takeaways': '/?tab=takeaways',
  'chapters': '/?tab=chapters',
  'infographic': '/youtube-infographic',
  'prompt': '/?tab=prompt',
  'podcast-transcript': '/podcast-transcript',
  'chatbot': '/youtube-transcript-chatbot',
};

export function generateStaticParams() {
  return Object.keys(TOOL_REDIRECTS).map((tool) => ({ tool }));
}

export default function AppToolRedirectPage({
  params,
}: {
  params: { tool: string };
}) {
  const target = TOOL_REDIRECTS[params.tool] || '/';
  redirect(target);
}
