import styles from './ExplorePage.module.css';
import { SearchIcon } from '../../components/ui/Icons';

export const ExplorePage = () => {
  return (
    <div className={styles.exploreContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Explore Music</h1>
        <p className={styles.subtitle}>Discover songs through AI-powered music intelligence.</p>
      </header>

      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <SearchIcon />
          <input type="text" placeholder="Search songs, artists, or albums..." className={styles.searchInput} />
          <div className={styles.shortcut}>
            <kbd>⌘</kbd> <kbd>K</kbd>
          </div>
        </div>
        
        <div className={styles.filters}>
          <div className={styles.filterIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
          </div>
          <div className={styles.pills}>
            {['Genre', 'Mood', 'Energy', 'Danceability', 'Era', 'Popularity'].map(filter => (
              <button key={filter} className={styles.pillBtn}>{filter}</button>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.trendingSection}>
        <div className={styles.sectionHeader}>
          <h2>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            Trending Analysis
          </h2>
        </div>
        
        <div className={styles.trendingGrid}>
          {[
            { title: "Synaptic Resonance", artist: "Neural Network feat. Data", match: "98%", tags: [{name:"EUPHORIC", color: "var(--color-secondary)"}, {name:"HIGH ENERGY", color: "var(--color-primary)"}] },
            { title: "Abyssal Drift", artist: "Silent Construct", match: "92%", tags: [{name:"MELANCHOLIC", color: "var(--color-outline)"}, {name:"LOW ENERGY", color: "var(--color-outline-variant)"}] },
            { title: "Unknown", artist: "Unknown", match: "0%", placeholder: true }
          ].map((item, i) => (
            <div key={i} className={item.placeholder ? `${styles.trendCard} ${styles.placeholderCard}` : styles.trendCard}>
              {!item.placeholder && (
                <>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardTop}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.artist}</p>
                      </div>
                      <div className={styles.matchBadge}>{item.match} MATCH</div>
                    </div>
                    <div className={styles.tags}>
                      {item.tags?.map((tag, j) => (
                        <span key={j} className={styles.tag} style={{ backgroundColor: tag.color }}>{tag.name}</span>
                      ))}
                    </div>
                  </div>
                  <button className={styles.analyzeBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
                    Analyze Track
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
