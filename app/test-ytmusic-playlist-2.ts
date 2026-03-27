import { getYTMusicClient } from "../lib/ytmusic";

async function testPlaylist2() {
  const ytmusic = await getYTMusicClient();
  const playlist = await ytmusic.getPlaylist("PLFgquLnL59anNXuf1M87FT1O169Qt6-Lp");

  console.log("[test-ytmusic-playlist-2] Playlist:", playlist);
}

testPlaylist2().catch((error) => console.error("[test-ytmusic-playlist-2] Error:", error));
