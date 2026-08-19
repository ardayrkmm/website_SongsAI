// Utility to generate deterministic features based on a string (trackId)
// This simulates fetching Audio Features for a track, since Spotify deprecated the Audio Features endpoint.

export const getAudioFeaturesForTrack = (trackId: string) => {
  // We don't have Spotify API features endpoint in this demo,
  // so we'll generate deterministic pseudo-random features based on trackId
  
  // Simple string hash function
  let hash = 0;
  for (let i = 0; i < trackId.length; i++) {
    hash = ((hash << 5) - hash) + trackId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  hash = Math.abs(hash);

  // Generate features between 0.0 and 1.0 (except tempo)
  return {
    danceability: 0.4 + (hash % 60) / 100, // 0.4 - 1.0
    energy: 0.5 + ((hash * 2) % 50) / 100, // 0.5 - 1.0
    key: hash % 12, // 0 - 11
    loudness: -10 + ((hash * 3) % 80) / 10, // -10.0 - -2.0
    mode: hash % 2, // 0 or 1
    speechiness: ((hash * 7) % 30) / 100, // 0.0 - 0.3
    acousticness: ((hash * 3) % 40) / 100, // 0.0 - 0.4
    instrumentalness: ((hash * 5) % 20) / 100, // 0.0 - 0.2
    liveness: 0.1 + ((hash * 11) % 30) / 100, // 0.1 - 0.4
    valence: 0.3 + ((hash * 7) % 70) / 100, // 0.3 - 1.0
    tempo: 90 + (hash % 90), // 90 - 180 BPM
  };
}
