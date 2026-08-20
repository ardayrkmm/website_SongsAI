import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { SpotifyTrack } from '../../services/api/spotifyService';
import styles from './AnalysisPage.module.css';

export const AnalysisPage = () => {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [randomTrack, setRandomTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    fetch('/songs_db.json')
      .then(res => res.json())
      .then(data => {
        setTracks(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && tracks.length > 0 && !randomTrack) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setRandomTrack(tracks[randomIndex] as unknown as SpotifyTrack);
    }
  }, [loading, tracks, randomTrack]);

  if (loading || !randomTrack) {
    return <div className={styles.analysisContainer} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>Loading track data...</div>;
  }

  // Use the track's real features
  const f = randomTrack.features || {} as any;
  const energy = Math.round((f.energy || 0) * 100);
  const danceability = Math.round((f.danceability || 0) * 100);
  const valence = Math.round((f.valence || 0) * 100);
  const acousticness = Math.round((f.acousticness || 0) * 100);
  const instrumentalness = Math.round((f.instrumentalness || 0) * 100);
  const tempo = Math.round(f.tempo || 0);

  return (
    <div className={styles.analysisContainer}>
      <header className={styles.headerRow}>
        <div className={styles.artworkSection}>
          <div className={styles.artworkPlaceholder}>
            {randomTrack.coverUrl ? (
              <img src={randomTrack.coverUrl} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
            ) : (
              <div className={styles.artBg}></div>
            )}
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.tagsRow}>
            <span className={styles.tag}>AI READY</span>
            <span className={styles.tag}>{tempo} BPM</span>
          </div>
          
          <h1 className={styles.songTitle}>{randomTrack.name}</h1>
          <h2 className={styles.artistName}>{randomTrack.artist}</h2>

          <div className={styles.actionRow}>
            <Link to="/processing" state={{ track: randomTrack }} className={styles.primaryBtn} style={{textDecoration: 'none'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
              Analyze with AI
            </Link>
            <button className={styles.iconBtn} onClick={() => setRandomTrack(tracks[Math.floor(Math.random() * tracks.length)] as unknown as SpotifyTrack)} title="Load another random track">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 12a8 8 0 018-8V0l5 5-5 5V6a6 6 0 106 6h2a8 8 0 11-16 0z"/></svg>
            </button>
          </div>
        </div>
      </header>

      <section className={styles.profileSection}>
        <h3 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.13 15.57a10 10 0 1 0 1.49-8.4L2.5 8M2.5 22v-6h6"/></svg>
          Sonic Profile (Pre-Analysis)
        </h3>
        
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>ENERGY</span>
              <span className={styles.metricValue}>{energy}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${energy}%`, backgroundColor: 'var(--color-secondary)' }}></div>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>DANCEABILITY</span>
              <span className={styles.metricValue} style={{color: 'var(--color-tertiary)'}}>{danceability}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${danceability}%`, backgroundColor: 'var(--color-tertiary)' }}></div>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>VALENCE</span>
              <span className={styles.metricValue} style={{color: 'var(--color-error)'}}>{valence}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${valence}%`, backgroundColor: 'var(--color-error)' }}></div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>ACOUSTICNESS</span>
              <span className={styles.metricValue}>{acousticness}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${acousticness}%`, backgroundColor: 'var(--color-outline)' }}></div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>INSTRUMENTALNESS</span>
              <span className={styles.metricValue}>{instrumentalness}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${instrumentalness}%`, backgroundColor: 'var(--color-outline)' }}></div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader} style={{marginBottom: 0}}>
              <div>
                <span className={styles.metricLabel} style={{display:'block', marginBottom: '4px'}}>TEMPO</span>
                <span className={styles.metricValue} style={{fontSize: '28px'}}>{tempo} <span style={{fontSize: '12px', color:'var(--color-on-surface-variant)', fontWeight:'normal'}}>BPM</span></span>
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
