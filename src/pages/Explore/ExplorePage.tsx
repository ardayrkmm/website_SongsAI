import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '../../components/ui/Icons';
import { searchTracks, getTrendingTracks } from '../../services/api/spotifyService';
import type { SpotifyTrack } from '../../services/api/spotifyService';
import styles from './ExplorePage.module.css';

export const ExplorePage = () => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      const trending = await getTrendingTracks();
      setTracks(trending);
      setLoading(false);
    };
    fetchTrending();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setIsSearching(false);
      setLoading(true);
      const trending = await getTrendingTracks();
      setTracks(trending);
      setLoading(false);
      return;
    }

    setIsSearching(true);
    setLoading(true);
    const results = await searchTracks(query);
    setTracks(results);
    setLoading(false);
  };

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const handleAnalyze = (track: SpotifyTrack) => {
    navigate('/processing', { state: { track } });
  };

  return (
    <div className={styles.exploreContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Explore Music</h1>
        <p className={styles.subtitle}>Discover songs through AI-powered music intelligence.</p>
      </header>

      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchBar}>
          <SearchIcon />
          <input 
            type="text" 
            placeholder="Search songs, artists, or albums..." 
            className={styles.searchInput} 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" style={{ display: 'none' }}>Search</button>
          <div className={styles.shortcut}>
            <kbd>Enter</kbd>
          </div>
        </form>
        
        <div className={styles.filters}>
          <div className={styles.filterIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
          </div>
          <div className={styles.pills}>
            {['Genre', 'Mood', 'Energy', 'Danceability', 'Era', 'Popularity'].map(filter => (
              <button 
                key={filter} 
                className={`${styles.pillBtn} ${activeFilter === filter ? styles.pillActive : ''}`}
                onClick={() => handleFilterClick(filter)}
                style={activeFilter === filter ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' } : {}}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.trendingSection}>
        <div className={styles.sectionHeader}>
          <h2>
            {isSearching ? (
              <><SearchIcon /> Search Results</>
            ) : (
              <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> Trending Analysis</>
            )}
          </h2>
        </div>
        
        {loading ? (
          <div style={{ color: 'var(--color-on-surface-variant)', padding: '20px 0' }}>Loading tracks...</div>
        ) : (
          <div className={styles.trendingGrid}>
            {tracks.length > 0 ? tracks.map((track) => (
              <div key={track.id} className={styles.trendCard}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardTop}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      {track.coverUrl ? (
                        <img src={track.coverUrl} alt={track.album} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: 'var(--color-surface-container-high)' }} />
                      )}
                      <div>
                        <h3>{track.name}</h3>
                        <p>{track.artist}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className={styles.analyzeBtn} onClick={() => handleAnalyze(track)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
                  Analyze Track
                </button>
              </div>
            )) : (
              <div style={{ color: 'var(--color-on-surface-variant)' }}>No tracks found.</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
