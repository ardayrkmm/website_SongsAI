// Utility to generate deterministic features based on a string (trackId)
// This simulates fetching Audio Features for a track, since Spotify deprecated the Audio Features endpoint.

export function getAudioFeaturesForTrack(trackId: string): Record<string, number> {
  // Simple hash function for deterministic randomness
  let hash = 0;
  for (let i = 0; i < trackId.length; i++) {
    hash = Math.imul(31, hash) + trackId.charCodeAt(i) | 0;
  }
  
  // PRNG based on hash
  let seed = hash;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // Generate features between 0.0 and 1.0 (except tempo)
  return {
    danceability: random() * 0.8 + 0.1, // 0.1 - 0.9
    energy: random() * 0.8 + 0.1,
    valence: random() * 0.8 + 0.1,
    tempo: 60 + random() * 100, // 60 - 160 BPM
    acousticness: random() * 0.9,
    instrumentalness: random() * 0.8
  };
}
