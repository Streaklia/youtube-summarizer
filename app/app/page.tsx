/**
 * /app/ — redirects to the root homepage which hosts the main web app UI.
 * Using a permanent redirect keeps one canonical URL (/) for the interactive tool.
 */
import { redirect } from 'next/navigation';

export default function AppPage() {
  redirect('/');
}
