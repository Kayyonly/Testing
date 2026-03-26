import { NextRequest, NextResponse } from 'next/server';
import { getYTMusicClient } from '../../../lib/ytmusic';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim();

  if (!q) {
    return NextResponse.json({ error: 'Query parameter q wajib diisi.' }, { status: 400 });
  }

  try {
    const ytmusic = await getYTMusicClient();
    const results = await ytmusic.searchSongs(q);

    const tracks = results.map((item: any) => ({
      id: item.videoId,
      videoId: item.videoId,
      title: item.name,
      artist: item.artist?.name ?? 'Unknown Artist',
      thumbnail: item.thumbnails?.[0]?.url ?? '',
      duration: item.duration ?? '-',
    }));

    return NextResponse.json({ tracks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Gagal mengambil data dari YouTube Music.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
