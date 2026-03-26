export type Artist = {
  id: string;
  name: string;
};

export type Track = {
  id: string;
  videoId: string;
  title: string;
  artist: string;
  album?: string;
  thumbnail: string;
  duration: string;
  dateAdded?: string;
};

export type Playlist = {
  id: string;
  name: string;
  description?: string;
  cover?: string;
  tracks: Track[];
  createdAt: string;
};
