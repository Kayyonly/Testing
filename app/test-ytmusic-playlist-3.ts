import { getYTMusicClient } from "../lib/ytmusic";

async function testPlaylist3() {
  const ytmusic = await getYTMusicClient();
  const playlist = await ytmusic.getPlaylist("RDCLAK5uy_kx8X-example");

  console.log("[test-ytmusic-playlist-3] Playlist:", playlist);
}

testPlaylist3().catch((error) => console.error("[test-ytmusic-playlist-3] Error:", error));
