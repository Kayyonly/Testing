import type { Artist, Playlist, Track } from '@/types/music';

export const communityPlaylists: Playlist[] = [
  {
    id: 'community-1',
    name: 'Night Drive Mix',
    description: 'Synth-pop dan chill electronic buat malam hari.',
    cover: 'https://placehold.co/300x300?text=Night+Drive',
    createdAt: new Date().toISOString(),
    tracks: [],
  },
  {
    id: 'community-2',
    name: 'Indie Morning',
    description: 'Pilihan lagu ringan untuk mulai hari.',
    cover: 'https://placehold.co/300x300?text=Indie+Morning',
    createdAt: new Date().toISOString(),
    tracks: [],
  },
];

export const featuredArtists: Artist[] = [
  { id: 'artist-1', name: 'Ari Abdul' },
  { id: 'artist-2', name: 'NIKI' },
  { id: 'artist-3', name: 'The 1975' },
];

export const mockTracks: Track[] = [
  {
    id: 'track-1',
    videoId: 'dQw4w9WgXcQ',
    title: 'Sample Song One',
    artist: 'Sample Artist',
    album: 'Sample Album',
    thumbnail: 'https://placehold.co/300x300?text=Track+1',
    duration: '3:41',
    dateAdded: new Date().toISOString(),
  },
];
