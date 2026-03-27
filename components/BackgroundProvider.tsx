'use client';

export default function BackgroundProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 text-apple-gray-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-black dark:text-white">
      {children}
    </div>
  );
}
