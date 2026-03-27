import { notFound } from "next/navigation";
import AlbumClient from "./AlbumClient";
import { getYTMusicClient } from "../../../lib/ytmusic";

type AlbumPageProps = {
  params: {
    id: string;
  };
};

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { id } = params;

  try {
    const ytmusic = await getYTMusicClient();
    const album = await ytmusic.getAlbum(id);

    if (!album) {
      notFound();
    }

    return (
      <main className="mx-auto max-w-5xl p-6">
        <AlbumClient album={album} />
      </main>
    );
  } catch (error) {
    console.error("[album-page] Failed to fetch album", error);
    notFound();
  }
}
