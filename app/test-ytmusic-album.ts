<<<<<<< codex/generate-next.js-project-folder-structure-kgoced
import { getYTMusicClient } from "@/lib/ytmusic";
=======
import { getYTMusicClient } from "../lib/ytmusic";
>>>>>>> main

async function testAlbum() {
  const ytmusic = await getYTMusicClient();
  const album = await ytmusic.getAlbum("MPREb_1234567890");

  console.log("[test-ytmusic-album] Album:", album);
}

testAlbum().catch((error) => console.error("[test-ytmusic-album] Error:", error));
