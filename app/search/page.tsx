'use client';

import { FormEvent, useEffect, useState } from 'react';
import TrackItem from '@/components/TrackItem';
import { useMusicStore } from '@/lib/store';
import type { Track } from '@/types/music';

export default function SearchPage() {
  const playTracks = useMusicStore((state) => state.playTracks);
  const [query, setQuery] = useState('indonesia');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadSearch(searchQuery: string) {
    try {
      setLoading(true);
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal mencari lagu.');
      }

      setTracks(data.tracks || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mencari lagu.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSearch('indonesia');
  }, []);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    loadSearch(query);
  }

  return (
    <main className="space-y-5">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Search</h1>

        <form onSubmit={onSubmit} className="flex w-full max-w-xl gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-black/40"
            placeholder="Cari lagu... contoh: indonesia"
          />
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black" type="submit">
            Cari
          </button>
          <button
            type="button"
            onClick={() => playTracks(tracks)}
            disabled={!tracks.length}
            className="rounded-lg border border-black/10 px-4 py-2 text-sm disabled:opacity-50 dark:border-white/10"
          >
            Play All
          </button>
        </form>
      </header>

      {loading ? <p className="text-sm text-apple-gray-500">Mencari lagu...</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <section className="space-y-2">
        {tracks.map((track, index) => (
          <TrackItem key={track.id} track={track} index={index} />
        ))}
      </section>
    </main>
  );
}
