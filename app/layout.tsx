import './globals.css';
import Sidebar from '../components/Sidebar';
import PlayerBar from '../components/PlayerBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-apple-gray-100 text-apple-gray-900 dark:bg-apple-gray-900 dark:text-white">
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-[260px_1fr] gap-6 p-4">
          <Sidebar />
          <div className="rounded-2xl bg-white shadow-sm dark:bg-black/40">{children}</div>
        </div>
        <PlayerBar />
      </body>
    </html>
  );
}
