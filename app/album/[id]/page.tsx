import { notFound } from 'next/navigation';
import TrackItem from '@/components/TrackItem';
import { getYTMusicClient } from '@/lib/ytmusic';

export default async function AlbumPage({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const ytmusic = await getYTMusicClient();
    const album = await ytmusic.getAlbum(id);

    if (!album) notFound();

    const tracks = (album.tracks || []).map((track: any, index: number) => ({
      id: track.videoId || `${index}-${track.name || track.title}`,
      videoId: track.videoId || `${index}`,
      title: track.name || track.title || 'Untitled',
      artist:
        (typeof track.artist === 'string' ? track.artist : track.artist?.name) ||
        track.artists?.map((item: any) => item.name).filter(Boolean).join(', ') ||
        'Unknown Artist',
      album: album.title || album.name || 'Unknown Album',
      thumbnail: album.thumbnails?.[0]?.url || '',
      duration: track.duration || '-',
      dateAdded: new Date().toISOString(),
    }));

    return (
      <main className="mx-auto max-w-5xl space-y-5 p-2">
        <header>
          <p className="text-xs uppercase tracking-wider text-apple-gray-500">Album</p>
          <h1 className="text-3xl font-bold">{album.title || album.name || 'Unknown Album'}</h1>
          <p className="text-sm text-apple-gray-500">
            {album.artist?.name || 'Unknown Artist'}
            {album.year ? ` • ${album.year}` : ''}
          </p>
        </header>

        <section className="space-y-2">
          {tracks.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} />
          ))}
        </section>
      </main>
    );
  } catch (error) {
    console.error('[album-page] Failed to fetch album', error);
    notFound();
  }
}
