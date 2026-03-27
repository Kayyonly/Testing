"use client";

import AlbumTrackClient from "./AlbumTrackClient";

type AlbumData = {
  title?: string;
  name?: string;
  artist?: { name?: string };
  year?: string;
  thumbnails?: Array<{ url: string }>;
  tracks?: Array<{
    videoId?: string;
    name?: string;
    title?: string;
    artist?: { name?: string } | string;
    artists?: Array<{ name?: string }>;
    duration?: string;
  }>;
};

type AlbumClientProps = {
  album: AlbumData;
};

export default function AlbumClient({ album }: AlbumClientProps) {
  const cover = album.thumbnails?.[0]?.url;

  return (
    <section className="space-y-6">
      <header className="flex items-center gap-4">
        {cover ? (
          <img src={cover} alt={album.title || album.name || "Album cover"} className="h-28 w-28 rounded-xl object-cover" />
        ) : null}

        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400">Album</p>
          <h1 className="text-3xl font-bold text-white">{album.title || album.name || "Unknown Album"}</h1>
          <p className="text-sm text-gray-400">
            {album.artist?.name || "Unknown Artist"}
            {album.year ? ` • ${album.year}` : ""}
          </p>
        </div>
      </header>

      <AlbumTrackClient tracks={album.tracks || []} />
    </section>
  );
}
