import { useAuth } from '../../contexts/AuthContext';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const { user } = useAuth();
  const displayName = user?.displayName || 'User';
  const displayEmail = user?.email || 'user@example.com';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className={styles.container}>
      <div className={styles.topLayout}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>{initial}</div>
            </div>
            <div className={styles.userInfo}>
              <h1 className={styles.name}>
                {displayName}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </h1>
              <p className={styles.email}>{displayEmail}</p>
              
              <div className={styles.badges}>
                <span className={styles.badge}><span className={styles.dotSecondary}></span> Pro Member</span>
                <span className={styles.badge}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                  Audio Architect
                </span>
              </div>

              <div className={styles.actions}>
                <button className={styles.btnPrimary}>Edit Profile</button>
                <button className={styles.btnIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.personaCard}>
          <p className={styles.personaLabel}>Music Personality</p>
          <h2 className={styles.personaTitle}>Night Explorer</h2>
          <p className={styles.personaDesc}>Drawn to deep, atmospheric soundscapes and complex rhythmic structures after dark.</p>
          <div className={styles.miniChart}>
            {[30, 60, 40, 80, 50, 90, 70, 20, 40, 85, 30, 60, 45, 75, 80, 50, 90].map((h, i) => (
              <div key={i} className={styles.bar} style={{height: `${h}%`, backgroundColor: i % 4 === 0 ? 'var(--color-primary)' : 'var(--color-outline)'}}></div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <span>Songs Analyzed</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          </div>
          <div className={styles.statValue}>1,204</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <span>Favorite Mood</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
          </div>
          <div className={styles.statValue} style={{color: 'var(--color-secondary)'}}>Atmospheric</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <span>Average Energy</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-tertiary)" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <div className={styles.statValue}>68%</div>
          <div className={styles.progressBar}><div className={styles.progressFill} style={{width:'68%', backgroundColor:'var(--color-tertiary)'}}></div></div>
        </div>
        
        <div className={`${styles.statCard} ${styles.generateCard}`}>
          <div className={styles.generateContent}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            <span>Generate Report</span>
          </div>
        </div>
      </div>

      <div className={styles.activitySection}>
        <div className={styles.sectionHeader}>
          <h2>Recent Activity</h2>
          <a href="#" className={styles.viewAll}>View All</a>
        </div>
        
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon} style={{backgroundColor: 'rgba(76,215,246,0.1)', color: 'var(--color-secondary)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <div className={styles.activityInfo}>
              <h4>Analyzed "Midnight Cityscape"</h4>
              <p>Synthwave • 120 BPM</p>
            </div>
            <div className={styles.activityTime}>2 hours ago</div>
          </div>
          
          <div className={styles.activityItem}>
            <div className={styles.activityIcon} style={{backgroundColor: 'rgba(46,204,113,0.1)', color: 'var(--color-tertiary)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <div className={styles.activityInfo}>
              <h4>Saved Playlist "Deep Focus Focus"</h4>
              <p>Ambient • 45 Tracks</p>
            </div>
            <div className={styles.activityTime}>Yesterday</div>
          </div>
          
          <div className={styles.activityItem}>
            <div className={styles.activityIcon} style={{backgroundColor: 'rgba(192,193,255,0.1)', color: 'var(--color-primary)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            </div>
            <div className={styles.activityInfo}>
              <h4>Unlocked "Night Explorer" Persona</h4>
              <p>Achievement</p>
            </div>
            <div className={styles.activityTime}>3 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};
