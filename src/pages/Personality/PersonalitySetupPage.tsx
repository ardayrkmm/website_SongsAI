import { Link } from 'react-router-dom';
import styles from './PersonalitySetupPage.module.css';

export const PersonalitySetupPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>What does your music say about you?</h1>
        <p className={styles.subtitle}>Select several songs to discover your Music Personality.</p>
      </header>

      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.searchIcon}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search for tracks, artists, or albums..." className={styles.searchInput} />
          <button className={styles.micBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
          </button>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.leftCol}>
          <div className={styles.selectedBox}>
            <div className={styles.boxHeader}>
              <h3>Selected Tracks</h3>
              <span className={styles.requirement}>3 / 5 REQUIRED</span>
            </div>
            <div className={styles.pillsList}>
              <div className={styles.trackPill}>
                <div className={styles.pillThumb}></div>
                <span>Neon Nights - The Midnight</span>
                <button className={styles.removeBtn}>✕</button>
              </div>
              <div className={styles.trackPill}>
                <div className={styles.pillThumb}></div>
                <span>Binary - Logic</span>
                <button className={styles.removeBtn}>✕</button>
              </div>
              <div className={styles.trackPill}>
                <div className={styles.pillThumb}></div>
                <span>Deep Dive - Oceanus</span>
                <button className={styles.removeBtn}>✕</button>
              </div>
            </div>
          </div>

          <div className={styles.recentSection}>
            <h4 className={styles.recentTitle}>Recently Analyzed</h4>
            <div className={styles.recentList}>
              <div className={styles.recentItem}>
                <div className={styles.recentThumb1}></div>
                <div className={styles.recentInfo}>
                  <p className={styles.recentName}>Cyber City Rhythms</p>
                  <p className={styles.recentArtist}>Neon Pulse</p>
                </div>
                <button className={styles.addBtn}>+</button>
              </div>
              <div className={styles.recentItem}>
                <div className={styles.recentThumb2}></div>
                <div className={styles.recentInfo}>
                  <p className={styles.recentName}>Frequency Modulator</p>
                  <p className={styles.recentArtist}>Synth Wave</p>
                </div>
                <button className={styles.addBtn}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.infoCard}>
            <div className={styles.waveGraphic}>
              <div className={styles.wBar}></div><div className={styles.wBar}></div><div className={styles.wBar}></div><div className={styles.wBar}></div><div className={styles.wBar}></div>
            </div>
            <p>We analyze tempo, key, energy, and acousticness to build your unique psychological profile.</p>
          </div>
          
          <Link to="/personality/report" className={styles.revealBtn}>
            Reveal My Music Personality
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
