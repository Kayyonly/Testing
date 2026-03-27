<<<<<<< codex/generate-next.js-project-folder-structure-kgoced
import { notFound } from 'next/navigation';
import TrackItem from '@/components/TrackItem';
import { getYTMusicClient } from '@/lib/ytmusic';

export default async function PlaylistPage({ params }: { params: { id: string } }) {
=======
import { notFound } from "next/navigation";
import { getYTMusicClient } from "../../../lib/ytmusic";

type PlaylistPageProps = {
  params: {
    id: string;
  };
};

export default async function PlaylistPage({ params }: PlaylistPageProps) {
>>>>>>> main
  try {
    const ytmusic = await getYTMusicClient();
    const playlist = await ytmusic.getPlaylist(params.id);

<<<<<<< codex/generate-next.js-project-folder-structure-kgoced
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
=======
    if (!playlist) {
      notFound();
    }

    return (
      <main className="mx-auto max-w-5xl space-y-6 p-6 text-white">
        <header>
          <p className="text-xs uppercase tracking-wider text-gray-400">Playlist</p>
          <h1 className="text-3xl font-bold">{playlist.title || "Untitled Playlist"}</h1>
          <p className="text-sm text-gray-400">{playlist.author?.name || "Unknown Creator"}</p>
        </header>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Tracks</h2>
          <ol className="space-y-2">
            {(playlist.tracks || []).map((track: any, idx: number) => (
              <li key={track.videoId || idx} className="rounded-lg border border-white/10 px-4 py-2">
                {track.name || track.title} {track.duration ? `• ${track.duration}` : ""}
              </li>
            ))}
          </ol>
>>>>>>> main
        </section>
      </main>
    );
  } catch (error) {
<<<<<<< codex/generate-next.js-project-folder-structure-kgoced
    console.error('[playlist-page] Failed to fetch playlist', error);
=======
    console.error("[playlist-page] Failed to fetch playlist", error);
>>>>>>> main
    notFound();
  }
}
