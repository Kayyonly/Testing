'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Artist, Playlist, Track } from '@/types/music';

type UserLibrary = {
  savedSongs: Track[];
  playlists: Playlist[];
  followedArtists: Artist[];
};

type MusicState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  userLibrary: UserLibrary;
  playTrack: (track: Track) => void;
  playTracks: (tracks: Track[], startTrack?: Track) => void;
  togglePlay: () => void;
  setIsPlaying: (value: boolean) => void;
  addToQueue: (track: Track) => void;
  playNext: (track: Track) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleLibrary: (track: Track) => 'liked' | 'unliked';
  isTrackSaved: (trackId: string) => boolean;
};

const initialLibrary: UserLibrary = {
  savedSongs: [],
  playlists: [],
  followedArtists: [],
};

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      isPlaying: false,
      queue: [],
      userLibrary: initialLibrary,
      playTrack: (track) => {
        set((state) => {
          const existsInQueue = state.queue.some((item) => item.id === track.id);
          const nextQueue = existsInQueue ? state.queue : [track, ...state.queue];
          return {
            currentTrack: track,
            isPlaying: true,
            queue: nextQueue,
          };
        });
      },
      playTracks: (tracks, startTrack) => {
        if (!tracks.length) return;
        set({
          queue: tracks,
          currentTrack: startTrack || tracks[0],
          isPlaying: true,
        });
      },
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setIsPlaying: (value) => set({ isPlaying: value }),
      addToQueue: (track) => {
        set((state) => ({ queue: [...state.queue, track] }));
      },
      playNext: (track) => {
        set((state) => {
          if (!state.currentTrack) {
            return { queue: [track, ...state.queue] };
          }

          const currentIndex = state.queue.findIndex((item) => item.id === state.currentTrack?.id);
          if (currentIndex === -1) {
            return { queue: [state.currentTrack, track, ...state.queue] };
          }

          const nextQueue = [...state.queue];
          nextQueue.splice(currentIndex + 1, 0, track);
          return { queue: nextQueue };
        });
      },
      nextTrack: () => {
        set((state) => {
          if (!state.currentTrack || !state.queue.length) return state;
          const currentIndex = state.queue.findIndex((item) => item.id === state.currentTrack?.id);
          const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % state.queue.length;
          return { currentTrack: state.queue[nextIndex], isPlaying: true };
        });
      },
      prevTrack: () => {
        set((state) => {
          if (!state.currentTrack || !state.queue.length) return state;
          const currentIndex = state.queue.findIndex((item) => item.id === state.currentTrack?.id);
          const prevIndex = currentIndex <= 0 ? state.queue.length - 1 : currentIndex - 1;
          return { currentTrack: state.queue[prevIndex], isPlaying: true };
        });
      },
      toggleLibrary: (track) => {
        const savedSongs = get().userLibrary.savedSongs;
        const trackExists = savedSongs.some((item) => item.id === track.id);

        set((state) => ({
          userLibrary: {
            ...state.userLibrary,
            savedSongs: trackExists
              ? state.userLibrary.savedSongs.filter((item) => item.id !== track.id)
              : [{ ...track, dateAdded: track.dateAdded ?? new Date().toISOString() }, ...state.userLibrary.savedSongs],
          },
        }));

        return trackExists ? 'unliked' : 'liked';
      },
      isTrackSaved: (trackId) => get().userLibrary.savedSongs.some((track) => track.id === trackId),
    }),
    {
      name: 'apple-music-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userLibrary: state.userLibrary,
        queue: state.queue,
        currentTrack: state.currentTrack,
        isPlaying: state.isPlaying,
      }),
    },
  ),
);
