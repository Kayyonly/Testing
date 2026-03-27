"use client";

type AlbumTrack = {
  videoId?: string;
  name?: string;
  title?: string;
  artist?: { name?: string } | string;
  artists?: Array<{ name?: string }>;
  duration?: string;
};

type AlbumTrackClientProps = {
  tracks: AlbumTrack[];
};

export default function AlbumTrackClient({ tracks }: AlbumTrackClientProps) {
  if (!tracks?.length) {
    return <p className="text-sm text-gray-400">Tidak ada lagu pada album ini.</p>;
  }

  return (
    <ol className="space-y-3">
      {tracks.map((track, index) => {
        const artistName =
          typeof track.artist === "string"
            ? track.artist
            : track.artist?.name || track.artists?.map((a) => a.name).filter(Boolean).join(", ") || "Unknown Artist";

        return (
          <li
            key={track.videoId || `${track.name}-${index}`}
            className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3"
          >
            <div>
              <p className="font-medium text-white">{track.name || track.title || "Untitled"}</p>
              <p className="text-sm text-gray-400">{artistName}</p>
            </div>
            <span className="text-sm text-gray-400">{track.duration || "-"}</span>
          </li>
        );
      })}
    </ol>
  );
}
