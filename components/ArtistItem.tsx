'use client';

import Link from 'next/link';
import type { Artist } from '@/types/music';

export default function ArtistItem({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artist/${artist.id}`} className="rounded-full border border-black/5 px-4 py-2 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
      {artist.name}
    </Link>
  );
}
