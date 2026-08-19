const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let accessToken = '';
let tokenExpirationTime = 0;

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  coverUrl: string;
  previewUrl: string | null;
  durationMs: number;
}

const getAccessToken = async (): Promise<string> => {
  // Return cached token if it's still valid
  if (accessToken && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    console.warn("Spotify credentials not found. Using mock data.");
    return '';
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    if (data.access_token) {
      accessToken = data.access_token;
      // Set expiration to slightly before actual expiry (usually 3600 seconds)
      tokenExpirationTime = Date.now() + (data.expires_in - 60) * 1000;
      return accessToken;
    }
    throw new Error('Failed to get Spotify token');
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return '';
  }
};

export const searchTracks = async (query: string, limit = 10): Promise<SpotifyTrack[]> => {
  const token = await getAccessToken();
  
  if (!token) {
    // Return mock data if no API keys
    return [
      { id: '1', name: 'Mock Result 1', artist: 'Mock Artist', album: 'Mock Album', coverUrl: '', previewUrl: null, durationMs: 200000 },
      { id: '2', name: 'Mock Result 2', artist: 'Mock Artist', album: 'Mock Album', coverUrl: '', previewUrl: null, durationMs: 210000 }
    ];
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (data.tracks && data.tracks.items) {
      return data.tracks.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        artist: item.artists.map((a: any) => a.name).join(', '),
        album: item.album.name,
        coverUrl: item.album.images[0]?.url || '',
        previewUrl: item.preview_url,
        durationMs: item.duration_ms
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};

// We can use a generic search or specifically look for playlists/categories to simulate "Trending"
export const getTrendingTracks = async (): Promise<SpotifyTrack[]> => {
  const token = await getAccessToken();
  
  if (!token) {
    return [
      { id: 'mock-1', name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', coverUrl: '', previewUrl: null, durationMs: 200000 },
      { id: 'mock-2', name: 'As It Was', artist: 'Harry Styles', album: 'Harrys House', coverUrl: '', previewUrl: null, durationMs: 167000 },
    ];
  }

  try {
    // Spotify doesn't have a direct "Global Top 50" endpoint for client_credentials easily without a playlist ID
    // So we search for "Top Hits" and grab some tracks to simulate trending
    const response = await fetch(`https://api.spotify.com/v1/search?q=top%20hits&type=playlist&limit=1`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    if (data.playlists?.items?.[0]?.id) {
      const playlistId = data.playlists.items[0].id;
      const tracksRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const tracksData = await tracksRes.json();
      
      if (tracksData.items) {
        return tracksData.items.map((item: any) => {
          const track = item.track;
          return {
            id: track.id,
            name: track.name,
            artist: track.artists.map((a: any) => a.name).join(', '),
            album: track.album.name,
            coverUrl: track.album.images[0]?.url || '',
            previewUrl: track.preview_url,
            durationMs: track.duration_ms
          };
        });
      }
    }
    return [];
  } catch (error) {
    console.error('Error fetching trending tracks:', error);
    return [];
  }
};

export const getRecommendationsByArtist = async (artistName: string, limit = 3): Promise<SpotifyTrack[]> => {
  const token = await getAccessToken();
  
  if (!token) {
    return [
      { id: 'rec-1', name: 'Similar Track 1', artist: artistName, album: 'Album', coverUrl: '', previewUrl: null, durationMs: 200000 },
      { id: 'rec-2', name: 'Similar Track 2', artist: artistName, album: 'Album', coverUrl: '', previewUrl: null, durationMs: 200000 },
      { id: 'rec-3', name: 'Similar Track 3', artist: artistName, album: 'Album', coverUrl: '', previewUrl: null, durationMs: 200000 },
    ];
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=artist:${encodeURIComponent(artistName)}&type=track&limit=${limit + 5}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (data.tracks && data.tracks.items) {
      // Shuffle slightly and pick requested limit to give variety
      const items = data.tracks.items.sort(() => 0.5 - Math.random()).slice(0, limit);
      return items.map((item: any) => ({
        id: item.id,
        name: item.name,
        artist: item.artists.map((a: any) => a.name).join(', '),
        album: item.album.name,
        coverUrl: item.album.images[0]?.url || '',
        previewUrl: item.preview_url,
        durationMs: item.duration_ms
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};
