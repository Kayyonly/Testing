import { notFound } from "next/navigation";
import { getYTMusicClient } from "../../../lib/ytmusic";

type ArtistPageProps = {
  params: {
    id: string;
  };
};

export default async function ArtistPage({ params }: ArtistPageProps) {
  try {
    const ytmusic = await getYTMusicClient();
    const artist = await ytmusic.getArtist(params.id);

    if (!artist) {
      notFound();
    }

    return (
      <main className="mx-auto max-w-5xl space-y-6 p-6 text-white">
        <header>
          <p className="text-xs uppercase tracking-wider text-gray-400">Artist</p>
          <h1 className="text-3xl font-bold">{artist.name || "Unknown Artist"}</h1>
          <p className="text-sm text-gray-400">{artist.description || "No description."}</p>
        </header>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Top Songs</h2>
          <ul className="space-y-2">
            {(artist.songs?.results || []).slice(0, 10).map((song: any, idx: number) => (
              <li key={song.videoId || idx} className="rounded-lg border border-white/10 px-4 py-2">
                {song.name || song.title}
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
  } catch (error) {
    console.error("[artist-page] Failed to fetch artist", error);
    notFound();
  }
}
