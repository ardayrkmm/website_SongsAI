import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';
import { BarChartIcon, CompassIcon } from '../../components/ui/Icons';

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot}></span> Version 2.0 Live
        </div>
        
        <h1 className={styles.title}>
          Discover the <span>personality</span> behind every song.
        </h1>
        
        <p className={styles.desktopDescription}>
          SONORA AI analyzes the hidden characteristics of music using audio intelligence and machine learning to reveal the true DNA of your favorite tracks.
        </p>
        
        <p className={styles.mobileDescription}>
          Deep audio intelligence that maps the emotional and structural DNA of your music library.
        </p>
        
        <div className={styles.actions}>
          <Link to="/analyze" className={styles.primaryButton}>
            <BarChartIcon /> Analyze a Song
          </Link>
          <Link to="/explore" className={styles.secondaryButton}>
            <CompassIcon /> Explore Music
          </Link>
        </div>
      </div>
      
      <div className={styles.visual}>
        <div className={styles.playerGraphic}>
          <div className={styles.desktopGraphic}>
             {/* Abstract waveform representation for desktop */}
             <div className={styles.waveformDesktop}>
               {[40, 75, 50, 90, 65, 100, 80, 45, 85, 60, 30, 70].map((height, i) => (
                 <div key={i} className={styles.bar} style={{ height: `${height}%` }}></div>
               ))}
             </div>
          </div>
          <div className={styles.mobileGraphic}>
             <div className={styles.waveformMobile}>
               <div className={styles.mBar1}></div>
               <div className={styles.mBar2}></div>
               <div className={styles.mBar3}></div>
               <div className={styles.mBar4}></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

