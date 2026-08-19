import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getFavoriteSongs } from '../../services/db/musicService';
import type { SavedTrack } from '../../services/db/musicService';
import { SearchIcon } from '../../components/ui/Icons';

export const HomePage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<SavedTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const favs = await getFavoriteSongs(user.uid);
        const sortedFavs = favs.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
        setFavorites(sortedFavs.slice(0, 3));
      }
      setLoading(false);
    };
    
    fetchData();
  }, [user]);

  const greeting = user?.displayName 
    ? `Welcome back, ${user.displayName.split(' ')[0]}` 
    : 'Welcome to Sonora AI';

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.status}>
          <span className={styles.statusDot}></span> SYSTEM ONLINE
        </div>
        <div className={styles.search}>
          <SearchIcon />
        </div>
      </header>

      <h1 className={styles.greeting}>{greeting}.</h1>

      <div className={styles.topSection}>
        <div className={styles.personalityCard}>
          <div className={styles.personalityContent}>
            <div className={styles.tag}>
              <span className={styles.dotSecondary}></span> YOUR MUSIC PERSONALITY
            </div>
            <h2>The Night Explorer</h2>
            <p>Your recent acoustic patterns suggest a preference for deep, atmospheric soundscapes with complex rhythmic structures. You lean heavily into ambient electronica post-midnight.</p>
            <button className={styles.btnOutline}>View Full Report</button>
          </div>
          <div className={styles.personalityGraphic}>
            <div className={styles.mockWaveform}></div>
          </div>
        </div>

        <div className={styles.metricsCard}>
          <div className={styles.metricsHeader}>
            <h3>SESSION METRICS</h3>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          </div>
          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>ANALYZED</span>
              <span className={styles.metricValue}>1,204 tracks</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>TOP MOOD</span>
              <span className={styles.metricValue} style={{color: 'var(--color-secondary)'}}>Atmospheric</span>
            </div>
          </div>
          <div className={styles.energyMeter}>
            <div className={styles.meterHeader}>
              <span className={styles.metricLabel}>AVG ENERGY</span>
              <span className={styles.metricValue}>68%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '68%' }}></div>
            </div>
            <div className={styles.meterLabels}>
              <span>Chill</span>
              <span>Intense</span>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2>Saved Favorites</h2>
          <a href="#" className={styles.viewAll}>View All</a>
        </div>
        {loading ? (
          <p style={{color: 'var(--color-on-surface-variant)'}}>Loading favorites...</p>
        ) : (
          <div className={styles.cardsScroll}>
            {favorites.length > 0 ? favorites.map((item) => (
              <div key={item.id} className={styles.trackCard}>
                <div className={styles.trackImage} style={item.coverUrl ? { backgroundImage: `url(${item.coverUrl})` } : {}}>
                  <div className={styles.matchBadge}>FAV</div>
                </div>
                <h4 className={styles.trackTitle}>{item.name}</h4>
                <p className={styles.trackArtist}>{item.artist}</p>
                <div className={styles.miniWaveform}>
                  <div className={styles.mBar}></div><div className={styles.mBar}></div><div className={styles.mBar}></div><div className={styles.mBar}></div>
                </div>
              </div>
            )) : (
              <p style={{color: 'var(--color-on-surface-variant)'}}>You haven't saved any tracks yet.</p>
            )}
          </div>
        )}
      </section>

      <section className={styles.recommendedSection}>
        <div className={styles.sectionHeader}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            Recommended by DNA
          </h2>
        </div>
        <div className={styles.dnaGrid}>
          {[
            { title: "Neural Ambient", desc: "Matches 85% of your rhythmic profile." },
            { title: "Deep Focus Frequencies", desc: "Aligns with your 'Atmospheric' mood." },
            { title: "Synthwave Blueprint", desc: "High tempo match based on recent history." }
          ].map((item, i) => (
            <div key={i} className={styles.dnaCard}>
              <div className={styles.dnaIcon}></div>
              <div className={styles.dnaInfo}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
              <button className={styles.playBtn} aria-label="Play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
