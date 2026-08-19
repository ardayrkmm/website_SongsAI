import styles from './PersonalityPage.module.css';

export const PersonalityPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.dot}></span> ANALYSIS COMPLETE
        </div>
        <h1 className={styles.title}>THE NIGHT EXPLORER</h1>
        <p className={styles.subtitle}>
          You are drawn to energetic, atmospheric, and emotionally intense music. Your acoustic fingerprint reveals a seeker of deep rhythms and expansive soundscapes.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.signatureCard}>
          <div className={styles.cardHeader}>
            <h3>Acoustic Signature</h3>
            <div className={styles.infoIcon}>i</div>
          </div>
          
          <div className={styles.radarWrapper}>
            <svg viewBox="0 0 200 200" className={styles.radarChart}>
              <polygon points="100,20 180,60 180,140 100,180 20,140 20,60" className={styles.radarGrid} />
              <polygon points="100,60 140,80 140,120 100,140 60,120 60,80" className={styles.radarGrid} />
              <line x1="100" y1="100" x2="100" y2="20" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="180" y2="60" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="180" y2="140" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="100" y2="180" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="20" y2="140" className={styles.radarAxis} />
              <line x1="100" y1="100" x2="20" y2="60" className={styles.radarAxis} />
              
              <polygon points="100,30 130,90 160,130 100,160 80,120 40,70" className={styles.radarData} />
              <circle cx="100" cy="30" r="3" className={styles.radarPoint} />
              <circle cx="130" cy="90" r="3" className={styles.radarPoint} />
              <circle cx="160" cy="130" r="3" className={styles.radarPoint} />
              <circle cx="100" cy="160" r="3" className={styles.radarPoint} />
              <circle cx="80" cy="120" r="3" className={styles.radarPoint} />
              <circle cx="40" cy="70" r="3" className={styles.radarPoint} />
            </svg>
            <span className={styles.radarLabel} style={{top: '0', left: '50%', transform: 'translate(-50%, -10px)'}}>ENERGY (90%)</span>
            <span className={styles.radarLabel} style={{top: '50%', right: '0', transform: 'translate(10px, -50%)'}}>DA</span>
            <span className={styles.radarLabel} style={{bottom: '0', left: '50%', transform: 'translate(-50%, 10px)'}}>VALENCE (65%)</span>
            <span className={styles.radarLabel} style={{top: '50%', left: '0', transform: 'translate(-10px, -50%)'}}>%)</span>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 12"></path></svg>
              Profile Summary
            </div>
            <p>
              Your listening patterns indicate a strong gravitational pull towards tracks built on synthetic textures and driving sub-bass. You tend to favor minor keys that evoke a sense of nocturnal exploration. Unlike standard pop listeners, your tolerance for long, evolving instrumental passages is exceptionally high, scoring in the top 4% of our user base.
            </p>
            <div className={styles.summaryFooter}>
              <button className={styles.primaryBtn}>
                Explore Music Like Yours
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          <div className={styles.bottomRow}>
            <div className={styles.metricsCard}>
              <h3>Metrics</h3>
              <div className={styles.metricList}>
                <div className={styles.metricItem}>
                  <div className={styles.metricTop}>
                    <span>BPM Preference</span>
                    <span className={styles.metricVal}>120-135</span>
                  </div>
                  <div className={styles.barWrap}><div className={styles.barFill} style={{width:'70%', backgroundColor:'var(--color-secondary)'}}></div></div>
                </div>
                <div className={styles.metricItem}>
                  <div className={styles.metricTop}>
                    <span>Instrumentalness</span>
                    <span className={styles.metricVal}>High</span>
                  </div>
                  <div className={styles.barWrap}><div className={styles.barFill} style={{width:'85%', backgroundColor:'var(--color-secondary)'}}></div></div>
                </div>
                <div className={styles.metricItem}>
                  <div className={styles.metricTop}>
                    <span>Vocal Presence</span>
                    <span className={styles.metricVal} style={{color:'var(--color-on-surface-variant)'}}>Low</span>
                  </div>
                  <div className={styles.barWrap}><div className={styles.barFill} style={{width:'30%', backgroundColor:'var(--color-outline)'}}></div></div>
                </div>
              </div>
            </div>

            <div className={styles.genresCard}>
              <h3>Dominant Genres</h3>
              <div className={styles.pills}>
                <span className={styles.pill}><span className={styles.dotSecondary}></span> Dark Synthwave</span>
                <span className={styles.pill}><span className={styles.dotSecondary}></span> Ambient Techno</span>
                <span className={styles.pill}><span className={styles.dotSecondary}></span> Post-Rock</span>
                <span className={styles.pill}>Industrial</span>
                <span className={styles.pill}><span className={styles.dotSecondary}></span> Deep House</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
