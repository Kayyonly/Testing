import { getYTMusicClient } from "@/lib/ytmusic";

async function testPlaylistType() {
  const ytmusic = await getYTMusicClient();
  const playlist = await ytmusic.getPlaylist("PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj");

  console.log("[test-ytmusic-playlist-type] Type:", typeof playlist, playlist?.privacy);
}

testPlaylistType().catch((error) => console.error("[test-ytmusic-playlist-type] Error:", error));
