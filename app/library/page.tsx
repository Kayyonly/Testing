'use client';

import { useEffect, useState } from 'react';
import ArtistItem from '@/components/ArtistItem';
import CommunityPlaylistCard from '@/components/CommunityPlaylistCard';
import HorizontalScroll from '@/components/HorizontalScroll';
import TrackItem from '@/components/TrackItem';
import { communityPlaylists, featuredArtists } from '@/lib/db';
import { useMusicStore } from '@/lib/store';
import type { Track } from '@/types/music';

export default function LibraryPage() {
  const savedSongs = useMusicStore((state) => state.userLibrary.savedSongs);
  const playTracks = useMusicStore((state) => state.playTracks);

  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTracks() {
      try {
        setLoading(true);
        const response = await fetch('/api/search?q=indonesia');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Gagal mengambil lagu.');
        }

        if (active) {
          setTracks(data.tracks || []);
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Gagal mengambil lagu.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTracks();
    return () => {
      active = false;
    };
  }, []);

  const mergedTracks = savedSongs.length ? [...savedSongs, ...tracks.filter((track) => !savedSongs.find((item) => item.id === track.id))] : tracks;

  return (
    <main className="space-y-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your Library</h1>
          <p className="text-sm text-apple-gray-500">Lagu Indonesia asli dari ytmusic-api.</p>
        </div>
        <button
          onClick={() => playTracks(mergedTracks)}
          disabled={!mergedTracks.length}
          className="rounded-full bg-black px-4 py-2 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          Play All
        </button>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Community Playlists</h2>
        <HorizontalScroll>
          {communityPlaylists.map((playlist) => (
            <CommunityPlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </HorizontalScroll>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Featured Artists</h2>
        <div className="flex flex-wrap gap-2">
          {featuredArtists.map((artist) => (
            <ArtistItem key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="grid grid-cols-[minmax(220px,2fr)_1fr_140px_100px_96px] px-3 text-xs font-semibold uppercase tracking-wide text-apple-gray-500">
          <p>Title</p>
          <p>Album</p>
          <p>Date Added</p>
          <p>Duration</p>
          <p className="text-right">Actions</p>
        </div>

        {loading ? <p className="px-3 text-sm text-apple-gray-500">Loading lagu Indonesia...</p> : null}
        {error ? <p className="px-3 text-sm text-red-500">{error}</p> : null}

        <div className="space-y-1">
          {mergedTracks.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
