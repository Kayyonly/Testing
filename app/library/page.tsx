'use client';

import ArtistItem from '@/components/ArtistItem';
import CommunityPlaylistCard from '@/components/CommunityPlaylistCard';
import HorizontalScroll from '@/components/HorizontalScroll';
import TrackItem from '@/components/TrackItem';
import { communityPlaylists, featuredArtists, mockTracks } from '@/lib/db';
import { useMusicStore } from '@/lib/store';

export default function LibraryPage() {
  const savedSongs = useMusicStore((state) => state.userLibrary.savedSongs);
  const tracks = savedSongs.length ? savedSongs : mockTracks;

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Your Library</h1>
        <p className="text-sm text-apple-gray-500">Modular, clean, and scalable music app architecture.</p>
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

        <div className="space-y-1">
          {tracks.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
