import { notFound } from 'next/navigation';
import ArtistItem from '@/components/ArtistItem';
import TrackItem from '@/components/TrackItem';
import { getYTMusicClient } from '@/lib/ytmusic';

export default async function ArtistPage({ params }: { params: { id: string } }) {
  try {
    const ytmusic = await getYTMusicClient();
    const artist = await ytmusic.getArtist(params.id);

    if (!artist) notFound();

    const songs = (artist.songs?.results || []).slice(0, 10).map((song: any, index: number) => ({
      id: song.videoId || `${index}-${song.name || song.title}`,
      videoId: song.videoId || `${index}`,
      title: song.name || song.title || 'Untitled',
      artist: artist.name || 'Unknown Artist',
      album: song.album?.name || 'Single',
      thumbnail: song.thumbnails?.[0]?.url || '',
      duration: song.duration || '-',
      dateAdded: new Date().toISOString(),
    }));

    return (
      <main className="mx-auto max-w-5xl space-y-6 p-2">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-apple-gray-500">Artist</p>
          <h1 className="text-3xl font-bold">{artist.name || 'Unknown Artist'}</h1>
          <p className="text-sm text-apple-gray-500">{artist.description || 'No description.'}</p>
          <ArtistItem artist={{ id: params.id, name: artist.name || 'Unknown Artist' }} />
        </header>

        <section className="space-y-2">
          {songs.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} />
          ))}
        </section>
      </main>
    );
  } catch (error) {
    console.error('[artist-page] Failed to fetch artist', error);
    notFound();
  }
}
