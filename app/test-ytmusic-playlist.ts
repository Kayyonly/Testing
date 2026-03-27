import { getYTMusicClient } from "../lib/ytmusic";

async function testPlaylist() {
  const ytmusic = await getYTMusicClient();
  const playlist = await ytmusic.getPlaylist("PL4fGSI1pDJn5rWitrRWFKdm-ulaFiIyoK");

  console.log("[test-ytmusic-playlist] Playlist data:", playlist);
}

testPlaylist().catch((error) => console.error("[test-ytmusic-playlist] Error:", error));
