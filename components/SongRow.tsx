'use client';

import Image from 'next/image';
import { Heart, MoreHorizontal, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import type { Track } from '../types/music';

type SongRowProps = {
  track: Track;
  index: number;
};

export default function SongRow({ track, index }: SongRowProps) {
  const playTrack = useStore((state) => state.playTrack);
  const toggleLibrary = useStore((state) => state.toggleLibrary);
  const isTrackSaved = useStore((state) => state.isTrackSaved);

  const saved = isTrackSaved(track.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group grid grid-cols-[minmax(220px,2fr)_1fr_140px_100px_96px] items-center gap-3 rounded-xl px-3 py-2 tracking-tight even:bg-gray-50/80 hover:bg-black/5 dark:even:bg-white/5 dark:hover:bg-white/10"
    >
      <button
        onClick={() => playTrack(track)}
        className="flex items-center gap-3 text-left"
        aria-label={`Play ${track.title}`}
      >
        <div className="relative h-11 w-11 overflow-hidden rounded-lg shadow-sm">
          <Image src={track.thumbnail} alt={track.title} fill className="object-cover" />
          <div className="absolute inset-0 hidden items-center justify-center bg-black/35 group-hover:flex">
            <Play className="h-4 w-4 fill-white text-white" />
          </div>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-apple-gray-900 dark:text-white">{track.title}</p>
          <p className="truncate text-xs text-apple-gray-500">{track.artist}</p>
        </div>
      </button>

      <p className="truncate text-sm text-apple-gray-500">{track.album ?? 'Single'}</p>
      <p className="text-sm text-apple-gray-500">
        {track.dateAdded ? new Date(track.dateAdded).toLocaleDateString() : '-'}
      </p>
      <p className="text-sm text-apple-gray-500">{track.duration}</p>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => toggleLibrary(track)}
          aria-label={saved ? 'Remove from library' : 'Save to library'}
          className="rounded-full p-2 transition hover:bg-black/5 dark:hover:bg-white/10"
        >
          <Heart
            className={`h-4 w-4 ${saved ? 'fill-apple-red-500 text-apple-red-500' : 'text-apple-gray-500'}`}
          />
        </button>
        <button
          aria-label="More actions"
          className="rounded-full p-2 text-apple-gray-500 transition hover:bg-black/5 dark:hover:bg-white/10"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
