// Spotify unused variables removed to fix TS errors

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  coverUrl: string;
  previewUrl: string | null;
  durationMs: number;
  features?: {
    danceability: number;
    energy: number;
    valence: number;
    tempo: number;
    acousticness: number;
    instrumentalness: number;
  };
}

let localDataset: SpotifyTrack[] | null = null;

const loadLocalDataset = async (): Promise<SpotifyTrack[]> => {
  if (localDataset) return localDataset;
  try {
    const res = await fetch('/songs_db.json');
    if (!res.ok) throw new Error('Database not found');
    localDataset = await res.json();
    return localDataset || [];
  } catch (error) {
    console.error('Failed to load local dataset:', error);
    return [];
  }
};

export const searchTracks = async (query: string, limit = 10): Promise<SpotifyTrack[]> => {
  const dataset = await loadLocalDataset();
  if (!query.trim()) return dataset.slice(0, limit);
  
  const q = query.toLowerCase();
  const results = dataset.filter(track => 
    track.name.toLowerCase().includes(q) || 
    track.artist.toLowerCase().includes(q)
  );
  
  return results.slice(0, limit);
};

export const getTrendingTracks = async (): Promise<SpotifyTrack[]> => {
  const dataset = await loadLocalDataset();
  // Return random 10 tracks as trending to showcase variety
  const shuffled = [...dataset].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

export const getRecommendationsByArtist = async (artistName: string, limit = 3): Promise<SpotifyTrack[]> => {
  const dataset = await loadLocalDataset();
  const q = artistName.toLowerCase();
  
  const results = dataset.filter(track => track.artist.toLowerCase().includes(q));
  
  // If not enough results from same artist, mix in random ones
  if (results.length < limit) {
    const randoms = [...dataset].sort(() => 0.5 - Math.random()).slice(0, limit - results.length);
    return [...results, ...randoms].slice(0, limit);
  }
  
  return results.sort(() => 0.5 - Math.random()).slice(0, limit);
};
