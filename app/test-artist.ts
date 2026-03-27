import { getYTMusicClient } from "@/lib/ytmusic";

async function testArtist() {
  const ytmusic = await getYTMusicClient();
  const artist = await ytmusic.getArtist("UC-9-kyTW8ZkZNDHQJ6FgpwQ");

  console.log("[test-artist] Artist data:", artist);
}

testArtist().catch((error) => console.error("[test-artist] Error:", error));
