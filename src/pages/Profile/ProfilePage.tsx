import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAnalysisHistory, getUserStatistics } from '../../services/db/analysisService';
import type { AnalysisRecord, UserMusicStats } from '../../services/db/analysisService';
import { getUserProfile } from '../../services/db/userService';
import type { UserProfile } from '../../services/db/userService';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [stats, setStats] = useState<UserMusicStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const [userProf, analyses, userStats] = await Promise.all([
          getUserProfile(user.uid),
          getUserAnalysisHistory(user.uid, 5),
          getUserStatistics(user.uid)
        ]);
        setProfile(userProf);
        setHistory(analyses);
        setStats(userStats);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const displayName = profile?.displayName || user?.displayName || 'User';
  const displayEmail = profile?.email || user?.email || 'user@example.com';
  const initial = displayName.charAt(0).toUpperCase();

  if (loading) return <div className={styles.container}>Loading profile...</div>;

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
                <span className={styles.badge}><span className={styles.dotSecondary}></span> Premium Tier</span>
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
          <h2 className={styles.personaTitle}>{stats?.personaName || 'Newcomer'}</h2>
          <p className={styles.personaDesc}>{stats?.personaDesc || 'Analyze more tracks to unlock your music persona.'}</p>
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
          <div className={styles.statValue}>{stats?.totalAnalyzed || 0}</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <span>Favorite Mood</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
          </div>
          <div className={styles.statValue} style={{color: 'var(--color-secondary)'}}>{stats?.topMood || 'Unknown'}</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <span>Average Energy</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-tertiary)" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <div className={styles.statValue}>{stats?.avgEnergy || 0}%</div>
          <div className={styles.progressBar}><div className={styles.progressFill} style={{width:`${stats?.avgEnergy || 0}%`, backgroundColor:'var(--color-tertiary)'}}></div></div>
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
          {history.length > 0 ? (
            history.map((record) => (
              <div key={record.id} className={styles.activityItem}>
                <div className={styles.activityIcon} style={{backgroundColor: 'rgba(76,215,246,0.1)', color: 'var(--color-secondary)'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <div className={styles.activityInfo}>
                  <h4>Analyzed "{record.trackTitle}"</h4>
                  <p>{record.artistName} • {record.confidence}% Match</p>
                </div>
                <div className={styles.activityTime}>Just now</div>
              </div>
            ))
          ) : (
            <p style={{color: 'var(--color-on-surface-variant)', fontSize: '13px'}}>No recent activity.</p>
          )}
        </div>
      </div>

      <div className={styles.analyticsSection} style={{ marginTop: '32px' }}>
        <div className={styles.sectionHeader} style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Dataset Analytics & Trends</h2>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Music Trends by Year Chart Mock */}
          <div style={{ flex: '1 1 400px', backgroundColor: 'var(--color-surface-container)', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-outline-variant)' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--color-on-surface-variant)' }}>Music Era Trends (By Release Year)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '8px', borderBottom: '1px solid var(--color-outline)', paddingBottom: '8px' }}>
              {[15, 30, 45, 20, 60, 85, 40, 95].map((h, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: 'var(--color-primary)', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.6 + (h/200) }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
              <span>1980s</span>
              <span>1990s</span>
              <span>2000s</span>
              <span>2010s</span>
              <span>2020s</span>
            </div>
          </div>

          {/* Genre Distribution Pie Chart Mock */}
          <div style={{ flex: '1 1 300px', backgroundColor: 'var(--color-surface-container)', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-outline-variant)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '24px', color: 'var(--color-on-surface-variant)', alignSelf: 'flex-start' }}>Genre Distribution</h3>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(var(--color-primary) 0% 45%, var(--color-secondary) 45% 75%, var(--color-tertiary) 75% 90%, var(--color-surface-container-high) 90% 100%)', marginBottom: '24px' }}></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary)'}}></span> Electronic</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-secondary)'}}></span> Pop</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-tertiary)'}}></span> Rock</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
