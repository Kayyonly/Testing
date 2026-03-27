import { notFound } from "next/navigation";
import { getYTMusicClient } from "../../../lib/ytmusic";

type PlaylistPageProps = {
  params: {
    id: string;
  };
};

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  try {
    const ytmusic = await getYTMusicClient();
    const playlist = await ytmusic.getPlaylist(params.id);

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
        </section>
      </main>
    );
  } catch (error) {
    console.error("[playlist-page] Failed to fetch playlist", error);
    notFound();
  }
}
