import styles from './AnalysisPage.module.css';

export const AnalysisPage = () => {
  return (
    <div className={styles.analysisContainer}>
      <header className={styles.headerRow}>
        <div className={styles.artworkSection}>
          <div className={styles.artworkPlaceholder}>
            {/* Abstract visual for album art */}
            <div className={styles.artBg}></div>
            <div className={styles.artControls}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.tagsRow}>
            <span className={styles.tag}>SYNTH-POP</span>
            <span className={styles.tag}>2019</span>
            <span className={styles.tag}>3:20</span>
          </div>
          
          <h1 className={styles.songTitle}>Blinding Lights</h1>
          <h2 className={styles.artistName}>The Weeknd</h2>

          <div className={styles.actionRow}>
            <button className={styles.primaryBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
              Analyze with AI
            </button>
            <button className={styles.iconBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>
          </div>
        </div>
      </header>

      <section className={styles.profileSection}>
        <h3 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.13 15.57a10 10 0 1 0 1.49-8.4L2.5 8M2.5 22v-6h6"/></svg>
          Sonic Profile
        </h3>
        
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>ENERGY</span>
              <span className={styles.metricValue}>85%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '85%', backgroundColor: 'var(--color-secondary)' }}></div>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>DANCEABILITY</span>
              <span className={styles.metricValue} style={{color: 'var(--color-tertiary)'}}>70%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '70%', backgroundColor: 'var(--color-tertiary)' }}></div>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>VALENCE</span>
              <span className={styles.metricValue} style={{color: 'var(--color-error)'}}>90%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '90%', backgroundColor: 'var(--color-error)' }}></div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>ACOUSTICNESS</span>
              <span className={styles.metricValue}>5%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '5%', backgroundColor: 'var(--color-outline)' }}></div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>INSTRUMENTALNESS</span>
              <span className={styles.metricValue}>2%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '2%', backgroundColor: 'var(--color-outline)' }}></div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader} style={{marginBottom: 0}}>
              <div>
                <span className={styles.metricLabel} style={{display:'block', marginBottom: '4px'}}>TEMPO</span>
                <span className={styles.metricValue} style={{fontSize: '28px'}}>171 <span style={{fontSize: '12px', color:'var(--color-on-surface-variant)', fontWeight:'normal'}}>BPM</span></span>
              </div>
              <div className={styles.tempoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
