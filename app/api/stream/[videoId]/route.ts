import { Readable } from 'node:stream';
import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } },
) {
  const videoId = params.videoId;

  if (!videoId || !ytdl.validateID(videoId)) {
    return NextResponse.json({ error: 'videoId tidak valid.' }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(videoId);

    const range = request.headers.get('range') || '';
    let start = 0;
    let end: number | undefined;

    if (range) {
      const [startText, endText] = range.replace(/bytes=/, '').split('-');
      start = Number(startText) || 0;
      end = endText ? Number(endText) : undefined;
    }

    const stream = ytdl.downloadFromInfo(info, {
      filter: 'audioonly',
      quality: 'highestaudio',
      range: start || end !== undefined ? { start, end } : undefined,
      highWaterMark: 1 << 25,
    });

    const webStream = Readable.toWeb(stream as unknown as Readable);

    const headers = new Headers({
      'Content-Type': 'audio/mpeg',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store',
    });

    if (range) {
      return new Response(webStream, { status: 206, headers });
    }

    return new Response(webStream, { status: 200, headers });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Gagal melakukan stream audio.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
