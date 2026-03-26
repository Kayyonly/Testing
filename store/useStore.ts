'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Artist, Playlist, Track } from '../types/music';

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
  togglePlay: () => void;
  addToQueue: (track: Track) => void;
  playNext: (track: Track) => void;
  toggleLibrary: (track: Track) => 'liked' | 'unliked';
  isTrackSaved: (trackId: string) => boolean;
};

const initialLibrary: UserLibrary = {
  savedSongs: [],
  playlists: [],
  followedArtists: [],
};

export const useStore = create<MusicState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      isPlaying: false,
      queue: [],
      userLibrary: initialLibrary,
      playTrack: (track) => {
        set((state) => {
          const existsInQueue = state.queue.some((item) => item.id === track.id);
          return {
            currentTrack: track,
            isPlaying: true,
            queue: existsInQueue ? state.queue : [track, ...state.queue],
          };
        });
      },
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      addToQueue: (track) => {
        set((state) => ({ queue: [...state.queue, track] }));
      },
      playNext: (track) => {
        set((state) => {
          if (!state.currentTrack) {
            return { queue: [track, ...state.queue] };
          }

          const currentIndex = state.queue.findIndex(
            (item) => item.id === state.currentTrack?.id,
          );

          if (currentIndex === -1) {
            return { queue: [state.currentTrack, track, ...state.queue] };
          }

          const nextQueue = [...state.queue];
          nextQueue.splice(currentIndex + 1, 0, track);

          return { queue: nextQueue };
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
              : [
                  {
                    ...track,
                    dateAdded: track.dateAdded ?? new Date().toISOString(),
                  },
                  ...state.userLibrary.savedSongs,
                ],
          },
        }));

        return trackExists ? 'unliked' : 'liked';
      },
      isTrackSaved: (trackId) =>
        get().userLibrary.savedSongs.some((track) => track.id === trackId),
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
