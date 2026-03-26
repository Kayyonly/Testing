'use client';

import { Check, Pause, Play, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function PlayerBar() {
  const currentTrack = useStore((state) => state.currentTrack);
  const isPlaying = useStore((state) => state.isPlaying);
  const togglePlay = useStore((state) => state.togglePlay);
  const toggleLibrary = useStore((state) => state.toggleLibrary);
  const isTrackSaved = useStore((state) =>
    state.currentTrack ? state.isTrackSaved(state.currentTrack.id) : false,
  );

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-white/70 px-6 py-3 backdrop-blur-md dark:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-apple-gray-900 dark:text-white">{currentTrack.title}</p>
          <p className="text-xs text-apple-gray-500">{currentTrack.artist}</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={togglePlay} className="rounded-full bg-black p-2 text-white dark:bg-white dark:text-black">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
          </button>
          <button onClick={() => toggleLibrary(currentTrack)} className="rounded-full p-2 text-apple-gray-500 hover:bg-black/5 dark:hover:bg-white/10">
            {isTrackSaved ? <Check className="h-4 w-4 text-apple-red-500" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
