'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useStore } from '../store/useStore';
import SongRow from './SongRow';

export default function LibraryPage() {
  const savedSongs = useStore((state) => state.userLibrary.savedSongs);
  const playTrack = useStore((state) => state.playTrack);

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="space-y-8 px-6 pb-32 pt-6"
    >
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-apple-gray-900 dark:text-white">
          Your Library
        </h1>
        <p className="text-sm text-apple-gray-500">Recently Added · Songs</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-apple-gray-900 dark:text-white">Recently Added</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {savedSongs.slice(0, 6).map((track) => (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              key={track.id}
              onClick={() => playTrack(track)}
              className="group relative overflow-hidden rounded-xl bg-white p-3 text-left shadow-md transition dark:bg-white/5"
            >
              <div className="relative mb-3 aspect-square overflow-hidden rounded-lg">
                <Image src={track.thumbnail} alt={track.title} fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
                  <div className="rounded-full bg-white p-2 text-black shadow-md">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="truncate text-sm font-medium text-apple-gray-900 dark:text-white">{track.title}</p>
              <p className="truncate text-xs text-apple-gray-500">{track.artist}</p>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="grid grid-cols-[minmax(220px,2fr)_1fr_140px_100px_96px] px-3 text-xs font-semibold uppercase tracking-wide text-apple-gray-500">
          <p>Title</p>
          <p>Album</p>
          <p>Date Added</p>
          <p>Duration</p>
          <p className="text-right">Actions</p>
        </div>

        <div className="space-y-1">
          {savedSongs.length > 0 ? (
            savedSongs.map((track, index) => <SongRow key={track.id} track={track} index={index} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-apple-gray-500/40 p-8 text-center text-sm text-apple-gray-500">
              Belum ada lagu di library. Coba cari lagu lalu tekan ikon hati.
            </div>
          )}
        </div>
      </section>
    </motion.main>
  );
}
