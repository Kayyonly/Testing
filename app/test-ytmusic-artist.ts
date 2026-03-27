import { getYTMusicClient } from "@/lib/ytmusic";

async function testArtistDetail() {
  const ytmusic = await getYTMusicClient();
  const artist = await ytmusic.getArtist("UCqECaJ8Gagnn7YCbPEzWH6g");

  console.log("[test-ytmusic-artist] Artist detail:", artist);
}

testArtistDetail().catch((error) => console.error("[test-ytmusic-artist] Error:", error));
