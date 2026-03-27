import type { Artist, Playlist } from '@/types/music';

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
  { id: 'UCbW18JZRgko_mOGm5er8Yzg', name: 'Ari Abdul' },
  { id: 'UCqECaJ8Gagnn7YCbPEzWH6g', name: 'Taylor Swift' },
  { id: 'UC-9-kyTW8ZkZNDHQJ6FgpwQ', name: 'Various Artists' },
];
