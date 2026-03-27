import { NextResponse } from 'next/server';
import { getYTMusicClient } from '@/lib/ytmusic';

export async function GET() {
  try {
    const ytmusic = await getYTMusicClient();

    const [indonesia, global] = await Promise.all([
      ytmusic.searchSongs('Top Indonesia 2026'),
      ytmusic.searchSongs('Global Top Hits 2026'),
    ]);

    const tracks = [...indonesia, ...global].slice(0, 30).map((item: any) => ({
      id: item.videoId,
      videoId: item.videoId,
      title: item.name,
      artist: item.artist?.name ?? 'Unknown Artist',
      thumbnail: item.thumbnails?.[0]?.url ?? '',
      duration: item.duration ?? '-',
      album: item.album?.name ?? 'Single',
      dateAdded: new Date().toISOString(),
    }));

    return NextResponse.json({ tracks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Gagal mengambil data trending.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
