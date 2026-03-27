import type { Metadata } from 'next';
import './globals.css';
import BackgroundProvider from '@/components/BackgroundProvider';
import BottomNav from '@/components/BottomNav';
import Player from '@/components/Player';
import PWARegister from '@/components/PWARegister';

export const metadata: Metadata = {
  title: 'Apple Music Clone',
  description: 'Modular Next.js 14 music app with ytmusic-api',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BackgroundProvider>
          <div className="mx-auto min-h-screen max-w-7xl px-4 pb-28 pt-6 md:pb-24">{children}</div>
          <Player />
          <BottomNav />
          <PWARegister />
        </BackgroundProvider>
      </body>
    </html>
  );
}
