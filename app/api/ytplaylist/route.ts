import { NextRequest, NextResponse } from "next/server";
import { getYTMusicClient } from "@/lib/ytmusic";
import { getYTMusicClient } from "../../../lib/ytmusic";

export async function GET(request: NextRequest) {
  const playlistId = request.nextUrl.searchParams.get("id");

  if (!playlistId) {
    return NextResponse.json({ error: "Query id wajib diisi." }, { status: 400 });
  }

  try {
    const ytmusic = await getYTMusicClient();
    const playlist = await ytmusic.getPlaylist(playlistId);
    return NextResponse.json({ data: playlist }, { status: 200 });
  } catch (error) {
    console.error("[api/ytplaylist] Failed to fetch playlist", error);
    return NextResponse.json({ error: "Gagal mengambil data playlist." }, { status: 500 });
  }
}
