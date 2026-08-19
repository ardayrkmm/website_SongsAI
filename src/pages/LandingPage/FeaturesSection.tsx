import styles from './FeaturesSection.module.css';
import { ClassificationIcon, FingerprintIcon, NetworkIcon, GlobeIcon, UserIcon, PulseIcon, BarChartIcon } from '../../components/ui/Icons';

export const FeaturesSection = () => {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.sectionTitle}>Audio Intelligence Capabilities</h2>
      
      <div className={styles.desktopGrid}>
        <div className={`${styles.card} ${styles.largeCard}`}>
          <div className={styles.iconWrapper}>
            <ClassificationIcon />
          </div>
          <h3 className={styles.cardTitle}>AI Music Classification</h3>
          <p className={styles.cardDesc}>
            Deep learning models analyze thousands of audio features simultaneously to categorize tracks with unprecedented accuracy.
          </p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.iconWrapper} style={{ color: 'var(--color-secondary)' }}>
            <FingerprintIcon />
          </div>
          <h3 className={styles.cardTitle}>Music DNA</h3>
          <p className={styles.cardDesc}>
            Extract acoustic fingerprints.
          </p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.iconWrapper} style={{ color: 'var(--color-tertiary)' }}>
            <NetworkIcon />
          </div>
          <h3 className={styles.cardTitle}>Similar Song Discovery</h3>
          <p className={styles.cardDesc}>
            Vector-based similarity mapping finds tracks with matching sonic profiles.
          </p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <GlobeIcon />
          </div>
          <h3 className={styles.cardTitle}>Music Universe</h3>
          <p className={styles.cardDesc}>
            Visualize clusters of genres and moods in a 3D semantic space.
          </p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.iconWrapper} style={{ color: 'var(--color-secondary)' }}>
            <UserIcon />
          </div>
          <h3 className={styles.cardTitle}>Music Personality</h3>
          <p className={styles.cardDesc}>
            Translate audio traits into psychological archetypes.
          </p>
        </div>
      </div>

      <div className={styles.mobileGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
             <div className={styles.iconWrapperMobile}>
               <PulseIcon />
             </div>
             <span className={styles.tag}>ANALYSIS</span>
          </div>
          <h3 className={styles.cardTitle}>Emotional Profiling</h3>
          <p className={styles.cardDesc}>
            Extract valence, arousal, and dominant mood markers from raw audio files.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
             <div className={styles.iconWrapperMobile} style={{ color: 'var(--color-tertiary)' }}>
               <BarChartIcon />
             </div>
             <span className={styles.tag}>METRICS</span>
          </div>
          <h3 className={styles.cardTitle}>Rhythm & Tempo</h3>
          <p className={styles.cardDesc}>
            High-precision BPM tracking and dynamic tempo fluctuation mapping.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
             <div className={styles.iconWrapperMobile}>
               <ClassificationIcon />
             </div>
             <span className={styles.tag}>CLASSIFICATION</span>
          </div>
          <h3 className={styles.cardTitle}>Genre Deconstruction</h3>
          <p className={styles.cardDesc}>
            Identify complex sub-genres and stylistic influences using deep neural networks.
          </p>
        </div>
      </div>
    </section>
  );
};

