import { notFound } from 'next/navigation';
import TrackItem from '@/components/TrackItem';
import { getYTMusicClient } from '@/lib/ytmusic';

export default async function PlaylistPage({ params }: { params: { id: string } }) {
  try {
    const ytmusic = await getYTMusicClient();
    const playlist = await ytmusic.getPlaylist(params.id);

    if (!playlist) notFound();

    const tracks = (playlist.tracks || []).map((track: any, index: number) => ({
      id: track.videoId || `${index}-${track.name || track.title}`,
      videoId: track.videoId || `${index}`,
      title: track.name || track.title || 'Untitled',
      artist: track.artist?.name || track.artists?.map((item: any) => item.name).join(', ') || 'Unknown Artist',
      album: playlist.title || 'Playlist',
      thumbnail: track.thumbnails?.[0]?.url || playlist.thumbnails?.[0]?.url || '',
      duration: track.duration || '-',
      dateAdded: new Date().toISOString(),
    }));

    return (
      <main className="mx-auto max-w-5xl space-y-6 p-2">
        <header>
          <p className="text-xs uppercase tracking-wider text-apple-gray-500">Playlist</p>
          <h1 className="text-3xl font-bold">{playlist.title || 'Untitled Playlist'}</h1>
          <p className="text-sm text-apple-gray-500">{playlist.author?.name || 'Unknown Creator'}</p>
        </header>

        <section className="space-y-2">
          {tracks.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} />
          ))}
        </section>
      </main>
    );
  } catch (error) {
    console.error('[playlist-page] Failed to fetch playlist', error);
    notFound();
  }
}
