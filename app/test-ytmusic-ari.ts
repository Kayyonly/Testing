import { getYTMusicClient } from "@/lib/ytmusic";
import { getYTMusicClient } from "../lib/ytmusic";

async function testYtMusicAri() {
  const ytmusic = await getYTMusicClient();
  const artist = await ytmusic.getArtist("UCbW18JZRgko_mOGm5er8Yzg");

  console.log("[test-ytmusic-ari] Artist (Ari sample):", artist);
}

testYtMusicAri().catch((error) => console.error("[test-ytmusic-ari] Error:", error));
