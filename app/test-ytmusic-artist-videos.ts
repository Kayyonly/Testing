import { getYTMusicClient } from "../lib/ytmusic";

async function testArtistVideos() {
  const ytmusic = await getYTMusicClient();
  const artist = await ytmusic.getArtist("UCq-Fj5jknLsUf-MWSy4_brA");

  console.log("[test-ytmusic-artist-videos] Videos:", artist?.videos);
}

testArtistVideos().catch((error) => console.error("[test-ytmusic-artist-videos] Error:", error));
