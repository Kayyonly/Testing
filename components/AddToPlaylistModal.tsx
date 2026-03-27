'use client';

import { useMemo } from 'react';
import { useMusicStore } from '@/lib/store';
import type { Track } from '@/types/music';

type AddToPlaylistModalProps = {
  track: Track | null;
  open: boolean;
  onClose: () => void;
};

export default function AddToPlaylistModal({ track, open, onClose }: AddToPlaylistModalProps) {
  const playlists = useMusicStore((state) => state.userLibrary.playlists);

  const hasPlaylists = useMemo(() => playlists.length > 0, [playlists]);
  if (!open || !track) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-5 dark:bg-zinc-900" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold">Add “{track.title}” to playlist</h2>
        <div className="mt-4 space-y-2">
          {hasPlaylists ? (
            playlists.map((playlist) => (
              <button key={playlist.id} className="w-full rounded-lg border border-black/10 px-3 py-2 text-left text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
                {playlist.name}
              </button>
            ))
          ) : (
            <p className="text-sm text-apple-gray-500">Belum ada playlist di library.</p>
          )}
        </div>
      </div>
    </div>
  );
}
