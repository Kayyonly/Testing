'use client';

import type { Playlist } from '@/types/music';

export default function CommunityPlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <article className="min-w-56 rounded-xl border border-black/5 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h3 className="text-sm font-semibold">{playlist.name}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-apple-gray-500">{playlist.description || 'Community playlist.'}</p>
    </article>
  );
}
