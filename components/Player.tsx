'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Pause, Play, Plus, SkipBack, SkipForward } from 'lucide-react';
import { useMusicStore } from '@/lib/store';

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00';
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${min}:${sec}`;
}

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = useMusicStore((state) => state.currentTrack);
  const isPlaying = useMusicStore((state) => state.isPlaying);
  const setIsPlaying = useMusicStore((state) => state.setIsPlaying);
  const togglePlay = useMusicStore((state) => state.togglePlay);
  const nextTrack = useMusicStore((state) => state.nextTrack);
  const prevTrack = useMusicStore((state) => state.prevTrack);
  const toggleLibrary = useMusicStore((state) => state.toggleLibrary);
  const isTrackSaved = useMusicStore((state) => (state.currentTrack ? state.isTrackSaved(state.currentTrack.id) : false));

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerError, setPlayerError] = useState('');

  const source = useMemo(() => {
    if (!currentTrack?.videoId) return '';
    return `/api/stream/${currentTrack.videoId}`;
  }, [currentTrack?.videoId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.load();
    setProgress(0);
    setDuration(0);
    setPlayerError('');

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('[player] play error', error);
        setPlayerError('Klik tombol Play untuk memulai audio.');
        setIsPlaying(false);
      });
    }
  }, [currentTrack?.videoId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('[player] play error', error);
        setPlayerError('Browser memblokir autoplay. Klik Play lagi.');
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 border-t border-white/10 bg-white/80 px-6 py-3 backdrop-blur-md dark:bg-black/70 md:bottom-0">
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onEnded={() => nextTrack()}
        onError={() => {
          setPlayerError('Gagal memutar audio. Cek /api/stream dan videoId.');
          setIsPlaying(false);
        }}
      >
        <source src={source} type="audio/mpeg" />
      </audio>

      <div className="mx-auto flex max-w-6xl flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-apple-gray-900 dark:text-white">{currentTrack.title}</p>
            <p className="text-xs text-apple-gray-500">{currentTrack.artist}</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={prevTrack} className="rounded-full p-2 text-apple-gray-500 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Previous track">
              <SkipBack className="h-4 w-4" />
            </button>
            <button onClick={togglePlay} className="rounded-full bg-black p-2 text-white dark:bg-white dark:text-black" aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
            </button>
            <button onClick={nextTrack} className="rounded-full p-2 text-apple-gray-500 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Next track">
              <SkipForward className="h-4 w-4" />
            </button>
            <button onClick={() => toggleLibrary(currentTrack)} className="rounded-full p-2 text-apple-gray-500 hover:bg-black/5 dark:hover:bg-white/10">
              {isTrackSaved ? <Check className="h-4 w-4 text-apple-red-500" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-apple-gray-500">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={(event) => {
              const value = Number(event.target.value);
              setProgress(value);
              if (audioRef.current) audioRef.current.currentTime = value;
            }}
            className="w-full"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {playerError ? <p className="text-xs text-red-500">{playerError}</p> : null}
      </div>
    </div>
  );
}
