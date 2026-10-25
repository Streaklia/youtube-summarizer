'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function NavigationShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Don't render public header and footer on admin dashboard
  const isAdmin = pathname?.startsWith('/Xdmin99');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
