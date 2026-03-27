'use client';

import { useEffect, useState } from 'react';
import TrackItem from '@/components/TrackItem';
import { useMusicStore } from '@/lib/store';
import type { Track } from '@/types/music';

export default function HomePage() {
  const playTracks = useMusicStore((state) => state.playTracks);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTrending() {
      try {
        const response = await fetch('/api/trending');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Gagal mengambil lagu trending.');
        }

        if (active) {
          setTracks(data.tracks || []);
          setError('');
        }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Gagal mengambil lagu trending.');
      }
    }

    loadTrending();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Home</h1>
          <p className="text-sm text-apple-gray-500">Top Indonesia & Global songs.</p>
        </div>
        <button
          onClick={() => playTracks(tracks)}
          disabled={!tracks.length}
          className="rounded-full bg-black px-4 py-2 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          Play Trending
        </button>
      </header>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <section className="space-y-2">
        {tracks.map((track, index) => (
          <TrackItem key={track.id} track={track} index={index} />
        ))}
      </section>
    </main>
  );
}
